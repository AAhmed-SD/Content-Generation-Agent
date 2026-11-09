---
level: GCSE
subject: Mathematics
topic: "Geometry: Pythagoras and trigonometry"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8300"
    spec_refs: ["G20", "G21", "G22", "G23"]
  - board: Edexcel
    code: "1MA1"
    spec_refs: ["G20", "G21", "G22", "G23"]
  - board: OCR
    code: "J560"
    spec_refs: ["10.05a", "10.05b", "10.05c", "10.05d", "10.05e"]
  - board: Eduqas
    code: "C300QS"
    spec_refs: ["FG18", "FG19", "HG20", "HG21", "HG22", "HG23"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/gcse/mathematics-8300/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/mathematics-2015.html
  OCR: https://www.ocr.org.uk/qualifications/gcse/mathematics-j560-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/mathematics-gcse/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/gcse-maths/
---

# Geometry: Pythagoras and trigonometry

This file covers Pythagoras' theorem, the trigonometric ratios in right-angled triangles, exact trigonometric values, the sine and cosine rules, the area of a triangle using ½ab sin C, and problems in three dimensions.

## Overview

Pythagoras and right-angled trigonometry in 2D, and the exact values, are on both tiers. Higher only: using these in 3D and in general triangles, the sine rule, the cosine rule, and Area = ½ab sin C.

### Board differences

- AQA and Edexcel: G20 to G23.
- OCR J560: 10.05a (Pythagoras), 10.05b (right-angled trigonometry), 10.05c (exact values), 10.05d (sine rule, Higher) and 10.05e (cosine rule, Higher). OCR lists ½ab sin C under area of a triangle (10.03a).
- Eduqas C300QS: FG18 and FG19 on Foundation; HG20 to HG23 on Higher.
- Graphs of sin, cos and tan are in [06-algebra-graphs.md](06-algebra-graphs.md).

## G20 Pythagoras' theorem and right-angled trigonometry

*Refs: AQA G20 · Edexcel G20 · OCR 10.05a, 10.05b · Eduqas FG18, HG20. Tier: F & H (part Higher only).*

### What you need to know

- Pythagoras' theorem for a right-angled triangle with hypotenuse c:

```latex
a^2 + b^2 = c^2
```

- The trigonometric ratios, where θ is an angle, opp is the side opposite it, adj the side next to it (not the hypotenuse), and hyp the hypotenuse:

```latex
\sin\theta = \frac{\text{opp}}{\text{hyp}} \qquad \cos\theta = \frac{\text{adj}}{\text{hyp}} \qquad \tan\theta = \frac{\text{opp}}{\text{adj}}
```

- Use them to find lengths and angles in right-angled triangles in 2D.
- (HT only) Use them in 3D figures and, where possible, in general triangles (by splitting into right-angled triangles).

### Explained

The hypotenuse is the longest side, opposite the right angle.

Pythagoras: square the two shorter sides and add to find the hypotenuse. To find a shorter side, subtract: b² = c² − a².

Trigonometry: label the sides from the angle you are using, choose the ratio that links the side you know with the side you want (SOH CAH TOA), then solve.

- Finding a side: multiply or divide (for example x = 8 sin 35°, or x = 8 ÷ cos 35°).
- Finding an angle: use the inverse function (sin⁻¹, cos⁻¹, tan⁻¹).

Angles of elevation (looking up from horizontal) and depression (looking down from horizontal) are measured from the horizontal.

(HT only) In 3D, find a right-angled triangle that contains the length or angle you want. Often you need Pythagoras twice: once across the base, then up to the top. The space diagonal of a cuboid a × b × c is √(a² + b² + c²). The angle between a line and a plane is the angle between the line and its "shadow" (projection) on the plane.

### Worked example

A ladder 5.2 m long leans against a wall with its foot 2 m from the wall. How far up the wall does it reach?

1. 5.2² − 2² = 27.04 − 4 = 23.04.
2. √23.04 = 4.8 m.

In triangle ABC, angle B = 90°, AC = 14 cm and angle A = 38°. Find BC.

1. BC is opposite angle A; AC is the hypotenuse. Use sin.
2. BC = 14 sin 38° = 8.62 cm (3 s.f.).

In triangle PQR, angle Q = 90°, PQ = 7 cm and QR = 10 cm. Find angle R.

1. From R: PQ is opposite, QR is adjacent. Use tan.
2. tan R = 7/10, R = tan⁻¹(0.7) = 35.0° (1 d.p.).

Show that a triangle with sides 9, 12 and 15 cm is right-angled.

1. 9² + 12² = 81 + 144 = 225 = 15². So it is right-angled.

(HT only) A cuboid is 8 cm by 6 cm by 5 cm. Find the length of the space diagonal and the angle it makes with the base.

1. Base diagonal: √(64 + 36) = 10 cm.
2. Space diagonal: √(100 + 25) = √125 = 11.2 cm (3 s.f.).
3. Angle with base: tan θ = 5/10, θ = 26.6°.

### Common mistakes

- Adding the squares when finding a shorter side.
- Labelling opp and adj from the wrong angle.
- Calculator in radians mode. Check it shows D or DEG.
- Rounding a side too early and using it in the next step.

## G21 Exact trigonometric values

*Refs: AQA G21 · Edexcel G21 · OCR 10.05c · Eduqas FG19, HG21. Tier: F & H.*

### What you need to know

- Know the exact values of sin θ and cos θ for θ = 0°, 30°, 45°, 60° and 90°, and of tan θ for θ = 0°, 30°, 45° and 60°.

| θ | 0° | 30° | 45° | 60° | 90° |
| --- | --- | --- | --- | --- | --- |
| sin θ | 0 | 1/2 | √2/2 | √3/2 | 1 |
| cos θ | 1 | √3/2 | √2/2 | 1/2 | 0 |
| tan θ | 0 | √3/3 (= 1/√3) | 1 | √3 | not defined |

### Explained

Two triangles help you remember:

- Half of an equilateral triangle with side 2: sides 1, √3 and 2, angles 30°, 60°, 90°.
- A right-angled isosceles triangle with shorter sides 1: hypotenuse √2, angles 45°, 45°, 90°.

Read the ratios off these triangles. The sin values for 0°, 30°, 45°, 60°, 90° are √0/2, √1/2, √2/2, √3/2, √4/2; cos runs the same list backwards.

### Worked example

Without a calculator, find the exact length x in a right-angled triangle where the hypotenuse is 10 cm and x is opposite an angle of 60°.

1. x = 10 sin 60° = 10 × √3/2 = 5√3 cm.

Work out the exact value of sin 30° + cos 60° × tan 45°.

1. 1/2 + 1/2 × 1 = 1.

### Common mistakes

- Swapping sin 30° and sin 60°.
- Thinking tan 90° has a value.

## G22 Sine rule and cosine rule

*Refs: AQA G22 · Edexcel G22 · OCR 10.05d, 10.05e · Eduqas HG22. Tier: Higher only.*

### What you need to know

- (HT only) Know and use the sine rule and cosine rule for any triangle, with sides a, b, c opposite angles A, B, C:

```latex
\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} \qquad\text{or}\qquad \frac{\sin A}{a} = \frac{\sin B}{b} = \frac{\sin C}{c}
```

```latex
a^2 = b^2 + c^2 - 2bc\cos A \qquad \cos A = \frac{b^2 + c^2 - a^2}{2bc}
```

### Explained

(HT only) Which rule?

| You know | You want | Use |
| --- | --- | --- |
| Two angles and a side | Another side | Sine rule |
| Two sides and an angle opposite one of them | Another angle | Sine rule |
| Two sides and the angle between them | The third side | Cosine rule |
| All three sides | An angle | Cosine rule (rearranged) |

(HT only) If the sine rule gives an angle, there may be a second possible (obtuse) answer, 180° minus the first. The question usually tells you if the angle is obtuse.

### Worked example

(HT only) In triangle ABC, a = 9 cm, angle A = 48° and angle B = 70°. Find b.

1. b = 9 sin 70° / sin 48°.
2. b = 11.4 cm (3 s.f.).

(HT only) In triangle PQR, PQ = 7 cm, PR = 11 cm and angle QPR = 120°. Find QR.

1. QR² = 7² + 11² − 2 × 7 × 11 × cos 120°.
2. cos 120° = −0.5, so QR² = 49 + 121 + 77 = 247.
3. QR = 15.7 cm (3 s.f.).

(HT only) A triangle has sides 5 cm, 7 cm and 8 cm. Find the largest angle.

1. The largest angle is opposite 8 cm.
2. cos θ = (5² + 7² − 8²)/(2 × 5 × 7) = 10/70.
3. θ = cos⁻¹(1/7) = 81.8°.

### Common mistakes

- (HT only) Pairing a side with an angle that is not opposite it.
- (HT only) Working out b² + c² − 2bc and then multiplying by cos A. Find 2bc cos A first.
- (HT only) Using the cosine rule on a right-angled triangle when SOH CAH TOA is quicker (both work).

## G23 Area of a triangle using ½ab sin C

*Refs: AQA G23 · Edexcel G23 · OCR none · Eduqas HG23. Tier: Higher only.*

### What you need to know

- (HT only) Use the area formula for any triangle, where C is the angle between sides a and b:

```latex
\text{Area} = \tfrac{1}{2}ab\sin C
```

- (HT only) Rearrange it to find a side or an angle.

### Explained

(HT only) The formula needs two sides and the angle between them. It is the usual ½ × base × height, where the height is b sin C.

### Worked example

(HT only) Find the area of a triangle with sides 8 cm and 13 cm and an included angle of 42°.

1. ½ × 8 × 13 × sin 42° = 34.8 cm² (3 s.f.).

(HT only) A triangle has area 40 cm² and two sides 10 cm and 12 cm. Find the acute angle between them.

1. 40 = ½ × 10 × 12 × sin C = 60 sin C.
2. sin C = 2/3, C = 41.8°.

### Common mistakes

- (HT only) Using an angle that is not between the two sides.

## Check questions

1. A right-angled triangle has shorter sides 7 cm and 24 cm. Find the hypotenuse. [2 marks]
2. A rectangle has diagonal 17 cm and width 8 cm. Find its length. [2 marks]
3. Find the distance between the points (1, 3) and (7, 11). [2 marks]
4. In triangle XYZ, angle Y = 90°, XZ = 20 cm and angle X = 25°. Find XY. [2 marks]
5. A ramp rises 1.5 m over a horizontal distance of 8 m. Find the angle of the ramp to the horizontal. [2 marks]
6. From the top of a 40 m cliff, the angle of depression of a boat is 18°. How far is the boat from the foot of the cliff? [3 marks]
7. Write down the exact value of cos 30° and of tan 60°. [2 marks]
8. A right-angled triangle has hypotenuse 6 cm and an angle of 45°. Find the exact length of each shorter side. [2 marks]
9. (HT only) In triangle ABC, AB = 12 cm, angle C = 64° and angle A = 50°. Find BC. [3 marks]
10. (HT only) In triangle DEF, DE = 6 cm, DF = 9 cm and angle EDF = 35°. Find EF. [3 marks]
11. (HT only) A triangle has sides 4 cm, 6 cm and 9 cm. Find its largest angle. [3 marks]
12. (HT only) Find the area of a triangle with sides 7 cm and 9 cm and an included angle of 110°. [2 marks]
13. (HT only) A cube has edge 10 cm. Find the angle between a space diagonal and the base. [3 marks]

## Mark scheme

1. 7² + 24² = 625 (1); 25 cm (1).
2. 17² − 8² = 225 (1); 15 cm (1).
3. Across 6, up 8 (1); 10 units (1).
4. XY = 20 cos 25° (1) = 18.1 cm (1).
5. tan θ = 1.5/8 (1); θ = 10.6° (1).
6. Angle at the boat (elevation) = 18° (1); tan 18° = 40/d (1); d = 40 ÷ tan 18° = 123 m (1).
7. √3/2 (1); √3 (1).
8. Each side = 6 cos 45° (1) = 6 × √2/2 = 3√2 cm (1).
9. BC is opposite A: BC/sin 50° = 12/sin 64° (1); BC = 12 sin 50°/sin 64° (1) = 10.2 cm (1).
10. EF² = 36 + 81 − 108 cos 35° (1) = 28.53… (1); EF = 5.34 cm (1).
11. Largest angle opposite 9 cm (1); cos θ = (16 + 36 − 81)/48 = −29/48 (1); θ = 127.2° (1).
12. ½ × 7 × 9 × sin 110° (1) = 29.6 cm² (1).
13. Base diagonal √200 = 14.14 cm (1); tan θ = 10/14.14 (1); θ = 35.3° (1).
