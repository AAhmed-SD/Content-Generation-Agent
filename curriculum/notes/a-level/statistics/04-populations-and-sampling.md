---
level: A-level
subject: Statistics
topic: "Populations and samples: random and non-random sampling"
boards:
  - board: Edexcel
    code: "9ST0"
    spec_refs: ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6"]
refs_checked: false
spec_url: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/a-level-statistics/
---

# Populations and sampling

This file covers simple and unrestricted random samples, choosing a random sample with random number tables or a calculator, the sampling methods named in the spec (simple random, systematic, cluster, judgmental, snowball, and stratification in proportional and disproportional ratios), their strengths and weaknesses, choosing a method in context, and the practical limits on collecting unbiased data.

## Overview

Populations, sampling frames, simple random, systematic, stratified, quota, opportunity and cluster sampling are written up in [A-level Maths 19](../maths/19-statistical-sampling.md), with GCSE-level work in [GCSE Statistics 03](../../gcse/statistics/03-population-and-sampling.md). A-level Statistics adds the formal definition of a random sample (with and without replacement), random number tables, judgmental and snowball sampling, disproportional stratification with weighting, and reasoned choices for named contexts such as exit polls and quality assurance.

### Board differences

- Edexcel 9ST0 topic 3 is on Paper 1.
- The spec names judgmental and snowball sampling and disproportional stratification, which are not in A-level Mathematics. Quota and opportunity sampling are not named in 9ST0 topic 3 but may still be met as context.

## 3.1 Simple and unrestricted random samples

*Refs: Edexcel 3.1. Paper 1.*

### What you need to know

- A simple random sample of size n is taken without replacement: each member can appear at most once.
- An unrestricted random sample is taken with replacement: a member can be picked more than once.
- For a random sample of size n: every member of the population is equally likely to be included, every subset of size n is possible, and (for a simple random sample) every possible sample of size n is equally likely.

### Explained

The third condition is the strong one. Systematic sampling gives every member an equal chance of being included, but only a few samples are possible (once the start is chosen, the rest are fixed), so it is not a simple random sample.

With replacement, each draw is independent and has the same probabilities, which makes the maths simpler. In practice, sampling without replacement from a large population is almost the same, because removing one member barely changes the population.

### Worked example

A population has 6 members. How many different samples of size 2 are possible (a) without replacement, (b) with replacement, counting order? Explain why systematic sampling of 2 from 6 (every third member) is not a simple random sample.

1. (a) Choose 2 from 6:

```latex
\binom{6}{2} = 15
```

Each of the 15 samples has probability 1/15 in a simple random sample.

2. (b) 6 choices for each draw: 6 × 6 = 36 ordered samples.
3. Systematic: start at 1, 2 or 3, giving only the samples {1, 4}, {2, 5}, {3, 6}. Each member is equally likely (1/3) to be chosen, but 12 of the 15 subsets are impossible.

### Common mistakes

- Saying "every member has an equal chance" is enough to define a random sample.

## 3.2 Using random number tables or a calculator

*Refs: Edexcel 3.2. Paper 1.*

### What you need to know

- Number the sampling frame (for example 001 to 750). Read random digits in groups of the same length, ignoring numbers outside the range and, for a simple random sample, ignoring repeats.
- A calculator's random integer function (for example RanInt#(1, 750)) does the same job; again, discard repeats for sampling without replacement.

### Explained

Decide in advance where to start in the table and in which direction to read, so you cannot pick a "nice-looking" start. Using three digits for a frame of 750 wastes the numbers 751 to 999 and 000, which is fine; the remaining numbers are still equally likely.

### Worked example

A frame is numbered 001 to 750. The random digits are 4729 1803 5472 6648 0112 9. Choose a simple random sample of 4.

1. Group in threes: 472, 918, 035, 472, 664, 801, 129.
2. 472 (take), 918 (too big, skip), 035 (take), 472 (repeat, skip), 664 (take), 801 (skip), 129 (take).
3. Sample: 472, 35, 664, 129.

### Common mistakes

- Keeping a repeated number in a sample without replacement.
- Reading digit groups of the wrong length.

## 3.3 Random and non-random sampling methods

*Refs: Edexcel 3.3. Paper 1.*

### What you need to know

- **Simple random:** every possible sample of size n is equally likely; needs a full sampling frame.
- **Systematic:** choose a random start between 1 and k, then every kth member, where k = N ÷ n.
- **Cluster:** split the population into naturally occurring groups (schools, streets, batches), choose some clusters at random, then sample all (or a random sample) of each chosen cluster.
- **Judgmental (purposive):** the researcher uses expert judgement to choose members thought to be typical or informative. Non-random.
- **Snowball:** start with a few members of a hard-to-reach population, who recruit others they know, and so on. Non-random. Used for groups with no sampling frame, for example drug users or people with a rare condition.
- **Stratification** (done before sampling): split the population into strata (age groups, departments), then sample randomly within each.
  - Proportional: each stratum's sample size is in the same ratio as its size in the population.
  - Disproportional: some strata are sampled more heavily (often small strata, so there are enough to analyse); estimates for the whole population must then be weighted by the stratum sizes.

```latex
n_h = \frac{N_h}{N} \times n \qquad \text{(proportional allocation)}
```

```latex
\bar{x}_{\text{weighted}} = \frac{\sum N_h \bar{x}_h}{N} \qquad \text{(combining disproportional strata)}
```

### Explained

**Cluster versus stratified.** Strata are different from each other and each is sampled; clusters are meant to be similar mini-populations and only some are sampled. Stratifying improves precision; clustering saves travel and cost but usually reduces precision, because people in the same cluster tend to be alike.

**Why disproportional?** If a company has only 200 night-shift workers out of 2,000, a proportional sample of 50 gives only 5 night workers, too few to say anything about them. Sampling 30 from each shift lets each group be studied, but the night shift is over-represented, so overall averages must be weighted.

### Worked example

A firm has 1,200 day staff, 600 evening staff and 200 night staff. (a) Find a proportional stratified sample of 50. (b) Instead 30 are sampled from each shift, with mean overtime hours 4.2, 5.1 and 7.8. Estimate the mean for the whole firm.

1. (a) N = 2000. Day: 1200/2000 × 50 = 30. Evening: 600/2000 × 50 = 15. Night: 200/2000 × 50 = 5.
2. (b) The plain average (4.2 + 5.1 + 7.8) ÷ 3 = 5.7 over-weights the night shift.

```latex
\bar{x} = \frac{1200(4.2) + 600(5.1) + 200(7.8)}{2000} = \frac{9660}{2000} = 4.83 \text{ hours}
```

### Common mistakes

- Calling cluster sampling "stratified": in cluster sampling only some groups are sampled.
- Forgetting to weight results from a disproportional stratified sample.
- Describing snowball sampling as random.

## 3.4 Advantages and limitations

*Refs: Edexcel 3.4. Paper 1.*

### What you need to know

| Method | Advantages | Limitations |
| --- | --- | --- |
| Simple random | free of selection bias; theory of tests applies | needs a full frame; can be costly; may by chance miss small groups |
| Systematic | simple, spreads the sample over the frame | needs a frame; biased if the list has a pattern with period k |
| Cluster | cheap and practical when the population is spread out; frame only needed for chosen clusters | less precise; clusters may differ from each other |
| Judgmental | quick, uses expertise, good for pilots | not random; depends on the judge; bias cannot be measured |
| Snowball | reaches hidden populations with no frame | not random; people recruit similar people; isolated members missed |
| Stratified | every stratum represented; more precise | needs strata sizes and a frame for each stratum; strata must not overlap |

### Explained

Only random methods allow the sampling error to be measured (standard errors, confidence intervals, tests). That is the main reason to prefer them when a frame exists.

### Worked example

A list of 1,000 flats is ordered floor by floor, 10 flats per floor, with flat 1 on each floor being the corner flat. A sample of 100 is taken by every 10th flat. Explain the risk.

1. k = 1000 ÷ 100 = 10, which matches the 10 flats per floor.
2. Every chosen flat will be in the same position on its floor (for example all corner flats), which may differ in size, rent or noise. The sample is biased by the list's pattern.

### Common mistakes

- Saying systematic sampling is "random" without qualification.

## 3.5 Choosing a method in context

*Refs: Edexcel 3.5. Paper 1.*

### What you need to know

- Choose and justify a method for a given context, such as market research, exit polls, experiments and quality assurance.

### Explained

- **Market research:** often quota or stratified samples by age and gender; stratified random is better if a frame exists.
- **Exit polls:** cluster sampling of polling stations (chosen at random, often stratified by region or past voting pattern), then systematic sampling of every kth voter leaving, which avoids the interviewer choosing whom to ask.
- **Experiments:** random allocation of available subjects to treatments matters more than how the subjects were found (see [12-experimental-design.md](12-experimental-design.md)).
- **Quality assurance:** systematic sampling from a production line (every 50th item) is simple and spreads checks over time; random sampling within each hour (stratified by time) protects against a machine cycle matching k.

### Worked example

A charity wants to survey people who sleep rough in a large city about access to health care. Recommend a method.

1. There is no list of rough sleepers, so simple random, systematic and stratified sampling are not possible.
2. Snowball sampling: start with contacts made through shelters and outreach workers, who introduce others.
3. Limitation: people connected to shelters may have better health care access than those who avoid them, so the sample may be biased; the report should say so.

### Common mistakes

- Recommending a method that needs a sampling frame when none exists.

## 3.6 Practical constraints on collecting unbiased data

*Refs: Edexcel 3.6. Paper 1.*

### What you need to know

- Constraints include cost, time, no available or out-of-date sampling frame, non-response, access, ethics and consent, and destructive testing (testing that destroys the item, so a census is impossible).

### Explained

Non-response is a bias, not just a smaller sample: people who reply to a survey on working hours may be those with the most time. Remedies include follow-up reminders, short questionnaires, incentives and comparing respondents with the population on known variables. An out-of-date frame (last year's electoral roll) misses people who have just moved, often younger people.

### Worked example

A random sample of 400 households is sent a postal survey on internet use; 160 reply. Explain why the results may be biased and give one improvement.

1. Response rate 160 ÷ 400 = 40%. Households who do not reply may differ systematically, for example busier households or those less comfortable with forms.
2. Improvement: follow up non-responders by phone or in person, or offer an online option and compare the age profile of responders with census figures.

### Common mistakes

- Treating non-response as only a loss of sample size.

## Check questions

1. Explain the difference between a simple random sample and an unrestricted random sample. [2 marks]
2. Members of a club are numbered 01 to 80. Use the random digits 8 3 1 7 9 0 0 5 1 7 4 4 6 2 to choose a simple random sample of 4. [3 marks]
3. A school has 420 pupils in Key Stage 3, 300 in Key Stage 4 and 180 in the sixth form. Find the numbers from each in a proportional stratified sample of 60. [3 marks]
4. A disproportional sample of 20 per key stage in question 3 gives mean screen times of 3.5, 4.0 and 4.6 hours. Estimate the mean screen time for the school. [3 marks]
5. Explain why an exit poll might use cluster sampling followed by systematic sampling. [3 marks]
6. Give one advantage and one disadvantage of judgmental sampling. [2 marks]
7. A light bulb maker tests lifetimes by running bulbs until they fail. Explain why a sample is used rather than a census. [1 mark]

## Mark scheme

1. Simple random: without replacement, each member at most once (1); unrestricted: with replacement, so a member may be chosen more than once (1).
2. Pairs 83, 17, 90, 05, 17, 44, 62 (1); reject 83 and 90 (out of range) and the repeated 17 (1); sample 17, 05, 44, 62 (1).
3. N = 900 (1); 420/900 × 60 = 28, 300/900 × 60 = 20 (1); 180/900 × 60 = 12 (1).
4. Weighted: (420 × 3.5 + 300 × 4.0 + 180 × 4.6) ÷ 900 (1) = (1470 + 1200 + 828) ÷ 900 (1) = 3.89 hours (1).
5. No list of voters leaving is available (1); polling stations are natural clusters, so only some need staffing, saving cost (1); asking every kth voter removes interviewer choice of whom to ask (1).
6. Advantage: quick, uses expert knowledge, good for a pilot (1). Disadvantage: not random, depends on the judge's bias, sampling error cannot be estimated (1).
7. Testing destroys the bulbs, so a census would leave none to sell (1).
