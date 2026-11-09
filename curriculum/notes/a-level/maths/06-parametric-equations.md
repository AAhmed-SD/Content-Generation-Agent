---
level: A-level
subject: Mathematics
topic: "Parametric equations"
as_content: "All of this file is A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["C3", "C4"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P3.3", "P3.4"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.03g", "1.03h"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Mg12", "Mg13", "Mg14", "Mg16"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Parametric equations

This file covers curves given by a pair of equations x = f(t), y = g(t), converting them to Cartesian form, finding points and intersections, and using parametric equations as models. Differentiating parametric equations is in file 13.

## Overview

All A-level only. Parametric equations reappear in differentiation (file 13), in kinematics where position is given as a function of time (file 25), and in projectiles (file 26).

### Board differences

- AQA C3, C4; Edexcel 3.3, 3.4; OCR H240 1.03g, 1.03h.
- OCR MEI H640: Mg12 to Mg14 and Mg16. Mg14 names the parametric form of a circle (x = a + r cos θ, y = b + r sin θ) explicitly. The parametric gradient, Mg15, is in file 13.

## C3 Parametric equations of curves

*Refs: AQA C3 · Edexcel 3.3 · OCR 1.03g · MEI Mg12, Mg13, Mg14. Level: A-level only.*

### What you need to know

- (A-level only) A parameter t (or θ) gives both coordinates: x = f(t), y = g(t). Each value of t gives one point.
- (A-level only) Convert to Cartesian form by eliminating the parameter.
- (A-level only) Find the domain and range of the Cartesian form from the range of t.
- (A-level only) Find where a parametric curve meets a line or an axis.

### Explained

**Eliminating the parameter.** Two main methods:

1. Make t the subject of the simpler equation and substitute into the other.
2. If the equations involve sin t and cos t, use an identity such as sin²t + cos²t = 1, or a double angle formula (file 10).

**Circles.**

```latex
x = a + r\cos\theta,\; y = b + r\sin\theta \iff (x-a)^2 + (y-b)^2 = r^2
```

**Domain and range.** The Cartesian equation may describe more of a curve than the parametric one. If x = t² then x ≥ 0 only, even though the Cartesian equation might make sense for negative x. Always state the domain the parameter allows.

**Intersections.** To find where the curve meets the line ax + by = c, substitute the parametric expressions into the line to get an equation in t. Solve it, then find x and y from each t. To find where it meets the x-axis, solve y(t) = 0.

### Worked example

(A-level only) Find the Cartesian equation of x = t + 1, y = t².

1. t = x − 1.
2. y = (x − 1)².

(A-level only) Find the Cartesian equation of x = 2 + 5cos θ, y = −1 + 5sin θ, and describe the curve.

1. cos θ = (x − 2)/5 and sin θ = (y + 1)/5.
2. cos²θ + sin²θ = 1 gives (x − 2)² + (y + 1)² = 25.
3. A circle with centre (2, −1) and radius 5.

(A-level only) Find the Cartesian equation of x = 1/t, y = t + 2, t ≠ 0.

1. t = 1/x.
2. y = 1/x + 2, x ≠ 0.

(A-level only) A curve has x = sin t, y = cos 2t for 0 ≤ t ≤ π/2. Find its Cartesian equation and domain.

1. cos 2t = 1 − 2sin²t (file 10), so y = 1 − 2x².
2. For 0 ≤ t ≤ π/2, sin t goes from 0 to 1, so 0 ≤ x ≤ 1.

(A-level only) The curve x = t², y = 2t meets the line y = x − 3. Find the points of intersection.

1. 2t = t² − 3, so t² − 2t − 3 = 0, (t − 3)(t + 1) = 0.
2. t = 3: (9, 6). t = −1: (1, −2).

(A-level only) A curve has x = t² + 1, y = 2t for −1 ≤ t ≤ 2. Find the Cartesian equation, and the ranges of x and y.

1. t = y/2, so x = y²/4 + 1.
2. y goes from −2 to 4. x = t² + 1 is smallest at t = 0 (x = 1) and largest at t = 2 (x = 5), so 1 ≤ x ≤ 5.

### Common mistakes

- Forgetting the restriction the parameter places on x or y.
- Not squaring the whole expression: from cos θ = (x − 2)/5, cos²θ = (x − 2)²/25.
- Giving only t values when the question asks for points.

## C4 Parametric equations in modelling

*Refs: AQA C4 · Edexcel 3.4 · OCR 1.03h · MEI Mg16. Level: A-level only.*

### What you need to know

- (A-level only) Use parametric equations to model motion and shapes, with t often meaning time.
- (A-level only) Interpret the parameter and the restrictions on it in context.

### Explained

Parametric models are natural for motion: the horizontal and vertical positions are each functions of time. A ball thrown from ground level might have x = ut, y = vt − 4.9t². The flight ends when y = 0 again, which fixes the largest sensible t.

Shapes such as a running track, a cam or a fairground ride are often described parametrically using sin and cos. A model is only valid where its assumptions hold: no air resistance, a flat surface, a rigid object.

### Worked example

(A-level only) A ball is kicked from ground level. Its position after t seconds is x = 20t, y = 15t − 4.9t² (metres). Find how far it travels horizontally before landing, and find the Cartesian equation of its path.

1. Lands when y = 0: t(15 − 4.9t) = 0, so t = 15/4.9 = 3.06 s (3 s.f.).
2. x = 20 × 3.061... = 61.2 m (3 s.f.).
3. t = x/20, so y = 15(x/20) − 4.9(x/20)² = 0.75x − 0.01225x².
4. Valid for 0 ≤ x ≤ 61.2.

(A-level only) A Ferris wheel seat moves with x = 12sin(πt/10), y = 14 − 12cos(πt/10), where t is in minutes and y is height above the ground in metres. Find the highest point and the time for one revolution.

1. y is greatest when cos(πt/10) = −1: y = 26 m.
2. One revolution: πt/10 = 2π, so t = 20 minutes.
3. The lowest height is 14 − 12 = 2 m, which is the boarding platform height.

### Common mistakes

- Using negative t or times after landing.
- Using degrees where the model uses radians.

## Check questions

1. (A-level only) Find the Cartesian equation of x = 2t − 1, y = t² + 3. [3 marks]
2. (A-level only) A curve has x = 4cos θ, y = 4sin θ − 1. Show that it is a circle and give its centre and radius. [3 marks]
3. (A-level only) Find the Cartesian equation of x = 3/t, y = t − 1 (t ≠ 0), in the form y = f(x). [3 marks]
4. (A-level only) A curve has x = t², y = t³ for t ≥ 0. Find its Cartesian equation in the form y = f(x). [2 marks]
5. (A-level only) The curve x = t − 2, y = t² meets the line y = 2x + 7. Find the coordinates of the points of intersection. [5 marks]
6. (A-level only) A curve has x = sin t, y = cos 2t for −π/2 ≤ t ≤ π/2. Show that y = 1 − 2x², and state the domain of x. [4 marks]
7. (A-level only) A ball is thrown so that x = 12t and y = 1.5 + 9t − 4.9t², in metres, t seconds after release. (a) Find the time when the ball hits the ground. (b) Find the horizontal distance travelled. (c) Give one limitation of the model. [6 marks]

## Mark scheme

1. t = (x + 1)/2 (1); substitute (1); y = (x + 1)²/4 + 3 (1).
2. cos θ = x/4, sin θ = (y + 1)/4 (1); x² + (y + 1)² = 16 (1); centre (0, −1), radius 4 (1).
3. t = 3/x (1); y = 3/x − 1 (1); or y = (3 − x)/x (1).
4. t = x^{1/2} (1); y = x^{3/2} (1).
5. t² = 2(t − 2) + 7 (1); t² − 2t − 3 = 0 (1); t = 3 or t = −1 (1); (1, 9) (1); (−3, 1) (1).
6. cos 2t = 1 − 2sin²t (1); substitute sin t = x (1); y = 1 − 2x² (1); −1 ≤ x ≤ 1 (1).
7. (a) 4.9t² − 9t − 1.5 = 0 (1); formula (1); t = 1.99 s, rejecting the negative root (1). (b) x = 12 × 1.99 = 23.9 m (1) (accept 23.8 to 24.0). (c) One limitation, e.g. air resistance ignored, or the ball treated as a particle, or g taken as exactly 9.8 (2).
