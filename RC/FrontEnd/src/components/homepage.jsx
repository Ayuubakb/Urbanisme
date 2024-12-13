import React from 'react';
import './RegistreCommerceHomepage.css';
import { 
  FaGlobe, 
  FaLock, 
  FaClock, 
  FaFileAlt,
  FaPhone,
  FaEnvelope,
  FaUserPlus,
  FaClipboardList,
  FaUpload,
  FaCheckCircle
} from 'react-icons/fa';

const RegistreCommerceHomepage = () => {
  return (
    <div className="rc-commerce-container">
      {/* Header */}
      <header className="rc-header">
        <div className="rc-header-content">
          <div className="rc-logo">Registre du Commerce Marocain</div>
          <nav className="rc-nav">
            <a href="#">Accueil</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="rc-hero">
        <div className="rc-hero-content">
          <div className="rc-hero-text">
            <h1>Obtenez votre Registre de Commerce en ligne</h1>
            <p>Simplifiez vos démarches administratives avec notre plateforme sécurisée et rapide</p>
            <div className="rc-hero-actions">
              <button className="rc-btn rc-btn-primary" onClick={() => window.location.href = '/register'}>Commencer</button>
              <button className="rc-btn rc-btn-secondary">En savoir plus</button>
            </div>
          </div>
          <div className="rc-hero-image">
            <div className="rc-placeholder-image"></div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="rc-features">
        <h2>Pourquoi choisir notre plateforme?</h2>
        <div className="rc-features-grid">
          {[
            { icon: <FaGlobe />, title: '100% En ligne', desc: 'Procédures simplifiées depuis votre ordinateur' },
            { icon: <FaLock />, title: 'Sécurisé', desc: 'Vos données sont protégées et confidentielles' },
            { icon: <FaClock />, title: 'Rapide', desc: 'Traitement rapide de votre demande' },
            { icon: <FaFileAlt />, title: 'Complet', desc: 'Tous les documents nécessaires' }
          ].map((feature, index) => (
            <div key={index} className="rc-feature-item">
              <div className="rc-feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Process Section */}
      <section className="rc-process">
        <h2>Étapes d'obtention du Registre de Commerce</h2>
        <div className="rc-process-grid">
          {[
            { step: 1, icon: <FaUserPlus />, title: "Créer un compte", desc: "Créez facilement votre compte personnel" },
            { step: 2, icon: <FaClipboardList />, title: "Saisir les informations", desc: "Entrez les détails de votre activité" },
            { step: 3, icon: <FaUpload />, title: "Télécharger les documents", desc: "Uploadez les documents requis" },
            { step: 4, icon: <FaCheckCircle />, title: "Révision et confirmation", desc: "Recevez votre registre de commerce" }
          ].map((item) => (
            <div key={item.step} className="rc-process-item">
              <div className="rc-process-step">
                {item.icon}
                <span>{item.step}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Support Section */}
      <section className="rc-support">
        <div className="rc-support-content">
          <div className="rc-support-text">
            <h2>Besoin d'aide?</h2>
            <p>Notre équipe est disponible pour vous aider à chaque étape. Contactez-nous par téléphone ou email.</p>
            <div className="rc-support-actions">
              <a href="tel:+212500000" className="rc-btn rc-btn-primary">
                <FaPhone /> Appelez-nous
              </a>
              <a href="mailto:support@rcmaroc.ma" className="rc-btn rc-btn-secondary">
                <FaEnvelope /> Écrivez-nous
              </a>
            </div>
          </div>
          <div className="rc-support-image">
            <div className="rc-placeholder-image"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="rc-footer">
        <p>&copy; 2024 Registre du Commerce Marocain. Tous droits réservés.</p>
        <div className="rc-footer-links">
          <a href="#">Mentions légales</a>
          <a href="#">Politique de confidentialité</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default RegistreCommerceHomepage;