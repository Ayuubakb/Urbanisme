import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaList,
  FaFileAlt,
  FaSpinner,
  FaExclamationTriangle,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiOutlineFileSearch } from "react-icons/ai";
import "./workerdemande.css";

function WorkerDemandes() {
  const [demandes, setDemandes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8092/worker/demandes"
        );
        setDemandes(response.data);
        setError(null);
      } catch (error) {
        setError("Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, []);

  const handleCheck = (id) => {
    navigate(`/verify-demande/${id}`);
  };

  const handleSendMail = async (id) => {
    try {
      await axios.post(`http://localhost:8092/worker/send-document/${id}`);
      alert("Document envoyé avec succès");
    } catch (error) {
      setError("Erreur lors de l'envoi du document");
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
        <h1>
          <FaList /> Liste des Demandes en Cours
        </h1>
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
                <th>id</th>
                <th>Documents</th>
                <th>Formulaire</th>
                <th>Vérification</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map((demandeId) => (
                <tr key={`demande-${demandeId}`}>
                  <td>{demandeId}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/documents/${demandeId}`)}
                      className="view-docs-btn"
                    >
                      <FaFileAlt /> Documents
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/formulaire/${demandeId}`)}
                      className="view-form-btn"
                    >
                      <AiOutlineFileSearch /> Formulaire
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleCheck(demandeId)}
                      className="check-btn"
                    >
                      <FaSearch /> Vérifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
        </div>
      ) : (
        <div className="no-demandes">
          <FaFileAlt />
          <p>Aucune demande en cours</p>
        </div>
      )}
    </div>
  );
}

export default WorkerDemandes;
