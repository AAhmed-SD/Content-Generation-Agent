---
level: A-level
subject: Electronics
topic: "Core Concepts 1 and 3: system synthesis; input and output sub-systems"
as_content: "AS and A level (Core Concepts are in the Eduqas AS too)."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["CC1(a)", "CC1(b)", "CC1(c)", "CC3(a)", "CC3(b)", "CC3(c)", "CC3(d)", "CC3(e)", "CC3(f)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# System synthesis and input/output sub-systems

Electronic systems are designed by breaking them into sub-systems with clear jobs. This file covers system diagrams, sensing circuits built from voltage dividers, signal conditioning with a Schmitt inverter, and the output devices a system can drive. GCSE background: [GCSE Electronics 01](../../../gcse/smaller-stem/electronics-eduqas/01-systems-and-sub-systems.md) and [03](../../../gcse/smaller-stem/electronics-eduqas/03-resistive-components.md).

## CC1 System synthesis

### What you need to know

- (a) Systems have inputs, processes and outputs, and may include feedback.
- (b) Represent complex systems as sub-systems.
- (c) Analyse and design system diagrams.

### Explained

A **system diagram** is a block diagram: each block is a sub-system, and arrows show the signal flowing between them.

- Input sub-systems (sensors, switches) turn a physical quantity into an electrical signal.
- Process sub-systems (comparators, logic, counters, amplifiers, microcontrollers) decide what to do.
- Output sub-systems (transducer drivers and output transducers) turn the signal into light, sound, movement or heat.
- **Feedback**: part of the output is returned to the input or process to control the system. In a closed-loop (feedback) system, the output is measured and compared with the desired value, so the system corrects itself (a thermostat). In an open-loop system, no measurement of the output is made (a timer-controlled heater).

Sub-systems are chosen so each can be designed and tested on its own, then joined. This also matters for the NEA (Component 3).

### Worked example

Greenhouse fan: temperature sensor (thermistor voltage divider) → comparator (compares sensor voltage with a reference set by a potentiometer) → transistor driver → relay → fan motor. Feedback: running the fan lowers the temperature, which changes the sensor signal and switches the fan off: closed loop.

## CC3 Input and output sub-systems

### What you need to know

- (a) Use photosensitive devices (LDR, photodiode), NTC thermistors and switches in voltage dividers to produce analogue signals.
- (b) Determine experimentally, interpret and use characteristic curves for these devices.
- (c) Use the voltage divider equation Vout = Vin × R₂ ÷ (R₁ + R₂).
- (d) Explain how a Schmitt inverter provides signal conditioning.
- (e) Design and build sensing circuits.
- (f) Describe uses of a buzzer, loudspeaker, motor, solenoid, relay, servo (mechanical actuator) and seven-segment display.

### Explained

**Sensors**:

| Device | Behaviour |
| --- | --- |
| LDR (light-dependent resistor) | Resistance falls as light increases (from megohms in the dark to a few hundred ohms in bright light); non-linear |
| Photodiode (reverse biased) | A small reverse current flows, proportional to light intensity; fast response (see [03](03-semiconductor-components.md)) |
| NTC thermistor | Resistance falls as temperature rises; non-linear |
| Switch | Gives a 0 V or supply-voltage signal; needs a pull-up or pull-down resistor |

**Voltage divider**: two resistances in series across a supply. The output is taken across R₂ (the lower one). Vout = Vin × R₂ ÷ (R₁ + R₂). The larger resistance gets the larger share of the voltage.

- Put the sensor at the top (R₁) for an output that rises when the sensor's resistance falls (for example LDR at the top: brighter light, higher Vout).
- Put the sensor at the bottom (R₂) for the opposite.
- For maximum sensitivity at a chosen condition, make the fixed resistor equal to the sensor's resistance at that condition.
- The load connected to Vout must have a much higher resistance than R₂, or it will pull Vout down (loading).

**Characteristic curves**: measure resistance with an ohmmeter (or V and I) over a range of light levels or temperatures; plot resistance against the variable. Use the curve to find the sensor's resistance at the switching point and choose the fixed resistor.

**Schmitt inverter**: a logic inverter with two switching thresholds (hysteresis). The output goes low when the input rises above the upper threshold, and goes high again only when the input falls below the lower threshold. This turns a slowly changing or noisy analogue signal into a clean digital signal with fast edges, and stops the output "chattering" when the input hovers near a single threshold. Used to square up sensor outputs, debounce switches ([11](11-timing-circuits.md)) and regenerate digital signals ([14](14-digital-communications.md)).

**Output devices**:

| Device | Use | Notes |
| --- | --- | --- |
| Buzzer | Simple audible warning | Needs DC; fixed tone |
| Loudspeaker | Sound from an AC (audio) signal | Low impedance (4 to 8 Ω), needs a power amplifier |
| Motor | Rotation | High current; needs driver; generates back-emf (protect with a diode) |
| Solenoid | Short linear movement (locks, valves) | Coil; needs driver and protection diode |
| Relay | Electrically operated switch; isolates a low-voltage control circuit from a high-voltage or high-current load | Coil needs driver and protection diode |
| Servo | Rotates to a set angle controlled by the width of pulses (PWM) | Mechanical actuator with built-in feedback |
| Seven-segment display | Shows digits 0 to 9; seven LED segments | Driven by a BCD to seven-segment decoder; common anode or common cathode |

Logic outputs cannot supply much current, so most outputs need a **transducer driver** (a transistor or MOSFET, see [03](03-semiconductor-components.md)).

### Worked example

An NTC thermistor has resistance 4.7 kΩ at 25 °C and is placed at the bottom of a divider with a fixed 4.7 kΩ resistor at the top, on a 9 V supply. At 25 °C, Vout = 9 × 4.7 ÷ 9.4 = 4.5 V. When it warms and the thermistor falls to 2.0 kΩ, Vout = 9 × 2.0 ÷ 6.7 = 2.7 V. So Vout falls as temperature rises. To make Vout rise with temperature instead, swap the two components.

### Common mistakes

- Taking Vout across the wrong resistor.
- Forgetting that loading reduces Vout.
- Saying a Schmitt trigger amplifies the signal; it conditions it (two thresholds, clean edges).
- Driving a motor or relay directly from a logic output.

## Check questions

1. Draw a system diagram for an automatic night light, labelling input, process and output sub-systems. (3)
2. Distinguish between open-loop and closed-loop control, with an example of each. (3)
3. An LDR has resistance 1 kΩ in daylight and 100 kΩ in darkness. It is the upper resistor in a divider with a 10 kΩ lower resistor on a 6 V supply. Calculate Vout in daylight and in darkness. (3)
4. Explain how to choose the fixed resistor so that a temperature sensor is most sensitive near 40 °C. (2)
5. Explain why a Schmitt inverter is used between a slowly changing sensor and a counter. (3)
6. Explain why a relay is used to switch a mains lamp from a 5 V logic circuit. (2)
7. Describe how a servo is controlled. (2)
8. Describe an experiment to obtain the characteristic curve of an NTC thermistor. (4)

## Mark scheme

1. LDR voltage divider (input) (1); comparator / Schmitt / logic (process) (1); transistor driver and lamp (output) (1).
2. Open loop: no measurement of output, e.g. timer heater (1); closed loop: output measured and fed back to correct it (1), e.g. thermostat (1).
3. Daylight: 6 × 10 ÷ 11 = 5.45 V (1); darkness: 6 × 10 ÷ 110 = 0.55 V (1); correct working (1).
4. Find the thermistor resistance at 40 °C from its characteristic curve (1); make the fixed resistor equal to it (1).
5. Sensor voltage changes slowly / is noisy (1); a single threshold could switch many times / slow edges cause errors (1); Schmitt's two thresholds give one clean fast transition (1).
6. Logic output cannot supply enough current / voltage for the lamp (1); relay isolates the mains circuit from the low-voltage circuit for safety (1).
7. Pulse-width-modulated signal (1); pulse width sets the angle (1).
8. Thermistor in water bath with thermometer (1); measure resistance with ohmmeter / V and I (1); vary temperature in steps, allow to settle (1); plot resistance against temperature (1).
