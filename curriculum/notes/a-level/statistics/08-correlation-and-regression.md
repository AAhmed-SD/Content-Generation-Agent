---
level: A-level
subject: Statistics
topic: "Correlation and linear regression"
boards:
  - board: Edexcel
    code: "9ST0"
    spec_refs: ["7.1", "7.2", "7.3", "7.4"]
refs_checked: false
spec_url: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/a-level-statistics/
---

# Correlation and linear regression

This file covers calculating and interpreting Spearman's rank correlation coefficient and Pearson's product moment correlation coefficient (pmcc), testing a correlation coefficient with tables, choosing between the two, and the least squares regression line with interpolation, extrapolation and residuals.

## Overview

The pmcc, Spearman's coefficient, their tests and the regression line are written up in [Further Maths 40](../further-maths/40-correlation-and-regression.md); scatter diagrams and interpreting regression lines in [A-level Maths 20](../maths/20-data-presentation-and-interpretation.md); the pmcc test in [A-level Maths 23](../maths/23-hypothesis-testing.md). In A-level Statistics, every coefficient comes from the calculator; the marks are for ranking correctly (including ties), choosing the right coefficient, testing it, and interpreting everything in context. Residuals must be calculated and also judged by eye from a scatter graph.

### Board differences

- Edexcel 9ST0 7.1, 7.3 and 7.4 are on Paper 1; 7.2 (testing a coefficient) is on Paper 2.
- Critical value tables for the pmcc (Table 8) and Spearman's coefficient (Table 9) are given. p-values are not used for tests on correlation coefficients.
- The residual for a line y = a + bx is yᵢ − a − bxᵢ, which you must know.

## 7.1 Calculating and interpreting correlation coefficients

*Refs: Edexcel 7.1. Paper 1.*

### What you need to know

- Pearson's pmcc r measures the strength of the linear relationship between two variables; find it on the calculator from the raw data.
- Spearman's coefficient rₛ measures the strength of a monotonic relationship (one variable tends to rise as the other rises, not necessarily in a straight line). Rank both variables in the same direction, give tied values the mean of the ranks they would occupy, then find the pmcc of the ranks on the calculator.
- Both lie between −1 and 1. Interpret in context: direction, strength, and what that means for the variables.

```latex
r = \frac{S_{xy}}{\sqrt{S_{xx} S_{yy}}}
```

### Explained

**Tied ranks.** If two values share 6th and 7th place, each gets rank 6.5; three values sharing 2nd, 3rd and 4th each get 3. The next value takes the next unused rank. With ties, the shortcut formula 1 − 6Σd²/(n(n² − 1)) is not exact, which is why Edexcel asks for the pmcc of the ranks from a calculator.

**Interpretation.** "r = 0.98, so there is strong positive linear correlation: students who revise for more hours tend to score more." Correlation is not causation; a third variable (for example interest in the subject) could drive both.

### Worked example

Eight students' weekly revision hours x and test scores y:

| x | 2 | 4 | 4 | 5 | 7 | 8 | 10 | 12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| y | 35 | 48 | 41 | 52 | 60 | 58 | 71 | 80 |

Find r and rₛ.

1. Calculator: r = 0.982.
2. Rank x from highest: 12 → 1, 10 → 2, 8 → 3, 7 → 4, 5 → 5, the two 4s share ranks 6 and 7 → 6.5 each, 2 → 8.
3. Rank y from highest: 80 → 1, 71 → 2, 60 → 3, 58 → 4, 52 → 5, 48 → 6, 41 → 7, 35 → 8.
4. pmcc of the ranks: rₛ = 0.970.
5. Both show strong positive correlation: more revision goes with higher scores.

### Common mistakes

- Ranking one variable from highest and the other from lowest, which flips the sign.
- Giving tied values different ranks.

## 7.2 Testing a correlation coefficient

*Refs: Edexcel 7.2. Paper 2.*

### What you need to know

- Hypotheses use ρ (population pmcc) or ρₛ: H₀: ρ = 0; H₁: ρ > 0, ρ < 0 (one-tailed) or ρ ≠ 0 (two-tailed).
- Compare |r| with the critical value from the table for the sample size n and significance level (halve a two-tailed level to read the table's one-tail column). Reject H₀ if r is beyond the critical value in the direction of H₁.
- A test on the pmcc assumes the population has a bivariate normal distribution (roughly elliptical scatter). Spearman's test needs no distributional assumption.

```latex
H_0: \rho = 0 \qquad H_1: \rho > 0
```

### Explained

A few critical values (worked out from the exact distributions, matching the published tables):

| n | pmcc 5% one-tail | pmcc 2.5% one-tail | Spearman 5% one-tail | Spearman 2.5% one-tail |
| --- | --- | --- | --- | --- |
| 8 | 0.6215 | 0.7067 | 0.6429 | 0.7381 |
| 10 | 0.5494 | 0.6319 | | |
| 12 | 0.4973 | 0.5760 | | |
| 15 | 0.4409 | 0.5140 | | |
| 20 | 0.3783 | 0.4438 | | |

Always use the table provided in the exam. The conclusion must be in context and not definite: "there is evidence of positive correlation between…".

### Worked example

Test, at the 5% level, whether there is positive correlation between revision hours and score for the students in 7.1, using (a) the pmcc, (b) Spearman's coefficient.

1. (a) H₀: ρ = 0, H₁: ρ > 0. n = 8, critical value 0.6215. r = 0.982 > 0.6215, so reject H₀. There is evidence of positive correlation between revision hours and test score.
2. (b) H₀: ρₛ = 0, H₁: ρₛ > 0. Critical value 0.6429. rₛ = 0.970 > 0.6429, so reject H₀. There is evidence that higher revision hours are associated with higher scores.

Two judges' ranks of 8 entries give rₛ = 0.849. Test at 1% whether the judges agree (critical value 0.8333 for n = 8, 1% one-tail).

1. H₀: ρₛ = 0, H₁: ρₛ > 0. 0.849 > 0.8333, so reject H₀. There is evidence at the 1% level that the judges' rankings agree.

### Common mistakes

- Using the pmcc table for a Spearman test, or the wrong n.
- Using a 5% one-tail value for a two-tailed test at 5%.
- Writing hypotheses in terms of r instead of ρ.

## 7.3 Choosing a coefficient

*Refs: Edexcel 7.3. Paper 1.*

### What you need to know

- Use the pmcc for a linear relationship between two continuous variables, and for a test, when the data could come from a bivariate normal population.
- Use Spearman's coefficient when the data are ranks (judges' placings), when the relationship is monotonic but not linear, or when the data are clearly not bivariate normal (skewed, outliers). It needs no distributional assumptions.

### Explained

Look at the scatter diagram. An elliptical cloud suggests bivariate normality, so the pmcc is fine. A curve that always rises (such as a learning curve) gives rₛ near 1 but r lower, so Spearman's better describes the relationship. One outlier can change r a lot but changes ranks only a little.

### Worked example

For each, choose a coefficient with a reason: (a) the order in which two wine tasters rank 10 wines; (b) height and arm span of 30 adults; (c) dose of a fertiliser and crop yield, where yield rises quickly and then levels off.

1. (a) Spearman's: the data are ranks.
2. (b) Pmcc: both continuous, likely linear and roughly bivariate normal.
3. (c) Spearman's: the relationship is monotonic but not linear.

### Common mistakes

- Using the pmcc on a curved relationship and concluding there is "weak" correlation.

## 7.4 Regression lines, interpolation, extrapolation and residuals

*Refs: Edexcel 7.4. Paper 1.*

### What you need to know

- Find a and b for the least squares regression line y = a + bx from the calculator, and interpret them in context: b is the change in y for each unit increase in x; a is the value of y when x = 0 (only meaningful if x = 0 is within or near the data).
- Use the line to predict y from x within the range of the data (interpolation, reliable if correlation is strong) and be cautious outside it (extrapolation, unreliable).
- Residual = observed y − predicted y:

```latex
\text{residual} = y_i - a - b x_i
```

- Residuals: the least squares line makes the sum of squared residuals as small as possible, and the residuals sum to zero. A large residual marks a possible outlier. A pattern in the residuals (for example positive at both ends and negative in the middle) suggests a linear model is not suitable.

```latex
b = \frac{S_{xy}}{S_{xx}}, \qquad a = \bar{y} - b\bar{x}
```

### Explained

Use the regression line of y on x to predict y from x, where x is the explanatory (independent) variable. On a scatter graph with the line drawn, the residual of a point is its vertical distance from the line: above the line is positive, below is negative.

### Worked example

For the revision data in 7.1, find the regression line, interpret b, predict scores for 6 hours and 20 hours, and find the residual for the student with 8 hours.

1. Σ(x − x̄)² = Sxx = 80, Sxy = 347.5. b = 347.5 ÷ 80 = 4.344. x̄ = 6.5, ȳ = 55.625, so a = 55.625 − 4.344 × 6.5 = 27.39. Line: y = 27.39 + 4.344x.
2. Each extra hour of revision is associated with about 4.3 more marks.
3. x = 6: y = 27.39 + 26.06 = 53.5. Interpolation within 2 to 12 hours, with r = 0.98, so reliable.
4. x = 20: y = 114.3, which is extrapolation, and over 100 if the test is out of 100, so unreliable.
5. Residual at x = 8: 58 − (27.39 + 4.344 × 8) = 58 − 62.14 = −4.14. This student scored about 4 marks below the line's prediction.

### Common mistakes

- Calculating residuals as predicted − observed (sign reversed).
- Trusting a prediction far outside the data range.
- Interpreting the intercept when x = 0 is meaningless in context.

## Check questions

1. For x: 3, 5, 6, 8, 9, 11 and y: 12, 15, 14, 20, 22, 25, find the pmcc and the regression line of y on x. [3 marks]
2. Use your line from question 1 to estimate y when x = 7, and find the residual at x = 6. [3 marks]
3. Two inspectors score seven restaurants. Inspector P: 62, 75, 75, 80, 58, 91, 70. Inspector Q: 55, 70, 64, 72, 60, 85, 64. Find Spearman's rank correlation coefficient. [4 marks]
4. Test at the 5% level whether the inspectors in question 3 agree, given the one-tail 5% critical value for n = 7 is 0.7143. [3 marks]
5. A sample of 15 gives r = 0.52. Test at the 5% level, two-tailed, whether there is correlation (2.5% one-tail critical value 0.5140). [3 marks]
6. A residual plot shows residuals negative for small and large x and positive for middle x. Comment on the model. [2 marks]
7. State the assumption needed for a test on the pmcc and why it is not needed for Spearman's test. [2 marks]

## Mark scheme

1. r = 0.974 (1); b = 1.714 (1); a = 6.00, so y = 6.00 + 1.714x (1).
2. y = 6 + 12 = 18.0 (1); predicted at 6: 16.29 (1); residual 14 − 16.29 = −2.29 (1).
3. Ranks P (highest = 1): 6, 3.5, 3.5, 2, 7, 1, 5 (1); ranks Q: 7, 3, 4.5, 2, 6, 1, 4.5 (1, ties correct); pmcc of ranks (1) rₛ = 0.936 (1).
4. H₀: ρₛ = 0, H₁: ρₛ > 0 (1); 0.936 > 0.7143, reject H₀ (1); evidence that the inspectors' scores agree (1).
5. H₀: ρ = 0, H₁: ρ ≠ 0 (1); 0.52 > 0.5140, reject H₀ (1); evidence of correlation between the variables (1).
6. The residuals show a pattern (curve) (1), so a linear model is not suitable; the relationship is curved (1).
7. The population must be bivariate normal (1); Spearman's uses ranks, so its test does not depend on the distribution of the values (1).
