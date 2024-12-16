import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaUserTie, FaBuilding, FaIdCard, FaMapMarkerAlt, 
    FaStore, FaMoneyBillWave, FaCheck, FaTimes } from 'react-icons/fa';
import './VerifyDemande.css';

function VerifyDemande() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [documents, setDocuments] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formulaire, setFormulaire] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [selectedDocument, setSelectedDocument] = useState(null);

    const documentTitles = {
        attestaion_inscription_taxe: "Attestation d'inscription taxe",
        certificat_negatif: "Certificat négatif",
        cin_representant: "CIN représentant",
        declaration_immatriculation: "Déclaration d'immatriculation",
        procuration: "Procuration",
        procureur_cin: "CIN procureur",
        prove_domicile: "Preuve de domicile"
    };

    useEffect(() => {
        fetchDocuments();
        fetchFormulaire();
    }, [id]);

    const fetchDocuments = async () => {
        try {
            const response = await axios.get(`http://localhost:8092/userSpace/get_document/${id}`);
            const documentUrls = {};
            
            Object.entries(response.data).forEach(([key, base64Data]) => {
                if (base64Data) {
                    const binaryString = atob(base64Data);
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    const blob = new Blob([bytes], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    documentUrls[key] = url;
                }
            });
            setDocuments(documentUrls);
        } catch (err) {
            setError('Failed to fetch documents');
        }
    };

    const fetchFormulaire = async () => {
        try {
            const response = await axios.get(`http://localhost:8092/userSpace/get_formulaire/${id}`);
            setFormulaire(response.data);
        } catch (err) {
            setError('Failed to fetch formulaire');
        } finally {
            setLoading(false);
        }
    };
    const acceptDemande = async () => {
        try {
        
            const response = await axios.put(`http://localhost:8092/worker/acepteDeamnde/${id}`);
            if (response.status === 200) {
                //show a success message and navigate to the dashboard
                alert('Demande acceptée avec succès');
                navigate(-1);
            }else if (response.status === 400) {
                //set error message to be displayed
                alert('Erreur lors de l\'acceptation de la demande : demande doesn\'t exist');
            }else{
                alert('Erreur lors de l\'acceptation de la demande , essayez plus tard');
            }
        } catch (err) {
            alert('Erreur lors de l\'acceptation de la demande , essayez plus tard');
        }
    };

    const rejectDemande = async () => {
        try {
            const response = await axios.put(`http://localhost:8092/worker/refuseDemande/${id}`, {
                motif: rejectionReason
            });
            if (response.status === 200) {
                //show a success message and navigate to the dashboard
                alert('Demande rejetée avec succès');
                navigate(-1);
            }else if (response.status === 400) {
                //set error message to be displayed
                alert('Erreur lors du rejet de la demande : demande doesn\'t exist');
            }else{
                alert('Erreur lors du rejet de la demande , essayez plus tard');
            }
        } catch (err) {
            alert('Erreur lors du rejet de la demande , essayez plus tard');
        }
    }
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!formulaire) return <div className="error">No formulaire found</div>;

    return (
        <div className="verify-demande-container">
            <button onClick={() => navigate(-1)} className="back-btn">
                ← Retour
            </button>
            <div className="verify-content">
                <div className="documents-section">
                    <h2>Documents à Vérifier</h2>
                    <div className="document-viewer">
                        <div className="document-list">
                            {Object.entries(documents).map(([key, url]) => (
                                <button
                                    key={key}
                                    className={`document-item ${selectedDocument === key ? 'active' : ''}`}
                                    onClick={() => setSelectedDocument(key)}
                                >
                                    {documentTitles[key]}
                                </button>
                            ))}
                        </div>
                        <div className="document-preview">
                            {selectedDocument && (
                                <embed
                                    src={documents[selectedDocument]}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="formulaire-section">
                    <h2>Détails du Formulaire</h2>
                    <div className="details-grid">
                        <section className="detail-card">
                            <h3><FaUser /> Informations Personnelles</h3>
                            <p><strong>Nom: d'Entreprise</strong> {formulaire.nom}</p>
                            <p><strong>Forme Juridique:</strong> {formulaire.prenom}</p>
                            <p><FaIdCard /> <strong>CIN:</strong> {formulaire.cin}</p>
                            <p><FaMapMarkerAlt /> <strong>Adresse:</strong> {formulaire.adresse}</p>
                        </section>

                        <section className="detail-card">
                            <h3><FaBuilding /> Informations Commerciales</h3>
                            <p><strong>ICE:</strong> {formulaire.ice}</p>
                            <p><FaStore /> <strong>Commerce:</strong> {formulaire.objet_commerce}</p>
                            <p><FaMoneyBillWave /> <strong>Capital:</strong> {formulaire.capital} DH</p>
                        </section>

                        {formulaire.procuration && (
                            <section className="detail-card">
                                <h3><FaUserTie /> Bénéficiaire</h3>
                                <p><strong>Nom:</strong> {formulaire.benificiaire_nom}</p>
                                <p><strong>Prenom: </strong> {formulaire.benificiaire_prenom}</p>
                                <p><strong>CIN:</strong> {formulaire.benificiaire_cin}</p>
                            </section>
                        )}
                    </div>

                    <div className="verification-controls">
                        <button 
                            className="accept-button"
                            onClick={() => acceptDemande()}
                        >
                            <FaCheck /> Accepter
                        </button>
                        
                        <div className="reject-control">
                            <textarea
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                placeholder="Motif de rejet (obligatoire)"
                            />
                            <button 
                                className="reject-button"
                                onClick={() => rejectDemande()}
                                disabled={!rejectionReason}
                            >
                                <FaTimes /> Rejeter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyDemande;