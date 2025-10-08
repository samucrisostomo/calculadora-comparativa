import React from "react";

const TipoSelector = ({ tipoBem, setTipoBem }) => {
  return (
    <div className="card mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">
        Tipo de Bem
      </h2>
      <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row">
        <button
          onClick={() => setTipoBem("carro")}
          className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold transition-all duration-200 text-base sm:text-lg ${
            tipoBem === "carro"
              ? "bg-blue-600 text-white shadow-lg scale-105"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300"
          }`}
        >
          🚗 Carro
        </button>
        <button
          onClick={() => setTipoBem("imovel")}
          className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold transition-all duration-200 text-base sm:text-lg ${
            tipoBem === "imovel"
              ? "bg-blue-600 text-white shadow-lg scale-105"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300"
          }`}
        >
          🏠 Imóvel
        </button>
      </div>
    </div>
  );
};

export default TipoSelector;
