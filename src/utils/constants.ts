/**
 * Constantes e Configurações do Sistema
 * Definições específicas para cada tipo de bem (Carro e Imóvel)
 */

export const TIPOS_BEM = {
  CARRO: "carro",
  IMOVEL: "imovel",
} as const;

export type TipoBem = (typeof TIPOS_BEM)[keyof typeof TIPOS_BEM];

export interface ConfigTipoBem {
  prazoMaximoMeses: number;
  valorMaximoSugerido: number;
  labels: {
    valorBem: string;
    placeholderValor: string;
    descricao: string;
  };
}

export const CONFIG_POR_TIPO: Record<TipoBem, ConfigTipoBem> = {
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
 * @param tipoBem - 'carro' ou 'imovel'
 * @returns Configuração do tipo de bem
 */
export const getConfig = (tipoBem: TipoBem): ConfigTipoBem => {
  return CONFIG_POR_TIPO[tipoBem] || CONFIG_POR_TIPO[TIPOS_BEM.CARRO];
};

export interface LimitesCalculados {
  prazoMaximo: number;
  valorMaximo: number;
}

/**
 * Calcula os limites baseados no valor do bem e tipo
 * @param valorBem - Valor do bem
 * @param tipoBem - 'carro' ou 'imovel'
 * @returns Limites calculados
 */
export const calcularLimites = (
  valorBem: number,
  tipoBem: TipoBem
): LimitesCalculados => {
  const config = getConfig(tipoBem);

  return {
    prazoMaximo: config.prazoMaximoMeses,
    valorMaximo: config.valorMaximoSugerido,
  };
};
