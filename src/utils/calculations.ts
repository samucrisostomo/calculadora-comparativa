import { TipoBem } from "./constants";

export interface ResultadoConsorcio {
  valorBem: number;
  lance: number;
  prazoMeses: number;
  taxaAdministrativaPercentual: number;
  valorComTaxa: number;
  parcelaMensal: number;
  parcelaInicial: number;
  parcelaFinal: number;
  custoTotal: number;
  totalPago: number;
  tipoBem: TipoBem;
}

export interface ResultadoFinanciamento {
  valorBem: number;
  entrada: number;
  prazoMeses: number;
  jurosTotaisPercentual: number;
  valorFinanciado: number;
  valorComJuros: number;
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
  // Aplica a taxa administrativa sobre o valor do bem
  const valorComTaxa = valorBem * (1 + taxaAdministrativa / 100);

  // Parcela mensal: (valor com taxa) dividido pelo prazo
  const parcelaMensal = valorComTaxa / prazoMeses;

  // Custo total: (Parcela × Prazo) + Lance
  const custoTotal = parcelaMensal * prazoMeses + lance;

  return {
    valorBem,
    lance,
    prazoMeses,
    taxaAdministrativaPercentual: taxaAdministrativa,
    valorComTaxa,
    parcelaMensal,
    parcelaInicial: parcelaMensal,
    parcelaFinal: parcelaMensal,
    custoTotal,
    totalPago: custoTotal,
    tipoBem,
  };
};

/**
 * Calcula os valores do financiamento
 * @param valorBem - Valor do bem
 * @param entrada - Valor da entrada
 * @param prazoMeses - Prazo em meses
 * @param jurosTotais - Juros totais em percentual sobre o valor financiado
 * @param tipoBem - Tipo do bem ('carro' ou 'imovel')
 * @returns Resultado dos cálculos do financiamento
 */
export const calcularFinanciamento = (
  valorBem: number,
  entrada: number,
  prazoMeses: number,
  jurosTotais: number,
  tipoBem: TipoBem = "carro"
): ResultadoFinanciamento => {
  // Valor a ser financiado
  const valorFinanciado = valorBem - entrada;

  // Aplica os juros totais sobre o valor financiado
  const valorComJuros = valorFinanciado * (1 + jurosTotais / 100);

  // Parcela mensal: valor com juros dividido pelo prazo
  const parcelaMensal = valorComJuros / prazoMeses;

  // Total de juros pagos
  const totalJuros = valorComJuros - valorFinanciado;

  // Custo total: (Parcela × Prazo) + Entrada
  const custoTotal = parcelaMensal * prazoMeses + entrada;

  return {
    valorBem,
    entrada,
    prazoMeses,
    jurosTotaisPercentual: jurosTotais,
    valorFinanciado,
    valorComJuros,
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
