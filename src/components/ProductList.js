import React, { useState, useEffect } from 'react';
import GoogleSheetsService from '../services/GoogleSheetsService';
import '../styles/ProductList.css';

const ProductList = ({ sheetId = '1btIezyZKBgMJpLwQ6xyZ2_zqkeo6p6Yv9i3Zei7WviI', category }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await GoogleSheetsService.getProductsFromSheet(sheetId, 'Sheet1');
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
        setError('Não foi possível carregar os produtos. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sheetId]);

  useEffect(() => {
    if (category && category !== 'todos') {
      console.log('Filtrando produtos para categoria:', category);
      console.log('Total de produtos antes do filtro:', products.length);
      
      // Verificar os valores das categorias nos produtos
      const categoryValues = products.map(p => ({
        categoria: p.categoria || p.category || '',
        nome: p.nome || p.name || ''
      }));
      console.log('Valores de categorias nos produtos:', categoryValues);
      
      // Função para normalizar strings (remover acentos e converter para minúsculas)
      const normalizeString = (str) => {
        if (!str) return '';
        return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      };
      
      // Verificar se há produtos com descrição ou nome relacionados à alimentação
      if (normalizeString(category) === 'alimentacao') {
        console.log('Verificando produtos que podem ser de alimentação por descrição ou nome...');
        products.forEach(product => {
          const nome = normalizeString(product.nome || product.name || '');
          const descricao = normalizeString(product.descricao || product.description || '');
          if (nome.includes('mamadeira') || nome.includes('papinha') || 
              nome.includes('leite') || nome.includes('alimenta') ||
              descricao.includes('alimenta')) {
            console.log('Possível produto de alimentação:', product);
          }
        });
      }
      
      const filtered = products.filter(product => {
        // Verificar categoria em vários campos possíveis
        const productCategory = product.categoria || product.category || '';
        const productName = product.nome || product.name || '';
        const productDesc = product.descricao || product.description || '';
        
        // Normaliza a categoria do produto e a categoria selecionada
        const normalizedCategory = normalizeString(productCategory);
        const normalizedSelectedCategory = normalizeString(category);
        
        // Verificação padrão por categoria
        let isMatch = normalizedCategory === normalizedSelectedCategory;
        
        // Tratamento especial para a categoria Alimentação
        if (normalizedSelectedCategory === 'alimentacao') {
          // Verificar por categoria
          isMatch = ['alimentacao', 'alimentação', 'alimentos', 'comida', 'papinha'].some(c => 
            normalizedCategory.includes(c));
            
          // Se não encontrou por categoria, verificar por nome ou descrição
          if (!isMatch) {
            const keywords = ['mamadeira', 'papinha', 'leite', 'alimenta', 'comida', 'refeicao'];
            isMatch = keywords.some(keyword => 
              normalizeString(productName).includes(keyword) || 
              normalizeString(productDesc).includes(keyword)
            );
          }
          
          if (isMatch) {
            console.log('Produto de alimentação encontrado:', product);
          }
        }
        
        return isMatch;
      });
      
      setFilteredProducts(filtered);
      console.log('Categoria:', category, 'Produtos filtrados:', filtered.length);
      console.log('Categorias disponíveis:', [...new Set(products.map(p => p.categoria || p.category))]);
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  if (loading) {
    return <div className="loading">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (filteredProducts.length === 0) {
    return <div className="no-products">Nenhum produto encontrado nesta categoria.</div>;
  }

  // Debug para ver a estrutura dos dados
  console.log('Produtos carregados:', filteredProducts);
  
  return (
    <div className="product-list">
      <div className="product-grid">
        {filteredProducts.map((product, index) => {
          // Garantir que os nomes das propriedades estejam corretos
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
    </div>
  );
};

export default ProductList;
