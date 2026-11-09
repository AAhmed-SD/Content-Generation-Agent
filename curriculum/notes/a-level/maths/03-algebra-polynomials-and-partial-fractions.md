---
level: A-level
subject: Mathematics
topic: "Algebra: polynomials, rational expressions and partial fractions"
as_content: "Polynomial manipulation, algebraic division and the factor theorem are AS. Simplifying rational expressions and partial fractions are A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["B6", "B10"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P2.6", "P2.10"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.02j", "1.02k", "1.02y"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Ma15", "Ma16", "Mf1", "Mf2"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Algebra: polynomials, rational expressions and partial fractions

This file covers expanding and factorising polynomials, dividing a polynomial by a linear expression, the factor theorem, simplifying algebraic fractions, and splitting a fraction into partial fractions.

## Overview

AS: expanding, collecting terms, factorising, simple algebraic division and the factor theorem. A-level only: simplifying rational expressions (algebraic fractions) and partial fractions. Partial fractions are used again in integration (file 15) and in the binomial expansion (file 07).

### Board differences

- AQA B6 and B10; Edexcel 2.6 and 2.10. Edexcel's guidance limits division to dividing by (ax + b) or (ax − b).
- OCR H240: 1.02j (AS), 1.02k and 1.02y (A-level only).
- OCR MEI H640: Mf1 and Mf2 (AS); Ma15 and Ma16 (A-level only).
- All four boards limit partial fractions to denominators with linear factors, including a squared linear factor, and at most three partial fractions.

## B6 Polynomials and the factor theorem

*Refs: AQA B6 · Edexcel 2.6 · OCR 1.02j, 1.02k · MEI Mf1, Mf2, Ma16. Level: AS & A (part A-level only).*

### What you need to know

- Expand brackets, collect like terms, and factorise polynomials.
- Divide a polynomial by a linear expression (x ± a or ax ± b).
- The factor theorem: (x − a) is a factor of f(x) if and only if f(a) = 0. More generally, (ax − b) is a factor if and only if f(b/a) = 0.
- (A-level only) Simplify rational expressions by factorising and cancelling, and by algebraic division by linear expressions.

### Explained

**Factor theorem.** If f(a) = 0, then x = a is a root, so (x − a) is a factor. To factorise a cubic:

1. Try small values (±1, ±2, ±3, and fractions from factors of the constant over factors of the leading coefficient) until f(a) = 0.
2. Divide by (x − a) to get a quadratic.
3. Factorise the quadratic.

**Division.** Three equivalent methods: long division, comparing coefficients, or the grid (box) method. Comparing coefficients is quick: write f(x) = (x − a)(px² + qx + r) + R and match the powers of x.

The result can be written as

```latex
f(x) = (\text{divisor}) \times (\text{quotient}) + \text{remainder}
```

**Sketching cubics.** Once fully factorised, a cubic's roots and y-intercept give its sketch (see file 04).

**(A-level only) Rational expressions.** A rational expression is one polynomial divided by another. Factorise top and bottom fully, then cancel common factors (whole brackets, never single terms). To add or subtract, use a common denominator. To divide, multiply by the reciprocal.

### Worked example

Show that (x − 3) is a factor of f(x) = 2x³ − 3x² − 11x + 6 and factorise f(x) fully.

1. f(3) = 54 − 27 − 33 + 6 = 0, so (x − 3) is a factor.
2. Compare coefficients: 2x³ − 3x² − 11x + 6 = (x − 3)(2x² + bx − 2). The x² terms give −3 = b − 6, so b = 3.
3. Check the x terms: (x − 3)(2x² + 3x − 2) gives −2x − 9x = −11x ✓.
4. 2x² + 3x − 2 = (2x − 1)(x + 2).
5. f(x) = (x − 3)(2x − 1)(x + 2).

Factorise g(x) = 2x³ + 3x² − 8x + 3 fully.

1. Constant 3, leading coefficient 2, so try ±1, ±3, ±1/2, ±3/2.
2. g(1) = 2 + 3 − 8 + 3 = 0, so (x − 1) is a factor.
3. Divide: 2x³ + 3x² − 8x + 3 = (x − 1)(2x² + 5x − 3).
4. 2x² + 5x − 3 = (2x − 1)(x + 3).
5. g(x) = (x − 1)(2x − 1)(x + 3).

Divide x³ − 2x² + 4 by (x − 3).

1. Long division: x³ ÷ x = x²; x²(x − 3) = x³ − 3x²; subtract to get x² + 0x.
2. x² ÷ x = x; x(x − 3) = x² − 3x; subtract to get 3x + 4.
3. 3x ÷ x = 3; 3(x − 3) = 3x − 9; subtract to get 13.
4. x³ − 2x² + 4 = (x − 3)(x² + x + 3) + 13.

f(x) = x³ + ax² + bx − 6. (x − 1) is a factor and f(−1) = 4. Find a and b.

1. f(1) = 0: 1 + a + b − 6 = 0, so a + b = 5.
2. f(−1) = 4: −1 + a − b − 6 = 4, so a − b = 11.
3. Adding: 2a = 16, a = 8, b = −3.

(A-level only) Simplify (x² − 9)/(2x² + 5x − 3).

1. Top: (x − 3)(x + 3). Bottom: (2x − 1)(x + 3).
2. Cancel (x + 3): (x − 3)/(2x − 1).

(A-level only) Write as a single fraction: 3/(x + 2) − 1/(x − 1).

1. Common denominator (x + 2)(x − 1).
2. [3(x − 1) − (x + 2)] / [(x + 2)(x − 1)] = (2x − 5)/[(x + 2)(x − 1)].

(A-level only) Simplify (x³ + 2x² − 5x − 6)/(x + 1).

1. f(−1) = −1 + 2 + 5 − 6 = 0, so the division is exact.
2. x³ + 2x² − 5x − 6 = (x + 1)(x² + x − 6).
3. Answer: x² + x − 6, or (x + 3)(x − 2).

### Common mistakes

- Using f(3) to test for the factor (x + 3). The factor (x + 3) needs f(−3) = 0.
- Cancelling terms rather than factors: (x² + 3)/(x + 3) does not simplify to x + 1.
- Forgetting a zero placeholder for a missing power in long division (x³ − 2x² + 4 has no x term).

## B10 Partial fractions

*Refs: AQA B10 · Edexcel 2.10 · OCR 1.02y · MEI Ma15. Level: A-level only.*

### What you need to know

- (A-level only) Split a proper rational function into partial fractions where the denominator has linear factors, possibly one squared linear factor, with at most three terms and numerators that are constants.

The forms are:

```latex
\frac{px+q}{(ax+b)(cx+d)} \equiv \frac{A}{ax+b} + \frac{B}{cx+d}
```

```latex
\frac{px^2+qx+r}{(ax+b)(cx+d)(ex+f)} \equiv \frac{A}{ax+b} + \frac{B}{cx+d} + \frac{C}{ex+f}
```

```latex
\frac{px^2+qx+r}{(ax+b)(cx+d)^2} \equiv \frac{A}{ax+b} + \frac{B}{cx+d} + \frac{C}{(cx+d)^2}
```

### Explained

Partial fractions undo "adding fractions". The method:

1. Write the identity with unknown constants A, B, C.
2. Multiply through by the full denominator to get an identity between polynomials.
3. Substitute values of x that make factors zero, to find constants one at a time.
4. For a repeated factor, one constant will not be found this way; compare coefficients (often of x² or of the constant term) instead.
5. Check by substituting a convenient value such as x = 0.

This is an identity: it is true for every x, which is why you can substitute any value you like.

### Worked example

Express (5x + 1)/[(x − 1)(x + 2)] in partial fractions.

1. 5x + 1 ≡ A(x + 2) + B(x − 1).
2. x = 1: 6 = 3A, so A = 2.
3. x = −2: −9 = −3B, so B = 3.
4. Answer: 2/(x − 1) + 3/(x + 2).

Express (2x² + 9x − 3)/[x(x − 1)(x + 3)] in partial fractions.

1. 2x² + 9x − 3 ≡ A(x − 1)(x + 3) + Bx(x + 3) + Cx(x − 1).
2. x = 0: −3 = −3A, so A = 1.
3. x = 1: 8 = 4B, so B = 2.
4. x = −3: 18 − 27 − 3 = −12 = 12C, so C = −1.
5. Answer: 1/x + 2/(x − 1) − 1/(x + 3).

Express (2x² + 2)/[(x + 1)(x − 1)²] in partial fractions.

1. 2x² + 2 ≡ A(x − 1)² + B(x + 1)(x − 1) + C(x + 1).
2. x = 1: 4 = 2C, so C = 2.
3. x = −1: 4 = 4A, so A = 1.
4. Compare x² coefficients: 2 = A + B, so B = 1.
5. Check x = 0: left side 2; right side A − B + C = 1 − 1 + 2 = 2 ✓.
6. Answer: 1/(x + 1) + 1/(x − 1) + 2/(x − 1)².

Express (x + 4)/[(2x + 1)(x − 1)] in partial fractions.

1. x + 4 ≡ A(x − 1) + B(2x + 1).
2. x = 1: 5 = 3B, so B = 5/3.
3. x = −1/2: 3.5 = −1.5A, so A = −7/3.
4. Answer: −7/[3(2x + 1)] + 5/[3(x − 1)].

### Common mistakes

- Missing the B/(cx + d) term when (cx + d)² is in the denominator. A repeated factor needs both the single and the squared term.
- Arithmetic slips when substituting fractions such as x = −1/2. Check with x = 0 at the end.
- Trying partial fractions on an improper fraction (degree of top ≥ degree of bottom) without dividing first.

## Check questions

1. Use the factor theorem to show that (x + 1) is a factor of x³ + 2x² − 5x − 6, and hence factorise it fully. [4 marks]
2. f(x) = 2x³ + px² − 13x + 6, and (x − 2) is a factor of f(x). (a) Find p. (b) Solve f(x) = 0. [5 marks]
3. Show that (x + 2) is not a factor of x³ − 3x + 5. [2 marks]
4. Find the quotient and remainder when 2x³ + x² − 7x + 1 is divided by (x − 2). [3 marks]
5. (A-level only) Simplify (x² + x − 6)/(x² − 4). [3 marks]
6. (A-level only) Simplify [(2x² − 7x − 4)/(x² − 16)] ÷ [(2x + 1)/(x + 4)]. [3 marks]
7. (A-level only) Express (4x + 5)/[(x + 1)(x + 2)] in partial fractions. [3 marks]
8. (A-level only) Express (7x + 1)/[(x − 1)(x + 1)²] in partial fractions. [4 marks]
9. (A-level only) Express (3x² − 4x − 1)/[x(x − 1)(x + 1)] in partial fractions. [4 marks]

## Mark scheme

1. f(−1) = −1 + 2 + 5 − 6 = 0, so (x + 1) is a factor (1); divide to get x² + x − 6 (1); (x + 3)(x − 2) (1); f(x) = (x + 1)(x + 3)(x − 2) (1).
2. (a) f(2) = 16 + 4p − 26 + 6 = 0 (1); p = 1 (1). (b) 2x³ + x² − 13x + 6 = (x − 2)(2x² + 5x − 3) (1); = (x − 2)(2x − 1)(x + 3) (1); x = 2, 1/2, −3 (1).
3. f(−2) = −8 + 6 + 5 = 3 (1); not zero, so not a factor (1).
4. Division attempted (1); quotient 2x² + 5x + 3 (1); remainder 7 (1). Check: f(2) = 16 + 4 − 14 + 1 = 7.
5. Numerator (x + 3)(x − 2) (1); denominator (x − 2)(x + 2) (1); (x + 3)/(x + 2) (1).
6. 2x² − 7x − 4 = (2x + 1)(x − 4) and x² − 16 = (x − 4)(x + 4) (1); multiply by (x + 4)/(2x + 1) (1); everything cancels to 1 (1).
7. 4x + 5 ≡ A(x + 2) + B(x + 1) (1); A = 1 (1); B = 3, so 1/(x + 1) + 3/(x + 2) (1).
8. 7x + 1 ≡ A(x + 1)² + B(x − 1)(x + 1) + C(x − 1) (1); x = 1 gives A = 2 (1); x = −1 gives C = 3 (1); x² coefficients give B = −2: 2/(x − 1) − 2/(x + 1) + 3/(x + 1)² (1).
9. 3x² − 4x − 1 ≡ A(x − 1)(x + 1) + Bx(x + 1) + Cx(x − 1) (1); x = 0: −1 = −A, A = 1 (1); x = 1: −2 = 2B, B = −1 (1); x = −1: 6 = 2C, C = 3, so 1/x − 1/(x − 1) + 3/(x + 1) (1).
