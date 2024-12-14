import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSpinner,
  FaTimes,
  FaSignOutAlt,
  FaFileAlt,
  FaChartLine,
  FaBell,
  FaCog,
  FaCalendarAlt,
} from "react-icons/fa";
import axios from "axios";
import WorkerDemandes from "./WorkerDemandes";
import "./WorkerProfil.css";

const WorkerProfile = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [activeSection, setActiveSection] = useState('demandes');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const workerId = localStorage.getItem('workerId');
      const userType = localStorage.getItem('userType');

      if (!workerId || userType !== 'worker') {
        navigate('/login');
        return;
      }

      fetchWorkerData(workerId);
    };

    const fetchWorkerData = async (workerId) => {
      try {
        const response = await axios.get(`http://localhost:8092/worker/profile/${workerId}`);
        setProfileData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch worker data');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/rekrowLogin");
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <FaSpinner className="loading-icon spinning" />
        <p>Chargement du profil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <FaTimes className="error-icon" />
        <h2>Erreur de chargement</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="company-logo">
            <h1>RC</h1>
          </div>
          <h2>
            Registre de commerce
          </h2>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">
            <FaUser />
          </div>
          {profileData && (
            <div className="profile-info">
              <h3>{profileData.nom} {profileData.prenom}</h3>
              <span className="worker-badge">Worker</span>
              <p className="matricule">#{profileData.matriculation}</p>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-button ${activeSection === 'demandes' ? 'active' : ''}`}
            onClick={() => setActiveSection('demandes')}
          >
            <FaFileAlt /> <span>Demandes</span>
          </button>
          <button className="nav-button logout" onClick={handleLogout}>
            <FaSignOutAlt /> <span>Déconnexion</span>
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="main-header">
          <div className="header-content">
          </div>
        </header>
        <div className="main-content">
          {activeSection === 'demandes' && (
            <div className="demandes-section">
              <WorkerDemandes />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkerProfile;