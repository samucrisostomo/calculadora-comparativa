/**
 * Formata valor para moeda brasileira (R$)
 * @param valor - Valor a ser formatado
 * @returns Valor formatado
 */
export const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
};

/**
 * Formata percentual
 * @param valor - Valor a ser formatado
 * @returns Valor formatado
 */
export const formatarPercentual = (valor: number): string => {
  return `${valor.toFixed(2)}%`;
};

/**
 * Formata número com separadores de milhares
 * @param valor - Valor a ser formatado
 * @returns Valor formatado
 */
export const formatarNumero = (valor: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
};

/**
 * Remove formatação de moeda e retorna número
 * @param valor - Valor formatado
 * @returns Valor numérico
 */
export const removerFormatacaoMoeda = (valor: string | number): number => {
  if (typeof valor === "number") return valor;
  return parseFloat(valor.replace(/[^\d,-]/g, "").replace(",", ".")) || 0;
};

/**
 * Formata data e hora
 * @param data - Data a ser formatada (padrão: agora)
 * @returns Data formatada
 */
export const formatarDataHora = (data: Date = new Date()): string => {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(data);
};
