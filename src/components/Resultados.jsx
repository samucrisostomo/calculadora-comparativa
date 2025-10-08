import React from "react";
import { formatarMoeda, formatarPercentual } from "../utils/formatters";

const Resultados = ({ consorcio, financiamento, comparacao }) => {
  if (!consorcio || !financiamento || !comparacao) {
    return null;
  }

  return (
    <div id="resultados" className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        📊 Resultados da Comparação
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Card Consórcio */}
        <div className="card bg-gradient-to-br from-green-50 to-white border-2 border-green-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-green-700">Consórcio</h3>
            <span className="text-4xl">🌱</span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-semibold text-gray-700">Valor do Bem:</span>
              <span className="text-lg font-bold text-gray-900">
                {formatarMoeda(consorcio.valorBem)}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-semibold text-gray-700">Lance:</span>
              <span className="text-lg font-bold text-gray-900">
                {formatarMoeda(consorcio.lance)}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-semibold text-gray-700">
                Parcela Mensal:
              </span>
              <span className="text-lg font-bold text-green-700">
                {formatarMoeda(consorcio.parcelaMensal)}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-semibold text-gray-700">Prazo:</span>
              <span className="text-lg font-bold text-gray-900">
                {consorcio.prazoMeses} meses
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-semibold text-gray-700">Taxa Admin.:</span>
              <span className="text-lg font-bold text-gray-900">
                {formatarMoeda(consorcio.taxaAdministrativa)}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-semibold text-gray-700">Comissão:</span>
              <span className="text-lg font-bold text-gray-900">
                {formatarMoeda(consorcio.comissao)}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-green-100 rounded-lg border-2 border-green-400 mt-4">
              <span className="font-bold text-gray-800 text-lg">
                Custo Total:
              </span>
              <span className="text-2xl font-bold text-green-700">
                {formatarMoeda(consorcio.custoTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Card Financiamento */}
        <div className="card bg-gradient-to-br from-blue-50 to-white border-2 border-blue-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-blue-700">Financiamento</h3>
            <span className="text-4xl">🏦</span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-semibold text-gray-700">Valor do Bem:</span>
              <span className="text-lg font-bold text-gray-900">
                {formatarMoeda(financiamento.valorBem)}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-semibold text-gray-700">Entrada:</span>
              <span className="text-lg font-bold text-gray-900">
                {formatarMoeda(financiamento.entrada)}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-semibold text-gray-700">
                Parcela Mensal:
              </span>
              <span className="text-lg font-bold text-blue-700">
                {formatarMoeda(financiamento.parcelaMensal)}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-semibold text-gray-700">Prazo:</span>
              <span className="text-lg font-bold text-gray-900">
                {financiamento.prazoMeses} meses
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-semibold text-gray-700">Taxa Anual:</span>
              <span className="text-lg font-bold text-gray-900">
                {formatarPercentual(financiamento.taxaAnual)}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-semibold text-gray-700">Total Juros:</span>
              <span className="text-lg font-bold text-red-600">
                {formatarMoeda(financiamento.totalJuros)}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-blue-100 rounded-lg border-2 border-blue-400 mt-4">
              <span className="font-bold text-gray-800 text-lg">
                Custo Total:
              </span>
              <span className="text-2xl font-bold text-blue-700">
                {formatarMoeda(financiamento.custoTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card de Economia */}
      {comparacao.consorcioMaisVantajoso && (
        <div className="card bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">
              🎉 Economia com Consórcio
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-6">
                <p className="text-lg mb-2">Você economiza:</p>
                <p className="text-5xl font-bold">
                  {formatarMoeda(comparacao.economia)}
                </p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-6">
                <p className="text-lg mb-2">Percentual de economia:</p>
                <p className="text-5xl font-bold">
                  {formatarPercentual(comparacao.percentualEconomia)}
                </p>
              </div>
            </div>
            <div className="mt-6 bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-lg">
                Parcela mensal{" "}
                {comparacao.diferencaParcela > 0 ? "menor" : "maior"} em{" "}
                <span className="font-bold">
                  {formatarMoeda(Math.abs(comparacao.diferencaParcela))}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resultados;
