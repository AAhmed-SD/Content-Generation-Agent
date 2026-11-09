---
level: A-level
subject: Mathematics
topic: "Differentiation: first principles, powers of x and applications"
as_content: "The derivative as a gradient and a limit, first principles for small positive integer powers, differentiating xⁿ, second derivatives, tangents, normals, stationary points and increasing/decreasing functions are AS. First principles for sin x and cos x, concave and convex curves and points of inflection are A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["G1", "G2", "G3"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P7.1", "P7.2", "P7.3"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.07a", "1.07b", "1.07c", "1.07d", "1.07e", "1.07f", "1.07g", "1.07h", "1.07i", "1.07m", "1.07n", "1.07o", "1.07p"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["MC5", "MC9", "Mc1", "Mc2", "Mc3", "Mc4", "Mc5", "Mc6", "Mc7", "Mc8", "Mc9", "Mc11", "Mc17", "Mc18"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Differentiation: first principles, powers of x and applications

This file covers what a derivative is, differentiation from first principles, differentiating powers of x, second derivatives, and using derivatives for tangents, normals, stationary points, increasing and decreasing functions, optimisation, concavity and points of inflection. Other functions and the chain, product and quotient rules are in file 13.

## Overview

AS: the derivative as the gradient of a tangent and as a limit, sketching gradient functions, first principles for xⁿ with small positive integer n, differentiating xⁿ for rational n, second derivatives, tangents and normals, stationary points and where a function increases or decreases. A-level only: first principles for sin x and cos x, convex and concave sections, and points of inflection.

### Board differences

- AQA G1 to G3 (and the xⁿ part of G2); Edexcel 7.1 to 7.3.
- OCR H240: 1.07a to 1.07e, 1.07g, 1.07i, 1.07m to 1.07o (AS); 1.07f, 1.07h and 1.07p (A-level only).
- OCR MEI H640: Mc1 to Mc9 (AS) and Mc17, Mc18 (A-level only). MEI also lists curve sketching using stationary points (MC5, AS) and points of inflection (MC9, A-level). MEI asks you to deduce the units of a rate of change from a graph (in its notes for Mc3).

## G1 The derivative, first principles and the second derivative

*Refs: AQA G1 · Edexcel 7.1 · OCR 1.07a, 1.07b, 1.07c, 1.07d, 1.07e, 1.07f, 1.07g, 1.07h · MEI Mc1, Mc2, Mc3, Mc4, Mc6, Mc11, Mc17. Level: AS & A (part A-level only).*

### What you need to know

- The derivative f′(x), or dy/dx, is the gradient of the tangent to y = f(x) at a general point, and is the rate of change of y with respect to x.
- The gradient of the tangent is the limit of the gradient of a chord as the chord gets shorter:

```latex
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
```

- Differentiate small positive integer powers of x from first principles.
- Sketch the gradient function y = f′(x) from a sketch of y = f(x).
- The second derivative f″(x), or d²y/dx², is the rate of change of the gradient.
- (A-level only) Differentiate sin x and cos x from first principles.
- (A-level only) A curve is convex where f″(x) > 0 (it bends upwards; the gradient increases) and concave where f″(x) < 0.

### Explained

**Chord to tangent.** Take two points on the curve, (x, f(x)) and (x + h, f(x + h)). The chord between them has gradient [f(x + h) − f(x)]/h. As h → 0 the second point slides towards the first and the chord becomes the tangent.

**Sketching the gradient function.**

- Where y = f(x) has a stationary point, y = f′(x) crosses or touches the x-axis.
- Where f is increasing, f′ is above the x-axis; where f is decreasing, f′ is below.
- Where f is steepest, f′ has a turning point.

**Units.** If y is in metres and x in seconds, dy/dx is in metres per second, and d²y/dx² is in metres per second per second.

**(A-level only) First principles for sin x.** Use sin(x + h) = sin x cos h + cos x sin h and the small angle results: as h → 0, (sin h)/h → 1 and (cos h − 1)/h → 0. (From cos h ≈ 1 − h²/2, (cos h − 1)/h ≈ −h/2, which tends to 0.)

### Worked example

Differentiate x² from first principles.

1. [(x + h)² − x²]/h = (2xh + h²)/h = 2x + h.
2. As h → 0, this tends to 2x. So the derivative is 2x.

Differentiate x³ from first principles.

1. (x + h)³ = x³ + 3x²h + 3xh² + h³.
2. [(x + h)³ − x³]/h = 3x² + 3xh + h².
3. As h → 0, this tends to 3x².

(A-level only) Prove from first principles that the derivative of sin x is cos x.

1. [sin(x + h) − sin x]/h = [sin x cos h + cos x sin h − sin x]/h.
2. = sin x × (cos h − 1)/h + cos x × (sin h)/h.
3. As h → 0, (cos h − 1)/h → 0 and (sin h)/h → 1.
4. The limit is cos x.

The curve y = f(x) has a maximum at x = −1 and a minimum at x = 2, and f(x) → ∞ as x → ∞. Describe y = f′(x).

1. f′(x) = 0 at x = −1 and x = 2.
2. f increases for x < −1 and x > 2, so f′ is positive there; f′ is negative between −1 and 2.
3. f′ looks like a U-shaped parabola crossing the x-axis at −1 and 2.

### Common mistakes

- In first principles, letting h = 0 before cancelling h from the denominator.
- Forgetting to write the limit (lim, h → 0) in a first principles proof.

## G2 Differentiating xⁿ

*Refs: AQA G2 · Edexcel 7.2 · OCR 1.07i · MEI Mc5. Level: AS & A.*

### What you need to know

```latex
\frac{d}{dx}\left(x^n\right) = nx^{n-1} \quad \text{for all rational } n
```

- Constant multiples, sums and differences: differentiate term by term. The derivative of a constant is 0.

### Explained

Before differentiating, write every term as a power of x: roots as fractional powers, and x in a denominator as a negative power. Split a fraction with a single term in its denominator into separate terms. Expand brackets first.

### Worked example

Differentiate y = 4x³ − 6/x + 2√x.

1. y = 4x³ − 6x⁻¹ + 2x^{1/2}.
2. dy/dx = 12x² + 6x⁻² + x^{−1/2}.

Differentiate y = (x² + 3)/√x.

1. y = x^{3/2} + 3x^{−1/2}.
2. dy/dx = (3/2)x^{1/2} − (3/2)x^{−3/2}.

Find f″(x) for f(x) = x⁴ − 2x^{1/2}.

1. f′(x) = 4x³ − x^{−1/2}.
2. f″(x) = 12x² + (1/2)x^{−3/2}.

### Common mistakes

- Differentiating a quotient term by term without first splitting it.
- Subtracting 1 from a negative power wrongly: x⁻² becomes −2x⁻³, not −2x⁻¹.

## G3 Applications of differentiation

*Refs: AQA G3 · Edexcel 7.3 · OCR 1.07m, 1.07n, 1.07o, 1.07p · MEI Mc7, Mc8, Mc9, Mc18, MC5, MC9. Level: AS & A (part A-level only).*

### What you need to know

- The tangent at a point has gradient f′(x); the normal is perpendicular to the tangent.
- Stationary points: where dy/dx = 0. Classify them as maxima or minima using the second derivative (negative: maximum; positive: minimum) or the sign of the gradient either side.
- A function is increasing where f′(x) > 0 and decreasing where f′(x) < 0. (Some boards use ≥ and ≤.)
- Solve optimisation problems.
- (A-level only) A point of inflection is where the curve changes between convex and concave, so f″(x) changes sign. If f′(x) = 0 there too, it is a stationary point of inflection.

### Explained

**Tangent and normal at x = a.** Find y at a, find the gradient m = f′(a), then use y − y₁ = m(x − x₁). The normal has gradient −1/m.

**Stationary points.**

1. Differentiate and solve f′(x) = 0.
2. Find the y-coordinates.
3. Classify. If f″(a) = 0 the second derivative test fails; look at the sign of f′(x) just either side of a.

| Gradient left of a | Gradient right of a | Type |
| --- | --- | --- |
| + | − | maximum |
| − | + | minimum |
| + | + or − then − | stationary point of inflection (same sign both sides) |

**Optimisation.** Write the quantity to be maximised or minimised in terms of one variable (use a constraint to remove the other), differentiate, set to zero, solve, and show it is a maximum or minimum.

**(A-level only) Inflection.** Solve f″(x) = 0, then check f″ changes sign. f″ = 0 alone is not enough: y = x⁴ has f″(0) = 0 but is convex on both sides.

### Worked example

Find the tangent and normal to y = x³ − 3x + 1 at x = 2.

1. y = 8 − 6 + 1 = 3.
2. dy/dx = 3x² − 3 = 9 at x = 2.
3. Tangent: y − 3 = 9(x − 2), so y = 9x − 15.
4. Normal: y − 3 = −(1/9)(x − 2), so x + 9y − 29 = 0.

Find and classify the stationary points of y = x³ − 6x² + 9x + 1, and state where the function is decreasing.

1. dy/dx = 3x² − 12x + 9 = 3(x − 1)(x − 3) = 0, so x = 1 or x = 3.
2. x = 1: y = 5. x = 3: y = 1.
3. d²y/dx² = 6x − 12: −6 at x = 1 (maximum (1, 5)); +6 at x = 3 (minimum (3, 1)).
4. Decreasing where 3(x − 1)(x − 3) < 0: 1 < x < 3.

An open box is made from a 12 cm by 12 cm square of card by cutting squares of side x cm from each corner and folding. Find the maximum volume.

1. V = x(12 − 2x)² = 4x³ − 48x² + 144x, for 0 < x < 6.
2. dV/dx = 12x² − 96x + 144 = 12(x − 2)(x − 6) = 0. In range, x = 2.
3. d²V/dx² = 24x − 96 = −48 at x = 2, so a maximum.
4. V = 2 × 8² = 128 cm³.

(A-level only) Find the stationary points and points of inflection of y = x⁴ − 4x³.

1. dy/dx = 4x³ − 12x² = 4x²(x − 3) = 0 at x = 0 and x = 3.
2. d²y/dx² = 12x² − 24x = 12x(x − 2).
3. At x = 3: d²y/dx² = 36 > 0, minimum (3, −27).
4. At x = 0: d²y/dx² = 0. dy/dx is negative just either side of 0 (4x² ≥ 0 and x − 3 < 0), so (0, 0) is a stationary point of inflection.
5. d²y/dx² also changes sign at x = 2, so (2, −16) is a non-stationary point of inflection.
6. Convex for x < 0 and x > 2; concave for 0 < x < 2.

### Common mistakes

- Using the gradient of the tangent for the normal.
- Concluding "point of inflection" just because f″ = 0.
- Not checking the answer to an optimisation question is a maximum (or minimum), or not checking it is in the allowed range.

## Check questions

1. Differentiate 3x² from first principles. [3 marks]
2. Find dy/dx for y = 5x⁴ − 3/x² + 4∛x. [3 marks]
3. Find dy/dx for y = (2x − 1)²/x. [3 marks]
4. The curve y = x² − 5x + 4 passes through P(4, 0). (a) Find the equation of the normal at P. (b) Find the other point where the normal meets the curve. [6 marks]
5. Find and classify the stationary points of y = 2x³ + 3x² − 12x + 7. [6 marks]
6. Find the set of values of x for which f(x) = x³ − 3x² − 9x is increasing. [3 marks]
7. A closed cylinder has volume 250π cm³. Show that its surface area is A = 2πr² + 500π/r, and find the minimum surface area, justifying that it is a minimum. [7 marks]
8. (A-level only) Find the intervals on which y = x⁴ − 6x² is concave, and the coordinates of its points of inflection. [5 marks]
9. (A-level only) Prove from first principles that the derivative of cos x is −sin x. [4 marks]

## Mark scheme

1. [3(x + h)² − 3x²]/h (1); = 6x + 3h (1); limit as h → 0 is 6x (1).
2. 20x³ (1); + 6x⁻³ (1); + (4/3)x^{−2/3} (1).
3. y = 4x − 4 + x⁻¹ (1); dy/dx = 4 − x⁻² (2).
4. (a) dy/dx = 2x − 5 = 3 at x = 4 (1); normal gradient −1/3 (1); x + 3y − 4 = 0 (1). (b) x² − 5x + 4 = (4 − x)/3, so 3x² − 14x + 8 = 0 (1); (3x − 2)(x − 4) = 0 (1); (2/3, 10/9) (1).
5. dy/dx = 6x² + 6x − 12 = 6(x + 2)(x − 1) (1); x = −2 and x = 1 (1); y = 27 and y = 0 (1); d²y/dx² = 12x + 6 (1); at x = −2 it is −18, maximum (−2, 27) (1); at x = 1 it is 18, minimum (1, 0) (1).
6. f′(x) = 3x² − 6x − 9 = 3(x − 3)(x + 1) (1); f′(x) > 0 (1); x < −1 or x > 3 (1).
7. πr²h = 250π, so h = 250/r² (1); A = 2πr² + 2πrh = 2πr² + 500π/r (1); dA/dr = 4πr − 500π/r² (1); = 0 gives r³ = 125, r = 5 (1); d²A/dr² = 4π + 1000π/r³ > 0, minimum (1); h = 10 (1); A = 150π cm² (1).
8. y″ = 12x² − 12 (1); y″ < 0 for −1 < x < 1, so concave there (1); y″ changes sign at x = ±1 (1); (1, −5) (1); (−1, −5) (1).
9. [cos(x + h) − cos x]/h = [cos x cos h − sin x sin h − cos x]/h (1); = cos x (cos h − 1)/h − sin x (sin h)/h (1); limits 0 and 1 as h → 0 (1); derivative −sin x (1).
