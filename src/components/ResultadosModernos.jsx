import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { formatarMoeda, formatarPercentual } from "../utils/formatters";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  PiggyBank,
  Zap,
  Sparkles,
  ArrowDown,
  Sprout,
  Building2,
  BarChart3,
  Check,
} from "lucide-react";

const ResultadosModernos = ({ consorcio, financiamento, comparacao }) => {
  if (!consorcio || !financiamento || !comparacao) {
    return null;
  }

  const ItemResultado = ({ label, valor, icon: Icon, destaque = false }) => (
    <div
      className={`flex justify-between items-center p-3 rounded-lg transition-all hover:scale-[1.02] border ${
        destaque
          ? "bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/30"
          : "bg-gray-800/50 border-gray-700/50"
      }`}
    >
      <span className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-300">
        <Icon className="w-4 h-4 text-gray-400" />
        {label}
      </span>
      <span
        className={`text-sm sm:text-lg font-bold ${
          destaque ? "text-blue-400" : "text-gray-100"
        }`}
      >
        {valor}
      </span>
    </div>
  );

  const valorTaxaAdministrativa = Math.max(
    (consorcio?.valorComTaxa || 0) - (consorcio?.valorBem || 0),
    0
  );

  return (
    <div id="resultados" className="space-y-6 sm:space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
          <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
          <span className="bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent p-2 rounded-md">
            Resultados da Comparação
          </span>
          <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
        </h2>
        <p className="text-gray-300">Análise detalhada das duas modalidades</p>
      </div>

      {/* Card de Economia Destacado */}
      {comparacao.consorcioMaisVantajoso && (
        <Card className="border-4 border-green-500 bg-gradient-to-br from-green-50 via-white to-green-50 shadow-2xl animate-bounce-in hover-lift animate-glow">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <PiggyBank className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-green-700 flex items-center justify-center gap-2">
              <Zap className="w-6 h-6" />
              Você Economiza com Consórcio!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition-all">
                <p className="text-gray-600 mb-2 flex items-center justify-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Economia Total
                </p>
                <p className="text-4xl sm:text-5xl font-bold text-green-600">
                  {formatarMoeda(comparacao.economia)}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition-all">
                <p className="text-gray-600 mb-2 flex items-center justify-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Percentual
                </p>
                <p className="text-4xl sm:text-5xl font-bold text-green-600">
                  {formatarPercentual(comparacao.percentualEconomia)}
                </p>
              </div>
            </div>
            <div className="mt-4 bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-4 text-center">
              <p className="text-sm sm:text-base text-green-800 font-semibold flex items-center justify-center gap-2">
                <ArrowDown className="w-5 h-5" />
                Parcela mensal{" "}
                {formatarMoeda(Math.abs(comparacao.diferencaParcela))} menor
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cards de Comparação */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Card Consórcio */}
        <Card className="border-2 border-green-400/50 hover:border-green-500/80 hover:shadow-2xl transition-all duration-300 animate-slide-in hover-lift bg-gradient-to-br from-green-950/50 via-gray-800/90 to-gray-900/90 backdrop-blur-md shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-600/20 to-transparent border-b border-green-500/30">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl sm:text-2xl text-green-400 font-bold flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Sprout className="w-6 h-6 text-green-400" />
                </div>
                Consórcio
              </CardTitle>
              <Badge
                variant="secondary"
                className="text-sm bg-green-600/20 text-green-300 border-green-500/30"
              >
                Economia
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-6">
            <ItemResultado
              label="Valor do Bem"
              valor={formatarMoeda(consorcio.valorBem)}
              icon={DollarSign}
            />
            <ItemResultado
              label="Lance"
              valor={formatarMoeda(consorcio.lance)}
              icon={TrendingUp}
            />
            <ItemResultado
              label="Parcela Mensal"
              valor={formatarMoeda(consorcio.parcelaMensal)}
              icon={Calendar}
              destaque
            />
            <ItemResultado
              label="Prazo"
              valor={`${consorcio.prazoMeses} meses`}
              icon={Calendar}
            />
            <ItemResultado
              label="Taxa Administrativa"
              valor={formatarPercentual(consorcio.taxaAdministrativaPercentual)}
              icon={TrendingUp}
            />
            <ItemResultado
              label="Valor Taxa"
              valor={formatarMoeda(valorTaxaAdministrativa)}
              icon={Sparkles}
            />

            <Separator className="my-4 border-gray-700" />

            <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/40 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-base sm:text-lg font-bold text-green-300">
                  Custo Total
                </span>
                <span className="text-xl sm:text-2xl font-bold text-green-400">
                  {formatarMoeda(consorcio.custoTotal)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Financiamento */}
        <Card
          className="border-2 border-blue-400/50 hover:border-blue-500/80 hover:shadow-2xl transition-all duration-300 animate-slide-in hover-lift bg-gradient-to-br from-blue-950/50 via-gray-800/90 to-gray-900/90 backdrop-blur-md shadow-xl"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader className="bg-gradient-to-r from-blue-600/20 to-transparent border-b border-blue-500/30">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl sm:text-2xl text-blue-400 font-bold flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-400" />
                </div>
                Financiamento
              </CardTitle>
              <Badge
                variant="default"
                className="text-sm bg-blue-600/20 text-blue-300 border-blue-500/30"
              >
                Tradicional
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-6">
            <ItemResultado
              label="Valor do Bem"
              valor={formatarMoeda(financiamento.valorBem)}
              icon={DollarSign}
            />
            <ItemResultado
              label="Entrada"
              valor={formatarMoeda(financiamento.entrada)}
              icon={DollarSign}
            />
            <ItemResultado
              label="Parcela Mensal"
              valor={formatarMoeda(financiamento.parcelaMensal)}
              icon={Calendar}
              destaque
            />
            <ItemResultado
              label="Prazo"
              valor={`${financiamento.prazoMeses} meses`}
              icon={Calendar}
            />
            <ItemResultado
              label="Juros Anuais"
              valor={formatarPercentual(financiamento.jurosAnuaisPercentual)}
              icon={TrendingUp}
            />
            <ItemResultado
              label="Valor dos Juros"
              valor={formatarMoeda(financiamento.totalJuros)}
              icon={TrendingUp}
            />

            <Separator className="my-4 border-gray-700" />

            <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/40 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-base sm:text-lg font-bold text-blue-300">
                  Custo Total
                </span>
                <span className="text-xl sm:text-2xl font-bold text-blue-400">
                  {formatarMoeda(financiamento.custoTotal)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultadosModernos;
