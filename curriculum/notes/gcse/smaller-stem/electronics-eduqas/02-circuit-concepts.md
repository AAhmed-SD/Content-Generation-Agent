---
board: Eduqas
level: GCSE
subject: Electronics
code: "C490QS"
also_covers: []
topic: "Component 1 Topic 2 Circuit concepts"
spec_refs: ["C1.2(a)", "C1.2(b)", "C1.2(c)", "C1.2(d)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-gcse/
pmt_url: null
---

# C1.2 Circuit concepts

This topic covers circuit diagrams, the rules for current and voltage in series and parallel circuits, the test equipment used to measure circuits, and calculations of voltage, current, resistance, power and energy. Background on the physics of current and charge is in [AQA GCSE Physics 4.2](../../../aqa/gcse/physics-8463/4.2-electricity.md).

Equations to recall: V = IR; P = VI; P = I²R; E = Pt. Given in a list: P = V² ÷ R.

## C1.2(a) Circuit symbols and conventions

### What you need to know

- Draw, communicate and analyse circuits using standard symbols and conventions.

### Explained

Circuit diagrams use standard symbols (the spec's Appendix D lists them) so anyone can read them. Main symbols to know: cell and battery; DC power supply; switch (push-to-make, push-to-break, on/off); fixed resistor; variable resistor and potentiometer; LDR; thermistor; diode; LED; zener diode; capacitor (non-polarised and polarised/electrolytic); lamp; buzzer; loudspeaker; microphone; motor; solenoid; relay; fuse; npn transistor; n-channel MOSFET; op-amp; logic gates; ammeter; voltmeter; 0 V (ground) symbol.

Conventions:

- Draw wires as straight horizontal and vertical lines.
- A dot shows where wires join; wires crossing with no dot are not connected.
- Draw the positive supply rail at the top and the 0 V rail at the bottom, so voltage falls from top to bottom and signals flow from left (input) to right (output).
- Label component values (such as 10 kΩ, 100 µF) and supply voltages.
- Often the supply is not drawn as a battery: the top line is marked +V (for example +9 V) and the bottom line 0 V.

### Common mistakes

- Drawing a dot where wires cross but do not connect.
- Drawing an electrolytic capacitor without marking its polarity.

## C1.2(b) Current and voltage rules

### What you need to know

- Apply the current and voltage rules in series and parallel circuits.

### Explained

Current is the rate of flow of charge, measured in amperes (A). Voltage (potential difference) is the energy transferred per unit charge between two points, measured in volts (V).

Series circuit (one path):

- The current is the same at every point: I = I₁ = I₂.
- The supply voltage is shared between the components: V = V₁ + V₂. The largest resistance gets the largest share.

Parallel circuit (branches):

- The voltage across each branch is the same, equal to the supply voltage: V = V₁ = V₂.
- The current from the supply splits between the branches and recombines: I = I₁ + I₂. The branch with the smallest resistance takes the largest current.

### Worked example

A 9 V supply is connected to a 1 kΩ and a 2 kΩ resistor in series. Total resistance 3 kΩ. Current = 9 ÷ 3000 = 3 mA (same through both). V₁ = 0.003 × 1000 = 3 V; V₂ = 6 V; total 9 V.

The same resistors in parallel on 9 V: I₁ = 9 ÷ 1000 = 9 mA, I₂ = 9 ÷ 2000 = 4.5 mA, supply current = 13.5 mA.

### Common mistakes

- Saying current is "used up" by components. The same current flows through every part of a series circuit.
- Splitting voltage between parallel branches.

## C1.2(c) Test equipment

### What you need to know

- Use test equipment to test components and circuits: multimeters (voltage, current and resistance ranges), timing equipment, logic probes and oscilloscopes (or computers set up as oscilloscopes), including investigating current-voltage characteristics.

### Explained

- Multimeter on voltage: connected in parallel across the component (its probes on either side). It has a very high resistance so it hardly affects the circuit. Choose DC or AC and a suitable range (start high).
- Multimeter on current: connected in series, by breaking the circuit and inserting the meter, so all the current passes through it. It has a very low resistance. Using the current range across a component can short-circuit it and blow the meter's fuse.
- Multimeter on resistance: measures the resistance of a component that has been disconnected from the circuit (the meter supplies its own small current). Measuring in circuit gives wrong readings because of other parallel paths.
- Timing equipment: a stopwatch for slow events (such as a time delay of several seconds), or a data logger / oscilloscope for fast events.
- Logic probe: touched onto a digital circuit, it lights a red LED for logic 1 (high), a green LED for logic 0 (low), and may flash for a pulsing signal. It quickly shows logic states when fault-finding.
- Oscilloscope: displays a graph of voltage (vertical) against time (horizontal). The volts/division control sets the vertical scale; the time/division control sets the horizontal scale. It shows the shape, amplitude (peak voltage) and period of changing signals such as the output of an astable or an amplifier (C2.1, C2.2). A computer with an interface and software can do the same job.

Current-voltage (I-V) characteristics: connect the component in series with a variable supply (or a potentiometer) and an ammeter, with a voltmeter across the component. Change the voltage in steps, recording V and I each time; reverse the supply to get negative values. Plot I (vertical) against V (horizontal).

| Component | I-V graph |
| --- | --- |
| Fixed resistor (at constant temperature) | Straight line through the origin: current proportional to voltage (ohmic); gradient = 1/R |
| Filament lamp | Curve that flattens at higher voltages: as it heats up, its resistance increases |
| Silicon diode | Almost no current in reverse; in forward bias, almost no current until about 0.7 V, then current rises steeply (C1.5) |

### Worked example

On an oscilloscope set to 2 V/div and 0.5 ms/div, a square wave is 3 divisions high and one cycle is 4 divisions wide. Amplitude = 3 × 2 = 6 V. Period = 4 × 0.5 = 2 ms. Frequency = 1 ÷ 0.002 = 500 Hz.

### Common mistakes

- Connecting an ammeter in parallel.
- Measuring resistance of a component while the circuit is powered.
- Reading oscilloscope divisions without multiplying by the scale.

## C1.2(d) Voltage, current, resistance, energy and power

### What you need to know

- Analyse circuits in terms of voltage, current, resistance, energy and power using: V = IR; P = VI; P = I²R; E = Pt; and select and apply P = V² ÷ R.

### Explained

- Resistance (ohms, Ω) is how much a component opposes current. V = IR: for a given voltage, a larger resistance means a smaller current.
- Power (watts, W) is the rate of energy transfer. P = VI. Substituting V = IR gives P = I²R; substituting I = V/R gives P = V²/R. Use whichever form matches the information given.
- Energy (joules, J) transferred = power × time: E = Pt, with t in seconds.

Prefixes: p (10⁻¹²), n (10⁻⁹), µ (10⁻⁶), m (10⁻³), k (10³), M (10⁶), G (10⁹), T (10¹²). Convert to base units before calculating, or use matching pairs (V, mA and kΩ go together, since 1 mA × 1 kΩ = 1 V).

Power matters in electronics because components have maximum power ratings (resistors are commonly 0.25 W); exceeding them makes them overheat and fail.

### Worked example

1. A 470 Ω resistor carries 20 mA. V = 0.020 × 470 = 9.4 V. P = I²R = 0.020² × 470 = 0.188 W, so a 0.25 W resistor is just adequate.
2. A 12 V motor draws 1.5 A. P = 12 × 1.5 = 18 W. In 5 minutes it transfers E = 18 × 300 = 5400 J.
3. A 100 Ω resistor has 6 V across it. P = V²/R = 36 ÷ 100 = 0.36 W: too much for a 0.25 W resistor.
4. Rearranging: a heater is rated at 24 W on 12 V. I = P ÷ V = 2 A; R = V ÷ I = 6 Ω.

### Common mistakes

- Using minutes instead of seconds in E = Pt.
- Forgetting to square in P = I²R or P = V²/R.
- Mixing mA with Ω (not kΩ) without converting.

## Check questions

1. State how a voltmeter and an ammeter are connected in a circuit and explain why their resistances are very high and very low respectively. [4 marks]
2. A 6 V battery is connected across a 220 Ω and a 330 Ω resistor in series. Calculate the current and the voltage across each resistor. [4 marks]
3. Two lamps are in parallel on a 12 V supply. One draws 0.5 A and the other 1.5 A. State the voltage across each lamp and the total supply current. [2 marks]
4. Describe the purpose of a logic probe. [2 marks]
5. An oscilloscope is set to 5 V/div and 10 µs/div. A signal has a peak height of 2.4 divisions and a period of 5 divisions. Calculate its amplitude and frequency. [4 marks]
6. Sketch the I-V characteristic of a filament lamp and explain its shape. [3 marks]
7. Calculate the power dissipated in a 1.2 kΩ resistor carrying 15 mA. [2 marks]
8. A 3.3 V LED circuit draws 12 mA for 8 hours. Calculate the energy transferred. [3 marks]
9. A 47 Ω resistor is connected across 5 V. Select a suitable equation and calculate the power. Is a 0.25 W resistor suitable? [3 marks]

## Mark scheme

1. Voltmeter in parallel (1); very high resistance so it draws almost no current and does not change the circuit (1). Ammeter in series (1); very low resistance so it does not reduce the current (1).
2. R = 550 Ω; I = 6 ÷ 550 = 0.0109 A = 10.9 mA (1)(1); V₁ = 0.0109 × 220 = 2.4 V (1); V₂ = 3.6 V (1).
3. 12 V each (1); 2.0 A (1).
4. To show whether a point in a digital circuit is at logic 1 or 0 / pulsing (1), for testing and fault-finding (1).
5. Amplitude = 2.4 × 5 = 12 V (1)(1). Period = 5 × 10 µs = 50 µs (1); f = 1 ÷ 50 × 10⁻⁶ = 20 000 Hz (20 kHz) (1).
6. Curve through the origin, getting less steep at higher voltages, same shape in both directions (1). As current increases the filament gets hotter (1), so its resistance increases (1).
7. P = I²R = 0.015² × 1200 (1) = 0.27 W (1).
8. P = 3.3 × 0.012 = 0.0396 W (1); t = 8 × 3600 = 28 800 s (1); E = 1140 J (1).
9. P = V²/R (1) = 25 ÷ 47 = 0.53 W (1); no, it exceeds 0.25 W (1).
