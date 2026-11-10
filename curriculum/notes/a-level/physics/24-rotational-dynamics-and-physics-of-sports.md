---
level: A-level
subject: Physics
topic: "Rotational dynamics and the physics of sports"
as_content: "AQA option (A-level only). Eduqas option C (A-level only)."
boards:
  - board: AQA
    code: "7408"
    spec_refs: ["3.11.1.1", "3.11.1.2", "3.11.1.3", "3.11.1.4", "3.11.1.5", "3.11.1.6"]
  - board: Eduqas
    code: "A420QS"
    spec_refs: ["OC(a)", "OC(b)", "OC(c)", "OC(d)", "OC(e)", "OC(f)", "OC(g)", "OC(h)", "OC(i)", "OC(j)", "OC(k)", "OC(l)", "OC(m)", "OC(n)", "OC(o)"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification
  Eduqas: https://www.eduqas.co.uk/qualifications/physics-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/a-level-aqa/
---

# Rotational dynamics and the physics of sports

Everything in linear mechanics has a rotational twin: mass becomes moment of inertia, force becomes torque, momentum becomes angular momentum. This file covers moment of inertia, rotational kinetic energy and flywheels, angular kinematics, torque and angular acceleration, angular momentum and its conservation, and work and power in rotation. It then covers the Eduqas option on the physics of sports: stability, muscles as levers, impulse, the coefficient of restitution, Bernoulli's equation and drag.

## Overview

AQA option 3.11.1 (A-level only) and Eduqas option C (A-level only). Angular speed and the radian are in file 12; moments, centre of gravity and equilibrium in file 06; impulse and collisions in file 08; projectiles in file 07.

### Board differences

- AQA 3.11.1 · Eduqas OC(a) to (o).
- AQA gives expressions for moments of inertia when needed. Eduqas OC(f) asks you to use I = (2/5)mr² for a solid sphere and I = (2/3)mr² for a thin spherical shell.
- AQA 3.11.1.2: flywheels (energy storage, smoothing torque). AQA 3.11.1.6: frictional torque in machines. Not Eduqas.
- Eduqas only: coefficient of restitution, Bernoulli's equation and the drag equation F_D = ½ρv²AC_D, muscles and moments.

## 3.11.1.1 Concept of moment of inertia

*Refs: AQA 3.11.1.1 · Eduqas OC(e), (f). Level: A-level only.*

### What you need to know

- I = mr² for a point mass; I = Σmr² for an extended object.
- Qualitative factors that affect the moment of inertia.
- (Eduqas) I = (2/5)mr² (solid sphere), I = (2/3)mr² (thin spherical shell).

### Explained

The moment of inertia I of an object about an axis measures how hard it is to change its rotation (the rotational equivalent of mass). For a point mass m at distance r from the axis: I = mr². For an extended object, add up every particle: I = Σmr². Unit kg m².

**Factors.** I is larger when:

- the mass is larger;
- the mass is further from the axis (r² makes this very important);
- so it depends on the axis chosen and the shape.

| Object | Axis | I |
| --- | --- | --- |
| Thin ring or hoop, radius r | Through centre, perpendicular to plane | mr² |
| Uniform disc or solid cylinder | Through centre, along axis | ½mr² |
| Solid sphere | Through centre | (2/5)mr² |
| Thin spherical shell | Through centre | (2/3)mr² |
| Uniform rod, length L | Through centre, perpendicular | (1/12)mL² |
| Uniform rod, length L | Through one end, perpendicular | (1/3)mL² |

A hoop has a bigger I than a disc of the same mass and radius because all its mass is at the rim.

### Worked example

1. Find I of two 2.0 kg masses on a light rod, each 0.30 m from the axis.

   I = 2 × 2.0 × 0.30² = 0.36 kg m².

2. (Eduqas) Compare I for a solid ball and a hollow ball of the same mass (0.45 kg) and radius (0.11 m).

   Solid: 0.4 × 0.45 × 0.0121 = 2.2 × 10⁻³ kg m². Hollow: 0.667 × 0.45 × 0.0121 = 3.6 × 10⁻³ kg m².

### Common mistakes

- Forgetting to square r.
- Saying I is a fixed property of an object regardless of the axis.

## 3.11.1.2 Rotational kinetic energy

*Refs: AQA 3.11.1.2 · Eduqas OC(k), (l). Level: A-level only.*

### What you need to know

- E_k = ½Iω².
- Factors affecting the energy storage capacity of a flywheel; uses of flywheels (smoothing torque and speed; storing energy in vehicles and production machines).
- (Eduqas) Energy conservation with linear and rotational kinetic energy, gravitational and elastic potential energy.

### Explained

A rotating object has kinetic energy E_k = ½Iω² (each particle has ½mv² = ½m(rω)²). A rolling object has both translational and rotational kinetic energy: E = ½mv² + ½Iω², with v = rω (no slipping).

**Flywheels.** A heavy wheel that stores energy as rotational kinetic energy.

- Storage capacity increases with I (so with mass concentrated at the rim, e.g. spokes and a heavy rim) and especially with ω (energy ∝ ω²). The limit is the strength of the material: at high ω, the stress at the rim (needed to provide the centripetal force) can make it burst. Composite materials (carbon fibre) are strong and light, allowing very high speeds. Energy losses are reduced by low-friction bearings (or magnetic bearings) and running in a vacuum.
- *Smoothing*: in an engine, each cylinder gives a burst of torque; a flywheel absorbs energy during the bursts and releases it between them, keeping the speed steady. Used in punch presses and similar machines: a motor slowly spins up the flywheel, which releases a large energy quickly for each stamping operation.
- *Energy storage in vehicles*: regenerative braking (KERS) transfers kinetic energy of the vehicle to a flywheel when braking, and returns it for acceleration.

**Rolling down a slope** (Eduqas OC(l)). mgh = ½mv² + ½Iω². A hoop (large I) rolls down more slowly than a solid sphere, because more of the energy goes into rotation.

### Worked example

1. A flywheel (I = 12 kg m²) spins at 3000 rpm. Find its energy.

   ω = 3000 × 2π/60 = 314 rad s⁻¹. E = ½ × 12 × 314² = 5.9 × 10⁵ J.

2. (Eduqas) A solid ball rolls from rest down a slope, falling 1.2 m. Find its speed.

   mgh = ½mv² + ½(2/5)mr²(v/r)² = (7/10)mv². v = √(10gh/7) = √(10 × 9.81 × 1.2/7) = 4.1 m s⁻¹.

### Common mistakes

- Using rpm for ω.
- Forgetting the rotational kinetic energy of a rolling object.

## 3.11.1.3 Rotational motion

*Refs: AQA 3.11.1.3 · Eduqas OC(g). Level: A-level only.*

### What you need to know

- Angular displacement, angular speed, angular velocity, angular acceleration: ω = Δθ/Δt, α = Δω/Δt.
- Graphs of uniform and non-uniform angular acceleration.
- Equations for uniform angular acceleration and the analogy with linear motion.

### Explained

| Linear | Rotational | Link |
| --- | --- | --- |
| Displacement s (m) | Angular displacement θ (rad) | s = rθ |
| Velocity v (m s⁻¹) | Angular velocity ω (rad s⁻¹) | v = rω |
| Acceleration a (m s⁻²) | Angular acceleration α (rad s⁻²) | a = rα (tangential) |
| Mass m | Moment of inertia I | I = Σmr² |
| Force F | Torque T | T = Fr |
| F = ma | T = Iα | |
| Momentum p = mv | Angular momentum L = Iω | |
| E_k = ½mv² | E_k = ½Iω² | |
| Work W = Fs | W = Tθ | |
| Power P = Fv | P = Tω | |

**Equations of uniform angular acceleration:**

- ω₂ = ω₁ + αt
- θ = ½(ω₁ + ω₂)t
- θ = ω₁t + ½αt²
- ω₂² = ω₁² + 2αθ

**Graphs.** On an ω–t graph, the gradient is α and the area is θ. Curved lines show non-uniform angular acceleration.

### Worked example

1. A wheel speeds up uniformly from 20 rad s⁻¹ to 50 rad s⁻¹ in 6.0 s. Find α and the number of revolutions.

   α = 30/6.0 = 5.0 rad s⁻². θ = ½(20 + 50) × 6.0 = 210 rad = 33 revolutions.

### Common mistakes

- Mixing revolutions and radians.

## 3.11.1.4 Torque and angular acceleration

*Refs: AQA 3.11.1.4 · Eduqas OC(h). Level: A-level only.*

### What you need to know

- Torque T = Fr.
- T = Iα.

### Explained

Torque (moment) is the turning effect of a force: T = Fr, where r is the perpendicular distance from the axis to the line of action (N m). A resultant torque produces angular acceleration: T = Iα (Newton's second law for rotation). Eduqas uses τ for torque.

In a real machine, frictional torque in bearings opposes rotation, so the resultant torque = applied torque − frictional torque.

### Worked example

1. A 30 N force acts tangentially at the rim of a disc of radius 0.20 m and I = 0.40 kg m². A frictional torque of 1.0 N m acts. Find α.

   Resultant torque = 6.0 − 1.0 = 5.0 N m. α = 5.0/0.40 = 12.5 rad s⁻².

### Common mistakes

- Ignoring frictional torque.

## 3.11.1.5 Angular momentum

*Refs: AQA 3.11.1.5 · Eduqas OC(i), (j). Level: A-level only.*

### What you need to know

- Angular momentum = Iω.
- Conservation of angular momentum.
- Angular impulse = change in angular momentum: TΔt = Δ(Iω) for constant T.
- Applications, including sport.

### Explained

Angular momentum L = Iω (kg m² s⁻¹ or N m s).

**Conservation.** If no external resultant torque acts, the total angular momentum of a system stays constant: I₁ω₁ = I₂ω₂.

- An ice skater spinning with arms out pulls them in: I falls, so ω rises. Rotational kinetic energy ½Iω² = L²/2I increases; the extra energy comes from the work done by the skater's muscles pulling the arms in.
- A diver tucks to spin faster, then straightens to slow down before entering the water.
- A dropped disc landing on a spinning turntable: the combined I is larger, so ω falls (kinetic energy is lost, like an inelastic collision).

**Angular impulse.** TΔt = ΔL. A small torque for a long time gives the same change in angular momentum as a large torque for a short time.

### Worked example

1. A skater (I = 3.5 kg m²) spins at 2.0 rev s⁻¹ and pulls in her arms so I = 1.4 kg m². Find the new rate and the change in kinetic energy.

   ω₂ = 3.5 × 2.0/1.4 = 5.0 rev s⁻¹. E₁ = ½ × 3.5 × (4π)² = 276 J; E₂ = ½ × 1.4 × (10π)² = 691 J. Gain = 415 J (from the work done by her muscles).

2. A turntable (I = 0.050 kg m²) spins at 4.0 rad s⁻¹. A ring (I = 0.030 kg m²) is dropped on it. Find the final ω.

   0.050 × 4.0 = 0.080ω, ω = 2.5 rad s⁻¹.

### Common mistakes

- Saying rotational kinetic energy is conserved when the skater pulls in her arms.

## 3.11.1.6 Work and power

*Refs: AQA 3.11.1.6. Level: A-level only.*

### What you need to know

- W = Tθ; P = Tω.
- Frictional torque must be taken into account in rotating machinery.

### Explained

A torque T turning through angle θ does work W = Tθ (from W = Fs with s = rθ). Power P = Tω. An engine's output power is its torque × angular speed (this is the "brake power" in file 25). At a steady speed, the engine's torque equals the total frictional and load torque.

### Worked example

1. A motor provides 2.5 N m at 1500 rpm. Find its power.

   ω = 157 rad s⁻¹. P = 2.5 × 157 = 390 W.

2. A flywheel at 120 rad s⁻¹ (I = 5.0 kg m²) is slowed to rest by a constant frictional torque in 80 s. Find the torque and the angle turned.

   α = 1.5 rad s⁻²; T = 7.5 N m. θ = ½ × 120 × 80 = 4800 rad. Check: W = Tθ = 36 000 J = ½ × 5.0 × 120².

## The physics of sports (Eduqas option C)

*Refs: Eduqas OC(a), (b), (c), (d), (m), (n), (o). Level: A-level only.*

### What you need to know

- Using the centre of gravity to explain stability and toppling in sport.
- Using the principle of moments to find forces in muscle systems and in other contexts (e.g. sailing).
- Ft = mv − mu in sporting contexts.
- The coefficient of restitution e = relative speed after collision ÷ relative speed before; for a dropped ball e = √(h/H).
- Projectile motion in sport.
- Bernoulli's equation p = p₀ − ½ρv² in sporting contexts.
- The drag force F_D = ½ρv²AC_D.

### Explained

**Stability** (OC(a)). An object is stable when its centre of gravity is above its base. It topples when the centre of gravity moves beyond the edge of the base, because the weight then gives a toppling moment about the edge. Athletes widen their stance and lower their centre of gravity (crouching wrestlers, rugby scrums) to be more stable; a sprinter in the "set" position leans forward so the centre of gravity is ahead of the hands and feet, ready to fall into the run.

**Muscles as levers** (OC(b)). The forearm is a lever pivoted at the elbow. The biceps attaches close to the elbow (about 4 cm), while a weight in the hand is about 35 cm away. Taking moments about the elbow: F_biceps × 0.04 = W × 0.35 (+ forearm weight × its distance), so the muscle force is about 9 times the weight held. Muscles give large forces but the hand moves a long way for a small muscle contraction, giving speed.

**Sailing.** The forces of the wind on the sail and the water on the keel produce moments about the centre of the boat; the crew lean out (hiking) to give a counter-moment so the boat does not capsize.

**Impulse** (OC(c)). Ft = mv − mu: follow-through in a kick or racket stroke increases contact time and so the change in momentum; landing with bent knees or on a soft mat increases stopping time and reduces force.

**Coefficient of restitution** (OC(d)). e = (relative speed of separation)/(relative speed of approach). e = 1 for a perfectly elastic collision; e = 0 if the bodies stick together. For a ball dropped from height H onto a fixed surface, bouncing to height h: speed before = √(2gH), after = √(2gh), so **e = √(h/H)**. (The spec writes e = h/H in one form; the square-root form follows from speeds. Use whichever the question defines.)

**Projectiles in sport** (OC(m)). As in file 07. A long jumper or shot putter: range depends on launch speed, angle and height. For a launch above the ground, the best angle is a little less than 45°.

**Bernoulli's equation** (OC(n)). For a fluid flowing smoothly, where its speed is higher, its pressure is lower: p = p₀ − ½ρv², where p₀ is the pressure where the fluid is at rest relative to the object. Spinning balls: a ball with topspin drags air so that air moves faster over the bottom surface (relative to the ball), lowering the pressure there; the ball dips sharply (Magnus effect). Sidespin makes a football swerve. The same idea explains lift on wings and spoilers on racing cars (shaped to push the car down for grip).

**Drag** (OC(o)). For objects moving fast through air (turbulent flow): F_D = ½ρv²AC_D, where A is the frontal area and C_D the drag coefficient (depends on shape: about 0.5 for a sphere, about 1 for an upright cyclist, 0.3 for a streamlined car). Cyclists crouch (smaller A, lower C_D) and wear smooth clothing and pointed helmets. Since drag ∝ v², the power needed to overcome drag ∝ v³.

### Worked example

1. A ball dropped from 2.0 m bounces to 1.3 m. Find e.

   e = √(1.3/2.0) = 0.81.

2. A cyclist has AC_D = 0.30 m² and rides at 12 m s⁻¹ (ρ_air = 1.2 kg m⁻³). Find the drag and the power needed against it.

   F_D = ½ × 1.2 × 144 × 0.30 = 26 N. P = F_D v = 310 W.

3. Air passes over a spinning ball at 32 m s⁻¹ on one side and 28 m s⁻¹ on the other. Find the pressure difference.

   Δp = ½ρ(v₁² − v₂²) = 0.6 × (1024 − 784) = 144 Pa, lower on the faster side.

4. A forearm holds a 50 N weight 0.34 m from the elbow; the forearm (weight 15 N) acts 0.15 m from the elbow; the biceps is 0.040 m from the elbow, vertical. Find the biceps force.

   F × 0.040 = 50 × 0.34 + 15 × 0.15 = 17 + 2.25 = 19.25; F = 480 N.

### Common mistakes

- Saying Bernoulli's effect makes a ball curve towards the higher-pressure side.
- Using e = h/H when e is defined by speeds (e² = h/H).

## Check questions

1. Explain why a hoop and a disc of the same mass and radius have different moments of inertia. (2 marks)
2. A flywheel of I = 0.80 kg m² is accelerated from rest by a constant torque of 4.0 N m for 10 s. Find its final angular speed, kinetic energy and number of revolutions. (4 marks)
3. Explain how a flywheel smooths the output of an engine. (2 marks)
4. State the principle of conservation of angular momentum and use it to explain how a diver controls her rate of rotation. (4 marks)
5. A motor delivers 80 W at 1200 rpm. Calculate the torque. (2 marks)
6. (Eduqas) A solid sphere and a thin spherical shell of the same mass and radius roll down the same slope from rest. Which reaches the bottom first? Explain. (3 marks)
7. (Eduqas) A tennis ball is dropped from 1.5 m and bounces to 0.80 m. Find the coefficient of restitution and the speed just after the bounce. (3 marks)
8. (Eduqas) Explain why a racing cyclist crouches. (2 marks)

## Mark scheme

1. All of the hoop's mass is at radius r (1); disc's mass is spread from 0 to r, so mean r² is smaller; I(hoop) = mr² > I(disc) = ½mr² (1).
2. α = 5.0 rad s⁻²; ω = 50 rad s⁻¹ (1); E = ½ × 0.80 × 2500 = 1000 J (1); θ = ½ × 5.0 × 100 = 250 rad (1) = 40 revolutions (1).
3. Flywheel stores energy as rotational kinetic energy during power strokes and releases it between them (1); large I means small change in ω, so speed stays steady (1).
4. Total angular momentum is constant if no external resultant torque acts (1); in a tuck, the diver reduces I (1); so ω increases (1); straightening increases I so ω decreases for a clean entry (1).
5. ω = 125.7 rad s⁻¹ (1); T = P/ω = 0.64 N m (1).
6. Solid sphere (1); it has the smaller I (2/5 vs 2/3 mr²) (1); so a smaller share of the energy goes into rotation and more into translational KE, giving a larger v at each point (1).
7. e = √(0.80/1.5) = 0.73 (1); speed before = √(2 × 9.81 × 1.5) = 5.42 m s⁻¹ (1); after = 0.73 × 5.42 = 4.0 m s⁻¹ (1).
8. Reduces frontal area (and drag coefficient) (1); drag F = ½ρv²AC_D is reduced, so less power needed at the same speed / higher speed for same power (1).
