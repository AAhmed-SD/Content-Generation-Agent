---
board: AQA
level: GCSE
subject: Engineering
code: "8852"
also_covers: []
topic: "3.3.2 to 3.3.3 Electrical and electronic systems"
spec_refs: ["3.3.2", "3.3.3"]
refs_checked: false
spec_url: https://www.aqa.org.uk/subjects/engineering/gcse/engineering-8852/specification/subject-content/systems
pmt_url: null
---

# 3.3.2 to 3.3.3 Electrical and electronic systems

Electrical systems deal with supplying and switching power to loads such as motors and lamps. Electronic systems sense, process and control using small signals. This file covers power supplies, switches and relays, output devices, AC and DC, sensors, analogue and digital signals, processing devices, microcontrollers and flow-chart programs, drivers, and the discrete components, with Ohm's law (E12) and series resistance (E13). For the physics of current, potential difference and resistance, see also [AQA GCSE Physics 4.2 Electricity](../../../aqa/gcse/physics-8463/4.2-electricity.md).

## 3.3.2 Electrical systems

### What you need to know

- Power supplies: mains and batteries.
- Input control: switches and relays.
- Outputs: motors, buzzers, bells, lamps and solenoids.
- The difference between alternating current (AC) and direct current (DC).
- Ohm's law (E12): current = voltage ÷ resistance; rearranging and substituting.

### Explained

Power supplies:

- Mains: in the UK, 230 V AC at 50 Hz. It can supply large power continuously but is dangerous; products need insulation, earthing or double insulation, and fuses. Electronic products use a power supply unit (adapter) that steps the voltage down with a transformer and rectifies it to low-voltage DC.
- Batteries: portable DC supplies made of cells (about 1.5 V each for alkaline, 3.7 V for lithium-ion). They suit low-power portable products. Capacity is in milliamp-hours (mAh): a 2000 mAh battery could supply 200 mA for about 10 hours. Rechargeable batteries cost more but can be reused hundreds of times; disposal must be safe because of toxic and reactive chemicals.

AC and DC: in direct current, charge flows one way only and the voltage is steady (batteries, solar cells). In alternating current, the direction reverses many times a second (50 times a second in the UK mains). AC is used for transmitting power because transformers can only change AC voltages; most electronics need DC.

Switches:

- Push-to-make (PTM): contacts close only while pressed (doorbell). Push-to-break (PTB): contacts open while pressed.
- Toggle and rocker switches stay in position (light switches).
- Microswitches: small, sensitive switches operated by a lever; used as limit switches to detect when a moving part reaches a position (a lift door closing).
- Reed switches close when a magnet is near (security alarms on doors).
- Poles and throws: SPST (one circuit, on/off), SPDT (one input switched to either of two outputs), DPDT (two separate circuits switched together, used to reverse a motor).

Relays: an electrically operated switch. A small current through a coil makes it an electromagnet, which pulls a contact across and switches a separate circuit. A low-voltage, low-current control circuit can therefore safely switch a high-current or mains circuit, with the two circuits electrically isolated. A diode is connected across the coil (reverse biased) to protect the driving transistor from the voltage spike when the coil switches off.

Outputs:

| Output | What it does | Notes |
| --- | --- | --- |
| DC motor | Rotary motion | Reverses when polarity reverses; speed controlled by voltage or pulsed power |
| Buzzer | Steady sound from a DC supply | Low current, cheap |
| Bell | Loud sound; electromagnet strikes a gong repeatedly | Fire alarms, school bells |
| Lamp (filament) | Light | Inefficient (much energy wasted as heating); being replaced by LEDs |
| Solenoid | Linear motion: a coil pulls in an iron plunger when current flows | Door locks, valves, pinball flippers |

### Worked example

A 12 V lamp has a resistance of 48 Ω. Current = 12 ÷ 48 = 0.25 A.

A motor draws 1.5 A from a 6 V supply. Its resistance = voltage ÷ current = 6 ÷ 1.5 = 4 Ω (rearranging E12).

### Common mistakes

- Saying a relay amplifies. It switches a separate circuit; it does not make a signal bigger.
- Forgetting the protective diode across a relay coil.
- Mixing up mAh (charge capacity) and mA (current).

## 3.3.3 Electronic systems

### What you need to know

- Inputs: light and temperature sensors.
- Analogue and digital signals; the analogue-to-digital converter (ADC) in a programmable device.
- Process devices: timers, counters, comparators, logic gates (AND, OR, NOT).
- Programmable devices: microcontrollers (such as PIC) for more complex operations.
- Interfacing: driving loads with a transistor or FET (field-effect transistor).
- Outputs: LEDs, seven-segment displays, buzzers, piezo sounders.
- Discrete components: fixed and variable resistors, signal and rectifier diodes, polarised and non-polarised capacitors.
- Programming using simple flow charts for monitoring and control, with up to three inputs and three outputs.
- Calculations: E12, E13; significant figures; order of magnitude.

### Explained

Sensors.

- Light-dependent resistor (LDR): its resistance falls as light intensity increases (high in the dark, low in bright light).
- Thermistor (NTC): its resistance falls as temperature increases.

A sensor is used in a voltage divider: it is placed in series with a fixed or variable resistor across the supply, and the voltage at the junction changes with light or temperature. The voltage across each part is in proportion to its resistance. Swapping the sensor and the resistor reverses the action (for example, output rises in the dark instead of in the light). A variable resistor in place of the fixed resistor lets the switching point be adjusted.

Analogue and digital. An analogue signal can have any value within a range and changes smoothly (the voltage from an LDR divider). A digital signal has only two states: high (1, on) or low (0, off). A microcontroller's ADC converts an analogue input voltage into a number (for example 0 to 255 for an 8-bit ADC) so the program can compare it with a threshold.

Process devices:

- Timer: produces a set time delay (monostable, one pulse) or a continuous stream of on-off pulses (astable). The 555 timer IC is a common example; the time depends on a resistor and capacitor: larger values give longer times.
- Counter: counts input pulses and outputs the total in binary, often to drive a display through a decoder.
- Comparator: compares two voltages and switches its output high or low depending on which is bigger. A sensor voltage compared with a reference voltage set by a variable resistor gives a clean on/off switch at a chosen light level or temperature.
- Logic gates make decisions with digital inputs:

| A | B | AND | OR |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 |

NOT has one input and inverts it: 0 gives 1 and 1 gives 0. Example: a machine runs only if the guard is closed AND the start button is pressed; an alarm sounds if the door OR the window opens.

Microcontrollers (such as PIC chips): a whole small computer on one chip, with processor, memory, and input and output pins. One programmed chip can replace many separate timers, counters and gates, and its behaviour can be changed by reprogramming instead of rebuilding the circuit. This reduces size, cost and component count.

Interfacing (drivers). Microcontroller and logic outputs can supply only a few milliamps, too little for a motor, relay, solenoid or bright lamp. A driver switches the larger current:

- Bipolar transistor (NPN): a small base current (through a base resistor that limits it) switches on a larger collector current through the load.
- FET (MOSFET): switched by voltage at the gate with almost no gate current; it can switch large currents with little heating. Often preferred for motors.

Output devices:

- LED (light-emitting diode): lights when current flows in the forward direction. It must have a series resistor to limit the current (typically 10 to 20 mA). Uses little power and lasts a long time.
- Seven-segment display: seven LED bars (a to g) arranged to show digits 0 to 9; driven through a decoder or a microcontroller.
- Buzzer: makes its own fixed tone from a DC supply.
- Piezo sounder: a crystal disc that flexes when a voltage is applied; it needs a changing (pulsed) signal, so a microcontroller can make different tones and tunes. Very low current.

Discrete components:

| Component | Function |
| --- | --- |
| Fixed resistor | Limits current, sets voltages; value from the colour code |
| Variable resistor (potentiometer, preset) | Adjustable resistance, for setting thresholds or volume |
| Signal diode | Lets current flow one way only, for small currents; protects against reverse voltage (for example across a relay coil) |
| Rectifier diode | One-way flow for larger currents; converts AC to DC in power supplies |
| Non-polarised capacitor (ceramic, polyester) | Small values; can be connected either way; used for smoothing noise and in timing circuits |
| Polarised (electrolytic) capacitor | Larger values; must be connected the right way round (marked negative leg); used for smoothing supplies and long time delays |

Resistor colour code: the first two bands give digits, the third gives the number of zeros (black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, grey 8, white 9); a fourth band gives the tolerance (gold ±5%). Brown-black-orange = 10 000 Ω = 10 kΩ.

Resistors in series (E13): total resistance = R1 + R2 (and so on).

Flow-chart programming. Microcontroller programs are planned and often written as flow charts:

- Start → initialise outputs off.
- Input or read a sensor (for an analogue sensor, read the ADC value into a variable).
- Decision diamond: is the value above the threshold? Is input 1 high?
- Process boxes: switch an output on or off; wait for a set time.
- Loops: arrows back up the chart so the program repeats for ever.

Example: a greenhouse controller reads a temperature sensor (input 1) and a light sensor (input 2). If temperature > threshold, switch on the fan (output 1). If it is dark, switch on a lamp (output 2). Loop back.

### Worked example

1. An LED needs 2 V and 15 mA. The supply is 9 V. The resistor has 9 − 2 = 7 V across it. R = V ÷ I = 7 ÷ 0.015 = 467 Ω, so choose the next preferred value up, 470 Ω (2 significant figures).
2. Two resistors, 2.2 kΩ and 4.7 kΩ, are in series across 6 V. Total resistance (E13) = 6.9 kΩ = 6900 Ω. Current = 6 ÷ 6900 = 0.00087 A = 0.87 mA.
3. In that voltage divider, the voltage across the 4.7 kΩ resistor is (4.7 ÷ 6.9) × 6 = 4.1 V.
4. Order of magnitude: a microcontroller pin supplies about 20 mA; a motor needs about 1 A, around 50 times more, so a driver transistor or FET is needed.

### Common mistakes

- Saying an LDR's resistance rises with light. It falls.
- Leaving out the series resistor for an LED; it will burn out.
- Connecting an electrolytic capacitor the wrong way round.
- Driving a motor straight from a microcontroller pin.
- Confusing a comparator (two analogue voltages in, digital out) with a logic gate (digital in, digital out).

## Check questions

1. Give one difference between AC and DC. [1 mark]
2. Explain why a relay is used to let a microcontroller switch a mains-powered heater. [2 marks]
3. A solenoid has a resistance of 24 Ω and is connected to 12 V. Calculate the current. [2 marks]
4. Describe how the resistance of an LDR changes as it gets darker. [1 mark]
5. Draw a truth table for a 2-input AND gate. [2 marks]
6. A conveyor must stop if either of two emergency buttons is pressed. State the logic gate needed and explain why. [2 marks]
7. Explain why a microcontroller needs a transistor or FET to drive a DC motor. [2 marks]
8. Calculate the resistor needed for an LED (2.0 V, 20 mA) on a 5.0 V supply. [3 marks]
9. A 1 kΩ and a 3.3 kΩ resistor are in series. Calculate the total resistance. [1 mark]
10. Give one advantage of using a microcontroller rather than separate logic gates and timers. [1 mark]
11. Draw a flow chart for a program that turns on a fan when a temperature reading is above 30 and off otherwise, repeating for ever. [4 marks]
12. State the function of an ADC in a microcontroller. [1 mark]

## Mark scheme

1. DC flows in one direction only; AC reverses direction many times a second (1).
2. Microcontroller output is low voltage / current and cannot switch mains directly (1); a small current in the relay coil switches a separate high-current circuit and keeps the circuits isolated (1).
3. I = 12 ÷ 24 (1) = 0.5 A (1).
4. Resistance increases as it gets darker (1).
5. Four rows with correct inputs (1); output 1 only when both inputs are 1 (1).
6. OR gate (1): output is 1 (stop) if either input is 1 (1).
7. Output pin supplies only a few mA (1); a motor needs much more current, so the transistor / FET switches the larger current (1).
8. Voltage across resistor = 5.0 − 2.0 = 3.0 V (1); R = 3.0 ÷ 0.020 (1) = 150 Ω (1).
9. 4.3 kΩ (1).
10. Any one: fewer components / smaller / cheaper / can be reprogrammed / more complex functions (1).
11. Start and loop structure (1); read temperature (input box) (1); decision "temperature > 30?" (1); yes → fan on, no → fan off, both loop back (1).
12. Converts an analogue voltage into a digital number (1).
