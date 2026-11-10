---
board: Eduqas
level: GCSE
subject: Electronics
code: "C490QS"
also_covers: []
topic: "Component 2 Topic 5 Control circuits"
spec_refs: ["C2.5(a)", "C2.5(b)", "C2.5(c)", "C2.5(d)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-gcse/
pmt_url: null
---

# C2.5 Control circuits

A microcontroller can replace a whole board of gates, timers and counters with one programmable chip. This topic covers what a microcontroller is, how inputs and outputs are connected to it, flowchart programming, and why microcontrollers are now standard in vehicles and home appliances.

## C2.5(a) What a microcontroller is

### What you need to know

- A microcontroller is a programmable integrated circuit into which software can be loaded so it can carry out a range of different tasks.

### Explained

A microcontroller (for example a PIC, an AVR such as on an Arduino board, or the chips used with flowchart software in schools) is a complete small computer on a single IC. It contains:

- A processor that carries out instructions.
- Program memory (non-volatile, keeps the program when power is off).
- Data memory (RAM) for variables.
- Input/output (I/O) pins that can be set as digital inputs or outputs.
- Often extra features: an analogue-to-digital converter (ADC) to read sensor voltages as numbers, timers, and pulse-width modulation (PWM) outputs to control motor speed or LED brightness.

The same chip can do a completely different job if a different program is loaded, without changing the hardware.

### Common mistakes

- Confusing a microcontroller with a microprocessor in a PC. A microcontroller has memory and I/O built in, for a dedicated control task.

## C2.5(b) Interfacing sensors and outputs

### What you need to know

- Interface sensing circuits and output devices with microcontrollers.

### Explained

Inputs:

- Switches: connected with a pull-up or pull-down resistor (C1.3) so the pin reads a definite 1 or 0. Some microcontrollers have built-in pull-ups. Bounce can be handled in software with a short wait.
- Analogue sensors (LDR, thermistor): in a voltage divider connected to an analogue input pin; the ADC converts the voltage into a number (for example 0 to 255 for 8 bits, or 0 to 1023 for 10 bits, from 0 V to the supply voltage). The program compares the number with a threshold.
- Digital sensors (for example a PIR movement sensor or a Schmitt-conditioned signal) connect to a digital input.

Outputs:

- An output pin can supply only a small current (around 20 mA). It can drive an LED directly through a current-limiting resistor.
- Larger loads (motors, solenoids, relays, bright lamps, buzzers drawing more current) need a driver: an n-channel MOSFET or npn transistor (C1.4), with a protective diode across inductive loads.
- A 7-segment display is driven through resistors from seven output pins, or through a decoder/driver.
- Servos are controlled with timed pulses from an output pin.

The microcontroller usually runs from a regulated supply (often 5 V or 3.3 V); loads may use a separate, higher supply with common 0 V.

### Worked example

An 8-bit ADC on a 5 V supply. A thermistor divider gives 2.0 V. Reading = 2.0 ÷ 5.0 × 255 = 102.

A microcontroller pin gives 5 V. A red LED (2 V, 15 mA) needs a resistor (5 − 2) ÷ 0.015 = 200 Ω; E24 220 Ω.

### Common mistakes

- Connecting a motor directly to an output pin.
- Treating an analogue sensor as a digital input with no ADC.

## C2.5(c) Flowchart programs

### What you need to know

- Design and analyse flowchart programs that make microcontrollers perform tasks.

### Explained

Flowchart symbols:

| Shape | Use |
| --- | --- |
| Rounded rectangle (terminator) | Start, End, or the name of a sub-procedure |
| Rectangle (process) | An action: switch output on or off, wait a time, set or change a variable (for example A = A + 1), read an analogue input into a variable |
| Diamond (decision) | A yes/no question: is input 2 on? Is variable A > 100? Two exits labelled Yes and No |
| Parallelogram | Input or output (used by some software) |
| Arrows | Order of the steps |

Programs usually run in a loop for ever (an arrow back to near the start). Common structures:

- Wait for an input: a decision box looping back on itself until a button is pressed.
- Timing: "wait 0.5 s" boxes between output changes (a flashing LED: on, wait, off, wait, loop).
- Counting: use a variable; increase it in a process box; test it in a decision box (for example repeat 5 times).
- Thresholds: read the ADC into a variable, then a decision "is the variable > 150?".
- Sub-procedures (subroutines): a named block called from the main program, used for repeated tasks; it ends with a return.

Analysing a flowchart: trace through it step by step, keeping track of output states and variable values, as in a trace table.

### Worked example

Night-light with timed off: Start → output 1 off → read light sensor into A → decision "A < 60?" (dark) → No: loop back to read; Yes: output 1 on → wait 300 s → output 1 off → loop back to read.

Counting button presses: Start → C = 0 → decision "input 1 pressed?" No: loop; Yes: C = C + 1 → wait 0.2 s (debounce) → decision "C = 5?" No: back to input test; Yes: buzzer on, wait 2 s, buzzer off, C = 0 → back to input test.

### Common mistakes

- Decision boxes with only one exit or unlabelled exits.
- Forgetting to loop back, so the program runs once and stops.
- Testing a button without a wait, so one press counts many times.

## C2.5(d) Applications and reasons for adoption

### What you need to know

- Applications of microcontrollers and the reasons for their adoption as standard technology in the vehicle and domestic appliance industries.

### Explained

Applications:

- Vehicles: engine management (controls fuel injection and ignition timing from sensor readings), anti-lock brakes, airbags, climate control, electric windows and mirrors, dashboard displays, parking sensors, central locking, battery management in electric cars. A modern car contains dozens of microcontrollers communicating over a network.
- Domestic appliances: washing machines (programs, motor speed, water temperature and level), microwave ovens (timer, power level, keypad and display), dishwashers, central heating thermostats and timers, fridges, toys, smart speakers and other "smart home" devices.

Reasons for adoption:

- One chip replaces many separate components, so circuits are smaller, lighter, cheaper and more reliable (fewer joints and parts to fail).
- The same hardware can be used in many products or models; only the program changes, so development is cheaper and faster.
- Programs can be updated or improved without changing the circuit, even after sale (software updates).
- Complex functions are possible: many programs and settings, precise control, self-diagnosis and fault codes, data logging.
- Low power consumption and low cost when made in huge numbers.
- Improved efficiency (fuel economy, lower emissions, lower energy and water use) and safety in vehicles.

Possible drawbacks: programming skill is needed; software bugs can cause faults; repair may need specialist equipment; whole control boards are often replaced rather than repaired.

### Common mistakes

- Giving vague reasons such as "it is better". State a specific advantage, such as fewer components or reprogrammable.

## Check questions

1. Define a microcontroller. [2 marks]
2. Name two parts contained inside a microcontroller IC. [2 marks]
3. Explain why an LDR cannot be connected directly to a microcontroller's analogue input and what is needed. [2 marks]
4. A 10-bit ADC (0 to 1023) on a 5 V supply reads a sensor voltage of 1.5 V. Calculate the ADC reading. [2 marks]
5. Explain why a MOSFET is needed between a microcontroller and a solenoid lock. [2 marks]
6. Draw a flowchart for a program that flashes an LED on output 1 three times (0.5 s on, 0.5 s off) when a button on input 1 is pressed, then waits for the next press. [5 marks]
7. Describe what this flowchart does: Start → read temperature sensor into T → "T > 120?" Yes: heater off; No: heater on → wait 1 s → back to read. [2 marks]
8. Give three reasons why microcontrollers are used in washing machines. [3 marks]
9. Give two examples of microcontroller use in a car. [2 marks]

## Mark scheme

1. A programmable integrated circuit (1) into which software can be loaded so it can carry out different control tasks (1).
2. Any two: processor (1); program memory (1); RAM / data memory (1); input/output pins (1); ADC / timers (1).
3. The microcontroller reads a voltage, not a resistance (1); the LDR must be placed in a voltage divider with a fixed resistor (1).
4. 1.5 ÷ 5 × 1023 (1) = 307 (1).
5. The output pin can supply only a small current (1); the solenoid needs a much larger current, which the MOSFET switches from the supply (1). (Credit mention of a protective diode.)
6. Start and loop structure (1); decision "input 1 pressed?" with No looping back (1); counter variable set to 0 and increased each flash (1); output on, wait 0.5 s, output off, wait 0.5 s (1); decision "count = 3?" returning to the button test when Yes (1).
7. It keeps the temperature reading at about 120 (1) by switching the heater on when below 120 and off when above, checking every second (1).
8. Any three: one chip replaces many components (1); several washing programs from one hardware design (1); precise control of temperature / motor speed / water level (1); cheaper / more reliable / smaller (1); can show fault codes / be updated (1); saves energy and water (1).
9. Any two: engine management / ABS / airbags / climate control / parking sensors / electric windows / dashboard / battery management (1)(1).
