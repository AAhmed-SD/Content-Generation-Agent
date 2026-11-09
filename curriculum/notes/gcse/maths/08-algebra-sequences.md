---
level: GCSE
subject: Mathematics
topic: "Algebra: sequences"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8300"
    spec_refs: ["A23", "A24", "A25"]
  - board: Edexcel
    code: "1MA1"
    spec_refs: ["A23", "A24", "A25"]
  - board: OCR
    code: "J560"
    spec_refs: ["6.06a", "6.06b"]
  - board: Eduqas
    code: "C300QS"
    spec_refs: ["FA19", "FA20", "FA21", "HA23", "HA24", "HA25"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/gcse/mathematics-8300/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/mathematics-2015.html
  OCR: https://www.ocr.org.uk/qualifications/gcse/mathematics-j560-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/mathematics-gcse/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/gcse-maths/
---

# Algebra: sequences

This file covers generating sequences from term-to-term and position-to-term rules, the special sequences you need to recognise, and finding the nth term of linear and quadratic sequences.

## Overview

Generating sequences, recognising special sequences and the nth term of linear sequences are on both tiers. Higher only: the nth term of quadratic sequences, and geometric sequences whose common ratio is a surd.

### Board differences

- AQA and Edexcel: A23 to A25. In the Edexcel and DfE wording, Fibonacci-type sequences, quadratic sequences and simple geometric progressions are already on Foundation (recognising and using them); only finding the nth term of a quadratic sequence and surd ratios are Higher.
- OCR J560: 6.06a (generating terms and nth term) and 6.06b (special sequences).
- Eduqas C300QS: FA19 to FA21 on Foundation and HA23 to HA25 on Higher.

## A23 Generating sequences

*Refs: AQA A23 · Edexcel A23 · OCR 6.06a · Eduqas FA19, HA23. Tier: F & H.*

### What you need to know

- Generate terms of a sequence from a term-to-term rule (how to get from one term to the next) or a position-to-term rule (a formula for the nth term).
- Decide whether a given number is in a sequence.

### Explained

A term-to-term rule needs a starting term: "start at 5, add 3" gives 5, 8, 11, 14, …

A position-to-term rule, the nth term, lets you jump straight to any term. Substitute n = 1, 2, 3, … For example the nth term 4n − 1 gives 3, 7, 11, 15, … and the 50th term is 4 × 50 − 1 = 199.

To test whether a number is in the sequence, set the nth term equal to it and solve. If n is a positive whole number, it is in the sequence.

### Worked example

The nth term of a sequence is 2n² − 3. Write down the first three terms and the 10th term.

1. n = 1: −1. n = 2: 5. n = 3: 15.
2. n = 10: 200 − 3 = 197.

Is 100 a term of the sequence with nth term 6n + 5?

1. 6n + 5 = 100, so 6n = 95, n = 15.83…
2. Not a whole number, so 100 is not a term.

A sequence follows the rule "multiply by 2, then subtract 1". The third term is 21. Find the first term.

1. Reverse: add 1 then divide by 2.
2. Second term: (21 + 1)/2 = 11. First term: (11 + 1)/2 = 6.

### Common mistakes

- Starting with n = 0 instead of n = 1.
- Saying a number is in the sequence because the equation has a solution, without checking it is a whole number.

## A24 Special sequences

*Refs: AQA A24 · Edexcel A24 · OCR 6.06b · Eduqas FA20, HA24. Tier: F & H (part Higher only).*

### What you need to know

- Recognise and use triangular numbers (1, 3, 6, 10, 15, …), square numbers (1, 4, 9, 16, …) and cube numbers (1, 8, 27, 64, …).
- Arithmetic progressions (linear sequences): a constant difference between terms.
- Fibonacci-type sequences: each term is the sum of the two before it.
- Quadratic sequences: the second differences are constant.
- Simple geometric progressions: each term is multiplied by a constant ratio r, with terms like rⁿ where r is a positive rational number.
- (HT only) Geometric progressions where r is a surd, such as √2, and other sequences.

### Explained

Look at differences first:

| Sequence | First differences | Type |
| --- | --- | --- |
| 5, 9, 13, 17 | 4, 4, 4 | Arithmetic (linear) |
| 2, 5, 10, 17 | 3, 5, 7 (second differences 2, 2) | Quadratic |
| 3, 6, 12, 24 | 3, 6, 12 (each term × 2) | Geometric, r = 2 |
| 1, 1, 2, 3, 5, 8 | | Fibonacci (add the previous two) |

Triangular numbers can be drawn as triangles of dots. The nth triangular number is n(n + 1)/2.

A geometric sequence with first term a and ratio r has nth term arⁿ⁻¹. If 0 < r < 1 the terms get smaller.

(HT only) With a surd ratio, the terms alternate between rational and surd values: 1, √3, 3, 3√3, 9, …

### Worked example

A Fibonacci-type sequence starts a, b, a + b, … The 3rd term is 11 and the 5th term is 30. Find a and b.

1. Terms: a, b, a + b, a + 2b, 2a + 3b.
2. a + b = 11 and 2a + 3b = 30.
3. From the first, 2a + 2b = 22. Subtract: b = 8, so a = 3.

Find the next two terms of the geometric sequence 81, 54, 36, …

1. Ratio: 54/81 = 2/3.
2. 36 × 2/3 = 24; 24 × 2/3 = 16.

(HT only) The geometric sequence 2, 2√2, 4, … has ratio √2. Find the 7th term.

1. Each two steps multiply by (√2)² = 2. Terms: 2, 2√2, 4, 4√2, 8, 8√2, 16.
2. The 7th term is 16.

### Common mistakes

- Treating a geometric sequence as arithmetic because the first difference looks constant for two terms.
- Starting Fibonacci-type sequences with the wrong pair of terms.

## A25 The nth term

*Refs: AQA A25 · Edexcel A25 · OCR 6.06a · Eduqas FA21, HA25. Tier: F & H (part Higher only).*

### What you need to know

- Find the nth term of a linear sequence.
- (HT only) Find the nth term of a quadratic sequence.

### Explained

Linear: the nth term is dn + c, where d is the common difference. Find c by comparing dn with the actual terms (or using the "zeroth term", the term before the first).

```latex
\text{nth term} = dn + (a - d)
```

where a is the first term.

(HT only) Quadratic: the nth term is an² + bn + c.

1. Find the second difference. a is half of it.
2. Subtract an² from each term. What is left is linear.
3. Find the nth term of that linear sequence, bn + c.
4. Add the two parts.

### Worked example

Find the nth term of 7, 4, 1, −2, …

1. Difference −3, so −3n.
2. −3n gives −3, −6, −9; add 10 to get 7, 4, 1.
3. nth term: 10 − 3n.

Matchstick patterns use 6, 11, 16, 21 matches. How many matches are in pattern 40?

1. Difference 5; nth term 5n + 1.
2. Pattern 40: 5 × 40 + 1 = 201.

(HT only) Find the nth term of 4, 11, 22, 37, 56, …

1. First differences: 7, 11, 15, 19. Second differences: 4. So a = 2.
2. Subtract 2n²: 4 − 2 = 2, 11 − 8 = 3, 22 − 18 = 4, 37 − 32 = 5, 56 − 50 = 6.
3. 2, 3, 4, 5, 6 has nth term n + 1.
4. nth term: 2n² + n + 1.
5. Check n = 3: 18 + 3 + 1 = 22 ✓.

### Common mistakes

- Writing the nth term of 7, 4, 1 as n − 3. The coefficient of n is the difference, −3.
- Using n + 3 for 4, 7, 10 (it should be 3n + 1).
- (HT only) Using the full second difference for a instead of half of it.
- (HT only) Forgetting to check the formula with a term.

## Check questions

1. The nth term of a sequence is 5 − 3n. Find the first three terms and the 20th term. [2 marks]
2. Find the nth term of 9, 13, 17, 21, … [2 marks]
3. Is 250 a term of the sequence with nth term 4n + 2? Show how you decide. [2 marks]
4. Write down the 8th triangular number. [1 mark]
5. The rule of a sequence is "add the two previous terms". The first two terms are 2 and 5. Find the 6th term. [2 marks]
6. A geometric sequence has first term 5 and common ratio 3. Find the 5th term. [2 marks]
7. Here are the first four terms of a sequence: 3, 8, 15, 24. (a) Show that it is a quadratic sequence. (b) (HT only) Find its nth term. [4 marks]
8. (HT only) Find the nth term of 1, 7, 17, 31, 49, … [3 marks]
9. (HT only) The geometric sequence √3, 3, 3√3, … continues. Find the 6th term. [2 marks]
10. Patterns of tiles have 8, 13, 18, 23 tiles. Which pattern number uses exactly 98 tiles? [3 marks]

## Mark scheme

1. 2, −1, −4 (1); −55 (1).
2. 4n (1); 4n + 5 (1).
3. 4n + 2 = 250 gives n = 62 (1); n is a whole number, so yes, it is the 62nd term (1).
4. 36 (1).
5. 2, 5, 7, 12, 19 (1); 31 (1).
6. 5 × 3⁴ (1) = 405 (1).
7. (a) First differences 5, 7, 9; second differences 2, 2, constant (1). (b) a = 1 (1); subtracting n² leaves 2, 4, 6, 8 (1); n² + 2n (1).
8. Second difference 4, so 2n² (1); 1 − 2, 7 − 8, 17 − 18, … = −1 each time (1); 2n² − 1 (1).
9. Terms √3, 3, 3√3, 9, 9√3, 27 (1); 27 (1).
10. nth term 5n + 3 (1); 5n + 3 = 98 (1); n = 19 (1).
