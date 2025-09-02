import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/images/logo.png" alt="Logo" className="logo-image" />
        </div>
        <div className="footer-copyright">
          <p>Copyright © 2025 Inc. Todos os direitos reservados. Edufe Digital CNPJ: 48.796.931/0001-74</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
