---
level: A-level
subject: Further Mathematics
topic: "Combinatorics"
as_content: "OCR 7.01 Stage 1 parts are AS; further restrictions, extended inclusion-exclusion and derangements are Stage 2. Edexcel FP2 5.7 is A-level option content."
boards:
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FP2 5.7"]
  - board: OCR
    code: "H245"
    spec_refs: ["5.01a", "5.01b", "7.01a", "7.01b", "7.01c", "7.01d", "7.01e", "7.01f", "7.01g", "7.01h", "7.01i", "7.01j", "7.01k", "7.01l", "7.01m"]
refs_checked: false
spec_urls:
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/
---

# Combinatorics

This file covers types of combinatorial problem (existence, construction, enumeration, optimisation), sets, the pigeonhole principle, the multiplicative principle, arrangements with and without repetition and restrictions, arrangements in a circle, selections, distributing identical objects, the inclusion-exclusion principle and derangements.

## Overview

Factorials and nCr are in A-level Maths ([../maths/07-binomial-expansion.md](../maths/07-binomial-expansion.md)). Probability by counting (OCR 5.01) uses these methods: see [30-discrete-random-variables.md](30-discrete-random-variables.md).

### Board differences

- OCR 7.01a to 7.01m (Discrete Mathematics), the fullest treatment.
- Edexcel FP2 5.7: the multiplicative principle, permutations and combinations, and counting with set notation.
- OCR 5.01a, 5.01b (Statistics) uses counting to find probabilities.

## Kinds of problem, sets and the pigeonhole principle

*Refs: OCR 7.01a, 7.01b, 7.01c. Level: AS & A.*

### What you need to know

- Four kinds of problem: existence (is there one?), construction (find one), enumeration (how many?), optimisation (which is best?).
- Set language: n(A), union, intersection, complement, subsets (a set of n elements has 2ⁿ subsets).
- Pigeonhole principle: if n + 1 objects go into n boxes, some box has at least 2. More generally, if N objects go into n boxes, some box has at least ⌈N/n⌉.

### Worked example

Show that among any 13 people two were born in the same month.

1. 13 people, 12 months: by the pigeonhole principle, some month has at least 2.

Show that any 5 points in a 2 × 2 square include two within √2 of each other.

1. Split the square into four 1 × 1 squares. Two of the 5 points lie in the same small square, and points in a 1 × 1 square are at most √2 apart.

### Common mistakes

- Using the principle with "at least" when exactly is needed, or choosing boxes that do not force the result.

## Arrangements and selections

*Refs: Edexcel FP2 5.7 · OCR 7.01d, 7.01e, 7.01f, 7.01g, 7.01h, 7.01i, 7.01j. Level: AS & A (OCR 7.01h, 7.01j A-level only).*

### What you need to know

- Multiplicative principle: if one choice can be made in m ways and then another in n ways, together there are mn ways.
- n distinct objects in a row: n!. Choosing and arranging r of n: ⁿPᵣ = n!/(n − r)!.
- With repeated identical objects: n!/(p! q! ...).
- n distinct objects in a circle: (n − 1)!.
- Selections of r from n: ⁿCᵣ = n!/[r!(n − r)!].
- Restrictions: deal with the restriction first (fix positions, or glue items that must be together into one block); "not together" = total − together.
- Distributing r identical objects among n people: C(r + n − 1, n − 1) ("stars and bars").

### Worked example

How many arrangements of the letters of STATISTICS are there?

1. 10 letters: S 3, T 3, I 2, A 1, C 1. 10!/(3! 3! 2!) = 50 400.

Seven people sit in a row. In how many ways can two particular people not sit together?

1. Total 7! = 5040. Together: treat them as one block, 6! × 2 = 1440.
2. Not together: 3600.

A team of 3 men and 2 women is chosen from 6 men and 5 women. How many teams? How many teams of 5 contain at least one woman?

1. C(6, 3) × C(5, 2) = 20 × 10 = 200.
2. All teams of 5 minus all-male teams: C(11, 5) − C(6, 5) = 462 − 6 = 456.

In how many ways can 10 identical sweets be shared among 3 children?

1. C(12, 2) = 66.

### Common mistakes

- Using permutations when order does not matter.
- Forgetting the 2 ways of ordering a block of two people.

## Inclusion-exclusion and derangements

*Refs: OCR 7.01k, 7.01l, 7.01m. Level: AS & A (7.01l, 7.01m A-level only).*

### What you need to know

```latex
n(A\cup B\cup C) = n(A)+n(B)+n(C) - n(A\cap B) - n(A\cap C) - n(B\cap C) + n(A\cap B\cap C)
```

- The pattern extends to more sets with alternating signs.
- A derangement is an arrangement with no object in its original place. The number of derangements of n objects:

```latex
D_n = n!\left(1 - \frac1{1!} + \frac1{2!} - \frac1{3!} + \dots + \frac{(-1)^n}{n!}\right)
```

- Dₙ/n! → 1/e as n grows.

### Worked example

How many integers from 1 to 1000 are divisible by none of 2, 3 and 5?

1. Divisible by 2, 3, 5: 500, 333, 200. By 6, 10, 15: 166, 100, 66. By 30: 33.
2. Divisible by at least one: 500 + 333 + 200 − 166 − 100 − 66 + 33 = 734.
3. None: 1000 − 734 = 266.

Five letters are put at random into five addressed envelopes. Find the probability that no letter is in the right envelope.

1. D₅ = 120(1 − 1 + ½ − 1/6 + 1/24 − 1/120) = 44.
2. Probability 44/120 = 11/30.

### Common mistakes

- Forgetting to add back the triple intersection.

## Check questions

1. How many arrangements of the letters of BANANA are there, and in how many are the three As together? [4 marks]
2. Eight people sit round a circular table. In how many ways can they sit if two particular people must sit next to each other? [3 marks]
3. A committee of 4 is chosen from 5 teachers and 7 students. How many committees have more students than teachers? [4 marks]
4. How many integers from 1 to 600 are divisible by 4, 5 or 6? [4 marks]
5. Find the number of derangements of 4 objects, and list those of A, B, C, D that send A to B. [4 marks]
6. Prove that if 10 integers are chosen from 1 to 18, two of them add to 19. [3 marks]

## Mark scheme

1. 6!/(3! 2!) = 60 (2). As as one block: 4!/2! = 12 (2).
2. Treat the pair as one: (7 − 1)! = 720 arrangements of 7 units (1), × 2 for the pair (1) = 1440 (1).
3. 3 students + 1 teacher: C(7, 3) × 5 = 175 (1). 4 students: C(7, 4) = 35 (1). Total 210 (2).
4. 150 + 120 + 100 (1) − (by 20: 30, by 12: 50, by 30: 20) (1) + by 60: 10 (1). 370 − 100 + 10 = 280 (1).
5. D₄ = 9 (2). With A → B: BADC, BCDA, BDAC (2).
6. Pair up {1, 18}, {2, 17}, ..., {9, 10}: 9 pairs (1). 10 numbers in 9 pairs: two in the same pair (1), and they add to 19 (1).
