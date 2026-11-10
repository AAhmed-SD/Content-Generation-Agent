---
level: A-level
subject: Physics
topic: "Thermal physics: internal energy, specific heat and latent heat, ideal gases and kinetic theory"
as_content: "A-level only for every board."
boards:
  - board: AQA
    code: "7408"
    spec_refs: ["3.6.2.1", "3.6.2.2", "3.6.2.3", "RP8"]
  - board: Edexcel
    code: "9PH0"
    spec_refs: ["144", "145", "146", "147", "148", "149", "150", "151", "152", "CP12", "CP13", "CP14"]
  - board: OCR A
    code: "H556"
    spec_refs: ["5.1.1(a)", "5.1.1(b)", "5.1.1(c)", "5.1.1(d)", "5.1.2(a)", "5.1.2(b)", "5.1.2(c)", "5.1.2(d)", "5.1.2(e)", "5.1.2(f)", "5.1.2(g)", "5.1.3(a)", "5.1.3(b)", "5.1.3(c)", "5.1.3(d)", "5.1.4(a)", "5.1.4(b)", "5.1.4(c)", "5.1.4(d)", "5.1.4(e)", "5.1.4(f)", "5.1.4(g)", "5.1.4(h)", "5.1.4(i)"]
  - board: OCR B
    code: "H557"
    spec_refs: ["5.2.1(a)(i)", "5.2.1(a)(ii)", "5.2.1(a)(iii)", "5.2.1(a)(iv)", "5.2.1(a)(v)", "5.2.1(a)(vi)", "5.2.1(b)(i)", "5.2.1(b)(ii)", "5.2.1(b)(iii)", "5.2.1(c)(i)", "5.2.1(c)(ii)", "5.2.1(c)(iii)", "5.2.1(d)(i)", "5.2.1(d)(ii)", "5.2.1(d)(iii)", "5.2.2(a)(i)", "5.2.2(a)(ii)", "5.2.2(b)(i)", "5.2.2(c)(i)", "5.2.2(c)(ii)"]
  - board: Eduqas
    code: "A420QS"
    spec_refs: ["C1.7(a)", "C1.7(b)", "C1.7(c)", "C1.7(d)", "C1.7(e)", "C1.7(f)", "C1.8(a)", "C1.8(b)", "C1.8(c)", "C1.8(d)", "C1.8(e)", "C1.8(f)", "C1.8(g)", "C1.8(h)", "C1.8(i)", "C1.8(j)", "C1.8(k)"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/physics-2015.html
  OCR A: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-a-h156-h556-from-2015/
  OCR B: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-b-advancing-physics-h157-h557-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/physics-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/a-level-aqa/
---

# Thermal physics: internal energy, specific heat and latent heat, ideal gases and kinetic theory

This file links the large-scale behaviour of matter (temperature, pressure, volume, heating) to the motion of its particles. It covers internal energy, temperature scales and absolute zero, specific heat capacity and specific latent heat, the gas laws and ideal gas equation (AQA required practical 8), the kinetic theory derivation of pV = ⅓Nm(c_rms)², molecular kinetic energy and temperature, and (for OCR B) the Boltzmann factor.

## Overview

A-level only for every board. The first law of thermodynamics, p–V diagrams and engines (AQA option 3.11.2) are in file 25; Eduqas C1.8's first-law points are covered here because they are core for Eduqas. Black-body radiation (Edexcel 153 to 155) is in file 20. Thermal conduction and U-values (Eduqas option D) are in file 38.

### Board differences

- AQA 3.6.2, RP8 · Edexcel 144 to 152, CP12 to CP14 · OCR A 5.1 · OCR B 5.2 · Eduqas C1.7, C1.8.
- Edexcel CP12: calibrating a thermistor in a potential divider as a thermostat. CP13: specific latent heat. CP14: p against V at constant temperature (Boyle's law).
- OCR A 5.1.3(b), (d) and OCR B 5.2.1(d)(i), Eduqas specified practical: electrical methods for specific heat capacity (and OCR A for latent heat). AQA suggests an electrical method or the method of mixtures.
- Eduqas specified practical and OCR B 5.2.1(d)(ii): estimating absolute zero using the gas laws.
- OCR B only: random walk of gas molecules (distance ∝ √N steps) and the Boltzmann factor e^(−E/kT) with activation energy processes (5.2.2).
- Eduqas C1.8 includes the first law ΔU = Q − W, W = pΔV and U = (3/2)nRT for a monatomic gas, as core content.
- OCR A 5.1.2(c) and AQA: Brownian motion as evidence for atoms.

## 3.6.2.1 Thermal energy transfer

*Refs: AQA 3.6.2.1 · Edexcel 144, 146, 147, CP12, CP13 · OCR A 5.1.1(a) to (d), 5.1.2(a), (b), (d) to (g), 5.1.3(a) to (d) · OCR B 5.2.1(a)(i), (c)(i), (d)(i) · Eduqas C1.8(a), (b), (d), (e), (f), (i), (j), (k). Level: A-level only.*

### What you need to know

- Internal energy is the sum of the randomly distributed kinetic and potential energies of the particles in a body.
- Internal energy increases when energy is transferred to the body by heating or when work is done on it (and decreases the other way); a qualitative first law.
- During a change of state, potential energies of the particles change but kinetic energies do not.
- Q = mcΔθ for a change of temperature (c = specific heat capacity), including continuous flow.
- Q = ml for a change of state (l = specific latent heat of fusion or vaporisation).
- (OCR A, Eduqas) Thermal equilibrium; temperature scales; absolute zero; T(K) = θ(°C) + 273.

### Explained

**Temperature and thermal equilibrium.** Energy flows by heating from a hotter object to a colder one. When no net energy flows between two objects in contact, they are in thermal equilibrium and have the same temperature (Eduqas C1.8(e)). Heat and work are energy in transit, not stored in the object (Eduqas C1.8(d), (f)).

**Absolute temperature.** The kelvin scale starts at absolute zero (0 K = −273.15 °C), the lowest possible temperature, at which particles have minimum internal energy (Eduqas C1.8(b)); in the simple kinetic model, their kinetic energy is zero. T/K = θ/°C + 273. A temperature change of 1 K equals a change of 1 °C.

**Solids, liquids and gases** (OCR A 5.1.2(a), (b)).

| State | Spacing | Arrangement | Motion |
| --- | --- | --- | --- |
| Solid | Close | Regular lattice | Vibrate about fixed positions |
| Liquid | Close (slightly more than solid) | Irregular, no fixed positions | Move around each other, randomly |
| Gas | Far apart (about 10 × diameter) | Random | Move fast and randomly; collide |

**Internal energy.** The sum of the kinetic energies (from random motion) and potential energies (from the forces between particles) of all the particles. It increases if the object is heated or if work is done on it (e.g. compressing a gas, rubbing). This is the first law in words: ΔU = Q + W_on (or ΔU = Q − W_by; see file 25).

**Change of state.** While a solid melts or a liquid boils at constant temperature, the energy supplied breaks or weakens bonds: potential energy rises, kinetic energy (and so temperature) stays the same. A heating curve (temperature against time with constant power) shows sloping parts (temperature rising, kinetic energy rising) and flat parts (changes of state).

**Specific heat capacity** c: the energy needed to raise the temperature of 1 kg of a substance by 1 K. Q = mcΔθ. Water: 4200 J kg⁻¹ K⁻¹; copper 390; aluminium 900.

**Specific latent heat** l (or L): the energy needed to change the state of 1 kg without a change of temperature. Q = ml. Fusion (solid ↔ liquid): water 3.3 × 10⁵ J kg⁻¹. Vaporisation (liquid ↔ gas): water 2.26 × 10⁶ J kg⁻¹. Vaporisation needs much more energy because the particles must be separated completely and work is done pushing back the atmosphere.

**Continuous flow.** For a fluid flowing at mass rate m/t through a heater of power P: P = (m/t)cΔθ. Example: an electric shower.

**Method of mixtures.** Energy lost by the hot substance = energy gained by the cold: m₁c₁(θ₁ − θ) = m₂c₂(θ − θ₂), assuming no losses to the surroundings.

### Worked example

1. How much energy is needed to turn 0.50 kg of ice at −10 °C into water at 20 °C? (c_ice = 2100, c_water = 4200 J kg⁻¹ K⁻¹, l_f = 3.3 × 10⁵ J kg⁻¹)

   Warm ice: 0.50 × 2100 × 10 = 10 500 J. Melt: 0.50 × 3.3 × 10⁵ = 165 000 J. Warm water: 0.50 × 4200 × 20 = 42 000 J. Total = 2.2 × 10⁵ J.

2. An electric shower heats water from 12 °C to 40 °C at a flow rate of 0.12 kg s⁻¹. Find the power.

   P = 0.12 × 4200 × 28 = 1.4 × 10⁴ W (14 kW).

3. 0.20 kg of copper at 100 °C is dropped into 0.30 kg of water at 20 °C. Find the final temperature.

   0.20 × 390 × (100 − θ) = 0.30 × 4200 × (θ − 20). 7800 − 78θ = 1260θ − 25 200. 33 000 = 1338θ, θ = 24.7 °C.

### Common mistakes

- Saying temperature rises during melting.
- Saying internal energy is only kinetic energy (true only for an ideal gas).
- Saying heat is "contained" in an object.
- Forgetting to convert grams to kilograms.

### Practical

**Specific heat capacity by an electrical method** (OCR A 5.1.3(b) PAG11, OCR B 5.2.1(d)(i), Eduqas specified practical; suggested by AQA). Put an immersion heater and a thermometer in holes in an insulated metal block of known mass (or in a known mass of liquid in an insulated beaker, stirred). Connect the heater to a supply with an ammeter and voltmeter. Record the starting temperature, switch on and start a stopwatch; record temperature every minute. Energy supplied = VIt. Plot θ against t: gradient = VI/(mc), so c = VI/(m × gradient). Using the gradient of the straight part reduces the effect of the slow start (the heater warming up). Errors: energy lost to the surroundings makes c too large; insulate, add a lid, start below room temperature and finish the same amount above it.

**Edexcel CP13** (also OCR A 5.1.3(d)): specific latent heat. For fusion: put crushed ice in a funnel with an immersion heater; collect the melted water in a beaker for a set time with the heater on, and in an identical control funnel with the heater off (to allow for melting from the room). l = VIt / (m_heated − m_control). For vaporisation: weigh a beaker of boiling water on a balance while heating; l = P Δt / Δm.

**Edexcel CP12:** calibrate a thermistor in a potential divider as a thermostat. Put the thermistor in a water bath with a thermometer, in series with a fixed (or variable) resistor across a supply; record Vout across the fixed resistor at each temperature as the water is heated. Plot Vout against temperature; use the graph to set the variable resistor so the output reaches a switching voltage at the required temperature.

**Phase change with a data logger** (AQA suggested). Heat stearic acid (or melt and let it cool) with a temperature probe and data logger; the flat part of the graph shows the change of state.

## 3.6.2.2 Ideal gases

*Refs: AQA 3.6.2.2, RP8 · Edexcel 148, 150, 151, CP14 · OCR A 5.1.4(a), (d), (g), (h) · OCR B 5.2.1(a)(ii), (b)(i), (ii), (c)(ii), (d)(ii), (iii) · Eduqas C1.7(a), (d), (e), C1.8(g), (h). Level: A-level only.*

### What you need to know

- The gas laws as experimental relationships between p, V, T and mass.
- The concept of absolute zero.
- Ideal gas equation: pV = nRT for n moles; pV = NkT for N molecules.
- Work done by a gas at constant pressure = pΔV.
- The Avogadro constant N_A, the molar gas constant R and the Boltzmann constant k = R/N_A.
- Molar mass and molecular mass.
- AQA required practical 8: Boyle's law and Charles's law.

### Explained

**Gas laws** (for a fixed mass of gas):

| Law | Constant | Relationship | Graph |
| --- | --- | --- | --- |
| Boyle's | Temperature | pV = constant (p ∝ 1/V) | p against 1/V: straight line through origin |
| Charles's | Pressure | V/T = constant (V ∝ T) | V against T(K): straight line through origin; against θ(°C): line meeting the axis at −273 °C |
| Pressure law | Volume | p/T = constant (p ∝ T) | p against θ(°C): extrapolates to zero at −273 °C |

Combined: pV/T = constant, so p₁V₁/T₁ = p₂V₂/T₂. Temperatures must be in kelvin.

**Absolute zero from the gas laws.** Extrapolating V (or p) against θ in °C back to zero always meets the temperature axis at about −273 °C, whatever the gas. This is absolute zero, where an ideal gas would have zero volume or pressure (its particles would have no kinetic energy).

**Moles.** 1 mole contains N_A = 6.02 × 10²³ particles (the Avogadro constant). n = N/N_A. Molar mass M = mass of 1 mol (kg mol⁻¹). Molecular mass m = M/N_A. Relative molecular mass M_r: molar mass in grams per mole (Eduqas C1.7(e): M = M_r/1000 kg mol⁻¹).

**Ideal gas equation.** pV = nRT, R = 8.31 J mol⁻¹ K⁻¹. Equivalently pV = NkT, with k = R/N_A = 1.38 × 10⁻²³ J K⁻¹. An ideal gas obeys this exactly at all pressures and temperatures; real gases do so at low pressure and well above their boiling point.

**Work done by a gas.** At constant pressure, a gas expanding by ΔV pushes back its surroundings: W = pΔV. On a p–V graph, work done = area under the line (also when p changes, Eduqas C1.8(h)).

### Worked example

1. A cylinder of volume 0.050 m³ holds oxygen at 2.0 × 10⁶ Pa and 17 °C. Find the number of moles and the mass (M = 0.032 kg mol⁻¹).

   n = pV/RT = 2.0 × 10⁶ × 0.050 / (8.31 × 290) = 41.5 mol. Mass = 41.5 × 0.032 = 1.33 kg.

2. A gas at 300 K and 1.0 × 10⁵ Pa is heated to 450 K and compressed to half its volume. Find its new pressure.

   p₂ = p₁ × (V₁/V₂) × (T₂/T₁) = 1.0 × 10⁵ × 2 × 1.5 = 3.0 × 10⁵ Pa.

3. A gas expands at a constant pressure of 1.2 × 10⁵ Pa from 2.0 × 10⁻³ m³ to 3.5 × 10⁻³ m³. Find the work done by the gas.

   W = pΔV = 1.2 × 10⁵ × 1.5 × 10⁻³ = 180 J.

### Common mistakes

- Using °C in the gas equations.
- Mixing up n (moles) and N (number of molecules).
- Using grams per mole as kg per mole.
- Saying Charles's law gives V ∝ θ in °C.

### Practical

**AQA required practical 8** (also Edexcel CP14 for Boyle's law, OCR A 5.1.4(d) PAG8, OCR B 5.2.1(d)(ii), (iii)): investigate Boyle's law and Charles's law.

*Boyle's law.* A column of air is trapped in a glass tube above oil. A pump (or syringe) pushes oil into the tube to compress the air; a Bourdon gauge measures pressure. Volume = length of air column × cross-sectional area (the length is proportional to volume for a uniform tube). Increase the pressure in steps, waiting a few moments each time for the air to return to room temperature (compression warms it). Plot p against 1/V: a straight line through the origin confirms p ∝ 1/V. Safety: wear goggles; do not exceed the gauge's safe pressure.

*Charles's law.* A capillary tube with a bead of concentrated sulfuric acid (or oil) trapping air, sealed at the bottom, is fixed to a ruler and placed in a beaker of water. Heat the water in steps, stirring and waiting for the trapped air to reach the water temperature; record the length of the air column (proportional to volume) and the temperature. Plot length against θ (°C) and extrapolate to zero length: the intercept is absolute zero, about −273 °C. Safety: the acid is corrosive (goggles, gloves); hot water.

**Estimating absolute zero with the pressure law** (Eduqas specified practical, OCR B 5.2.1(d)(ii)). A flask of air connected to a pressure gauge is put in water baths at different temperatures (ice, room, hot, boiling). Plot p against θ and extrapolate to p = 0.

## 3.6.2.3 Molecular kinetic theory model

*Refs: AQA 3.6.2.3 · Edexcel 147, 148, 149, 152 · OCR A 5.1.2(c), 5.1.4(b), (c), (e), (f), (h), (i) · OCR B 5.2.1(a)(iii) to (vi), (b)(iii), (c)(iii) · Eduqas C1.7(b), (c), (f), C1.8(c). Level: A-level only.*

### What you need to know

- Brownian motion as evidence for the existence of atoms (molecules).
- The gas laws explained with a simple molecular model.
- The gas laws are empirical (from experiment); kinetic theory comes from theory.
- The assumptions of kinetic theory and the derivation of pV = ⅓Nm(c_rms)² using conservation of momentum.
- For an ideal gas, internal energy is only the kinetic energy of the particles.
- Average molecular kinetic energy: ½m(c_rms)² = (3/2)kT = 3RT/(2N_A).
- How understanding of gases changed over time.
- (OCR B) Random walk: distance moved after N steps ∝ √N. Boltzmann factor.

### Explained

**Brownian motion.** Smoke particles in air, viewed through a microscope in a smoke cell with light shining from the side, move in random, jerky paths. This is because they are hit unevenly by much smaller, fast-moving, invisible air molecules. It was strong evidence that atoms and molecules exist (explained by Einstein in 1905).

**Explaining the gas laws.**

- Pressure: molecules collide with the walls; each collision changes their momentum, so the wall exerts a force on them and they exert an equal and opposite force on it. Pressure = total force ÷ area.
- Boyle's law: at constant T, mean speed is fixed. Halving the volume doubles the number of molecules per unit volume, so collisions with each area of wall per second double, so p doubles.
- Charles's law / pressure law: raising T increases mean speed; molecules hit the walls harder and more often. At constant volume pressure rises; at constant pressure the gas expands so that the collision rate per area falls back.

**Assumptions of kinetic theory** (for an ideal gas).

1. The gas contains a very large number of identical molecules moving randomly.
2. The volume of the molecules is negligible compared with the volume of the container.
3. There are no forces between molecules except during collisions (so no potential energy).
4. Collisions (with each other and with walls) are perfectly elastic.
5. The time spent in collisions is negligible compared with the time between them.
6. Newton's laws apply; gravity is negligible.

**Derivation of pV = ⅓Nm(c_rms)².**

1. Consider one molecule of mass m in a cube of side L, moving with velocity component u in the x-direction.
2. It hits a wall and rebounds elastically: change in momentum = mu − (−mu) = 2mu.
3. It travels 2L before hitting the same wall again; time between collisions = 2L/u.
4. Average force on the wall from this molecule = rate of change of momentum = 2mu/(2L/u) = mu²/L.
5. For N molecules with different speeds: total force = (m/L)(u₁² + u₂² + …) = (Nm/L) × mean(u²).
6. Pressure = force/area = (Nm/L³) × mean(u²) = (Nm/V) × mean(u²).
7. Molecules move randomly in three dimensions: mean(c²) = mean(u²) + mean(v²) + mean(w²) = 3 mean(u²).
8. So p = Nm(c_rms)²/(3V), giving **pV = ⅓Nm(c_rms)²**. Also p = ⅓ρ(c_rms)², where ρ = Nm/V.

**Root mean square speed.** c_rms = √(mean of c²): square every speed, take the mean, then the square root. It is slightly larger than the mean speed.

**Temperature and molecular kinetic energy.** Combine pV = ⅓Nm(c_rms)² with pV = NkT:

⅓Nm(c_rms)² = NkT → **½m(c_rms)² = (3/2)kT = 3RT/(2N_A)**

So the mean kinetic energy of a gas molecule is proportional to absolute temperature, and is the same for all gases at the same temperature. Heavier molecules move more slowly.

**Internal energy of an ideal gas.** There are no intermolecular forces, so no potential energy: internal energy = total kinetic energy = N × (3/2)kT = (3/2)nRT (for a monatomic gas; Eduqas C1.8(c), OCR A 5.1.4(i)).

**History** (AQA). Boyle (1662) and Charles (1787) found the gas laws by experiment. Bernoulli, then Clausius, Maxwell and Boltzmann (1800s) explained them with moving particles. The atomic model was only fully accepted after Brownian motion was explained (Einstein 1905, tested by Perrin 1908).

**Random walk** (OCR B 5.2.1(a)(vi)). A molecule in air travels a short distance (the mean free path, about 10⁻⁷ m) before colliding and changing direction randomly. After N steps of length s in random directions, its typical displacement from the start is s√N, not sN. This is why smells spread slowly in still air even though molecules move at hundreds of m s⁻¹.

**Boltzmann factor** (OCR B 5.2.2). At temperature T, the ratio of the number of particles in a state with energy E above another state is e^(−E/kT). kT is a typical thermal energy (about 0.025 eV at room temperature).

- If E is much bigger than kT (say E/kT > 30), the Boltzmann factor is tiny and the process hardly happens.
- If E is only a few times kT, the process happens readily.

Processes with an activation energy E depend strongly on temperature because the fraction of particles with enough energy is about e^(−E/kT): evaporation and boiling, thermionic emission from a hot cathode, ionisation in a flame, the rise in conduction electrons in a semiconductor (so its resistance falls when heated), viscous flow (liquids flow more easily when warm), and chemical reaction rates. A rough rule: when E ≈ 15 to 30 kT, the process becomes noticeable.

### Worked example

1. Find the r.m.s. speed of nitrogen molecules (m = 4.65 × 10⁻²⁶ kg) at 20 °C.

   ½m(c_rms)² = 1.5 × 1.38 × 10⁻²³ × 293 = 6.07 × 10⁻²¹ J. c_rms = √(2 × 6.07 × 10⁻²¹ / 4.65 × 10⁻²⁶) = 511 m s⁻¹.

2. Five molecules have speeds 300, 400, 500, 600 and 700 m s⁻¹. Find the mean and r.m.s. speeds.

   Mean = 500 m s⁻¹. Mean of squares = (9 + 16 + 25 + 36 + 49) × 10⁴/5 = 2.7 × 10⁵. c_rms = 520 m s⁻¹.

3. Find the internal energy of 2.0 mol of helium at 300 K.

   U = 1.5 × 2.0 × 8.31 × 300 = 7.5 × 10³ J.

4. (OCR B) An activation energy is 0.60 eV. Find the Boltzmann factor at 300 K and at 600 K.

   kT at 300 K = 4.14 × 10⁻²¹ J = 0.0259 eV; E/kT = 23.2; e^(−23.2) = 8.4 × 10⁻¹¹. At 600 K: E/kT = 11.6; e^(−11.6) = 9.1 × 10⁻⁶. Doubling T increases the factor about 10⁵ times.

5. (OCR B) A molecule takes 10⁸ random steps of 70 nm. Estimate its displacement.

   s√N = 70 × 10⁻⁹ × 10⁴ = 7 × 10⁻⁴ m (0.7 mm), although it has travelled 7 m.

### Common mistakes

- Forgetting to take the square root when finding c_rms.
- Writing pV = ⅓Nmc² with c as the mean speed instead of c_rms.
- Saying molecules stop at 0 °C.
- Saying all molecules in a gas have the same speed.
- In the derivation, writing the change of momentum as mu instead of 2mu.

## Check questions

1. Define the internal energy of a substance. (2 marks)
2. Explain why the temperature of water stays constant while it boils, even though energy is still supplied. (3 marks)
3. A 2.0 kW kettle contains 1.2 kg of water at 15 °C. Estimate how long it takes to boil, and then how much longer to boil away 0.10 kg. (4 marks)
4. Describe how to verify Boyle's law and how to analyse the results. (5 marks)
5. A balloon holds 0.012 m³ of helium at 1.1 × 10⁵ Pa and 22 °C. Calculate the number of helium atoms. (2 marks)
6. State four assumptions of the kinetic theory of an ideal gas. (4 marks)
7. Derive pV = ⅓Nm(c_rms)². (6 marks)
8. Show that the mean kinetic energy of a gas molecule is (3/2)kT, and calculate it at 400 K. (3 marks)
9. Explain how Brownian motion provides evidence for the existence of molecules. (3 marks)

## Mark scheme

1. Sum of the (randomly distributed) kinetic and potential energies (1); of all the particles in the substance (1).
2. Energy breaks / overcomes bonds between molecules (1); increases potential energy of molecules (1); mean kinetic energy unchanged, so temperature constant (1).
3. Q = 1.2 × 4200 × 85 = 4.28 × 10⁵ J (1); t = 214 s (about 3.6 min) (1); Q = 0.10 × 2.26 × 10⁶ = 2.26 × 10⁵ J (1); t = 113 s (1).
4. Trapped air column in tube, compressed by oil using pump; pressure on gauge (1); volume from length × area (1); change pressure in steps, wait for temperature to return to room temperature (1); plot p against 1/V (1); straight line through origin shows p ∝ 1/V (1).
5. N = pV/kT = 1.1 × 10⁵ × 0.012 / (1.38 × 10⁻²³ × 295) (1) = 3.2 × 10²³ (1).
6. Any four: large number of molecules moving randomly; negligible molecular volume; no intermolecular forces except in collisions; collisions perfectly elastic; collision time negligible compared with time between collisions; Newton's laws apply.
7. Molecule rebounds from wall, momentum change 2mu (1); time between collisions with same wall 2L/u (1); force = mu²/L (1); total force for N molecules = Nm mean(u²)/L; pressure = force/L² (1); mean(u²) = ⅓ mean(c²) by random motion in 3D (1); pV = ⅓Nm(c_rms)² (1).
8. pV = NkT = ⅓Nm(c_rms)², so ½m(c_rms)² = (3/2)kT (2); = 1.5 × 1.38 × 10⁻²³ × 400 = 8.3 × 10⁻²¹ J (1).
9. Smoke particles seen moving randomly / jerkily (1); due to uneven bombardment by much smaller molecules (1); the molecules cannot be seen, so the particle motion is indirect evidence they exist and move randomly (1).
