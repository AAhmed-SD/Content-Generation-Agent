---
board: Eduqas
level: GCSE
subject: Electronics
code: "C490QS"
also_covers: []
topic: "Component 1 Topic 3 Resistive components in circuits"
spec_refs: ["C1.3(a)", "C1.3(b)", "C1.3(c)", "C1.3(d)", "C1.3(e)", "C1.3(f)", "C1.3(g)", "C1.3(h)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-gcse/
pmt_url: null
---

# C1.3 Resistive components in circuits

Resistors set currents and voltages; sensors that change resistance are the inputs of most systems. This topic covers combining resistors, choosing real resistor values, the common input components, voltage dividers for sensing, pull-up and pull-down resistors for switches, and current-limiting resistors for LEDs.

Equations to recall: series R = R₁ + R₂; parallel R = R₁R₂ ÷ (R₁ + R₂). Given in a list: V_OUT = V_IN × R₂ ÷ (R₁ + R₂).

## C1.3(a) and C1.3(b) Resistors in series and parallel

### What you need to know

- The effect of adding resistors in series and in parallel.
- Use R = R₁ + R₂ (series) and R = R₁R₂ ÷ (R₁ + R₂) (parallel, two resistors).

### Explained

- Series: adding a resistor in series always increases the total resistance, because the current has to pass through both. The total is the sum.
- Parallel: adding a resistor in parallel always decreases the total resistance, because it gives the current an extra path. The total is less than the smallest resistor. For two equal resistors, the total is half of one.

The "product over sum" formula works for two resistors at a time. For more, combine two, then combine the result with the next. For a mixed network, simplify the parallel groups first, then add the series parts.

### Worked example

1. 4.7 kΩ and 2.2 kΩ in series: 6.9 kΩ.
2. 4.7 kΩ and 2.2 kΩ in parallel: (4.7 × 2.2) ÷ (4.7 + 2.2) = 10.34 ÷ 6.9 = 1.5 kΩ.
3. Two 10 kΩ in parallel (5 kΩ), in series with a 3.3 kΩ: 8.3 kΩ.

### Common mistakes

- Using 1/R₁ + 1/R₂ and forgetting to take the reciprocal at the end (with product-over-sum this cannot happen).
- Getting a parallel total larger than one of the resistors: check your answer.

## C1.3(c) Choosing resistors: colour code, E24, tolerance, power rating

### What you need to know

- Select resistors using the colour code and E24 values, including tolerance and power rating.

### Explained

Colour code (four-band resistors): band 1 = first digit, band 2 = second digit, band 3 = multiplier (number of zeros), band 4 = tolerance.

| Colour | Digit / zeros |
| --- | --- |
| Black | 0 |
| Brown | 1 |
| Red | 2 |
| Orange | 3 |
| Yellow | 4 |
| Green | 5 |
| Blue | 6 |
| Violet | 7 |
| Grey | 8 |
| White | 9 |

Tolerance band: gold ±5%, silver ±10%, brown ±1%, red ±2%. (Five-band resistors have three digit bands.) For example, yellow-violet-red-gold = 4, 7, 00 = 4700 Ω = 4.7 kΩ ±5%.

The printed code on circuit diagrams avoids decimal points: 4K7 = 4.7 kΩ, 470R = 470 Ω, 1M0 = 1 MΩ.

E24 series: resistors are only made in standard (preferred) values. The E24 series has 24 values in each decade: 1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1, and these × 10, × 100, × 1000 and so on. The values are spaced so that, with ±5% tolerance, the possible ranges of neighbouring values roughly meet, so every resistance is covered. When a calculation gives a value that is not in the series, choose the nearest E24 value, or the next value that keeps the circuit safe (for an LED, the next larger value, so the current is not too large).

Tolerance: a 1 kΩ ±5% resistor can be anywhere from 950 Ω to 1050 Ω. Tighter tolerances cost more.

Power rating: the maximum power a resistor can dissipate without overheating, typically 0.25 W or 0.5 W for small resistors. Check with P = I²R or P = V²/R and choose a rating above the calculated value.

### Worked example

A calculation gives 3.5 kΩ. Nearest E24 values are 3.3 kΩ and 3.6 kΩ; 3.6 kΩ is nearer. A 220 Ω ±5% resistor has range 209 Ω to 231 Ω.

### Common mistakes

- Reading the third band as a digit rather than the number of zeros.
- Choosing a non-standard value such as 3.5 kΩ in an answer that asks for an E24 value.

## C1.3(d) Input components

### What you need to know

- Use photosensitive devices, NTC thermistors, pressure sensors, moisture sensors, sound sensors, switches, potentiometers and pulse generators in circuits.

### Explained

| Component | Behaviour |
| --- | --- |
| LDR (light-dependent resistor) | Resistance high in the dark (about 1 MΩ), low in bright light (a few hundred ohms). Slow response |
| Photodiode / phototransistor | Photosensitive semiconductor; faster response than an LDR; current increases with light |
| NTC thermistor | Negative temperature coefficient: resistance falls as temperature rises |
| Pressure sensor | Pressure pad or force-sensitive resistor: resistance falls (or contacts close) as force increases |
| Moisture sensor | Two probes: resistance between them is high when dry and falls when wet |
| Sound sensor | Microphone with amplifier, giving a voltage that rises with sound level |
| Switches | Push-to-make, push-to-break, toggle, microswitch, reed switch: resistance zero (closed) or infinite (open) |
| Potentiometer | Variable resistor with a sliding contact; used as an adjustable voltage divider (to set a threshold or volume) |
| Pulse generator | Provides a stream of digital pulses (a clock signal), for example from a 555 astable (C2.2) |

### Common mistakes

- Saying an LDR's resistance rises in light.
- Saying NTC thermistors increase resistance with temperature.

## C1.3(e) and C1.3(g) Voltage dividers and sensing circuits

### What you need to know

- Design and test sensing circuits by placing these components in voltage dividers.
- Select and apply V_OUT = V_IN × R₂ ÷ (R₁ + R₂).

### Explained

A voltage divider is two resistances in series across a supply. The supply voltage is shared in proportion to the resistances. The output is taken across R₂, the lower resistance (between the output and 0 V).

V_OUT = V_IN × R₂ ÷ (R₁ + R₂)

If R₂ increases, V_OUT increases. If R₁ increases, V_OUT decreases.

To make a sensing circuit, one of the two resistances is a sensor:

- LDR as R₂ (bottom), fixed resistor as R₁ (top): in the dark the LDR resistance is high, so V_OUT is high. Output rises as it gets darker: a darkness sensor.
- Swap them (LDR at the top): V_OUT rises as it gets lighter: a light sensor.
- Thermistor at the bottom: V_OUT falls as temperature rises (cold sensor, output high when cold). Thermistor at the top: V_OUT rises with temperature (heat sensor).

Choosing the fixed resistor: for the biggest change in output around the switching point, make the fixed resistor about equal to the sensor's resistance at that point. Using a potentiometer (or a fixed resistor with a variable resistor) lets the switching point be adjusted.

The output connects to the next stage (for example a transistor or comparator), which should draw little current so it does not upset the divider.

### Worked example

1. A thermistor (R₂) and 10 kΩ fixed resistor (R₁) are across 9 V. At 20 °C the thermistor is 15 kΩ. V_OUT = 9 × 15 ÷ (10 + 15) = 5.4 V. At 50 °C it is 4 kΩ: V_OUT = 9 × 4 ÷ 14 = 2.6 V.
2. Design: a darkness sensor should give 3.0 V on a 6.0 V supply when the LDR is 20 kΩ. Halfway voltage means equal resistances, so R₁ = 20 kΩ (an E24 value).
3. An LDR is R₁ (top) and a 1 kΩ resistor R₂ (bottom), on 5 V. In bright light LDR = 250 Ω: V_OUT = 5 × 1000 ÷ 1250 = 4.0 V. In the dark LDR = 100 kΩ: V_OUT = 5 × 1 ÷ 101 = 0.05 V.

### Common mistakes

- Using R₁ in the top of the fraction.
- Mixing kΩ and Ω in the same fraction.
- Forgetting that swapping the sensor position reverses the action.

## C1.3(f) Switches with pull-up and pull-down resistors

### What you need to know

- Design and use switches with pull-up or pull-down resistors to give correct logic levels or edge-triggered signals for logic gates and timing circuits.

### Explained

A logic gate input that is not connected to anything (floating) picks up stray charges and noise, so it may read as 1 or 0 at random. A switch on its own only connects the input when closed; when open, the input floats. A resistor is added to hold the input at a definite level when the switch is open.

- Pull-down resistor: resistor from the input to 0 V; switch from the input to +V. Switch open: input held at 0 V (logic 0). Switch pressed: input connected to +V (logic 1). Gives active-high (pressing gives 1).
- Pull-up resistor: resistor from the input to +V; switch from the input to 0 V. Switch open: input held at +V (logic 1). Switch pressed: input pulled to 0 V (logic 0). Gives active-low (pressing gives 0).

Typical values are 10 kΩ to 100 kΩ: large enough that little current flows when the switch is closed, small enough to hold the input firmly.

Edge triggering: timers (the 555 is triggered when its trigger input falls below a third of the supply) and flip-flops (triggered on a rising edge) respond to a change of level, an edge. A push-to-make switch with a pull-up resistor gives a falling edge when pressed (suitable to trigger a 555 monostable); with a pull-down resistor it gives a rising edge (suitable to clock a D-type flip-flop). Mechanical switches bounce, giving several edges; debouncing is covered in C2.4.

### Common mistakes

- Leaving logic inputs floating.
- Using a very low value such as 10 Ω, which wastes current when the switch is closed.

## C1.3(h) Current-limiting resistors for LEDs

### What you need to know

- Determine the value of a current-limiting resistor for an LED in a DC circuit.

### Explained

An LED has a nearly fixed forward voltage when lit (about 2 V for red, about 3 V for blue or white) and needs a limited current (often 10 to 20 mA). Connected directly to a supply larger than its forward voltage, the current would be huge and the LED would be destroyed. A series resistor drops the extra voltage and sets the current.

R = (V_supply − V_LED) ÷ I_LED

Then choose the next larger E24 value (so the current is slightly below the maximum), and check the resistor's power.

### Worked example

A red LED (2.0 V, 15 mA) on a 9 V supply: R = (9 − 2) ÷ 0.015 = 467 Ω. Next E24 value up is 470 Ω. Actual current = 7 ÷ 470 = 14.9 mA. Resistor power = 7 × 0.0149 = 0.10 W, fine for 0.25 W.

### Common mistakes

- Using the full supply voltage instead of supply minus LED voltage.
- Rounding down to a smaller resistor, which makes the current too large.

## Check questions

1. Explain the effect on the total resistance of adding a second resistor (a) in series, (b) in parallel. [2 marks]
2. Calculate the total resistance of 6.8 kΩ and 3.3 kΩ in parallel. [2 marks]
3. State the colour bands of a 56 kΩ ±5% resistor. [2 marks]
4. A calculation gives 1.65 kΩ. State the nearest E24 value. [1 mark]
5. State the range of possible values for a 330 Ω ±10% resistor. [2 marks]
6. Draw a voltage divider with a thermistor that gives an output voltage that rises when the temperature rises. Explain how it works. [4 marks]
7. An LDR is connected as R₂ in a voltage divider with R₁ = 22 kΩ on a 12 V supply. Calculate V_OUT when the LDR is 2 kΩ and when it is 200 kΩ. [4 marks]
8. Explain why a pull-down resistor is needed with a push switch on a logic gate input. [3 marks]
9. A blue LED (3.1 V, 20 mA) is used on a 5.0 V supply. Calculate the current-limiting resistor and select an E24 value. [3 marks]

## Mark scheme

1. (a) Total increases (sum of resistances) (1). (b) Total decreases (less than the smallest) (1).
2. (6.8 × 3.3) ÷ (6.8 + 3.3) = 22.44 ÷ 10.1 (1) = 2.2 kΩ (1).
3. Green, blue, orange (1); gold (1).
4. 1.6 kΩ (1).
5. 297 Ω (1) to 363 Ω (1).
6. Thermistor at the top (R₁), fixed resistor at the bottom, output across the fixed resistor (1). As temperature rises, the thermistor's resistance falls (1), so it takes a smaller share of the voltage (1) and the voltage across the fixed resistor (output) rises (1).
7. 2 kΩ: 12 × 2 ÷ 24 (1) = 1.0 V (1). 200 kΩ: 12 × 200 ÷ 222 (1) = 10.8 V (1).
8. When the switch is open, the input would float (1) and could read as 1 or 0 randomly due to noise (1); the pull-down resistor holds the input at 0 V (logic 0) until the switch is pressed (1).
9. R = (5.0 − 3.1) ÷ 0.020 (1) = 95 Ω (1); E24 100 Ω (1).
