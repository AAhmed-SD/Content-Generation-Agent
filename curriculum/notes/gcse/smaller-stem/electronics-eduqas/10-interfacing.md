---
board: Eduqas
level: GCSE
subject: Electronics
code: "C490QS"
also_covers: []
topic: "Component 2 Topic 4 Interfacing digital to analogue circuits"
spec_refs: ["C2.4(a)", "C2.4(b)", "C2.4(c)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-gcse/
pmt_url: null
---

# C2.4 Interfacing digital to analogue circuits

The real world is analogue: light, temperature and sound change smoothly. Digital circuits need clean 0s and 1s. An interface connects the two: it turns a slowly changing or noisy signal into a clean logic signal, or lets a small logic signal control a real-world load. This topic covers the Schmitt inverter and debouncing, a comparison of interface devices, and designing interface circuits.

## C2.4(a) The Schmitt inverter and debouncing

### What you need to know

- The action of a Schmitt inverter and its use in debouncing signals from mechanical switches and analogue sensors.

### Explained

A Schmitt inverter (for example in a 40106 IC, six per chip) is a NOT gate with two different switching thresholds:

- As the input voltage rises, the output switches from high to low only when the input passes the upper threshold (about two-thirds of the supply).
- As the input voltage falls, the output switches from low to high only when the input passes the lower threshold (about one-third of the supply).
- Between the two thresholds the output does not change. The gap is called hysteresis.

So the output changes cleanly and quickly, once, even if the input changes slowly or has small amounts of noise riding on it. An ordinary NOT gate with a slowly changing input could spend time in the undefined region and could switch back and forth many times as noise crosses its single threshold.

Debouncing a mechanical switch: when a switch closes, its metal contacts bounce apart and together several times in a few milliseconds before settling. A counter would count every bounce as a separate pulse. A debounce circuit: the switch (with a pull-up or pull-down resistor) charges or discharges a capacitor through a resistor, so the voltage changes smoothly instead of bouncing (the RC network filters the fast bounces); the smooth voltage feeds a Schmitt inverter, which gives a single clean edge. (The inverter's output is inverted, which can be corrected with a second inverter if needed.)

Analogue sensors: a sensor voltage divider (light or temperature) changes slowly and may flicker near the switching point. Feeding it into a Schmitt inverter gives a clean on/off signal, and the hysteresis stops the output chattering when the input hovers around the threshold (for example a light that would otherwise flicker on and off at dusk).

A Schmitt inverter with a resistor from output to input and a capacitor from input to 0 V also makes a simple astable (relaxation oscillator).

### Worked example

On a 9 V supply, a Schmitt inverter has thresholds of about 6 V (rising) and 3 V (falling). An input rising slowly from 0 V: output stays high (9 V) until the input reaches 6 V, then goes low. If the input then falls back to 5 V because of noise, the output stays low; it only goes high again when the input falls below 3 V.

### Common mistakes

- Saying a Schmitt inverter has one threshold.
- Forgetting the output is inverted.

## C2.4(b) Comparing interfaces

### What you need to know

- Compare the properties of transistors, comparators and Schmitt inverters as interfaces between analogue and digital systems.

### Explained

| Property | npn transistor / MOSFET | Comparator | Schmitt inverter |
| --- | --- | --- | --- |
| Switching point | Fixed by device (about 0.7 V transistor, about 3 V MOSFET); set by divider design | Set accurately by a reference voltage; easily adjusted | Fixed by IC (about 1/3 and 2/3 of supply) |
| Sharpness | Gradual change over a range of input | Very sharp | Sharp |
| Noise immunity | Poor | Poor near threshold (unless extra feedback is added) | Good, because of hysteresis |
| Output current | Large (can drive loads directly) | Small (needs a driver for big loads) | Small (logic level only) |
| Output | Can drive loads; inverted level at the collector or drain | Logic level; non-inverting or inverting depending on input connections | Inverted logic level |
| Input current | Transistor draws base current; MOSFET almost none | Almost none | Almost none (CMOS) |

Choosing: a transistor or MOSFET is used when the interface must drive a load (lamp, motor, relay) from a logic output; a comparator when an analogue sensor must switch at a precise, adjustable level; a Schmitt inverter when a slowly changing or noisy signal (sensor or switch) must give a clean logic signal into counters or gates.

## C2.4(c) Designing interface circuits

### What you need to know

- Design interface circuits using npn transistors, MOSFETs and comparators to connect input sensors to outputs.

### Explained

Design steps:

1. Sensor sub-system: choose a sensor and put it in a voltage divider so the output voltage rises (or falls) as required (C1.3). Calculate the fixed resistor so the divider crosses the switching level at the right condition.
2. Switching or interface sub-system: choose the device.
   - Direct MOSFET: the divider output goes straight to the gate. The divider must give more than about 3 V (plus enough to supply the load current, from I_D = g_M(V_GS − 3)) at the switching condition.
   - npn transistor: divider output through a base resistor; check the base current saturates the transistor for the load current (I_C = h_FE I_B).
   - Comparator: sensor divider to one input, reference (potentiometer) to the other; comparator output drives a MOSFET or transistor for large loads.
3. Output: load between +V and the drain/collector; protective diode across inductive loads; current-limiting resistor for LEDs.
4. Check device ratings against load current and supply voltage from data sheets (C1.4).

### Worked example

Design: a fan motor (12 V, 0.5 A) must run when the temperature exceeds 30 °C. Thermistor resistance at 30 °C is 5 kΩ.

- Divider: thermistor at the top, fixed resistor R at the bottom, so the output rises as temperature rises. Use a comparator so the switching point is precise: reference = 6 V (two 10 kΩ resistors on 12 V) to the − input; divider output to the + input. At 30 °C we need the divider at 6 V, so R = 5 kΩ (nearest E24: 5.1 kΩ).
- Above 30 °C the thermistor's resistance falls, the divider voltage rises above 6 V, and the comparator output goes high.
- The comparator output drives the gate of a MOSFET (rated over 0.5 A and 12 V); the fan motor is between +12 V and the drain, with a diode across the motor.

### Common mistakes

- Driving a motor straight from a comparator output.
- Forgetting the diode across an inductive load.

## Check questions

1. Explain what is meant by hysteresis in a Schmitt inverter. [2 marks]
2. Sketch the output of a Schmitt inverter when its input is a slowly rising and then falling triangular wave between 0 V and the supply voltage. Mark the two switching points. [3 marks]
3. Explain why a push switch connected directly to a counter's clock input can make the counter jump by several counts. [2 marks]
4. Describe a circuit to debounce a push switch. [3 marks]
5. Explain why a Schmitt inverter is better than an ordinary NOT gate for a light-sensing circuit that switches a lamp at dusk. [2 marks]
6. Give one advantage of a comparator and one advantage of a MOSFET as an interface. [2 marks]
7. Design a circuit that switches on a 6 V, 200 mA buzzer when the soil in a plant pot becomes dry. Explain your choice of components. [5 marks]

## Mark scheme

1. The input voltage at which the output changes is different for a rising input and for a falling input (1); the output does not change while the input is between the two thresholds (1).
2. Output starts high (1); goes low when input passes upper threshold (about 2/3 supply) (1); goes high again when falling input passes lower threshold (about 1/3 supply) (1).
3. The switch contacts bounce (1), producing several pulses / edges, each counted (1).
4. Switch with pull-up / pull-down resistor (1); RC network so the voltage changes smoothly (1); into a Schmitt inverter which gives one clean edge (1).
5. At dusk the light level changes slowly / flickers around the threshold (1); hysteresis stops the output switching on and off repeatedly / gives a clean single switch (1).
6. Comparator: precise / adjustable switching point / sharp switching / no input current (1). MOSFET: can supply large current to the load / no gate current (1).
7. Moisture sensor in a voltage divider as the bottom resistor (R₂), so the output voltage rises as the soil dries and the sensor's resistance rises (1); fixed resistor / potentiometer to set the switching point (1); comparator or MOSFET / transistor switch (1); buzzer between +6 V and drain / collector (1); device rating checked above 200 mA / justification of choices (1).
