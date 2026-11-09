---
level: A-level
subject: Mathematics
topic: "Differentiation: standard functions, chain, product and quotient rules, implicit and parametric"
as_content: "All of this file is A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["G2", "G4", "G5"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P7.2", "P7.4", "P7.5"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.07j", "1.07k", "1.07l", "1.07q", "1.07r", "1.07s"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Mg15", "Mc10", "Mc11", "Mc12", "Mc13", "Mc14", "Mc15", "Mc16"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Differentiation: standard functions, chain, product and quotient rules, implicit and parametric

This file covers differentiating exponentials, logarithms and trigonometric functions, the chain, product and quotient rules, connected rates of change, inverse functions, and implicit and parametric differentiation. The basics (xⁿ, tangents, stationary points) are in file 12.

## Overview

All A-level only. The results here are used constantly in integration (file 15), differential equations (file 16) and the Newton-Raphson method (file 17).

### Board differences

- AQA G2 (the non-power part), G4, G5; Edexcel 7.2, 7.4, 7.5.
- OCR H240: 1.07j to 1.07l, 1.07q to 1.07s.
- OCR MEI H640: Mc10 to Mc16, and Mg15 for the gradient of a parametric curve.
- Edexcel's 7.4 guidance includes the derivatives of cosec x, sec x and cot x. They follow from the quotient rule, and the other boards' formula books give them too, so they are included here for everyone.
- Only the first derivative is needed for implicit and parametric differentiation (all boards).

## G2 Derivatives of standard functions

*Refs: AQA G2 · Edexcel 7.2 · OCR 1.07j, 1.07k, 1.07l · MEI Mc10, Mc11. Level: A-level only.*

### What you need to know

- (A-level only) The standard derivatives (x in radians for the trig functions):

| f(x) | f′(x) |
| --- | --- |
| e^{kx} | ke^{kx} |
| a^{kx} | ka^{kx} ln a |
| ln x | 1/x |
| sin kx | k cos kx |
| cos kx | −k sin kx |
| tan kx | k sec²kx |
| sec x | sec x tan x |
| cosec x | −cosec x cot x |
| cot x | −cosec²x |

- (A-level only) Sums, differences and constant multiples of these.

### Explained

aˣ = e^{x ln a}, so its derivative is ln a × e^{x ln a} = aˣ ln a.

ln(kx) = ln k + ln x, so its derivative is also 1/x: the constant k disappears.

The trig derivatives only hold in radians. In degrees, extra factors of π/180 appear.

### Worked example

(A-level only) Differentiate y = 3e^{−2x} + 5 ln x − 4 sin 3x.

1. dy/dx = −6e^{−2x} + 5/x − 12 cos 3x.

(A-level only) Differentiate y = 2ˣ and find the gradient at x = 3.

1. dy/dx = 2ˣ ln 2.
2. At x = 3: 8 ln 2 = 5.55.

(A-level only) Differentiate y = cos(x/2) + tan 4x.

1. dy/dx = −(1/2) sin(x/2) + 4 sec²4x.

### Common mistakes

- (A-level only) Writing the derivative of aˣ as xa^{x−1}.
- (A-level only) Writing the derivative of ln 5x as 5/x.

## G4 Chain, product and quotient rules; rates of change

*Refs: AQA G4 · Edexcel 7.4 · OCR 1.07q, 1.07r · MEI Mc12, Mc13, Mc14, Mc15. Level: A-level only.*

### What you need to know

- (A-level only) Chain rule, for a function of a function:

```latex
\frac{dy}{dx} = \frac{dy}{du} \times \frac{du}{dx}
```

- (A-level only) Product rule, for y = uv:

```latex
\frac{dy}{dx} = u\frac{dv}{dx} + v\frac{du}{dx}
```

- (A-level only) Quotient rule, for y = u/v:

```latex
\frac{dy}{dx} = \frac{v\dfrac{du}{dx} - u\dfrac{dv}{dx}}{v^2}
```

- (A-level only) Connected rates of change, using the chain rule with time.
- (A-level only) Derivative of an inverse function:

```latex
\frac{dy}{dx} = \frac{1}{\;dx/dy\;}
```

### Explained

**Chain rule in practice.** Differentiate the outside function, leaving the inside alone, then multiply by the derivative of the inside. Common patterns:

```latex
\frac{d}{dx}\left[f(x)\right]^n = n\left[f(x)\right]^{n-1}f'(x) \qquad \frac{d}{dx}e^{f(x)} = f'(x)e^{f(x)} \qquad \frac{d}{dx}\ln f(x) = \frac{f'(x)}{f(x)}
```

**Which rule?** A product of two functions of x: product rule. A function inside another: chain rule. A fraction with x top and bottom: quotient rule (or write it as a product with a negative power). Many questions need two rules together.

**Connected rates of change.** Write the rate you want as a product of rates you know, for example dr/dt = (dV/dt) ÷ (dV/dr). Write a formula linking the two variables, differentiate it, and substitute.

### Worked example

(A-level only) Differentiate y = (3x² − 1)⁵.

1. dy/dx = 5(3x² − 1)⁴ × 6x = 30x(3x² − 1)⁴.

(A-level only) Differentiate y = √(1 + 4x) and y = ln(x² + 1) and y = e^{sin x}.

1. (1 + 4x)^{1/2}: (1/2)(1 + 4x)^{−1/2} × 4 = 2/√(1 + 4x).
2. ln(x² + 1): 2x/(x² + 1).
3. e^{sin x}: cos x e^{sin x}.

(A-level only) Differentiate y = x²e^{3x}.

1. u = x², v = e^{3x}; u′ = 2x, v′ = 3e^{3x}.
2. dy/dx = 3x²e^{3x} + 2xe^{3x} = xe^{3x}(3x + 2).

(A-level only) Differentiate y = x³ ln x and find the exact x-coordinate of its stationary point.

1. dy/dx = 3x² ln x + x³ × (1/x) = x²(3 ln x + 1).
2. x > 0, so 3 ln x + 1 = 0, ln x = −1/3, x = e^{−1/3}.

(A-level only) Differentiate y = (2x + 1)/(x − 3).

1. dy/dx = [(x − 3)(2) − (2x + 1)(1)]/(x − 3)² = −7/(x − 3)².

(A-level only) Prove that the derivative of tan x is sec²x.

1. tan x = sin x/cos x.
2. Quotient rule: [cos x cos x − sin x(−sin x)]/cos²x = (cos²x + sin²x)/cos²x = 1/cos²x = sec²x.

(A-level only) Prove that the derivative of sec x is sec x tan x.

1. sec x = (cos x)⁻¹. Chain rule: −(cos x)⁻² × (−sin x) = sin x/cos²x.
2. = (1/cos x)(sin x/cos x) = sec x tan x.

(A-level only) The volume of a sphere increases at 10 cm³ s⁻¹. Find the rate of increase of the radius when r = 5 cm.

1. V = (4/3)πr³, so dV/dr = 4πr² = 100π at r = 5.
2. dr/dt = (dV/dt)/(dV/dr) = 10/(100π) = 1/(10π) = 0.0318 cm s⁻¹.

(A-level only) Find dy/dx when x = y³ + y.

1. dx/dy = 3y² + 1.
2. dy/dx = 1/(3y² + 1).

### Common mistakes

- (A-level only) Forgetting to multiply by the derivative of the inside function.
- (A-level only) Getting the order in the quotient rule wrong: it is v u′ − u v′ on top.
- (A-level only) Writing d/dx(e^{x²}) as e^{x²}.

## G5 Implicit and parametric differentiation

*Refs: AQA G5 · Edexcel 7.5 · OCR 1.07s · MEI Mc16, Mg15. Level: A-level only.*

### What you need to know

- (A-level only) Differentiate a relation between x and y without making y the subject (implicit differentiation), for first derivatives only.
- (A-level only) For a curve given by x = f(t), y = g(t):

```latex
\frac{dy}{dx} = \frac{dy/dt}{dx/dt}
```

### Explained

**Implicit.** Differentiate every term with respect to x. Terms in x only: as usual. Terms in y: differentiate with respect to y, then multiply by dy/dx (chain rule). Terms with both x and y: product rule. Then collect the dy/dx terms and factorise.

```latex
\frac{d}{dx}(y^2) = 2y\frac{dy}{dx} \qquad \frac{d}{dx}(xy) = x\frac{dy}{dx} + y \qquad \frac{d}{dx}(e^{y}) = e^{y}\frac{dy}{dx}
```

**Parametric.** Differentiate x and y with respect to t, then divide. The gradient is in terms of t. Find the point and gradient at a given t, then write the tangent or normal in x and y. Stationary points occur where dy/dt = 0 (with dx/dt ≠ 0). A vertical tangent occurs where dx/dt = 0 (with dy/dt ≠ 0).

### Worked example

(A-level only) Find the gradient of x² + y² − 4x + 6y = 12 at (5, 1).

1. 2x + 2y(dy/dx) − 4 + 6(dy/dx) = 0.
2. dy/dx = (4 − 2x)/(2y + 6) = (2 − x)/(y + 3).
3. At (5, 1): −3/4.

(A-level only) Find the tangent to x³ + xy + y² = 7 at (1, 2).

1. 3x² + (x(dy/dx) + y) + 2y(dy/dx) = 0.
2. dy/dx = −(3x² + y)/(x + 2y) = −5/5 = −1 at (1, 2).
3. Tangent: y − 2 = −(x − 1), so y = 3 − x.

(A-level only) A curve has x = t², y = t³ − 3t. Find the stationary points, and the tangent where t = 2.

1. dx/dt = 2t, dy/dt = 3t² − 3. dy/dx = (3t² − 3)/(2t).
2. Stationary when 3t² − 3 = 0, t = ±1: points (1, −2) and (1, 2).
3. At t = 2: point (4, 2), gradient 9/4.
4. Tangent: y − 2 = (9/4)(x − 4), so 9x − 4y − 28 = 0.

(A-level only) The ellipse x = 2cos θ, y = 3sin θ. Find the gradient at θ = π/4.

1. dy/dx = 3cos θ/(−2sin θ) = −(3/2)cot θ.
2. At θ = π/4: −3/2.

### Common mistakes

- (A-level only) Forgetting the dy/dx when differentiating a y term.
- (A-level only) Differentiating xy as x(dy/dx) only, missing the + y.
- (A-level only) Writing the parametric gradient as (dx/dt)/(dy/dt).

## Check questions

1. (A-level only) Differentiate: (a) e^{−4x}; (b) 5ˣ; (c) ln(3x − 2); (d) cos 5x; (e) tan(x/3). [5 marks]
2. (A-level only) Differentiate y = x² sin 3x. [3 marks]
3. (A-level only) The curve y = ln x / x² has one stationary point. Find dy/dx and the exact coordinates of the stationary point. [6 marks]
4. (A-level only) Find dy/dx for y = 1/√(5 − 2x). [2 marks]
5. (A-level only) A curve has equation x = 3y² − 2y. Find dy/dx at the point (1, 1). [3 marks]
6. (A-level only) Find the equation of the tangent to x² − 2xy + 3y² = 6 at (−1, 1). [5 marks]
7. (A-level only) A curve has x = t³, y = t² − 4t. Find the equation of the normal at t = 1. [5 marks]
8. (A-level only) The side of a cube increases at 0.2 cm s⁻¹. Find the rate of increase of its volume when the side is 5 cm. [3 marks]
9. (A-level only) Show that the derivative of cosec x is −cosec x cot x. [3 marks]
10. (A-level only) Find the coordinates of the stationary point of y = xe^{−x} and determine its nature. [5 marks]

## Mark scheme

1. (a) −4e^{−4x} (1). (b) 5ˣ ln 5 (1). (c) 3/(3x − 2) (1). (d) −5 sin 5x (1). (e) (1/3)sec²(x/3) (1).
2. Product rule (1); 2x sin 3x (1); + 3x² cos 3x (1).
3. Quotient rule (1); dy/dx = (x − 2x ln x)/x⁴ = (1 − 2 ln x)/x³ (2); 1 − 2 ln x = 0, x = e^{1/2} (1); y = (1/2)/e = 1/(2e) (1); (√e, 1/(2e)) (1).
4. (5 − 2x)^{−1/2}, derivative −(1/2)(5 − 2x)^{−3/2} × (−2) (1); (5 − 2x)^{−3/2} (1).
5. dx/dy = 6y − 2 = 4 at y = 1 (2); dy/dx = 1/4 (1).
6. 2x − 2y − 2x(dy/dx) + 6y(dy/dx) = 0 (2); dy/dx = (2y − 2x)/(6y − 2x) = 4/8 = 1/2 at (−1, 1) (1); y − 1 = (1/2)(x + 1) (1); x − 2y + 3 = 0 (1).
7. dy/dx = (2t − 4)/(3t²) (1); = −2/3 at t = 1 (1); point (1, −3) (1); normal gradient 3/2 (1); 3x − 2y − 9 = 0 (1).
8. V = s³, dV/ds = 3s² = 75 (1); dV/dt = 75 × 0.2 (1) = 15 cm³ s⁻¹ (1).
9. cosec x = (sin x)⁻¹; derivative −(sin x)⁻² cos x (1); = −(1/sin x)(cos x/sin x) (1); = −cosec x cot x (1).
10. dy/dx = e^{−x} − xe^{−x} = e^{−x}(1 − x) (2); x = 1, y = 1/e (1); d²y/dx² = e^{−x}(x − 2) = −1/e < 0 at x = 1 (1); maximum (1).
