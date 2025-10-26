/**
 * Constantes e Configurações do Sistema
 * Definições específicas para cada tipo de bem (Carro e Imóvel)
 */

export const TIPOS_BEM = {
  CARRO: "carro",
  IMOVEL: "imovel",
};

export const CONFIG_POR_TIPO = {
  [TIPOS_BEM.CARRO]: {
    // Limites
    prazoMaximoMeses: 60, // 5 anos
    valorMaximoSugerido: 300000, // R$ 300.000

    // Labels e Placeholders
    labels: {
      valorBem: "Valor do Veículo",
      placeholderValor: "Ex: 50.000",
      descricao: "Consórcio ou Financiamento de Veículo",
    },
  },

  [TIPOS_BEM.IMOVEL]: {
    // Limites
    prazoMaximoMeses: 360, // 30 anos
    valorMaximoSugerido: 2000000, // R$ 2.000.000

    // Labels e Placeholders
    labels: {
      valorBem: "Valor do Imóvel",
      placeholderValor: "Ex: 500.000",
      descricao: "Consórcio ou Financiamento Imobiliário",
    },
  },
};

/**
 * Obtém a configuração para um tipo de bem específico
 * @param {string} tipoBem - 'carro' ou 'imovel'
 * @returns {object} Configuração do tipo de bem
 */
export const getConfig = (tipoBem) => {
  return CONFIG_POR_TIPO[tipoBem] || CONFIG_POR_TIPO[TIPOS_BEM.CARRO];
};

/**
 * Calcula os limites baseados no valor do bem e tipo
 * @param {number} valorBem - Valor do bem
 * @param {string} tipoBem - 'carro' ou 'imovel'
 * @returns {object} Limites calculados
 */
export const calcularLimites = (valorBem, tipoBem) => {
  const config = getConfig(tipoBem);

  return {
    prazoMaximo: config.prazoMaximoMeses,
    valorMaximo: config.valorMaximoSugerido,
  };
};
