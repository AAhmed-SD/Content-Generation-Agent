---
level: A-level
subject: Further Mathematics
topic: "Forces, moments and equilibrium of rigid bodies"
as_content: "MEI Forces (Md1 to Md16) is section (a), AS. OCR 6.04e is Stage 2 (A-level only). AQA and Edexcel (FM2) are option content."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["ME5", "ME6"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FM2 2.1", "FM2 3.2", "FM2 3.3"]
  - board: OCR
    code: "H245"
    spec_refs: ["6.04e"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Md1", "Md2", "Md3", "Md4", "Md5", "Md6", "Md7", "Md8", "Md9", "Md10", "Md11", "Md12", "Md13", "Md14", "Md15", "Md16"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-mechanics/
---

# Forces, moments and equilibrium of rigid bodies

This file covers forces on particles (contact forces, friction, resolving, the triangle of forces) as MEI revisits them, moments and couples, the conditions for a rigid body to be in equilibrium, problems with ladders, hinged rods and strings, and deciding whether a body will slide or topple.

## Overview

Much of the particle work (marked † in the MEI specification) is shared with A-level Maths: see [../maths/27-forces-and-newtons-laws.md](../maths/27-forces-and-newtons-laws.md), [../maths/28-friction.md](../maths/28-friction.md) and [../maths/29-moments.md](../maths/29-moments.md). Centres of mass are in [47-centres-of-mass.md](47-centres-of-mass.md). Take g = 9.8 m s⁻².

### Board differences

- AQA ME5, ME6 (sliding, toppling, suspension; forces on rigid bodies, moments and couples).
- Edexcel FM2 2.1 (moments), 3.2 (equilibrium of rigid bodies), 3.3 (toppling and sliding).
- OCR 6.04e (equilibrium of rigid bodies, including toppling).
- MEI Md1 to Md16 (Mechanics Major and Minor): Md1 to Md10 are particle forces and friction, including the result that a body on a rough plane is about to slip when tan α = μ (Md4) and closed polygons of forces (Md9); Md11 to Md16 are rigid bodies.

## Forces on particles

*Refs: MEI Md1, Md2, Md3, Md4, Md5, Md6, Md7, Md8, Md9, Md10. Level: AS & A.*

### What you need to know

- The contact force between rough surfaces has a normal component R and a frictional component F ≤ μR, with F = μR when slipping or about to slip.
- Resolve in two perpendicular directions; in equilibrium each resolved sum is zero. Three forces in equilibrium form a closed triangle (use the sine or cosine rule).
- (Md4) A body on a rough plane inclined at α, with no other forces, is about to slip when tan α = μ.

### Worked example

Show that a block on a rough plane is on the point of sliding when tan α = μ.

1. Perpendicular: R = mg cos α. Along: F = mg sin α.
2. Limiting: mg sin α = μmg cos α, so tan α = μ.

### Common mistakes

- Assuming F = μR when the body is not about to slip.

## ME6 Moments, couples and rigid-body equilibrium

*Refs: AQA ME6 · Edexcel FM2 2.1, 3.2 · OCR 6.04e · MEI Md11, Md12, Md13, Md14, Md15. Level: AS & A (MEI); A-level (others).*

### What you need to know

- Moment of F about a point = F × perpendicular distance from the point to the line of action.
- A couple is a pair of equal, opposite, parallel forces not in line. It has a turning effect (moment Fd, the same about every point) but no resultant force.
- A rigid body is in equilibrium if the resultant force is zero and the total moment about any point is zero.
- Take moments about a point where unknown forces act, to remove them from the equation.

### Worked example

A uniform ladder of length 4 m and mass 20 kg rests against a smooth wall at 60° to rough horizontal ground. Find the least μ for equilibrium.

1. Forces: weight 20g at the midpoint, wall reaction S (horizontal), ground R and friction F.
2. Vertical: R = 20g. Horizontal: F = S.
3. Moments about the foot: S × 4 sin 60° = 20g × 2 cos 60°, so S = 10g cot 60° = 56.6 N.
4. F ≤ μR: μ ≥ 56.6/196 = 0.289.

A uniform horizontal rod of length 2 m and weight 50 N is hinged to a wall at A and held by a string from its end B to a point on the wall above A, at 30° to the rod. Find the tension and the hinge force.

1. Moments about A: T sin 30° × 2 = 50 × 1, T = 50 N.
2. Horizontal: H = T cos 30° = 43.3 N. Vertical: V = 50 − 25 = 25 N.
3. Hinge force √(43.3² + 25²) = 50 N, at 30° above the horizontal.

### Common mistakes

- Using the length along the rod instead of the perpendicular distance.
- Forgetting the hinge reaction can act in any direction (two components).

## ME5 Sliding or toppling

*Refs: AQA ME5 · Edexcel FM2 3.3 · MEI Md16. Level: AS & A (MEI); A-level (others).*

### What you need to know

- On the point of toppling, the normal reaction acts at the edge about which the body would tip.
- Compare the force (or angle) needed to cause sliding with that needed for toppling; the smaller one happens first.

### Worked example

A uniform cube of side 0.4 m and weight 100 N on rough ground (μ = 0.6) is pushed by a horizontal force P at height 0.3 m. Does it slide or topple first as P increases?

1. Sliding: P = μR = 60 N.
2. Toppling about the front edge: P × 0.3 = 100 × 0.2, P = 66.7 N.
3. 60 < 66.7: it slides first.

### Common mistakes

- Taking moments about the centre instead of the toppling edge.

## Check questions

1. A uniform beam AB of length 6 m and weight 200 N rests on supports at C and D, 1 m from each end. A 300 N weight is placed 0.5 m from A. Find the support forces. [4 marks]
2. A uniform ladder of weight W and length 2a rests against a smooth wall with its foot on rough ground (μ = 0.4). Find the smallest angle with the ground for equilibrium. [5 marks]
3. A couple and a force act on a lamina. Explain why the moment of a couple is the same about every point. [2 marks]
4. A uniform cuboid 0.5 m wide and 1 m tall, weight 80 N, is on rough ground (μ = 0.3). A horizontal force P acts at the top. Find whether it slides or topples first. [4 marks]

## Mark scheme

1. Supports at 1 m and 5 m from A. Moments about C: D × 4 = 200 × 2 + 300 × (−0.5) (2), D = 62.5 N (1). C = 500 − 62.5 = 437.5 N (1).
2. R = W, F = S (1). Moments about the foot: S × 2a sin θ = Wa cos θ (2), S = (W/2) cot θ (1). ½ cot θ ≤ 0.4 gives tan θ ≥ 1.25, θ ≥ 51.3° (1).
3. Forces F at distance d apart: about any point, moments Fx and F(d − x) or F(x + d) − Fx combine to Fd (2).
4. Slide: P = 0.3 × 80 = 24 N (1). Topple about the far bottom edge: P × 1 = 80 × 0.25, P = 20 N (2). 20 < 24: it topples first (1).
