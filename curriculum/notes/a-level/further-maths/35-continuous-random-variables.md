---
level: A-level
subject: Further Mathematics
topic: "Continuous random variables, rectangular and exponential distributions"
as_content: "A-level only on OCR (5.03 Stage 2) and MEI (section (b)). AQA and Edexcel are option content (Edexcel FS2, A-level)."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["SD1", "SD2", "SD3", "SD4", "SD5", "SD6", "SD7", "SF1", "SF2", "SF3", "SF4"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FS2 2.1", "FS2 2.2", "FS2 2.3", "FS2 2.4"]
  - board: OCR
    code: "H245"
    spec_refs: ["5.03a", "5.03b", "5.03c", "5.03d", "5.03e", "5.03f", "5.03g"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["SR19", "SR20", "SR21", "SR22", "SR23", "SR24", "SR25", "SR26", "SR27"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-statistics/
---

# Continuous random variables, rectangular and exponential distributions

This file covers probability density functions, probabilities as areas, cumulative distribution functions, the median, quartiles and mode, the mean and variance (and E(g(X))), linear functions of a continuous variable, the distribution of a function of X, the continuous uniform (rectangular) distribution and the exponential distribution.

## Overview

Integration is from A-level Maths ([../maths/14-integration-basics-and-areas.md](../maths/14-integration-basics-and-areas.md)). Discrete variables are in [30-discrete-random-variables.md](30-discrete-random-variables.md); sums of variables in [36-linear-combinations-of-random-variables.md](36-linear-combinations-of-random-variables.md).

### Board differences

- AQA SD1 to SD7 (including the rectangular distribution) and SF1 to SF4 (the exponential distribution, with proofs of its mean and variance and its link to the Poisson). Only AQA includes the exponential.
- Edexcel FS2 2.1 to 2.4 (including the continuous uniform distribution with derivations of its mean, variance and cdf).
- OCR 5.03a to 5.03g; 5.03g is finding the cdf of a function of X (such as Y = X²).
- MEI SR19 to SR27.

## SD1 Probability density functions

*Refs: AQA SD1, SD2 · Edexcel FS2 2.1, 2.2 · OCR 5.03a, 5.03b · MEI SR19, SR20, SR21. Level: A-level only.*

### What you need to know

- A continuous random variable X has a pdf f(x) ≥ 0 with ∫f(x) dx = 1 over all x.
- P(a < X < b) = ∫ₐᵇ f(x) dx. P(X = a) = 0, so < and ≤ give the same probability.
- A pdf can be defined piecewise.

### Explained

Probability is area under the pdf, not the height. f(x) can be greater than 1, as long as the total area is 1.

### Worked example

f(x) = kx² for 0 ≤ x ≤ 2, and 0 otherwise. Find k and P(X > 1).

1. k[x³/3]₀² = 8k/3 = 1, k = 3/8.
2. P(X > 1) = (3/8)[x³/3]₁² = (8 − 1)/8 = 7/8.

### Common mistakes

- Reading f(a) as P(X = a).

## SD6 Cumulative distribution functions, median and quartiles

*Refs: AQA SD3, SD6 · Edexcel FS2 2.2 · OCR 5.03e, 5.03f, 5.03g · MEI SR23, SR24, SR25, SR26. Level: A-level only.*

### What you need to know

```latex
F(x) = P(X \le x) = \int_{-\infty}^{x} f(t)\,dt,\qquad f(x) = F'(x)
```

- F is 0 below the range and 1 above it, and never decreases.
- Median m: F(m) = 0.5. Quartiles: F(q₁) = 0.25, F(q₃) = 0.75. Percentiles similarly.
- Mode: the value of x where f(x) is greatest (use calculus or a sketch).
- (OCR 5.03g) For Y = g(X) with g increasing, G(y) = P(Y ≤ y) = P(X ≤ g⁻¹(y)) = F(g⁻¹(y)). Differentiate for the pdf of Y.

### Explained

For a piecewise pdf, F for each later piece must include the full area of earlier pieces, so that F is continuous.

### Worked example

For f(x) = (3/8)x² on [0, 2], find F(x), the median and the mode.

1. F(x) = x³/8 for 0 ≤ x ≤ 2 (0 below, 1 above).
2. m³/8 = ½, m = ∛4 = 1.587.
3. f is increasing, so the mode is 2.

A piecewise pdf: f(x) = x for 0 ≤ x ≤ 1, f(x) = ½ for 1 < x ≤ 2. Find F(x) and the median.

1. Check area: ½ + ½ = 1 ✓.
2. 0 ≤ x ≤ 1: F = x²/2. 1 < x ≤ 2: F = ½ + (x − 1)/2 = x/2.
3. F(1) = ½, so the median is 1.

(OCR) For f(x) = (3/8)x² on [0, 2], find the pdf of Y = X².

1. G(y) = P(X ≤ √y) = (√y)³/8 = y^{3/2}/8 for 0 ≤ y ≤ 4.
2. g(y) = (3/16)y^{1/2}.

### Common mistakes

- Forgetting the earlier pieces' area when building F.

## SD4 Mean and variance

*Refs: AQA SD4, SD5 · Edexcel FS2 2.3 · OCR 5.03c, 5.03d · MEI SR22, SR27. Level: A-level only.*

### What you need to know

```latex
E(X) = \int x f(x)\,dx,\quad E(X^2) = \int x^2 f(x)\,dx,\quad \mathrm{Var}(X) = E(X^2) - [E(X)]^2
```

- E(g(X)) = ∫g(x)f(x) dx. E(aX + b) = aE(X) + b, Var(aX + b) = a²Var(X).

### Worked example

For f(x) = (3/8)x² on [0, 2], find E(X), Var(X) and E(1/X).

1. E(X) = (3/8)∫₀² x³ dx = (3/8)(4) = 1.5.
2. E(X²) = (3/8)(32/5) = 2.4. Var(X) = 2.4 − 2.25 = 0.15.
3. E(1/X) = (3/8)∫₀² x dx = (3/8)(2) = 0.75.

### Common mistakes

- Forgetting to multiply by x (or x²) before integrating.

## SD7 The rectangular (continuous uniform) distribution

*Refs: AQA SD7 · Edexcel FS2 2.4. Level: A-level only.*

### What you need to know

- X ~ U[a, b]: f(x) = 1/(b − a) for a ≤ x ≤ b.
- E(X) = (a + b)/2, Var(X) = (b − a)²/12, F(x) = (x − a)/(b − a).
- Use it for rounding errors, or a random point on an interval.

### Worked example

A length is rounded to the nearest cm. Find the mean and standard deviation of the rounding error.

1. Error ~ U[−0.5, 0.5]. Mean 0, variance 1/12, s.d. 0.289 cm.

X ~ U[2, 8]. Find P(X > 6.5) and Var(X).

1. P = 1.5/6 = 0.25. Var = 36/12 = 3.

## SF1 The exponential distribution

*Refs: AQA SF1, SF2, SF3, SF4. Level: A-level only (AQA option).*

### What you need to know

```latex
f(x) = \lambda e^{-\lambda x}\ (x \ge 0),\qquad F(x) = 1 - e^{-\lambda x},\qquad E(X) = \frac1\lambda,\qquad \mathrm{Var}(X) = \frac1{\lambda^2}
```

- If events occur as a Poisson process with rate λ, the time between events (and the time to the first event) is exponential with parameter λ.
- The exponential is memoryless: P(X > s + t | X > s) = P(X > t).

### Explained

Proofs: E(X) = ∫₀^∞ λxe^{−λx} dx; integrating by parts gives [−xe^{−λx}]₀^∞ + ∫e^{−λx} dx = 1/λ. Similarly E(X²) = 2/λ², so Var = 1/λ². The link with Poisson: the time T to the first event exceeds t exactly when there are no events in [0, t], so P(T > t) = e^{−λt}.

### Worked example

Buses arrive as a Poisson process with rate 0.5 per minute. Find the probability of waiting more than 3 minutes, and the median wait.

1. T ~ Exp(0.5). P(T > 3) = e^{−1.5} = 0.223.
2. 1 − e^{−0.5m} = ½, m = 2 ln 2 = 1.39 minutes.

### Common mistakes

- Using 1/λ as the parameter in the pdf.

## Check questions

1. f(x) = k(4 − x²) for 0 ≤ x ≤ 2. Find k, E(X) and P(X < 1). [6 marks]
2. X has cdf F(x) = (x² − 1)/8 for 1 ≤ x ≤ 3. Find the pdf, the median and the interquartile range. [6 marks]
3. f(x) = ¼(4x − x³) for 0 ≤ x ≤ 2. Find the mode. [3 marks]
4. X ~ U[0, 10]. Find E(X²) and P(|X − 5| < 2). [3 marks]
5. (AQA) The lifetime of a component is exponential with mean 200 hours. Find the probability it lasts more than 300 hours, and, given it has lasted 100 hours, the probability it lasts a further 300 hours. [4 marks]
6. (OCR) X ~ U[0, 1]. Find the pdf of Y = √X. [3 marks]

## Mark scheme

1. k[4x − x³/3]₀² = 16k/3 = 1, k = 3/16 (2). E(X) = (3/16)∫(4x − x³) dx = (3/16)(8 − 4) = 3/4 (2). P(X < 1) = (3/16)(4 − ⅓) = 11/16 (2).
2. f(x) = x/4 on [1, 3] (1). (m² − 1)/8 = ½, m = √5 = 2.236 (2). q₁ = √3, q₃ = √7 (2). IQR = 0.914 (1).
3. f′ = ¼(4 − 3x²) = 0 (1), x = 2/√3 = 1.155 (1), a maximum since f″ < 0 (1).
4. E(X²) = 100/3 (or Var + mean² = 25/3 + 25) (2). P(3 < X < 7) = 0.4 (1).
5. λ = 1/200. P(T > 300) = e^{−1.5} = 0.223 (2). Memoryless: same, 0.223 (2).
6. G(y) = P(√X ≤ y) = P(X ≤ y²) = y² (2). g(y) = 2y for 0 ≤ y ≤ 1 (1).
