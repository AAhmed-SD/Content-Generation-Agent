---
level: GCSE
subject: Statistics
topic: "Distributions, standardised scores and quality assurance"
tiers: Higher only (all content in this file is tagged (HT only))
boards:
  - board: AQA
    code: "8382"
    spec_refs: ["3.5.26", "3.5.27", "3.5.28", "3.5.29", "3.5.30", "3.5.36"]
  - board: Edexcel
    code: "1ST0"
    spec_refs: ["2c.06", "2g.01", "2g.02", "3p.11", "3p.12", "3p.13"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/statistics/gcse/statistics-8382/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/past-papers/gcse-statistics/
---

# Distributions, standardised scores and quality assurance

This file covers the binomial distribution, the normal distribution and its 68%, 95% and three-standard-deviation facts, standardised scores, the distribution of sample means, and control charts with warning and action lines.

## Overview

Everything in this file is Higher only on both boards.

### Board differences

- AQA 8382: 3.5.26 (E10b) binomial, 3.5.27 (E11a) and 3.5.28 (E11b) normal, 3.5.29 (E11c) action and warning lines, 3.5.30 (E11d) standardised scores, 3.5.36 (E13b) sample means. AQA binomial questions use n no greater than 5, use the word "binomial" but not the notation X ~ B(n, p), and expect you to use the symmetry of the probabilities where it helps. Standardisation formulae are given in the question.
- Edexcel 1ST0: 2c.06 standardised scores (formula not given, so learn it), 2g.01 sample means, 2g.02 control charts for the sample mean, median or range, 3p.11 binomial (notation B(n, p) may be used, n up to 10, mean np), 3p.12 and 3p.13 normal (notation N(μ, σ²) may be used; know when a normal model is suitable).
- Neither board uses normal distribution tables or asks for normal probability calculations beyond the 68%, 95% and 3 standard deviation facts.

## 3.5.26 / 3p.11 The binomial distribution

*Refs: AQA 3.5.26 (E10b) · Edexcel 3p.11. Tier: Higher only.*

### What you need to know

- (HT only) A binomial model fits when:
  - there is a fixed number of trials, n;
  - each trial has two outcomes, "success" or "failure";
  - the probability of success, p, is the same on every trial;
  - trials are independent.
- (HT only) The probability of exactly r successes is:

```latex
P(r \text{ successes}) = \binom{n}{r} p^r (1-p)^{n-r}
```

  where the coefficient (n choose r) counts the arrangements. It can be read from Pascal's triangle or a calculator (nCr).
- (HT only) Mean number of successes = np (Edexcel).
- (HT only) If p = 0.5 the probabilities are symmetrical: P(r) = P(n − r).
- (HT only) Notation: Edexcel may write B(n, p); AQA does not use this notation.

### Explained

(HT only) Pascal's triangle rows give the coefficients:

```
n = 1:        1  1
n = 2:       1  2  1
n = 3:      1  3  3  1
n = 4:     1  4  6  4  1
n = 5:    1  5 10 10  5  1
```

(HT only) For n = 4, "2 successes" can happen in 6 orders (SSFF, SFSF, SFFS, FSSF, FSFS, FFSS), each with probability p²(1 − p)². That is why the coefficient is 6.

(HT only) A binomial model does not fit if items are taken without replacement from a small group (p changes), or if trials affect each other.

### Worked example

(HT only) 20% of a factory's light bulbs are dimmer than standard. A sample of 4 bulbs is chosen at random. Find the probability that exactly 1 is dim, and that at least 1 is dim.

1. n = 4, p = 0.2, 1 − p = 0.8.
2. P(exactly 1) = 4 × 0.2 × 0.8³ = 4 × 0.2 × 0.512 = 0.4096.
3. P(none) = 0.8⁴ = 0.4096.
4. P(at least 1) = 1 − 0.4096 = 0.5904.
5. Mean number of dim bulbs in samples of 4 = 4 × 0.2 = 0.8.

(HT only) A fair coin is tossed 5 times. Find P(exactly 3 heads) and use symmetry to write down P(exactly 2 heads).

1. P(3 heads) = 10 × 0.5³ × 0.5² = 10/32 = 0.3125.
2. By symmetry (p = 0.5), P(2 heads) = P(3 heads) = 0.3125.

(HT only) Comparing with data (see file 13): if 200 samples of 4 bulbs are tested, the expected number of samples with exactly 1 dim bulb is 200 × 0.4096 ≈ 82.

### Common mistakes

- (HT only) Forgetting the coefficient (n choose r).
- (HT only) Using a binomial model when the probability changes from trial to trial.
- (HT only) Working out "at least 1" by adding many terms instead of 1 − P(none).

## 3.5.27, 3.5.28 / 3p.12, 3p.13 The normal distribution

*Refs: AQA 3.5.27 (E11a), 3.5.28 (E11b) · Edexcel 3p.12, 3p.13. Tier: Higher only.*

### What you need to know

- (HT only) A normal distribution is a continuous, symmetrical, bell-shaped distribution; its mean, median and mode are equal (at the centre).
- (HT only) About 68% (just over two thirds) of values lie within 1 standard deviation of the mean.
- (HT only) About 95% lie within 2 standard deviations of the mean.
- (HT only) Almost all (about 99.7%) lie within 3 standard deviations; values more than 3 standard deviations from the mean are very unusual.
- (HT only) A normal model suits data that is continuous, symmetrical, and with most values near the middle, such as heights, masses and measurement errors.
- (HT only) Edexcel may write N(μ, σ²): mean μ and variance σ² (σ is the standard deviation).

### Explained

(HT only) Because the curve is symmetrical, the 68% within one standard deviation splits into 34% on each side; the 95% within two splits 47.5% each side. So about 16% of values are more than 1 standard deviation above the mean, and about 2.5% are more than 2 standard deviations above.

(HT only) A histogram of data that is strongly skewed, or has two peaks, is not well modelled by a normal distribution.

### Worked example

(HT only) The masses of eggs from a farm are modelled as normal with mean 58 g and standard deviation 4 g.

1. About 68% lie between 58 − 4 = 54 g and 58 + 4 = 62 g.
2. About 95% lie between 50 g and 66 g.
3. Estimate the percentage heavier than 66 g: (100 − 95) ÷ 2 = 2.5%.
4. An egg of 72 g is 14 g above the mean, which is 3.5 standard deviations: very unusual, so it might be checked as a possible recording error or outlier.
5. In a box of 600 eggs, about 0.68 × 600 ≈ 408 would be between 54 g and 62 g.

### Common mistakes

- (HT only) Saying 95% lie above or below 2 standard deviations, instead of within ±2 standard deviations.
- (HT only) Assuming any data set is normal without checking it is roughly symmetrical.

## 3.5.30 / 2c.06 Standardised scores

*Refs: AQA 3.5.30 (E11d) · Edexcel 2c.06. Tier: Higher only.*

### What you need to know

- (HT only) A standardised score (z-score) says how many standard deviations a value is above or below the mean:

```latex
\text{standardised score} = \frac{x - \text{mean}}{\text{standard deviation}}
```

- (HT only) Use standardised scores to compare values from two different data sets (for example, marks in two different tests).
- (HT only) Positive means above the mean; negative means below; 0 is exactly average.
- (HT only) Edexcel does not give this formula; AQA gives it in the question.

### Explained

(HT only) A mark of 70 in a hard test may be better than 80 in an easy one. Standardising measures each mark against its own group, removing differences in difficulty and spread.

### Worked example

(HT only) Aisha scored 68 in Maths (mean 56, standard deviation 8) and 74 in English (mean 65, standard deviation 12). In which subject did she do better compared with the other students?

1. Maths: (68 − 56) ÷ 8 = 1.5.
2. English: (74 − 65) ÷ 12 = 0.75.
3. Her Maths score is 1.5 standard deviations above the mean, compared with 0.75 in English, so she did better in Maths relative to the others.

(HT only) Reverse: a standardised score of −0.5 in a test with mean 40 and standard deviation 6. Find the mark.

1. x = 40 + (−0.5) × 6 = 37.

### Common mistakes

- (HT only) Comparing raw marks instead of standardised scores.
- (HT only) Dividing by the variance instead of the standard deviation.

## 3.5.36 / 2g.01 Sample means

*Refs: AQA 3.5.36 (E13b) · Edexcel 2g.01. Tier: Higher only.*

### What you need to know

- (HT only) A set of sample means is more closely grouped (less spread) than the individual values from the same population.
- (HT only) No formal work on the distribution of the sample mean is needed.

### Explained

(HT only) In a sample, high and low values tend to cancel out, so the mean of each sample is close to the population mean. The mean heights of each class in a school vary much less than the heights of all students. Larger samples give means that are even more tightly grouped.

### Worked example

(HT only) Individual pupils' reading times have range 25 minutes. The means of 10 samples of 20 pupils each are found. Which is more likely for the range of these means: 30 minutes, 25 minutes or 4 minutes?

1. 4 minutes: sample means vary much less than individual values.

### Common mistakes

- (HT only) Thinking sample means have the same spread as the data.

## 3.5.29 / 2g.02 Quality assurance: control charts

*Refs: AQA 3.5.29 (E11c) · Edexcel 2g.02. Tier: Higher only.*

### What you need to know

- (HT only) In quality assurance, small samples are taken at regular times from a production process, and the sample mean (or median or range) is plotted on a control chart against time.
- (HT only) The chart has a centre line at the target (expected) value, warning lines and action lines above and below.
- (HT only) Warning lines are set at the target ± 2 standard deviations of the sample mean; about 1 in 20 sample values falls outside them by chance (since about 95% fall within 2 standard deviations).
- (HT only) Action lines are set at the target ± 3 standard deviations of the sample mean; almost no values fall outside them if the process is working.
- (HT only) Actions:
  - between the warning lines: carry on;
  - between a warning line and an action line: take another sample at once; if it is also outside the warning lines, stop and adjust the process;
  - outside an action line: stop the process and adjust (reset) it.
- (HT only) Also look for trends, such as several sample means in a row rising, which suggest the process is drifting.

### Explained

(HT only) Because sample means vary less than single items (2g.01), a sample mean outside the action lines is very unlikely to be chance: something is wrong with the machine.

### Worked example

(HT only) A machine fills bottles with a target of 500 ml. The standard deviation of the sample means is 1.5 ml. Find the warning and action limits, and say what to do if a sample mean is 503.6 ml, then 505.1 ml.

1. Warning limits: 500 ± 2 × 1.5 = 497 ml and 503 ml.
2. Action limits: 500 ± 3 × 1.5 = 495.5 ml and 504.5 ml.
3. 503.6 ml is between the upper warning and action lines: take another sample straight away.
4. 505.1 ml is above the upper action line: stop the machine and adjust it.

### Common mistakes

- (HT only) Stopping the process for a single value between the warning and action lines.
- (HT only) Using 1 and 2 standard deviations for the lines instead of 2 and 3.

## Check questions

1. (HT only) Give two conditions needed for a binomial model. [2 marks]
2. (HT only) The probability a seed germinates is 0.7. Five seeds are planted. Find the probability that exactly 4 germinate. [2 marks]
3. (HT only) For question 2, find the probability that at least one seed fails to germinate. [2 marks]
4. (HT only) Write down the mean number of seeds that germinate in question 2. [1 mark]
5. (HT only) Lengths of bolts are normally distributed with mean 80 mm and standard deviation 0.5 mm. Between which two lengths do about 95% of bolts lie? About what percentage are longer than 80.5 mm? [3 marks]
6. (HT only) Ben scored 52 in Chemistry (mean 45, standard deviation 5) and 61 in Biology (mean 55, standard deviation 3). Use standardised scores to decide in which test he did better compared with the others. [3 marks]
7. (HT only) Explain why a control chart uses sample means rather than single items. [1 mark]
8. (HT only) A bag-filling machine has target mass 250 g and standard deviation of sample means 2 g. Write down the warning and action limits, and state what should be done if a sample mean of 245.5 g is recorded. [3 marks]

## Mark scheme

1. Any two (1 each): fixed number of trials; two outcomes per trial; constant probability of success; independent trials.
2. 5 × 0.7⁴ × 0.3 (1) = 0.36015 (1).
3. P(all 5 germinate) = 0.7⁵ = 0.16807 (1); 1 − 0.16807 = 0.83193 (1).
4. 5 × 0.7 = 3.5 (1).
5. 80 ± 2 × 0.5 (1): 79 mm and 81 mm (1); 80.5 is 1 standard deviation above the mean, so about (100 − 68) ÷ 2 = 16% (1).
6. Chemistry (52 − 45) ÷ 5 = 1.4 (1); Biology (61 − 55) ÷ 3 = 2 (1); Biology is better relative to the others (1).
7. Sample means vary less than single values, so a mean outside the limits is a clearer sign that the process has changed (1).
8. Warning 246 g and 254 g (1); action 244 g and 256 g (1); 245.5 g is between the lower warning and action lines, so take another sample immediately (1).
