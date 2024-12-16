import React, { useState, useEffect } from "react";
import axios from 'axios';
import './DemandeListe.css'; // Reuse existing styles
import { 
    FaList, 
    FaSpinner, 
    FaUserTie, 
    FaFileAlt, 
    FaExclamationTriangle,
    FaDownload,
    FaMoneyBill
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AiOutlineFileSearch } from 'react-icons/ai'

function RegisterListe() {
    const [demandes, setDemandes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPayedDemandes = async () => {
            try {
                const response = await axios.get(`http://localhost:8092/userSpace/demandes/payed/${userId}`);
                setDemandes(response.data);
                setError(null);
            } catch (error) {
                setError('Erreur de connexion au serveur');
            } finally {
                setLoading(false);
            }
        };

        fetchPayedDemandes();
    }, [userId]);

    const handleGetRegister = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8092/userSpace/get_register/${id}`, {
                responseType: 'blob'
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `register_${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            setError('Erreur lors du téléchargement du registre');
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <FaSpinner className="loading-icon spinning" />
                <span>Chargement des demandes payées...</span>
            </div>
        );
    }

    return (
        <div className="demandes-container">
            <div className="demandes-header">
                <h1><FaList /> Liste des Registres de commerece</h1>
            </div>

            {error && (
                <div className="error-message">
                    <FaExclamationTriangle />
                    {error}
                </div>
            )}

            {demandes.length > 0 ? (
                <div className="table-container">
                    <table className="demandes-table">
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Procureur</th>
                                <th>Documents</th>
                                <th>Formulaire</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {demandes.map((demande) => (
                                <tr key={demande.id}>
                                    <td>
                                        <span className="status-badge status-payed">
                                            <FaMoneyBill className="status-icon paye" />
                                            Payée
                                        </span>
                                    </td>
                                    <td>
                                        <span className="procureur-cell">
                                            <FaUserTie />
                                            {demande._procureur ? 'Oui' : 'Non'}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => navigate(`/documents/${demande.id}`)}
                                            className="view-docs-btn"
                                        >
                                            <FaFileAlt /> Voir les documents
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => navigate(`/formulaire/${demande.id}`)}
                                            className="view-form-btn"
                                        >
                                            <AiOutlineFileSearch />
                                            Voir le formulaire
                                        </button>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button 
                                                onClick={() => handleGetRegister(demande.id)}
                                                className="download-btn"
                                                title="Télécharger le registre"
                                            >
                                                <FaDownload />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="no-demandes">
                    <FaFileAlt />
                    <p>Aucune demande payée disponible</p>
                </div>
            )}
        </div>
    );
}

export default RegisterListe;