import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaUserTie, FaArrowLeft, FaBuilding, FaIdCard, 
    FaMapMarkerAlt, FaStore, FaMoneyBillWave } from 'react-icons/fa';
import './FormulaireDetails.css';

function FormulaireDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formulaire, setFormulaire] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormulaire = async () => {
            try {
                const response = await axios.get(`http://localhost:8092/userSpace/get_formulaire/${id}`);
                console.log(response.data);
                setFormulaire(response.data);
            } catch (err) {
                setError('Failed to fetch formulaire details'+err);
            } finally {
                setLoading(false);
            }
        };
        fetchFormulaire();
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!formulaire) return <div className="error">No formulaire found</div>;

    return (
        <div className="formulaire-details-container">
            <button onClick={() => navigate(-1)} className="back-button">
                <FaArrowLeft /> Retour
            </button>

            <section className="details-section personal">
                <h2><FaUser /> Informations Personnelles</h2>
                <div className="detail-item">
                    <span>Nom d'entreprise:</span>
                    <p>{`${formulaire.nom} `}</p>
                </div>
                <div className="detail-item">
                <span>Forme Juridique:</span>
                <p>{`${formulaire.prenom} `}</p>
            </div>
                <div className="detail-item">
                    <span><FaIdCard /> CIN:</span>
                    <p>{formulaire.cin}</p>
                </div>
                <div className="detail-item">
                    <span><FaMapMarkerAlt /> Adresse:</span>
                    <p>{formulaire.adresse}</p>
                </div>
            </section>

            <section className="details-section commercial">
                <h2><FaBuilding /> Informations Commerciales</h2>
                <div className="detail-item">
                    <span>Nr Chronologique:</span>
                    <p>{formulaire.nr_chronologique}</p>
                </div>
                <div className="detail-item">
                    <span>ICE:</span>
                    <p>{formulaire.ice}</p>
                </div>
                <div className="detail-item">
                    <span><FaStore /> Objet Commerce:</span>
                    <p>{formulaire.objet_commerce}</p>
                </div>
                <div className="detail-item">
                    <span><FaMoneyBillWave /> Capital:</span>
                    <p>{formulaire.capital} DH</p>
                </div>
            </section>

            {formulaire.procuration && (
                <section className="details-section beneficiary">
                    <h2><FaUserTie /> Informations du Bénéficiaire</h2>
                    <div className="detail-item">
                        <span>Nom Complet:</span>
                        <p>{`${formulaire.benificiaire_nom} ${formulaire.benificiaire_prenom}`}</p>
                    </div>
                    <div className="detail-item">
                        <span><FaIdCard /> CIN:</span>
                        <p>{formulaire.benificiaire_cin}</p>
                    </div>
                </section>
            )}
        </div>
    );
}

export default FormulaireDetails;