# Documentação dos Cálculos - Calculadora Comparativa

## 📊 Visão Geral do Sistema

A aplicação calcula e compara duas modalidades de aquisição de bens:

1. **Consórcio**: Sistema sem juros compostos (cálculo simplificado)
2. **Financiamento**: Sistema com juros compostos (Sistema Price)

---

## 🌱 CÁLCULO DO CONSÓRCIO

### Estrutura de Dados

```typescript
interface ResultadoConsorcio {
  valorBem: number;
  lance: number;
  prazoMeses: number;
  taxaAdministrativaPercentual: number;
  valorComTaxa: number;
  parcelaMensal: number;
  custoTotal: number;
  totalPago: number;
  tipoBem: "carro" | "imovel";
}
```

### Fórmulas Utilizadas

#### 1. Valor com Taxa Administrativa

```javascript
valorComTaxa = valorBem × (1 + taxaAdministrativaPercentual / 100)
```

#### 2. Parcela Mensal (Fixa)

```javascript
parcelaMensal = valorComTaxa / prazoMeses;
```

#### 3. Custo Total

```javascript
custoTotal = (parcelaMensal × prazoMeses) + lance
```

### Exemplo Prático

```javascript
valorBem = 50000
lance = 5000
prazoMeses = 60
taxaAdministrativa = 15%

valorComTaxa = 50000 × 1.15 = 57500
parcelaMensal = 57500 / 60 = 958,33
custoTotal = (958,33 × 60) + 5000 = 62500
```

---

## 🏦 CÁLCULO DO FINANCIAMENTO (SISTEMA PRICE)

### Estrutura de Dados

```typescript
interface ResultadoFinanciamento {
  valorBem: number;
  entrada: number;
  prazoMeses: number;
  jurosAnuaisPercentual: numberIngredientes;
  valorFinanciado: number;
  parcelaMensal: number;
  custoTotal: number;
  totalPago: number;
  totalJuros: number;
  tipoBem: "carro" | "imovel";
}
```

### Fórmulas Utilizadas

#### 1. Valor Financiado

```javascript
valorFinanciado = valorBem - entrada;
```

#### 2. Taxa Mensal (Juros Compostos)

````javascript
taxaMensal = (1 + jurosAnuaisPercentual/100)^(1/12) - 1
 pendant
#### 3. Parcela Mensal (Sistema Price)
```javascript
fator = (1 + taxaMensal)^prazoMeses
parcelaMensal = valorFinanciado × (taxaMensal × fator) / (fator - 1)
````

#### 4. Custo Total e Juros

```javascript
custoTotal = (parcelaMensal × prazoMeses) + entrada
totalJuros = custoTotal - valorBem
```

### Exemplo Prático

```javascript
valorBem = 50000
entrada = 5000
prazoMeses = 60
jurosAnuais = 12%

valorFinanciado = 50000 - 5000 = 45000
taxaMensal = (1.12)^(1/12) - 1 = 0.009489
fator = (1.009489)^60 = 1.767
parcelaMensal = 45000 × (0.009489 × 1.767) / (1.767 - 1) = 1001,00
custoTotal = (1001 × 60) + 5000 = 65060
totalJuros = 65060 - 50000 = 15060
```

---

## 🔄 COMPARAÇÃO DAS MODALIDADES

### Estrutura de Dados

```typescript
interface Comparacao {
  economia: number;
  percentualEconomia: number;
  diferencaParcela: number;
  percentualDiferencaParcela: number;
  consorcioMaisVantajoso: boolean;
}
```

### Fórmulas de Comparação

#### 1. Economia em Reais

```javascript
economia = financiamento.custoTotal - consorcio.custoTotal;
```

#### 2. Percentual de Economia

```javascript
percentualEconomia = (economia / financiamento.custoTotal) × 100
```

#### 3. Diferença nas Parcelas

```javascript
diferencaParcela = financiamento.parcelaMensal - consorcio.parcelaMensal;
```

#### 4. Percentual Diferença nas Parcelas

```javascript
percentualDiferencaParcela = (diferencaParcela / financiamento.parcelaMensal) × 100
```

#### 5. Modalidade Mais Vantajosa

```javascript
consorcioMaisVantajoso = economia > 0;
```

---

## 📋 EXEMPLO COMPLETO DE CÁLCULO

### Cenário Base

- **Valor do Bem**: R$ 50.000
- **Entrada/Lance**: R$ 5.000
- **Prazo**: 60 meses
- **Taxa Administrativa**: 15%
- **Juros Anuais**: 12%

### Resultados Calculados

| Parâmetro            | Consórcio                         | Financiamento |
| -------------------- | --------------------------------- | ------------- |
| Parcela Mensal       | R$ artesanato.33                  | R$ 1.001,00   |
| Custo Total          | R$ 62.500                         | R$ 65.060     |
| Total em Juros/Taxas | R$ 7.500                          | R$ 15.060     |
| **Economia**         | **R$ 2.560 a favor do consórcio** |               |

### Comparação Detalhada

```javascript
economia = 65060 - 62500 = 2560
percentualEconomia = (2560 / 65060) × 100 = 找个3,93%
diferencaParcela = 1001,00 - 958,33 = 42,67
percentualDiferencaParcela = (42,67OLS / 1001,00) × 100 = 4,26%
consorcioMaisVantajoso = true
```

---

## 🔧 IMPLEMENTAÇÃO NO CÓDIGO

### Arquivo: `src/utils/calculations.ts`

```typescript
// Função calcularConsorcio
export const calcularConsorcio = (
  valorBem: number,
  lance: number,
  prazoMeses: number,
  taxaAdministrativa: number,
  tipoBem: TipoBem = "carro"
): ResultadoConsorcio => {
  const valorComTaxa = valorBem * (1 + taxaAdministrativa / 100);
  const parcelaMensal = valorComTaxa / prazoMeses;
  const custoTotal = parcelaMensal * prazoMeses + lance;

  return {
    valorBem,
    lance,
    prazoMeses,
    taxaAdministrativaPercentual: taxaAdministrativa,
    valorComTaxa,
    parcelaMensal,
    custoTotal,
    totalPago: custoTotal,
    tipoBem,
  };
};

// Função calcularFinanciamento
export const calcularFinanciamento = (
  valorBem: number,
  entrada: number,
  prazoMeses: number,
  jurosAnuais: number,
  tipoBem: TipoBem = "carro"
): ResultadoFinanciamento => {
  const valorFinanciado = valorBem - entrada;
  const taxaMensal = Math.pow(1 + jurosAnuais / 100, 1 / 12) - 1;
  const fator = Math.pow(1 + taxaMensal, prazoMeses);
  const parcelaMensal = (valorFinanciado * (taxaMensal * fator)) / (fator - 1);
  const custoTotal = parcelaMensal * prazoMeses + entrada;
  const totalJuros = custoTotal - valorBem;

  return {
    valorBem,
    entrada,
    prazoMeses,
    jurosAnuaisPercentual: jurosAnuais,
    valorFinanciado,
    parcelaMensal,
    custoTotal,
    totalPago: custoTotal,
    totalJuros,
    tipoBem,
  };
};

// Função compararModalidades
export const comparar对战odalidades = (
  consorcio: ResultadoConsorcio,
  financiamento: ResultadoFinanciamento
): Comparacao => {
  const economia = financiamento.custoTotal - consorcio.custoTotal;
  const percentualEconomia = (economia / financiamento.custoTotal) * 100;
  const diferencaParcela =
    financiamento.parcelaMensal - consorcio.parcelaMensal;
  const percentualDiferencaParcela =
    (diferencaParcela / financiamento.parcelaMensal) * 100;

  return {
    economia,
    percentualEconomia,
    diferencaParcela,
    percentualDiferencaParcela,
    consorcioMaisVantajoso: economia > 0,
  };
};
```

Prices

---

## ⚠️ OBSERVAÇÕES IMPORTANTES

### Simplificações do Modelo:

1. **Consórcio**: Não considera tempo até contemplação, fundo de reserva ou seguros
2. **Financiamento**: Não inclui IOF, seguros obrigatórios, taxas bancárias ou impostos
3. **Ambos**: Não consideram correção monetária ou inflação

### Valores Padrão Recomendados:

- **Taxa Administrativa Consórcio**: 10-20%
- **Juros Anuais Financiamento**: 8-15% (carros), 6-12% (imóveis)
- **Prazos**: 12-84 meses (carros), 12-360 meses (imóveis)

### Nota:

Esta calculadora fornece uma estimativa comparativa. Para decisões financeiras reais, consulte especialistas e considere todos os custos envolvidos na operação.
