import React from "react";

const TipoSelector = ({ tipoBem, setTipoBem }) => {
  return (
    <div className="card mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Tipo de Bem</h2>
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => setTipoBem("carro")}
          className={`flex-1 min-w-[150px] py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${
            tipoBem === "carro"
              ? "bg-blue-600 text-white shadow-lg scale-105"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          🚗 Carro
        </button>
        <button
          onClick={() => setTipoBem("imovel")}
          className={`flex-1 min-w-[150px] py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${
            tipoBem === "imovel"
              ? "bg-blue-600 text-white shadow-lg scale-105"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          🏠 Imóvel
        </button>
      </div>
    </div>
  );
};

export default TipoSelector;
