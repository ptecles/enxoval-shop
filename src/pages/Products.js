import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import '../styles/Products.css';

const Products = () => {
  // O ID da planilha já está definido no componente ProductList como valor padrão
  const [activeCategory, setActiveCategory] = useState('todos');
  
  // Categorias de exemplo (você pode adaptá-las conforme suas necessidades)
  const categories = [
    { id: 'todos', name: 'Todos os Produtos' },
    { id: 'cama', name: 'Cama' },
    { id: 'mesa', name: 'Mesa' },
    { id: 'banho', name: 'Banho' },
    { id: 'decoracao', name: 'Decoração' },
    { id: 'cozinha', name: 'Cozinha' }
  ];
  
  return (
    <div className="products-page">
      <div className="category-banner">
        <h1>Produtos do Enxoval</h1>
        <p>Encontre tudo para sua casa com os melhores preços</p>
      </div>
      
      <div className="category-filter">
        <div className="filter-container">
          {categories.map(category => (
            <button 
              key={category.id}
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <ProductList category={activeCategory} />
      
      <div className="products-info">
        <div className="info-container">
          <div className="info-column">
            <h3>Produtos de Qualidade</h3>
            <p>Todos os nossos produtos são selecionados com cuidado para garantir a melhor qualidade para sua casa.</p>
          </div>
          <div className="info-column">
            <h3>Entrega Rápida</h3>
            <p>Enviamos para todo o Brasil com rapidez e segurança para que você receba seus produtos o quanto antes.</p>
          </div>
          <div className="info-column">
            <h3>Atendimento Personalizado</h3>
            <p>Nossa equipe está pronta para te ajudar a escolher os melhores produtos para sua casa.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
