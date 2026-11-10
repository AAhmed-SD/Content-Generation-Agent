---
level: A-level
subject: Physics
topic: "Lasers: stimulated emission, population inversion, pumping and laser structure"
as_content: "Eduqas C3.5 (AS & A). Not examined by AQA, Edexcel, OCR A or OCR B (AQA: laser safety only, file 05)."
boards:
  - board: Eduqas
    code: "A420QS"
    spec_refs: ["C3.5(a)", "C3.5(b)", "C3.5(c)", "C3.5(d)", "C3.5(e)", "C3.5(f)", "C3.5(g)"]
refs_checked: false
spec_urls:
  Eduqas: https://www.eduqas.co.uk/qualifications/physics-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/
---

# Lasers: stimulated emission, population inversion, pumping and laser structure

LASER stands for Light Amplification by Stimulated Emission of Radiation. This file explains spontaneous and stimulated emission, why stimulated emission gives coherent light, why a population inversion is needed and why it cannot normally be achieved with two energy levels, three- and four-level systems, pumping, the structure of a laser, and semiconductor lasers.

## Overview

Eduqas C3.5 only (AS & A). Energy levels and photon emission are in file 03; coherence and interference in file 05; laser safety in file 05.

### Board differences

- Eduqas C3.5(a) to (g) only. AQA 3.3.2.1 says students will not be asked how a laser works. Edexcel, OCR A and OCR B do not examine laser operation.

## C3.5 Lasers

*Refs: Eduqas C3.5(a) to (g). Level: AS & A.*

### What you need to know

- (a) Stimulated emission and how it gives coherent light.
- (b) A population inversion (N₂ > N₁) is needed for laser action.
- (c) A population inversion is not (usually) possible with a two-level system.
- (d) How a population inversion is reached in three- and four-level systems.
- (e) Pumping and its purpose.
- (f) The structure of a typical laser: an amplifying medium between two mirrors, one partially transmitting.
- (g) Advantages and uses of semiconductor lasers: small, cheap, far more efficient; used in CDs, DVDs, telecommunications.

### Explained

**Three processes between two levels** (lower E₁, upper E₂, with photon energy hf = E₂ − E₁):

1. **Absorption**: a photon of energy hf is absorbed by an atom in E₁, which moves to E₂.
2. **Spontaneous emission**: an atom in E₂ drops to E₁ on its own, at a random time, emitting a photon in a random direction with random phase. Ordinary light sources work this way, so their light is incoherent.
3. **Stimulated emission**: a photon of energy exactly hf passes an atom already in E₂ and triggers it to drop to E₁. The atom emits a second photon that is identical to the first: same frequency, same phase, same direction and same polarisation. The original photon continues. One photon has become two: amplification.

Because the stimulated photons are copies of the stimulating photon, a chain of stimulated emissions produces light that is **coherent** (constant phase relationship), monochromatic (one frequency) and travels in one direction (highly collimated).

**Population inversion.** A photon passing through a collection of atoms can either be absorbed (by an atom in E₁) or cause stimulated emission (from an atom in E₂). The chances are equal per atom. So more photons are produced than absorbed only if more atoms are in the upper level than the lower: N₂ > N₁. This is a population inversion. Normally (in thermal equilibrium) N₁ > N₂, because the Boltzmann factor makes higher levels less populated, so light is absorbed overall.

**Why not two levels.** If you pump atoms from E₁ to E₂ with light of energy hf, that same light causes stimulated emission from E₂ back to E₁ as well. As N₂ approaches N₁, absorption and stimulated emission become equally likely; the best you can reach is N₂ = N₁, never N₂ > N₁.

**Three-level system.** Atoms are pumped from the ground state E₁ to a high, short-lived level E₃. They drop quickly (non-radiatively) to E₂, a **metastable** level with a long lifetime (around 1 ms rather than about 10 ns). Atoms pile up in E₂. Laser action occurs from E₂ to the ground state E₁. Problem: more than half of all the atoms must be removed from the ground state before N₂ > N₁, so intense pumping is needed (e.g. ruby laser).

**Four-level system.** Pump from E₀ (ground) to E₃; fast decay to metastable E₂; laser transition from E₂ to E₁; fast decay from E₁ to E₀. Because E₁ is above the ground state and empties quickly, it is almost always nearly empty, so a population inversion between E₂ and E₁ is easy to reach even with few atoms in E₂. Far more efficient (e.g. helium–neon, Nd:YAG lasers).

**Pumping.** The process of supplying energy to put atoms into the upper levels, so a population inversion is maintained. Methods: intense light from a flash lamp or another laser (optical pumping), an electric discharge through a gas (electrons collide with atoms), or an electric current (semiconductor lasers).

**Structure of a laser.**

- An **amplifying (gain) medium** in which the population inversion is created.
- A **pump** supplying energy.
- Two parallel **mirrors**, one at each end, forming an optical cavity. One is fully reflecting (100%); the other is partially transmitting (e.g. 99% reflecting).

Photons travelling along the axis bounce back and forth between the mirrors, passing through the medium many times and causing more and more stimulated emission, so the light is amplified. Photons travelling off-axis escape through the sides. A small fraction of the light passes through the partially transmitting mirror as the output beam. The cavity length is a whole number of half wavelengths, so a stationary wave forms, which helps select a single frequency.

**Semiconductor lasers** (laser diodes). A p–n junction of a semiconductor such as gallium arsenide. A forward current injects electrons and holes into the junction region, giving a population inversion; electrons recombining with holes emit photons, stimulating more recombinations. The polished ends of the crystal act as mirrors.

- Advantages: very small and cheap to mass-produce; far more efficient (converting a large fraction of electrical energy to light) than gas or crystal lasers; powered by low voltages; can be switched on and off very quickly (modulated) for data.
- Uses: reading and writing CDs, DVDs and Blu-ray discs; optical fibre telecommunications; barcode scanners; laser pointers; laser printers.

### Worked example

1. A laser transition is between levels at −3.20 eV and −5.10 eV. Find the wavelength.

   ΔE = 1.90 eV = 3.04 × 10⁻¹⁹ J. λ = hc/ΔE = 1.989 × 10⁻²⁵/3.04 × 10⁻¹⁹ = 6.54 × 10⁻⁷ m (red).

2. A 5.0 mW laser emits at 650 nm. How many photons per second?

   E = 1.989 × 10⁻²⁵/650 × 10⁻⁹ = 3.06 × 10⁻¹⁹ J. N = 5.0 × 10⁻³/3.06 × 10⁻¹⁹ = 1.6 × 10¹⁶ s⁻¹.

### Common mistakes

- Saying stimulated emission absorbs the incoming photon.
- Saying a population inversion means all atoms are in the upper level.
- Saying the pump light is the laser output.
- Saying both mirrors are partially transmitting.

## Check questions

1. Explain the difference between spontaneous and stimulated emission. (3 marks)
2. Explain why laser light is coherent. (2 marks)
3. What is a population inversion, and why is it needed for a laser? (3 marks)
4. Explain why a population inversion cannot normally be achieved in a two-level system. (2 marks)
5. Explain why a four-level laser is more efficient than a three-level laser. (3 marks)
6. Describe the structure of a laser and the role of each mirror. (3 marks)
7. Give two advantages of semiconductor lasers and two uses. (4 marks)

## Mark scheme

1. Spontaneous: excited atom drops to a lower level at a random time, emitting a photon in a random direction/phase (1); stimulated: incoming photon of the right energy triggers the excited atom to drop (1); emitted photon has same frequency, phase and direction as the incoming photon (1).
2. Each stimulated photon is in phase with / identical to the photon that triggered it (1); so all photons in the beam have a constant phase relationship (1).
3. More atoms in the upper (excited) level than the lower level (1); photons are more likely to cause stimulated emission than to be absorbed (1); so the light is amplified (1).
4. Pumping photons also cause stimulated emission back down (1); so the best possible is equal numbers in each level, N₂ = N₁ (1).
5. In a four-level system the lower laser level is above the ground state (1); it empties rapidly so it is almost always nearly empty (1); so a population inversion needs only a few atoms in the upper level / less pumping (1).
6. Amplifying medium between two parallel mirrors (1); one fully reflecting, sending light back through the medium for further amplification (1); the other partially transmitting, letting out the beam (1).
7. Any two advantages: small, cheap, efficient, low voltage, fast switching (2); any two uses: CD/DVD players, optical fibre communication, barcode scanners, laser printers (2).
