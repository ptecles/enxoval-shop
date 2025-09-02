import axios from 'axios';

class GoogleSheetsService {
  /**
   * Busca dados de uma planilha pública do Google Sheets
   * @param {string} sheetId - O ID da planilha do Google Sheets
   * @param {string} sheetName - O nome da aba da planilha (geralmente 'Sheet1')
   * @returns {Promise<Array>} - Uma promise que resolve para um array de objetos representando os produtos
   */
  static async getProductsFromSheet(sheetId, sheetName = 'Sheet1') {
    try {
      // URL para acessar a planilha como JSON
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
      
      const response = await axios.get(url);
      
      // Extrair os dados do formato específico do Google Sheets
      // A resposta vem como um texto que começa com "google.visualization.Query.setResponse("
      const jsonText = response.data.substring(
        response.data.indexOf('(') + 1,
        response.data.lastIndexOf(')')
      );
      
      const jsonData = JSON.parse(jsonText);
      
      // Extrair cabeçalhos e linhas
      const headers = jsonData.table.cols.map(col => col.label);
      const rows = jsonData.table.rows.map(row => row.c);
      
      // Converter para array de objetos
      const products = rows.map(row => {
        const product = {};
        headers.forEach((header, index) => {
          product[header.toLowerCase()] = row[index] ? row[index].v : '';
        });
        return product;
      });
      
      // Log para depuração
      console.log('Headers da planilha:', headers);
      console.log('Total de produtos carregados:', products.length);
      console.log('Categorias disponíveis:', [...new Set(products.map(p => p.categoria || p.category))]);
      
      return products;
    } catch (error) {
      console.error('Erro ao buscar dados da planilha:', error);
      throw error;
    }
  }
  
  /**
   * Método alternativo usando a API do Google Sheets (requer autenticação)
   * @param {string} sheetId - O ID da planilha do Google Sheets
   * @param {string} apiKey - Chave de API do Google
   * @param {string} range - Intervalo de células (ex: 'Sheet1!A1:E100')
   * @returns {Promise<Array>} - Uma promise que resolve para um array de objetos representando os produtos
   */
  static async getProductsWithAPI(sheetId, apiKey, range = 'Sheet1!A1:E100') {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
      
      const response = await axios.get(url);
      const rows = response.data.values;
      
      // O primeiro item contém os cabeçalhos
      const headers = rows[0];
      
      // Converter os dados em um array de objetos
      const products = rows.slice(1).map(row => {
        const product = {};
        headers.forEach((header, index) => {
          product[header] = row[index];
        });
        return product;
      });
      
      return products;
    } catch (error) {
      console.error('Erro ao buscar dados da planilha com API:', error);
      throw error;
    }
  }
  
  /**
   * Converte dados CSV em um array de objetos
   * @param {string} csvData - String contendo dados CSV
   * @returns {Array} - Array de objetos representando os produtos
   */
  static parseCSVData(csvData) {
    // Dividir as linhas
    const lines = csvData.split('\\n');
    
    // A primeira linha contém os cabeçalhos
    const headers = lines[0].split(',').map(header => 
      header.replace(/^"|"$/g, '') // Remover aspas
    );
    
    // Converter o resto das linhas em objetos
    return lines.slice(1).map(line => {
      // Lidar com vírgulas dentro de aspas
      const values = [];
      let inQuotes = false;
      let currentValue = '';
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.replace(/^"|"$/g, ''));
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      
      // Adicionar o último valor
      values.push(currentValue.replace(/^"|"$/g, ''));
      
      // Criar objeto com os cabeçalhos como chaves
      const product = {};
      headers.forEach((header, index) => {
        product[header] = values[index] || '';
      });
      
      return product;
    }).filter(product => Object.values(product).some(value => value.trim() !== ''));
  }
}

export default GoogleSheetsService;
