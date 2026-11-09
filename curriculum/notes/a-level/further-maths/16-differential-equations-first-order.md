---
level: A-level
subject: Further Mathematics
topic: "Differential equations: first order and integrating factors"
as_content: "All of this file is A-level only."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["OT3.1", "OT3.2", "OT3.3", "OT3.4", "OT3.5", "I1", "I2", "I3"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["CP9.1", "CP9.2", "CP9.3", "FP1 3.2"]
  - board: OCR
    code: "H245"
    spec_refs: ["4.10a", "4.10b", "4.10c"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Pp19", "Pp20", "Pp21", "Pp22", "Pc7", "Pc8", "Pc9", "Pc10"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Differential equations: first order and integrating factors

This file covers general and particular solutions, the integrating factor method for first order linear equations, setting up and interpreting first order models, and (Edexcel FP1) first order equations reduced to a standard type by a substitution.

## Overview

All A-level only. Separable equations and simple modelling are in A-level Maths ([../maths/16-differential-equations.md](../maths/16-differential-equations.md)). Second order equations, oscillations and coupled systems are in [17-differential-equations-second-order-and-oscillations.md](17-differential-equations-second-order-and-oscillations.md). Numerical methods (Euler) are in [22-numerical-integration-and-step-by-step-methods.md](22-numerical-integration-and-step-by-step-methods.md).

### Board differences

- AQA I1 to I3 (and the modelling themes OT3.1 to OT3.5); Edexcel CP9.1 to CP9.3, FP1 3.2; OCR 4.10a to 4.10c; MEI Pp19 to Pp22, Pc7 to Pc10.
- MEI Pp19 to Pp22 stress forming equations from words, including kinematics language (rate of change of velocity, and so on).
- Edexcel FP1 3.2 covers equations reducible to standard types by a given substitution.

## I2 General and particular solutions

*Refs: AQA I2 · Edexcel CP9.2 · OCR 4.10a · MEI Pc7. Level: A-level only.*

### What you need to know

- A general solution of a first order equation has one arbitrary constant and represents a family of curves.
- A particular solution uses a boundary or initial condition to fix the constant.
- Verify a solution by substituting it into the equation.

### Explained

Sketching a few members of the family (with different constants) shows how the condition picks out one curve. In context, the initial condition is usually the value at t = 0.

### Worked example

Verify that y = Ax − x² is a solution of x dy/dx − y = −x², and find the particular solution through (1, 3).

1. dy/dx = A − 2x. x(A − 2x) − (Ax − x²) = −x² ✓.
2. 3 = A − 1, A = 4. y = 4x − x².

### Common mistakes

- Applying the condition before integrating has finished, or forgetting the constant.

## I1 The integrating factor

*Refs: AQA I1 · Edexcel CP9.1 · OCR 4.10c · MEI Pc8, Pc9, Pc10. Level: A-level only.*

### What you need to know

- For dy/dx + P(x)y = Q(x), multiply through by

```latex
I(x) = e^{\int P(x)\,dx}
```

- Then the left side is d/dx (Iy), so

```latex
I(x)\,y = \int I(x)\,Q(x)\,dx
```

- Recognise when the method applies: the equation must be linear in y, with coefficient of dy/dx equal to 1 (divide through first).

### Explained

The integrating factor makes the left side the result of the product rule: d/dx(Iy) = I dy/dx + I′y, and I′ = PI by design. Then integrate both sides.

Steps:

1. Rewrite in standard form, dividing by the coefficient of dy/dx.
2. Find I = e^{∫P dx}. No constant is needed. Simplify: e^{2 ln x} = x².
3. Write Iy = ∫IQ dx + c. Do not forget the constant.
4. Divide by I. Apply any condition.

Some equations can be solved by separating the variables as well; use whichever is easier.

### Worked example

Solve dy/dx + 2y/x = x for x > 0, given y = 1 when x = 1.

1. P = 2/x, I = e^{2 ln x} = x².
2. x²y = ∫x³ dx = x⁴/4 + c.
3. x = 1: 1 = ¼ + c, c = ¾. y = x²/4 + 3/(4x²).

Solve dy/dx + y tan x = cos²x for −π/2 < x < π/2, given y = 2 when x = 0.

1. I = e^{∫tan x dx} = e^{ln sec x} = sec x.
2. y sec x = ∫cos x dx = sin x + c.
3. x = 0: 2 = c. y = cos x(sin x + 2).

Solve dy/dx − 3y = eˣ, given y = 1 when x = 0.

1. I = e^{−3x}. ye^{−3x} = ∫e^{−2x} dx = −½e^{−2x} + c.
2. x = 0: 1 = −½ + c, c = 3/2.
3. y = −½eˣ + (3/2)e^{3x}.

Find the general solution of x dy/dx − y = x³ for x > 0.

1. Standard form: dy/dx − y/x = x². I = e^{−ln x} = 1/x.
2. y/x = ∫x dx = x²/2 + c. y = x³/2 + cx.

### Common mistakes

- Using the integrating factor without first dividing by the coefficient of dy/dx.
- Forgetting the constant, or adding it after dividing by I (it must be divided by I too).
- e^{−ln x} = −x (it is 1/x).

## I3 Modelling with first order equations

*Refs: AQA I3, OT3.1 to OT3.5 · Edexcel CP9.3 · OCR 4.10b · MEI Pp19, Pp20, Pp21, Pp22. Level: A-level only.*

### What you need to know

- Form an equation from a description: rates of change, proportionality, inflow minus outflow, Newton's second law with a resistance.
- Solve, interpret in context, and comment on the model's limits and possible refinements.

### Explained

Typical set-ups:

- **Mixing.** Amount of salt S in a tank: dS/dt = (rate in) − (rate out), where rate out = concentration × outflow rate = (S/V) × outflow, and V may change with t.
- **Motion with resistance.** m dv/dt = force − kv. Read "the rate of change of velocity" as dv/dt (MEI Pp21).
- **Newton's law of cooling, growth and decay.** Rate proportional to a difference.

Always state what each variable means and its units. When interpreting, look at what happens as t → ∞ and check whether the answer is realistic. Refine a model by dropping an assumption (for example, that the resistance is proportional to v rather than v²).

### Worked example

A tank holds 100 litres of pure water. Brine containing 2 g of salt per litre flows in at 1 litre per minute, and the well-mixed solution flows out at 1 litre per minute, so the volume stays 100 litres. Find the mass of salt S(t) grams.

1. dS/dt = 2 × 1 − (S/100) × 1 = 2 − S/100.
2. I = e^{t/100}. Se^{t/100} = ∫2e^{t/100} dt = 200e^{t/100} + c.
3. t = 0, S = 0: c = −200. S = 200(1 − e^{−t/100}).
4. As t → ∞, S → 200 g: the concentration tends to 2 g per litre, the inflow concentration.

In a second tank, brine at 2 g per litre flows in at 3 litres per minute and the mixture flows out at 2 litres per minute. The tank starts with 100 litres of pure water. Find S(t).

1. Volume V = 100 + t. dS/dt = 6 − 2S/(100 + t).
2. I = (100 + t)². d/dt[S(100 + t)²] = 6(100 + t)².
3. S(100 + t)² = 2(100 + t)³ + c. t = 0: c = −2 × 10⁶.
4. S = 2(100 + t) − 2 × 10⁶/(100 + t)².
5. The model fails once the tank is full; its capacity limits t.

A particle of mass 2 kg starts from rest. At time t s the resultant force on it is 2 − 2v/(t + 2) newtons, where v m s⁻¹ is its velocity. Find v.

1. Newton's second law: 2 dv/dt = 2 − 2v/(t + 2), so dv/dt + v/(t + 2) = 1.

2. I = t + 2. v(t + 2) = ∫(t + 2) dt = t²/2 + 2t + c, and v = 0 at t = 0 gives c = 0.
3. v = t(t + 4)/[2(t + 2)].

### Common mistakes

- Writing the outflow concentration as S instead of S/V.
- Forgetting that V changes when inflow and outflow rates differ.
- Giving no interpretation or limitation when asked.

## Equations reducible by a substitution

*Refs: Edexcel FP1 3.2. Level: A-level only (option content).*

### What you need to know

- Use a given substitution to turn an equation into a separable or integrating-factor equation, solve, then substitute back.
- Common examples: y = vx for dy/dx = f(y/x); z = y^{1−n} for dy/dx + Py = Qyⁿ.

### Explained

If y = vx, then dy/dx = v + x dv/dx (product rule). Replace every y and dy/dx, simplify to an equation in v and x, solve, and finally put v = y/x.

### Worked example

Use y = vx to solve x y dy/dx = x² + y² for x > 0.

1. dy/dx = (x² + y²)/(xy) = 1/v + v.
2. v + x dv/dx = 1/v + v, so x dv/dx = 1/v.
3. Separate: ∫v dv = ∫1/x dx, v²/2 = ln x + c.
4. y² = x²(2 ln x + A).

Use z = 1/y to solve dy/dx + y = xy².

1. y = 1/z, dy/dx = −(1/z²) dz/dx.
2. −(1/z²) dz/dx + 1/z = x/z², so dz/dx − z = −x.
3. I = e^{−x}: ze^{−x} = ∫−xe^{−x} dx = xe^{−x} + e^{−x} + c.
4. z = x + 1 + ceˣ, y = 1/(x + 1 + ceˣ).

### Common mistakes

- Forgetting the product rule when differentiating y = vx.
- Not substituting back to y at the end.

## Check questions

1. Find the general solution of dy/dx + 3y = e^{2x}. [4 marks]
2. Solve (x + 1) dy/dx + y = 2x for x > −1, given y = 3 when x = 0. [5 marks]
3. Solve cos x dy/dx + y sin x = 1 for 0 ≤ x < π/2, given y = 2 when x = 0. [6 marks]
4. A tank contains 50 litres of water with 100 g of dissolved salt. Pure water flows in at 2 litres per minute and the mixture flows out at 2 litres per minute. (a) Form and solve a differential equation for the salt S g after t minutes. (b) Find when the salt has halved. (c) Give one limitation of the model. [8 marks]
5. A boat of mass 500 kg is moving at 10 m s⁻¹ when its engine stops. The water resistance is 50v N. Find v in terms of t and the distance travelled before v = 1 m s⁻¹. [7 marks]
6. (Edexcel FP1) Use the substitution y = vx to show that the equation x dy/dx = y − x becomes x dv/dx = −1. Hence solve it, given y = 2 when x = 1. [5 marks]

## Mark scheme

1. I = e^{3x} (1). ye^{3x} = ∫e^{5x} dx = e^{5x}/5 + c (2). y = e^{2x}/5 + ce^{−3x} (1).
2. Left side is d/dx[(x + 1)y] (1). (x + 1)y = x² + c (2). c = 3 (1). y = (x² + 3)/(x + 1) (1).
3. dy/dx + y tan x = sec x (1). I = sec x (1). y sec x = ∫sec²x dx = tan x + c (2). c = 2 (1). y = sin x + 2 cos x (1).
4. (a) dS/dt = −2S/50 = −S/25 (2). S = 100e^{−t/25} (2). (b) 50 = 100e^{−t/25}, t = 25 ln 2 = 17.3 minutes (2). (c) E.g. mixing is not instant (1); the flow rates may not stay constant (1).
5. 500 dv/dt = −50v (1), dv/dt = −v/10 (1), v = 10e^{−t/10} (1). v = 1 at t = 10 ln 10 (1). Distance ∫₀^{10 ln 10} 10e^{−t/10} dt (1) = 100(1 − 1/10) (1) = 90 m (1).
6. v + x dv/dx = v − 1 (2), so x dv/dx = −1 (1). v = −ln x + c, y = x(c − ln x) (1). c = 2: y = x(2 − ln x) (1).
