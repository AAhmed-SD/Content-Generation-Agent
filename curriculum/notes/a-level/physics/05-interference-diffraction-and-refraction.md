---
level: A-level
subject: Physics
topic: "Interference, diffraction and refraction"
as_content: "AS & A for every board."
boards:
  - board: AQA
    code: "7408"
    spec_refs: ["3.3.2.1", "3.3.2.2", "3.3.2.3", "RP2"]
  - board: Edexcel
    code: "9PH0"
    spec_refs: ["65", "66", "71", "72", "73", "74", "83", "84", "85", "CP8"]
  - board: OCR A
    code: "H556"
    spec_refs: ["4.4.1(f)", "4.4.2(d)", "4.4.2(e)", "4.4.3(a)", "4.4.3(b)", "4.4.3(c)", "4.4.3(d)", "4.4.3(e)", "4.4.3(f)", "4.4.3(g)", "5.5.2(g)", "5.5.2(h)"]
  - board: OCR B
    code: "H557"
    spec_refs: ["4.1(a)(ii)", "4.1(a)(iii)", "4.1(a)(iv)", "4.1(a)(v)", "4.1(b)(i)", "4.1(c)(ii)", "4.1(c)(iii)", "4.1(d)(ii)", "4.1(d)(iv)"]
  - board: Eduqas
    code: "A420QS"
    spec_refs: ["C3.2(a)", "C3.2(b)", "C3.2(c)", "C3.2(d)", "C3.2(e)", "C3.2(f)", "C3.2(g)", "C3.2(h)", "C3.2(i)", "C3.2(j)", "C3.2(k)", "C3.2(l)", "C3.2(m)", "C3.3(a)", "C3.3(b)", "C3.3(c)", "C3.3(d)", "C3.3(e)", "C3.3(f)", "C3.3(g)", "C3.3(h)"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/physics-2015.html
  OCR A: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-a-h156-h556-from-2015/
  OCR B: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-b-advancing-physics-h157-h557-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/physics-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/a-level-aqa/
---

# Interference, diffraction and refraction

When waves overlap they interfere; when they pass through gaps they spread out. This file covers path difference and coherence, Young's double slits, single-slit diffraction, the diffraction grating, refractive index, Snell's law, total internal reflection and optical fibres, with AQA required practical 2.

## Overview

AS & A for every board (OCR A 5.5.2(g), (h), the grating in the context of stellar spectra, is A-level only but is the same physics). Stationary waves are in file 04. Lenses are in file 22. The quantum (phasor) picture of two-slit interference for OCR B is in file 03.

### Board differences

- AQA 3.3.2, RP2 · Edexcel 65, 66, 71 to 74, 83 to 85, CP8 · OCR A 4.4.2(d), (e), 4.4.3, 4.4.1(f) · OCR B 4.1(a)(ii) to (v), (c)(ii), (iii), (d)(ii), (iv) · Eduqas C3.2(a) to (m), C3.3.
- Fringe spacing is written w = λD/s (AQA) and λ = ax/D (OCR A, Eduqas: a = slit separation, x = fringe spacing). Same equation.
- AQA requires fibre optics with material and modal dispersion, pulse broadening and absorption; Eduqas C3.3(g), (h) asks for multimode dispersion and monomode fibre. Edexcel and OCR A only need total internal reflection.
- Edexcel 83 asks for Huygens' construction to explain diffraction.
- Measuring the refractive index of a solid: Edexcel 74, OCR A 4.4.2(d)(ii) (PAG6), OCR B 4.1(d)(ii), Eduqas specified practical.
- Eduqas C3.3(b) uses n₁v₁ = n₂v₂ as well as Snell's law, and (c) relates Snell's law to the wave model.

## 3.3.2.1 Interference

*Refs: AQA 3.3.2.1, RP2 · Edexcel 65, 66 · OCR A 4.4.3(a) to (g) · OCR B 4.1(a)(ii), 4.1(b)(i), 4.1(c)(iii), 4.1(d)(iv) · Eduqas C3.2(d) to (h), (k) to (m). Level: AS & A.*

### What you need to know

- Path difference, phase difference and coherence.
- Constructive interference when path difference = nλ; destructive when path difference = (n + ½)λ, for sources in phase.
- Interference and diffraction using a laser as a source of monochromatic, coherent light; safety with lasers.
- Young's double-slit experiment with two coherent sources or one source and double slits; fringe spacing w = λD/s.
- The pattern produced with white light.
- Interference with sound and microwaves.
- How ideas about the nature of light changed over time (Young's experiment supported the wave model).

### Explained

**Coherence.** Two sources are coherent if they have the same frequency and a constant phase difference. For a visible, stable interference pattern the waves should also have similar amplitudes and (Eduqas C3.2(m)) oscillate in the same direction (same polarisation). Monochromatic means a single wavelength. A laser is monochromatic and coherent across its beam. Two separate lamps are not coherent: light is emitted in random short bursts, so the phase difference changes constantly. Old method: light from one lamp passes through a single slit first, then the double slit, so both slits are lit by the same wavefronts.

**Path difference.** The difference in the distances from the two sources to a point. Phase difference = 2π × path difference / λ.

- Constructive (bright, loud, maximum): path difference = 0, λ, 2λ... = nλ. Waves arrive in phase.
- Destructive (dark, quiet, minimum): path difference = λ/2, 3λ/2... = (n + ½)λ. Waves arrive in antiphase.

(If the sources themselves are in antiphase, these conditions swap.)

**Young's double slit.** Laser light falls on two narrow slits a distance s apart. Each slit diffracts the light so the beams overlap. On a screen a distance D away, bright and dark fringes alternate, equally spaced:

**w = λD/s** (valid when D ≫ s and w; small angles).

To make fringes wider: longer wavelength, larger D, or slits closer together.

**White light.** The central fringe is white (zero path difference for all wavelengths). The other fringes are coloured spectra, violet nearest the centre (shorter λ gives smaller w) and red outermost. Fringes overlap and blur further out.

**Sound and microwaves.** Two loudspeakers driven by the same signal generator give loud and quiet regions as you walk across the room. A microwave transmitter with a double-slit metal barrier gives maxima and minima that a probe detects; with λ ≈ 3 cm, slits a few cm apart give fringes several cm apart.

**Laser safety.** Never look into the beam or point it at anyone; avoid reflections from shiny surfaces (remove watches, rings); use a low-power (class 2) laser; put a warning sign on the door; keep the beam below eye level.

**History.** Newton's particle (corpuscular) model was dominant in the 1700s. Young's experiment (1801) showed interference, which only waves can do, and supported Huygens' wave model. Later, the photoelectric effect showed the wave model is incomplete (file 03).

### Worked example

1. Laser light of wavelength 633 nm passes through slits 0.40 mm apart. Find the fringe spacing on a screen 2.5 m away.

   w = λD/s = 633 × 10⁻⁹ × 2.5 / 0.40 × 10⁻³ = 3.96 × 10⁻³ m (4.0 mm).

2. Ten fringe spacings measure 22 mm on a screen 1.80 m from slits 0.50 mm apart. Find λ.

   w = 2.2 mm. λ = ws/D = 2.2 × 10⁻³ × 0.50 × 10⁻³ / 1.80 = 6.1 × 10⁻⁷ m.

3. Two loudspeakers in phase emit 680 Hz sound (v = 340 m s⁻¹). A point is 3.00 m from one and 3.75 m from the other. Is it loud or quiet?

   λ = 0.50 m. Path difference = 0.75 m = 1.5λ, so destructive: quiet.

### Common mistakes

- Saying coherent means "same frequency" only. Constant phase difference is essential.
- Measuring one fringe spacing instead of across many (larger uncertainty).
- Saying fringes get wider when slits get further apart.
- Saying the central fringe is coloured in white light.

### Practical

**AQA required practical 2** (also Edexcel CP8, OCR A 4.4.3(g)(ii) PAG5, OCR B 4.1(d)(iv), Eduqas specified practicals): investigate interference using Young's slits and a diffraction grating.

*Double slit.* Place a laser, double slit and a screen (or wall) in line, with D of 1 to 3 m. Measure D with a tape measure. Measure across as many fringes as possible (e.g. 10 spacings) with a metre rule or vernier calipers and divide. Find s from the slide label or by measuring with a travelling microscope. Calculate λ = ws/D, or vary D and plot w against D (gradient λ/s).

*Grating.* Shine the laser through a grating of known lines per mm, normal to the beam. Measure the distance from the central maximum to the nth-order maximum on each side (x) and the distance to the screen (D). tan θ = x/D. Then nλ = d sin θ with d = 1/(lines per metre). Using both sides and higher orders reduces uncertainty.

The grating gives a more precise value: maxima are sharp and bright and widely spaced, angles are large and easy to measure. Double slit fringes are dim and close together.

## 3.3.2.2 Diffraction

*Refs: AQA 3.3.2.2 · Edexcel 83, 84, 85, CP8 · OCR A 4.4.1(f), 4.4.3(g), 5.5.2(g), (h) · OCR B 4.1(a)(iv), (v), 4.1(c)(iii) · Eduqas C3.2(a), (b), (c), (i), (j). Level: AS & A.*

### What you need to know

- The appearance of the single-slit diffraction pattern with monochromatic light and with white light.
- How the width of the central maximum depends on wavelength and slit width (qualitatively).
- The plane transmission diffraction grating at normal incidence; derivation of d sin θ = nλ.
- Applications of diffraction gratings.
- (Edexcel 83) Huygens' construction.
- (Eduqas) Little diffraction when λ is much smaller than the gap; spreading through about 180° when λ is similar to or bigger than the gap; why grating maxima are further apart and much sharper than double-slit fringes.

### Explained

**Diffraction** is the spreading of waves as they pass through a gap or round an obstacle. It is greatest when the gap is about the same size as the wavelength. When the gap is much bigger than λ, the wave passes through with little spreading. A ripple tank shows this: wavefronts through a narrow gap become nearly semicircular.

**Huygens' construction** (Edexcel 83). Every point on a wavefront acts as a source of secondary wavelets that spread out in all directions. The new wavefront is the line tangent to all the wavelets (their envelope). At a gap, only the wavelets from the unblocked part continue, and those at the edges spread into the shadow region, so the wave curves round.

**Single slit.**

- Monochromatic light: a wide, bright central maximum, with narrower, much dimmer maxima either side. The central maximum is twice as wide as each side maximum.
- Narrower slit: more diffraction, so a wider central maximum (but dimmer, as less light passes).
- Longer wavelength: wider central maximum (red spreads more than blue).
- White light: a white central maximum with coloured edges; side maxima are spectra with violet on the inside and red on the outside.

(The first minimum is at sin θ ≈ λ/a for slit width a; useful for qualitative reasoning but not needed for AQA.)

**Diffraction grating.** Thousands of equally spaced parallel slits per mm. Light from every slit interferes. Bright maxima occur only where light from adjacent slits is in phase: path difference between adjacent slits = d sin θ = nλ.

*Derivation.* Adjacent slits are d apart. For light leaving at angle θ to the normal, the extra distance travelled by light from one slit compared with the next is d sin θ (from the right-angled triangle with hypotenuse d). Constructive interference needs this to be a whole number of wavelengths: d sin θ = nλ.

- d = 1/N, where N is the number of lines per metre.
- Maximum order: sin θ ≤ 1, so n_max is the whole-number part of d/λ.
- Because d is tiny, the maxima are far apart; because there are so many slits, each maximum is very sharp and bright (light from thousands of slits cancels almost everywhere else).

**Applications.** Spectroscopy (separating light from a star or a discharge tube into its wavelengths to identify elements, measure redshift); measuring wavelengths of lasers; X-ray crystallography (a crystal acts as a 3D grating for X-rays, revealing atomic spacing, e.g. the structure of DNA); CD and DVD surfaces act as reflection gratings.

### Worked example

1. A grating has 300 lines per mm. Light of wavelength 589 nm falls on it normally. Find the angle of the second-order maximum and the highest order seen.

   d = 1/300 000 = 3.33 × 10⁻⁶ m. sin θ = 2 × 589 × 10⁻⁹ / 3.33 × 10⁻⁶ = 0.353, θ = 20.7°. d/λ = 5.66, so the highest order is 5.

2. A laser beam through a grating makes first-order spots 0.315 m either side of the centre on a screen 1.20 m away. The grating has 500 lines per mm. Find λ.

   tan θ = 0.315/1.20, θ = 14.7°. d = 2.0 × 10⁻⁶ m. λ = d sin θ = 2.0 × 10⁻⁶ × 0.254 = 5.08 × 10⁻⁷ m.

### Common mistakes

- Using lines per mm as d.
- Using the distance on the screen as sin θ (it gives tan θ, or use tan⁻¹ first).
- Saying a narrower slit gives a narrower central maximum.
- Rounding n_max up instead of down.

## 3.3.2.3 Refraction at a plane surface

*Refs: AQA 3.3.2.3 · Edexcel 71, 72, 73, 74 · OCR A 4.4.2(d), (e) · OCR B 4.1(a)(iii), 4.1(c)(ii), 4.1(d)(ii) · Eduqas C3.3(a) to (h). Level: AS & A.*

### What you need to know

- Refractive index n = c/cₛ, where cₛ is the speed of light in the substance; n of air ≈ 1.
- Snell's law: n₁ sin θ₁ = n₂ sin θ₂.
- Total internal reflection and the critical angle: sin θc = n₂/n₁.
- Step-index optical fibres: the core and the cladding, and why cladding is needed.
- Material and modal dispersion; pulse broadening and absorption, and their consequences (AQA; Eduqas multimode dispersion and monomode fibre).
- (OCR A, Edexcel, Eduqas, OCR B) How to measure refractive index.

### Explained

**Refractive index.** Light slows down in a denser material. n = c/v, so n ≥ 1. Water 1.33, glass about 1.5, diamond 2.42. Since v = fλ and f does not change at a boundary, λ also falls in a denser medium. Equivalent forms: n₁v₁ = n₂v₂ (Eduqas C3.3(b)).

**Snell's law.** n₁ sin θ₁ = n₂ sin θ₂, angles measured from the normal. Going into a higher n, light bends towards the normal; into a lower n, away from it. OCR B writes n = sin i / sin r = c₁/c₂.

**Wave explanation** (OCR B 4.1(a)(iii), Eduqas C3.3(c)). When a wavefront meets a boundary at an angle, the part that enters the slower medium first travels more slowly, while the rest is still in the fast medium. The wavefront swivels and so the direction changes. In the time t that one end travels v₁t to reach the boundary, the other end travels v₂t in the new medium. Geometry gives sin θ₁/sin θ₂ = v₁/v₂, which is Snell's law.

**Total internal reflection (TIR).** Going from a higher n to a lower n, the refracted ray bends away from the normal. At the critical angle θc the refracted ray travels along the boundary (θ₂ = 90°): n₁ sin θc = n₂, so **sin θc = n₂/n₁** (or 1/n into air). If the angle of incidence exceeds θc, all the light is reflected. Conditions: light travelling into a lower refractive index, and angle of incidence > θc.

**Step-index optical fibres.** A thin glass core (high n) is surrounded by cladding of slightly lower n. Light travels along the core by repeated total internal reflection at the core–cladding boundary. The cladding:

- protects the core from scratches, which would let light escape;
- stops signal crossover (crosstalk) between touching fibres;
- keeps n₂ fixed, so the critical angle is predictable.

Because n_core and n_cladding are close, θc is large (often over 80°), so only rays travelling nearly along the axis are guided.

**Dispersion and pulse broadening.** Data is sent as pulses of light. If a pulse spreads out in time as it travels (pulse broadening), neighbouring pulses can overlap, so the receiver cannot tell them apart. This limits the bit rate and the distance before the signal must be regenerated.

- *Modal (multipath) dispersion*: rays entering at different angles take different paths; rays bouncing at steep angles travel further than rays along the axis, so they arrive later. Reduce by making the core very narrow (monomode fibre, so only the axial path is possible) or by using a smaller difference between core and cladding n.
- *Material (chromatic) dispersion*: n depends on wavelength, so different wavelengths travel at different speeds. Violet light is slower than red in glass. Reduce by using monochromatic light (a laser).

**Absorption.** Some energy is absorbed by the glass, so the pulse amplitude falls along the fibre. Pulses get smaller and wider; repeaters (regenerators) are needed at intervals. Use very pure glass and wavelengths (infrared around 1.3 to 1.55 μm) where absorption is low.

**Monomode fibres** (Eduqas C3.3(h)). The core is only a few micrometres across, so light can only travel straight along it; modal dispersion is eliminated, allowing very high data rates over long distances.

### Worked example

1. Light enters glass (n = 1.52) from air at 40°. Find the angle of refraction and the speed in glass.

   sin θ₂ = sin 40°/1.52 = 0.423, θ₂ = 25.0°. v = c/n = 1.97 × 10⁸ m s⁻¹.

2. A fibre has a core of n = 1.48 and cladding of n = 1.46. Find the critical angle.

   sin θc = 1.46/1.48 = 0.9865, θc = 80.6°.

3. (Eduqas) A fibre is 2.0 km long with core n = 1.50. Compare the time for an axial ray with that of a ray hitting the boundary at exactly the critical angle when the cladding has n = 1.45.

   Axial: t = L/v = 2000 × 1.50 / 3.00 × 10⁸ = 1.000 × 10⁻⁵ s. Critical ray: path length = L/sin θc, where sin θc = 1.45/1.50 = 0.967; path = 2069 m, t = 1.034 × 10⁻⁵ s. Difference ≈ 0.34 μs: pulses must be at least this far apart.

### Common mistakes

- Measuring angles from the surface instead of the normal.
- Saying TIR happens when light goes into a denser medium.
- Writing sin θc = n₁/n₂ (upside down, giving sin > 1).
- Saying the cladding "reflects" the light; TIR happens at the boundary because cladding has lower n.
- Mixing up modal (different paths) and material (different wavelengths) dispersion.

### Practical

**Measuring refractive index of a glass block** (Edexcel 74, OCR A PAG6, OCR B 4.1(d)(ii), Eduqas specified practical). Place a rectangular block on paper and draw round it. Shine a narrow ray from a ray box into one side at a measured angle of incidence i. Mark the ray where it leaves, remove the block and join the points to draw the refracted ray inside. Measure r with a protractor. Repeat for several angles from 10° to 70°. Plot sin i against sin r: straight line through the origin, gradient n. A semicircular block can be used to find the critical angle directly (aim the ray at the centre of the flat face, from inside the curved side, and increase the angle until the refracted ray just grazes the surface): n = 1/sin C.

## Check questions

1. State what is meant by coherent sources, and explain why two separate light bulbs cannot produce an observable interference pattern. (3 marks)
2. In a double-slit experiment, λ = 520 nm, s = 0.25 mm and D = 1.60 m. Calculate the fringe spacing. Describe the change if the slit separation is halved. (3 marks)
3. Describe the pattern formed when white light passes through a double slit. (3 marks)
4. Derive the equation d sin θ = nλ for a diffraction grating. (3 marks)
5. A grating with 600 lines per mm is used with light of wavelength 450 nm. Calculate the number of maxima seen on the screen. (3 marks)
6. Explain why a grating gives a more accurate value of wavelength than a double slit. (2 marks)
7. Light in glass (n = 1.50) meets a boundary with water (n = 1.33). Calculate the critical angle. (2 marks)
8. Explain how modal dispersion arises in an optical fibre and state one way to reduce it. (3 marks)

## Mark scheme

1. Same frequency (and wavelength) and constant phase difference (1); light from bulbs is emitted in random bursts (1); so phase difference changes randomly / fringes move too fast to see (1).
2. w = 520 × 10⁻⁹ × 1.60 / 0.25 × 10⁻³ = 3.3 mm (2); fringe spacing doubles (1).
3. Central white fringe (1); other fringes are coloured / spectra (1); violet / blue on the inside nearest centre, red outside; fringes overlap further out (1).
4. Adjacent slits separated by d; path difference between them = d sin θ (1, with diagram); for a bright maximum light from adjacent slits must arrive in phase (1); so path difference = nλ (1).
5. d = 1.67 × 10⁻⁶ m (1); d/λ = 3.7, so n_max = 3 (1); 3 each side + central = 7 maxima (1).
6. Grating maxima are sharper / brighter (1); further apart / larger angles, so smaller percentage uncertainty in measurement (1).
7. sin C = 1.33/1.50 = 0.887 (1); C = 62.5° (1).
8. Rays travel at different angles / take different paths (1); longer paths take longer, so pulse spreads / broadens (1); use monomode (narrow core) fibre / reduce difference in n of core and cladding (1).
