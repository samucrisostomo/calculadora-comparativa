import React from "react";
import { formatarMoeda } from "../utils/formatters";
import Tooltip from "./Tooltip";

const FormularioConsorcio = ({ dados, onChange, erros = {} }) => {
  const handleChange = (campo, valor) => {
    onChange({ ...dados, [campo]: parseFloat(valor) || 0 });
  };

  return (
    <div className="card bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-green-700">Consórcio</h2>
        <span className="text-3xl">🌱</span>
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

        {/* Lance */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Lance (Opcional)
            <Tooltip text="Valor que você dará de lance para antecipar a contemplação. Máximo 50% do valor do bem." />
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">R$</span>
            <input
              type="number"
              value={dados.lance || ""}
              onChange={(e) => handleChange("lance", e.target.value)}
              className={`input-field pl-12 ${erros.lance ? "error" : ""}`}
              placeholder="0,00"
              min="0"
              step="1000"
            />
          </div>
          {erros.lance && (
            <p className="text-red-500 text-sm mt-1">{erros.lance}</p>
          )}
        </div>

        {/* Prazo */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Prazo (meses) *
            <Tooltip text="Período para pagamento do consórcio, entre 12 e 360 meses" />
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

        {/* Informações adicionais */}
        <div className="bg-green-100 border border-green-300 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-green-800 mb-2">
            ℹ️ Taxas Aplicadas:
          </h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Taxa administrativa: 1,5% ao ano</li>
            <li>• Comissão: 2% do valor do bem</li>
            <li>• Parcelas fixas durante todo o período</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FormularioConsorcio;
