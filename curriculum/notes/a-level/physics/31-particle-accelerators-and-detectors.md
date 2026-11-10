---
level: A-level
subject: Physics
topic: "Particle accelerators and detectors: linacs, cyclotrons, particle tracks and probing the nucleon"
as_content: "A-level only (Edexcel Topic 8, OCR B 6.2.1). AQA 3.7.5.2 (cyclotron) is in file 17."
boards:
  - board: AQA
    code: "7408"
    spec_refs: ["3.7.5.2"]
  - board: Edexcel
    code: "9PH0"
    spec_refs: ["132", "133", "134", "135", "136"]
  - board: OCR B
    code: "H557"
    spec_refs: ["6.2.1(a)(i)", "6.2.1(c)(i)"]
  - board: Eduqas
    code: "A420QS"
    spec_refs: ["C3.9(i)", "C3.9(j)"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/physics-2015.html
  OCR B: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-b-advancing-physics-h157-h557-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/physics-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/a-level-edexcel/
---

# Particle accelerators and detectors: linacs, cyclotrons, particle tracks and probing the nucleon

To study the smallest structures in matter, physicists accelerate particles to very high energies and smash them together, then track what comes out. This file covers producing charged particles by thermionic emission, the linear accelerator and the cyclotron, the radius of a charged particle's path in a magnetic field (r = p/BQ), how detectors work (ionisation and deflection), interpreting particle tracks with conservation laws, and why high energies are needed to probe nucleons.

## Overview

A-level only. Edexcel 132 to 136; OCR B 6.2.1(a)(i), (c)(i); Eduqas C3.9(i), (j) (ion beams in fields). The force on a moving charge and the cyclotron (AQA) are in file 17; electric fields in file 15; quarks, conservation laws and creation of particle–antiparticle pairs in file 02; relativistic effects in file 27; thermionic emission in file 26; electron diffraction from nuclei in file 18.

### Board differences

- Edexcel 132 to 136 · OCR B 6.2.1(a)(i), (c)(i) · Eduqas C3.9(i), (j) · AQA 3.7.5.2.
- Edexcel 133 names the linac and cyclotron, and detectors in terms of ionisation and deflection only. Edexcel 134: derive r = p/(BQ). Edexcel 136: why high energies are needed to investigate the structure of nucleons.
- OCR B 6.2.1(a)(i): accelerators generate high-energy beams for scattering experiments.
- Eduqas C3.9(i), (j): how ion beams are deflected in electric and magnetic fields (including mass spectrometry and velocity selection, file 17).

## Accelerating charged particles

*Refs: Edexcel 132, 133 · OCR B 6.2.1(a)(i) · AQA 3.7.5.2. Level: A-level only.*

### What you need to know

- Electrons are released by thermionic emission and accelerated by electric fields; magnetic fields bend them.
- The role of electric and magnetic fields in the linear accelerator (linac) and cyclotron.

### Explained

**Sources.** Electrons come from a heated filament (thermionic emission). Protons and other ions come from ionising a gas.

**Electric fields accelerate.** A particle of charge Q crossing a p.d. V gains kinetic energy QV. A magnetic force is always perpendicular to the velocity, so magnetic fields change direction but never speed: they steer and focus beams.

**Linear accelerator (linac).** A long evacuated tube containing a line of cylindrical electrodes ("drift tubes"), connected alternately to the two terminals of a high-frequency alternating supply.

1. A particle is accelerated across the gap between two tubes, because the next tube has the opposite charge at that moment.
2. Inside a tube there is no electric field (it is a hollow conductor), so the particle drifts at constant speed.
3. While it is inside, the supply reverses polarity, so when it reaches the next gap it is accelerated again.
4. Because the particle speeds up, each tube must be longer than the one before, so that the time spent in each is the same (half a period of the a.c.).

At relativistic speeds (close to c) the speed hardly changes, so tubes become nearly equal in length. Linacs produce beams for X-ray therapy and inject particles into larger accelerators. Advantages: no energy loss from bending the beam (no synchrotron radiation). Disadvantages: very long for high energies (the Stanford linac is 3 km).

**Cyclotron.** See file 17 for the full description: two dees with an alternating p.d. across the gap and a uniform magnetic field perpendicular to them. The particle spirals outwards, accelerated at each gap crossing; the time for each semicircle (πm/BQ) is independent of speed, so a constant-frequency supply works. At relativistic speeds, the mass increase makes the period grow, so simple cyclotrons are limited to protons of tens of MeV. (A synchrotron varies the magnetic field and the frequency to keep particles in a fixed circular ring, reaching TeV energies, as at the LHC.)

### Worked example

1. A proton passes through 20 gaps of a linac, each with a p.d. of 200 kV. Find its final kinetic energy.

   20 × 200 keV = 4.0 MeV (6.4 × 10⁻¹³ J).

2. A linac uses a 10 MHz supply. A proton has speed 3.0 × 10⁶ m s⁻¹ inside one drift tube. How long must the tube be?

   Time in tube = half period = 5.0 × 10⁻⁸ s. Length = 3.0 × 10⁶ × 5.0 × 10⁻⁸ = 0.15 m.

### Common mistakes

- Saying the particle is accelerated inside the drift tubes.
- Saying magnetic fields increase particle speed in a cyclotron.

## Charged particles in magnetic fields: r = p/BQ

*Refs: Edexcel 134 · OCR B 6.2.1(c)(i) · Eduqas C3.9(i), (j). Level: A-level only.*

### What you need to know

- Derive and use r = p/(BQ) for a charged particle in a magnetic field.

### Explained

A particle of charge Q and momentum p = mv moving perpendicular to a uniform field B feels a force BQv towards the centre of a circle:

BQv = mv²/r → **r = mv/(BQ) = p/(BQ)**

So the radius of a track measures momentum. In a detector:

- Opposite charges curve opposite ways (Fleming's left-hand rule).
- Higher-momentum particles leave straighter tracks.
- A particle losing energy as it ionises the material slows down, so its track spirals inwards.

This relation also holds relativistically (with p the relativistic momentum), which is why it is used in high-energy physics.

**Mass spectrometer** (Eduqas C3.9(i), (j)). Ions are accelerated, pass through a velocity selector (v = E/B), then enter a region of field B₂ where r = mv/(QB₂). Ions of different mass (for the same charge and speed) land at different places, separating isotopes.

### Worked example

1. A track of a particle of charge +e in a 1.5 T field has radius 0.40 m. Find its momentum.

   p = BQr = 1.5 × 1.60 × 10⁻¹⁹ × 0.40 = 9.6 × 10⁻²⁰ kg m s⁻¹ (≈ 180 MeV/c).

### Common mistakes

- Using the mass in place of the momentum when comparing track radii.
- Getting the curvature direction wrong for negative particles.

## Detectors and particle tracks

*Refs: Edexcel 133, 135. Level: A-level only.*

### What you need to know

- General principles of detectors: ionisation and deflection.
- Apply conservation of charge, energy and momentum to interactions; interpret particle tracks.

### Explained

**Ionisation.** Charged particles passing through matter ionise atoms along their path. Detectors make this ionisation visible or measurable:

- Cloud chamber: ions in a supersaturated vapour act as centres where droplets condense, leaving a visible trail.
- Bubble chamber: ions in a superheated liquid start bubbles.
- Wire chambers and silicon trackers: the freed electrons are collected on wires or electrodes, giving electronic signals that a computer uses to reconstruct the path.
- Neutral particles (neutrons, photons, neutrinos) leave no track; their presence is inferred from conservation laws or from the charged particles they produce.

**Deflection.** A magnetic field across the detector curves the tracks, so charge sign and momentum can be measured (r = p/BQ).

**Reading tracks.**

- A track that begins from nowhere, or a "V" of two oppositely curving tracks appearing from a point, shows a neutral particle decaying or a photon making a pair.
- Track thickness: more heavily ionising (slower or more highly charged) particles leave thicker tracks.
- At a vertex, apply conservation of charge, momentum (vector sum of momenta before and after), energy, baryon number and lepton number to identify unseen particles.
- Spiral tracks: particles losing energy; electrons spiral much more tightly than protons of similar energy (smaller momentum).

**Calorimeters** measure energy by absorbing the particles completely; muon detectors (on the outside) catch muons, which pass through everything else.

### Common mistakes

- Saying neutral particles leave tracks.
- Forgetting that momentum is a vector when balancing at a vertex.

## Why high energies are needed

*Refs: Edexcel 136. Level: A-level only.*

### What you need to know

- Why high energies are needed to investigate the structure of nucleons.

### Explained

1. **Resolution.** To probe a structure, the probing particle's de Broglie wavelength λ = h/p must be about the size of the structure or smaller. A nucleon is about 10⁻¹⁵ m across, so particles need momenta of about h/10⁻¹⁶ m, i.e. energies of several GeV (deep inelastic scattering of electrons from protons at about 20 GeV revealed quarks).
2. **Creating new particles.** To make new, heavy particles, enough energy must be available to supply their rest energy (ΔE = c²Δm): e.g. at least 2 × 938 MeV to make a proton–antiproton pair; the W and Z bosons (80 to 91 GeV) and the Higgs boson (125 GeV) needed collider energies of hundreds of GeV to TeV.
3. **Overcoming forces.** Particles must get close enough to overcome strong electrostatic repulsion and interact via the strong force.

Colliding beams (two beams in opposite directions) make all the energy available for creating particles, since the total momentum is zero; firing at a fixed target wastes much of the energy as kinetic energy of the products.

### Worked example

1. Estimate the energy of electrons needed to have a de Broglie wavelength of 1.0 × 10⁻¹⁶ m.

   p = h/λ = 6.6 × 10⁻¹⁸ kg m s⁻¹. At these energies E ≈ pc = 2.0 × 10⁻⁹ J ≈ 12 GeV.

### Common mistakes

- Saying higher energy gives a longer de Broglie wavelength.

## Check questions

1. Explain why the drift tubes in a linear accelerator get longer along the accelerator. (3 marks)
2. Derive r = p/(BQ) for a charged particle in a uniform magnetic field. (2 marks)
3. An electron and a proton have the same momentum and enter the same magnetic field. Compare their tracks. (2 marks)
4. Explain how a particle detector shows the paths of charged particles and how their charge and momentum can be found. (4 marks)
5. A neutral particle decays into a π⁺ and a π⁻, seen as a "V" in a bubble chamber. Explain how conservation laws apply. (3 marks)
6. Explain why very high energies are needed to investigate the internal structure of protons. (3 marks)

## Mark scheme

1. Particles accelerate at each gap, so speed increases (1); time in each tube must be the same (half the a.c. period) so they reach the next gap when polarity is right (1); so faster particles need longer tubes (1).
2. Magnetic force provides centripetal force: BQv = mv²/r (1); r = mv/(BQ) = p/(BQ) (1).
3. Same radius of curvature (same p, B, magnitude of Q) (1); curve in opposite directions (opposite charges) (1).
4. Charged particles ionise the medium along their path (1); ions trigger droplets / bubbles / electronic signals, showing the track (1); magnetic field across the detector curves the tracks (1); direction of curvature gives sign of charge; radius gives momentum (r = p/BQ) (1).
5. Charge: 0 = +1 + (−1) (1); momentum: the two tracks' momenta add to the momentum of the unseen neutral particle, along the line where it travelled (1); energy: rest energy + kinetic energy of the parent = total energy of the pions (1).
6. De Broglie wavelength must be comparable to or smaller than the size of the nucleon (about 10⁻¹⁵ m) to resolve structure (1); λ = h/p, so a large momentum is needed (1); also high energy to create new particles (ΔE = c²Δm) / overcome repulsion (1).
