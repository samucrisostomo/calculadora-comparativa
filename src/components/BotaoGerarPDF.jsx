import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  formatarMoeda,
  formatarPercentual,
  formatarDataHora,
} from "../utils/formatters";

const BotaoGerarPDF = ({ consorcio, financiamento, comparacao, tipoBem }) => {
  const [gerando, setGerando] = useState(false);

  const gerarPDF = async () => {
    setGerando(true);

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let currentY = 20;

      // Título
      pdf.setFontSize(20);
      pdf.setFont(undefined, "bold");
      pdf.text("Relatório Comparativo", pageWidth / 2, currentY, {
        align: "center",
      });

      currentY += 10;
      pdf.setFontSize(14);
      pdf.text("Consórcio vs Financiamento", pageWidth / 2, currentY, {
        align: "center",
      });

      currentY += 5;
      pdf.setFontSize(10);
      pdf.setFont(undefined, "normal");
      pdf.text(
        `Tipo de Bem: ${tipoBem === "carro" ? "Carro" : "Imóvel"}`,
        pageWidth / 2,
        currentY,
        { align: "center" }
      );

      currentY += 5;
      pdf.text(`Data: ${formatarDataHora()}`, pageWidth / 2, currentY, {
        align: "center",
      });

      currentY += 15;

      // Linha divisória
      pdf.setDrawColor(200, 200, 200);
      pdf.line(20, currentY, pageWidth - 20, currentY);
      currentY += 10;

      // Seção Consórcio
      pdf.setFontSize(16);
      pdf.setFont(undefined, "bold");
      pdf.setTextColor(34, 197, 94); // Verde
      pdf.text("Consórcio", 20, currentY);
      currentY += 10;

      pdf.setFontSize(11);
      pdf.setFont(undefined, "normal");
      pdf.setTextColor(0, 0, 0);

      const dadosConsorcio = [
        ["Valor do Bem:", formatarMoeda(consorcio.valorBem)],
        ["Lance:", formatarMoeda(consorcio.lance)],
        ["Parcela Mensal:", formatarMoeda(consorcio.parcelaMensal)],
        ["Prazo:", `${consorcio.prazoMeses} meses`],
        ["Taxa Administrativa:", formatarMoeda(consorcio.taxaAdministrativa)],
        ["Comissão:", formatarMoeda(consorcio.comissao)],
      ];

      dadosConsorcio.forEach(([label, value]) => {
        pdf.text(label, 25, currentY);
        pdf.text(value, pageWidth - 25, currentY, { align: "right" });
        currentY += 7;
      });

      currentY += 3;
      pdf.setFontSize(12);
      pdf.setFont(undefined, "bold");
      pdf.text("Custo Total:", 25, currentY);
      pdf.text(formatarMoeda(consorcio.custoTotal), pageWidth - 25, currentY, {
        align: "right",
      });

      currentY += 15;

      // Seção Financiamento
      pdf.setFontSize(16);
      pdf.setTextColor(59, 130, 246); // Azul
      pdf.text("Financiamento", 20, currentY);
      currentY += 10;

      pdf.setFontSize(11);
      pdf.setFont(undefined, "normal");
      pdf.setTextColor(0, 0, 0);

      const dadosFinanciamento = [
        ["Valor do Bem:", formatarMoeda(financiamento.valorBem)],
        ["Entrada:", formatarMoeda(financiamento.entrada)],
        ["Parcela Mensal:", formatarMoeda(financiamento.parcelaMensal)],
        ["Prazo:", `${financiamento.prazoMeses} meses`],
        ["Taxa Anual:", formatarPercentual(financiamento.taxaAnual)],
        ["Total de Juros:", formatarMoeda(financiamento.totalJuros)],
      ];

      dadosFinanciamento.forEach(([label, value]) => {
        pdf.text(label, 25, currentY);
        pdf.text(value, pageWidth - 25, currentY, { align: "right" });
        currentY += 7;
      });

      currentY += 3;
      pdf.setFontSize(12);
      pdf.setFont(undefined, "bold");
      pdf.text("Custo Total:", 25, currentY);
      pdf.text(
        formatarMoeda(financiamento.custoTotal),
        pageWidth - 25,
        currentY,
        { align: "right" }
      );

      currentY += 15;

      // Linha divisória
      pdf.setDrawColor(200, 200, 200);
      pdf.line(20, currentY, pageWidth - 20, currentY);
      currentY += 10;

      // Seção de Economia
      if (comparacao.consorcioMaisVantajoso) {
        pdf.setFontSize(16);
        pdf.setFont(undefined, "bold");
        pdf.setTextColor(34, 197, 94);
        pdf.text("Economia com Consórcio", pageWidth / 2, currentY, {
          align: "center",
        });
        currentY += 10;

        pdf.setFontSize(14);
        pdf.text(
          `${formatarMoeda(comparacao.economia)}`,
          pageWidth / 2,
          currentY,
          { align: "center" }
        );
        currentY += 7;

        pdf.setFontSize(12);
        pdf.text(
          `(${formatarPercentual(comparacao.percentualEconomia)} de economia)`,
          pageWidth / 2,
          currentY,
          { align: "center" }
        );
        currentY += 15;
      }

      // Vantagens do Consórcio
      pdf.setFontSize(14);
      pdf.setFont(undefined, "bold");
      pdf.setTextColor(0, 0, 0);
      pdf.text("Vantagens do Consórcio:", 20, currentY);
      currentY += 10;

      pdf.setFontSize(11);
      pdf.setFont(undefined, "normal");

      const vantagens = [
        "Sem juros: você paga apenas taxas administrativas",
        "Parcelas fixas durante todo o período",
        "Possibilidade de antecipação com lances",
        "Menor custo total em comparação ao financiamento",
        "Flexibilidade de uso do crédito contemplado",
      ];

      vantagens.forEach((vantagem) => {
        const lines = pdf.splitTextToSize(`• ${vantagem}`, pageWidth - 50);
        lines.forEach((line) => {
          if (currentY > pageHeight - 20) {
            pdf.addPage();
            currentY = 20;
          }
          pdf.text(line, 25, currentY);
          currentY += 7;
        });
      });

      // Rodapé
      pdf.setFontSize(9);
      pdf.setTextColor(128, 128, 128);
      pdf.text(
        "Este relatório é apenas uma simulação. Consulte um especialista para mais informações.",
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );

      // Salvar PDF
      pdf.save(`comparativo-consorcio-financiamento-${Date.now()}.pdf`);
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
    <div className="text-center mt-6 sm:mt-8">
      <button
        onClick={gerarPDF}
        disabled={gerando}
        className="btn-secondary inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto text-base sm:text-lg py-4 sm:py-3"
      >
        {gerando ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Gerando PDF...
          </>
        ) : (
          <>📄 Gerar Relatório PDF</>
        )}
      </button>
    </div>
  );
};

export default BotaoGerarPDF;
