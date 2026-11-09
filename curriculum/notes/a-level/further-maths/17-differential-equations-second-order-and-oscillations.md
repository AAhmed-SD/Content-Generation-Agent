---
level: A-level
subject: Further Mathematics
topic: "Differential equations: second order, oscillations and coupled systems"
as_content: "All of this file is A-level only."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10", "I11"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["CP9.3", "CP9.4", "CP9.5", "CP9.6", "CP9.7", "CP9.8", "CP9.9", "FP1 3.2"]
  - board: OCR
    code: "H245"
    spec_refs: ["4.10d", "4.10e", "4.10f", "4.10g", "4.10h"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Pp19", "Pp20", "Pp21", "Pp22", "Pc11", "Pc12", "Pc13", "Pc14", "Pc15", "Pc16", "Pc17", "Pc18"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Differential equations: second order, oscillations and coupled systems

This file covers second order linear equations with constant coefficients: the auxiliary equation, complementary functions, particular integrals, simple harmonic motion, damped oscillations, and pairs of coupled first order equations. It also covers Edexcel's equations reducible by a substitution such as x = eᵘ.

## Overview

All A-level only. First order equations are in [16-differential-equations-first-order.md](16-differential-equations-first-order.md); complex numbers and e^{iθ} in [04-complex-numbers-de-moivre-exponential-form-and-nth-roots.md](04-complex-numbers-de-moivre-exponential-form-and-nth-roots.md). Simple harmonic motion as a mechanics topic (with Hooke's law and energy) is also in [49-variable-forces-kinematics-and-shm.md](49-variable-forces-kinematics-and-shm.md).

### Board differences

- AQA I3 to I11; Edexcel CP9.3 to CP9.9, FP1 3.2; OCR 4.10b, 4.10d to 4.10h; MEI Pp19 to Pp22, Pc11 to Pc18.
- AQA adds I10 (Hooke's law T = kx leading to SHM) and I11 (damping proportional to velocity) to its compulsory content.
- MEI Pc14 asks for particular integrals "in simple cases"; all boards include the case where the usual trial function is part of the complementary function.

## I4 Homogeneous equations and the auxiliary equation

*Refs: AQA I4, I6 · Edexcel CP9.4, CP9.6 · OCR 4.10d · MEI Pc11, Pc12. Level: A-level only.*

### What you need to know

- For a y″ + b y′ + c y = 0, the auxiliary equation is am² + bm + c = 0.

| Roots of the auxiliary equation | General solution |
| --- | --- |
| Real, distinct m₁, m₂ (b² > 4ac) | y = Ae^{m₁x} + Be^{m₂x} |
| Real, equal m (b² = 4ac) | y = (A + Bx)e^{mx} |
| Complex p ± qi (b² < 4ac) | y = e^{px}(A cos qx + B sin qx) |

- Two arbitrary constants; two conditions give a particular solution.

### Explained

Trying y = e^{mx} gives (am² + bm + c)e^{mx} = 0, so m must solve the auxiliary equation. With complex roots, e^{(p+qi)x} = e^{px}(cos qx + i sin qx), and combining the pair gives real cos and sin terms. When the roots are equal, xe^{mx} is a second independent solution.

The discriminant tells you the behaviour: real roots give exponential growth or decay, complex roots give oscillation (decaying if p < 0).

### Worked example

Solve y″ − 5y′ + 6y = 0.

1. m² − 5m + 6 = 0, m = 2, 3.
2. y = Ae^{2x} + Be^{3x}.

Solve y″ + 4y′ + 4y = 0 with y = 1, y′ = 0 at x = 0.

1. (m + 2)² = 0, m = −2. y = (A + Bx)e^{−2x}.
2. y(0) = A = 1. y′ = Be^{−2x} − 2(A + Bx)e^{−2x}, y′(0) = B − 2 = 0, B = 2.
3. y = (1 + 2x)e^{−2x}.

Solve y″ + 2y′ + 5y = 0.

1. m = −1 ± 2i. y = e^{−x}(A cos 2x + B sin 2x).

### Common mistakes

- Writing Ae^{mx} + Be^{mx} for a repeated root (only one constant really).
- Using e^{qx} instead of cos qx and sin qx for complex roots.

## I5 Particular integrals

*Refs: AQA I5 · Edexcel CP9.5 · OCR 4.10e · MEI Pc13, Pc14. Level: A-level only.*

### What you need to know

- General solution = complementary function (CF) + particular integral (PI).
- Trial forms for the PI:

| f(x) | Try |
| --- | --- |
| k | λ |
| polynomial of degree n | general polynomial of degree n |
| ke^{px} | λe^{px} |
| k cos px or k sin px | λ cos px + μ sin px |

- If the trial (or a term of it) is already in the CF, multiply by x (by x² if the root is repeated).
- Apply the conditions to the general solution, not to the CF alone.

### Explained

Substitute the trial function into the left side and compare coefficients. For trig, always include both cos and sin even if f has only one.

### Worked example

Solve y″ − y′ − 2y = 4x with y = 0 and y′ = 0 at x = 0.

1. CF: m² − m − 2 = 0, m = 2, −1. CF = Ae^{2x} + Be^{−x}.
2. PI: y = ax + b. 0 − a − 2(ax + b) = 4x, so a = −2, b = 1. PI = −2x + 1.
3. y = Ae^{2x} + Be^{−x} − 2x + 1.
4. y(0) = 0: A + B + 1 = 0. y′(0) = 0: 2A − B − 2 = 0. A = ⅓, B = −4/3.
5. y = ⅓e^{2x} − (4/3)e^{−x} − 2x + 1.

Find the general solution of y″ + y = 3e^{2x}.

1. CF = A cos x + B sin x.
2. PI λe^{2x}: 4λ + λ = 3, λ = 3/5.
3. y = A cos x + B sin x + (3/5)e^{2x}.

Find the general solution of y″ − 3y′ + 2y = e^{2x}.

1. CF: m = 1, 2. CF = Ae^{x} + Be^{2x}.
2. e^{2x} is in the CF, so try λxe^{2x}. y′ = λ(1 + 2x)e^{2x}, y″ = λ(4 + 4x)e^{2x}.
3. λ[(4 + 4x) − 3(1 + 2x) + 2x]e^{2x} = λe^{2x}, so λ = 1.
4. y = Ae^{x} + Be^{2x} + xe^{2x}.

Find the general solution of y″ + 4y = 8 cos 2x.

1. CF = A cos 2x + B sin 2x, which contains cos 2x.
2. Try x(λ cos 2x + μ sin 2x). Substituting gives −4λ sin 2x + 4μ cos 2x = 8 cos 2x, so λ = 0, μ = 2.
3. y = A cos 2x + B sin 2x + 2x sin 2x. (The x sin 2x term grows: resonance.)

### Common mistakes

- Trying λ cos px alone.
- Applying the boundary conditions before adding the PI.

## I7 Simple harmonic motion

*Refs: AQA I7, I10 · Edexcel CP9.7 · OCR 4.10f · MEI Pc15. Level: A-level only.*

### What you need to know

```latex
\ddot x = -\omega^2 x \;\Rightarrow\; x = A\cos\omega t + B\sin\omega t = R\sin(\omega t + \alpha)
```

- Period 2π/ω; amplitude R = √(A² + B²).
- (AQA I10) A particle on a spring with tension T = kx (extension x from equilibrium) gives m ẍ = −kx, so ω² = k/m.

### Explained

The acceleration is always towards the centre and proportional to the distance from it. The motion repeats forever with constant amplitude, because nothing removes energy.

### Worked example

A particle moves with ẍ = −9x. At t = 0, x = 2 and ẋ = 0. Find x, the period and the maximum speed.

1. x = A cos 3t + B sin 3t. x(0) = 2 gives A = 2; ẋ(0) = 0 gives B = 0.
2. x = 2 cos 3t. Period 2π/3. ẋ = −6 sin 3t, maximum speed 6.

A mass of 0.5 kg hangs on a spring of stiffness 50 N m⁻¹ and is pulled 0.1 m below equilibrium and released. Find its displacement x from equilibrium at time t.

1. 0.5ẍ = −50x, ẍ = −100x, ω = 10.
2. x = 0.1 cos 10t (taking downwards positive).

### Common mistakes

- Taking ω² as the period.

## I8 Damped oscillations

*Refs: AQA I8, I11 · Edexcel CP9.8 · OCR 4.10g · MEI Pc16, Pc17. Level: A-level only.*

### What you need to know

- ẍ + kẋ + ω²x = 0 models motion with a resistance proportional to velocity.
- Heavy damping: k² > 4ω², real roots, no oscillation. Critical damping: k² = 4ω², returns fastest without oscillating. Light damping: k² < 4ω², oscillations that decay.
- A forcing term f(t) on the right gives forced oscillations.

### Explained

The discriminant of the auxiliary equation decides the type. In light damping, the solution is e^{−kt/2}(A cos qt + B sin qt): a sine wave inside a shrinking exponential envelope. In the long run the CF dies away, leaving only the PI (the steady state).

### Worked example

ẍ + 4ẋ + 13x = 0, x = 2, ẋ = 0 at t = 0. Find x and describe the motion.

1. m² + 4m + 13 = 0, m = −2 ± 3i. x = e^{−2t}(A cos 3t + B sin 3t).
2. A = 2. ẋ(0) = −2A + 3B = 0, B = 4/3.
3. x = e^{−2t}(2 cos 3t + (4/3) sin 3t). Light damping: oscillations with decaying amplitude.

For ẍ + kẋ + 9x = 0, find k for critical damping.

1. k² = 36, k = 6.

### Common mistakes

- Mixing up heavy and light damping.

## I9 Coupled first order equations

*Refs: AQA I9 · Edexcel CP9.9 · OCR 4.10h · MEI Pc18. Level: A-level only.*

### What you need to know

- Solve ẋ = ax + by, ẏ = cx + dy by eliminating one variable to get a second order equation.
- Interpret the solution, for example in predator-prey or two-population models.

### Explained

From the first equation, y = (ẋ − ax)/b. Differentiate to get ẏ and substitute into the second equation. Solve the resulting second order equation for x, then find y from y = (ẋ − ax)/b, which avoids new constants.

### Worked example

Solve ẋ = 2x + y, ẏ = x + 2y with x = 3, y = 1 at t = 0.

1. y = ẋ − 2x, ẏ = ẍ − 2ẋ.
2. ẍ − 2ẋ = x + 2(ẋ − 2x), so ẍ − 4ẋ + 3x = 0.
3. m = 1, 3: x = Aeᵗ + Be^{3t}.
4. y = ẋ − 2x = −Aeᵗ + Be^{3t}.
5. t = 0: A + B = 3, −A + B = 1. A = 1, B = 2.
6. x = eᵗ + 2e^{3t}, y = 2e^{3t} − eᵗ.

### Common mistakes

- Solving for y separately and getting two extra constants.

## Equations reducible by a substitution (second order)

*Refs: Edexcel FP1 3.2. Level: A-level only (option content).*

### What you need to know

- With a given substitution, such as x = eᵘ for x²y″ + axy′ + by = f(x), reduce the equation to constant coefficients.

### Explained

If x = eᵘ, then dy/dx = (1/x) dy/du and d²y/dx² = (1/x²)(d²y/du² − dy/du). So x²y″ = y_uu − y_u and xy′ = y_u.

### Worked example

Use x = eᵘ to solve x²y″ − 2xy′ + 2y = x³ for x > 0.

1. y_uu − y_u − 2y_u + 2y = e^{3u}, so y_uu − 3y_u + 2y = e^{3u}.
2. CF: m = 1, 2: Aeᵘ + Be^{2u}. PI λe^{3u}: 9λ − 9λ + 2λ = 1, λ = ½.
3. y = Ax + Bx² + x³/2.

## Check questions

1. Find the general solution of 2y″ + 7y′ + 3y = 0. [3 marks]
2. Solve y″ + 6y′ + 9y = 0 with y = 2, y′ = −4 at x = 0. [4 marks]
3. Find the general solution of y″ + 9y = sin 3x. [6 marks]
4. Solve y″ + y′ − 6y = 12, with y = 0 and y′ = 5 at x = 0. [7 marks]
5. A particle moves so that ẍ + 2kẋ + 25x = 0. (a) Find the values of k for which the motion is oscillatory. (b) For k = 3, with x = 4, ẋ = 0 at t = 0, find x. [7 marks]
6. Two populations satisfy ẋ = x − 2y, ẏ = 3x − 4y, with x = 10, y = 5 at t = 0. Find x and y and describe what happens in the long run. [8 marks]

## Mark scheme

1. 2m² + 7m + 3 = 0 (1), m = −½, −3 (1). y = Ae^{−x/2} + Be^{−3x} (1).
2. y = (A + Bx)e^{−3x} (1). A = 2 (1). y′(0) = B − 3A = −4, B = 2 (1). y = (2 + 2x)e^{−3x} (1).
3. CF A cos 3x + B sin 3x (1). Trial x(λ cos 3x + μ sin 3x) (1). Substituting: −6λ sin 3x + 6μ cos 3x = sin 3x (2). λ = −1/6, μ = 0 (1). y = A cos 3x + B sin 3x − (x/6)cos 3x (1).
4. CF Ae^{2x} + Be^{−3x} (2). PI −2 (1). A + B − 2 = 0, 2A − 3B = 5 (2). A = 11/5, B = −1/5 (1). y = (11/5)e^{2x} − (1/5)e^{−3x} − 2 (1).
5. (a) Discriminant 4k² − 100 < 0 (1), −5 < k < 5 (with k ≥ 0 for resistance, 0 ≤ k < 5) (1). (b) m² + 6m + 25 = 0, m = −3 ± 4i (1). x = e^{−3t}(A cos 4t + B sin 4t) (1). A = 4 (1). −3A + 4B = 0, B = 3 (1). x = e^{−3t}(4 cos 4t + 3 sin 4t) (1).
6. y = (x − ẋ)/2 (1). ẏ = (ẋ − ẍ)/2 (1). (ẋ − ẍ)/2 = 3x − 2(x − ẋ), giving ẍ + 3ẋ + 2x = 0 (1). x = Ae^{−t} + Be^{−2t} (1). y = (x − ẋ)/2 = Ae^{−t} + (3/2)Be^{−2t} (1). A + B = 10, A + 1.5B = 5 (1): B = −10, A = 20 (1). x = 20e^{−t} − 10e^{−2t}, y = 20e^{−t} − 15e^{−2t}; both tend to 0 (1).
