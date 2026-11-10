---
level: A-level
subject: Statistics
topic: "Hypothesis testing: language, a proportion and a mean"
boards:
  - board: Edexcel
    code: "9ST0"
    spec_refs: ["8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "14.1", "SEC D3"]
refs_checked: false
spec_url: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/a-level-statistics/
---

# Hypothesis testing: principles and one-sample tests

This file covers parameters, statistics, unbiased estimators and standard error; the language of hypothesis testing including p-values; the role of random samples; choosing a test; testing a binomial proportion exactly or with a normal approximation; testing the mean of a normal distribution with known variance; and critiquing the conclusions of a test.

## Overview

The binomial test and the test for a normal mean are written up in [A-level Maths 23](../maths/23-hypothesis-testing.md); unbiased estimates and standard error in [Further Maths 37](../further-maths/37-sampling-estimation-and-central-limit-theorem.md). A-level Statistics adds the z-test for a proportion using a normal approximation (the booklet gives its test statistic), more weight on p-values, a 5% default significance level, and a strong focus on choosing a test and judging whether its conclusion can be trusted. Later files use the same framework: chi-squared tests (file 10), non-parametric tests (file 11), errors and power (file 14), t-tests and two-sample tests (file 15) and ANOVA (file 16).

### Board differences

- Edexcel 9ST0 topics 8 and 14.1 are on Paper 2.
- Use a 5% significance level unless told otherwise. In a test on a proportion you may write the parameter as p or π.
- The booklet gives the z statistic for a sample mean and for a binomial proportion using the normal distribution.

## 8.1 and 14.1 Parameters, statistics, unbiased estimators and standard error

*Refs: Edexcel 8.1, 14.1. Paper 2.*

### What you need to know

- A parameter is a numerical property of a population (μ, σ², p). It is usually unknown.
- A statistic is a numerical property of a sample; it is a function only of the sample values and contains no unknown parameters (x̄, s², p̂).
- An estimator is unbiased if its expected value equals the parameter it estimates. x̄ is unbiased for μ; s² (with divisor n − 1) is unbiased for σ²; p̂ = x/n is unbiased for p.
- The standard error of a statistic is its standard deviation; for the mean it is σ/√n (estimated by s/√n).

```latex
s^2 = \frac{1}{n-1}\sum (x - \bar{x})^2, \qquad \text{SE}(\bar{X}) = \frac{\sigma}{\sqrt{n}}, \qquad \text{SE}(\hat{p}) = \sqrt{\frac{p(1-p)}{n}}
```

### Explained

Dividing by n tends to underestimate σ², because the deviations are measured from x̄, which is closer to the sample values than μ is. Dividing by n − 1 corrects this on average.

X̄ − μ is not a statistic, because μ is unknown; X̄ − 50 is a statistic if 50 is a known number.

### Worked example

A sample of 5 battery lives (hours) is 41, 38, 45, 40, 36. Find unbiased estimates of the population mean and variance, and estimate the standard error of the mean.

1. x̄ = 200 ÷ 5 = 40.
2. Σ(x − x̄)² = 1 + 4 + 25 + 0 + 16 = 46, so s² = 46 ÷ 4 = 11.5.
3. SE ≈ √11.5 ÷ √5 = 3.391 ÷ 2.236 = 1.52 hours.

### Common mistakes

- Using the divisor n when asked for an unbiased estimate of the variance.
- Calling an expression containing μ a statistic.

## 8.2 The language of hypothesis testing

*Refs: Edexcel 8.2. Paper 2.*

### What you need to know

- Null hypothesis H₀: the claim assumed true, giving a value to a parameter. Alternative hypothesis H₁: what you look for evidence of.
- One-tailed test: H₁ has a direction (> or <). Two-tailed test: H₁ is ≠, and the significance level is split between the two tails.
- Significance level: the probability of rejecting H₀ when it is true (the threshold for "unlikely").
- Test statistic: the value calculated from the sample.
- Critical value: the boundary of the critical region. Critical region: values of the test statistic for which H₀ is rejected. Acceptance region: the rest.
- p-value: the probability, assuming H₀ is true, of a result at least as extreme as the one observed. Reject H₀ if the p-value is less than the significance level (for a two-tailed test, compare the one-tail probability with half the level, or double it and compare with the level).

### Explained

A test is an argument by contradiction with uncertainty: if H₀ were true, would a result like this be unusual? A small p-value means the data would be surprising under H₀, so you have evidence against it. A large p-value does not show H₀ is true; it only means the data are consistent with it.

For a discrete distribution, the actual significance level is the probability of the critical region, which is usually below the nominal level.

### Worked example

X ~ B(25, 0.4) under H₀: p = 0.4. Find the critical region for a two-tailed test of H₁: p ≠ 0.4 at the 5% level, and the actual significance level.

1. Each tail must have probability at most 0.025.
2. Lower: P(X ≤ 4) = 0.0095, P(X ≤ 5) = 0.0294 > 0.025, so the lower region is X ≤ 4.
3. Upper: P(X ≥ 16) = 0.0132, P(X ≥ 15) = 0.0344 > 0.025, so the upper region is X ≥ 16.
4. Critical region: X ≤ 4 or X ≥ 16. Actual significance level: 0.0095 + 0.0132 = 0.0227.

### Common mistakes

- Using 5% in each tail of a two-tailed test.
- Defining the p-value as "the probability that H₀ is true".

## 8.3 Samples, inference and conditions

*Refs: Edexcel 8.3. Paper 2.*

### What you need to know

- A test uses a sample to make an inference about a population. The sample should be random so that the probability model applies.
- Each test has conditions (for example a normal population, independent observations, a large enough sample). If they fail, the conclusion may be invalid.
- Conclusions are never definite: write "there is (or is not) sufficient evidence at the 5% level to suggest…".

### Explained

If a sample is not random, the sampling distribution in the test does not describe how the statistic varies, so the p-value is meaningless. A volunteer sample of 50 gym members cannot test a claim about all adults.

### Worked example

A café owner believes more than 30% of customers order oat milk. She records the next 20 orders on a Monday morning. Comment on the sample.

1. 20 consecutive Monday-morning orders are not a random sample of all customers: regulars at that time (office workers) may differ from weekend customers.
2. Orders by friends in a group may not be independent.
3. Better: record orders at randomly chosen times across a week.

### Common mistakes

- Writing "this proves the claim" or "H₀ is true".

## 8.4 Choosing a test

*Refs: Edexcel 8.4. Paper 2.*

### What you need to know

- Match the test to the question, the data type and the conditions.

### Explained

| Question | Test | File |
| --- | --- | --- |
| proportion, small n | exact binomial | this file |
| proportion, large n | z-test with normal approximation | this file |
| mean, σ known, normal population or large n | z-test | this file |
| mean, σ unknown, normal population, small n | t-test | [15](15-tests-for-two-means-and-two-proportions.md) |
| median, no normality | sign or Wilcoxon signed-rank | [11](11-non-parametric-and-paired-tests.md) |
| two means, independent samples | two-sample z or pooled t | [15](15-tests-for-two-means-and-two-proportions.md) |
| two proportions | two-proportion z-test | [15](15-tests-for-two-means-and-two-proportions.md) |
| paired data | paired t, Wilcoxon signed-rank, sign | [11](11-non-parametric-and-paired-tests.md) |
| two medians, independent samples | Wilcoxon rank-sum | [11](11-non-parametric-and-paired-tests.md) |
| association between two categorical variables | chi-squared contingency | [10](10-contingency-tables-and-goodness-of-fit.md) |
| fit of a distribution | chi-squared goodness of fit | [10](10-contingency-tables-and-goodness-of-fit.md) |
| correlation | pmcc or Spearman | [08](08-correlation-and-regression.md) |
| three or more means | ANOVA | [16](16-analysis-of-variance.md) |

### Worked example

A researcher has the blood pressure of 12 patients before and after a drug; the differences are skewed with one extreme value. Choose a test.

1. Paired data, so test the differences.
2. Skewed differences, so a paired t-test is not suitable.
3. Wilcoxon signed-rank needs symmetrical differences, which also looks doubtful; the sign test needs no assumption about the distribution, so it is safest.

### Common mistakes

- Choosing a test without checking its conditions against the data.

## 8.5 Testing a binomial proportion

*Refs: Edexcel 8.5. Paper 2.*

### What you need to know

- Exact test: under H₀, X ~ B(n, p₀). Find the p-value P(X ≥ x) or P(X ≤ x), or the critical region.
- Normal approximation (large n): under H₀,

```latex
Z = \frac{\hat{p} - p_0}{\sqrt{\dfrac{p_0(1-p_0)}{n}}} \sim N(0, 1) \text{ approximately}
```

### Explained

Use the exact binomial test when n is small or a calculator can do it. Use the z-test when n is large and np₀ and n(1 − p₀) are both comfortably above 10. The standard error uses p₀ (the H₀ value), not p̂, because the distribution is worked out assuming H₀ is true.

### Worked example

A firm claims 30% of customers use its app. A manager thinks it is higher. In a random sample of 20, 10 use the app. Test at 5%.

1. H₀: p = 0.3, H₁: p > 0.3. Under H₀, X ~ B(20, 0.3).
2. p-value: P(X ≥ 10) = 1 − P(X ≤ 9) = 0.0480.
3. 0.0480 < 0.05, so reject H₀. There is evidence at the 5% level that more than 30% of customers use the app.

In a larger random sample of 200 customers, 74 use the app. Test the same hypotheses with a normal approximation.

1. p̂ = 74 ÷ 200 = 0.37.

```latex
z = \frac{0.37 - 0.3}{\sqrt{0.3 \times 0.7 / 200}} = \frac{0.07}{0.0324} = 2.16
```

2. p-value = P(Z > 2.16) = 0.0154 < 0.05 (or z > 1.6449), so reject H₀. There is evidence that the proportion is above 30%.

### Common mistakes

- Using P(X = 10) as the p-value instead of P(X ≥ 10).
- Using p̂ in the standard error of the test statistic.

## 8.6 Testing the mean of a normal distribution with known variance

*Refs: Edexcel 8.6. Paper 2.*

### What you need to know

```latex
Z = \frac{\bar{X} - \mu_0}{\sigma / \sqrt{n}} \sim N(0, 1)
```

- Valid if the population is normal with known σ, or (by the central limit theorem) if n is large; with a large sample, s may stand in for an unknown σ.
- Compare z with the critical value (1.6449 for 5% one-tail, ±1.96 for 5% two-tail) or find the p-value.

### Explained

The test asks whether x̄ is too far from μ₀ to be explained by random sampling. The standard error σ/√n sets the scale: a difference of 3.5 is large if the standard error is 1.7, small if it is 10.

### Worked example

Bags of compost are filled with mean 100 litres and σ = 12 litres. After servicing, a random sample of 50 bags has mean 103.5 litres. Test at 5% whether the mean has increased.

1. H₀: μ = 100, H₁: μ > 100.

```latex
z = \frac{103.5 - 100}{12 / \sqrt{50}} = \frac{3.5}{1.697} = 2.06
```

2. Critical value 1.6449. 2.06 > 1.6449 (p-value 0.0196), so reject H₀.
3. There is evidence at the 5% level that the mean fill has increased.

### Common mistakes

- Using σ instead of σ/√n in the denominator.
- Forgetting to state that σ is assumed unchanged.

## 8.7 and SEC D3 Critiquing a test's conclusion

*Refs: Edexcel 8.7, SEC D3. Paper 2.*

### What you need to know

- Appropriate sampling is essential: a non-random or biased sample invalidates the test.
- Critique conclusions by considering: the sampling method; the sample size (small samples rarely reject H₀; very large samples reject H₀ for trivial differences); whether the test's conditions hold; whether the test was one- or two-tailed and chosen before seeing the data; the significance level; and whether "not rejecting H₀" has been misreported as proving H₀.

### Explained

Statistically significant means unlikely under H₀, not important. Not significant means not enough evidence, not "no effect". Choosing a one-tailed test after seeing which way the data point halves the p-value unfairly. Running many tests and reporting only the significant one inflates the chance of a false positive (see [14-errors-power-and-p-values.md](14-errors-power-and-p-values.md)).

### Worked example

A company tests whether a new advert raises the proportion of people who recognise its brand from 40%. In a sample of 10,000, 42% recognise it, and the test is highly significant (p < 0.001). The company announces the advert is "a huge success". Critique.

1. With n = 10,000 the standard error is about 0.0049, so a rise of only 2 percentage points gives z = 0.02 ÷ 0.0049 ≈ 4.1, which is highly significant.
2. Significant does not mean large: a 2 percentage point rise may not justify the advert's cost.
3. The test does not show the advert caused the rise unless the sample was compared with a control group at the same time.

### Common mistakes

- Equating "significant" with "large" or "proven".

## Check questions

1. A random sample of 6 masses (g) is 52, 48, 50, 55, 47, 48. Find unbiased estimates of μ and σ², and explain why the second uses the divisor n − 1. [4 marks]
2. State whether each is a statistic, and why: (a) the sample median; (b) x̄ − μ. [2 marks]
3. It is claimed that 60% of voters support a plan. In a random sample of 15, 5 support it. Test at 5% whether support is lower than claimed. [4 marks]
4. In a random sample of 300 voters, 159 support the plan. Test at 5% whether the support differs from 60%. [5 marks]
5. Times are normal with σ = 5 minutes. A sample of 40 has mean 48.2. Test at the 1% level whether the mean is less than 50 minutes. [5 marks]
6. Explain the meaning of a p-value of 0.03 in context for question 3's type of test. [2 marks]
7. A study fails to reject H₀ with a sample of 8. A newspaper reports "no link found". Comment. [2 marks]

## Mark scheme

1. x̄ = 300 ÷ 6 = 50 (1); Σ(x − x̄)² = 4 + 4 + 0 + 25 + 9 + 4 = 46 (1); s² = 46 ÷ 5 = 9.2 (1); dividing by n would underestimate σ² on average, because deviations are measured from x̄ not μ (1).
2. (a) Yes, depends only on the sample values (1). (b) No, contains the unknown parameter μ (1).
3. H₀: p = 0.6, H₁: p < 0.6 (1); X ~ B(15, 0.6), P(X ≤ 5) (1) = 0.0338 (1); < 0.05, reject H₀: evidence that support is below 60% (1).
4. H₀: p = 0.6, H₁: p ≠ 0.6 (1); p̂ = 0.53 (1); z = (0.53 − 0.6) ÷ √(0.24/300) = −2.47 (1); |z| > 1.96, or p-value 0.0133 < 0.05 (1); reject H₀: evidence that support differs from 60% (1).
5. H₀: μ = 50, H₁: μ < 50 (1); z = (48.2 − 50) ÷ (5/√40) (1) = −2.28 (1); critical value −2.3263 (1); −2.28 > −2.3263, do not reject H₀: insufficient evidence at 1% that the mean time is under 50 minutes (1).
6. If the true proportion were 60% (1), the probability of getting a result as low as or lower than the one observed would be 0.03 (1).
7. A sample of 8 gives a test with low power, so a real link could easily be missed (1); failing to reject H₀ is not evidence that there is no link (1).
