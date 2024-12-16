import React, { useState, useEffect } from "react";
import axios from 'axios';
import './DemandeListe.css';
import { 
  FaList, 
  FaCheck, 
  FaTimes, 
  FaSpinner, 
  FaUserTie, 
  FaFileAlt, 
  FaEdit, 
  FaTrash, 
  FaExclamationTriangle,
  FaMoneyBill
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AiOutlineFileSearch } from 'react-icons/ai'

function DemandeListe() {
    const [demandes, setDemandes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDemandes = async () => {
            try {
                const response = await axios.get(`http://localhost:8092/userSpace/demandes/${userId}`);
                setDemandes(response.data);
                setError(null);
            } catch (error) {
                if (error.response?.status === 404) {
                    // setError('Aucune demande trouvée');
                } else {
                    setError('Erreur de connexion au serveur');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDemandes();
    }, [userId]);

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
            try {
                await axios.post(`http://localhost:8092/userSpace/delete_demande/${id}`);
                setDemandes(demandes.filter(demande => demande.id !== id));
                setError(null);
                console.log('Demande supprimée avec succès');
            } catch (error) {
                setError('Erreur lors de la suppression de la demande'+ error);
            }
        }
    };

    const handleModify = (id) => {
        navigate(`/modify-demande/${id}`);
    };
    const handlePaye = async (id) => {
        alert('do u really want to paye this demande?');
        try {
           const response= await axios.post(`http://localhost:8092/userSpace/add_payement/${id}`);
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            setError('Erreur lors du paiement de la demande'+ error);
        }
    };


        const getStatusIcon = (status) => {
        switch(status.toLowerCase()) {
            case 'en cours':
                return <FaSpinner className="status-icon spinning" />;
            case 'approved':
                return <FaCheck className="status-icon" />;
            case 'refused':
                return <FaTimes className="status-icon" />;
            case 'payed':
                return <FaMoneyBill className="status-icon paye" />;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <FaSpinner className="loading-icon spinning" />
                <span>Chargement des demandes...</span>
            </div>
        );
    }

    return (
        <div className="demandes-container">
            <div className="demandes-header">
                <h1><FaList /> Liste des Demandes</h1>
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
                                <th>Motif</th>
                                <th>Documents</th>
                                <th>Formulaire</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {demandes.map((demande) => (
                                <tr key={demande.id}>
                                    <td>
                                        <span className={`status-badge status-${demande.status.toLowerCase()}`}>
                                            {getStatusIcon(demande.status)}
                                            {demande.status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="procureur-cell">
                                            <FaUserTie />
                                            {demande._procureur ? 'Oui' : 'Non'}
                                        </span>
                                    </td>
                                    <td>{demande.status === 'REFUSED' ? demande.motif : '-'}</td>
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
                                            <AiOutlineFileSearch />  {/* or alternatives: HiOutlineDocumentSearch, IoDocumentTextOutline */}
                                            Voir le formulaire
                                        </button>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            {demande.status === 'REFUSED' && (
                                                <button 
                                                    onClick={() => handleModify(demande.id)}
                                                    className="modify-btn"
                                                    title="Modifier la demande"
                                                >
                                                    <FaEdit />
                                                </button>
                                            )}
                                            {
                                                demande.status === 'approved' && (
                                                    //a paye button
                                                    <button 
                                                        onClick={() => handlePaye(demande.id)}
                                                        className="paye-btn"
                                                        title="Payer la demande"
                                                    >
                                                        <FaMoneyBill />
                                                    </button>
                                                )

                                            }
                                            <button 
                                                onClick={() => handleDelete(demande.id)}
                                                className="delete-btn"
                                                title="Supprimer la demande"
                                            >
                                                <FaTrash />
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
                    <p>Aucune demande disponible</p>
                </div>
            )}
        </div>
    );
}

export default DemandeListe;