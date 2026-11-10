---
level: A-level
subject: Physics
topic: "Magnetic fields, forces on currents and charges, electromagnetic induction, alternating current and transformers"
as_content: "A-level only for every board."
boards:
  - board: AQA
    code: "7408"
    spec_refs: ["3.7.5.1", "3.7.5.2", "3.7.5.3", "3.7.5.4", "3.7.5.5", "3.7.5.6", "RP10", "RP11"]
  - board: Edexcel
    code: "9PH0"
    spec_refs: ["121", "122", "123", "124", "125", "126", "127", "128", "129"]
  - board: OCR A
    code: "H556"
    spec_refs: ["6.3.1(a)", "6.3.1(b)", "6.3.1(c)", "6.3.1(d)", "6.3.1(e)", "6.3.1(f)", "6.3.2(a)", "6.3.2(b)", "6.3.2(c)", "6.3.3(a)", "6.3.3(b)", "6.3.3(c)", "6.3.3(d)", "6.3.3(e)", "6.3.3(f)"]
  - board: OCR B
    code: "H557"
    spec_refs: ["6.1.1(a)(i)", "6.1.1(a)(ii)", "6.1.1(a)(iii)", "6.1.1(a)(iv)", "6.1.1(b)(i)", "6.1.1(b)(ii)", "6.1.1(b)(iii)", "6.1.1(c)(i)", "6.1.1(c)(ii)", "6.1.1(c)(iii)", "6.1.1(c)(iv)", "6.1.1(d)(i)", "6.1.1(d)(ii)", "6.1.1(d)(iii)", "6.1.2(a)(v)", "6.1.2(c)(iv)"]
  - board: Eduqas
    code: "A420QS"
    spec_refs: ["C3.9(a)", "C3.9(b)", "C3.9(c)", "C3.9(d)", "C3.9(e)", "C3.9(f)", "C3.9(g)", "C3.9(h)", "C3.9(i)", "C3.9(j)", "C3.10(a)", "C3.10(b)", "C3.10(c)", "C3.10(d)", "C3.10(e)"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/physics-2015.html
  OCR A: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-a-h156-h556-from-2015/
  OCR B: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-b-advancing-physics-h157-h557-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/physics-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/a-level-aqa/
---

# Magnetic fields, forces on currents and charges, electromagnetic induction, alternating current and transformers

Moving charges make magnetic fields and feel forces in them; changing magnetic fields make e.m.f.s. This file covers magnetic field patterns, the force on a current (F = BIl) and on a moving charge (F = BQv), circular paths and the cyclotron, the Hall effect, magnetic flux and flux linkage, Faraday's and Lenz's laws, generators, alternating current and r.m.s. values, the oscilloscope, and transformers and power transmission, with AQA required practicals 10 and 11.

## Overview

A-level only for every board. Particle accelerators and detectors in more detail (Edexcel 132 to 134) are in file 31. The Hall effect sensor in electronics (AQA 3.13.1.4) is in file 28. A.c. circuits with capacitors and inductors (Eduqas option A) are in file 34. MRI is in file 23.

### Board differences

- AQA 3.7.5, RP10, RP11 · Edexcel 121 to 129 · OCR A 6.3 · OCR B 6.1.1, 6.1.2(a)(v) · Eduqas C3.9, C3.10.
- Fields of a long straight wire B = μ₀I/(2πa) and of a solenoid B = μ₀nI, the effect of an iron core, and the force between parallel wires: Eduqas C3.9(f) to (h). Field patterns only for OCR A 6.3.1(c).
- Hall effect: Eduqas C3.9(d) (with a specified practical using a Hall probe). AQA puts the Hall sensor in option 3.13.
- Velocity selector (crossed electric and magnetic fields): OCR A 6.3.2(c), Eduqas C3.9(j).
- R.m.s. values and the oscilloscope: AQA 3.7.5.5, Edexcel 128, 129. OCR A and OCR B do not require r.m.s. Eduqas puts a.c. in option A.
- Transformers: AQA, OCR A 6.3.3(f), OCR B. Edexcel 125 only asks about induction between linked coils. Eduqas C3.10 does not name transformers.
- OCR B 6.1.1(a)(iv): magnetic circuits (flux produced by current-turns, permeance, effect of iron and of air gaps).
- Measuring B with a current balance: AQA RP10, OCR A 6.3.1(e)(ii) (PAG11), OCR B 6.1.1(d)(ii), Eduqas specified practical.

## 3.7.5.1 Magnetic flux density

*Refs: AQA 3.7.5.1, RP10 · Edexcel 121, 123 · OCR A 6.3.1(a) to (f) · OCR B 6.1.1(a)(iii), (b)(i), (c)(ii), (d)(ii) · Eduqas C3.9(a), (b), (e), (f), (g), (h). Level: A-level only.*

### What you need to know

- The force on a current-carrying wire in a magnetic field: F = BIl when the field is perpendicular to the current (F = BIl sin θ in general).
- Fleming's left-hand rule.
- Magnetic flux density B and the definition of the tesla.
- AQA required practical 10: how the force on a wire depends on B, I and l, using a top-pan balance.
- (OCR A, Eduqas) Field patterns for a long straight wire, a flat coil and a solenoid. (Eduqas) B = μ₀I/(2πa), B = μ₀nI, iron cores, force between parallel currents.

### Explained

**Magnetic fields** arise from moving charges (currents) and from permanent magnets. Field lines go from north to south outside a magnet and never cross.

- Long straight wire: concentric circles around the wire; direction by the right-hand grip rule (thumb along the current, fingers curl in the field direction). B = μ₀I/(2πa) at distance a (Eduqas), where μ₀ = 4π × 10⁻⁷ T m A⁻¹.
- Flat circular coil: field through the middle is along the axis.
- Solenoid: uniform field inside, like a bar magnet outside. B = μ₀nI, where n = turns per metre (Eduqas). An iron core greatly increases B (Eduqas C3.9(g)).

**Force on a current.** A wire carrying current I across a magnetic field feels a force F = BIl sin θ, where θ is the angle between the wire and the field. Maximum when perpendicular (F = BIl); zero when parallel.

**Fleming's left-hand rule.** First finger: Field (N to S). Second finger: Current (conventional). Thumb: Motion (force). All at right angles.

**Magnetic flux density** B is defined by B = F/(Il) for a wire at right angles to the field. **1 tesla** is the flux density that produces a force of 1 N on 1 m of wire carrying 1 A at right angles to the field. Earth's field: about 5 × 10⁻⁵ T. Strong lab magnet: about 0.1 to 1 T. MRI: 1.5 to 3 T.

**Force between parallel wires** (Eduqas C3.9(h)). Each wire is in the other's field. Currents in the same direction attract; opposite directions repel. F/l = μ₀I₁I₂/(2πa).

**Why the force arises** (OCR B 6.1.1(a)(iii)). The field of the wire and the external field add on one side and cancel on the other; field lines "try to shorten", pushing the wire towards the weaker side.

### Worked example

1. A 0.050 m length of wire carries 3.0 A at right angles to a field of 0.20 T. Find the force.

   F = 0.20 × 3.0 × 0.050 = 0.030 N.

2. The wire is turned so it makes 30° with the field. Find the new force.

   F = 0.030 × sin 30° = 0.015 N.

3. (Eduqas) Find B at 2.0 cm from a long wire carrying 10 A, and inside a solenoid with 2000 turns per metre carrying 1.5 A.

   Wire: 4π × 10⁻⁷ × 10/(2π × 0.020) = 1.0 × 10⁻⁴ T. Solenoid: 4π × 10⁻⁷ × 2000 × 1.5 = 3.8 × 10⁻³ T.

### Common mistakes

- Using electron flow direction in Fleming's left-hand rule.
- Using the full length of wire when only part is in the field.
- Forgetting sin θ.

### Practical

**AQA required practical 10** (also OCR A PAG11, OCR B 6.1.1(d)(ii), Eduqas specified practical): investigate how the force on a wire varies with B, I and l using a top-pan balance.

1. Place a U-shaped magnet (or two magnets on a steel yoke) on a top-pan balance and zero it.
2. Clamp a stiff horizontal wire (or a rigid metal rod) so it passes between the poles, perpendicular to the field, without touching the magnet. Connect it in series with an ammeter, a variable resistor and a d.c. supply.
3. Switch on. The wire is pushed one way; by Newton's third law the magnet is pushed the other way, changing the balance reading by Δm. F = Δm g.
4. Vary I in steps and record F. Plot F against I: straight line through the origin; gradient = Bl, so B = gradient/l. Measure l (the length of wire in the field, roughly the width of the pole pieces) with a ruler.
5. To vary l, use magnets of different widths or add magnets side by side.

Tips: reverse the current and average to remove any effect from the wire's own heating or the Earth's field. Switch off between readings to stop the wire heating. If the reading goes down, reverse the current or magnet. Safety: the wire can get hot.

## 3.7.5.2 Moving charges in a magnetic field

*Refs: AQA 3.7.5.2 · Edexcel 122 · OCR A 6.3.2(a), (b), (c) · OCR B 6.1.2(a)(v), (c)(iv) · Eduqas C3.9(c), (d), (i), (j). Level: A-level only.*

### What you need to know

- The force on a charged particle moving in a magnetic field: F = BQv when the field is perpendicular to the velocity (F = BQv sin θ in general).
- The direction of the force on positive and negative particles.
- The circular path of particles; application in the cyclotron.
- (OCR A, Eduqas) Velocity selector: crossed electric and magnetic fields.
- (Eduqas) The Hall effect and the Hall voltage.

### Explained

**Force on a moving charge.** A current is moving charges, so each charge feels a force: F = BQv (perpendicular), from F = BIl with I = Q/t and l = vt. Use Fleming's left-hand rule with the current direction = direction of a positive charge's motion; for electrons, the current is opposite to their velocity.

**Circular motion.** The force is always perpendicular to velocity, so it does no work: the speed is constant and the particle moves in a circle (if v is perpendicular to B).

BQv = mv²/r → **r = mv/(BQ) = p/(BQ)**

- Faster or heavier particles: bigger circles.
- Stronger field or greater charge: smaller circles.
- Period T = 2πr/v = 2πm/(BQ), independent of speed. Frequency f = BQ/(2πm).

If v has a component along B, that part is unaffected and the path is a helix.

**Cyclotron.** Two hollow D-shaped electrodes ("dees") in a vacuum, with a uniform magnetic field perpendicular to them and an alternating p.d. across the gap between them.

1. Ions from a central source are accelerated across the gap by the electric field.
2. Inside a dee there is no electric field; the magnetic field bends the ion in a semicircle.
3. When it returns to the gap, the p.d. has reversed, so it is accelerated again.
4. Each time, its speed and radius increase, but the time for each semicircle (πm/BQ) stays the same, so a fixed-frequency a.c. supply works.
5. At the edge, the ions are deflected out as a high-energy beam.

Uses: producing radioisotopes for medicine (e.g. for PET), proton therapy for cancer. (At very high speeds relativistic mass increase makes the period change, which limits a simple cyclotron.)

**Velocity selector** (OCR A 6.3.2(c), Eduqas C3.9(j)). An electric field and a magnetic field at right angles to each other and to the beam. Electric force QE one way, magnetic force BQv the other. Particles go straight through only if QE = BQv, so v = E/B. Slower particles are bent by the electric force, faster by the magnetic force. Used before a mass spectrometer so all ions have the same speed.

**Hall effect** (Eduqas C3.9(c), (d)). A current I flows along a thin slice of semiconductor (or metal) of thickness t in a magnetic field B perpendicular to its face. The magnetic force pushes charge carriers sideways, so charge builds up on one side and the opposite charge on the other. This creates an electric field across the slice. Equilibrium is reached when the electric force balances the magnetic force: eV_H/d = Bev, where d is the width and v the drift velocity. Using I = nAev with A = dt:

**V_H = BI/(nte)**

V_H ∝ B, so a Hall probe (calibrated) measures magnetic flux density. Semiconductors have small n, so give a larger Hall voltage than metals. The sign of V_H shows whether carriers are positive or negative.

### Worked example

1. A proton moving at 2.0 × 10⁶ m s⁻¹ enters a 0.50 T field at right angles. Find the radius of its path and its orbital frequency.

   r = mv/(BQ) = 1.67 × 10⁻²⁷ × 2.0 × 10⁶ / (0.50 × 1.60 × 10⁻¹⁹) = 0.042 m. f = BQ/(2πm) = 7.6 × 10⁶ Hz.

2. Find the maximum kinetic energy of protons from a cyclotron of radius 0.50 m in a 1.2 T field.

   v = BQr/m = 1.2 × 1.60 × 10⁻¹⁹ × 0.50/1.67 × 10⁻²⁷ = 5.75 × 10⁷ m s⁻¹. Ek = ½mv² = 2.76 × 10⁻¹² J = 17 MeV.

3. A velocity selector has E = 3.0 × 10⁴ V m⁻¹ and B = 0.060 T. Which speed passes undeflected?

   v = E/B = 5.0 × 10⁵ m s⁻¹.

4. (Eduqas) A semiconductor slice 0.50 mm thick has n = 1.0 × 10²² m⁻³ and carries 10 mA in a field of 0.20 T. Find V_H.

   V_H = BI/(nte) = 0.20 × 0.010 / (1.0 × 10²² × 5.0 × 10⁻⁴ × 1.60 × 10⁻¹⁹) = 2.5 × 10⁻³ V.

### Common mistakes

- Getting the direction wrong for negative particles.
- Saying the magnetic force increases the speed of a charged particle.
- Saying the time per revolution in a cyclotron increases as the particle speeds up.

## 3.7.5.3 Magnetic flux and flux linkage

*Refs: AQA 3.7.5.3, RP11 · Edexcel 121 · OCR A 6.3.3(a), (b) · OCR B 6.1.1(a)(iv), (b)(i), (b)(iii), (c)(i) · Eduqas C3.10(a). Level: A-level only.*

### What you need to know

- Magnetic flux Φ = BA, where B is normal to the area A. Unit the weber (Wb = T m²).
- Flux linkage NΦ, where N is the number of turns.
- For a coil at angle θ (between the field and the normal to the coil): NΦ = BAN cos θ.
- AQA required practical 11: flux linkage with angle, using a search coil and oscilloscope.
- (OCR B) Magnetic circuits.

### Explained

**Flux** Φ = BA cos θ, where θ is the angle between the field and the normal to the area. Think of it as the number of field lines passing through the area. Maximum when the coil faces the field (θ = 0), zero when the coil is edge-on (θ = 90°).

**Flux linkage** NΦ = BAN cos θ, unit Wb (or Wb-turns). Each turn of a coil links the same flux.

**Magnetic circuits** (OCR B 6.1.1(a)(iv)). In a transformer or motor, flux follows a closed path (like current round an electric circuit). The "current-turns" NI drive the flux; the flux is larger when the path has high permeance (iron, short, wide paths) and smaller when it includes air gaps (low permeance). So: Φ = permeance × NI. Iron cores and small air gaps make efficient machines. Lines of flux form continuous loops. Making an electromagnetic machine bigger (scaling up all dimensions) increases the flux produced and the force more than proportionally, which is why large generators and motors are more efficient.

### Worked example

1. A coil of 200 turns and area 4.0 × 10⁻³ m² is in a field of 0.050 T at 60° to the normal of the coil. Find the flux linkage.

   NΦ = 0.050 × 4.0 × 10⁻³ × 200 × cos 60° = 0.020 Wb-turns.

### Common mistakes

- Using sin θ when θ is measured from the normal (or cos when θ is from the plane).
- Forgetting N.

### Practical

**AQA required practical 11:** investigate how flux linkage varies with the angle between a search coil and the field.

1. Produce an alternating magnetic field with a large coil (or a pair of Helmholtz coils, or a solenoid) connected to a signal generator.
2. Place a small search coil (many turns of fine wire on a former, with a protractor) at the centre, connected to an oscilloscope.
3. The alternating field induces an alternating e.m.f. in the search coil; its peak value is proportional to the peak flux linkage.
4. Rotate the search coil in 10° steps from 0° to 90° (and beyond), measuring the peak-to-peak voltage on the oscilloscope each time.
5. Plot peak e.m.f. against cos θ: a straight line through the origin, confirming NΦ ∝ cos θ.

Keep the frequency and the current in the field coil constant throughout.

## 3.7.5.4 Electromagnetic induction

*Refs: AQA 3.7.5.4 · Edexcel 124, 125, 126, 127 · OCR A 6.3.3(c), (d), (e) · OCR B 6.1.1(a)(i), (ii), (b)(ii), (c)(i), (d)(i) · Eduqas C3.10(b) to (e). Level: A-level only.*

### What you need to know

- Simple induction experiments.
- Faraday's law: induced e.m.f. = rate of change of flux linkage, ε = NΔΦ/Δt.
- Lenz's law: the induced e.m.f. opposes the change that produces it; link to conservation of energy.
- A straight conductor moving across a field: ε = Blv.
- A coil rotating uniformly in a field: ε = BANω sin ωt.
- (Edexcel 124, 125) Factors affecting the e.m.f. induced by a moving magnet or by a changing current in a linked coil.

### Explained

**Induction.** An e.m.f. is induced in a conductor when the magnetic flux linking it changes. This happens when:

- a magnet moves into or out of a coil, or a coil moves near a magnet;
- a conductor cuts across field lines;
- the current in a nearby coil changes (so its field changes), as in a transformer;
- a coil rotates in a field (a generator).

If the circuit is complete, a current flows.

**Faraday's law.** The magnitude of the induced e.m.f. equals the rate of change of flux linkage: ε = Δ(NΦ)/Δt. A bigger e.m.f. comes from: a stronger magnet, faster movement, more turns, a larger coil area, or an iron core.

**Lenz's law.** The direction of the induced e.m.f. (and current) is such as to oppose the change causing it. Combined: ε = −d(NΦ)/dt (Edexcel 127).

Example: pushing the N pole of a magnet into a coil induces a current that makes the near end of the coil a N pole, repelling the magnet. You must do work to push the magnet in, and this work becomes electrical energy. If the induced current helped the magnet in, energy would be created from nothing, so Lenz's law is a consequence of conservation of energy.

**Moving straight conductor.** A rod of length l moving at speed v perpendicular to a field B sweeps out area lv each second, so the rate of change of flux is Blv: ε = Blv. Direction from Fleming's right-hand rule (generators), or by Lenz's law (the current in the rod produces a force opposing its motion).

**Rotating coil (a.c. generator).** A coil of N turns and area A rotates at angular speed ω in a uniform field B. Flux linkage NΦ = BAN cos ωt. Differentiating: ε = BANω sin ωt. Peak e.m.f. ε₀ = BANω.

- E.m.f. is maximum when the coil is parallel to the field (flux linkage zero but changing fastest).
- E.m.f. is zero when the coil is perpendicular to the field (flux linkage maximum, momentarily not changing).
- Doubling the rotation speed doubles both the peak e.m.f. and the frequency.

**Graphs** (OCR B 6.1.1(b)(ii)). The e.m.f.–time graph is minus the gradient of the flux linkage–time graph. A magnet dropped through a coil gives a positive pulse as it enters and a larger, shorter negative pulse as it leaves (it is moving faster); the areas of the two pulses (= change in flux linkage) are equal.

**Eddy currents.** Changing flux induces currents that swirl inside solid metal. By Lenz's law they oppose the change: they cause magnetic braking (a magnet falling through a copper tube falls slowly; braking in trains) and heating (induction hobs). In transformers they waste energy, so cores are laminated (thin insulated sheets).

### Worked example

1. A 500-turn coil of area 2.0 × 10⁻³ m² is in a field that falls uniformly from 0.40 T to zero in 0.050 s. Find the induced e.m.f.

   ε = NAΔB/Δt = 500 × 2.0 × 10⁻³ × 0.40/0.050 = 8.0 V.

2. An aircraft with a 40 m wingspan flies horizontally at 250 m s⁻¹ where the vertical component of the Earth's field is 4.0 × 10⁻⁵ T. Find the e.m.f. between its wing tips.

   ε = Blv = 4.0 × 10⁻⁵ × 40 × 250 = 0.40 V.

3. A generator coil has 120 turns of area 0.010 m² in 0.15 T and spins at 50 revolutions per second. Find the peak e.m.f.

   ω = 2π × 50 = 314 rad s⁻¹. ε₀ = 0.15 × 0.010 × 120 × 314 = 57 V.

### Common mistakes

- Saying an e.m.f. is induced when flux is large (it needs flux to be changing).
- Saying the generator e.m.f. is maximum when the coil faces the field.
- Getting Lenz's law direction wrong; ask "what change is happening, and how would the induced current oppose it?"

### Practical

**Induced e.m.f. with a falling magnet** (OCR B 6.1.1(d)(i), OCR A 6.3.3(d)(ii)). Drop a bar magnet through a coil connected to a data logger or oscilloscope; observe the two opposite pulses. Drop from a greater height: larger, narrower peaks. Use more turns: larger peaks.

## 3.7.5.5 Alternating currents

*Refs: AQA 3.7.5.5 · Edexcel 128, 129. Level: A-level only.*

### What you need to know

- Sinusoidal voltages and currents only: r.m.s., peak and peak-to-peak values.
- I_rms = I₀/√2, V_rms = V₀/√2.
- Calculating peak and peak-to-peak values of the mains.
- Using an oscilloscope as a d.c. and a.c. voltmeter, to measure time intervals and frequencies and to display waveforms (the controls, not the structure).

### Explained

An alternating current or p.d. reverses direction regularly. For a sinusoidal supply: V = V₀ sin ωt.

- Peak value V₀: maximum from zero.
- Peak-to-peak: 2V₀.
- Period T and frequency f = 1/T (UK mains: 50 Hz).

**Root mean square.** The r.m.s. value of an alternating p.d. (or current) is the value of the steady direct p.d. (or current) that would dissipate energy at the same rate in a resistor. Square the values, take the mean over a cycle, then square root. For a sine wave the mean of sin² is ½, so V_rms = V₀/√2 = 0.707V₀.

Mean power in a resistor: P = I_rms V_rms = I_rms²R = V_rms²/R = ½I₀V₀.

UK mains is 230 V r.m.s.: peak 230√2 = 325 V; peak-to-peak 650 V.

**Oscilloscope.** The trace shows p.d. (vertical) against time (horizontal).

- Y-gain (volts per division): p.d. = number of vertical divisions × Y-gain. For d.c., the trace jumps up or down by V/Y-gain divisions.
- Time-base (seconds or ms per division): time = horizontal divisions × time-base. Find T across several cycles, then f = 1/T.
- Turning the time-base off shows a vertical line whose length gives the peak-to-peak value.

### Worked example

1. An oscilloscope trace has a peak-to-peak height of 6.4 divisions at 2.0 V div⁻¹; one cycle spans 4.0 divisions at 5.0 ms div⁻¹. Find V₀, V_rms and f.

   V_pp = 12.8 V, V₀ = 6.4 V, V_rms = 4.5 V. T = 20 ms, f = 50 Hz.

2. A 2.3 kW heater runs on 230 V r.m.s. mains. Find the r.m.s. and peak currents.

   I_rms = 10 A. I₀ = 14 A.

### Common mistakes

- Using peak values in P = IV for mean power.
- Measuring peak-to-peak and calling it the peak.

## 3.7.5.6 The operation of a transformer

*Refs: AQA 3.7.5.6 · Edexcel 125 · OCR A 6.3.3(f) · OCR B 6.1.1(a)(i), (c)(iii), (iv), (d)(iii). Level: A-level only.*

### What you need to know

- The transformer equation Ns/Np = Vs/Vp.
- Transformer efficiency = IsVs/(IpVp).
- Eddy currents and other causes of inefficiency.
- Transmission of electrical power at high voltage, including calculating power losses in transmission lines.

### Explained

**How it works.** An alternating current in the primary coil produces an alternating magnetic flux in the iron core. The core carries this changing flux through the secondary coil, inducing an alternating e.m.f. there (Faraday's law). It only works with a.c. (d.c. gives no changing flux, except at switch-on).

**Equations.** For an ideal transformer (100% efficient, all flux linked):

- Vs/Vp = Ns/Np. Step-up: Ns > Np. Step-down: Ns < Np.
- Power in = power out: VpIp = VsIs, so Is/Ip = Np/Ns. A step-up transformer steps current down.
- Efficiency = IsVs/(IpVp).

**Losses and how to reduce them.**

| Loss | Cause | Reduce by |
| --- | --- | --- |
| Eddy currents | The changing flux induces currents in the core, which heat it | Laminated core: thin insulated sheets |
| Resistance of coils | I²R heating in the copper | Thick, low-resistance copper wire (especially for the high-current coil) |
| Hysteresis | Energy needed to magnetise and demagnetise the core each cycle | Soft iron core, which is easily magnetised and demagnetised |
| Flux leakage | Not all flux from the primary passes through the secondary | Wind coils on top of each other; well-designed core |

**Power transmission.** Power P = VI is sent along cables of resistance R. The power wasted as heat is P_loss = I²R. For a given power, increasing V by a factor of 10 reduces I by 10 and the loss by 100. So power stations step up to hundreds of kV (the National Grid uses 275 kV and 400 kV) and step down near consumers. Thinner cables can be used, saving cost. A.c. is used because transformers make changing voltage easy.

### Worked example

1. A transformer steps 230 V down to 12 V. The primary has 1150 turns. How many turns on the secondary? If the secondary delivers 3.0 A and the primary current is 0.18 A, find the efficiency.

   Ns = 1150 × 12/230 = 60 turns. Efficiency = (12 × 3.0)/(230 × 0.18) = 36/41.4 = 0.87.

2. A power station sends 50 MW through cables of total resistance 4.0 Ω. Compare the loss at 25 kV and 400 kV.

   At 25 kV: I = 2000 A, loss = 2000² × 4.0 = 1.6 × 10⁷ W (32%). At 400 kV: I = 125 A, loss = 6.25 × 10⁴ W (0.13%).

### Common mistakes

- Saying transformers work with d.c.
- Saying a step-up transformer increases power.
- Using V²/R with the transmission voltage for the cable loss (the full voltage is not across the cable).

### Practical

**Investigating transformers** (OCR B 6.1.1(d)(iii), suggested by AQA). Wind primary and secondary coils with different numbers of turns on a C-core. Connect the primary to a low-voltage a.c. supply. Measure Vp and Vs with a.c. voltmeters (or an oscilloscope) for different turns ratios; plot Vs against Ns/Np. Add a load resistor and measure currents to find efficiency. Compare with and without a laminated core, or with a gap in the core.

## Check questions

1. Define the tesla. (2 marks)
2. Describe how to measure the magnetic flux density between the poles of a magnet using a top-pan balance. (5 marks)
3. An electron moves at 4.0 × 10⁷ m s⁻¹ perpendicular to a field of 2.5 mT. Calculate the radius of its path. (2 marks)
4. Explain why the frequency of the a.c. supply in a cyclotron can be constant. (3 marks)
5. State Faraday's and Lenz's laws. (2 marks)
6. Explain, using Lenz's law, why a magnet dropped down a vertical copper pipe falls slowly. (3 marks)
7. A coil of 80 turns and area 25 cm² rotates at 3000 rpm in a 0.20 T field. Calculate the peak e.m.f. and sketch its variation with time. (4 marks)
8. Explain why electricity is transmitted at high voltage. (3 marks)
9. Give two causes of energy loss in a transformer and how each is reduced. (4 marks)

## Mark scheme

1. Flux density that produces a force of 1 N (1); on 1 m of wire carrying 1 A perpendicular to the field (1).
2. Magnet on balance, zeroed; wire clamped between poles perpendicular to field (1); measure current with ammeter, vary with rheostat (1); force = change in reading × g (1); plot F against I, gradient = Bl (1); measure length of wire in field; B = gradient/l (1).
3. r = mv/(Be) (1) = 9.11 × 10⁻³¹ × 4.0 × 10⁷/(2.5 × 10⁻³ × 1.60 × 10⁻¹⁹) = 0.091 m (1).
4. r = mv/BQ, so radius increases in proportion to speed (1); time for a semicircle = πr/v = πm/BQ (1); independent of speed, so particles always reach the gap after the same time (1).
5. Induced e.m.f. equals rate of change of flux linkage (1); direction opposes the change that causes it (1).
6. Falling magnet changes flux through the pipe, inducing eddy currents (1); by Lenz's law these produce a field opposing the motion of the magnet (1); so an upward force slows it; kinetic energy becomes heat in the pipe (1).
7. ω = 2π × 50 = 314 rad s⁻¹ (1); ε₀ = BANω = 0.20 × 2.5 × 10⁻³ × 80 × 314 = 12.6 V (2); sine curve, period 0.020 s (1).
8. For a given power, higher voltage means lower current (1); power loss = I²R (1); so much smaller losses / thinner cables (1).
9. Any two pairs: eddy currents, laminated core; resistance of coils, thick copper wire; hysteresis, soft iron core; flux leakage, coils wound together / good core design (2 + 2).
