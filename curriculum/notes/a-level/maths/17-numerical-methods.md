---
level: A-level
subject: Mathematics
topic: "Numerical methods"
as_content: "All of this file is A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["OT2.4", "I1", "I2", "I3", "I4"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P9.1", "P9.2", "P9.3", "P9.4", "P9.5"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.09a", "1.09b", "1.09c", "1.09d", "1.09e", "1.09f", "1.09g"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Me1", "Me2", "Me3", "Me4", "Me5", "Mc34", "Mc35", "Me6"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Numerical methods

This file covers locating roots by a change of sign, solving equations by fixed-point iteration (with cobweb and staircase diagrams) and by the Newton-Raphson method, how these methods can fail, the trapezium rule, and using numerical methods in context.

## Overview

All A-level only. These methods are for equations and integrals that cannot be solved exactly. The overarching theme OT2.4 (many problems cannot be solved analytically) is met here.

### Board differences

- AQA I1 to I4; Edexcel 9.1 to 9.5 (Edexcel numbers iteration, 9.2, and Newton-Raphson, 9.3, separately).
- OCR H240: 1.09a to 1.09g.
- OCR MEI H640: Me1 to Me6, plus Mc34 (trapezium rule) and Mc35, which asks you to use rectangles to find upper and lower bounds for an integral.

## I1 Locating roots by change of sign

*Refs: AQA I1 · Edexcel 9.1 · OCR 1.09a, 1.09b · MEI Me1, Me2. Level: A-level only.*

### What you need to know

- (A-level only) If f is continuous on [a, b] and f(a) and f(b) have opposite signs, then f(x) = 0 has at least one root between a and b.
- (A-level only) How the method fails: a discontinuity (such as an asymptote) can cause a sign change with no root; a repeated root, or two roots close together, can give no sign change even though roots exist.

### Explained

To show a root lies between a and b: work out f(a) and f(b), state their signs, and write a conclusion that mentions continuity, such as "f is continuous and there is a change of sign, so there is a root in [a, b]".

To show a root is α correct to 2 decimal places, check the sign of f at the bounds α − 0.005 and α + 0.005.

### Worked example

(A-level only) Show that x³ − 2x − 5 = 0 has a root between 2 and 3, and that the root is 2.09 to 2 decimal places.

1. f(2) = −1 < 0 and f(3) = 16 > 0. f is a polynomial, so continuous; the sign changes, so there is a root in (2, 3).
2. f(2.085) = −0.106 < 0 and f(2.095) = 0.005 > 0.
3. The sign changes, so the root lies in (2.085, 2.095) and is 2.09 to 2 d.p.

(A-level only) f(x) = tan x. f(1) = 1.557 and f(2) = −2.185. Explain why this does not show a root between 1 and 2.

1. tan x has an asymptote at x = π/2 ≈ 1.571, which lies between 1 and 2.
2. f is not continuous on [1, 2], so the change of sign is caused by the asymptote, not a root.

(A-level only) Explain why a change of sign search would miss the root of (x − 1)² = 0.

1. (x − 1)² ≥ 0 everywhere, so f never becomes negative. The graph touches the axis at x = 1 without crossing it.

### Common mistakes

- (A-level only) Giving values without stating the signs and the conclusion.
- (A-level only) Leaving out "continuous" in the conclusion.

## I2 Iteration and the Newton-Raphson method

*Refs: AQA I2 · Edexcel 9.2, 9.3 · OCR 1.09c, 1.09d, 1.09e · MEI Me3, Me4, Me5. Level: A-level only.*

### What you need to know

- (A-level only) Rearrange f(x) = 0 into x = g(x) and iterate xₙ₊₁ = g(xₙ). Draw cobweb and staircase diagrams.
- (A-level only) The Newton-Raphson method:

```latex
x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}
```

- (A-level only) How these methods can fail.

### Explained

**Fixed-point iteration.** If the sequence xₙ₊₁ = g(xₙ) converges to α, then α = g(α), which is a root of f(x) = 0. Different rearrangements behave differently: some converge, some diverge.

On a graph, draw y = x and y = g(x). From x₀, go vertically to the curve, then horizontally to the line y = x, then vertically to the curve again, and so on.

- A staircase diagram (steps approaching the root from one side) happens when g′(x) is between 0 and 1 near the root.
- A cobweb diagram (spiralling in) happens when g′(x) is between −1 and 0.
- If |g′(x)| > 1 near the root, the iteration moves away from it.

**Newton-Raphson.** From xₙ, follow the tangent to the curve until it meets the x-axis. That point is xₙ₊₁. It usually converges very quickly.

It fails or behaves badly if f′(xₙ) = 0 (the tangent is horizontal, so division by zero), if f′(xₙ) is close to zero (the next value is thrown far away), or if x₀ is far from the root (it may converge to a different root).

### Worked example

(A-level only) Show that x³ − 2x − 5 = 0 can be written as x = (2x + 5)^{1/3}, and use xₙ₊₁ = (2xₙ + 5)^{1/3} with x₀ = 2 to find the root to 3 decimal places.

1. x³ = 2x + 5, so x = (2x + 5)^{1/3}.
2. x₁ = 2.08008, x₂ = 2.09235, x₃ = 2.09422, x₄ = 2.09450, x₅ = 2.09454.
3. The root is 2.095 to 3 d.p. (check: f(2.0945) < 0 and f(2.0955) > 0).
4. This is a staircase: the values increase towards the root from one side.

(A-level only) Show that the rearrangement x = (x³ − 5)/2 with x₀ = 2 fails.

1. x₁ = 1.5, x₂ = −0.8125, x₃ = −2.768, ...
2. The values move away from the root. Here g′(x) = 3x²/2, which is about 6.6 near the root, so |g′| > 1.

(A-level only) Use Newton-Raphson with x₀ = 2 on f(x) = x³ − 2x − 5.

1. f′(x) = 3x² − 2.
2. x₁ = 2 − (−1)/10 = 2.1.
3. x₂ = 2.1 − f(2.1)/f′(2.1) = 2.1 − 0.061/11.23 = 2.094568.
4. x₃ = 2.094551. Two steps already give 4 decimal places.

(A-level only) Explain why Newton-Raphson fails for f(x) = x³ − 3x + 1 with x₀ = 1.

1. f′(x) = 3x² − 3, so f′(1) = 0.
2. The formula divides by zero: the tangent at x = 1 is horizontal and never meets the x-axis.

### Common mistakes

- (A-level only) Rounding each iterate heavily, so errors build up. Keep full calculator values.
- (A-level only) Drawing a cobweb from the line instead of the curve first.
- (A-level only) Writing xₙ₊₁ = xₙ − f′(xₙ)/f(xₙ).

## I3 Numerical integration: the trapezium rule

*Refs: AQA I3 · Edexcel 9.4 · OCR 1.09f · MEI Mc34, Mc35. Level: A-level only.*

### What you need to know

- (A-level only) The trapezium rule with n strips of width h = (b − a)/n:

```latex
\int_a^b y\,dx \approx \frac{h}{2}\left[y_0 + y_n + 2(y_1 + y_2 + \dots + y_{n-1})\right]
```

- (A-level only) Whether the estimate is too big or too small, and limits the true area must lie between.
- (A-level only) (MEI) Upper and lower bounds from rectangles.

### Explained

The rule replaces the curve by straight chords. If the curve is convex (bends upwards), each chord lies above the curve, so the trapezium rule overestimates. If concave, it underestimates. More strips give a better estimate.

For an increasing function, rectangles using the left-hand heights give a lower bound and rectangles using the right-hand heights give an upper bound (the other way round for a decreasing function). The true area lies between them.

### Worked example

(A-level only) Use the trapezium rule with 4 strips to estimate ∫₀² √(1 + x³) dx, and state whether it is an over- or underestimate.

1. h = 0.5. y-values at x = 0, 0.5, 1, 1.5, 2: 1, 1.06066, 1.41421, 2.09165, 3.
2. Estimate = 0.25[1 + 3 + 2(1.06066 + 1.41421 + 2.09165)] = 0.25 × 13.13304 = 3.283.
3. The curve is convex on [0, 2], so this is an overestimate. (The true value is 3.241.)

(A-level only) For ∫₀² √(1 + x³) dx, find lower and upper bounds using 4 rectangles.

1. The function is increasing.
2. Lower: 0.5(1 + 1.06066 + 1.41421 + 2.09165) = 2.783.
3. Upper: 0.5(1.06066 + 1.41421 + 2.09165 + 3) = 3.783.
4. So 2.783 < true value < 3.783. The trapezium estimate is the mean of these two.

### Common mistakes

- (A-level only) Using the number of ordinates (y-values) as n. Four strips need five y-values.
- (A-level only) Forgetting to double the middle values.

## I4 Numerical methods in context

*Refs: AQA I4 · Edexcel 9.5 · OCR 1.09g · MEI Me6. Level: A-level only.*

### What you need to know

- (A-level only) Choose and use a numerical method to solve a problem in context, and interpret the answer.

### Explained

Context problems give an equation that cannot be rearranged, such as one mixing exponentials and polynomials, or an integral with no exact form. State the method, show the iterations or table of values, and give the answer to a sensible accuracy with units.

### Worked example

(A-level only) The number of bacteria in two colonies is modelled by A = e^{t} and B = 3t (in thousands), t hours after midnight. Find when they are first equal after t = 1.

1. Solve f(t) = eᵗ − 3t = 0. f(1.5) = −0.018 and f(1.6) = 0.153: a root in (1.5, 1.6).
2. Newton-Raphson with f′(t) = eᵗ − 3, t₀ = 1.5: t₁ = 1.512358, t₂ = 1.512135.
3. The colonies are equal after about 1.512 hours, about 1:31 a.m.

### Common mistakes

- (A-level only) Giving an answer to more accuracy than the model supports.

## Check questions

1. (A-level only) Show that eˣ − 3x = 0 has a root α between 1.5 and 1.6. [3 marks]
2. (A-level only) (a) Show that eˣ = 3x can be written as x = ln(3x). (b) Use xₙ₊₁ = ln(3xₙ) with x₀ = 1.5 to find x₁, x₂, x₃ to 4 decimal places. (c) Comment on the speed of convergence. [5 marks]
3. (A-level only) Use the Newton-Raphson method on f(x) = x² − 7 with x₀ = 3 to find x₂, and compare with √7. [4 marks]
4. (A-level only) Use the trapezium rule with 4 strips to estimate ∫₁³ ln x dx. State, with a reason, whether it is an overestimate or an underestimate. [5 marks]
5. (A-level only) f(x) = x³ − 3x + 1. Explain why x₀ = 1 is not a suitable starting value for Newton-Raphson. [2 marks]
6. (A-level only) Explain why f(1) and f(2) having opposite signs for f(x) = tan x does not show there is a root between 1 and 2. [2 marks]
7. (A-level only) Sketch a staircase diagram for an iteration converging to a root, and describe a cobweb diagram. [3 marks]

## Mark scheme

1. f(1.5) = −0.0183 (1); f(1.6) = 0.153 (1); change of sign and f continuous, so root in (1.5, 1.6) (1).
2. (a) ln(eˣ) = ln(3x), so x = ln(3x) (1). (b) x₁ = 1.5041 (1); x₂ = 1.5068 (1); x₃ = 1.5086 (1). (c) Converges slowly: g′(x) = 1/x ≈ 0.66 near the root, so each step only reduces the error by about a third (1).
3. x₁ = 3 − 2/6 = 2.6667 (1); x₂ = 2.6667 − (0.1111)/(5.3333) = 2.6458 (2); √7 = 2.6458 to 4 d.p., so very close (1).
4. h = 0.5 and y-values 0, 0.4055, 0.6931, 0.9163, 1.0986 (1); 0.25[0 + 1.0986 + 2(2.0149)] (1); = 1.282 (1); underestimate (1); ln x is concave, so chords lie below the curve (1).
5. f′(1) = 0 (1); the formula would divide by zero / the tangent is horizontal (1).
6. tan x is not continuous on [1, 2] (1); it has an asymptote at π/2 (1).
7. Staircase: steps from the curve to y = x approaching the root from one side (1); cobweb: path spirals around the root, alternating sides (1); occurs when −1 < g′(x) < 0 (1).
