# WJEC Eduqas GCSE Electronics C490QS: spec map

Every spec point of WJEC Eduqas Level 1/Level 2 GCSE (9-1) in Electronics (C490QS), in the board's order, with the notes file that covers it.

- Specification: version 5, December 2025 (first teaching 2017, first award 2019). Qualification code C490QS; Ofqual number 603/0776/6. Not tiered.
- The spec numbers topics within each component (Component 1 topics 1 to 6; Component 2 topics 1 to 5) and lists lettered learning outcomes (a), (b) ... under each. This map uses "C1.3(g)" to mean Component 1, topic 3, outcome (g).
- Appendix A splits the equations into those learners must recall (V = IR, P = VI, P = I²R, E = Pt, series and parallel resistance) and those to select from a given list (voltage divider, P = V²/R, MOSFET, transistor gain, f = 1/T, 555 monostable and astable, amplifier gains, summing amplifier, De Morgan's identities). Each file marks which is which.
- Existing notes elsewhere cover some background at a lower level: current, voltage, resistance, power and I-V characteristics in [AQA GCSE Physics 4.2](../../../aqa/gcse/physics-8463/4.2-electricity.md), and logic gates in [GCSE Computer Science: Boolean logic](../../computer-science/07-boolean-logic.md). The Eduqas points go further (MOSFETs, 555 timers, op-amps, NAND redundancy), so every point is covered in full here, with those files as background.
- `refs_checked: false`: references were taken from the version 5 spec PDF and still need a person to check them.

## Papers

| Component | What it examines |
| --- | --- |
| Component 1: Discovering Electronics (written, 1 h 30 min, 80 marks, 40%) | C1 topics 1 to 6, plus synoptic questions |
| Component 2: Application of Electronics (written, 1 h 30 min, 80 marks, 40%) | C2 topics 1 to 5, plus synoptic questions |
| Component 3: Extended system design and realisation task (NEA, 40 marks, 20%) | A design-and-build project. Not covered by these notes |

## Files

- [01-systems-and-sub-systems.md](01-systems-and-sub-systems.md): C1.1 Electronic systems and sub-systems
- [02-circuit-concepts.md](02-circuit-concepts.md): C1.2 Circuit concepts
- [03-resistive-components.md](03-resistive-components.md): C1.3 Resistive components in circuits
- [04-switching-circuits.md](04-switching-circuits.md): C1.4 Switching circuits
- [05-applications-of-diodes.md](05-applications-of-diodes.md): C1.5 Applications of diodes
- [06-combinational-logic.md](06-combinational-logic.md): C1.6 Combinational logic systems
- [07-operational-amplifiers.md](07-operational-amplifiers.md): C2.1 Operational amplifiers
- [08-timing-circuits.md](08-timing-circuits.md): C2.2 Timing circuits
- [09-sequential-systems.md](09-sequential-systems.md): C2.3 Sequential systems
- [10-interfacing.md](10-interfacing.md): C2.4 Interfacing digital to analogue circuits
- [11-control-circuits.md](11-control-circuits.md): C2.5 Control circuits (microcontrollers)

## Component 1: Discovering Electronics

| Ref | Content | File |
| --- | --- | --- |
| C1.1(a) | Systems built from sensing, processing and output sub-systems; named sensors, processors and outputs | [01](01-systems-and-sub-systems.md) |
| C1.1(b) | Need for and use of transducer drivers | [01](01-systems-and-sub-systems.md) |
| C1.1(c) | Design and test electronic systems | [01](01-systems-and-sub-systems.md) |
| C1.2(a) | Standard circuit symbols and conventions | [02](02-circuit-concepts.md) |
| C1.2(b) | Current and voltage rules in series and parallel | [02](02-circuit-concepts.md); background in [AQA Physics 4.2](../../../aqa/gcse/physics-8463/4.2-electricity.md) |
| C1.2(c) | Test equipment: multimeter, timing equipment, logic probe, oscilloscope; I-V characteristics | [02](02-circuit-concepts.md) |
| C1.2(d) | V = IR, P = VI, P = I²R, E = Pt, P = V²/R | [02](02-circuit-concepts.md) |
| C1.3(a) | Effect of resistors in series and parallel | [03](03-resistive-components.md) |
| C1.3(b) | Series and parallel resistance equations | [03](03-resistive-components.md) |
| C1.3(c) | Colour code, E24 values, tolerance, power rating | [03](03-resistive-components.md) |
| C1.3(d) | LDRs and photodiodes, NTC thermistors, pressure, moisture and sound sensors, switches, potentiometers, pulse generators | [03](03-resistive-components.md) |
| C1.3(e) | Sensing circuits as voltage dividers | [03](03-resistive-components.md) |
| C1.3(f) | Switches with pull-up and pull-down resistors | [03](03-resistive-components.md) |
| C1.3(g) | Voltage divider equation | [03](03-resistive-components.md) |
| C1.3(h) | Current-limiting resistor for an LED | [03](03-resistive-components.md) |
| C1.4(a) | n-channel enhancement MOSFETs and npn transistors as switches | [04](04-switching-circuits.md) |
| C1.4(b) | I_D = g_M(V_GS − 3) | [04](04-switching-circuits.md) |
| C1.4(c) | npn rules (0.7 V); I_C = h_FE × I_B until saturation | [04](04-switching-circuits.md) |
| C1.4(d) | Voltage comparator ICs | [04](04-switching-circuits.md) |
| C1.4(e) | Comparing MOSFET, transistor and comparator switches | [04](04-switching-circuits.md) |
| C1.4(f) | Using data sheets to design switching circuits | [04](04-switching-circuits.md) |
| C1.5(a) | I-V characteristic of a silicon diode | [05](05-applications-of-diodes.md) |
| C1.5(b) | Diodes for protection and half-wave rectification | [05](05-applications-of-diodes.md) |
| C1.5(c) | Zener diode voltage regulation | [05](05-applications-of-diodes.md) |
| C1.6(a) | 1 and 0 as logic levels | [06](06-combinational-logic.md) |
| C1.6(b) | NOT, AND, OR, NAND, NOR, singly and combined | [06](06-combinational-logic.md); background in [GCSE CS Boolean logic](../../computer-science/07-boolean-logic.md) |
| C1.6(c) | Truth tables from a specification or a circuit | [06](06-combinational-logic.md) |
| C1.6(d) | Analysing gate systems with truth tables | [06](06-combinational-logic.md) |
| C1.6(e) | Boolean expressions and De Morgan's identities | [06](06-combinational-logic.md) |
| C1.6(f) | Designing gate systems | [06](06-combinational-logic.md) |
| C1.6(g) | NAND gate redundancy | [06](06-combinational-logic.md) |
| C1.6(h) | Designing from a truth table | [06](06-combinational-logic.md) |
| C1.6(i) | Logic IC data sheets and pin connections | [06](06-combinational-logic.md) |

## Component 2: Application of Electronics

| Ref | Content | File |
| --- | --- | --- |
| C2.1(a) | Amplifiers increase power or voltage; G = V_OUT/V_IN | [07](07-operational-amplifiers.md) |
| C2.1(b) | Gain-frequency graph, bandwidth, gain-bandwidth trade-off | [07](07-operational-amplifiers.md) |
| C2.1(c) | Voltage-time graphs of input and output | [07](07-operational-amplifiers.md) |
| C2.1(d) | Non-inverting and inverting op-amp amplifiers | [07](07-operational-amplifiers.md) |
| C2.1(e) | Clipping distortion | [07](07-operational-amplifiers.md) |
| C2.1(f) | G = 1 + R_F/R_1 and G = −R_F/R_IN | [07](07-operational-amplifiers.md) |
| C2.1(g) | Summing amplifier (mixer) | [07](07-operational-amplifiers.md) |
| C2.1(h) | Amplifier system block diagram | [07](07-operational-amplifiers.md) |
| C2.2(a) | RC time delay | [08](08-timing-circuits.md) |
| C2.2(b) | Charging and discharging graphs | [08](08-timing-circuits.md) |
| C2.2(c) | Changing R and C; monostable and astable voltage-time graphs | [08](08-timing-circuits.md) |
| C2.2(d) | 555 monostable, T = 1.1RC | [08](08-timing-circuits.md) |
| C2.2(e) | 555 astable: period and mark-space ratio | [08](08-timing-circuits.md) |
| C2.2(f) | Measuring astable output with an oscilloscope | [08](08-timing-circuits.md) |
| C2.2(g) | f = 1/T; f = 1.44/((R₁ + 2R₂)C); mark-space ratio | [08](08-timing-circuits.md) |
| C2.2(h) | 555 monostable and astable circuit diagrams | [08](08-timing-circuits.md) |
| C2.3(a) | D-type flip-flops: data transfer, latches, 1-bit and 2-bit counters | [09](09-sequential-systems.md) |
| C2.3(b) | Timing diagrams for these | [09](09-sequential-systems.md) |
| C2.3(c) | Truth table for a common-cathode 7-segment display | [09](09-sequential-systems.md) |
| C2.3(d) | Binary and BCD counters and their timing diagrams | [09](09-sequential-systems.md) |
| C2.3(e) | BCD counter, decoder/driver and 7-segment display system | [09](09-sequential-systems.md) |
| C2.3(f) | Counters that reset at a given value, with logic to give a sequence | [09](09-sequential-systems.md) |
| C2.3(g) | 4017 decade counter sequencer | [09](09-sequential-systems.md) |
| C2.4(a) | Schmitt inverter and debouncing | [10](10-interfacing.md) |
| C2.4(b) | Comparing transistors, comparators and Schmitt inverters as interfaces | [10](10-interfacing.md) |
| C2.4(c) | Designing interface circuits | [10](10-interfacing.md) |
| C2.5(a) | Definition of a microcontroller | [11](11-control-circuits.md) |
| C2.5(b) | Interfacing sensors and outputs to microcontrollers | [11](11-control-circuits.md) |
| C2.5(c) | Flowchart programs | [11](11-control-circuits.md) |
| C2.5(d) | Applications in vehicles and domestic appliances; reasons for adoption | [11](11-control-circuits.md) |

## Component 3 (NEA)

| Ref | Content | File |
| --- | --- | --- |
| C3(a) to (l) | Analyse a problem, specify, design, build, test and evaluate a system | Not covered (project work). The design-and-test skills it draws on are in [01](01-systems-and-sub-systems.md) and [02](02-circuit-concepts.md) |
