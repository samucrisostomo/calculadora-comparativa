/**
 * Formata valor para moeda brasileira (R$)
 * @param {number} valor - Valor a ser formatado
 * @returns {string} Valor formatado
 */
export const formatarMoeda = (valor) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
};

/**
 * Formata percentual
 * @param {number} valor - Valor a ser formatado
 * @returns {string} Valor formatado
 */
export const formatarPercentual = (valor) => {
  return `${valor.toFixed(2)}%`;
};

/**
 * Formata número com separadores de milhares
 * @param {number} valor - Valor a ser formatado
 * @returns {string} Valor formatado
 */
export const formatarNumero = (valor) => {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
};

/**
 * Remove formatação de moeda e retorna número
 * @param {string} valor - Valor formatado
 * @returns {number} Valor numérico
 */
export const removerFormatacaoMoeda = (valor) => {
  if (typeof valor === "number") return valor;
  return parseFloat(valor.replace(/[^\d,-]/g, "").replace(",", ".")) || 0;
};

/**
 * Formata data e hora
 * @param {Date} data - Data a ser formatada
 * @returns {string} Data formatada
 */
export const formatarDataHora = (data = new Date()) => {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(data);
};
