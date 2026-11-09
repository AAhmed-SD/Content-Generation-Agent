---
level: A-level
subject: Further Mathematics
topic: "Variable forces, vector kinematics and simple harmonic motion"
as_content: "All of this file is A-level only option content: Edexcel FM2 4 and 5, OCR 6.06 (Stage 2) and MEI Mechanics Major section (b)."
boards:
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FM2 4.1", "FM2 4.2", "FM2 5.1"]
  - board: OCR
    code: "H245"
    spec_refs: ["6.06a"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Mk1", "Mk2", "Mv1", "Mv2", "Mv3", "Mv4", "Mv5", "Mv6", "Mv7", "Mv8", "Mv9", "Mv10", "Mv11", "Mv12"]
refs_checked: false
spec_urls:
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-mechanics/
---

# Variable forces, vector kinematics and simple harmonic motion

This file covers motion in a straight line under a force that depends on time, displacement or velocity (using a = dv/dt and a = v dv/dx), vector kinematics with calculus, the Cartesian path and range of a projectile (including on an inclined plane), and simple harmonic motion as a mechanics model.

## Overview

Kinematics with calculus and projectiles are in A-level Maths ([../maths/25-kinematics.md](../maths/25-kinematics.md), [../maths/26-projectiles.md](../maths/26-projectiles.md)). Solving the differential equations is in [16-differential-equations-first-order.md](16-differential-equations-first-order.md) and [17-differential-equations-second-order-and-oscillations.md](17-differential-equations-second-order-and-oscillations.md); Hooke's law in [44-elastic-strings-and-springs.md](44-elastic-strings-and-springs.md). Take g = 9.8 m s⁻².

### Board differences

- Edexcel FM2 4.1 (Newton's laws with variable forces), 4.2 (simple harmonic motion, including proof that motion is SHM and the use of x = a sin ωt, v² = ω²(a² − x²)), 5.1 (kinematics with variable acceleration).
- OCR 6.06a: linear motion under a variable force in one dimension, using a = dv/dt or a = v dv/dx.
- MEI Mk1, Mk2, Mv1 to Mv12: vector kinematics, projectile paths and ranges (including maximum range), variable forces, and SHM.
- AQA's SHM and damping are in its compulsory core (I7 to I11, file 17).

## Forces depending on time, displacement or velocity

*Refs: Edexcel FM2 4.1, 5.1 · OCR 6.06a · MEI Mk1, Mk2, Mv8, Mv9, Mv10, Mv11. Level: A-level only.*

### What you need to know

- F = ma with a = dv/dt (when F depends on t or v) or a = v dv/dx (when F depends on x, or when you want v in terms of x).
- Separate variables and use the initial conditions.

### Explained

Choose the form of a to match what the force depends on and what the question asks for. If the force depends on v and you want a distance, use v dv/dx so that dx appears.

### Worked example

A particle of mass 2 kg moves along the x-axis under a force 6x N (directed away from O). It starts from rest at x = 1. Find its speed at x = 3.

1. 2v dv/dx = 6x, so ∫v dv = ∫3x dx, v²/2 = 3x²/2 + c.
2. v = 0 at x = 1: c = −3/2. v² = 3(x² − 1).
3. At x = 3: v² = 24, v = 4.90 m s⁻¹.

A 0.5 kg particle moving at 10 m s⁻¹ is slowed by a resistance 2v N. Find v in terms of t, and the total distance it travels.

1. 0.5 dv/dt = −2v, so v = 10e^{−4t}.
2. 0.5v dv/dx = −2v, dv/dx = −4, v = 10 − 4x.
3. v → 0 as x → 2.5, so the total distance is 2.5 m (never quite reached in finite time).

### Common mistakes

- Using constant-acceleration formulae when the force varies.

## Vector kinematics and projectile paths

*Refs: MEI Mv1, Mv2, Mv3, Mv4, Mv5, Mv6, Mv7. Level: A-level only.*

### What you need to know

- v = dr/dt, a = dv/dt; integrate the other way with initial conditions.
- Projectile from the origin at speed u, angle θ: eliminate t to get the path

```latex
y = x\tan\theta - \frac{gx^2}{2u^2\cos^2\theta} = x\tan\theta - \frac{gx^2}{2u^2}(1 + \tan^2\theta)
```

- Range on horizontal ground u² sin 2θ/g, greatest (u²/g) at θ = 45°.
- On a plane inclined at α, use axes along and perpendicular to the plane, or intersect the path with y = x tan α.

### Worked example

r = t³ i + (4t − t²) j. Find the velocity and acceleration at t = 2.

1. v = 3t² i + (4 − 2t) j = 12i at t = 2.
2. a = 6t i − 2j = 12i − 2j.

A ball is projected at 20 m s⁻¹ at 45° to the horizontal up a plane inclined at 15°. Find the range up the plane.

1. Path: y = x − 9.8x²/400 (since 2u²cos²45° = 400).
2. Plane: y = x tan 15° = 0.2679x. Intersect: x − 0.0245x² = 0.2679x, x = 29.88 m.
3. Range along the plane = 29.88/cos 15° = 30.9 m.

A target at (40, 10) is to be hit with speed 25 m s⁻¹. Find the possible angles of projection.

1. 10 = 40T − 9.8 × 1600(1 + T²)/1250, with T = tan θ: 12.544T² − 40T + 22.544 = 0.
2. T = 2.457 or 0.731, θ = 67.9° or 36.2°.

### Common mistakes

- Forgetting cos²θ = 1/(1 + tan²θ) when solving for the angle.

## Simple harmonic motion

*Refs: Edexcel FM2 4.2 · MEI Mv12. Level: A-level only.*

### What you need to know

- SHM: ẍ = −ω²x, x measured from the centre of oscillation.
- x = a sin(ωt + ε) (or a cos ωt from an extreme point); v² = ω²(a² − x²); maximum speed aω at the centre; maximum acceleration aω² at the extremes; period 2π/ω.
- To prove motion is SHM, use Newton's second law with x from the equilibrium position and show ẍ = −ω²x.

### Worked example

A particle moves with SHM of amplitude 0.2 m and period π s. Find its speed when 0.1 m from the centre.

1. ω = 2. v² = 4(0.04 − 0.01) = 0.12, v = 0.346 m s⁻¹.

A particle of mass m hangs on an elastic string (natural length l, modulus λ). Show that small vertical oscillations are SHM and find the period.

1. Equilibrium extension e: mg = λe/l.
2. At x below equilibrium (string taut): mẍ = mg − λ(e + x)/l = −λx/l.
3. ẍ = −(λ/ml)x: SHM with period 2π√(ml/λ).

Find the time for the particle in the first example to move from the centre to 0.1 m.

1. x = 0.2 sin 2t. 0.1 = 0.2 sin 2t, t = π/12 = 0.262 s.

### Common mistakes

- Measuring x from the natural length rather than from equilibrium.

## Check questions

1. A particle of mass 3 kg moves along a line under a force (12 − 6t) N. At t = 0, v = 2 m s⁻¹. Find v at t = 3 and the greatest speed. [5 marks]
2. A particle of mass 1 kg moves away from O under a repulsive force 4/x² N. It starts from rest at x = 1. Find its speed at x = 4 and its limiting speed. [5 marks]
3. A projectile is fired from the origin at speed 30 m s⁻¹ at angle θ. Show that the greatest range on level ground is about 91.8 m. [3 marks]
4. A particle performs SHM with maximum speed 3 m s⁻¹ and maximum acceleration 12 m s⁻². Find the amplitude and period. [4 marks]
5. (MEI) r = 2cos t i + 3 sin t j. Show that the acceleration is always directed towards O, and find the Cartesian equation of the path. [4 marks]

## Mark scheme

1. 3 dv/dt = 12 − 6t, v = 2 + 4t − t² (2). t = 3: v = 5 m s⁻¹ (1). Greatest when 4 − 2t = 0, t = 2, v = 6 m s⁻¹ (2).
2. v dv/dx = 4/x² (1). v²/2 = −4/x + c, c = 4 (1). v² = 8(1 − 1/x) (1). x = 4: v = √6 = 2.45 m s⁻¹ (1). Limiting speed √8 = 2.83 m s⁻¹ (1).
3. Range u² sin 2θ/g (1), greatest when sin 2θ = 1 (1): 900/9.8 = 91.8 m (1).
4. aω = 3, aω² = 12, ω = 4 (2). a = 0.75 m (1). Period π/2 s (1).
5. a = −2cos t i − 3 sin t j = −r (2), so towards O. x²/4 + y²/9 = 1 (2).
