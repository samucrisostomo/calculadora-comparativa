import React, { useState, useEffect } from "react";
import HeaderModerno from "./components/HeaderModerno";
import TipoSelectorModerno from "./components/TipoSelectorModerno";
import FormularioModerno from "./components/FormularioModerno";
import ResultadosModernos from "./components/ResultadosModernos";
import GraficoComparativo from "./components/GraficoComparativo";
import BotaoGerarPDF from "./components/BotaoGerarPDF";
import Footer from "./components/Footer";
import LoadingModerno from "./components/LoadingModerno";
import { Button } from "./components/ui/button";
import {
  calcularConsorcio,
  calcularFinanciamento,
  compararModalidades,
} from "./utils/calculations";
import {
  validarConsorcio,
  validarFinanciamento,
  temErros,
} from "./utils/validations";
import {
  Calculator,
  Loader2,
  AlertCircle,
  Lightbulb,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

function App() {
  const [tipoBem, setTipoBem] = useState("carro");
  const [calculando, setCalculando] = useState(false);

  // Estados para Consórcio
  const [dadosConsorcio, setDadosConsorcio] = useState({
    valorBem: 50000,
    lance: 5000,
    prazoMeses: 60,
  });
  const [errosConsorcio, setErrosConsorcio] = useState({});

  // Estados para Financiamento
  const [dadosFinanciamento, setDadosFinanciamento] = useState({
    valorBem: 50000,
    entrada: 5000,
    prazoMeses: 60,
    taxaAnual: 12,
  });
  const [errosFinanciamento, setErrosFinanciamento] = useState({});

  // Resultados
  const [resultadoConsorcio, setResultadoConsorcio] = useState(null);
  const [resultadoFinanciamento, setResultadoFinanciamento] = useState(null);
  const [comparacao, setComparacao] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Validação e cálculo em tempo real (com debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      calcularResultados();
    }, 500);

    return () => clearTimeout(timer);
  }, [dadosConsorcio, dadosFinanciamento]);

  const calcularResultados = () => {
    // Valida consórcio
    const errosC = validarConsorcio(dadosConsorcio);
    setErrosConsorcio(errosC);

    // Valida financiamento
    const errosF = validarFinanciamento(dadosFinanciamento);
    setErrosFinanciamento(errosF);

    // Se não houver erros, calcula
    if (!temErros(errosC) && !temErros(errosF)) {
      setCalculando(true);

      // Simula cálculo (para mostrar loading)
      setTimeout(() => {
        const resConsorcio = calcularConsorcio(
          dadosConsorcio.valorBem,
          dadosConsorcio.lance,
          dadosConsorcio.prazoMeses
        );

        const resFinanciamento = calcularFinanciamento(
          dadosFinanciamento.valorBem,
          dadosFinanciamento.entrada,
          dadosFinanciamento.prazoMeses,
          dadosFinanciamento.taxaAnual
        );

        const comp = compararModalidades(resConsorcio, resFinanciamento);

        setResultadoConsorcio(resConsorcio);
        setResultadoFinanciamento(resFinanciamento);
        setComparacao(comp);
        setMostrarResultados(true);
        setCalculando(false);

        // Scroll suave para resultados
        if (mostrarResultados) {
          setTimeout(() => {
            document.getElementById("resultados")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 100);
        }
      }, 300);
    } else {
      setMostrarResultados(false);
    }
  };

  const handleCalcular = () => {
    calcularResultados();

    if (
      mostrarResultados &&
      !temErros(errosConsorcio) &&
      !temErros(errosFinanciamento)
    ) {
      setTimeout(() => {
        document.getElementById("resultados")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50/30">
      <HeaderModerno />

      <main className="flex-grow container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        {/* Seletor de tipo de bem */}
        <TipoSelectorModerno tipoBem={tipoBem} setTipoBem={setTipoBem} />

        {/* Formulários lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <FormularioModerno
            tipo="consorcio"
            dados={dadosConsorcio}
            onChange={setDadosConsorcio}
            erros={errosConsorcio}
            cor="border-green-300"
          />
          <FormularioModerno
            tipo="financiamento"
            dados={dadosFinanciamento}
            onChange={setDadosFinanciamento}
            erros={errosFinanciamento}
            cor="border-blue-300"
          />
        </div>

        {/* Botão Calcular */}
        <div className="text-center mb-8 sm:mb-10">
          <Button
            onClick={handleCalcular}
            disabled={
              calculando ||
              temErros(errosConsorcio) ||
              temErros(errosFinanciamento)
            }
            size="lg"
            className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-12 h-14 sm:h-16 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            {calculando ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Calculando...
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-5 w-5" />
                Calcular Comparação
              </>
            )}
          </Button>
          {(temErros(errosConsorcio) || temErros(errosFinanciamento)) && (
            <p className="text-red-600 mt-4 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 animate-fade-in">
              <AlertCircle className="w-5 h-5" />
              Por favor, corrija os erros nos formulários acima
            </p>
          )}
        </div>

        {/* Loading */}
        {calculando && <LoadingModerno />}

        {/* Resultados */}
        {mostrarResultados && !calculando && (
          <div className="space-y-8 sm:space-y-10">
            <ResultadosModernos
              consorcio={resultadoConsorcio}
              financiamento={resultadoFinanciamento}
              comparacao={comparacao}
            />

            <GraficoComparativo
              consorcio={resultadoConsorcio}
              financiamento={resultadoFinanciamento}
            />

            <BotaoGerarPDF
              consorcio={resultadoConsorcio}
              financiamento={resultadoFinanciamento}
              comparacao={comparacao}
              tipoBem={tipoBem}
            />
          </div>
        )}

        {/* Informações adicionais */}
        {mostrarResultados && (
          <Card className="mt-8 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl flex items-center gap-3 text-amber-900">
                <Lightbulb className="w-7 h-7" />
                Por que o Consórcio pode ser mais vantajoso?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  {
                    title: "Sem Juros Abusivos",
                    desc: "No consórcio você não paga juros compostos. As taxas são transparentes e muito menores.",
                  },
                  {
                    title: "Parcelas Fixas",
                    desc: "As parcelas permanecem as mesmas do início ao fim, facilitando o planejamento financeiro.",
                  },
                  {
                    title: "Economia Real",
                    desc: "No final, você pode economizar milhares de reais em comparação ao financiamento tradicional.",
                  },
                  {
                    title: "Flexibilidade",
                    desc: "Possibilidade de dar lances para antecipar a contemplação e usar o crédito quando precisar.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
                  >
                    <h4 className="font-bold text-green-700 mb-2 text-sm sm:text-base flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
