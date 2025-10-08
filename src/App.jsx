import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TipoSelector from "./components/TipoSelector";
import FormularioConsorcio from "./components/FormularioConsorcio";
import FormularioFinanciamento from "./components/FormularioFinanciamento";
import Resultados from "./components/Resultados";
import GraficoComparativo from "./components/GraficoComparativo";
import BotaoGerarPDF from "./components/BotaoGerarPDF";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Seletor de tipo de bem */}
        <TipoSelector tipoBem={tipoBem} setTipoBem={setTipoBem} />

        {/* Formulários lado a lado */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <FormularioConsorcio
            dados={dadosConsorcio}
            onChange={setDadosConsorcio}
            erros={errosConsorcio}
          />
          <FormularioFinanciamento
            dados={dadosFinanciamento}
            onChange={setDadosFinanciamento}
            erros={errosFinanciamento}
          />
        </div>

        {/* Botão Calcular */}
        <div className="text-center mb-8">
          <button
            onClick={handleCalcular}
            disabled={
              calculando ||
              temErros(errosConsorcio) ||
              temErros(errosFinanciamento)
            }
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {calculando ? "Calculando..." : "🧮 Calcular Comparação"}
          </button>
          {(temErros(errosConsorcio) || temErros(errosFinanciamento)) && (
            <p className="text-red-600 mt-3 font-semibold">
              ⚠️ Por favor, corrija os erros nos formulários acima
            </p>
          )}
        </div>

        {/* Loading */}
        {calculando && <Loading />}

        {/* Resultados */}
        {mostrarResultados && !calculando && (
          <div className="space-y-8 animate-fadeIn">
            <Resultados
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
          <div className="card mt-8 bg-gradient-to-r from-gray-50 to-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              💡 Por que o Consórcio pode ser mais vantajoso?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">
                  ✓ Sem Juros Abusivos
                </h4>
                <p className="text-gray-600 text-sm">
                  No consórcio você não paga juros compostos. As taxas são
                  transparentes e muito menores que os juros de financiamento.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-2">
                  ✓ Parcelas Fixas
                </h4>
                <p className="text-gray-600 text-sm">
                  As parcelas permanecem as mesmas do início ao fim, facilitando
                  o planejamento financeiro.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-2">
                  ✓ Economia Real
                </h4>
                <p className="text-gray-600 text-sm">
                  No final, você pode economizar milhares de reais em comparação
                  ao financiamento tradicional.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-2">
                  ✓ Flexibilidade
                </h4>
                <p className="text-gray-600 text-sm">
                  Possibilidade de dar lances para antecipar a contemplação e
                  usar o crédito quando precisar.
                </p>
              </div>
            </div>
          </div>
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
