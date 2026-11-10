---
level: A-level
subject: Statistics
topic: "Linear combinations of independent random variables"
boards:
  - board: Edexcel
    code: "9ST0"
    spec_refs: ["12.2", "12.3"]
refs_checked: false
spec_url: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/a-level-statistics/
---

# Linear combinations of random variables

This file covers the mean and variance of aX ± bY and of Σaᵢ Xᵢ for independent random variables, and probabilities for sums and differences of independent normal variables in practical settings.

## Overview

The same results are written up in [Further Maths 36](../further-maths/36-linear-combinations-of-random-variables.md). A-level Statistics uses them for practical questions: totals of several items (a box of apples, a lift full of people), differences between two products, and comparisons such as "is one item heavier than another". The two ideas to get right are that variances always add, even for a difference, and that the total of n separate items is not the same as n times one item.

### Board differences

- Edexcel 9ST0 12.2 and 12.3 are on Paper 1. The formulae E(aX ± bY) = aE(X) ± bE(Y) and Var(aX ± bY) = a²Var(X) + b²Var(Y) are in the formulae booklet.

## 12.2 Mean and variance of linear combinations

*Refs: Edexcel 12.2. Paper 1.*

### What you need to know

```latex
E(aX \pm bY) = aE(X) \pm bE(Y)
```

```latex
\operatorname{Var}(aX \pm bY) = a^2\operatorname{Var}(X) + b^2\operatorname{Var}(Y) \quad (X, Y \text{ independent})
```

- More generally, if the Xᵢ are independent with means μᵢ and variances σᵢ², then Σaᵢ Xᵢ has mean Σaᵢμᵢ and variance Σaᵢ²σᵢ².
- The mean result holds for any random variables; the variance result needs independence.

### Explained

**Why variances add for a difference.** Uncertainty in Y makes X − Y more uncertain, not less. The minus sign is squared away: (−1)² = 1.

**X₁ + X₂ + X₃ versus 3X.** Three separate items have independent variations that partly cancel: Var = 3σ². One item scaled by 3 triples its variation exactly: Var(3X) = 9σ². "The total mass of 3 apples" is X₁ + X₂ + X₃; "the mass of a sack whose contents are worth three times one apple" is 3X.

### Worked example

X has mean 3 and variance 2; Y has mean 5 and variance 1; X and Y are independent. Find the mean and variance of 2X − Y, and of X₁ + X₂ − Y where X₁ and X₂ are independent copies of X.

1. E(2X − Y) = 2(3) − 5 = 1. Var(2X − Y) = 4(2) + 1(1) = 9.
2. E(X₁ + X₂ − Y) = 3 + 3 − 5 = 1. Var = 2 + 2 + 1 = 5.

### Common mistakes

- Subtracting variances for a difference.
- Using n²σ² for a sum of n independent items.

## 12.3 Probabilities for combinations of independent normal variables

*Refs: Edexcel 12.3. Paper 1.*

### What you need to know

- Any linear combination of independent normal variables is normal, with the mean and variance from 12.2.
- To compare two quantities, form a difference D and find P(D > 0) or P(D < 0).

### Explained

Set up the combination in words first ("total mass of 12 apples and the box"), then find its mean and variance, then standardise. For "more than", "heavier than" or "longer than" between two random quantities, the difference is the variable to use.

### Worked example

Apples have masses A ~ N(150, 10²) g and an empty box has mass B ~ N(400, 15²) g, all independent. A full box has 12 apples. Find the probability that a full box weighs more than 2,250 g.

1. T = A₁ + … + A₁₂ + B. E(T) = 12(150) + 400 = 2200.
2. Var(T) = 12(100) + 225 = 1425, standard deviation 37.75.

```latex
P(T > 2250) = P\!\left(Z > \frac{2250 - 2200}{37.75}\right) = P(Z > 1.325) = 0.0927
```

Machine 1 fills bottles with X ~ N(250, 4²) ml and machine 2 with Y ~ N(245, 3²) ml. Find the probability that a bottle from machine 1 holds more than one from machine 2.

1. D = X − Y ~ N(5, 16 + 9) = N(5, 25).
2. P(D > 0) = P(Z > −1) = 0.8413.

Short rods S ~ N(50, 1.5²) cm and long rods L ~ N(80, 2²) cm. Find the probability that three short rods end to end are longer than two long rods end to end.

1. D = S₁ + S₂ + S₃ − (L₁ + L₂). E(D) = 150 − 160 = −10.
2. Var(D) = 3(2.25) + 2(4) = 14.75, standard deviation 3.841.
3. P(D > 0) = P(Z > 2.604) = 0.0046.

### Common mistakes

- Using 12 × 10 = 120 as the standard deviation of 12 apples instead of √(12 × 100) = 34.6.
- Forgetting to include the box.

## Check questions

1. X and Y are independent with E(X) = 10, Var(X) = 4, E(Y) = 6, Var(Y) = 9. Find E(3X − 2Y) and Var(3X − 2Y). [3 marks]
2. X ~ N(30, 2²) and Y ~ N(20, 1.5²) are independent. Find P(X + Y > 53) and P(X − Y < 8). [5 marks]
3. With X and Y as in question 2, find the probability that the total of three independent observations of X is greater than the total of four independent observations of Y. [4 marks]
4. A lift has a safe load of 780 kg. Passengers have masses N(78, 12²) kg and each carries luggage of mass N(15, 4²) kg, all independent. Find the probability that 8 passengers with their luggage exceed the safe load. [4 marks]
5. Explain why Var(X₁ + X₂) is not equal to Var(2X). [2 marks]

## Mark scheme

1. E = 30 − 12 = 18 (1); Var = 9(4) + 4(9) (1) = 72 (1).
2. X + Y ~ N(50, 6.25) (1); P(Z > 1.2) = 0.1151 (1); X − Y ~ N(10, 6.25) (1); P(Z < −0.8) (1) = 0.2119 (1).
3. D = ΣX (3 copies) − ΣY (4 copies) (1); mean 90 − 80 = 10 (1); variance 3(4) + 4(2.25) = 21 (1); P(D > 0) = P(Z > −2.182) = 0.985 (1).
4. Total mean 8 × 93 = 744 (1); variance 8 × (144 + 16) = 1280 (1); P(T > 780) = P(Z > 1.006) (1) = 0.157 (1).
5. Var(X₁ + X₂) = 2Var(X) because the two independent values vary separately (1); Var(2X) = 4Var(X) because one value is doubled, doubling its deviation (1).
