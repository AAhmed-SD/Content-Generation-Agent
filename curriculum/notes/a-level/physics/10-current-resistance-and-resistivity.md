---
level: A-level
subject: Physics
topic: "Charge, current, potential difference, resistance, I–V characteristics and resistivity"
as_content: "AS & A for every board."
boards:
  - board: AQA
    code: "7408"
    spec_refs: ["3.5.1.1", "3.5.1.2", "3.5.1.3", "RP5"]
  - board: Edexcel
    code: "9PH0"
    spec_refs: ["31", "32", "33", "38", "39", "40", "41", "47", "48", "CP2"]
  - board: OCR A
    code: "H556"
    spec_refs: ["4.1.1(a)", "4.1.1(b)", "4.1.1(c)", "4.1.1(d)", "4.1.1(e)", "4.1.1(f)", "4.1.2(a)", "4.1.2(b)", "4.2.1(a)", "4.2.1(b)", "4.2.2(a)", "4.2.2(d)", "4.2.2(e)", "4.2.3(a)", "4.2.3(b)", "4.2.3(c)", "4.2.3(d)", "4.2.4(a)", "4.2.4(b)", "4.2.4(c)"]
  - board: OCR B
    code: "H557"
    spec_refs: ["3.1.2(a)(i)", "3.1.2(a)(ii)", "3.1.2(a)(vi)", "3.1.2(a)(viii)", "3.1.2(b)(i)", "3.1.2(b)(ii)", "3.1.2(b)(iii)", "3.1.2(c)(i)", "3.1.2(c)(ii)", "3.1.2(c)(iii)", "3.1.2(d)(i)", "3.1.2(d)(ii)", "3.1.2(d)(iv)"]
  - board: Eduqas
    code: "A420QS"
    spec_refs: ["C2.1(a)", "C2.1(b)", "C2.1(c)", "C2.1(d)", "C2.1(e)", "C2.1(f)", "C2.1(g)", "C2.2(a)", "C2.2(b)", "C2.2(c)", "C2.2(d)", "C2.2(e)", "C2.2(g)", "C2.2(h)", "C2.2(i)", "C2.2(j)", "C2.2(k)", "C2.2(l)", "C2.2(m)", "C2.2(n)"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/physics-2015.html
  OCR A: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-a-h156-h556-from-2015/
  OCR B: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-b-advancing-physics-h157-h557-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/physics-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/a-level-aqa/
---

# Charge, current, potential difference, resistance, I–V characteristics and resistivity

This file defines current, charge, potential difference and resistance; explains conduction in metals with drift velocity; covers I–V characteristics of resistors, lamps and diodes; and covers resistivity, how resistance depends on temperature and light, and superconductivity, with AQA required practical 5.

## Overview

AS & A for every board. Series and parallel circuits, power, Kirchhoff's laws, potential dividers and internal resistance are in file 11.

### Board differences

- AQA 3.5.1.1 to 3.5.1.3, RP5 · Edexcel 31 to 33, 38 to 41, 47, 48, CP2 · OCR A 4.1, 4.2.1 to 4.2.4 · OCR B 3.1.2 · Eduqas C2.1, C2.2.
- Drift velocity I = nAvq (nAve): Edexcel 41, OCR A 4.1.2, Eduqas C2.1(g); OCR B 3.1.2(a)(viii) qualitatively (number density of charge carriers). Not in AQA.
- Conductance G = I/V = 1/R and conductivity σ = 1/ρ: OCR B only.
- Edexcel 47, 48 and OCR A 4.2.4(b), (c) model changes of resistance with temperature and light in terms of lattice vibrations and number of charge carriers.
- Superconductivity: AQA 3.5.1.3 and Eduqas C2.2(k) to (n). Not Edexcel or OCR.
- OCR A 4.2.2(e): an electron accelerated through V gains eV = ½mv².
- Resistivity practical: AQA RP5, Edexcel CP2, OCR A 4.2.4(a)(ii) (PAG3), OCR B 3.1.2(d)(ii), Eduqas specified practical. I–V characteristics: OCR A PAG3, OCR B 3.1.2(d)(i), Eduqas specified practical. Resistance with temperature: Eduqas specified practical (and suggested by AQA).

## 3.5.1.1 Basics of electricity

*Refs: AQA 3.5.1.1 · Edexcel 31, 32, 33 · OCR A 4.1.1(a) to (f), 4.1.2(a), (b), 4.2.1, 4.2.2(a), (d), (e), 4.2.3(a) · OCR B 3.1.2(a)(i), (ii), (viii), (b)(i), (ii), (c)(i), (ii) · Eduqas C2.1(a) to (g), C2.2(a), (b), (d), (e). Level: AS & A.*

### What you need to know

- Current is the rate of flow of charge: I = ΔQ/Δt.
- Potential difference is work done (energy transferred) per unit charge: V = W/Q.
- Resistance R = V/I.
- (OCR A) The coulomb; the elementary charge e = 1.60 × 10⁻¹⁹ C; charge is quantised; conventional current and electron flow; circuit symbols.
- (Edexcel, OCR A, Eduqas) I = nAvq for charge carriers with number density n and drift velocity v.

### Explained

**Charge and current.** Current is the rate of flow of charge: I = ΔQ/Δt. 1 ampere = 1 coulomb per second. In metals the charge carriers are free (delocalised) electrons; in electrolytes and gases, ions. Charge is quantised: any charge is a whole-number multiple of e = 1.60 × 10⁻¹⁹ C.

*Conventional current* flows from + to − around the circuit; electrons actually flow from − to +.

**Potential difference.** V = W/Q. 1 volt = 1 joule per coulomb. It is the energy transferred from electrical to other forms per unit charge passing through a component. An electron accelerated through a p.d. V gains energy eV: eV = ½mv² (OCR A 4.2.2(e)).

**Resistance.** R = V/I, unit the ohm (Ω = V A⁻¹). OCR B also uses conductance G = I/V = 1/R, unit siemens (S).

**Drift velocity** (Edexcel 41, OCR A 4.1.2, Eduqas C2.1(f), (g)).

Consider a wire of cross-sectional area A with n free charge carriers per cubic metre, each of charge q, drifting at mean speed v. In time t, carriers move a distance vt, so the charge passing a point is the charge in a volume Avt: Q = nAvtq. So:

**I = nAvq**

Electrons in a metal move randomly at high speed (about 10⁵ m s⁻¹), colliding with the vibrating ions of the lattice. A p.d. adds a small drift along the wire, typically less than 1 mm s⁻¹. The signal (the electric field) travels at nearly the speed of light, which is why lamps light instantly.

**Metals, semiconductors and insulators** (OCR B 3.1.2(a)(viii), Edexcel 41). The number density n explains the huge range of resistivities:

| Material | n / m⁻³ | Behaviour |
| --- | --- | --- |
| Metal (copper) | about 10²⁹ | Good conductor; n fixed |
| Semiconductor (silicon) | about 10¹⁶ to 10²³ | n rises steeply with temperature or light |
| Insulator | almost 0 | Very high resistance |

For the same current, a semiconductor with fewer carriers must have a much higher drift velocity.

**Circuit symbols** (OCR A 4.2.1, OCR B 3.1.2(b)(ii)): cell, battery, switch, fixed and variable resistor, filament lamp, ammeter, voltmeter, diode, LED, thermistor, LDR, fuse, capacitor, potentiometer.

### Worked example

1. A charge of 45 C passes through a lamp in 2.0 minutes. Find the current and the number of electrons per second.

   I = 45/120 = 0.375 A. Electrons per second = 0.375/1.60 × 10⁻¹⁹ = 2.3 × 10¹⁸.

2. A copper wire (n = 8.5 × 10²⁸ m⁻³) of diameter 1.0 mm carries 2.0 A. Find the drift velocity.

   A = π(0.5 × 10⁻³)² = 7.85 × 10⁻⁷ m². v = I/(nAe) = 2.0/(8.5 × 10²⁸ × 7.85 × 10⁻⁷ × 1.60 × 10⁻¹⁹) = 1.9 × 10⁻⁴ m s⁻¹.

3. The same current flows through a thin section of the wire of half the diameter. What happens to the drift velocity?

   A is quartered, so v is four times larger.

### Common mistakes

- Saying current is "used up" in a component.
- Confusing p.d. (energy per charge) with current (charge per second).
- Saying electrons travel round the circuit at nearly the speed of light.

## 3.5.1.2 Current–voltage characteristics

*Refs: AQA 3.5.1.2 · Edexcel 33, 38 · OCR A 4.2.3(b), (c), (d) · OCR B 3.1.2(a)(vi), (b)(iii), (d)(i) · Eduqas C2.2(c), (d). Level: AS & A.*

### What you need to know

- I–V characteristics for an ohmic conductor, a semiconductor diode and a filament lamp (also thermistor: Edexcel 38; LDR: OCR A 4.2.3(d)).
- Ohm's law: I ∝ V under constant physical conditions (e.g. constant temperature). It is a special case.
- Ideal ammeters have zero resistance; ideal voltmeters have infinite resistance.
- Graphs may have I or V on the horizontal axis.

### Explained

**Ohmic conductor** (resistor at constant temperature): a straight line through the origin; R constant. Ohm's law: for a conductor at constant temperature, the current is directly proportional to the p.d.

**Filament lamp**: an S-shaped curve through the origin (symmetrical for reversed p.d.). As current rises, the filament heats up; its metal ions vibrate more; electrons collide more often; resistance increases. So the graph of I against V gets less steep at higher V. (R = V/I at a point, not the gradient.)

**Semiconductor diode**: in reverse bias, almost no current (very high resistance) until breakdown. In forward bias, almost no current until a threshold of about 0.6 V (silicon), then current rises steeply (resistance falls). An LED behaves similarly with a higher threshold (1.5 to 3 V depending on colour).

**Thermistor (NTC)** (Edexcel, OCR A): as current increases, it warms up, its resistance falls, and the I–V graph curves upwards (gets steeper).

**Resistance from a graph.** R = V/I at that point. Do not use the gradient of the curve; the gradient is only 1/R (or R, depending on axes) for a straight line through the origin.

**Measuring.** Use an ammeter in series and a voltmeter in parallel with the component, and a variable power supply or a potential divider so the p.d. can be varied from zero. Reverse the supply to get negative values. Use a protective resistor in series with a diode.

### Worked example

1. At 6.0 V a lamp carries 0.50 A; at 12 V it carries 0.75 A. Find its resistance at each p.d. and explain the difference.

   6.0/0.50 = 12 Ω; 12/0.75 = 16 Ω. At higher current the filament is hotter, ions vibrate more, so electrons collide more often, so resistance is higher.

### Common mistakes

- Finding resistance from the gradient of a curved I–V graph.
- Saying a filament lamp obeys Ohm's law.
- Saying a diode conducts equally in both directions once past 0.6 V.

## 3.5.1.3 Resistivity

*Refs: AQA 3.5.1.3, RP5 · Edexcel 39, 40, 41, 47, 48, CP2 · OCR A 4.2.3(d), 4.2.4(a), (b), (c) · OCR B 3.1.2(b)(i), (b)(iii), (c)(iii), (d)(ii), (d)(iv) · Eduqas C2.2(g) to (n). Level: AS & A.*

### What you need to know

- Resistivity ρ = RA/L, so R = ρL/A.
- The qualitative effect of temperature on the resistance of metals and NTC thermistors; thermistors as temperature sensors; resistance–temperature graphs.
- (Edexcel 47, 48, OCR A, Eduqas) Explaining changes of resistance with temperature and with light (LDR) in terms of lattice vibrations and the number of charge carriers.
- Superconductivity: zero resistivity at and below a critical temperature; uses in strong magnets and loss-free power transmission. (AQA, Eduqas)
- AQA required practical 5: resistivity of a wire with a micrometer, ammeter and voltmeter.
- (OCR B) Conductivity σ = 1/ρ, G = σA/L.

### Explained

**Resistivity.** R = ρL/A. Resistance is proportional to length (a longer path, more collisions) and inversely proportional to cross-sectional area (more paths side by side). Resistivity ρ (Ω m) is a property of the material at a given temperature. Copper: 1.7 × 10⁻⁸ Ω m. Nichrome: 1.1 × 10⁻⁶ Ω m. Silicon: about 10³ Ω m. Glass: about 10¹² Ω m.

**Metals and temperature.** As temperature rises, the positive ions vibrate with larger amplitude. Free electrons collide with them more often, which reduces drift velocity for a given p.d. n stays the same. So resistance rises (a positive temperature coefficient).

**NTC thermistors.** Made of a semiconductor. As temperature rises, more electrons gain enough energy to become free charge carriers: n rises greatly. This outweighs the increase in lattice vibration, so resistance falls sharply (and non-linearly). Resistance–temperature graph: steep curve falling towards a low value. Uses: temperature sensors (in a potential divider), thermostats, fire alarms, car engine sensors.

**LDRs** (light-dependent resistors). Light photons give electrons in the semiconductor enough energy to become free: n rises, so resistance falls as light intensity rises. Uses: light sensors, automatic street lights.

**Superconductivity** (AQA, Eduqas). Some materials have exactly zero resistivity when cooled to or below their critical temperature Tc (also called transition temperature). Above Tc, the resistivity is normal. Mercury: Tc = 4.2 K. Some ceramic copper oxide compounds (high-temperature superconductors) have Tc above 77 K, so liquid nitrogen (cheaper than liquid helium) can cool them. With no resistance, a current flows with no energy dissipated (no heating).

Uses:

- Producing very strong magnetic fields (MRI scanners, particle accelerators, maglev trains), since large currents can flow without heating the coils.
- Power cables that transmit electricity without energy loss (currently limited by cooling cost).
- Fast electronic circuits.

(Eduqas C2.2(j)) In a normal metal, collisions of free electrons with the lattice convert energy to heat; in a superconductor, the electrons pass through the lattice without these energy-losing collisions.

### Worked example

1. A nichrome wire has diameter 0.32 mm and length 1.50 m. Find its resistance (ρ = 1.10 × 10⁻⁶ Ω m).

   A = π(0.16 × 10⁻³)² = 8.04 × 10⁻⁸ m². R = 1.10 × 10⁻⁶ × 1.50/8.04 × 10⁻⁸ = 20.5 Ω.

2. A wire is stretched to twice its length (same volume). By what factor does its resistance change?

   L doubles; A halves (volume = LA fixed). R = ρL/A rises by 2 × 2 = 4.

3. (OCR B) Find the conductance of a 4.0 m copper wire with A = 1.5 × 10⁻⁶ m² (σ = 5.9 × 10⁷ S m⁻¹).

   G = σA/L = 5.9 × 10⁷ × 1.5 × 10⁻⁶ / 4.0 = 22 S (R = 0.045 Ω).

### Common mistakes

- Using diameter for radius when calculating A.
- Saying resistivity depends on the length of the wire.
- Saying metals have more resistance when hot "because electrons move faster"; it is the lattice vibrations.
- Saying a superconductor has a very small resistance; it is exactly zero.
- Saying thermistor resistance falls because ions vibrate less.

### Practical

**AQA required practical 5** (also Edexcel CP2, OCR A PAG3, OCR B 3.1.2(d)(ii), Eduqas specified practical): determine the resistivity of a wire.

1. Measure the diameter of the wire with a micrometer at several places along its length and in different orientations; take the mean. Check for zero error. A = πd²/4.
2. Tape the wire along a metre rule. Connect it in series with an ammeter, a switch and a low-voltage supply; connect a voltmeter across a length L of the wire using a crocodile clip (flying lead) as one contact.
3. For a range of lengths (e.g. 0.10 m to 0.90 m), record V and I and calculate R = V/I.
4. Plot R against L: a straight line through (or near) the origin. Gradient = ρ/A, so ρ = gradient × A.

Tips: keep the current low and switch off between readings so the wire does not heat (heating would raise R). Any contact resistance appears as an intercept, not in the gradient. The diameter has the largest percentage uncertainty (it is squared). Safety: the wire can get hot; use low current.

**I–V characteristics** (OCR A PAG3, OCR B 3.1.2(d)(i), Eduqas). Use a potential divider supply to vary p.d. from zero; record I and V; reverse connections for negative values; plot I against V.

**Resistance against temperature** (Eduqas specified practical; OCR B 3.1.2(d)(iv) calibrating a sensor). Place the thermistor (or a coil of wire) in a beaker of water with a thermometer. Heat in steps, stirring, and wait for the reading to settle before measuring R with an ohmmeter (or V and I). Plot R against θ. For calibration, this graph lets the thermistor be used as a thermometer.

## Check questions

1. Define the volt. (1 mark)
2. A phone charger delivers 1.5 A for 2.0 hours. Calculate the charge delivered. (2 marks)
3. Derive I = nAve. (3 marks)
4. Explain why the drift velocity of charge carriers in a semiconductor is much greater than in a metal wire of the same size carrying the same current. (2 marks)
5. Sketch the I–V characteristic of a filament lamp and explain its shape. (4 marks)
6. Explain why the resistance of an NTC thermistor falls as temperature rises. (3 marks)
7. Describe how to determine the resistivity of a metal wire. (6 marks)
8. State what is meant by superconductivity and give one use. (3 marks)

## Mark scheme

1. One joule per coulomb / p.d. when 1 J of energy is transferred per coulomb of charge (1).
2. Q = It = 1.5 × 7200 (1) = 1.08 × 10⁴ C (1).
3. In time t carriers move distance vt; volume passing a point = Avt (1); number of carriers = nAvt; charge = nAvte (1); I = Q/t = nAve (1).
4. Semiconductor has far fewer charge carriers per unit volume / smaller n (1); I = nAve so v must be larger for the same I and A (1).
5. S-shaped curve through origin, gradient decreasing at higher p.d. (both quadrants) (1); current heats the filament (1); ions vibrate more, electrons collide more often (1); resistance increases, so current rises less for each step in p.d. (1).
6. Temperature rise gives electrons enough energy to become free / more charge carriers are released (1); number of charge carriers increases greatly (1); this outweighs increased lattice vibrations so resistance falls (1).
7. Measure diameter with micrometer at several points, average (1); calculate A = πd²/4 (1); circuit with ammeter in series, voltmeter across a measured length of wire (1); vary length with flying lead, measure with metre rule (1); calculate R = V/I for each length (1); plot R against L, ρ = gradient × A; low current to avoid heating (1).
8. Resistivity becomes zero (1); at and below a critical temperature (1); any use: strong magnetic fields in MRI / particle accelerators / loss-free power transmission (1).
