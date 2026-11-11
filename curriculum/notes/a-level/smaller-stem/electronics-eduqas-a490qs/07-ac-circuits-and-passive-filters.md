---
level: A-level
subject: Electronics
topic: "C1.5 AC circuits and passive filters"
as_content: "A level only."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["C1.5(a)", "C1.5(b)", "C1.5(c)", "C1.5(d)", "C1.5(e)", "C1.5(f)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# C1.5 AC circuits and passive filters

Capacitors and inductors oppose AC by different amounts at different frequencies. This makes them useful for filters, which pass some frequencies and reject others. Filters are used throughout communications ([08](08-communications-systems.md)), radio ([09](09-wireless-transmission.md)) and audio ([18](18-audio-systems.md)). Power and rms are introduced in [02](02-dc-circuits-and-power.md).

Equations to select and apply: XC = 1/(2πfC); XL = 2πfL; Z = √(R² + X²); f₀ = 1/(2π√(LC)); RD = L/(rL C); Q = f₀/bandwidth = 2πf₀L/rL.

## C1.5(a), (b) AC in resistive loads

### What you need to know

V-t, I-t and P-t graphs for resistive loads; rms and peak values.

### Explained

For a resistor, current is in phase with voltage (both sinusoidal, crossing zero together). Power P = VI is always positive, varying between 0 and a peak of V₀I₀ at twice the supply frequency; the average power is half the peak: Pavg = V₀I₀/2 = Vrms × Irms. Vrms = V₀/√2, Irms = I₀/√2.

## C1.5(c) Reactance and impedance

### What you need to know

Calculate the reactance of capacitors and inductors and the impedance of a series circuit.

### Explained

**Reactance** (X, ohms) is opposition to AC from capacitance or inductance. It does not dissipate power (energy is stored and returned).

- Capacitor: XC = 1/(2πfC). Very high at low frequency (blocks DC), low at high frequency.
- Inductor: XL = 2πfL. Low at low frequency (passes DC), high at high frequency.

In a capacitor, current leads voltage by 90°; in an inductor current lags by 90°. So in a series R-X circuit the voltages across R and X are 90° apart and add like vectors: **impedance** Z = √(R² + X²), and Irms = Vrms/Z.

### Worked example

A 1 kΩ resistor in series with 100 nF at 2 kHz. XC = 1 ÷ (2π × 2000 × 100 × 10⁻⁹) = 796 Ω. Z = √(1000² + 796²) = 1278 Ω. With 5 V rms supply, I = 3.9 mA rms; VR = 3.9 V, VC = 3.1 V (which add as vectors to 5 V, not arithmetically).

## C1.5(d), (e) Passive RC filters

### What you need to know

- Recognise, analyse, design and draw high-pass and low-pass passive RC filters and passive LC band-pass filters.
- Draw, recognise and interpret output graphs on linear-log and log-log axes; the advantage of buffering passive filters.

### Explained

A passive RC filter is a voltage divider with a resistor and a capacitor:

- **Low-pass**: R in series, C to ground; output across C. At low frequency XC is large, so most of the input appears across C. At high frequency XC is small, so the output falls.
- **High-pass**: C in series, R to ground; output across R. Low frequencies are blocked by the capacitor; high frequencies pass.

**Break (cut-off) frequency**: where XC = R, so fb = 1/(2πRC). Here the output is 1/√2 (0.707) of the input, which is −3 dB. Beyond the break frequency the gain changes by a factor of 10 per decade of frequency (−20 dB per decade) for a first-order filter.

**Graphs**: frequency is always on a log axis because it spans many decades. On a linear-log graph (gain against log f), the curve is S-shaped; on a log-log graph (log gain or dB against log f), the response is flat in the pass band and a straight sloping line beyond the break frequency, making break frequency and slope easy to read.

**Buffering**: a passive filter's output changes if a load is connected (the load forms part of the divider and shifts the break frequency and gain). A voltage follower ([05](05-operational-amplifiers.md)) after the filter gives very high input impedance and very low output impedance, so the filter's response is preserved. Buffers also isolate cascaded filter stages from each other.

### Worked example

Design a low-pass filter with fb = 3.4 kHz using C = 10 nF: R = 1/(2π × 3400 × 10 × 10⁻⁹) = 4.68 kΩ; choose 4.7 kΩ (fb = 3.39 kHz).

## C1.5(e), (f) LC band-pass filters and resonance

### What you need to know

- Passive LC band-pass filters.
- f₀ = 1/(2π√(LC)); dynamic resistance RD = L/(rL C); Q-factor = f₀/bandwidth = 2πf₀L/rL.

### Explained

An inductor and capacitor in parallel form a **tuned circuit**. At the resonant frequency f₀, XL = XC, and energy swaps back and forth between the capacitor's electric field and the inductor's magnetic field. The parallel combination then has a very high impedance (ideally infinite), called the **dynamic resistance** RD; it is limited by the inductor's small resistance rL: RD = L/(rLC).

Connected as the lower arm of a voltage divider (with a series resistor above), the output is large at f₀ (high impedance) and small at other frequencies (low impedance via L at low frequencies or C at high frequencies): a **band-pass filter**. Used to select a radio station.

**Q-factor** measures sharpness: Q = f₀ ÷ bandwidth (bandwidth measured between the −3 dB points). A higher Q means a narrower band and more selective tuning; Q is raised by reducing the coil resistance rL: Q = 2πf₀L/rL.

### Worked example

L = 220 µH, C = 470 pF, rL = 8 Ω. f₀ = 1 ÷ (2π√(220 × 10⁻⁶ × 470 × 10⁻¹²)) = 1 ÷ (2π × 3.216 × 10⁻⁷) = 495 kHz. Q = 2π × 495 000 × 220 × 10⁻⁶ ÷ 8 = 85.5. Bandwidth = 495 kHz ÷ 85.5 = 5.8 kHz. RD = 220 × 10⁻⁶ ÷ (8 × 470 × 10⁻¹²) = 58.5 kΩ.

### Common mistakes

- Adding resistance and reactance arithmetically.
- Reading frequency from a log axis as if it were linear.
- Swapping the positions of R and C in high- and low-pass filters.
- Saying a parallel LC circuit has minimum impedance at resonance (that is a series circuit).

## Check questions

1. Calculate the reactance of a 22 µF capacitor at 50 Hz and at 5 kHz. (2)
2. Calculate the reactance of a 10 mH inductor at 1 kHz. (1)
3. A 470 Ω resistor and a capacitor of reactance 330 Ω are in series. Calculate the impedance. (2)
4. Draw a passive high-pass filter and explain how it works. (4)
5. Calculate the break frequency of a filter with R = 10 kΩ and C = 4.7 nF. (2)
6. Explain why a passive filter is followed by a voltage follower. (3)
7. Sketch the log-log response of a first-order low-pass filter, labelling the break frequency and slope. (3)
8. A tuned circuit has L = 100 µH and C = 1 nF. Calculate f₀. (2)
9. The same tuned circuit has rL = 5 Ω. Calculate Q, the bandwidth and the dynamic resistance. (4)

## Mark scheme

1. 50 Hz: 1 ÷ (2π × 50 × 22 × 10⁻⁶) = 145 Ω (1); 5 kHz: 1.45 Ω (1).
2. 2π × 1000 × 0.01 = 62.8 Ω (1).
3. √(470² + 330²) (1) = 574 Ω (1).
4. Capacitor in series, resistor to 0 V, output across R (1); at low f, XC high so most voltage across C, output small (1); at high f, XC low so output ≈ input (1); break at XC = R (1).
5. 1 ÷ (2π × 10⁴ × 4.7 × 10⁻⁹) (1) = 3.39 kHz (1).
6. A load would form part of the divider (1); changing the gain and break frequency (1); follower has high input and low output impedance so isolates the filter (1).
7. Flat line at 0 dB below fb (1); fb marked at −3 dB (1); falling at −20 dB per decade above (1).
8. √(10⁻⁴ × 10⁻⁹) = 3.16 × 10⁻⁷ (1); f₀ = 503 kHz (1).
9. Q = 2π × 503 000 × 10⁻⁴ ÷ 5 = 63 (1); bandwidth = 503 kHz ÷ 63 = 8.0 kHz (1); RD = 10⁻⁴ ÷ (5 × 10⁻⁹) (1) = 20 kΩ (1).
