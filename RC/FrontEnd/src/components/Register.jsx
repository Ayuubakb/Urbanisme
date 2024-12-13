import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (password.match(/[A-Z]/)) score += 25;
    if (password.match(/[0-9]/)) score += 25;
    if (password.match(/[^A-Za-z0-9]/)) score += 25;
    return score;
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return '#ff4444';
    if (passwordStrength <= 50) return '#ffbb33';
    if (passwordStrength <= 75) return '#00C851';
    return '#007E33';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setNotification({ message: '', type: '' });
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validateForm = () => {
    const validationErrors = [];
    
    if (!formData.nom.trim()) validationErrors.push('Le nom est requis');
    if (!formData.prenom.trim()) validationErrors.push('Le prénom est requis');
    if (!formData.email.trim()) {
      validationErrors.push('L\'email est requis');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.push('Le format de l\'email est invalide');
    }
    if (!formData.password) {
      validationErrors.push('Le mot de passe est requis');
    } else if (passwordStrength < 75) {
      validationErrors.push('Le mot de passe est trop faible');
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.push('Les mots de passe ne correspondent pas');
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
  
    if (validationErrors.length > 0) {
      console.error('Validation errors:', validationErrors);
      setNotification({
        message: validationErrors[0],
        type: 'error'
      });
      return;
    }
  
    setLoading(true);
    try {
      const request_body = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        password: formData.password
      };
      
      const response = await fetch('http://localhost:8092/authenticate/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request_body)
      });
  
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log('Registration response:', data);
      } else {
        data = { message: await response.text() };
      }
  
      if (!response.ok) {
        if(data.message === 'Email already registered'){
          setNotification({
            message: 'L\'email est déjà utilisé',
            type: 'error'
          });
        }else{
          setNotification({
            message: data.message || 'Échec de l\'inscription',
            type: 'error'
          });
        }
        return
      }
  
      setNotification({
        message: 'Inscription réussie',
        type: 'success'
      });

    } catch (error) {
      console.error('Registration error:', error);
      setNotification({
        message: error.message || 'Erreur réseau',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Créer un nouveau compte</h2>
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              disabled={loading}
              className="ltr-input"
            />
          </div>

          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              disabled={loading}
              className="ltr-input"
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="ltr-input"
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className="ltr-input"
            />
            <div
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {formData.password && (
              <div className="password-strength">
                <div 
                  className="strength-bar"
                  style={{
                    width: `${passwordStrength}%`,
                    backgroundColor: getStrengthColor()
                  }}
                />
              </div>
            )}
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              className="ltr-input"
            />
            <div
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-button" 
            disabled={loading}
          >
            {loading ? <FaSpinner className="spinner" /> : 'S\'inscrire'}
          </button>

          {notification.message && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}
        </form>

        <div className="login-link">
          Vous avez déjà un compte? <Link to="/login">Se connecter</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;