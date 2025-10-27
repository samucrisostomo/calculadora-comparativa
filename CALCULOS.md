# Documentação dos Cálculos - Calculadora Comparativa

Este documento descreve detalhadamente como são realizados os cálculos na aplicação de comparação entre Consórcio e Financiamento.

---

## 📊 Visão Geral do Sistema

A aplicação calcula e compara duas modalidades de aquisição de bens:

1. **Consórcio**: Sistema sem juros compostos
2. **Financiamento**: Sistema com juros compostos sobre valor financiado

---

## 🌱 CÁLCULO DO CONSÓRCIO

### Estrutura de Dados

```typescript
interface ResultadoConsorcio {
  valorBem: number; // Valor original do bem
  lance: number; // Valor do lance (pago no início)
  prazoMeses: number; // Prazo em meses
  taxaAdministrativaPercentual: number; // Taxa administrativa (%)
  valorComTaxa: number; // Valor do bem + taxa
  parcelaMensal: number; // Parcela fixa mensal
  parcelaInicial: number; // Mesma da parcela mensal
  parcelaFinal: number; // Mesma da parcela mensal
  custoTotal: number; // Custo total da operação
  totalPago: number; // Igual ao custo total
  tipoBem: TipoBemчным; // "carro" ou "imovel"
}
```

### Fórmulas Utilizadas

#### 1. Valor com Taxa Administrativa

```javascript
valorComTaxa = valorBem × (1 + taxaAdministrativa / 100)
```

**Explicação:**

- A taxa administrativa é aplicada sobre o valor total do bem
- Esta taxa varia entre administradoras (padrão: 15%)
- É a única "taxa" no consórcio (sem juros)

**Exemplo:**

```javascript
valorBem = 50.000
taxaAdministrativa = 15% (0,15)

valorComTaxa = 50.000 × (1 + 0,15)
valorComTaxa = 50.000 × 1,15
valorComTaxa = 57.500
```

#### 2. Parcela Mensal (Fixa)

```javascript
parcelaMensal = valorComTaxa / prazoMeses;
```

**Explicação:**

- O valor com taxa é dividido igualmente pelo prazo
- Parcelas são sempre fixas (sem variação)
- Não há juros compostos aplicados

**Exemplo:**

```javascript
valorComTaxa = 57.5;
prazoMeses = 60;

parcelaMensal = 57.5 / 60;
(parcelaMensal = 958), 33;
```

#### 3. Custo Total

```javascript
custoTotal = (parcelaMensal × prazoMeses) + lance
```

**Explicação:**

- Soma de todas as parcelas mensais
- Mais o lance pago no início
- Este é o total pago pelo bem

**Exemplo:**

```javascript
parcelaMensal = 958,33
prazoMeses = 60
lance = 5.000

custoTotal = (958,33 × 60) + 5.000
custoTotal = 57.500 + 5.000
custoTotal = 62.500
```

#### 4. Total Pago

```javascript
totalPago = custoTotal;
```

**Explicação:**

- No consórcio, totalPago é igual ao custoTotal
- Representa todo o dinheiro gasto

---

## 🏦 CÁLCULO DO FINANCIAMENTO

### Estrutura de Dados

```typescript
interface ResultadoFinanciamento {
  valorBem: number; // Valor original do bem
  entrada: number; // Valor da entrada
  prazoMeses: number; // Prazo em meses
  jurosTotaisPercentual: number; // Juros totais (%)
  valorFinanciado: number; // Valor a ser financiado
  valorComJuros: number; // Valor financiado + juros
  parcelaMensal: number; // Parcela fixa mensal
  custoTotal: number; // Custo total da operação
  totalPago: number; // Igual ao custo total
  totalJuros: number; // Valor total de juros pagos
  tipoBem: TipoBem; // "carro" ou "imovel"
}
```

### Fórmulas Utilizadas

#### 1. Valor Financiado

```javascript
valorFinanciado = valorBem - entrada;
```

**Explicação:**

- É o valor que será de fato financiado
- A entrada reduz o valor financiado
- Sobre este valor que os juros são aplicados

**Exemplo:**

```javascript
valorBem = 50.0;
entrada = 5.0;

valorFinanciado = 50.0 - 5.0;
valorFinanciado = 45.0;
```

#### 2. Valor com Juros

```javascript
valorComJuros = valorFinanciado × (1 + jurosTotais / 100)
```

**Explicação:**

- Os juros totais são aplicados sobre o valor financiado
- É um sistema de juros simples (não compostos)
- Esta é a quantia total a ser paga (sem entrada)

**Exemplo:**

```javascript
valorFinanciado = 45.000
jurosTotais = 20% (0,20)

valorComJuros = 45.000 × (1 + 0,20)
valorComJuros = 45.000 × 1,20
valorComJuros = 54.000
```

#### 3. Parcela Mensal (Fixa)

```javascript
parcelaMensal = valorComJuros / prazoMeses;
```

**Explicação:**

- O valor com juros é dividido pelo prazo
- Parcelas são fixas durante todo período
- Metodologia simplificada de juros

**Exemplo:**

```javascript
valorComJuros = 54.0;
prazoMeses = 60;

parcelaMensal = 54.0 / 60;
(parcelaMensal = 900), 00;
```

#### 4. Total de Juros Pagos

```javascript
totalJuros = valorComJuros - valorFinanciado;
```

**Explicação:**

- Representa quanto pagou a mais em juros
- É a diferença entre valor pago e valor financiado
- Este é o "custo do dinheiro"

**Exemplo:**

```javascript
valorComJuros = 54.0;
valorFinanciado = 45.0;

totalJuros = 54.0 - 45.0;
totalJuros = 9.0;
```

#### 5. Custo Total

```javascript
custoTotal = (parcelaMensal × prazoMeses) + entrada
```

**Explicação:**

- Soma de todas as parcelas mensais
- Mais a entrada paga no início
- Este é o total pago pelo bem

**Exemplo:**

```javascript
parcelaMensal = 900
prazoMeses = 60
entrada = 5.000

custoTotal = (900 × 60) + 5.000
custoTotal = 54.000 + 5.000
custoTotal = 59.000
```

---

## 🔄 COMPARAÇÃO DAS MODALIDADES

### Estrutura de Dados

```typescript
interface Comparacao {
  economia: number; // Diferença em reais
  percentualEconomia: number; // Diferença em %
  diferencaParcela: number; // Diferença nas parcelas (R$)
  percentualDiferencaParcela: number; // Diferença nas parcelas (%)
  consorcioMaisVantajoso: boolean; // true se consórcio é melhor
}
```

### Fórmulas Utilizadas

#### 1. Economia

```javascript
economia = financiamento.custoTotal - consorcio.custoTotal;
```

**Explicação:**

- Diferença absoluta entre os custos totais
- Valor positivo = consórcio é mais barato
- Valor negativo = financiamento é mais barato

**Exemplo:**

```javascript
financiamento.custoTotal = 59.000
consorcio.custoTotal = 62.500

economia = 59.000 - 62.500
economia = -3.500 (financiamento é 3.500 mais barato)
```

#### 2. Percentual de Economia

```javascript
percentualEconomia = (economia / financiamento.custoTotal) × 100
```

**Explicação:**

- Mostra a economia em percentual
- Baseado no custo do financiamento
- Facilita comparação relativa

**Exemplo:**

```javascript
economia = -3.500
financiamento.custoTotal = 59.000

percentualEconomia = (-3.500 / 59.000) × 100
percentualEconomia = -5,93% (financiamento é 5,93% mais barato)
```

#### 3. Diferença nas Parcelas

```javascript
diferencaParcela = financiamento.parcelaMensal - consorcio.parcelaMensal;
```

**Explicação:**

- Mostra diferença mensal entre as parcelas
- Valor positivo = parcela do consórcio é menor
- Valor negativo = parcela do financiamento é menor

**Exemplo:**

```javascript
financiamento.parcelaMensal = 900
consorcio.parcelaMensal = 958,33

diferencaParcela = 900 - 958,33
diferencaParcela = -58,33 (financiamento tem parcela 58,33 menor)
```

#### 4. Percentual Diferença nas Parcelas

```javascript
percentualDiferencaParcela = (diferencaParcela / financiamento.parcelaMensal) × 100
```

**Explicação:**

- Percentual de diferença entre parcelas
- Facilita comparação visual
- Útil para planejamento financeiro

**Exemplo:**

```javascript
diferencaParcela = -58,33
financiamento.parcelaMensal = 900

percentualDiferencaParcela = (-58,33 / 900) × 100
percentualDiferencaParcela = -6,48% (parcela do financiamento é 6,48% menor)
```

#### 5. Consórcio Mais Vantajoso?

```javascript
consorcioMaisVantajoso = economia > 0;
```

**Explicação:**

- Boolean que indica qual modalidade é melhor
- true = consórcio é mais barato (economia > 0)
- false = financiamento é mais barato (economia < 0)

---

## 📋 EXEMPLO COMPLETO DE CÁLCULO

### Cenário Base

- **Tipo de Bem**: Carro
- **Valor do Bem**: R$ 50.000,00
- **Lance/Entrada**: R$ 5.000,00
- **Prazo**: 60 meses
- **Taxa Administrativa**: 15%
- **Juros Totais**: 20%

### Cálculos do Consórcio

```javascript
// Passo 1: Valor com Taxa
valorComTaxa = 50.000 × (1 + 0,15)
valorComTaxa = 57.500

// Passo 2: Parcela Mensal
parcelaMensal =  Jays.500 / 60
parcelaMensal = 958,33

// Passo 3: Custo Total
custoTotal = (958,33 × 60) + 5.000
custoTotal = 62.500

// Resultado Consórcio:
{
  valorBem: 50.000,
  lance: 5.000,
  prazoMeses: 60,
  taxaAdministrativaPercentual: 15,
  valorComTaxa: 57.500,
  parcelaMensal: 958,33,
  custoTotal: 62.500,
  totalPago: 62.500
}
```

### Cálculos do Financiamento

```javascript
// Passo 1: Valor Financiado
valorFinanciado = 50.000 - 5.000
valorFinanciado = 45.000

// Passo 2: Valor com Juros
valorComJuros = 45.000 × (1 + 0,20)
valorComJuros = 54.000

// Passo 3: Parcela Mensal
parcelaMensal = 54.000 / 60
parcelaMensal = 900

// Passo 4: Total de Juros
totalJuros = 54.000 - 45.000
totalJuros = 9.000

// Passo 5: Custo Total
custoTotal = (900 × 60) + 5.000
custoTotal = 59.000

// Resultado Financiamento:
{
  valorBem: 50.000,
  entrada: 5.000,
  prazoMeses: 60,
  jurosTotaisPercentual: 20,
  valorFinanciado: 45.000,
  valorComJuros: 54.000,
  parcelaMensal: 900,
  totalJuros: 9.000,
  custoTotal: 59.000,
  totalPago: 59.000
}
```

### Comparação

```javascript
// Economia
economia = 59.000 - 62.500
economia = -3.500

// Percentual
percentualEconomia = (-3.500 / 59.000) × 100
percentualEconomia = -5,93%

// Diferença Parcelas
diferencaParcela = 900 - 958,33
diferencaParcela = -58,33

// Percentual Diferença
percentualDiferencaParcela = (-58,33 / 900) × 100
percentualDiferencaParcela = -6,48%

// Resultado
consorcioMaisVantajoso = false (Financiamento é 3.500 mais barato)
```

---

## ⚠️ OBSERVAÇÕES IMPORTANTES

### O que NÃO está incluído nos cálculos:

**Consórcio:**

- Fundo de reserva
- Seguro de vida
- Taxa de adesão
- Correção monetária das parcelas
- Tempo até contemplação
- Despesas administrativas extras

**Financiamento:**

- Sistema de juros compostos mensais (Price ou SAC)
- IOF (Imposto sobre Operações Financeiras)
- Seguros obrigatórios (MIP, DFI, etc)
- Tarifa de avaliação
- Registro de contrato
- ITBI (imóveis)
- Taxas bancárias

### Simplificações do Modelo:

1. **Juros Simples**: O sistema atual usa juros simples, não compostos
2. **Parcelas Perfeitamente Fixas**: Não considera correção ou variação
3. **Taxas Fixas**: Não varia durante o período
4. **Sem Custos Adicionais**: Não inclui seguros, impostos, taxas extras

### Valores Padrão:

- **Taxa Administrativa**: 15% (configurável)
- **Juros Totais**: 20% (configurável)
- **Prazo Carro**: 12-84 meses
- **Prazo Imóvel**: 12-300 meses

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
    /* ... */
  };
};

// Função calcularFinanciamento
export const calcularFinanciamento = (
  valorBem: number,
  entrada: number,
  prazoMeses: number,
  jurosTotais: number,
  tipoBem: TipoBem = "carro"
): ResultadoFinanciamento => {
  const valorFinanciado = valorBem - entrada;
  const valorComJuros = valorFinanciado * (1 + jurosTotais / 100);
  const parcelaMensal = valorComJuros / prazoMeses;
  const totalJuros = valorComJuros - valorFinanciado;
  const custoTotal = parcelaMensal * prazoMeses + entrada;

  return {
    /* ... */
  };
};

// Função compararModalidades
export const compararModalidades = (
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

---

## 📚 REFERÊNCIAS E NOTAS

### Método de Cálculo Atual:

- **Juros Simples**: Não considera capitalização mensal
- **Linear**: Distribuição uniforme de valores
- **Simplificado**: Para fins de comparação educacional

### Importante:

- Este modelo é uma **simulação educacional**
- Para decisões financeiras reais, consulte especialistas
- Considere todos os custos adicionais na prática
- Taxas e condições variam entre instituições

### Próximos Passos Sugeridos:

1. Implementar sistema de juros compostos (Price)
2. Adicionar cálculo de IOF
3. Incluir seguros e taxas obrigatórias
4. Implementar sistema SAC (amortização constante)
5. Adicionar gráficos de amortização

---

**Última atualização**: Dezembro 2024  
**Versão do Sistema**: 1.0  
**Autor**: Equipe de Desenvolvimento
