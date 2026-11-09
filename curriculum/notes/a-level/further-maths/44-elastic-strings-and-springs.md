---
level: A-level
subject: Further Mathematics
topic: "Hooke's law, elastic strings and springs"
as_content: "A-level only on OCR (6.02g, 6.02h Stage 2) and MEI (Mechanics Major section (b)). AQA and Edexcel (FM1) are option content; Edexcel FM1 is also available at AS."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["MC4", "MC5", "MC6"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FM1 3.1", "FM1 3.2"]
  - board: OCR
    code: "H245"
    spec_refs: ["6.02g", "6.02h", "6.02i", "6.02j"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Mh1", "Mh2", "Mh3", "Mh4", "Mh5", "Mh6", "Mh7", "Mh8"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-mechanics/
---

# Hooke's law, elastic strings and springs

This file covers Hooke's law with stiffness k or modulus of elasticity λ, equilibrium positions of particles on strings and springs, elastic potential energy, and energy problems with elastic strings and springs, including when the string goes slack.

## Overview

Work and energy are in [43-work-energy-and-power.md](43-work-energy-and-power.md). Oscillations on springs (simple harmonic motion) are in [49-variable-forces-kinematics-and-shm.md](49-variable-forces-kinematics-and-shm.md) and [17-differential-equations-second-order-and-oscillations.md](17-differential-equations-second-order-and-oscillations.md). Take g = 9.8 m s⁻².

### Board differences

- AQA MC4, MC5, MC6 (T = kx or T = λx/l; EPE = kx²/2 or λx²/2l); Edexcel FM1 3.1, 3.2 (λ form); OCR 6.02g, 6.02h, 6.02j; MEI Mh1 to Mh8 (stiffness and modulus).
- MEI Mh8 asks when Hooke's law does not apply (beyond the elastic limit, or a string going slack).

## MC4 Hooke's law and equilibrium

*Refs: AQA MC4 · Edexcel FM1 3.1 · OCR 6.02g · MEI Mh1, Mh2, Mh3, Mh4, Mh5, Mh8. Level: A-level only (OCR, MEI).*

### What you need to know

```latex
T = kx = \frac{\lambda x}{l}
```

- x is the extension (or compression for a spring), l the natural length, k the stiffness (N m⁻¹), λ the modulus of elasticity (N).
- A string can only be in tension: if it would be shorter than its natural length it is slack, with T = 0. A spring can be compressed (thrust).
- In equilibrium, resolve forces as usual with T from Hooke's law.

### Worked example

A particle of mass 0.5 kg hangs from an elastic string of natural length 0.8 m and modulus 20 N. Find the extension.

1. 0.5 × 9.8 = 20e/0.8, so e = 0.196 m. The string is 0.996 m long.

A particle of mass m is suspended from a spring of natural length 0.5 m and modulus 49 N; its extension is 0.1 m. Find m.

1. mg = 49 × 0.1/0.5 = 9.8, m = 1 kg.

### Common mistakes

- Using the stretched length instead of the extension.

## MC6 Elastic potential energy

*Refs: AQA MC5, MC6 · Edexcel FM1 3.2 · OCR 6.02h, 6.02j · MEI Mh6, Mh7. Level: A-level only (OCR, MEI).*

### What you need to know

```latex
\text{EPE} = \frac12kx^2 = \frac{\lambda x^2}{2l}
```

- This is the work done stretching the string: ∫₀ˣ (λs/l) ds.
- Include EPE in energy equations alongside KE and GPE. Mechanical energy (KE + GPE + EPE) is conserved if no other work is done.

### Worked example

The particle above is pulled down a further 0.1 m and released. Find its speed as it passes the equilibrium position.

1. EPE at extension 0.296: 20 × 0.296²/1.6 = 1.0952 J. At 0.196: 0.4802 J.
2. It rises 0.1 m, gaining 0.49 J of GPE.
3. ½ × 0.5v² = 1.0952 − 0.4802 − 0.49 = 0.125, v = 0.707 m s⁻¹.

A bungee jumper of mass 70 kg falls from rest from the fixed end of a rope of natural length 20 m and modulus 1400 N. Find the greatest distance fallen.

1. Let the greatest extension be e. GPE lost = EPE gained: 70 × 9.8 × (20 + e) = 1400e²/40.
2. 35e² − 686e − 13 720 = 0, e = 31.9 m.
3. Greatest fall 51.9 m. (Modelling the jumper as a particle and ignoring air resistance.)

A spring of stiffness 200 N m⁻¹ is compressed by 0.1 m and launches a 0.05 kg ball along a smooth table. Find the launch speed.

1. ½ × 200 × 0.01 = ½ × 0.05v², v = 6.32 m s⁻¹.

### Common mistakes

- Forgetting that the string has no EPE once it is slack.
- Measuring GPE from a different level at the start and end.

## Check questions

1. A particle of mass 2 kg on a smooth horizontal table is attached to a fixed point by a string of natural length 1.5 m and modulus 30 N. It is pulled until it is 2.1 m from the fixed point and released. Find its speed when the string goes slack. [4 marks]
2. A particle of mass 0.3 kg is attached to two strings, each of natural length 0.4 m and modulus 12 N, whose other ends are fixed 1 m apart on a smooth horizontal surface. The particle is held at the midpoint and moved 0.1 m towards one end. Find the tension in each string. [4 marks]
3. A spring of natural length 0.6 m and modulus 18 N stands vertically. A ball of mass 0.2 kg is dropped onto it from 0.4 m above its top. Find the greatest compression. [6 marks]
4. State one modelling assumption in question 3 and its effect on your answer. [2 marks]

## Mark scheme

1. Extension 0.6 m (1). EPE = 30 × 0.36/3 = 3.6 J (1). ½ × 2v² = 3.6 (1). v = 1.90 m s⁻¹ (1).
2. Extensions: one string 0.6 − 0.4 = 0.2 m, the other 0.4 − 0.4 = 0 m (2). Tensions 12 × 0.2/0.4 = 6 N and 0 N (the shorter string is just taut) (2).
3. Let compression x: GPE lost 0.2 × 9.8 × (0.4 + x) (1) = 18x²/1.2 (2). 15x² − 1.96x − 0.784 = 0 (1). x = 0.302 m (2).
4. E.g. ignoring air resistance (1), so the true compression is slightly less (1). Or: spring is light / ball is a particle.
