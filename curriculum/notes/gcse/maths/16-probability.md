---
level: GCSE
subject: Mathematics
topic: "Probability"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8300"
    spec_refs: ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"]
  - board: Edexcel
    code: "1MA1"
    spec_refs: ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"]
  - board: OCR
    code: "J560"
    spec_refs: ["11.01a", "11.01b", "11.01c", "11.01d", "11.02a", "11.02c", "11.02d", "11.02e", "11.02f"]
  - board: Eduqas
    code: "C300QS"
    spec_refs: ["FP1", "FP2", "FP3", "FP4", "FP5", "FP6", "FP7", "FP8", "HP1", "HP2", "HP3", "HP4", "HP5", "HP6", "HP7", "HP8", "HP9"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/gcse/mathematics-8300/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/mathematics-2015.html
  OCR: https://www.ocr.org.uk/qualifications/gcse/mathematics-j560-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/mathematics-gcse/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/gcse-maths/
---

# Probability

This file covers the probability scale, relative frequency and experiments, frequency trees, expected outcomes, outcomes that add to 1, sample spaces, Venn diagrams and set notation, tree diagrams, independent and dependent events, and conditional probability.

## Overview

P1 to P8 are on both tiers, including tree diagrams for independent and dependent events. Conditional probability (P9) is Higher only.

### Board differences

- AQA and Edexcel: P1 to P9.
- OCR J560: 11.01 (probability scale, relative frequency, equally likely outcomes) and 11.02 (sample spaces, Venn diagrams and sets, tree diagrams, the addition and multiplication laws). OCR names the addition law (P(A or B) = P(A) + P(B) for mutually exclusive events) and the multiplication law as separate statements. OCR 11.02b (enumeration and the product rule) is in [01-number-structure-and-calculation.md](01-number-structure-and-calculation.md).
- Eduqas C300QS: FP1 to FP8 on Foundation; HP1 to HP9 on Higher.
- Set notation (∪, ∩, ′, ξ) is used by all boards with Venn diagrams; it is most often examined on Higher.

## P1 Recording outcomes and frequency trees

*Refs: AQA P1 · Edexcel P1 · OCR 11.01b · Eduqas FP1, HP1. Tier: F & H.*

### What you need to know

- Record, describe and analyse the frequency of outcomes of probability experiments, using tables and frequency trees.

### Explained

A frequency tree shows how a total splits into groups, then subgroups. Each branch shows a number of people or items, not a probability. The numbers on the branches from one point add up to the number at that point.

### Worked example

80 students sit a test. 35 are boys. 28 of the boys pass. 12 of the girls fail. Complete a frequency tree and find how many students pass.

1. Girls: 80 − 35 = 45.
2. Boys: 28 pass, 7 fail. Girls: 45 − 12 = 33 pass, 12 fail.
3. Total passing: 28 + 33 = 61.

### Common mistakes

- Writing probabilities on a frequency tree, or frequencies that do not add up.

## P2 Randomness, fairness and expected outcomes

*Refs: AQA P2 · Edexcel P2 · OCR 11.01d · Eduqas FP2, HP2. Tier: F & H.*

### What you need to know

- Apply ideas of randomness, fairness and equally likely events to calculate expected outcomes of multiple future experiments.

```latex
\text{expected frequency} = \text{probability} \times \text{number of trials}
```

### Explained

If all outcomes are equally likely, P(event) = number of favourable outcomes ÷ total number of outcomes. A fair dice or coin has equally likely outcomes; a biased one does not.

Expected frequency is what you would expect on average; the actual number will vary.

### Worked example

A fair six-sided dice is rolled 240 times. How many times would you expect a number greater than 4?

1. P(5 or 6) = 2/6 = 1/3.
2. Expected: 1/3 × 240 = 80.

### Common mistakes

- Saying the expected result will definitely happen.

## P3 Relative frequency and the probability scale

*Refs: AQA P3 · Edexcel P3 · OCR 11.01a, 11.01c · Eduqas FP3, HP3. Tier: F & H.*

### What you need to know

- Probabilities go from 0 (impossible) to 1 (certain), written as fractions, decimals or percentages.
- Relative frequency (experimental probability) = number of times an event happens ÷ number of trials.
- Relate relative expected frequencies to theoretical probability.

### Explained

Words on the scale: impossible (0), unlikely, even chance (0.5), likely, certain (1).

Relative frequency is an estimate of probability from an experiment. Theoretical probability comes from equally likely outcomes. They are rarely exactly equal.

### Worked example

A drawing pin lands point up 37 times in 50 throws. Estimate the probability it lands point up, and how many times it would land point up in 400 throws.

1. Relative frequency: 37/50 = 0.74.
2. Expected: 0.74 × 400 = 296.

### Common mistakes

- Writing a probability as a ratio (3 : 5) or as "3 in 5". Use a fraction, decimal or percentage.
- Giving a probability greater than 1.

## P4 Exhaustive and mutually exclusive outcomes

*Refs: AQA P4 · Edexcel P4 · OCR 11.02e · Eduqas FP4, HP4. Tier: F & H.*

### What you need to know

- The probabilities of an exhaustive set of mutually exclusive outcomes add up to 1.
- So P(not A) = 1 − P(A).
- For mutually exclusive events, P(A or B) = P(A) + P(B).

### Explained

Mutually exclusive means the events cannot happen at the same time (rolling a 2 and rolling a 5 on one roll). Exhaustive means they cover every possible outcome.

### Worked example

A spinner can land on red, blue, green or yellow. P(red) = 0.3, P(blue) = 0.25 and P(green) = P(yellow). Find P(yellow).

1. 1 − 0.3 − 0.25 = 0.45.
2. Green and yellow share 0.45 equally: P(yellow) = 0.225.

A bag has red, white and black counters. P(red) = 2/9 and P(white) = 1/3. Find the probability of not black.

1. P(not black) = P(red or white) = 2/9 + 3/9 = 5/9.

### Common mistakes

- Adding probabilities of events that can happen together.

## P5 Large samples and theoretical probability

*Refs: AQA P5 · Edexcel P5 · OCR 11.01c · Eduqas FP5, HP5. Tier: F & H.*

### What you need to know

- Empirical unbiased samples tend towards the theoretical probability as the sample size increases.

### Explained

The more trials you do, the more reliable the relative frequency is as an estimate. Ten throws of a fair coin could easily give 7 heads; 10 000 throws will give very close to half heads. To judge whether a dice is biased, compare the relative frequency over a large number of throws with the theoretical probability.

### Worked example

Two students test a dice. Amir rolls it 20 times and gets six 4 times. Beth rolls it 500 times and gets six 140 times. Whose results are more reliable, and is the dice biased?

1. Beth's: more trials.
2. Her relative frequency is 140/500 = 0.28. A fair dice gives 1/6 ≈ 0.167. The large difference over 500 rolls suggests the dice is biased towards six.

### Common mistakes

- Combining or trusting a small sample over a large one.

## P6 Enumerating sets: tables, grids, Venn diagrams and trees

*Refs: AQA P6 · Edexcel P6 · OCR 11.02a, 11.02c, 11.02d · Eduqas FP6, HP6. Tier: F & H.*

### What you need to know

- List outcomes systematically using tables, grids, Venn diagrams and tree diagrams.
- Set notation: ξ is the universal set (everything); A ∩ B is "A and B" (the overlap); A ∪ B is "A or B or both"; A′ is "not A".

### Explained

Fill in a Venn diagram from the middle outwards: the overlap first, then the rest of each circle, then the region outside both circles.

Adding the two circles counts the overlap twice, so

```latex
P(A \cup B) = P(A) + P(B) - P(A \cap B)
```

### Worked example

Of 50 people, 28 like tea, 22 like coffee and 9 like both. How many like neither?

1. Overlap: 9. Tea only: 19. Coffee only: 13.
2. Neither: 50 − 9 − 19 − 13 = 9.
3. P(person likes tea but not coffee) = 19/50.

ξ = {1, 2, …, 12}, A = multiples of 3, B = even numbers. List A ∩ B and A ∪ B.

1. A = {3, 6, 9, 12}; B = {2, 4, 6, 8, 10, 12}.
2. A ∩ B = {6, 12}.
3. A ∪ B = {2, 3, 4, 6, 8, 9, 10, 12}.

### Common mistakes

- Writing 28 in the tea circle without taking off the overlap.
- Confusing ∩ (and) with ∪ (or).

## P7 Sample spaces

*Refs: AQA P7 · Edexcel P7 · OCR 11.01d, 11.02a · Eduqas FP7, HP7. Tier: F & H.*

### What you need to know

- Construct sample spaces (possibility spaces) for single and combined experiments with equally likely outcomes, and use them to find theoretical probabilities.

### Explained

A two-way grid is the clearest sample space for two dice or two spinners: one along the top, one down the side, with every combination in the middle.

### Worked example

Two fair dice are rolled and the scores added. Find the probability of a total of 8.

1. 36 equally likely outcomes.
2. Totals of 8: (2, 6), (3, 5), (4, 4), (5, 3), (6, 2): 5 outcomes.
3. P(8) = 5/36.

### Common mistakes

- Counting (3, 5) and (5, 3) as one outcome.

## P8 Independent and dependent events; tree diagrams

*Refs: AQA P8 · Edexcel P8 · OCR 11.02f · Eduqas FP8, HP8. Tier: F & H.*

### What you need to know

- Calculate probabilities of independent and dependent combined events, including with tree diagrams.
- Independent events: the outcome of one does not affect the other. P(A and B) = P(A) × P(B).
- Dependent events, such as picking without replacement: the second probability changes.

### Explained

On a tree diagram:

- Multiply along branches to find P(this and then that).
- Add the results of different branches for "or".
- The branches from each point add up to 1.

Without replacement, both the number of the chosen colour and the total go down by one on the second pick.

"At least one" questions: P(at least one) = 1 − P(none).

### Worked example

A bag has 5 red and 3 green counters. Two are taken without replacement. Find the probability they are the same colour.

1. P(R, R) = 5/8 × 4/7 = 20/56.
2. P(G, G) = 3/8 × 2/7 = 6/56.
3. P(same) = 26/56 = 13/28.

The probability it rains on a given day is 0.3, independently. Find the probability that it rains on at least one of two days.

1. P(no rain on both) = 0.7 × 0.7 = 0.49.
2. P(at least one) = 1 − 0.49 = 0.51.

### Common mistakes

- Adding along branches instead of multiplying.
- Not changing the second probabilities when there is no replacement.
- Forgetting there are two ways to get "one of each".

## P9 Conditional probability

*Refs: AQA P9 · Edexcel P9 · OCR 11.02c, 11.02d, 11.02f · Eduqas HP9. Tier: Higher only.*

### What you need to know

- (HT only) Calculate and interpret conditional probabilities using expected frequencies with two-way tables, tree diagrams and Venn diagrams.
- (HT only) P(A given B), written P(A | B), is the probability of A when you already know B has happened.

```latex
P(A \mid B) = \frac{P(A \cap B)}{P(B)}
```

### Explained

(HT only) "Given" narrows the group you are choosing from. In a table or Venn diagram, the denominator becomes the total of the "given" group, not the grand total.

(HT only) On a tree diagram, the second set of branches are already conditional: they show the probability of the second event given the first.

### Worked example

(HT only) In a group of 120 students, 70 study French, 45 study Spanish and 20 study both. A student is chosen at random from those who study Spanish. Find the probability they also study French.

1. Given Spanish: 45 students. Of those, 20 study French.
2. P(French | Spanish) = 20/45 = 4/9.

(HT only) A test for a condition gives a positive result for 90% of people who have it and for 5% of people who do not. 2% of a population have it. Use 10 000 people to find the probability that a person who tests positive has the condition.

1. Have it: 200. Of these, 180 test positive.
2. Do not have it: 9800. Of these, 490 test positive.
3. Total positive: 670. P(has it | positive) = 180/670 = 0.269 (3 s.f.).

(HT only) A bag has x red and 4 blue sweets. Two are taken without replacement. P(both red) = 1/3. Find x.

1. x/(x + 4) × (x − 1)/(x + 3) = 1/3.
2. 3x(x − 1) = (x + 4)(x + 3), so 3x² − 3x = x² + 7x + 12.
3. 2x² − 10x − 12 = 0, so x² − 5x − 6 = 0, (x − 6)(x + 1) = 0, x = 6.

### Common mistakes

- (HT only) Dividing by the grand total instead of the "given" total.
- (HT only) Confusing P(A | B) with P(B | A).

## Check questions

1. In 200 spins, a spinner lands on blue 46 times. Estimate the probability of blue, and the expected number of blues in 1500 spins. [2 marks]
2. P(a train is late) = 0.12. What is the probability it is not late? [1 mark]
3. A bag holds only red, blue and white beads. P(red) = 0.35 and P(blue) = 0.4. There are 30 white beads. How many beads are there in total? [3 marks]
4. Two fair four-sided spinners, numbered 1 to 4, are spun and the scores multiplied. Find the probability that the product is even. [2 marks]
5. 60 people were asked about pets: 26 have a dog, 18 have a cat, and 25 have neither. How many have both? [2 marks]
6. A coin is biased so P(heads) = 0.6. It is thrown twice. Find P(exactly one head). [3 marks]
7. A box has 4 white and 6 black socks. Two are taken without replacement. Find P(at least one white). [3 marks]
8. A sample space for spinning a coin and rolling a dice has how many outcomes? List those with a head and an even number. [2 marks]
9. 100 people: 55 are adults; 30 of the adults and 15 of the children wear glasses. Draw a frequency tree and find the fraction of glasses-wearers who are children. [3 marks]
10. (HT only) Using question 5, a person with a cat is chosen at random. Find the probability they also have a dog. [2 marks]
11. (HT only) P(A) = 0.5, P(B) = 0.4 and P(A ∩ B) = 0.2. Find P(A ∪ B) and P(B | A). [3 marks]

## Mark scheme

1. 46/200 = 0.23 (1); 0.23 × 1500 = 345 (1).
2. 0.88 (1).
3. P(white) = 0.25 (1); 0.25 of the total = 30 (1); total 120 (1).
4. 12 of the 16 products are even (1); 12/16 = 3/4 (1).
5. 60 − 25 = 35 have at least one (1); 26 + 18 − 35 = 9 have both (1).
6. P(HT) + P(TH) = 0.6 × 0.4 + 0.4 × 0.6 (2); 0.48 (1).
7. P(no white) = 6/10 × 5/9 = 30/90 (2); 1 − 1/3 = 2/3 (1).
8. 12 outcomes (1); H2, H4, H6 (1).
9. Correct tree: adults 55 (30 glasses, 25 not), children 45 (15 glasses, 30 not) (1); 45 wear glasses (1); 15/45 = 1/3 (1).
10. 9 have both, 18 have a cat (1); 9/18 = 1/2 (1).
11. P(A ∪ B) = 0.5 + 0.4 − 0.2 = 0.7 (1); P(B | A) = 0.2 ÷ 0.5 (1) = 0.4 (1).
