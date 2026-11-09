---
level: A-level
subject: Further Mathematics
topic: "Sampling, estimation and the central limit theorem"
as_content: "MEI sampling (Sx) is AS; the rest is A-level only on OCR (5.05 Stage 2) and MEI (section (b)). AQA does not list this separately; Edexcel FS1 5.1 and FS2 5.1 are option content."
boards:
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FS1 5.1", "FS2 5.1"]
  - board: OCR
    code: "H245"
    spec_refs: ["5.05a", "5.05b"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Sx1", "Sx2", "Sx3", "SR30", "SR31", "SR32", "SI1", "SI2", "SI3", "SI4", "SI5", "SI6", "SZ1", "SZ2"]
refs_checked: false
spec_urls:
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-statistics/
---

# Sampling, estimation and the central limit theorem

This file covers why sample size and random sampling matter, unbiased estimates of the population mean and variance, the distribution of the sample mean and its standard error, the central limit theorem, normal models and normal probability plots, and simulation.

## Overview

Sampling methods are in A-level Maths ([../maths/19-statistical-sampling.md](../maths/19-statistical-sampling.md)). Linear combinations are in [36-linear-combinations-of-random-variables.md](36-linear-combinations-of-random-variables.md). Confidence intervals and tests built on these results are in [38-confidence-intervals-and-tests-for-means.md](38-confidence-intervals-and-tests-for-means.md).

### Board differences

- Edexcel FS1 5.1 (central limit theorem), FS2 5.1 (unbiased estimates, standard error).
- OCR 5.05a, 5.05b (distribution of the sample mean; unbiased estimates).
- MEI Sx1 to Sx3 (sampling, AS), SR30 to SR32 (normal models, normal probability plots), SI1 to SI6 (estimation, standard error, central limit theorem), SZ1, SZ2 (simulation with spreadsheets).
- AQA uses these results inside its confidence interval work (SH) rather than listing them.

## Sampling

*Refs: MEI Sx1, Sx2, Sx3. Level: AS & A.*

### What you need to know

- Larger samples give more reliable estimates (smaller standard error), but cost more.
- Sampling is needed when the population is large, testing is destructive, or a census is impractical.
- A random sample (each member chosen independently with equal chance) allows probability-based inference and avoids bias.

### Common mistakes

- Thinking a large but biased sample is reliable.

## Unbiased estimates and standard error

*Refs: Edexcel FS2 5.1 · OCR 5.05b · MEI SI1, SI2, SI3, SI4. Level: A-level only.*

### What you need to know

```latex
\bar x = \frac{\sum x}{n},\qquad s^2 = \frac{1}{n-1}\left(\sum x^2 - \frac{(\sum x)^2}{n}\right)
```

- x̄ is an unbiased estimate of μ, and s² (dividing by n − 1) is an unbiased estimate of σ².
- The sample mean X̄ is a random variable: E(X̄) = μ and Var(X̄) = σ²/n.
- The standard error of the mean is σ/√n, estimated by s/√n.

### Explained

Dividing by n − 1 corrects for the fact that the data are closer to their own mean x̄ than to the true mean μ. "Unbiased" means the estimator is right on average over many samples.

### Worked example

A sample of 10 gives Σx = 52 and Σx² = 290. Find unbiased estimates of μ and σ².

1. x̄ = 5.2.
2. s² = (290 − 52²/10)/9 = (290 − 270.4)/9 = 2.178.

### Common mistakes

- Dividing by n for the variance estimate.

## The central limit theorem

*Refs: Edexcel FS1 5.1 · OCR 5.05a · MEI SI5, SI6. Level: A-level only.*

### What you need to know

- If X ~ N(μ, σ²), then X̄ ~ N(μ, σ²/n) exactly.
- Central limit theorem: for a large sample (n ≥ about 30) from any distribution with mean μ and variance σ², X̄ is approximately N(μ, σ²/n).

### Explained

Averages smooth out individual oddities, so whatever the parent distribution's shape, the sample mean is close to normal for large n. The approximation is better when the parent is roughly symmetric.

### Worked example

X has mean 4 and variance 9 (distribution unknown). A sample of 50 is taken. Estimate P(X̄ > 4.5).

1. By the CLT, X̄ ≈ N(4, 9/50).
2. P(X̄ > 4.5) = P(Z > 0.5/0.4243) = P(Z > 1.179) = 0.119.

X ~ Po(3). Estimate the probability that the mean of 40 observations is less than 2.7.

1. X̄ ≈ N(3, 3/40).
2. P(X̄ < 2.7) = Φ(−0.3/0.2739) = Φ(−1.095) = 0.137.

### Common mistakes

- Using σ instead of σ/√n.
- Saying the CLT makes the data (rather than the mean) normal.

## Normal models and probability plots

*Refs: MEI SR30, SR31, SR32. Level: A-level only.*

### What you need to know

- The normal distribution is a good model for many measured quantities (lengths, masses) affected by many small independent factors.
- A normal probability plot (data against expected normal scores) is close to a straight line if the data are normal; curvature shows skew.
- Use the normal distribution, when appropriate, to approximate other distributions.

## Simulation

*Refs: MEI SZ1, SZ2. Level: A-level only.*

### What you need to know

- Spreadsheets can generate random samples from given distributions (for example =NORM.INV(RAND(), μ, σ)).
- Simulation can estimate probabilities or check the behaviour of a statistic (for example, the distribution of X̄) when theory is hard.

### Worked example

Describe a simulation to check the CLT for the score on a fair die with samples of 5.

1. Generate 5 random integers 1 to 6 in each of 1000 rows; find each row's mean.
2. Draw a histogram of the 1000 means: it should be roughly normal with mean 3.5 and variance (35/12)/5 = 0.583.

## Check questions

1. A sample of 12 gives Σx = 120 and Σx² = 1530. Find unbiased estimates of the mean and variance. [3 marks]
2. X has mean 8 and standard deviation 2. Find, approximately, the probability that the mean of 30 observations is less than 7.5. State the theorem used. [4 marks]
3. Explain why s² uses n − 1 rather than n. [2 marks]
4. The mean of a sample of 36 from a population with σ = 1.2 is used to estimate μ. Find the probability that the estimate is more than 0.2 above μ. [3 marks]
5. (MEI) Give one reason a sample might be preferred to a census, and one advantage of a larger sample. [2 marks]

## Mark scheme

1. x̄ = 10 (1). s² = (1530 − 1200)/11 = 30 (2).
2. Central limit theorem (1). X̄ ≈ N(8, 4/30) (1). P(Z < −0.5/0.3651 = −1.369) = 0.0855 (2).
3. The sample values are closer to x̄ than to μ, so dividing by n underestimates σ² on average (1); n − 1 gives an unbiased estimate (1).
4. Standard error 0.2 (1). P(Z > 1) (1) = 0.159 (1).
5. E.g. a census is too costly or testing destroys the item (1). Larger samples give smaller standard errors / more reliable estimates (1).
