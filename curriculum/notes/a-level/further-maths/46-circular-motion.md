---
level: A-level
subject: Further Mathematics
topic: "Circular motion"
as_content: "Horizontal circles at constant speed are AS on OCR (6.05a to 6.05d Stage 1). Vertical circles are A-level only. MEI circular motion is section (b), A-level only. AQA is option content; Edexcel FM2 is A-level only."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["MD1", "MD2", "MD3", "MD4", "MD5", "MD6"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FM2 1.1", "FM2 1.2"]
  - board: OCR
    code: "H245"
    spec_refs: ["6.05a", "6.05b", "6.05c", "6.05d", "6.05e", "6.05f"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Mr1", "Mr2", "Mr3", "Mr4", "Mr5", "Mr6", "Mr7", "Mr8"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-mechanics/
---

# Circular motion

This file covers angular speed, the relationships v = rω and a = rω² = v²/r, motion in a horizontal circle (conical pendulums, banked tracks, cars on bends), vectors in circular motion, and motion in a vertical circle, including conditions for completing the circle and for leaving a surface.

## Overview

Newton's laws and friction are in A-level Maths ([../maths/27-forces-and-newtons-laws.md](../maths/27-forces-and-newtons-laws.md), [../maths/28-friction.md](../maths/28-friction.md)). Energy is in [43-work-energy-and-power.md](43-work-energy-and-power.md). Take g = 9.8 m s⁻².

### Board differences

- AQA MD1 to MD6 (including conical pendulums with one or two strings, and position, velocity and acceleration as vectors).
- Edexcel FM2 1.1, 1.2.
- OCR 6.05a to 6.05f.
- MEI Mr1 to Mr8, including tangential acceleration (Mr6) and when a particle leaves a circular path (Mr8).

## MD1 Angular speed and acceleration towards the centre

*Refs: AQA MD1, MD2, MD3, MD4 · Edexcel FM2 1.1 · OCR 6.05a, 6.05b · MEI Mr1, Mr3. Level: AS & A (OCR); A-level (MEI, Edexcel).*

### What you need to know

- Angular speed ω in rad s⁻¹; convert from revolutions per minute by × 2π/60.
- v = rω. Acceleration towards the centre a = rω² = v²/r, even at constant speed.
- (AQA MD4) With r = r cos ωt i + r sin ωt j: v = ṙ is tangential with magnitude rω, and a = r̈ = −ω²r points to the centre.

### Worked example

A point on a wheel of radius 0.5 m turns at 45 rev min⁻¹. Find ω, v and a.

1. ω = 45 × 2π/60 = 4.71 rad s⁻¹. v = 2.36 m s⁻¹. a = 0.5 × 4.71² = 11.1 m s⁻².

### Common mistakes

- Using degrees or revolutions in v = rω.

## MD5 Horizontal circles

*Refs: AQA MD5 · Edexcel FM2 1.2 · OCR 6.05c, 6.05d · MEI Mr2, Mr4. Level: AS & A (OCR).*

### What you need to know

- Resolve vertically (forces balance) and horizontally (resultant = mrω² or mv²/r towards the centre).
- Conical pendulum: string at angle θ to the vertical, radius r = l sin θ.
- Banked track at angle α with no friction: v² = rg tan α. With friction, friction acts down the slope at high speeds and up it at low speeds.

### Worked example

A conical pendulum: mass 0.2 kg, string 0.5 m at 30° to the vertical. Find the tension and ω.

1. Vertical: T cos 30° = 0.2 × 9.8, T = 2.26 N.
2. Horizontal: T sin 30° = 0.2 × 0.25 × ω², ω = 4.76 rad s⁻¹.

Find the speed at which a car can go round a bend of radius 50 m, banked at 20°, with no sideways friction.

1. R cos 20° = mg, R sin 20° = mv²/50, so v² = 50g tan 20°, v = 13.4 m s⁻¹.

Find the greatest speed on a flat bend of radius 40 m with μ = 0.6.

1. μmg = mv²/40, v = √(0.6 × 9.8 × 40) = 15.3 m s⁻¹.

### Common mistakes

- Resolving along the slope instead of horizontally and vertically (the acceleration is horizontal).

## MD6 Vertical circles

*Refs: AQA MD6 · Edexcel FM2 1.2 · OCR 6.05e, 6.05f · MEI Mr5, Mr6, Mr7, Mr8. Level: A-level only.*

### What you need to know

- Speed varies: use conservation of energy between two points.
- Radial equation: the resultant force towards the centre = mv²/r. At the top: T + mg = mv²/r; at the bottom: T − mg = mv²/r; at angle θ from the bottom: T − mg cos θ = mv²/r.
- Tangential acceleration (MEI Mr6) = g sin θ component along the path.
- A particle on a string completes the circle if T ≥ 0 at the top: v_top² ≥ gr, so u_bottom² ≥ 5gr. A bead on a wire or a particle on a rod only needs v ≥ 0 at the top: u² ≥ 4gr (just over).
- A particle on the outside of a smooth sphere leaves the surface when the reaction becomes 0.

### Worked example

A 0.3 kg particle on a string of length 0.8 m moves in a vertical circle with speed 8 m s⁻¹ at the bottom. Find the speed and tension at the top, and the tension at the bottom.

1. Energy: v² = 64 − 2 × 9.8 × 1.6 = 32.64, v = 5.71 m s⁻¹.
2. Top: T + 0.3 × 9.8 = 0.3 × 32.64/0.8, T = 9.30 N.
3. Bottom: T − 2.94 = 0.3 × 64/0.8, T = 26.9 N.

Find the least speed at the bottom for the particle to complete the circle.

1. u² ≥ 5gr = 39.2, u ≥ 6.26 m s⁻¹.

A particle slides from rest at the top of a smooth sphere of radius r. Find where it leaves the surface.

1. At angle θ from the top: v² = 2gr(1 − cos θ).
2. Radial: mg cos θ − R = mv²/r. R = 0 gives g cos θ = 2g(1 − cos θ), cos θ = ⅔, θ = 48.2°.

### Common mistakes

- Using u² ≥ 4gr for a string (that is the rod/bead condition).
- Getting the direction of the weight component wrong in the radial equation.

## Check questions

1. A particle on a smooth table is attached by a string of length 0.6 m to a fixed point and moves in a horizontal circle at 2 rev s⁻¹. Its mass is 0.4 kg. Find the tension. [3 marks]
2. A particle of mass 0.5 kg moves in a horizontal circle on the inside of a smooth hemispherical bowl of radius 0.4 m, at a depth of 0.2 m below the rim. Find its speed. [5 marks]
3. A string of length 0.8 m: the particle has speed 5 m s⁻¹ at the bottom. Find the angle above the horizontal at which the string goes slack. [5 marks]
4. A car of mass 900 kg travels at 25 m s⁻¹ round a bend of radius 80 m banked at 15°. Find the friction force and its direction. [6 marks]
5. A particle on a light rod of length 1 m moves in a vertical circle. Find the least speed at the bottom for it to reach the top. [2 marks]

## Mark scheme

1. ω = 4π (1). T = 0.4 × 0.6 × (4π)² (1) = 37.9 N (1).
2. Radius of circle √(0.4² − 0.2²) = 0.3464 m (1). Reaction at angle with tan(angle to vertical) = 0.3464/0.2 (1). R cos α = mg, R sin α = mv²/r (1). v² = rg tan α = 0.3464 × 9.8 × 1.732 = 5.88 (1). v = 2.42 m s⁻¹ (1).
3. At angle a above horizontal, v² = 25 − 2g × 0.8(1 + sin a) (2). T = 0 gives v² = 0.8g sin a (1). 25 − 15.68 = 23.52 sin a (1), a = 23.3° (1).
4. Horizontal: R sin 15° + F cos 15° = 900 × 625/80 = 7031 (2). Vertical: R cos 15° − F sin 15° = 8820 (2). Solve: F = 7031 cos 15° − 8820 sin 15° = 4509 N (1), down the slope (1).
5. u² = 4gr = 39.2, u = 6.26 m s⁻¹ (just over) (2).
