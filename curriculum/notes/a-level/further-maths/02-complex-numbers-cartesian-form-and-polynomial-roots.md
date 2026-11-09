---
level: A-level
subject: Further Mathematics
topic: "Complex numbers: Cartesian form, conjugates and roots of polynomials"
as_content: "All of this file is AS content."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["B1", "B2", "B3"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["CP2.1", "CP2.2", "CP2.3"]
  - board: OCR
    code: "H245"
    spec_refs: ["4.02a", "4.02b", "4.02c", "4.02e", "4.02g", "4.02h", "4.02i", "4.02j"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Pj1", "Pj2", "Pj3", "Pj4", "Pj5"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Complex numbers: Cartesian form, conjugates and roots of polynomials

This file covers the number i, complex numbers written as x + iy, their arithmetic, complex conjugates, square roots of complex numbers, and solving quadratic, cubic and quartic equations with real coefficients.

## Overview

All AS content on every board. It assumes the quadratic formula, the discriminant, the factor theorem and polynomial division from A-level Maths ([../maths/02-algebra-indices-surds-quadratics-and-inequalities.md](../maths/02-algebra-indices-surds-quadratics-and-inequalities.md), [../maths/03-algebra-polynomials-and-partial-fractions.md](../maths/03-algebra-polynomials-and-partial-fractions.md)). The geometry of complex numbers (Argand diagrams, modulus and argument) is in [03-complex-numbers-argand-diagrams-modulus-argument-and-loci.md](03-complex-numbers-argand-diagrams-modulus-argument-and-loci.md).

### Board differences

- AQA B1 to B3; Edexcel CP2.1 to CP2.3; OCR 4.02a to 4.02c, 4.02e, 4.02g to 4.02j; MEI Pj1 to Pj5.
- OCR 4.02h names finding the two square roots of a complex number algebraically. The other boards use the same skill when solving quadratics with complex coefficients is not required, so treat it as useful for all.
- AQA B1 and Edexcel CP2.1 say a cubic will come with enough information to find one root, and a quartic with one complex root or one quadratic factor.

## B2 The language and arithmetic of complex numbers

*Refs: AQA B2 · Edexcel CP2.2 · OCR 4.02a, 4.02b, 4.02c, 4.02e · MEI Pj1, Pj4, Pj5. Level: AS & A.*

### What you need to know

- i² = −1, so √(−k) = i√k for k > 0.
- A complex number z = x + iy, with x, y real. Re(z) = x is the real part, Im(z) = y is the imaginary part (a real number, not iy).
- ℂ is the set of complex numbers. Real numbers are the complex numbers with y = 0; purely imaginary numbers have x = 0.
- Two complex numbers are equal if and only if their real parts are equal and their imaginary parts are equal. So z = 0 if and only if x = 0 and y = 0.
- Add, subtract, multiply and divide complex numbers.

### Explained

Treat i like an algebraic letter, and replace i² by −1 whenever it appears. Powers of i repeat in a cycle of four: i, −1, −i, 1.

```latex
(a+bi)(c+di) = (ac-bd) + (ad+bc)i
```

To divide, multiply the top and bottom by the conjugate of the bottom. This makes the denominator real, because (c + di)(c − di) = c² + d².

```latex
\frac{a+bi}{c+di} = \frac{(a+bi)(c-di)}{c^2+d^2}
```

Equating real and imaginary parts turns one complex equation into two real ones. This is how you solve for unknown real numbers.

### Worked example

Simplify (3 − 2i)(4 + 5i).

1. 12 + 15i − 8i − 10i² = 12 + 7i + 10 = 22 + 7i.

Write (5 + i)/(2 − 3i) in the form x + iy.

1. Multiply top and bottom by 2 + 3i.
2. Top: (5 + i)(2 + 3i) = 10 + 15i + 2i + 3i² = 7 + 17i.
3. Bottom: 4 + 9 = 13.
4. Answer: 7/13 + (17/13)i.

Find the real numbers a and b such that (a + bi)(2 + i) = 1 + 8i.

1. Expand: 2a − b + (a + 2b)i.
2. Real: 2a − b = 1. Imaginary: a + 2b = 8.
3. Solve: a = 2, b = 3.

Find i¹⁰³.

1. 103 = 4 × 25 + 3, so i¹⁰³ = i³ = −i.

### Common mistakes

- Writing Im(3 − 2i) = −2i. It is −2.
- Forgetting that i² = −1 gives a sign change: (2i)² = −4, not 4.
- Dividing the real and imaginary parts separately: (a + bi)/(c + di) is not a/c + (b/d)i.

## B3 The complex conjugate

*Refs: AQA B3 · Edexcel CP2.3 · OCR 4.02c, 4.02g · MEI Pj3. Level: AS & A.*

### What you need to know

- The conjugate of z = x + iy is z* = x − iy.
- zz* = x² + y², a real number. z + z* = 2x, also real.
- (z + w)* = z* + w*, (zw)* = z*w*.
- For a polynomial with real coefficients, non-real roots come in conjugate pairs: if α is a root, so is α*.

### Explained

Taking the conjugate of every term of p(z) = 0 gives p(z*) = 0 when every coefficient is real, because the conjugate of a real coefficient is itself. So the conjugate of a root is also a root.

A conjugate pair α, α* gives the real quadratic factor

```latex
(z-\alpha)(z-\alpha^*) = z^2 - (\alpha+\alpha^*)z + \alpha\alpha^* = z^2 - 2\,\mathrm{Re}(\alpha)\,z + |\alpha|^2
```

This is the key to cubics and quartics: one complex root gives a whole quadratic factor.

### Worked example

Solve z + 2z* = 6 − 4i.

1. Let z = x + iy. Then x + iy + 2x − 2iy = 3x − iy.
2. Real: 3x = 6, x = 2. Imaginary: −y = −4, y = 4.
3. z = 2 + 4i.

Find the quadratic with real coefficients that has 3 − 2i as a root.

1. The other root is 3 + 2i. Sum = 6, product = 9 + 4 = 13.
2. z² − 6z + 13 = 0.

Show that z = 1 + i satisfies z² − 2z + 2 = 0, and write down the other root.

1. (1 + i)² = 1 + 2i − 1 = 2i. 2i − 2(1 + i) + 2 = 0. ✓
2. The coefficients are real, so the other root is 1 − i.

### Common mistakes

- Using the conjugate pair rule when the coefficients are not all real. For z² − iz + 2 = 0, the roots are 2i and −i, not a conjugate pair.
- Writing (z − α)(z − α*) and expanding with sign errors. Use sum and product.

## B1 Solving quadratic, cubic and quartic equations

*Refs: AQA B1 · Edexcel CP2.1 · OCR 4.02g, 4.02h, 4.02i, 4.02j · MEI Pj2, Pj3. Level: AS & A.*

### What you need to know

- Solve any quadratic with real coefficients. A negative discriminant gives a conjugate pair.
- Find the two square roots of a complex number by equating parts.
- Solve a cubic or quartic with real coefficients given one root (or a factor), using conjugate pairs and the factor theorem.

### Explained

**Quadratics.** Use the formula or complete the square. If b² − 4ac < 0, write √(b² − 4ac) = i√(4ac − b²).

**Square roots of a + bi.** Let (x + iy)² = a + bi. Then x² − y² = a and 2xy = b. Substitute y = b/(2x) into the first and solve the quadratic in x². Only take the positive value of x² (x is real). The two roots are negatives of each other.

**Cubics.** A real cubic has either three real roots or one real root and a conjugate pair. Given a complex root, build the quadratic factor from the pair, then divide (or compare coefficients) to find the linear factor. Given a real root, factorise and solve the quadratic.

**Quartics.** Given one complex root, use its conjugate to get a quadratic factor; the other factor is a quadratic you can solve. Given a quadratic factor, divide.

Comparing coefficients is often quicker than long division. If z³ + pz² + qz + r = (z² + bz + c)(z + d), the constant terms give r = cd.

### Worked example

Solve z² + 4z + 13 = 0.

1. z = [−4 ± √(16 − 52)]/2 = [−4 ± 6i]/2 = −2 ± 3i.

Find the square roots of 5 − 12i.

1. (x + iy)² = 5 − 12i, so x² − y² = 5 and xy = −6.
2. y = −6/x: x² − 36/x² = 5, so x⁴ − 5x² − 36 = 0, (x² − 9)(x² + 4) = 0.
3. x² = 9, x = ±3, y = ∓2.
4. Square roots: 3 − 2i and −3 + 2i.

Given that 2 + i is a root of z³ − 7z² + 17z − 15 = 0, solve the equation.

1. 2 − i is also a root. Quadratic factor: z² − 4z + 5.
2. z³ − 7z² + 17z − 15 = (z² − 4z + 5)(z − 3). Check the constant: 5 × (−3) = −15. ✓
3. Roots: 2 + i, 2 − i, 3.

Given that 1 − 2i is a root of z⁴ − 2z³ + 6z² − 2z + 5 = 0, solve it.

1. 1 + 2i is a root, so z² − 2z + 5 is a factor.
2. Let z⁴ − 2z³ + 6z² − 2z + 5 = (z² − 2z + 5)(z² + az + b).
3. Constant: 5b = 5, b = 1. z³: a − 2 = −2, a = 0. Check z²: b − 2a + 5 = 6 ✓.
4. z² + 1 = 0 gives z = ±i.
5. Roots: 1 ± 2i, ±i.

Solve z³ + 2z² + 5z − 26 = 0, given z = 2 is a root.

1. Divide: z³ + 2z² + 5z − 26 = (z − 2)(z² + 4z + 13).
2. z² + 4z + 13 = 0 gives z = −2 ± 3i.
3. Roots: 2, −2 ± 3i.

### Common mistakes

- When finding square roots, accepting x² = −4. x is real, so x² cannot be negative.
- Stopping at the quadratic factor and not finding the remaining roots.
- Forgetting that a quartic has four roots (counted with repetition).

## Check questions

1. Given z = 4 − 3i and w = 1 + 2i, find in the form a + bi: (a) zw, (b) z/w, (c) z*w. [5 marks]
2. Find the real numbers x and y such that (x + iy)(3 − i) = 7 + i. [3 marks]
3. Solve the equation 2z − iz* = 3 + 6i. [4 marks]
4. Find the two square roots of −15 + 8i. [4 marks]
5. Solve z² − 6z + 34 = 0. [2 marks]
6. Given that 3 − i is a root of z³ − 8z² + 22z − 20 = 0, find the other roots. [5 marks]
7. The equation z⁴ − 4z³ + 9z² − 16z + 20 = 0 has a root 2i. Find all the roots. [6 marks]
8. The cubic z³ + az² + bz + 10 = 0, with a and b real, has a root 1 + 2i. Find a and b, and the real root. [6 marks]

## Mark scheme

1. (a) 4 + 8i − 3i − 6i² = 10 + 5i (2). (b) (4 − 3i)(1 − 2i)/5 = (4 − 8i − 3i − 6)/5 = (−2 − 11i)/5 (2). (c) (4 + 3i)(1 + 2i) = 4 + 8i + 3i − 6 = −2 + 11i (1).
2. 3x + y = 7 (1), 3y − x = 1 (1), x = 2, y = 1 (1).
3. z = x + iy: 2x + 2iy − i(x − iy) = 2x − y + i(2y − x) (1). 2x − y = 3, 2y − x = 6 (1). x = 4 (1), y = 5, z = 4 + 5i (1).
4. x² − y² = −15, xy = 4 (1). x⁴ + 15x² − 16 = 0 (1). x² = 1 (1). Roots 1 + 4i and −1 − 4i (1).
5. z = 3 ± 5i (2).
6. 3 + i is a root (1). Factor z² − 6z + 10 (2). Other factor z − 2 (1). Roots 3 + i, 2 (1).
7. −2i is a root (1). Factor z² + 4 (1). Other factor z² + az + 5 with a = −4 (2). z² − 4z + 5 = 0 gives 2 ± i (1). Roots ±2i, 2 ± i (1).
8. 1 − 2i is a root (1). Factor z² − 2z + 5 (1). Real root: constant 5 × (−r) = 10, so the factor is z + 2 and the real root is −2 (1). (z² − 2z + 5)(z + 2) = z³ + 0z² + z + 10 (2). a = 0, b = 1 (1).
