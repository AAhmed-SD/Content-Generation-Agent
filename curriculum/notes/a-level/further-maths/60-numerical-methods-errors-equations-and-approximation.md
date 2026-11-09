---
level: A-level
subject: Further Mathematics
topic: "Numerical methods: errors, solving equations, differentiation and interpolation"
as_content: "MEI Numerical Methods (Y434) is a minor option; the same content is AS paper Y414."
boards:
  - board: OCR MEI
    code: "H645"
    spec_refs: ["NQ1", "NQ2", "NU1", "NU2", "NU3", "NU4", "NU5", "NU6", "NU7", "NU8", "Ne1", "Ne2", "Ne3", "Ne4", "Ne5", "Nc1", "Nc2", "Nf1", "Nf2"]
refs_checked: false
spec_urls:
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/
---

# Numerical methods: errors, solving equations, differentiation and interpolation

This file covers the MEI Numerical Methods option apart from integration: using spreadsheets, absolute and relative errors and how they propagate, rounding and chopping, the bisection, false position, secant, Newton-Raphson and fixed point iteration methods, orders of convergence and relaxation, numerical differentiation by forward and central differences, and interpolation by Newton's forward difference formula and Lagrange's form.

## Overview

MEI only. Numerical integration (Nc3, Nc4) is in [22-numerical-integration-and-step-by-step-methods.md](22-numerical-integration-and-step-by-step-methods.md). Change of sign, Newton-Raphson and simple iteration were introduced in A-level Maths ([../maths/17-numerical-methods.md](../maths/17-numerical-methods.md)).

### Board differences

- MEI NQ1, NQ2 (spreadsheets), NU1 to NU8 (errors), Ne1 to Ne5 (solving equations), Nc1, Nc2 (differentiation), Nf1, Nf2 (approximations to functions). No other board has this option. The paper is taken with a spreadsheet-capable approach in mind; lengthy calculations are not set by hand.

## Spreadsheets and errors

*Refs: MEI NQ1, NQ2, NU1, NU2, NU3, NU4, NU5, NU6, NU7, NU8. Level: AS & A.*

### What you need to know

- If X approximates x: absolute error X − x; relative error (X − x)/x.
- Sums and differences: absolute errors (bounds) add. Products and quotients: relative errors (approximately) add.
- Error in f(x) when x has a small error ε: about f′(x)ε.
- Computers store numbers to a fixed number of significant figures (floating point), so rounding errors occur. Subtracting nearly equal numbers loses significant figures (cancellation).
- Rounding vs chopping: chopping always discards digits (biased); rounding chooses the nearer value.
- Use the ratio of successive differences of a sequence of estimates to judge convergence and to extrapolate (MEI NU8).
- Set up iterations in a spreadsheet by copying a formula down a column (NQ1, NQ2).

### Worked example

x = 2.5 and y = 1.2, each correct to 1 d.p. Find the maximum relative error in xy.

1. Maximum relative errors 0.05/2.5 = 0.02 and 0.05/1.2 = 0.0417.
2. Product: about 0.0617 (6.2%), so xy = 3.0 ± 0.185.

Explain why computing √10001 − √10000 directly on a 6 s.f. machine is poor, and give a better formula.

1. √10001 = 100.005 and √10000 = 100.000 to 6 s.f.: the difference 0.005 has only one significant figure.
2. Use 1/(√10001 + √10000) = 1/200.005 = 0.00499988.

### Common mistakes

- Adding absolute errors for a product.

## Solving equations

*Refs: MEI Ne1, Ne2, Ne3, Ne4, Ne5. Level: AS & A.*

### What you need to know

- Bisection: halve an interval with a sign change each time. Slow but sure; error halves each step.
- False position: replace the midpoint with where the chord meets the axis: x = (af(b) − bf(a))/(f(b) − f(a)), keeping a sign change.
- Secant: the same formula with the two latest estimates (no sign change needed); faster but can fail.
- Newton-Raphson: x_{n+1} = xₙ − f(xₙ)/f′(xₙ). Second order (quadratic) convergence near a simple root: the number of correct digits roughly doubles each step.
- Fixed point iteration x_{n+1} = g(xₙ) converges near a root if |g′(root)| < 1; it is first order, with errors shrinking by a factor of about g′(root) each step.
- Relaxation: x_{n+1} = (1 − λ)xₙ + λg(xₙ), choosing λ to speed up or force convergence (best λ ≈ 1/(1 − g′(root))).

### Worked example

f(x) = x³ − 2x − 5 has a root between 2 and 3. Compare methods.

1. Bisection: 2.5 (f > 0), 2.25 (f > 0), 2.125 (f > 0), 2.0625 (f < 0): root in (2.0625, 2.125).
2. False position from (2, 3): f(2) = −1, f(3) = 16, x = (2 × 16 − 3 × (−1))/17 = 2.0588.
3. Newton-Raphson from 2: 2.1, 2.094568, 2.094551, 2.094551. Root 2.094551 to 6 d.p.
4. Fixed point with g(x) = ∛(2x + 5) from 2: 2.0801, 2.0924, 2.0942, 2.0945. g′(root) ≈ 0.16, so it converges, but slowly.

### Common mistakes

- Using false position without keeping a sign change.

## Numerical differentiation

*Refs: MEI Nc1, Nc2. Level: AS & A.*

### What you need to know

- Forward difference: f′(a) ≈ [f(a + h) − f(a)]/h (first order: error roughly proportional to h).
- Central difference: f′(a) ≈ [f(a + h) − f(a − h)]/(2h) (second order: error roughly proportional to h²).
- Making h very small eventually increases the error because of rounding (cancellation).

### Worked example

Estimate the derivative of eˣ at x = 1 with h = 0.1.

1. Forward: (e^{1.1} − e)/0.1 = 2.8588.
2. Central: (e^{1.1} − e^{0.9})/0.2 = 2.7228.
3. True value e = 2.7183: central is much more accurate.

## Interpolation

*Refs: MEI Nf1, Nf2. Level: AS & A.*

### What you need to know

- Newton's forward difference formula for equally spaced points x₀, x₀ + h, ... with s = (x − x₀)/h:

```latex
f(x) \approx f_0 + s\Delta f_0 + \frac{s(s-1)}{2!}\Delta^2 f_0 + \frac{s(s-1)(s-2)}{3!}\Delta^3 f_0 + \dots
```

- Lagrange's form gives the interpolating polynomial through any points (not necessarily equally spaced):

```latex
f(x) \approx \sum_i f(x_i)\prod_{j\ne i}\frac{x - x_j}{x_i - x_j}
```

- If the kth differences are constant, the data fit a polynomial of degree k.

### Worked example

x: 0, 1, 2, 3; f: 1, 3, 11, 31. Find the interpolating polynomial and f(1.5).

1. Differences: Δ: 2, 8, 20; Δ²: 6, 12; Δ³: 6 (cubic).
2. f(x) = 1 + 2x + 3x(x − 1) + x(x − 1)(x − 2) = x³ + x + 1.
3. f(1.5) = 3.375 + 1.5 + 1 = 5.875.

Use Lagrange's form for the quadratic through (0, 1), (1, 3), (3, 31).

1. 1 × (x − 1)(x − 3)/3 + 3 × x(x − 3)/(−2) + 31 × x(x − 1)/6.
2. Simplify: (2x² − 8x + 6 − 9x² + 27x + 31x² − 31x)/6 = (24x² − 12x + 6)/6 = 4x² − 2x + 1.
3. Check x = 3: 36 − 6 + 1 = 31 ✓.

### Common mistakes

- Using Newton's forward formula with unequal spacing.

## Check questions

1. a = 3.14 and b = 2.72 are each rounded to 2 d.p. Find bounds for a − b and the maximum relative error in a/b. [4 marks]
2. Use two iterations of the secant method on f(x) = x³ − 2x − 5 starting with x₀ = 2, x₁ = 3. [3 marks]
3. For g(x) = ∛(2x + 5), estimate g′ at the root 2.0946 and explain the rate of convergence of x_{n+1} = g(xₙ). [3 marks]
4. Estimate f′(2) for f(x) = ln x using a central difference with h = 0.1, and compare with the true value. [3 marks]
5. Use Newton's forward difference formula with x: 1, 2, 3; f: 2, 5, 10 to estimate f(2.5). [3 marks]

## Mark scheme

1. a − b between 3.135 − 2.725 = 0.41 and 3.145 − 2.715 = 0.43 (2). Relative error ≈ 0.005/3.14 + 0.005/2.72 = 0.0034 (2).
2. x₂ = 2.0588 (1). Using x₁ = 3 and x₂ = 2.0588: x₃ = 2.0813 (2).
3. g′(x) = (2/3)(2x + 5)^{−2/3} ≈ 0.152 at the root (2). |g′| < 1: first order convergence, errors multiplied by about 0.15 each step (1).
4. (ln 2.1 − ln 1.9)/0.2 = 0.50042 (2). True value 0.5, error about 0.0004 (1).
5. Δ: 3, 5; Δ²: 2; s = 1.5 (1). 2 + 1.5 × 3 + (1.5 × 0.5/2) × 2 = 7.25 (2).
