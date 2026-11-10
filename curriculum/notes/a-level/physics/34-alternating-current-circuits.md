---
level: A-level
subject: Physics
topic: "Alternating currents: generators, r.m.s. values, reactance, phasors, impedance and LCR resonance"
as_content: "Eduqas option A (A-level only)."
boards:
  - board: Eduqas
    code: "A420QS"
    spec_refs: ["OA(a)", "OA(b)", "OA(c)", "OA(d)", "OA(e)", "OA(f)", "OA(g)", "OA(h)", "OA(i)", "OA(j)", "OA(k)", "OA(l)", "OA(m)", "OA(n)", "OA(o)", "OA(p)"]
refs_checked: false
spec_urls:
  Eduqas: https://www.eduqas.co.uk/qualifications/physics-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/
---

# Alternating currents: generators, r.m.s. values, reactance, phasors, impedance and LCR resonance

This file covers the Eduqas option on alternating currents: the a.c. generator and its e.m.f., peak and r.m.s. values, mean power, using an oscilloscope, the phase relationships and reactance of inductors and capacitors, adding p.d.s with phasors in RC, RL and RCL circuits, impedance and phase angle, series resonance and the Q factor.

## Overview

Eduqas option A (A-level only). Faraday's law, the rotating coil and r.m.s. values for AQA and Edexcel are in file 17. Capacitors are in file 16. Parallel LC filters and Q in the AQA electronics option are in file 28.

### Board differences

- Eduqas OA(a) to (p) only. AQA 3.7.5.4, 3.7.5.5 and Edexcel 128, 129 cover the generator and r.m.s. values (file 17), but not reactance, phasors or LCR circuits.

## OA(a) to (g) Generating a.c., r.m.s. values and the oscilloscope

*Refs: Eduqas OA(a) to (g). Level: A-level only.*

### What you need to know

- Faraday's law applied to a coil rotating in a magnetic field; flux linkage BAN cos ωt; e.m.f. V = ωBAN sin ωt.
- Frequency, period, peak and r.m.s. values; I_rms = I₀/√2, V_rms = V₀/√2 (including V_rms = ωBAN/√2).
- The r.m.s. value relates to the energy dissipated per cycle; mean power in a resistor P = I_rmsV_rms = I_rms²R = V_rms²/R.
- Using an oscilloscope (CRO, or PC-based) to measure a.c. and d.c. voltages and currents and frequencies.

### Explained

A flat coil of N turns and area A rotates at angular speed ω in a uniform field B. The angle between the field and the normal to the coil is θ = ωt, so the flux linkage is NΦ = BAN cos ωt. By Faraday's law, e.m.f. = −d(NΦ)/dt = BANω sin ωt. Peak e.m.f. V₀ = ωBAN, so V_rms = ωBAN/√2.

The r.m.s. value is the d.c. value that would dissipate the same mean power in a resistor. For a sinusoid, the mean of sin² over a cycle is ½, so mean power = ½I₀²R = (I₀/√2)²R. Hence I_rms = I₀/√2 and P = I_rmsV_rms.

**Oscilloscope.** The Y-gain (V per division) gives voltage; the time-base (s per division) gives time. To measure a current, measure the p.d. across a known resistor and use I = V/R. A d.c. voltage shifts the trace up or down; an a.c. voltage gives a waveform whose peak-to-peak height gives 2V₀. (Full details in file 17.)

### Worked example

1. A 200-turn coil of area 0.012 m² rotates at 50 Hz in a 0.080 T field. Find V₀ and V_rms.

   ω = 314 rad s⁻¹. V₀ = 314 × 0.080 × 0.012 × 200 = 60 V. V_rms = 43 V.

### Common mistakes

- Using peak values in P = IV for mean power.

## OA(h) to (k) Inductors and capacitors in a.c. circuits

*Refs: Eduqas OA(h), (i), (j), (k). Level: A-level only.*

### What you need to know

- In an inductor, current lags the p.d. by 90°; reactance X_L = V_rms/I_rms = ωL.
- In a capacitor, current leads the p.d. by 90°; X_C = V_rms/I_rms = 1/(ωC).
- The mean power dissipated in a pure inductor or capacitor is zero.

### Explained

**Inductor.** An inductor (a coil, inductance L in henry) produces a back e.m.f. L dI/dt opposing changes in current. For an a.c. current I = I₀ sin ωt, the p.d. across the inductor is V = L dI/dt = ωLI₀ cos ωt. The p.d. is a quarter cycle ahead of the current: **current lags p.d. by 90°** (π/2). The ratio V₀/I₀ = ωL is the inductive reactance X_L (ohms). X_L increases with frequency: an inductor blocks high frequencies and passes low frequencies (and d.c.).

**Capacitor.** The charge on a capacitor Q = CV. Current I = dQ/dt = C dV/dt. For V = V₀ sin ωt, I = ωCV₀ cos ωt: **current leads p.d. by 90°**. The capacitive reactance X_C = V₀/I₀ = 1/(ωC). X_C decreases with frequency: a capacitor blocks d.c. and low frequencies and passes high frequencies.

**Zero mean power.** In a pure inductor or capacitor, current and p.d. are 90° out of phase. For a quarter of each cycle energy flows in (stored in the magnetic or electric field), and for the next quarter it flows back out. The mean power over a cycle is zero. Only resistance dissipates energy.

### Worked example

1. Find the reactance of a 0.20 H inductor and of a 10 μF capacitor at 50 Hz.

   X_L = 2π × 50 × 0.20 = 63 Ω. X_C = 1/(2π × 50 × 10 × 10⁻⁶) = 318 Ω.

2. A 230 V r.m.s., 50 Hz supply is connected across the capacitor alone. Find the r.m.s. current.

   I = 230/318 = 0.72 A.

### Common mistakes

- Saying the current lags the p.d. in a capacitor (it leads).
- Saying reactance is the same at all frequencies.

## OA(l), (m) Phasors and impedance in RC, RL and RCL circuits

*Refs: Eduqas OA(l), (m). Level: A-level only.*

### What you need to know

- Adding p.d.s across series RC, RL and RCL combinations using phasors.
- Calculating the phase angle and the impedance Z = V_rms/I_rms.

### Explained

In a series circuit, the same current flows through every component. The p.d.s across them are not in phase, so they cannot simply be added; they are added as **phasors** (rotating vectors whose length is the r.m.s. or peak value and whose angle shows the phase).

Draw the current phasor horizontally. Then:

- V_R = IR is along the current (in phase).
- V_L = IX_L points up (leads the current by 90°).
- V_C = IX_C points down (lags the current by 90°).

**RCL series.** Supply p.d. V = √(V_R² + (V_L − V_C)²). Dividing by I:

**Z = √(R² + (X_L − X_C)²)**

Phase angle between supply p.d. and current: tan φ = (X_L − X_C)/R. If X_L > X_C, the p.d. leads the current (inductive); if X_C > X_L, the current leads (capacitive).

- RC only: Z = √(R² + X_C²), tan φ = X_C/R (current leads).
- RL only: Z = √(R² + X_L²), tan φ = X_L/R (current lags).

### Worked example

1. A 100 Ω resistor and a 10 μF capacitor are in series across 12 V r.m.s. at 200 Hz. Find Z, the current and the phase angle.

   X_C = 1/(2π × 200 × 10⁻⁵) = 79.6 Ω. Z = √(100² + 79.6²) = 128 Ω. I = 12/128 = 0.094 A. tan φ = 79.6/100, φ = 38.5° (current leads the supply p.d.).

### Common mistakes

- Adding V_R, V_L and V_C arithmetically.
- Taking the phase angle from Z instead of from tan φ = (X_L − X_C)/R.

## OA(n) to (p) Series resonance and Q factor

*Refs: Eduqas OA(n), (o), (p). Level: A-level only.*

### What you need to know

- Derive the resonance frequency of a series RCL circuit.
- Q factor = V_L/V_R = V_C/V_R at resonance.
- The sharpness of the resonance curve depends on Q.

### Explained

**Resonance.** As frequency rises, X_L rises and X_C falls. At one frequency they are equal: X_L = X_C, so ωL = 1/(ωC):

**ω₀ = 1/√(LC), f₀ = 1/(2π√(LC))**

At resonance:

- Z = R (minimum impedance), so the current is a maximum: I = V/R.
- The p.d. across L and the p.d. across C are equal and opposite (they cancel), so the supply p.d. equals V_R and the current is in phase with the supply.
- V_L and V_C can each be much larger than the supply p.d.

**Q factor.** Q = V_L/V_R = V_C/V_R at resonance = ω₀L/R. A small resistance gives a large Q: a tall, narrow peak of current against frequency (very selective, as in tuning a radio). A large R gives a low Q and a broad, flat peak.

### Worked example

1. A series circuit has L = 50 mH, C = 2.0 μF and R = 20 Ω, with a 5.0 V r.m.s. supply. Find f₀, the current at resonance, Q and V_L at resonance.

   f₀ = 1/(2π√(1.0 × 10⁻⁷)) = 503 Hz. I = 5.0/20 = 0.25 A. X_L = 2π × 503 × 0.050 = 158 Ω. Q = 158/20 = 7.9. V_L = 0.25 × 158 = 40 V (eight times the supply p.d.).

### Common mistakes

- Adding V_R, V_L and V_C as numbers instead of as phasors.
- Saying the current lags the p.d. in a capacitor.
- Saying a capacitor or inductor dissipates power.
- Saying the impedance is zero at resonance (it equals R).

## Check questions

1. Show that the r.m.s. value of a sinusoidal current is I₀/√2. (3 marks)
2. Explain why the mean power in a pure capacitor is zero. (2 marks)
3. Calculate the frequency at which a 0.10 H inductor has a reactance of 500 Ω. (2 marks)
4. A 60 Ω resistor and a 0.15 H inductor are in series across a 24 V r.m.s., 50 Hz supply. Find the impedance, the current and the phase angle. (4 marks)
5. Derive the resonant frequency of a series RCL circuit. (2 marks)
6. Sketch the current against frequency for two series RCL circuits with the same L and C but different R. Explain the difference. (3 marks)
7. A series RCL circuit at resonance has V_R = 2.0 V and V_C = 30 V. Find Q and the supply p.d. (2 marks)

## Mark scheme

1. Power at any instant = I₀²R sin²ωt (1); mean of sin² over a cycle = ½ (1); mean power = ½I₀²R = (I₀/√2)²R, so I_rms = I₀/√2 (1).
2. Current and p.d. are 90° out of phase (1); energy stored in the field for a quarter cycle is returned in the next, so net energy transfer per cycle is zero (1).
3. f = X_L/(2πL) (1) = 500/(2π × 0.10) = 800 Hz (1).
4. X_L = 47.1 Ω (1); Z = √(60² + 47.1²) = 76.3 Ω (1); I = 0.31 A (1); tan φ = 47.1/60, φ = 38° (current lags) (1).
5. At resonance X_L = X_C so ωL = 1/(ωC) (1); ω₀ = 1/√(LC), f₀ = 1/(2π√(LC)) (1).
6. Both peak at the same f₀ (1); smaller R gives a higher, sharper peak (1); larger R gives a lower, broader peak, since Q = ω₀L/R (1).
7. Q = 30/2.0 = 15 (1); supply p.d. = V_R = 2.0 V (1).
