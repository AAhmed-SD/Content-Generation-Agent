---
board: Eduqas
level: GCSE
subject: Electronics
code: "C490QS"
also_covers: []
topic: "Component 1 Topic 4 Switching circuits"
spec_refs: ["C1.4(a)", "C1.4(b)", "C1.4(c)", "C1.4(d)", "C1.4(e)", "C1.4(f)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-gcse/
pmt_url: null
---

# C1.4 Switching circuits

A sensing circuit gives a voltage that changes gradually. To turn a load fully on or off at the right moment, a switching circuit is needed. This topic covers the n-channel enhancement mode MOSFET, the npn bipolar transistor and the voltage comparator IC, with their equations, how they compare, and how data sheets are used.

Equations (given in a list): I_D = g_M(V_GS − 3); I_C = h_FE × I_B.

## C1.4(a) and C1.4(b) MOSFETs and npn transistors as switches; the MOSFET equation

### What you need to know

- The operation and use of n-channel enhancement mode MOSFETs and npn transistors in switching circuits, including circuits that interface to outputs.
- Select and apply I_D = g_M(V_GS − 3).

### Explained

n-channel enhancement mode MOSFET: three terminals, gate (G), drain (D) and source (S). In a switching circuit, the source goes to 0 V, the load goes between the positive supply and the drain, and the input signal (from a voltage divider, logic gate or microcontroller) goes to the gate.

- The gate is insulated from the rest of the MOSFET, so (almost) no current flows into it. The MOSFET is controlled by voltage: V_GS is the voltage between gate and source.
- When V_GS is below the threshold voltage (about 3 V for the devices used in this course), no drain current flows: the MOSFET is off and the load is off.
- Above the threshold, drain current flows: I_D = g_M(V_GS − 3), where g_M is the transconductance (in A/V, or siemens) from the data sheet. The current rises quickly with V_GS until the MOSFET is fully on (saturated), when the current is limited by the load and supply. A fully on MOSFET has a very low resistance between drain and source (often well under 1 Ω), so it wastes very little power.
- Because the gate draws no current, a MOSFET does not load the voltage divider that drives it, so the divider's output voltage is not pulled down.
- A MOSFET can be damaged by static electricity on its gate; handle with care.

npn bipolar transistor: three terminals, base (B), collector (C) and emitter (E). The emitter goes to 0 V, the load between the positive supply and the collector, and the input signal to the base through a base resistor (to limit the base current).

- A small current into the base controls a much larger current from collector to emitter: the transistor is current-controlled.
- It needs a current from the input circuit, so it can load a voltage divider.

Interfacing to outputs: either device can switch a lamp, motor, buzzer, solenoid or relay coil. Inductive loads (motors, relays, solenoids) need a protective diode across them (C1.5).

### Worked example

A MOSFET has g_M = 0.4 A/V. With V_GS = 4.5 V: I_D = 0.4 × (4.5 − 3) = 0.6 A. With V_GS = 2.5 V the MOSFET is off (below 3 V), so I_D = 0.

To give I_D = 0.2 A: V_GS − 3 = 0.2 ÷ 0.4 = 0.5, so V_GS = 3.5 V.

### Common mistakes

- Saying a MOSFET needs a base current. It is controlled by gate voltage and draws almost no gate current.
- Using the equation below 3 V, which would give a negative current: the MOSFET is simply off.

## C1.4(c) npn transistor rules and current gain

### What you need to know

- For V_IN < 0.7 V the transistor is off: V_BE = V_IN and V_CE = the supply voltage.
- For V_IN ≥ 0.7 V the transistor is on: V_BE = 0.7 V and V_CE = 0 V.
- Select and apply I_C = h_FE × I_B until saturation is reached.

### Explained

The base-emitter junction behaves like a diode. Below about 0.7 V it does not conduct, so no base current and no collector current flow. The transistor is off: no current through the load, so no voltage is dropped across the load, and the collector sits at the supply voltage (V_CE = supply).

At 0.7 V and above, base current flows and V_BE stays at about 0.7 V; the extra input voltage is dropped across the base resistor. Base current I_B = (V_IN − 0.7) ÷ R_B.

The collector current is h_FE times the base current, where h_FE (the current gain, often 100 or more) is from the data sheet. As I_B increases, I_C increases, until the transistor is saturated: fully on, with V_CE ≈ 0 V, so the whole supply voltage is across the load and the current is limited by the load: I_C(max) = V_supply ÷ R_load. Increasing I_B further cannot increase I_C. For a switch, the base current is chosen to be large enough to saturate the transistor, so it is either fully off or fully on and wastes little power.

### Worked example

A transistor with h_FE = 150 has R_B = 10 kΩ. The load is a 60 Ω lamp on 6 V.

- V_IN = 0.5 V: off. I_C = 0. V_CE = 6 V.
- V_IN = 2.2 V: I_B = (2.2 − 0.7) ÷ 10 000 = 0.15 mA. h_FE × I_B = 150 × 0.15 mA = 22.5 mA.
- Maximum possible I_C = 6 ÷ 60 = 100 mA, so 22.5 mA is below saturation; the lamp is dim.
- To saturate, I_B ≥ 100 mA ÷ 150 = 0.67 mA, so V_IN ≥ 0.7 + 0.67 mA × 10 kΩ = 7.4 V, or choose a smaller R_B. With V_IN = 5 V, R_B ≤ (5 − 0.7) ÷ 0.00067 ≈ 6.4 kΩ; choose 4.7 kΩ to be sure.

### Common mistakes

- Forgetting to subtract 0.7 V when calculating base current.
- Applying I_C = h_FE I_B beyond saturation (giving a current larger than the load allows).
- Saying V_CE = 0 when the transistor is off. It equals the supply.

## C1.4(d) Voltage comparator ICs

### What you need to know

- The operation and use of voltage comparator ICs.

### Explained

A comparator has two inputs, non-inverting (+) and inverting (−), and one output.

- If V₊ > V₋, the output goes high (close to the positive supply).
- If V₊ < V₋, the output goes low (close to 0 V).

In a sensing circuit, one input is connected to the sensor voltage divider and the other to a reference voltage from a second voltage divider (or a potentiometer for adjustment). When the sensor voltage crosses the reference, the output switches sharply from low to high or high to low: a clean digital signal from a slowly changing analogue one. Swapping the two inputs reverses the action.

The comparator's inputs draw almost no current, so they do not load the dividers. Many comparators have an "open collector" output and need a pull-up resistor; the output can drive a logic gate, an LED (with resistor), or a MOSFET or transistor driver for a larger load.

### Worked example

The reference divider is two 10 kΩ resistors on 9 V, giving 4.5 V to the − input. A thermistor divider feeds the + input. Below 4.5 V on the + input, output low; above 4.5 V, output high. So the switching point is when the thermistor divider gives 4.5 V, which can be adjusted by changing the reference divider (for example with a potentiometer).

### Common mistakes

- Saying the comparator output follows the input gradually. It switches fully high or low.
- Mixing up which input must be bigger for a high output.

## C1.4(e) and C1.4(f) Comparing switching circuits and using data sheets

### What you need to know

- Compare switching circuits based on MOSFETs, npn transistors and voltage comparator ICs.
- Use data sheets to design switching circuits.

### Explained

| | npn transistor | n-channel MOSFET | Comparator IC |
| --- | --- | --- | --- |
| Controlled by | Base current (input ≥ 0.7 V) | Gate voltage (above about 3 V) | Difference between two input voltages |
| Input current | Needs base current; loads the divider | Almost none | Almost none |
| Switching point | About 0.7 V (fixed; set by the divider design) | About 3 V (varies between devices) | Set precisely by a reference voltage; easily adjustable |
| Sharpness of switching | Gradual near the threshold | Gradual over a small range | Very sharp |
| Output current | Moderate (hundreds of mA for small types) | Large (amps), very low on-resistance | Small (needs a driver for large loads) |
| Extra parts | Base resistor | Often a gate resistor; static protection | Reference divider; often a pull-up resistor |
| Cost and complexity | Cheap, simple | Cheap, simple | IC; slightly more complex |

So a comparator gives the most precise, sharp switching point but usually needs a transistor or MOSFET driver for a heavy load. A MOSFET is best for driving large currents directly with almost no input current. A transistor is cheap and simple for small loads.

Data sheets give each device's limits and characteristics. For a design, check:

- Transistor: maximum collector current I_C(max), maximum V_CE, current gain h_FE (minimum value), maximum power, pin-out (which leg is B, C, E).
- MOSFET: maximum drain current I_D(max), maximum V_DS, threshold voltage V_GS(th), transconductance g_M, on-resistance R_DS(on), pin-out (G, D, S).
- Comparator: supply voltage range, output type (open collector or push-pull), maximum output current, pin-out.

Choose a device with maximum ratings comfortably above what the circuit needs (for example a load current of 0.8 A needs a device rated well over 0.8 A).

### Common mistakes

- Choosing a transistor whose maximum collector current is below the load current.
- Using the typical h_FE instead of the minimum value when designing for saturation.

## Check questions

1. Explain why a MOSFET is called a voltage-controlled device. [2 marks]
2. A MOSFET has g_M = 0.25 A/V. Calculate the drain current when V_GS = 6 V. [2 marks]
3. A MOSFET drives a motor that needs 0.75 A. Its g_M is 0.5 A/V. Calculate the minimum V_GS. [2 marks]
4. For an npn transistor on a 9 V supply, state V_BE and V_CE when V_IN = (a) 0.4 V, (b) 3 V (transistor saturated). [4 marks]
5. A transistor with h_FE = 200 has a base resistor of 22 kΩ and V_IN = 5 V. Calculate I_B and the collector current, assuming it is not saturated. [3 marks]
6. Explain what is meant by saturation of a transistor switch. [2 marks]
7. Describe how a comparator can switch on an LED when it gets dark. Include the inputs used. [4 marks]
8. Give two advantages of using a comparator rather than a transistor to switch at a particular light level. [2 marks]
9. Explain why a MOSFET is often chosen in preference to an npn transistor when driving a motor from a sensor divider. [3 marks]
10. Name two values a designer would check on a MOSFET data sheet before using it to switch a 2 A load on a 12 V supply. [2 marks]

## Mark scheme

1. The drain current is controlled by the gate-source voltage (1); almost no current flows into the gate (1).
2. I_D = 0.25 × (6 − 3) (1) = 0.75 A (1).
3. 0.75 = 0.5 × (V_GS − 3) (1); V_GS = 4.5 V (1).
4. (a) V_BE = 0.4 V (1); V_CE = 9 V (1). (b) V_BE = 0.7 V (1); V_CE = 0 V (1).
5. I_B = (5 − 0.7) ÷ 22 000 (1) = 0.195 mA (1); I_C = 200 × 0.195 mA = 39 mA (1).
6. The transistor is fully on (1); the collector current is limited by the load, not by the base current, and V_CE ≈ 0 V (1).
7. Light sensor voltage divider (e.g. LDR at bottom, so voltage rises in the dark) to the + input (1); reference voltage from another divider / potentiometer to the − input (1); when dark, V₊ > V₋ so output goes high (1); LED with series resistor from output to 0 V lights (1).
8. Any two: sharp / precise switching (1); easily adjustable switching point (1); draws almost no current from the sensor divider (1).
9. The MOSFET draws almost no gate current, so it does not load the divider (1); it can switch large currents (1); with low on-resistance it wastes little power / stays cool (1).
10. Any two: maximum drain current (above 2 A) (1); maximum V_DS (above 12 V) (1); threshold voltage / g_M (1); on-resistance / power rating (1).
