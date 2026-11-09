---
level: A-level
subject: Mathematics
topic: "Integration: the fundamental theorem, powers of x and areas"
as_content: "The Fundamental Theorem of Calculus, integrating xⁿ (n ≠ −1), definite integrals and the area between a curve and the x-axis are AS. The area between two curves is A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["H1", "H2", "H3"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P8.1", "P8.2", "P8.3"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.08a", "1.08b", "1.08d", "1.08e", "1.08f"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Mc19", "Mc20", "Mc21", "Mc22", "Mc23", "Mc26"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Integration: the fundamental theorem, powers of x and areas

This file covers integration as the reverse of differentiation, integrating powers of x, finding the constant of integration, evaluating definite integrals, and using them to find areas. Integrating other functions, and the techniques of substitution, parts and partial fractions, are in file 15.

## Overview

AS: the Fundamental Theorem of Calculus, indefinite and definite integrals of xⁿ (n ≠ −1), and the area between a curve and the x-axis. A-level only: the area between two curves (and between a curve and a line).

### Board differences

- AQA H1, H3 and the xⁿ part of H2; Edexcel 8.1 to 8.3.
- OCR H240: 1.08a, 1.08b, 1.08d, 1.08e (AS); 1.08f (A-level only).
- OCR MEI H640: Mc19 to Mc23 (AS) and Mc26 (A-level only). MEI lists finding the constant of integration from a given point (Mc21) as its own outcome.

## H1 The Fundamental Theorem of Calculus

*Refs: AQA H1 · Edexcel 8.1 · OCR 1.08a · MEI Mc19, Mc22. Level: AS & A.*

### What you need to know

- Integration is the reverse of differentiation.
- If F′(x) = f(x), then

```latex
\int f(x)\,dx = F(x) + c \qquad \int_a^b f(x)\,dx = F(b) - F(a)
```

- An indefinite integral has a constant of integration; a definite integral has limits and gives a number.

### Explained

The Fundamental Theorem of Calculus links two ideas: the area under a curve and the reverse of differentiation. If A(x) is the area under y = f(x) from a fixed point up to x, then increasing x by a small amount h adds a thin strip of area about f(x) × h. So [A(x + h) − A(x)]/h ≈ f(x), and in the limit A′(x) = f(x). The area function is an antiderivative of f.

The constant c appears because every constant differentiates to zero, so there is a family of antiderivatives. In a definite integral the constant cancels.

### Worked example

Explain why ∫ 2x dx = x² + c.

1. d/dx(x² + c) = 2x for any constant c.
2. So every function x² + c is an antiderivative of 2x.

### Common mistakes

- Leaving out + c in an indefinite integral.

## H2 Integrating xⁿ

*Refs: AQA H2 · Edexcel 8.2 · OCR 1.08b · MEI Mc20, Mc21. Level: AS & A.*

### What you need to know

```latex
\int x^n\,dx = \frac{x^{n+1}}{n+1} + c \quad (n \ne -1)
```

- Integrate sums, differences and constant multiples term by term.
- Find c from a point on the curve.

### Explained

Add one to the power, then divide by the new power. As with differentiation, first write every term as a power of x: expand brackets, split fractions with one term on the bottom, and turn roots into fractional powers.

If you know dy/dx and one point on the curve, integrate to find y with + c, then substitute the point to find c.

### Worked example

Find ∫(6x² − 4x + 3) dx.

1. 2x³ − 2x² + 3x + c.

Find ∫(3/x² + 2√x) dx.

1. ∫(3x⁻² + 2x^{1/2}) dx.
2. = −3x⁻¹ + (4/3)x^{3/2} + c.

Find ∫(x² − 2)/√x dx.

1. Split: x^{3/2} − 2x^{−1/2}.
2. (2/5)x^{5/2} − 4x^{1/2} + c.

A curve has gradient f′(x) = 3x² − 2 and passes through (2, 5). Find f(x).

1. f(x) = x³ − 2x + c.
2. 8 − 4 + c = 5, so c = 1.
3. f(x) = x³ − 2x + 1.

### Common mistakes

- Dividing by the old power instead of the new one.
- Integrating a product or quotient term by term without expanding or splitting first.

## H3 Definite integrals and areas

*Refs: AQA H3 · Edexcel 8.3 · OCR 1.08d, 1.08e, 1.08f · MEI Mc22, Mc23, Mc26. Level: AS & A (part A-level only).*

### What you need to know

- Evaluate definite integrals.
- The area between y = f(x), the x-axis and the lines x = a and x = b is ∫ₐᵇ f(x) dx when the curve is above the axis.
- A definite integral of a curve below the x-axis is negative. For an area that crosses the axis, split it at the roots and add the sizes.
- (A-level only) The area between two curves y = f(x) (upper) and y = g(x) (lower) is

```latex
\int_a^b \left[f(x) - g(x)\right] dx
```

### Explained

Write the integral in square brackets with the limits, substitute the top limit, substitute the bottom limit, subtract. Show this step: many marks depend on it.

For areas, always sketch first. Find where the curve crosses the axis. Integrate each section separately and take the size (modulus) of any negative result.

(A-level only) For two curves, find the x-coordinates where they meet, and integrate "top minus bottom". This works even if part of the region is below the x-axis. A region bounded by a curve and a straight line can also be done as "area under the curve" plus or minus a triangle or trapezium.

### Worked example

Evaluate ∫₁³(x² + 1) dx.

1. [x³/3 + x]₁³ = (9 + 3) − (1/3 + 1).
2. = 12 − 4/3 = 32/3.

Evaluate ∫₁⁴ 3√x dx.

1. [2x^{3/2}]₁⁴ = 2(8) − 2(1) = 14.

Find the total area between y = x³ − x² − 2x and the x-axis.

1. y = x(x − 2)(x + 1), roots −1, 0, 2.
2. From −1 to 0 (above the axis): [x⁴/4 − x³/3 − x²] gives 0 − (1/4 + 1/3 − 1) = 5/12.
3. From 0 to 2 (below): (4 − 8/3 − 4) − 0 = −8/3.
4. Total area = 5/12 + 8/3 = 37/12.
5. Note: ∫ from −1 to 2 in one go would give 5/12 − 8/3 = −9/4, which is not the area.

(A-level only) Find the area enclosed by y = x² and y = x + 2.

1. x² = x + 2, so (x − 2)(x + 1) = 0: x = −1, 2.
2. The line is above the curve between them.
3. ∫ from −1 to 2 of (x + 2 − x²) dx = [x²/2 + 2x − x³/3] from −1 to 2.
4. = (2 + 4 − 8/3) − (1/2 − 2 + 1/3) = 10/3 + 7/6 = 9/2.

(A-level only) Find the area between y = 4x − x² and y = x.

1. 4x − x² = x gives x = 0, 3.
2. ∫₀³(3x − x²) dx = [3x²/2 − x³/3]₀³ = 27/2 − 9 = 9/2.

### Common mistakes

- Integrating straight across a root and getting the wrong area.
- Substituting the limits the wrong way round.
- (A-level only) Subtracting "bottom minus top", giving a negative area.

## Check questions

1. Find ∫(4x³ − 6x + 5) dx. [2 marks]
2. Find ∫(x + 3)(x − 1)/√x dx. [4 marks]
3. A curve has dy/dx = 6x² − 2/x² and passes through (1, 4). Find its equation. [4 marks]
4. Evaluate ∫₁² (3x² − 2/x³) dx. [3 marks]
5. Evaluate ∫₁⁹ (1/√x) dx. [3 marks]
6. Find the area enclosed by y = x² − 4x and the x-axis. [4 marks]
7. Find the total area between y = x³ − 4x and the x-axis for −2 ≤ x ≤ 2. [4 marks]
8. Given that ∫₀ᵏ (2x + 3) dx = 10 and k > 0, find k. [3 marks]
9. (A-level only) Find the area of the region enclosed by y = 6 − x² and y = x. [5 marks]

## Mark scheme

1. x⁴ − 3x² + 5x + c (2: 1 for two correct terms, 1 for all with + c).
2. Expand to x² + 2x − 3 (1); divide by x^{1/2}: x^{3/2} + 2x^{1/2} − 3x^{−1/2} (1); integrate (1); (2/5)x^{5/2} + (4/3)x^{3/2} − 6x^{1/2} + c (1).
3. y = 2x³ + 2x⁻¹ + c (2); 2 + 2 + c = 4, so c = 0 (1); y = 2x³ + 2/x (1).
4. [x³ + x⁻²]₁² (1); (8 + 1/4) − (1 + 1) (1); 25/4 (1).
5. [2x^{1/2}] (1); 6 − 2 (1); 4 (1).
6. Roots x = 0 and x = 4 (1); ∫₀⁴(x² − 4x) dx = [x³/3 − 2x²]₀⁴ (1); = −32/3 (1); area 32/3 (1).
7. Roots −2, 0, 2 (1); ∫ from −2 to 0 = 4 (1); ∫ from 0 to 2 = −4 (1); total 8 (1).
8. [x² + 3x]₀ᵏ = k² + 3k (1); k² + 3k − 10 = 0, (k + 5)(k − 2) = 0 (1); k = 2 (1).
9. 6 − x² = x gives x = −3, 2 (1); ∫ from −3 to 2 of (6 − x − x²) dx (1); [6x − x²/2 − x³/3] (1); (22/3) − (−27/2) (1); 125/6 (1).
