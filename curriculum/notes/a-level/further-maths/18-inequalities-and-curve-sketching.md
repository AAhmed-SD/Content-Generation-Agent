---
level: A-level
subject: Further Mathematics
topic: "Inequalities and curve sketching"
as_content: "AQA lists this content in its A-level specification without marking AS; Edexcel has it in the FP1 option. Treat it as A-level only unless your AS specification lists it."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["D8", "D9", "D10", "D11", "D12", "D13", "D14", "D16"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FP1 7.1"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Inequalities and curve sketching

This file covers cubic and quartic inequalities, inequalities with rational expressions and moduli, the graphs of y = |f(x)| and y = 1/f(x), graphs of rational functions with vertical, horizontal and oblique asymptotes, finding the range of a rational function using quadratic theory, and transformations of curves including reflections in y = ±x.

## Overview

This is AQA compulsory content (D8 to D14, D16) and Edexcel FP1 7.1. OCR and MEI do not list it separately; it builds on A-level Maths graphs and modulus ([../maths/04-functions-and-graphs.md](../maths/04-functions-and-graphs.md)) and quadratic inequalities ([../maths/02-algebra-indices-surds-quadratics-and-inequalities.md](../maths/02-algebra-indices-surds-quadratics-and-inequalities.md)). Conic sections are in [19-conic-sections.md](19-conic-sections.md).

### Board differences

- AQA D8 to D14 and D16; Edexcel FP1 7.1 (algebraic inequalities, including rational functions and modulus).
- AQA D14 asks for the range and stationary points of (ax² + bx + c)/(dx² + ex + f) using the discriminant, "not calculus".
- AQA D16 includes reflections in y = ±x and composite transformations with rotations and enlargements.

## D8 Polynomial inequalities

*Refs: AQA D8. Level: A-level only.*

### What you need to know

- Solve cubic and quartic inequalities by factorising and using a sketch or a sign table.

### Explained

Factorise fully, mark the roots on a number line, and find the sign in each interval. A cubic with positive leading coefficient goes from − to + overall; a quartic with positive leading coefficient is positive at both ends. A repeated root does not change the sign.

### Worked example

Solve x³ − 4x² + x + 6 > 0.

1. x = −1 is a root: factorise to (x + 1)(x − 2)(x − 3).
2. Signs: x < −1 negative; −1 < x < 2 positive; 2 < x < 3 negative; x > 3 positive.
3. −1 < x < 2 or x > 3.

Solve x⁴ − 5x² + 4 < 0.

1. (x² − 1)(x² − 4) = (x − 1)(x + 1)(x − 2)(x + 2).
2. Negative on −2 < x < −1 and 1 < x < 2.

### Common mistakes

- Dividing both sides by a factor that could be negative.

## D9 Inequalities with rational expressions

*Refs: AQA D9, D12 · Edexcel FP1 7.1. Level: A-level only.*

### What you need to know

- Never multiply an inequality by an expression that may be negative.
- Either multiply both sides by the square of the denominator, or bring everything to one side as a single fraction and use a sign table.
- Values that make a denominator zero are never in the solution set.

### Explained

The single-fraction method: rearrange to f(x)/g(x) > 0, factorise top and bottom, and use the critical values (zeros of top and bottom) on a number line.

The squaring method: multiply by (denominator)², which is positive, then factorise.

### Worked example

Solve (x + 3)/(x − 1) < 2.

1. (x + 3)/(x − 1) − 2 < 0, so (x + 3 − 2x + 2)/(x − 1) < 0, that is (5 − x)/(x − 1) < 0.
2. Critical values 1 and 5. Test: x = 0 gives 5/(−1) < 0 ✓; x = 2 gives 3/1 > 0; x = 6 gives −1/5 < 0 ✓.
3. x < 1 or x > 5.

Solve (x² − 1)/(x + 3) > x − 2.

1. [x² − 1 − (x − 2)(x + 3)]/(x + 3) > 0, so (5 − x)/(x + 3) > 0.
2. −3 < x < 5.

### Common mistakes

- Multiplying by (x − 1) and getting x + 3 < 2x − 2, which is wrong when x < 1.
- Including x = 1 in the answer.

## D10 Modulus inequalities

*Refs: AQA D10 · Edexcel FP1 7.1. Level: A-level only.*

### What you need to know

- |f(x)| < a ⇔ −a < f(x) < a. |f(x)| > a ⇔ f(x) > a or f(x) < −a.
- For |f(x)| compared with g(x), sketch both graphs and find intersections on each branch.
- |a| < |b| ⇔ a² < b².

### Worked example

Solve |2x − 3| ≥ x.

1. Sketch: y = |2x − 3| has its vertex at (1.5, 0).
2. Intersections: 2x − 3 = x gives x = 3; −(2x − 3) = x gives x = 1.
3. The V-graph is above the line outside [1, 3]: x ≤ 1 or x ≥ 3.

Solve |x² − 4| < 3x.

1. For |x| ≥ 2: x² − 4 = 3x gives x = 4 (x = −1 rejected). For |x| < 2: 4 − x² = 3x gives x = 1 (x = −4 rejected).
2. The curve is below the line between x = 1 and x = 4: 1 < x < 4.

### Common mistakes

- Keeping intersections that are not on the branch used.

## D11 Graphs of y = |f(x)| and y = 1/f(x)

*Refs: AQA D11. Level: A-level only.*

### What you need to know

- y = |f(x)|: reflect the parts below the x-axis in the x-axis.
- y = 1/f(x): zeros of f give vertical asymptotes; vertical asymptotes of f give zeros (approaching the x-axis); f = ±1 gives points that stay fixed; maxima of f become minima of 1/f and the other way round; where f is large, 1/f is near 0. 1/f has the same sign as f.

### Worked example

Sketch y = 1/(x² − 4).

1. f = x² − 4 has zeros at ±2: vertical asymptotes x = ±2.
2. f has minimum −4 at x = 0: 1/f has maximum −¼ at (0, −¼).
3. As |x| → ∞, f → ∞, so 1/f → 0⁺ (horizontal asymptote y = 0).
4. Positive for |x| > 2, negative between.

### Common mistakes

- Drawing 1/f crossing the x-axis.

## D12 and D13 Graphs of rational functions

*Refs: AQA D12, D13. Level: A-level only.*

### What you need to know

- y = (ax + b)/(cx + d): vertical asymptote x = −d/c, horizontal asymptote y = a/c.
- y = (ax² + bx + c)/(dx² + ex + f): vertical asymptotes where the denominator is zero; horizontal asymptote y = a/d (if d ≠ 0); if d = 0 and the top has higher degree, divide to find an oblique asymptote y = mx + k.
- Find intercepts and check whether the curve crosses its horizontal asymptote (solve f(x) = a/d).

### Explained

For an oblique asymptote, divide: (x² + 1)/(x − 1) = x + 1 + 2/(x − 1). As x → ±∞ the last term → 0, so y = x + 1 is the asymptote, and the sign of 2/(x − 1) tells you whether the curve is above or below it.

### Worked example

Sketch y = (2x − 1)/(x + 3).

1. Asymptotes x = −3 and y = 2.
2. Intercepts (½, 0), (0, −⅓).
3. Since y = 2 − 7/(x + 3), the curve is above y = 2 for x < −3 and below it for x > −3.

Sketch y = (x² + 1)/(x − 1).

1. Vertical asymptote x = 1; oblique asymptote y = x + 1.
2. y-intercept −1; no x-intercepts (x² + 1 > 0).
3. Stationary points (D14 or calculus): x = 1 ± √2.

### Common mistakes

- Missing that a curve can cross a horizontal asymptote.

## D14 Range and stationary points using quadratic theory

*Refs: AQA D14. Level: A-level only.*

### What you need to know

- For y = f(x) rational, rewrite y(denominator) = numerator as a quadratic in x. Real x exists only if its discriminant ≥ 0. This gives the possible values of y.
- The end points of the range (where the discriminant is 0) are the stationary values; find the x there from x = −B/(2A).

### Worked example

Find the range of y = (x − 1)/(x² + 3) and its stationary points.

1. yx² − x + (3y + 1) = 0.
2. Real roots: 1 − 4y(3y + 1) ≥ 0, so 12y² + 4y − 1 ≤ 0, (6y − 1)(2y + 1) ≤ 0.
3. −½ ≤ y ≤ 1/6.
4. At y = 1/6: x = 1/(2y) = 3, point (3, 1/6), a maximum. At y = −½: x = −1, point (−1, −½), a minimum.

### Common mistakes

- Forgetting the case y = 0 when the equation stops being a quadratic (check it separately).

## D16 Transformations of curves

*Refs: AQA D16. Level: A-level only.*

### What you need to know

- y = f(x − a) + b: translation by (a, b). y = af(x): stretch parallel to the y-axis. y = f(x/a): stretch parallel to the x-axis.
- Reflection in the x-axis: replace y with −y. In the y-axis: x with −x. In y = x: swap x and y. In y = −x: replace x with −y and y with −x.
- Rotations of 90° about O: (x, y) → (−y, x), so replace x with y and y with −x in the equation. Enlargement factor k about O: replace x with x/k and y with y/k.

### Worked example

The curve x²/9 + y²/4 = 1 is reflected in y = x. Find the equation of the image.

1. Swap x and y: y²/9 + x²/4 = 1.

The curve y² = 8x is translated by (2, −1). Find the new equation and its vertex.

1. Replace x with x − 2 and y with y + 1: (y + 1)² = 8(x − 2).
2. Vertex (2, −1).

### Common mistakes

- Replacing x with x + a for a translation of +a.

## Check questions

1. Solve 2x³ − 3x² − 11x + 6 ≥ 0. [4 marks]
2. Solve (2x + 1)/(x − 2) ≥ 3. [4 marks]
3. Solve x/(x + 1) < 2/(x − 2), giving exact values. [5 marks]
4. Solve |x + 2| > 2x − 1. [4 marks]
5. Sketch y = |x² − 2x − 3| and y = 1/(x² − 2x − 3) on separate diagrams, showing asymptotes and key points. [6 marks]
6. Find the range of y = (x² + x)/(x² − 4) using quadratic theory. [6 marks]
7. Find the asymptotes of y = (x² − 3x + 4)/(x − 1) and sketch the curve. [5 marks]

## Mark scheme

1. Factor (x − 3) (1). (x − 3)(2x − 1)(x + 2) (1). Critical values −2, ½, 3 (1). −2 ≤ x ≤ ½ or x ≥ 3 (1).
2. (2x + 1 − 3x + 6)/(x − 2) ≥ 0, (7 − x)/(x − 2) ≥ 0 (2). Critical values 2, 7 (1). 2 < x ≤ 7 (1).
3. [x(x − 2) − 2(x + 1)]/[(x + 1)(x − 2)] < 0 (1). Top x² − 4x − 2, roots 2 ± √6 (1). Critical values −1, 2 − √6, 2, 2 + √6 (1). Solution −1 < x < 2 − √6 or 2 < x < 2 + √6 (2).
4. x + 2 = 2x − 1 gives x = 3 (1). −x − 2 = 2x − 1 gives x = −⅓, not valid on that branch since it needs x < −2 (1). Sketch: line below V for x < 3 (1). x < 3 (1).
5. |f|: roots −1, 3, the part between reflected, vertex (1, 4) (3). 1/f: asymptotes x = −1, x = 3, y = 0; maximum (1, −¼) between the asymptotes (3).
6. y(x² − 4) = x² + x, so (y − 1)x² − x − 4y = 0 (1). Discriminant 1 + 16y(y − 1) ≥ 0 (1), 16y² − 16y + 1 ≥ 0 (1). y ≤ (2 − √3)/4 or y ≥ (2 + √3)/4 (2). y = 1 gives x = −4, which is allowed (1).
7. x² − 3x + 4 = (x − 1)(x − 2) + 2 (1). Vertical x = 1, oblique y = x − 2 (2). y-intercept −4; no real x-intercepts (discriminant −7) (1). Correct shape in opposite quadrants of the asymptotes (1).
