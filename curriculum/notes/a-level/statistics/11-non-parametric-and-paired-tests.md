---
level: A-level
subject: Statistics
topic: "Sign, Wilcoxon and paired t-tests"
boards:
  - board: Edexcel
    code: "9ST0"
    spec_refs: ["10.1", "10.2", "17.1"]
refs_checked: false
spec_url: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/a-level-statistics/
---

# Sign, Wilcoxon and paired t-tests

This file covers the sign test and the Wilcoxon signed-rank test for a single population median and for paired data, the Wilcoxon rank-sum test for two independent samples, and choosing between the sign test, the Wilcoxon signed-rank test and the paired t-test.

## Overview

The sign test, the Wilcoxon signed-rank test and the Wilcoxon rank-sum test are written up in [Further Maths 41](../further-maths/41-non-parametric-tests.md); the paired t-test in [Further Maths 38](../further-maths/38-confidence-intervals-and-tests-for-means.md). A-level Statistics expects you to recall each test's conditions and use them to choose the most suitable test, so this file sets the three paired tests side by side on one data set. Non-parametric tests make few assumptions about the population, which makes them safer, but they use less of the information in the data, so they are less powerful.

### Board differences

- Edexcel 9ST0 topics 10 and 17 are on Paper 2.
- Tables of critical values for the Wilcoxon signed-rank statistic (Table 10) and the Wilcoxon rank-sum statistic (Table 11) are given. The rank-sum test is also called the Mann-Whitney test.
- Conditions to recall: sign test, none about the distribution; Wilcoxon signed-rank, a symmetrical distribution (of the differences, for paired data); paired t-test, normal differences.

## 10.1 Sign and Wilcoxon signed-rank tests

*Refs: Edexcel 10.1. Paper 2.*

### What you need to know

- Both tests a single population median m (H₀: m = m₀) from one sample, or the median difference of paired data (H₀: median difference = 0).
- **Sign test:** record + for each value above m₀ (or positive difference), − below; discard values equal to m₀. Under H₀ the number of + signs X ~ B(n, 0.5), where n is the number of non-zero signs.
- **Wilcoxon signed-rank test:** find each difference d = x − m₀ (or the paired difference), discard zeros, rank |d| from smallest (tied values share the mean rank), then add the ranks of the positive differences (T⁺) and of the negative differences (T⁻). Their total is n(n + 1)/2.
  - For H₁: m > m₀, the test statistic is T = T⁻; for H₁: m < m₀, T = T⁺; for a two-tailed test, T = the smaller of the two.
  - Reject H₀ if T ≤ the critical value from the table.

```latex
T^+ + T^- = \frac{n(n+1)}{2}
```

### Explained

The sign test only uses whether each value is above or below m₀, so it needs no assumptions, but it throws away how far above or below. The Wilcoxon test also uses the sizes of the differences through their ranks, so it is more powerful, but its validity needs the distribution to be symmetrical about the median.

Some exact critical values of T (reject if T is less than or equal to the value):

| n | 5% one-tail | 2.5% one-tail | 1% one-tail |
| --- | --- | --- | --- |
| 8 | 5 | 3 | 1 |
| 9 | 8 | 5 | 3 |
| 10 | 10 | 8 | 5 |
| 12 | 17 | 13 | 9 |

Use the table in the formulae booklet in the exam.

### Worked example

A sign test. A maker says its batteries have median life 25 hours. A consumer group thinks it is lower. Twelve batteries last: 22.1, 26.4, 23.0, 21.8, 24.5, 25.0, 19.9, 23.7, 26.0, 22.6, 20.4, 24.1. Test at 5%.

1. H₀: median = 25, H₁: median < 25.
2. Discard 25.0, so n = 11. Above 25: two (26.4, 26.0). Below: nine.
3. Under H₀, X (number above) ~ B(11, 0.5). P(X ≤ 2) = 0.0327.
4. 0.0327 < 0.05, so reject H₀. There is evidence that the median battery life is below 25 hours.

A Wilcoxon signed-rank test. A sample of 10 scores is 54, 61, 47, 58, 66, 52, 49, 63, 57, 45. Test at 5% whether the population median exceeds 50, assuming a symmetrical distribution.

1. H₀: median = 50, H₁: median > 50.
2. Differences: 4, 11, −3, 8, 16, 2, −1, 13, 7, −5.
3. Rank by size: 1 (−1), 2 (2), 3 (−3), 4 (4), 5 (−5), 6 (7), 7 (8), 8 (11), 9 (13), 10 (16).
4. T⁻ = 1 + 3 + 5 = 9, T⁺ = 46 (check: 9 + 46 = 55 = 10 × 11 ÷ 2).
5. For H₁: median > 50, T = T⁻ = 9. Critical value (n = 10, 5% one-tail) = 10.
6. 9 ≤ 10, so reject H₀. There is evidence that the median score is above 50.

### Common mistakes

- Keeping values equal to m₀ in the count.
- Ranking the signed differences instead of their absolute values.
- Using T⁺ for an "above" alternative: small T⁻ is the evidence that values lie above m₀.

## 10.2 The Wilcoxon rank-sum test

*Refs: Edexcel 10.2. Paper 2.*

### What you need to know

- Tests whether two independent samples come from populations with the same median. H₀: the medians are equal; H₁: one is lower (one-tailed) or they differ (two-tailed).
- Rank all m + n values together from smallest (ties share the mean rank). W = the sum of the ranks of the smaller sample (size m).
- Compare W with the table: reject H₀ if W ≤ the lower critical value, or (if the smaller sample might be the larger-valued one) if W ≥ m(m + n + 1) − critical value.
- Assumes the two populations have the same shape, differing only in location.

```latex
W' = m(m + n + 1) - W
```

### Explained

If the smaller sample has generally lower values, its ranks will be small and W will be small. If it has generally higher values, W will be large; W′ = m(m + n + 1) − W converts that to the lower tail so one table works for both directions. Use the smaller of W and W′ for a two-tailed test.

Some exact lower critical values (one-tail):

| m, n | 5% | 2.5% | 1% |
| --- | --- | --- | --- |
| 5, 7 | 21 | 20 | 18 |
| 6, 7 | 29 | 27 | 25 |
| 6, 8 | 31 | 29 | 27 |
| 7, 8 | 41 | 38 | 35 |

### Worked example

Six students taught by method A and eight by method B score: A: 23, 31, 27, 19, 35, 25; B: 33, 38, 29, 41, 36, 30, 44, 34. Test at 5% whether method A gives lower scores.

1. H₀: the medians are equal. H₁: the median for A is lower.
2. Combined order: 19 (1), 23 (2), 25 (3), 27 (4), 29 (5), 30 (6), 31 (7), 33 (8), 34 (9), 35 (10), 36 (11), 38 (12), 41 (13), 44 (14).
3. Ranks of A: 2, 7, 4, 1, 10, 3. W = 27.
4. m = 6, n = 8, critical value 31 (5% one-tail). 27 ≤ 31, so reject H₀.
5. There is evidence that method A gives lower scores (W = 27 is even at the 1% value).

### Common mistakes

- Summing the ranks of the larger sample.
- Ranking each sample separately instead of together.

## 17.1 Choosing a paired test: sign, Wilcoxon signed-rank or paired t

*Refs: Edexcel 17.1. Paper 2.*

### What you need to know

- For paired data, work with the differences d.
- Sign test: no assumption about the distribution of d.
- Wilcoxon signed-rank test: d symmetrical.
- Paired t-test: d normally distributed. Test statistic, with ν = n − 1:

```latex
t = \frac{\bar{d} - 0}{s_d / \sqrt{n}} \sim t_{n-1}
```

- Choose the most powerful test whose conditions hold, and interpret in context.

### Explained

| Test | Uses | Assumes | Power |
| --- | --- | --- | --- |
| sign | sign of each d | nothing about shape | lowest |
| Wilcoxon signed-rank | ranks of the sizes of d | d symmetrical | middle |
| paired t | values of d | d normal | highest (when d is normal) |

Look at the differences (a dot plot or box plot) before choosing. A paired design removes variation between subjects, which is why pairing is used (see [12-experimental-design.md](12-experimental-design.md)).

### Worked example

Ten people's reaction times (ms) are measured before and after a caffeine drink:

| Person | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Before | 312 | 285 | 298 | 330 | 276 | 305 | 290 | 318 | 301 | 288 |
| After | 298 | 280 | 301 | 312 | 270 | 296 | 291 | 300 | 295 | 279 |

Test at 5% whether reaction times fall, using each paired test, and comment.

1. d = before − after: 14, 5, −3, 18, 6, 9, −1, 18, 6, 9. H₀: no change; H₁: times fall (d tends to be positive).
2. Sign test: 8 positive, 2 negative. Under H₀, X ~ B(10, 0.5); P(X ≤ 2) = 0.0547 > 0.05. Do not reject H₀.
3. Wilcoxon: ranks of |d|: 1 (−1), 2 (−3), 3 (5), 4.5 (6, 6), 6.5 (9, 9), 8 (14), 9.5 (18, 18). T⁻ = 1 + 2 = 3, T⁺ = 52. T = 3 ≤ 10 (critical value for n = 10), so reject H₀.
4. Paired t: d̄ = 8.1, s_d = 7.125.

```latex
t = \frac{8.1}{7.125 / \sqrt{10}} = 3.59, \qquad t_9(5\%) = 1.833
```

3.59 > 1.833, so reject H₀.

5. Comment: the sign test ignores the sizes of the differences and just misses significance; the other two find evidence that caffeine reduces reaction time. The differences look roughly symmetrical with no extreme values, so the Wilcoxon test is valid; with only 10 values normality is hard to check, so the Wilcoxon test is a safe choice.

### Common mistakes

- Treating paired data as two independent samples.
- Using a paired t-test on clearly skewed differences.
- Not stating the condition for the test chosen.

## Check questions

1. Ten values are 14.2, 15.8, 13.1, 16.5, 12.7, 13.9, 15.1, 12.2, 13.5, 11.8. Use a sign test at 5% to test whether the median is less than 15. [4 marks]
2. Use a Wilcoxon signed-rank test at 5% on the same data, stating the assumption needed. [6 marks]
3. Comment on why the answers to questions 1 and 2 differ. [2 marks]
4. Two independent samples of plant heights (cm): P: 12, 15, 9, 20, 14, 11, 17; Q: 18, 22, 16, 25, 21, 24, 19, 23. Test at 5% (two-tailed) whether the medians differ. The 2.5% one-tail lower critical value for m = 7, n = 8 is 38. [5 marks]
5. For paired data, state the test you would use if (a) the differences look normal, (b) the differences are symmetrical with heavy tails, (c) the differences are strongly skewed. [3 marks]

## Mark scheme

1. H₀: median = 15, H₁: median < 15 (1); 3 above, 7 below (1); P(X ≤ 3) for B(10, 0.5) = 0.1719 (1); > 0.05, do not reject H₀: insufficient evidence median is below 15 (1).
2. Differences −0.8, 0.8, −1.9, 1.5, −2.3, −1.1, 0.1, −2.8, −1.5, −3.2 (1); ranks with ties (0.8s share 2.5; 1.5s share 5.5) (1); T⁺ = 2.5 + 5.5 + 1 = 9 (1), T⁻ = 46 (1); T = 9 ≤ 10, reject H₀ (1); assumption: the population is symmetrical about its median (1).
3. The Wilcoxon test uses the sizes of the differences (the values below 15 are further away than those above) (1), so it is more powerful than the sign test, which uses only signs (1).
4. H₀: medians equal, H₁: medians differ (1); combined ranks of P: 3, 5, 1, 10, 4, 2, 7 (1); W = 32 (1); W′ = 7 × 16 − 32 = 80, use 32 (1); 32 ≤ 38, reject H₀: evidence the medians differ (1).
5. (a) Paired t-test (1). (b) Wilcoxon signed-rank (1). (c) Sign test (1).
