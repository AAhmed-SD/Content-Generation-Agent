---
level: A-level
subject: Further Mathematics
topic: "Confidence intervals and tests for means (z and t)"
as_content: "A-level only on OCR (5.05c, 5.05d Stage 2) and MEI (section (b)); option content on AQA and Edexcel (FS2)."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["SG1", "SH1", "SH2", "SH3", "SH4"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FS2 5.2", "FS2 5.3", "FS2 5.4", "FS2 5.5", "FS2 7.1", "FS2 7.2", "FS2 7.3"]
  - board: OCR
    code: "H245"
    spec_refs: ["5.05c", "5.05d"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["SI7", "SI8", "SI9", "SI10", "SI11", "SI12", "SI13", "SH5", "SH6"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-statistics/
---

# Confidence intervals and tests for means (z and t)

This file covers confidence intervals for a population mean (variance known, large samples, and small samples using the t-distribution), interpreting intervals, tests for a mean using z and t, tests and intervals for the difference between two means, and the paired t-test.

## Overview

Sampling distributions and the central limit theorem are in [37-sampling-estimation-and-central-limit-theorem.md](37-sampling-estimation-and-central-limit-theorem.md). The test for a normal mean with known variance is in A-level Maths ([../maths/23-hypothesis-testing.md](../maths/23-hypothesis-testing.md)). Tests for variances are in [39-tests-for-variances-chi-squared-and-f.md](39-tests-for-variances-chi-squared-and-f.md).

### Board differences

- AQA SG1 (one-sample t-test), SH1 to SH4 (z and t confidence intervals for one mean).
- Edexcel FS2 5.1 to 5.5 (z intervals and tests, difference of two means, large samples), 7.1 to 7.3 (t-test and interval for one mean, paired t-test, two-sample t-test with pooled variance).
- OCR 5.05c, 5.05d (normal tests and intervals for a mean, using the CLT for large samples). OCR uses non-parametric tests rather than t (file 41).
- MEI SI7 to SI13 (confidence intervals, including t and for paired samples), SH5, SH6 (tests for a mean using z and t, and paired samples).

## SH1 Confidence intervals for a mean

*Refs: AQA SH1, SH2, SH3, SH4 · Edexcel FS2 5.2, 5.3, 5.5, 7.1 · OCR 5.05d · MEI SI7, SI8, SI9, SI12, SI13. Level: A-level only.*

### What you need to know

- Known σ (normal population, or any population with large n):

```latex
\bar x \pm z\frac{\sigma}{\sqrt n}\quad(z = 1.645, 1.960, 2.576\text{ for }90\%, 95\%, 99\%)
```

- Large sample, σ unknown: use s in place of σ (CLT).
- Small sample from a normal population, σ unknown:

```latex
\bar x \pm t_{n-1}\frac{s}{\sqrt n}
```

- A 95% interval is a random interval that contains μ in 95% of repeated samples. Wider for higher confidence, narrower for larger n.
- A value of μ outside the interval would be rejected by a two-tailed test at the matching level.

### Worked example

A sample of 25 from N(μ, 16) has mean 52.3. Find a 95% confidence interval for μ.

1. 52.3 ± 1.96 × 4/5 = 52.3 ± 1.568.
2. (50.73, 53.87).

A sample of 100 has mean 3.42 and s = 0.8. Find a 95% interval for μ.

1. Large sample: 3.42 ± 1.96 × 0.08 = (3.26, 3.58).

Eight lengths (cm): 12.1, 11.8, 12.4, 12.0, 11.6, 12.3, 11.9, 12.5. Assuming normality, find a 95% interval for μ.

1. x̄ = 12.075, s = 0.3105, t₇ = 2.365.
2. 12.075 ± 2.365 × 0.3105/√8 = 12.075 ± 0.260 = (11.82, 12.33).

### Common mistakes

- Using z for a small sample with unknown σ.
- Saying "there is a 95% probability μ is in this interval".

## SG1 Tests for a mean

*Refs: AQA SG1 · Edexcel FS2 5.4, 7.1 · OCR 5.05c · MEI SH5. Level: A-level only.*

### What you need to know

- z-test (σ known, or large n): Z = (x̄ − μ₀)/(σ/√n).
- t-test (small sample, normal population, σ unknown): T = (x̄ − μ₀)/(s/√n) with n − 1 degrees of freedom.

### Worked example

For the eight lengths above, test at 5% whether the mean is less than 12.3 cm.

1. H₀: μ = 12.3, H₁: μ < 12.3.
2. t = (12.075 − 12.3)/(0.3105/√8) = −2.049.
3. Critical value −t₇(5%) = −1.895. −2.049 < −1.895: reject H₀. Evidence the mean is less than 12.3 cm.

### Common mistakes

- Using n instead of n − 1 for the degrees of freedom.

## Two means and paired data

*Refs: Edexcel FS2 5.4, 7.2, 7.3 · MEI SI10, SI11, SH6. Level: A-level only.*

### What you need to know

- Difference of means, large samples or known variances:

```latex
Z = \frac{(\bar x_1 - \bar x_2) - (\mu_1 - \mu_2)}{\sqrt{\dfrac{\sigma_1^2}{n_1} + \dfrac{\sigma_2^2}{n_2}}}
```

- (Edexcel) Two small samples from normal populations with a common variance: pool the variance and use t with n₁ + n₂ − 2 degrees of freedom:

```latex
s_p^2 = \frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1+n_2-2}
```

- Paired data (the same subjects measured twice): work with the differences d and do a one-sample test on them with n − 1 degrees of freedom.
- (MEI SI10) Pair the data when each value in one sample is naturally linked to one value in the other.

### Worked example

Sample 1: n = 40, mean 68.2, s = 5. Sample 2: n = 50, mean 65.9, s = 6. Test at 5% for a difference in population means.

1. H₀: μ₁ = μ₂, H₁: μ₁ ≠ μ₂.
2. z = 2.3/√(25/40 + 36/50) = 1.983.
3. Critical values ±1.96. 1.983 > 1.96: reject H₀ (just). Evidence of a difference.

(Edexcel) Two normal samples: n₁ = 6, x̄₁ = 24.5, s₁² = 4.1; n₂ = 8, x̄₂ = 22.1, s₂² = 3.6. Test at 5% (two-tailed) for a difference, assuming equal variances.

1. s_p² = (5 × 4.1 + 7 × 3.6)/12 = 3.808.
2. t = 2.4/√(3.808(1/6 + 1/8)) = 2.277.
3. t₁₂(2.5%) = 2.179. Reject H₀: evidence the means differ.

Eight students sit a test before and after a course. Differences (after − before): 3, −1, 4, 2, 5, 0, 3, 2. Test at 5% whether scores improved.

1. d̄ = 2.25, s_d = 1.982.
2. t = 2.25/(1.982/√8) = 3.211. t₇(5%) = 1.895.
3. Reject H₀: evidence of improvement.

### Common mistakes

- Treating paired data as two independent samples.

## Check questions

1. A sample of 16 from N(μ, 9) has mean 20.4. Find a 99% confidence interval for μ. [3 marks]
2. Ten observations from a normal population have x̄ = 7.3 and s = 1.2. Find a 90% confidence interval for μ. [4 marks]
3. A 95% interval for μ is (14.2, 17.8) from a sample of 25 with σ known. Find x̄ and σ. [3 marks]
4. A machine is set to fill 500 ml. A sample of 12 gives x̄ = 497.5 ml, s = 3.8 ml. Test at 5% whether the machine under-fills. State an assumption. [6 marks]
5. Six athletes' times (s) before and after training: before 12.4, 12.9, 13.1, 12.6, 12.8, 13.0; after 12.2, 12.8, 12.7, 12.6, 12.5, 12.9. Test at 5% whether training reduced times. [7 marks]

## Mark scheme

1. 20.4 ± 2.576 × 3/4 (2) = (18.47, 22.33) (1).
2. t₉(5%) = 1.833 (1). 7.3 ± 1.833 × 1.2/√10 (2) = (6.60, 8.00) (1).
3. x̄ = 16 (1). 1.96σ/5 = 1.8 (1), σ = 4.59 (1).
4. H₀: μ = 500, H₁: μ < 500 (1). t = −2.5/(3.8/√12) = −2.279 (2). t₁₁(5%) = −1.796 (1). Reject H₀: evidence of under-filling (1). Assume volumes are normally distributed (1).
5. Differences (before − after): 0.2, 0.1, 0.4, 0, 0.3, 0.1 (1). d̄ = 0.1833, s_d = 0.1472 (2). t = 0.1833/(0.1472/√6) = 3.05 (2). t₅(5%) = 2.015 (1). Reject H₀: evidence training reduced times (1).
