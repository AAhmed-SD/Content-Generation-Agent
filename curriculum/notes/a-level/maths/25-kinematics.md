---
level: A-level
subject: Mathematics
topic: "Kinematics: graphs, constant acceleration and calculus"
as_content: "Motion in a straight line (language, graphs, constant acceleration formulae and calculus) is AS. Extending constant acceleration and calculus to two dimensions with vectors is A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["Q1", "Q2", "Q3", "Q4"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["M7.1", "M7.2", "M7.3", "M7.4"]
  - board: OCR
    code: "H240"
    spec_refs: ["3.02a", "3.02b", "3.02c", "3.02d", "3.02e", "3.02f", "3.02g"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Mk1", "Mk2", "Mk3", "Mk4", "Mk5", "Mk6", "Mk7", "Mk8", "Mk9", "Mk10", "Mk11", "Mk12"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Kinematics: graphs, constant acceleration and calculus

This file covers the language of motion, displacement-time and velocity-time graphs, the constant acceleration (suvat) formulae, vertical motion under gravity, and using calculus when acceleration varies. Projectiles are in file 26.

## Overview

AS: motion in a straight line, including vertical motion under gravity. A-level only: the same ideas in two dimensions using vectors.

### Board differences

- AQA Q1 to Q4; Edexcel Mechanics 7.1 to 7.4.
- OCR H240: 3.02a to 3.02d and 3.02f (AS); 3.02e and 3.02g (A-level only).
- OCR MEI H640: Mk1 to Mk8 (AS); Mk9 to Mk12 (A-level only). Mk11 asks for the Cartesian equation of a path given the position vector in terms of time.
- The DfE content asks you to derive the constant acceleration formulae as well as use them (AQA Q3 and Edexcel 7.3 say "derive").

## Q1 The language of kinematics

*Refs: AQA Q1 · Edexcel Mechanics 7.1 · OCR 3.02a · MEI Mk1, Mk2, Mk3. Level: AS & A.*

### What you need to know

- Position: where an object is, relative to a fixed origin.
- Displacement: change in position; a vector (has direction). Distance travelled: total length of path; a scalar.
- Velocity: rate of change of displacement; a vector. Speed: the magnitude of velocity; a scalar.
- Acceleration: rate of change of velocity; a vector.
- Average speed = total distance ÷ total time. Average velocity = displacement ÷ time.

### Explained

In one dimension, direction is shown by sign: choose a positive direction and stick to it. A ball thrown up and caught at the same height has displacement 0, but has travelled a positive distance.

A negative acceleration does not always mean slowing down: if the velocity is also negative, the object is speeding up in the negative direction.

### Worked example

A runner goes 300 m east in 60 s, then 100 m west in 40 s. Find the average speed and average velocity.

1. Distance 400 m in 100 s: average speed 4 m s⁻¹.
2. Displacement 200 m east in 100 s: average velocity 2 m s⁻¹ east.

### Common mistakes

- Using displacement where the question asks for distance travelled.

## Q2 Kinematics graphs

*Refs: AQA Q2 · Edexcel Mechanics 7.2 · OCR 3.02b, 3.02c · MEI Mk4. Level: AS & A.*

### What you need to know

- Displacement-time graph: gradient = velocity.
- Velocity-time graph: gradient = acceleration; area between the graph and the time axis = displacement (area below the axis counts as negative displacement).

### Explained

On a velocity-time graph, straight sections mean constant acceleration, and the area splits into triangles, rectangles and trapezia. Distance travelled is the total area counting all parts as positive; displacement subtracts areas below the axis.

Many questions give a journey in words and ask you to sketch the graph first, then use areas to find an unknown time or speed.

### Worked example

A train accelerates uniformly from rest to 12 m s⁻¹ in 4 s, travels at 12 m s⁻¹ for 10 s, then decelerates uniformly to rest in 6 s. Find the accelerations and the total distance.

1. Accelerations: 12/4 = 3 m s⁻² and −12/6 = −2 m s⁻².
2. Area: ½ × 4 × 12 + 10 × 12 + ½ × 6 × 12 = 24 + 120 + 36 = 180 m.

A car starts at 5 m s⁻¹, accelerates uniformly to 17 m s⁻¹ in 6 s, travels at 17 m s⁻¹ for T s, then decelerates at 1.7 m s⁻² to rest. The total distance is 559 m. Find T.

1. First part: ½(5 + 17) × 6 = 66 m.
2. Last part: time 17/1.7 = 10 s, distance ½ × 10 × 17 = 85 m.
3. Middle: 17T = 559 − 66 − 85 = 408, so T = 24 s.

### Common mistakes

- Reading the gradient of a velocity-time graph as velocity.
- Adding areas below the axis when the question asks for displacement.

## Q3 Constant acceleration formulae

*Refs: AQA Q3 · Edexcel Mechanics 7.3 · OCR 3.02d, 3.02e · MEI Mk7, Mk8, Mk9, Mk10. Level: AS & A (part A-level only).*

### What you need to know

- For constant acceleration in a straight line:

```latex
v = u + at \qquad s = \frac{(u+v)}{2}t \qquad s = ut + \tfrac{1}{2}at^2 \qquad s = vt - \tfrac{1}{2}at^2 \qquad v^2 = u^2 + 2as
```

- Derive them from a velocity-time graph or from the definitions.
- Vertical motion under gravity: a = g = 9.8 m s⁻² downwards (or −9.8 if up is positive).
- (A-level only) In two dimensions with vectors: v = u + at, r = ut + ½at² (with r the displacement), and the others with vectors where they make sense.

### Explained

**Derivation.** A straight-line v-t graph from u to v over time t has gradient a, so a = (v − u)/t, giving v = u + at. The area is a trapezium: s = ½(u + v)t. Substituting v = u + at gives s = ut + ½at². Substituting u = v − at gives s = vt − ½at². Eliminating t gives v² = u² + 2as.

**Method.** List s, u, v, a, t; mark the three you know and the one you want; choose the formula that does not contain the fifth. Choose a positive direction and give every vector quantity a sign.

**Vertical motion.** Taking up as positive, a = −9.8. At the highest point v = 0. If an object returns to its starting level, s = 0.

**(A-level only) Vectors.** The same formulae work with vector u, v, a, s. Find the speed as the magnitude of v.

### Worked example

A car moving at 8 m s⁻¹ accelerates at 2 m s⁻² for 5 s. Find its final speed and the distance covered.

1. v = 8 + 2 × 5 = 18 m s⁻¹.
2. s = 8 × 5 + ½ × 2 × 25 = 65 m.

A stone is thrown vertically upwards from ground level at 14.7 m s⁻¹. Find the greatest height and the time until it lands.

1. Up positive, a = −9.8. At the top v = 0: 0 = 14.7² − 2 × 9.8 × s, so s = 11.0 m.
2. Lands when s = 0: 0 = 14.7t − 4.9t², so t = 3 s.

A ball is thrown upwards at 7 m s⁻¹ from a point 20 m above the ground. Find when it hits the ground.

1. Up positive. s = −20, u = 7, a = −9.8.
2. −20 = 7t − 4.9t², so 4.9t² − 7t − 20 = 0.
3. t = (7 + √441)/9.8 = 28/9.8 = 2.86 s (rejecting the negative root).

Car A starts from rest with acceleration 2 m s⁻² just as car B passes it at a constant 15 m s⁻¹. When and where does A catch B?

1. A: s = t². B: s = 15t.
2. t² = 15t, so t = 15 s (t = 0 is the start).
3. Distance 225 m.

(A-level only) A particle has initial velocity (2i − 3j) m s⁻¹ and constant acceleration (0.5i + j) m s⁻². Find its velocity, speed and displacement after 4 s.

1. v = (2i − 3j) + 4(0.5i + j) = 4i + j. Speed √17 = 4.12 m s⁻¹.
2. r = 4(2i − 3j) + ½ × 16 × (0.5i + j) = (8i − 12j) + (4i + 8j) = 12i − 4j m.

### Common mistakes

- Mixing directions: using a = 9.8 with up as positive.
- Using suvat when the acceleration is not constant.

## Q4 Calculus in kinematics

*Refs: AQA Q4 · Edexcel Mechanics 7.4 · OCR 3.02f, 3.02g · MEI Mk5, Mk6, Mk11, Mk12. Level: AS & A (part A-level only).*

### What you need to know

- When acceleration varies:

```latex
v = \frac{dr}{dt} \qquad a = \frac{dv}{dt} = \frac{d^2r}{dt^2} \qquad r = \int v\,dt \qquad v = \int a\,dt
```

- Use initial conditions to find the constants of integration.
- (A-level only) In two dimensions, differentiate and integrate each component of a vector separately.

### Explained

**Differentiate** to go down the chain displacement → velocity → acceleration. **Integrate** to go up it, adding a constant each time (found from the starting position or velocity).

At rest means v = 0. Maximum velocity is when a = 0. To find distance travelled when the particle changes direction, find when v = 0, integrate over each section separately, and add the sizes.

(A-level only) If r = x(t)i + y(t)j, then v = x′(t)i + y′(t)j. The particle moves parallel to i when the j component of v is 0. Eliminating t from x and y gives the Cartesian equation of the path.

### Worked example

A particle moves in a straight line with v = 3t² − 12t + 9 m s⁻¹ for t ≥ 0. Find when it is at rest, its acceleration then, and the distance travelled in the first 3 s.

1. 3(t − 1)(t − 3) = 0, so t = 1 and t = 3.
2. a = 6t − 12: −6 m s⁻² at t = 1, +6 m s⁻² at t = 3.
3. s = t³ − 6t² + 9t (starting at s = 0). s(1) = 4, s(3) = 0.
4. Distance: 4 m out and 4 m back, so 8 m (although the displacement is 0).

A particle has a = 6 − 2t m s⁻² and starts with velocity 4 m s⁻¹. Find its maximum velocity.

1. v = 6t − t² + 4 (using v = 4 at t = 0).
2. Maximum when a = 0: t = 3, v = 18 − 9 + 4 = 13 m s⁻¹.

(A-level only) r = (t³ − 3t)i + (2t² + 1)j. Find the velocity and acceleration at t = 2, and the speed then.

1. v = (3t² − 3)i + 4tj. At t = 2: 9i + 8j.
2. a = 6ti + 4j. At t = 2: 12i + 4j.
3. Speed √(81 + 64) = √145 = 12.0 m s⁻¹.

(A-level only) A particle has position r = 2ti + (t² − 1)j. Find the Cartesian equation of its path.

1. x = 2t, so t = x/2.
2. y = x²/4 − 1.

### Common mistakes

- Using suvat with a variable acceleration.
- Forgetting the constant of integration.
- Giving displacement when the particle turns round and the question asks for distance.

## Check questions

1. A car starts at 5 m s⁻¹ and accelerates uniformly to 17 m s⁻¹ in 6 s. It then travels at 17 m s⁻¹ for T s and decelerates at 1.7 m s⁻² to rest. The total distance is 559 m. Sketch the velocity-time graph and find T. [5 marks]
2. A train slows uniformly from 30 m s⁻¹ to 12 m s⁻¹ over 315 m. Find the deceleration and the time taken. [4 marks]
3. A ball is projected vertically upwards at 19.6 m s⁻¹ from a point 2 m above the ground. Find the length of time for which it is more than 15 m above the ground. [5 marks]
4. A particle moves in a straight line with v = 6t − t² for 0 ≤ t ≤ 6. Find its greatest speed, its acceleration when t = 4, and the distance travelled. [5 marks]
5. Particle A starts from rest at O and accelerates at 2 m s⁻² towards B, 100 m away. At the same moment particle B moves from B towards O at a constant 5 m s⁻¹. Find when they meet. [4 marks]
6. (A-level only) A particle starts at O with velocity (4i − 2j) m s⁻¹ and constant acceleration (−i + 3j) m s⁻². Find (a) when it is moving parallel to i; (b) its distance from O when t = 2. [5 marks]
7. (A-level only) r = (2t² − 5t)i + (t³ − 12t)j. Find the time when the particle is moving parallel to i, and its position then. [4 marks]

## Mark scheme

1. Graph with three sections (1); 66 m and 85 m for the first and last parts (2); 17T = 408 (1); T = 24 (1).
2. 12² = 30² + 2a(315) (1); a = −1.2, deceleration 1.2 m s⁻² (1); 12 = 30 − 1.2t (1); t = 15 s (1).
3. Displacement +13 m from the start (1); 13 = 19.6t − 4.9t² (1); t = 0.839 and 3.161 (2); time 2.32 s (1).
4. Greatest speed at t = 3 (1): 9 m s⁻¹ (1); a = 6 − 2t = −2 m s⁻² at t = 4 (1); v ≥ 0 throughout, so distance = ∫₀⁶(6t − t²) dt (1) = 36 m (1).
5. A: s = t²; B has gone 5t (1); t² + 5t = 100 (1); t = (−5 + √425)/2 (1) = 7.81 s (1).
6. (a) v = (4 − t)i + (−2 + 3t)j (1); j component 0 at t = 2/3 s (1). (b) r = (4t − ½t²)i + (−2t + 1.5t²)j (1); r = 6i + 2j at t = 2 (1); distance √40 = 6.32 m (1).
7. v = (4t − 5)i + (3t² − 12)j (1); 3t² − 12 = 0, t = 2 (1); r = (8 − 10)i + (8 − 24)j (1) = −2i − 16j (1).
