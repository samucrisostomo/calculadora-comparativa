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

  const checkPageBreak = (
    pdf: jsPDF,
    currentY: number,
    neededSpace: number
  ) => {
    if (currentY + neededSpace > 270) {
      pdf.addPage();
      return 20;
    }
    return currentY;
  };

  const gerarPDF = async () => {
    if (!consorcio || !financiamento || !comparacao) {
      return;
    }

    setGerando(true);

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      let currentY = 10;

      // ========== CABEÇALHO COM LOGO ==========
      // Adicionar logo
      try {
        const response = await fetch("/LOGO AZUL.png");
        if (response.ok) {
          const blob = await response.blob();
          const imgUrl = URL.createObjectURL(blob);
          const img = new Image();

          await new Promise((resolve, reject) => {
            img.onload = () => {
              try {
                // Logo com largura de 60mm, altura proporcional
                const logoWidth = 40;
                const logoHeight = (img.height / img.width) * logoWidth;
                const logoX = (pageWidth - logoWidth) / 2;
                pdf.addImage(
                  img,
                  "PNG",
                  logoX,
                  currentY,
                  logoWidth,
                  logoHeight
                );
                URL.revokeObjectURL(imgUrl);
                currentY += logoHeight + 3;
              } catch (error) {
                console.warn("Erro ao adicionar logo:", error);
                URL.revokeObjectURL(imgUrl);
                currentY += 20;
              }
              resolve(null);
            };
            img.onerror = () => {
              console.warn("Erro ao carregar logo");
              URL.revokeObjectURL(imgUrl);
              currentY += 20;
              resolve(null);
            };
            img.src = imgUrl;
          });
        } else {
          currentY += 20;
        }
      } catch (error) {
        console.warn("Erro ao carregar logo:", error);
        currentY += 18;
      }

      currentY += 1;
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 100, 100);
      pdf.text(
        `Consórcio e Financiamento - ${
          tipoBem === "carro" ? "Carro" : "Imóvel"
        }`,
        pageWidth / 2,
        currentY,
        { align: "center" }
      );

      currentY += 6;
      pdf.setFontSize(9);
      pdf.text(`Data: ${formatarDataHora()}`, pageWidth / 2, currentY, {
        align: "center",
      });

      currentY = checkPageBreak(pdf, currentY, 80);
      currentY += 12;

      // ========== CAIXAS LADO A LADO ==========
      const margemLateral = 15;
      const espacoEntreCaixas = 5;
      const larguraCaixa =
        (pageWidth - 2 * margemLateral - espacoEntreCaixas) / 2;
      const xConsorcio = margemLateral;
      const xFinanciamento = margemLateral + larguraCaixa + espacoEntreCaixas;
      const startY = currentY;

      // Calcular altura necessária para ambas as caixas
      const valorTaxaAdministrativa = Math.max(
        consorcio.valorComTaxa - consorcio.valorBem,
        0
      );

      const dadosConsorcio = [
        ["Valor do Bem", formatarMoeda(consorcio.valorBem)],
        ["Lance", formatarMoeda(consorcio.lance)],
        ["Parcela Mensal", formatarMoeda(consorcio.parcelaMensal)],
        ["Prazo", `${consorcio.prazoMeses} meses`],
        [
          "Taxa Administrativa",
          `${formatarPercentual(
            consorcio.taxaAdministrativaPercentual
          )} (${formatarMoeda(valorTaxaAdministrativa)})`,
        ],
        ["Valor da Taxa", formatarMoeda(valorTaxaAdministrativa)],
      ];

      const dadosFinanciamento = [
        ["Valor do Bem", formatarMoeda(financiamento.valorBem)],
        ["Entrada", formatarMoeda(financiamento.entrada)],
        ["Parcela Mensal", formatarMoeda(financiamento.parcelaMensal)],
        ["Prazo", `${financiamento.prazoMeses} meses`],
        [
          "Juros Anuais",
          formatarPercentual(financiamento.jurosAnuaisPercentual || 12),
        ],
        ["Total de Juros", formatarMoeda(financiamento.totalJuros || 0)],
      ];

      // Calcular altura necessária (título + espaçamento + dados + linha + custo total)
      const alturaTitulo = 5;
      const espacoAposTitulo = 8;
      const alturaLinhaDados = 6;
      const alturaLinhaSeparadora = 4;
      const alturaCustoTotal = 6;
      const alturaConsorcio =
        alturaTitulo +
        espacoAposTitulo +
        dadosConsorcio.length * alturaLinhaDados +
        alturaLinhaSeparadora +
        alturaCustoTotal +
        8; // margem inferior
      const alturaFinanciamento =
        alturaTitulo +
        espacoAposTitulo +
        dadosFinanciamento.length * alturaLinhaDados +
        alturaLinhaSeparadora +
        alturaCustoTotal +
        8; // margem inferior
      const alturaCaixa = Math.max(alturaConsorcio, alturaFinanciamento);

      // ========== CAIXA CONSÓRCIO (ESQUERDA) ==========
      pdf.setFillColor(240, 253, 244); // Verde claro
      pdf.roundedRect(xConsorcio, startY, larguraCaixa, alturaCaixa, 3, 3, "F");

      pdf.setDrawColor(34, 197, 94); // Verde
      pdf.setLineWidth(0.5);
      pdf.roundedRect(xConsorcio, startY, larguraCaixa, alturaCaixa, 3, 3, "D");

      let yConsorcio = startY + 5;
      pdf.setFontSize(13);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(34, 197, 94);
      pdf.text("Consórcio", xConsorcio + 5, yConsorcio);

      yConsorcio += 8;
      pdf.setFontSize(9);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("helvetica", "normal");

      dadosConsorcio.forEach(([label, value]) => {
        pdf.setFont("helvetica", "normal");
        pdf.text(label + ":", xConsorcio + 5, yConsorcio);
        pdf.setFont("helvetica", "bold");
        pdf.text(value, xConsorcio + larguraCaixa - 5, yConsorcio, {
          align: "right",
        });
        yConsorcio += 5.5;
      });

      // Custo Total Consórcio
      pdf.setDrawColor(34, 197, 94);
      pdf.setLineWidth(0.5);
      pdf.line(
        xConsorcio + 5,
        yConsorcio - 2,
        xConsorcio + larguraCaixa - 5,
        yConsorcio - 2
      );
      yConsorcio += 4;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(34, 197, 94);
      pdf.text("Custo Total:", xConsorcio + 5, yConsorcio);
      pdf.setFontSize(11);
      pdf.text(
        formatarMoeda(consorcio.custoTotal),
        xConsorcio + larguraCaixa - 5,
        yConsorcio,
        { align: "right" }
      );

      // ========== CAIXA FINANCIAMENTO (DIREITA) ==========
      pdf.setFillColor(239, 246, 255); // Azul claro
      pdf.roundedRect(
        xFinanciamento,
        startY,
        larguraCaixa,
        alturaCaixa,
        3,
        3,
        "F"
      );

      pdf.setDrawColor(21, 25, 70); // Azul #151946
      pdf.setLineWidth(0.5);
      pdf.roundedRect(
        xFinanciamento,
        startY,
        larguraCaixa,
        alturaCaixa,
        3,
        3,
        "D"
      );

      let yFinanciamento = startY + 5;
      pdf.setFontSize(13);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(21, 25, 70); // Azul #151946
      pdf.text("Financiamento", xFinanciamento + 5, yFinanciamento);

      yFinanciamento += 8;
      pdf.setFontSize(9);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("helvetica", "normal");

      dadosFinanciamento.forEach(([label, value]) => {
        pdf.setFont("helvetica", "normal");
        pdf.text(label + ":", xFinanciamento + 5, yFinanciamento);
        pdf.setFont("helvetica", "bold");
        pdf.text(value, xFinanciamento + larguraCaixa - 5, yFinanciamento, {
          align: "right",
        });
        yFinanciamento += 5.5;
      });

      // Custo Total Financiamento
      pdf.setDrawColor(21, 25, 70); // Azul #151946
      pdf.setLineWidth(0.5);
      pdf.line(
        xFinanciamento + 5,
        yFinanciamento - 2,
        xFinanciamento + larguraCaixa - 5,
        yFinanciamento - 2
      );
      yFinanciamento += 4;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(21, 25, 70); // Azul #151946
      pdf.text("Custo Total:", xFinanciamento + 5, yFinanciamento);
      pdf.setFontSize(11);
      pdf.text(
        formatarMoeda(financiamento.custoTotal),
        xFinanciamento + larguraCaixa - 5,
        yFinanciamento,
        { align: "right" }
      );

      currentY = startY + alturaCaixa;
      currentY = checkPageBreak(pdf, currentY, 50);
      currentY += 15;

      // ========== COMPARAÇÃO ==========
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.8);
      pdf.line(15, currentY, pageWidth - 15, currentY);
      currentY += 8;

      if (comparacao.consorcioMaisVantajoso) {
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(34, 197, 94);
        pdf.text("Economia com consórcio", pageWidth / 2, currentY, {
          align: "center",
        });
        currentY += 6;

        pdf.setFontSize(16);
        pdf.text(formatarMoeda(comparacao.economia), pageWidth / 2, currentY, {
          align: "center",
        });
        currentY += 5;

        pdf.setFontSize(10);
        pdf.text(
          `${formatarPercentual(comparacao.percentualEconomia)} de economia`,
          pageWidth / 2,
          currentY,
          { align: "center" }
        );
        currentY += 8;

        pdf.setFontSize(9);
        pdf.setTextColor(0, 0, 0);
        pdf.setFont("helvetica", "normal");
        pdf.text(
          `Diferença nas parcelas: ${formatarMoeda(
            Math.abs(comparacao.diferencaParcela)
          )}/mês`,
          pageWidth / 2,
          currentY,
          { align: "center" }
        );
      } else {
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(21, 25, 70); // Azul #151946
        pdf.text("Financiamento mais vantajoso", pageWidth / 2, currentY, {
          align: "center",
        });
        currentY += 6;

        pdf.setFontSize(16);
        pdf.text(
          formatarMoeda(Math.abs(comparacao.economia)),
          pageWidth / 2,
          currentY,
          { align: "center" }
        );
        currentY += 5;

        pdf.setFontSize(10);
        pdf.text(
          `Financiamento é ${formatarPercentual(
            Math.abs(comparacao.percentualEconomia)
          )} mais barato`,
          pageWidth / 2,
          currentY,
          { align: "center" }
        );
      }

      currentY = checkPageBreak(pdf, currentY, 50);
      currentY += 12;

      // ========== VANTAGENS ==========
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 0, 0);
      pdf.text("Principais vantagens do consórcio:", 20, currentY);
      currentY += 8;

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");

      const vantagens = [
        "Sem juros compostos: apenas taxas administrativas transparentes",
        "Parcelas reajustadas a cada 12 meses",
        "Possibilidade de dar lances para antecipar a contemplação",
        "Menor custo total em comparação ao financiamento tradicional",
        "Flexibilidade para usar o crédito quando for contemplado",
        "Pode ser usado para: Compra de imóvel novo, usado ou na planta",
      ];

      vantagens.forEach((vantagem) => {
        currentY = checkPageBreak(pdf, currentY, 8);
        pdf.text("• " + vantagem, 25, currentY);
        currentY += 5;
      });

      // ========== OBSERVAÇÃO FINAL ==========
      currentY = checkPageBreak(pdf, currentY, 20);
      currentY += 5;
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.line(15, currentY, pageWidth - 15, currentY);
      currentY += 6;

      pdf.setFontSize(8);
      pdf.setFont("helvetica", "italic");
      pdf.setTextColor(128, 128, 128);
      pdf.text(
        "Este relatório é uma simulação baseada nas informações fornecidas.",
        pageWidth / 2,
        currentY,
        { align: "center" }
      );
      currentY += 4;
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
      alert(
        `Erro ao gerar PDF: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
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
            Baixar relatório PDF
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
