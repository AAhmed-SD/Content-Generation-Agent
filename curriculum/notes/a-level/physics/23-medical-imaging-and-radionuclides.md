---
level: A-level
subject: Physics
topic: "Medical imaging and therapy: ultrasound, endoscopy, MRI, X-rays, CT, radionuclide imaging, PET and radiotherapy"
as_content: "AQA option (A-level only). OCR A 6.5 A-level only. Eduqas option B A-level only. Edexcel 88, 89 AS & A."
boards:
  - board: AQA
    code: "7408"
    spec_refs: ["3.10.4.1", "3.10.4.2", "3.10.4.3", "3.10.5.1", "3.10.5.2", "3.10.5.3", "3.10.5.4", "3.10.6.1", "3.10.6.2", "3.10.6.3", "3.10.6.4", "3.10.6.5", "3.10.6.6"]
  - board: Edexcel
    code: "9PH0"
    spec_refs: ["88", "89"]
  - board: OCR A
    code: "H556"
    spec_refs: ["6.5.1(a)", "6.5.1(b)", "6.5.1(c)", "6.5.1(d)", "6.5.1(e)", "6.5.1(f)", "6.5.1(g)", "6.5.2(a)", "6.5.2(b)", "6.5.2(c)", "6.5.2(d)", "6.5.2(e)", "6.5.3(a)", "6.5.3(b)", "6.5.3(c)", "6.5.3(d)", "6.5.3(e)", "6.5.3(f)", "6.5.3(g)"]
  - board: Eduqas
    code: "A420QS"
    spec_refs: ["OB(a)", "OB(b)", "OB(c)", "OB(d)", "OB(e)", "OB(f)", "OB(g)", "OB(h)", "OB(i)", "OB(j)", "OB(k)", "OB(l)", "OB(m)", "OB(n)", "OB(o)", "OB(p)", "OB(q)", "OB(r)", "OB(s)", "OB(t)"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/physics-2015.html
  OCR A: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-a-h156-h556-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/physics-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/a-level-aqa/
---

# Medical imaging and therapy: ultrasound, endoscopy, MRI, X-rays, CT, radionuclide imaging, PET and radiotherapy

Doctors use physics to see inside the body and to treat disease. This file covers ultrasound (acoustic impedance, A- and B-scans, Doppler), fibre-optic endoscopes, magnetic resonance imaging, the production, absorption and detection of X-rays, CT scanning, radioactive tracers, the gamma camera, PET, effective half-life, radiation dose, and radiotherapy with X-rays and implants, with comparisons between techniques.

## Overview

AQA option 3.10.4 to 3.10.6 (A-level only); OCR A 6.5 (A-level only); Eduqas option B (A-level only); Edexcel 88, 89 (pulse-echo, AS). Total internal reflection and fibres are in file 05; the photoelectric effect in file 03; exponential decay, technetium-99m and dose units in file 18; annihilation in file 02; magnetic fields and superconductors in files 10 and 17.

### Board differences

- AQA 3.10.4 to 3.10.6 · OCR A 6.5 · Eduqas OB(a) to (t) · Edexcel 88, 89.
- OCR A 6.5.1(c) asks for the four X-ray attenuation mechanisms (simple scatter, photoelectric effect, Compton scattering, pair production). AQA excludes the details of absorption processes.
- Doppler ultrasound for blood flow: OCR A 6.5.3(g) and Eduqas OB(k) (Δf/f = 2v cos θ/c). Not AQA.
- MRI: AQA 3.10.4.3 (no relaxation times, no magnet production), Eduqas OB(l), (m) (with relaxation time and Larmor frequency f = 42.6 × 10⁶ B for hydrogen). Not OCR A.
- Endoscopes: AQA only. Flat-panel detectors, intensifying screens and image intensifiers: AQA 3.10.5.2. Digital image receptors: Eduqas OB(f).
- Physical, biological and effective half-life: AQA 3.10.6.2. Dose (Gy, Sv), radiation weighting and tissue weighting factors: Eduqas OB(o) to (q) (also OCR B in file 18).
- Tracers: AQA names Tc-99m, I-131, In-111 and the Mo–Tc generator; OCR A names Tc-99m and fluorine-18; Eduqas names Tc-99m.
- Edexcel 89: pulse-echo and how wavelength and pulse duration limit the information.

## 3.10.4.1 Ultrasound imaging

*Refs: AQA 3.10.4.1 · Edexcel 88, 89 · OCR A 6.5.3(a) to (g) · Eduqas OB(h), (i), (j), (k), (n). Level: A-level only (Edexcel AS & A).*

### What you need to know

- Reflection and transmission of sound at tissue boundaries; acoustic impedance Z = ρc; attenuation.
- Fraction reflected: I_r/I_i = ((Z₂ − Z₁)/(Z₂ + Z₁))².
- Piezoelectric transducers: generating and detecting ultrasound pulses.
- A-scans and B-scans; examples of applications.
- Advantages and disadvantages of ultrasound compared with other methods, including safety and resolution.
- (Edexcel 89) Pulse-echo: how wavelength and pulse duration limit the detail.
- (OCR A, Eduqas) Coupling gel (impedance matching); Doppler measurement of blood flow.

### Explained

**Ultrasound** is sound (a longitudinal wave) with frequency above 20 kHz; medical scanners use 1 to 15 MHz. In soft tissue c ≈ 1500 m s⁻¹, so λ ≈ 0.1 to 1.5 mm.

**Piezoelectric transducer.** Certain crystals (e.g. quartz, lead zirconate titanate) change shape when a p.d. is applied, and produce a p.d. when squeezed. An alternating p.d. at the crystal's resonant frequency makes it vibrate strongly, producing ultrasound. The same crystal detects the returning echoes: the pressure wave makes it vibrate and generate a small alternating p.d. A backing material damps the crystal so it produces short pulses (a few cycles), which give better depth resolution, and so that it is ready to receive echoes.

**Acoustic impedance** Z = ρc (kg m⁻² s⁻¹), where ρ is density and c the speed of sound. At a boundary between materials with impedances Z₁ and Z₂, the fraction of intensity reflected is:

I_r/I_i = ((Z₂ − Z₁)/(Z₂ + Z₁))²

A big difference in Z gives strong reflection. Air (Z ≈ 430) and skin (Z ≈ 1.7 × 10⁶): nearly 100% is reflected, so without help no ultrasound would enter. A **coupling gel** with impedance close to skin's is spread between transducer and skin to remove the air and let most ultrasound enter (impedance matching). Bone–soft tissue boundaries reflect about 40%, so it is hard to image behind bone; gas in the gut also blocks imaging.

**Attenuation.** Intensity falls exponentially with depth as energy is absorbed and scattered. Higher frequencies are attenuated more, so lower frequencies are used for deep organs (at the cost of poorer resolution).

**Pulse-echo** (Edexcel 89). A short pulse is sent; echoes return from each boundary. Depth d = ct/2 (t = time to the echo). Limits:

- Two boundaries closer than about half the pulse length cannot be distinguished (echoes overlap). Shorter pulses give better depth resolution.
- Details smaller than about the wavelength cannot be seen (they diffract the wave rather than reflect it). Higher frequency (shorter λ) gives finer detail.
- The next pulse cannot be sent until echoes from the deepest structure return, limiting the pulse rate.

**A-scan** (amplitude scan). One transducer, fixed direction. The display shows echo amplitude (vertical) against time (horizontal). Used to measure distances, e.g. the depth of the eye (to fit lens implants) or the midline of the brain.

**B-scan** (brightness scan). The transducer (or an array of them) sweeps across the body. Each echo appears as a dot whose brightness depends on its amplitude, positioned by its depth and direction. A computer builds a 2D image. Used for fetal scans, organs, heart (moving images).

**Doppler ultrasound** (OCR A 6.5.3(g), Eduqas OB(k)). Ultrasound reflected from moving red blood cells changes frequency. If the beam makes angle θ with the blood flow: Δf = 2fv cos θ/c (the factor 2 because the cells both receive and re-emit a shifted wave). Measuring Δf gives the blood speed, to detect blockages or check the fetal heart.

**Advantages and disadvantages.**

| Advantages | Disadvantages |
| --- | --- |
| Non-ionising, so no known risk; safe for fetuses | Cannot see through bone or air (lungs, gut) |
| Cheap, portable, quick | Poorer resolution than CT or MRI (about 1 mm) |
| Real-time moving images (heart, blood flow) | Image quality depends on the operator |
| No side effects | Limited depth for high-resolution scans |

### Worked example

1. Find the fraction reflected at a fat–muscle boundary. Z_fat = 1.38 × 10⁶, Z_muscle = 1.70 × 10⁶ kg m⁻² s⁻¹.

   ((1.70 − 1.38)/(1.70 + 1.38))² = (0.32/3.08)² = 0.011 (1.1%).

2. An echo returns 65 μs after the pulse. How deep is the boundary? (c = 1540 m s⁻¹)

   d = ct/2 = 1540 × 65 × 10⁻⁶/2 = 0.050 m.

3. (OCR A, Eduqas) 4.0 MHz ultrasound at 30° to blood flow gives a shift of 2.5 kHz. Find the blood speed.

   v = Δf c/(2f cos θ) = 2500 × 1540/(2 × 4.0 × 10⁶ × 0.866) = 0.56 m s⁻¹.

### Common mistakes

- Forgetting the factor 2 in d = ct/2 or in the Doppler shift.
- Saying gel improves resolution (it reduces reflection at the skin).
- Forgetting to square the impedance fraction.

## 3.10.4.2 Fibre optics and endoscopy

*Refs: AQA 3.10.4.2. Level: A-level only.*

### What you need to know

- Properties of fibre optics, total internal reflection at the core–cladding boundary, and uses in medicine.
- The optical system of a flexible endoscope; coherent and non-coherent fibre bundles; uses for internal imaging, and advantages.

### Explained

A flexible endoscope is a tube that a doctor passes into the body (through the mouth or a small cut) to look inside.

- **Non-coherent bundle**: fibres arranged randomly. It carries light from an external source into the body to illuminate the area. The arrangement does not matter, and it is cheaper.
- **Coherent bundle**: fibres in exactly the same arrangement at both ends. Each fibre carries light from one tiny part of the image, so the image is reproduced point by point. An objective lens at the far end forms an image on the end of the bundle; an eyepiece (or camera) at the near end views it. Thinner fibres give better resolution.
- Each fibre has a core and cladding of lower refractive index, so light is guided by total internal reflection; cladding stops light leaking between touching fibres.
- Extra channels let the surgeon pump in water or air, take tissue samples (biopsies), or do keyhole surgery with tools or a laser.

**Advantages**: minimally invasive (small or no incisions), quicker recovery, less risk of infection, real-time colour images, no ionising radiation, can treat at the same time.

### Common mistakes

- Saying the illuminating bundle must be coherent.

## 3.10.4.3 Magnetic resonance (MR) scanner

*Refs: AQA 3.10.4.3 · Eduqas OB(l), (m), (n). Level: A-level only.*

### What you need to know

- The basic principles of the MR scanner: protons (hydrogen nuclei) aligned in a strong magnetic field; precession; gradient coils select the slice; RF pulses excite protons; protons emit RF signals as they de-excite; signals processed by computer into an image.
- (Eduqas) Precession, resonance, relaxation time, and the Larmor frequency f = 42.6 × 10⁶ B (Hz, for hydrogen).

### Explained

1. The patient lies inside a very strong uniform magnetic field (0.5 to 3 T) from a superconducting magnet.
2. Hydrogen nuclei (protons, mostly in water and fat) behave like tiny magnets because they spin. In the field, they line up with spins parallel (low energy) or antiparallel (higher energy) to it, with a slight excess parallel. They precess (wobble like a spinning top) about the field direction at the Larmor frequency, proportional to B: f = 42.6 MHz per tesla for hydrogen.
3. Gradient coils add a small field that varies across the body, so the Larmor frequency is different at each position. Only protons in a chosen slice (where f matches the radio pulse) can resonate.
4. A short pulse of radio waves at the Larmor frequency is applied. Protons absorb energy (resonance) and flip into the higher-energy (antiparallel) state.
5. When the pulse stops, the protons relax back, emitting radio signals at the Larmor frequency, picked up by receiver coils.
6. The time the protons take to relax (relaxation time, Eduqas) depends on the type of tissue (water-rich tissue differs from fat), giving contrast. By changing the gradients, the computer locates where each signal came from and builds a detailed 2D or 3D image.

**Advantages**: no ionising radiation; excellent soft-tissue contrast (brain, spinal cord, joints, tumours); any plane can be imaged; very good resolution (about 1 mm). **Disadvantages**: very expensive; slow (patient must keep still for a long time); noisy; claustrophobic; cannot be used with some metal implants or pacemakers; poorer images of bone.

### Worked example

1. (Eduqas) Find the Larmor frequency for hydrogen in a 1.5 T scanner.

   f = 42.6 × 10⁶ × 1.5 = 6.4 × 10⁷ Hz (64 MHz).

### Common mistakes

- Saying MRI uses ionising radiation.
- Saying MRI detects electrons.

## 3.10.5.1 The physics of diagnostic X-rays

*Refs: AQA 3.10.5.1 · OCR A 6.5.1(a), (b) · Eduqas OB(a), (b), (c). Level: A-level only.*

### What you need to know

- How X-rays are produced; the maximum photon energy; the energy spectrum (continuous and characteristic).
- The rotating-anode X-ray tube; controlling intensity, photon energy, image sharpness and contrast, and patient dose.

### Explained

**X-ray tube.** In an evacuated glass tube, a heated filament (cathode) emits electrons by thermionic emission. A high p.d. (30 to 150 kV) accelerates them to a metal target (anode), often tungsten (high melting point, high atomic number). When the electrons hit the target, they decelerate and produce X-rays. About 99% of their energy becomes heat.

**Spectrum.** A graph of intensity against photon energy (or wavelength) has two parts:

- *Continuous (bremsstrahlung, "braking radiation")*: electrons decelerate in the electric fields of target nuclei, losing any amount of energy, giving a smooth range of photon energies. Maximum photon energy = eV (an electron loses all its kinetic energy in one go): hf_max = eV, so λ_min = hc/(eV).
- *Characteristic lines*: sharp peaks. An incoming electron knocks out an inner (K-shell) electron of a target atom; an outer electron drops into the vacancy, emitting an X-ray photon of a definite energy characteristic of the target element.

Low-energy X-rays are filtered out (by aluminium in the beam), since they would be absorbed by the skin and add to the dose without contributing to the image.

**Rotating anode.** The anode is a disc spinning at about 3000 rpm, so the electron beam strikes a different spot all the time, spreading the heat and stopping the target melting. The anode is cooled with oil. This lets a small, intense focal spot be used.

**Controls.**

| To change | Adjust |
| --- | --- |
| Intensity (number of photons) | Tube current (filament heating) |
| Photon energy (penetration, "hardness") | Accelerating p.d. (also increases intensity) |
| Image sharpness | Small focal spot; collimating the beam; patient close to detector; short exposure so movement does not blur |
| Contrast | Lower p.d. for soft tissue (more difference in absorption); contrast media (barium, iodine); anti-scatter grid |
| Patient dose | Filter low-energy X-rays; collimate to the area needed; short exposure; sensitive detectors |

**Diagnosis and therapy** (Eduqas OB(c)). Low-energy X-rays (tens of keV) are used for diagnosis (they are absorbed differently by bone and soft tissue). High-energy X-rays (MeV) are used for therapy (file section 3.10.6.4).

### Worked example

1. An X-ray tube operates at 80 kV. Find the maximum photon energy and minimum wavelength.

   E = 80 keV = 1.28 × 10⁻¹⁴ J. λ_min = hc/E = 1.989 × 10⁻²⁵/1.28 × 10⁻¹⁴ = 1.55 × 10⁻¹¹ m.

2. The tube current is 50 mA. Find the power delivered to the anode, and the heat produced if 1% becomes X-rays.

   P = 80 000 × 0.050 = 4000 W; heat = 3960 W.

### Common mistakes

- Saying increasing the tube current increases the maximum photon energy (it increases intensity only).
- Saying characteristic lines depend on the accelerating p.d. (their positions depend only on the target element).

## 3.10.5.2 Image detection and enhancement

*Refs: AQA 3.10.5.2 · OCR A 6.5.1(e) · Eduqas OB(e), (f). Level: A-level only.*

### What you need to know

- The flat panel (FTP) detector: X-ray scintillator, photodiode pixels, electronic scanning; its advantages over photographic detection.
- Contrast enhancement using X-ray opaque material (barium meal; iodine).
- Photographic detection with intensifying screens and fluoroscopic image intensification, and why they are used.

### Explained

**Photographic film with intensifying screen.** X-rays are poorly absorbed by film. Fluorescent screens on each side of the film absorb X-rays and emit many visible-light photons, which expose the film. This reduces the exposure (and dose) needed by a large factor, at the cost of slightly blurrier images (light spreads in the screen).

**Fluoroscopy and the image intensifier.** For moving, real-time images (e.g. guiding a catheter, following a barium meal through the gut). X-rays hit a fluorescent screen; the light releases electrons from a photocathode; the electrons are accelerated by a high p.d. and focused onto a small output phosphor screen, producing a much brighter image, viewed by a camera.

**Flat panel detector.** A layer of scintillator (e.g. caesium iodide) converts X-rays to visible light, which falls on a grid of photodiode pixels (amorphous silicon) that convert light to charge. The charges are read electronically, pixel by pixel, to form a digital image. Advantages over film: instant digital image (no developing), can be stored and sent electronically, can be processed (adjust contrast, zoom), smaller dose (more sensitive), wider range of exposures recorded, real-time images possible.

**Contrast media.** Soft tissues (e.g. stomach, intestines, blood vessels) absorb X-rays similarly, so they are hard to distinguish. A substance with high atomic number (strongly absorbing) is introduced: barium sulfate swallowed (barium meal) to show the digestive tract, or iodine compounds injected to show blood vessels (angiography) or kidneys.

### Common mistakes

- Saying barium makes the patient radioactive (it is not radioactive; it just absorbs X-rays strongly).

## 3.10.5.3 Absorption of X-rays

*Refs: AQA 3.10.5.3 · OCR A 6.5.1(c), (d) · Eduqas OB(d), (e). Level: A-level only.*

### What you need to know

- Exponential attenuation: I = I₀e^(−μx); linear attenuation coefficient μ; mass attenuation coefficient μ_m = μ/ρ; half-value thickness.
- Different tissues absorb X-rays differently (AQA: no details of the processes).
- (OCR A) Attenuation mechanisms: simple scatter, photoelectric effect, Compton scattering, pair production.

### Explained

**Attenuation.** A beam of intensity I₀ passing through thickness x of material is reduced to I = I₀e^(−μx). μ (m⁻¹) depends on the material and the photon energy.

**Half-value thickness** x½: the thickness that halves the intensity. x½ = ln 2/μ.

**Mass attenuation coefficient** μ_m = μ/ρ (m² kg⁻¹). Useful because it depends on the element and photon energy but not on density: I = I₀e^(−μ_m ρx).

**Differential absorption.** Bone (contains calcium, Z = 20) absorbs X-rays much more strongly than soft tissue (mostly H, C, O). At diagnostic energies the photoelectric effect dominates and absorption rises steeply with atomic number (roughly Z³), so bone appears white (little X-ray reaches the detector) and soft tissue dark.

**Mechanisms** (OCR A 6.5.1(c)).

| Mechanism | Photon energy | What happens |
| --- | --- | --- |
| Simple (Rayleigh) scatter | 1 to 20 keV | Photon bounces off an atom with no energy loss (just changes direction) |
| Photoelectric effect | below about 100 keV | Photon is absorbed completely, ejecting an inner electron |
| Compton scattering | 0.5 to 5 MeV | Photon gives part of its energy to an outer electron (which is ejected) and is scattered with lower energy |
| Pair production | above 1.02 MeV | Photon near a nucleus turns into an electron–positron pair |

### Worked example

1. Soft tissue has μ = 20 m⁻¹ for a certain X-ray energy. What fraction passes through 5.0 cm?

   I/I₀ = e^(−20 × 0.050) = e⁻¹ = 0.37.

2. The half-value thickness of bone is 1.2 cm. Find μ and the fraction transmitted through 3.0 cm.

   μ = 0.693/0.012 = 58 m⁻¹. Fraction = e^(−58 × 0.030) = 0.18 (or (½)^2.5 = 0.18).

### Common mistakes

- Using x in cm with μ in m⁻¹.
- Confusing μ with μ_m.

## 3.10.5.4 CT scanner

*Refs: AQA 3.10.5.4 · OCR A 6.5.1(f), (g) · Eduqas OB(g). Level: A-level only.*

### What you need to know

- Basic principles: the X-ray tube moves around the patient; a narrow, monochromatic beam; an array of detectors; a computer processes the signals into an image.
- Advantages and disadvantages: resolution, cost and safety.

### Explained

In a computed tomography (CT, or CAT) scanner, the patient lies on a bed inside a ring. An X-ray tube rotates around them, producing a thin fan-shaped beam (nearly monochromatic, to make attenuation easier to interpret). An arc or ring of detectors opposite records the intensity transmitted along many paths through the body from many angles. A computer combines all these measurements to calculate how strongly each small volume (voxel) of the slice absorbs, producing a cross-sectional image. The bed moves through the ring (often in a spiral) to build up many slices, which can be combined into a 3D image.

**Advantages over a simple X-ray image**: shows cross-sections and 3D structure, not overlapping shadows; distinguishes soft tissues with small differences in density; images can be manipulated. **Disadvantages**: much higher radiation dose (equivalent to hundreds of chest X-rays); expensive; slower; patient must keep still. Compared with MRI: faster, cheaper, better for bone and bleeding, but uses ionising radiation and has poorer soft-tissue contrast.

### Common mistakes

- Saying CT uses a gamma source.

## 3.10.6.1 Imaging techniques

*Refs: AQA 3.10.6.1 · OCR A 6.5.2(a), (c), (d), (e) · Eduqas OB(r), (t). Level: A-level only.*

### What you need to know

- Gamma-emitting radioisotopes as tracers: technetium-99m, iodine-131 and indium-111 and their properties (radiation emitted, half-life, gamma energy, attachment to compounds that target organs).
- The molybdenum–technetium generator and why it matters.
- PET scans (OCR A: fluorine-18 in fluorodeoxyglucose).

### Explained

A **tracer** is a radioactive isotope attached to a chemical that the body takes to a particular organ. It is injected or swallowed; a gamma camera outside the body detects where it goes, showing how organs are working (function), not just their shape.

**Good tracer properties**: emits gamma only (penetrates the body to reach the detector; little ionisation inside); gamma energy about 100 to 200 keV (easy to detect, collimate and shield); half-life of hours (long enough to prepare and do the scan, short enough to keep the dose low); can be attached to compounds targeting particular organs; quickly removed by the body.

| Tracer | Emits | Half-life | Uses |
| --- | --- | --- | --- |
| Technetium-99m | γ, 140 keV | 6 h | Most common: bones, heart, brain, lungs, kidneys (attached to different compounds) |
| Iodine-131 | β⁻ and γ (364 keV) | 8 days | Thyroid (which absorbs iodine); also treatment of thyroid cancer because of the β |
| Indium-111 | γ (171 and 245 keV), by electron capture | 2.8 days | Labelling white blood cells to find infection or abscesses; slower processes |

**Molybdenum–technetium generator.** Molybdenum-99 (T½ = 66 h) is held on an alumina column. It decays by β⁻ to Tc-99m. Saline washed through the column dissolves the Tc-99m (but not the molybdenum) and is collected for use ("milking"). Because the parent has a longer half-life, the generator can be delivered to a hospital and supply Tc-99m for about a week, even though Tc-99m itself only lasts hours.

**PET (positron emission tomography).** A positron-emitting tracer, usually fluorine-18 (T½ = 110 min) in fluorodeoxyglucose (FDG), a glucose analogue, is injected. Cells using a lot of glucose (active brain regions, many tumours) take it up. Each positron annihilates with an electron within a millimetre or so, producing two 511 keV gamma photons travelling in opposite directions. A ring of detectors around the patient records pairs arriving at the same time (coincidence detection); the annihilation lies on the line joining the two detectors, and the small difference in arrival times can locate it along the line. A computer builds a 3D image of tracer concentration. PET shows function (metabolism), good for cancer detection and brain studies. F-18 must be made in a cyclotron close to the hospital because of its short half-life.

### Common mistakes

- Saying alpha emitters make good tracers.
- Saying PET detects positrons directly.

## 3.10.6.2 Half-life

*Refs: AQA 3.10.6.2. Level: A-level only.*

### What you need to know

- Physical, biological and effective half-lives: 1/T_E = 1/T_B + 1/T_P, and definitions.

### Explained

- **Physical half-life** T_P: the time for the activity of the isotope to halve by radioactive decay.
- **Biological half-life** T_B: the time for half the substance to be removed from the body by biological processes (excretion).
- **Effective half-life** T_E: the time for the activity in the body to halve by both together. Since the two removal rates add (λ_E = λ_P + λ_B):

1/T_E = 1/T_B + 1/T_P

T_E is always shorter than both.

### Worked example

1. A tracer has T_P = 6.0 h and T_B = 24 h. Find T_E.

   1/T_E = 1/6 + 1/24 = 5/24; T_E = 4.8 h.

### Common mistakes

- Adding the half-lives instead of their reciprocals.

## 3.10.6.3 Gamma camera

*Refs: AQA 3.10.6.3 · OCR A 6.5.2(b), (c) · Eduqas OB(s). Level: A-level only.*

### What you need to know

- The basic structure and workings of a photomultiplier tube and a gamma camera.

### Explained

**Gamma camera** (from the patient outwards):

1. **Collimator**: a thick lead plate with many long, narrow parallel holes. Only gamma photons travelling straight along the holes (perpendicular to the camera) pass; others are absorbed. So each point on the crystal receives gamma rays only from the part of the body directly beneath it, giving a sharp image.
2. **Scintillator crystal**: a large sodium iodide crystal (doped with thallium). Each gamma photon absorbed produces a flash of thousands of visible-light photons.
3. **Photomultiplier tubes**: an array behind the crystal. Each tube converts light to an electrical pulse: light releases electrons from a photocathode (photoelectric effect); these are accelerated to a series of electrodes (dynodes) at increasing potential; each electron knocks out several more at each dynode, so after about 10 dynodes one electron becomes about a million, giving a measurable pulse at the anode.
4. **Position logic and computer**: the relative sizes of the pulses from neighbouring tubes locate each flash; the computer builds up an image of where the tracer is concentrated over time.

Resolution is about 5 to 10 mm, limited by the collimator hole size and the spread of light in the crystal. Longer collimator holes give better resolution but fewer counts (longer scan or higher dose).

### Common mistakes

- Saying the collimator focuses gamma rays (it only selects them by absorbing others).

## 3.10.6.4 Use of high-energy X-rays

*Refs: AQA 3.10.6.4 · Eduqas OB(c). Level: A-level only.*

### What you need to know

- External treatment of tumours with high-energy X-rays; methods used to limit exposure of healthy cells.

### Explained

X-rays of several MeV (from a linear accelerator) penetrate deep into the body and destroy cancer cells by ionising their DNA. Healthy tissue must be protected:

- The beam is rotated around the patient (or several beams from different directions are used), all crossing at the tumour, so the tumour gets a large dose but each region of healthy tissue gets only a fraction.
- The beam is shaped to the tumour outline with collimators (multileaf collimators of moving tungsten leaves).
- The dose is split into many small doses over weeks (fractionation), so healthy cells, which repair better, can recover between treatments.
- Imaging (CT) is used to locate the tumour precisely; the patient is held still with moulds.

High-energy X-rays deposit their maximum dose below the skin surface, sparing the skin.

### Common mistakes

- Saying radiotherapy uses gamma cameras.
- Saying one large dose is safer than many small (fractionated) doses.

## 3.10.6.5 Use of radioactive implants

*Refs: AQA 3.10.6.5. Level: A-level only.*

### What you need to know

- Internal treatment using beta-emitting implants.

### Explained

In brachytherapy, small sealed sources (seeds or wires) emitting beta particles (or low-energy gamma) are placed inside or next to a tumour, e.g. iodine-125 seeds in the prostate, or a source in the cervix. Beta particles have a short range (a few mm in tissue), so they deliver a high dose to the tumour while healthy tissue further away receives very little. The implant is either removed after a set time or left in place if its half-life is short. Iodine-131 taken by mouth is concentrated in the thyroid, where its beta radiation destroys thyroid cancer cells.

### Common mistakes

- Saying gamma emitters are used as implants because they have a short range (beta has the short range).

## 3.10.6.6 Imaging comparisons

*Refs: AQA 3.10.6.6 · OCR A 6.5.1(g) · Eduqas OB(n). Level: A-level only.*

### What you need to know

- Compare imaging techniques in terms of image resolution, convenience and safety.

### Explained

| Technique | Resolution | Convenience | Safety |
| --- | --- | --- | --- |
| Ultrasound | About 1 mm; poor through bone and gas | Cheap, portable, quick, real time | Non-ionising; very safe |
| Endoscopy | Very good, colour | Invasive, uncomfortable; allows treatment | Non-ionising; small risk of damage or infection |
| X-ray (planar) | Good (about 0.5 mm) for bone | Quick, cheap, widely available | Ionising; low dose |
| CT | Good (about 0.5 to 1 mm), 3D | Fairly quick; expensive | High ionising dose |
| MRI | Very good (about 1 mm) in soft tissue | Slow, noisy, expensive, claustrophobic; not with metal implants | Non-ionising; strong field risk with metal |
| Gamma camera / PET | Poor (5 to 10 mm; PET about 4 mm) | Slow, expensive (PET needs a cyclotron) | Ionising; dose from tracer |

The choice depends on what needs to be seen: anatomy (structure) or function (metabolism), bone or soft tissue, and the risks to the patient (e.g. ultrasound for a fetus).

### Common mistakes

- Choosing CT for a fetus (ultrasound is used, as it is non-ionising).
- Saying gamma camera images have better resolution than CT.

## Dose and effects of radiation (Eduqas)

*Refs: Eduqas OB(o), (p), (q). Level: A-level only. (OCR B 6.2.2 dose is in file 18.)*

### What you need to know

- The effects of α, β and γ radiation on living tissue.
- Absorbed dose (gray), equivalent dose and effective dose (sievert).
- H = D × W_R; E = Σ(H × W_T).

### Explained

**Effects.** Ionising radiation ionises atoms in cells, breaking chemical bonds and damaging DNA. Low doses may cause mutations leading to cancer years later (a stochastic effect, probability ∝ dose). High doses kill cells, causing radiation sickness, burns and death (deterministic effects, with a threshold). Rapidly dividing cells (bone marrow, gut, fetus, tumours) are most sensitive.

- **Absorbed dose** D = energy absorbed per unit mass, in gray (Gy = J kg⁻¹).
- **Equivalent dose** H = D × W_R, in sievert (Sv). Radiation weighting factor W_R: 1 for X-rays, γ and β; 20 for α.
- **Effective dose** E = Σ(H × W_T), in sievert, summed over the organs exposed. Tissue weighting factor W_T reflects each organ's sensitivity (e.g. 0.12 for lungs and bone marrow, 0.01 for skin; the factors for the whole body add to 1).

### Worked example

1. A 2.0 kg organ (W_T = 0.12) absorbs 3.0 × 10⁻³ J of γ radiation. Find the absorbed, equivalent and effective doses.

   D = 1.5 × 10⁻³ Gy; H = 1.5 mSv; E = 0.18 mSv.

### Common mistakes

- Confusing absorbed dose (Gy) with equivalent or effective dose (Sv).
- Forgetting the radiation weighting factor of 20 for alpha.

## Check questions

1. Explain why a coupling gel is used in ultrasound scanning. Calculate the fraction reflected at a gel–skin boundary (Z_gel = 1.60 × 10⁶, Z_skin = 1.70 × 10⁶ kg m⁻² s⁻¹). (4 marks)
2. Describe the difference between an A-scan and a B-scan. (3 marks)
3. Explain the difference between coherent and non-coherent fibre bundles in an endoscope. (3 marks)
4. Describe the principles of MRI. (6 marks)
5. Sketch an X-ray spectrum from a tungsten target and explain its features. How does it change if the tube voltage is increased? (5 marks)
6. Lead has a half-value thickness of 0.30 mm for some X-rays. What thickness reduces the intensity to 1%? (3 marks)
7. Describe how a gamma camera forms an image. (5 marks)
8. A tracer has physical half-life 8.0 days and effective half-life 5.0 days. Find its biological half-life. (2 marks)
9. Compare CT and MRI for imaging the brain. (4 marks)

## Mark scheme

1. Without gel, air between probe and skin; large impedance difference reflects nearly all ultrasound (1); gel has impedance close to skin, so most ultrasound transmitted (1); ((1.70 − 1.60)/(3.30))² (1) = 9.2 × 10⁻⁴ (0.09%) (1).
2. A-scan: single direction, amplitude of echoes against time (1); used for distances/depths (1); B-scan: probe moved/array, echo brightness at positions builds a 2D image (1).
3. Non-coherent: fibres arranged randomly, used to carry light in to illuminate (1); coherent: same arrangement at both ends (1); carries the image back point by point (1).
4. Strong magnetic field aligns hydrogen nuclei (1); they precess at the Larmor frequency (1); gradient coils select a slice (1); RF pulse at Larmor frequency excites / flips protons (1); protons relax, emitting RF signals detected by coils (1); relaxation time depends on tissue; computer builds image (1).
5. Continuous curve from minimum wavelength (maximum energy eV) (1): electrons decelerating (bremsstrahlung) (1); sharp characteristic lines (1): inner-shell electron knocked out, outer electron drops in (1); higher voltage: greater maximum energy, higher intensity, lines unchanged in position (1).
6. μ = 0.693/0.30 = 2.31 mm⁻¹ (1); 0.01 = e^(−2.31x) (1); x = 2.0 mm (1).
7. Collimator of lead with parallel holes selects gamma rays travelling perpendicular (1); scintillator crystal converts gamma to light flashes (1); photomultiplier tubes convert light to electrical pulses and amplify them (1); position of flash found from relative pulse sizes (1); computer builds up image of tracer distribution (1).
8. 1/5 = 1/T_B + 1/8 (1); T_B = 13 days (1).
9. CT: uses ionising X-rays, higher dose (1); quicker, cheaper, better for bone/bleeding (1); MRI: no ionising radiation (1); better soft-tissue contrast but slower, expensive, not with metal implants (1).
