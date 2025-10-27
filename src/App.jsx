import React, { useState, useEffect } from "react";
import HeaderModerno from "./components/HeaderModerno";
import TipoSelectorModerno from "./components/TipoSelectorModerno";
import FormularioModerno from "./components/FormularioModerno";
import ResultadosModernos from "./components/ResultadosModernos";
import BotaoGerarPDF from "./components/BotaoGerarPDF";
import Footer from "./components/Footer";
import LoadingModerno from "./components/LoadingModerno";
import MagicBackground from "./components/MagicBackground";
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
import { getConfig } from "./utils/constants";
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
    taxaAdministrativa: 15, // Taxa administrativa padrão
  });
  const [errosConsorcio, setErrosConsorcio] = useState({});

  // Estados para Financiamento
  const [dadosFinanciamento, setDadosFinanciamento] = useState({
    valorBem: 50000,
    entrada: 5000,
    prazoMeses: 60,
    jurosTotais: 20, // Juros totais padrão
  });
  const [errosFinanciamento, setErrosFinanciamento] = useState({});

  // Atualiza configurações quando o tipo de bem muda
  useEffect(() => {
    // Limpa resultados ao mudar o tipo
    setMostrarResultados(false);
  }, [tipoBem]);

  // Resultados
  const [resultadoConsorcio, setResultadoConsorcio] = useState(null);
  const [resultadoFinanciamento, setResultadoFinanciamento] = useState(null);
  const [comparacao, setComparacao] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Validação em tempo real (sem cálculo automático)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Apenas valida os campos, não calcula automaticamente
      const errosC = validarConsorcio(dadosConsorcio, tipoBem);
      setErrosConsorcio(errosC);

      const errosF = validarFinanciamento(dadosFinanciamento, tipoBem);
      setErrosFinanciamento(errosF);
    }, 500);

    return () => clearTimeout(timer);
  }, [dadosConsorcio, dadosFinanciamento, tipoBem]);

  const calcularResultados = () => {
    // Valida consórcio
    const errosC = validarConsorcio(dadosConsorcio, tipoBem);
    setErrosConsorcio(errosC);

    // Valida financiamento
    const errosF = validarFinanciamento(dadosFinanciamento, tipoBem);
    setErrosFinanciamento(errosF);

    // Se não houver erros, calcula
    if (!temErros(errosC) && !temErros(errosF)) {
      setCalculando(true);

      // Simula cálculo (para mostrar loading)
      setTimeout(() => {
        const resConsorcio = calcularConsorcio(
          dadosConsorcio.valorBem,
          dadosConsorcio.lance,
          dadosConsorcio.prazoMeses,
          dadosConsorcio.taxaAdministrativa,
          tipoBem
        );

        const resFinanciamento = calcularFinanciamento(
          dadosFinanciamento.valorBem,
          dadosFinanciamento.entrada,
          dadosFinanciamento.prazoMeses,
          dadosFinanciamento.jurosTotais,
          tipoBem
        );

        const comp = compararModalidades(resConsorcio, resFinanciamento);

        setResultadoConsorcio(resConsorcio);
        setResultadoFinanciamento(resFinanciamento);
        setComparacao(comp);
        setMostrarResultados(true);
        setCalculando(false);

        // Scroll suave para resultados
        setTimeout(() => {
          document.getElementById("resultados")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
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
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background mágico */}
      <MagicBackground />

      <HeaderModerno />

      <main className="flex-grow container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12 relative z-10">
        {/* Seletor de tipo de bem */}
        <TipoSelectorModerno tipoBem={tipoBem} setTipoBem={setTipoBem} />

        {/* Formulários lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="animate-slide-in" style={{ animationDelay: "0.1s" }}>
            <FormularioModerno
              tipo="consorcio"
              dados={dadosConsorcio}
              onChange={setDadosConsorcio}
              erros={errosConsorcio}
              cor="border-green-300"
              tipoBem={tipoBem}
            />
          </div>
          <div
            className="animate-slide-in-right"
            style={{ animationDelay: "0.2s" }}
          >
            <FormularioModerno
              tipo="financiamento"
              dados={dadosFinanciamento}
              onChange={setDadosFinanciamento}
              erros={errosFinanciamento}
              cor="border-blue-300"
              tipoBem={tipoBem}
            />
          </div>
        </div>

        {/* Botão Calcular */}
        <div
          className="text-center mb-8 sm:mb-10 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            onClick={handleCalcular}
            disabled={
              calculando ||
              temErros(errosConsorcio) ||
              temErros(errosFinanciamento)
            }
            size="lg"
            className="shimmer-button w-full sm:w-auto text-base sm:text-lg px-8 sm:px-12 h-14 sm:h-16 shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover-lift bg-gradient-to-r from-blue-600 via-green-600 to-purple-600"
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
            <p className="text-red-500 mt-4 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 animate-fade-in">
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
          <Card className="mt-8 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 animate-fade-in hover-lift bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl flex items-center gap-3 text-amber-900">
                <Lightbulb className="w-7 h-7 animate-pulse-soft text-yellow-600" />
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
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] hover-lift animate-fade-in"
                    style={{ animationDelay: `${0.1 * index}s` }}
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
