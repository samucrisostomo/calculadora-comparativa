import { getConfig } from "./constants";

/**
 * Calcula os valores do consórcio
 * @param {number} valorBem - Valor do bem
 * @param {number} lance - Valor do lance
 * @param {number} prazoMeses - Prazo em meses
 * @param {number} taxaAdministrativa - Taxa administrativa em percentual
 * @param {string} tipoBem - Tipo do bem ('carro' ou 'imovel')
 * @returns {object} Resultado dos cálculos do consórcio
 */
export const calcularConsorcio = (
  valorBem,
  lance,
  prazoMeses,
  taxaAdministrativa,
  tipoBem = "carro"
) => {
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
 * @param {number} valorBem - Valor do bem
 * @param {number} entrada - Valor da entrada
 * @param {number} prazoMeses - Prazo em meses
 * @param {number} jurosTotais - Juros totais em percentual sobre o valor financiado
 * @param {string} tipoBem - Tipo do bem ('carro' ou 'imovel')
 * @returns {object} Resultado dos cálculos do financiamento
 */
export const calcularFinanciamento = (
  valorBem,
  entrada,
  prazoMeses,
  jurosTotais,
  tipoBem = "carro"
) => {
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
 * @param {object} consorcio - Resultado do cálculo do consórcio
 * @param {object} financiamento - Resultado do cálculo do financiamento
 * @returns {object} Comparação entre as modalidades
 */
export const compararModalidades = (consorcio, financiamento) => {
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
