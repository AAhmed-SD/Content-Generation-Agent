---
level: A-level
subject: Mathematics
topic: "Trigonometry: identities, reciprocal and inverse functions, equations and proof"
as_content: "tan = sin/cos, sin² + cos² = 1 and solving trigonometric equations in degrees are AS. Reciprocal and inverse functions, the other Pythagorean identities, compound and double angle formulae, R-form, proofs and trigonometry in context are A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["E4", "E5", "E6", "E7", "E8", "E9"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P5.4", "P5.5", "P5.6", "P5.7", "P5.8", "P5.9"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.05h", "1.05i", "1.05j", "1.05k", "1.05l", "1.05m", "1.05n", "1.05o", "1.05p", "1.05q"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Mt5", "Mt6", "Mt7", "Mt9", "Mt13", "Mt14", "Mt15", "Mt16", "Mt17", "Mt18", "Mt19", "Mt20", "Mt21"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Trigonometry: identities, reciprocal and inverse functions, equations and proof

This file covers sec, cosec and cot, the inverse functions arcsin, arccos and arctan, the Pythagorean identities, compound and double angle formulae, writing a cos θ + b sin θ as a single function, solving equations, proving identities and using trigonometry in context.

## Overview

AS: tan θ = sin θ / cos θ, sin²θ + cos²θ = 1, and solving equations in a given interval (including quadratics in sin, cos or tan and multiples of the angle). A-level only: everything else in this file, and all work in radians.

### Board differences

- AQA E4 to E9; Edexcel 5.4 to 5.9.
- OCR H240: 1.05j and 1.05o (AS); 1.05h, 1.05i, 1.05k, 1.05l, 1.05m, 1.05n, 1.05p, 1.05q (A-level only). OCR asks you to understand the geometrical proofs of the compound angle formulae (1.05m).
- OCR MEI H640: Mt5 to Mt7 (AS); Mt9 and Mt13 to Mt21 (A-level only).
- Edexcel's differentiation topic 7.4 also asks for the derivatives of sec x, cosec x and cot x; see file 13.

## E4 Reciprocal and inverse trigonometric functions

*Refs: AQA E4 · Edexcel 5.4 · OCR 1.05h, 1.05i · MEI Mt9, Mt13, Mt14. Level: A-level only.*

### What you need to know

- (A-level only) Definitions:

```latex
\sec\theta = \frac{1}{\cos\theta} \qquad \operatorname{cosec}\theta = \frac{1}{\sin\theta} \qquad \cot\theta = \frac{1}{\tan\theta} = \frac{\cos\theta}{\sin\theta}
```

- (A-level only) Their graphs, domains and ranges.
- (A-level only) arcsin, arccos and arctan as inverse functions on restricted domains:

| Function | Domain | Range |
| --- | --- | --- |
| arcsin x | −1 ≤ x ≤ 1 | −π/2 ≤ y ≤ π/2 |
| arccos x | −1 ≤ x ≤ 1 | 0 ≤ y ≤ π |
| arctan x | all real x | −π/2 < y < π/2 |

### Explained

**Graphs.** sec θ has vertical asymptotes wherever cos θ = 0 (θ = 90°, 270°, ...), and |sec θ| ≥ 1, so it never takes values between −1 and 1. Its graph is U shapes above y = 1 where cos is positive and ∩ shapes below y = −1 where cos is negative. cosec θ is the same shape moved 90° along. cot θ has asymptotes where sin θ = 0 and is decreasing on each branch.

**Inverses.** sin is many-one, so it has no inverse on all real numbers. Restricting it to −π/2 ≤ x ≤ π/2 makes it one-one, and the inverse of that piece is arcsin. Each inverse graph is the reflection of the restricted graph in y = x. Your calculator's sin⁻¹ gives the arcsin value: the principal value only.

### Worked example

(A-level only) Solve sec x = 2 for 0 ≤ x ≤ 2π.

1. cos x = 1/2.
2. x = π/3 or x = 2π − π/3 = 5π/3.

(A-level only) Find the exact values of cosec(π/6), cot(π/3) and arcsin(−1/2).

1. cosec(π/6) = 1/sin(π/6) = 2.
2. cot(π/3) = 1/√3 = √3/3.
3. arcsin(−1/2) = −π/6.

(A-level only) Find the exact value of cos(arcsin(3/5)).

1. Let θ = arcsin(3/5), so sin θ = 3/5 and θ is acute.
2. A 3-4-5 triangle gives cos θ = 4/5.

### Common mistakes

- (A-level only) Writing sec θ as 1/sin θ.
- (A-level only) Writing sin⁻¹x as 1/sin x. sin⁻¹x is arcsin x; 1/sin x is cosec x.
- (A-level only) Giving an arccos value outside 0 to π.

## E5 Pythagorean and quotient identities

*Refs: AQA E5 · Edexcel 5.5 · OCR 1.05j, 1.05k · MEI Mt5, Mt6, Mt15. Level: AS & A (part A-level only).*

### What you need to know

```latex
\tan\theta \equiv \frac{\sin\theta}{\cos\theta} \qquad \sin^2\theta + \cos^2\theta \equiv 1
```

- (A-level only)

```latex
\sec^2\theta \equiv 1 + \tan^2\theta \qquad \operatorname{cosec}^2\theta \equiv 1 + \cot^2\theta
```

### Explained

sin²θ + cos²θ = 1 is Pythagoras on the unit circle. Dividing it by cos²θ gives the sec identity; dividing by sin²θ gives the cosec identity.

Use these identities to turn an equation with mixed functions into one function, usually a quadratic.

### Worked example

Solve sin x = 3 cos x for 0° ≤ x ≤ 360°.

1. Divide by cos x: tan x = 3.
2. x = 71.6° or 71.6° + 180° = 251.6°.

Solve 2 sin²x + cos x = 1 for 0° ≤ x ≤ 360°.

1. 2(1 − cos²x) + cos x − 1 = 0, so 2cos²x − cos x − 1 = 0.
2. (2cos x + 1)(cos x − 1) = 0.
3. cos x = 1: x = 0°, 360°. cos x = −1/2: x = 120°, 240°.

(A-level only) Solve sec²x = 3 + tan x for 0° ≤ x ≤ 360°.

1. 1 + tan²x = 3 + tan x, so tan²x − tan x − 2 = 0, (tan x − 2)(tan x + 1) = 0.
2. tan x = 2: x = 63.4°, 243.4°. tan x = −1: x = 135°, 315°.

### Common mistakes

- Dividing both sides by cos x and losing the solutions where cos x = 0. (In sin x = 3 cos x this is safe because cos x = 0 would force sin x = 0 too, which is impossible.)
- Writing sin²x as sin x².

## E6 Compound angle, double angle and R-form

*Refs: AQA E6 · Edexcel 5.6 · OCR 1.05l, 1.05m, 1.05n · MEI Mt16, Mt17, Mt18. Level: A-level only.*

### What you need to know

- (A-level only) Compound angle formulae:

```latex
\sin(A \pm B) \equiv \sin A\cos B \pm \cos A\sin B
```

```latex
\cos(A \pm B) \equiv \cos A\cos B \mp \sin A\sin B
```

```latex
\tan(A \pm B) \equiv \frac{\tan A \pm \tan B}{1 \mp \tan A\tan B}
```

- (A-level only) Double angle formulae:

```latex
\sin 2A \equiv 2\sin A\cos A \qquad \cos 2A \equiv \cos^2 A - \sin^2 A \equiv 2\cos^2 A - 1 \equiv 1 - 2\sin^2 A
```

```latex
\tan 2A \equiv \frac{2\tan A}{1 - \tan^2 A}
```

- (A-level only) Understand a geometrical proof of the compound angle formulae.
- (A-level only) Write a cos θ + b sin θ as R cos(θ ± α) or R sin(θ ± α), with R > 0.

### Explained

**A geometrical proof of sin(A + B)** (for acute A and B with A + B < 90°).

1. Let O be the origin and P the point at distance 1 from O, on the line at angle A + B above the horizontal. The height of P is sin(A + B).
2. Draw the line from O at angle B above the horizontal, and let Q be the foot of the perpendicular from P to this line. Angle POQ is A, so OQ = cos A and PQ = sin A.
3. The height of Q is OQ sin B = cos A sin B.
4. PQ is perpendicular to OQ, so PQ makes angle B with the vertical. The rise from Q to P is PQ cos B = sin A cos B.
5. Adding the two heights: sin(A + B) = sin A cos B + cos A sin B.

The horizontal distances in the same diagram give cos(A + B) = cos A cos B − sin A sin B. Replacing B by −B gives the "minus" versions, and dividing sin by cos gives the tan formula.

**Double angles.** Put B = A in the compound angle formulae. The three forms of cos 2A come from sin²A + cos²A = 1. Rearranged, they let you write cos²A and sin²A in terms of cos 2A, which is used in integration (file 15):

```latex
\cos^2 A = \tfrac{1}{2}(1 + \cos 2A) \qquad \sin^2 A = \tfrac{1}{2}(1 - \cos 2A)
```

**R-form.** To write a sin θ + b cos θ = R sin(θ + α):

1. Expand: R sin θ cos α + R cos θ sin α.
2. Match: R cos α = a and R sin α = b.
3. R = √(a² + b²) and tan α = b/a.

The maximum value is R and the minimum is −R. This turns equations such as 3 sin x + 4 cos x = 2 into ones with a single trig function.

### Worked example

(A-level only) Find the exact value of cos 75°.

1. cos(45° + 30°) = cos 45° cos 30° − sin 45° sin 30°.
2. = (√2/2)(√3/2) − (√2/2)(1/2) = (√6 − √2)/4.

(A-level only) A and B are acute with sin A = 3/5 and cos B = 5/13. Find the exact value of sin(A + B).

1. cos A = 4/5 and sin B = 12/13.
2. sin(A + B) = (3/5)(5/13) + (4/5)(12/13) = 15/65 + 48/65 = 63/65.

(A-level only) Write 3 sin x + 4 cos x in the form R sin(x + α), 0° < α < 90°. Hence find its maximum value, the value of x where it occurs, and solve 3 sin x + 4 cos x = 2 for 0° ≤ x ≤ 360°.

1. R cos α = 3, R sin α = 4. R = 5. tan α = 4/3, α = 53.13°.
2. 3 sin x + 4 cos x = 5 sin(x + 53.13°). Maximum 5 when x + 53.13° = 90°, x = 36.87°.
3. sin(x + 53.13°) = 0.4. The angle x + 53.13° lies between 53.13° and 413.13°.
4. sin⁻¹0.4 = 23.58°, so x + 53.13° = 156.42° or 383.58°.
5. x = 103.3° or 330.4° (1 d.p.).

(A-level only) Write cos x − √3 sin x in the form R cos(x + α), 0 < α < π/2.

1. R cos α = 1, R sin α = √3. R = 2, tan α = √3, α = π/3.
2. cos x − √3 sin x = 2cos(x + π/3).

### Common mistakes

- (A-level only) Getting the sign in cos(A + B) wrong. It is minus.
- (A-level only) Using tan α = a/b instead of b/a. Write out the matching step every time.
- (A-level only) Forgetting to shift the interval when solving sin(x + α) = k.

## E7 Solving trigonometric equations

*Refs: AQA E7 · Edexcel 5.7 · OCR 1.05o · MEI Mt7, Mt19. Level: AS & A (part A-level only).*

### What you need to know

- Solve equations such as sin x = k, quadratic equations in sin, cos or tan, and equations with multiples of the angle, in a given interval.
- (A-level only) Use the identities in this file, and work in radians.

### Explained

Method for sin(kx + c) = value in a given interval:

1. Work out the new interval for kx + c.
2. Find the principal value with the calculator.
3. Use the symmetry of the graph to find the other value in one period: for sin, 180° − θ; for cos, 360° − θ; for tan, θ + 180°.
4. Add or subtract the period to get every value in the new interval.
5. Undo: subtract c, divide by k.

Never divide both sides by a trig function that could be zero; factorise instead.

### Worked example

Solve sin 2x = 0.5 for 0° ≤ x ≤ 360°.

1. 0° ≤ 2x ≤ 720°.
2. 2x = 30°, 150°, 390°, 510°.
3. x = 15°, 75°, 195°, 255°.

Solve tan(x − 20°) = √3 for 0° ≤ x ≤ 360°.

1. −20° ≤ x − 20° ≤ 340°.
2. x − 20° = 60° or 240°.
3. x = 80° or 260°.

(A-level only) Solve sin 2x = cos x for 0° ≤ x ≤ 360°.

1. 2 sin x cos x − cos x = 0, so cos x(2 sin x − 1) = 0.
2. cos x = 0: x = 90°, 270°. sin x = 1/2: x = 30°, 150°.

(A-level only) Solve cos 2θ + 3 cos θ + 2 = 0 for 0 ≤ θ ≤ 2π.

1. 2cos²θ − 1 + 3cos θ + 2 = 0, so 2cos²θ + 3cos θ + 1 = 0.
2. (2cos θ + 1)(cos θ + 1) = 0.
3. cos θ = −1/2: θ = 2π/3, 4π/3. cos θ = −1: θ = π.

### Common mistakes

- Not extending the interval for multiple angles, so missing solutions.
- Dividing by cos x in sin 2x = cos x and losing x = 90°, 270°.

## E8 Proving trigonometric identities

*Refs: AQA E8 · Edexcel 5.8 · OCR 1.05p · MEI Mt20. Level: A-level only.*

### What you need to know

- (A-level only) Prove identities using the definitions and identities in this file.

### Explained

Start from one side (usually the more complicated) and transform it into the other. Do not work on both sides at once, and do not start from the result you are trying to prove. Useful moves: write everything in sin and cos; use a common denominator; replace sin²θ + cos²θ by 1; expand double angles.

### Worked example

(A-level only) Prove that (1 − cos 2x)/sin 2x ≡ tan x.

1. LHS = (1 − (1 − 2sin²x))/(2 sin x cos x).
2. = 2sin²x/(2 sin x cos x) = sin x/cos x = tan x = RHS.

(A-level only) Prove that cot x + tan x ≡ 2 cosec 2x.

1. LHS = cos x/sin x + sin x/cos x = (cos²x + sin²x)/(sin x cos x).
2. = 1/(sin x cos x) = 2/(2 sin x cos x) = 2/sin 2x = 2 cosec 2x = RHS.

(A-level only) Prove that sec x − cos x ≡ sin x tan x.

1. LHS = 1/cos x − cos x = (1 − cos²x)/cos x = sin²x/cos x.
2. = sin x × (sin x/cos x) = sin x tan x = RHS.

(A-level only) Prove that cos 3x ≡ 4cos³x − 3cos x.

1. cos 3x = cos(2x + x) = cos 2x cos x − sin 2x sin x.
2. = (2cos²x − 1)cos x − 2sin²x cos x.
3. = 2cos³x − cos x − 2(1 − cos²x)cos x = 4cos³x − 3cos x.

### Common mistakes

- (A-level only) Writing "LHS = RHS" at the start and then manipulating both sides.
- (A-level only) Choosing the wrong form of cos 2x. Pick the form that cancels with the rest.

## E9 Trigonometry in context

*Refs: AQA E9 · Edexcel 5.9 · OCR 1.05q · MEI Mt21. Level: A-level only.*

### What you need to know

- (A-level only) Use trigonometric functions to model periodic situations (tides, temperatures, rotating wheels) and in vectors, kinematics and forces.

### Explained

A model y = A + B sin(kt) oscillates about A with amplitude B and period 2π/k (or 360°/k in degrees). R-form helps find the greatest and least values and when they happen. In mechanics, resolving forces and velocities uses sin and cos (files 26 and 27).

### Worked example

(A-level only) The depth of water in a harbour is d = 5 + 2.5cos(πt/6) metres, t hours after midnight. Find the least depth and the times in the first 12 hours when the depth is at least 6 m.

1. Least depth 5 − 2.5 = 2.5 m, when πt/6 = π, at t = 6 (6 a.m.).
2. cos(πt/6) ≥ 0.4, with 0 ≤ πt/6 ≤ 2π.
3. πt/6 ≤ 1.159 or πt/6 ≥ 2π − 1.159.
4. t ≤ 2.21 or t ≥ 9.79. So from midnight to about 2:13 a.m., and from about 9:47 a.m. to noon.

(A-level only) The temperature in a room is modelled by T = 15 + 3 sin(πt/12) + 4 cos(πt/12) °C, t hours after 6 a.m. Find the maximum temperature and when it first occurs.

1. 3 sin θ + 4 cos θ = 5 sin(θ + 0.9273).
2. Maximum T = 20 °C, when πt/12 + 0.9273 = π/2.
3. t = 2.46 hours, about 8:28 a.m.

### Common mistakes

- (A-level only) Mixing degrees and radians in a model.
- (A-level only) Giving t as a decimal of hours when the question asks for a time of day.

## Check questions

1. Solve 2cos²x = 1 + sin x for 0° ≤ x ≤ 360°. [5 marks]
2. Solve tan 2x = 1 for 0° ≤ x ≤ 180°. [3 marks]
3. (A-level only) Find the exact value of sin 15°. [3 marks]
4. (A-level only) Prove that sin 2x/(1 + cos 2x) ≡ tan x. [3 marks]
5. (A-level only) (a) Write 5cos x − 12 sin x in the form R cos(x + α), 0° < α < 90°. (b) Solve 5cos x − 12 sin x = 6.5 for 0° ≤ x ≤ 360°. (c) Find the greatest value of 1/(20 − 5cos x + 12 sin x). [8 marks]
6. (A-level only) Solve 3sec²θ − 5 tan θ − 5 = 0 for 0 ≤ θ < 2π, giving answers to 3 decimal places. [5 marks]
7. (A-level only) (a) State the range of arccos x. (b) Find the exact value of cos(arcsin(5/13)). [3 marks]
8. (A-level only) The depth of water at a jetty is d = 6 + 3 sin(πt/6) metres, t hours after noon. Find the times in the first 12 hours when the depth is more than 7.5 m. [4 marks]

## Mark scheme

1. 2(1 − sin²x) = 1 + sin x (1); 2sin²x + sin x − 1 = 0 (1); (2 sin x − 1)(sin x + 1) = 0 (1); x = 30°, 150° (1); x = 270° (1).
2. 0° ≤ 2x ≤ 360° (1); 2x = 45°, 225° (1); x = 22.5°, 112.5° (1).
3. sin(45° − 30°) = sin 45° cos 30° − cos 45° sin 30° (1); (√2/2)(√3/2) − (√2/2)(1/2) (1); (√6 − √2)/4 (1).
4. sin 2x = 2 sin x cos x and 1 + cos 2x = 2cos²x (1); ratio = 2 sin x cos x / 2cos²x (1); = tan x (1).
5. (a) R = 13 (1); tan α = 12/5, α = 67.38° (1). (b) cos(x + 67.38°) = 0.5 (1); x + 67.38° = 300° or 420° (1); x = 232.6° or 352.6° (2). (c) Least denominator 20 − 13 = 7 (1); greatest value 1/7 (1).
6. 3(1 + tan²θ) − 5 tan θ − 5 = 0, so 3tan²θ − 5 tan θ − 2 = 0 (1); (3 tan θ + 1)(tan θ − 2) = 0 (1); tan θ = 2: θ = 1.107, 4.249 (1); tan θ = −1/3: θ = 2.820, 5.961 (2).
7. (a) 0 ≤ arccos x ≤ π (1). (b) sin θ = 5/13 with θ acute (1); cos θ = 12/13 (1).
8. sin(πt/6) > 0.5 (1); π/6 < πt/6 < 5π/6 (1); 1 < t < 5 (1); between 1 p.m. and 5 p.m. (1).
