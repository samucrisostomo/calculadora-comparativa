import { TipoBem } from "./constants";

export interface ResultadoConsorcio {
  valorBem: number;
  lance: number;
  prazoMeses: number;
  taxaAdministrativaPercentual: number;
  valorComTaxa: number;
  parcelaMensal: number;
  custoTotal: number;
  totalPago: number;
  tipoBem: TipoBem;
}

export interface ResultadoFinanciamento {
  valorBem: number;
  entrada: number;
  prazoMeses: number;
  jurosAnuaisPercentual: number;
  valorFinanciado: number;
  parcelaMensal: number;
  custoTotal: number;
  totalPago: number;
  totalJuros: number;
  tipoBem: TipoBem;
}

export interface Comparacao {
  economia: number;
  percentualEconomia: number;
  diferencaParcela: number;
  percentualDiferencaParcela: number;
  consorcioMaisVantajoso: boolean;
}

/**
 * Calcula os valores do consórcio
 * @param valorBem - Valor do bem
 * @param lance - Valor do lance
 * @param prazoMeses - Prazo em meses
 * @param taxaAdministrativaೀ - Taxa administrativa em percentual
 * @param tipoBem - Tipo do bem ('carro' ou 'imovel')
 * @returns Resultado dos cálculos do consórcio
 */
export const calcularConsorcio = (
  valorBem: number,
  lance: number,
  prazoMeses: number,
  taxaAdministrativa: number,
  tipoBem: TipoBem = "carro"
): ResultadoConsorcio => {
  // 1. Aplica a taxa administrativa sobre o valor do bem
  const valorComTaxa = valorBem * (1 + taxaAdministrativa / 100);

  // 2. Deduz o lance do valor com taxas para calcular o valor a parcelar
  const valorAposLance = valorComTaxa - lance;

  // 3. Parcela mensal: (valor após lance) dividido pelo prazo
  const parcelaMensal = valorAposLance / prazoMeses;

  // 4. Custo total: (Parcela × Prazo) + Lance
  // Nota: parcelas + lance = valorComTaxa (mantém consistência matemática)
  const custoTotal = parcelaMensal * prazoMeses + lance;

  return {
    valorBem,
    lance,
    prazoMeses,
    taxaAdministrativaPercentual: taxaAdministrativa,
    valorComTaxa,
    parcelaMensal,
    custoTotal,
    totalPago: custoTotal,
    tipoBem,
  };
};

/**
 * Calcula os valores do financiamento usando Sistema Price (juros compostos)
 * @param valorBem - Valor do bem
 * @param entrada - Valor da entrada
 * @param prazoMeses - Prazo em meses
 * @param jurosAnuais - Juros anuais em percentual
 * @param tipoBem - Tipo do bem ('carro' ou 'imovel')
 * @returns Resultado dos cálculos do financiamento
 */
export const calcularFinanciamento = (
  valorBem: number,
  entrada: number,
  prazoMeses: number,
  jurosAnuais: number,
  tipoBem: TipoBem = "carro"
): ResultadoFinanciamento => {
  // Valor a ser financiado
  const valorFinanciado = valorBem - entrada;

  // 1. Converter juros anuais para taxa mensal (juros compostos)
  const taxaMensal = Math.pow(1 + jurosAnuais / 100, 1 / 12) - 1;

  // 2. Calcular fator de multiplicação
  const fator = Math.pow(1 + taxaMensal, prazoMeses);

  // 3. Calcular parcela usando fórmula Price
  const parcelaMensal = (valorFinanciado * (taxaMensal * fator)) / (fator - 1);

  // 4. Calcular totais
  const custoTotal = parcelaMensal * prazoMeses + entrada;
  const totalJuros = custoTotal - valorBem;

  return {
    valorBem,
    entrada,
    prazoMeses,
    jurosAnuaisPercentual: jurosAnuais,
    valorFinanciado,
    parcelaMensal,
    custoTotal,
    totalPago: custoTotal,
    totalJuros,
    tipoBem,
  };
};

/**
 * Compara os resultados do consórcio e financiamento
 * @param consorcio - Resultado do cálculo do consórcio
 * @param financiamento - Resultado do cálculo do financiamento
 * @returns Comparação entre as modalidades
 */
export const compararModalidades = (
  consorcio: ResultadoConsorcio,
  financiamento: ResultadoFinanciamento
): Comparacao => {
  const economia = financiamento.custoTotal - consorcio.custoTotal;
  const percentualEconomia = (economia / financiamento.custoTotal) * 100;

  const diferencaParcela =
    financiamento.parcelaMensal - consorcio.parcelaMensal;
  const percentualDiferencaParcela =
    (diferencaParcela / financiamento.parcelaMensal) * 100;

  return {
    economia,
    percentualEconomia,
    diferencaParcela,
    percentualDiferencaParcela,
    consorcioMaisVantajoso: economia > 0,
  };
};
