/**
 * Calcula os valores do consórcio
 * @param {number} valorBem - Valor do bem
 * @param {number} lance - Valor do lance
 * @param {number} prazoMeses - Prazo em meses
 * @returns {object} Resultado dos cálculos do consórcio
 */
export const calcularConsorcio = (valorBem, lance, prazoMeses) => {
  // Taxa administrativa: 1.5% ao ano sobre o valor do bem
  const taxaAdministrativa = valorBem * 0.015;

  // Comissão: 2% sobre o valor total do consórcio
  const comissao = valorBem * 0.02;

  // Valor a ser financiado (valor do bem menos o lance)
  const valorFinanciado = valorBem - lance;

  // Parcela mensal (fixa)
  const parcelaMensal = valorFinanciado / prazoMeses;

  // Custo total: (Parcela × Prazo) + Lance + Taxas + Comissão
  const custoTotal =
    parcelaMensal * prazoMeses + lance + taxaAdministrativa + comissao;

  return {
    valorBem,
    lance,
    prazoMeses,
    taxaAdministrativa,
    comissao,
    valorFinanciado,
    parcelaMensal,
    parcelaInicial: parcelaMensal,
    parcelaFinal: parcelaMensal,
    custoTotal,
    totalPago: custoTotal,
  };
};

/**
 * Calcula os valores do financiamento usando Sistema Price
 * @param {number} valorBem - Valor do bem
 * @param {number} entrada - Valor da entrada
 * @param {number} prazoMeses - Prazo em meses
 * @param {number} taxaAnual - Taxa de juros anual em percentual
 * @returns {object} Resultado dos cálculos do financiamento
 */
export const calcularFinanciamento = (
  valorBem,
  entrada,
  prazoMeses,
  taxaAnual
) => {
  // Valor a ser financiado
  const valorFinanciado = valorBem - entrada;

  // Converte taxa anual para mensal
  const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;

  // Calcula parcela usando Sistema Price (PMT)
  // PMT = PV × [i(1+i)^n]/[(1+i)^n-1]
  const fatorPrice = Math.pow(1 + taxaMensal, prazoMeses);
  const parcelaMensal =
    (valorFinanciado * (taxaMensal * fatorPrice)) / (fatorPrice - 1);

  // Custo total: (Parcela × Prazo) + Entrada
  const custoTotal = parcelaMensal * prazoMeses + entrada;

  // Total de juros pagos
  const totalJuros = custoTotal - valorBem;

  return {
    valorBem,
    entrada,
    prazoMeses,
    taxaAnual,
    taxaMensal: taxaMensal * 100,
    valorFinanciado,
    parcelaMensal,
    custoTotal,
    totalPago: custoTotal,
    totalJuros,
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
