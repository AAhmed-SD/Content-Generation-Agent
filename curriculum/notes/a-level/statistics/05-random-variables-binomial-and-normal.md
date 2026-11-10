---
level: A-level
subject: Statistics
topic: "Random variables, the binomial and normal distributions, and choosing a model"
boards:
  - board: Edexcel
    code: "9ST0"
    spec_refs: ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "5.1", "5.2", "5.3", "6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "12.1"]
refs_checked: false
spec_url: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/a-level-statistics/
---

# Random variables, binomial and normal distributions

This file covers the language of random variables, discrete distributions with their expectation and variance, the properties of continuous distributions and the rectangular (uniform) distribution, the binomial distribution with its mean and variance, the normal distribution (properties, the 1, 2 and 3 standard deviation rules, probabilities, unknown parameters, the distribution of the sample mean, and the normal approximation to the binomial), and choosing between binomial, normal, Poisson and exponential models.

## Overview

The binomial and normal distributions are written up in [A-level Maths 22](../maths/22-statistical-distributions.md); expectation and variance of a discrete random variable and the binomial mean and variance in [Further Maths 30](../further-maths/30-discrete-random-variables.md); continuous distributions and the rectangular distribution in [Further Maths 35](../further-maths/35-continuous-random-variables.md). A-level Statistics needs no calculus here: continuous distributions are met through their graphs, and the normal is used through a calculator. It adds the Edexcel 2/3, 95%, 99.8% rule, the sample mean result, and specific conditions for the normal approximation to the binomial.

### Board differences

- Edexcel 9ST0 topics 4, 5, 6 and 12.1 are on Paper 1.
- E(X) = Σxp and Var(X) = E(X²) − μ² must be learnt; the binomial formula, mean np and variance np(1 − p) are in the formulae booklet.
- Edexcel 6.2 quotes approximately 2/3 within μ ± σ, 95% within μ ± 2σ and 99.8% within μ ± 3σ (the exact value is 99.73%).
- Edexcel 6.6 gives the conditions for the normal approximation to the binomial as n ≥ 20 and p ≈ 0.5, or np > 10 or n(1 − p) > 10, with a continuity correction.

## 4.1 to 4.3 Random variables and discrete distributions

*Refs: Edexcel 4.1, 4.2, 4.3. Paper 1.*

### What you need to know

- A random variable takes numerical values determined by chance. It is discrete if it takes separate (countable) values, and continuous if it can take any value in a range.
- Two random variables are independent if the value of one does not affect the probabilities of the other; otherwise they are dependent.
- A discrete distribution can be given in words, a table or a probability function; the probabilities sum to 1.

```latex
E(X) = \mu = \sum x_i p_i, \qquad \operatorname{Var}(X) = \sigma^2 = \sum x_i^2 p_i - \mu^2 = E(X^2) - \mu^2
```

- Use discrete random variables to model real situations, such as winnings in a game or the number of items bought.

### Explained

E(X) is the long-run mean: the average value over many repetitions. Var(X) measures spread around it; the standard deviation σ = √Var(X) is in the same units as X.

### Worked example

X has distribution P(X = 0) = 0.1, P(X = 1) = 0.3, P(X = 2) = 0.4, P(X = 3) = 0.2. Find E(X), Var(X) and the standard deviation.

1. E(X) = 0(0.1) + 1(0.3) + 2(0.4) + 3(0.2) = 1.7.
2. E(X²) = 0 + 1(0.3) + 4(0.4) + 9(0.2) = 3.7.
3. Var(X) = 3.7 − 1.7² = 3.7 − 2.89 = 0.81, so σ = 0.9.

A charity game costs £2. A player wins £10 with probability 0.05, £3 with probability 0.2, and nothing otherwise. Find the expected profit per game for the charity.

1. Player's expected winnings: 10(0.05) + 3(0.2) = 0.5 + 0.6 = £1.10.
2. Charity's expected profit per game: 2 − 1.10 = £0.90.

### Common mistakes

- Forgetting to subtract μ² when finding the variance.
- Leaving the variance as the answer when the standard deviation is asked for.

## 4.4 to 4.6 Continuous distributions and graphs of distributions

*Refs: Edexcel 4.4, 4.5, 4.6. Paper 1.*

### What you need to know

- A continuous distribution is described by a curve (a probability density function) with total area 1 under it; probabilities are areas; P(X = a) = 0 for any single value, so P(X < a) = P(X ≤ a).
- Interpret a bar chart or table of a discrete distribution: mode, symmetry or skew, where most probability lies.
- Interpret a rectangular (continuous uniform) distribution on [a, b]: a horizontal line of height 1/(b − a), mean (a + b)/2 by symmetry, and probability = width × height.

### Explained

The bar chart of B(10, 0.3) peaks at 3 and has a longer tail to the right, so it is positively skewed; B(10, 0.5) is symmetrical. The rectangle of a uniform distribution says every equal-width interval inside [a, b] is equally likely, which fits rounding errors and arrival times within a known window.

### Worked example

A train is equally likely to arrive at any time between 2 and 10 minutes after 08:00. Find the height of the rectangle, the probability it arrives between 3 and 6 minutes past, and the mean arrival time.

1. Width 10 − 2 = 8, so height = 1/8.
2. P(3 < T < 6) = (6 − 3) × 1/8 = 3/8 = 0.375.
3. Mean = (2 + 10) ÷ 2 = 6 minutes past 08:00.

### Common mistakes

- Giving a non-zero probability to a single value of a continuous variable.

## 5.1 to 5.3 The binomial distribution

*Refs: Edexcel 5.1, 5.2, 5.3. Paper 1.*

### What you need to know

- X ~ B(n, p) when there is a fixed number n of trials, each with two outcomes, a constant probability p of success, and independent trials.

```latex
P(X = x) = \binom{n}{x} p^x (1-p)^{n-x}, \qquad E(X) = np, \qquad \operatorname{Var}(X) = np(1-p)
```

- Use the formula, cumulative tables or a calculator (advised) for probabilities. You do not need to derive the mean and variance.

### Explained

Modelling assumptions should be criticised in context. Twenty patients in one ward catching an infection are not independent; the chance of a free throw being scored may change as a player tires. If the sample is taken without replacement from a small population, p changes from trial to trial, so the binomial is only an approximation.

The variance np(1 − p) is largest when p = 0.5 and shrinks as p moves towards 0 or 1.

### Worked example

40% of customers at a café buy a cake. In a random sample of 15, find P(X = 6), P(X ≤ 4), P(X ≥ 8), the mean and the standard deviation.

1. X ~ B(15, 0.4).

```latex
P(X = 6) = \binom{15}{6}(0.4)^6(0.6)^9 = 0.2066
```

2. P(X ≤ 4) = 0.2173 (calculator or tables).
3. P(X ≥ 8) = 1 − P(X ≤ 7) = 1 − 0.7869 = 0.2131.
4. Mean = 15 × 0.4 = 6. Variance = 6 × 0.6 = 3.6, so standard deviation = 1.897.

### Common mistakes

- P(X ≥ 8) = 1 − P(X ≤ 8); the correct form is 1 − P(X ≤ 7).
- Giving the variance np instead of np(1 − p).

## 6.1 to 6.4 The normal distribution

*Refs: Edexcel 6.1, 6.2, 6.3, 6.4. Paper 1.*

### What you need to know

- X ~ N(μ, σ²): continuous, bell-shaped, symmetrical about μ (mean = median = mode), with almost all values within μ ± 3σ.
- Data from a normal population will look roughly like this, but each sample varies; a histogram of a small sample can look irregular even when the population is normal.
- Approximately 2/3 of observations lie within μ ± σ, 95% within μ ± 2σ, and 99.8% within μ ± 3σ.
- Find probabilities with a calculator (advised) or by standardising. Find an unknown μ or σ (or both) from given probabilities using inverse normal values.

```latex
Z = \frac{X - \mu}{\sigma} \sim N(0, 1)
```

### Explained

**Checking a normal model from data.** If roughly 2/3 of a data set is within one standard deviation of the mean and about 95% within two, and the histogram is roughly symmetrical, a normal model is reasonable. If the mean minus two standard deviations is negative for a quantity that cannot be negative (times, masses), the data are probably skewed.

**Unknown parameters.** Each given probability becomes an equation in z. One unknown needs one equation; two unknowns need two equations, solved simultaneously.

### Worked example

Adult heights in a group are modelled by N(170, 8²) cm. Use the 1-standard-deviation rule to describe the middle of the distribution, then find P(H > 180).

1. About 2/3 of heights lie between 170 − 8 = 162 and 170 + 8 = 178 cm. (Exact: 0.6827.)
2. P(H > 180): z = (180 − 170) ÷ 8 = 1.25, P(Z > 1.25) = 0.1056.

Bags of rice have masses with σ = 4 g, and 10% weigh less than 50 g. Find μ.

```latex
\frac{50 - \mu}{4} = -1.2816 \quad \Rightarrow \quad \mu = 50 + 5.126 = 55.1 \text{ g}
```

X is normal with P(X < 20) = 0.15 and P(X > 40) = 0.2. Find μ and σ.

1. z-values: Φ⁻¹(0.15) = −1.0364 and Φ⁻¹(0.8) = 0.8416.
2. 20 = μ − 1.0364σ and 40 = μ + 0.8416σ.
3. Subtract: 20 = 1.8780σ, so σ = 10.65 and μ = 20 + 1.0364 × 10.65 = 31.0.

### Common mistakes

- Using σ² in place of σ when standardising: N(170, 64) has σ = 8.
- Using the 0.2 instead of 0.8 for an upper-tail probability without changing the sign of z.

## 6.5 The distribution of the sample mean

*Refs: Edexcel 6.5. Paper 1.*

### What you need to know

- If X ~ N(μ, σ²) and X̄ is the mean of a random sample of size n, then

```latex
\bar{X} \sim N\!\left(\mu, \frac{\sigma^2}{n}\right)
```

- The standard deviation of X̄, σ/√n, is the standard error of the mean.

### Explained

Averages vary less than single values. With n = 9 the standard error is a third of σ; with n = 100 it is a tenth. If X is not normal, X̄ is still approximately normal for large n by the central limit theorem (see [13-central-limit-theorem-and-confidence-intervals.md](13-central-limit-theorem-and-confidence-intervals.md)).

### Worked example

Cartons hold X ml of juice, X ~ N(500, 12²). A random sample of 9 cartons is taken. Find the probability the sample mean is below 495 ml.

1. X̄ ~ N(500, 12²/9), so the standard error is 12 ÷ 3 = 4.
2. z = (495 − 500) ÷ 4 = −1.25.
3. P(X̄ < 495) = 0.1056.

### Common mistakes

- Dividing the standard deviation by n instead of √n (or the variance by √n).

## 6.6 The normal approximation to the binomial

*Refs: Edexcel 6.6. Paper 1.*

### What you need to know

- B(n, p) may be approximated by N(np, np(1 − p)). Edexcel's conditions: n ≥ 20 and p ≈ 0.5, or np > 10 or n(1 − p) > 10. In practice the approximation is best when both np and n(1 − p) are large.
- Use a continuity correction: a discrete value x covers the interval x − 0.5 to x + 0.5.

| Binomial | Normal |
| --- | --- |
| P(X ≤ 30) | P(Y < 30.5) |
| P(X < 30) | P(Y < 29.5) |
| P(X ≥ 30) | P(Y > 29.5) |
| P(X = 30) | P(29.5 < Y < 30.5) |

### Explained

Calculators now give exact binomial probabilities, so the approximation matters mainly for hand calculation, large n, and as the basis of the z-test for a proportion (see [09-hypothesis-testing-principles-and-one-sample-tests.md](09-hypothesis-testing-principles-and-one-sample-tests.md)).

### Worked example

X ~ B(60, 0.45). Use a normal approximation to find P(X ≤ 30) and compare with the exact value.

1. np = 27 and n(1 − p) = 33, both above 10. Variance = 60 × 0.45 × 0.55 = 14.85.
2. Y ~ N(27, 14.85). P(X ≤ 30) ≈ P(Y < 30.5).

```latex
z = \frac{30.5 - 27}{\sqrt{14.85}} = 0.908, \qquad P(Z < 0.908) = 0.818
```

3. Exact binomial: 0.8183. The approximation is very close.

### Common mistakes

- Leaving out the continuity correction, or applying it in the wrong direction.

## 12.1 Choosing a distribution

*Refs: Edexcel 12.1. Paper 1.*

### What you need to know

- Know when binomial, normal, Poisson and exponential models are appropriate and valid in a real situation, and give reasons.

### Explained

| Model | Use for | Key conditions |
| --- | --- | --- |
| binomial B(n, p) | number of successes in n trials | fixed n, two outcomes, constant p, independent trials |
| normal N(μ, σ²) | continuous measurements | symmetrical, bell-shaped, about 95% within 2σ |
| Poisson Po(λ) | number of events in a fixed interval of time or space | events occur singly, independently, at a constant average rate; mean ≈ variance |
| exponential Exp(λ) | time (or distance) between Poisson events | constant rate, memoryless waiting |

The Poisson and exponential distributions are in [06-poisson-and-exponential-distributions.md](06-poisson-and-exponential-distributions.md).

### Worked example

Suggest a model for each, with a reason: (a) the number of faulty screens in a batch of 50 when 3% are faulty; (b) the number of emails arriving in an hour; (c) the time until the next email; (d) the masses of apples from one orchard.

1. (a) B(50, 0.03): fixed number of screens, each faulty or not, independently with constant probability.
2. (b) Poisson: a count of events in a fixed time, arriving singly at a roughly constant rate.
3. (c) Exponential: the waiting time between Poisson events.
4. (d) Normal: a continuous measurement, likely symmetrical about a mean.

### Common mistakes

- Choosing binomial for a count with no fixed number of trials.

## Check questions

1. X takes values 1, 2, 3, 4 with probabilities 0.2, 0.3, 0.4, 0.1. Find E(X) and Var(X). [4 marks]
2. A delivery is equally likely to arrive at any time between 10:00 and 10:40. Find the probability it arrives between 10:25 and 10:40. [2 marks]
3. 20% of plants of a variety have white flowers. In a random sample of 25, find P(X = 5), P(X ≤ 3), P(X ≥ 7), and the mean and variance of X. [6 marks]
4. Lengths of fish are N(65, 4²) cm. Without a calculator, estimate the proportion between 57 and 73 cm. Then find P(L < 60) and P(62 < L < 70). [5 marks]
5. The weights of a product are normal with mean 250 g and standard deviation 6 g. A sample of 16 is taken. Find P(X̄ > 253). [3 marks]
6. Y ~ B(80, 0.4). Use a normal approximation to estimate P(Y > 35), justifying its use. [5 marks]
7. Give a reason why a normal model would not be suitable for the number of children in UK households. [1 mark]

## Mark scheme

1. E(X) = 0.2 + 0.6 + 1.2 + 0.4 = 2.4 (1); E(X²) = 0.2 + 1.2 + 3.6 + 1.6 = 6.6 (1); Var(X) = 6.6 − 5.76 (1) = 0.84 (1).
2. Height 1/40 (1); 15/40 = 0.375 (1).
3. B(25, 0.2) (1); P(X = 5) = 0.1960 (1); P(X ≤ 3) = 0.2340 (1); P(X ≥ 7) = 1 − P(X ≤ 6) = 0.2200 (1); mean 5 (1); variance 4 (1).
4. 57 and 73 are μ ± 2σ, so about 95% (1); P(L < 60): z = −1.25 (1), 0.1056 (1); P(62 < L < 70): z from −0.75 to 1.25 (1), 0.6677 (1).
5. X̄ ~ N(250, 6²/16), SE = 1.5 (1); z = 2 (1); 0.0228 (1).
6. np = 32 > 10 and n(1 − p) = 48 > 10 (1); N(32, 19.2) (1); P(Y > 35) ≈ P(W > 35.5) (1); z = 0.799 (1); 0.212 (1).
7. It is discrete with small whole-number values and positively skewed (it cannot be negative) (1).
