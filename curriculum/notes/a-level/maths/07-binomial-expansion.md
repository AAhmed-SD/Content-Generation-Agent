---
level: A-level
subject: Mathematics
topic: "The binomial expansion"
as_content: "The expansion of (a + bx)^n for positive integer n, factorial and nCr notation, and the link to binomial probabilities are AS. Expansions for negative and fractional n, their validity and their use in approximation are A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["D1"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P4.1"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.04a", "1.04b", "1.04c", "1.04d"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Ms1", "Ms2", "Ms3", "Ms4", "Ms5"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# The binomial expansion

This file covers expanding (a + bx)ⁿ, first for positive whole numbers n, then for any rational n, with the condition for the infinite series to be valid and its use in approximations.

## Overview

AS: positive integer n, Pascal's triangle, n!, ⁿCᵣ, and the link to the binomial distribution (file 22). A-level only: negative and fractional n, the validity condition |bx/a| < 1, and approximations.

### Board differences

- AQA D1; Edexcel 4.1.
- OCR H240: 1.04a and 1.04b (AS), 1.04c and 1.04d (A-level only).
- OCR MEI H640: Ms1 and Ms2 (AS), Ms3 to Ms5 (A-level only). MEI states that the proof of the general expansion is not required.

## D1 The binomial expansion

*Refs: AQA D1 · Edexcel 4.1 · OCR 1.04a, 1.04b, 1.04c, 1.04d · MEI Ms1, Ms2, Ms3, Ms4, Ms5. Level: AS & A (part A-level only).*

### What you need to know

- For a positive integer n:

```latex
(a+b)^n = a^n + \binom{n}{1}a^{n-1}b + \binom{n}{2}a^{n-2}b^2 + \dots + \binom{n}{r}a^{n-r}b^r + \dots + b^n
```

```latex
\binom{n}{r} = {}^nC_r = \frac{n!}{r!\,(n-r)!} \qquad n! = n(n-1)(n-2)\dots 2 \times 1, \quad 0! = 1
```

- The coefficients are the numbers in row n of Pascal's triangle.
- The same coefficients ⁿCᵣ give binomial probabilities.
- (A-level only) For any rational n and |x| < 1:

```latex
(1+x)^n = 1 + nx + \frac{n(n-1)}{2!}x^2 + \frac{n(n-1)(n-2)}{3!}x^3 + \dots
```

- (A-level only) For (a + bx)ⁿ, first take out aⁿ: (a + bx)ⁿ = aⁿ(1 + bx/a)ⁿ, valid for |bx/a| < 1, that is |x| < |a/b|.
- (A-level only) Use the expansion to approximate values.

### Explained

**Positive integer n.** The expansion has n + 1 terms and stops. The general term is ⁿCᵣ aⁿ⁻ʳ bʳ. Powers of a go down while powers of b go up, and the powers in each term add to n.

Pascal's triangle rows 0 to 6:

| n | coefficients |
| --- | --- |
| 0 | 1 |
| 1 | 1 1 |
| 2 | 1 2 1 |
| 3 | 1 3 3 1 |
| 4 | 1 4 6 4 1 |
| 5 | 1 5 10 10 5 1 |
| 6 | 1 6 15 20 15 6 1 |

When b is negative or a fraction, put the whole of b in brackets before raising it to a power: (−2x)³ = −8x³.

**Link to probability.** If X ~ B(n, p), then P(X = r) = ⁿCᵣ pʳ(1 − p)ⁿ⁻ʳ, which is one term of the expansion of (p + (1 − p))ⁿ = 1. This is why the probabilities add to 1.

**(A-level only) Any rational n.** If n is negative or a fraction, the series never stops: the coefficients n(n − 1)(n − 2)... never reach zero. An infinite series only makes sense if it converges, which needs |x| < 1 in (1 + x)ⁿ.

The coefficient formula n(n − 1)...(n − r + 1)/r! is the same as ⁿCᵣ when n is a positive integer, but you cannot use the calculator's nCr button for negative or fractional n.

**(A-level only) Approximation.** For small x, a few terms give a good estimate. Choose x so it is small and makes the bracket match the number you want. The smaller x is, the fewer terms you need.

### Worked example

Expand (2 + 3x)⁵ up to and including the term in x³.

1. 2⁵ = 32.
2. ⁵C₁ 2⁴(3x) = 5 × 16 × 3x = 240x.
3. ⁵C₂ 2³(3x)² = 10 × 8 × 9x² = 720x².
4. ⁵C₃ 2²(3x)³ = 10 × 4 × 27x³ = 1080x³.
5. (2 + 3x)⁵ = 32 + 240x + 720x² + 1080x³ + ...

Find the coefficient of x³ in (1 − 2x)⁸.

1. ⁸C₃(−2x)³ = 56 × (−8)x³.
2. Coefficient −448.

Find the term independent of x in (x + 2/x)⁶.

1. General term ⁶Cᵣ x⁶⁻ʳ(2/x)ʳ = ⁶Cᵣ 2ʳ x⁶⁻²ʳ.
2. Independent of x when 6 − 2r = 0, r = 3.
3. ⁶C₃ × 2³ = 20 × 8 = 160.

The coefficient of x² in (1 + x)ⁿ is 28. Find n.

1. n(n − 1)/2 = 28, so n² − n − 56 = 0, (n − 8)(n + 7) = 0.
2. n is a positive integer, so n = 8.

Use the expansion of (1 + x)⁸ to estimate 1.02⁸ to 5 decimal places.

1. x = 0.02: 1 + 8(0.02) + 28(0.02)² + 56(0.02)³ + ...
2. = 1 + 0.16 + 0.0112 + 0.000448 + ... = 1.17165 (5 d.p.). The next term, 70(0.02)⁴ = 0.0000112, does not change the fifth decimal place.

(A-level only) Expand (1 − 3x)^{1/2} up to x³ and state the validity.

1. n = 1/2 and x replaced by −3x.
2. 1 + (1/2)(−3x) + [(1/2)(−1/2)/2](−3x)² + [(1/2)(−1/2)(−3/2)/6](−3x)³.
3. Coefficients: −3/2; (−1/8)(9) = −9/8; (1/16)(−27) = −27/16.
4. (1 − 3x)^{1/2} = 1 − (3/2)x − (9/8)x² − (27/16)x³ + ..., valid for |x| < 1/3.

(A-level only) Expand (4 + x)^{−1/2} up to x².

1. (4 + x)^{−1/2} = 4^{−1/2}(1 + x/4)^{−1/2} = (1/2)(1 + x/4)^{−1/2}.
2. (1 + x/4)^{−1/2} = 1 + (−1/2)(x/4) + [(−1/2)(−3/2)/2](x/4)² = 1 − x/8 + 3x²/128.
3. Multiply by 1/2: 1/2 − x/16 + 3x²/256, valid for |x| < 4.

(A-level only) Use the expansion of (1 + x)^{1/2} to estimate √17.

1. √17 = √(16(1 + 1/16)) = 4(1 + 1/16)^{1/2}.
2. (1 + x)^{1/2} ≈ 1 + x/2 − x²/8 with x = 1/16: 1 + 0.03125 − 0.00048828 = 1.03076.
3. √17 ≈ 4 × 1.03076 = 4.1230 (the true value is 4.1231 to 4 d.p.).

(A-level only) Using partial fractions, expand (5x + 1)/[(x − 1)(x + 2)] up to x², and state the validity.

1. From file 03: (5x + 1)/[(x − 1)(x + 2)] = 2/(x − 1) + 3/(x + 2).
2. 2/(x − 1) = −2(1 − x)⁻¹ = −2(1 + x + x² + ...) = −2 − 2x − 2x².
3. 3/(x + 2) = (3/2)(1 + x/2)⁻¹ = (3/2)(1 − x/2 + x²/4) = 3/2 − 3x/4 + 3x²/8.
4. Sum: −1/2 − (11/4)x − (13/8)x².
5. Valid where both expansions are: |x| < 1 and |x| < 2, so |x| < 1.

### Common mistakes

- Writing 3x² instead of (3x)² = 9x².
- Losing the minus sign: (−2x)³ = −8x³.
- (A-level only) Expanding (4 + x)ⁿ as if it were (1 + x)ⁿ, without taking out 4ⁿ.
- (A-level only) Getting the validity wrong: (2 − 5x)ⁿ needs |5x/2| < 1, that is |x| < 2/5.
- (A-level only) Using a value of x outside the range of validity to approximate.

## Check questions

1. Expand (3 − x)⁴ fully. [3 marks]
2. Find the coefficient of x⁴ in the expansion of (2 + x/2)¹⁰. [3 marks]
3. Find the term independent of x in (2x − 1/x²)⁶. [4 marks]
4. In the expansion of (1 + kx)⁷ the coefficient of x² is 84. Find the possible values of k. [3 marks]
5. Explain how the coefficients in the expansion of (p + q)⁵ are linked to the probabilities in the distribution B(5, p). [2 marks]
6. (A-level only) Expand (1 + 2x)⁻² up to and including the term in x³, and state the values of x for which it is valid. [4 marks]
7. (A-level only) (a) Expand √(9 − x) up to the term in x². (b) Use x = 0.09 to estimate √8.91 to 6 decimal places. [6 marks]
8. (A-level only) Show that (1 + x)/(1 − x) ≈ 1 + 2x + 2x² + 2x³ for small x. [3 marks]
9. (A-level only) (a) Express (4x + 5)/[(x + 1)(x + 2)] in partial fractions. (b) Hence expand it up to x², stating the validity. [7 marks]

## Mark scheme

1. Coefficients 1, 4, 6, 4, 1 (1); powers of 3 and (−x) correct (1); 81 − 108x + 54x² − 12x³ + x⁴ (1).
2. ¹⁰C₄ × 2⁶ × (1/2)⁴ (1); 210 × 64/16 (1); 840 (1).
3. General term ⁶Cᵣ(2x)⁶⁻ʳ(−x⁻²)ʳ (1); power of x is 6 − 3r (1); r = 2 (1); 15 × 16 = 240 (1).
4. ⁷C₂k² = 21k² (1); 21k² = 84 (1); k = ±2 (1).
5. The coefficients are ⁵Cᵣ (1); P(X = r) = ⁵Cᵣ pʳ(1 − p)⁵⁻ʳ is the term in pʳ of (p + (1 − p))⁵, with q = 1 − p (1).
6. 1 + (−2)(2x) + [(−2)(−3)/2](2x)² + [(−2)(−3)(−4)/6](2x)³ (1); 1 − 4x (1); + 12x² − 32x³ (1); valid for |x| < 1/2 (1).
7. (a) 3(1 − x/9)^{1/2} (1); 1 − x/18 − x²/648 (1); 3 − x/6 − x²/216 (1). (b) √8.91 = √(9 − 0.09) (1); 3 − 0.015 − 0.0000375 (1); 2.984963 (1).
8. (1 − x)⁻¹ = 1 + x + x² + x³ + ... (1); (1 + x)(1 + x + x² + x³) (1); = 1 + 2x + 2x² + 2x³ + ... (1).
9. (a) 4x + 5 ≡ A(x + 2) + B(x + 1) (1); 1/(x + 1) + 3/(x + 2) (2). (b) (1 + x)⁻¹ = 1 − x + x² (1); 3/(x + 2) = (3/2)(1 + x/2)⁻¹ = 3/2 − 3x/4 + 3x²/8 (1); 5/2 − (7/4)x + (11/8)x² (1); valid for |x| < 1 (1).
