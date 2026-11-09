---
level: A-level
subject: Further Mathematics
topic: "Non-parametric tests"
as_content: "All of this file is A-level only (OCR Statistics option, 5.07 Stage 2)."
boards:
  - board: OCR
    code: "H245"
    spec_refs: ["5.07a", "5.07b", "5.07c", "5.07d", "5.07e", "5.07f"]
refs_checked: false
spec_urls:
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-statistics/
---

# Non-parametric tests

This file covers what a non-parametric test is, the sign test, the Wilcoxon signed-rank test for a single sample or paired samples, the Wilcoxon rank-sum test for two independent samples, and normal approximations for large samples.

## Overview

OCR only. These tests replace t-tests ([38-confidence-intervals-and-tests-for-means.md](38-confidence-intervals-and-tests-for-means.md)) when the population cannot be assumed normal. The sign test uses the binomial distribution ([../maths/22-statistical-distributions.md](../maths/22-statistical-distributions.md)).

### Board differences

- OCR 5.07a to 5.07f. Critical values are read from the tables in the OCR formula booklet. No other board includes these tests.

## Non-parametric tests and the sign test

*Refs: OCR 5.07a, 5.07b, 5.07c, 5.07d. Level: A-level only.*

### What you need to know

- A non-parametric test makes no assumption about the form of the population distribution. It tests a median rather than a mean.
- Sign test for a median m₀: count the values above m₀ (ignore values equal to it). Under H₀ the count is B(n, ½).
- Wilcoxon signed-rank test: also uses the sizes of the differences, so it is more powerful, but assumes the distribution is symmetric.
- Paired samples: test the differences; independent samples need a different test (rank-sum).

### Worked example

Eight readings: 5.1, 4.2, 6.3, 3.8, 4.6, 3.2, 4.0, 3.5. Use a sign test at 5% to test whether the median is less than 5.

1. H₀: median 5, H₁: median < 5.
2. Above 5: 2 (5.1 and 6.3); below: 6.
3. P(X ≤ 2) for B(8, ½) = 37/256 = 0.145 > 0.05. Do not reject H₀.

### Common mistakes

- Counting values equal to the hypothesised median.

## The Wilcoxon signed-rank test

*Refs: OCR 5.07b, 5.07c, 5.07d, 5.07f. Level: A-level only.*

### What you need to know

1. Find d = x − m₀ (or the paired differences); discard zeros.
2. Rank |d| from smallest (1) to largest; ties get the mean of their ranks.
3. P = sum of ranks of positive d, Q = sum for negative d (P + Q = n(n + 1)/2).
4. T = the relevant sum (the smaller one for a two-tailed test; for H₁: median < m₀, T = P). Reject H₀ if T ≤ the critical value.
- For large n, T ≈ N(n(n + 1)/4, n(n + 1)(2n + 1)/24), with a continuity correction.

### Worked example

Same data, Wilcoxon signed-rank test at 5% for median < 5.

1. d: 0.1, −0.8, 1.3, −1.2, −0.4, −1.8, −1.0, −1.5.
2. Ranks of |d|: 1, 3, 6, 5, 2, 8, 4, 7.
3. P = 1 + 6 = 7, Q = 29.
4. Critical value for n = 8, one-tailed 5%: 5. T = 7 > 5. Do not reject H₀ (just).

For n = 30 a statistic T = 140 is found. Use a normal approximation to test at 5% (one-tailed).

1. Mean 232.5, variance 30 × 31 × 61/24 = 2363.75, s.d. 48.62.
2. z = (140.5 − 232.5)/48.62 = −1.892 < −1.645. Reject H₀.

### Common mistakes

- Forgetting the continuity correction in the normal approximation.

## The Wilcoxon rank-sum test

*Refs: OCR 5.07e, 5.07f. Level: A-level only.*

### What you need to know

- For two independent samples (sizes m ≤ n), H₀: the populations have the same median (identical distributions).
- Rank all m + n values together. W = sum of ranks of the smaller sample. Compare the smaller of W and m(m + n + 1) − W with the table.
- Large samples: W ≈ N(½m(m + n + 1), mn(m + n + 1)/12).

### Worked example

Group A (5 values): 23, 28, 31, 35, 40. Group B (6 values): 19, 22, 26, 27, 30, 33. Test at 5% (two-tailed) for a difference.

1. Combined ranks: 19 (1), 22 (2), 23 (3), 26 (4), 27 (5), 28 (6), 30 (7), 31 (8), 33 (9), 35 (10), 40 (11).
2. W for A = 3 + 6 + 8 + 10 + 11 = 38. m(m + n + 1) − W = 60 − 38 = 22.
3. Test statistic 22. Critical value (m = 5, n = 6, 5% two-tailed): 18. 22 > 18: do not reject H₀.

### Common mistakes

- Ranking each sample separately.

## Check questions

1. State one advantage and one disadvantage of a non-parametric test compared with a t-test. [2 marks]
2. Ten people rate a product: the median claimed is 7. Scores: 8, 6, 9, 9, 5, 8, 10, 7, 8, 9. Use a sign test at 5% to test whether the median is greater than 7. [4 marks]
3. Use a Wilcoxon signed-rank test on the paired differences 1.2, −0.4, 2.1, 0.8, 1.5, −0.2, 0.9, 1.7 to test at 5% whether the population median difference is positive (critical value 5). [5 marks]
4. Explain why the Wilcoxon signed-rank test needs a symmetric distribution while the sign test does not. [1 mark]

## Mark scheme

1. Advantage: no assumption of normality (1). Disadvantage: less powerful when the data are normal / uses less information (1).
2. Exclude the 7: n = 9, above 7: 8 (1). P(X ≥ 8 | B(9, ½)) = 10/512 = 0.0195 (2). < 0.05: evidence the median is greater than 7 (1).
3. Ranks of |d|: 0.2 (1), 0.4 (2), 0.8 (3), 0.9 (4), 1.2 (5), 1.5 (6), 1.7 (7), 2.1 (8) (2). Negative ranks sum Q = 3 (1). T = 3 ≤ 5 (1). Reject H₀: evidence the median difference is positive (1).
4. It uses the sizes of deviations on both sides, which only balance under H₀ if the distribution is symmetric about the median (1).
