---
board: Eduqas
level: GCSE
subject: Electronics
code: "C490QS"
also_covers: []
topic: "Component 2 Topic 3 Sequential systems"
spec_refs: ["C2.3(a)", "C2.3(b)", "C2.3(c)", "C2.3(d)", "C2.3(e)", "C2.3(f)", "C2.3(g)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-gcse/
pmt_url: null
---

# C2.3 Sequential systems

In a sequential system the output depends on what has happened before, not just on the present inputs: the circuit has memory. This topic covers the D-type flip-flop used for data transfer, latches and counters, timing diagrams, 7-segment displays, binary and BCD counters, decimal counting systems, counters that reset at a chosen value, and the 4017 decade counter sequencer.

## C2.3(a) and C2.3(b) D-type flip-flops and timing diagrams

### What you need to know

- Draw the circuit and describe the action of rising-edge-triggered D-type flip-flops used for data transfer, as latches, and as 1-bit and 2-bit binary up-counters.
- Complete timing diagrams for these.

### Explained

A D-type flip-flop has a data input D, a clock input CK, outputs Q and Q̄ (the opposite of Q), and usually Set (S) and Reset (R) inputs.

- On each rising edge of the clock (when CK changes from 0 to 1), Q takes the value that D has at that moment. Between rising edges, Q does not change, whatever D does: the flip-flop stores (remembers) one bit.
- Set = 1 forces Q = 1; Reset = 1 forces Q = 0, immediately, whatever the clock. In normal use S and R are held at 0 (pulled down).

Data transfer: the data on D is copied to Q at each rising clock edge. Several flip-flops clocked together can transfer a whole binary number at once.

Latch: D is connected to logic 1. A sensor or switch is connected to the clock input. The first rising edge (for example a door opening) sets Q to 1, and it stays at 1, even if the sensor goes back to 0, until Reset is pressed. Used in alarms.

1-bit counter (divide-by-2): Q̄ is connected back to D. At each rising clock edge, Q takes the value of Q̄, so Q changes state (toggles). Q changes once for every clock pulse, so Q completes one cycle for every two clock pulses: its frequency is half the clock frequency.

2-bit binary up-counter: two toggling flip-flops. The clock drives the first (output Q₀, least significant bit). The second flip-flop is clocked from Q̄₀ of the first, so it toggles whenever Q₀ falls from 1 to 0 (which is when Q̄₀ rises). Q₁ is the most significant bit. Reading Q₁Q₀ after successive clock pulses: 00, 01, 10, 11, 00, ... (0, 1, 2, 3, 0 ...). Q₀ has half the clock frequency; Q₁ has a quarter.

Timing diagrams show signals (CK, D, Q ...) as square waves on a common time axis, one under another. To complete one: mark each rising edge of the clock; at each, look at the input that matters (D) and set Q to that value; keep Q constant until the next rising edge.

### Worked example

2-bit counter starting at 00:

| Clock rising edge | Q₀ | Q₁ | Count |
| --- | --- | --- | --- |
| start | 0 | 0 | 0 |
| 1 | 1 | 0 | 1 |
| 2 | 0 | 1 | 2 |
| 3 | 1 | 1 | 3 |
| 4 | 0 | 0 | 0 |

On edge 2, Q₀ falls 1 → 0, so Q̄₀ rises and clocks the second flip-flop, which toggles Q₁ from 0 to 1.

### Common mistakes

- Changing Q on the falling edge of the clock.
- Changing Q when D changes between clock edges.
- Clocking the second stage from Q₀ instead of Q̄₀ (this gives a down-counter).

## C2.3(c) 7-segment display truth table

### What you need to know

- Complete a truth table showing the signals needed to display a given character on a common-cathode 7-segment display.

### Explained

A 7-segment display has seven LED segments labelled a to g: a (top), b (top right), c (bottom right), d (bottom), e (bottom left), f (top left), g (middle). Often there is also a decimal point (dp).

In a common-cathode display, all the LED cathodes are joined and connected to 0 V. A segment lights when its anode input is logic 1 (through a current-limiting resistor). (In a common-anode display, the opposite: segments light with logic 0.)

| Digit | a | b | c | d | e | f | g |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
| 1 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
| 2 | 1 | 1 | 0 | 1 | 1 | 0 | 1 |
| 3 | 1 | 1 | 1 | 1 | 0 | 0 | 1 |
| 4 | 0 | 1 | 1 | 0 | 0 | 1 | 1 |
| 5 | 1 | 0 | 1 | 1 | 0 | 1 | 1 |
| 6 | 1 | 0 | 1 | 1 | 1 | 1 | 1 |
| 7 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| 8 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| 9 | 1 | 1 | 1 | 1 | 0 | 1 | 1 |

Letters can also be shown: for example "H" = b, c, e, f, g; "E" = a, d, e, f, g; "L" = d, e, f.

### Common mistakes

- Using 0 to light a segment on a common-cathode display.
- Mislabelling the segments: go clockwise from a at the top, with g in the middle.

## C2.3(d) and C2.3(e) Binary and BCD counters; decimal counting systems

### What you need to know

- The action of, and timing diagrams for, dedicated binary and BCD counters.
- Recognise and analyse the block diagram and timing diagrams for a single-digit decimal counter: 4-bit BCD counter, decoder/driver and 7-segment display.

### Explained

Dedicated counter ICs contain several flip-flops already connected. A 4-bit binary counter has outputs Q₀ (A, least significant), Q₁, Q₂, Q₃ (D, most significant) and counts from 0000 to 1111 (0 to 15), then back to 0000, on each clock pulse. Each output has half the frequency of the one before. It also has a reset input (logic 1 on reset sets all outputs to 0).

A BCD (binary coded decimal) counter counts in binary from 0000 to 1001 (0 to 9), then resets to 0000 on the tenth pulse. Each decimal digit is coded by its own 4-bit binary number. Many BCD counters also give a carry-out signal when going from 9 to 0, to clock the next counter (for tens).

Timing diagram (4-bit binary): Q₀ toggles on every clock pulse; Q₁ toggles every 2 pulses; Q₂ every 4; Q₃ every 8.

Single-digit decimal counting system:

Clock pulses (from a switch with debouncing, or an astable) → 4-bit BCD counter (counts 0 to 9 in binary) → decoder/driver IC (converts the 4-bit BCD number into the seven signals a to g, and can supply enough current to light the segments) → 7-segment display (through current-limiting resistors) shows the digit.

### Worked example

After 13 clock pulses from reset: a 4-bit binary counter shows 1101 (13); a BCD counter shows 0011 (3), because it reset at the 10th pulse.

### Common mistakes

- Expecting a BCD counter to reach 1010 to 1111.
- Missing current-limiting resistors on the display segments.

## C2.3(f) Counters with reset and combinational logic

### What you need to know

- Design and analyse systems using counters that reset at a given value, and combinational logic to produce a given sequence.

### Explained

To make a counter count from 0 up to a chosen number and then return to 0, use logic to detect the first unwanted number and feed it to the reset input. Reset acts immediately, so the unwanted number appears only for a tiny moment.

Example: count 0 to 5 (a divide-by-6 counter, like a die). The first unwanted count is 6 = 0110, with Q₂ = 1 and Q₁ = 1 (the first time both are 1). Connect Q₁ and Q₂ to an AND gate; its output goes to Reset. When the count reaches 0110 the AND gate output becomes 1 and the counter resets to 0000. Only the 1s need to be detected, provided no earlier count has the same pattern of 1s.

Producing a sequence: combinational logic connected to the counter outputs can turn outputs on at particular counts. For example, for a traffic light sequence over four counts (0 to 3) from a 2-bit counter: red on for counts 0 and 1 (Q₁ = 0, so red = Q̄₁); amber on for counts 1 and 3 (amber = Q₀); green on for count 2 only (green = Q₁.Q̄₀). Writing a truth table of count against required outputs, then deriving the expression for each output (C1.6), is the reliable method.

### Worked example

Design a counter that counts 0 to 9 using a 4-bit binary counter. The first unwanted count is 10 = 1010: Q₃ = 1 and Q₁ = 1. AND Q₃ and Q₁ and connect to Reset. (No count from 0 to 9 has both Q₃ and Q₁ at 1, so only 10 is detected.)

### Common mistakes

- Detecting the last wanted number (5) instead of the first unwanted (6), which would make the counter skip 5.

## C2.3(g) The 4017 decade counter sequencer

### What you need to know

- Design a sequencer using a 4017 decade counter and draw its timing diagrams.

### Explained

The 4017 is a decade counter with ten decoded outputs Q0 to Q9. Only one output is high at a time: on each rising clock edge, the high output moves on to the next one (Q0 → Q1 → ... → Q9 → Q0). It also has a reset input (high resets to Q0) and a clock enable input (must be low to count).

Uses:

- Chasing or running lights: an LED (with resistor) on each output gives a single light moving along.
- Sequencer: outputs are combined with OR gates (or diodes) to turn devices on during chosen steps. For example, to have a lamp on during steps 2, 3 and 4, OR outputs Q2, Q3 and Q4.
- Shorter cycles: connect the output after the last required step to Reset. For a 6-step sequence (Q0 to Q5), connect Q6 to Reset: as soon as Q6 goes high, the counter returns to Q0.

Timing diagram: draw the clock; Q0 is high from reset until the first rising edge; Q1 is high between the first and second rising edges; and so on. Each output is high for exactly one clock period, one after the other in a "staircase" pattern.

### Worked example

A 4017 clocked at 2 Hz with Q4 connected to Reset gives a repeating sequence Q0, Q1, Q2, Q3 (four steps), each lasting 0.5 s, total cycle 2 s.

### Common mistakes

- Connecting the last wanted output (Q3) to Reset, which would remove step 3.
- Thinking several outputs can be high at once in a 4017.

## Check questions

1. Describe what happens to the Q output of a D-type flip-flop at a rising clock edge. [2 marks]
2. Explain how a D-type flip-flop can be used as a latch for a burglar alarm. [3 marks]
3. A D-type flip-flop has Q̄ connected to D. The clock frequency is 400 Hz. State the frequency of Q and explain. [2 marks]
4. Complete a table of Q₀ and Q₁ for six clock pulses of a 2-bit counter starting from 00. [3 marks]
5. Complete the truth table row for the digit 4 on a common-cathode 7-segment display. [2 marks]
6. Draw a block diagram for a system that counts the number of people entering a room (up to 9) and displays the count. [4 marks]
7. Design a counter using a 4-bit binary counter and logic that counts from 0 to 11 and then resets. [3 marks]
8. State the output of a 4-bit binary counter and of a BCD counter after 23 clock pulses from reset. [2 marks]
9. Explain how a 4017 can be made to give a sequence of seven steps. [2 marks]
10. A 4017 drives a lamp through an OR gate connected to Q1 and Q5. The counter is clocked at 1 Hz with Q8 connected to Reset. Describe the lamp's pattern. [3 marks]

## Mark scheme

1. Q takes the value of D (1) at that instant, and holds it until the next rising edge (1).
2. D is connected to logic 1 (1); the sensor is connected to the clock, so a rising edge from the sensor sets Q to 1 (1); Q stays at 1 (alarm on) even if the sensor returns to 0, until the reset is pressed (1).
3. 200 Hz (1); Q toggles at each rising edge, so it takes two clock pulses for one cycle of Q (1).
4. 01, 10, 11, 00, 01, 10 (Q₁Q₀) (3 marks; 1 for each two correct rows).
5. a = 0, b = 1, c = 1, d = 0, e = 0, f = 1, g = 1 (2 for all correct; 1 for five or six correct).
6. Sensor (e.g. light gate / switch) with debouncing / Schmitt (1) → BCD counter (1) → decoder/driver (1) → 7-segment display (1).
7. First unwanted count 12 = 1100 (1); Q₃ and Q₂ into an AND gate (1); output to Reset (1).
8. Binary: 23 − 16 = 7, 0111 (1). BCD: 3, 0011 (1).
9. Connect output Q7 (1) to the Reset input, so it returns to Q0 after Q6 (1).
10. Sequence of 8 steps (Q0 to Q7), 1 s each (1); lamp on during step Q1 and step Q5 (1); pattern repeats every 8 s (1).
