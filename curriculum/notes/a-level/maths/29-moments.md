---
level: A-level
subject: Mathematics
topic: "Moments"
as_content: "All of this file is A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["S1"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["M9.1"]
  - board: OCR
    code: "H240"
    spec_refs: ["3.01c", "3.04a", "3.04b", "3.04c"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Mp35", "MF13", "MF14", "MF15", "MF16"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Moments

This file covers the moment of a force, the conditions for a rigid body to be in equilibrium, and problems with beams, rods, see-saws, tilting and ladders.

## Overview

All A-level only. Objects are now rigid bodies (with size) rather than particles, so the point where a force acts matters.

### Board differences

- AQA S1; Edexcel Mechanics 9.1; OCR H240 3.04a to 3.04c (and 3.01c for the unit N m); OCR MEI H640 MF13 to MF16 (and Mp35 for the unit).
- Edexcel's guidance includes rigid bodies in equilibrium under parallel and non-parallel coplanar forces, for example ladders, and problems on the point of tilting. MEI's MF16 states that the weight of a body acts at its centre of mass when finding its moment.

## S1 Moments in simple static contexts

*Refs: AQA S1 · Edexcel Mechanics 9.1 · OCR 3.01c, 3.04a, 3.04b, 3.04c · MEI Mp35, MF13, MF14, MF15, MF16. Level: A-level only.*

### What you need to know

- (A-level only) The moment of a force about a point is its turning effect:

```latex
\text{moment} = F \times d
```

where d is the perpendicular distance from the point to the line of action of the force. The unit is N m. State the sense (clockwise or anticlockwise).

- (A-level only) For a force F applied at distance r from the pivot at angle θ to the rod, the moment is Fr sin θ.
- (A-level only) A rigid body is in equilibrium when both: the resultant force is zero, and the total moment about any point is zero.
- (A-level only) The weight of a uniform body acts at its centre; for a non-uniform body it acts at its centre of mass, which may need to be found.
- (A-level only) A body on the point of tilting about a support has zero reaction at the other support.

### Explained

**Choosing the point.** Take moments about a point where an unknown force acts: that force then has zero moment and disappears from the equation. Resolve vertically (and horizontally if needed) for the remaining equation.

**Beams on two supports.** Two unknown reactions. Take moments about one support to find the other reaction, then resolve vertically.

**Tilting.** As a load moves towards the end of a beam, the reaction at the far support decreases. When it reaches zero, the beam is about to tilt about the near support.

**Ladders.** A ladder against a smooth wall has a normal reaction S from the wall (horizontal). On rough ground, there is a normal reaction R (vertical) and friction F (horizontal, towards the wall). Resolve both ways and take moments about the foot. In limiting equilibrium, F = μR (file 28).

### Worked example

(A-level only) A force of 15 N acts at the end of a 2 m rod, at 40° to the rod. Find its moment about the other end.

1. Perpendicular component: 15 sin 40°.
2. Moment = 15 sin 40° × 2 = 19.3 N m.

(A-level only) A uniform beam AB, 6 m long and of mass 40 kg, rests horizontally on supports at C (1 m from A) and D (1 m from B). A person of mass 70 kg stands 2 m from B. Find the reactions at the supports.

1. Positions from A: C at 1, beam's weight at 3, person at 4, D at 5.
2. Moments about C: R_D × 4 = 40g × 2 + 70g × 3 = 290g, so R_D = 72.5g = 710.5 N.
3. Vertically: R_C + R_D = 110g, so R_C = 37.5g = 367.5 N.

(A-level only) How far beyond D can the person in the last example stand before the beam tilts?

1. On the point of tilting about D, R_C = 0.
2. Moments about D: 40g × 2 = 70g × x, where x is the distance beyond D.
3. x = 80/70 = 1.14 m. B is only 1 m beyond D, so the person can stand anywhere up to B without the beam tilting.

(A-level only) A non-uniform rod AB of length 4 m and weight 117.6 N hangs horizontally from two vertical strings at A and B. The tension at A is 70 N. Find the position of the centre of mass.

1. Vertically: T_B = 117.6 − 70 = 47.6 N.
2. Moments about A: 47.6 × 4 = 117.6 × x, so x = 1.62 m from A.

(A-level only) A uniform ladder of length 5 m and mass 20 kg rests against a smooth vertical wall at 60° to rough horizontal ground. Find the least value of μ for the ladder to stay in equilibrium.

1. Forces: weight 20g at the midpoint; S from the wall (horizontal); R and F at the foot.
2. Vertically: R = 20g = 196 N. Horizontally: F = S.
3. Moments about the foot: S × 5 sin 60° = 20g × 2.5 cos 60°, so S = 56.6 N.
4. F = 56.6 ≤ μ × 196, so μ ≥ 0.289 (exactly 1/(2√3)).

### Common mistakes

- (A-level only) Multiplying by the distance along the rod instead of the perpendicular distance.
- (A-level only) Mixing clockwise and anticlockwise moments in one sum without signs.
- (A-level only) Forgetting the weight of the beam itself.
- (A-level only) Taking moments about a point and then also using the forces at that point.

## Check questions

1. (A-level only) A uniform plank pivoted at its centre balances with a 30 kg child 1.5 m from the pivot on one side. How far from the pivot must a 25 kg child sit on the other side? [2 marks]
2. (A-level only) A uniform beam AB of length 8 m and mass 50 kg rests on supports at A and B. A 20 kg load is placed 2 m from A. Find the reactions at A and B. [4 marks]
3. (A-level only) A uniform rod AB, 3 m long and of mass 6 kg, rests horizontally on supports at A and C, where AC = 2 m. A weight W N hangs from B. Find the value of W for which the rod is on the point of tilting about C. [4 marks]
4. (A-level only) A non-uniform rod AB of length 5 m and weight 120 N hangs horizontally from vertical strings at A and B. The tension at A is twice the tension at B. Find the distance of the centre of mass from A. [4 marks]
5. (A-level only) A force of 25 N acts on a rod 4 m from a pivot, at 30° to the rod. Find its moment about the pivot. [2 marks]
6. (A-level only) A uniform ladder of length 4 m and mass 15 kg rests against a smooth vertical wall with its foot on rough horizontal ground (μ = 0.4). The ladder is about to slip. Find the angle between the ladder and the ground. [6 marks]

## Mark scheme

1. 30g × 1.5 = 25g × x (1); x = 1.8 m (1).
2. Moments about A: R_B × 8 = 50g × 4 + 20g × 2 (1); R_B = 30g = 294 N (1); R_A + R_B = 70g (1); R_A = 40g = 392 N (1).
3. On the point of tilting, R_A = 0 (1); moments about C: 6g × 0.5 = W × 1 (2); W = 3g = 29.4 (1).
4. T_A = 2T_B, 3T_B = 120, so T_B = 40 N, T_A = 80 N (1); moments about A: 40 × 5 = 120x (2); x = 5/3 m (1).
5. 25 × 4 × sin 30° (1) = 50 N m (1).
6. R = 15g, F = S (1); limiting: F = 0.4 × 15g = 58.8 N (1); moments about the foot: S × 4 sin θ = 15g × 2 cos θ (2); tan θ = 1.25 (1); θ = 51.3° (1).
