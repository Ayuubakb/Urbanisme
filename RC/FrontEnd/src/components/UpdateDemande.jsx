import { useParams } from 'react-router-dom';
import { useState } from 'react';
import UpdateFormulaire from './UpdateFormulaire';
import { useNavigate } from 'react-router-dom';
import './updateDemande.css';

function UpdateDemande() {
    const { id } = useParams();
    const [error] = useState(null);
    const navigate = useNavigate();

    if (!id) {
        return <div className="error-message">Invalid request ID</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <>
        <button 
                            type="button" 
                            onClick={() => navigate('/user/profile')} 
                            className="cancel-btn"
                        >
                            Cancel
                        </button>
        <div className="update-demande-container">
            <h1>Update Demande</h1>
            <div className="update-sections">
                <UpdateFormulaire id={id} />
            </div>
        </div></>
        
        
    );
}

export default UpdateDemande;