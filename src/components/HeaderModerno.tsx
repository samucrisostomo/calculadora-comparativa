import React from "react";
import { Calculator, ArrowDown, CheckCircle2 } from "lucide-react";

const HeaderModerno: React.FC = () => {
  return (
    <header className="relative overflow-hidden">
      {/* Overlay gradiente simplificado */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700/70 via-purple-700/70 to-indigo-700/70"></div>

      {/* Elementos decorativos sutis */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-10 md:py-12 relative z-10">
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">

          {/* Título */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
              Calculadora Comparativa
            </h1>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl">
              Compare{" "}
              <span className="font-semibold text-green-300">Consórcio</span> e{" "}
              <span className="font-semibold text-blue-300">Financiamento</span>{" "}
              e escolha a melhor opção financeira
            </p>
          </div>

          {/* Indicadores rápidos */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80">
              <CheckCircle2 className="w-4 h-4 text-green-300" />
              <span>Sem juros compostos</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80">
              <CheckCircle2 className="w-4 h-4 text-blue-300" />
              <span>Comparação automática</span>
            </div>
          </div>

          {/* Call to action */}
          <div className="pt-4 animate-bounce-slow">
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs sm:text-sm text-white/70 font-medium">
                Preencha os dados abaixo para calcular
              </p>
              <ArrowDown className="w-5 h-5 text-white/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Onda decorativa simplificada na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-6 sm:h-10"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C300,40 600,80 900,50 C1050,35 1150,55 1200,40 L1200,100 L0,100 Z"
            className="fill-gray-900"
          ></path>
        </svg>
      </div>
    </header>
  );
};

export default HeaderModerno;
