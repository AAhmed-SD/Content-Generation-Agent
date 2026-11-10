---
level: GCSE
subject: Statistics
topic: "Estimation and sample size"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8382"
    spec_refs: ["3.5.31", "3.5.32", "3.5.33", "3.5.34", "3.5.35"]
  - board: Edexcel
    code: "1ST0"
    spec_refs: ["2h.01", "2h.02", "2h.03"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/statistics/gcse/statistics-8382/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/past-papers/gcse-statistics/
---

# Estimation and sample size

This file covers using sample statistics to estimate population characteristics (means, medians and proportions), (Higher) the Petersen capture-recapture method, and how sample size affects reliability. The distribution of sample means (quality assurance) is in file 14.

## Overview

On both tiers: estimating population characteristics, means and proportions from samples; sample size and reliability. (HT only) Petersen capture-recapture.

### Board differences

- AQA 8382: 3.5.31 (E12a) estimates from summary statistics, 3.5.32 (E12b) population mean, 3.5.33 (E12c) proportions, 3.5.34 (E12d) Petersen capture-recapture (Higher only), 3.5.35 (E13a) sample size.
- Edexcel 1ST0: 2h.01 covers estimates of characteristics, means and proportions together; 2h.02 Petersen capture-recapture (Higher only); 2h.03 sample size.
- Both boards include the assumptions behind capture-recapture.

## 3.5.31 to 3.5.33 / 2h.01 Estimating population characteristics

*Refs: AQA 3.5.31 (E12a), 3.5.32 (E12b), 3.5.33 (E12c) · Edexcel 2h.01. Tier: F & H.*

### What you need to know

- Use summary statistics from a sample to estimate the same values for the population: the sample mean estimates the population mean; the sample proportion estimates the population proportion; about half the population is expected to lie above the sample median.
- Scale a sample proportion up to the population: estimated number = proportion in sample × population size.
- Several samples can be combined: the mean of all the sample values (weighted by sample size) is a better estimate than any one sample.

### Explained

A random, unbiased sample is a small picture of the population, so its features should be close to the population's. They will not be exactly equal, and different samples give different estimates, so estimates should be given with care ("about", "estimated").

Combining samples: if two samples have means 12.4 (size 20) and 13.1 (size 30), the combined mean is (20 × 12.4 + 30 × 13.1) ÷ 50 = 12.82, which uses all 50 values.

### Worked example

A random sample of 80 households in a town of 6400 households finds that 26 own an electric car.

1. Sample proportion = 26 ÷ 80 = 0.325.
2. Estimated number in town = 0.325 × 6400 = 2080 households.

A sample of 15 apples from an orchard has masses with median 142 g and mean 145 g. Estimate the proportion of all the apples in the orchard heavier than 142 g, and the mean mass of all its apples.

1. About half (50%) of the apples, since 142 g is the sample median.
2. The population mean mass is estimated as 145 g.

Five students each take a sample of 10 pebbles and find mean lengths of 3.2, 3.6, 3.1, 3.4 and 3.7 cm. Estimate the population mean.

1. All samples are the same size, so average the means: (3.2 + 3.6 + 3.1 + 3.4 + 3.7) ÷ 5 = 17 ÷ 5 = 3.4 cm.
2. This is better than any single sample because it is based on 50 pebbles.

### Common mistakes

- Giving the estimate as an exact fact.
- Combining sample means of different sizes with a simple average.

## 3.5.34 / 2h.02 Petersen capture-recapture

*Refs: AQA 3.5.34 (E12d) · Edexcel 2h.02. Tier: Higher only.*

### What you need to know

- (HT only) Capture and mark M animals, then release them. Later capture n animals; m of them are marked. The estimated population size N is:

```latex
N = \frac{M \times n}{m}
```

- (HT only) Assumptions:
  - the population is closed: no births, deaths or migration between samples;
  - marks are not lost and do not harm the animal or change its behaviour;
  - marked animals mix fully back into the population;
  - every animal is equally likely to be caught each time (marked animals are not easier or harder to catch).
- (HT only) Comment on whether the assumptions are realistic in context.

### Explained

(HT only) The idea is that the proportion of marked animals in the second sample should match the proportion marked in the whole population: m/n ≈ M/N. Rearranging gives the formula.

(HT only) If some marks fall off, m is too small, so the estimate of N is too big. If marked animals learn to avoid traps, m is again too small. If marked animals are easier to catch (they return to the bait), m is too big and N is underestimated.

### Worked example

(HT only) 60 newts are caught in a pond, marked and released. A week later 75 newts are caught, of which 18 are marked. Estimate the number of newts in the pond.

1. N = 60 × 75 ÷ 18 = 250.

(HT only) Comment: a week is short, so births and deaths are probably small; but if it rained heavily and newts moved between ponds, the population is not closed and the estimate would be unreliable.

### Common mistakes

- (HT only) Dividing by n instead of m.
- (HT only) Listing assumptions without relating them to the context.

## 3.5.35 / 2h.03 Sample size, reliability and replication

*Refs: AQA 3.5.35 (E13a) · Edexcel 2h.03. Tier: F & H.*

### What you need to know

- Larger samples generally give more reliable results: estimates are closer to the population values and vary less between samples.
- Replication: repeating a study with a new sample. Results that replicate (come out similar again) are more trustworthy.
- A large sample does not fix bias: a large biased sample is still biased.

### Explained

In a small sample, one unusual value can change the mean a lot. In a large sample its effect is diluted. But larger samples cost more time and money, so there is a balance.

### Worked example

Two students estimate the proportion of left-handed people in their school. Student A asks 10 people and gets 0.3; student B asks 100 people chosen at random and gets 0.12. Which is more reliable, and why?

1. Student B's estimate, because the sample is larger (and random), so it is less affected by chance; 3 left-handers in 10 could easily happen by chance.

### Common mistakes

- Saying a bigger sample is "more accurate" without explaining that it reduces the effect of chance variation.
- Thinking a bigger sample removes bias from a poor sampling method.

## Check questions

1. In a random sample of 120 voters, 54 support a new park. There are 15 000 voters in the town. Estimate how many support the park. [2 marks]
2. Sample A (size 40) has mean 26.5; sample B (size 60) has mean 24.0. Find the best estimate of the population mean. [2 marks]
3. A sample of runners has median finishing time 52 minutes. Estimate the proportion of all runners who took longer than 52 minutes. [1 mark]
4. (HT only) 120 fish are tagged and released into a lake. Later, 90 fish are caught, of which 15 are tagged. Estimate the number of fish in the lake. [2 marks]
5. (HT only) Give two assumptions made in question 4. [2 marks]
6. (HT only) Some of the tags in question 4 fell off before the second catch. Explain the effect on the estimate. [2 marks]
7. Explain why a sample of 500 is likely to give a more reliable estimate than a sample of 50. [1 mark]

## Mark scheme

1. 54/120 = 0.45 (1); 0.45 × 15 000 = 6750 (1).
2. (40 × 26.5 + 60 × 24.0) ÷ 100 (1) = (1060 + 1440) ÷ 100 = 25 (1).
3. About half (50%) (1).
4. 120 × 90 ÷ 15 (1) = 720 (1).
5. Any two (1 each): no fish born, died, arrived or left between catches; tags not lost; tagged fish mixed back into the population; all fish equally likely to be caught; tagging did not affect the fish.
6. Fewer tagged fish would be counted in the second catch, so m is too small (1), so the population would be overestimated (1).
7. Larger samples reduce the effect of chance or unusual values, so the estimate is closer to the population value / varies less (1).
