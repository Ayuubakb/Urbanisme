import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UpdateFormulaire.css";
import PropTypes from "prop-types";
import UpdateDocument from "./UpdateDocument";

function UpdateFormulaire({ id }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isProcuration, setIsProcuration] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    cin: "",
    adresse: "",
    nr_chronologique: "",
    ice: "",
    benificiaire_nom: "",
    benificiaire_prenom: "",
    benificiaire_cin: "",
    objet_commerce: "",
    capital: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8092/userSpace/get_formulaire/${id}`
        );
        const data = response.data;
        setIsProcuration(data.procuration);
        setFormData({
          nom: data.nom,
          prenom: data.prenom,
          cin: data.cin,
          adresse: data.adresse,
          nr_chronologique: data.nr_chronologique,
          ice: data.ice,
          benificiaire_nom: data.benificiaire_nom,
          benificiaire_prenom: data.benificiaire_prenom,
          benificiaire_cin: data.benificiaire_cin,
          objet_commerce: data.objet_commerce,
          capital: data.capital,
        });
      } catch (error) {
        setError("Failed to fetch form data. Please try again later." + error);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setHasChanges(true);
  };

  const handleProcurationChange = (e) => {
    setIsProcuration(e.target.checked);
    setHasChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const requestData = {
            nom: formData.nom,
            prenom: formData.prenom,
            cin: formData.cin,
            procuration: isProcuration,
            adresse: formData.adresse,
            nr_chronologique: formData.nr_chronologique,
            ice: formData.ice,
            benificiaire_nom: formData.benificiaire_nom,
            benificiaire_prenom: formData.benificiaire_prenom,
            benificiaire_cin: formData.benificiaire_cin,
            objet_commerce: formData.objet_commerce,
            capital: formData.capital
        };

        console.log(requestData);

        const response = await axios.put(`http://localhost:8092/userSpace/update_formulaire/${id}`, requestData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
    } catch (err) {
        setError("Failed to update form. Please try again." + err);
    }
    setLoading(false);
};

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">{error}</div>
        <button onClick={() => navigate("/user/profile")} className="back-btn">
          ← Back
        </button>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="formulaire-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label>Nom:</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Prénom:</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>CIN:</label>
            <input
              type="text"
              name="cin"
              value={formData.cin}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Adresse:</label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Business Information</h3>
          <div className="form-group">
            <label>Nr Chronologique:</label>
            <input
              type="text"
              name="nr_chronologique"
              value={formData.nr_chronologique}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>ICE:</label>
            <input
              type="text"
              name="ice"
              value={formData.ice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Objet Commerce:</label>
            <input
              type="text"
              name="objet_commerce"
              value={formData.objet_commerce}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Capital:</label>
            <input
              type="number"
              name="capital"
              value={formData.capital}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Procuration</h3>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={isProcuration}
                onChange={handleProcurationChange}
              />
              Using Procuration
            </label>
          </div>

          {isProcuration && (
            <div className="procuration-details">
              <div className="form-group">
                <label>Bénéficiaire Nom:</label>
                <input
                  type="text"
                  name="benificiaire_nom"
                  value={formData.benificiaire_nom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Bénéficiaire Prénom:</label>
                <input
                  type="text"
                  name="benificiaire_prenom"
                  value={formData.benificiaire_prenom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Bénéficiaire CIN:</label>
                <input
                  type="text"
                  name="benificiaire_cin"
                  value={formData.benificiaire_cin}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={loading || !hasChanges}>
            Update Information
          </button>
        </div>
      </form>
      <br />
      <br />
      <UpdateDocument id={id} isProcuration={isProcuration} />
    </>
  );
}
//props validation
UpdateFormulaire.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UpdateFormulaire;
