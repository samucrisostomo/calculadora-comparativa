# Calculadora Comparativa - Consórcio e Financiamento

Uma aplicação web moderna e responsiva para comparação entre consórcio e financiamento, desenvolvida com React e Tailwind CSS. A ferramenta oferece cálculos em tempo real, visualizações gráficas e geração de relatórios em PDF.

## 🚀 Funcionalidades

### Interface Intuitiva

- ✅ Seleção do tipo de bem (Carro ou Imóvel)
- ✅ Formulários interativos com validação em tempo real
- ✅ Tooltips explicativos para termos técnicos
- ✅ Design responsivo para desktop e mobile

### Cálculos Financeiros

- **Consórcio**
  - Taxa administrativa de 1,5% ao ano
  - Comissão de 2% sobre o valor do bem
  - Sistema de parcelas fixas
  - Suporte para lances
- **Financiamento**
  - Sistema Price (parcelas fixas)
  - Juros compostos mensais
  - Cálculo preciso com taxa configurável
  - Total de juros destacado

### Visualizações

- 📊 Gráficos comparativos interativos
- 💰 Cards de resultados lado a lado
- 💚 Destaque da economia do consórcio
- 📈 Comparação visual de custos e parcelas

### Geração de PDF

- 📄 Relatório completo em PDF
- 📅 Data e hora da simulação
- 📋 Todos os detalhes dos cálculos
- ✨ Vantagens do consórcio destacadas

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **Recharts** - Biblioteca de gráficos
- **jsPDF** - Geração de PDFs
- **html2canvas** - Captura de elementos HTML

## 📦 Instalação

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

### Passos

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd calculadora-comparativa
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra o navegador em `http://localhost:3000`

## 🏗️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📐 Estrutura do Projeto

```
calculadora-comparativa/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── TipoSelector.jsx
│   │   ├── FormularioConsorcio.jsx
│   │   ├── FormularioFinanciamento.jsx
│   │   ├── Resultados.jsx
│   │   ├── GraficoComparativo.jsx
│   │   ├── BotaoGerarPDF.jsx
│   │   ├── Footer.jsx
│   │   ├── Loading.jsx
│   │   └── Tooltip.jsx
│   ├── utils/
│   │   ├── calculations.js
│   │   ├── formatters.js
│   │   └── validations.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Customização

### Cores

As cores principais podem ser alteradas em `tailwind.config.js`:

```js
colors: {
  consorcio: {
    light: '#86efac',
    DEFAULT: '#22c55e',
    dark: '#16a34a',
  },
  financiamento: {
    light: '#93c5fd',
    DEFAULT: '#3b82f6',
    dark: '#2563eb',
  }
}
```

### Taxas

As taxas de cálculo podem ser ajustadas em `src/utils/calculations.js`:

- Taxa administrativa do consórcio
- Comissão
- Fórmulas de cálculo

## 📊 Como Funciona

### Consórcio

O cálculo do consórcio considera:

1. Valor do bem menos o lance inicial
2. Taxa administrativa de 1,5% ao ano
3. Comissão de 2% sobre o valor do bem
4. Parcelas fixas durante todo o período

### Financiamento

O cálculo do financiamento usa Sistema Price:

1. Converte taxa anual para mensal
2. Aplica fórmula PMT: `PV × [i(1+i)^n]/[(1+i)^n-1]`
3. Calcula custo total com juros compostos

### Comparação

A ferramenta compara:

- Custo total de cada modalidade
- Valor das parcelas
- Economia absoluta e percentual
- Diferença entre parcelas

## ✅ Validações

A aplicação valida:

- Valores mínimos e máximos
- Lance máximo de 50% do valor do bem
- Entrada máxima de 80% do valor do bem
- Prazo entre 12 e 360 meses
- Taxa de juros entre 0,1% e 50% ao ano

## 🎯 Objetivos do Projeto

Esta ferramenta foi desenvolvida para:

1. Demonstrar as vantagens financeiras do consórcio
2. Facilitar a comparação entre modalidades de aquisição
3. Educar sobre custos reais de financiamento
4. Fornecer transparência nos cálculos

## 📝 Notas Importantes

- Os cálculos são simulações baseadas em fórmulas financeiras padrão
- Para decisões financeiras reais, consulte um especialista
- As taxas podem variar conforme a administradora ou instituição financeira
- Este projeto é para fins educacionais

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Enviar pull requests

## 📄 Licença

Este projeto é de código aberto e está disponível para uso educacional e pessoal.

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

Desenvolvido com ❤️ para ajudar na educação financeira
