import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaIdCard,
  FaBuilding,
  FaFileContract,
  FaHome,
  FaCertificate,
  FaUserTie,
  FaFileUpload,
  FaTimes,
} from "react-icons/fa";
import "./addDocument.css";

const AddDocument = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isProcuration = searchParams.get("procuration");
  const demande_id = searchParams.get("id_demande");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    cin_representant: null,
    declaration_immatriculation: null,
    attestaion_inscription_taxe: null,
    prove_domicile: null,
    certificat_negatif: null,
    procuration: null,
    procureur_cin: null,
  });
  const handleCancel = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir canceler cette demande ?")) {
      try {
        await axios.post(
          `http://localhost:8092/userSpace/delete_demande/${id}`
        );
        navigate("/user/profile");
      } catch (error) {
        setError("Erreur lors de la suppression de la demande" + error);
      }
    }
  };

  useEffect(() => {
    if (isProcuration === "false") {
      setFormData((prev) => ({
        ...prev,
        procuration: null,
        procureur_cin: null,
      }));
    }
  }, [isProcuration]);

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const submitData = new FormData();
    submitData.append("id_demande", demande_id);

    for (const key in formData) {
      if (
        isProcuration === "false" &&
        (key === "procuration" || key === "procureur_cin")
      ) {
        continue;
      }
      if (formData[key] instanceof File) {
        submitData.append(key, formData[key]);
      }
    }

    try {
      for (let pair of submitData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await axios.post(
        "http://localhost:8092/userSpace/add_document",
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      navigate("/user/profile");
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err.response?.data?.message ||
          "Error uploading documents. Please check all required fields."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <FaFileUpload className="loading-icon" /> Uploading documents...
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <div className="form-container">
        {error && (
          <div className="error-message">
            {error}
            <button className="error-close" onClick={() => setError(null)}>
              <FaTimes />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <FaIdCard /> CIN Représentant
            </label>
            <input
              type="file"
              accept=".pdf,application/pdf"
              name="cin_representant"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && !file.type.includes("pdf")) {
                  alert("Please upload PDF files only");
                  e.target.value = "";
                  return;
                }
                handleFileChange(e);
              }}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaBuilding /> Déclaration d'immatriculation
            </label>
            <input
              type="file"
              accept=".pdf,application/pdf"
              name="declaration_immatriculation"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && !file.type.includes("pdf")) {
                  alert("Please upload PDF files only");
                  e.target.value = "";
                  return;
                }
                handleFileChange(e);
              }}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaFileContract /> Attestation d'inscription à la taxe
            </label>
            <input
              type="file"
              accept=".pdf,application/pdf"
              name="attestaion_inscription_taxe"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && !file.type.includes("pdf")) {
                  alert("Please upload PDF files only");
                  e.target.value = "";
                  return;
                }
                handleFileChange(e);
              }}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaHome /> Preuve de domicile
            </label>
            <input
              type="file"
              accept=".pdf,application/pdf"
              name="prove_domicile"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && !file.type.includes("pdf")) {
                  alert("Please upload PDF files only");
                  e.target.value = "";
                  return;
                }
                handleFileChange(e);
              }}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaCertificate /> Certificat négatif
            </label>
            <input
              type="file"
              accept=".pdf,application/pdf"
              name="certificat_negatif"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && !file.type.includes("pdf")) {
                  alert("Please upload PDF files only");
                  e.target.value = "";
                  return;
                }
                handleFileChange(e);
              }}
              required
            />
          </div>

          {isProcuration === "true" && (
            <>
              <div className="form-group">
                <label>
                  <FaFileContract /> Procuration
                </label>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  name="procuration"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && !file.type.includes("pdf")) {
                      alert("Please upload PDF files only");
                      e.target.value = "";
                      return;
                    }
                    handleFileChange(e);
                  }}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaUserTie /> CIN Procureur
                </label>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  name="procureur_cin"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && !file.type.includes("pdf")) {
                      alert("Please upload PDF files only");
                      e.target.value = "";
                      return;
                    }
                    handleFileChange(e);
                  }}
                  required
                />
              </div>
            </>
          )}
          <div className="buttons-container" >
            <button type="submit" className="submit-button">
              <FaFileUpload /> Upload Documents
            </button>
            <button
              onClick={() => handleCancel(demande_id)}
              className="cancel-button"
            >
              <FaTimes /> Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDocument;
