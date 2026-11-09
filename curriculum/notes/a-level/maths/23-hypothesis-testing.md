---
level: A-level
subject: Mathematics
topic: "Statistical hypothesis testing"
as_content: "The language of hypothesis testing and the binomial test for a proportion are AS. Tests for the mean of a Normal distribution and tests using a correlation coefficient are A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["O1", "O2", "O3"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["S5.1", "S5.2", "S5.3"]
  - board: OCR
    code: "H240"
    spec_refs: ["2.05a", "2.05b", "2.05c", "2.05d", "2.05e", "2.05f", "2.05g"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["MH1", "MH2", "MH3", "MH4", "MH5", "MH6", "MH7", "MH8", "MH9", "MH10", "MH11"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Statistical hypothesis testing

This file covers the language of hypothesis testing, binomial tests for a proportion (one-tailed and two-tailed, with critical regions and p-values), tests for the mean of a Normal distribution with known variance, and tests for correlation using a given correlation coefficient.

## Overview

AS: the language (null and alternative hypotheses, significance level, test statistic, one- and two-tailed tests, critical value, critical and acceptance regions, p-value) and the binomial test. A-level only: the distribution of the sample mean, the Normal test for a mean, and correlation tests.

### Board differences

- AQA O1 to O3; Edexcel Statistics 5.1 to 5.3.
- OCR H240: 2.05a to 2.05c (AS); 2.05d to 2.05g (A-level only).
- OCR MEI H640: MH1 to MH6 (AS); MH7 to MH11 (A-level only).
- All boards: you are not asked to calculate a correlation coefficient. You interpret a given coefficient against a given critical value or p-value. OCR and MEI refer to Pearson's product-moment correlation coefficient; AQA and Edexcel refer to correlation coefficients as measures of how close points lie to a straight line.

## O1 The language of hypothesis testing; correlation tests

*Refs: AQA O1 · Edexcel Statistics 5.1 · OCR 2.05a, 2.05f, 2.05g · MEI MH1, MH2, MH4, MH10, MH11. Level: AS & A (part A-level only).*

### What you need to know

- **Null hypothesis H₀**: the assumption being tested, stating a parameter value (for example p = 0.3).
- **Alternative hypothesis H₁**: what you accept if the evidence is strong enough (p > 0.3, p < 0.3, or p ≠ 0.3).
- **One-tailed test**: H₁ has > or <. **Two-tailed test**: H₁ has ≠; split the significance level between the two tails.
- **Significance level**: the probability of rejecting H₀ when it is in fact true; the threshold for "strong enough evidence".
- **Test statistic**: the value calculated from the sample (for example the number of successes).
- **Critical region**: the set of values of the test statistic that lead to rejecting H₀. **Critical value**: the first value in the critical region. **Acceptance region**: the rest.
- **p-value**: the probability, assuming H₀ is true, of a result at least as extreme as the one observed. Reject H₀ if the p-value is less than the significance level.
- (A-level only) A correlation coefficient measures how close points lie to a straight line (−1 to 1). Test for correlation using a given coefficient and a given critical value or p-value.

### Explained

Hypotheses are always about the population parameter (p, μ or ρ), never about the sample.

A conclusion has two parts: a statistical decision ("reject H₀" or "do not reject H₀"), and a statement in context that is not too definite ("there is sufficient evidence at the 5% level to suggest that the proportion has increased"). Not rejecting H₀ does not prove it true.

The actual significance level of a binomial test is the probability of the critical region, which is usually a little less than the stated level because the distribution is discrete.

**(A-level only) Correlation tests.** The population correlation coefficient is ρ.

- H₀: ρ = 0 (no correlation in the population).
- H₁: ρ > 0, ρ < 0 (one-tailed) or ρ ≠ 0 (two-tailed).
- Compare the sample value r with the critical value from tables (for the sample size n and significance level). Reject H₀ if |r| is bigger than the critical value (and r has the sign in H₁). Or compare a given p-value with the significance level.

### Worked example

(A-level only) For 20 days, the correlation between daily rainfall and hours of sunshine has r = −0.42. The critical value for a one-tailed test at 5% with n = 20 is 0.3783. Test whether there is negative correlation.

1. H₀: ρ = 0. H₁: ρ < 0.
2. |−0.42| = 0.42 > 0.3783, and r is negative.
3. Reject H₀. There is evidence at the 5% level of negative correlation between rainfall and sunshine.

(A-level only) A test for correlation in a sample of 12 gives r = 0.52 and a two-tailed p-value of 0.083. Test at 5%.

1. H₀: ρ = 0. H₁: ρ ≠ 0.
2. 0.083 > 0.05. Do not reject H₀.
3. Insufficient evidence at the 5% level of correlation.

### Common mistakes

- Writing hypotheses in terms of the sample (x̄ or r) instead of the parameter.
- Concluding "H₀ is true" or "this proves" instead of "insufficient evidence".
- (A-level only) Comparing r with the critical value for the wrong number of tails.

## O2 Binomial tests for a proportion

*Refs: AQA O2 · Edexcel Statistics 5.2 · OCR 2.05b, 2.05c · MEI MH3, MH5, MH6. Level: AS & A.*

### What you need to know

- Test a proportion p using X ~ B(n, p) under H₀, and interpret the result in context.
- Find critical regions for one- and two-tailed tests, and the actual significance level.
- A sample is being used to make an inference about a population; the significance level is the probability of wrongly rejecting H₀.

### Explained

Steps:

1. Define X (the number of successes in the sample) and state its distribution under H₀.
2. Write H₀ and H₁ using p.
3. Either find the p-value, P(X ≥ observed) for an upper tail or P(X ≤ observed) for a lower tail, or find the critical region.
4. Compare with the significance level (half of it in each tail for a two-tailed test).
5. Conclude in context.

For an upper-tail critical region at level α, find the smallest c with P(X ≥ c) ≤ α. For a lower tail, find the largest c with P(X ≤ c) ≤ α.

### Worked example

A website says 30% of visitors buy something. After a redesign, 10 of 20 visitors buy something. Test at the 5% level whether the proportion has increased.

1. X = number of buyers in 20. Under H₀, X ~ B(20, 0.3).
2. H₀: p = 0.3. H₁: p > 0.3.
3. P(X ≥ 10) = 1 − P(X ≤ 9) = 0.0480.
4. 0.0480 < 0.05, so reject H₀.
5. There is evidence at the 5% level that the proportion of buyers has increased.

Find the critical region for this test, and its actual significance level.

1. P(X ≥ 10) = 0.0480 ≤ 0.05; P(X ≥ 9) = 0.1133 > 0.05.
2. Critical region X ≥ 10. Actual significance level 4.80%.

A coin is tossed 25 times to test whether it is fair, at the 5% level. Find the critical region.

1. H₀: p = 0.5. H₁: p ≠ 0.5. X ~ B(25, 0.5). 2.5% in each tail.
2. Lower: P(X ≤ 7) = 0.0216 ≤ 0.025; P(X ≤ 8) = 0.0539. So X ≤ 7.
3. Upper: P(X ≥ 18) = 0.0216; P(X ≥ 17) = 0.0539. So X ≥ 18.
4. Critical region X ≤ 7 or X ≥ 18. Actual significance level 0.0432.

40% of people in a town own a dog. In a sample of 30 from one street, 6 own a dog. Test at 5% whether the proportion is lower in that street.

1. H₀: p = 0.4. H₁: p < 0.4. X ~ B(30, 0.4).
2. P(X ≤ 6) = 0.0172 < 0.05. Reject H₀.
3. There is evidence at the 5% level that dog ownership is lower in that street.

### Common mistakes

- Using P(X = observed) instead of P(X ≥ observed).
- For an upper tail, using 1 − P(X ≤ observed) instead of 1 − P(X ≤ observed − 1).
- Forgetting to halve the significance level in a two-tailed test.

## O3 Testing the mean of a Normal distribution

*Refs: AQA O3 · Edexcel Statistics 5.3 · OCR 2.05d, 2.05e · MEI MH7, MH8, MH9. Level: A-level only.*

### What you need to know

- (A-level only) If X ~ N(μ, σ²), the mean of a random sample of size n has distribution

```latex
\bar{X} \sim N\!\left(\mu, \frac{\sigma^2}{n}\right)
```

- (A-level only) Test H₀: μ = μ₀ against a one- or two-tailed H₁ when σ is known, given or assumed.
- (A-level only) Find the critical region for x̄.

### Explained

The sample mean varies less than single values: its standard deviation is σ/√n. Standardise:

```latex
z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}
```

Compare z with the critical value from the standard Normal (1.6449 for 5% one-tailed, ±1.96 for 5% two-tailed, 2.3263 for 1% one-tailed, ±2.5758 for 1% two-tailed), or find the p-value.

### Worked example

(A-level only) Bags of flour have masses N(μ, 4²) grams, with μ = 50 claimed. A sample of 25 bags has mean 51.8 g. Test at 5% whether the mean is greater than 50.

1. H₀: μ = 50. H₁: μ > 50.
2. Under H₀, X̄ ~ N(50, 16/25), standard deviation 0.8.
3. z = (51.8 − 50)/0.8 = 2.25 > 1.6449. (p-value = P(Z > 2.25) = 0.0122.)
4. Reject H₀. There is evidence at the 5% level that the mean mass is greater than 50 g.

(A-level only) Find the critical region for x̄ in that test.

1. x̄ > 50 + 1.6449 × 0.8 = 51.32.

(A-level only) IQ scores have σ = 15. A sample of 36 people from one area has mean 115.2. Test at 1% whether the mean differs from 120.

1. H₀: μ = 120. H₁: μ ≠ 120.
2. z = (115.2 − 120)/(15/6) = −1.92.
3. Critical values ±2.5758. |−1.92| < 2.5758, so do not reject H₀.
4. Insufficient evidence at the 1% level that the mean in this area differs from 120.

### Common mistakes

- (A-level only) Using σ instead of σ/√n.
- (A-level only) Using 1.6449 for a two-tailed 5% test.

## Check questions

1. Explain what is meant by (a) a critical region; (b) the significance level of a test. [2 marks]
2. A seed company claims 60% of its seeds germinate. A gardener plants 15 seeds and thinks the rate is lower. (a) Find the critical region for a test at the 5% level. (b) 5 seeds germinate. State the conclusion. [6 marks]
3. A spinner should land on red with probability 0.25. In 40 spins it lands on red 15 times. Test at the 5% level whether the probability of red is greater than 0.25. [5 marks]
4. It is thought that 20% of a population carry a gene. Find the critical region for a two-tailed test at the 5% level using a sample of 50, and state the actual significance level. [5 marks]
5. (A-level only) The times to complete a task are N(μ, 6²) minutes, and μ has been 80. After training, a sample of 16 times has mean 83.1. Test at the 5% level whether the mean time has increased. Give the p-value. [6 marks]
6. (A-level only) The lengths of rods are Normal with σ = 1.2 cm. A sample of 30 rods has mean 24.3 cm. Test at the 5% level whether the mean length differs from 25 cm. [6 marks]
7. (A-level only) For 30 pairs of data, r = 0.33. The critical value for a one-tailed test at 5% is 0.3061. Test for positive correlation. [3 marks]

## Mark scheme

1. (a) The set of values of the test statistic that lead to rejecting H₀ (1). (b) The probability of rejecting H₀ when H₀ is true (1).
2. (a) H₀: p = 0.6, H₁: p < 0.6, X ~ B(15, 0.6) (1); P(X ≤ 5) = 0.0338 (1); P(X ≤ 6) = 0.0950 (1); critical region X ≤ 5 (1). (b) 5 is in the critical region, reject H₀ (1); evidence that the germination rate is lower than 60% (1).
3. H₀: p = 0.25, H₁: p > 0.25 (1); X ~ B(40, 0.25) (1); P(X ≥ 15) = 0.0544 (1); 0.0544 > 0.05, do not reject H₀ (1); insufficient evidence that the probability of red is greater than 0.25 (1).
4. X ~ B(50, 0.2), 2.5% each tail (1); P(X ≤ 4) = 0.0185 and P(X ≤ 5) = 0.0480, so X ≤ 4 (1); P(X ≥ 17) = 0.0144 and P(X ≥ 16) = 0.0308, so X ≥ 17 (1); critical region X ≤ 4 or X ≥ 17 (1); actual significance 0.0329 (1).
5. H₀: μ = 80, H₁: μ > 80 (1); X̄ ~ N(80, 36/16) (1); z = 3.1/1.5 = 2.07 (1); p-value = 0.0194 (1); < 0.05, reject H₀ (1); evidence that the mean time has increased (1).
6. H₀: μ = 25, H₁: μ ≠ 25 (1); standard error 1.2/√30 = 0.219 (1); z = −3.20 (1); critical values ±1.96 (1); reject H₀ (1); evidence that the mean length is not 25 cm (1).
7. H₀: ρ = 0, H₁: ρ > 0 (1); 0.33 > 0.3061 (1); reject H₀: evidence of positive correlation (1).
