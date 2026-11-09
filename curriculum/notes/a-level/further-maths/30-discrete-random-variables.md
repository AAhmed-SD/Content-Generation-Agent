---
level: A-level
subject: Further Mathematics
topic: "Discrete random variables"
as_content: "OCR (Stage 1) and MEI (section (a)) place this at AS. AQA and Edexcel option content is A-level, with Edexcel FS1 also available at AS."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["SA1", "SA2", "SA3", "SA4", "SA5", "SA6", "SA7"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FS1 1.1"]
  - board: OCR
    code: "H245"
    spec_refs: ["5.01a", "5.01b", "5.02a", "5.02b", "5.02c", "5.02d", "5.02e"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["SR1", "SR2", "SR3", "SR4", "SR5", "SR6", "SR7", "SR8", "SR9", "SR10"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-statistics/
---

# Discrete random variables

This file covers discrete random variables given by tables or formulae, probabilities, expectation, variance, mode and median, the expectation of functions of a random variable, linear coding, the discrete uniform distribution (with proofs of its mean and variance), the mean and variance of the binomial distribution, and probabilities found by counting arrangements.

## Overview

Probability and the binomial distribution are in A-level Maths ([../maths/21-probability.md](../maths/21-probability.md), [../maths/22-statistical-distributions.md](../maths/22-statistical-distributions.md)). Sums of independent random variables are in [36-linear-combinations-of-random-variables.md](36-linear-combinations-of-random-variables.md); continuous variables in [35-continuous-random-variables.md](35-continuous-random-variables.md).

### Board differences

- AQA SA1 to SA7; Edexcel FS1 1.1; OCR 5.01a, 5.01b, 5.02a to 5.02e; MEI SR1 to SR10.
- AQA SA7 requires the proofs of the mean and variance of the discrete uniform distribution. AQA SA3 includes mode and median.
- OCR 5.01 includes probability by counting (permutations and combinations); the counting methods are in [59-combinatorics.md](59-combinatorics.md). OCR 5.02d and MEI SR9 ask for the binomial mean np and variance np(1 − p).

## SA1 Probability distributions

*Refs: AQA SA1, SA2 · Edexcel FS1 1.1 · OCR 5.01a, 5.01b, 5.02a · MEI SR1. Level: AS & A.*

### What you need to know

- A discrete random variable X takes values x₁, x₂, ... with probabilities pᵢ = P(X = xᵢ), each between 0 and 1, with Σpᵢ = 1.
- The distribution may be given as a table or a formula (for example P(X = x) = kx for x = 1, 2, 3, 4).
- The cumulative distribution function F(x) = P(X ≤ x).

### Worked example

P(X = x) = kx for x = 1, 2, 3, 4. Find k and P(X ≥ 3).

1. k(1 + 2 + 3 + 4) = 1, k = 1/10.
2. P(X ≥ 3) = 0.3 + 0.4 = 0.7.

(OCR) Three letters are chosen at random from the word ORANGE without replacement. X is the number of vowels chosen. Find the distribution of X.

1. Vowels O, A, E (3); consonants R, N, G (3). C(6, 3) = 20 selections.
2. P(X = 0) = 1/20, P(X = 1) = 3 × 3/20 = 9/20, P(X = 2) = 9/20, P(X = 3) = 1/20.

### Common mistakes

- Forgetting to check that probabilities sum to 1.

## SA3 Expectation and variance

*Refs: AQA SA3, SA4, SA5 · Edexcel FS1 1.1 · OCR 5.02b, 5.02c · MEI SR2, SR3, SR4, SR5, SR6. Level: AS & A.*

### What you need to know

```latex
E(X) = \mu = \sum x_ip_i,\qquad E(X^2) = \sum x_i^2p_i,\qquad \mathrm{Var}(X) = E(X^2) - [E(X)]^2
```

- E(g(X)) = Σg(xᵢ)pᵢ.
- E(aX + b) = aE(X) + b; Var(aX + b) = a²Var(X).
- Standard deviation = √Var(X). Mode: the most likely value. Median m: the smallest value with F(m) ≥ ½.

### Explained

E(X) is the long-run average of many observations. Variance measures spread. Adding b shifts every value, which changes the mean but not the spread; multiplying by a scales the spread by |a|, so the variance by a².

### Worked example

| x | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| P(X = x) | 0.1 | 0.3 | 0.4 | 0.2 |

Find E(X), Var(X), E(1/(X + 1)) and Var(3X − 2).

1. E(X) = 0 + 0.3 + 0.8 + 0.6 = 1.7.
2. E(X²) = 0 + 0.3 + 1.6 + 1.8 = 3.7. Var(X) = 3.7 − 2.89 = 0.81.
3. E(1/(X + 1)) = 0.1 + 0.3/2 + 0.4/3 + 0.2/4 = 13/30.
4. Var(3X − 2) = 9 × 0.81 = 7.29.
5. Mode 2. F(1) = 0.4, F(2) = 0.8, so the median is 2.

### Common mistakes

- Var(3X − 2) = 3Var(X) − 2.
- E(1/X) = 1/E(X).

## SA6 The discrete uniform distribution

*Refs: AQA SA6, SA7 · OCR 5.02e · MEI SR7, SR8, SR9. Level: AS & A.*

### What you need to know

- X is uniform on {1, 2, ..., n} if P(X = r) = 1/n for each r. Use it when every outcome is equally likely (a fair die, a random digit).

```latex
E(X) = \frac{n+1}{2},\qquad \mathrm{Var}(X) = \frac{n^2-1}{12}
```

### Explained

Proof (AQA SA7):

```latex
E(X) = \frac1n\sum_{r=1}^n r = \frac1n\cdot\frac{n(n+1)}{2} = \frac{n+1}{2}
```

```latex
E(X^2) = \frac1n\cdot\frac{n(n+1)(2n+1)}{6} = \frac{(n+1)(2n+1)}{6}
```

```latex
\mathrm{Var}(X) = \frac{(n+1)(2n+1)}{6} - \frac{(n+1)^2}{4} = \frac{(n+1)(4n+2-3n-3)}{12} = \frac{n^2-1}{12}
```

### Worked example

A spinner shows 1 to 10 equally likely. Find the mean and variance of the score.

1. Mean 11/2 = 5.5. Variance 99/12 = 8.25.

Y is uniform on {2, 4, 6, ..., 20}. Find E(Y) and Var(Y).

1. Y = 2X with X uniform on 1 to 10. E(Y) = 11, Var(Y) = 4 × 8.25 = 33.

### Common mistakes

- Using the formula for values that do not start at 1 without coding.

## Mean and variance of the binomial distribution

*Refs: OCR 5.02d · MEI SR10. Level: AS & A.*

### What you need to know

- If X ~ B(n, p), E(X) = np and Var(X) = np(1 − p).

### Worked example

X ~ B(20, 0.3). Find E(X), Var(X) and P(X > E(X)).

1. E(X) = 6, Var(X) = 4.2.
2. P(X > 6) = 1 − P(X ≤ 6) = 1 − 0.6080 = 0.3920.

## Check questions

1. P(X = x) = c(x² + 1) for x = 0, 1, 2, 3. Find c, E(X) and Var(X). [6 marks]
2. X has E(X) = 4 and Var(X) = 2. Find E(5 − 2X), Var(5 − 2X) and E(X²). [4 marks]
3. A fair 8-sided die is rolled. Find the mean and standard deviation of the score, and the probability that the score is within one standard deviation of the mean. [5 marks]
4. Prove that the variance of the discrete uniform distribution on {1, ..., n} is (n² − 1)/12. [4 marks]
5. Two cards are drawn without replacement from five cards numbered 1 to 5. X is the larger number. Find the distribution of X, its mode, median and mean. [6 marks]

## Mark scheme

1. c(1 + 2 + 5 + 10) = 1, c = 1/18 (1). Probabilities 1/18, 2/18, 5/18, 10/18 (1). E(X) = (0 + 2 + 10 + 30)/18 = 7/3 (1). E(X²) = (0 + 2 + 20 + 90)/18 = 56/9 (1). Var = 56/9 − 49/9 = 7/9 (2).
2. 5 − 8 = −3 (1). 4 × 2 = 8 (1). E(X²) = 2 + 16 = 18 (2).
3. Mean 4.5 (1). Variance 63/12 = 5.25, s.d. 2.291 (2). Within 2.209 to 6.791: scores 3, 4, 5, 6 (1), probability ½ (1).
4. E(X) and E(X²) from standard sums (2). Subtract and simplify (2).
5. 10 equally likely pairs (1). P(X = 2) = 1/10, P(X = 3) = 2/10, P(X = 4) = 3/10, P(X = 5) = 4/10 (2). Mode 5 (1). F(4) = 0.6 ≥ ½, F(3) = 0.3, so median 4 (1). Mean (2 + 6 + 12 + 20)/10 = 4 (1).
