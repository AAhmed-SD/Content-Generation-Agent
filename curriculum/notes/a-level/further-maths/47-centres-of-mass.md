---
level: A-level
subject: Further Mathematics
topic: "Centres of mass"
as_content: "Centres of mass of particles and composite bodies are AS on MEI (section (a)); calculus methods are A-level only. OCR 6.04 is Stage 2 (A-level only). AQA and Edexcel (FM2) are option content."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["ME1", "ME2", "ME3", "ME4", "ME5"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FM2 2.2", "FM2 3.1"]
  - board: OCR
    code: "H245"
    spec_refs: ["6.04a", "6.04b", "6.04c", "6.04d", "6.04e"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["MG1", "MG2", "MG3", "MG4", "MG5", "MG6", "MG7", "MG8", "MG9", "MG10"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-mechanics/
---

# Centres of mass

This file covers the centre of mass of systems of particles in one and two dimensions, using symmetry and standard results, composite bodies and laminas (including removing parts), centres of mass by integration for laminas and solids of revolution, and bodies suspended freely or resting on a plane.

## Overview

Moments are in A-level Maths ([../maths/29-moments.md](../maths/29-moments.md)). Integration for volumes is in [12-further-calculus-volumes-improper-integrals-and-mean-value.md](12-further-calculus-volumes-improper-integrals-and-mean-value.md). Equilibrium, toppling and sliding are in [48-rigid-bodies-forces-and-equilibrium.md](48-rigid-bodies-forces-and-equilibrium.md).

### Board differences

- AQA ME1 to ME5; Edexcel FM2 2.2, 3.1; OCR 6.04a to 6.04d; MEI MG1 to MG10.
- Standard results (rods, triangles, arcs, sectors, hemispheres, cones) are in each board's formula book; use them unless asked to derive.

## ME1 Systems of particles

*Refs: AQA ME1 · Edexcel FM2 2.2 · OCR 6.04a, 6.04b · MEI MG1. Level: AS & A (MEI).*

### What you need to know

```latex
\bar x = \frac{\sum m_ix_i}{\sum m_i},\qquad \bar y = \frac{\sum m_iy_i}{\sum m_i}
```

- In vector form, r̄ = Σmᵢrᵢ/Σmᵢ.

### Worked example

Particles of mass 3, 2 and 5 kg are at (2, 1), (−1, 4) and (5, −2). Find the centre of mass.

1. x̄ = (6 − 2 + 25)/10 = 2.9. ȳ = (3 + 8 − 10)/10 = 0.1.

### Common mistakes

- Dividing by the number of particles instead of the total mass.

## ME2 Composite bodies

*Refs: AQA ME2 · Edexcel FM2 2.2, 3.1 · OCR 6.04c · MEI MG2, MG3, MG4. Level: AS & A (MEI).*

### What you need to know

- Use symmetry where possible.
- For a uniform lamina, mass is proportional to area. Treat each part as a particle at its own centre of mass.
- To remove a part, give it negative mass (area).
- Standard results: uniform triangle at the mean of the vertices; semicircular lamina 4r/(3π) from the diameter; solid hemisphere 3r/8; solid cone h/4 from the base.

### Worked example

A uniform L-shaped lamina is made from a 6 × 2 rectangle (from (0, 0) to (6, 2)) and a 2 × 4 rectangle on top of its left end (from (0, 2) to (2, 6)). Find its centre of mass.

1. Parts: area 12 at (3, 1); area 8 at (1, 4).
2. x̄ = (36 + 8)/20 = 2.2. ȳ = (12 + 32)/20 = 2.2.

A circle of radius 1 centred at (4, 3) is cut from a uniform rectangular plate from (0, 0) to (8, 6). Find the centre of mass.

1. Plate area 48 at (4, 3); hole area π at (4, 3). The hole is at the centre, so the centre of mass stays at (4, 3).
2. If instead the hole is centred at (6, 3): x̄ = (48 × 4 − π × 6)/(48 − π) = 3.860.

### Common mistakes

- Adding the removed part instead of subtracting it.

## ME3 Centres of mass by integration

*Refs: AQA ME3, ME4 · Edexcel FM2 2.2, 3.1 · OCR 6.04d · MEI MG6, MG7, MG8, MG9. Level: A-level only.*

### What you need to know

For a uniform lamina under y = f(x) from x = a to b:

```latex
\bar x = \frac{\int_a^b xy\,dx}{\int_a^b y\,dx},\qquad \bar y = \frac{\int_a^b \tfrac12y^2\,dx}{\int_a^b y\,dx}
```

For a uniform solid of revolution about the x-axis:

```latex
\bar x = \frac{\int_a^b \pi xy^2\,dx}{\int_a^b \pi y^2\,dx}
```

### Explained

Each vertical strip of width δx has area yδx and its own centre at (x, y/2). Summing moments gives the formulae. For solids, each disc has volume πy²δx at distance x.

### Worked example

Find the centre of mass of the uniform lamina under y = x² from x = 0 to 2.

1. Area ∫₀² x² dx = 8/3.
2. x̄ = ∫₀² x³ dx ÷ 8/3 = 4 × 3/8 = 1.5.
3. ȳ = ½∫₀² x⁴ dx ÷ 8/3 = (16/5)(3/8) = 1.2.

The region under y = √x from x = 0 to 4 is rotated about the x-axis. Find the centre of mass of the solid.

1. Volume π∫₀⁴ x dx = 8π.
2. x̄ = π∫₀⁴ x² dx/8π = (64/3)/8 = 8/3.

Prove that a uniform solid hemisphere of radius r has its centre of mass 3r/8 from the plane face.

1. Rotate y² = r² − x², 0 ≤ x ≤ r. Volume π∫(r² − x²) dx = 2πr³/3.
2. π∫x(r² − x²) dx = π(r⁴/2 − r⁴/4) = πr⁴/4.
3. x̄ = (πr⁴/4)/(2πr³/3) = 3r/8.

### Common mistakes

- Using y instead of y/2 for the lamina's ȳ.

## ME5 Suspension and resting on a plane

*Refs: AQA ME5 · OCR 6.04e · MEI MG5, MG10. Level: AS & A (MEI).*

### What you need to know

- A body suspended freely from a point hangs with its centre of mass vertically below that point.
- A body on an inclined plane is on the point of toppling when the centre of mass is vertically above the lowest edge of contact.

### Worked example

The L-shaped lamina above is suspended from the origin. Find the angle between the side along the x-axis and the vertical.

1. The line from (0, 0) to G(2.2, 2.2) is vertical.
2. It makes 45° with the x-axis, so the x-axis side is at 45° to the vertical.

A uniform cuboid 0.4 m wide and 1.2 m tall stands on a rough slope (friction prevents sliding). Find the angle at which it topples.

1. Topples when tan α = (half-width)/(height of G) = 0.2/0.6, α = 18.4°.

## Check questions

1. Masses of 1, 2, 3 and 4 kg are at the corners (0, 0), (4, 0), (4, 3), (0, 3) of a light rectangle. Find the centre of mass. [3 marks]
2. A uniform lamina is a square of side 6 with a square of side 2 removed from one corner. Find the distance of the centre of mass from each of the two full sides that meet at the corner opposite the removed square. [5 marks]
3. Find the centre of mass of the uniform lamina bounded by y = 4 − x², the x-axis and the y-axis (x ≥ 0). [6 marks]
4. Find the centre of mass of the uniform solid formed by rotating y = x, 0 ≤ x ≤ 3, about the x-axis (a cone). [4 marks]
5. State the distance of the centre of mass of a uniform solid hemisphere of radius 0.3 m from the centre of its plane face. [2 marks]

## Mark scheme

1. Total 10 (1). x̄ = (8 + 12)/10 = 2 (1). ȳ = (9 + 12)/10 = 2.1 (1).
2. Take the full square with corner at origin (area 36, centre (3, 3)) and remove the 2 × 2 square at the far corner (area 4, centre (5, 5)) (2). x̄ = (108 − 20)/32 = 2.75 (2). By symmetry ȳ = 2.75: distance 2.75 from each side through the origin (1).
3. Area ∫₀² (4 − x²) dx = 16/3 (1). ∫x(4 − x²) dx = 4 (1), x̄ = 3/4 (1). ½∫(4 − x²)² dx = ½(32 − 64/3 + 32/5) = 128/15 (2), ȳ = 1.6 (1).
4. Volume π∫x² dx = 9π (1). π∫x³ dx = 81π/4 (1). x̄ = 9/4 (from the vertex), so 3/4 from the base, which is h/4 (2).
5. 3r/8 = 0.1125 m (2).
