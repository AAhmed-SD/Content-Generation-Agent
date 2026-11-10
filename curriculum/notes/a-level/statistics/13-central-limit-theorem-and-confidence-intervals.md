---
level: A-level
subject: Statistics
topic: "Sampling, the central limit theorem and confidence intervals"
boards:
  - board: Edexcel
    code: "9ST0"
    spec_refs: ["14.1", "14.2", "15.1", "15.2"]
refs_checked: false
spec_url: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/a-level-statistics/
---

# The central limit theorem and confidence intervals

This file covers the standard error of the mean, the central limit theorem for the mean of a large sample from a non-normal population, confidence intervals for a population mean using z or t, and how sample size affects the width of an interval, including finding the sample size needed for a given width.

## Overview

Unbiased estimates, standard error and the central limit theorem are written up in [Further Maths 37](../further-maths/37-sampling-estimation-and-central-limit-theorem.md); confidence intervals with z and t in [Further Maths 38](../further-maths/38-confidence-intervals-and-tests-for-means.md). Parameters, statistics and unbiased estimators are also set out in [09-hypothesis-testing-principles-and-one-sample-tests.md](09-hypothesis-testing-principles-and-one-sample-tests.md). A-level Statistics adds explicit rules for when to use z or t, the requirement to learn the interval formulae, and finding the sample size for a target width.

### Board differences

- Edexcel 9ST0 topics 14 and 15.1 to 15.2 are on Paper 2.
- Learn: x̄ ± z σ/√n (σ known) and x̄ ± tₙ₋₁ s/√n (σ unknown). Use t when n < 30 and σ is unknown (the population must be normal). The central limit theorem is used for n ≥ 30, and only needed when the population is not normal.
- Tables of normal percentage points (Table 4) and t percentage points (Table 5) are given.

## 14.1 and 14.2 Standard error and the central limit theorem

*Refs: Edexcel 14.1, 14.2. Paper 2.*

### What you need to know

- The standard error of the sample mean is σ/√n, estimated by s/√n.
- If X is normal, X̄ is exactly normal for any n (see [05-random-variables-binomial-and-normal.md](05-random-variables-binomial-and-normal.md)).
- Central limit theorem (CLT): if X has any distribution with mean μ and variance σ², then for a sufficiently large random sample (n ≥ 30)

```latex
\bar{X} \approx N\!\left(\mu, \frac{\sigma^2}{n}\right)
```

- The CLT is only needed when the population is not normal.

### Explained

Averaging smooths out skewness: the mean of 40 exponential waiting times is far less skewed than one waiting time, and its distribution is close to normal. The more skewed the population, the larger n needs to be; n ≥ 30 is the working rule.

The CLT applies to discrete populations too, such as the mean score on many rolls of a die.

### Worked example

Waiting times at a counter have mean 4 minutes and standard deviation 4 minutes (they are exponential, so strongly skewed). Find the probability that the mean of a random sample of 40 waits exceeds 4.5 minutes.

1. The population is not normal, but n = 40 ≥ 30, so by the CLT X̄ ≈ N(4, 4²/40).
2. Standard error = 4 ÷ √40 = 0.6325.
3. z = (4.5 − 4) ÷ 0.6325 = 0.791. P(X̄ > 4.5) ≈ P(Z > 0.791) = 0.215.

A fair die has mean score 3.5 and variance 35/12. Find the approximate probability that the mean of 50 rolls is more than 3.8.

1. By the CLT, X̄ ≈ N(3.5, (35/12)/50); standard error = 0.2415.
2. z = 0.3 ÷ 0.2415 = 1.242. P(X̄ > 3.8) ≈ 0.107.

### Common mistakes

- Saying the CLT makes the population normal; it makes the distribution of the sample mean approximately normal.
- Using the CLT for a small sample from a skewed population.

## 15.1 Confidence intervals for a mean

*Refs: Edexcel 15.1. Paper 2.*

### What you need to know

```latex
\bar{x} \pm z \times \frac{\sigma}{\sqrt{n}} \quad (\sigma \text{ known}), \qquad \bar{x} \pm t_{n-1} \times \frac{s}{\sqrt{n}} \quad (\sigma \text{ unknown, } n < 30, \text{ normal population})
```

- In general: estimate ± (z or t) × (standard error).
- z values: 90%, 1.6449; 95%, 1.96; 99%, 2.5758.
- For a large sample (n ≥ 30) with σ unknown, s can replace σ with z.
- Use x̄ and s² (divisor n − 1) as the estimates of μ and σ².

### Explained

**Meaning.** A 95% confidence interval is produced by a method that captures the true mean in 95% of samples. For one particular interval, the true mean is either in it or not; "95%" describes the method. If many samples were taken and an interval built from each, about 95% of the intervals would contain μ.

**Why t?** When σ is estimated by s from a small sample, the extra uncertainty in s makes the tails heavier; the t-distribution with n − 1 degrees of freedom allows for this. As n grows, t approaches z.

**Using an interval.** If a claimed value lies outside a 95% interval, a two-tailed test at 5% would reject it.

### Worked example

Bolts have lengths with σ = 6 mm. A sample of 36 has mean 52.3 mm. Find a 95% confidence interval for μ.

```latex
52.3 \pm 1.96 \times \frac{6}{\sqrt{36}} = 52.3 \pm 1.96 = (50.34, \; 54.26)
```

Ten jars of honey have masses (g) 12.4, 11.8, 13.1, 12.9, 12.2, 11.5, 12.7, 13.4, 12.0, 12.6 (in tens of grams above 450 g). Assuming normality, find a 95% confidence interval for the mean.

1. x̄ = 12.46, s = 0.5967 (calculator, divisor n − 1).
2. σ unknown and n = 10 < 30, so use t₉: t₉(2.5% each tail) = 2.262.

```latex
12.46 \pm 2.262 \times \frac{0.5967}{\sqrt{10}} = 12.46 \pm 0.427 = (12.03, \; 12.89)
```

A sample of 64 commuters has mean journey 7.85 km and s = 1.2 km. Find a 99% confidence interval for the mean.

1. n ≥ 30, so use z with s: 7.85 ± 2.5758 × 1.2/8 = 7.85 ± 0.386 = (7.46, 8.24) km.

### Common mistakes

- Using z with s for a small sample.
- Using the divisor-n standard deviation from the calculator.
- Saying "there is a 95% probability that μ is in this interval" for a single computed interval.

## 15.2 Sample size and interval width

*Refs: Edexcel 15.2. Paper 2.*

### What you need to know

- The width of a z-interval is 2 × z × σ/√n. Larger n gives a narrower interval; quadrupling n halves the width.
- Find the n needed for a width of at most w by solving the inequality and rounding up.

```latex
2 z \frac{\sigma}{\sqrt{n}} \le w \quad \Rightarrow \quad n \ge \left(\frac{2 z \sigma}{w}\right)^2
```

### Explained

A higher confidence level (larger z) also widens the interval. There is a trade-off between confidence, precision and cost (sample size). Always round n up: rounding down gives a width slightly too big.

### Worked example

For the bolts (σ = 6 mm), how large a sample is needed for a 95% interval of total width at most 2 mm?

```latex
n \ge \left(\frac{2 \times 1.96 \times 6}{2}\right)^2 = 11.76^2 = 138.3
```

So n = 139.

### Common mistakes

- Confusing the width (2 × margin) with the margin of error.
- Rounding n down.

## Check questions

1. A population has mean 10 and standard deviation 3 and is not normal. Find the approximate probability that the mean of a sample of 36 exceeds 11, and justify the method. [4 marks]
2. Eight measurements, assumed normal, are 4.8, 5.3, 5.1, 4.6, 5.5, 5.0, 4.9, 5.2. Find a 90% confidence interval for the mean. [5 marks]
3. A sample of 50 has mean 68.2. The population standard deviation is 9. Find a 95% confidence interval for μ. Does it support a claim that μ = 65? [4 marks]
4. σ = 15. Find the smallest sample size for a 95% confidence interval of width at most 4. How would the answer change for 99%? [4 marks]
5. Explain the meaning of a 95% confidence interval. [2 marks]
6. Explain why the t-distribution is used for question 2. [2 marks]

## Mark scheme

1. n = 36 ≥ 30, so by the CLT X̄ ≈ N(10, 9/36) (1); SE = 0.5 (1); z = 2 (1); P ≈ 0.0228 (1).
2. x̄ = 5.05 (1); s = 0.2878 (1); t₇(5% each tail) = 1.895 (1); 5.05 ± 1.895 × 0.2878/√8 (1); (4.86, 5.24) (1).
3. 68.2 ± 1.96 × 9/√50 (1) = 68.2 ± 2.49 (1) = (65.71, 70.69) (1); 65 is outside, so the claim is not supported at 5% (1).
4. 2 × 1.96 × 15/√n ≤ 4 (1); n ≥ 216.09, so n = 217 (1); for 99%: (2.5758 × 15/2)² = 373.2 (1), so n = 374 (1).
5. If many samples were taken and an interval calculated from each in the same way (1), about 95% of the intervals would contain the true mean (1).
6. σ is unknown and estimated by s (1) from a small sample (n < 30) from a normal population (1).
