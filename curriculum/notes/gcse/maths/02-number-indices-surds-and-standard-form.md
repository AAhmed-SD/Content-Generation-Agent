---
level: GCSE
subject: Mathematics
topic: "Number: indices, surds and standard form"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8300"
    spec_refs: ["N7", "N8", "N9"]
  - board: Edexcel
    code: "1MA1"
    spec_refs: ["N7", "N8", "N9"]
  - board: OCR
    code: "J560"
    spec_refs: ["3.01c", "3.02a", "3.02b", "3.03a", "3.03b"]
  - board: Eduqas
    code: "C300QS"
    spec_refs: ["FN7", "FN8", "FN9", "HN7", "HN8", "HN9"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/gcse/mathematics-8300/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/mathematics-2015.html
  OCR: https://www.ocr.org.uk/qualifications/gcse/mathematics-j560-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/mathematics-gcse/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/gcse-maths/
---

# Number: indices, surds and standard form

This file covers the laws of indices (including zero, negative and fractional indices), exact calculation with π and surds, and standard form.

## Overview

All four boards share the DfE content. Integer indices, exact answers in terms of π, and standard form are on both tiers. Fractional indices, surds and rationalising denominators are Higher only.

### Board differences

- AQA and Edexcel: N7, N8 and N9.
- OCR J560: 3.01c (laws of indices), 3.02a and 3.02b (standard form), 3.03a and 3.03b (exact calculation and surds). OCR lists the laws of indices under Indices and surds, with algebraic use of the same laws in 6.01c.
- Eduqas C300QS: FN7 to FN9 and HN7 to HN9. The Foundation list (FN8) has fractions and π only; surds are in HN8.
- The index laws for algebra (for example x³ × x⁵) are in [05-algebra-notation-and-manipulation.md](05-algebra-notation-and-manipulation.md). Powers and roots of whole numbers are in [01-number-structure-and-calculation.md](01-number-structure-and-calculation.md).

## N7 Calculating with roots and indices

*Refs: AQA N7 · Edexcel N7 · OCR 3.01c · Eduqas FN7, HN7. Tier: F & H (part Higher only).*

### What you need to know

- The laws of indices for whole-number (integer) indices, including zero and negative indices:

```latex
a^m \times a^n = a^{m+n} \qquad a^m \div a^n = a^{m-n} \qquad (a^m)^n = a^{mn}
```

```latex
a^0 = 1 \qquad a^{-n} = \frac{1}{a^n}
```

- (HT only) Fractional indices:

```latex
a^{\frac{1}{n}} = \sqrt[n]{a} \qquad a^{\frac{m}{n}} = \left(\sqrt[n]{a}\right)^m
```

- Calculate with roots, for example simplifying √(16 × 9) = 4 × 3.

### Explained

The laws only work when the base is the same. 2³ × 2⁴ = 2⁷ because you are multiplying seven 2s. But 2³ × 3⁴ cannot be combined into a single power.

Why a⁰ = 1: 5³ ÷ 5³ = 1, and by the division law it is also 5⁰.

Why a negative index means a reciprocal: 5² ÷ 5⁵ = 25 ÷ 3125 = 1/125 = 1/5³, and by the division law it is also 5⁻³.

A negative index never makes the answer negative. 2⁻³ = 1/8, a small positive number.

(HT only) Fractional indices are roots. 27^(1/3) is the cube root of 27, which is 3. For a^(m/n), take the root first (the bottom number), then the power (the top number); the numbers stay smaller that way.

(HT only) For a negative fractional index, deal with the three parts one at a time: the minus sign means reciprocal, the denominator means root, the numerator means power.

```latex
\left(\frac{8}{27}\right)^{-\frac{2}{3}} = \left(\frac{27}{8}\right)^{\frac{2}{3}} = \left(\frac{3}{2}\right)^2 = \frac{9}{4}
```

### Worked example

Simplify 7⁵ × 7⁻² ÷ 7⁶, leaving your answer as a power of 7.

1. 5 + (−2) = 3, so the top is 7³.
2. 3 − 6 = −3, so the answer is 7⁻³.

Work out the value of 4⁻² .

1. 4⁻² = 1/4² = 1/16.

(HT only) Work out 32^(3/5).

1. Fifth root of 32 = 2.
2. 2³ = 8.

(HT only) Find x if 9^x = 1/3.

1. 9^(1/2) = 3, so 9^(−1/2) = 1/3.
2. x = −1/2.

(HT only) Write 8 × 2^n as a single power of 2.

1. 8 = 2³.
2. 2³ × 2^n = 2^(n+3).

### Common mistakes

- Multiplying the indices when multiplying numbers: 3² × 3⁴ is 3⁶, not 3⁸.
- Multiplying the bases: 3² × 3⁴ is not 9⁶.
- Writing 5⁰ = 0. It is 1.
- Making a negative index give a negative answer: 10⁻² = 0.01, not −100.
- (HT only) Doing the power before the root and getting a large number you cannot root mentally.

## N8 Exact calculation with fractions, π and surds

*Refs: AQA N8 · Edexcel N8 · OCR 3.03a, 3.03b · Eduqas FN8, HN8. Tier: F & H (part Higher only).*

### What you need to know

- Give exact answers using fractions (for example 2/3 rather than 0.667) and multiples of π (for example 36π cm²).
- (HT only) A surd is a root that cannot be written exactly as a whole number or fraction, such as √2 or √12. Give answers in surd form when asked for an exact answer.
- (HT only) Simplify surds using square factors:

```latex
\sqrt{ab} = \sqrt{a}\,\sqrt{b} \qquad \sqrt{\frac{a}{b}} = \frac{\sqrt{a}}{\sqrt{b}} \qquad \sqrt{a}\times\sqrt{a} = a
```

- (HT only) Expand brackets containing surds, and rationalise a denominator (rewrite a fraction so there is no surd on the bottom).

### Explained

Exact means not rounded. A circle of radius 6 cm has area π × 6² = 36π cm². Writing 113.1 cm² would be a rounded answer.

(HT only) To simplify a surd, find the largest square number that is a factor. √72 = √(36 × 2) = 6√2. Only like surds can be added: 3√5 + 2√5 = 5√5, but √2 + √3 cannot be simplified.

(HT only) Expanding brackets with surds works like algebra. Treat √3 like a letter, remembering √3 × √3 = 3.

(HT only) Rationalising:

- For a single surd on the bottom, multiply top and bottom by that surd.
- For a bottom of the form a + √b, multiply top and bottom by a − √b. The difference of two squares gets rid of the surd: (a + √b)(a − √b) = a² − b.

### Worked example

A semicircle has diameter 10 cm. Find its area, leaving your answer in terms of π.

1. Radius = 5 cm. Full circle = π × 5² = 25π.
2. Semicircle = 25π ÷ 2 = 12.5π cm² (or 25π/2 cm²).

(HT only) Simplify √50 + √18.

1. √50 = √(25 × 2) = 5√2.
2. √18 = √(9 × 2) = 3√2.
3. Total: 8√2.

(HT only) Expand and simplify (3 + √2)(5 − √2).

1. 3 × 5 = 15; 3 × (−√2) = −3√2; √2 × 5 = 5√2; √2 × (−√2) = −2.
2. 15 − 2 + 5√2 − 3√2 = 13 + 2√2.

(HT only) Rationalise the denominator of 12/√3.

1. Multiply top and bottom by √3: 12√3 / 3.
2. Simplify: 4√3.

(HT only) Write 4/(3 − √5) in the form a + b√5.

1. Multiply top and bottom by 3 + √5.
2. Bottom: (3 − √5)(3 + √5) = 9 − 5 = 4.
3. Top: 4(3 + √5) = 12 + 4√5.
4. (12 + 4√5)/4 = 3 + √5.

### Common mistakes

- Rounding when the question says "exact" or "in terms of π".
- (HT only) Writing √9 + √16 = √25. Roots of a sum are not sums of roots: √9 + √16 = 3 + 4 = 7.
- (HT only) Using a square factor that is not the largest, then not finishing: √72 = 2√18 is not fully simplified.
- (HT only) Forgetting that √a × √a = a when expanding.
- (HT only) Multiplying only the bottom of the fraction when rationalising.

## N9 Standard form

*Refs: AQA N9 · Edexcel N9 · OCR 3.02a, 3.02b · Eduqas FN9, HN9. Tier: F & H.*

### What you need to know

- A number in standard form is written as A × 10ⁿ where 1 ≤ A < 10 and n is an integer.
- Convert between ordinary numbers and standard form.
- Calculate with numbers in standard form, with and without a calculator, and interpret the answers.

### Explained

Standard form is a tidy way to write very large or very small numbers.

- Large numbers have a positive power: 4 600 000 = 4.6 × 10⁶ (the decimal point moves 6 places).
- Small numbers have a negative power: 0.000 052 = 5.2 × 10⁻⁵.
- Numbers between 1 and 10 have power 0: 7.3 = 7.3 × 10⁰.

The first number must be at least 1 and less than 10. So 23 × 10⁴ is not in standard form; it is 2.3 × 10⁵.

Without a calculator:

- Multiplying: multiply the numbers, add the powers, then adjust.
- Dividing: divide the numbers, subtract the powers, then adjust.
- Adding or subtracting: change both to ordinary numbers, or to the same power of 10, first.

On a calculator, use the ×10ˣ (or EXP) key and check the display carefully.

### Worked example

Work out (3 × 10⁴) × (6 × 10⁻⁷). Give your answer in standard form.

1. 3 × 6 = 18 and 10⁴ × 10⁻⁷ = 10⁻³.
2. 18 × 10⁻³ is not in standard form. 18 = 1.8 × 10¹.
3. Answer: 1.8 × 10⁻².

Work out (8.4 × 10⁹) ÷ (2.1 × 10³).

1. 8.4 ÷ 2.1 = 4; 10⁹ ÷ 10³ = 10⁶.
2. Answer: 4 × 10⁶.

Work out 5.2 × 10⁵ + 7 × 10⁴.

1. 520 000 + 70 000 = 590 000.
2. Answer: 5.9 × 10⁵.

The mass of a dust particle is 7.5 × 10⁻¹⁰ kg. How many particles have a total mass of 1.5 × 10⁻⁴ kg?

1. Divide: (1.5 × 10⁻⁴) ÷ (7.5 × 10⁻¹⁰).
2. 1.5 ÷ 7.5 = 0.2; 10⁻⁴ ÷ 10⁻¹⁰ = 10⁶.
3. 0.2 × 10⁶ = 2 × 10⁵ particles.

### Common mistakes

- Leaving the front number outside 1 to 10, for example 18 × 10⁻³.
- Getting the sign of the power wrong for small numbers. Small numbers (less than 1) have negative powers.
- Adding the front numbers and the powers when adding standard form numbers: 5.2 × 10⁵ + 7 × 10⁴ is not 12.2 × 10⁹.
- Adjusting the power the wrong way: 0.2 × 10⁶ = 2 × 10⁵, not 2 × 10⁷.

## Check questions

1. Simplify (5³)⁴ ÷ 5¹⁰. Give your answer as a power of 5. [2 marks]
2. Work out the value of 2⁻⁴ . [1 mark]
3. (HT only) Work out the value of 125^(−2/3). [2 marks]
4. (HT only) Find n if 4ⁿ = 2⁷ . [2 marks]
5. A circular rug has radius 1.5 m. Find its circumference, leaving your answer in terms of π. [2 marks]
6. (HT only) Simplify √75 − √12. [2 marks]
7. (HT only) Expand and simplify (2 − √7)². [2 marks]
8. (HT only) Rationalise the denominator and simplify 10/√5. [2 marks]
9. (HT only) Show that 6/(√3 + 1) = 3√3 − 3. [3 marks]
10. Write 0.000 407 in standard form. [1 mark]
11. Work out (6 × 10⁸) ÷ (1.5 × 10⁻²) without a calculator. Give your answer in standard form. [2 marks]
12. Light travels at 3 × 10⁸ m/s. Light from the Sun takes about 500 seconds to reach Earth. Estimate the distance from the Sun to Earth in metres, in standard form. [2 marks]
13. Work out 4.5 × 10⁻³ − 2 × 10⁻⁴ . Give your answer in standard form. [2 marks]

## Mark scheme

1. (5³)⁴ = 5¹² (1); 5¹² ÷ 5¹⁰ = 5² (1).
2. 1/16 (1).
3. Cube root of 125 = 5, so 125^(2/3) = 25 (1); answer 1/25 (1).
4. 4ⁿ = 2²ⁿ (1); 2n = 7, n = 3.5 (1).
5. Circumference = 2π × 1.5 or π × 3 (1) = 3π m (1).
6. √75 = 5√3 and √12 = 2√3 (1); 3√3 (1).
7. 4 − 2√7 − 2√7 + 7 or 4 − 4√7 + 7 (1); 11 − 4√7 (1).
8. 10√5/5 (1) = 2√5 (1).
9. Multiply top and bottom by √3 − 1 (1); bottom = 3 − 1 = 2 (1); top = 6√3 − 6, so (6√3 − 6)/2 = 3√3 − 3 (1).
10. 4.07 × 10⁻⁴ (1).
11. 6 ÷ 1.5 = 4 and 10⁸ ÷ 10⁻² = 10¹⁰ (1); 4 × 10¹⁰ (1).
12. 3 × 10⁸ × 500 = 1500 × 10⁸ (1) = 1.5 × 10¹¹ m (1).
13. 0.0045 − 0.0002 = 0.0043 (1); 4.3 × 10⁻³ (1).
