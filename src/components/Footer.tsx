import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative py-6 sm:py-8 mt-8 sm:mt-12 md:mt-16 overflow-hidden">
      {/* Overlay escuro para contraste */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-sm"></div>

      {/* Efeitos decorativos */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-float-1"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-green-500 rounded-full blur-3xl animate-float-2"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
              Sobre a Calculadora
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Esta ferramenta foi desenvolvida para ajudar você a comparar as
              vantagens financeiras entre consórcio e financiamento de forma
              clara e objetiva.
            </p>
          </div>

          {/* Vantagens do Consórcio */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
              Vantagens do Consórcio
            </h3>
            <ul className="text-gray-300 text-xs sm:text-sm space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Sem juros
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Parcelas fixas
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Menor custo total
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Flexibilidade de uso
              </li>
            </ul>
          </div>

          {/* Importante */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
              Importante
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Os cálculos são simulações baseadas nos dados fornecidos. Para
              informações precisas e personalizadas, consulte um especialista
              financeiro ou a administradora de consórcios de sua preferência.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-600/50 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            © {new Date().getFullYear()} Calculadora Comparativa. Desenvolvido
            para fins educacionais.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse-soft"></div>
            <div
              className="w-2 h-2 bg-green-400 rounded-full animate-pulse-soft"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-soft"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
