---
level: A-level
subject: Mathematics
topic: "Differential equations"
as_content: "All of this file is A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["G6", "H7", "H8"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P7.6", "P8.7", "P8.8"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.07t", "1.08k", "1.08l"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Mc31", "Mc32", "Mc33"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Differential equations

This file covers writing a differential equation from a description, solving first order differential equations with separable variables, finding particular solutions, and interpreting solutions in context.

## Overview

All A-level only. It draws on differentiation (files 12 and 13) and integration (files 14 and 15), including partial fractions.

### Board differences

- AQA G6, H7, H8; Edexcel 7.6, 8.7, 8.8; OCR H240 1.07t, 1.08k, 1.08l; OCR MEI H640 Mc31 to Mc33.
- AQA's guidance notes that separating the variables may need factorising out a common factor, and that H8 includes links to kinematics.

## G6 Constructing differential equations

*Refs: AQA G6 · Edexcel 7.6 · OCR 1.07t · MEI Mc31. Level: A-level only.*

### What you need to know

- (A-level only) Turn a description of a rate of change into a differential equation, in pure mathematics and in contexts such as kinematics, population growth, and price and demand.

### Explained

"Rate of change of y" means dy/dt (or dy/dx). "Proportional to" introduces a constant k. "Decreasing" usually gives a minus sign with k > 0. Read each phrase in turn:

| Description | Equation |
| --- | --- |
| P grows at a rate proportional to P | dP/dt = kP |
| T decreases at a rate proportional to the difference between T and 20 | dT/dt = −k(T − 20) |
| V increases at 20 per second but leaks at a rate proportional to V | dV/dt = 20 − kV |
| the gradient of a curve at (x, y) is the product of x and y | dy/dx = xy |

When the rate is given in terms of a different variable, use the chain rule (file 13). For example, if the volume of a sphere decreases at a rate proportional to its surface area, dV/dt = −k(4πr²), and since dV/dt = 4πr²(dr/dt), this gives dr/dt = −k: the radius shrinks at a constant rate.

### Worked example

(A-level only) Demand D for a product falls as the price p rises. The rate of change of D with respect to p is proportional to D and inversely proportional to p. Write a differential equation.

1. dD/dp = −kD/p, where k > 0 (minus because demand falls).

(A-level only) A raindrop's mass m grows at a rate proportional to its surface area. Taking the drop as a sphere of constant density, show that dr/dt is constant.

1. m = ρ(4/3)πr³, so dm/dt = 4πρr²(dr/dt).
2. dm/dt = k × 4πr², so 4πρr²(dr/dt) = 4πkr².
3. dr/dt = k/ρ, a constant.

### Common mistakes

- (A-level only) Missing the minus sign for a decreasing quantity.
- (A-level only) Writing dy/dx when the rate is with respect to time.

## H7 Solving separable differential equations

*Refs: AQA H7 · Edexcel 8.7 · OCR 1.08k · MEI Mc32. Level: A-level only.*

### What you need to know

- (A-level only) Solve first order equations of the form dy/dx = f(x)g(y) by separating the variables:

```latex
\int \frac{1}{g(y)}\,dy = \int f(x)\,dx
```

- (A-level only) The general solution has one arbitrary constant. A particular solution uses a given condition to find it.

### Explained

1. Move every y term (with dy) to one side and every x term (with dx) to the other. Factorise first if needed, for example dy/dx = xy + x = x(y + 1).
2. Integrate both sides. One constant is enough; put it on the x side.
3. Use the initial condition to find the constant.
4. If asked, rearrange to y = .... When you have ln|y| = f(x) + c, write y = Ae^{f(x)}, where A = ±eᶜ.

### Worked example

(A-level only) Solve dy/dx = 3x²y, given y = 2 when x = 0.

1. ∫(1/y) dy = ∫3x² dx, so ln|y| = x³ + c.
2. y = Ae^{x³}. x = 0, y = 2: A = 2.
3. y = 2e^{x³}.

(A-level only) Solve dy/dx = cos x / y, given y = 2 when x = 0.

1. ∫y dy = ∫cos x dx, so y²/2 = sin x + c.
2. x = 0, y = 2: 2 = c.
3. y² = 2 sin x + 4. Since y > 0 at the start, y = √(2 sin x + 4).

(A-level only) Find the general solution of dy/dx = e^{x−y}.

1. e^{x−y} = eˣe^{−y}, so ∫eʸ dy = ∫eˣ dx.
2. eʸ = eˣ + c, so y = ln(eˣ + c).

(A-level only) Solve dy/dx = y/[x(x + 1)] for x > 0, given y = 1 when x = 1.

1. ∫(1/y) dy = ∫ 1/[x(x + 1)] dx.
2. Partial fractions: 1/[x(x + 1)] = 1/x − 1/(x + 1).
3. ln|y| = ln x − ln(x + 1) + c, so y = Ax/(x + 1).
4. x = 1, y = 1: A = 2. y = 2x/(x + 1).

(A-level only) A population is modelled by dP/dt = 0.2P(1 − P/500), with P = 50 when t = 0. Find P in terms of t.

1. Separate: ∫ 500/[P(500 − P)] dP = ∫ 0.2 dt.
2. Partial fractions: 500/[P(500 − P)] = 1/P + 1/(500 − P).
3. ln P − ln(500 − P) = 0.2t + c, so ln[P/(500 − P)] = 0.2t + c.
4. t = 0: ln(50/450) = c = ln(1/9).
5. P/(500 − P) = (1/9)e^{0.2t}. Rearranging: P = 500/(1 + 9e^{−0.2t}).

### Common mistakes

- (A-level only) Integrating dy/dx = 3x²y as y = x³y + c, leaving y on both sides.
- (A-level only) Writing ln y = x³ + c as y = e^{x³} + c.
- (A-level only) Forgetting the sign when ∫1/(500 − P) dP = −ln|500 − P|.

## H8 Interpreting solutions

*Refs: AQA H8 · Edexcel 8.8 · OCR 1.08l · MEI Mc33. Level: A-level only.*

### What you need to know

- (A-level only) Interpret a solution in context: long-term behaviour, times to reach given values, and the meaning of constants.
- (A-level only) Identify limitations of the model, including in kinematics.

### Explained

Look at what happens as t → ∞: an exponential decay term tends to 0, so the solution approaches a limit. Check the model against any extra data and comment on the fit. Typical limitations: constants that are really variable (room temperature changes), quantities that must be whole numbers (populations), or effects left out (food supply, air resistance).

### Worked example

(A-level only) Tea at 90 °C cools in a room at 20 °C according to dT/dt = −k(T − 20). After 10 minutes it is 60 °C. Find T in terms of t, and the time for the tea to reach 30 °C.

1. ∫ 1/(T − 20) dT = ∫ −k dt, so ln(T − 20) = −kt + c.
2. T − 20 = Ae^{−kt}. t = 0: A = 70. T = 20 + 70e^{−kt}.
3. t = 10: 40 = 70e^{−10k}, so k = ln(7/4)/10 = 0.0560.
4. 30 = 20 + 70e^{−kt}: e^{−kt} = 1/7, t = ln 7/k = 34.8 minutes.
5. As t → ∞, T → 20 °C: the tea approaches room temperature.

(A-level only) For the population P = 500/(1 + 9e^{−0.2t}), describe the long-term behaviour and find when P = 250.

1. As t → ∞, e^{−0.2t} → 0, so P → 500. The population levels off at 500.
2. 250 = 500/(1 + 9e^{−0.2t}) gives 9e^{−0.2t} = 1, t = 5 ln 9 = 11.0.

(A-level only) A particle moves so that dv/dt = −0.5v (m s⁻²), starting with v = 8 m s⁻¹. Find v in terms of t, and comment on the model.

1. v = 8e^{−0.5t}.
2. The model says the particle never quite stops, which is unrealistic; friction would bring it to rest in a finite time.

### Common mistakes

- (A-level only) Giving a time without units, or to too many significant figures.
- (A-level only) Vague limitations. Say what the model ignores and how that affects the prediction.

## Check questions

1. (A-level only) Water flows into a tank at 20 cm³ s⁻¹ and leaks out at a rate proportional to the volume V in the tank. Write a differential equation for V. [2 marks]
2. (A-level only) Solve dy/dx = 6x√y, given y = 4 when x = 0. Give y in terms of x. [5 marks]
3. (A-level only) Find the general solution of (x + 1) dy/dx = y for x > −1, and the particular solution with y = 6 when x = 2. [5 marks]
4. (A-level only) Solve dy/dx = y tan x for −π/2 < x < π/2, given y = 3 when x = 0. [4 marks]
5. (A-level only) Solve dy/dx = y/[x(x + 1)] for x > 0, given y = 1 when x = 1. [6 marks]
6. (A-level only) The temperature θ °C of a liquid satisfies dθ/dt = −k(θ − 15), t in minutes. Initially θ = 85, and θ = 55 when t = 5. (a) Show that θ = 15 + 70e^{−kt} and find k. (b) Find when θ = 25. (c) State the long-term temperature and one limitation of the model. [9 marks]

## Mark scheme

1. dV/dt = 20 − kV (2: 1 for each term, with k > 0 stated).
2. ∫y^{−1/2} dy = ∫6x dx (1); 2y^{1/2} = 3x² + c (2); c = 4 (1); y = (3x² + 4)²/4 (1).
3. ∫(1/y) dy = ∫ 1/(x + 1) dx (1); ln|y| = ln(x + 1) + c (1); y = A(x + 1) (1); 6 = 3A (1); y = 2(x + 1) (1).
4. ∫(1/y) dy = ∫ tan x dx (1); ln|y| = ln|sec x| + c (1); y = A sec x (1); y = 3 sec x (1).
5. Separate (1); 1/x − 1/(x + 1) (1); ln|y| = ln x − ln(x + 1) + c (2); y = Ax/(x + 1) (1); y = 2x/(x + 1) (1).
6. (a) ∫1/(θ − 15) dθ = −∫k dt (1); ln(θ − 15) = −kt + c (1); θ − 15 = Ae^{−kt}, A = 70 (1); 40 = 70e^{−5k} (1); k = ln(1.75)/5 = 0.112 (1). (b) e^{−kt} = 1/7 (1); t = 17.4 minutes (1). (c) 15 °C (1); limitation, e.g. the surrounding temperature may not stay at 15 °C (1).
