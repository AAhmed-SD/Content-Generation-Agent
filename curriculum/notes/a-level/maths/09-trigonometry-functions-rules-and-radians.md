---
level: A-level
subject: Mathematics
topic: "Trigonometry: functions, triangle rules, radians and small angles"
as_content: "sin, cos and tan for all angles in degrees, their graphs, the sine and cosine rules and the area formula are AS. Radians, arc length and sector area, exact values in radians and the small angle approximations are A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["E1", "E2", "E3"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P5.1", "P5.2", "P5.3"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.05a", "1.05b", "1.05c", "1.05d", "1.05e", "1.05f", "1.05g"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Mt1", "Mt2", "Mt3", "Mt4", "Mt8", "Mt10", "Mt11", "Mt12"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Trigonometry: functions, triangle rules, radians and small angles

This file covers sine, cosine and tangent for any angle, their graphs and symmetries, exact values, the sine and cosine rules, the area of a triangle, radian measure with arcs and sectors, and the small angle approximations. Identities and equations are in file 10.

## Overview

AS works in degrees: definitions for all angles, graphs, the sine and cosine rules, and area = ½ab sin C. A-level only: radians, arc length and sector area, exact values in radians, and the small angle approximations (which need radians).

### Board differences

- AQA E1 to E3; Edexcel 5.1 to 5.3.
- OCR H240: 1.05a to 1.05c and 1.05f (AS); 1.05d, 1.05e and 1.05g (A-level only).
- OCR MEI H640: Mt1 to Mt4 (AS); Mt8 and Mt10 to Mt12 (A-level only). MEI puts exact values (Mt8) in the A-level part, in both degrees and radians; the other boards treat exact values in degrees as AS.

## E1 Trigonometric functions, the triangle rules and radians

*Refs: AQA E1 · Edexcel 5.1 · OCR 1.05a, 1.05b, 1.05c, 1.05d · MEI Mt1, Mt3, Mt4, Mt10, Mt11. Level: AS & A (part A-level only).*

### What you need to know

- Definitions of sin θ, cos θ and tan θ for any angle, using the unit circle: a point at angle θ anticlockwise from the positive x-axis has coordinates (cos θ, sin θ), and tan θ = sin θ / cos θ.
- The sine rule, cosine rule and the area of a triangle:

```latex
\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} \qquad a^2 = b^2 + c^2 - 2bc\cos A \qquad \text{Area} = \tfrac{1}{2}ab\sin C
```

- (A-level only) Radians: 2π radians = 360°, so π radians = 180°.
- (A-level only) For a sector of radius r and angle θ radians:

```latex
s = r\theta \qquad A = \tfrac{1}{2}r^2\theta
```

### Explained

**Any angle.** In the four quadrants the signs are:

| Quadrant | Angles | Positive |
| --- | --- | --- |
| 1st | 0° to 90° | all of sin, cos, tan |
| 2nd | 90° to 180° | sin only |
| 3rd | 180° to 270° | tan only |
| 4th | 270° to 360° | cos only |

**Which rule?**

- Two angles and a side, or two sides and a non-included angle: sine rule.
- Two sides and the included angle, or three sides: cosine rule.
- For an angle from three sides, rearrange: cos A = (b² + c² − a²)/(2bc).

**The ambiguous case.** If you know two sides and a non-included angle, the sine rule can give two possible triangles, because sin x = sin(180° − x). Check whether the second angle, 180° minus the first answer, still fits (the angles must add to less than 180°).

**(A-level only) Radians.** One radian is the angle at the centre of a circle subtended by an arc equal in length to the radius. To convert, multiply degrees by π/180. Common values: 30° = π/6, 45° = π/4, 60° = π/3, 90° = π/2, 180° = π.

The sector formulas only work with θ in radians. A segment (the region between a chord and its arc) has area ½r²θ − ½r² sin θ = ½r²(θ − sin θ).

### Worked example

In triangle ABC, A = 40°, B = 65° and a = 8 cm. Find b.

1. b/sin 65° = 8/sin 40°.
2. b = 8 sin 65° / sin 40° = 11.3 cm (3 s.f.).

In triangle ABC, a = 7 cm, b = 9 cm and A = 40°. Find the possible values of B.

1. sin B = 9 sin 40° / 7 = 0.8264.
2. B = 55.7° or B = 180° − 55.7° = 124.3°.
3. Both work, since 40° + 124.3° < 180°. There are two possible triangles.

Triangle PQR has sides 5, 7 and 9 cm. Find its largest angle.

1. The largest angle is opposite the 9 cm side.
2. cos θ = (5² + 7² − 9²)/(2 × 5 × 7) = −7/70 = −0.1.
3. θ = 95.7°.

Find the area of a triangle with sides 7 cm and 9 cm and included angle 110°.

1. Area = ½ × 7 × 9 × sin 110° = 29.6 cm².

(A-level only) A sector has radius 8 cm and area 48 cm². Find its angle and perimeter.

1. 48 = ½ × 64 × θ, so θ = 1.5 rad.
2. Arc = 8 × 1.5 = 12 cm. Perimeter = 12 + 8 + 8 = 28 cm.

(A-level only) Find the area of the segment cut off by a chord that subtends π/3 at the centre of a circle of radius 10 cm.

1. Sector: ½ × 100 × π/3 = 52.36 cm².
2. Triangle: ½ × 100 × sin(π/3) = 43.30 cm².
3. Segment: 9.06 cm² (3 s.f.).

### Common mistakes

- Missing the second solution in the ambiguous case.
- Using the sector formulas with θ in degrees.
- Having the calculator in the wrong mode (degrees or radians).

## E2 Small angle approximations

*Refs: AQA E2 · Edexcel 5.2 · OCR 1.05e · MEI Mt12. Level: A-level only.*

### What you need to know

- (A-level only) For small θ in radians:

```latex
\sin\theta \approx \theta \qquad \cos\theta \approx 1 - \frac{\theta^2}{2} \qquad \tan\theta \approx \theta
```

### Explained

On the graph of y = sin θ, the tangent at the origin is y = θ, so for angles close to zero the curve and the line are almost the same. The approximation for cos θ comes from the shape of the cosine curve near its maximum. These only work in radians, and get worse as θ grows: at θ = 0.1, sin θ = 0.0998; at θ = 0.5, sin θ = 0.479.

Replace each function by its approximation, simplify, and ignore powers of θ higher than those asked for.

The approximations are also the reason the derivative of sin x is cos x (file 12).

### Worked example

(A-level only) For small θ, find an approximation to sin θ + cos 3θ.

1. sin θ ≈ θ. cos 3θ ≈ 1 − (3θ)²/2 = 1 − 9θ²/2.
2. sin θ + cos 3θ ≈ 1 + θ − 9θ²/2.
3. Check θ = 0.05: exact 1.038750, approximation 1.038750.

(A-level only) Find the limit of (1 − cos 2θ)/(θ tan θ) as θ → 0.

1. 1 − cos 2θ ≈ 1 − (1 − 2θ²) = 2θ².
2. θ tan θ ≈ θ².
3. The expression tends to 2.

(A-level only) A pendulum swings through a small angle θ. The horizontal displacement of the bob is L sin θ. Using a small angle approximation, give a simpler model and say when it is reasonable.

1. L sin θ ≈ Lθ.
2. Reasonable when θ is small, say less than about 0.2 radians (11°), where the error is under 1%.

### Common mistakes

- Using degrees.
- Writing cos 3θ ≈ 1 − 3θ²/2. Square the whole angle: (3θ)² = 9θ².

## E3 Graphs, symmetries and exact values

*Refs: AQA E3 · Edexcel 5.3 · OCR 1.05f, 1.05g · MEI Mt2, Mt8. Level: AS & A (part A-level only).*

### What you need to know

- The graphs of sin, cos and tan, their symmetries and periods: sin and cos have period 360° (2π); tan has period 180° (π) with asymptotes at 90° + 180°k.
- Exact values of sin and cos for 0°, 30°, 45°, 60°, 90°, 180° and multiples, and of tan for 0°, 30°, 45°, 60°, 180° and multiples.
- (A-level only) The same exact values in radians: 0, π/6, π/4, π/3, π/2, π.

| θ | 0 | 30° (π/6) | 45° (π/4) | 60° (π/3) | 90° (π/2) |
| --- | --- | --- | --- | --- | --- |
| sin θ | 0 | 1/2 | √2/2 | √3/2 | 1 |
| cos θ | 1 | √3/2 | √2/2 | 1/2 | 0 |
| tan θ | 0 | √3/3 | 1 | √3 | undefined |

### Explained

These come from two triangles: half an equilateral triangle of side 2 (sides 1, √3, 2) and an isosceles right-angled triangle (sides 1, 1, √2).

Useful symmetries (in degrees; replace 180° by π in radians):

```latex
\sin(180^\circ - \theta) = \sin\theta \qquad \cos(360^\circ - \theta) = \cos\theta \qquad \tan(180^\circ + \theta) = \tan\theta
```

```latex
\sin(-\theta) = -\sin\theta \qquad \cos(-\theta) = \cos\theta \qquad \cos\theta = \sin(90^\circ - \theta)
```

Transformations from file 04 apply: y = sin 2x has period 180°; y = 3 cos x has amplitude 3; y = sin(x + 30°) is y = sin x moved 30° to the left.

### Worked example

Find the exact value of sin 240°.

1. 240° is in the 3rd quadrant, where sin is negative.
2. The reference angle is 240° − 180° = 60°.
3. sin 240° = −sin 60° = −√3/2.

(A-level only) Find the exact values of cos(4π/3) and tan(−π/4).

1. 4π/3 = π + π/3, in the 3rd quadrant: cos(4π/3) = −cos(π/3) = −1/2.
2. tan(−π/4) = −tan(π/4) = −1.

Sketch y = cos(x − 60°) for 0° ≤ x ≤ 360° and give the points where it meets the axes.

1. y = cos x moved 60° to the right.
2. y-intercept: cos(−60°) = 1/2, so (0, 1/2).
3. x-intercepts: x − 60° = 90° or 270°, so x = 150° and 330°.
4. Maximum at (60°, 1); minimum at (240°, −1).

State the period of y = 3 tan 2x.

1. tan has period 180°; the 2 halves it: 90° (π/2).

### Common mistakes

- Mixing up sin 60° and sin 30°. Picture the triangles.
- Giving the period of sin 2x as 720°. A horizontal factor of 2 squashes the graph, halving the period.

## Check questions

1. In triangle PQR, PQ = 12 cm, QR = 9 cm and angle PQR = 50°. Find PR and the area of the triangle. [4 marks]
2. In triangle ABC, AB = 10 cm, BC = 7 cm and angle A = 35°. Find the two possible values of angle C. [3 marks]
3. Find the exact values of: (a) sin 300°; (b) (A-level only) sin(2π/3); (c) (A-level only) cos(7π/6); (d) (A-level only) tan(5π/4). [4 marks]
4. Sketch y = cos(x − 60°) for 0° ≤ x ≤ 360°, showing where the curve meets the axes. [3 marks]
5. (A-level only) A sector has radius 5 cm and angle 0.8 radians. Find its arc length, area and perimeter. [3 marks]
6. (A-level only) A chord of a circle of radius 8 cm subtends an angle of 2π/3 at the centre. Find the area of the minor segment. [4 marks]
7. (A-level only) Show that, for small θ, (1 − cos 4θ)/(3θ sin θ) ≈ 8/3. [3 marks]
8. (A-level only) Convert 150° to radians and 1.2 radians to degrees. [2 marks]

## Mark scheme

1. PR² = 144 + 81 − 216 cos 50° (1); PR = 9.28 cm (1); area = ½ × 12 × 9 × sin 50° (1) = 41.4 cm² (1).
2. sin C = 10 sin 35° / 7 = 0.819 (1); C = 55.0° (1); or C = 125.0° (1).
3. (a) −√3/2 (1). (b) √3/2 (1). (c) −√3/2 (1). (d) 1 (1).
4. Cosine shape moved 60° right (1); (0, 1/2) (1); (150°, 0) and (330°, 0) (1).
5. Arc 4 cm (1); area 10 cm² (1); perimeter 14 cm (1).
6. Sector ½ × 64 × 2π/3 = 67.02 (1); triangle ½ × 64 × sin(2π/3) = 27.71 (1); subtract (1); 39.3 cm² (1).
7. 1 − cos 4θ ≈ 1 − (1 − 16θ²/2) = 8θ² (1); 3θ sin θ ≈ 3θ² (1); ratio 8/3 (1).
8. 5π/6 (1); 68.8° (1).
