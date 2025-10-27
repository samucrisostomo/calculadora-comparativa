import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import {
  DollarSign,
  Calendar,
  TrendingUp,
  Info,
  Sprout,
  Building2,
  LucideIcon,
} from "lucide-react";
import { getConfig, TipoBem } from "../utils/constants";
import {
  DadosConsorcio,
  DadosFinanciamento,
  Erros,
} from "../utils/validations";

interface CampoFormulario {
  id: string;
  label: string;
  placeholder: string;
  icon: LucideIcon;
  info: string;
  required: boolean;
  inputMode?: "numeric" | "decimal" | "text";
  suffix?: string;
}

interface FormularioModernoProps {
  tipo: "consorcio" | "financiamento";
  dados: DadosConsorcio | DadosFinanciamento;
  onChange: (dados: DadosConsorcio | DadosFinanciamento) => void;
  erros?: Erros;
  cor: string;
  tipoBem?: TipoBem;
}

const FormularioModerno: React.FC<FormularioModernoProps> = ({
  tipo,
  dados,
  onChange,
  erros = {},
  cor,
  tipoBem = "carro",
}) => {
  const config = getConfig(tipoBem);

  const handleChange = (campo: string, valor: string) => {
    onChange({ ...dados, [campo]: parseFloat(valor) || 0 });
  };

  const formatarValorExibicao = (valor: number | undefined): string => {
    if (!valor || valor === 0) return "";
    return valor.toLocaleString("pt-BR");
  };

  const campos: CampoFormulario[] =
    tipo === "consorcio"
      ? [
          {
            id: "valorBem",
            label: `${config.labels.valorBem} (R$)`,
            placeholder: config.labels.placeholderValor,
            icon: DollarSign,
            info: "Valor total do bem que deseja adquirir",
            required: true,
          },
          {
            id: "lance",
            label: "Lance (R$)",
            placeholder: "Ex: 5.000 (opcional)",
            icon: TrendingUp,
            info: "Valor de lance para antecipar contemplação",
            required: false,
          },
          {
            id: "prazoMeses",
            label: "Prazo (meses)",
            placeholder: `Ex: ${tipoBem === "carro" ? "60" : "240"}`,
            icon: Calendar,
            info: `Período de pagamento entre 12 e ${config.prazoMaximoMeses} meses`,
            required: true,
            inputMode: "numeric",
          },
          {
            id: "taxaAdministrativa",
            label: "Taxa Administrativa (%)",
            placeholder: "Ex: 15",
            icon: TrendingUp,
            info: "Taxa percentual aplicada sobre o valor do bem durante todo o período",
            required: true,
            inputMode: "decimal",
            suffix: "%",
          },
        ]
      : [
          {
            id: "valorBem",
            label: `${config.labels.valorBem} (R$)`,
            placeholder: config.labels.placeholderValor,
            icon: DollarSign,
            info: "Valor total do bem que deseja adquirir",
            required: true,
          },
          {
            id: "entrada",
            label: "Entrada (R$)",
            placeholder: `Ex: ${tipoBem === "carro" ? "5.000" : "100.000"}`,
            icon: DollarSign,
            info: "Valor da entrada inicial",
            required: true,
          },
          {
            id: "prazoMeses",
            label: "Prazo (meses)",
            placeholder: `Ex: ${tipoBem === "carro" ? "60" : "240"}`,
            icon: Calendar,
            info: `Período de pagamento entre 12 e ${config.prazoMaximoMeses} meses`,
            required: true,
            inputMode: "numeric",
          },
          {
            id: "jurosAnuais",
            label: "Juros Anuais (%)",
            placeholder: "Ex: 12",
            icon: TrendingUp,
            info: "Taxa de juros anual que será convertida para juros compostos mensais (Sistema Price)",
            required: true,
            inputMode: "decimal",
            suffix: "%",
          },
        ];

  const IconeComponente = tipo === "consorcio" ? Sprout : Building2;

  return (
    <Card
      className={`magic-card hover:scale-[1.01] transition-all duration-300 hover-lift border-2 ${cor} bg-gray-800/80 backdrop-blur-sm`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-full ${
                tipo === "consorcio" ? "bg-green-500/20" : "bg-blue-500/20"
              }`}
            >
              <IconeComponente
                className={`w-8 h-8 ${
                  tipo === "consorcio" ? "text-green-400" : "text-blue-400"
                }`}
              />
            </div>
            <div>
              <CardTitle className="text-xl sm:text-2xl text-white">
                {tipo === "consorcio" ? "Consórcio" : "Financiamento"}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {tipo === "consorcio"
                  ? "Sem juros, parcelas fixas"
                  : "Juros compostos (Price), parcelas fixas"}
              </CardDescription>
            </div>
          </div>
          <Badge
            variant={tipo === "consorcio" ? "secondary" : "default"}
            className="bg-gray-700 text-white border-gray-600"
          >
            {tipo === "consorcio" ? "Economia" : "Tradicional"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {campos.map((campo) => {
          const Icon = campo.icon;
          return (
            <div key={campo.id} className="space-y-2">
              <Label
                htmlFor={campo.id}
                className="text-white flex items-center gap-2"
              >
                <Icon className="w-4 h-4 text-blue-400" />
                {campo.label}{" "}
                {campo.required && <span className="text-red-500">*</span>}
                <div className="group relative">
                  <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  <div className="absolute hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg p-2 w-48 -top-2 left-6 z-10 border border-gray-600 shadow-xl backdrop-blur-sm">
                    {campo.info}
                  </div>
                </div>
              </Label>
              <div className="relative">
                {campo.id.includes("valor") ||
                campo.id === "entrada" ||
                campo.id === "lance" ? (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    R$
                  </span>
                ) : null}
                <Input
                  id={campo.id}
                  type={
                    campo.id.includes("valor") ||
                    campo.id === "entrada" ||
                    campo.id === "lance"
                      ? "text"
                      : "number"
                  }
                  value={
                    campo.id.includes("valor") ||
                    campo.id === "entrada" ||
                    campo.id === "lance"
                      ? formatarValorExibicao((dados as any)[campo.id])
                      : (dados as any)[campo.id] || ""
                  }
                  onChange={(e) =>
                    handleChange(campo.id, e.target.value.replace(/\./g, ""))
                  }
                  placeholder={campo.placeholder}
                  className={`${
                    campo.id.includes("valor") ||
                    campo.id === "entrada" ||
                    campo.id === "lance"
                      ? "pl-12"
                      : campo.suffix
                      ? "pr-12"
                      : ""
                  } ${
                    erros[campo.id]
                      ? "border-red-500 focus-visible:ring-red-500 animate-shake"
                      : "focus:scale-[1.01] transition-all duration-200"
                  } ${
                    (dados as any)[campo.id] && !erros[campo.id]
                      ? "border-green-400 bg-green-500/10"
                      : ""
                  } bg-gray-800 border-gray-600 text-white backdrop-blur-sm`}
                  inputMode={campo.inputMode || "numeric"}
                  min="0"
                  step={
                    campo.id === "taxaAdministrativa" ||
                    campo.id === "jurosAnuais"
                      ? "0.1"
                      : campo.id === "prazoMeses"
                      ? "1"
                      : "1000"
                  }
                />
                {campo.suffix && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {campo.suffix}
                  </span>
                )}
              </div>
              {erros[campo.id] && (
                <p className="text-sm text-red-500 flex items-center gap-1 animate-fade-in">
                  <Info className="w-4 h-4" />
                  {erros[campo.id]}
                </p>
              )}
            </div>
          );
        })}

        <div
          className={`${
            tipo === "consorcio"
              ? "bg-green-500/10 border-green-500/30"
              : "bg-blue-500/10 border-blue-500/30"
          } border rounded-lg p-4 mt-6 backdrop-blur-sm`}
        >
          <h4
            className={`font-semibold ${
              tipo === "consorcio" ? "text-green-400" : "text-blue-400"
            } mb-2 text-sm flex items-center gap-2`}
          >
            <Info className="w-4 h-4" />
            Como funciona
          </h4>
          <ul
            className={`${
              tipo === "consorcio" ? "text-green-300" : "text-blue-300"
            } text-xs space-y-1`}
          >
            {tipo === "consorcio" ? (
              <>
                <li>• Taxa aplicada sobre o valor total do bem</li>
                <li>• Parcelas fixas durante todo o período</li>
                <li>• Lance reduz o valor das parcelas mensais</li>
              </>
            ) : (
              <>
                <li>• Juros aplicados sobre o valor financiado</li>
                <li>• Parcelas fixas durante todo o período</li>
                <li>• Entrada reduz o valor a ser financiado</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormularioModerno;
