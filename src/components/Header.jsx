import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-6 sm:py-8 md:py-12 shadow-lg">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2 sm:mb-3 md:mb-4">
          Calculadora Comparativa
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center text-blue-50 max-w-3xl mx-auto px-2">
          Compare e descubra as vantagens financeiras entre Consórcio e
          Financiamento
        </p>
      </div>
    </header>
  );
};

export default Header;
