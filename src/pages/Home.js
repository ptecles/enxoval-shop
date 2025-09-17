import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import GoogleSheetsService from '../services/GoogleSheetsService';

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndices, setCurrentIndices] = useState({});
  
  // ID da planilha do Google Sheets
  const sheetId = '1btIezyZKBgMJpLwQ6xyZ2_zqkeo6p6Yv9i3Zei7WviI';
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await GoogleSheetsService.getProductsFromSheet(sheetId, 'Sheet1');
        setAllProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
        setError('Não foi possível carregar os produtos.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  // Categorias do menu
  const categories = [
    {
      id: 1,
      name: 'Quarto',
      image: 'https://enxovalinteligente.com.br/wp-content/uploads/2025/07/808a0a0e-fe42-435a-9f78-825dbb159b49.png',
      slug: 'quarto',
      description: 'Tudo para o quarto do seu bebê'
    },
    {
      id: 2,
      name: 'Passeio',
      image: 'https://enxovalinteligente.com.br/wp-content/uploads/2025/07/ChatGPT-Image-22_07_2025-18_51_07.png',
      slug: 'passeio',
      description: 'Produtos para passeio com seu bebê'
    },
    {
      id: 3,
      name: 'Higiene',
      image: 'https://enxovalinteligente.com.br/wp-content/uploads/2025/07/ChatGPT-Image-Jul-22-2025-08_25_08-PM.png',
      slug: 'higiene',
      description: 'Produtos de higiene para o seu bebê'
    },
    {
      id: 4,
      name: 'Alimentação',
      image: 'https://enxovalinteligente.com.br/wp-content/uploads/2025/07/ChatGPT-Image-Jul-22-2025-08_31_42-PM.png',
      slug: 'alimentacao',
      description: 'Produtos para alimentação do seu bebê'
    }
  ];
  
  // Função para obter produtos por categoria
  const getProductsByCategory = (category) => {
    if (!allProducts || allProducts.length === 0) return [];
    
    return allProducts.filter(product => {
      const productCategory = (product.categoria || product.category || '').toLowerCase();
      return productCategory.includes(category.toLowerCase());
    });
  };

  // Função para obter produtos visíveis de uma categoria
  const getVisibleProducts = (category, categorySlug) => {
    const products = getProductsByCategory(category);
    const startIndex = currentIndices[categorySlug] || 0;
    return products.slice(startIndex, startIndex + 3);
  };

  // Função para navegar entre produtos
  const navigateProducts = (categorySlug, direction) => {
    const products = getProductsByCategory(categorySlug);
    const currentIndex = currentIndices[categorySlug] || 0;
    let newIndex;

    if (direction === 'next') {
      newIndex = currentIndex + 3 >= products.length ? 0 : currentIndex + 3;
    } else {
      newIndex = currentIndex - 3 < 0 ? Math.max(0, products.length - 3) : currentIndex - 3;
    }

    setCurrentIndices(prev => ({
      ...prev,
      [categorySlug]: newIndex
    }));
  };

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Bem-vindo ao<br />Enxoval Inteligente Indica</h1>
          <p>Conheça a seleção da Elisa de produtos seguros para o seu bebê</p>
        </div>
      </section>

      {/* Categorias com Produtos */}
      {loading ? (
        <div className="loading-container">
          <p>Carregando produtos...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
        </div>
      ) : (
        <>
          {categories.map(category => {
            const allCategoryProducts = getProductsByCategory(category.slug);
            const categoryProducts = getVisibleProducts(category.slug, category.slug);
            
            return (
              <section className="category-products-section" key={category.id}>
                <div className="section-header">
                  <h2>{category.name}</h2>
                  <Link to={`/${category.slug}`} className="view-all">Ver Todos</Link>
                </div>
                
                {allCategoryProducts.length > 0 ? (
                  <div className="products-carousel">
                    {allCategoryProducts.length > 3 && (
                      <button 
                        className="carousel-btn prev-btn" 
                        onClick={() => navigateProducts(category.slug, 'prev')}
                        aria-label="Produtos anteriores"
                      >
                        &#8249;
                      </button>
                    )}
                    
                    <div className="product-grid">
                      {categoryProducts.map((product, index) => {
                        const nome = product.nome || product.name || product.produto || '';
                        const preco = product.preco || product.price || product.valor || '';
                        const imagem = product.imagem || product.image || product.foto || product.url || '';
                        const link = product.link || product.comprar || product.compra || '';
                        
                        return (
                          <div className="product-card" key={index}>
                            <div className="product-image">
                              <img 
                                src={imagem || 'https://via.placeholder.com/300x300?text=Sem+Imagem'} 
                                alt={nome} 
                                onClick={() => {
                                  if (link) {
                                    window.open(link, '_blank', 'noopener,noreferrer');
                                  }
                                }}
                                style={{ cursor: link ? 'pointer' : 'default' }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/300x300?text=Imagem+Indisponível';
                                }}
                              />
                            </div>
                            <div className="product-info">
                              <h3 className="product-name">{nome || 'Produto sem nome'}</h3>
                              <p className="product-price">
                                {preco 
                                  ? `R$ ${typeof preco === 'number' ? preco.toFixed(2) : parseFloat(preco.toString().replace(',', '.')).toFixed(2)}` 
                                  : 'Preço não disponível'}
                              </p>
                              {link && <div className="click-indicator">Comprar na Amazon</div>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {allCategoryProducts.length > 3 && (
                      <button 
                        className="carousel-btn next-btn" 
                        onClick={() => navigateProducts(category.slug, 'next')}
                        aria-label="Próximos produtos"
                      >
                        &#8250;
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="no-products">
                    <p>Nenhum produto encontrado nesta categoria.</p>
                  </div>
                )}
              </section>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Home;
