import React, { useState } from 'react';
import { FaEnvelope, FaEyeSlash, FaLock, FaSignInAlt,FaEye } from 'react-icons/fa';
import './login.css'

function WorkerLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
      const [errors, setErrors] = useState({});
      const [loading, setLoading] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const toggleShowPassword = () => {
        setShowPassword(!showPassword);
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
    
      
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        setLoading(true);
        try {
          const requestbody = {
            immatriculation: formData.email,
            password: formData.password
          };
          const response = await fetch(`http://localhost:8092/authenticate/worker/login`, {
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
          const userType = "worker";
          //save the user id in the local storage
          localStorage.setItem('workerId', id);
          localStorage.setItem('userType', userType);
          //redirect to the user profile page
          window.location.href = '/workerProfile' ;
    
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
            <div className="login-card">
              <h2 className="login-title">Connexion Worker</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <FaEnvelope className="input-icon" />
                  <input
                    id="email"
                    name="email"
                    placeholder="Matricule"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
        
                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <div className="show-password" onClick={toggleShowPassword}>
                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
        
                <button className="login-button" type="submit" disabled={loading}>
                  {loading ? (
                    <span>Connexion en cours...</span>
                  ) : (
                    <>
                      <FaSignInAlt /> 
                      <span>Se connecter</span>
                    </>
                  )}
                </button>
                {errors.submit && <div className="error-message">{errors.submit}</div>}
              </form>
            </div>
          </div>
        );
    };
export default WorkerLogin;