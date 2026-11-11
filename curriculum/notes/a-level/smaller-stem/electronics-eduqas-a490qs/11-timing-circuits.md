---
level: A-level
subject: Electronics
topic: "C2.1 Timing circuits"
as_content: "AS and A level."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["C2.1(a)", "C2.1(b)", "C2.1(c)", "C2.1(d)", "C2.1(e)", "C2.1(f)", "C2.1(g)", "C2.1(h)", "C2.1(i)", "C2.1(j)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# C2.1 Timing circuits

Charging and discharging a capacitor through a resistor takes a predictable time. This is the basis of time delays, switch debouncing, monostables and astables (pulse generators). GCSE background: [GCSE Electronics 08](../../../gcse/smaller-stem/electronics-eduqas/08-timing-circuits.md). Capacitance basics: [02](02-dc-circuits-and-power.md).

Equations: use T = RC (time constant). Select and apply: VC = V₀(1 − e^(−t/RC)) (charging); VC = V₀e^(−t/RC) (discharging); t = −RC ln(1 − VC/V₀) (charging); t = −RC ln(VC/V₀) (discharging); half time ≈ 0.69RC; full charge or discharge ≈ 5RC; Schmitt astable f ≈ 1/RC; f = 1/T; 555 monostable T = 1.1RC; 555 astable tH = 0.7(R1 + R2)C, tL = 0.7R2C, f = 1.44/((R1 + 2R2)C), mark-space ratio TON/TOFF = (R1 + R2)/R2.

## C2.1(a) to (d) Charging and discharging

### Explained

When a capacitor charges through a resistor from a supply V₀, the current is large at first (the capacitor is empty, so the full voltage is across R), then falls as the capacitor voltage rises: VC rises quickly at first and then levels off towards V₀ (exponential). Discharging, VC falls exponentially towards zero.

- **Time constant** T = RC (seconds when R in ohms and C in farads). After one time constant a charging capacitor reaches 63% of V₀; a discharging one falls to 37%.
- After 0.69RC (ln 2 × RC), the voltage has reached half of its final change.
- After about 5RC, charging or discharging is effectively complete (over 99%).

**From graphs**: read T as the time to reach 63% (charging) or 37% (discharging). For a discharge, plotting ln(VC) against t gives a straight line of gradient −1/RC, from which RC (and so R or C) is found (log graphs).

### Worked example

R = 47 kΩ, C = 220 µF, supply 9 V. T = 47 000 × 220 × 10⁻⁶ = 10.3 s. Time to charge to 6 V: t = −RC ln(1 − 6/9) = −10.3 × ln(0.333) = 10.3 × 1.099 = 11.4 s. Voltage after 20 s: VC = 9(1 − e^(−20/10.3)) = 9(1 − 0.143) = 7.7 V.

Discharge from 9 V to 2 V: t = −10.3 × ln(2/9) = 10.3 × 1.504 = 15.5 s.

## C2.1(e) Debouncing switches

Mechanical switch contacts bounce, opening and closing several times in a few milliseconds before settling. A counter would count each bounce. An RC network smooths the bounces: the capacitor cannot charge or discharge fast enough to follow the rapid bounces, so its voltage changes smoothly. A Schmitt inverter after it converts the slow change into one clean edge. Choose RC much longer than the bounce time (for example RC about 10 ms for bounces under 1 ms) but short enough not to delay the response noticeably.

## C2.1(f), (g) Monostables and time delays

A **monostable** has one stable state. A trigger pulse switches the output to its unstable state for a fixed time set by RC, after which it returns by itself. Uses: fixed-length pulses (a timer for a light, a pulse-stretcher, debouncing).

A simple **time delay**: an RC network feeding a Schmitt inverter or comparator: the output changes when VC passes the threshold, a set time after a switch is operated. Using a monostable with an RC network gives a defined delay or pulse length triggered by an event.

## C2.1(h), (i) Astables and the Schmitt astable

An **astable** has no stable state: it switches continuously between high and low, producing a rectangular wave (pulse generator, clock for counters, flashing LEDs, tone generators).

**Schmitt inverter astable**: a capacitor from the input to 0 V and a resistor from the output back to the input.

1. Output high: C charges through R until VC reaches the upper threshold.
2. The output switches low: C now discharges through R until VC falls to the lower threshold.
3. The output switches high again, and so on.

The frequency is approximately f ≈ 1/RC (depending on the thresholds and supply). The mark-space ratio is about 1:1.

### Worked example

A Schmitt astable with R = 100 kΩ and C = 10 nF: f ≈ 1 ÷ (10⁵ × 10⁻⁸) = 1 kHz.

## C2.1(j) 555 timer circuits

### What you need to know

Draw and analyse 555 monostable and astable circuits; calculate pulse duration, frequency and mark-space ratio.

### Explained

The 555 contains two comparators (thresholds at 1/3 and 2/3 of the supply, set by an internal resistor chain), a flip-flop, an output stage, and a discharge transistor.

**Monostable**: the trigger input (pin 2) taken below 1/3 VS sets the output high and lets C charge through R. When VC reaches 2/3 VS, the threshold comparator resets the flip-flop: the output goes low and the discharge transistor empties C. Pulse length T = 1.1RC (since charging from 0 to 2/3 takes ln 3 ≈ 1.1 time constants).

**Astable**: R1 from the supply to the discharge pin, R2 from discharge pin to the capacitor, trigger and threshold joined at the capacitor. C charges through R1 + R2 from 1/3 to 2/3 VS (output high), then discharges through R2 only into the discharge pin, from 2/3 to 1/3 VS (output low).

- Mark (high) time tH = 0.7(R1 + R2)C (ln 2 ≈ 0.69 time constants).
- Space (low) time tL = 0.7R2C.
- Period T = tH + tL = 0.7(R1 + 2R2)C; f = 1/T = 1.44/((R1 + 2R2)C).
- Mark-space ratio = (R1 + R2)/R2, always greater than 1 in this basic circuit. To get close to 1:1, make R2 much larger than R1 (or add a diode across R2).

### Worked example

Astable: R1 = 1.0 kΩ, R2 = 10 kΩ, C = 100 nF. tH = 0.7 × 11 000 × 10⁻⁷ = 0.77 ms; tL = 0.7 × 10 000 × 10⁻⁷ = 0.70 ms; f = 1.44 ÷ (21 000 × 10⁻⁷) = 686 Hz; mark-space ratio = 11/10 = 1.1.

Monostable for a 5 s pulse with C = 47 µF: R = 5 ÷ (1.1 × 47 × 10⁻⁶) = 96.7 kΩ; choose 100 kΩ (T = 5.2 s).

### Common mistakes

- Using 1.1RC for the astable or 0.7RC for the monostable.
- Including R1 in the 555 discharge (low) time.
- Mixing up mark-space ratio (high ÷ low) with duty cycle (high ÷ period).
- Forgetting to convert µF and kΩ to base units.

## Check questions

1. Calculate the time constant of 33 kΩ and 470 µF. (1)
2. A 1000 µF capacitor charges through 4.7 kΩ from 12 V. Calculate the time to reach 9 V. (3)
3. A capacitor discharges from 10 V. After 3.0 s the voltage is 4.0 V. Calculate the time constant. (3)
4. Explain why an RC network and Schmitt inverter are used to debounce a switch. (3)
5. Distinguish between monostable and astable circuits, giving a use of each. (4)
6. Design a 555 monostable to give a 30 s pulse using a 220 µF capacitor. Choose an E24 resistor. (3)
7. A 555 astable has R1 = 2.2 kΩ, R2 = 6.8 kΩ, C = 22 nF. Calculate f and the mark-space ratio. (4)
8. A Schmitt astable must give about 50 Hz with C = 1 µF. Calculate R. (2)

## Mark scheme

1. 15.5 s (1).
2. RC = 4.7 s (1); t = −4.7 × ln(1 − 9/12) = −4.7 × ln 0.25 (1) = 6.5 s (1).
3. 4/10 = e^(−3/RC) (1); ln 0.4 = −0.916 = −3/RC (1); RC = 3.27 s (1).
4. Contacts bounce, giving several rapid pulses (1); capacitor voltage cannot follow rapid changes so changes smoothly (1); Schmitt converts slow change to a single clean edge (1).
5. Monostable: one stable state, gives one fixed-length pulse when triggered (1), e.g. timer for a light (1); astable: no stable state, continuous rectangular wave (1), e.g. clock / flasher (1).
6. R = 30 ÷ (1.1 × 220 × 10⁻⁶) (1) = 124 kΩ (1); E24 120 kΩ (29 s) or 130 kΩ (31.5 s) (1).
7. f = 1.44 ÷ ((2.2 + 13.6) × 10³ × 22 × 10⁻⁹) (1) = 1.44 ÷ 3.476 × 10⁻⁴ = 4.14 kHz (1); MSR = 9.0/6.8 (1) = 1.32 (1).
8. R ≈ 1/(fC) = 1 ÷ (50 × 10⁻⁶) (1) = 20 kΩ (1).
