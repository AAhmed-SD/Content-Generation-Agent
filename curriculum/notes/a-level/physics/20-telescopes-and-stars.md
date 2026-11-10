---
level: A-level
subject: Physics
topic: "Astrophysics: telescopes, magnitudes, black-body radiation, spectral classes, the HR diagram and stellar evolution"
as_content: "AQA option (A-level only). Edexcel 153 to 160 A-level only. OCR A 5.5.1, 5.5.2 A-level only. Eduqas C2.7 AS & A."
boards:
  - board: AQA
    code: "7408"
    spec_refs: ["3.9.1.1", "3.9.1.2", "3.9.1.3", "3.9.1.4", "3.9.2.1", "3.9.2.2", "3.9.2.3", "3.9.2.4", "3.9.2.5", "3.9.2.6"]
  - board: Edexcel
    code: "9PH0"
    spec_refs: ["153", "154", "155", "156", "159", "160"]
  - board: OCR A
    code: "H556"
    spec_refs: ["5.5.1(a)", "5.5.1(b)", "5.5.1(c)", "5.5.1(d)", "5.5.1(e)", "5.5.1(f)", "5.5.1(g)", "5.5.2(i)", "5.5.2(j)", "5.5.2(k)"]
  - board: OCR B
    code: "H557"
    spec_refs: ["5.1.3(b)(i)"]
  - board: Eduqas
    code: "A420QS"
    spec_refs: ["C2.7(a)", "C2.7(b)", "C2.7(c)", "C2.7(d)", "C2.7(e)"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/physics-2015.html
  OCR A: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-a-h156-h556-from-2015/
  OCR B: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-b-advancing-physics-h157-h557-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/physics-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/a-level-aqa/
---

# Astrophysics: telescopes, magnitudes, black-body radiation, spectral classes, the HR diagram and stellar evolution

How do we learn about stars we can never visit? This file covers refracting and reflecting telescopes, radio and other telescopes, resolution and collecting power, CCDs, the magnitude scale and distances in parsecs, black-body radiation with Wien's and Stefan's laws, stellar spectral classes, the Hertzsprung–Russell diagram, how stars form and evolve, and supernovae, neutron stars and black holes.

## Overview

AQA option 3.9 (A-level only). Also core content for Edexcel (Topic 9 black body, Topic 10 Space), OCR A (5.5) and Eduqas (C2.7). Line spectra and energy levels are in file 03; the diffraction grating is in file 05. Distances (parallax, standard candles), Doppler shift, Hubble's law, the Big Bang and exoplanets are in file 21. Lenses in general (Edexcel) are in file 22.

### Board differences

- AQA 3.9.1, 3.9.2 · Edexcel 153 to 156, 159, 160 · OCR A 5.5.1, 5.5.2(i) to (k) · OCR B 5.1.3(b)(i) · Eduqas C2.7.
- Telescopes, magnitudes, spectral classes and Schwarzschild radius: AQA only.
- Stellar evolution in detail (low-mass star to white dwarf; electron degeneracy pressure; Chandrasekhar limit; massive star to supernova, neutron star or black hole): OCR A 5.5.1(b) to (f). Edexcel 160 links the HR diagram to the life cycle. AQA: path of a Sun-like star on the HR diagram.
- Edexcel 156 and Eduqas C2.7(d): intensity I = L/(4πd²). AQA uses the inverse-square law with assumptions.
- Eduqas C2.7(e): multiwavelength astronomy (why we observe in different parts of the spectrum).
- OCR B 5.1.3(b)(i): using logarithmic scales for distances, sizes, masses, energies and brightness.
- OCR A 5.5.1(a): definitions of planets, planetary satellites, comets, solar systems, galaxies and the universe.

## 3.9.1.1 Astronomical telescope consisting of two converging lenses

*Refs: AQA 3.9.1.1. Level: A-level only.*

### What you need to know

- A ray diagram showing image formation in normal adjustment.
- Angular magnification in normal adjustment M = (angle subtended by image at eye) ÷ (angle subtended by object at unaided eye) = f_o/f_e.
- The focal lengths of the lenses.

### Explained

A refracting telescope has a long-focal-length objective lens (f_o) and a short-focal-length eyepiece lens (f_e).

- Light from a distant object arrives as parallel rays. The objective forms a real, inverted image at its principal focus.
- In **normal adjustment**, the eyepiece is placed so its principal focus is at the same point. Rays leave the eyepiece parallel, so the final image is at infinity (viewed with a relaxed eye). The lenses are f_o + f_e apart.
- Ray diagram: draw a ray through the centre of the objective, at angle α to the axis, to the intermediate image in the shared focal plane; from that image point, draw a construction line through the centre of the eyepiece; all rays leave the eyepiece parallel to it, at angle β.

**Angular magnification** M = β/α. With small angles, α ≈ h/f_o and β ≈ h/f_e (h = height of intermediate image), so **M = f_o/f_e**. For a large magnification, use a long objective and a short eyepiece.

### Worked example

1. A telescope has f_o = 1.20 m and f_e = 0.040 m. Find M and the length of the telescope in normal adjustment. The Moon subtends 9.0 × 10⁻³ rad. What angle does its image subtend?

   M = 30. Length = 1.24 m. β = 30 × 9.0 × 10⁻³ = 0.27 rad.

### Common mistakes

- Writing M = f_e/f_o.
- Saying the final image in normal adjustment is at the eyepiece focal point (it is at infinity).

## 3.9.1.2 Reflecting telescopes

*Refs: AQA 3.9.1.2. Level: A-level only.*

### What you need to know

- The Cassegrain arrangement: a parabolic concave primary mirror and a convex secondary mirror.
- The ray diagram up to the eyepiece.
- Relative merits of reflectors and refractors, with spherical and chromatic aberration.

### Explained

**Cassegrain.** Light enters the open tube and reflects from a large concave **parabolic** primary mirror towards its focus. Before reaching the focus, it hits a small convex secondary mirror, which reflects it back through a hole in the centre of the primary to an eyepiece (or camera) behind it. This folds the light path, so a long focal length fits in a short tube.

**Aberrations.**

- *Chromatic aberration*: a lens refracts different wavelengths by different amounts (blue more than red), so they focus at different points: coloured fringes, blurred image. Mirrors reflect all wavelengths the same way, so they have none.
- *Spherical aberration*: with a spherical lens or mirror, rays far from the axis focus at a different point from rays near the axis, so the image is blurred. A parabolic mirror brings all rays parallel to the axis to one focus, removing it.

**Reflectors versus refractors.**

| | Refractor | Reflector |
| --- | --- | --- |
| Chromatic aberration | Yes (reduced with achromatic doublets) | None |
| Spherical aberration | Yes | None with a parabolic mirror |
| Size | Large lenses are very heavy, sag under their own weight, are supported only at the edge, and must be flawless all through the glass | Mirrors can be supported from behind and only the surface must be perfect; can be segmented; much larger possible |
| Light absorption | Some absorbed in glass (especially UV) | Little |
| Obstruction | None | Secondary mirror blocks some light and causes diffraction spikes |
| Maintenance | Sealed tube, low | Open tube; mirror coating degrades |

So all large modern optical telescopes are reflectors.

### Common mistakes

- Saying the Cassegrain secondary is concave (it is convex).
- Saying mirrors have chromatic aberration.

## 3.9.1.3 Single dish radio telescopes, I-R, U-V and X-ray telescopes

*Refs: AQA 3.9.1.3 · Eduqas C2.7(e). Level: A-level only (Eduqas AS & A).*

### What you need to know

- How radio telescopes compare with optical telescopes: structure, positioning and use, resolving and collecting power.
- Infrared, ultraviolet and X-ray telescopes.
- (Eduqas) Multiwavelength astronomy: different wavelengths reveal different objects and processes.

### Explained

**Radio telescopes** (e.g. Jodrell Bank). A large parabolic dish (wire mesh or metal) reflects radio waves to an antenna at the focus, which is connected to a receiver.

- *Similarities to optical reflectors*: parabolic reflector, focusing to a point, steered to track sources.
- *Differences*: wavelengths are about 10⁶ times longer (cm to m), so the dish can be a wire mesh (the gaps must be smaller than about λ/20) and the surface accuracy needed is far lower; but the resolution λ/D is much poorer, so dishes must be huge, or several are linked (interferometry, effective D of thousands of km). They can operate in daylight and cloudy weather and can be on the ground (radio passes through the atmosphere). They detect one point at a time, so the dish scans to build an image. Interference from human sources (phones, radar) is a problem, so they are built in remote areas.

**Infrared, ultraviolet and X-ray telescopes.**

- The atmosphere absorbs most UV, X-rays and much infrared, so these telescopes are placed in space (or IR telescopes on high, dry mountains).
- IR telescopes use mirrors, but must be cooled (to near absolute zero) or their own heat swamps the signal. They see through dust clouds, cool stars, star-forming regions, and very redshifted galaxies.
- UV telescopes are similar to optical reflectors (Cassegrain) with special coatings. They study hot stars and quasars.
- X-rays pass straight into normal mirrors, so X-ray telescopes use grazing incidence: X-rays glance off nested curved mirrors at shallow angles to focus. They observe very hot gas (millions of K), black hole surroundings, neutron stars and supernova remnants.

**Multiwavelength astronomy** (Eduqas). Each band shows different physics: radio (cold hydrogen gas at 21 cm, pulsars, galaxy jets, the CMB in microwaves), IR (cool and dust-hidden objects), optical (stars), UV (hot young stars), X-ray and gamma (extremely hot or violent events). Combining them gives a complete picture of an object.

### Common mistakes

- Saying radio telescopes have better resolution than optical ones because they are bigger (λ is so much larger that resolution is usually worse for a single dish).
- Saying X-ray telescopes use ordinary curved mirrors at normal incidence.

## 3.9.1.4 Advantages of large diameter telescopes

*Refs: AQA 3.9.1.4. Level: A-level only.*

### What you need to know

- Minimum angular resolution: Rayleigh criterion θ ≈ λ/D (in radians).
- Collecting power ∝ D².
- Comparison of the eye and the CCD in terms of quantum efficiency, resolution and convenience.

### Explained

**Resolution.** Light passing through a circular aperture diffracts into an Airy disc. Two point sources (such as two stars close together) can just be resolved when the centre of one diffraction pattern lies on the first minimum of the other: θ ≈ λ/D (strictly 1.22λ/D for a circular aperture). A smaller θ means finer detail can be seen, so a larger diameter D gives better resolution. In practice, atmospheric turbulence ("seeing") limits ground-based telescopes unless adaptive optics or space telescopes are used.

**Collecting power.** The energy collected per second is proportional to the area of the objective, so to D². Doubling D collects 4 times as much light, so fainter objects can be seen and exposures are shorter.

**Charge-coupled device (CCD).** A silicon chip divided into many pixels; photons release electrons in each pixel (photoelectric effect), and the charge collected is proportional to the light received.

| | Eye | CCD |
| --- | --- | --- |
| Quantum efficiency (fraction of photons detected) | About 1% | 70% to over 80% |
| Wavelength range | 400 to 700 nm | Wider (near IR to UV) |
| Resolution | About 100 μm between receptors on the retina; limited by pupil | Pixels about 10 μm; usually limited by the telescope |
| Exposure | About 0.1 s (no storing) | Long exposures, minutes to hours, add up faint light |
| Convenience | No equipment, but no permanent record | Digital record, can be processed; needs cooling, power, computer |

### Worked example

1. Find the minimum angular resolution of a 2.4 m telescope at 550 nm, and of a 76 m radio dish at 21 cm.

   Optical: 550 × 10⁻⁹/2.4 = 2.3 × 10⁻⁷ rad. Radio: 0.21/76 = 2.8 × 10⁻³ rad (about 12 000 times worse).

2. How many times more light does an 8.0 m mirror collect than a 2.0 m mirror?

   (8.0/2.0)² = 16.

### Common mistakes

- Using degrees in θ = λ/D.
- Saying a bigger telescope makes stars look bigger (it makes them brighter and better resolved).

## 3.9.2.1 Classification by luminosity

*Refs: AQA 3.9.2.1 · OCR B 5.1.3(b)(i). Level: A-level only.*

### What you need to know

- Apparent magnitude m; the Hipparcos scale; the dimmest stars visible to the naked eye have m = 6.
- A difference of 1 in magnitude = an intensity (brightness) ratio of 2.51.
- Brightness is a subjective scale.

### Explained

Hipparchus ranked stars from 1 (brightest) to 6 (faintest visible). The modern scale is defined so that a difference of 5 magnitudes is exactly a factor of 100 in intensity, so 1 magnitude = 100^(1/5) = 2.512.

- Lower (more negative) m means brighter. Sirius: −1.5. Full Moon: −12.7. Sun: −26.7.
- For two stars: I₁/I₂ = 2.51^(m₂ − m₁), or m₁ − m₂ = −2.5 log₁₀(I₁/I₂).

This is a logarithmic scale (OCR B also uses log scales for all wide-ranging astronomical quantities), because the eye responds roughly logarithmically to intensity. Brightness is how bright a star appears to an observer; it depends on luminosity and distance.

### Worked example

1. Star A has m = 2.0, star B has m = 7.0. How many times brighter does A appear?

   2.51⁵ = 100 times.

### Common mistakes

- Thinking a larger magnitude means brighter.

## 3.9.2.2 Absolute magnitude, M

*Refs: AQA 3.9.2.2. Level: A-level only.*

### What you need to know

- The parsec and the light year.
- Definition of M; m − M = 5 log₁₀(d/10), with d in parsecs.

### Explained

**Light year (ly)**: the distance light travels in one year = 9.46 × 10¹⁵ m.

**Parsec (pc)**: the distance at which 1 AU (the mean Earth–Sun distance, 1.50 × 10¹¹ m) subtends an angle of 1 arcsecond (1/3600°). 1 pc = 3.09 × 10¹⁶ m = 3.26 ly. (Parallax is covered in file 21.)

**Absolute magnitude M**: the apparent magnitude the star would have at a distance of 10 pc. It measures luminosity, independent of distance.

Since intensity ∝ 1/d²: m − M = 5 log₁₀(d/10). The difference m − M is the distance modulus.

### Worked example

1. A star with M = 1.5 has m = 6.5. Find its distance.

   6.5 − 1.5 = 5 log(d/10), log(d/10) = 1, d = 100 pc.

2. The Sun has m = −26.7 at 1 AU = 4.85 × 10⁻⁶ pc. Find its absolute magnitude.

   M = m − 5 log(d/10) = −26.7 − 5 log(4.85 × 10⁻⁷) = −26.7 + 31.6 = 4.9.

### Common mistakes

- Using d in light years or metres in m − M = 5 log(d/10).

## 3.9.2.3 Classification by temperature, black-body radiation

*Refs: AQA 3.9.2.3 · Edexcel 153, 154, 155, 156 · OCR A 5.5.2(i), (j), (k) · Eduqas C2.7(a) to (d). Level: A-level only (Eduqas AS & A).*

### What you need to know

- A black body absorbs all radiation falling on it and is the best possible emitter. Stars are assumed to be black bodies.
- The general shape of black-body curves.
- Wien's displacement law: λ_max T = 2.9 × 10⁻³ m K; use it to estimate temperatures.
- Stefan's law: P = σAT⁴ (luminosity L = 4πr²σT⁴); use it to compare power, temperature and size of stars. σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴.
- The inverse-square law and its assumptions: I = L/(4πd²).
- (Eduqas) A stellar spectrum is a continuous (black-body) spectrum with absorption lines from cooler outer gas.

### Explained

**Black body.** An idealised object that absorbs all electromagnetic radiation that falls on it. A black body at temperature T emits a continuous spectrum whose shape depends only on T.

**Black-body curves** (intensity against wavelength): a smooth hump, rising steeply from short wavelengths to a peak at λ_max, then falling more gently at long wavelengths. Hotter bodies have:

- a peak at a shorter wavelength (Wien's law), so they look bluer;
- a much higher curve at every wavelength, with total area (power) ∝ T⁴ (Stefan's law).

**Wien's law.** λ_max T = 2.9 × 10⁻³ m K. The Sun's spectrum peaks near 500 nm, so T ≈ 5800 K. A red star (peak ~ 900 nm) is about 3200 K; a blue star (peak ~ 100 nm) about 29 000 K.

**Stefan's law.** Power emitted P = σAT⁴. For a spherical star, L = 4πr²σT⁴. A star can be very luminous because it is very hot or very large.

**Inverse-square law.** At distance d, intensity (power per unit area) received I = L/(4πd²). Assumptions: the star emits equally in all directions; no radiation is absorbed or scattered on the way (by dust or gas).

**Stellar spectra** (Eduqas C2.7(a)). The hot dense surface (photosphere) emits a continuous spectrum. Cooler gas in the outer atmosphere absorbs particular wavelengths, giving dark absorption lines, which show which elements are present.

### Worked example

1. A star's spectrum peaks at 380 nm. Find its surface temperature.

   T = 2.9 × 10⁻³/380 × 10⁻⁹ = 7600 K.

2. Star X has twice the surface temperature and half the radius of the Sun. Compare its luminosity with the Sun's.

   L ∝ r²T⁴: (½)² × 2⁴ = 4 times the Sun's.

3. (Edexcel, Eduqas) The Sun's luminosity is 3.85 × 10²⁶ W. Find the intensity at the Earth (1.50 × 10¹¹ m).

   I = 3.85 × 10²⁶/(4π × (1.50 × 10¹¹)²) = 1360 W m⁻².

4. A red giant has T = 3500 K and L = 2.0 × 10²⁹ W. Find its radius.

   r = √(L/(4πσT⁴)) = √(2.0 × 10²⁹/(4π × 5.67 × 10⁻⁸ × 1.50 × 10¹⁴)) = √(1.87 × 10²¹) = 4.3 × 10¹⁰ m (about 60 times the Sun's radius).

### Common mistakes

- Using °C in Wien's or Stefan's law.
- Forgetting to raise T to the fourth power.
- Saying a black body looks black when hot.

## 3.9.2.4 Principles of the use of stellar spectral classes

*Refs: AQA 3.9.2.4. Level: A-level only.*

### What you need to know

- The main spectral classes O, B, A, F, G, K, M with their colours, temperatures and prominent absorption lines.
- How temperature affects absorption spectra, limited to the hydrogen Balmer lines, which need atoms in the n = 2 state.

### Explained

| Class | Colour | Temperature / K | Prominent absorption lines |
| --- | --- | --- | --- |
| O | Blue | 25 000 to 50 000 | He⁺, He, H |
| B | Blue | 11 000 to 25 000 | He, H |
| A | Blue-white | 7 500 to 11 000 | H (strongest), ionised metals |
| F | White | 6 000 to 7 500 | Ionised metals |
| G | Yellow-white | 5 000 to 6 000 | Ionised and neutral metals |
| K | Orange | 3 500 to 5 000 | Neutral metals |
| M | Red | below 3 500 | Neutral atoms, TiO molecules |

The Sun is a G star (about 5800 K).

**Balmer lines.** These visible hydrogen absorption lines come from transitions from n = 2 to higher levels. A star only shows strong Balmer lines if many of its hydrogen atoms have electrons in the n = 2 level.

- Cool stars (K, M): most hydrogen is in the ground state (n = 1), so few atoms can absorb Balmer wavelengths: weak lines.
- Very hot stars (O): most hydrogen is ionised, so again few n = 2 atoms: weak lines.
- A stars (about 10 000 K): collisions excite many atoms to n = 2 without ionising them: strongest Balmer lines.

So the pattern of lines in a spectrum gives a star's temperature.

### Common mistakes

- Saying hotter stars always have stronger hydrogen lines.

## 3.9.2.5 The Hertzsprung–Russell diagram

*Refs: AQA 3.9.2.5 · Edexcel 159, 160 · OCR A 5.5.1(g). Level: A-level only.*

### What you need to know

- The general shape: main sequence, dwarfs and giants.
- Axes: absolute magnitude (−10 to +15) or luminosity, against temperature (50 000 K to 2500 K, decreasing to the right) or spectral class OBAFGKM.
- The position of the Sun.
- The path of a Sun-like star on the HR diagram from formation to white dwarf.

### Explained

**Axes.** Vertical: luminosity (log scale, L/L_Sun from 10⁻⁴ to 10⁶) or absolute magnitude (−10 at the top to +15 at the bottom). Horizontal: surface temperature, *decreasing* from left (hot, 50 000 K, O) to right (cool, 2500 K, M), on a log scale.

**Regions.**

- *Main sequence*: a diagonal band from top left (hot, luminous, massive O and B stars) to bottom right (cool, dim, small red dwarfs). Stars spend about 90% of their lives here, fusing hydrogen to helium in their cores. The Sun is on the main sequence: M ≈ +5, about 5800 K.
- *Red giants*: top right (cool but very luminous, so very large).
- *Red supergiants*: very top right.
- *White dwarfs*: bottom left (hot but dim, so very small).

**Evolution of a Sun-like star** (AQA, Edexcel 160, OCR A 5.5.1(b) to (d)).

1. A cloud of dust and gas (nebula) collapses under gravity; gravitational potential energy becomes thermal energy. A protostar forms and moves onto the HR diagram from the right.
2. When the core is hot and dense enough (about 10⁷ K), hydrogen fusion starts. Outward radiation pressure (and gas pressure) balances gravity: a stable main-sequence star.
3. When hydrogen in the core runs out, the core contracts and heats; hydrogen fusion continues in a shell around it; the outer layers expand and cool. The star moves up and to the right: a red giant. Helium fuses to carbon (and oxygen) in the core.
4. The outer layers drift off as a planetary nebula. The hot core remains as a white dwarf (bottom left), which slowly cools and fades.

**White dwarf** (OCR A 5.5.1(d)). Very dense (a Sun's mass in Earth's size). No fusion. It does not collapse further because of electron degeneracy pressure: two electrons cannot occupy the same quantum state (Pauli exclusion principle), so electrons resist being squeezed. This works only for a core below the Chandrasekhar limit, 1.44 solar masses.

**Massive stars** (OCR A 5.5.1(e), (f)). A star much more massive than the Sun leaves the main sequence to become a red supergiant, fusing successively heavier elements in shells (up to iron). Iron fusion does not release energy (file 19), so the core collapses suddenly when its mass exceeds 1.44 solar masses; the outer layers rebound in a supernova. The remnant core becomes a neutron star (if under about 3 solar masses) or a black hole.

### Common mistakes

- Drawing temperature increasing to the right.
- Saying stars move along the main sequence as they age.
- Saying white dwarfs are cool.

## 3.9.2.6 Supernovae, neutron stars and black holes

*Refs: AQA 3.9.2.6 · OCR A 5.5.1(e), (f). Level: A-level only.*

### What you need to know

- Supernova: a rapid increase in absolute magnitude. Neutron stars: composition and density. Black holes: escape velocity greater than c.
- Gamma-ray bursts from the collapse of supergiants to neutron stars or black holes; their energy output compared with the Sun's total lifetime output.
- Type Ia supernovae as standard candles; the controversy over the accelerating universe and dark energy; the typical light curve of a type Ia supernova.
- Supermassive black holes at the centres of galaxies.
- The Schwarzschild radius R_s ≈ 2GM/c².

### Explained

**Supernova.** A star suddenly increases in brightness by a huge amount (absolute magnitude rises by about 15 to 20, to around −19), briefly outshining a whole galaxy, then fades over weeks or months.

- *Core-collapse supernovae* (type II): a massive star's iron core collapses; outer layers bounce off and are blasted away.
- *Type Ia*: a white dwarf in a binary system takes matter from its companion until it exceeds the Chandrasekhar limit, then explodes completely. Because they all explode at about the same mass, they all reach the same peak absolute magnitude (about −19.3). This makes them **standard candles**: measure their apparent magnitude at peak, and m − M = 5 log(d/10) gives the distance. Light curve: rises to the peak in about 20 days, then a fairly fast decline and a slower tail over months.

**Accelerating universe.** In 1998, distant type Ia supernovae were found to be fainter (further away) than expected for their redshift. This suggested that the expansion of the universe is accelerating, driven by an unknown "dark energy". This is controversial: the result relies on the assumption that type Ia supernovae are identical at all distances and that nothing (such as dust) dims them.

**Neutron stars.** After core collapse, electrons and protons are forced together to form neutrons (p + e⁻ → n + νₑ). A neutron star is made almost entirely of neutrons, has a radius of about 10 km and a density similar to nuclear density (about 10¹⁷ kg m⁻³). Neutron degeneracy pressure holds it up. Rapidly rotating neutron stars that emit beams of radio waves are pulsars.

**Black holes.** If the collapsing core is more than about 3 solar masses, nothing stops the collapse. A black hole is a region where the escape velocity exceeds the speed of light, so nothing, not even light, can escape. The boundary is the event horizon, at the Schwarzschild radius: setting escape velocity √(2GM/R) = c gives **R_s = 2GM/c²**.

**Gamma-ray bursts.** Very short (milliseconds to minutes) bursts of gamma rays, thought to come from the collapse of supergiants into neutron stars or black holes (long bursts), or the merging of neutron stars (short bursts). They can release about 10⁴⁴ J in seconds, about the same as the Sun emits in its whole 10-billion-year lifetime (3.9 × 10²⁶ W × 3 × 10¹⁷ s ≈ 10⁴⁴ J).

**Supermassive black holes.** Most galaxies have one at their centre, of millions to billions of solar masses. Evidence: stars near the centre of our galaxy orbit an invisible object of about 4 million solar masses at very high speeds.

### Worked example

1. Find the Schwarzschild radius of a black hole of 10 solar masses (M_Sun = 2.0 × 10³⁰ kg).

   R_s = 2 × 6.67 × 10⁻¹¹ × 2.0 × 10³¹/(3.0 × 10⁸)² = 3.0 × 10⁴ m (30 km).

2. A type Ia supernova (M = −19.3) has peak apparent magnitude m = 16.7. Find its distance.

   m − M = 36 = 5 log(d/10); d = 10 × 10^7.2 = 1.6 × 10⁸ pc.

### Common mistakes

- Saying a black hole "sucks in" everything (far from it, its gravity is like any other mass).
- Saying neutron stars are made of protons and neutrons in equal numbers.

## Check questions

1. Draw a ray diagram for a refracting telescope in normal adjustment and show that M = f_o/f_e. (5 marks)
2. Give three advantages of reflecting telescopes over refracting telescopes. (3 marks)
3. Compare a single-dish radio telescope with an optical reflecting telescope. (4 marks)
4. Two stars are 1.5 × 10⁻⁶ rad apart. What is the minimum diameter of telescope that can resolve them at 500 nm? (2 marks)
5. Star P has m = 3.0 and is 50 pc away. Calculate its absolute magnitude. (2 marks)
6. The star Betelgeuse has a peak wavelength of 850 nm and luminosity 4.5 × 10³¹ W. Calculate its temperature and radius. (4 marks)
7. Explain why the Balmer absorption lines are weak in the spectra of both very hot and cool stars. (4 marks)
8. Describe the evolution of a star like the Sun from the main sequence to a white dwarf, and the path on the HR diagram. (5 marks)
9. Explain why type Ia supernovae can be used as standard candles. (3 marks)

## Mark scheme

1. Correct diagram: parallel rays into objective, intermediate image at shared focus, parallel rays out of eyepiece (2); α = h/f_o (1); β = h/f_e (1); M = β/α = f_o/f_e (1).
2. Any three: no chromatic aberration; parabolic mirror removes spherical aberration; mirrors supported from behind so can be larger; only surface must be perfect; less absorption of light; lighter.
3. Both use parabolic reflector to focus to a point / steerable (1); radio dish can be wire mesh as λ is large (1); radio resolution much poorer for same size, so dishes are larger (1); radio works in daylight / cloud; one-pixel detector scans (1).
4. D = λ/θ (1) = 500 × 10⁻⁹/1.5 × 10⁻⁶ = 0.33 m (1).
5. M = m − 5 log(d/10) (1) = 3.0 − 5 log 5 = −0.49 (1).
6. T = 2.9 × 10⁻³/850 × 10⁻⁹ = 3400 K (1); r = √(L/4πσT⁴) (1) = √(4.5 × 10³¹/(4π × 5.67 × 10⁻⁸ × 1.34 × 10¹⁴)) (1) = 6.9 × 10¹¹ m (1).
7. Balmer lines need hydrogen atoms in n = 2 (1); in cool stars most atoms are in the ground state (1); in very hot stars most hydrogen is ionised (1); so few atoms in n = 2 in both cases; strongest in A stars (1).
8. Main sequence: hydrogen fusion in core, stable (1); core hydrogen runs out, core contracts, shell burning, outer layers expand: red giant (1); moves up and to the right on HR diagram (1); outer layers lost as planetary nebula (1); core becomes white dwarf, bottom left, cools (1).
9. Explode when a white dwarf passes the Chandrasekhar limit (1); so all have the same mass / same peak absolute magnitude (1); measure apparent magnitude and use m − M = 5 log(d/10) to find distance (1).
