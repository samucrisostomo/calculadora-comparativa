# Guia de Desenvolvimento

## 📋 Visão Geral da Arquitetura

Este projeto foi desenvolvido seguindo as melhores práticas de desenvolvimento React, com foco em:

- **Componentização**: Componentes pequenos e reutilizáveis
- **Separação de Responsabilidades**: Lógica de negócio separada da apresentação
- **Validação**: Sistema robusto de validação de entrada
- **Performance**: Cálculos otimizados com debounce

## 🏗️ Estrutura de Componentes

### Hierarquia

```
App (Componente Principal)
├── Header (Estático)
├── TipoSelector (Estado: tipoBem)
├── FormularioConsorcio (Estado: dadosConsorcio)
├── FormularioFinanciamento (Estado: dadosFinanciamento)
├── Loading (Condicional)
├── Resultados (Condicional - após cálculos)
│   └── Cards de comparação
├── GraficoComparativo (Condicional)
│   └── Recharts
├── BotaoGerarPDF (Condicional)
│   └── jsPDF
└── Footer (Estático)
```

## 🔧 Utilitários

### calculations.js

Contém toda a lógica de cálculos financeiros:

- `calcularConsorcio()`: Cálculos do consórcio
- `calcularFinanciamento()`: Cálculos do financiamento com Sistema Price
- `compararModalidades()`: Análise comparativa

### formatters.js

Funções de formatação:

- `formatarMoeda()`: Formata valores em R$
- `formatarPercentual()`: Formata percentuais
- `formatarDataHora()`: Formata datas
- `removerFormatacaoMoeda()`: Parse de valores

### validations.js

Sistema de validação:

- `validarConsorcio()`: Valida campos do consórcio
- `validarFinanciamento()`: Valida campos do financiamento
- `temErros()`: Verifica existência de erros

## 🎨 Estilos

### Tailwind CSS

- Utiliza classes utilitárias
- Sistema de cores customizado (verde para consórcio, azul para financiamento)
- Componentes responsivos com breakpoints

### Classes Customizadas

Definidas em `index.css`:

- `.input-field`: Estilo padrão de inputs
- `.btn-primary`: Botão principal
- `.btn-secondary`: Botão secundário
- `.card`: Container padrão

## 🔄 Fluxo de Dados

1. **Entrada do Usuário**

   - Usuário preenche formulários
   - Estado atualizado via `onChange`

2. **Validação**

   - useEffect detecta mudança
   - Validação executada
   - Erros exibidos em tempo real

3. **Cálculo**

   - Após validação bem-sucedida
   - Debounce de 500ms
   - Loading exibido durante cálculo

4. **Exibição**

   - Resultados renderizados
   - Gráficos gerados
   - Scroll suave para resultados

5. **Exportação**
   - Botão de PDF disponível
   - Dados formatados
   - PDF gerado e baixado

## 🧪 Testando Modificações

### Alterar Taxas do Consórcio

Edite `src/utils/calculations.js`:

```javascript
// Linha ~11
const taxaAdministrativa = valorBem * 0.015; // Altere 0.015 (1.5%)
const comissao = valorBem * 0.02; // Altere 0.02 (2%)
```

### Alterar Cores

Edite `tailwind.config.js`:

```javascript
colors: {
  consorcio: {
    DEFAULT: '#22c55e', // Verde
  },
  financiamento: {
    DEFAULT: '#3b82f6', // Azul
  }
}
```

### Alterar Limites de Validação

Edite `src/utils/validations.js`:

```javascript
// Prazo mínimo/máximo
if (data.prazoMeses < 12) // Altere limite
if (data.prazoMeses > 360) // Altere limite
```

## 📊 Performance

### Otimizações Implementadas

1. **Debounce**: Evita cálculos excessivos durante digitação
2. **Renderização Condicional**: Componentes só renderizam quando necessário
3. **Loading States**: Feedback visual para usuário
4. **Lazy Evaluation**: Cálculos só executam quando dados são válidos

### Melhorias Futuras

- [ ] Memoização de cálculos com `useMemo`
- [ ] Lazy loading de gráficos
- [ ] Service Worker para cache
- [ ] Otimização de bundle com code splitting

## 🔐 Segurança

### Validações Implementadas

- ✅ Validação de tipos
- ✅ Limites de valores
- ✅ Sanitização de inputs numéricos
- ✅ Prevenção de valores negativos

### Considerações

- Não há autenticação (aplicação pública)
- Não há armazenamento de dados sensíveis
- Cálculos executados no cliente

## 🚀 Deploy

### Build de Produção

```bash
npm run build
```

### Opções de Hospedagem

- **Vercel**: Deploy automático via Git
- **Netlify**: Drag and drop da pasta `dist`
- **GitHub Pages**: Via GitHub Actions
- **AWS S3 + CloudFront**: Para projetos corporativos

### Variáveis de Ambiente

Não há variáveis de ambiente necessárias para o funcionamento básico.

## 🔧 Troubleshooting

### Problema: Gráficos não aparecem

**Solução**: Verifique se a biblioteca `recharts` está instalada:

```bash
npm install recharts
```

### Problema: PDF em branco

**Solução**: Verifique se `jspdf` e `html2canvas` estão instalados:

```bash
npm install jspdf html2canvas
```

### Problema: Estilos não aplicados

**Solução**: Reconstrua o Tailwind:

```bash
npm run dev
```

## 📝 Padrões de Código

### Nomenclatura

- **Componentes**: PascalCase (ex: `FormularioConsorcio.jsx`)
- **Funções**: camelCase (ex: `calcularConsorcio()`)
- **Constantes**: camelCase (ex: `taxaAdministrativa`)
- **Arquivos utilitários**: camelCase (ex: `calculations.js`)

### Estrutura de Componentes

```javascript
// Imports
import React from 'react';

// Componente
const MeuComponente = ({ props }) => {
  // Estados
  // Efeitos
  // Handlers
  // Render
  return (/* JSX */);
};

// Export
export default MeuComponente;
```

## 🤝 Contribuindo

### Checklist para Pull Requests

- [ ] Código segue os padrões do projeto
- [ ] Não há erros de linting
- [ ] Componentes são responsivos
- [ ] Validações estão implementadas
- [ ] Comentários em código complexo
- [ ] README atualizado (se necessário)

### Adicionando Novos Cálculos

1. Adicione função em `calculations.js`
2. Crie testes (se aplicável)
3. Atualize componentes relevantes
4. Documente no README

## 📚 Recursos Adicionais

### Documentação de Bibliotecas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [jsPDF](https://github.com/parallax/jsPDF)

### Fórmulas Financeiras

- **Sistema Price**: PMT = PV × [i(1+i)^n]/[(1+i)^n-1]
- **Taxa Mensal**: (1 + taxa_anual)^(1/12) - 1

---

Desenvolvido com foco em código limpo, manutenível e escalável.
