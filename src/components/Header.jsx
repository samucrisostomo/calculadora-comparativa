import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-12 shadow-lg">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Calculadora Comparativa
        </h1>
        <p className="text-xl text-center text-blue-50 max-w-3xl mx-auto">
          Compare e descubra as vantagens financeiras entre Consórcio e
          Financiamento
        </p>
      </div>
    </header>
  );
};

export default Header;
