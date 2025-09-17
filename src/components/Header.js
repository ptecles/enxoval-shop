import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const location = useLocation();
  const isInSection = location.pathname !== '/';
  
  useEffect(() => {
    const handleScroll = () => {
      // Only apply scrolled style if we're on home page and scrolled down
      if (location.pathname === '/' && window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]); // Re-run when location changes
  
  // Reset scroll state when navigating to home
  useEffect(() => {
    if (location.pathname === '/') {
      setScrolled(false);
      setIsSearchActive(false); // Reset search when navigating
      // Only scroll to top if not searching
      if (!isSearchActive) {
        window.scrollTo(0, 0);
      }
    }
  }, [location.pathname, isSearchActive]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearchActive(true);
      // Simple search - filter products on current page
      const products = document.querySelectorAll('.product-card');
      let foundProducts = 0;
      
      products.forEach(product => {
        const productName = product.querySelector('.product-name')?.textContent.toLowerCase() || '';
        if (productName.includes(searchTerm.toLowerCase())) {
          product.style.display = 'block';
          product.style.border = '2px solid #7d8c93';
          foundProducts++;
          // Scroll to first found product
          if (foundProducts === 1) {
            setTimeout(() => {
              product.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
          }
        } else {
          product.style.display = 'none';
        }
      });
      
      if (foundProducts === 0) {
        alert(`Nenhum produto encontrado para "${searchTerm}"`);
        clearSearch();
      }
    }
  };
  
  const clearSearch = () => {
    setIsSearchActive(false);
    setSearchTerm('');
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
      product.style.display = 'block';
      product.style.border = '';
    });
  };
  
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${isInSection ? 'active-section' : ''}`}>
      <div className="header-container">
        <button 
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        <div className="logo">
          <Link to="/" onClick={clearSearch}>
            <img src="/images/logo.png" alt="Enxoval Inteligente Indica" />
          </Link>
        </div>
        
        <nav className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="nav-overlay" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="nav-content">
            <ul>
              <li><Link to="/" onClick={() => { setMobileMenuOpen(false); clearSearch(); }}>Home</Link></li>
              <li><Link to="/como-funciona" onClick={() => setMobileMenuOpen(false)}>Como Funciona</Link></li>
              <li><Link to="/quarto" onClick={() => setMobileMenuOpen(false)}>Quarto</Link></li>
              <li><Link to="/passeio" onClick={() => setMobileMenuOpen(false)}>Passeio</Link></li>
              <li><Link to="/higiene" onClick={() => setMobileMenuOpen(false)}>Higiene</Link></li>
              <li><Link to="/alimentacao" onClick={() => setMobileMenuOpen(false)}>Alimentação</Link></li>
              <li><a href="https://www.enxovalinteligente.com.br/ig" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>Curso</a></li>
            </ul>
          </div>
        </nav>
        <div className="header-actions">
          <form className="search-container" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Buscar produtos..." 
              className="search-input" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {isSearchActive ? (
              <button type="button" className="search-button" onClick={clearSearch} title="Limpar busca">
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            ) : (
              <button type="submit" className="search-button" title="Buscar">
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            )}
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
