import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isInSection = location.pathname !== '/';
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${isInSection ? 'active-section' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>Enxoval Inteligente Shop</h1>
          </Link>
        </div>
        <nav className="nav-menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/como-funciona" className="two-line-menu">Como<br/>Funciona</Link></li>
            <li><Link to="/quarto">Quarto</Link></li>
            <li><Link to="/passeio">Passeio</Link></li>
            <li><Link to="/higiene">Higiene</Link></li>
            <li><Link to="/alimentacao">Alimentação</Link></li>
            <li><Link to="/brinquedos">Brinquedos</Link></li>
          </ul>
        </nav>
        <div className="header-actions">
          <div className="search-container">
            <input type="text" placeholder="Buscar produtos..." className="search-input" />
            <button className="search-button">
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
