---
level: GCSE
subject: Statistics
topic: "Probability"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8382"
    spec_refs: ["3.4.9", "3.5.1", "3.5.2", "3.5.3", "3.5.4", "3.5.5", "3.5.6", "3.5.11", "3.5.12", "3.5.25"]
  - board: Edexcel
    code: "1ST0"
    spec_refs: ["3p.01", "3p.02", "3p.03", "3p.04", "3p.05", "3p.06", "3p.07", "3p.08", "3p.09", "3p.10"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/statistics/gcse/statistics-8382/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/past-papers/gcse-statistics/
---

# Probability

This file covers estimating probabilities from data (relative frequency), the probability scale, expected frequency, absolute and relative risk, comparing experimental and theoretical results to detect bias, two-way tables, sample space diagrams, tree diagrams and Venn diagrams for up to three events, mutually exclusive and exhaustive events, the addition and multiplication laws, and the notation for independent and conditional probability. The binomial and normal distributions are in file 14.

## Overview

All on both tiers except: (HT only) commenting on differences between experimental and theoretical values in terms of possible bias (AQA 3.5.25, Edexcel 3p.10, for example against a binomial model), and on Edexcel (HT only) the general addition law.

### Board differences

- AQA 8382: 3.4.9 (D7) estimates from data; 3.5.1 to 3.5.6 (E1a to E2c); 3.5.11 (E4a) and 3.5.12 (E4b) notation; 3.5.25 (E10a) Higher only. AQA lists the probability scale with fractions, decimals and percentages.
- Edexcel 1ST0: 3p.01 to 3p.09 on both tiers; 3p.10 Higher only. Edexcel expects the words of likelihood (certain, likely, evens, unlikely, impossible), the terms mutually exclusive and exhaustive, the addition law P(A or B) = P(A) + P(B), and (HT only) the general addition law. Edexcel states the conditional probability formula must be known.
- Neither board requires formal significance tests.

## 3.4.9, 3.5.5 / 3p.01, 3p.06 Relative frequency and estimating probability

*Refs: AQA 3.4.9 (D7), 3.5.5 (E2b) · Edexcel 3p.01, 3p.06. Tier: F & H.*

### What you need to know

- Estimate a probability from data using relative frequency:

```latex
\text{relative frequency} = \frac{\text{number of times the event happens}}{\text{number of trials}}
```

- As the number of trials increases, the relative frequency tends towards the theoretical probability (when outcomes are random).
- Larger samples give better estimates of probabilities and of population values.
- Estimate probabilities from relative frequency tables and diagrams.

### Explained

A relative frequency graph plotted against the number of trials jumps about at first and then settles down near a value. That value is the best estimate of the probability.

### Worked example

A drawing pin is dropped 250 times and lands point up 95 times. Estimate the probability it lands point up.

1. 95 ÷ 250 = 0.38.

Relative frequencies after 10, 50, 200 and 1000 spins of a spinner landing on red are 0.5, 0.36, 0.31 and 0.30. Which gives the best estimate, and is the spinner fair if it has 3 equal sections, one red?

1. 0.30 from 1000 spins is best (most trials).
2. A fair spinner would give 1/3 ≈ 0.33. 0.30 from 1000 spins is quite close but a little low, so there may be slight bias; more spins would help decide.

### Common mistakes

- Trusting the estimate from the fewest trials.

## 3.5.1 / 3p.02 The probability scale

*Refs: AQA 3.5.1 (E1a) · Edexcel 3p.02. Tier: F & H.*

### What you need to know

- Probabilities run from 0 (impossible) to 1 (certain), or 0% to 100%, written as fractions, decimals or percentages.
- Words: impossible, very unlikely, unlikely, evens (0.5), likely, very likely, certain.
- P(not A) = 1 − P(A).

### Worked example

The probability it rains tomorrow is 35%. Find the probability it does not rain, and describe it in words.

1. 100% − 35% = 65% (0.65).
2. Likely.

### Common mistakes

- Writing probabilities as ratios ("2:5") or as numbers above 1.

## 3.5.2 / 3p.03 Expected frequency

*Refs: AQA 3.5.2 (E1b) · Edexcel 3p.03. Tier: F & H.*

### What you need to know

- Expected frequency = probability × number of trials (or × population size).

### Worked example

The probability that a person in a town has blood group O is 0.46. In a sample of 350 people, how many would you expect to have group O?

1. 0.46 × 350 = 161.

### Common mistakes

- Dividing instead of multiplying.

## 3.5.3 / 3p.04 Absolute and relative risk

*Refs: AQA 3.5.3 (E1c) · Edexcel 3p.04. Tier: F & H.*

### What you need to know

- Absolute risk: the probability of an event in a group (number affected ÷ number in the group).
- Relative risk: compares the risk in two groups:

```latex
\text{relative risk} = \frac{\text{risk in group A}}{\text{risk in group B}}
```

- Express risks as expected frequencies, for example "about 6 in every 100 people".

### Explained

A relative risk of 2 means group A is twice as likely to have the event as group B. A relative risk can sound alarming even when the absolute risk is tiny: doubling a 1-in-10 000 risk still leaves it at 2 in 10 000.

### Worked example

Of 400 learner drivers taught by Instructor P, 252 passed first time. Of 300 taught by Instructor Q, 162 passed first time.

1. Absolute risk (probability) of passing with P: 252 ÷ 400 = 0.63.
2. With Q: 162 ÷ 300 = 0.54.
3. Relative risk of passing with P compared with Q: 0.63 ÷ 0.54 = 1.17. Learners with P were about 1.17 times as likely to pass first time.
4. As expected frequencies: about 63 in every 100 with P pass, against 54 in every 100 with Q.

### Common mistakes

- Comparing the numbers who passed (252 and 162) rather than proportions, when the groups are different sizes.
- Quoting relative risk without the absolute risk.

## 3.5.4, 3.5.25 / 3p.05, 3p.10 Experimental against theoretical: bias

*Refs: AQA 3.5.4 (E2a), 3.5.25 (E10a) · Edexcel 3p.05, 3p.10. Tier: F & H (3.5.25 and 3p.10 Higher only).*

### What you need to know

- Compare experimental results with theoretical predictions to judge whether an experiment, coin, dice or spinner might be biased.
- (HT only) Comment on the size of differences between experimental and theoretical values (for example, observed frequencies against expected frequencies from a binomial model) in terms of possible bias. No formal tests.

### Explained

Some difference from the expected values is normal because of chance. A big difference over many trials suggests bias. Over few trials, even a large difference may be chance, so say "may be biased" and suggest more trials.

### Worked example

A dice is rolled 600 times: 1 (88), 2 (97), 3 (102), 4 (95), 5 (91), 6 (127). Is it fair?

1. Expected frequency for each score if fair: 600 × 1/6 = 100.
2. Most are close to 100, but 6 appears 127 times, 27 more than expected over a large number of rolls.
3. The dice may be biased towards 6.

(HT only) Three coins are tossed 80 times and the number of heads recorded: 0 heads (4), 1 head (22), 2 heads (31), 3 heads (23). The binomial model for fair coins gives probabilities 1/8, 3/8, 3/8, 1/8 (see file 14). Comment.

1. Expected: 10, 30, 30, 10.
2. Observed 3 heads 23 times against 10 expected, and 0 heads only 4 against 10.
3. Far more heads than expected over 80 trials, so the coins may be biased towards heads.

### Common mistakes

- Expecting the results to match the theory exactly.

## 3.5.6 / 3p.07 Diagrams for outcomes

*Refs: AQA 3.5.6 (E2c) · Edexcel 3p.07. Tier: F & H (part Higher only on Edexcel).*

### What you need to know

- Use two-way tables, sample space diagrams (systematic lists or grids), tree diagrams and Venn diagrams to show all outcomes for up to three events, and find probabilities from them.
- Mutually exclusive events cannot happen together. Exhaustive events cover all possible outcomes. Probabilities of mutually exclusive and exhaustive events add to 1.
- Addition law for mutually exclusive events: P(A or B) = P(A) + P(B).
- (HT only, Edexcel) General addition law: P(A or B) = P(A) + P(B) − P(A and B).

### Explained

A sample space diagram for two dice is a 6 by 6 grid of 36 equally likely outcomes. For tree diagrams, multiply along the branches and add the results of the branches you want. Venn diagrams with three circles have eight regions (including outside all three); fill the centre first and work outwards.

### Worked example

Sample space: two fair spinners, one numbered 1 to 3 and one numbered 1 to 4, are spun and the scores added. Find P(total = 5).

1. Outcomes: 3 × 4 = 12.
2. Totals of 5: (1, 4), (2, 3), (3, 2). That is 3 outcomes.
3. P = 3/12 = 1/4.

Tree diagram: a bag has 4 green and 6 blue counters. One is taken and not replaced, then another. Find P(one of each colour).

1. P(G then B) = 4/10 × 6/9 = 24/90.
2. P(B then G) = 6/10 × 4/9 = 24/90.
3. Total = 48/90 = 8/15.

Three-circle Venn diagram: 60 students; 30 play football (F), 25 tennis (T), 20 swim (S). 8 do F and T, 6 do F and S, 5 do T and S, and 3 do all three. Find P(a student does none).

1. All three: 3.
2. F and T only: 8 − 3 = 5. F and S only: 6 − 3 = 3. T and S only: 5 − 3 = 2.
3. F only: 30 − 5 − 3 − 3 = 19. T only: 25 − 5 − 2 − 3 = 15. S only: 20 − 3 − 2 − 3 = 12.
4. Total in circles: 3 + 5 + 3 + 2 + 19 + 15 + 12 = 59.
5. None: 60 − 59 = 1, so P = 1/60.

(HT only, Edexcel) P(A) = 0.5, P(B) = 0.4, P(A and B) = 0.15. Find P(A or B).

1. 0.5 + 0.4 − 0.15 = 0.75.

### Common mistakes

- Adding along tree branches instead of multiplying.
- Forgetting to change the second-branch probabilities when items are not replaced.
- Using P(A) + P(B) for events that are not mutually exclusive.

## 3.5.11 / 3p.08 Independent events

*Refs: AQA 3.5.11 (E4a) · Edexcel 3p.08. Tier: F & H.*

### What you need to know

- Events are independent if one happening does not change the probability of the other.
- Multiplication law for independent events: P(A and B) = P(A) × P(B).
- Notation: P(A | B) means "the probability of A given that B has happened". For independent events P(A | B) = P(A) and P(B | A) = P(B).
- To test independence, check whether P(A and B) = P(A) × P(B).

### Worked example

In a survey of 200 people, 80 wear glasses, 50 are left-handed, and 20 both wear glasses and are left-handed. Are wearing glasses and being left-handed independent?

1. P(G) = 80/200 = 0.4. P(L) = 50/200 = 0.25.
2. P(G) × P(L) = 0.1.
3. P(G and L) = 20/200 = 0.1.
4. They are equal, so the events are independent (in this sample).

### Common mistakes

- Confusing independent with mutually exclusive. Mutually exclusive events cannot both happen, so they are never independent (unless one has probability 0).

## 3.5.12 / 3p.09 Conditional probability

*Refs: AQA 3.5.12 (E4b) · Edexcel 3p.09. Tier: F & H.*

### What you need to know

- Conditional probability is the probability of an event given that another has happened:

```latex
P(B \mid A) = \frac{P(A \text{ and } B)}{P(A)}
```

- Find conditional probabilities from two-way tables, Venn diagrams, sample space diagrams and tree diagrams: restrict attention to the "given" group.

### Worked example

A two-way table of 150 students:

| | Walks | Bus | Total |
| --- | --- | --- | --- |
| Year 10 | 36 | 44 | 80 |
| Year 11 | 30 | 40 | 70 |
| Total | 66 | 84 | 150 |

Find P(walks | Year 11).

1. Given Year 11, there are 70 students; 30 walk.
2. P = 30/70 = 3/7.

Find P(Year 11 | walks).

1. 66 students walk; 30 are in Year 11.
2. P = 30/66 = 5/11.

Using the formula: P(A) = 0.6, P(A and B) = 0.15. Find P(B | A).

1. 0.15 ÷ 0.6 = 0.25.

Tree diagram backwards: P(late) = 0.2. If late, P(misses breakfast) = 0.7; if not late, P(misses breakfast) = 0.1. Find P(late | misses breakfast).

1. P(late and misses) = 0.2 × 0.7 = 0.14.
2. P(not late and misses) = 0.8 × 0.1 = 0.08.
3. P(misses) = 0.22.
4. P(late | misses) = 0.14 ÷ 0.22 = 7/11 ≈ 0.636.

### Common mistakes

- Dividing by the grand total instead of the "given" total.
- Mixing up P(A | B) and P(B | A).

## Check questions

1. A biased coin is tossed 400 times and lands heads 248 times. Estimate the probability of heads, and the number of heads expected in 1500 tosses. [2 marks]
2. The probability that a battery is faulty is 0.03. How many faulty batteries would you expect in a box of 250? [1 mark]
3. In a trial, 12 of 800 people taking a medicine had a side effect, against 4 of 800 taking a dummy pill. Find the relative risk and explain what it means, using the absolute risks. [3 marks]
4. A spinner with 5 equal sections numbered 1 to 5 is spun 200 times and lands on 5 a total of 61 times. Is the spinner fair? Explain. [2 marks]
5. Two fair dice are rolled. Find the probability the total is 9. [2 marks]
6. A bag has 5 red and 3 yellow sweets. Two are taken without replacement. Find the probability both are the same colour. [3 marks]
7. P(A) = 0.3, P(B) = 0.5 and A and B are independent. Find P(A and B), and write down P(A | B). [2 marks]
8. In a group of 90 people, 40 have a cat, 35 have a dog, and 12 have both. Find P(has a dog | has a cat). [2 marks]
9. (HT only, Edexcel) P(X) = 0.45, P(Y) = 0.35, P(X or Y) = 0.6. Find P(X and Y). Are X and Y mutually exclusive? [2 marks]

## Mark scheme

1. 248/400 = 0.62 (1); 0.62 × 1500 = 930 (1).
2. 0.03 × 250 = 7.5, so about 7 or 8 (1).
3. Absolute risks 12/800 = 0.015 and 4/800 = 0.005 (1); relative risk 3 (1); people taking the medicine were 3 times as likely to have a side effect, but it was still only 15 in every 1000 (1).
4. Expected 200 × 1/5 = 40 (1); 61 is much more than 40 over 200 spins, so the spinner is probably biased towards 5 (1).
5. Outcomes (3, 6), (4, 5), (5, 4), (6, 3): 4 out of 36 (1) = 1/9 (1).
6. P(RR) = 5/8 × 4/7 = 20/56 (1); P(YY) = 3/8 × 2/7 = 6/56 (1); total 26/56 = 13/28 (1).
7. 0.3 × 0.5 = 0.15 (1); P(A | B) = 0.3 (1).
8. 12 out of the 40 cat owners (1) = 12/40 = 0.3 (1).
9. 0.45 + 0.35 − 0.6 = 0.2 (1); no, because P(X and Y) is not 0 (1).
