---
level: GCSE
subject: Statistics
topic: "Index numbers and rates of change"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8382"
    spec_refs: ["3.5.16", "3.5.17", "3.5.18"]
  - board: Edexcel
    code: "1ST0"
    spec_refs: ["2d.01", "2d.02"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/statistics/gcse/statistics-8382/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/past-papers/gcse-statistics/
---

# Index numbers and rates of change

This file covers simple index numbers, (Higher) chain base and weighted index numbers, the retail price index (RPI), consumer price index (CPI) and gross domestic product (GDP), percentage change, reading rates of change from graphs and tables, crude birth and death rates, and (Higher, Edexcel) standardised rates.

## Overview

On both tiers: simple index numbers, RPI, CPI, GDP, rates of change from graphs and from tables using a given formula, crude rates. (HT only) Weighted index numbers; on Edexcel, (HT only) chain base index numbers and standardised rates.

### Board differences

- AQA 8382: 3.5.16 (E7a) rates of change from graphs and tables, 3.5.17 (E7b) rates of change from tables with a context formula including birth and death rates, 3.5.18 (E7c) index numbers, with weighted index numbers Higher only. Formulae for rates are given in the question.
- Edexcel 1ST0: 2d.01 index numbers (simple on both tiers; weighted and chain base Higher only), 2d.02 rates of change, with crude birth rate on both tiers and standardised birth rate Higher only. Formulae for rates are given. Edexcel expects predictions using rates of change.

## 3.5.18 / 2d.01 Index numbers

*Refs: AQA 3.5.18 (E7c) · Edexcel 2d.01. Tier: F & H (part Higher only).*

### What you need to know

- A simple index number compares a value with its value in a base year (or base period), which has index 100:

```latex
\text{index} = \frac{\text{value in given year}}{\text{value in base year}} \times 100
```

- An index of 125 means a 25% rise since the base year; 92 means an 8% fall.
- (HT only, Edexcel) Chain base index numbers compare each year with the year before:

```latex
\text{chain base index} = \frac{\text{value this year}}{\text{value last year}} \times 100
```

- (HT only) A weighted index number combines the indices of several items, each weighted by its importance (for example, its share of spending):

```latex
\text{weighted index} = \frac{\sum (\text{index} \times \text{weight})}{\sum \text{weight}}
```

- Know what the RPI, CPI and GDP measure.

### Explained

The Consumer Price Index (CPI) and the Retail Price Index (RPI) are weighted indices that track the price of a "basket" of goods and services that households buy. They measure inflation. The RPI also includes some housing costs, such as mortgage interest payments, that the CPI leaves out. Gross Domestic Product (GDP) measures the total value of goods and services produced by a country in a period; growth in GDP shows the economy growing.

Index numbers are good for comparing changes in items with very different prices: a 10% rise looks the same whether the item costs 50p or £50 000.

(HT only) Chain base indices show the rate of change from year to year. A chain index above 100 means an increase that year, even if it is smaller than the year before. A falling chain index that is still above 100 means prices are rising more slowly, not falling.

(HT only) To link chain indices back to a fixed base, multiply the multipliers: chain indices of 104 and 106 mean 1.04 × 1.06 = 1.1024, so the value is 110.2% of the original.

### Worked example

The price of a loaf was £1.20 in 2020 (base year), £1.32 in 2022 and £1.47 in 2024. Find the index numbers.

1. 2022: 1.32 ÷ 1.20 × 100 = 110.
2. 2024: 1.47 ÷ 1.20 × 100 = 122.5.
3. Interpretation: the price rose 22.5% from 2020 to 2024.

Reverse: an index (base 2020 = 100) is 135 in 2025. The 2020 price was £40. Find the 2025 price.

1. 40 × 1.35 = £54.

(HT only, Edexcel) Chain base. Annual bus fares: 2021 £2.00, 2022 £2.10, 2023 £2.31, 2024 £2.40.

1. 2022: 2.10 ÷ 2.00 × 100 = 105.
2. 2023: 2.31 ÷ 2.10 × 100 = 110.
3. 2024: 2.40 ÷ 2.31 × 100 = 103.9.
4. The fare rose each year; the biggest yearly rise was in 2023.

(HT only) Weighted index. A family's spending categories (base year = 100):

| Item | Index | Weight |
| --- | --- | --- |
| Food | 118 | 5 |
| Fuel | 140 | 2 |
| Clothing | 96 | 3 |

1. Σ(index × weight) = 590 + 280 + 288 = 1158.
2. Σweight = 10.
3. Weighted index = 115.8: the family's costs rose by about 15.8% overall.

### Common mistakes

- Dividing the wrong way (base ÷ current).
- Reading an index of 112 as a rise of 112%.
- (HT only) Treating a fall in the chain index (110 then 104) as a fall in price.

## 3.5.16, 3.5.17 / 2d.02 Rates of change

*Refs: AQA 3.5.16 (E7a), 3.5.17 (E7b) · Edexcel 2d.02. Tier: F & H (part Higher only).*

### What you need to know

- Interpret rates of change over time from graphs (percentage change, births, deaths, house prices, unemployment).
- Calculate and interpret rates of change from tables using a formula given in the question.
- Crude birth rate (and death rate) per 1000 people:

```latex
\text{crude birth rate} = \frac{\text{number of births}}{\text{total population}} \times 1000
```

- Make predictions using rates of change.
- (HT only, Edexcel) Standardised rates allow fair comparison between areas with different age structures. For each age group, multiply the area's rate per 1000 by the standard population for that group, then divide by 1000 and add (the exam gives the formula):

```latex
\text{standardised rate} = \sum \frac{\text{crude rate for the age group}}{1000} \times \text{standard population for the age group}
```

### Explained

Percentage change = change ÷ original × 100. On a graph, the steeper the line, the faster the rate of change; a line that still rises but less steeply means the increase is slowing down.

Crude rates are "crude" because they ignore age structure. A seaside town with many retired people will have a high crude death rate even if its people are healthy for their age. (HT only, Edexcel) Standardising applies each area's age-group rates to the same standard population, so the comparison is fair.

### Worked example

A town has a population of 48 000 and 552 births in a year. Find the crude birth rate.

1. 552 ÷ 48 000 × 1000 = 11.5 births per 1000 people.

Prediction: a town of 60 000 has a crude death rate of 9.2 per 1000. Predict the number of deaths next year.

1. 9.2 × 60 000 ÷ 1000 = 552 deaths (assuming the rate stays the same).

(HT only, Edexcel) Standardised death rate. Standard population (per 1000): under 40: 550, 40–64: 320, 65 and over: 130. Town T's death rates per 1000: under 40: 1.5, 40–64: 6, 65 and over: 45.

1. Under 40: 1.5 × 550 ÷ 1000 = 0.825.
2. 40–64: 6 × 320 ÷ 1000 = 1.92.
3. 65 and over: 45 × 130 ÷ 1000 = 5.85.
4. Standardised death rate = 0.825 + 1.92 + 5.85 = 8.6 per 1000 (to 2 s.f.).
5. If Town T's crude rate was 13.1 per 1000, the standardised rate shows much of that was due to its older population.

Graph reading: unemployment rose from 4.2% to 5.0% between January and July. Find the percentage change.

1. (5.0 − 4.2) ÷ 4.2 × 100 = 19.0% rise in the unemployment rate (a rise of 0.8 percentage points).

### Common mistakes

- Forgetting the × 1000 in crude rates.
- Confusing "percentage points" with "per cent".
- (HT only) Comparing crude rates of areas with very different age structures and drawing conclusions about health.

## Check questions

1. A train ticket cost £24 in 2019 (index 100) and £30 in 2025. Find the index number for 2025 and interpret it. [2 marks]
2. A price index (base year 2015 = 100) is 84 in 2024. What does this tell you? [1 mark]
3. In the base year a television cost £450. Its index is now 92. Find its current price. [2 marks]
4. (HT only) House prices in a village were £200 000, £208 000 and £218 400 in three consecutive years. Find the chain base index numbers for the second and third years. [2 marks]
5. (HT only) Find the weighted index: rent (index 108, weight 40), travel (index 125, weight 15), food (index 112, weight 45). [3 marks]
6. A city with population 320 000 has 2848 deaths in a year. Find the crude death rate. [2 marks]
7. Explain why crude death rates may be misleading when comparing two towns. [1 mark]
8. (HT only, Edexcel) Standard population per 1000: under 50: 700; 50 and over: 300. Town Q's birth rates per 1000: under 50: 16; 50 and over: 0.5. Find the standardised birth rate. [2 marks]

## Mark scheme

1. 30 ÷ 24 × 100 = 125 (1); the price has risen by 25% since 2019 (1).
2. Prices have fallen by 16% since 2015 (1).
3. 450 × 0.92 (1) = £414 (1).
4. 208 000 ÷ 200 000 × 100 = 104 (1); 218 400 ÷ 208 000 × 100 = 105 (1).
5. 108 × 40 + 125 × 15 + 112 × 45 = 4320 + 1875 + 5040 = 11 235 (1); ÷ 100 (1) = 112.35 (1).
6. 2848 ÷ 320 000 × 1000 (1) = 8.9 per 1000 (1).
7. The towns may have different age structures, e.g. one has more elderly people (1).
8. 16 × 700 ÷ 1000 + 0.5 × 300 ÷ 1000 = 11.2 + 0.15 (1) = 11.35 per 1000 (1).
