import React, { useEffect, useState } from "react";
import DemandeListe from "./DemandeListe";
import {
  FaPlus,
  FaUser,
  FaSpinner,
  FaTimes,
  FaHome,
  FaList,
  FaChevronRight,
  FaBell,
  FaSignOutAlt,
  FaFileAlt,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";
import "./UserProfile.css";
import { Navigate, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");
  const [isProcuration, setIsProcuration] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId || userType !== "user") {
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:8092/userSpace/profile/${userId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server response was not JSON format");
        }

        const data = await response.json();

        if (!data) {
          throw new Error("No data received from server");
        }

        setProfileData(data);
        setError(null);
      } catch (error) {
        setError(
          `Failed to load profile: ${
            error.message || "An unexpected error occurred"
          }`
        );
        console.error("Profile fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId, userType]);

  const handleAddDemande = () => {
    setShowModal(true);
  };

  const handleProcurationChoice = (choice) => {
    setIsProcuration(choice);
    setShowModal(false);
    navigate("/addformulaire?procuration=" + choice);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!userId || userType !== "user") {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <FaSpinner className="loading-icon spinning" />
        <span>Chargement du profil...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <FaTimes className="error-icon" />
        <h2>Erreur de chargement</h2>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="profile-dashboard">
        <div className="breadcrumbs">
          <FaHome />
          <FaChevronRight />
          <span>Profile</span>
        </div>

        <aside className="profile-sidebar">
          <div className="profile-header">
            <div className="profile-avatar">
              <FaUser />
            </div>
            {profileData && (
              <div className="profile-info">
                <h2>
                  {profileData.nom} {profileData.prenom}
                </h2>
                <p className="user-type">
                  <FaUser /> Client
                </p>
              </div>
            )}
          </div>
          <nav className="profile-nav">
            <button className="nav-item active">
              <FaFileAlt /> Mes Demandes
            </button>
            <button className="nav-item">
              <FaCog /> Paramètres
            </button>
            <button className="nav-item logout" onClick={handleLogout}>
              <FaSignOutAlt /> Déconnexion
            </button>
          </nav>
        </aside>

        <main className="profile-main">
          <div className="main-header">
            <h1>
              <FaList /> Mes Demandes
            </h1>
            <button
              className="add-demande-button"
              onClick={handleAddDemande}
              title="Créer une nouvelle demande"
            >
              <FaPlus /> Nouvelle Demande
            </button>
          </div>
          <div className="demandes-wrapper">
            <DemandeListe userId={userId} />
          </div>
        </main>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
              title="Close"
            >
              <FaTimes className="close-icon" />
            </button>
            <h3>
              <FaFileAlt /> Type de Demande
            </h3>
            <p>Est-ce une demande de procuration ?</p>
            <div className="modal-buttons">
              <button
                className="btn btn-primary"
                onClick={() => handleProcurationChoice(true)}
              >
                <FaPlus /> Oui
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleProcurationChoice(false)}
              >
                <FaTimes /> Non
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
