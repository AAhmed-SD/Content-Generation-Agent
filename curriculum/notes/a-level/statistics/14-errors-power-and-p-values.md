---
level: A-level
subject: Statistics
topic: "Type I and Type II errors, power and p-values"
boards:
  - board: Edexcel
    code: "9ST0"
    spec_refs: ["15.3", "15.4", "15.5", "15.6", "15.7"]
refs_checked: false
spec_url: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/a-level-statistics/
---

# Errors, power and p-values

This file covers judging the strength of a test's conclusion and spotting misreported findings, how changing the sample size can change the evidence, Type I and Type II errors in context, calculating the probability of a Type II error and the power of a test, and choosing between critical regions and p-values.

## Overview

Type I and Type II errors and power are written up for binomial, Poisson and normal tests in [Further Maths 32](../further-maths/32-hypothesis-tests-errors-and-power.md); critical regions and p-values in [A-level Maths 23](../maths/23-hypothesis-testing.md). A-level Statistics puts these ideas to work on the question "how much should we trust this result?", including how sample size drives power and how findings get misreported. Power curves are not required.

### Board differences

- Edexcel 9ST0 15.3 to 15.7 are on Paper 2.
- Power = 1 − P(Type II error) must be known. p-values are not used for tests on correlation coefficients.

## 15.5 Type I and Type II errors

*Refs: Edexcel 15.5. Paper 2.*

### What you need to know

- Type I error: H₀ is true but is rejected.
- Type II error: H₀ is false but is accepted (not rejected).
- P(Type I error) = the actual significance level (for a continuous test statistic, exactly the stated level; for a discrete one, the probability of the critical region under H₀).
- Lowering the significance level makes Type I errors less likely but Type II errors more likely, for a fixed sample size.
- Interpret both errors in context, and judge which is more serious.

### Explained

| | H₀ true | H₀ false |
| --- | --- | --- |
| Reject H₀ | Type I error | correct |
| Do not reject H₀ | correct | Type II error |

In a drug trial with H₀: "the drug has no effect", a Type I error approves a useless drug; a Type II error abandons a useful one. In a smoke alarm (H₀: no fire), a Type I error is a false alarm and a Type II error is a missed fire, which is far worse; so the alarm is set to be sensitive, accepting more false alarms.

### Worked example

H₀: p = 0.3, H₁: p > 0.3, with X ~ B(20, p) and critical region X ≥ 10 (the café app test in file 09). Find the probability of a Type I error and describe both errors in context.

1. P(Type I) = P(X ≥ 10 | p = 0.3) = 0.0480.
2. Type I: concluding that more than 30% of customers use the app when in fact 30% do.
3. Type II: concluding there is no evidence of more than 30% when the true proportion is higher.

### Common mistakes

- Saying a Type I error has probability 5% for a discrete test whose critical region has probability 4.8%.
- Describing errors without the context.

## 15.6 The probability of a Type II error and power

*Refs: Edexcel 15.6. Paper 2.*

### What you need to know

- To find P(Type II error), you need a specific value of the parameter under H₁. Then P(Type II) = P(test statistic is not in the critical region | that value).

```latex
\text{Power} = 1 - P(\text{Type II error}) = P(\text{reject } H_0 \mid H_0 \text{ false})
```

- Power rises as the true value moves further from H₀, as the sample size increases, and as the significance level increases.

### Explained

Method: (1) find the critical region under H₀; (2) switch to the alternative value; (3) find the probability of landing outside the critical region.

### Worked example

For the café test (critical region X ≥ 10, n = 20), find the probability of a Type II error and the power if the true proportion is 0.5.

1. P(Type II) = P(X ≤ 9 | X ~ B(20, 0.5)) = 0.4119.
2. Power = 1 − 0.4119 = 0.588. The test detects a true proportion of 50% only about 59% of the time.

Compost bags: H₀: μ = 100, H₁: μ > 100, σ = 12, n = 50, 5% level. Find the power if the true mean is 104.

1. Critical region: x̄ > 100 + 1.6449 × 12/√50 = 100 + 1.6449 × 1.697 = 102.79.
2. If μ = 104: P(Type II) = P(X̄ < 102.79) = P(Z < (102.79 − 104)/1.697) = P(Z < −0.712) = 0.238.
3. Power = 0.762.

### Common mistakes

- Using the H₀ distribution to find P(Type II).
- Forgetting that Type II depends on which alternative value is true.

## 15.4 Changing the sample size

*Refs: Edexcel 15.4. Paper 2.*

### What you need to know

- A larger sample reduces the standard error, so the same true effect gives a more extreme test statistic. Power increases and P(Type II) falls, with the significance level fixed.
- A study that fails to reject H₀ may simply be too small; a larger sample can be planned to give enough power.

### Explained

To plan a z-test for a mean to have power 1 − β at a true mean μ₁, with a one-tailed level α:

```latex
n \ge \left(\frac{(z_\alpha + z_\beta)\sigma}{\mu_1 - \mu_0}\right)^2
```

The idea, not the formula, is examinable: bigger n, more power.

### Worked example

Repeat the compost power calculation with n = 100. How many bags would give power 0.9?

1. SE = 12/√100 = 1.2. Critical value: 100 + 1.6449 × 1.2 = 101.97.
2. P(Type II) = P(Z < (101.97 − 104)/1.2) = P(Z < −1.69) = 0.046. Power = 0.954 (up from 0.762).
3. For power 0.9: n ≥ ((1.6449 + 1.2816) × 12 ÷ 4)² = 77.1, so n = 78.

### Common mistakes

- Thinking a larger sample changes the probability of a Type I error; the significance level fixes it.

## 15.3 Strength of conclusions and misreporting

*Refs: Edexcel 15.3. Paper 2.*

### What you need to know

- A p-value just below 0.05 is weak evidence; one below 0.001 is strong. A result just above 0.05 is not "proof of no effect".
- Misreporting includes: treating "not significant" as "no effect"; treating "significant" as "large" or "important"; testing many hypotheses and reporting only the significant ones; changing to a one-tailed test after seeing the data; and claiming cause from an observational study.
- Low-power studies often miss real effects, and the significant results they do find tend to overstate the size of the effect.

### Explained

If 20 independent tests are each run at 5% when all the null hypotheses are true, the chance of at least one false "significant" result is

```latex
1 - 0.95^{20} = 0.642
```

so a single significant result among many tests is weak evidence. Look for a pre-stated hypothesis, an adequate sample size (high power), a report of the effect size (see [17-effect-size.md](17-effect-size.md)) and a confidence interval, not just a p-value.

### Worked example

A blog reports: "Scientists tested 20 foods; eating blueberries was linked to better memory (p = 0.04)". Evaluate the claim.

1. With 20 tests at 5%, the probability of at least one false positive is 0.642 if no food has any effect.
2. p = 0.04 is only just below 0.05, so the evidence is weak even for one test.
3. The size of the memory difference is not reported, and "linked" may come from an observational study, so it does not show cause.
4. A new study testing only blueberries, with a pre-stated hypothesis and enough power, would be needed.

### Common mistakes

- Judging a study only on whether p < 0.05.

## 15.7 Critical regions or p-values

*Refs: Edexcel 15.7. Paper 2.*

### What you need to know

- Critical region approach: fix the significance level, find the region, and see whether the test statistic falls in it.
- p-value approach: find the probability of the observed result or more extreme under H₀, and compare with the significance level.
- They always reach the same decision at the same level.
- p-values are not used for correlation coefficient tests in this specification.

### Explained

| | Critical region | p-value |
| --- | --- | --- |
| Advantages | works with tables; region can be set before collecting data; needed to find Type II errors and power | shows the strength of evidence; lets readers use their own significance level; standard in software output |
| Limitations | gives only reject or not | invites the misuse "p < 0.05 means important" |

### Worked example

In the compost test, x̄ = 103.5 with n = 50. Show that both approaches give the same decision and say what extra information the p-value gives.

1. Critical region: x̄ > 102.79. 103.5 is in it, so reject H₀.
2. p-value: z = 2.06, P(Z > 2.06) = 0.0196 < 0.05, so reject H₀.
3. The p-value also shows the evidence would be rejected at 2.5% but not at 1%.

### Common mistakes

- Comparing a two-tailed p-value with half the significance level as well as doubling (doubling twice).

## Check questions

1. H₀: p = 0.2, H₁: p > 0.2, n = 25, 5% level. Find the critical region and the probability of a Type I error. [4 marks]
2. For question 1, find the probability of a Type II error and the power if p = 0.35. [3 marks]
3. A test of H₀: μ = 50 against H₁: μ ≠ 50 uses σ = 2, n = 16 and a 5% level. Find the critical region for x̄ and the power if μ = 51. [6 marks]
4. State the effect on P(Type II) of (a) increasing n, (b) changing from a 5% to a 1% level. [2 marks]
5. A fire-safety test uses H₀: "the material is safe". Describe a Type I and a Type II error in context and say which is more serious. [3 marks]
6. Give one advantage of a p-value over a critical value. [1 mark]
7. A company runs 10 tests at 5% on independent hypotheses that are all true. Find the probability that at least one is significant. [2 marks]

## Mark scheme

1. X ~ B(25, 0.2) (1); P(X ≥ 9) = 0.0468, P(X ≥ 8) = 0.1091 (1); critical region X ≥ 9 (1); P(Type I) = 0.0468 (1).
2. P(X ≤ 8 | p = 0.35) (1) = 0.4668 (1); power = 0.533 (1).
3. SE = 0.5 (1); x̄ < 50 − 1.96 × 0.5 = 49.02 or x̄ > 50.98 (2); if μ = 51, P(49.02 < X̄ < 50.98) (1) = 0.484 (1); power = 0.516 (1).
4. (a) Decreases (1). (b) Increases (1).
5. Type I: concluding the material is unsafe when it is safe (1); Type II: concluding there is no evidence it is unsafe when it is unsafe (1); Type II is more serious because unsafe material would be used (1).
6. It shows the strength of evidence / can be compared with any significance level (1).
7. 1 − 0.95¹⁰ (1) = 0.401 (1).
