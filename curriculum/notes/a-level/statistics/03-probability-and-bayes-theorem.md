---
level: A-level
subject: Statistics
topic: "Probability, conditional probability and Bayes' theorem"
boards:
  - board: Edexcel
    code: "9ST0"
    spec_refs: ["2.1", "2.2", "2.3", "2.4", "2.5", "11.1"]
refs_checked: false
spec_url: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/a-level-statistics/
---

# Probability and Bayes' theorem

This file covers set notation in probability, tree diagrams, Venn diagrams and two-way tables, the addition and multiplication laws, conditional probability, testing independence, and Bayes' theorem for up to three events.

## Overview

Topic 2 matches the probability in A-level Mathematics, written up in [A-level Maths 21](../maths/21-probability.md) (mutually exclusive and independent events, conditional probability, modelling). This file restates the 9ST0 points briefly with fresh examples and adds topic 11, Bayes' theorem, which reverses a conditional probability: from P(evidence | cause) to P(cause | evidence). Bayes questions are usually set in medical testing, quality control or forensic contexts, and often ask you to interpret a surprisingly small answer.

### Board differences

- Edexcel 9ST0 topics 2 and 11 are on Paper 1. The complement of A is written A′.
- The formulae P(A ∩ B) = P(A)P(B), P(A | B) = P(A) and P(B | A) = P(B) for independent events must be learnt. Bayes' theorem for up to three events is given in the formulae booklet.

## 2.1 and 2.2 Set language, diagrams and tables

*Refs: Edexcel 2.1, 2.2. Paper 1.*

### What you need to know

- A ∩ B (A and B), A ∪ B (A or B or both), A′ (not A), P(A | B) (A given B), ∅ (the empty set), and the sample space S.
- Represent probabilities with Venn diagrams, tree diagrams and two-way tables, and read probabilities from them.

### Explained

A Venn diagram suits two or three overlapping events. A tree diagram suits events in stages, where later probabilities may depend on earlier outcomes. A two-way table suits counts classified by two categorical variables; conditional probabilities come from a single row or column.

### Worked example

In a sixth form of 200 students, 120 study a science (S) and 70 study a language (L); 35 study both. Find P(S ∪ L), P(S′ ∩ L′) and P(L | S).

1. Only S: 120 − 35 = 85. Only L: 70 − 35 = 35. Neither: 200 − 85 − 35 − 35 = 45.
2. P(S ∪ L) = (85 + 35 + 35) ÷ 200 = 155 ÷ 200 = 0.775.
3. P(S′ ∩ L′) = 45 ÷ 200 = 0.225.
4. P(L | S) = 35 ÷ 120 = 0.2917.

### Common mistakes

- Putting 120 in the "S only" region instead of 120 − 35.
- Dividing by 200 instead of 120 for a "given S" probability.

## 2.3 and 2.4 Calculating probabilities and the laws of probability

*Refs: Edexcel 2.3, 2.4. Paper 1.*

### What you need to know

```latex
P(A \cup B) = P(A) + P(B) - P(A \cap B)
```

```latex
P(A \cap B) = P(A) \times P(B \mid A), \qquad P(B \mid A) = \frac{P(A \cap B)}{P(A)}
```

- Mutually exclusive: P(A ∩ B) = 0, so P(A ∪ B) = P(A) + P(B).
- Independent: P(A ∩ B) = P(A)P(B).

### Explained

Mutually exclusive means the events cannot happen together; independent means one happening does not change the chance of the other. Two events with non-zero probabilities cannot be both: if they are mutually exclusive, knowing A happened tells you B did not.

### Worked example

A bag has 5 red and 3 blue counters. Two are taken without replacement. Find the probability they are different colours, and the probability the second is blue given they are different colours.

1. P(R then B) = (5/8)(3/7) = 15/56. P(B then R) = (3/8)(5/7) = 15/56.
2. P(different) = 30/56 = 15/28 = 0.5357.
3. P(second blue | different) = (15/56) ÷ (30/56) = 0.5.

### Common mistakes

- Multiplying probabilities for events that are not independent without using the conditional probability.

## 2.5 Deciding whether events are independent

*Refs: Edexcel 2.5. Paper 1.*

### What you need to know

- A and B are statistically independent if any one of these holds (each implies the others): P(A ∩ B) = P(A)P(B); P(A | B) = P(A); P(B | A) = P(B).

### Explained

In a real data set, observed proportions will rarely match exactly even when two variables are unrelated, so in practice a large data set calls for a chi-squared test for association (see [10-contingency-tables-and-goodness-of-fit.md](10-contingency-tables-and-goodness-of-fit.md)). For probability models and textbook data, check the condition exactly.

### Worked example

P(A) = 0.4, P(B) = 0.35 and P(A ∪ B) = 0.61. Are A and B independent?

1. P(A ∩ B) = 0.4 + 0.35 − 0.61 = 0.14.
2. P(A) × P(B) = 0.4 × 0.35 = 0.14.
3. They are equal, so A and B are independent.

### Common mistakes

- Concluding independence from P(A ∩ B) = 0; that shows mutual exclusivity, which (with non-zero probabilities) means the events are dependent.

## 11.1 Bayes' theorem

*Refs: Edexcel 11.1. Paper 1.*

### What you need to know

- Calculate and use conditional probabilities, including Bayes' theorem for up to three events (a partition A₁, A₂, A₃ of the sample space), using tree diagrams.

```latex
P(A_j \mid B) = \frac{P(A_j)\, P(B \mid A_j)}{\sum_{i} P(A_i)\, P(B \mid A_i)}
```

- The denominator is the total probability of B, found by adding the branches of a tree that end in B.

### Explained

The tree is drawn in the order the information is given: first the cause (which machine, whether a person has a disease), then the evidence (defective item, positive test). Bayes asks the reverse question: given the evidence, how likely is each cause?

**Base rates matter.** When a condition is rare, most positive results can be false positives even for an accurate test, because the many healthy people produce more false positives than the few ill people produce true positives. This is why screening programmes follow a positive result with a second, more specific test.

**Updating.** The answer P(A | B) becomes the new prior if more evidence arrives. Two independent positive tests raise the probability far more than one.

### Worked example

Three machines make bolts: A makes 50%, B 30% and C 20%. The proportions defective are 2%, 3% and 5%. A bolt is chosen at random and is defective. Find the probability it came from C.

1. Branches ending in defective: 0.5 × 0.02 = 0.010; 0.3 × 0.03 = 0.009; 0.2 × 0.05 = 0.010.
2. P(D) = 0.010 + 0.009 + 0.010 = 0.029.

```latex
P(C \mid D) = \frac{0.010}{0.029} = 0.345
```

3. C makes only 20% of bolts but about 34.5% of defective ones.

A disease affects 1% of a population. A test detects it in 95% of people who have it and gives a false positive for 4% of people who do not. Find the probability that a person who tests positive has the disease, and interpret.

1. P(D ∩ +) = 0.01 × 0.95 = 0.0095. P(D′ ∩ +) = 0.99 × 0.04 = 0.0396.
2. P(+) = 0.0095 + 0.0396 = 0.0491.

```latex
P(D \mid +) = \frac{0.0095}{0.0491} = 0.193
```

3. Fewer than 1 in 5 positives actually have the disease, because the disease is rare and false positives from the large healthy group outnumber true positives.

The person takes a second, independent test with the same accuracy and is positive again. Find the new probability.

1. Prior is now 0.193. P(D ∩ +) = 0.193 × 0.95 = 0.1838; P(D′ ∩ +) = 0.807 × 0.04 = 0.0323.
2. P(D | second +) = 0.1838 ÷ (0.1838 + 0.0323) = 0.851.

### Common mistakes

- Confusing P(+ | D) (the test's sensitivity, 0.95) with P(D | +) (0.193).
- Using only the "true" branch in the denominator and forgetting the false positives.
- Rounding the prior heavily before a second update.

## Check questions

1. P(A) = 0.5, P(B) = 0.3, P(A | B) = 0.6. Find P(A ∩ B) and P(A ∪ B), and state with a reason whether A and B are independent. [4 marks]
2. In a survey of 150 adults, 90 own a car, 60 own a bicycle and 25 own neither. Find the probability that an adult chosen at random owns both, and the probability they own a bicycle given they own a car. [4 marks]
3. Show that two events with P(A) = 0.2 and P(B) = 0.3 cannot be both mutually exclusive and independent. [2 marks]
4. A factory has three suppliers. 60% of parts come from X, 25% from Y and 15% from Z. The probabilities of a faulty part are 0.01, 0.04 and 0.06. A part is faulty. Find the probability it came from Y. [4 marks]
5. A security scanner flags 98% of bags containing a banned item and 3% of bags that do not. 1 in 500 bags contains a banned item. Find the probability that a flagged bag contains a banned item, and comment. [5 marks]
6. In question 5, the flagged bag is scanned again by an independent scanner with the same accuracy, and is flagged again. Find the new probability. [3 marks]

## Mark scheme

1. P(A ∩ B) = 0.6 × 0.3 = 0.18 (1); P(A ∪ B) = 0.5 + 0.3 − 0.18 = 0.62 (1); P(A | B) = 0.6 ≠ P(A) = 0.5 (1), so not independent (1).
2. Car or bicycle: 150 − 25 = 125 (1); both = 90 + 60 − 125 = 25, P = 25/150 = 1/6 (1); P(bicycle | car) = 25/90 (1) = 5/18 ≈ 0.278 (1).
3. Mutually exclusive gives P(A ∩ B) = 0 (1); independent gives P(A ∩ B) = 0.06 ≠ 0, a contradiction (1).
4. Branches: 0.006, 0.010, 0.009 (1); P(F) = 0.025 (1); P(Y | F) = 0.010 ÷ 0.025 (1) = 0.4 (1).
5. P(B ∩ flag) = 0.002 × 0.98 = 0.00196 (1); P(B′ ∩ flag) = 0.998 × 0.03 = 0.02994 (1); P(flag) = 0.0319 (1); P(B | flag) = 0.0614 (1); most flagged bags are innocent because banned items are rare, so a flag should lead to a manual check, not an accusation (1).
6. Prior 0.0614: 0.0614 × 0.98 = 0.0602 (1); 0.9386 × 0.03 = 0.0282 (1); 0.0602 ÷ 0.0884 = 0.681 (1).
