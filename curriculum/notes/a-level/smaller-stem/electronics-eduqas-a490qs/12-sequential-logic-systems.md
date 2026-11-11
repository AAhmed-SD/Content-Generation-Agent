---
level: A-level
subject: Electronics
topic: "C2.2 Sequential logic systems"
as_content: "C2.2(a) to (g) are AS and A level; C2.2(h) (synchronous sequence generators and state diagrams) is A level only."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["C2.2(a)", "C2.2(b)", "C2.2(c)", "C2.2(d)", "C2.2(e)", "C2.2(f)", "C2.2(g)", "C2.2(h)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# C2.2 Sequential logic systems

In sequential logic the outputs depend on the present inputs and on what happened before: the circuit has memory. This file covers latches, propagation delay, timing diagrams, D-type flip-flops and their uses, counters, number systems, and designing sequence generators. GCSE background: [GCSE Electronics 09](../../../gcse/smaller-stem/electronics-eduqas/09-sequential-systems.md).

## C2.2(a) The NAND SR latch

### Explained

Two NAND gates cross-coupled (each output feeding one input of the other). The free inputs are S̄ (set) and R̄ (reset), both active low (normally held high by pull-up resistors).

| S̄ | R̄ | Q | Q̄ | Action |
| --- | --- | --- | --- | --- |
| 1 | 1 | Q | Q̄ | Hold (memory) |
| 0 | 1 | 1 | 0 | Set |
| 1 | 0 | 0 | 1 | Reset |
| 0 | 0 | 1 | 1 | Not allowed (both outputs high; state uncertain when released) |

Uses: storing an event (an alarm that stays on until reset), switch debouncing (a changeover switch to S̄ and R̄: the first contact sets the latch and bounces are ignored).

## C2.2(b) Propagation delay

Every gate takes a short time (nanoseconds) for its output to respond to a change at its input. In sequential systems, delays add up through chains of gates and flip-flops. Effects: in asynchronous (ripple) counters each stage waits for the previous one, so outputs do not change together, producing brief false states ("glitches") which decoding logic may wrongly detect; the total delay limits the maximum clock frequency. Synchronous design (all flip-flops clocked together) reduces these problems.

## C2.2(c) Timing diagrams

A timing diagram plots logic levels of several signals against time on aligned axes (clock at the top). Use it to show when outputs change (for example, on rising clock edges), to read counts, and to show delays. Draw vertical guide lines at each active clock edge.

## C2.2(d) D-type flip-flops and their uses

### What you need to know

Characteristics and uses of D-type inputs and outputs in: transition gates (edge-triggered data latching), frequency dividers, asynchronous counters, PISO and SIPO shift registers, synchronous counters.

### Explained

A **D-type flip-flop** has a data input D, a clock input CK, outputs Q and Q̄, and asynchronous set (S) and reset (R) inputs. On the rising edge of the clock, Q takes the value at D at that instant and holds it until the next rising edge. Set and reset act immediately, overriding the clock (on CMOS 4013, active high).

| Use | Connection | Behaviour |
| --- | --- | --- |
| Transition gate / data latch | Data to D, event to CK | Captures D at the moment of a clock edge (for example registers which of two inputs arrived first) |
| Frequency divider (÷2) | Q̄ fed back to D | Output toggles on each rising edge; output frequency is half the clock |
| Asynchronous (ripple) counter | Each stage a ÷2; Q̄ (or Q) of one stage clocks the next | Counts in binary; outputs ripple; up or down depending on connection |
| Reset to a modulus | Logic detects the unwanted count and drives reset | Counter resets early (for example ÷10 counter resets at 1010) |
| SIPO shift register | Q of each stage to D of the next, common clock | Serial data shifts one place each clock; all bits available in parallel after n clocks |
| PISO shift register | Bits loaded in parallel with set/reset, then shifted out of the last stage one per clock | Converts parallel data to serial for transmission ([14](14-digital-communications.md)) |
| Synchronous counter | All flip-flops share the clock; logic sets each D input | All outputs change together; any sequence possible |

### Worked example

A ripple counter of three D-types (each with Q̄ to D, and Q̄ of one clocking the next, rising-edge triggered) counts 000, 001, 010 ... 111 then back to 000: a modulo-8 counter dividing frequency by 8. With a 1 kHz clock, the MSB output is 125 Hz.

## C2.2(e), (f) Counters producing sequences; two-digit decimal counting

### What you need to know

Design systems using a dedicated 4-bit counter and combinational logic to produce a sequence of events; design and analyse a 2-digit decimal counting system.

### Explained

A 4-bit counter IC (binary 0 to 15, or BCD 0 to 9) has clock, reset and four outputs. Decode the outputs with logic gates to turn things on at particular counts (for example traffic lights: red on for counts 0 to 3, red and amber at 4, green 5 to 8, amber 9). Use a reset when a chosen count is reached (feeding an AND of the relevant output bits to reset) to shorten the cycle.

**Two-digit decimal counter**: two BCD (decade) counters. The units counter counts 0 to 9; as it goes from 9 to 0, its carry (or the falling MSB, or a decoded 1001 → 0000 transition) clocks the tens counter. Each counter drives a BCD-to-seven-segment decoder and display. Counts 00 to 99. To count to a lower maximum (for example 00 to 59 for seconds), decode 6 on the tens counter (0110) to reset it.

## C2.2(g) Number systems

| Decimal | Binary | Hexadecimal | BCD |
| --- | --- | --- | --- |
| 9 | 1001 | 9 | 0000 1001 |
| 10 | 1010 | A | 0001 0000 |
| 15 | 1111 | F | 0001 0101 |
| 47 | 0010 1111 | 2F | 0100 0111 |
| 200 | 1100 1000 | C8 | 0010 0000 0000 |

- Hexadecimal: base 16, digits 0 to 9 and A to F; each hex digit is exactly 4 binary bits, so it is a compact way of writing binary.
- BCD (binary-coded decimal): each decimal digit is coded separately in 4 bits (0000 to 1001 only); used for driving decimal displays.

## C2.2(h) Synchronous sequence generators (A level only)

### What you need to know

Design sequence generators based on D-type flip-flops as synchronous counters; use state diagrams; explain stuck and unused states; use Boolean manipulation to simplify.

### Explained

**Method**:

1. Draw a **state diagram**: circles for each state (output code), arrows showing the next state after each clock pulse.
2. Write a **state table**: present state (Q outputs) and required next state.
3. For a D-type, the next state of each flip-flop equals its D input, so the "next state" column for each bit is the truth table for that D input.
4. Find each D input as a Boolean function of the present outputs (Karnaugh maps or algebra; [04](04-logic-systems.md)).
5. Check the **unused states**: codes not in the sequence. Work out where each leads. If an unused state leads to itself or a loop of unused states, the circuit could get **stuck** there (for example at power-up). Fix by changing the logic (using don't-cares deliberately) so every unused state leads into the main sequence, or by resetting at power-up.

### Worked example

Design a counter for the sequence 0 → 1 → 3 → 2 → 0 (a 2-bit Gray counter) using Q₁Q₀.

| Present Q₁Q₀ | Next Q₁Q₀ |
| --- | --- |
| 00 | 01 |
| 01 | 11 |
| 11 | 10 |
| 10 | 00 |

D₁ (next Q₁) = 1 for present 01 and 11, so D₁ = Q₀. D₀ (next Q₀) = 1 for present 00 and 01, so D₀ = Q̄₁. No unused states (all four codes are used), so no stuck states.

For a 3-bit sequence such as 0, 2, 3, 5, 0 (states 1, 4, 6, 7 unused), check each unused code: if, say, state 7 led to 7, the circuit would stick; redesign the logic so that 7 leads to 0.

### Common mistakes

- Saying a D-type changes state while the clock is high (it changes on the edge).
- Writing BCD for 15 as 1111 (BCD is 0001 0101).
- Forgetting to analyse unused states.

## Check questions

1. Draw a NAND SR latch and explain why the input 00 is not allowed. (3)
2. Explain how a changeover switch and an SR latch debounce a switch. (3)
3. Explain why decoding the outputs of a ripple counter can give false outputs. (3)
4. Show how a D-type is connected as a divide-by-two circuit and draw its timing diagram. (3)
5. Describe how a SIPO shift register stores the serial data 1011. (3)
6. Convert 173 to binary, hexadecimal and BCD. (3)
7. A 4-bit binary counter must count 0 to 11 and then reset. Design the reset logic. (2)
8. Design a synchronous counter using D-types for the sequence 00 → 10 → 11 → 01 → 00. (4)
9. Explain what a stuck state is and how it can be avoided. (2)

## Mark scheme

1. Two cross-coupled NAND gates with S̄ and R̄ inputs (1); 00 forces both outputs high, so Q and Q̄ are not complements (1); state unpredictable when both inputs return high (1).
2. Switch contacts connect to S̄ and R̄ (1); first contact sets / resets the latch (1); bounces on that contact do not change the stored state, and the switch does not reach the other contact while bouncing (1).
3. Each stage clocked by the previous, so outputs change one after another (1); brief intermediate counts appear (1); decoding logic may detect these glitches as valid counts (1).
4. Q̄ to D, clock to CK (1); Q toggles on each rising edge (1); timing diagram with Q at half the clock frequency (1).
5. Data presented to D of the first stage (1); each clock shifts bits one stage along (1); after four clocks the outputs Q₃Q₂Q₁Q₀ hold 1011 in parallel (1).
6. 1010 1101 (1); AD (1); 0001 0111 0011 (1).
7. Reset when the count reaches 12 (1100): AND of Q₃ and Q₂ drives reset (1); counts 0 to 11 (1).
8. State table: 00→10, 10→11, 11→01, 01→00 (1); D₁ = 1 for present 00 and 10, so D₁ = Q̄₀ (1); D₀ = 1 for present 10 and 11, so D₀ = Q₁ (1); circuit with common clock (1).
9. An unused state that leads only to itself or other unused states, so the circuit never reaches the wanted sequence (1); design the logic so all unused states lead into the sequence, or reset at power-up (1).
