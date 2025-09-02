import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';
import Products from './pages/Products';
import Header from './components/Header';
import Footer from './components/Footer';
// Importando página de categoria para ser usada com diferentes categorias
import CategoryPage from './pages/CategoryPage';
import ComoFunciona from './pages/ComoFunciona';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/quarto" element={<CategoryPage category="quarto" title="Quarto" bannerImage="https://enxovalinteligente.com.br/wp-content/uploads/2025/07/808a0a0e-fe42-435a-9f78-825dbb159b49.png" />} />
            <Route path="/passeio" element={<CategoryPage category="passeio" title="Passeio" bannerImage="https://enxovalinteligente.com.br/wp-content/uploads/2025/07/ChatGPT-Image-22_07_2025-18_51_07.png" />} />
            <Route path="/higiene" element={<CategoryPage category="higiene" title="Higiene" bannerImage="https://enxovalinteligente.com.br/wp-content/uploads/2025/07/ChatGPT-Image-Jul-22-2025-08_25_08-PM.png" />} />
            <Route path="/alimentacao" element={<CategoryPage category="alimentacao" title="Alimentação" bannerImage="https://enxovalinteligente.com.br/wp-content/uploads/2025/07/ChatGPT-Image-Jul-22-2025-08_31_42-PM.png" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
