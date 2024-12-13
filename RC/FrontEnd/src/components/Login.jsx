import React, { useState } from 'react';
import './Login.css';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      const requestbody = {
        email: formData.email,
        password: formData.password
      };
      const response = await fetch(`http://localhost:8092/authenticate/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestbody)
      });
      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log("Login response", data);
      } else {
        data = { message: await response.text() };
        console.log("Login response", data);
      }

      if (!response.ok || data.message === 'Login failed') {
        console.log("Login error", data);
        throw new Error('Email ou mot de passe incorrect');
      }

      const id = parseFloat(data.message);
      if (isNaN(id)) {
        console.error("Login error", data);
        return;
      }
      //login success so we dispatch the action 
      const userType = "user";
      //save the user id in the local storage
      localStorage.setItem('userId', id);
      localStorage.setItem('userType', userType);
      console.log("Login success", id, userType);
      //redirect to user profile and keep the user id in the redux store
      window.location.href = `/user/profile`;

    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

    // Only changing the return statement for visual improvements
  
  return (
    <div className="login-container">
      <div className="login-box glass-effect">
        <div className="login-header">
          <h2>Connexion</h2>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-icon">
              <FaEnvelope className="icon" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="input-field"
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
  
          <div className="form-group">
            <div className="input-icon">
              <FaLock className="icon" />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="input-field"
              />
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
  
          <button type="submit" disabled={loading} className="login-button">
            {loading ? (
              <div className="loader">
                <span className="loader-circle"></span>
                <span>Connexion en cours...</span>
              </div>
            ) : (
              <>
                <FaSignInAlt className="button-icon" /> 
                <span>Se connecter</span>
              </>
            )}
          </button>
          {errors.submit && <div className="error-alert">{errors.submit}</div>}
        </form>
        <div className="register-link">
          Vous n'avez pas de compte ?
          <Link to="/register" className="register-button"> Inscrivez-vous</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;