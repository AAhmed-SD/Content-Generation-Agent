---
level: A-level
subject: Mathematics
topic: "Projectiles"
as_content: "All of this file is A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["Q5"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["M7.5"]
  - board: OCR
    code: "H240"
    spec_refs: ["3.02h", "3.02i"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["My1", "My2", "My3", "My4", "My5"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Projectiles

This file covers motion under gravity in a vertical plane: splitting the motion into horizontal and vertical parts, time of flight, range and greatest height, the equation of the path, and finding the initial velocity.

## Overview

All A-level only. It uses the constant acceleration formulae (file 25) in each direction separately, and vectors (file 18).

### Board differences

- AQA Q5; Edexcel Mechanics 7.5; OCR H240 3.02h, 3.02i; OCR MEI H640 My1 to My5.
- Edexcel's guidance includes deriving formulae for the time of flight, range and greatest height, and the equation of the path. MEI's My4 asks you to eliminate t to find the path.

## Q5 Projectiles

*Refs: AQA Q5 · Edexcel Mechanics 7.5 · OCR 3.02h, 3.02i · MEI My1, My2, My3, My4, My5. Level: A-level only.*

### What you need to know

- (A-level only) A projectile is modelled as a particle moving under gravity alone (no air resistance, no spin).
- (A-level only) Horizontal motion: constant velocity (no horizontal acceleration). Vertical motion: constant acceleration g downwards.
- (A-level only) For speed U at angle θ above the horizontal, the initial components are U cos θ (horizontal) and U sin θ (vertical). At time t:

```latex
x = Ut\cos\theta \qquad y = Ut\sin\theta - \tfrac{1}{2}gt^2
```

```latex
\dot{x} = U\cos\theta \qquad \dot{y} = U\sin\theta - gt
```

- (A-level only) In vector form, with i horizontal and j vertically upwards:

```latex
\mathbf{r} = \mathbf{u}t - \tfrac{1}{2}gt^2\,\mathbf{j} \qquad \mathbf{v} = \mathbf{u} - gt\,\mathbf{j}
```

- (A-level only) Results for a projectile launched from and landing on horizontal ground:

```latex
\text{time of flight } T = \frac{2U\sin\theta}{g} \qquad \text{range } R = \frac{U^2\sin 2\theta}{g} \qquad \text{greatest height } H = \frac{U^2\sin^2\theta}{2g}
```

- (A-level only) The equation of the path:

```latex
y = x\tan\theta - \frac{gx^2}{2U^2\cos^2\theta}
```

### Explained

**Method.** Work in two columns, horizontal and vertical. Time is the link between them: often you find t from one direction and use it in the other.

- Greatest height: vertical velocity = 0.
- Lands at the same level: vertical displacement = 0.
- Lands below the start (off a cliff): vertical displacement is negative.
- Velocity at any time: find both components, then the speed √(ẋ² + ẏ²) and the angle tan⁻¹(ẏ/ẋ) to the horizontal.

**Deriving the results.** Time of flight: set y = 0, so t(U sin θ − ½gt) = 0 and T = 2U sin θ/g. Range: x at time T, R = U cos θ × 2U sin θ/g = U² sin 2θ/g. The range is greatest at θ = 45°. Greatest height: ẏ = 0 at t = U sin θ/g; substitute into y. Path: t = x/(U cos θ), substitute into y.

**Limitations.** Air resistance reduces the range and height. The object is not really a particle, and it may spin. g is taken as constant.

### Worked example

(A-level only) A ball is kicked from ground level at 20 m s⁻¹ at 30° above the horizontal. Find the time of flight, the range and the greatest height.

1. Components: horizontal 20 cos 30° = 17.32, vertical 20 sin 30° = 10.
2. Lands when 10t − 4.9t² = 0: t = 10/4.9 = 2.04 s.
3. Range = 17.32 × 2.041 = 35.3 m.
4. Greatest height: 0 = 10² − 2 × 9.8 × h, so h = 5.10 m.

(A-level only) A stone is thrown horizontally at 12 m s⁻¹ from the top of a cliff 45 m high. Find how far from the foot of the cliff it lands, and its speed and direction on impact.

1. Vertical: u = 0, s = 45 (down positive), a = 9.8. 45 = 4.9t², so t = 3.03 s.
2. Horizontal distance = 12 × 3.030 = 36.4 m.
3. Vertical velocity at impact = 9.8 × 3.030 = 29.7 m s⁻¹.
4. Speed √(12² + 29.7²) = 32.0 m s⁻¹, at tan⁻¹(29.7/12) = 68.0° below the horizontal.

(A-level only) A ball is projected from ground level at 25 m s⁻¹ at angle α above the horizontal, where tan α = 3/4. A wall 10 m high is 30 m away. Does the ball clear the wall?

1. sin α = 3/5, cos α = 4/5. Components 20 and 15.
2. Reaches the wall when 20t = 30, t = 1.5 s.
3. Height then: 15(1.5) − 4.9(1.5)² = 22.5 − 11.025 = 11.475 m.
4. 11.475 > 10, so it clears the wall by about 1.5 m.

(A-level only) A ball is projected from ground level and lands 40 m away after 2.5 s. Find the speed and angle of projection.

1. Horizontal: 40 = 2.5uₓ, so uₓ = 16.
2. Vertical: 0 = 2.5u_y − 4.9(2.5)², so u_y = 12.25.
3. Speed √(16² + 12.25²) = 20.2 m s⁻¹, at tan⁻¹(12.25/16) = 37.4° above the horizontal.

(A-level only) A particle is projected with velocity (12i + 14.7j) m s⁻¹ from ground level. Find when it is 9.8 m above the ground, and its horizontal distance then.

1. 14.7t − 4.9t² = 9.8, so t² − 3t + 2 = 0, t = 1 or t = 2.
2. Horizontal distances 12 m (going up) and 24 m (coming down).

### Common mistakes

- (A-level only) Giving the horizontal velocity an acceleration.
- (A-level only) Using U instead of U sin θ for the vertical start.
- (A-level only) Forgetting that the displacement is negative when landing below the start, with up as positive.
- (A-level only) Giving only the speed when the velocity (speed and direction) is asked for.

## Check questions

1. (A-level only) A ball is projected from ground level at 30 m s⁻¹ at 40° above the horizontal. Find (a) the greatest height; (b) the time of flight; (c) the range. [6 marks]
2. (A-level only) A ball rolls off a table 1.2 m high with speed 8 m s⁻¹. Find how far from the table it lands and its speed on landing. [5 marks]
3. (A-level only) Show that a projectile launched from level ground with speed U at angle θ has range U² sin 2θ / g. Hence find the angle that gives the greatest range. [5 marks]
4. (A-level only) A golf ball is hit from level ground at 45° and lands 80 m away. Find the speed of projection. [3 marks]
5. (A-level only) A stone is thrown from the top of a 20 m cliff at 15 m s⁻¹ at 30° above the horizontal. Find the time until it hits the sea, and how far from the foot of the cliff it lands. [6 marks]
6. (A-level only) A particle is projected with velocity (12i + 14.7j) m s⁻¹ from ground level. Find the Cartesian equation of its path. [3 marks]
7. (A-level only) State two assumptions made in the projectile model and say how each affects the predicted range. [2 marks]

## Mark scheme

1. Components 22.98 and 19.28 (1); (a) 0 = 19.28² − 19.6h (1), h = 19.0 m (1); (b) t = 2 × 19.28/9.8 (1) = 3.94 s (1); (c) 22.98 × 3.935 = 90.4 m (1).
2. 1.2 = 4.9t², t = 0.495 s (1); distance 8 × 0.495 = 3.96 m (1); vertical velocity 9.8 × 0.495 = 4.85 (1); speed √(64 + 4.85²) (1) = 9.36 m s⁻¹ (1).
3. Vertical: 0 = Ut sin θ − ½gt² (1); T = 2U sin θ/g (1); R = U cos θ × T (1); = U² × 2 sin θ cos θ/g = U² sin 2θ/g (1); greatest when sin 2θ = 1, θ = 45° (1).
4. 80 = U² sin 90°/9.8 (1); U² = 784 (1); U = 28 m s⁻¹ (1).
5. Components 12.99 and 7.5 (1); −20 = 7.5t − 4.9t² (1); 4.9t² − 7.5t − 20 = 0 (1); t = 2.93 s (1); distance 12.99 × 2.926 (1) = 38.0 m (1).
6. x = 12t, so t = x/12 (1); y = 14.7(x/12) − 4.9(x/12)² (1); y = 1.225x − 0.034x² (1).
7. No air resistance, which makes the predicted range too large (1); particle / no spin, or g constant, with a sensible effect (1).
