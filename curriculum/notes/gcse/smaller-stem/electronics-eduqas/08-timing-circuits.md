---
board: Eduqas
level: GCSE
subject: Electronics
code: "C490QS"
also_covers: []
topic: "Component 2 Topic 2 Timing circuits"
spec_refs: ["C2.2(a)", "C2.2(b)", "C2.2(c)", "C2.2(d)", "C2.2(e)", "C2.2(f)", "C2.2(g)", "C2.2(h)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-gcse/
pmt_url: null
---

# C2.2 Timing circuits

Many systems need a set delay (a light that stays on for a minute) or a steady stream of pulses (a flashing LED, a clock for a counter). This topic covers how a resistor-capacitor (RC) network produces a delay, charging and discharging graphs, and the 555 timer IC used as a monostable and as an astable, with their equations and circuits.

Equations (given in a list): T = 1.1RC (monostable); f = 1 ÷ T; f = 1.44 ÷ ((R₁ + 2R₂)C) (astable); T_ON ÷ T_OFF = (R₁ + R₂) ÷ R₂ (mark-space ratio).

## C2.2(a) and C2.2(b) RC networks and capacitor charging

### What you need to know

- How an RC network produces a time delay.
- How the voltage across a charging or discharging capacitor in an RC circuit varies with time, including interpreting decay graphs.

### Explained

A capacitor stores charge. Capacitance C is measured in farads (F); practical values are in µF, nF and pF. When a capacitor is connected through a resistor R to a supply, it does not charge instantly: the resistor limits the current.

Charging (capacitor in series with resistor across supply V_S):

- At the start the capacitor is empty, so the whole supply voltage is across the resistor: the current is largest and the capacitor voltage rises quickly.
- As the capacitor's voltage rises, the voltage across the resistor falls, so the current falls and charging slows.
- The capacitor voltage rises along a curve that levels off towards V_S. It never quite reaches it, but is effectively full after about 5RC.

Discharging (capacitor discharged through a resistor): the voltage falls quickly at first, then more slowly, curving towards 0 V. This shape is an exponential decay: in each equal time interval the voltage falls by the same fraction. After a time equal to RC (the time constant), the voltage has fallen to about 37% of its starting value (and when charging, has risen to about 63% of V_S).

Time delay: the capacitor voltage is fed to a switching circuit (a transistor, comparator or the 555's input), which switches when the voltage crosses its threshold. The time taken to reach the threshold is the delay. Larger R or larger C means a slower change and a longer delay. The product RC (in seconds when R is in ohms and C in farads) sets the timescale.

### Worked example

R = 100 kΩ, C = 220 µF. RC = 100 000 × 0.000220 = 22 s. A charging capacitor reaches about 63% of the supply after 22 s and is effectively fully charged after about 5 × 22 = 110 s.

From a decay graph: if a capacitor's voltage falls from 9 V to 4.5 V in 7 s, it will fall from 4.5 V to 2.25 V in another 7 s (same fraction in the same time).

### Common mistakes

- Drawing charging as a straight line.
- Forgetting to convert µF to F when calculating RC.

## C2.2(c) Changing the delay; monostable and astable graphs

### What you need to know

- How the time delay can be changed by varying R and/or C, including interpreting voltage-time graphs for monostable and astable timers.

### Explained

The delay is proportional to RC: doubling R doubles the delay; doubling C doubles the delay. Use R for fine adjustment (a variable resistor), and C for large range changes.

Monostable output: low (0 V) until triggered; then high for a fixed time T; then low again. It has one stable state (low).

Astable output: switches continuously between high and low: a rectangular wave. It has no stable state. The capacitor voltage in a 555 astable rises and falls between one-third and two-thirds of the supply (a sawtooth-like curved waveform), and the output is high while the capacitor charges and low while it discharges.

### Common mistakes

- Thinking an astable needs a trigger. It runs on its own.

## C2.2(d) and C2.2(h) The 555 monostable

### What you need to know

- The action of a 555 monostable timer; use T = 1.1RC, where T is the pulse duration.
- Draw and analyse a 555 monostable circuit.

### Explained

The 555 is an 8-pin timer IC: pin 1 (0 V), pin 2 (trigger), pin 3 (output), pin 4 (reset), pin 5 (control voltage), pin 6 (threshold), pin 7 (discharge), pin 8 (+V supply).

Monostable circuit: R from +V to pins 6 and 7 (joined); C from pins 6 and 7 to 0 V. The trigger (pin 2) is held high by a pull-up resistor (about 10 kΩ) and taken low by a push switch to 0 V. Reset (pin 4) is connected to +V (or used as a reset button to 0 V). Pin 5 is often connected to 0 V through a 10 nF capacitor to reduce noise. The output (pin 3) drives an LED (with resistor) or a driver.

Action:

1. Before triggering: the output is low and the discharge pin (7) holds the capacitor discharged.
2. When the trigger voltage falls below one-third of the supply (the switch is pressed), the output goes high and the discharge transistor releases the capacitor.
3. The capacitor charges through R. When its voltage reaches two-thirds of the supply (the threshold, pin 6), the output goes low and the capacitor is discharged quickly through pin 7.

The output pulse lasts T = 1.1RC regardless of how long the trigger is held (provided the trigger is released before the end of the pulse). The 555 output can supply up to about 200 mA.

### Worked example

1. R = 47 kΩ, C = 100 µF: T = 1.1 × 47 000 × 0.000100 = 5.2 s.
2. Design a 30 s delay with C = 470 µF: R = T ÷ (1.1C) = 30 ÷ (1.1 × 0.000470) = 58 000 Ω. Nearest E24: 56 kΩ (gives 29 s) or 62 kΩ (32 s).

### Common mistakes

- Triggering with a rising edge. The 555 is triggered by the trigger pin going low (below a third of the supply).
- Leaving pin 4 (reset) unconnected.

## C2.2(e), C2.2(f), C2.2(g) and C2.2(h) The 555 astable

### What you need to know

- The action of a 555 astable timer in terms of period and mark-space ratio.
- Use an oscilloscope (or computer) to measure the amplitude and period of an astable output.
- Select and apply f = 1 ÷ T, f = 1.44 ÷ ((R₁ + 2R₂)C) and T_ON ÷ T_OFF = (R₁ + R₂) ÷ R₂.
- Draw and analyse a 555 astable circuit.

### Explained

Astable circuit: R₁ from +V to pin 7; R₂ from pin 7 to pins 6 and 2 (joined); C from pins 6 and 2 to 0 V. Pin 4 to +V; pin 8 to +V; pin 1 to 0 V; pin 5 to 0 V via 10 nF.

Action: the capacitor charges through R₁ and R₂ in series until it reaches two-thirds of the supply; the output goes low and the capacitor discharges through R₂ only (into pin 7) until it falls to one-third of the supply; the output goes high again and the cycle repeats.

- Mark (T_ON): the time the output is high, while charging through R₁ + R₂.
- Space (T_OFF): the time the output is low, while discharging through R₂ only.
- Period T = T_ON + T_OFF; frequency f = 1 ÷ T.
- Mark-space ratio = T_ON ÷ T_OFF = (R₁ + R₂) ÷ R₂. Because charging goes through both resistors, T_ON is always longer than T_OFF in this circuit, so the ratio is always more than 1. Making R₂ much bigger than R₁ gives a ratio close to 1 (a nearly square wave).

Measuring with an oscilloscope: connect the probe to pin 3 and the earth clip to 0 V. Set the volts/div so the wave fills a good part of the screen and read the amplitude (height from 0 V to the high level) in divisions × volts/div. Set the time/div to show two or three cycles and read the period (from one rising edge to the next) in divisions × time/div. Measure T_ON and T_OFF the same way.

Uses: flashing lights, sound generators (an astable driving a loudspeaker at audio frequency), clock pulses for counters.

### Worked example

R₁ = 1 kΩ, R₂ = 10 kΩ, C = 10 µF.

- f = 1.44 ÷ ((1000 + 20 000) × 0.000010) = 1.44 ÷ 0.21 = 6.9 Hz.
- T = 1 ÷ 6.9 = 0.146 s.
- Mark-space ratio = (1 + 10) ÷ 10 = 1.1.

Design: for a frequency of 1 kHz with C = 10 nF and R₁ = 1 kΩ: R₁ + 2R₂ = 1.44 ÷ (1000 × 10 × 10⁻⁹) = 144 000 Ω, so 2R₂ = 143 000 and R₂ = 71.5 kΩ; nearest E24: 75 kΩ.

Oscilloscope: 2 V/div, 1 ms/div; the wave is 4.5 divisions high and one cycle is 5 divisions long. Amplitude 9 V; period 5 ms; frequency 200 Hz.

### Common mistakes

- Forgetting the 2 in front of R₂.
- Writing the mark-space ratio as R₂ ÷ (R₁ + R₂).
- Measuring the period from a rising edge to the next falling edge (that is only T_ON).

## Check questions

1. Sketch a graph of voltage against time for a capacitor charging through a resistor from a 6 V supply. [2 marks]
2. Explain why the current falls as a capacitor charges through a resistor. [2 marks]
3. State two ways to double the time delay of an RC network. [2 marks]
4. Describe the output of a monostable after it is triggered. [2 marks]
5. A 555 monostable has R = 220 kΩ and C = 47 µF. Calculate the pulse length. [2 marks]
6. Choose a resistor for a 555 monostable to give a 10 s pulse with a 100 µF capacitor. [3 marks]
7. Explain how the 555 monostable is triggered and why a pull-up resistor is used on pin 2. [3 marks]
8. A 555 astable has R₁ = 4.7 kΩ, R₂ = 47 kΩ, C = 1 µF. Calculate its frequency and mark-space ratio. [4 marks]
9. Explain why the mark-space ratio of a standard 555 astable is always greater than 1. [2 marks]
10. An oscilloscope is set to 5 V/div and 0.2 ms/div. A 555 output is 1.8 divisions high, high for 3 divisions and low for 2 divisions. Calculate the amplitude, period, frequency and mark-space ratio. [4 marks]

## Mark scheme

1. Curve starting at 0 V rising steeply then levelling (1) towards 6 V (1).
2. As the capacitor voltage rises, the voltage across the resistor falls (1), so I = V ÷ R across the resistor falls (1).
3. Double R (1); double C (1).
4. Output goes high for a fixed time (1), then returns low (stable state) (1).
5. T = 1.1 × 220 000 × 47 × 10⁻⁶ (1) = 11.4 s (1).
6. R = 10 ÷ (1.1 × 100 × 10⁻⁶) (1) = 90 900 Ω (1); E24 91 kΩ (1).
7. Triggered when pin 2 falls below one-third of the supply (1), e.g. by a push switch to 0 V (1); the pull-up resistor holds pin 2 high when the switch is not pressed, so it is not triggered by noise / floating (1).
8. f = 1.44 ÷ ((4700 + 94 000) × 1 × 10⁻⁶) (1) = 1.44 ÷ 0.0987 = 14.6 Hz (1). Ratio = (4.7 + 47) ÷ 47 (1) = 1.1 (1).
9. The capacitor charges through R₁ + R₂ but discharges through R₂ only (1), so the charging (high) time is longer than the discharging (low) time (1).
10. Amplitude 1.8 × 5 = 9 V (1); period 5 × 0.2 = 1.0 ms (1); frequency 1000 Hz (1); mark-space ratio 3 ÷ 2 = 1.5 (1).
