---
level: A-level
subject: Further Mathematics
topic: "Hypothesis tests: Poisson and geometric tests, Type I and II errors, power"
as_content: "This is option content: AQA Statistics (SB5, SC1, SC2) and Edexcel FS1 (also available at AS)."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["SB5", "SC1", "SC2"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FS1 4.1", "FS1 4.2", "FS1 8.1"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-statistics/
---

# Hypothesis tests: Poisson and geometric tests, Type I and II errors, power

This file covers hypothesis tests for the mean of a Poisson distribution and for the parameter of a geometric distribution, extended binomial tests, critical regions and actual significance levels, Type I and Type II errors, and the power of a test.

## Overview

The language of hypothesis testing and the binomial test are in A-level Maths ([../maths/23-hypothesis-testing.md](../maths/23-hypothesis-testing.md)). The distributions are in [31-poisson-geometric-and-negative-binomial-distributions.md](31-poisson-geometric-and-negative-binomial-distributions.md). Tests using normal and t distributions are in [38-confidence-intervals-and-tests-for-means.md](38-confidence-intervals-and-tests-for-means.md).

### Board differences

- AQA SB5 (Poisson mean test), SC1 (Type I and Type II errors for Poisson tests), SC2 (power for tests based on normal, binomial or Poisson distributions).
- Edexcel FS1 4.1 (tests for binomial and Poisson parameters, including critical regions), 4.2 (tests for a geometric parameter), 8.1 (Type I and Type II errors, size and power, power functions).
- OCR and MEI do not list Type II errors or power; their Poisson-based inference is through chi-squared and normal tests.

## SB5 Testing a Poisson mean

*Refs: AQA SB5 · Edexcel FS1 4.1. Level: A-level (option).*

### What you need to know

- H₀: λ = λ₀ against H₁: λ > λ₀, λ < λ₀ or λ ≠ λ₀, using a single observation (or a total over several intervals, which is Poisson with the scaled mean).
- Compare P(X ≥ x) (or P(X ≤ x)) under H₀ with the significance level, or find the critical region.
- The actual significance level is the probability of the critical region under H₀.
- For a two-tailed test at α, put at most α/2 in each tail.

### Explained

Because the distribution is discrete, the actual significance level is usually less than the stated one. Always write the conclusion in context, and never say H₀ is "proved".

### Worked example

A call centre normally receives 4 complaints a day. After a change, 8 complaints arrive in one day. Test at the 5% level whether the rate has increased.

1. H₀: λ = 4, H₁: λ > 4. X ~ Po(4) under H₀.
2. P(X ≥ 8) = 1 − P(X ≤ 7) = 0.0511 > 0.05.
3. Not significant: insufficient evidence that complaints have increased.
4. Critical region: P(X ≥ 9) = 0.0214, so X ≥ 9; actual significance level 2.14%.

Find the critical region for a two-tailed test of H₀: λ = 10 at the 5% level.

1. Lower tail: P(X ≤ 3) = 0.0103, P(X ≤ 4) = 0.0293 > 0.025, so X ≤ 3.
2. Upper tail: P(X ≥ 17) = 0.0270 > 0.025, P(X ≥ 18) = 0.0143, so X ≥ 18.
3. Critical region X ≤ 3 or X ≥ 18; actual significance level 0.0246.

Over 2 weeks a shop expects 2.5 returns per week. It records 3 returns in the 2 weeks. Test at 5% whether the rate has fallen.

1. Total ~ Po(5) under H₀. P(X ≤ 3) = 0.2650 > 0.05. Not significant.

### Common mistakes

- Using P(X = 8) instead of P(X ≥ 8).
- Forgetting to scale λ for several intervals.

## Testing a geometric parameter

*Refs: Edexcel FS1 4.2. Level: A-level (option).*

### What you need to know

- Use one observation of X ~ Geo(p). A large X suggests p is smaller than claimed; a small X suggests p is larger.
- P(X ≥ x) = (1 − p)^{x−1}; P(X ≤ x) = 1 − (1 − p)ˣ.

### Worked example

A game claims a 1 in 5 chance of winning on each play. A player's first win comes on the 14th play. Test at 5% whether the claim overstates p.

1. H₀: p = 0.2, H₁: p < 0.2.
2. P(X ≥ 14) = 0.8¹³ = 0.0550 > 0.05. Not significant at 5%.

### Common mistakes

- Using 0.8¹⁴ for P(X ≥ 14).

## SC1 Type I and Type II errors

*Refs: AQA SC1 · Edexcel FS1 8.1. Level: A-level (option).*

### What you need to know

- Type I error: rejecting H₀ when it is true. P(Type I error) = actual significance level (the size of the test).
- Type II error: accepting H₀ when it is false. Its probability depends on the true parameter value.
- Reducing one error type (at fixed sample size) increases the other.

### Worked example

For the complaints test (critical region X ≥ 9), find P(Type I error), and P(Type II error) if the true rate is 7.

1. P(Type I) = P(X ≥ 9 | λ = 4) = 0.0214.
2. P(Type II) = P(X ≤ 8 | λ = 7) = 0.7291.

### Common mistakes

- Giving the stated level (5%) as P(Type I error) for a discrete test.

## SC2 The power of a test

*Refs: AQA SC2 · Edexcel FS1 8.1. Level: A-level (option).*

### What you need to know

- Power = P(reject H₀ | H₀ false) = 1 − P(Type II error).
- A power function gives the power for each possible true value of the parameter. A better test has higher power for the same size.
- For a normal mean test with X̄ ~ N(μ, σ²/n), find the critical value under H₀, then the probability of the critical region under the alternative μ.

### Worked example

Power of the complaints test when λ = 7.

1. 1 − 0.7291 = 0.2709.

X ~ B(20, p). H₀: p = 0.3, H₁: p < 0.3, 5% level. Find the critical region, the size, and the power when p = 0.1.

1. P(X ≤ 2) = 0.0355, P(X ≤ 3) = 0.1071. Critical region X ≤ 2, size 0.0355.
2. Power = P(X ≤ 2 | p = 0.1) = 0.6769.

(AQA) X ~ N(μ, 16). A sample of 16 is used to test H₀: μ = 50 against H₁: μ > 50 at 5%. Find the power when μ = 52.

1. X̄ ~ N(50, 1) under H₀. Critical value 50 + 1.645 = 51.645.
2. Power = P(X̄ > 51.645 | μ = 52) = P(Z > −0.355) = 0.639.

### Common mistakes

- Calculating the power under H₀ instead of under the alternative.

## Check questions

1. Accidents at a junction average 1.5 per month. After new lights, there are 2 accidents in 6 months. Test at the 5% level whether the rate has fallen. [5 marks]
2. X ~ Po(λ). Find the critical region for testing H₀: λ = 6 against H₁: λ < 6 at the 5% level, and the actual significance level. [3 marks]
3. For the test in question 2, find the probability of a Type II error when λ = 2, and the power. [3 marks]
4. (Edexcel) A machine produces faulty items with probability 0.02. To test whether p has increased, items are inspected until the first faulty one; X is the number inspected. Find the critical region at the 5% level and its actual significance level. [3 marks]
5. X ~ N(μ, 25), samples of 25. H₀: μ = 100, H₁: μ ≠ 100, 5% level. Find the acceptance region for x̄ and the probability of a Type II error when μ = 102. [5 marks]

## Mark scheme

1. H₀: λ = 9, H₁: λ < 9 (6-month total) (1). P(X ≤ 2 | Po(9)) = 0.0062 (2). < 0.05, reject H₀ (1). Evidence the accident rate has fallen (1).
2. P(X ≤ 1) = 0.0174, P(X ≤ 2) = 0.0620 (1). Critical region X ≤ 1 (1). Size 0.0174 (1).
3. P(Type II) = P(X ≥ 2 | λ = 2) = 1 − 0.4060 = 0.5940 (2). Power 0.4060 (1).
4. Small X supports H₁: P(X ≤ x) = 1 − 0.98ˣ ≤ 0.05 (1). 0.98ˣ ≥ 0.95 gives x ≤ 2.54, so the critical region is X ≤ 2 (1). Actual level 1 − 0.98² = 0.0396 (1).
5. X̄ ~ N(100, 1) (1). Accept 98.04 < x̄ < 101.96 (2). P(98.04 < X̄ < 101.96 | μ = 102) = P(−3.96 < Z < −0.04) (1) = 0.484 (1).
