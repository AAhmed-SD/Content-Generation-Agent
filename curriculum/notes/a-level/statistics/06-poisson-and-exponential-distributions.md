---
level: A-level
subject: Statistics
topic: "The Poisson and exponential distributions"
boards:
  - board: Edexcel
    code: "9ST0"
    spec_refs: ["18.1", "18.2", "18.3", "12.1"]
refs_checked: false
spec_url: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/a-level-statistics/
---

# The Poisson and exponential distributions

This file covers when a Poisson model is appropriate, Poisson probabilities with their mean and variance, when an exponential model is appropriate and how it links to the Poisson as the time between randomly occurring events, and exponential probabilities with their mean and variance.

## Overview

The Poisson distribution is written up in [Further Maths 31](../further-maths/31-poisson-geometric-and-negative-binomial-distributions.md) and the exponential distribution (with calculus) in [Further Maths 35](../further-maths/35-continuous-random-variables.md). A-level Statistics uses them without calculus: you need the conditions, the formulae for probabilities, the means and variances, and above all the link that if events happen as a Poisson process at rate λ, the time between them is exponential with the same λ. Scaling λ to a new interval length is the most common step in these questions.

### Board differences

- Edexcel 9ST0 topic 18 is on Paper 1; goodness of fit tests for these distributions are topic 19 on Paper 2 (see [10-contingency-tables-and-goodness-of-fit.md](10-contingency-tables-and-goodness-of-fit.md)).
- You do not need to derive the means and variances. The Poisson probability formula is in the formulae booklet, and cumulative Poisson tables are provided; a calculator is advised.

## 18.1 When a Poisson model is appropriate

*Refs: Edexcel 18.1, 12.1. Paper 1.*

### What you need to know

- X ~ Po(λ) models the number of events in a fixed interval of time or space when events occur:
  - singly (no two at exactly the same moment or place);
  - independently of each other;
  - at random, at a constant average rate λ per interval.
- A sign that a Poisson model may fit data: the sample mean and sample variance are close.

### Explained

Think about each condition in context. Customers arriving at a shop are not independent if they come in families; calls to a helpline are not at a constant rate across the day; breakdowns on a motorway may cluster in bad weather. A Poisson model can still be reasonable over a short period when the rate is roughly steady, such as calls between 2 pm and 3 pm on a weekday.

If the variance of the data is much larger than the mean, the events are probably clustered (over-dispersed) and a Poisson model is poor.

### Worked example

A traffic officer counts cars passing a point in 60 one-minute intervals: the mean is 4.1 per minute and the variance is 4.3. On a second road near a set of traffic lights, the mean is 4.0 and the variance is 11.2. Comment on Poisson models for each.

1. First road: mean ≈ variance, consistent with a Poisson model, and cars on an open road arrive roughly independently.
2. Second road: variance far exceeds the mean. The lights release cars in bunches, so arrivals are not independent and a Poisson model is unsuitable.

### Common mistakes

- Stating the conditions without applying them to the context.
- Forgetting that the rate must be constant over the interval being modelled.

## 18.2 When an exponential model is appropriate, and its link to the Poisson

*Refs: Edexcel 18.2, 12.1. Paper 1.*

### What you need to know

- If events occur as a Poisson process with rate λ per unit time, the time T between consecutive events (or from any moment until the next event) follows the exponential distribution, T ~ Exp(λ).
- The link: "the wait for the next event is longer than t" is the same as "no events in an interval of length t".

```latex
P(T > t) = P(\text{no events in time } t) = e^{-\lambda t}
```

- The same holds in space: the distance between flaws along a cable follows an exponential distribution if flaws occur as a Poisson process along it.

### Explained

The exponential distribution is continuous, positively skewed, starting at its highest point at t = 0 and decaying. Short waits are the most likely; long waits are possible but rare.

It is memoryless: having already waited 10 minutes does not change the distribution of the remaining wait. That fits random events (radioactive decays, calls to a switchboard), but not things that wear out (the time until a light bulb fails becomes more likely as it ages), so an exponential model of lifetimes assumes no ageing.

### Worked example

Calls arrive at a helpline as a Poisson process at 3.5 per hour. Find the probability that the gap between two calls is more than 30 minutes, using (a) the exponential distribution, (b) the Poisson distribution.

1. (a) T ~ Exp(3.5), with t = 0.5 hours: P(T > 0.5) = e^(−3.5 × 0.5) = e^(−1.75) = 0.1738.
2. (b) Number of calls in 30 minutes ~ Po(1.75). P(no calls) = e^(−1.75) = 0.1738. The answers agree, as they must.

### Common mistakes

- Using different time units for λ and t (calls per hour with t in minutes).

## 18.3 Poisson and exponential probabilities, means and variances

*Refs: Edexcel 18.3. Paper 1.*

### What you need to know

```latex
P(X = x) = \frac{e^{-\lambda}\lambda^x}{x!}, \quad x = 0, 1, 2, \dots \qquad E(X) = \operatorname{Var}(X) = \lambda
```

```latex
T \sim \operatorname{Exp}(\lambda): \quad P(T > t) = e^{-\lambda t}, \quad P(T \le t) = 1 - e^{-\lambda t}, \quad E(T) = \frac{1}{\lambda}, \quad \operatorname{Var}(T) = \frac{1}{\lambda^2}
```

- Scale λ in proportion to the length of the interval: 3.5 per hour is 7 per 2 hours and 1.75 per 30 minutes.
- Use calculator functions or tables for cumulative Poisson probabilities.

### Explained

For the Poisson, the mean and variance are both λ, so the standard deviation is √λ. For the exponential, the mean and standard deviation are both 1/λ: with 3.5 calls per hour, the mean gap is 1/3.5 hours ≈ 17.1 minutes.

Cumulative forms work as for the binomial: P(X > 5) = 1 − P(X ≤ 5); P(X ≥ 6) is the same thing.

### Worked example

Calls arrive at 3.5 per hour. Find (a) P(exactly 2 calls in an hour), (b) P(at most 4 calls in an hour), (c) P(more than 5 calls in an hour), (d) P(exactly 7 calls in 2 hours), (e) the mean and standard deviation of the gap between calls, (f) P(a gap is less than 10 minutes).

1. (a) X ~ Po(3.5):

```latex
P(X = 2) = \frac{e^{-3.5}\, 3.5^2}{2!} = 0.1850
```

2. (b) P(X ≤ 4) = 0.7254.
3. (c) P(X > 5) = 1 − P(X ≤ 5) = 1 − 0.8576 = 0.1424.
4. (d) Y ~ Po(7): P(Y = 7) = 0.1490.
5. (e) Mean gap = standard deviation = 1/3.5 hours = 17.1 minutes.
6. (f) 10 minutes = 1/6 hour: P(T < 1/6) = 1 − e^(−3.5/6) = 1 − 0.5580 = 0.4420.

### Common mistakes

- Forgetting to rescale λ for a new interval.
- Giving Var(T) = 1/λ instead of 1/λ².
- P(X > 5) = 1 − P(X ≤ 4).

## Check questions

1. State two conditions needed for the number of typing errors on a page to follow a Poisson distribution, and give one reason why they might fail. [3 marks]
2. The number of emails a manager receives follows Po(4.5) per hour. Find P(exactly 3 in an hour), P(at most 2 in an hour) and P(more than 6 in an hour). [4 marks]
3. For the emails in question 2, find the probability of no emails in 20 minutes. [2 marks]
4. Faults on a long cable occur at random at 0.8 per km. T is the distance from a point to the next fault. State the distribution of T and find P(T > 2.5) and P(T < 0.5). [4 marks]
5. Find the mean and standard deviation of T in question 4. [2 marks]
6. A student models the lifetime of a car battery with an exponential distribution. Give one reason why this might be unrealistic. [1 mark]
7. A shop expects 3 customers every 20 minutes. Find the probability that at most 5 customers arrive in an hour. [3 marks]

## Mark scheme

1. Errors occur singly / independently / at a constant average rate per page (2, any two); e.g. a tired typist makes errors in clusters, or harder pages have more errors (1).
2. P(X = 3) = 0.1687 (1); P(X ≤ 2) = 0.1736 (1); P(X > 6) = 1 − P(X ≤ 6) (1) = 0.1689 (1).
3. λ = 4.5 ÷ 3 = 1.5 (1); e^(−1.5) = 0.2231 (1).
4. T ~ Exp(0.8) (1); P(T > 2.5) = e^(−2) (1) = 0.1353 (1); P(T < 0.5) = 1 − e^(−0.4) = 0.3297 (1).
5. Mean 1/0.8 = 1.25 km (1); standard deviation 1.25 km (1).
6. Batteries wear out, so failure becomes more likely with age; the exponential model is memoryless (1).
7. λ = 9 per hour (1); P(X ≤ 5) (1) = 0.1157 (1).
