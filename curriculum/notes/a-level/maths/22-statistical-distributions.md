---
level: A-level
subject: Mathematics
topic: "Statistical distributions: binomial and Normal"
as_content: "Simple discrete distributions and the binomial distribution are AS. The Normal distribution, the Normal approximation to the binomial, and choosing between the two models are A-level only (choosing a discrete model is AS)."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["N1", "N2", "N3"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["S4.1", "S4.2", "S4.3"]
  - board: OCR
    code: "H240"
    spec_refs: ["2.04a", "2.04b", "2.04c", "2.04d", "2.04e", "2.04f", "2.04g", "2.04h"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["MR1", "MR2", "MR3", "MR4", "MR5", "MR6", "MR7", "MR8", "MR9", "MR10", "MR11", "MR12", "MR13"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Statistical distributions: binomial and Normal

This file covers discrete probability distributions, the binomial distribution as a model, the Normal distribution as a model, standardising and inverse Normal problems, the Normal approximation to the binomial, and choosing a suitable distribution.

## Overview

AS: simple discrete distributions (including the discrete uniform distribution) and the binomial distribution. A-level only: the Normal distribution and its links to histograms, the binomial and points of inflection, and selecting between models. Use your calculator's binomial and Normal functions throughout.

### Board differences

- AQA N1 to N3; Edexcel Statistics 4.1 to 4.3.
- OCR H240: 2.04a to 2.04c (AS); 2.04d (mean np) and 2.04e to 2.04h (A-level only). OCR expects the facts that about two-thirds of values lie within one standard deviation of the mean, about 95% within two, and almost all within three; the equation of the Normal curve is excluded.
- OCR MEI H640: MR1 to MR7 (AS, including mean = np and expected frequencies); MR8 to MR13 (A-level only). MEI includes the continuity correction and recognising from its shape when a binomial can be approximated by a Normal, but excludes knowing formal conditions for that approximation.
- AQA's N1 excludes calculating the mean and variance of general discrete random variables.
- Edexcel 4.1 names the discrete uniform distribution; Edexcel 4.2 includes approximating B(n, p) by N(np, np(1 − p)) with a continuity correction.

## N1 Discrete distributions and the binomial distribution

*Refs: AQA N1 · Edexcel Statistics 4.1 · OCR 2.04a, 2.04b, 2.04c, 2.04d · MEI MR1, MR2, MR3, MR4, MR5, MR6, MR7. Level: AS & A.*

### What you need to know

- A discrete random variable X takes separate values, each with a probability; the probabilities add to 1. It can be given as a table or a formula (probability function).
- The discrete uniform distribution: n equally likely values.
- The binomial distribution X ~ B(n, p) models the number of successes in n trials when:
  - there is a fixed number n of trials;
  - each trial has two outcomes (success or failure);
  - the probability of success p is the same for every trial;
  - the trials are independent.

```latex
P(X = r) = \binom{n}{r} p^r (1-p)^{n-r}, \quad r = 0, 1, \dots, n
```

- Find P(X = r), P(X ≤ r) and other cumulative probabilities with a calculator.
- (OCR: A-level only; MEI: AS) The mean of B(n, p) is np. Expected frequencies are n × probability.

### Explained

**Cumulative probabilities.** Calculators give P(X ≤ r). Convert other forms:

| Want | Use |
| --- | --- |
| P(X < r) | P(X ≤ r − 1) |
| P(X ≥ r) | 1 − P(X ≤ r − 1) |
| P(X > r) | 1 − P(X ≤ r) |
| P(a ≤ X ≤ b) | P(X ≤ b) − P(X ≤ a − 1) |

**Criticising a binomial model.** Ask whether each condition really holds. Selecting people from a small group without replacement changes p; seeds planted in the same tray may not grow independently.

### Worked example

X takes values 1, 2, 3, 4 with P(X = x) = kx. Find k and P(X ≥ 3).

1. k(1 + 2 + 3 + 4) = 1, so k = 1/10.
2. P(X ≥ 3) = 3/10 + 4/10 = 0.7.

X ~ B(12, 0.3). Find P(X = 4), P(X ≤ 4), P(X > 5) and P(2 ≤ X ≤ 6).

1. P(X = 4) = ¹²C₄ × 0.3⁴ × 0.7⁸ = 0.2311.
2. P(X ≤ 4) = 0.7237.
3. P(X > 5) = 1 − P(X ≤ 5) = 1 − 0.8822 = 0.1178.
4. P(2 ≤ X ≤ 6) = P(X ≤ 6) − P(X ≤ 1) = 0.9614 − 0.0850 = 0.8764.

15% of light bulbs from a factory are faulty. A box holds 20 bulbs. State a suitable model, find the probability that exactly 3 are faulty and that at least 5 are faulty, and state the expected number of faulty bulbs.

1. X ~ B(20, 0.15), assuming bulbs are faulty independently with the same probability.
2. P(X = 3) = 0.2428.
3. P(X ≥ 5) = 1 − P(X ≤ 4) = 0.1702.
4. Expected number: 20 × 0.15 = 3.

### Common mistakes

- Using P(X ≤ 5) for P(X < 5).
- Using the binomial when trials are not independent or p changes.

## N2 The Normal distribution

*Refs: AQA N2 · Edexcel Statistics 4.2 · OCR 2.04e, 2.04f, 2.04g · MEI MR8, MR9, MR10, MR11, MR12. Level: A-level only.*

### What you need to know

- (A-level only) X ~ N(μ, σ²) is a continuous distribution: bell-shaped, symmetrical about μ, with points of inflection at μ ± σ. Probability is area under the curve, and the total area is 1.
- (A-level only) About 68% of values lie within μ ± σ, 95% within μ ± 2σ and 99.7% within μ ± 3σ.
- (A-level only) Standardise with

```latex
Z = \frac{X - \mu}{\sigma}, \qquad Z \sim N(0, 1)
```

- (A-level only) Find probabilities, and use the inverse Normal to find values or unknown μ and σ.
- (A-level only) Link to histograms of real data, and approximate a binomial B(n, p) by N(np, np(1 − p)) when n is large and p is near 0.5, using a continuity correction.

### Explained

For a continuous distribution, P(X = a) = 0, so P(X < a) and P(X ≤ a) are the same.

**Finding μ or σ.** Write each piece of information as (x − μ)/σ = z, using the inverse Normal on the standard Normal to find z. One unknown needs one equation; two unknowns need two simultaneous equations.

**Normal approximation.** A binomial with large n has a roughly bell-shaped histogram. Each integer value r is represented by the interval r − 0.5 to r + 0.5 under the Normal curve (the continuity correction). For example, P(X ≤ 35) ≈ P(Y < 35.5) and P(X ≥ 45) ≈ P(Y > 44.5).

**Is a Normal model sensible?** Check the data are roughly symmetrical and bell-shaped, that about 95% lie within two standard deviations, and that the model does not give large probabilities to impossible values (such as negative lengths).

### Worked example

(A-level only) X ~ N(50, 16). Find P(X < 56), P(45 < X < 55) and the value a with P(X > a) = 0.1.

1. σ = 4. P(X < 56) = P(Z < 1.5) = 0.9332.
2. P(45 < X < 55) = P(−1.25 < Z < 1.25) = 0.7887.
3. P(X > a) = 0.1, so (a − 50)/4 = 1.2816, a = 55.13.

(A-level only) X is Normal with P(X < 30) = 0.2 and P(X > 50) = 0.1. Find μ and σ.

1. (30 − μ)/σ = −0.8416 and (50 − μ)/σ = 1.2816.
2. Subtract: 20/σ = 2.1232, so σ = 9.42.
3. μ = 30 + 0.8416 × 9.42 = 37.9.

(A-level only) X ~ B(100, 0.4). Use a Normal approximation to estimate P(X ≤ 35).

1. np = 40, np(1 − p) = 24. Y ~ N(40, 24).
2. P(X ≤ 35) ≈ P(Y < 35.5) = P(Z < −0.9186) = 0.1792.
3. (The exact binomial value is 0.1795, so the approximation is very good.)

(A-level only) The lengths of 200 leaves have a symmetrical, bell-shaped histogram with mean 8.2 cm and standard deviation 1.1 cm. Explain why N(8.2, 1.1²) is a suitable model, and use the histogram to find the points of inflection.

1. The shape is symmetrical and bell-shaped, matching a Normal curve.
2. Points of inflection at 8.2 ± 1.1, that is 7.1 cm and 9.3 cm.

### Common mistakes

- (A-level only) Using σ² instead of σ when standardising: N(50, 16) has σ = 4.
- (A-level only) Getting the sign of z wrong for values below the mean.
- (A-level only) Leaving out the continuity correction in a Normal approximation.

## N3 Choosing a distribution

*Refs: AQA N3 · Edexcel Statistics 4.3 · OCR 2.04h · MEI MR13. Level: AS & A (part A-level only).*

### What you need to know

- Choose a suitable distribution for a context, with reasons, including recognising when a binomial model is not appropriate.
- (A-level only) Recognise when a Normal model is not appropriate, and choose between binomial and Normal models.

### Explained

| Situation | Model |
| --- | --- |
| a count of successes in a fixed number of independent trials, constant p | binomial |
| a continuous measurement, symmetrical and bell-shaped | Normal |
| several equally likely discrete outcomes | discrete uniform |

A Normal model is not appropriate for strongly skewed data (such as incomes or waiting times), or where it would give a large probability to impossible values. A binomial model is not appropriate when the number of trials is not fixed, or the trials affect each other.

### Worked example

Suggest a model for each, with a reason: (a) the number of sixes in 30 rolls of a fair die; (b) the heights of adult women in the UK; (c) the number of customers arriving at a shop in an hour.

1. (a) B(30, 1/6): fixed number of independent trials, constant probability.
2. (b) (A-level only) Normal: a continuous measurement that is roughly symmetrical about a mean.
3. (c) Not binomial: there is no fixed number of trials. (A different model, met in Further Mathematics, is used.)

(A-level only) Waiting times at a clinic have mean 12 minutes and standard deviation 9 minutes. Explain why a Normal model is unsuitable.

1. Under N(12, 9²), P(T < 0) = P(Z < −1.33) ≈ 0.09, a large probability for an impossible negative time. Waiting times are also likely to be positively skewed.

### Common mistakes

- Choosing a model without giving a reason linked to the context.

## Check questions

1. P(X = x) = k(x + 1) for x = 0, 1, 2, 3. Find k and P(X ≥ 2). [3 marks]
2. X ~ B(20, 0.15). Find (a) P(X = 3); (b) P(X ≤ 2); (c) P(X ≥ 5). [4 marks]
3. A student says the number of girls in a family of 4 children follows B(4, 0.5). Give one reason why this model may not be suitable. [1 mark]
4. (A-level only) X ~ N(120, 25). Find P(X > 128) and P(110 < X < 125). [4 marks]
5. (A-level only) The masses of bags of flour are Normal with mean 500 g. 5% of bags weigh less than 490 g. Find the standard deviation. [3 marks]
6. (A-level only) X is Normal with P(X < 20) = 0.3 and P(X > 35) = 0.15. Find μ and σ. [5 marks]
7. (A-level only) X ~ B(80, 0.5). Use a suitable approximation to estimate P(X ≥ 45), stating the distribution you use. [4 marks]
8. (A-level only) Give two features of a histogram of data that would suggest a Normal model is suitable. [2 marks]

## Mark scheme

1. 10k = 1, k = 0.1 (1); P(X = 2) + P(X = 3) = 0.3 + 0.4 (1); = 0.7 (1).
2. (a) 0.2428 (1). (b) 0.4049 (1). (c) 1 − P(X ≤ 4) (1) = 0.1702 (1).
3. e.g. the sexes of children in one family may not be independent, or the probability of a girl is not exactly 0.5 (1).
4. σ = 5 (1); P(Z > 1.6) = 0.0548 (1); P(−2 < Z < 1) (1) = 0.8186 (1).
5. (490 − 500)/σ = −1.6449 (2); σ = 6.08 g (1).
6. (20 − μ)/σ = −0.5244 (1); (35 − μ)/σ = 1.0364 (1); 15 = 1.5608σ (1); σ = 9.61 (1); μ = 25.0 (1).
7. N(40, 20) (1); continuity correction: P(Y > 44.5) (1); P(Z > 1.006) (1) = 0.157 (1).
8. Symmetrical (1); bell-shaped / single peak, with about 95% of values within 2 standard deviations of the mean (1).
