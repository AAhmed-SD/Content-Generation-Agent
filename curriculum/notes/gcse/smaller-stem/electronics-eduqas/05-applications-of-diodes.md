---
board: Eduqas
level: GCSE
subject: Electronics
code: "C490QS"
also_covers: []
topic: "Component 1 Topic 5 Applications of diodes"
spec_refs: ["C1.5(a)", "C1.5(b)", "C1.5(c)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-gcse/
pmt_url: null
---

# C1.5 Applications of diodes

A diode lets current flow easily in one direction only. This topic covers the current-voltage characteristic of a silicon diode, using diodes to protect components and to rectify AC, and using zener diodes to hold a voltage steady.

## C1.5(a) The silicon diode I-V characteristic

### What you need to know

- Describe the I-V characteristic of a silicon diode.

### Explained

A diode has two terminals: the anode (+) and the cathode (−), marked by a band on the body. The symbol is a triangle pointing in the direction of conventional current, with a bar at the cathode.

- Forward bias (anode more positive than cathode): almost no current flows until the voltage across the diode reaches about 0.6 to 0.7 V (the forward voltage for silicon). Above this, the current rises very steeply, while the voltage across the diode stays at about 0.7 V. So when conducting, a silicon diode "drops" about 0.7 V. A series resistor is needed to limit the current.
- Reverse bias (cathode more positive than anode): only a tiny leakage current flows (effectively zero); the diode acts like an open switch. If the reverse voltage exceeds the breakdown voltage (often 50 V to over 1000 V for rectifier diodes), a large current flows and an ordinary diode is usually destroyed.

On an I-V graph (current up, voltage across), the line lies along the voltage axis for negative voltages and for small positive voltages, then turns sharply upwards at about 0.7 V.

To measure it: diode in series with a resistor and an ammeter on a variable supply, voltmeter across the diode; record pairs of readings, more closely spaced near 0.7 V; reverse the diode for the reverse-bias readings. Simulation software can also plot it.

### Worked example

A silicon diode and a 1 kΩ resistor are in series across 5 V, forward biased. Voltage across the resistor = 5 − 0.7 = 4.3 V. Current = 4.3 ÷ 1000 = 4.3 mA. If the diode is reversed, current ≈ 0 and the whole 5 V appears across the diode.

### Common mistakes

- Saying the diode conducts as soon as any forward voltage is applied.
- Forgetting the 0.7 V drop in calculations.

## C1.5(b) Protection diodes and half-wave rectification

### What you need to know

- The use of diodes to protect components in DC circuits.
- The use of diodes for half-wave rectification of AC.

### Explained

Protection against reverse polarity: a diode in series with the supply lead lets current flow only if the battery is connected the right way round. If it is connected backwards, the diode blocks the current and protects sensitive components such as ICs and electrolytic capacitors. The cost is a 0.7 V drop when working normally.

Protection against back-e.m.f. from inductive loads: a relay coil, motor or solenoid stores energy in its magnetic field. When the transistor or MOSFET switches it off, the collapsing field induces a large voltage spike (back-e.m.f.) in the opposite direction, which can be hundreds of volts and can destroy the switching device. A diode is connected in parallel with the coil, reverse biased in normal operation (cathode to the positive supply). In normal running it does nothing. When the current is switched off, the spike forward-biases the diode, which conducts and lets the current die away harmlessly round the loop of coil and diode, limiting the voltage. This is often called a flywheel, freewheel or clamp diode.

Half-wave rectification: an AC supply reverses direction many times a second. A single diode in series with the load lets current through only during the half-cycles when the anode is positive. During the other half-cycles it blocks. The output across the load is a series of positive humps with gaps between: a varying DC (it flows in one direction only, but is not steady). Each peak is about 0.7 V less than the AC peak. A large smoothing capacitor across the load (C2.2) charges at each peak and supplies current during the gaps, smoothing the output, with a small ripple left.

### Worked example

An AC supply has a peak voltage of 12 V. After half-wave rectification with a silicon diode, the peak output is 12 − 0.7 = 11.3 V. If the AC frequency is 50 Hz, there is one hump every 1 ÷ 50 = 20 ms.

### Common mistakes

- Drawing the protection diode across a relay coil the wrong way round (forward biased would short the supply).
- Saying half-wave rectification gives smooth DC. It gives pulses.

## C1.5(c) Zener diode voltage regulation

### What you need to know

- The use of zener diodes in voltage regulation circuits.

### Explained

A zener diode is designed to be used in reverse bias. When the reverse voltage reaches its zener (breakdown) voltage V_Z (for example 3.3 V, 5.1 V, 9.1 V), it conducts, and the voltage across it then stays almost constant over a wide range of currents. Unlike an ordinary diode, it is not damaged, as long as its power rating is not exceeded. In forward bias it behaves like a normal diode (0.7 V).

Simple regulator: a resistor in series with the zener across an unregulated supply, with the zener reverse biased (cathode towards positive). The load is connected in parallel with the zener. The zener keeps the output (load) voltage fixed at V_Z even if the input voltage varies, or the load current changes, within limits. The series resistor drops the extra voltage (V_IN − V_Z) and limits the current.

Current through the series resistor = (V_IN − V_Z) ÷ R. This current is shared: some goes to the load and the rest through the zener. The resistor must be chosen so that enough current always flows through the zener to keep it in breakdown, even with the largest load current and lowest input voltage.

Uses: providing a steady reference voltage for a comparator; protecting inputs from voltages that are too high; simple low-current power supplies.

### Worked example

A 5.1 V zener regulates a supply that varies from 9 V to 12 V, using a 270 Ω series resistor and a load drawing 10 mA.

- At 9 V: resistor current = (9 − 5.1) ÷ 270 = 14.4 mA. Zener current = 14.4 − 10 = 4.4 mA. Output 5.1 V.
- At 12 V: resistor current = (12 − 5.1) ÷ 270 = 25.6 mA. Zener current = 15.6 mA. Output still 5.1 V.
- Zener power at 12 V = 5.1 × 0.0156 = 0.08 W, well within a 0.5 W rating.

### Common mistakes

- Connecting the zener forward biased in a regulator: it would only give 0.7 V.
- Leaving out the series resistor, which would let a damaging current flow.

## Check questions

1. Sketch the I-V characteristic of a silicon diode and label the forward voltage. [3 marks]
2. A silicon diode and a 680 Ω resistor are connected in series to a 9 V supply, with the diode forward biased. Calculate the current. [2 marks]
3. Explain how a diode in series with a battery protects a circuit. [2 marks]
4. Explain why a diode is connected across a relay coil that is switched by a transistor. [4 marks]
5. Sketch the input and output voltage-time graphs for a half-wave rectifier. [3 marks]
6. State one difference between the behaviour of a zener diode and an ordinary silicon diode in reverse bias. [1 mark]
7. A 6.2 V zener and a 330 Ω resistor regulate a 15 V supply for a load drawing 12 mA. Calculate the current through the zener. [3 marks]
8. Explain why the output voltage stays constant when the input to a zener regulator rises. [2 marks]

## Mark scheme

1. Zero current in reverse (1); almost zero in forward bias until about 0.7 V (1); steep rise after 0.7 V, labelled (1).
2. (9 − 0.7) ÷ 680 (1) = 12.2 mA (1).
3. Current can only flow if the battery is connected the correct way round (1); if reversed, the diode blocks current, protecting components from reverse polarity (1).
4. When the coil is switched off, its collapsing magnetic field (1) induces a large reverse voltage / back-e.m.f. (1) which could damage the transistor (1); the diode conducts this current safely round the coil, limiting the voltage (1).
5. Input: sine wave, positive and negative halves (1). Output: positive half-cycles only (1), with gaps where the negative halves were, peaks slightly lower (by 0.7 V) (1).
6. A zener conducts at a set breakdown (zener) voltage without damage / holds a constant voltage; an ordinary diode blocks until it breaks down and is destroyed (1).
7. Resistor current = (15 − 6.2) ÷ 330 = 26.7 mA (1)(1); zener current = 26.7 − 12 = 14.7 mA (1).
8. The extra input voltage is dropped across the series resistor (1); the zener takes the extra current and its voltage stays at V_Z (1).
