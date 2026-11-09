---
level: A-level
subject: Further Mathematics
topic: "Momentum, impulse and collisions"
as_content: "Direct impacts, impulse and momentum are AS on OCR (Stage 1) and MEI (section (a)); oblique impacts and variable-force impulse are A-level only. AQA and Edexcel (FM1) are option content; Edexcel FM1 is also available at AS."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["MB1", "MB2", "MB3", "MB4"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FM1 1.1", "FM1 1.2", "FM1 4.1", "FM1 4.2", "FM1 5.1", "FM1 5.2"]
  - board: OCR
    code: "H245"
    spec_refs: ["6.03a", "6.03b", "6.03c", "6.03d", "6.03e", "6.03f", "6.03g", "6.03h", "6.03i", "6.03j", "6.03k", "6.03l"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Mi1", "Mi2", "Mi3", "Mi4", "Mi5", "Mi6", "Mi7", "Mi8", "Mi9", "Mi10", "Mi11", "Mi12", "Mi13", "Mi14", "Mi15", "Mi16", "Mi17"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-mechanics/
---

# Momentum, impulse and collisions

This file covers momentum and impulse (as scalars and vectors), the impulse-momentum principle, impulse of a variable force, conservation of momentum, Newton's experimental law and the coefficient of restitution, loss of kinetic energy, successive impacts, and oblique impacts with a wall and between spheres.

## Overview

Newton's laws and vectors are in A-level Maths ([../maths/27-forces-and-newtons-laws.md](../maths/27-forces-and-newtons-laws.md), [../maths/18-vectors.md](../maths/18-vectors.md)). Energy is in [43-work-energy-and-power.md](43-work-energy-and-power.md). Take g = 9.8 m s⁻².

### Board differences

- AQA MB1 to MB4 (including impulse of a variable force, I = ∫F dt). AQA MB2 restricts restitution to direct collisions and impacts with a fixed smooth surface.
- Edexcel FM1 1.1, 1.2, 4.1, 4.2, 5.1, 5.2 (including oblique impacts of spheres and successive oblique impacts).
- OCR 6.03a to 6.03l; OCR 6.03l (Stage 2) extends Newton's law to oblique impacts.
- MEI Mi1 to Mi17; Mi13 to Mi17 are oblique impacts (section (b)).

## MB3 Momentum and impulse

*Refs: AQA MB3, MB4 · Edexcel FM1 1.1, 1.2 · OCR 6.03a, 6.03c, 6.03e, 6.03f, 6.03g, 6.03h · MEI Mi1, Mi2, Mi3. Level: AS & A (variable force A-level only).*

### What you need to know

- Momentum = mv (a vector). Impulse I = Ft for a constant force; I = ∫F dt for a variable force. Unit N s.
- Impulse-momentum principle: I = mv − mu (vectors).

### Worked example

A 0.2 kg ball moving with velocity (4i + j) m s⁻¹ is hit and moves off with (−3i + 2j) m s⁻¹. Find the impulse.

1. I = 0.2[(−3i + 2j) − (4i + j)] = −1.4i + 0.2j N s, magnitude 1.41 N s.

A force F = 6t² N acts for 2 s on a 2 kg particle at rest. Find its final speed.

1. I = ∫₀² 6t² dt = 16 N s. v = 16/2 = 8 m s⁻¹.

### Common mistakes

- Ignoring direction: a ball rebounding changes momentum by m(u + v), not m(v − u) with both positive.

## MB1 Conservation of momentum and restitution

*Refs: AQA MB1, MB2 · Edexcel FM1 4.1, 4.2 · OCR 6.03b, 6.03d, 6.03i, 6.03j, 6.03k · MEI Mi4, Mi5, Mi6, Mi7, Mi8, Mi9, Mi10, Mi11, Mi12. Level: AS & A.*

### What you need to know

- In a collision with no external impulse, total momentum is conserved.
- Newton's experimental law: speed of separation = e × speed of approach, 0 ≤ e ≤ 1. For a wall: rebound speed = e × approach speed.
- e = 1: perfectly elastic (kinetic energy conserved). e = 0: perfectly inelastic (the bodies coalesce or move together).
- Kinetic energy is lost when e < 1.

### Explained

Draw before and after diagrams, choose a positive direction, and write two equations: momentum, and restitution as v₂ − v₁ = e(u₁ − u₂) (with A on the left). Solve them together. If an answer is negative, that sphere moves the other way.

### Worked example

Sphere A (2 kg) at 5 m s⁻¹ hits sphere B (3 kg) moving towards it at 2 m s⁻¹. e = 0.5. Find the velocities after impact and the KE lost.

1. Momentum: 2(5) + 3(−2) = 2v₁ + 3v₂, so 2v₁ + 3v₂ = 4.
2. Restitution: v₂ − v₁ = 0.5(5 − (−2)) = 3.5.
3. v₁ = −1.3, v₂ = 2.2. A reverses at 1.3 m s⁻¹; B moves at 2.2 m s⁻¹.
4. KE before 25 + 6 = 31 J; after 1.69 + 7.26 = 8.95 J. Lost 22.05 J.

A ball dropped from 2.5 m bounces with e = 0.6. Find the height of the first bounce and the total distance travelled before it stops.

1. Impact speed √(2g × 2.5) = 7 m s⁻¹; rebound 4.2 m s⁻¹; height 4.2²/2g = 0.9 m = e² × 2.5.
2. Heights form a geometric series: total = 2.5 + 2(0.9 + 0.324 + ...) = 2.5 + 2 × 0.9/(1 − 0.36) = 5.31 m.

### Common mistakes

- Writing the restitution equation with mixed signs.

## Successive impacts

*Refs: Edexcel FM1 4.2, 5.2 · OCR 6.03k · MEI Mi10. Level: AS & A.*

### What you need to know

- Treat each collision separately, using velocities from the previous one. Decide whether a further collision happens by comparing velocities (a faster sphere behind a slower one moving the same way will catch it).

### Worked example

Three spheres A, B, C of masses 1, 1, 2 kg lie in a line. A moves at 6 m s⁻¹ to hit B; then B hits C. e = 0.5 throughout. Find all velocities after the second collision and decide whether there is a third.

1. A–B: v_A + v_B = 6, v_B − v_A = 3. v_A = 1.5, v_B = 4.5.
2. B–C: v_B′ + 2v_C = 4.5, v_C − v_B′ = 2.25. v_C = 2.25, v_B′ = 0.
3. A (1.5) is now faster than B (0) in the same direction, so A hits B again.

### Common mistakes

- Using the original velocities for the second collision.

## Oblique impacts

*Refs: Edexcel FM1 5.1, 5.2 · OCR 6.03l · MEI Mi13, Mi14, Mi15, Mi16, Mi17. Level: A-level only.*

### What you need to know

- For smooth surfaces, the impulse acts along the common normal (the line of centres for spheres). The velocity component perpendicular to the normal (parallel to the wall) is unchanged.
- Apply momentum conservation and Newton's law along the line of centres only.

### Worked example

A ball hits a smooth wall at 6 m s⁻¹ at 30° to the wall. e = 0.5. Find the rebound speed and angle.

1. Parallel to wall: 6 cos 30° = 5.196 (unchanged). Perpendicular: 6 sin 30° = 3, becomes 1.5.
2. Speed √(5.196² + 1.5²) = 5.41 m s⁻¹, at arctan(1.5/5.196) = 16.1° to the wall.

Sphere A (1 kg) with velocity (3i + 4j) m s⁻¹ hits sphere B (2 kg) at rest. At impact the line of centres is parallel to i. e = ½. Find the velocities after impact and the KE lost.

1. j-components unchanged: A keeps 4j, B has 0j.
2. Along i: 3 = v₁ + 2v₂ and v₂ − v₁ = 1.5. v₁ = 0, v₂ = 1.5.
3. A: 4j m s⁻¹; B: 1.5i m s⁻¹.
4. KE before 12.5 J; after 8 + 2.25 = 10.25 J. Lost 2.25 J.

### Common mistakes

- Applying restitution to the full speeds rather than the normal components.

## Check questions

1. A 1500 kg car moving at 12 m s⁻¹ collides with a stationary 1000 kg car and they move together. Find their common speed and the impulse on the second car. [4 marks]
2. Sphere P (3 kg, 4 m s⁻¹) hits sphere Q (1 kg, at rest). After impact Q moves at 4.5 m s⁻¹. Find P's velocity and e. [5 marks]
3. A ball falls from 3.6 m onto a floor and rebounds to 1.6 m. Find e. [3 marks]
4. A smooth sphere moving at 10 m s⁻¹ hits a smooth wall at 60° to the wall. After the impact it moves at 45° to the wall. Find e and the loss of KE as a fraction of the original. [6 marks]
5. A force F = (2t i + 3 j) N acts on a 0.5 kg particle from t = 0 to t = 2, starting with velocity (i − j) m s⁻¹. Find its velocity at t = 2. [4 marks]

## Mark scheme

1. 1500 × 12 = 2500v, v = 7.2 m s⁻¹ (2). Impulse on second car 1000 × 7.2 = 7200 N s (2).
2. 12 = 3v + 4.5, v = 2.5 m s⁻¹ (2). e = (4.5 − 2.5)/4 = 0.5 (3).
3. Speeds √(2g × 3.6) = 8.4 and √(2g × 1.6) = 5.6 (2). e = 5.6/8.4 = ⅔ (1).
4. Parallel 10 cos 60° = 5; perpendicular 10 sin 60° = 8.66 (1). After: perpendicular = 5 tan 45° = 5 (1). e = 5/8.66 = 0.577 (1). KE ratio after/before = (25 + 25)/100 = ½ (2). Fraction lost ½ (1).
5. I = ∫₀² (2t i + 3j) dt = 4i + 6j (2). 0.5(v − (i − j)) = 4i + 6j (1). v = 9i + 11j m s⁻¹ (1).
