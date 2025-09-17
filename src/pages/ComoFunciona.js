import React from 'react';
import '../styles/ComoFunciona.css';

const ComoFunciona = () => {
  return (
    <div className="como-funciona-page">
      <div className="como-funciona-banner">
        <div className="banner-overlay">
          <h1>Como Funciona</h1>
          <p><strong>Seja bem-vindo!</strong></p>
        </div>
      </div>
      
      <div className="como-funciona-content">
        <div className="content-section">
          <h2>O QUE É O ENXOVAL INTELIGENTE SHOP?</h2>
          <p>
            O ENXOVAL INTELIGENTE SHOP é um site com a curadoria de produtos de bebê que eu, Elisa Langsch, fiz para um enxoval prático e seguro. 
            Aqui você encontra meus itens preferidos para todos os momentos: passeio, amamentação e alimentação, sono, brincadeiras.
          </p>
          
          <h2>COMO COMPRAR?</h2>
          <p>
            Ao selecionar um produto, você será redirecionada para a página de compra da loja parceira. 
            Lá, você pode concluir sua compra. Nós recebemos uma comissão nas vendas, mas não se preocupa que você não paga nada a mais por isso!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComoFunciona;
