---
level: A-level
subject: Further Mathematics
topic: "Probability generating functions"
as_content: "All of this file is A-level only (Edexcel Further Statistics 1, A-level content)."
boards:
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FS1 7.1", "FS1 7.2", "FS1 7.3"]
refs_checked: false
spec_urls:
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-statistics/
---

# Probability generating functions

This file covers the definition of a probability generating function (pgf), the pgfs of the standard discrete distributions, finding the mean and variance from a pgf, the pgf of a sum of independent variables and of a linear function of a variable.

## Overview

Edexcel FS1 only. The distributions are in [30-discrete-random-variables.md](30-discrete-random-variables.md) and [31-poisson-geometric-and-negative-binomial-distributions.md](31-poisson-geometric-and-negative-binomial-distributions.md).

### Board differences

- Edexcel FS1 7.1 (definitions and derivations of standard pgfs), 7.2 (mean and variance; proofs may be required), 7.3 (pgf of the sum of independent random variables). No other board includes pgfs.

## FS1 7.1 Definition and standard pgfs

*Refs: Edexcel FS1 7.1. Level: A-level only.*

### What you need to know

For a discrete random variable X taking non-negative integer values:

```latex
G_X(t) = E(t^X) = \sum_x P(X=x)\,t^x
```

- G_X(1) = 1. The coefficient of tˣ is P(X = x).

| Distribution | pgf |
| --- | --- |
| Discrete uniform on 1, ..., n | t(1 − tⁿ)/[n(1 − t)] |
| B(n, p) | (q + pt)ⁿ, q = 1 − p |
| Po(λ) | e^{λ(t − 1)} |
| Geo(p) | pt/(1 − qt) |
| Negative binomial (r, p) | [pt/(1 − qt)]ʳ |

### Explained

Derivations use the binomial theorem, the exponential series and geometric series. For Poisson:

```latex
G(t) = \sum_{x=0}^{\infty}\frac{e^{-\lambda}\lambda^x}{x!}t^x = e^{-\lambda}\sum\frac{(\lambda t)^x}{x!} = e^{-\lambda}e^{\lambda t} = e^{\lambda(t-1)}
```

For the geometric: Σ q^{x−1}p tˣ = pt Σ (qt)^{x−1} = pt/(1 − qt), for |qt| < 1.

### Worked example

G(t) = k/(3 − t). Find k and P(X = 2).

1. G(1) = k/2 = 1, k = 2.
2. 2/(3 − t) = (2/3)(1 − t/3)⁻¹ = (2/3)(1 + t/3 + t²/9 + ...).
3. P(X = 2) = 2/27.

### Common mistakes

- Forgetting the restriction G(1) = 1 when a constant is unknown.

## FS1 7.2 Mean and variance from a pgf

*Refs: Edexcel FS1 7.2. Level: A-level only.*

### What you need to know

```latex
E(X) = G'(1),\qquad \mathrm{Var}(X) = G''(1) + G'(1) - [G'(1)]^2
```

### Explained

G′(t) = Σ x P(X = x)t^{x−1}, so G′(1) = E(X). G″(1) = E(X(X − 1)) = E(X²) − E(X). Then Var = E(X²) − [E(X)]² gives the formula.

### Worked example

Use the pgf to prove that the geometric distribution has mean 1/p and variance q/p².

1. G = pt(1 − qt)⁻¹. G′ = p(1 − qt)⁻² (by the quotient rule: [p(1 − qt) + pqt]/(1 − qt)²). G′(1) = p/p² = 1/p.
2. G″ = 2pq(1 − qt)⁻³, G″(1) = 2q/p².
3. Var = 2q/p² + 1/p − 1/p² = (2q + p − 1)/p² = q/p².

G(t) = (1 + 2t)³/27. Identify the distribution and find the mean and variance.

1. = (⅓ + ⅔t)³: B(3, ⅔).
2. G′(1) = 6(3)²/27 = 2. G″(t) = 24(1 + 2t)/27, G″(1) = 8/3. Var = 8/3 + 2 − 4 = ⅔.

X has P(X = 0) = 0.2, P(X = 1) = 0.3, P(X = 3) = 0.5. Find G(t), E(X) and Var(X).

1. G(t) = 0.2 + 0.3t + 0.5t³.
2. G′(1) = 0.3 + 1.5 = 1.8. G″(1) = 3. Var = 3 + 1.8 − 3.24 = 1.56.

### Common mistakes

- Using Var = G″(1) − [G′(1)]², forgetting G′(1).

## FS1 7.3 Sums and linear functions

*Refs: Edexcel FS1 7.3. Level: A-level only.*

### What you need to know

- If X and Y are independent, G_{X+Y}(t) = G_X(t) G_Y(t).
- If Y = aX + b, G_Y(t) = t^b G_X(tᵃ).

### Worked example

X ~ Po(2) and Y ~ Po(3) independently. Use pgfs to show X + Y ~ Po(5).

1. G = e^{2(t−1)}e^{3(t−1)} = e^{5(t−1)}, the pgf of Po(5). Since a pgf identifies its distribution, X + Y ~ Po(5).

Two fair four-sided dice (1 to 4) are rolled. Find P(total = 5) using pgfs.

1. Each has G(t) = (t + t² + t³ + t⁴)/4. The total has G² .
2. Coefficient of t⁵ in (t + t² + t³ + t⁴)²/16: pairs (1, 4), (2, 3), (3, 2), (4, 1), so 4/16 = ¼.

X has pgf G(t). Find the pgf of Y = 2X + 1.

1. G_Y(t) = E(t^{2X+1}) = t E((t²)ˣ) = tG(t²).

### Common mistakes

- Adding pgfs instead of multiplying.

## Check questions

1. Derive the pgf of B(n, p) and use it to show E(X) = np and Var(X) = np(1 − p). [6 marks]
2. G(t) = k(1 + t)²(2 + t). Find k, P(X = 2) and E(X). [5 marks]
3. X has pgf G(t) = e^{4(t−1)}. Write down the distribution of X, and find the pgf of Y = 3X + 2. [3 marks]
4. X ~ Geo(0.5) and Y ~ Geo(0.5) independently. Find the pgf of X + Y and P(X + Y = 4). [5 marks]
5. A random variable has pgf G(t) = t²(1 + t)/2. Find E(X) and Var(X). [4 marks]

## Mark scheme

1. Σ C(n, x)pˣqⁿ⁻ˣtˣ = (q + pt)ⁿ (2). G′ = np(q + pt)ⁿ⁻¹, G′(1) = np (1). G″(1) = n(n − 1)p² (1). Var = n(n − 1)p² + np − n²p² = np(1 − p) (2).
2. G(1) = 12k = 1, k = 1/12 (1). Expand (1 + 2t + t²)(2 + t) = 2 + 5t + 4t² + t³ (2). P(X = 2) = 4/12 = ⅓ (1). E(X) = G′(1) = (5 + 8 + 3)/12 = 4/3 (1).
3. Po(4) (1). G_Y(t) = t²e^{4(t³ − 1)} (2).
4. Each pgf 0.5t/(1 − 0.5t) (1). Sum: 0.25t²/(1 − 0.5t)² (1). 0.25t²(1 + 2(0.5t) + 3(0.5t)² + ...) (1). Coefficient of t⁴: 0.25 × 3 × 0.25 = 3/16 (2).
5. G = (t² + t³)/2: X is 2 or 3 with probability ½ each (1). E(X) = 2.5 (1). G″(1) = (2 + 6)/2 = 4; Var = 4 + 2.5 − 6.25 = 0.25 (2).
