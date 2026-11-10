---
level: A-level
subject: Physics
topic: "Motion in a straight line, projectiles, drag and Newton's laws"
as_content: "AS & A for every board."
boards:
  - board: AQA
    code: "7408"
    spec_refs: ["3.4.1.3", "3.4.1.4", "3.4.1.5", "RP3"]
  - board: Edexcel
    code: "9PH0"
    spec_refs: ["9", "10", "11", "15", "17", "18", "19", "20", "CP1"]
  - board: OCR A
    code: "H556"
    spec_refs: ["3.1.1(a)", "3.1.1(b)", "3.1.1(c)", "3.1.1(d)", "3.1.2(a)", "3.1.2(b)", "3.1.2(c)", "3.1.3(a)", "3.1.3(b)", "3.2.1(a)", "3.2.1(b)", "3.2.1(c)", "3.2.1(d)", "3.2.1(f)", "3.2.2(a)", "3.2.2(b)", "3.2.2(c)", "3.2.2(d)", "3.5.1(a)"]
  - board: OCR B
    code: "H557"
    spec_refs: ["4.2(a)(ii)", "4.2(a)(vii)", "4.2(a)(viii)", "4.2(b)(ii)", "4.2(c)(iii)", "4.2(c)(v)", "4.2(c)(xi)", "4.2(d)(i)", "4.2(d)(ii)", "4.2(d)(iii)"]
  - board: Eduqas
    code: "A420QS"
    spec_refs: ["C1.2(a)", "C1.2(b)", "C1.2(c)", "C1.2(d)", "C1.2(e)", "C1.2(f)", "C1.2(g)", "C1.3(a)", "C1.3(c)"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/physics-2015.html
  OCR A: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-a-h156-h556-from-2015/
  OCR B: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-b-advancing-physics-h157-h557-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/physics-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/a-level-aqa/
---

# Motion in a straight line, projectiles, drag and Newton's laws

This file covers how to describe motion (displacement, velocity, acceleration and their graphs), the equations for uniform acceleration, free fall and AQA required practical 3, projectiles, friction, drag and terminal speed, and Newton's three laws.

## Overview

AS & A for every board. Momentum and impulse are in file 08. Viscous drag and Stokes' law (Edexcel, OCR A) are in file 30. Circular motion is in file 12.

### Board differences

- AQA 3.4.1.3 to 3.4.1.5, RP3 · Edexcel 9 to 11, 15, 17 to 20, CP1 · OCR A 3.1, 3.2.1, 3.2.2, 3.5.1(a) · OCR B 4.2 · Eduqas C1.2, C1.3(a), (c).
- Measuring g: AQA RP3, Edexcel CP1, OCR A 3.1.2(b)(ii) (PAG1), OCR B 4.2(d)(ii), Eduqas specified practical.
- OCR A 3.1.2(c) asks for stopping distance: reaction time, thinking distance and braking distance. No other board names it.
- OCR B 4.2(c)(xi) asks you to model motion in small time steps (iterative modelling, by spreadsheet or by hand).
- Eduqas specified practical: investigating Newton's second law.
- OCR A 3.2.2 asks for factors affecting drag and techniques to find terminal velocity (PAG1); OCR B 4.2(d)(iii) terminal velocity of a ball bearing in oil or paper cones.
- AQA asks for lift (qualitatively); others do not.

## 3.4.1.3 Motion along a straight line

*Refs: AQA 3.4.1.3, RP3 · Edexcel 9, 10, 11, 19, CP1 · OCR A 3.1.1(a) to (d), 3.1.2(a) to (c) · OCR B 4.2(a)(vii), (b)(ii), (c)(iii), (c)(xi), (d)(i), (ii) · Eduqas C1.2(a) to (e). Level: AS & A.*

### What you need to know

- Displacement, speed, velocity and acceleration; instantaneous and average velocity.
- v = Δs/Δt and a = Δv/Δt.
- Gradients and areas of displacement–time, velocity–time and acceleration–time graphs, for uniform and non-uniform acceleration (e.g. a bouncing ball).
- The four equations of uniformly accelerated motion (suvat) and how to derive them.
- The acceleration due to gravity, g.
- AQA required practical 3 / Edexcel CP1: g by free fall.

### Explained

| Quantity | Definition | Type |
| --- | --- | --- |
| Displacement s | Distance in a stated direction from the start point | Vector |
| Speed | Distance travelled ÷ time | Scalar |
| Velocity v | Rate of change of displacement, Δs/Δt | Vector |
| Acceleration a | Rate of change of velocity, Δv/Δt | Vector |

*Average* velocity = total displacement ÷ total time. *Instantaneous* velocity is the velocity at one moment = gradient of the tangent to the s–t graph at that time.

**Graphs.**

| Graph | Gradient | Area under line |
| --- | --- | --- |
| Displacement–time | Velocity | (no meaning) |
| Velocity–time | Acceleration | Displacement |
| Acceleration–time | (rate of change of acceleration, not needed) | Change in velocity |

For a curved s–t graph, draw a tangent and find its gradient for instantaneous velocity. For a curved v–t graph, estimate the area by counting squares or splitting into trapezia.

**Bouncing ball** (dropped, upward positive). v–t graph: straight lines of gradient −g while in the air (falling: v becomes more negative; after the bounce, v jumps to a positive value and decreases). At each bounce, the velocity changes direction almost instantly. Each bounce is lower because energy is lost, so the positive velocity after each bounce is smaller. The areas above and below the axis between bounces give the heights.

**Equations of uniform acceleration.** Only valid when a is constant.

- v = u + at (from a = (v − u)/t)
- s = ½(u + v)t (average velocity × time)
- s = ut + ½at² (substitute v)
- v² = u² + 2as (eliminate t)

Derivations from the v–t graph: a straight line from u to v over time t. Its gradient a gives v = u + at. The area is a trapezium, s = ½(u + v)t; split into a rectangle ut and a triangle ½(v − u)t = ½at², giving s = ut + ½at².

Choose a positive direction and stick to it: for a ball thrown upwards, if up is positive, a = −9.81 m s⁻².

**Free fall.** An object falling with only gravity acting has acceleration g = 9.81 m s⁻² near the Earth's surface, whatever its mass.

**Stopping distance** (OCR A 3.1.2(c)). Stopping distance = thinking distance + braking distance. Thinking distance = speed × reaction time (constant speed during reaction time). Braking distance = v²/2a (from v² = u² + 2as with final speed 0), so it rises with the square of speed. Tiredness, alcohol, drugs and distraction increase reaction time; worn tyres, wet or icy roads, heavy loads and worn brakes increase braking distance.

**Iterative modelling** (OCR B 4.2(c)(xi)). Split time into small steps Δt. In each step: new velocity = old velocity + aΔt; new displacement = old displacement + vΔt. Repeat. With a constant force this reproduces the suvat results as Δt gets smaller; the same method can handle forces that change (drag, springs, gravity in orbits).

### Worked example

1. A car accelerates uniformly from 8.0 m s⁻¹ to 20 m s⁻¹ in 6.0 s. Find its acceleration and the distance travelled.

   a = (20 − 8)/6 = 2.0 m s⁻². s = ½(8 + 20) × 6 = 84 m.

2. A ball is thrown upwards at 15 m s⁻¹ from a cliff 25 m above the sea. How long before it hits the sea? (up positive, g = 9.81)

   s = −25 m, u = 15, a = −9.81. −25 = 15t − 4.905t². 4.905t² − 15t − 25 = 0. t = [15 + √(225 + 490.5)]/9.81 = (15 + 26.75)/9.81 = 4.26 s.

3. A driver with reaction time 0.70 s travels at 25 m s⁻¹. Braking deceleration is 6.5 m s⁻². Find the stopping distance (OCR A).

   Thinking = 25 × 0.70 = 17.5 m. Braking = 25²/(2 × 6.5) = 48.1 m. Total = 65.6 m.

4. (OCR B) Model a ball dropped from rest using Δt = 0.1 s for two steps.

   Step 1: v = 0 + 9.81 × 0.1 = 0.981 m s⁻¹; s = 0 + 0.981 × 0.1 = 0.098 m. Step 2: v = 1.962 m s⁻¹; s = 0.098 + 0.196 = 0.294 m. (Exact: ½ × 9.81 × 0.2² = 0.196 m. The model overestimates because it uses the end-of-step velocity; smaller Δt makes it more accurate.)

### Common mistakes

- Using suvat when acceleration is not constant.
- Mixing signs: if up is positive, g is negative.
- Reading displacement from the gradient of a v–t graph.
- Using total distance where total displacement is asked (a ball thrown up and caught has zero displacement).

### Practical

**AQA required practical 3** (also Edexcel CP1, OCR A 3.1.2(b)(ii) PAG1, OCR B 4.2(d)(ii), Eduqas specified practical): determine g by a free-fall method.

*Electromagnet and trapdoor.* A steel ball is held by an electromagnet above a trapdoor. Switching off the magnet starts an electronic timer; the ball hitting the trapdoor stops it. Measure the height h (bottom of the ball to the trapdoor) with a metre rule. Repeat each height three times and average t. Vary h from about 0.2 m to 1.0 m.

Since u = 0, h = ½gt². Plot h against t²: straight line through the origin, gradient = g/2, so g = 2 × gradient.

*Light gate alternative.* Drop a card or a picket fence (interrupt card) through one or two light gates; data logger records speeds; v² = 2gh, or a = (v₂ − v₁)/Δt.

Errors: the magnet may hold the ball briefly after the current is switched off (residual magnetism), adding a constant delay; use a small current or a paper spacer. A systematic error in h (measuring from the wrong point) gives an intercept but not a change in gradient. Air resistance is negligible for a small dense ball. Random error: repeat and average. Safety: catch the ball so it does not roll away; keep feet clear.

## 3.4.1.4 Projectile motion

*Refs: AQA 3.4.1.4 · Edexcel 15 · OCR A 3.1.3(a), (b), 3.2.2(a) to (d) · OCR B 4.2(a)(ii), (d)(iii) · Eduqas C1.2(f), (g). Level: AS & A.*

### What you need to know

- Horizontal and vertical motions of a projectile in a uniform gravitational field are independent.
- Solve projectile problems with suvat.
- Friction qualitatively; lift and drag qualitatively (AQA).
- Air resistance increases with speed; terminal speed.
- The effect of air resistance on the path of a projectile and on the top speed of a vehicle.
- (OCR A) Factors affecting drag; motion of objects falling with and without air resistance.

### Explained

**Independence.** Ignoring air resistance, the only force on a projectile is its weight, which acts vertically. So:

- Horizontally: no force, so constant velocity: x = u_x t, where u_x = u cos θ.
- Vertically: constant acceleration g downwards: y = u_y t − ½gt², where u_y = u sin θ.
- Time links the two.

A ball dropped and a ball fired horizontally from the same height land at the same time.

For a launch from level ground at angle θ with speed u:

- Time of flight: 2u sin θ / g.
- Maximum height: u² sin²θ / 2g.
- Range: u² sin 2θ / g, greatest at θ = 45°.

The path (with no air resistance) is a parabola.

**Friction** is a force that opposes relative motion (or the tendency to move) between surfaces in contact. It transfers kinetic energy to thermal energy.

**Drag** is the resistive force on an object moving through a fluid. It increases with speed (roughly ∝ v² for large, fast objects such as cars; ∝ v at low speed for small objects, see file 30). It depends on the object's cross-sectional area and shape, and on the fluid's density and viscosity.

**Lift** (AQA) is an upward force on an object moving through a fluid, at right angles to the flow, caused by the shape or angle of the object deflecting the fluid downwards (an aircraft wing, a spinning ball).

**Terminal speed.** When an object falls through a fluid:

1. At first, speed is low, drag is small, and the resultant force ≈ weight, so a ≈ g.
2. As speed rises, drag rises, the resultant force falls, so acceleration falls.
3. Eventually drag (plus any upthrust) equals weight: resultant force zero, acceleration zero, constant terminal speed.

A skydiver opening a parachute: area increases, drag jumps above weight, the diver decelerates until a new, lower terminal speed is reached.

v–t graph for a falling object with drag: starts with gradient g, curves over, levels off at terminal speed.

**Vehicles.** The maximum speed of a car is reached when the driving force equals the total resistive force (drag + friction). A streamlined shape (lower drag) or a more powerful engine (greater driving force) raises the top speed.

**Air resistance and projectiles.** Drag reduces horizontal speed, so the range is shorter. The path is no longer symmetrical: the descent is steeper than the ascent, and the maximum height is lower.

### Worked example

1. A ball is kicked at 18 m s⁻¹ at 35° above horizontal from level ground. Find the time of flight, the range and the maximum height.

   u_y = 18 sin 35° = 10.32 m s⁻¹, u_x = 18 cos 35° = 14.74 m s⁻¹. Time to top = 10.32/9.81 = 1.052 s; flight = 2.10 s. Range = 14.74 × 2.10 = 31.0 m. Max height = 10.32²/(2 × 9.81) = 5.43 m.

2. A stone is thrown horizontally at 12 m s⁻¹ from a 20 m high cliff. How far from the base does it land, and with what speed?

   Vertical: 20 = 4.905t², t = 2.02 s. Horizontal: x = 12 × 2.02 = 24.2 m. v_y = 9.81 × 2.02 = 19.8 m s⁻¹. Speed = √(12² + 19.8²) = 23.2 m s⁻¹.

### Common mistakes

- Using the total speed u in the vertical equation instead of u sin θ.
- Saying the horizontal velocity changes during flight (with no air resistance).
- Saying at terminal velocity there is no force acting (forces balance; resultant is zero).
- Saying a heavier object falls faster in a vacuum.

## 3.4.1.5 Newton's laws of motion

*Refs: AQA 3.4.1.5 · Edexcel 17, 18, 20 · OCR A 3.2.1(a) to (d), (f), 3.5.1(a) · OCR B 4.2(a)(viii), (c)(v) · Eduqas C1.3(a), (c). Level: AS & A.*

### What you need to know

- Newton's three laws and how to apply them.
- F = ma for constant mass.
- (Edexcel 18, OCR A 3.2.1(c)) Weight W = mg; gravitational field strength g = F/m.
- (OCR A 3.2.1(d)) Tension, normal contact force, upthrust and friction.
- Newton's third law pairs: equal, opposite, same type, act on different bodies.

### Explained

**First law.** An object stays at rest, or moves with constant velocity, unless a resultant force acts on it.

**Second law.** The resultant force on an object is proportional to its rate of change of momentum. For a constant mass this becomes **F = ma**, where F is the resultant force. One newton is the force that gives 1 kg an acceleration of 1 m s⁻².

**Third law.** If body A exerts a force on body B, then B exerts a force on A that is equal in size and opposite in direction. The two forces:

- act on different bodies;
- are the same type of force (both gravitational, both contact, both electrostatic...);
- have the same line of action.

Example: the Earth pulls a book down (its weight); the book pulls the Earth up with an equal gravitational force. The table's upward push on the book is *not* the third-law pair of the book's weight (it is a contact force, and both act on the book); its pair is the book's downward push on the table.

**Weight and mass.** W = mg, where g is the gravitational field strength (9.81 N kg⁻¹ on Earth). Mass is the amount of matter and is the same everywhere; weight depends on g.

**Applying F = ma.**

1. Draw a free-body diagram for each object.
2. Find the resultant force along the direction of acceleration.
3. Use F = ma (for connected objects, either for the whole system or for each part).

**Lifts.** In a lift accelerating upwards at a, a person's apparent weight (the reading on scales, which is the normal contact force R) is R = m(g + a). Accelerating downwards: R = m(g − a). In free fall, R = 0 (weightlessness).

**Connected bodies.** Two masses joined by a string over a pulley (Atwood machine): the whole system accelerates at a = (m₁ − m₂)g/(m₁ + m₂) if friction is negligible.

### Worked example

1. A 1200 kg car has a driving force of 3000 N and total resistive force of 900 N. Find its acceleration.

   F = 3000 − 900 = 2100 N. a = 2100/1200 = 1.75 m s⁻².

2. A 60 kg person stands on scales in a lift accelerating downwards at 1.5 m s⁻². Find the scale reading.

   R = m(g − a) = 60 × (9.81 − 1.5) = 499 N.

3. A 2.0 kg trolley on a smooth table is pulled by a string over a pulley attached to a 0.50 kg hanging mass. Find the acceleration and the tension.

   Whole system: a = 0.50 × 9.81 / 2.5 = 1.96 m s⁻². Trolley: T = 2.0 × 1.96 = 3.9 N. (Check hanging mass: 4.905 − 3.9 = 0.50 × 1.96 ✓.)

### Common mistakes

- Using the driving force in F = ma instead of the resultant force.
- Naming weight and normal contact force as a third-law pair.
- Saying a moving object needs a resultant force to keep moving at constant velocity.
- Forgetting that the tension in the string in the pulley problem is less than the hanging weight when it accelerates.

### Practical

**Investigating Newton's second law** (Eduqas specified practical; suggested by AQA and OCR B). A trolley on a friction-compensated runway (tilted until the trolley rolls at constant speed when pushed) is pulled by a string over a pulley by hanging masses. Measure acceleration with two light gates (a = (v₂² − v₁²)/2s) or a light gate and a double card. To vary force but keep total mass constant, move masses from the trolley to the hanger. Plot a against F (= m_hanging × g): a straight line through the origin; gradient = 1/total mass. To vary mass at constant force, add masses to the trolley and plot a against 1/m.

**Terminal velocity** (OCR A 3.2.2(d)(ii) PAG1, OCR B 4.2(d)(iii)). Drop paper cones from a set height and film them, or time a ball bearing through marked intervals in a tall tube of oil; when equal intervals take equal times, terminal velocity has been reached.

## Check questions

1. Sketch the velocity–time graph for a ball dropped onto a hard floor that bounces twice. Take upwards as positive. (3 marks)
2. A train decelerates uniformly from 30 m s⁻¹ to rest over 450 m. Find the deceleration and the time taken. (3 marks)
3. Describe how to determine g using an electromagnet, trapdoor and timer, including how to analyse the results. (5 marks)
4. A dart is thrown horizontally at 9.0 m s⁻¹ and hits the board 2.4 m away. How far has it dropped? (3 marks)
5. Explain why a skydiver reaches a terminal velocity. (4 marks)
6. State Newton's third law and give two properties of a pair of forces in it. (3 marks)
7. A 750 kg lift is pulled up by a cable. The tension is 8500 N. Find the acceleration. (2 marks)
8. A golfer hits a ball at 40 m s⁻¹ at 20° to the horizontal. Ignoring air resistance, find its range on level ground. Describe two ways air resistance would change the path. (5 marks)

## Mark scheme

1. Straight lines with the same negative gradient (−g) while in the air (1); velocity jumps from negative to positive at each bounce (1); peak positive velocity after each bounce smaller than the speed just before it (1).
2. a = (0 − 900)/(2 × 450) = −1.0 m s⁻² (deceleration 1.0 m s⁻²) (2); t = 30/1.0 = 30 s (1).
3. Ball held by electromagnet; switching off starts timer; ball hitting trapdoor stops it (1); measure height with metre rule from bottom of ball (1); repeat each height and average; several heights (1); plot h against t² (1); gradient = g/2 (1).
4. t = 2.4/9.0 = 0.267 s (1); drop = ½ × 9.81 × 0.267² (1) = 0.35 m (1).
5. Initially only weight acts, accelerates at g (1); as speed increases drag increases (1); resultant force and acceleration decrease (1); when drag equals weight, resultant zero, speed constant (1).
6. If A exerts a force on B, B exerts an equal and opposite force on A (1); any two: same type of force; act on different bodies; same line of action / equal magnitude and opposite direction (2).
7. F = 8500 − 750 × 9.81 = 1142 N (1); a = 1.5 m s⁻² (1).
8. u_x = 37.6, u_y = 13.7 m s⁻¹ (1); time = 2 × 13.7/9.81 = 2.79 s (1); range = 105 m (1). Range shorter / lower maximum height (1); path not symmetrical, steeper descent (1).
