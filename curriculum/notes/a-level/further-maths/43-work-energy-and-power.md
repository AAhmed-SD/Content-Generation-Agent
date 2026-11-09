---
level: A-level
subject: Further Mathematics
topic: "Work, energy and power"
as_content: "AS on OCR (6.02 Stage 1 parts) and MEI (section (a)). Work by a variable force and power of a variable force are A-level only on OCR. AQA and Edexcel (FM1) are option content; Edexcel FM1 is also available at AS."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["MC1", "MC2", "MC3", "MC5", "MC7"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FM1 2.1"]
  - board: OCR
    code: "H245"
    spec_refs: ["6.02a", "6.02b", "6.02c", "6.02d", "6.02e", "6.02f", "6.02i", "6.02j", "6.02k", "6.02l", "6.02m"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Mw1", "Mw2", "Mw3", "Mw4", "Mw5", "Mw6", "Mw7", "Mw8"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-mechanics/
---

# Work, energy and power

This file covers work done by constant and variable forces, kinetic and gravitational potential energy, the work-energy principle, conservation of mechanical energy, and power, including vehicles moving at constant power. Elastic potential energy is in [44-elastic-strings-and-springs.md](44-elastic-strings-and-springs.md).

## Overview

Forces, Newton's laws and friction are in A-level Maths ([../maths/27-forces-and-newtons-laws.md](../maths/27-forces-and-newtons-laws.md), [../maths/28-friction.md](../maths/28-friction.md)). Take g = 9.8 m s⁻² unless told otherwise.

### Board differences

- AQA MC1, MC2, MC3, MC5, MC7; Edexcel FM1 2.1; OCR 6.02a to 6.02f, 6.02i, 6.02j, 6.02k to 6.02m; MEI Mw1 to Mw8.
- Work done by a variable force (∫F dx): AQA MC5 and OCR 6.02c. Power of a variable force: OCR 6.02m.

## MC1 Work done

*Refs: AQA MC1, MC5 · Edexcel FM1 2.1 · OCR 6.02a, 6.02b, 6.02c · MEI Mw1, Mw2, Mw3. Level: AS & A (variable force A-level only).*

### What you need to know

- Work done by a constant force F moving its point of application a distance d: W = Fd cos θ, where θ is the angle between the force and the motion. Unit: joule.
- Work against friction = friction × distance. Work against gravity = mgh (h vertical height gained).
- Variable force in the direction of motion: W = ∫F dx.

### Worked example

A 5 kg box is pulled 8 m along rough horizontal ground by a force of 40 N at 30° above the horizontal. μ = 0.3. Find the work done by the pull and against friction.

1. Pull: 40 cos 30° × 8 = 277.1 J.
2. R = 5 × 9.8 − 40 sin 30° = 29 N. Friction 0.3 × 29 = 8.7 N. Work against friction 8.7 × 8 = 69.6 J.

A force F = 3x² N acts on a particle moving from x = 0 to x = 2 m. Find the work done.

1. W = ∫₀² 3x² dx = 8 J.

### Common mistakes

- Using the slope length instead of the vertical height for work against gravity.

## MC2 Energy and the work-energy principle

*Refs: AQA MC2, MC3 · Edexcel FM1 2.1 · OCR 6.02d, 6.02e, 6.02f, 6.02i, 6.02j · MEI Mw4, Mw5, Mw6, Mw7. Level: AS & A.*

### What you need to know

- Kinetic energy ½mv². Gravitational potential energy mgh relative to a chosen level.
- Work-energy principle: the total work done by all forces = change in kinetic energy.
- Equivalently: initial (KE + PE) + work done by driving forces − work done against resistances = final (KE + PE).
- If only gravity (and forces that do no work, such as a normal reaction on a smooth surface) act, mechanical energy is conserved.

### Explained

Energy methods avoid working out accelerations, and they handle curved paths, where suvat does not apply. Choose a zero level for PE and stick with it.

### Worked example

For the box above, starting from rest, find its speed after 8 m.

1. ½ × 5 × v² = 277.1 − 69.6 = 207.5.
2. v = 9.11 m s⁻¹.

A 2 kg particle slides 10 m from rest down a rough slope inclined at 30°, μ = 0.2. Find its speed.

1. PE lost: 2 × 9.8 × 10 sin 30° = 98 J.
2. Friction: 0.2 × 2 × 9.8 cos 30° = 3.395 N; work 33.95 J.
3. ½ × 2v² = 98 − 33.95 = 64.05, v = 8.00 m s⁻¹.

A ball is thrown upwards at 12 m s⁻¹ from 2 m above the ground. Find its speed when it hits the ground (ignore air resistance).

1. ½v² = ½ × 144 + 9.8 × 2, v = 13.5 m s⁻¹. The direction of the throw does not matter.

### Common mistakes

- Including the weight's work and the PE change (counting gravity twice).

## MC7 Power

*Refs: AQA MC7 · Edexcel FM1 2.1 · OCR 6.02k, 6.02l, 6.02m · MEI Mw8. Level: AS & A.*

### What you need to know

- Power is the rate of doing work. Unit: watt (1 W = 1 J s⁻¹).
- For a force F moving at speed v in its direction: P = Fv.
- A vehicle's maximum speed is reached when the driving force equals the resistance (plus the weight component on a slope), so acceleration is zero.

### Worked example

A car of mass 1200 kg has engine power 30 kW and faces resistance 600 N. Find its maximum speed on level ground, and its acceleration at 20 m s⁻¹.

1. Max speed: 30 000/600 = 50 m s⁻¹.
2. At 20 m s⁻¹, driving force 1500 N. a = (1500 − 600)/1200 = 0.75 m s⁻².

The car climbs a hill with sin α = 1/20 at the same power. Find its maximum speed.

1. Resisting forces 600 + 1200 × 9.8/20 = 1188 N.
2. v = 30 000/1188 = 25.3 m s⁻¹.

### Common mistakes

- Using P = Fv with the resistance instead of the driving force.

## Check questions

1. A 3 kg block slides 6 m from rest down a rough slope inclined at 20°, reaching 5 m s⁻¹. Find the work done against friction and the coefficient of friction. [6 marks]
2. A lorry of mass 8000 kg has maximum power 60 kW. Resistance is 2000 N. Find its maximum speed up a slope of 1 in 25 (sin α = 1/25). [4 marks]
3. A particle of mass 0.4 kg moves along a line under a force F = (6 − 2x) N. Find the work done as it moves from x = 0 to x = 3, and its speed at x = 3 if it starts from rest. [5 marks]
4. A pump raises 50 kg of water per minute through 12 m and delivers it at 6 m s⁻¹. Find the power of the pump. [4 marks]

## Mark scheme

1. PE lost 3 × 9.8 × 6 sin 20° = 60.33 J (1). KE gained 37.5 J (1). Work against friction 22.83 J (1). Friction = 22.83/6 = 3.805 N (1). R = 3 × 9.8 cos 20° = 27.63 N (1). μ = 0.138 (1).
2. Weight component 8000 × 9.8/25 = 3136 N (1). Total resistance 5136 N (1). v = 60 000/5136 (1) = 11.7 m s⁻¹ (1).
3. W = ∫₀³ (6 − 2x) dx = [6x − x²]₀³ = 9 J (3). ½ × 0.4v² = 9, v = 6.71 m s⁻¹ (2).
4. Per second: mass 5/6 kg (1). PE 5/6 × 9.8 × 12 = 98 J (1). KE ½ × 5/6 × 36 = 15 J (1). Power 113 W (1).
