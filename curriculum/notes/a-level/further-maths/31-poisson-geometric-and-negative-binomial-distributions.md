---
level: A-level
subject: Further Mathematics
topic: "Poisson, geometric and negative binomial distributions"
as_content: "The Poisson and geometric distributions are AS on OCR (Stage 1) and MEI (section (a)). AQA and Edexcel are option content; Edexcel FS1 is also available at AS."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["SB1", "SB2", "SB3", "SB4"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FS1 2.1", "FS1 2.2", "FS1 2.3", "FS1 3.1", "FS1 3.2", "FS1 3.3"]
  - board: OCR
    code: "H245"
    spec_refs: ["5.02f", "5.02g", "5.02h", "5.02i", "5.02j", "5.02k", "5.02l", "5.02m", "5.02n"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["SR11", "SR12", "SR13", "SR14", "SR15", "SR16", "SR17", "SR18"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-statistics/
---

# Poisson, geometric and negative binomial distributions

This file covers the Poisson distribution (conditions, probabilities, mean and variance, sums of independent Poissons, approximating the binomial), the geometric distribution and (Edexcel) the negative binomial distribution, with their means and variances.

## Overview

The binomial distribution is in A-level Maths ([../maths/22-statistical-distributions.md](../maths/22-statistical-distributions.md)); expectation and variance in [30-discrete-random-variables.md](30-discrete-random-variables.md). Tests using these distributions are in [32-hypothesis-tests-errors-and-power.md](32-hypothesis-tests-errors-and-power.md). The exponential distribution of the gaps between Poisson events is in [35-continuous-random-variables.md](35-continuous-random-variables.md).

### Board differences

- Poisson: AQA SB1 to SB4; Edexcel FS1 2.1 to 2.3; OCR 5.02i to 5.02n; MEI SR11 to SR15.
- Geometric: Edexcel FS1 3.1, 3.2; OCR 5.02f to 5.02h; MEI SR16 to SR18. AQA does not include it.
- Negative binomial: Edexcel FS1 3.1, 3.3 only.
- The Poisson approximation to the binomial is named by Edexcel FS1 2.3 and MEI SR12.

## SB1 The Poisson distribution

*Refs: AQA SB1, SB2, SB3 · Edexcel FS1 2.1, 2.2 · OCR 5.02i, 5.02j, 5.02k, 5.02l, 5.02m · MEI SR11, SR13, SR14. Level: AS & A (OCR, MEI).*

### What you need to know

```latex
X\sim\mathrm{Po}(\lambda):\quad P(X=x) = \frac{e^{-\lambda}\lambda^x}{x!},\quad x = 0, 1, 2, \dots
```

- E(X) = Var(X) = λ.
- Conditions: events occur singly, independently, at random, and at a constant average rate. The rate scales with the interval: 3 per hour means 1.5 per half hour.
- A mean close to the variance in data supports a Poisson model.

### Explained

The Poisson counts how many times something happens in a fixed interval of time or space: calls to a helpline in an hour, flaws in a metre of cable. Use the formula for single values and the calculator's cumulative function for ranges. "At least 5" is 1 − P(X ≤ 4).

### Worked example

Emails arrive at a rate of 2.5 per hour. Find the probability of exactly 3 in an hour, at most 3, and more than 4.

1. P(X = 3) = e^{−2.5} × 2.5³/6 = 0.2138.
2. P(X ≤ 3) = 0.7576.
3. P(X > 4) = 1 − P(X ≤ 4) = 0.1088.

Cars pass a point at 6 per minute. Find P(3 ≤ X ≤ 5) in one minute.

1. P(X ≤ 5) − P(X ≤ 2) = 0.4457 − 0.0620 = 0.3837.

Data: mean 1.95, variance 2.04. Comment on a Poisson model.

1. Mean and variance are close, which supports a Poisson model (as long as the conditions are plausible).

### Common mistakes

- Not rescaling λ to the interval in the question.
- P(X > 4) = 1 − P(X ≤ 3).

## SB4 Sums of independent Poisson variables

*Refs: AQA SB4 · Edexcel FS1 2.2 · OCR 5.02n · MEI SR15. Level: AS & A (OCR, MEI).*

### What you need to know

- If X ~ Po(λ) and Y ~ Po(μ) are independent, X + Y ~ Po(λ + μ).

### Worked example

Faults in type A cable occur at 1.2 per 100 m and in type B at 2.1 per 100 m, independently. Find the probability of exactly 3 faults in total in 100 m of each.

1. Total ~ Po(3.3). P(T = 3) = e^{−3.3} × 3.3³/6 = 0.2209.

Find the probability of 2 faults in A and 1 in B.

1. 0.2169 × 0.2572 = 0.0558 (multiply, as they are independent).

### Common mistakes

- Adding λs of variables that are not independent.

## The Poisson approximation to the binomial

*Refs: Edexcel FS1 2.3 · MEI SR12. Level: A-level (Edexcel), AS & A (MEI).*

### What you need to know

- If n is large and p is small, B(n, p) ≈ Po(np).

### Worked example

X ~ B(200, 0.01). Estimate P(X ≤ 3).

1. np = 2. Po(2): P(X ≤ 3) = 0.8571. (Exact binomial 0.8580.)

## The geometric distribution

*Refs: Edexcel FS1 3.1, 3.2 · OCR 5.02f, 5.02g, 5.02h · MEI SR16, SR17, SR18. Level: AS & A (OCR, MEI).*

### What you need to know

- X ~ Geo(p) is the number of trials up to and including the first success, with independent trials and constant p.

```latex
P(X = x) = (1-p)^{x-1}p,\qquad P(X > x) = (1-p)^x,\qquad E(X) = \frac1p,\qquad \mathrm{Var}(X) = \frac{1-p}{p^2}
```

### Explained

P(X > x) = (1 − p)ˣ because the first x trials must all fail. That gives P(X ≤ x) = 1 − (1 − p)ˣ, which avoids summing many terms.

### Worked example

A player scores a penalty with probability 0.8. X is the number of the penalty on which they first miss. Find P(X = 4), P(X > 5) and E(X).

1. Here "success" is a miss, p = 0.2.
2. P(X = 4) = 0.8³ × 0.2 = 0.1024. P(X > 5) = 0.8⁵ = 0.3277. E(X) = 5.

### Common mistakes

- Using (1 − p)ˣp instead of (1 − p)^{x−1}p.

## The negative binomial distribution

*Refs: Edexcel FS1 3.1, 3.3. Level: A-level only.*

### What you need to know

- X is the number of trials needed to get r successes:

```latex
P(X = x) = \binom{x-1}{r-1}p^r(1-p)^{x-r},\quad x = r, r+1, \dots
```

- E(X) = r/p, Var(X) = r(1 − p)/p².

### Explained

The last trial must be the rth success; the other r − 1 successes can be anywhere in the first x − 1 trials. With r = 1 it is the geometric distribution. X is a sum of r independent geometric variables, which explains the mean and variance.

### Worked example

p = 0.4. Find the probability that the third success comes on the seventh trial, and the mean and variance of the number of trials needed for 3 successes.

1. C(6, 2) × 0.4³ × 0.6⁴ = 15 × 0.064 × 0.1296 = 0.1244.
2. E(X) = 3/0.4 = 7.5. Var(X) = 3 × 0.6/0.16 = 11.25.

### Common mistakes

- Using C(x, r) instead of C(x − 1, r − 1).

## Check questions

1. A shop sells on average 3.5 kettles a week. (a) State two conditions for a Poisson model. (b) Find the probability of selling exactly 5 in a week, and at least 8 in two weeks. [6 marks]
2. X ~ Po(λ) and P(X = 2) = P(X = 3). Find λ and P(X ≤ 2). [4 marks]
3. A die is rolled until a six appears. Find the probability that more than 6 rolls are needed, and the variance of the number of rolls. [4 marks]
4. (Edexcel) A coin with P(head) = 0.3 is tossed until the fourth head. Find the probability that exactly 10 tosses are needed, and the expected number of tosses. [4 marks]
5. X ~ Po(1.5) and Y ~ Po(2.5) independently. Find P(X + Y = 4) and P(X = 1 | X + Y = 4). [5 marks]

## Mark scheme

1. (a) Sales occur independently, singly, at a constant average rate (2). (b) Po(3.5): P(X = 5) = 0.1322 (2). Po(7): P(Y ≥ 8) = 1 − 0.5987 = 0.4013 (2).
2. e^{−λ}λ²/2 = e^{−λ}λ³/6 (1), λ = 3 (1). P(X ≤ 2) = e^{−3}(1 + 3 + 4.5) = 0.4232 (2).
3. P(X > 6) = (5/6)⁶ = 0.3349 (2). Var = (5/6)/(1/36) = 30 (2).
4. C(9, 3) × 0.3⁴ × 0.7⁶ = 84 × 0.0081 × 0.117649 (1) = 0.0800 (1). E = 4/0.3 = 13.3 (2).
5. X + Y ~ Po(4): P = e^{−4} × 4⁴/24 = 0.1954 (2). P(X = 1, Y = 3)/P(X + Y = 4) (1) = (0.3347 × 0.2138)/0.1954 = 0.3662 (2). (Exactly C(4, 1)(0.375)(0.625)³ = 0.3662.)
