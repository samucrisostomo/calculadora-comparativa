import { getConfig, calcularLimites, TipoBem } from "./constants";

export interface Erros {
  [key: string]: string;
}

export interface DadosConsorcio {
  valorBem?: number;
  lance?: number;
  prazoMeses?: number;
  taxaAdministrativa?: number;
}

export interface DadosFinanciamento {
  valorBem?: number;
  entrada?: number;
  prazoMeses?: number;
  jurosAnuais?: number;
}

/**
 * Valida os campos do consórcio
 * @param data - Dados a serem validados
 * @param tipoBem - Tipo do bem ('carro' ou 'imovel')
 * @returns Objeto com erros encontrados
 */
export const validarConsorcio = (
  data: DadosConsorcio,
  tipoBem: TipoBem = "carro"
): Erros => {
  const erros: Erros = {};
  const config = getConfig(tipoBem);

  // Valor do bem
  if (!data.valorBem || data.valorBem <= 0) {
    erros.valorBem = "Valor do bem é obrigatório e deve ser maior que zero";
  } else if (data.valorBem < 1000) {
    erros.valorBem = "Valor do bem deve ser no mínimo R$ 1.000,00";
  } else if (data.valorBem > config.valorMaximoSugerido) {
    erros.valorBem = `Valor sugerido máximo é R$ ${config.valorMaximoSugerido.toLocaleString(
      "pt-BR"
    )}`;
  }

  // Lance
  if (data.lance !== undefined && data.lance < 0) {
    erros.lance = "Lance não pode ser negativo";
  } else if (
    data.valorBem &&
    data.lance !== undefined &&
    data.lance >= data.valorBem
  ) {
    erros.lance = "Lance deve ser menor que o valor do bem";
  }

  // Prazo
  if (!data.prazoMeses || data.prazoMeses <= 0) {
    erros.prazoMeses = "Prazo é obrigatório e deve ser maior que zero";
  } else if (data.prazoMeses < 12) {
    erros.prazoMeses = "Prazo mínimo é de 12 meses";
  } else if (data.prazoMeses > config.prazoMaximoMeses) {
    erros.prazoMeses = `Prazo máximo é de ${config.prazoMaximoMeses} meses`;
  }

  // Taxa Administrativa
  if (!data.taxaAdministrativa || data.taxaAdministrativa < 0) {
    erros.taxaAdministrativa =
      "Taxa administrativa é obrigatória e não pode ser negativa";
  } else if (data.taxaAdministrativa > 100) {
    erros.taxaAdministrativa =
      "Taxa administrativa não pode ser maior que 100%";
  }

  return erros;
};

/**
 * Valida os campos do financiamento
 * @param data - Dados a serem validados
 * @param tipoBem - Tipo do bem ('carro' ou 'imovel')
 * @returns Objeto com erros encontrados
 */
export const validarFinanciamento = (
  data: DadosFinanciamento,
  tipoBem: TipoBem = "carro"
): Erros => {
  const erros: Erros = {};
  const config = getConfig(tipoBem);

  // Valor do bem
  if (!data.valorBem || data.valorBem <= 0) {
    erros.valorBem = "Valor do bem é obrigatório e deve ser maior que zero";
  } else if (data.valorBem < 1000) {
    erros.valorBem = "Valor do bem deve ser no mínimo R$ 1.000,00";
  } else if (data.valorBem > config.valorMaximoSugerido) {
    erros.valorBem = `Valor sugerido máximo é R$ ${config.valorMaximoSugerido.toLocaleString(
      "pt-BR"
    )}`;
  }

  // Entrada
  if (data.entrada !== undefined && data.entrada < 0) {
    erros.entrada = "Entrada não pode ser negativa";
  } else if (
    data.valorBem &&
    data.entrada !== undefined &&
    data.entrada >= data.valorBem
  ) {
    erros.entrada = "Entrada deve ser menor que o valor do bem";
  }

  // Prazo
  if (!data.prazoMeses || data.prazoMeses <= 0) {
    erros.prazoMeses = "Prazo é obrigatório e deve ser maior que zero";
  } else if (data.prazoMeses < 12) {
    erros.prazoMeses = "Prazo mínimo é de 12 meses";
  } else if (data.prazoMeses > config.prazoMaximoMeses) {
    erros.prazoMeses = `Prazo máximo é de ${config.prazoMaximoMeses} meses`;
  }

  // Juros Anuais
  if (data.jurosAnuais === undefined || data.jurosAnuais < 0) {
    erros.jurosAnuais =
      "Juros anuais são obrigatórios e não podem ser negativos";
  } else if (data.jurosAnuais > 50) {
    erros.jurosAnuais = "Juros anuais não podem ser maiores que 50%";
  }

  return erros;
};

/**
 * Verifica se há erros de validação
 * @param erros - Objeto de erros
 * @returns True se há erros
 */
export const temErros = (erros: Erros): boolean => {
  return Object.keys(erros).length > 0;
};
