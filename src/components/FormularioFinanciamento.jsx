import React from "react";
import { formatarMoeda } from "../utils/formatters";
import Tooltip from "./Tooltip";

const FormularioFinanciamento = ({ dados, onChange, erros = {} }) => {
  const handleChange = (campo, valor) => {
    onChange({ ...dados, [campo]: parseFloat(valor) || 0 });
  };

  return (
    <div className="card bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Financiamento</h2>
        <span className="text-3xl">🏦</span>
      </div>

      <div className="space-y-4">
        {/* Valor do Bem */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Valor do Bem *
            <Tooltip text="Valor total do bem que deseja adquirir" />
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">R$</span>
            <input
              type="number"
              value={dados.valorBem || ""}
              onChange={(e) => handleChange("valorBem", e.target.value)}
              className={`input-field pl-12 ${erros.valorBem ? "error" : ""}`}
              placeholder="0,00"
              min="0"
              step="1000"
            />
          </div>
          {erros.valorBem && (
            <p className="text-red-500 text-sm mt-1">{erros.valorBem}</p>
          )}
        </div>

        {/* Entrada */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Entrada *
            <Tooltip text="Valor da entrada inicial. Máximo 80% do valor do bem." />
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">R$</span>
            <input
              type="number"
              value={dados.entrada || ""}
              onChange={(e) => handleChange("entrada", e.target.value)}
              className={`input-field pl-12 ${erros.entrada ? "error" : ""}`}
              placeholder="0,00"
              min="0"
              step="1000"
            />
          </div>
          {erros.entrada && (
            <p className="text-red-500 text-sm mt-1">{erros.entrada}</p>
          )}
        </div>

        {/* Prazo */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Prazo (meses) *
            <Tooltip text="Período para pagamento do financiamento, entre 12 e 360 meses" />
          </label>
          <input
            type="number"
            value={dados.prazoMeses || ""}
            onChange={(e) => handleChange("prazoMeses", e.target.value)}
            className={`input-field ${erros.prazoMeses ? "error" : ""}`}
            placeholder="Ex: 60"
            min="12"
            max="360"
            step="12"
          />
          {erros.prazoMeses && (
            <p className="text-red-500 text-sm mt-1">{erros.prazoMeses}</p>
          )}
        </div>

        {/* Taxa de Juros */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Taxa de Juros Anual (%) *
            <Tooltip text="Taxa de juros anual aplicada ao financiamento" />
          </label>
          <div className="relative">
            <input
              type="number"
              value={dados.taxaAnual || ""}
              onChange={(e) => handleChange("taxaAnual", e.target.value)}
              className={`input-field pr-12 ${erros.taxaAnual ? "error" : ""}`}
              placeholder="12,00"
              min="0.1"
              max="50"
              step="0.1"
            />
            <span className="absolute right-3 top-2.5 text-gray-500">%</span>
          </div>
          {erros.taxaAnual && (
            <p className="text-red-500 text-sm mt-1">{erros.taxaAnual}</p>
          )}
        </div>

        {/* Informações adicionais */}
        <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-blue-800 mb-2">
            ℹ️ Sistema de Cálculo:
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Sistema Price (parcelas fixas)</li>
            <li>• Juros compostos mensais</li>
            <li>• Parcelas iguais durante todo período</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FormularioFinanciamento;
