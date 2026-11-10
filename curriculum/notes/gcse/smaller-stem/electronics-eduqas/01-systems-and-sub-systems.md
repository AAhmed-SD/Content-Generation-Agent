---
board: Eduqas
level: GCSE
subject: Electronics
code: "C490QS"
also_covers: []
topic: "Component 1 Topic 1 Electronic systems and sub-systems"
spec_refs: ["C1.1(a)", "C1.1(b)", "C1.1(c)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-gcse/
pmt_url: null
---

# C1.1 Electronic systems and sub-systems

An electronic system is built from smaller blocks, each with one job: sense something, process the information, or produce an output. Thinking in blocks makes it possible to design, test and fault-find complicated circuits. This topic covers the three kinds of sub-system and the named components in each, why outputs often need a driver, and how systems are designed and tested.

## C1.1(a) Sensing, processing and output sub-systems

### What you need to know

- Electronic systems are assembled from sensing (input), processing and output sub-systems.
- Sensing units for: light, temperature, magnetic field, pressure, moisture, sound, rotation.
- Signal processing: individual logic gates, latch, time delay, comparator.
- Output devices: lamp, buzzer, solenoid, LED, actuator (servo), motor, loudspeaker.

### Explained

A system block diagram shows each sub-system as a box with arrows showing the direction of signals: input → process → output.

Sensing sub-systems turn a physical quantity into an electrical signal (a voltage). They are usually a sensor in a voltage divider (C1.3).

| Quantity | Typical sensor | How it responds |
| --- | --- | --- |
| Light | Light-dependent resistor (LDR), photodiode, phototransistor | LDR resistance falls as light increases |
| Temperature | NTC thermistor | Resistance falls as temperature rises |
| Magnetic field | Reed switch, Hall effect sensor | Reed switch closes near a magnet; Hall sensor gives a voltage |
| Pressure | Push switch, pressure pad, force-sensitive resistor | Switch closes, or resistance falls with force |
| Moisture | Two exposed probes (moisture sensor) | Resistance between probes falls when wet |
| Sound | Microphone | Gives a small changing (AC) voltage |
| Rotation | Potentiometer, rotary encoder, slotted disc with light gate | Voltage or pulses change with angle or speed |

Processing sub-systems decide what to do with the signal:

- Logic gates make decisions from digital (high/low) inputs: for example, an alarm sounds if a door is open AND the system is armed (C1.6).
- A latch remembers an event: once triggered, its output stays on until it is reset, even if the input goes away (a burglar alarm keeps ringing after the intruder closes the door) (C2.3).
- A time delay (such as a 555 monostable) keeps an output on for a set time after a trigger, for example a stairway light that stays on for one minute (C2.2).
- A comparator compares a sensor voltage with a reference voltage and switches its output high or low, turning a gradually changing analogue signal into a clear on/off signal (C1.4).

Output sub-systems turn the electrical signal into something useful:

| Output | Converts electrical energy to | Notes |
| --- | --- | --- |
| Lamp (filament) | Light (and a lot of heating) | Large current; slow to switch |
| LED | Light | Needs a series resistor; low current; long life |
| Buzzer | Sound at a fixed pitch | Simple DC device |
| Loudspeaker | Sound that follows the electrical signal (speech, music, tones) | Low resistance (8 Ω), needs an amplifier |
| Solenoid | Linear movement (a plunger pulled into a coil) | Locks, valves; needs a protective diode |
| Motor | Rotation | Large current; needs a driver and a protective diode |
| Servo (actuator) | Movement to a set angle, controlled by pulses | Used in robots and models |

### Common mistakes

- Putting a sensor in the process block, or a comparator in the input block.
- Drawing arrows backwards. Signals flow from input to output.

## C1.1(b) Transducer drivers

### What you need to know

- The need for, and the use of, transducer drivers.

### Explained

A transducer is a device that converts energy from one form to another; output transducers include motors, lamps, buzzers, loudspeakers and solenoids. Processing ICs (logic gates, counters, microcontrollers, comparators) can only supply a small output current, often 20 mA or less. Many output transducers need much more (a motor may need 500 mA or more; a relay coil 50 to 100 mA). Connecting such a load directly would overload the IC: the output voltage would drop, the IC could overheat or be damaged, and the load would not work properly.

A transducer driver is a circuit between the processor and the output transducer that takes the small control signal and switches or supplies a larger current from the power supply. Common drivers:

- An npn transistor or n-channel MOSFET switch (C1.4), often with a protective diode for inductive loads (C1.5).
- A relay, driven by a transistor, to switch a separate high-voltage or high-current circuit.
- A power amplifier (C2.1) to drive a loudspeaker.
- A Darlington driver IC for several loads at once.

### Worked example

A logic gate output can supply 10 mA. A 6 V motor draws 0.8 A. 0.8 A = 800 mA, which is 80 times more than the gate can give, so a MOSFET driver is needed.

### Common mistakes

- Saying a driver "boosts the voltage". Its main job is to supply more current to the load.

## C1.1(c) Designing and testing systems

### What you need to know

- Design and test electronic systems.

### Explained

A good design process:

1. Specify: what must the system do? Write measurable requirements, for example "sound a buzzer within 1 second when the temperature exceeds 40 °C; run from a 9 V battery".
2. Break it into sub-systems on a block diagram.
3. Choose and design each sub-system (sensor and voltage divider; comparator; driver; output), calculating component values.
4. Model or simulate the circuit (on paper or with simulation software), predicting voltages and currents.
5. Build each sub-system on a breadboard and test it on its own: for example, measure the sensor voltage at different temperatures with a multimeter; check the comparator switches at the right point; check the driver operates the load.
6. Connect the sub-systems and test the whole system against the specification.
7. Fault-find by testing at each interface between blocks (the output of one block is the input of the next), then modify and retest.

Testing each sub-system first makes it much easier to find faults: if the input block gives the right voltage but the output is wrong, the fault is further along.

### Common mistakes

- Building the whole system before testing any part of it.

## Check questions

1. Draw a block diagram for a system that switches on a fan when a room becomes too hot. Name a suitable component for each block. [3 marks]
2. Name a sensor for (a) moisture, (b) a magnetic field, (c) rotation. [3 marks]
3. Explain the difference between a latch and a time delay as processing sub-systems. [2 marks]
4. A night-light should switch on when it gets dark and stay on for 10 minutes after any movement. Suggest suitable processing sub-systems. [2 marks]
5. Explain why a loudspeaker needs an amplifier, but a buzzer does not. [2 marks]
6. Explain why a microcontroller cannot drive a motor directly and how this problem is solved. [3 marks]
7. Explain why sub-systems should be tested separately before being joined together. [2 marks]

## Mark scheme

1. Input: thermistor in a voltage divider (1) → process: comparator / transistor switching circuit (1) → output: driver and motor / fan (1).
2. (a) Moisture probes / moisture sensor (1). (b) Reed switch / Hall sensor (1). (c) Potentiometer / rotary encoder / slotted disc and light gate (1).
3. A latch keeps its output on until it is reset (1); a time delay keeps its output on for a set time and then switches off automatically (1).
4. Comparator (or logic) to detect darkness (1); a time delay / monostable triggered by a movement sensor (1). Accept logic gate (AND) to combine the two.
5. A loudspeaker needs a large, changing current that follows the signal (1); a buzzer makes its own sound from a small DC current (1).
6. The microcontroller output can supply only a small current (1); the motor needs a much larger current (1); a transducer driver such as a MOSFET / transistor / relay switches the larger current from the supply (1).
7. Faults can be found and corrected in each small part (1); if the joined system fails, the fault can be traced to an interface / particular block (1).
