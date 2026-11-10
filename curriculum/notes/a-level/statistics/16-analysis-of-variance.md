---
level: A-level
subject: Statistics
topic: "Analysis of variance (one-way and two-way)"
boards:
  - board: Edexcel
    code: "9ST0"
    spec_refs: ["20.1", "20.2", "20.3"]
refs_checked: false
spec_url: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/a-level-statistics/
---

# Analysis of variance

This file covers one-way analysis of variance (ANOVA) for a completely randomised design, with its model of additive effects and normal errors; two-way ANOVA without replication for a randomised block design; and the assumptions and interpretation of both.

## Overview

ANOVA is not in A-level Mathematics or Further Mathematics, so this file is new. It tests whether three or more population means are equal, using one F-test instead of many two-sample t-tests (which would inflate the chance of a Type I error, see [14-errors-power-and-p-values.md](14-errors-power-and-p-values.md)). The designs it analyses are in [12-experimental-design.md](12-experimental-design.md). F-tables are given in the exam; the F-test for two variances is in [Further Maths 39](../further-maths/39-tests-for-variances-chi-squared-and-f.md) for background.

### Board differences

- Edexcel 9ST0 topic 20 is on Paper 2. Only one-factor and two-factor ANOVA (without replication) are needed; Latin squares are not.
- The booklet gives the models and the sums of squares formulae (SS_T, SS_B for one-way; SS_T, SS_R, SS_C for two-way), and Table 7 gives percentage points of the F-distribution.

## 20.1 One-way ANOVA

*Refs: Edexcel 20.1. Paper 2.*

### What you need to know

- Model for a completely randomised design with k treatments (groups):

```latex
x_{ij} = \mu + \alpha_i + \varepsilon_{ij}, \qquad \varepsilon_{ij} \sim N(0, \sigma^2)
```

where μ is the overall mean, αᵢ is the effect of treatment i (additive), and εᵢⱼ is the experimental error.

- H₀: all treatment means are equal (all αᵢ = 0). H₁: at least one mean differs.
- With T the grand total, Tᵢ the total of group i, nᵢ its size and n the total number of observations:

```latex
SS_T = \sum\sum x_{ij}^2 - \frac{T^2}{n}, \qquad SS_B = \sum_i \frac{T_i^2}{n_i} - \frac{T^2}{n}, \qquad SS_W = SS_T - SS_B
```

- ANOVA table:

| Source | SS | df | MS = SS ÷ df | F |
| --- | --- | --- | --- | --- |
| Between groups | SS_B | k − 1 | MS_B | MS_B ÷ MS_W |
| Within groups (error) | SS_W | n − k | MS_W | |
| Total | SS_T | n − 1 | | |

- Reject H₀ if F > F(k − 1, n − k) at the chosen level.

### Explained

ANOVA splits the total variation into variation between group means (signal) and variation within groups (noise, the experimental error). If H₀ is true, both mean squares estimate σ², so F should be near 1. If the group means really differ, MS_B is inflated and F is large. The test is always upper-tail.

Software output often labels the rows "Factor" and "Error", and gives a p-value directly.

### Worked example

Fifteen students are randomly allocated to three revision methods and their test scores recorded:

| Method A | 12 | 15 | 14 | 11 | 13 |
| --- | --- | --- | --- | --- | --- |
| Method B | 16 | 18 | 15 | 17 | 19 |
| Method C | 13 | 14 | 16 | 12 | 15 |

Test at 5% whether the mean scores differ.

1. Totals: T_A = 65, T_B = 85, T_C = 70, T = 220, n = 15, Σx² = 3300.

```latex
SS_T = 3300 - \frac{220^2}{15} = 3300 - 3226.67 = 73.33
```

```latex
SS_B = \frac{65^2 + 85^2 + 70^2}{5} - 3226.67 = 3270 - 3226.67 = 43.33
```

2. SS_W = 73.33 − 43.33 = 30.00.

| Source | SS | df | MS | F |
| --- | --- | --- | --- | --- |
| Between | 43.33 | 2 | 21.67 | 8.67 |
| Within | 30.00 | 12 | 2.50 | |
| Total | 73.33 | 14 | | |

3. F(2, 12) at 5% = 3.885. 8.67 > 3.885 (p-value 0.0047), so reject H₀.
4. There is evidence at 5% that mean scores differ between methods. Method B has the highest mean (17 compared with 13 and 14).

### Common mistakes

- Using n for the total df instead of n − 1.
- Dividing SS by the wrong df; MS_W uses n − k.
- Concluding that every mean differs; ANOVA only shows at least one does.

## 20.2 Two-way ANOVA without replication (randomised block design)

*Refs: Edexcel 20.2. Paper 2.*

### What you need to know

- Model, with m rows (often treatments) and n columns (often blocks), one observation per cell:

```latex
x_{ij} = \mu + \alpha_i + \beta_j + \varepsilon_{ij}, \qquad \varepsilon_{ij} \sim N(0, \sigma^2)
```

- With Rᵢ the row totals and Cⱼ the column totals:

```latex
SS_T = \sum\sum x_{ij}^2 - \frac{T^2}{mn}, \quad SS_R = \sum_i \frac{R_i^2}{n} - \frac{T^2}{mn}, \quad SS_C = \sum_j \frac{C_j^2}{m} - \frac{T^2}{mn}
```

```latex
SS_E = SS_T - SS_R - SS_C
```

| Source | SS | df | MS | F |
| --- | --- | --- | --- | --- |
| Rows | SS_R | m − 1 | MS_R | MS_R ÷ MS_E |
| Columns | SS_C | n − 1 | MS_C | MS_C ÷ MS_E |
| Error | SS_E | (m − 1)(n − 1) | MS_E | |
| Total | SS_T | mn − 1 | | |

- Test each factor separately: H₀ for rows (no treatment effect) and H₀ for columns (no block effect).

### Explained

Blocking takes the variation between blocks out of the error. The error mean square becomes smaller, so treatment differences are easier to detect. Each row total divides by n (the number of values in a row); each column total divides by m.

### Worked example

Four fertilisers (rows) are tested in three blocks of land (columns), with yields:

| | Block 1 | Block 2 | Block 3 | Row total |
| --- | --- | --- | --- | --- |
| A | 42 | 38 | 35 | 115 |
| B | 47 | 44 | 40 | 131 |
| C | 45 | 40 | 36 | 121 |
| D | 50 | 47 | 43 | 140 |
| Column total | 184 | 169 | 154 | 507 |

Σx² = 21657. Test at 5% for differences between fertilisers and between blocks.

1. T²/(mn) = 507² ÷ 12 = 21420.75.
2. SS_T = 21657 − 21420.75 = 236.25.
3. SS_R = (115² + 131² + 121² + 140²) ÷ 3 − 21420.75 = 21542.33 − 21420.75 = 121.58.
4. SS_C = (184² + 169² + 154²) ÷ 4 − 21420.75 = 21533.25 − 21420.75 = 112.50.
5. SS_E = 236.25 − 121.58 − 112.50 = 2.17.

| Source | SS | df | MS | F |
| --- | --- | --- | --- | --- |
| Fertilisers | 121.58 | 3 | 40.53 | 112.2 |
| Blocks | 112.50 | 2 | 56.25 | 155.8 |
| Error | 2.17 | 6 | 0.361 | |
| Total | 236.25 | 11 | | |

6. Fertilisers: F(3, 6) at 5% = 4.757; 112.2 > 4.757, reject H₀. There is evidence the fertilisers give different mean yields (D highest).
7. Blocks: F(2, 6) at 5% = 5.143; 155.8 > 5.143, reject H₀. The blocks differ too, so blocking was worthwhile.
8. Comment: a one-way ANOVA ignoring blocks gives F = 2.83 with F(3, 8) = 4.07, not significant, because the block variation would be left in the error.

### Common mistakes

- Dividing row totals squared by m instead of n.
- Finding SS_E directly instead of by subtraction (it is easy to slip).
- Using the total df in place of the error df for the F critical value.

## 20.3 Assumptions and interpretation

*Refs: Edexcel 20.3. Paper 2.*

### What you need to know

- ANOVA assumes: the samples (or cells) come from normal distributions with equal variances; effects are additive; errors are independent. Units should be randomly allocated.
- Interpret in context: which factor is significant, which treatment means are highest or lowest, and whether blocking helped.

### Explained

Check equal variances by comparing the spread of each group (for example the sample standard deviations or box plots); a ratio of largest to smallest variance well above 4 is a warning sign with small groups. Check normality with a dot plot of each group or of the residuals. If the assumptions fail, the F-test may not be valid.

A significant F tells you there is a difference somewhere, not where. Looking at the group means suggests which treatment stands out; more formal comparisons are beyond the spec.

### Worked example

For the revision methods in 20.1, the group variances are 2.5, 2.5 and 2.5. Comment on the assumptions and interpret the result for a head of department.

1. The variances are equal, which supports the equal-variance assumption. With 5 values per group, normality is hard to check, but scores are often roughly normal.
2. Students were randomly allocated, so the comparison is fair.
3. Interpretation: the test gives strong evidence that the method affects scores; Method B's mean is about 3 to 4 marks higher than the others, so it is worth adopting, subject to a larger trial.

### Common mistakes

- Stating "the data are normal" instead of "the populations are normal with equal variances".

## Check questions

1. Three groups of 4 give: P: 8, 10, 9, 11; Q: 12, 13, 11, 14; R: 9, 11, 10, 12. Σx² = 1442. Complete a one-way ANOVA table and test at 5% whether the means differ. F(2, 9) at 5% = 4.256. [8 marks]
2. State the model for one-way ANOVA, explaining each term. [3 marks]
3. Three varieties of wheat (rows) are grown in four blocks (columns), with yields (tonnes per hectare):

| | B1 | B2 | B3 | B4 |
| --- | --- | --- | --- | --- |
| X | 6.2 | 5.8 | 7.1 | 6.5 |
| Y | 6.8 | 6.1 | 7.5 | 7.0 |
| Z | 5.9 | 5.5 | 6.6 | 6.2 |

Σx² = 500.5. Carry out a two-way ANOVA at 5%. F(2, 6) = 5.143, F(3, 6) = 4.757. [10 marks]

4. Explain why ANOVA is used instead of three separate two-sample t-tests to compare three means. [2 marks]
5. State two assumptions for the tests in question 3. [2 marks]

## Mark scheme

1. Totals 38, 50, 42, T = 130 (1); SS_T = 1442 − 130²/12 = 33.67 (1); SS_B = (38² + 50² + 42²)/4 − 1408.33 = 18.67 (1); SS_W = 15.00 (1); df 2 and 9 (1); MS 9.33 and 1.667 (1); F = 5.60 (1); 5.60 > 4.256, reject H₀: evidence the group means differ (1).
2. xᵢⱼ = μ + αᵢ + εᵢⱼ (1); μ overall mean, αᵢ effect of treatment i (1); εᵢⱼ error ~ N(0, σ²), independent (1).
3. T = 77.2, T²/12 = 496.65 (1); SS_T = 3.847 (1); row totals 25.6, 27.4, 24.2: SS_R = 1.287 (1); column totals 18.9, 17.4, 21.2, 19.7: SS_C = 2.513 (1); SS_E = 0.047 (1); df 2, 3, 6 (1); MS_R = 0.643, MS_C = 0.838, MS_E = 0.00778 (1); F_R = 82.7, F_C = 107.7 (1); varieties: 82.7 > 5.143, evidence varieties differ (Y highest) (1); blocks: 107.7 > 4.757, evidence blocks differ (1).
4. Each test has a 5% chance of a Type I error, so three tests raise the overall chance of a false positive (1); ANOVA uses one test at 5% for all means (and pools the error estimate) (1).
5. Any two: populations normal; equal variances; additive effects (no interaction); independent errors; random allocation within blocks (2).
