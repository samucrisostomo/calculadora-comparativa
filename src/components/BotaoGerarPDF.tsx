import React, { useState } from "react";
import { jsPDF } from "jspdf";
import {
  formatarMoeda,
  formatarPercentual,
  formatarDataHora,
} from "../utils/formatters";
import {
  ResultadoConsorcio,
  ResultadoFinanciamento,
  Comparacao,
} from "../utils/calculations";
import { TipoBem } from "../utils/constants";
import { Download, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface BotaoGerarPDFProps {
  consorcio: ResultadoConsorcio | null;
  financiamento: ResultadoFinanciamento | null;
  comparacao: Comparacao | null;
  tipoBem: TipoBem;
}

const BotaoGerarPDF: React.FC<BotaoGerarPDFProps> = ({
  consorcio,
  financiamento,
  comparacao,
  tipoBem,
}) => {
  const [gerando, setGerando] = useState(false);

  const gerarPDF = async () => {
    if (!consorcio || !financiamento || !comparacao) {
      return;
    }

    setGerando(true);

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let currentY = 20;

      // ========== CABEÇALHO ==========
      pdf.setFontSize(22);
      pdf.setFont(undefined, "bold");
      pdf.setTextColor(37, 99, 235); // Azul
      pdf.text("📊 Calculadora Comparativa", pageWidth / 2, currentY, {
        align: "center",
      });

      currentY += 8;
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont(undefined, "normal");
      pdf.text(
        `Tipo de Bem: ${tipoBem === "carro" ? "🚗 Carro" : "🏠 Imóvel"}`,
        pageWidth / 2,
        currentY,
        { align: "center" }
      );

      currentY += 6;
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      pdf.text(`Data: ${formatarDataHora()}`, pageWidth / 2, currentY, {
        align: "center",
      });

      currentY += 12;

      // ========== SEÇÃO CONSÓRCIO ==========
      pdf.setDrawColor(34, 197, 94); // Verde
      pdf.setFillColor(240, 253, 244); // Verde claro
      pdf.roundedRect(15, currentY - 2, pageWidth - 30, 8, 3, "FD");

      pdf.setFontSize(16);
      pdf.setFont(undefined, "bold");
      pdf.setTextColor(34, 197, 94); // Verde
      pdf.text("🌱 Consórcio", 20, currentY);

      currentY += 10;
      pdf.setFontSize(11);
      pdf.setFont(undefined, "normal");
      pdf.setTextColor(0, 0, 0);

      const dadosConsorcio = [
        ["Valor do Bem:", formatarMoeda(consorcio.valorBem)],
        ["Lance:", formatarMoeda(consorcio.lance)],
        ["Parcela Mensal:", formatarMoeda(consorcio.parcelaMensal)],
        ["Prazo:", `${consorcio.prazoMeses} meses`],
        [
          "Taxa Administrativa:",
          formatarPercentual(consorcio.taxaAdministrativaPercentual),
        ],
      ];

      dadosConsorcio.forEach(([label, value]) => {
        pdf.text(label, 25, currentY);
        pdf.setFont(undefined, "bold");
        pdf.text(value, pageWidth - 25, currentY, { align: "right" });
        pdf.setFont(undefined, "normal");
        currentY += 7;
      });

      // Custo Total Consórcio
      currentY += 2;
      pdf.setDrawColor(34, 197, 94);
      pdf.setLineWidth(0.5);
      pdf.line(20, currentY, pageWidth - 20, currentY);
      currentY += 6;

      pdf.setFontSize(12);
      pdf.setFont(undefined, "bold");
      pdf.setTextColor(34, 197, 94);
      pdf.text("💰 Custo Total:", 25, currentY);
      pdf.setFontSize(14);
      pdf.text(formatarMoeda(consorcio.custoTotal), pageWidth - 25, currentY, {
        align: "right",
      });

      currentY += 15;

      // ========== SEÇÃO FINANCIAMENTO ==========
      pdf.setDrawColor(59, 130, 246); // Azul
      pdf.setFillColor(239, 246, 255); // Azul claro
      pdf.roundedRect(15, currentY - 2, pageWidth - 30, 8, 3, "FD");

      pdf.setFontSize(16);
      pdf.setFont(undefined, "bold");
      pdf.setTextColor(59, 130, 246); // Azul
      pdf.text("🏦 Financiamento", 20, currentY);

      currentY += 10;
      pdf.setFontSize(11);
      pdf.setFont(undefined, "normal");
      pdf.setTextColor(0, 0, 0);

      const dadosFinanciamento = [
        ["Valor do Bem:", formatarMoeda(financiamento.valorBem)],
        ["Entrada:", formatarMoeda(financiamento.entrada)],
        ["Parcela Mensal:", formatarMoeda(financiamento.parcelaMensal)],
        ["Prazo:", `${financiamento.prazoMeses} meses`],
        [
          "Juros Totais:",
          formatarPercentual(financiamento.jurosTotaisPercentual),
        ],
        ["Valor dos Juros:", formatarMoeda(financiamento.totalJuros)],
      ];

      dadosFinanciamento.forEach(([label, value]) => {
        pdf.text(label, 25, currentY);
        pdf.setFont(undefined, "bold");
        pdf.text(value, pageWidth - 25, currentY, { align: "right" });
        pdf.setFont(undefined, "normal");
        currentY += 7;
      });

      // Custo Total Financiamento
      currentY += 2;
      pdf.setDrawColor(59, 130, 246);
      pdf.setLineWidth(0.5);
      pdf.line(20, currentY, pageWidth - 20, currentY);
      currentY += 6;

      pdf.setFontSize(12);
      pdf.setFont(undefined, "bold");
      pdf.setTextColor(59, 130, 246);
      pdf.text("💰 Custo Total:", 25, currentY);
      pdf.setFontSize(14);
      pdf.text(
        formatarMoeda(financiamento.custoTotal),
        pageWidth - 25,
        currentY,
        { align: "right" }
      );

      currentY += 15;

      // ========== COMPARAÇÃO ==========
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(1);
      pdf.line(20, currentY, pageWidth - 20, currentY);
      currentY += 10;

      // Economia ou Diferença
      if (comparacao.consorcioMaisVantajoso) {
        pdf.setFontSize(18);
        pdf.setFont(undefined, "bold");
        pdf.setTextColor(34, 197, 94); // Verde
        pdf.text("💚 Economia com Consórcio", pageWidth / 2, currentY, {
          align: "center",
        });
        currentY += 8;

        pdf.setFontSize(16);
        pdf.setTextColor(34, 197, 94);
        pdf.text(formatarMoeda(comparacao.economia), pageWidth / 2, currentY, {
          align: "center",
        });
        currentY += 6;

        pdf.setFontSize(12);
        pdf.text(
          `(${formatarPercentual(comparacao.percentualEconomia)} de economia)`,
          pageWidth / 2,
          currentY,
          { align: "center" }
        );
        currentY += 10;

        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);
        pdf.setFont(undefined, "normal");
        pdf.text(
          `Diferença nas parcelas: ${formatarMoeda(
            Math.abs(comparacao.diferencaParcela)
          )}/mês`,
          pageWidth / 2,
          currentY,
          { align: "center" }
        );
      } else {
        pdf.setFontSize(18);
        pdf.setFont(undefined, "bold");
        pdf.setTextColor(59, 130, 246); // Azul
        pdf.text("💙 Financiamento mais vantajoso", pageWidth / 2, currentY, {
          align: "center",
        });
        currentY += 8;

        pdf.setFontSize(16);
        pdf.setTextColor(59, 130, 246);
        pdf.text(
          formatarMoeda(Math.abs(comparacao.economia)),
          pageWidth / 2,
          currentY,
          { align: "center" }
        );
        currentY += 6;

        pdf.setFontSize(12);
        pdf.text(
          `Financiamento é ${formatarPercentual(
            Math.abs(comparacao.percentualEconomia)
          )} mais barato`,
          pageWidth / 2,
          currentY,
          { align: "center" }
        );
      }

      currentY += 15;

      // Verifica se precisa de nova página
      if (currentY > pageHeight - 60) {
        pdf.addPage();
        currentY = 20;
      }

      // ========== VANTAGENS ==========
      pdf.setFontSize(14);
      pdf.setFont(undefined, "bold");
      pdf.setTextColor(0, 0, 0);
      pdf.text("✨ Principais Vantagens do Consórcio:", 20, currentY);
      currentY += 10;

      pdf.setFontSize(10);
      pdf.setFont(undefined, "normal");

      const vantagens = [
        "✓ Sem juros compostos: apenas taxas administrativas transparentes",
        "✓ Parcelas fixas durante todo o período",
        "✓ Possibilidade de dar lances para antecipar a contemplação",
        "✓ Menor custo total em comparação ao financiamento tradicional",
        "✓ Flexibilidade para usar o crédito quando for contemplado",
        "✓ Não compromete o limite de financiamento bancário",
      ];

      vantagens.forEach((vantagem) => {
        const lines = pdf.splitTextToSize(vantagem, pageWidth - 50);
        lines.forEach((line) => {
          if (currentY > pageHeight - 20) {
            pdf.addPage();
            currentY = 20;
          }
          pdf.text(line, 25, currentY);
          currentY += 6;
        });
        currentY += 2;
      });

      // ========== OBSERVAÇÃO FINAL ==========
      currentY += 5;
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.line(20, currentY, pageWidth - 20, currentY);
      currentY += 8;

      pdf.setFontSize(9);
      pdf.setFont(undefined, "italic");
      pdf.setTextColor(128, 128, 128);
      pdf.text(
        "* Este relatório é uma simulação baseada nas informações fornecidas.",
        pageWidth / 2,
        currentY,
        { align: "center" }
      );
      currentY += 5;
      pdf.text(
        "Consulte um especialista financeiro para mais informações.",
        pageWidth / 2,
        currentY,
        { align: "center" }
      );

      // Salvar PDF
      const nomeArquivo = `comparativo-${tipoBem}-${Date.now()}.pdf`;
      pdf.save(nomeArquivo);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar PDF. Por favor, tente novamente.");
    } finally {
      setGerando(false);
    }
  };

  if (!consorcio || !financiamento || !comparacao) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-8 animate-fade-in">
      <Button
        onClick={gerarPDF}
        disabled={gerando}
        size="lg"
        className="w-full sm:w-auto shimmer-button bg-gradient-to-r from-green-600 via-green-600 to-green-700 text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-base sm:text-lg px-8 py-6 h-auto"
      >
        {gerando ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Gerando PDF...
          </>
        ) : (
          <>
            <Download className="mr-2 h-5 w-5" />
            Baixar Relatório PDF
          </>
        )}
      </Button>
      <p className="text-sm text-gray-400 text-center max-w-md px-4">
        Gere um relatório completo com todos os detalhes da comparação para
        guardar ou compartilhar
      </p>
    </div>
  );
};

export default BotaoGerarPDF;
