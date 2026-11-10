---
level: A-level
subject: Physics
topic: "Electric fields: Coulomb's law, field strength, potential, and comparison with gravity"
as_content: "A-level only for every board."
boards:
  - board: AQA
    code: "7408"
    spec_refs: ["3.7.3.1", "3.7.3.2", "3.7.3.3"]
  - board: Edexcel
    code: "9PH0"
    spec_refs: ["108", "109", "110", "111", "112", "113", "114", "115", "179"]
  - board: OCR A
    code: "H556"
    spec_refs: ["6.2.1(a)", "6.2.1(b)", "6.2.1(c)", "6.2.1(d)", "6.2.2(a)", "6.2.2(b)", "6.2.2(c)", "6.2.2(d)", "6.2.3(a)", "6.2.3(c)", "6.2.4(a)", "6.2.4(b)", "6.2.4(d)", "6.2.4(e)"]
  - board: OCR B
    code: "H557"
    spec_refs: ["6.1.2(a)(i)", "6.1.2(a)(ii)", "6.1.2(a)(iii)", "6.1.2(a)(iv)", "6.1.2(a)(vi)", "6.1.2(b)(i)", "6.1.2(b)(ii)", "6.1.2(b)(iii)", "6.1.2(b)(iv)", "6.1.2(c)(i)", "6.1.2(c)(ii)", "6.1.2(c)(iii)"]
  - board: Eduqas
    code: "A420QS"
    spec_refs: ["C2.6(a)", "C2.6(c)", "C2.6(d)", "C2.6(e)"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/physics-2015.html
  OCR A: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-a-h156-h556-from-2015/
  OCR B: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-b-advancing-physics-h157-h557-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/physics-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/a-level-aqa/
---

# Electric fields: Coulomb's law, field strength, potential, and comparison with gravity

Charges exert forces on each other through electric fields. This file covers Coulomb's law, electric field strength in radial and uniform fields, the path of a charged particle fired into a uniform field, electric potential and potential energy, equipotentials, graphs of E and V against distance, and a side-by-side comparison of electric and gravitational fields.

## Overview

A-level only for every board. Capacitors, including the parallel-plate capacitor and permittivity, are in file 16. Magnetic forces on moving charges are in file 17. Millikan's oil-drop experiment in full (AQA option 3.12.1.4) is in file 26.

### Board differences

- AQA 3.7.3 · Edexcel 108 to 115, 179 · OCR A 6.2 (except capacitance points, which are in file 16) · OCR B 6.1.2 · Eduqas C2.6.
- OCR B writes Coulomb's law with k = 1/(4πε₀): F = kqQ/r². Same law.
- OCR B 6.1.2(a)(iv) asks for evidence that charge is discrete (Millikan).
- Field-mapping practical with conducting paper or an electrolytic tank: suggested by AQA.
- OCR A 6.2.3(c) and AQA: motion of a charged particle in a uniform electric field.

## 3.7.3.1 Coulomb's law

*Refs: AQA 3.7.3.1 · Edexcel 110 · OCR A 6.2.1(b), 6.2.2(a) · OCR B 6.1.2(a)(ii), (c)(i). Level: A-level only.*

### What you need to know

- Force between point charges in a vacuum: F = Q₁Q₂/(4πε₀r²), where ε₀ is the permittivity of free space (8.85 × 10⁻¹² F m⁻¹).
- Air can be treated as a vacuum.
- A charged sphere behaves as if its charge were at its centre.
- Compare the sizes of the gravitational and electrostatic forces between subatomic particles.

### Explained

The force between two point charges is proportional to the product of the charges and inversely proportional to the square of their separation. Like charges repel (F positive), unlike attract (F negative). 1/(4πε₀) = 8.99 × 10⁹ N m² C⁻² (often written k).

**Comparing forces.** For two protons any distance apart, the ratio of electrostatic to gravitational force is (e²/4πε₀)/(Gm_p²) = (8.99 × 10⁹ × 2.56 × 10⁻³⁸)/(6.67 × 10⁻¹¹ × 2.80 × 10⁻⁵⁴) ≈ 1.2 × 10³⁶. Gravity is negligible between particles; it only dominates on large scales because large objects are nearly electrically neutral.

### Worked example

1. Find the force between the electron and proton in hydrogen, 5.3 × 10⁻¹¹ m apart.

   F = 8.99 × 10⁹ × (1.60 × 10⁻¹⁹)²/(5.3 × 10⁻¹¹)² = 8.2 × 10⁻⁸ N (attractive).

2. Two small spheres carry +40 nC and −25 nC, 0.10 m apart. Find the force.

   F = 8.99 × 10⁹ × 40 × 10⁻⁹ × 25 × 10⁻⁹ / 0.010 = 9.0 × 10⁻⁴ N attractive.

### Common mistakes

- Forgetting to square r.
- Using nC as C.

## 3.7.3.2 Electric field strength

*Refs: AQA 3.7.3.2 · Edexcel 108, 109, 111, 113, 115 · OCR A 6.2.1(a) to (d), 6.2.2(b), 6.2.3(a), (c) · OCR B 6.1.2(a)(i), (ii), (b)(iv), (c)(i), (ii) · Eduqas C2.6(a), (c), (e). Level: A-level only.*

### What you need to know

- Electric field lines.
- E = F/Q: force per unit (positive) charge.
- Uniform field: E = V/d, derived from the work done moving charge between plates: Fd = QΔV.
- The path of a charged particle entering a uniform field at right angles.
- Radial field: E = Q/(4πε₀r²).

### Explained

**Definition.** Electric field strength at a point is the force per unit charge on a small positive test charge placed there: E = F/Q. Units N C⁻¹ or V m⁻¹ (the same). It is a vector, pointing in the direction a positive charge would be pushed.

**Field lines.** Start on positive charges, end on negative charges, never cross; closer lines mean a stronger field. Radial field round a point charge: lines point straight out (positive) or in (negative). Two opposite charges: lines curve from + to −. Two like charges: a neutral point midway with no field.

**Uniform field.** Between two parallel plates with p.d. V and separation d, the field is uniform (except near the edges): parallel, equally spaced lines from + to −.

Derivation: moving charge Q from one plate to the other needs work W = QV. The force is constant, so W = Fd. So Fd = QV and E = F/Q = V/d.

**Radial field.** Dividing Coulomb's law by the test charge: E = Q/(4πε₀r²).

**Combining fields.** E is a vector: add contributions from each charge as vectors (Eduqas C2.6(e)).

**Charged particle in a uniform field.** A particle of charge q and mass m enters midway between plates at speed u, at right angles to the field. This is just like a projectile:

- Along the plates: no force, constant velocity u. Time between plates t = L/u (L = plate length).
- Across the plates: constant force F = qE = qV/d, so constant acceleration a = qE/m.
- Deflection y = ½at² = ½(qE/m)(L/u)².
- The path is a parabola. After leaving the plates it travels in a straight line.

Electrons are deflected towards the positive plate; positive ions towards the negative. Gravity is negligible for electrons and ions.

**Accelerating a particle** (OCR A 4.2.2(e), Edexcel 132). A charge accelerated from rest through p.d. V gains kinetic energy qV = ½mv².

### Worked example

1. Find E between plates 4.0 mm apart with a p.d. of 600 V, and the force on an electron there.

   E = 600/0.0040 = 1.5 × 10⁵ V m⁻¹. F = eE = 2.4 × 10⁻¹⁴ N.

2. The p.d. is reduced to 60 V. An electron enters midway between the plates at 3.0 × 10⁷ m s⁻¹, parallel to them. The plates are 2.0 cm long. Find its deflection as it leaves.

   E = 60/0.0040 = 1.5 × 10⁴ V m⁻¹. a = eE/m = 1.60 × 10⁻¹⁹ × 1.5 × 10⁴/9.11 × 10⁻³¹ = 2.63 × 10¹⁵ m s⁻². t = 0.020/3.0 × 10⁷ = 6.67 × 10⁻¹⁰ s. y = ½ × 2.63 × 10¹⁵ × (6.67 × 10⁻¹⁰)² = 5.9 × 10⁻⁴ m (0.59 mm towards the positive plate). This is less than the 2.0 mm half-gap, so the electron leaves the plates. (At 600 V it would hit the positive plate.)

3. Find the field strength 2.0 cm from a +5.0 nC point charge.

   E = 8.99 × 10⁹ × 5.0 × 10⁻⁹ / (0.020)² = 1.1 × 10⁵ N C⁻¹, pointing away from the charge.

### Common mistakes

- Using E = V/d for a radial field.
- Saying the horizontal velocity of the particle changes inside the plates.
- Getting the direction of force on an electron wrong (it is opposite to E).

### Practical

**Mapping fields** (suggested by AQA). Place electrodes on conducting (Teledeltos) paper connected to a low-voltage supply. Use a voltmeter probe to find points at the same potential and mark them; these join into equipotential lines. Field lines are drawn at right angles to them. Parallel bar electrodes give straight, equally spaced equipotentials (uniform field); a point and a ring give circles (radial field).

## 3.7.3.3 Electric potential

*Refs: AQA 3.7.3.3 · Edexcel 112, 114, 115, 179 · OCR A 6.2.2(c), (d), 6.2.4(a), (b), (d), (e) · OCR B 6.1.2(a)(iii), (vi), (b)(i) to (iv), (c)(ii), (iii) · Eduqas C2.6(a), (d), (e). Level: A-level only.*

### What you need to know

- Absolute electric potential: the work done per unit positive charge in bringing a small charge from infinity to the point; zero at infinity. Electric potential difference.
- ΔW = QΔV.
- Equipotential surfaces; no work is done moving a charge along one.
- V = Q/(4πε₀r) in a radial field.
- Graphs of E and V against r; E = −ΔV/Δr; ΔV = area under the E–r graph.
- (OCR A, OCR B) Electric potential energy = Qq/(4πε₀r); force–distance and energy–distance graphs.
- Similarities and differences between electric and gravitational fields.

### Explained

**Potential.** V at a point = work done per unit positive charge bringing a small test charge from infinity to that point. Unit J C⁻¹ = V.

V = Q/(4πε₀r)

- Around a positive charge, V is positive (work must be done against repulsion to bring a positive test charge in) and falls with distance.
- Around a negative charge, V is negative.
- Potential is a scalar: add the potentials from several charges algebraically (with signs).

**Potential energy** (OCR A 6.2.4(e), OCR B). E_p = qV = Qq/(4πε₀r). Positive for like charges (they have to be pushed together), negative for unlike charges.

**Work.** Moving charge Q through p.d. ΔV: ΔW = QΔV.

**Equipotentials.** Surfaces of constant V; perpendicular to field lines. Spheres round a point charge; planes parallel to the plates in a uniform field. No work is done moving along one.

**Field and potential gradient.** E = −ΔV/Δr. The field points from high to low potential, and its strength is the steepness of the potential–distance graph. In a uniform field this gives E = V/d. The area under an E–r graph between two radii gives the potential difference between them.

**Graphs** (positive point charge): E against r falls as 1/r²; V against r falls as 1/r (both positive). For a negative charge V is negative and rises towards zero.

**Comparison of fields** (AQA 3.7.1, Edexcel 179, OCR A 6.2.2(c), OCR B 6.1.2(a)(vi), Eduqas C2.6(a)).

| | Gravitational | Electric |
| --- | --- | --- |
| Acts on | Mass | Charge |
| Force law | F = Gm₁m₂/r² | F = Q₁Q₂/(4πε₀r²) |
| Nature | Always attractive | Attractive or repulsive |
| Field strength | g = F/m = GM/r² | E = F/Q = Q/(4πε₀r²) |
| Potential | V = −GM/r (always negative) | V = Q/(4πε₀r) (sign of Q) |
| Field and potential | g = −ΔV/Δr | E = −ΔV/Δr |
| Uniform field | Near a planet's surface | Between parallel plates |
| Strength | Very weak | Very strong (about 10³⁶ times between protons) |
| Shielding | Cannot be shielded | Can be shielded by conductors |

Both are inverse-square laws, both use field lines and equipotentials, and potential is zero at infinity in both.

**Discreteness of charge** (OCR B 6.1.2(a)(iv)). In Millikan's experiment, tiny charged oil drops between horizontal plates were held still by adjusting the p.d.: qV/d = mg. The charges found were always whole-number multiples of 1.6 × 10⁻¹⁹ C, showing charge comes in units of e (details in file 26).

### Worked example

1. Find the potential 0.050 m from a +2.0 μC charge, and the work needed to bring a +3.0 nC charge from infinity to that point.

   V = 8.99 × 10⁹ × 2.0 × 10⁻⁶/0.050 = 3.6 × 10⁵ V. W = QV = 3.0 × 10⁻⁹ × 3.6 × 10⁵ = 1.1 × 10⁻³ J.

2. An alpha particle (charge +2e) is fired at a gold nucleus (+79e). Find its closest approach if its initial kinetic energy is 5.0 MeV.

   At closest approach, all kinetic energy becomes potential energy: 5.0 × 1.60 × 10⁻¹³ = 8.99 × 10⁹ × 2 × 79 × (1.60 × 10⁻¹⁹)²/r. r = 3.64 × 10⁻²⁶/8.0 × 10⁻¹³ = 4.5 × 10⁻¹⁴ m. (This puts an upper limit on the size of the nucleus; see file 18.)

3. Two charges, +4.0 nC at x = 0 and −4.0 nC at x = 0.20 m. Find the potential and the field at x = 0.10 m.

   V = k(4 − 4) × 10⁻⁹/0.10 = 0. E: each contributes 8.99 × 10⁹ × 4.0 × 10⁻⁹/0.01 = 3600 N C⁻¹, both pointing towards the negative charge, so E = 7200 N C⁻¹ in the +x direction. (Zero potential does not mean zero field.)

### Common mistakes

- Adding potentials as vectors, or field strengths as scalars.
- Saying zero potential means zero field.
- Forgetting that V can be negative near a negative charge.
- Mixing up potential (J C⁻¹) and potential energy (J).

## Check questions

1. Define electric field strength. (1 mark)
2. Calculate the ratio of electrostatic to gravitational force between an electron and a proton. (3 marks)
3. Derive E = V/d for a uniform field. (2 marks)
4. An electron is accelerated through 2000 V and then enters the gap between two plates 2.0 cm apart, parallel to them. The plates are 8.0 cm long with a p.d. of 150 V. Calculate the vertical deflection as it leaves. (5 marks)
5. Define electric potential at a point. (2 marks)
6. Sketch the equipotentials and field lines around an isolated negative point charge. (2 marks)
7. A proton is held 1.0 × 10⁻¹⁴ m from another proton and released. Calculate its maximum speed. (3 marks)
8. Give two similarities and two differences between gravitational and electric fields. (4 marks)

## Mark scheme

1. Force per unit charge on a small positive test charge at that point (1).
2. F_e = ke²/r², F_g = Gm_em_p/r² (1); ratio = ke²/(Gm_em_p) (1) = 8.99 × 10⁹ × 2.56 × 10⁻³⁸/(6.67 × 10⁻¹¹ × 9.11 × 10⁻³¹ × 1.67 × 10⁻²⁷) = 2.3 × 10³⁹ (1).
3. Work to move Q between plates = QV = Fd (1); E = F/Q = V/d (1).
4. ½mu² = eV gives u = √(2 × 1.60 × 10⁻¹⁹ × 2000/9.11 × 10⁻³¹) = 2.65 × 10⁷ m s⁻¹ (1); E = 150/0.020 = 7500 V m⁻¹; a = eE/m = 1.32 × 10¹⁵ m s⁻² (1); t = 0.080/2.65 × 10⁷ = 3.02 × 10⁻⁹ s (1); y = ½at² (1) = 6.0 × 10⁻³ m (6.0 mm, less than the 10 mm half-gap, so it leaves) (1).
5. Work done per unit positive charge (1); to bring a small test charge from infinity to the point (1).
6. Concentric circles for equipotentials, closer together near the charge (1); radial field lines pointing inwards, perpendicular to equipotentials (1).
7. E_p = ke²/r = 2.30 × 10⁻¹⁴ J (1); shared equally: each proton gets 1.15 × 10⁻¹⁴ J (1); v = √(2 × 1.15 × 10⁻¹⁴/1.67 × 10⁻²⁷) = 3.7 × 10⁶ m s⁻¹ (1). (Accept 5.2 × 10⁶ m s⁻¹ if other proton held fixed.)
8. Similarities (any two): inverse square laws; field lines/equipotentials; potential zero at infinity; E or g = −gradient of potential. Differences (any two): gravity only attracts but electric can repel; acts on mass vs charge; gravitational potential always negative; electric force much stronger / can be shielded.
