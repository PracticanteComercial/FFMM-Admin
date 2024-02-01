import React, { useState, useEffect } from 'react';
import { Tooltip, Button, Popconfirm } from 'antd';
import { QuestionCircleOutlined, FilePdfOutlined, FileTextOutlined, DeleteOutlined } from '@ant-design/icons';
import lowRiskImage from './assets/low.jpg';
import moderateRiskImage from './assets/medium.jpg';
import highRiskImage from './assets/high.jpg';
import './CSS/DeleteFFMM.css';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const DeleteFFMM = () => {
    const [fondos, setFondos] = useState([]);

    useEffect(() => {
        const fetchFfmmData = async () => {
            try {
                const response = await fetch(`${VITE_BACKEND_URL}/FFMMs`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setFondos(data.FFMMs);
            } catch (error) {
                console.error('Error fetching FFMM data:', error);
            }
        };
        fetchFfmmData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${VITE_BACKEND_URL}/FFMMs/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            // Actualizar la lista xde fondos después de eliminar el fondo
            const updatedFondos = fondos.filter((fondo) => fondo.id !== id);
            setFondos(updatedFondos);
        } catch (error) {
            console.error('Error deleting FFMM:', error);
        }
    };

    return (
        <div>
            <h2>Eliminar Fondos Mutuos
                <Tooltip title="Elimina fondos mutuos directamente desde la base de datos. Si te equivocas en eliminar uno, no te preocupes! Vuelve a subirlo desde el apartado de arriba con un archivo Excel.">
                    <Button shape="circle" size='large' icon={<QuestionCircleOutlined />} />
                </Tooltip>
            </h2>
            <table>
                <thead>
                    <tr>
                        <th>Fondo</th>
                        <th>AGF</th>
                        <th>Categoría</th>
                        <th>Serie</th>
                        <th>RUN</th>
                        <th>1M
                        </th>
                        <th>
                            Riesgo
                        </th>
                        <th>Reglamento</th>
                        <th>Ficha</th>
                        <th>ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                    {fondos.map((fondo) => (
                        <tr key={fondo.id}>
                            <td>{fondo.name}</td>
                            <td>{fondo.agf}</td>
                            <td>{fondo.category}</td>
                            <td>{fondo.series}</td>
                            <td>{fondo.run}</td>
                            <td className={fondo.monthly.startsWith('-') ? 'rojo' : 'verde'}>{fondo.monthly}</td>
                            <td>
                                {fondo.riskLevel === 'Bajo' && (
                                    <img src={lowRiskImage} alt="Bajo Riesgo" />
                                )}
                                {fondo.riskLevel === 'Moderado' && (
                                    <img src={moderateRiskImage} alt="Moderado Riesgo" />
                                )}
                                {fondo.riskLevel === 'Alto' && (
                                    <img src={highRiskImage} alt="Alto Riesgo" />
                                )}
                            </td>
                            <td>
                                <Tooltip title="Abrir Reglamento Interno">
                                    <Button
                                        shape="circle"
                                        icon={<FilePdfOutlined />}
                                        onClick={() => window.open(fondo.bylawLink, '_blank')}
                                    />
                                </Tooltip>
                            </td>
                            <td>
                                <Tooltip title="Abrir Ficha">
                                    <Button
                                        shape="circle"
                                        icon={<FileTextOutlined />}
                                        onClick={() => window.open(fondo.dataSheetLink, '_blank')}
                                    />
                                </Tooltip>
                            </td>
                            <td>
                                <Popconfirm
                                    title="¿Estás seguro de eliminar este fondo?"
                                    onConfirm={() => handleDelete(fondo.id)}
                                    okText="Sí"
                                    cancelText="No"
                                >
                                    <Button type="primary" danger shape="circle" size="large" icon={<DeleteOutlined />} />
                                </Popconfirm>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeleteFFMM;
