---
level: A-level
subject: Mathematics
topic: "Algebra: indices, surds, quadratics, simultaneous equations and inequalities"
as_content: "All of this file is AS content."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["B1", "B2", "B3", "B4", "B5"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P2.1", "P2.2", "P2.3", "P2.4", "P2.5"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.02a", "1.02b", "1.02c", "1.02d", "1.02e", "1.02f", "1.02g", "1.02h", "1.02i"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Ma1", "Ma2", "Ma3", "Ma4", "Ma5", "Ma6", "Ma7", "Ma8", "Ma9", "Ma10", "Ma11", "Ma12", "Ma13"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Algebra: indices, surds, quadratics, simultaneous equations and inequalities

This file covers the algebra that the rest of the course is built on: the laws of indices, surds, quadratic functions and the discriminant, simultaneous equations, and linear and quadratic inequalities.

## Overview

Everything here is AS content and is assumed in every later topic. Much of it extends GCSE Higher; the new parts are the discriminant conditions, quadratics "in a function of x", inequalities written in set notation, and shading regions for inequalities in two variables.

### Board differences

- AQA B1 to B5 and Edexcel 2.1 to 2.5 follow the DfE wording point for point.
- OCR H240 splits these into 1.02a to 1.02i. Its order is indices, surds, simultaneous equations, then quadratics, then inequalities.
- OCR MEI H640 uses Ma1 to Ma13. Ma1 (vocabulary such as "identity", "expression", "coefficient") and Ma6 (the meaning of points of intersection) are named separately.

## B1 Laws of indices

*Refs: AQA B1 · Edexcel 2.1 · OCR 1.02a · MEI Ma1, Ma12, Ma13. Level: AS & A.*

### What you need to know

- The laws of indices for all rational powers, including negative, zero and fractional indices.

```latex
a^m \times a^n = a^{m+n} \qquad a^m \div a^n = a^{m-n} \qquad (a^m)^n = a^{mn}
```

```latex
a^0 = 1 \qquad a^{-n} = \frac{1}{a^n} \qquad a^{\frac{1}{n}} = \sqrt[n]{a} \qquad a^{\frac{m}{n}} = \left(\sqrt[n]{a}\right)^m
```

### Explained

A negative power means "one over". A fractional power means a root: the denominator is the root, the numerator is the power. Work out the root first, because the numbers stay smaller.

Writing terms as powers of x is the key step before differentiating or integrating. For example:

```latex
\frac{3}{\sqrt{x}} = 3x^{-\frac{1}{2}} \qquad \frac{x^2 + 4}{x^3} = x^{-1} + 4x^{-3} \qquad \sqrt[3]{x^2} = x^{\frac{2}{3}}
```

Equations with the unknown in the power can often be solved by writing both sides as powers of the same base.

### Worked example

Evaluate 32^{−3/5}.

1. Fifth root of 32 is 2.
2. 2³ = 8.
3. The negative power gives 1/8.

Simplify (4x⁶y⁻²)^{3/2}.

1. 4^{3/2} = (√4)³ = 8.
2. (x⁶)^{3/2} = x⁹ and (y⁻²)^{3/2} = y⁻³.
3. Answer: 8x⁹/y³.

Solve 9^{x+1} = 27^{x}.

1. Write as powers of 3: 3^{2x+2} = 3^{3x}.
2. 2x + 2 = 3x, so x = 2.

Write (2√x − 1)² / x in the form ax^p + bx^q + cx^r.

1. Expand: 4x − 4√x + 1.
2. Divide each term by x: 4 − 4x^{−1/2} + x^{−1}.

### Common mistakes

- Writing 3x^{−2} as 1/(3x²). The power applies only to x, so it is 3/x².
- Adding the powers when terms are added: x² + x³ is not x⁵.
- Writing √(x² + 9) as x + 3.

## B2 Surds

*Refs: AQA B2 · Edexcel 2.2 · OCR 1.02b · MEI Ma10, Ma11. Level: AS & A.*

### What you need to know

- Simplify surds using √(ab) = √a × √b and √(a/b) = √a / √b.
- Rationalise denominators of the forms 1/√a and 1/(a ± √b).

### Explained

To simplify √n, split off the largest square factor: √72 = √36 × √2 = 6√2.

To rationalise a denominator a + √b, multiply top and bottom by a − √b (the conjugate). The product is a difference of two squares, so the surd disappears:

```latex
(a+\sqrt{b})(a-\sqrt{b}) = a^2 - b
```

### Worked example

Simplify √50 + √18 − √8.

1. 5√2 + 3√2 − 2√2 = 6√2.

Rationalise 6/√3.

1. Multiply by √3/√3: 6√3/3 = 2√3.

Write (5 + √3)/(2 − √3) in the form a + b√3.

1. Multiply top and bottom by 2 + √3.
2. Top: (5 + √3)(2 + √3) = 10 + 5√3 + 2√3 + 3 = 13 + 7√3.
3. Bottom: 4 − 3 = 1.
4. Answer: 13 + 7√3.

A rectangle has area 10 cm² and width (√5 + 1) cm. Find its length in the form a + b√5.

1. Length = 10/(√5 + 1). Multiply by (√5 − 1)/(√5 − 1).
2. 10(√5 − 1)/(5 − 1) = 10(√5 − 1)/4 = (5√5 − 5)/2.
3. Length = −5/2 + (5/2)√5 cm.

### Common mistakes

- √a + √b is not √(a + b).
- Forgetting to multiply the numerator by the conjugate as well.

## B3 Quadratic functions

*Refs: AQA B3 · Edexcel 2.3 · OCR 1.02d, 1.02e, 1.02f · MEI Ma2, Ma3. Level: AS & A.*

### What you need to know

- Sketch y = ax² + bx + c: shape, roots, y-intercept, turning point.
- The discriminant b² − 4ac and what its sign says about the roots.
- Complete the square to find the turning point.
- Solve quadratics by factorising, completing the square or the formula.
- Solve quadratics in a function of x, such as x⁴ − 5x² + 4 = 0 or 2^{2x} − 6 × 2^x + 8 = 0.

### Explained

**Discriminant.** For ax² + bx + c = 0:

| b² − 4ac | Roots | Graph |
| --- | --- | --- |
| > 0 | two distinct real roots | crosses the x-axis twice |
| = 0 | one repeated root | touches the x-axis |
| < 0 | no real roots | does not meet the x-axis |

"Real roots" (at least one) means b² − 4ac ≥ 0.

**Completing the square.**

```latex
ax^2 + bx + c = a\left(x + \frac{b}{2a}\right)^2 + c - \frac{b^2}{4a}
```

In practice, take out a, halve the coefficient of x, and adjust the constant. For y = a(x + p)² + q the turning point is (−p, q). It is a minimum if a > 0 and a maximum if a < 0.

**Quadratic formula.**

```latex
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
```

**Hidden quadratics.** If an equation contains u and u² for some expression u (such as x² and x⁴, or √x and x, or 3^x and 3^{2x}), substitute u, solve the quadratic in u, then go back to x. Reject values that are impossible, such as a negative value of 3^x or of √x.

### Worked example

Write 2x² − 12x + 23 in the form a(x + b)² + c and state the minimum point of y = 2x² − 12x + 23.

1. 2(x² − 6x) + 23.
2. 2[(x − 3)² − 9] + 23 = 2(x − 3)² + 5.
3. Minimum point (3, 5).

Find the values of k for which kx² + 4x + (k − 3) = 0 has two distinct real roots.

1. b² − 4ac > 0: 16 − 4k(k − 3) > 0.
2. 16 − 4k² + 12k > 0, so 4k² − 12k − 16 < 0, so k² − 3k − 4 < 0.
3. (k − 4)(k + 1) < 0, so −1 < k < 4.
4. Also k ≠ 0, otherwise the equation is not quadratic. Answer: −1 < k < 4, k ≠ 0.

Solve x⁴ − 13x² + 36 = 0.

1. Let u = x²: u² − 13u + 36 = 0, (u − 4)(u − 9) = 0.
2. x² = 4 or 9, so x = ±2 or ±3.

Solve 3^{2x} − 4 × 3^{x} + 3 = 0.

1. Let u = 3^x: u² − 4u + 3 = 0, (u − 1)(u − 3) = 0.
2. 3^x = 1 gives x = 0; 3^x = 3 gives x = 1.

Solve x − 5√x + 6 = 0.

1. Let u = √x: u² − 5u + 6 = 0, u = 2 or 3.
2. x = 4 or 9.

Find the set of values of k for which x² + (k − 2)x + k = 0 has real roots. (This uses the inequality method in B5.)

1. Real roots: (k − 2)² − 4k ≥ 0, so k² − 8k + 4 ≥ 0.
2. Critical values: k = (8 ± √48)/2 = 4 ± 2√3.
3. The quadratic in k is positive outside its roots: k ≤ 4 − 2√3 or k ≥ 4 + 2√3.
4. Check with k = 0 (in the set): x² − 2x = 0 has roots 0 and 2, which are real.

### Common mistakes

- Forgetting to multiply the "subtracted square" by a when a ≠ 1.
- Using b² − 4ac > 0 when the question says "real roots" (which allows equal roots, so ≥ 0).
- Forgetting the condition that the x² coefficient is non-zero.
- Keeping impossible roots, such as 2^x = −3.

## B4 Simultaneous equations

*Refs: AQA B4 · Edexcel 2.4 · OCR 1.02c · MEI Ma4, Ma5, Ma6. Level: AS & A.*

### What you need to know

- Solve two linear equations by elimination or substitution.
- Solve one linear and one quadratic equation by substitution.
- Interpret solutions as points of intersection of graphs. The number of solutions is the number of intersections; a repeated root means the line is a tangent.

### Explained

For a linear and a quadratic: rearrange the linear equation for one variable, substitute into the quadratic, solve, then substitute back into the linear equation (not the quadratic, which would give extra values).

The discriminant of the resulting quadratic tells you how a line and a curve meet: two points, a tangent (one point), or no meeting.

### Worked example

Solve y = 2x − 1 and x² + xy = 10.

1. Substitute: x² + x(2x − 1) = 10, so 3x² − x − 10 = 0.
2. (3x + 5)(x − 2) = 0, so x = 2 or x = −5/3.
3. Use the linear equation: x = 2 gives y = 3; x = −5/3 gives y = −13/3.
4. Solutions (2, 3) and (−5/3, −13/3).

Find the value of c for which the line y = 3x + c is a tangent to the curve y = x² − x + 2.

1. x² − x + 2 = 3x + c gives x² − 4x + (2 − c) = 0.
2. Tangent means one repeated root: 16 − 4(2 − c) = 0.
3. 16 − 8 + 4c = 0, so c = −2.

Solve 2x + 3y = 7 and 5x − 2y = 8.

1. Multiply: 4x + 6y = 14 and 15x − 6y = 24.
2. Add: 19x = 38, x = 2. Then 3y = 3, y = 1.

### Common mistakes

- Substituting back into the quadratic and getting extra, wrong pairs.
- Not pairing each x with its own y.

## B5 Inequalities

*Refs: AQA B5 · Edexcel 2.5 · OCR 1.02g, 1.02h, 1.02i · MEI Ma7, Ma8, Ma9. Level: AS & A.*

### What you need to know

- Solve linear and quadratic inequalities in one variable, including ones with brackets and fractions.
- Write answers with "and" and "or", or in set notation.
- Represent inequalities such as y > x + 1 and y > ax² + bx + c as regions on a graph.

### Explained

**Linear inequalities.** Solve like equations, but reverse the sign when you multiply or divide by a negative number.

**Quadratic inequalities.** Always use a sketch:

1. Rearrange to f(x) > 0 (or <, ≤, ≥).
2. Find the critical values: the roots of f(x) = 0.
3. Sketch y = f(x).
4. Read off where the graph is above (> 0) or below (< 0) the axis.

For a positive x² coefficient, "< 0" gives the region between the roots (one interval, use "and"), and "> 0" gives the two outer regions (use "or").

```latex
(x-1)(x-5) < 0 \iff 1 < x < 5 \iff \{x : 1 < x < 5\}
```

```latex
(x-1)(x-5) > 0 \iff x < 1 \text{ or } x > 5 \iff \{x : x < 1\} \cup \{x : x > 5\}
```

**Inequalities with x in the denominator.** Do not multiply by an expression that might be negative. Multiply both sides by the square of the denominator, which is positive.

**Regions.** Draw the boundary curve: a dashed line for < or > (points on it are not included), solid for ≤ or ≥. Shade the side that satisfies the inequality; test a point such as (0, 0) if unsure. Exam questions say whether to shade the wanted or unwanted region, so read carefully.

### Worked example

Solve 3 − 2x ≤ 11.

1. −2x ≤ 8, so x ≥ −4 (sign reverses).

Solve 2x² + 5x − 3 ≥ 0.

1. (2x − 1)(x + 3) = 0 at x = 1/2 and x = −3.
2. Positive x² coefficient: the graph is above the axis outside the roots.
3. x ≤ −3 or x ≥ 1/2. In set notation, {x : x ≤ −3} ∪ {x : x ≥ 1/2}.

Find the set of values of x satisfying both 4x − 3 > 5 and x² − 7x + 10 < 0.

1. First: x > 2.
2. Second: (x − 2)(x − 5) < 0, so 2 < x < 5.
3. Both: 2 < x < 5, or {x : 2 < x < 5}.

Solve 6/x > 2 for x ≠ 0.

1. Multiply by x² (positive): 6x > 2x².
2. 2x² − 6x < 0, so 2x(x − 3) < 0.
3. 0 < x < 3.

Describe the region that satisfies y ≥ x² − 4 and y < x + 2.

1. Solid parabola y = x² − 4 (roots ±2, vertex (0, −4)); the region is on or above it.
2. Dashed line y = x + 2; the region is below it.
3. They meet where x² − 4 = x + 2: x² − x − 6 = 0, x = 3 or x = −2, at (3, 5) and (−2, 0).
4. The region is the area enclosed between the parabola and the line for −2 ≤ x ≤ 3, including the parabola boundary but not the line.

### Common mistakes

- Writing the answer to "> 0" as one combined inequality such as 5 < x < 1, which is impossible.
- Multiplying by x when x could be negative.
- Using solid lines for strict inequalities.

## Check questions

1. Simplify (27x⁶)^{−2/3}. [2 marks]
2. Solve 4^{x} = 8^{x−1}. [3 marks]
3. Express (3 − √2)/(1 + √2) in the form a + b√2. [3 marks]
4. (a) Write x² + 10x + 18 in the form (x + p)² + q. (b) Hence state the coordinates of the turning point of y = x² + 10x + 18 and solve x² + 10x + 18 = 0, giving exact answers. [5 marks]
5. The equation x² + 2kx + 3k = 0 has equal roots. Find the possible values of k. [3 marks]
6. Solve 2x^{2/3} − 7x^{1/3} + 3 = 0. [4 marks]
7. Solve the simultaneous equations x − y = 4 and x² + y² = 40. [5 marks]
8. Find the set of values of k for which the line y = kx − 2 does not meet the curve y = x² + 2x + 2. [5 marks]
9. Solve 3x² + 2x − 8 < 0, giving your answer in set notation. [3 marks]
10. Solve (x − 2)/(x + 1) < 1 for x ≠ −1. [4 marks]
11. Sketch and shade the region where y ≤ 6 − x − x² and y ≥ 0. Give the coordinates where the boundaries meet. [4 marks]

## Mark scheme

1. 27^{−2/3} = 1/9 (1); x^{−4}, so 1/(9x⁴) (1).
2. 2^{2x} = 2^{3x−3} (1); 2x = 3x − 3 (1); x = 3 (1).
3. Multiply by (1 − √2)/(1 − √2) (1); numerator 3 − 3√2 − √2 + 2 = 5 − 4√2, denominator −1 (1); −5 + 4√2 (1).
4. (a) (x + 5)² − 7 (2: one for each of p and q). (b) (−5, −7) (1); (x + 5)² = 7 (1); x = −5 ± √7 (1).
5. 4k² − 12k = 0 (1); 4k(k − 3) = 0 (1); k = 0 or k = 3 (1).
6. u = x^{1/3}: 2u² − 7u + 3 = 0 (1); (2u − 1)(u − 3) = 0, u = 1/2 or 3 (1); x = u³ (1); x = 1/8 or 27 (1).
7. x = y + 4 (1); (y + 4)² + y² = 40, 2y² + 8y − 24 = 0 (1); y² + 4y − 12 = 0, (y + 6)(y − 2) = 0 (1); y = 2, x = 6 (1); y = −6, x = −2 (1).
8. x² + 2x + 2 = kx − 2 gives x² + (2 − k)x + 4 = 0 (1); no meeting: (2 − k)² − 16 < 0 (1); (2 − k)² < 16, so −4 < 2 − k < 4 (1); critical values k = −2, 6 (1); −2 < k < 6 (1).
9. (3x − 4)(x + 2) (1); critical values −2, 4/3 (1); {x : −2 < x < 4/3} (1).
10. Multiply by (x + 1)²: (x − 2)(x + 1) < (x + 1)² (1); (x + 1)[(x − 2) − (x + 1)] < 0, so −3(x + 1) < 0 (1); x + 1 > 0 (1); x > −1 (1).
11. Parabola roots x = −3 and x = 2, maximum at (−1/2, 25/4) (1); solid curve and solid axis (1); region between the curve and the x-axis for −3 ≤ x ≤ 2 shaded correctly (1); (−3, 0) and (2, 0) (1).
