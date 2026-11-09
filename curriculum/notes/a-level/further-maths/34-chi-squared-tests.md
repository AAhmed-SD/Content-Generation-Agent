---
level: A-level
subject: Further Mathematics
topic: "Chi-squared tests: goodness of fit and contingency tables"
as_content: "AS on OCR (5.06a, 5.06b, 5.06d Stage 1) and MEI (section (a)); fitting further distributions (OCR 5.06c) is A-level only. AQA and Edexcel are option content."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["SE1", "SE2", "SE3", "SE4", "SE5"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FS1 6.1"]
  - board: OCR
    code: "H245"
    spec_refs: ["5.06a", "5.06b", "5.06c", "5.06d"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["SH1", "SH2", "SH3", "SH4"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-statistics/
---

# Chi-squared tests: goodness of fit and contingency tables

This file covers the χ² statistic, tests for association in contingency tables, goodness of fit tests for given and fitted distributions, degrees of freedom, combining classes when expected frequencies are small, Yates' correction, and interpreting where association comes from.

## Overview

Hypothesis testing language is in A-level Maths ([../maths/23-hypothesis-testing.md](../maths/23-hypothesis-testing.md)). The distributions being fitted are in [30-discrete-random-variables.md](30-discrete-random-variables.md), [31-poisson-geometric-and-negative-binomial-distributions.md](31-poisson-geometric-and-negative-binomial-distributions.md) and [35-continuous-random-variables.md](35-continuous-random-variables.md). Chi-squared tests for a variance are in [39-tests-for-variances-chi-squared-and-f.md](39-tests-for-variances-chi-squared-and-f.md).

### Board differences

- AQA SE1 to SE5 (contingency tables only, including Yates' correction for 2 × 2 tables). AQA does not include goodness of fit.
- Edexcel FS1 6.1: goodness of fit (discrete uniform, binomial, Poisson, geometric and others) and contingency tables. Edexcel does not use Yates' correction.
- OCR 5.06a to 5.06d: contingency tables and goodness of fit; 5.06c (Stage 2) extends to continuous distributions and others.
- MEI SH1 to SH4: contingency tables and goodness of fit, interpreting contributions to the statistic.
- All boards combine classes so that expected frequencies are at least 5.

## SE2 The chi-squared statistic

*Refs: AQA SE2, SE3 · Edexcel FS1 6.1 · OCR 5.06a, 5.06d · MEI SH1, SH2. Level: AS & A (OCR, MEI).*

### What you need to know

```latex
X^2 = \sum\frac{(O_i - E_i)^2}{E_i}
```

- Under H₀, X² approximately follows χ²_ν, where ν (degrees of freedom) = number of cells (after combining) − number of constraints.
- Reject H₀ if X² is greater than the critical value. The test is always one-tailed (upper tail).
- Each Eᵢ should be at least 5; combine neighbouring classes if not.

### Explained

Large differences between observed and expected frequencies make X² big. The degrees of freedom count how many expected frequencies are free to vary: the total is always fixed (one constraint), and each parameter estimated from the data costs one more.

## SE1 Contingency tables

*Refs: AQA SE1, SE2, SE3, SE4, SE5 · Edexcel FS1 6.1 · OCR 5.06a · MEI SH1, SH2. Level: AS & A (OCR, MEI).*

### What you need to know

- H₀: no association between the two factors (they are independent). H₁: there is association.
- Expected frequency = (row total × column total)/grand total.
- For an r × c table, ν = (r − 1)(c − 1).
- (AQA) For a 2 × 2 table use Yates' correction: Σ(|O − E| − 0.5)²/E.
- Identify sources of association by comparing the largest contributions (O − E)²/E and whether O > E or O < E.

### Worked example

60 pupils in each of two year groups chose a favourite club. Test at 5% for association.

| | Art | Chess | Drama |
| --- | --- | --- | --- |
| Year 10 | 30 | 20 | 10 |
| Year 11 | 20 | 25 | 15 |

1. H₀: no association between year and club choice.
2. Column totals 50, 45, 25; grand total 120. Expected values: 25, 22.5, 12.5 in each row.
3. In each row the (O − E)² values are 25, 6.25, 6.25, so X² = 2 × [25/25 + 6.25/22.5 + 6.25/12.5] = 2 × [1 + 0.278 + 0.5] = 3.556.
4. ν = (2 − 1)(3 − 1) = 2. Critical value 5.991.
5. 3.556 < 5.991: do not reject H₀. No evidence of association.
6. The largest contributions (Art) show Year 10 chose art more than expected.

(AQA) 2 × 2 table with Yates' correction:

| | Pass | Fail |
| --- | --- | --- |
| Revised | 25 | 15 |
| Did not | 10 | 20 |

1. Expected: 20, 20 / 15, 15. |O − E| = 5 each.
2. X² = 4.5²(1/20 + 1/20 + 1/15 + 1/15) = 20.25 × 0.2333 = 4.725.
3. ν = 1, critical value 3.841 at 5%. Reject H₀: evidence of association; those who revised passed more often than expected.

### Common mistakes

- Using percentages instead of frequencies.
- Forgetting to combine cells with E < 5 (which also reduces ν).

## Goodness of fit

*Refs: Edexcel FS1 6.1 · OCR 5.06b, 5.06c, 5.06d · MEI SH3, SH4. Level: AS & A (OCR 5.06c A-level only).*

### What you need to know

- H₀: the data come from the stated distribution.
- Expected frequency = total × probability under H₀.
- ν = (number of classes after combining) − 1 − (number of parameters estimated from the data).

### Worked example

A die is rolled 120 times: 15, 22, 18, 25, 16, 24. Test at 5% whether it is fair.

1. H₀: uniform, each E = 20.
2. X² = (25 + 4 + 4 + 25 + 16 + 16)/20 = 4.5.
3. ν = 5, critical value 11.07. Not significant: no evidence the die is biased.

Over 100 time intervals, counts of 0, 1, 2, 3 or more events were 30, 38, 20, 12, with sample mean 1.18. Test at 5% whether a Poisson model fits.

1. H₀: Poisson. Estimate λ = 1.18.
2. Expected: 100P(0) = 30.73, 100P(1) = 36.26, 100P(2) = 21.39, 100P(≥3) = 11.62.
3. X² = 0.017 + 0.084 + 0.091 + 0.012 = 0.204.
4. ν = 4 − 1 − 1 = 2, critical value 5.991. Not significant: a Poisson model fits well.

A genetics model predicts ratios 1 : 2 : 1. Observed 10, 28, 22 out of 60. Test at 5%.

1. E: 15, 30, 15. X² = 25/15 + 4/30 + 49/15 = 5.067.
2. ν = 2, critical value 5.991. Not significant at 5%.

### Common mistakes

- Not subtracting 1 for each estimated parameter.
- Leaving the last class as "3" instead of "3 or more", so probabilities do not add to 1.

## Check questions

1. In a survey, 80 people were asked which of three brands they prefer, by age group. (a) State the null hypothesis. (b) Explain how to find an expected frequency. (c) The X² value is 7.2 for a 2 × 3 table. Complete the test at 5%. [5 marks]
2. (AQA) A 2 × 2 table has observed frequencies 18, 12 / 22, 28. Test for association at 5% using Yates' correction. [7 marks]
3. A spinner has five equal sectors. 100 spins give 14, 25, 19, 26, 16. Test at 10% whether it is fair. [5 marks]
4. 200 families with 3 children are recorded by number of girls: 0, 1, 2, 3 girls in 30, 80, 70, 20 families. Fit a binomial model B(3, p) estimating p from the data, and test the fit at 5%. [8 marks]

## Mark scheme

1. (a) No association between age group and preferred brand (1). (b) Row total × column total ÷ grand total (1). (c) ν = 2, critical value 5.991 (1). 7.2 > 5.991, reject H₀ (1). Evidence of association between age and brand (1).
2. Totals: rows 30, 50; columns 40, 40; grand 80 (1). Expected 15, 15 / 25, 25 (1). |O − E| = 3, corrected 2.5 (1). X² = 6.25(2/15 + 2/25) = 1.333 (2). ν = 1, critical value 3.841 (1). Not significant: no evidence of association (1).
3. E = 20 each (1). X² = (36 + 25 + 1 + 36 + 16)/20 = 5.7 (2). ν = 4, critical value at 10% 7.779 (1). Not significant: no evidence the spinner is unfair (1).
4. Mean girls = (80 + 140 + 60)/200 = 1.4, p = 1.4/3 = 0.4667 (2). Expected: 200(0.5333)³ = 30.3, 200 × 3(0.4667)(0.5333)² = 79.6, 200 × 3(0.4667)²(0.5333) = 69.7, 200(0.4667)³ = 20.3 (2). X² ≈ 0.01 (2). ν = 4 − 1 − 1 = 2, critical value 5.991 (1). Very good fit: accept the binomial model (1).
