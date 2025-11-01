# Documentação de Alteração: Correção do Cálculo de Consórcio com Lance

**Data**: 01/11/2025  
**Arquivo alterado**: `src/utils/calculations.ts`  
**Função modificada**: `calcularConsorcio`

---

## 📋 Resumo da Alteração

Foi corrigida a ordem de cálculo do consórcio quando o cliente indica um lance. Anteriormente, o lance não reduzia o valor das parcelas mensais. Agora, o lance é deduzido do valor com taxas **antes** de calcular a parcela mensal.

---

## ❌ Problema Identificado

### Lógica Anterior (INCORRETA):

```typescript
// 1. Aplicava a taxa sobre o valor do bem
const valorComTaxa = valorBem * (1 + taxaAdministrativa / 100);

// 2. Calculava a parcela SEM considerar o lance
const parcelaMensal = valorComTaxa / prazoMeses;

// 3. Apenas somava o lance ao custo total
const custoTotal = parcelaMensal * prazoMeses + lance;
```

### Por que estava incorreto:

- O lance **não estava reduzindo** o valor das parcelas mensais
- O lance era apenas somado ao custo total no final
- Isso não refletia a realidade de um consórcio, onde o lance reduz o valor a ser parcelado

---

## ✅ Solução Implementada

### Lógica Nova (CORRETA):

```typescript
// 1. Aplica a taxa administrativa sobre o valor do bem
const valorComTaxa = valorBem * (1 + taxaAdministrativa / 100);

// 2. Deduz o lance do valor com taxas para calcular o valor a parcelar
const valorAposLance = valorComTaxa - lance;

// 3. Parcela mensal: (valor após lance) dividido pelo prazo
const parcelaMensal = valorAposLance / prazoMeses;

// 4. Custo total: (Parcela × Prazo) + Lance
const custoTotal = parcelaMensal * prazoMeses + lance;
```

### Por que está correto agora:

- ✅ O lance **reduz o valor a ser parcelado** (valorAposLance)
- ✅ A parcela mensal é calculada sobre o valor já deduzido do lance
- ✅ O custo total mantém a consistência matemática: `(parcelas × prazo) + lance = valorComTaxa`
- ✅ Reflete corretamente o funcionamento real de um consórcio

---

## 📊 Exemplos Comparativos

### Exemplo 1: Consórcio de R$ 200.000

**Dados de entrada:**

- Valor do bem: R$ 200.000,00
- Taxa administrativa: 15%
- Lance: R$ 40.000,00
- Prazo: 100 meses

**Cálculo ANTERIOR (incorreto):**

- Valor com taxa: R$ 230.000,00
- Parcela mensal: R$ 230.000 ÷ 100 = **R$ 2.300,00** ❌
- Custo total: (R$ 2.300 × 100) + R$ 40.000 = R$ 270.000,00 ❌

**Cálculo NOVO (correto):**

- Valor com taxa: R$ 230.000,00
- Valor após lance: R$ 230.000 - R$ 40.000 = R$ 190.000,00
- Parcela mensal: R$ 190.000 ÷ 100 = **R$ 1.900,00** ✅
- Custo total: (R$ 1.900 × 100) + R$ 40.000 = R$ 230.000,00 ✅

**Benefício:** Parcela R$ 400,00 menor por mês

---

### Exemplo 2: Consórcio de R$ 50.000

**Dados de entrada:**

- Valor do bem: R$ 50.000,00
- Taxa administrativa: 15%
- Lance: R$ 5.000,00
- Prazo: 60 meses

**Cálculo ANTERIOR (incorreto):**

- Valor com taxa: R$ 57.500,00
- Parcela mensal: R$ 57.500 ÷ 60 = **R$ 958,33** ❌
- Custo total: (R$ 958,33 × 60) + R$ 5.000 = R$ 62.500,00 ❌

**Cálculo NOVO (correto):**

- Valor com taxa: R$ 57.500,00
- Valor após lance: R$ 57.500 - R$ 5.000 = R$ 52.500,00
- Parcela mensal: R$ 52.500 ÷ 60 = **R$ 875,00** ✅
- Custo total: (R$ 875 × 60) + R$ 5.000 = R$ 57.500,00 ✅

**Benefício:** Parcela R$ 83,33 menor por mês

---

### Exemplo 3: Consórcio sem lance

**Dados de entrada:**

- Valor do bem: R$ 50.000,00
- Taxa administrativa: 15%
- Lance: R$ 0,00
- Prazo: 60 meses

**Resultado (em ambos os casos):**

- Valor com taxa: R$ 57.500,00
- Valor após lance: R$ 57.500,00 (sem dedução)
- Parcela mensal: **R$ 958,33**
- Custo total: R$ 57.500,00

**Observação:** Quando não há lance, o cálculo permanece idêntico.

---

## 🎯 Impacto nas Telas

### Telas afetadas automaticamente:

1. **ResultadosModernos** - Exibirá a parcela mensal correta
2. **BotaoGerarPDF** - O PDF gerado terá os valores corretos
3. **Comparação entre modalidades** - A comparação entre consórcio e financiamento será mais precisa

### Nenhuma alteração necessária em:

- Formulários (entrada de dados)
- Validações
- Componentes visuais
- Estrutura de dados

Todos os componentes que consomem o resultado de `calcularConsorcio` automaticamente receberão os valores corretos.

---

## ✅ Validação

Foram executados testes com 3 cenários diferentes:

1. ✅ Consórcio com lance grande (R$ 40.000)
2. ✅ Consórcio com lance médio (R$ 5.000)
3. ✅ Consórcio sem lance (R$ 0)

Todos os testes mantiveram a **consistência matemática**:  
`(parcelas × prazo) + lance = valorComTaxa`

---

## 📝 Observações Técnicas

- A alteração foi feita apenas na função `calcularConsorcio` em `src/utils/calculations.ts`
- Não foi necessário alterar a interface `ResultadoConsorcio`
- Não foram introduzidos erros de linting
- A alteração é retrocompatível com todo o código existente
- O custo total continua sendo calculado corretamente

---

## 🔄 Próximos Passos (se necessário)

Se for identificada a necessidade de ajustes adicionais:

1. Considerar adicionar testes unitários automatizados para esta função
2. Avaliar se outras funções de cálculo precisam de revisão similar
3. Documentar o comportamento esperado em comentários JSDoc mais detalhados

---

**Documentação criada por:** IA Assistant  
**Revisado e validado em:** 01/11/2025
