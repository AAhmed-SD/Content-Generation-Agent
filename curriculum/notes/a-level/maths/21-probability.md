---
level: A-level
subject: Mathematics
topic: "Probability"
as_content: "Mutually exclusive and independent events, with diagrams, are AS. Conditional probability (including the formula) and modelling with probability are A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["M1", "M2", "M3"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["S3.1", "S3.2", "S3.3"]
  - board: OCR
    code: "H240"
    spec_refs: ["2.03a", "2.03b", "2.03c", "2.03d", "2.03e"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Mu1", "Mu2", "Mu3", "Mu4", "Mu5", "Mu6", "Mu7", "MR13"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Probability

This file covers the language and notation of events, mutually exclusive and independent events, Venn diagrams, tree diagrams and two-way tables, conditional probability, and modelling with probability.

## Overview

AS: mutually exclusive and independent events, and using diagrams to calculate probabilities. A-level only: conditional probability with the formula P(A|B) = P(A ∩ B)/P(B), testing independence with it, and modelling with probability.

### Board differences

- AQA M1 to M3; Edexcel Statistics 3.1 to 3.3.
- OCR H240: 2.03a, 2.03b (AS); 2.03c to 2.03e (A-level only).
- OCR MEI H640: Mu1 to Mu3 (AS); Mu4 to Mu7 (A-level only). In MEI, Venn diagrams and the general addition rule are in the A-level part (Mu4, Mu5); in OCR H240 diagrams are AS (2.03b). MR13 (modelling with probability and distributions) is also covered here and in file 22.

## M1 Mutually exclusive and independent events

*Refs: AQA M1 · Edexcel Statistics 3.1 · OCR 2.03a, 2.03b · MEI Mu1, Mu2, Mu3, Mu4, Mu5. Level: AS & A.*

### What you need to know

- Notation: A ∩ B (A and B), A ∪ B (A or B or both), A′ (not A).
- Mutually exclusive events cannot happen together: P(A ∩ B) = 0, so P(A ∪ B) = P(A) + P(B).
- Independent events do not affect each other: P(A ∩ B) = P(A) × P(B).
- The general addition rule:

```latex
P(A \cup B) = P(A) + P(B) - P(A \cap B)
```

- Use Venn diagrams, tree diagrams, sample space diagrams and two-way tables.
- Link to distributions: for a discrete distribution, add probabilities of separate outcomes; for a continuous one, probabilities are areas under a curve.

### Explained

**Venn diagrams.** Fill in from the middle outwards: put P(A ∩ B) in the overlap first, then the rest of each circle, then the region outside both. The whole rectangle has probability 1.

**Tree diagrams.** Multiply along branches for "and"; add the end results of different branches for "or". Branches from each point add to 1.

**Mutually exclusive versus independent.** They are different ideas. Two events with non-zero probabilities cannot be both: if they are mutually exclusive, knowing one happened tells you the other did not, so they are dependent.

**Testing independence.** Check whether P(A ∩ B) = P(A) × P(B).

### Worked example

P(A) = 0.4 and P(B) = 0.3. Find P(A ∪ B) if (a) A and B are mutually exclusive; (b) A and B are independent.

1. (a) 0.4 + 0.3 = 0.7.
2. (b) P(A ∩ B) = 0.12, so P(A ∪ B) = 0.4 + 0.3 − 0.12 = 0.58.

P(A) = 0.5, P(B) = 0.35 and P(A ∪ B) = 0.65. Find P(A ∩ B) and decide whether A and B are independent.

1. 0.65 = 0.5 + 0.35 − P(A ∩ B), so P(A ∩ B) = 0.2.
2. P(A) × P(B) = 0.175 ≠ 0.2, so A and B are not independent.
3. Venn regions: A only 0.3, overlap 0.2, B only 0.15, outside 0.35.

A bag has 5 red and 3 blue counters. Two are taken without replacement. Find P(both the same colour).

1. P(RR) = 5/8 × 4/7 = 20/56. P(BB) = 3/8 × 2/7 = 6/56.
2. P(same) = 26/56 = 13/28.

### Common mistakes

- Adding probabilities of events that are not mutually exclusive.
- Assuming independence without being told or checking.
- Forgetting the region outside both circles in a Venn diagram.

## M2 Conditional probability

*Refs: AQA M2 · Edexcel Statistics 3.2 · OCR 2.03c, 2.03d · MEI Mu6, Mu7. Level: A-level only.*

### What you need to know

- (A-level only) P(A | B) means the probability of A given that B has happened.

```latex
P(A \mid B) = \frac{P(A \cap B)}{P(B)} \qquad P(A \cap B) = P(A \mid B)\,P(B)
```

- (A-level only) Use tree diagrams, Venn diagrams and two-way tables for conditional probability.
- (A-level only) A and B are independent if and only if P(A | B) = P(A) (equivalently P(B | A) = P(B)).

### Explained

"Given B" shrinks the sample space to B. On a Venn diagram, P(A | B) is the overlap divided by the whole of circle B. In a two-way table, it is the cell divided by the row (or column) total for B.

On a tree diagram, the second set of branches already are conditional probabilities. To reverse the condition (find P(first | second)), work out P(second) by adding all routes to it, then divide.

### Worked example

(A-level only) Using P(A) = 0.5, P(B) = 0.35, P(A ∩ B) = 0.2 from above, find P(A | B) and P(B | A′).

1. P(A | B) = 0.2/0.35 = 4/7.
2. P(B ∩ A′) = 0.15 and P(A′) = 0.5, so P(B | A′) = 0.3.

(A-level only) 120 students: 55 take Physics. Of the 50 who take Chemistry, 30 also take Physics. One student is picked at random. Find P(Physics | Chemistry) and decide whether taking the two subjects is independent.

1. P(Physics | Chemistry) = 30/50 = 0.6.
2. P(Physics) = 55/120 = 0.458. These differ, so the events are not independent.

(A-level only) In the counter example (5 red, 3 blue, two taken without replacement), find P(first red | both the same colour).

1. P(RR) = 20/56. P(same) = 26/56.
2. P(first red | same) = (20/56)/(26/56) = 10/13.

(A-level only) 2% of people have a condition. A test is positive for 95% of people with the condition and for 10% of people without it. Find the probability that someone who tests positive has the condition.

1. P(condition and positive) = 0.02 × 0.95 = 0.019.
2. P(no condition and positive) = 0.98 × 0.10 = 0.098.
3. P(positive) = 0.117.
4. P(condition | positive) = 0.019/0.117 = 0.162.
5. Most positive results are false positives, because the condition is rare.

### Common mistakes

- (A-level only) Confusing P(A | B) with P(B | A).
- (A-level only) Dividing by P(A) instead of P(B) in P(A | B).
- (A-level only) Using the "with replacement" probabilities when items are not replaced.

## M3 Modelling with probability

*Refs: AQA M3 · Edexcel Statistics 3.3 · OCR 2.03e · MEI MR13. Level: A-level only.*

### What you need to know

- (A-level only) Use probability to model real situations, criticise the assumptions made (such as independence or equally likely outcomes), and judge the likely effect of more realistic assumptions.

### Explained

Probability models rely on assumptions that are rarely exactly true. The probability that a train is late may not be the same every day (it depends on weather and time of day), and whether it is late today may affect tomorrow (staff shortages last several days). If an assumption fails, say how the answer would change: assuming independence when bad days cluster together usually underestimates the chance of several bad days in a row.

### Worked example

(A-level only) A model says each day independently has a probability of 0.2 of rain. (a) Find the probability of no rain in a 7-day week. (b) Criticise the model.

1. (a) 0.8⁷ = 0.210.
2. (b) Rain is more likely in some seasons, so 0.2 will not suit every week. Wet days tend to come in runs, so days are not independent; the chance of a fully dry week is probably higher than the model says, because dry spells also cluster.

### Common mistakes

- (A-level only) Criticising a model without reference to the context.

## Check questions

1. P(A) = 0.3, P(B) = 0.45 and A, B are independent. Find P(A ∩ B), P(A ∪ B) and P(A′ ∩ B). [4 marks]
2. In a class of 30, 18 play football, 12 play tennis and 5 play both. (a) Draw a Venn diagram. (b) Find the probability that a student picked at random plays neither. (c) (A-level only) Find P(tennis | football). [5 marks]
3. A bag has 4 green and 6 yellow balls. Three are taken without replacement. Find the probability that exactly two are green. [3 marks]
4. (A-level only) P(A) = 0.6, P(B | A) = 0.3 and P(B | A′) = 0.5. Find P(B) and P(A | B). [5 marks]
5. (A-level only) Events C and D have P(C) = 0.4, P(D) = 0.25 and P(C | D) = 0.4. Are C and D independent? Explain. [2 marks]
6. (A-level only) A factory has two machines. Machine X makes 70% of items and 3% of its items are faulty. Machine Y makes the rest and 5% of its items are faulty. An item is found to be faulty. Find the probability it came from machine Y. [4 marks]
7. (A-level only) A model assumes that each of 10 buses arrives on time independently with probability 0.9. Give one reason why independence might not hold. [1 mark]

## Mark scheme

1. P(A ∩ B) = 0.135 (1); P(A ∪ B) = 0.3 + 0.45 − 0.135 = 0.615 (1); P(A′ ∩ B) = 0.45 − 0.135 (1) = 0.315 (1).
2. (a) Football only 13, both 5, tennis only 7, neither 5 (2). (b) 5/30 = 1/6 (1). (c) 5/18 (2).
3. Arrangements GGY: 3 orders (1); each 4/10 × 3/9 × 6/8 = 72/720 (1); total 216/720 = 0.3 (1).
4. P(A ∩ B) = 0.18 (1); P(A′ ∩ B) = 0.4 × 0.5 = 0.2 (1); P(B) = 0.38 (1); P(A | B) = 0.18/0.38 (1) = 9/19 or 0.474 (1).
5. P(C | D) = 0.4 = P(C) (1); so independent (1).
6. P(Y and faulty) = 0.3 × 0.05 = 0.015 (1); P(faulty) = 0.021 + 0.015 = 0.036 (1); P(Y | faulty) = 0.015/0.036 (1) = 0.417 (1).
7. e.g. traffic delays affect several buses at once, so one being late makes others more likely to be late (1).
