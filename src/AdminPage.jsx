import UploadExcelFile from './UploadExcelFile';
import DeleteFFMM from './DeleteFFMM';
import './CSS/AdminPage.css';

function AdminPage() {
    return (
        <>
            <div>
                <UploadExcelFile />
                <DeleteFFMM />
            </div>
        </>
    )
}

export default AdminPage;
