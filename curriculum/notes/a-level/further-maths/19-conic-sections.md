---
level: A-level
subject: Further Mathematics
topic: "Conic sections"
as_content: "AQA D15 is in its compulsory content (not marked AS); Edexcel FP1 4 is option content. Treat as A-level only."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["D15", "D16"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FP1 4.1", "FP1 4.2", "FP1 4.3", "FP1 4.4"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Conic sections

This file covers the parabola, ellipse, hyperbola and rectangular hyperbola: their Cartesian and parametric equations, sketches, asymptotes, eccentricity, foci and directrices, tangents and normals, and loci.

## Overview

AQA D15 (sketching, intercepts, asymptotes) and D16 (transformations of these curves, in [18-inequalities-and-curve-sketching.md](18-inequalities-and-curve-sketching.md)); Edexcel FP1 4.1 to 4.4 goes further with foci, directrices, tangents, normals and loci. Parametric differentiation is in [../maths/13-differentiation-further-techniques.md](../maths/13-differentiation-further-techniques.md). Hyperbolic parametrisations use [15-hyperbolic-functions.md](15-hyperbolic-functions.md).

### Board differences

- AQA D15: sketch y² = 4ax, x²/a² + y²/b² = 1, x²/a² − y²/b² = 1 and xy = c², with intercepts and asymptotes. AQA does not require foci or directrices.
- Edexcel FP1 4.1 to 4.4: parametric forms, the focus-directrix property and eccentricity, tangents and normals, the condition for y = mx + c to be a tangent, and loci.
- OCR and MEI do not include conics, apart from MEI's Further Pure with Technology investigations (file 29).

## D15 The four curves

*Refs: AQA D15 · Edexcel FP1 4.1. Level: A-level only.*

### What you need to know

| Curve | Cartesian | Parametric |
| --- | --- | --- |
| Parabola | y² = 4ax | (at², 2at) |
| Ellipse | x²/a² + y²/b² = 1 | (a cos θ, b sin θ) |
| Hyperbola | x²/a² − y²/b² = 1 | (a cosh t, b sinh t) or (a sec θ, b tan θ) |
| Rectangular hyperbola | xy = c² | (ct, c/t) |

- Ellipse: intercepts (±a, 0), (0, ±b). Hyperbola: intercepts (±a, 0), asymptotes y = ±(b/a)x. Rectangular hyperbola: asymptotes the axes.

### Explained

Each curve is symmetric about the x-axis (and the ellipse and hyperbola about the y-axis too). For the hyperbola, the asymptotes come from setting the right side to 0: x²/a² − y²/b² = 0. The parametric forms satisfy the Cartesian equations because cos² + sin² = 1, cosh² − sinh² = 1 and sec² − tan² = 1. a cosh t covers only the right branch (x ≥ a).

### Worked example

Sketch x²/16 − y²/9 = 1.

1. Intercepts (±4, 0); no y-intercepts.
2. Asymptotes y = ±¾x.
3. Two branches opening left and right.

Show that (2t², 4t) lies on y² = 8x.

1. y² = 16t² and 8x = 16t² ✓.

### Common mistakes

- Swapping a and b when reading intercepts.
- Drawing the hyperbola touching its asymptotes.

## Focus, directrix and eccentricity

*Refs: Edexcel FP1 4.2. Level: A-level only (option content).*

### What you need to know

- A conic is the locus of points whose distance from a fixed point (the focus) is e times the distance from a fixed line (the directrix). e is the eccentricity.
- Parabola (e = 1): focus (a, 0), directrix x = −a.
- Ellipse (e < 1): b² = a²(1 − e²); foci (±ae, 0), directrices x = ±a/e.
- Hyperbola (e > 1): b² = a²(e² − 1); foci (±ae, 0), directrices x = ±a/e.

### Worked example

Find the eccentricity, foci and directrices of x²/25 + y²/9 = 1.

1. 9 = 25(1 − e²), e² = 16/25, e = 4/5.
2. Foci (±4, 0). Directrices x = ±25/4.

Find the foci of x²/16 − y²/9 = 1.

1. 9 = 16(e² − 1), e = 5/4. Foci (±5, 0); directrices x = ±16/5.

Show that for any point P on an ellipse, PS + PS′ = 2a, where S and S′ are the foci.

1. PS = e × (distance to x = a/e) = e(a/e − x) = a − ex.
2. PS′ = a + ex. Sum 2a.

### Common mistakes

- Using b² = a²(e² − 1) for an ellipse.

## Tangents, normals and the tangency condition

*Refs: Edexcel FP1 4.3. Level: A-level only (option content).*

### What you need to know

- Find gradients by implicit or parametric differentiation.
- y = mx + c is a tangent when the equation from substituting into the conic has a repeated root (discriminant 0):
  - parabola y² = 4ax: c = a/m;
  - ellipse: c² = a²m² + b²;
  - hyperbola: c² = a²m² − b².

### Worked example

Find the tangent and normal to y² = 12x at (3t², 6t).

1. dy/dx = (6)/(6t) = 1/t.
2. Tangent: y − 6t = (1/t)(x − 3t²), so ty = x + 3t².
3. Normal gradient −t: y − 6t = −t(x − 3t²), so y + tx = 6t + 3t³.

Find the tangent to xy = 16 at (4t, 4/t).

1. dy/dx = (−4/t²)/4 = −1/t².
2. y − 4/t = −(1/t²)(x − 4t), so x + t²y = 8t.

Find the equations of the tangents to x²/4 + y² = 1 with gradient 1.

1. c² = 4(1) + 1 = 5. y = x ± √5.
2. Check: x²/4 + (x + c)² = 1 gives 5x² + 8cx + 4c² − 4 = 0, discriminant 64c² − 80c² + 80 = 0, so c² = 5 ✓.

### Common mistakes

- Using the parameter t as if it were the x-coordinate.

## Loci

*Refs: Edexcel FP1 4.4. Level: A-level only (option content).*

### What you need to know

- Express the coordinates of a moving point in terms of a parameter, then eliminate the parameter.

### Worked example

S is the focus of y² = 4ax and P(at², 2at) is on the curve. Find the locus of the midpoint M of SP.

1. M = ((a + at²)/2, at).
2. t = y/a, so x = a(1 + y²/a²)/2.
3. 2ax = a² + y², so y² = a(2x − a): another parabola.

The tangent to xy = c² at P(ct, c/t) meets the x-axis at A and the y-axis at B. Show that P is the midpoint of AB.

1. Tangent x + t²y = 2ct. A = (2ct, 0), B = (0, 2c/t).
2. Midpoint (ct, c/t) = P.

### Common mistakes

- Leaving the parameter in the final locus.

## Check questions

1. Sketch x²/9 + y²/4 = 1 and x²/9 − y²/4 = 1 on separate axes, showing intercepts and asymptotes. [4 marks]
2. (Edexcel FP1) Find the eccentricity, foci and directrices of x²/169 + y²/25 = 1. [4 marks]
3. (Edexcel FP1) Find the equation of the normal to the ellipse x²/16 + y²/4 = 1 at (4 cos θ, 2 sin θ). [5 marks]
4. (Edexcel FP1) Find the values of c for which y = 2x + c is a tangent to x²/9 − y²/16 = 1. [4 marks]
5. (Edexcel FP1) The normal to y² = 4x at P(t², 2t) meets the x-axis at N. Find the locus of the midpoint of PN. [6 marks]
6. The curve y² = 4x is reflected in the line y = x and then translated by (0, 3). Find the equation of the image. [3 marks]

## Mark scheme

1. Ellipse through (±3, 0), (0, ±2) (2). Hyperbola through (±3, 0), asymptotes y = ±⅔x (2).
2. 25 = 169(1 − e²), e = 12/13 (2). Foci (±12, 0) (1). Directrices x = ±169/12 (1).
3. dy/dx = (2 cos θ)/(−4 sin θ) = −cos θ/(2 sin θ) (2). Normal gradient 2 sin θ/cos θ (1). y − 2 sin θ = (2 sin θ/cos θ)(x − 4 cos θ) (1). Simplified: 2x sin θ − y cos θ = 6 sin θ cos θ (1).
4. c² = a²m² − b² = 9 × 4 − 16 = 20 (2). c = ±2√5 (2).
5. dy/dx = 1/t, normal gradient −t (1). Normal y − 2t = −t(x − t²) (1). y = 0: x = t² + 2, N(t² + 2, 0) (1). Midpoint (t² + 1, t) (1). Eliminate t: x = y² + 1 (2).
6. Reflection: x² = 4y (1). Translation: x² = 4(y − 3) (2).
