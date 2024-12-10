import React from 'react';

const HomePage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1>Register de Commerce</h1>
        <p>Welcome to the official platform for business registration.</p>
      </header>
      <main>
        <section style={{ marginBottom: '20px' }}>
          <h2>About Us</h2>
          <p>
            Our platform provides a comprehensive solution for registering and managing your business.
          </p>
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h2>Services</h2>
          <ul>
            <li>Business Registration</li>
            <li>Document Management</li>
            <li>Compliance Monitoring</li>
          </ul>
        </section>
        <section>
          <h2>Contact Us</h2>
          <p>Email: support@registerdecommerce.com</p>
          <p>Phone: +123 456 7890</p>
        </section>
      </main>
      <footer style={{ marginTop: '20px' }}>
        <p>&copy; 2024 Register de Commerce. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
