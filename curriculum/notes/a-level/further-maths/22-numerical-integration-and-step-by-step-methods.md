---
level: A-level
subject: Further Mathematics
topic: "Numerical integration and step-by-step methods for differential equations"
as_content: "AQA J1 to J3 are A-level compulsory content. Edexcel FP1 6 is option content. MEI Numerical Methods (Nc3, Nc4) is also an AS paper (Y414); MEI Further Pure with Technology (Tc7 to Tc10) is A-level only."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["OT2.4", "J1", "J2", "J3"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FP1 6.1", "FP1 6.2"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Nc3", "Nc4", "Tc7", "Tc8", "Tc9", "Tc10"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Numerical integration and step-by-step methods for differential equations

This file covers the mid-ordinate (midpoint) rule and Simpson's rule, how the midpoint, trapezium and Simpson's rules relate, Euler's method, improved and modified Euler methods, the Runge-Kutta idea, and step-by-step methods for second order equations.

## Overview

The trapezium rule is in A-level Maths ([../maths/17-numerical-methods.md](../maths/17-numerical-methods.md)). Solving equations numerically, errors and interpolation (MEI Numerical Methods) are in [60-numerical-methods-errors-equations-and-approximation.md](60-numerical-methods-errors-equations-and-approximation.md). Analytic solutions of differential equations are in [16-differential-equations-first-order.md](16-differential-equations-first-order.md) and [17-differential-equations-second-order-and-oscillations.md](17-differential-equations-second-order-and-oscillations.md).

### Board differences

- AQA J1 (mid-ordinate and Simpson's rules), J2 (Euler), J3 (improved Euler, in the form y_{r+1} = y_{r−1} + 2hf(x_r, y_r)).
- Edexcel FP1 6.1 uses the approximations (dy/dx)ₙ ≈ (y_{n+1} − yₙ)/h and (dy/dx)ₙ ≈ (y_{n+1} − y_{n−1})/(2h), and (d²y/dx²)ₙ ≈ (y_{n+1} − 2yₙ + y_{n−1})/h² for second order equations. FP1 6.2 is Simpson's rule.
- MEI Nc3, Nc4: midpoint, trapezium and Simpson's rules, T₂ₙ = ½(Mₙ + Tₙ), S₂ₙ = (2Mₙ + Tₙ)/3, and the order of each method. MEI Tc7 to Tc10: Euler, a modified Euler method (k₁ = hf(xₙ, yₙ), k₂ = hf(xₙ + h, yₙ + k₁), y_{n+1} = yₙ + ½(k₁ + k₂)) and fourth order Runge-Kutta, with software.
- Note the name clash: AQA's "improved Euler" is the two-step formula above; MEI's "modified Euler" is the predictor-corrector one. Use the version your board gives.

## J1 The mid-ordinate rule and Simpson's rule

*Refs: AQA J1 · Edexcel FP1 6.2 · MEI Nc3, Nc4. Level: A-level only (MEI also AS).*

### What you need to know

With n strips of width h = (b − a)/n:

```latex
M_n = h\,(y_{1/2} + y_{3/2} + \dots + y_{n-1/2})
```

With an even number 2n of strips of width h = (b − a)/(2n):

```latex
S_{2n} = \frac{h}{3}\big[(y_0 + y_{2n}) + 4(y_1 + y_3 + \dots + y_{2n-1}) + 2(y_2 + y_4 + \dots + y_{2n-2})\big]
```

- (MEI) T₂ₙ = ½(Mₙ + Tₙ) and S₂ₙ = (2Mₙ + Tₙ)/3 = (4T₂ₙ − Tₙ)/3.
- (MEI) The midpoint and trapezium rules are second order (halving h roughly quarters the error); Simpson's rule is fourth order (halving h divides the error by about 16).

### Explained

The mid-ordinate rule uses the height at the middle of each strip. Simpson's rule fits a parabola through each set of three points, which is why it needs an even number of strips and is far more accurate.

For a curve that is concave up (y″ > 0), the trapezium rule overestimates and the midpoint rule underestimates; for concave down it is the other way round. The true value lies between them, and Simpson's weighted average is closer still.

### Worked example

Estimate ∫₀¹ e^{−x²} dx using Simpson's rule with 4 strips.

1. h = 0.25. y₀ = 1, y₁ = 0.939413, y₂ = 0.778801, y₃ = 0.569783, y₄ = 0.367879.
2. S = (0.25/3)[1 + 0.367879 + 4(0.939413 + 0.569783) + 2(0.778801)] = 0.746855.

Same integral: find M₄ and T₄, and hence S₈.

1. M₄ = 0.25[f(0.125) + f(0.375) + f(0.625) + f(0.875)] = 0.748747.
2. T₄ = 0.25[½(1 + 0.367879) + 0.939413 + 0.778801 + 0.569783] = 0.742984.
3. S₈ = (2 × 0.748747 + 0.742984)/3 = 0.746826.

### Common mistakes

- Using an odd number of strips with Simpson's rule.
- Swapping the 4 and 2 weights.

## J2 Euler's method

*Refs: AQA J2 · Edexcel FP1 6.1 · MEI Tc7, Tc8. Level: A-level only.*

### What you need to know

For dy/dx = f(x, y) with y(x₀) = y₀ and step h:

```latex
y_{r+1} = y_r + h\,f(x_r, y_r),\qquad x_{r+1} = x_r + h
```

- A smaller step usually gives a better answer, but takes more steps and builds up rounding error.

### Explained

Each step follows the tangent line for a distance h. If the curve bends away from the tangent, the error grows with each step. For a curve that is concave up, Euler underestimates.

### Worked example

dy/dx = x + y, y(0) = 1. Use Euler's method with h = 0.1 to estimate y(0.2).

1. y₁ = 1 + 0.1(0 + 1) = 1.1.
2. y₂ = 1.1 + 0.1(0.1 + 1.1) = 1.22.
3. The exact value is 2e^{0.2} − 1.2 = 1.24281, so Euler underestimates (the solution is concave up).

### Common mistakes

- Using f(x_{r+1}, y_{r+1}) in the step.

## J3 Improved and modified Euler methods

*Refs: AQA J3 · Edexcel FP1 6.1 · MEI Tc7, Tc8. Level: A-level only.*

### What you need to know

- AQA improved Euler (and Edexcel's central difference): y_{r+1} = y_{r−1} + 2hf(x_r, y_r). It needs two starting values; get y₁ from one Euler step.
- MEI modified Euler: k₁ = hf(xₙ, yₙ), k₂ = hf(xₙ + h, yₙ + k₁), y_{n+1} = yₙ + ½(k₁ + k₂).

### Explained

Both use more information about the slope than plain Euler. The two-step formula uses the gradient at the middle of a 2h interval. The modified (predictor-corrector) method averages the gradient at the start and at an Euler prediction of the end.

### Worked example

dy/dx = x + y, y(0) = 1. Use the AQA improved Euler formula with h = 0.1 to estimate y(0.2), taking y₁ from Euler.

1. y₁ = 1.1 (Euler).
2. y₂ = y₀ + 2(0.1)f(0.1, 1.1) = 1 + 0.2(1.2) = 1.24.

Same equation: use the MEI modified Euler method with h = 0.1 for two steps.

1. Step 1: k₁ = 0.1(1) = 0.1, k₂ = 0.1(0.1 + 1.1) = 0.12. y₁ = 1 + 0.11 = 1.11.
2. Step 2: k₁ = 0.1(0.1 + 1.11) = 0.121, k₂ = 0.1(0.2 + 1.231) = 0.1431. y₂ = 1.11 + 0.13205 = 1.24205.

### Common mistakes

- Using y_r instead of y_{r−1} at the start of the two-step formula.

## Runge-Kutta methods

*Refs: MEI Tc9, Tc10. Level: A-level only (option content).*

### What you need to know

- The fourth order Runge-Kutta method takes a weighted average of four slope estimates:

```latex
k_1 = hf(x_n, y_n),\ k_2 = hf\!\left(x_n + \tfrac h2, y_n + \tfrac{k_1}{2}\right),\ k_3 = hf\!\left(x_n + \tfrac h2, y_n + \tfrac{k_2}{2}\right),\ k_4 = hf(x_n + h, y_n + k_3)
```

```latex
y_{n+1} = y_n + \tfrac16(k_1 + 2k_2 + 2k_3 + k_4)
```

- Use it with software (a spreadsheet) and compare step lengths.

### Worked example

dy/dx = x + y, y(0) = 1. One step of RK4 with h = 0.2.

1. k₁ = 0.2(1) = 0.2. k₂ = 0.2(0.1 + 1.1) = 0.24. k₃ = 0.2(0.1 + 1.12) = 0.244. k₄ = 0.2(0.2 + 1.244) = 0.2888.
2. y₁ = 1 + (0.2 + 0.48 + 0.488 + 0.2888)/6 = 1.2428, very close to the exact 1.24281.

### Common mistakes

- Forgetting to halve h in the middle two slope estimates.

## Second order equations step by step

*Refs: Edexcel FP1 6.1. Level: A-level only (option content).*

### What you need to know

- (d²y/dx²)ₙ ≈ (y_{n+1} − 2yₙ + y_{n−1})/h², so y_{n+1} ≈ 2yₙ − y_{n−1} + h²(d²y/dx²)ₙ.
- Start with y₁ from y₀ and (dy/dx)₀: y₁ ≈ y₀ + h(dy/dx)₀.

### Worked example

d²y/dx² = −y, y = 1 and dy/dx = 0 at x = 0. Estimate y at x = 0.2 with h = 0.1.

1. y₁ ≈ 1 + 0.1 × 0 = 1.
2. y₂ ≈ 2(1) − 1 + 0.01(−1) = 0.99. (The exact value is cos 0.2 = 0.98007.)

### Common mistakes

- Using h instead of h² in the second order formula.

## Check questions

1. Use the mid-ordinate rule with 4 strips to estimate ∫₁³ ln x dx, to 4 decimal places. [4 marks]
2. Use Simpson's rule with 4 strips to estimate ∫₀² √(1 + x³) dx, to 4 decimal places. [4 marks]
3. dy/dx = y² − x, y(0) = 1. Use Euler's method with h = 0.1 to estimate y(0.3). [4 marks]
4. (AQA) dy/dx = xy, y(1) = 2. Use Euler for one step and then the improved Euler formula y_{r+1} = y_{r−1} + 2hf(x_r, y_r) with h = 0.1 to estimate y(1.2). [4 marks]
5. (MEI) Given M₂ = 0.6935 and T₂ = 0.7083 for some integral, find T₄ and S₄. [3 marks]

## Mark scheme

1. h = 0.5; mid-ordinates at 1.25, 1.75, 2.25, 2.75 (1). ln values 0.22314, 0.55962, 0.81093, 1.01160 (1). Sum 2.60529 × 0.5 (1) = 1.3026 (1).
2. h = 0.5; y values 1, 1.06066, 1.41421, 2.09165, 3 (1). (0.5/3)[1 + 3 + 4(1.06066 + 2.09165) + 2(1.41421)] (2) = 3.2396 (1).
3. y₁ = 1 + 0.1(1) = 1.1 (1). y₂ = 1.1 + 0.1(1.21 − 0.1) = 1.211 (1). y₃ = 1.211 + 0.1(1.466521 − 0.2) = 1.33765 (2).
4. y₁ = 2 + 0.1(2) = 2.2 (1). f(1.1, 2.2) = 2.42 (1). y₂ = 2 + 0.2 × 2.42 (1) = 2.484 (1).
5. T₄ = ½(0.6935 + 0.7083) = 0.7009 (1). S₄ = (2 × 0.6935 + 0.7083)/3 (1) = 0.6984 (1).
