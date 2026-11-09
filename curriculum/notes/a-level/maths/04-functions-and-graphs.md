---
level: A-level
subject: Mathematics
topic: "Functions and graphs: sketching, modulus, composite and inverse functions, transformations"
as_content: "Sketching standard curves, proportion, using intersections and single transformations are AS. The modulus function, composite and inverse functions, combined transformations and functions in modelling are A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["OT1.4", "B7", "B8", "B9", "B11"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P2.7", "P2.8", "P2.9", "P2.11"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.02l", "1.02m", "1.02n", "1.02o", "1.02p", "1.02q", "1.02r", "1.02s", "1.02t", "1.02u", "1.02v", "1.02w", "1.02x", "1.02z"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Ma14", "Mf3", "Mf4", "Mf5", "Mf6", "Mf7", "Mf8", "MC1", "MC2", "MC3", "MC4", "MC5", "MC6", "MC7", "MC8"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Functions and graphs

This file covers sketching curves, proportion, solving equations with graphs, the modulus function, the language of functions (domain and range), composite and inverse functions, transformations of graphs, and using functions as models.

## Overview

AS: sketching polynomials and y = a/x, y = a/x², asymptotes, proportion, solving equations from intersections, and the four single transformations. A-level only: the modulus function and its graph, composite and inverse functions, combinations of transformations, and functions in modelling.

### Board differences

- AQA B7, B8, B9, B11 (and OT1.4 for the definition of a function); Edexcel 2.7, 2.8, 2.9, 2.11.
- OCR H240: 1.02l to 1.02x and 1.02z. 1.02l (the modulus of a number) is listed separately from 1.02s (the graph of |ax + b|).
- OCR MEI H640: graphs and sketching are MC1 to MC8; functions, modulus and modelling are Mf3 to Mf8; proportion is Ma14. MEI's MC5 asks you to use stationary points when sketching, which links to file 12.

## B7 Graphs of functions

*Refs: AQA B7 · Edexcel 2.7 · OCR 1.02l, 1.02m, 1.02n, 1.02o, 1.02p, 1.02q, 1.02r, 1.02s, 1.02t · MEI MC1, MC2, MC3, MC4, MC5, MC6, Ma14, Mf6, Mf7. Level: AS & A (part A-level only).*

### What you need to know

- Sketch polynomial curves from their factorised form, showing where they meet the axes.
- Sketch y = a/x and y = a/x², with their vertical and horizontal asymptotes.
- Interpret the solution of an equation as the x-coordinates of intersection points, and use intersections to solve equations.
- Understand proportional relationships (y ∝ x, y ∝ x², y ∝ 1/x and so on) and their graphs.
- (A-level only) The modulus |x|, the graph of y = |ax + b|, and solving simple modulus equations and inequalities.

### Explained

**Polynomials.** For y = a(x − p)(x − q)(x − r):

- The ends: for a cubic with a > 0, y → −∞ as x → −∞ and y → +∞ as x → +∞. For a < 0 it is the other way round. A quartic with positive leading coefficient goes up at both ends.
- A single factor (x − p) means the curve crosses the axis at x = p.
- A squared factor (x − p)² means it touches the axis there (a turning point on the axis).
- A cubed factor (x − p)³ means it crosses with a flat point of inflection.
- Put x = 0 to find the y-intercept.

**Reciprocal graphs.**

| Curve | Shape | Asymptotes |
| --- | --- | --- |
| y = a/x, a > 0 | two branches, in quadrants 1 and 3 | x = 0 and y = 0 |
| y = a/x, a < 0 | quadrants 2 and 4 | x = 0 and y = 0 |
| y = a/x², a > 0 | two branches, both above the x-axis | x = 0 and y = 0 |

An asymptote is a line the curve approaches but never meets as x or y tends to infinity.

**Intersections.** The solutions of f(x) = g(x) are the x-coordinates where y = f(x) and y = g(x) meet. A sketch tells you how many real solutions there are even when you cannot solve the equation exactly.

**Proportion.**

```latex
y \propto x^n \iff y = kx^n \text{ for some constant } k
```

y ∝ x gives a straight line through the origin. y ∝ 1/x gives a reciprocal curve. To find k, substitute a known pair of values.

**(A-level only) Modulus.** |x| is the size of x, ignoring the sign: |x| = x if x ≥ 0 and |x| = −x if x < 0. To sketch y = |ax + b|, sketch y = ax + b and reflect the part below the x-axis in the x-axis. The result is a V shape with its vertex on the x-axis at x = −b/a.

To solve |f(x)| = g(x), solve f(x) = g(x) and −f(x) = g(x), then check each answer in the original equation (g(x) must not be negative). A sketch shows how many solutions to expect. For inequalities, sketch both sides and read off where one is above the other, or square both sides when both sides are moduli.

### Worked example

Sketch y = (x − 1)²(x + 2).

1. Cubic with positive leading coefficient: low on the left, high on the right.
2. Crosses at x = −2; touches at x = 1.
3. y-intercept: (1)(2) = 2.
4. The curve rises from bottom left, crosses at (−2, 0), reaches a maximum between −2 and 1, comes down to touch the axis at (1, 0) (a minimum), then rises.

Sketch y = −2/x² and state its asymptotes.

1. Always negative, so both branches are below the x-axis.
2. Symmetrical about the y-axis.
3. Asymptotes x = 0 and y = 0.

By sketching y = x³ and y = 4 − x, show that x³ + x − 4 = 0 has exactly one real root.

1. y = x³ is increasing everywhere; y = 4 − x is decreasing everywhere.
2. An increasing and a decreasing graph can meet at most once, and they do meet (at x = 1, x³ = 1 < 3 = 4 − x; at x = 2, x³ = 8 > 2), so there is exactly one intersection.
3. So x³ = 4 − x, which rearranges to x³ + x − 4 = 0, has exactly one real root, between 1 and 2.

The time T for a pendulum swing is proportional to the square root of its length L. T = 2 s when L = 1 m. Find T when L = 2.25 m.

1. T = k√L. 2 = k × 1, so k = 2.
2. T = 2√2.25 = 2 × 1.5 = 3 s.

(A-level only) Solve |2x − 3| = 5.

1. 2x − 3 = 5 gives x = 4.
2. 2x − 3 = −5 gives x = −1.

(A-level only) Solve |x − 1| = 2x + 3.

1. x − 1 = 2x + 3 gives x = −4. Check: 2x + 3 = −5, which is negative, so reject.
2. −(x − 1) = 2x + 3 gives −x + 1 = 2x + 3, so x = −2/3. Check: |−5/3| = 5/3 and 2(−2/3) + 3 = 5/3 ✓.
3. One solution, x = −2/3.

(A-level only) Solve |2x + 1| > |x − 1|.

1. Both sides are non-negative, so square: 4x² + 4x + 1 > x² − 2x + 1.
2. 3x² + 6x > 0, so 3x(x + 2) > 0.
3. x < −2 or x > 0.

### Common mistakes

- Drawing a squared factor as a crossing point.
- Letting a curve cross its asymptote or bend away from it.
- (A-level only) Not checking modulus solutions, so keeping ones where the right-hand side is negative.
- (A-level only) Squaring both sides when one side could be negative.

## B8 Composite and inverse functions

*Refs: AQA B8, OT1.4 · Edexcel 2.8 · OCR 1.02u, 1.02v · MEI Mf3, Mf4, Mf5. Level: A-level only.*

### What you need to know

- (A-level only) A function maps each input in its domain to exactly one output. The range is the set of outputs.
- (A-level only) One-one functions (each output from one input) and many-one functions (some outputs from more than one input).
- (A-level only) Composite functions: fg(x) means f(g(x)): apply g first, then f.
- (A-level only) Inverse functions: f⁻¹ undoes f. Only one-one functions have inverses. The graph of y = f⁻¹(x) is the reflection of y = f(x) in the line y = x. The domain of f⁻¹ is the range of f, and the range of f⁻¹ is the domain of f.

### Explained

**Domain and range.** Domains are usually given with the function, for example f(x) = √(x − 2), x ≥ 2. The range follows from the graph. For a quadratic, complete the square to find the minimum or maximum value.

**Composite functions.** Work from the inside out. For fg(x) to exist, every output of g must be in the domain of f.

**Inverse functions.** To find f⁻¹(x):

1. Write y = f(x).
2. Rearrange to make x the subject.
3. Swap x and y (or write f⁻¹(x) in terms of x).
4. State the domain of f⁻¹ (the range of f).

A many-one function such as x² on all real x has no inverse. Restricting the domain (for example to x ≥ 0) makes it one-one.

Note: ff⁻¹(x) = f⁻¹f(x) = x. The points where y = f(x) meets y = f⁻¹(x) lie on y = x when f is increasing.

### Worked example

(A-level only) f(x) = 2x + 3 and g(x) = x², both for all real x. Find fg(x), gf(x) and solve fg(x) = 11.

1. fg(x) = f(x²) = 2x² + 3.
2. gf(x) = g(2x + 3) = (2x + 3)².
3. 2x² + 3 = 11, so x² = 4, x = ±2.

(A-level only) f(x) = x² − 4x + 1, x ≥ 2. Find the range of f, and find f⁻¹(x), stating its domain.

1. f(x) = (x − 2)² − 3. For x ≥ 2 the minimum is −3, so the range is f(x) ≥ −3.
2. y = (x − 2)² − 3, so (x − 2)² = y + 3, and x − 2 = +√(y + 3) (positive root because x ≥ 2).
3. f⁻¹(x) = 2 + √(x + 3), with domain x ≥ −3 (and range f⁻¹(x) ≥ 2).

(A-level only) f(x) = 3/(x − 1), x > 1. Find f⁻¹(x) and state its domain.

1. y = 3/(x − 1), so x − 1 = 3/y, so x = 1 + 3/y.
2. f⁻¹(x) = 1 + 3/x.
3. For x > 1, f(x) takes every positive value, so the domain of f⁻¹ is x > 0.

(A-level only) Explain why g(x) = x² + 1, x ∈ ℝ, has no inverse.

1. g(2) = g(−2) = 5, so g is many-one.
2. Only one-one functions have inverses.

### Common mistakes

- Applying f first when working out fg(x). The function next to x, g, acts first.
- Writing f⁻¹(x) as 1/f(x). The inverse function is not the reciprocal.
- Forgetting the domain of the inverse, or giving the domain of f instead.
- Taking ± when the restricted domain picks one sign.

## B9 Transformations of graphs

*Refs: AQA B9 · Edexcel 2.9 · OCR 1.02w, 1.02x · MEI MC7, MC8. Level: AS & A (part A-level only).*

### What you need to know

- The effect of y = f(x) + a, y = f(x + a), y = af(x) and y = f(ax) on the graph of y = f(x).
- (A-level only) Combinations of these transformations.

### Explained

| Equation | Transformation | Point (x, y) moves to |
| --- | --- | --- |
| y = f(x) + a | translation a up, vector (0, a) | (x, y + a) |
| y = f(x + a) | translation a to the left, vector (−a, 0) | (x − a, y) |
| y = af(x) | stretch parallel to the y-axis, scale factor a | (x, ay) |
| y = f(ax) | stretch parallel to the x-axis, scale factor 1/a | (x/a, y) |
| y = −f(x) | reflection in the x-axis | (x, −y) |
| y = f(−x) | reflection in the y-axis | (−x, y) |

The rule to remember: changes inside the bracket act on x and do the opposite of what they look like; changes outside act on y and do what they look like.

Asymptotes move with the graph. A horizontal translation moves vertical asymptotes; a vertical translation moves horizontal asymptotes.

**(A-level only) Combinations.** For y = af(bx + c) + d, a safe order is: translate horizontally by −c, then stretch horizontally by 1/b, then stretch vertically by a, then translate vertically by d. Easier still: track a few key points, applying "inside" changes to x and "outside" changes to y.

### Worked example

The curve y = f(x) has a maximum at (2, 8) and passes through (4, 6). Find the images of these points under each transformation.

1. y = f(x − 3): (5, 8) and (7, 6).
2. y = 2f(x): (2, 16) and (4, 12).
3. y = f(2x): (1, 8) and (2, 6).
4. y = −f(x): (2, −8), now a minimum, and (4, −6).

Describe the transformation that maps y = 1/x to y = 1/x + 2, and state the asymptotes of the new curve.

1. Translation by vector (0, 2).
2. Asymptotes x = 0 and y = 2.

(A-level only) For the same f, find the images of (2, 8) and (4, 6) under y = f(2x) − 3.

1. Inside: x is halved. Outside: subtract 3 from y.
2. (2, 8) → (1, 5). (4, 6) → (2, 3).

(A-level only) Describe a sequence of transformations mapping y = x² to y = 3(x − 1)² + 4.

1. Translation by vector (1, 0).
2. Stretch parallel to the y-axis, scale factor 3.
3. Translation by vector (0, 4).

### Common mistakes

- Moving y = f(x + 3) three units to the right. It moves left.
- Using scale factor a for y = f(ax). It is 1/a.
- Forgetting to move the asymptotes.

## B11 Functions in modelling

*Refs: AQA B11 · Edexcel 2.11 · OCR 1.02z · MEI Mf8. Level: A-level only.*

### What you need to know

- (A-level only) Use functions to model real situations, choosing a sensible domain and interpreting the range.
- (A-level only) Comment on the limitations of a model and suggest refinements.

### Explained

A model function usually only makes sense on part of its natural domain. A model for the height of a ball is negative after it lands, so the domain must stop there. A model for the cost of making n items applies only to whole n. Linear, quadratic, exponential, trigonometric and reciprocal functions are all common models. When you criticise a model, say what it predicts that is unrealistic, and why.

### Worked example

(A-level only) A ball's height is modelled by h(t) = 20t − 5t², where t is in seconds and h in metres. State a suitable domain and find the range.

1. h = 0 when t = 0 or t = 4. The ball is in the air for 0 ≤ t ≤ 4.
2. h(t) = 20 − 5(t − 2)², so the maximum height is 20 m at t = 2.
3. Range 0 ≤ h ≤ 20.

(A-level only) A company models its weekly profit P (£) from selling a product at price x (£) as P = −40x² + 2400x − 20 000. Find the price that gives the most profit and give one limitation.

1. P = −40(x − 30)² + 16 000.
2. Maximum profit £16 000 at a price of £30.
3. Limitation: it assumes demand depends only on price and that costs stay the same; for prices above £50 (or below £10) the model gives a loss, which may not happen if fixed costs can be cut.

### Common mistakes

- Giving the natural domain (all real numbers) for a model.
- Criticising a model vaguely ("it is not accurate") without saying what is unrealistic.

## Check questions

1. Sketch y = (x + 1)(x − 2)², showing the coordinates of the points where it meets the axes. [3 marks]
2. Sketch y = 3/x and y = x + 2 on the same axes. Find the coordinates of their points of intersection. [5 marks]
3. y is inversely proportional to x². y = 5 when x = 2. Find y when x = 4. [3 marks]
4. (A-level only) Solve |3x − 1| = x + 5. [4 marks]
5. (A-level only) Solve |x + 1| ≥ 2x. [4 marks]
6. (A-level only) f(x) = x² + 1 and g(x) = 3x − 2, for all real x. (a) Find fg(x) and gf(x). (b) Solve fg(x) = gf(x), giving exact answers. [5 marks]
7. (A-level only) f(x) = (2x + 1)/(x − 3), x ≠ 3. Find f⁻¹(x) and state its domain. [4 marks]
8. (A-level only) h(x) = (x − 1)² + 2, x ≥ 1. (a) State the range of h. (b) Find h⁻¹(x) and its domain. (c) Describe how the graphs of h and h⁻¹ are related. [5 marks]
9. A curve y = f(x) has a maximum at (2, 5) and meets the y-axis at (0, 3). Give the coordinates of the maximum and the y-intercept on: (a) y = f(x − 3); (b) y = 2f(x); (c) y = f(2x). [6 marks]
10. (A-level only) Describe fully a sequence of transformations that maps y = x² onto y = (x + 3)² − 2. Hence state the coordinates of the vertex of y = (x + 3)² − 2. [3 marks]

## Mark scheme

1. Cubic shape with positive leading coefficient (1); crosses at (−1, 0) and touches at (2, 0) (1); y-intercept (0, 4) (1).
2. Correct reciprocal curve and line (1); 3/x = x + 2 gives x² + 2x − 3 = 0 (1); (x + 3)(x − 1) = 0 (1); x = 1, y = 3 (1); x = −3, y = −1 (1).
3. y = k/x² (1); k = 20 (1); y = 20/16 = 1.25 (1).
4. 3x − 1 = x + 5 gives x = 3 (1); −(3x − 1) = x + 5 gives x = −1 (1); both checked: right-hand sides 8 and 4 are positive (1); x = 3 or x = −1 (1).
5. For x ≥ −1: x + 1 ≥ 2x gives x ≤ 1 (1); so −1 ≤ x ≤ 1 (1); for x < −1: −x − 1 ≥ 2x gives x ≤ −1/3, so all x < −1 work (1); combined: x ≤ 1 (1).
6. (a) fg(x) = (3x − 2)² + 1 = 9x² − 12x + 5 (1); gf(x) = 3x² + 1 (1). (b) 6x² − 12x + 4 = 0, so 3x² − 6x + 2 = 0 (1); formula (1); x = 1 ± √3/3 (1).
7. y(x − 3) = 2x + 1 (1); x(y − 2) = 3y + 1 (1); f⁻¹(x) = (3x + 1)/(x − 2) (1); domain x ≠ 2 (1).
8. (a) h(x) ≥ 2 (1). (b) (x − 1)² = y − 2, x = 1 + √(y − 2) (1); h⁻¹(x) = 1 + √(x − 2) (1); domain x ≥ 2 (1). (c) Reflections of each other in y = x (1).
9. (a) (5, 5) and (3, 3) (2). (b) (2, 10) and (0, 6) (2). (c) (1, 5) and (0, 3) (2).
10. Translation by vector (−3, −2), or by (−3, 0) then (0, −2) (2); vertex (−3, −2) (1).
