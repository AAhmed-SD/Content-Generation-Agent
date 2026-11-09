---
level: A-level
subject: Further Mathematics
topic: "Tests and intervals for variances: chi-squared and F"
as_content: "All of this file is A-level only (Edexcel Further Statistics 2 option)."
boards:
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FS2 6.1", "FS2 6.2"]
refs_checked: false
spec_urls:
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-statistics/
---

# Tests and intervals for variances: chi-squared and F

This file covers the χ² distribution for a sample variance, confidence intervals and hypothesis tests for the variance of a normal population, and the F-test for whether two normal populations have equal variances.

## Overview

Edexcel FS2 only. Unbiased variance estimates are in [37-sampling-estimation-and-central-limit-theorem.md](37-sampling-estimation-and-central-limit-theorem.md). The F-test is often used before a pooled two-sample t-test ([38-confidence-intervals-and-tests-for-means.md](38-confidence-intervals-and-tests-for-means.md)). The χ² goodness of fit test is a different use of the same distribution ([34-chi-squared-tests.md](34-chi-squared-tests.md)).

### Board differences

- Edexcel FS2 6.1 (hypothesis test and confidence interval for the variance of a normal distribution) and 6.2 (test that two independent normal populations have the same variance). No other board covers these.

## FS2 6.1 The variance of a normal population

*Refs: Edexcel FS2 6.1. Level: A-level only.*

### What you need to know

- For a random sample of size n from N(μ, σ²):

```latex
\frac{(n-1)S^2}{\sigma^2} \sim \chi^2_{n-1}
```

- 100(1 − α)% confidence interval for σ²:

```latex
\left(\frac{(n-1)s^2}{\chi^2_{n-1}(\alpha/2\text{ upper})},\ \frac{(n-1)s^2}{\chi^2_{n-1}(\alpha/2\text{ lower})}\right)
```

- To test H₀: σ² = σ₀², compare (n − 1)s²/σ₀² with χ²_{n−1} critical values (upper tail for σ² > σ₀², lower tail for σ² < σ₀²).

### Explained

The χ² distribution is skewed, so the interval is not symmetric about s². The larger χ² value gives the lower end of the interval. This test relies heavily on the population being normal.

### Worked example

A sample of 10 rods has s² = 0.0484 cm². Find a 95% confidence interval for σ².

1. χ²₉: lower 2.5% point 2.700, upper 2.5% point 19.023.
2. Interval (9 × 0.0484/19.023, 9 × 0.0484/2.700) = (0.0229, 0.161).

The specification says σ² ≤ 0.03. Test at 5% whether the variance is too large.

1. H₀: σ² = 0.03, H₁: σ² > 0.03.
2. Test statistic 9 × 0.0484/0.03 = 14.52. Upper 5% point of χ²₉ is 16.919.
3. 14.52 < 16.919: do not reject H₀. Insufficient evidence the variance exceeds 0.03.

### Common mistakes

- Using n instead of n − 1 degrees of freedom, or putting the χ² values the wrong way round in the interval.

## FS2 6.2 The F-test for two variances

*Refs: Edexcel FS2 6.2. Level: A-level only.*

### What you need to know

- For independent samples from normal populations with equal variances:

```latex
F = \frac{S_1^2}{S_2^2} \sim F_{n_1-1,\,n_2-1}
```

- Put the larger sample variance on top, so only upper critical values are needed. For a two-tailed test at 10%, use the upper 5% point; at 5%, the upper 2.5% point.
- Lower critical values: F_{a,b}(lower p) = 1/F_{b,a}(upper p).

### Worked example

Sample A: n = 8, s² = 5.6. Sample B: n = 10, s² = 2.1. Test at 5% (two-tailed) whether the population variances differ.

1. H₀: σ_A² = σ_B², H₁: σ_A² ≠ σ_B².
2. F = 5.6/2.1 = 2.667, with (7, 9) degrees of freedom.
3. Upper 2.5% point F₇,₉ = 4.197. 2.667 < 4.197: do not reject H₀. A pooled-variance t-test is reasonable.

### Common mistakes

- Putting the smaller variance on top and then using an upper critical value.
- Swapping the degrees of freedom.

## Check questions

1. A sample of 12 from a normal population has s² = 3.2. Test at 5% whether σ² differs from 2. [5 marks]
2. Find a 90% confidence interval for σ for the data in question 1. [4 marks]
3. Two machines fill bottles. Machine P: n = 7, s² = 0.81. Machine Q: n = 11, s² = 0.25. Test at 5% whether P is more variable than Q. [5 marks]
4. Explain why the χ² test for a variance needs the population to be normal. [1 mark]

## Mark scheme

1. H₀: σ² = 2, H₁: σ² ≠ 2 (1). Statistic 11 × 3.2/2 = 17.6 (1). χ²₁₁ 2.5% points 3.816 and 21.920 (2). 3.816 < 17.6 < 21.920, do not reject H₀ (1).
2. χ²₁₁ 5% points 4.575 and 19.675 (1). σ² interval (35.2/19.675, 35.2/4.575) = (1.789, 7.694) (2). σ interval (1.34, 2.77) (1).
3. H₀: σ_P² = σ_Q², H₁: σ_P² > σ_Q² (1). F = 0.81/0.25 = 3.24 (1). F₆,₁₀ upper 5% = 3.217 (2). 3.24 > 3.217: reject H₀, evidence P is more variable (1).
4. The result (n − 1)S²/σ² ~ χ²_{n−1} is only true for normal populations (1).
