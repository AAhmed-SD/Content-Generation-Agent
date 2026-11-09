---
level: GCSE
subject: Mathematics
topic: "Geometry: vectors"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8300"
    spec_refs: ["G24", "G25"]
  - board: Edexcel
    code: "1MA1"
    spec_refs: ["G24", "G25"]
  - board: OCR
    code: "J560"
    spec_refs: ["9.03a", "9.03b"]
  - board: Eduqas
    code: "C300QS"
    spec_refs: ["FG20", "FG21"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/gcse/mathematics-8300/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/mathematics-2015.html
  OCR: https://www.ocr.org.uk/qualifications/gcse/mathematics-j560-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/mathematics-gcse/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/gcse-maths/
---

# Geometry: vectors

This file covers describing translations with column vectors, adding and subtracting vectors, multiplying by a scalar, and (Higher) using vectors in geometric arguments and proofs.

## Overview

Column vectors, translations, vector arithmetic and diagrams are on both tiers. Using vectors to prove geometric results (parallel lines, points on a straight line, ratios along a line) is Higher only.

### Board differences

- AQA and Edexcel: G24 and G25.
- OCR J560: 9.03a (vector arithmetic) and 9.03b (column vectors). OCR's translation statement (9.01c) is taught in [11-geometry-transformations-congruence-and-similarity.md](11-geometry-transformations-congruence-and-similarity.md), and this file adds how to write it as a vector.
- Eduqas C300QS: FG20 and FG21 on Foundation; HG24 and HG25 on Higher.

## G24 Translations as vectors

*Refs: AQA G24 · Edexcel G24 · OCR none · Eduqas FG20. Tier: F & H.*

### What you need to know

- Describe a translation by a column vector: the top number is the movement right (negative means left), the bottom number is the movement up (negative means down).

```latex
\begin{pmatrix} 3 \\ -2 \end{pmatrix} \text{ means 3 right and 2 down}
```

### Explained

Every point of the shape moves by the same vector, so the image is congruent and faces the same way. To find the vector, pick one corner of the object and its image, and count across then up.

### Worked example

Point A(−1, 4) is translated to A′(5, 1). Write the translation as a column vector.

1. Across: 5 − (−1) = 6. Up: 1 − 4 = −3.
2. Vector (6, −3) written as a column.

Translate the point (2, −5) by the vector with top −4 and bottom 7.

1. (2 − 4, −5 + 7) = (−2, 2).

### Common mistakes

- Writing the vertical movement on top.
- Getting the direction backwards (from image to object).

## G25 Vector arithmetic and proof

*Refs: AQA G25 · Edexcel G25 · OCR 9.03a, 9.03b · Eduqas FG21. Tier: F & H (part Higher only).*

### What you need to know

- Add and subtract vectors, and multiply a vector by a scalar (a number).
- Use both diagrams (arrows, bold letters such as **a**, or AB with an arrow above) and column vectors.
- The magnitude (length) of a column vector with components x and y is √(x² + y²).
- (HT only) Use vectors to construct geometric arguments and proofs.

### Explained

Column vectors: add or subtract the tops and the bottoms separately. Multiplying by 3 multiplies both numbers by 3.

In diagrams, a vector has a length and a direction. **a** + **b** means "go along **a**, then along **b**". −**a** has the same length as **a** but the opposite direction. 2**a** is parallel to **a** and twice as long.

To find a route vector such as AB, travel from A to B along known vectors, adding them. Going against an arrow subtracts it. So if OA = **a** and OB = **b**, then AB = AO + OB = −**a** + **b** = **b** − **a**.

(HT only) Key ideas for proofs:

- Two vectors are parallel if one is a multiple of the other: 6**a** − 3**b** = 3(2**a** − **b**), so it is parallel to 2**a** − **b**.
- Points A, B and C lie on a straight line (are collinear) if AB and BC are parallel and share point B.
- If M divides AB in the ratio 1 : 3, then AM = ¼AB.
- If M is the midpoint of AB, then AM = ½AB.

### Worked example

**p** has components (3, −1) and **q** has components (−2, 4). Find 2**p** − **q** and its magnitude.

1. 2**p** = (6, −2).
2. 2**p** − **q** = (6 − (−2), −2 − 4) = (8, −6).
3. Magnitude √(64 + 36) = 10.

OABC is a parallelogram with OA = **a** and OC = **c**. M is the midpoint of AB. Find OM in terms of **a** and **c**.

1. AB = OC = **c**, so AM = ½**c**.
2. OM = OA + AM = **a** + ½**c**.

(HT only) OA = **a** and OB = **b**. P lies on AB with AP : PB = 2 : 1. Find OP.

1. AB = **b** − **a**.
2. AP = ⅔AB = ⅔(**b** − **a**).
3. OP = **a** + ⅔(**b** − **a**) = ⅓**a** + ⅔**b**.

(HT only) OA = **a**, OB = **b**. C is the point with OC = 3**b** − 2**a**. Prove that A, B and C lie on a straight line.

1. AB = **b** − **a**.
2. BC = OC − OB = 3**b** − 2**a** − **b** = 2**b** − 2**a** = 2(**b** − **a**).
3. BC = 2AB, so AB and BC are parallel, and they share point B.
4. So A, B and C are collinear.

### Common mistakes

- Writing AB = **a** − **b** instead of **b** − **a**.
- Adding a vector when travelling against its arrow.
- (HT only) Saying two vectors are parallel without showing one is a multiple of the other.
- (HT only) For collinearity, forgetting to say the vectors share a common point.

## Check questions

1. A shape is translated 5 left and 3 up. Write the column vector. [1 mark]
2. **a** has components (4, 1) and **b** has components (−3, 2). Find 3**a** + 2**b**. [2 marks]
3. Find the magnitude of the vector with components (5, −12). [2 marks]
4. OA = **a** and OB = **b**. Write AB in terms of **a** and **b**. [1 mark]
5. ABCD is a parallelogram with AB = **x** and AD = **y**. Find AC and BD. [2 marks]
6. (HT only) OA = **a**, OB = **b**. M is the midpoint of AB. Find OM in its simplest form. [3 marks]
7. (HT only) OPQ is a triangle with OP = **p** and OQ = **q**. X is on PQ with PX : XQ = 1 : 2. Find OX. [3 marks]
8. (HT only) OA = 2**a**, OB = 3**b**, and OC = 6**b** − 2**a**. Show that AB is parallel to BC and state the ratio AB : BC. [4 marks]

## Mark scheme

1. Top −5, bottom 3 (1).
2. (12, 3) + (−6, 4) (1) = (6, 7) (1).
3. √(25 + 144) (1) = 13 (1).
4. **b** − **a** (1).
5. AC = **x** + **y** (1); BD = **y** − **x** (1).
6. AB = **b** − **a** (1); OM = **a** + ½(**b** − **a**) (1) = ½**a** + ½**b** (1).
7. PQ = **q** − **p** (1); PX = ⅓(**q** − **p**) (1); OX = ⅔**p** + ⅓**q** (1).
8. AB = 3**b** − 2**a** (1); BC = 6**b** − 2**a** − 3**b** = 3**b** − 2**a** (1); BC = AB, so they are parallel (1); AB : BC = 1 : 1 (1).
