---
level: A-level
subject: Mathematics
topic: "Mechanics: quantities, units and modelling"
as_content: "SI units, derived quantities and modelling assumptions are AS. The unit of moment (N m) is A-level only."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["OT3.1", "OT3.5", "P1"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["M6.1"]
  - board: OCR
    code: "H240"
    spec_refs: ["3.01a", "3.01b", "3.01c"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["Mp31", "Mp32", "Mp33", "Mp34", "Mp35"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Mechanics: quantities, units and modelling

This file covers the SI units used in mechanics, derived quantities and their units, converting units, and the standard modelling words (particle, light, smooth, and so on) with what each assumption means.

## Overview

All AS, except the unit of a moment, which is needed only for moments (file 29, A-level only). The modelling vocabulary here is used in every mechanics question, and the overarching themes OT3.1 and OT3.5 (forming a model, and using modelling assumptions) are met here as well as in file 01.

### Board differences

- AQA P1; Edexcel Mechanics 6.1; OCR H240 3.01a to 3.01c; OCR MEI H640 Mp31 to Mp35.
- MEI lists the language of modelling assumptions (Mp31) and the particle model (Mp32) as separate outcomes.
- Edexcel states that its default value of g is 9.8 m s⁻², and that a question may ask for a different value. AQA asks you to know g to varying degrees of accuracy and that it depends on location.

## P1 Quantities and units

*Refs: AQA P1, OT3.1, OT3.5 · Edexcel Mechanics 6.1 · OCR 3.01a, 3.01b, 3.01c · MEI Mp31, Mp32, Mp33, Mp34, Mp35. Level: AS & A (part A-level only).*

### What you need to know

- Fundamental (base) SI quantities and units: length (metre, m), time (second, s), mass (kilogram, kg).
- Derived quantities and units:

| Quantity | Unit | In base units |
| --- | --- | --- |
| velocity, speed | m s⁻¹ | m s⁻¹ |
| acceleration | m s⁻² | m s⁻² |
| force, weight | newton (N) | kg m s⁻² |
| (A-level only) moment | newton metre (N m) | kg m² s⁻² |

- Convert between units, such as km h⁻¹ and m s⁻¹.
- Understand and use modelling assumptions and the particle model.

### Explained

**Converting.** Multiply by conversion factors written as fractions equal to 1:

```latex
72\ \text{km h}^{-1} = 72 \times \frac{1000\ \text{m}}{3600\ \text{s}} = 20\ \text{m s}^{-1}
```

To go from km h⁻¹ to m s⁻¹, divide by 3.6.

**Checking units.** Both sides of a formula must have the same units. F = ma gives kg × m s⁻² = N, which is why 1 N = 1 kg m s⁻². A wrong unit is a sign of a wrong formula.

**Modelling words.**

| Word | Meaning | Effect on the model |
| --- | --- | --- |
| particle | object with mass but no size | ignore rotation and air resistance; all forces act at one point |
| rigid body / rod | object with size that does not bend | needed for moments (file 29) |
| uniform | mass spread evenly | weight acts at the centre |
| light | mass is negligible | ignore its weight; tension is the same all along a light string |
| inextensible | does not stretch | connected objects have the same speed and acceleration |
| smooth | no friction | contact force is the normal reaction only |
| rough | friction acts | include friction (file 28) |
| lamina | flat object with negligible thickness | |
| bead | particle threaded on a wire or string | |
| peg | support with negligible size; may be smooth or rough | |

Every assumption makes the maths simpler and the answer less exact. For example, treating a car as a particle ignores air resistance, which would really reduce its acceleration.

**g.** The acceleration due to gravity near the Earth's surface is about 9.8 m s⁻². It is not a universal constant: it varies slightly with location, and is quite different on the Moon. Give answers to 2 or 3 significant figures when g = 9.8 is used, since 9.8 is only given to 2 significant figures.

### Worked example

Convert 54 km h⁻¹ to m s⁻¹, and 0.35 m s⁻¹ to km h⁻¹.

1. 54 ÷ 3.6 = 15 m s⁻¹.
2. 0.35 × 3.6 = 1.26 km h⁻¹.

A car accelerates at 1800 km h⁻². Convert this to m s⁻².

1. 1800 × 1000 m / (3600 s)² = 1 800 000/12 960 000 = 0.139 m s⁻² (3 s.f.).

Show that the units of ½mv² are the same as the units of force × distance.

1. ½mv²: kg × (m s⁻¹)² = kg m² s⁻².
2. Force × distance: N × m = kg m s⁻² × m = kg m² s⁻².
3. They match.

A parcel is pulled across a floor by a string. State the modelling assumptions in "the parcel is modelled as a particle and the string as light and inextensible", and what each lets you do.

1. Particle: the parcel's size and shape are ignored, so all forces act at one point and it does not rotate.
2. Light string: its mass is ignored, so the tension is the same throughout.
3. Inextensible: the string does not stretch, so the parcel moves as soon as the string is pulled and with the same acceleration as the end of the string.

### Common mistakes

- Multiplying by 3.6 when converting km h⁻¹ to m s⁻¹.
- Giving answers to more significant figures than g = 9.8 justifies.
- Listing an assumption without saying how it simplifies the problem or affects the answer.

## Check questions

1. Convert 90 km h⁻¹ to m s⁻¹. [1 mark]
2. Convert 12 m s⁻¹ to km h⁻¹. [1 mark]
3. Write the newton in terms of kg, m and s. [1 mark]
4. A density is 2.7 g cm⁻³. Convert it to kg m⁻³. [2 marks]
5. A ball is dropped from a tall building. State two modelling assumptions that make the motion simple to analyse, and say for each whether the real ball would take more or less time to fall. [4 marks]
6. Explain the meaning of "light" and "inextensible" when applied to a string connecting two particles. [2 marks]
7. (A-level only) State the unit of a moment, and show it has the same base units as work done. [2 marks]

## Mark scheme

1. 25 m s⁻¹ (1).
2. 43.2 km h⁻¹ (1).
3. 1 N = 1 kg m s⁻² (1).
4. 2.7 g = 0.0027 kg and 1 cm³ = 10⁻⁶ m³ (1); 2700 kg m⁻³ (1).
5. Ball as a particle / no air resistance (1); real ball takes more time, because air resistance slows it (1); g constant at 9.8 m s⁻² (1); in reality g changes slightly with height and place, so the time changes very little (1).
6. Light: the string's mass is ignored, so tension is the same throughout (1). Inextensible: it does not stretch, so both particles have the same speed and acceleration (1).
7. N m (1); N m = kg m s⁻² × m = kg m² s⁻², the same as force × distance (1).
