---
level: A-level
subject: Further Mathematics
topic: "Linear combinations of random variables"
as_content: "A-level only on OCR (5.04 Stage 2) and MEI (section (b)); option content on AQA and Edexcel (FS2)."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["SD8"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FS2 4.1"]
  - board: OCR
    code: "H245"
    spec_refs: ["5.04a", "5.04b"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["SR28", "SR29"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-statistics/
---

# Linear combinations of random variables

This file covers the expectation and variance of sums and other linear combinations of random variables, the difference between X₁ + X₂ and 2X, and linear combinations of independent normal variables.

## Overview

Expectation and variance of single variables are in [30-discrete-random-variables.md](30-discrete-random-variables.md) and [35-continuous-random-variables.md](35-continuous-random-variables.md). The normal distribution is in [../maths/22-statistical-distributions.md](../maths/22-statistical-distributions.md). The sample mean as a linear combination leads to [37-sampling-estimation-and-central-limit-theorem.md](37-sampling-estimation-and-central-limit-theorem.md).

### Board differences

- AQA SD8 (E and Var of X + Y for independent X, Y). Edexcel FS2 4.1 (linear combinations of normal variables). OCR 5.04a, 5.04b. MEI SR28, SR29.
- AQA lists only the general results for X + Y; Edexcel, OCR and MEI apply them to normal distributions.

## SD8 Expectation and variance of combinations

*Refs: AQA SD8 · Edexcel FS2 4.1 · OCR 5.04a · MEI SR29. Level: A-level only.*

### What you need to know

```latex
E(aX + bY) = aE(X) + bE(Y)
```

```latex
\mathrm{Var}(aX \pm bY) = a^2\,\mathrm{Var}(X) + b^2\,\mathrm{Var}(Y)\quad(X, Y\text{ independent})
```

- The expectation rule holds always; the variance rule needs independence.
- Var(X − Y) = Var(X) + Var(Y): variances add even when you subtract.
- X₁ + X₂ + ... + Xₙ (n independent copies of X) has mean nμ and variance nσ². But nX (one observation multiplied by n) has variance n²σ².

### Explained

Subtracting a random quantity adds uncertainty, which is why the variances add. The difference between X₁ + X₂ and 2X matters: two separate bags of flour vary less in total, relative to their mean, than one bag doubled.

### Worked example

X and Y are independent with E(X) = 5, Var(X) = 2, E(Y) = 3, Var(Y) = 1. Find E(2X − 3Y) and Var(2X − 3Y).

1. E = 10 − 9 = 1.
2. Var = 4(2) + 9(1) = 17.

X has variance 4. Compare Var(X₁ + X₂ + X₃) and Var(3X).

1. Var(X₁ + X₂ + X₃) = 12. Var(3X) = 36.

### Common mistakes

- Var(X − Y) = Var(X) − Var(Y).
- Writing 3X when the question means three independent observations.

## Combinations of independent normal variables

*Refs: Edexcel FS2 4.1 · OCR 5.04b · MEI SR28, SR29. Level: A-level only.*

### What you need to know

- Any linear combination of independent normal variables is normal, with mean and variance from the rules above.

### Worked example

Bags of flour have masses N(1000, 15²) grams. Find the probability that four bags have total mass less than 4050 g.

1. T ~ N(4000, 4 × 225 = 900), s.d. 30.
2. P(T < 4050) = Φ(50/30) = Φ(1.667) = 0.952.

X ~ N(50, 9) and Y ~ N(60, 16) independently. Find P(X > Y).

1. X − Y ~ N(−10, 25).
2. P(X − Y > 0) = P(Z > 2) = 0.0228.

A tin A has mass N(120, 4) and a lid B has mass N(38, 1). Find the probability that a tin weighs more than three times a lid.

1. A − 3B ~ N(120 − 114, 4 + 9) = N(6, 13).
2. P(A − 3B > 0) = Φ(6/√13) = Φ(1.664) = 0.952.

### Common mistakes

- Using 3²σ² for the total of three independent lids.

## Check questions

1. X ~ N(20, 4), Y ~ N(15, 9) independently. Find the distribution of 3X − 2Y and P(3X − 2Y > 35). [5 marks]
2. A lift has a safe load of 1200 kg. Adults' masses are N(75, 12²). Find the probability that 15 adults exceed the safe load. [4 marks]
3. Eggs have masses N(60, 4²) grams and empty boxes N(30, 2²) grams. A full box holds 6 eggs. Find the probability that a full box weighs less than 380 g. [4 marks]
4. Two independent spinners give X with E(X) = 2, Var(X) = 1.5, and Y with E(Y) = 3.5, Var(Y) = 2.9. Find E(X + 2Y) and Var(X − 2Y). [3 marks]

## Mark scheme

1. Mean 60 − 30 = 30 (1). Variance 9(4) + 4(9) = 72 (2). P(Z > 5/√72 = 0.589) = 0.278 (2).
2. Total ~ N(1125, 15 × 144 = 2160) (2). P(T > 1200) = P(Z > 75/46.48 = 1.614) = 0.0533 (2).
3. Total ~ N(390, 6 × 16 + 4 = 100) (2). P(T < 380) = Φ(−1) = 0.159 (2).
4. E(X + 2Y) = 9 (1). Var(X − 2Y) = 1.5 + 4(2.9) = 13.1 (2).
