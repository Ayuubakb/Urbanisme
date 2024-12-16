import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./formulaire.css";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaIdCard,
  FaMapMarkerAlt,
  FaSort,
  FaBuilding,
  FaStore,
  FaMoneyBillWave,
  FaPaperPlane,
  FaTimes,
  FaSpinner,
  FaUserTie
} from "react-icons/fa";

function FormulaireAdd() {
  const [searchParams] = useSearchParams();
  const isProcuration = searchParams.get("procuration");
  const userId = localStorage.getItem("userId");
  const [error, setError] = useState(null);
  const [demandeId, setDemandeId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id_demande: demandeId,
    nom: "",
    prenom: "",
    cin: "",
    procuration: isProcuration,
    adresse: "",
    nr_chronologique: "",
    ice: "",
    benificiaire_nom: "",
    benificiaire_prenom: "",
    benificiaire_cin: "",
    objet_commerce: "",
    capital: 0,
  });
  const handleCancel = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir canceler cette demande ?')) {
        try {
            const response =await axios.post(`http://localhost:8092/userSpace/delete_demande/${id}`);
            if(response.status === 200) {
              navigate('/user/profile');
            }

        } catch (error) {
            setError('Erreur lors de la suppression de la demande'+ error);
        }
    }
};

  useEffect(() => {
    const initializeDemande = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `http://localhost:8092/userSpace/add_demande/${userId}/${isProcuration}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setDemandeId(response.data);
        setFormData((prev) => ({
          ...prev,
          id_demande: response.data,
        }));
        setError(null);
      } catch (error) {
        setError("Failed to initialize demande: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeDemande();
  }, [userId, isProcuration]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8092/userSpace/add_formulaire",
        {
          ...formData,
        }
      );
      if (response.status === 200) {
        navigate(
          `/add_document?id_demande=${demandeId}&procuration=${isProcuration}`
        );
        setError(null);
      }
    } catch (error) {
      setError("Error submitting form: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <FaSpinner className="loading-icon" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)} className="error-close">
            <FaTimes />
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-container">
        <h2 className="form-title">
          {isProcuration === "true" ? "Formulaire avec Procuration" : "Formulaire"}
        </h2>

        <div className="form-section">
          <h3 className="section-title">Informations Personnelles</h3>
          <div className="form-group">
            <label><FaUser /> Nom d'Entreprise:
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              placeholder="Entrez votre nom"
            />
          </div>
          <div className="form-group">
            <label><FaUser /> Forme Juridique:
            </label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
              placeholder="Entrez votre prénom"
            />
          </div>
          <div className="form-group">
            <label><FaIdCard /> CIN:</label>
            <input
              type="text"
              name="cin"
              value={formData.cin}
              onChange={handleChange}
              required
              placeholder="Entrez votre CIN"
            />
          </div>
          <div className="form-group">
            <label><FaMapMarkerAlt /> Adresse:</label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              required
              placeholder="Entrez votre adresse"
            />
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Informations Commerciales</h3>
          <div className="form-group">
            <label><FaSort /> Nr Chronologique:</label>
            <input
              type="text"
              name="nr_chronologique"
              value={formData.nr_chronologique}
              onChange={handleChange}
              required
              placeholder="Numéro chronologique"
            />
          </div>
          <div className="form-group">
            <label><FaBuilding /> ICE:</label>
            <input
              type="text"
              name="ice"
              value={formData.ice}
              onChange={handleChange}
              required
              placeholder="Identifiant Commun de l'Entreprise"
            />
          </div>
          <div className="form-group">
            <label><FaStore /> Objet Commerce:</label>
            <input
              type="text"
              name="objet_commerce"
              value={formData.objet_commerce}
              onChange={handleChange}
              required
              placeholder="Type de commerce"
            />
          </div>
          <div className="form-group">
            <label><FaMoneyBillWave /> Capital:</label>
            <input
              type="number"
              name="capital"
              value={formData.capital}
              onChange={handleChange}
              required
              placeholder="Montant du capital"
            />
          </div>
        </div>

        {isProcuration === "true" && (
          <div className="form-section">
            <h3 className="section-title">Informations du Bénéficiaire</h3>
            <div className="form-group">
              <label><FaUserTie /> Bénéficiaire Nom:</label>
              <input
                type="text"
                name="benificiaire_nom"
                value={formData.benificiaire_nom}
                onChange={handleChange}
                required
                placeholder="Nom du bénéficiaire"
              />
            </div>
            <div className="form-group">
              <label><FaUserTie /> Bénéficiaire Prénom:</label>
              <input
                type="text"
                name="benificiaire_prenom"
                value={formData.benificiaire_prenom}
                onChange={handleChange}
                required
                placeholder="Prénom du bénéficiaire"
              />
            </div>
            <div className="form-group">
              <label><FaIdCard /> Bénéficiaire CIN:</label>
              <input
                type="text"
                name="benificiaire_cin"
                value={formData.benificiaire_cin}
                onChange={handleChange}
                required
                placeholder="CIN du bénéficiaire"
              />
            </div>
          </div>
        )}
 <div className="buttons-container">
          <button type="submit" className="submit-button">
            <FaPaperPlane /> Soumettre
          </button>
          <button onClick={() => handleCancel(demandeId)} className="cancel-button">
            <FaTimes /> Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormulaireAdd;