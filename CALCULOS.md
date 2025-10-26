# Documentação dos Cálculos

## 📊 Fórmulas Utilizadas

### Consórcio

#### 1. Valor com Taxa Administrativa

```
Valor com Taxa = Valor do Bem × (1 + Taxa Administrativa %)
```

**Exemplo:**
- Valor do Bem: R$ 50.000
- Taxa Administrativa: 15%
- Valor com Taxa = 50.000 × (1 + 0,15) = R$ 57.500

#### 2. Parcela Mensal (Fixa)

```
Parcela Mensal = Valor com Taxa ÷ Prazo em Meses
```

**Exemplo:**
- Valor com Taxa: R$ 57.500
- Prazo: 60 meses
- Parcela Mensal = 57.500 ÷ 60 = R$ 958,33

#### 3. Custo Total

```
Custo Total = (Parcela Mensal × Prazo) + Lance
```

**Exemplo:**
- Parcela Mensal: R$ 958,33
- Prazo: 60 meses
- Lance: R$ 5.000
- Custo Total = (958,33 × 60) + 5.000 = R$ 62.500

### Financiamento

#### 1. Valor Financiado

```
Valor Financiado = Valor do Bem - Entrada
```

**Exemplo:**
- Valor do Bem: R$ 50.000
- Entrada: R$ 5.000
- Valor Financiado = 50.000 - 5.000 = R$ 45.000

#### 2. Valor com Juros

```
Valor com Juros = Valor Financiado × (1 + Juros Totais %)
```

**Exemplo:**
- Valor Financiado: R$ 45.000
- Juros Totais: 20%
- Valor com Juros = 45.000 × (1 + 0,20) = R$ 54.000

#### 3. Parcela Mensal (Fixa)

```
Parcela Mensal = Valor com Juros ÷ Prazo em Meses
```

**Exemplo:**
- Valor com Juros: R$ 54.000
- Prazo: 60 meses
- Parcela Mensal = 54.000 ÷ 60 = R$ 900

#### 4. Total de Juros Pagos

```
Total de Juros = Valor com Juros - Valor Financiado
```

**Exemplo:**
- Valor com Juros: R$ 54.000
- Valor Financiado: R$ 45.000
- Total de Juros = 54.000 - 45.000 = R$ 9.000

#### 5. Custo Total

```
Custo Total = (Parcela Mensal × Prazo) + Entrada
```

**Exemplo:**
- Parcela Mensal: R$ 900
- Prazo: 60 meses
- Entrada: R$ 5.000
- Custo Total = (900 × 60) + 5.000 = R$ 59.000

## 🔢 Exemplos de Cálculo

### Exemplo 1: Carro de R$ 50.000

#### Consórcio

- **Valor do Bem**: R$ 50.000,00
- **Lance**: R$ 5.000,00
- **Prazo**: 60 meses

**Cálculos:**

```
Taxa Admin = 50.000 × 0,015 = R$ 750,00
Comissão = 50.000 × 0,02 = R$ 1.000,00
Valor Financiado = 50.000 - 5.000 = R$ 45.000,00
Parcela = 45.000 ÷ 60 = R$ 750,00
Custo Total = (750 × 60) + 5.000 + 750 + 1.000 = R$ 51.750,00
```

#### Financiamento

- **Valor do Bem**: R$ 50.000,00
- **Entrada**: R$ 5.000,00
- **Prazo**: 60 meses
- **Taxa Anual**: 12%

**Cálculos:**

```
Taxa Mensal = (1,12)^(1/12) - 1 = 0,009489 (0,95%)
Valor Financiado = 50.000 - 5.000 = R$ 45.000,00
Parcela = 1.001,38 (via fórmula Price)
Custo Total = (1.001,38 × 60) + 5.000 = R$ 65.082,80
Total de Juros = 65.082,80 - 50.000 = R$ 15.082,80
```

#### Comparação

```
Economia = 65.082,80 - 51.750,00 = R$ 13.332,80
Percentual = (13.332,80 ÷ 65.082,80) × 100 = 20,49%
```

### Exemplo 2: Imóvel de R$ 300.000

#### Consórcio

- **Valor do Bem**: R$ 300.000,00
- **Lance**: R$ 30.000,00
- **Prazo**: 120 meses

**Cálculos:**

```
Taxa Admin = 300.000 × 0,015 = R$ 4.500,00
Comissão = 300.000 × 0,02 = R$ 6.000,00
Valor Financiado = 300.000 - 30.000 = R$ 270.000,00
Parcela = 270.000 ÷ 120 = R$ 2.250,00
Custo Total = (2.250 × 120) + 30.000 + 4.500 + 6.000 = R$ 310.500,00
```

#### Financiamento

- **Valor do Bem**: R$ 300.000,00
- **Entrada**: R$ 30.000,00
- **Prazo**: 120 meses
- **Taxa Anual**: 10%

**Cálculos:**

```
Taxa Mensal = (1,10)^(1/12) - 1 = 0,007974 (0,80%)
Valor Financiado = 300.000 - 30.000 = R$ 270.000,00
Parcela = 3.569,23 (via fórmula Price)
Custo Total = (3.569,23 × 120) + 30.000 = R$ 458.307,60
Total de Juros = 458.307,60 - 300.000 = R$ 158.307,60
```

#### Comparação

```
Economia = 458.307,60 - 310.500,00 = R$ 147.807,60
Percentual = (147.807,60 ÷ 458.307,60) × 100 = 32,25%
```

## 📐 Sistema Price vs. Outros Sistemas

### Sistema Price (Parcelas Fixas)

- ✅ Parcelas constantes durante todo período
- ✅ Facilita planejamento financeiro
- ❌ Juros maiores no início
- ❌ Amortização menor no início

**Características:**

- Usado pela maioria dos bancos
- Melhor para orçamento fixo
- Permite melhor previsibilidade

### Sistema SAC (não implementado)

- ✅ Juros menores ao longo do tempo
- ✅ Amortização constante
- ❌ Parcelas decrescentes
- ❌ Parcela inicial mais alta

## 🎯 Premissas dos Cálculos

### Consórcio

1. Taxa administrativa de 1,5% ao ano é cobrada sobre o valor total do bem
2. Comissão de 2% é cobrada uma única vez
3. Lance é dado no início e reduz o valor a ser parcelado
4. Parcelas são fixas (sem reajuste por inflação)
5. Não considera fundo de reserva

### Financiamento

1. Sistema Price (parcelas fixas)
2. Juros compostos mensais
3. Taxa fixa durante todo período
4. Não considera seguros obrigatórios
5. Não considera ITBI, cartório ou outros custos extras

## ⚠️ Observações Importantes

### O que NÃO está incluído:

**Consórcio:**

- Fundo de reserva (geralmente 5-10% da parcela)
- Seguro de vida
- Taxa de adesão
- Correção monetária das parcelas
- Tempo até a contemplação

**Financiamento:**

- IOF (Imposto sobre Operações Financeiras)
- Seguros obrigatórios (MIP, DFI)
- Tarifa de avaliação do imóvel
- Registro de contrato
- ITBI (imóveis)
- Despachante (veículos)
- Taxas bancárias

### Fatores que podem variar:

- Taxa administrativa varia entre administradoras (0,8% a 2,5%)
- Taxa de juros varia conforme banco e perfil do cliente
- Prazo disponível varia conforme o bem
- Comissão pode variar ou não existir

## 📚 Referências

1. **Sistema Price**: Tabela de amortização francesa
2. **Matemática Financeira**: Juros compostos
3. **Consórcio**: Lei nº 11.795/2008
4. **Financiamento**: Regulamentação Banco Central

---

**Nota**: Esta documentação é para fins educacionais. Para decisões financeiras reais, consulte um especialista e considere todos os custos envolvidos.
