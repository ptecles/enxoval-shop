import React from 'react';
import ProductList from '../components/ProductList';
import '../styles/CategoryPage.css';

const CategoryPage = ({ category, title, bannerImage }) => {
  return (
    <div className="category-page">
      <div className="category-banner" style={bannerImage ? { backgroundImage: `url(${bannerImage})` } : {}}>
        <div className="banner-overlay">
          <h1>{title}</h1>
          <p>Encontre os melhores produtos para {title.toLowerCase()}</p>
        </div>
      </div>
      
      <div className="category-description">
        <p>
          Aqui você encontra todos os produtos da categoria {title.toLowerCase()}, 
          selecionados especialmente para atender às suas necessidades.
        </p>
      </div>
      
      <ProductList category={category} />
      
      <div className="category-info">
        <div className="info-container">
          <div className="info-column">
            <h3>Produtos Selecionados</h3>
            <p>Todos os produtos desta categoria foram cuidadosamente escolhidos para garantir qualidade e conforto.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
