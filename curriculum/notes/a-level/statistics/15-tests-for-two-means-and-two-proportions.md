---
level: A-level
subject: Statistics
topic: "The t-test and tests for two means and two proportions"
boards:
  - board: Edexcel
    code: "9ST0"
    spec_refs: ["16.1", "16.2", "16.3", "16.4", "16.5"]
refs_checked: false
spec_url: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/a-level-statistics/
---

# The t-test and tests for two means and two proportions

This file covers the one-sample t-test for a normal mean with unknown variance, the z-test for the difference of two means with known variances, the pooled two-sample t-test when the variances are unknown but equal, the z-test for the difference between two binomial proportions using a pooled estimate, and interpreting all of these in context.

## Overview

The t-test, the two-sample z-test and the pooled t-test are written up in [Further Maths 38](../further-maths/38-confidence-intervals-and-tests-for-means.md). The test for two proportions is not in A-level Mathematics or Further Mathematics, so it is written in full here. The paired t-test is in [11-non-parametric-and-paired-tests.md](11-non-parametric-and-paired-tests.md). All of these follow the same pattern: estimate − hypothesised value, divided by the standard error.

### Board differences

- Edexcel 9ST0 topic 16 is on Paper 2.
- The booklet gives the test statistics for all four tests, including the pooled variance and the pooled proportion. You do not need to test whether two variances are equal; the question will say they can be assumed equal.
- Use t when n < 30 and σ is unknown.

## 16.1 The t-test for a mean

*Refs: Edexcel 16.1. Paper 2.*

### What you need to know

```latex
t = \frac{\bar{x} - \mu_0}{s / \sqrt{n}} \sim t_{n-1}
```

- Use when σ is unknown and the sample is small (n < 30). Valid only if the population is normal.
- Compare with the critical value tₙ₋₁ from tables, or find the p-value.

### Explained

The t-distribution is symmetric like Z but with heavier tails, which allows for the uncertainty in using s for σ. The degrees of freedom are n − 1 because s is calculated from deviations about x̄, which sum to zero.

### Worked example

A machine should fill bottles with a mean of 500 ml. Ten bottles contain 498, 503, 495, 491, 500, 497, 494, 499, 496, 492 ml. Assuming normality, test at 5% whether the mean is less than 500 ml.

1. H₀: μ = 500, H₁: μ < 500.
2. x̄ = 496.5, s = 3.689.

```latex
t = \frac{496.5 - 500}{3.689 / \sqrt{10}} = \frac{-3.5}{1.1667} = -3.00
```

3. ν = 9, critical value −1.833. −3.00 < −1.833 (p-value 0.0075), so reject H₀.
4. There is evidence at 5% that the machine underfills on average.

### Common mistakes

- Using z with s for a small sample.
- Using ν = n instead of n − 1.

## 16.2 Two means, known variances

*Refs: Edexcel 16.2. Paper 2.*

### What you need to know

```latex
Z = \frac{(\bar{X} - \bar{Y}) - (\mu_x - \mu_y)}{\sqrt{\dfrac{\sigma_x^2}{n_x} + \dfrac{\sigma_y^2}{n_y}}} \sim N(0, 1)
```

- Two independent random samples from normal populations with known variances (or large samples, using s² for σ² by the central limit theorem).
- Usually H₀: μₓ = μ_y, so μₓ − μ_y = 0.

### Explained

The variances add because X̄ − Ȳ is a difference of independent variables (see [07-linear-combinations-of-random-variables.md](07-linear-combinations-of-random-variables.md)).

### Worked example

Test scores at school A have σ = 8 and at school B σ = 10. A sample of 40 from A has mean 72.4; a sample of 50 from B has mean 68.9. Test at 5% whether the mean scores differ.

1. H₀: μ_A = μ_B, H₁: μ_A ≠ μ_B.

```latex
z = \frac{72.4 - 68.9}{\sqrt{\dfrac{64}{40} + \dfrac{100}{50}}} = \frac{3.5}{\sqrt{3.6}} = 1.845
```

2. Two-tailed critical values ±1.96. 1.845 < 1.96 (p-value 0.065), so do not reject H₀.
3. There is insufficient evidence at 5% that the mean scores at the two schools differ.

### Common mistakes

- Adding the standard deviations instead of the variances divided by n.

## 16.3 Two means, unknown but equal variances (pooled t-test)

*Refs: Edexcel 16.3. Paper 2.*

### What you need to know

```latex
s_p^2 = \frac{(n_x - 1)s_x^2 + (n_y - 1)s_y^2}{n_x + n_y - 2}
```

```latex
t = \frac{(\bar{x} - \bar{y}) - (\mu_x - \mu_y)}{\sqrt{s_p^2\left(\dfrac{1}{n_x} + \dfrac{1}{n_y}\right)}} \sim t_{n_x + n_y - 2}
```

- Valid only if both populations are normal and have equal variances.

### Explained

The pooled variance is a weighted average of the two sample variances, weighted by their degrees of freedom. It combines information from both samples into one estimate of the common σ². If the sample variances are very different (for example one is four times the other), the equal-variance assumption is doubtful and the result should be treated with caution.

### Worked example

Six plants given feed A grow 23.1, 25.4, 22.8, 26.0, 24.3, 24.9 cm; seven given feed B grow 21.6, 22.9, 23.4, 20.8, 22.1, 23.0, 21.9 cm. Assuming normal distributions with equal variances, test at 5% whether feed A gives greater mean growth.

1. H₀: μ_A = μ_B, H₁: μ_A > μ_B.
2. x̄_A = 24.417, s_A² = 1.6137; x̄_B = 22.243, s_B² = 0.8295.
3. s_p² = (5 × 1.6137 + 6 × 0.8295) ÷ 11 = 1.1860.

```latex
t = \frac{24.417 - 22.243}{\sqrt{1.1860\left(\dfrac{1}{6} + \dfrac{1}{7}\right)}} = \frac{2.174}{0.6058} = 3.59
```

4. ν = 11, critical value 1.796. 3.59 > 1.796, so reject H₀.
5. There is evidence at 5% that feed A gives greater mean growth.

### Common mistakes

- Using n − 1 for each sample but forgetting to subtract 2 in total for ν.
- Pooling the standard deviations instead of the variances.

## 16.4 Two binomial proportions

*Refs: Edexcel 16.4. Paper 2.*

### What you need to know

- H₀: p₁ = p₂. Under H₀ there is one common proportion, estimated by pooling the two samples:

```latex
\hat{p} = \frac{x_1 + x_2}{n_1 + n_2} = \frac{\hat{p}_1 n_1 + \hat{p}_2 n_2}{n_1 + n_2}
```

```latex
z = \frac{\hat{p}_1 - \hat{p}_2}{\sqrt{\hat{p}(1 - \hat{p})\left(\dfrac{1}{n_1} + \dfrac{1}{n_2}\right)}} \sim N(0, 1) \text{ approximately}
```

- Needs two independent random samples, each large enough for the normal approximation.

### Explained

The pooled proportion is used in the standard error because the test assumes H₀ (one common p) is true. This mirrors the one-sample proportion test, which uses p₀ in the standard error.

### Worked example

A charity sends two versions of a letter. Version 1 goes to 120 people and 54 donate; version 2 goes to 110 and 38 donate. Test at 5% whether version 1 has a higher donation rate.

1. H₀: p₁ = p₂, H₁: p₁ > p₂.
2. p̂₁ = 54/120 = 0.45, p̂₂ = 38/110 = 0.3455. Pooled p̂ = 92/230 = 0.4.
3. Standard error = √(0.4 × 0.6 × (1/120 + 1/110)) = 0.06467.

```latex
z = \frac{0.45 - 0.3455}{0.06467} = 1.617
```

4. Critical value 1.6449. 1.617 < 1.6449 (p-value 0.053), so do not reject H₀.
5. There is insufficient evidence at 5% that version 1 has a higher donation rate, although the result is close; a larger trial would have more power.

### Common mistakes

- Using p̂₁ and p̂₂ separately in the standard error for the test.
- Pooling by averaging the two proportions when the sample sizes differ.

## 16.5 Interpreting the tests in context

*Refs: Edexcel 16.5. Paper 2.*

### What you need to know

- State the conclusion in context, without certainty, linked to the hypotheses.
- Check and comment on the assumptions: random independent samples, normality (for t-tests), equal variances (for the pooled t-test), large enough samples (for z-tests using the CLT or the normal approximation).
- Consider whether a significant difference is large enough to matter (effect size, see [17-effect-size.md](17-effect-size.md)).

### Explained

A strong answer has: the decision (reject or not), the evidence (test statistic or p-value against the critical value), the context ("mean growth with feed A"), and a comment on assumptions or practical importance.

### Worked example

In the feed experiment (16.3), the sample variances were 1.61 and 0.83. Comment on the validity of the test and the conclusion.

1. The ratio of the variances is about 1.9; with samples of 6 and 7 this is not extreme, so equal variances is a reasonable assumption.
2. Normality cannot be checked well with 6 or 7 values; plant growth is often roughly normal.
3. The plants should have been randomly allocated to the feeds, otherwise other factors (light, position) could explain the difference.
4. The mean difference of 2.2 cm is about 2 pooled standard deviations (√1.186 = 1.09), a large effect.

### Common mistakes

- Ignoring the assumptions the question asks you to state.

## Check questions

1. Eight measurements, assumed normal, are 31.2, 29.8, 32.5, 30.9, 33.1, 31.7, 32.4, 30.6. Test at 5% whether the mean differs from 30. [6 marks]
2. Two populations have σ₁ = 2.5 and σ₂ = 3. Samples of 45 and 60 have means 15.2 and 14.1. Test at 5% whether μ₁ > μ₂. [5 marks]
3. Samples of 10 and 12 have means 58.3 and 54.9 and standard deviations 4.2 and 5.1. Assuming normality and equal variances, test at 5% (two-tailed) whether the means differ. [6 marks]
4. In a survey, 46 of 200 men and 63 of 180 women say they read a daily newspaper. Test at 1% whether the proportions differ. [6 marks]
5. State two assumptions needed for the test in question 3. [2 marks]

## Mark scheme

1. H₀: μ = 30, H₁: μ ≠ 30 (1); x̄ = 31.525, s = 1.1055 (1); t = 1.525 ÷ (1.1055/√8) = 3.90 (1); ν = 7, critical value ±2.365 (1); 3.90 > 2.365, reject H₀ (1); evidence the mean differs from 30 (1).
2. H₀: μ₁ = μ₂, H₁: μ₁ > μ₂ (1); SE = √(6.25/45 + 9/60) = 0.5375 (1); z = 1.1 ÷ 0.5375 = 2.05 (1); > 1.6449 (1); reject H₀: evidence μ₁ > μ₂ (1).
3. H₀: μ₁ = μ₂, H₁: μ₁ ≠ μ₂ (1); s_p² = (9 × 17.64 + 11 × 26.01) ÷ 20 = 22.24 (1); SE = √(22.24 × (1/10 + 1/12)) = 2.019 (1); t = 3.4 ÷ 2.019 = 1.68 (1); ν = 20, critical value ±2.086 (1); do not reject H₀: insufficient evidence the means differ (1).
4. H₀: p₁ = p₂, H₁: p₁ ≠ p₂ (1); p̂₁ = 0.23, p̂₂ = 0.35 (1); pooled p̂ = 109/380 = 0.2868 (1); SE = 0.04647 (1); z = −2.58 (1); |z| > 2.5758, reject H₀ at 1%: evidence that the proportions differ, with women more likely to read a daily paper (1).
5. Both populations normal (1); equal population variances (1) (also accept: independent random samples).
