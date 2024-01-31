import React, { useState } from 'react';
import { message, Upload, Button, Tooltip } from 'antd';
import { UploadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
import "./CSS/UploadExcelFile.css";

const { Dragger } = Upload;

const UploadExcelFile = () => {
    const [fileList, setFileList] = useState([]);

    const handleUpload = () => {
        if (fileList.length === 0) {
            message.warning('No hay archivos para subir.');
            return;
        }

        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('file', file.originFileObj);
        });

        fetch(`${VITE_BACKEND_URL}/FFMMs/upload`, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
                message.success('Archivos subidos exitosamente.');
                setFileList([]);
            })
            .catch(error => {
                console.error('Error al subir archivos:', error);
                message.error('Error al subir archivos. Por favor, inténtelo de nuevo.');
            });
    };

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
                setFileList(info.fileList);
            }
            if (status === 'done') {
                message.success(`Archivo ${info.file.name} ha cargado exitosamente.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <div>
            <h2>Actualizar la base de datos con excel
                <Tooltip title="Carga un archivo Excel con el formato estándar y aprete el botón 'Confirmar y mandar los cambios'. Actualiza los valores de los fondos y crea los que no existen. ">
                    <Button shape="circle" size='large' icon={<QuestionCircleOutlined />} />
                </Tooltip>
            </h2>
            <Dragger  {...props} className="select-file-box">
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Haz click o arrastre archivo a esta área para cargar archivo</p>
            </Dragger>
            <div className='confirm-container'>
                <Button className="confirm-button" type="primary" icon={<UploadOutlined />} onClick={handleUpload}>
                    Confirmar y mandar los cambios
                </Button>
                <h4>
                    El cambio se afectará a la vista oficial de la página web, confirme que el archivo es el correcto antes de subir y mandar los cambios.
                </h4>
            </div>
        </div>
    );
};

export default UploadExcelFile;
