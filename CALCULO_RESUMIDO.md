# Cálculo Resumido - Consórcio e Financiamento

## 🎯 Diferença Principal

- **Consórcio**: Sem juros, apenas taxa administrativa (divisão simples)
- **Financiamento**: Com juros compostos (Sistema Price)

---

## 📊 CONSÓRCIO

### Fórmulas

1. **Valor com Taxa**

   ```
   valorComTaxa = valorBem × (1 + taxaAdministrativa / 100)
   ```

2. **Parcela Mensal**

   ```
   Tempestade = valorComTaxa / prazoMeses
   ```

3. **Custo Total**
   ```
   custoTotal = (parcelaMensal × prazoMeses) + lance
   ```

### Exemplo

- Valor: R$ 50.000
- Taxa: 15%
- Prazo: 60 meses
- Lance: R$ 5.000

**Cálculo:**

- Valor com taxa: R$ 57.500
- Parcela: R$ 958,33
- Custo total: R$ 62.500

---

## 🏦 FINANCIAMENTO (Sistema Price)

### Fórmulas

1. **Valor Financiado**

   ```
   valorFinanciado = valorBem - entrada
   ```

2. **Taxa Mensal** (conversão de juros compostos)

   ```
   taxaMensal = (1 + jurosAnuais/100)^(1/12) - 1
   ```

3. **Fator Multiplicador**

   ```
   fator = (1 + taxaMensal)^prazoMeses
   ```

4. **Parcela Mensal** (Fórmula Price)

   ```
   parcelaMensal = valorFinanciado × (taxaMensal × fator) / (fator - 1)
   ```

5. **Totais**
   ```
   custoTotal = (parcelaMensal × prazoMeses) + entrada
   totalJuros = custoTotal - valorBem
   ```

### Exemplo

- Valor: R$ 50.000
- Entrada: R$ 5.000
- Juros anuais: 12%
- Prazo: 60 meses

**Cálculo:**

- Valor financiado: R$ 45.000
- Taxa mensal: ~0,949% (12% a.a.)
- Parcela: R$ 1.001,00
- Custo total: R$ 65.060
- Total juros: R$ 15.060

---

## 💰 COMPARAÇÃO

### Exemplo Prático

| Item                 | Consórcio | Financiamento | Diferença |
| -------------------- | --------- | ------------- | --------- |
| Parcela Mensal       | R$ 958,33 | R$ 1.001,00   | R$ 42,67  |
| Custo Total          | R$ 62.500 | R$ 65.060     | R$ 2.560  |
| Total em Juros/Taxas | R$ 7.500  | R$ 15.060     | R$ 7.560  |

**Conclusão:** Consórcio economiza R$ 2.560 (3,93% mais barato)

---

## ⚠️ Observações

### Consórcio

- ✅ Sem juros compostos
- ✅ Apenas taxa administrativa fixa
- ✅ Parcelas sempre fixas
- ⚠️ Não inclui tempo até contemplação

### Financiamento

- ✅ Juros compostos (Sistema Price)
- ✅ Parcelas fixas durante todo período
- ⚠️ Não inclui IOF, seguros e taxas bancárias

### Valores Padrão Recomendados

- Taxa Administrativa Consórcio: **15%**
- Juros Anuais Financiamento: **12%** (carros), **10%** (imóveis)
- Prazo: **60 meses** (carros), **240 meses** (imóveis)

---

## 📝 Nota

Esta é uma estimativa comparativa. Para decisões reais, consulte especialistas financeiros.
