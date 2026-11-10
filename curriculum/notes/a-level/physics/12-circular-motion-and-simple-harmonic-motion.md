---
level: A-level
subject: Physics
topic: "Circular motion, simple harmonic motion, damping and resonance"
as_content: "A-level only for every board."
boards:
  - board: AQA
    code: "7408"
    spec_refs: ["3.6.1.1", "3.6.1.2", "3.6.1.3", "3.6.1.4", "RP7"]
  - board: Edexcel
    code: "9PH0"
    spec_refs: ["103", "104", "105", "106", "107", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190", "191", "CP16"]
  - board: OCR A
    code: "H556"
    spec_refs: ["5.2.1(a)", "5.2.1(b)", "5.2.1(c)", "5.2.2(a)", "5.2.2(b)", "5.2.2(c)", "5.2.2(d)", "5.3.1(a)", "5.3.1(b)", "5.3.1(c)", "5.3.1(d)", "5.3.1(e)", "5.3.1(f)", "5.3.1(g)", "5.3.2(a)", "5.3.2(b)", "5.3.3(a)", "5.3.3(b)", "5.3.3(c)", "5.3.3(d)", "5.3.3(e)"]
  - board: OCR B
    code: "H557"
    spec_refs: ["5.1.1(a)(v)", "5.1.1(a)(vi)", "5.1.1(a)(vii)", "5.1.1(a)(viii)", "5.1.1(b)(iii)", "5.1.1(b)(vii)", "5.1.1(b)(viii)", "5.1.1(c)(vi)", "5.1.1(c)(vii)", "5.1.1(c)(viii)", "5.1.1(c)(ix)", "5.1.1(c)(x)", "5.1.1(c)(xi)", "5.1.1(d)(i)", "5.1.1(d)(ii)", "5.1.2(a)(iv)", "5.1.2(a)(v)", "5.1.2(c)(iii)"]
  - board: Eduqas
    code: "A420QS"
    spec_refs: ["C1.5(a)", "C1.5(b)", "C1.5(c)", "C1.5(d)", "C1.5(e)", "C1.5(f)", "C1.5(g)", "C1.6(a)", "C1.6(b)", "C1.6(c)", "C1.6(d)", "C1.6(e)", "C1.6(f)", "C1.6(g)", "C1.6(h)", "C1.6(i)", "C1.6(j)", "C1.6(k)", "C1.6(l)", "C1.6(m)", "C1.6(n)", "C1.6(o)", "C1.6(p)", "C1.6(q)"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/physics-2015.html
  OCR A: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-a-h156-h556-from-2015/
  OCR B: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-b-advancing-physics-h157-h557-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/physics-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/a-level-aqa/
---

# Circular motion, simple harmonic motion, damping and resonance

Objects moving in circles and objects oscillating back and forth are both periodic. This file covers angular speed and the radian, centripetal acceleration and force, the defining equation of simple harmonic motion and its solutions, the mass–spring system and the simple pendulum (AQA required practical 7), energy in SHM, damping, forced oscillations and resonance.

## Overview

A-level only for every board. Orbits (gravity providing the centripetal force) are in file 14. Magnetic fields providing centripetal force on charged particles are in file 17. Rotational dynamics (moment of inertia) is in file 24.

### Board differences

- AQA 3.6.1, RP7 · Edexcel 103 to 107, 181 to 191, CP16 · OCR A 5.2, 5.3 · OCR B 5.1.1 (SHM), 5.1.2 (circular motion) · Eduqas C1.5, C1.6.
- AQA says the derivation of centripetal acceleration will not be examined; Edexcel 105 asks you to derive it from vector diagrams.
- Solutions: AQA and Edexcel use x = A cos ωt; OCR A and OCR B accept x = A sin ωt or A cos ωt; Eduqas uses x = A cos(ωt + ε) with a phase constant ε.
- OCR B 5.1.1(c)(ix) asks you to solve d²x/dt² = −(k/m)x by iterative numerical or graphical methods.
- Edexcel CP16: find an unknown mass from the resonant frequencies of known masses on a spring. Edexcel 191: damping and plastic deformation of ductile materials reduce amplitude.
- Eduqas specified practicals: g with a pendulum; investigating the damping of a spring. Eduqas C1.6(n): the importance of critical damping (e.g. car suspension).
- OCR A 5.3.3(e) and Eduqas C1.6(q): examples where resonance is useful and where it is a problem.

## 3.6.1.1 Circular motion

*Refs: AQA 3.6.1.1 · Edexcel 103 to 107 · OCR A 5.2.1(a) to (c), 5.2.2(a) to (d) · OCR B 5.1.2(a)(iv), (v), (c)(iii) · Eduqas C1.5(a) to (g). Level: A-level only.*

### What you need to know

- Motion in a circle at constant speed involves acceleration and needs a centripetal force.
- The radian; converting between degrees and radians.
- Angular speed ω = v/r = 2πf = 2π/T.
- Centripetal acceleration a = v²/r = ω²r, directed towards the centre.
- Centripetal force F = mv²/r = mω²r.
- (Edexcel 105) Deriving a = v²/r from a vector diagram.

### Explained

**Radians.** An angle in radians = arc length ÷ radius: θ = s/r. A full circle is 2π rad = 360°, so 1 rad ≈ 57.3°. To convert degrees to radians, multiply by π/180.

**Angular speed.** ω = Δθ/Δt, unit rad s⁻¹. For one revolution: ω = 2π/T = 2πf. The linear speed of a point at radius r is v = ωr (every point on a rigid rotating object has the same ω, but points further out have larger v).

**Why there is an acceleration.** Velocity is a vector. In circular motion at constant speed the direction keeps changing, so the velocity changes, so there is an acceleration. It points towards the centre (centripetal).

**Derivation** (Edexcel 105). In a short time Δt the object moves through angle Δθ. Its velocity changes from v₁ to v₂, both of size v, at angle Δθ apart. The vector Δv = v₂ − v₁ points towards the centre, and for small Δθ its size is vΔθ. So a = Δv/Δt = vΔθ/Δt = vω = v²/r = ω²r.

**Centripetal force.** By Newton's second law, a resultant force is needed towards the centre: F = mv²/r = mω²r. It is not a new kind of force; it is whatever resultant force points inwards:

- Tension in a string (a ball whirled round).
- Friction between tyres and road (a car turning a corner).
- Gravity (a satellite or the Moon).
- Horizontal component of the normal force (a car on a banked track) or of lift (a banking aircraft).
- Magnetic force (a charged particle in a magnetic field).

The centripetal force does no work, because it is perpendicular to the velocity, so the speed (and kinetic energy) does not change.

**Vertical circles.** A ball on a string in a vertical circle: at the top, T + mg = mv²/r; at the bottom, T − mg = mv²/r. The tension is greatest at the bottom. The string goes slack at the top if v² < gr. On a roller coaster loop, the rider just stays in contact at the top if v = √(gr). On a hump-back bridge, the car leaves the road at the top if v > √(gr).

**Conical pendulum.** A mass on a string moving in a horizontal circle: vertical component of tension balances weight (T cos θ = mg); horizontal component provides centripetal force (T sin θ = mv²/r). So tan θ = v²/(rg).

### Worked example

1. A car of mass 900 kg goes round a bend of radius 40 m at 14 m s⁻¹. Find the friction force needed.

   F = mv²/r = 900 × 196/40 = 4410 N.

2. A drum in a washing machine of radius 0.25 m spins at 1200 revolutions per minute. Find ω and the centripetal acceleration of clothes at the edge.

   f = 20 Hz, ω = 2π × 20 = 126 rad s⁻¹. a = ω²r = 126² × 0.25 = 3950 m s⁻² (about 400g).

3. A 0.20 kg ball on a 0.60 m string moves in a vertical circle. At the top its speed is 3.0 m s⁻¹. Find the tension there.

   T = mv²/r − mg = 0.20 × 9/0.60 − 1.96 = 3.0 − 1.96 = 1.04 N.

### Common mistakes

- Saying the centripetal force acts outwards (there is no outward "centrifugal force" acting on the object in an inertial frame).
- Drawing centripetal force as an extra force on a free-body diagram alongside tension or friction.
- Using degrees in ω = θ/t.
- Saying the speed changes in uniform circular motion.

## 3.6.1.2 Simple harmonic motion (SHM)

*Refs: AQA 3.6.1.2 · Edexcel 181, 182, 184, 185 · OCR A 5.3.1(a), (b), (d), (e), (g) · OCR B 5.1.1(a)(v), (vi), (b)(iii), (vii), (c)(ix), (x) · Eduqas C1.6(a) to (h). Level: A-level only.*

### What you need to know

- The condition for SHM: a ∝ −x (acceleration proportional to displacement and directed towards the equilibrium position).
- Defining equation a = −ω²x.
- x = A cos ωt and v = ±ω√(A² − x²).
- Graphs of x, v and a against time, and how each comes from the gradient of the one before.
- Maximum speed = ωA; maximum acceleration = ω²A.
- (Edexcel 181) F = −kx as the condition, and v = −Aω sin ωt, a = −Aω² cos ωt.
- (OCR A, Eduqas) The period of SHM is independent of amplitude (isochronous).

### Explained

**Definition.** An object moves with simple harmonic motion if its acceleration is directly proportional to its displacement from a fixed point (the equilibrium position) and always directed towards that point: a = −ω²x. The minus sign shows the acceleration is opposite to the displacement. Equivalent: the restoring force is proportional to displacement, F = −kx.

**Terms.**

- Displacement x: distance from equilibrium.
- Amplitude A: maximum displacement.
- Period T: time for one complete oscillation; frequency f = 1/T.
- Angular frequency ω = 2πf = 2π/T.
- Phase difference between two oscillators: 2πΔt/T.

**Solutions.** If timing starts at maximum displacement: x = A cos ωt. If it starts at equilibrium moving in the positive direction: x = A sin ωt. In general (Eduqas): x = A cos(ωt + ε), where ε is the phase constant.

Differentiating x = A cos ωt:

- v = −Aω sin ωt
- a = −Aω² cos ωt = −ω²x

**Velocity and displacement.** v = ±ω√(A² − x²). Maximum speed v_max = ωA at x = 0 (equilibrium). Speed is zero at x = ±A (extremes).

**Acceleration.** Maximum acceleration a_max = ω²A at x = ±A; zero at equilibrium.

**Graphs.** If x = A cos ωt:

- x–t: cosine curve.
- v–t: negative sine curve (gradient of x–t); a quarter cycle (π/2) ahead of x.
- a–t: negative cosine curve (gradient of v–t); in antiphase with x (π out of phase).
- a–x graph: a straight line through the origin with negative gradient −ω².

**Isochronous.** The period does not depend on the amplitude: larger swings travel further but faster.

**Iterative solution** (OCR B 5.1.1(c)(ix)). Start with x and v. In each small step Δt: a = −(k/m)x; v_new = v + aΔt; x_new = x + v_newΔt. Repeating traces out a sine curve.

### Worked example

1. An object in SHM has amplitude 0.050 m and period 0.40 s. Find ω, the maximum speed and the maximum acceleration.

   ω = 2π/0.40 = 15.7 rad s⁻¹. v_max = 15.7 × 0.050 = 0.785 m s⁻¹. a_max = 15.7² × 0.050 = 12.3 m s⁻².

2. For the same object, find the speed when x = 0.030 m.

   v = 15.7 × √(0.050² − 0.030²) = 15.7 × 0.040 = 0.63 m s⁻¹.

3. Starting from maximum displacement, find the displacement after 0.15 s.

   x = 0.050 cos(15.7 × 0.15) = 0.050 cos(2.36 rad) = 0.050 × (−0.707) = −0.035 m. (Calculator in radians!)

### Common mistakes

- Using degrees mode on a calculator with ωt.
- Saying acceleration is greatest at the equilibrium position (it is zero there; speed is greatest).
- Forgetting the minus sign, which shows the restoring direction.
- Saying the period depends on amplitude.

## 3.6.1.3 Simple harmonic systems

*Refs: AQA 3.6.1.3, RP7 · Edexcel 183, 188 · OCR A 5.3.1(c), (f), 5.3.2(a), (b) · OCR B 5.1.1(a)(vii), (c)(vi), (vii), (viii), (xi), (d)(i) · Eduqas C1.6(i), (j), (k). Level: A-level only.*

### What you need to know

- Mass–spring system: T = 2π√(m/k).
- Simple pendulum: T = 2π√(l/g), using the small-angle approximation.
- Other oscillators (e.g. liquid in a U-tube) may be given with full information.
- How Ek, Ep and total energy vary with displacement and with time.
- The effects of damping on oscillations.
- AQA required practical 7: SHM with a mass–spring system and a simple pendulum.

### Explained

**Mass–spring.** A mass m on a spring of stiffness k. Displaced by x from equilibrium, the restoring force is −kx, so a = −(k/m)x. Comparing with a = −ω²x: ω² = k/m, so

**T = 2π√(m/k)** (independent of g, so the same on the Moon).

This is true for horizontal and vertical springs (for a vertical spring, x is measured from the new equilibrium position where the spring is already stretched by mg/k).

**Simple pendulum.** A small mass on a light string of length l, displaced by a small angle θ. The restoring force along the arc is mg sin θ. For small angles (less than about 10°), sin θ ≈ θ = x/l, so F ≈ −(mg/l)x and a = −(g/l)x. So ω² = g/l and

**T = 2π√(l/g)** (independent of mass and, for small angles, of amplitude).

**Energy in SHM.** With no damping, total energy is constant.

- Potential energy (mass–spring): Ep = ½kx².
- Kinetic energy: Ek = ½mv² = ½mω²(A² − x²).
- Total E = ½kA² = ½mω²A².

Graphs against displacement: Ep is a parabola (U-shaped) from zero at x = 0 to ½kA² at ±A; Ek is an inverted parabola, maximum at x = 0; total is a horizontal line. Against time, Ek and Ep each vary as sin² or cos² with twice the frequency of the oscillation (they peak twice per cycle), and always add up to the constant total.

**Damping.** Real oscillators lose energy to their surroundings (friction, air resistance), so the amplitude decreases. This is damping. Over time, total energy falls (Edexcel 188, Eduqas C1.6(l)).

### Worked example

1. A 0.40 kg mass on a spring oscillates with period 0.80 s. Find k.

   k = 4π²m/T² = 4π² × 0.40/0.64 = 24.7 N m⁻¹.

2. What length of pendulum has a period of 2.0 s on Earth?

   l = gT²/4π² = 9.81 × 4/39.5 = 0.994 m.

3. A 0.25 kg mass on a spring (k = 40 N m⁻¹) oscillates with amplitude 0.060 m. Find the total energy and the kinetic energy when x = 0.020 m.

   E = ½ × 40 × 0.060² = 0.072 J. Ep at 0.020 m = ½ × 40 × 0.020² = 0.008 J. Ek = 0.064 J.

### Common mistakes

- Using T = 2π√(l/g) for a pendulum swinging through large angles.
- Saying the period of a pendulum depends on the mass of the bob.
- Thinking Ek and Ep oscillate at the same frequency as x.

### Practical

**AQA required practical 7** (also OCR A 5.3.1(c)(ii) PAG10, OCR B 5.1.1(d)(i), Eduqas specified practical "g with a pendulum"): investigate SHM with a mass–spring system and a simple pendulum.

*Pendulum.* Clamp the string between two small wooden blocks (so the pivot is fixed). Measure l from the pivot to the centre of the bob. Displace by a small angle (under 10°) and release. Use a fiducial marker (a pin or line) at the centre of the swing, where the bob moves fastest, to start and stop timing. Time 10 or 20 oscillations, repeat and average, and divide. Vary l from about 0.2 m to 1.0 m. Plot T² against l: straight line through the origin with gradient 4π²/g, so g = 4π²/gradient.

*Mass–spring.* Hang a spring from a clamp; add a mass hanger with masses. Pull down a little and release. Time 10 oscillations using a marker at the equilibrium position. Vary m. Plot T² against m: gradient 4π²/k. Compare k with the value from a static force–extension measurement.

Errors: timing from the extreme position (bob slow there, so hard to judge the moment) gives more random error; large amplitude makes the pendulum period slightly longer; the mass of the spring adds a little to the effective mass (an intercept on the T² against m graph). Safety: secure the clamp stand (G-clamp it to the bench) so it does not topple.

**Edexcel CP16:** find an unknown mass using the resonant frequencies of known masses. Hang known masses on a spring attached to a vibration generator driven by a signal generator. For each mass, slowly increase the frequency until the amplitude is largest (resonance) and record f. Since f = (1/2π)√(k/m), plot 1/f² against m (straight line). Hang the unknown mass, find its resonant frequency, and read its mass from the graph.

## 3.6.1.4 Forced vibrations and resonance

*Refs: AQA 3.6.1.4 · Edexcel 186, 187, 189, 190, 191 · OCR A 5.3.3(a) to (e) · OCR B 5.1.1(a)(viii), (b)(viii), (d)(ii) · Eduqas C1.6(l) to (q). Level: A-level only.*

### What you need to know

- Free and forced vibrations (qualitatively).
- Resonance; how damping affects the sharpness of resonance.
- Examples of these effects in mechanical systems and with stationary waves.
- (OCR A, Eduqas) Light, heavy and critical damping; amplitude–driving frequency graphs.
- (Edexcel 191) How damping and the plastic deformation of ductile materials reduce amplitude.

### Explained

**Free oscillation.** After an initial displacement, an object oscillates at its own natural frequency f₀, with no external driving force (other than its restoring force).

**Forced oscillation.** A periodic external force (the driver) makes the object oscillate at the driving frequency.

**Resonance.** When the driving frequency equals (or is very close to) the natural frequency, the amplitude of the forced oscillation becomes very large. Energy is transferred from the driver to the oscillator most efficiently, because the driving force is in phase with the velocity. At resonance the driven system is a quarter of a cycle (π/2) behind the driver; well below f₀ they are in phase, and well above f₀ they are in antiphase.

**Damping.**

| Type | Behaviour after a displacement |
| --- | --- |
| Light (under) damping | Oscillates with slowly decreasing amplitude (exponential decay of amplitude); period nearly unchanged |
| Critical damping | Returns to equilibrium in the shortest time without oscillating |
| Heavy (over) damping | Returns slowly to equilibrium without oscillating |

Critical damping is used in car suspension (the car does not bounce, and the wheel returns quickly), and in moving-coil meters (the pointer settles quickly). Heavy damping is used in door closers.

**Effect of damping on resonance.** Greater damping:

- reduces the maximum amplitude at every driving frequency;
- makes the resonance peak broader (less sharp);
- shifts the peak slightly below f₀.

Amplitude against driving frequency: a curve rising to a peak near f₀ and falling again; lightly damped systems have a tall narrow peak; heavily damped ones a low broad hump.

**Plastic deformation** (Edexcel 191). If an oscillating structure deforms plastically (for example a ductile metal bending), energy is absorbed and not returned, reducing the amplitude. This is used in earthquake protection and car bumpers.

**Examples.**

*Useful:* tuning a radio (the circuit resonates at the station's frequency), musical instruments (air columns and strings resonate; see stationary waves, file 04), microwave ovens (water molecules absorb at a resonant frequency), MRI (nuclei resonate in a magnetic field), quartz clocks.

*Problems:* bridges oscillating in wind or with marching feet (the Millennium Bridge needed dampers), buildings in earthquakes, car panels rattling at certain engine speeds, washing machine vibrations during spin. Solutions: add damping, change mass or stiffness so the natural frequency is far from likely driving frequencies.

**Stationary waves as resonance.** A string or air column has several natural frequencies (its harmonics). Driving it at one of them gives a large-amplitude stationary wave.

### Worked example

1. A car's suspension has springs with total k = 6.0 × 10⁴ N m⁻¹ and the car's mass is 1200 kg. At what frequency of road bumps would it resonate?

   f₀ = (1/2π)√(k/m) = (1/2π)√(50) = 1.13 Hz. If bumps are 10 m apart, this happens at 11 m s⁻¹. Shock absorbers (critical damping) prevent dangerous amplitudes.

### Common mistakes

- Saying resonance occurs when driving frequency equals amplitude (it is about frequency).
- Saying damping changes the natural frequency greatly (it changes it slightly).
- Saying critical damping makes the system stop instantly.

### Practical

**Damping of a spring** (Eduqas specified practical; OCR A 5.3.3(b), OCR B 5.1.1(d)(ii)). Hang a mass on a spring and attach a card to increase air resistance (or immerse the mass in water). Displace and release; record the amplitude at the end of every few oscillations, using a ruler behind the mass or a video with a scale. Plot amplitude against time (or number of oscillations): an exponential decay. A larger card gives faster decay. ln A against t is a straight line.

**Resonance with a vibration generator** (Barton's pendulums demonstration). Several pendulums of different lengths hang from a string with one heavy driver pendulum. Only the pendulum with the same length as the driver swings with a large amplitude, and it lags the driver by a quarter cycle.

## Check questions

1. Explain why an object moving in a circle at constant speed is accelerating. (2 marks)
2. A satellite moves in a circular orbit of radius 7.0 × 10⁶ m with period 98 minutes. Calculate its speed and centripetal acceleration. (3 marks)
3. State the conditions for simple harmonic motion. (2 marks)
4. A mass on a spring oscillates with amplitude 4.0 cm and frequency 2.5 Hz. Calculate the maximum speed and the speed when it is 2.0 cm from equilibrium. (4 marks)
5. Sketch displacement–time, velocity–time and acceleration–time graphs for one cycle of SHM starting from maximum displacement. (3 marks)
6. Derive T = 2π√(l/g) for a simple pendulum, stating the approximation used. (4 marks)
7. Describe how to measure g using a simple pendulum, explaining how to reduce uncertainty. (6 marks)
8. Sketch amplitude–driving frequency curves for light and heavy damping on the same axes and explain the differences. (4 marks)
9. Explain why critical damping is used in car suspension. (2 marks)

## Mark scheme

1. Velocity is a vector; its direction is constantly changing (1); so velocity changes, which is an acceleration (towards the centre) (1).
2. v = 2πr/T = 2π × 7.0 × 10⁶/5880 = 7.5 × 10³ m s⁻¹ (2); a = v²/r = 8.0 m s⁻² (1).
3. Acceleration proportional to displacement from equilibrium (1); directed towards equilibrium / opposite to displacement (1).
4. ω = 2π × 2.5 = 15.7 rad s⁻¹ (1); v_max = 15.7 × 0.040 = 0.63 m s⁻¹ (1); v = 15.7√(0.040² − 0.020²) (1) = 0.54 m s⁻¹ (1).
5. Displacement: cosine starting at +A (1); velocity: negative sine, zero at start (1); acceleration: negative cosine, starting at −ω²A (antiphase with x) (1).
6. Restoring force = mg sin θ (1); for small angles sin θ ≈ θ = x/l (1); a = −(g/l)x, which is SHM with ω² = g/l (1); T = 2π/ω = 2π√(l/g) (1).
7. Measure length to centre of bob (1); small angle (<10°) (1); time 10+ oscillations with fiducial marker at equilibrium (1); repeat and average (1); vary l, plot T² against l (1); g = 4π²/gradient (1).
8. Both peak near natural frequency (1); light damping: tall, narrow peak (1); heavy damping: lower amplitude at all frequencies, broader peak (1); peak slightly below f₀ for heavier damping (1).
9. Returns to equilibrium in the shortest time (1); without oscillating, so the car does not keep bouncing (1).
