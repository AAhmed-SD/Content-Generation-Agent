---
level: A-level
subject: Statistics
topic: "Effect size and Cohen's d"
boards:
  - board: Edexcel
    code: "9ST0"
    spec_refs: ["21.1", "21.2"]
refs_checked: false
spec_url: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/a-level-statistics/
---

# Effect size and Cohen's d

This file covers effect size as a companion to significance testing, why a p-value depends on both the effect size and the sample size, and calculating and interpreting Cohen's d using the standard guideline boundaries.

## Overview

Effect size is not in A-level Mathematics or Further Mathematics, so this file is new. A significance test answers "is there evidence of a difference?"; an effect size answers "how big is the difference?". Reporting both avoids the misreading of "significant" as "important" discussed in [14-errors-power-and-p-values.md](14-errors-power-and-p-values.md). Cohen's d uses the same pooled standard deviation as the pooled t-test in [15-tests-for-two-means-and-two-proportions.md](15-tests-for-two-means-and-two-proportions.md).

### Board differences

- Edexcel 9ST0 topic 21 is on Paper 2. The formula for Cohen's d (with the pooled s) is in the formulae booklet; the guideline boundaries must be known.

## 21.1 Effect size alongside significance testing

*Refs: Edexcel 21.1. Paper 2.*

### What you need to know

- Effect size quantifies the size of the difference between two means, regardless of whether it is statistically significant.
- A p-value depends on both the effect size and the sample size: a small effect can be highly significant in a very large sample, and a large effect can be non-significant in a small sample.
- How big an effect matters depends on the context.

### Explained

A test statistic for two means is roughly (effect size) × √(n/2) for two groups of size n. So with the effect fixed, the test statistic grows with √n, and the p-value shrinks. With millions of records, almost every difference is significant; with a handful, almost none is. Effect size does not change with n in this way, so it lets studies of different sizes be compared.

Context matters: a small effect of a cheap, safe change to a whole country's school timetable could matter a great deal; a medium effect of an expensive drug with side effects might not be worth it.

### Worked example

Two studies compare a new teaching method with the old one, and both find an effect size of d = 0.2 (a small effect). Study 1 has 20 pupils per group; study 2 has 500. Using z ≈ d√(n/2), compare their p-values (two-tailed).

1. Study 1: z ≈ 0.2 × √10 = 0.632; p-value = 0.527. Not significant.
2. Study 2: z ≈ 0.2 × √250 = 3.162; p-value = 0.0016. Highly significant.
3. The effect is the same size; only the sample size differs. Study 2's significance shows the effect is probably real, but it is still small.

### Common mistakes

- Treating a highly significant result as a large effect.
- Treating a non-significant result from a small study as showing no effect.

## 21.2 Cohen's d

*Refs: Edexcel 21.2. Paper 2.*

### What you need to know

```latex
d = \frac{\bar{x}_1 - \bar{x}_2}{s}, \qquad s = \sqrt{\frac{(n_1 - 1)s_1^2 + (n_2 - 1)s_2^2}{n_1 + n_2 - 2}}
```

- Guideline boundaries:

| d | Effect size |
| --- | --- |
| 0.2 ≤ d < 0.5 | small |
| 0.5 ≤ d < 0.8 | medium |
| d ≥ 0.8 | large |

- Interpret d as "the means differ by d pooled standard deviations", in context.

### Explained

Dividing by the pooled standard deviation makes d unit-free, so effects on different scales (marks, seconds, kilograms) can be compared. Use the size of d to judge the effect; its sign only shows which group is higher. Values below 0.2 are usually described as negligible. The boundaries are guidelines, not rules: the meaning depends on the context.

### Worked example

Class 1 (25 pupils) has mean 64.0 and s = 12.0 in a test; class 2 (30 pupils) has mean 58.5 and s = 10.0. Find Cohen's d and interpret.

1. Pooled s:

```latex
s = \sqrt{\frac{24 \times 144 + 29 \times 100}{53}} = \sqrt{\frac{3456 + 2900}{53}} = \sqrt{119.92} = 10.95
```

2. d = (64.0 − 58.5) ÷ 10.95 = 0.502.
3. 0.5 ≤ 0.502 < 0.8, a medium effect: class 1's mean is about half a standard deviation higher.

For the feeds in [15-tests-for-two-means-and-two-proportions.md](15-tests-for-two-means-and-two-proportions.md), the means differ by 2.174 cm and the pooled variance is 1.186. Find d.

1. s = √1.186 = 1.089; d = 2.174 ÷ 1.089 = 2.00, a large effect, consistent with the very significant t-test.

### Common mistakes

- Using one group's standard deviation instead of the pooled value.
- Pooling standard deviations directly instead of variances.
- Forgetting the context when describing the effect.

## Check questions

1. Two groups of 40 have means 23.4 and 21.9 and standard deviations 5.0 and 5.4. Find Cohen's d and classify the effect. [4 marks]
2. Two groups of 12 and 15 have means 81 and 74 and standard deviations 6 and 7. Find Cohen's d and classify the effect. [4 marks]
3. A study of 200,000 people finds that a supplement raises mean reaction speed with p < 0.0001 and d = 0.05. Comment for a newspaper headline "Supplement dramatically boosts reactions". [3 marks]
4. Explain why a p-value alone is not a good measure of the size of an effect. [2 marks]

## Mark scheme

1. s = √((39 × 25 + 39 × 29.16) ÷ 78) (1) = 5.204 (1); d = 1.5 ÷ 5.204 = 0.288 (1); small effect (1).
2. s = √((11 × 36 + 14 × 49) ÷ 25) (1) = 6.579 (1); d = 7 ÷ 6.579 = 1.06 (1); large effect (1).
3. The p-value is tiny because the sample is huge (1); d = 0.05 is below the 0.2 boundary, a negligible effect (1); the headline exaggerates: the effect is real but very small (1).
4. The p-value depends on the sample size as well as the size of the difference (1), so a tiny effect can give a small p-value in a large sample, and a large effect a big p-value in a small sample (1).
