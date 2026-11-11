---
level: A-level
subject: Electronics
topic: "C2.3 Microcontrollers"
as_content: "C2.3(a) (flowcharts) is AS and A level; C2.3(b) to (e) are A level only."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["C2.3(a)", "C2.3(b)", "C2.3(c)", "C2.3(d)", "C2.3(e)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# C2.3 Microcontrollers

A microcontroller is a complete small computer on one chip, programmed to control a system. The spec uses the PIC (Programmable Interface Controller) family. Programs are planned with flowcharts and written in assembly language. NEA Task 1 (Component 3) requires programming a real PIC in assembler. GCSE background: [GCSE Electronics 11](../../../gcse/smaller-stem/electronics-eduqas/11-control-circuits.md).

Note: the spec does not list a fixed instruction set and says learners need not know every instruction. The examples here use common mid-range PIC instructions; use the instruction list given in any question.

## C2.3(a) Flowcharts

### What you need to know

Analyse and design flowchart programs for microcontrollers.

### Explained

| Symbol | Meaning |
| --- | --- |
| Rounded box (terminator) | Start or end |
| Rectangle | Process (for example "set output B0 high", "wait 1 s", "add 1 to count") |
| Diamond | Decision with yes/no branches (for example "is input A0 = 1?") |
| Parallelogram | Input or output (some conventions) |
| Arrows | Order of steps; loops go back to an earlier point |

Control programs normally loop forever (no end). Common structures: polling (repeatedly test an input and branch); delays (count down a register); counting events (increment a variable when an input changes, with debounce); subroutines (a separate flowchart called and then returned from).

### Worked example

Burglar alarm: Start → set all outputs low → is the door switch (A0) high? If no, loop back and test again. If yes → turn on buzzer (B0) → wait 30 s → turn off buzzer → back to testing. A reset switch could be tested in the buzzer loop to stop it early.

## C2.3(b) Structure of a PIC microcontroller

### What you need to know

Structure as programmable assemblies of memory, input ports, output ports, CPU, clock and reset.

### Explained

- **CPU** (with ALU and the working register W): fetches, decodes and executes instructions; does arithmetic and logic.
- **Program memory** (flash, non-volatile): holds the program; it keeps its contents when power is off.
- **Data memory** (RAM, volatile): general-purpose registers for variables, plus special function registers (SFRs) that control ports, timers and status flags. Some PICs also have EEPROM for data that must survive power-down.
- **Input/output ports**: groups of pins (PORTA, PORTB) that can each be set as input or output using a direction register (TRIS: 1 = input, 0 = output). Outputs can source or sink small currents (about 20 mA); larger loads need drivers.
- **Clock**: an oscillator (internal RC or external crystal) sets the speed; each instruction takes a fixed number of clock cycles (typically four).
- **Reset**: restarts the program from the beginning (power-on reset or a reset pin), putting registers into known states.
- Often also: timers, ADC, comparators, serial communication modules.

## C2.3(c) Interrupts

### Explained

Polling wastes time and can miss short events. An **interrupt** lets an external device request attention: when the interrupt signal occurs (for example a rising edge on the interrupt pin, or a timer overflow), the processor finishes the current instruction, saves the return address on the stack, and jumps to an **interrupt service routine** (ISR). After the ISR (ending with a return-from-interrupt instruction, RETFIE), the main program resumes where it left off. Interrupts must be enabled (global and individual enable bits), and the ISR must clear the interrupt flag. Uses: emergency stop buttons, counting fast pulses, keypad presses, timed events.

## C2.3(d) Applications

Microcontrollers are used where flexible, programmable control is needed at low cost: washing machines, microwave ovens, toys, remote controls, central heating controllers, car systems, alarms, robots. Advantages over discrete logic: fewer components, smaller, cheaper, easily changed by reprogramming, can handle complex sequences, timing and arithmetic. Disadvantages: programming needed; slower than dedicated hardware for some tasks; need to protect from electrical noise.

## C2.3(e) Assembly language programming

### What you need to know

Analyse, design and program PIC microcontroller circuits in assembly language.

### Explained

Assembly language uses short mnemonics, each translated into one machine-code instruction. Common mid-range PIC instructions:

| Instruction | Action |
| --- | --- |
| MOVLW k | Load literal k into W |
| MOVWF f | Copy W into register f |
| MOVF f,W | Copy register f into W |
| CLRF f | Clear register f to 0 |
| BSF f,b / BCF f,b | Set / clear bit b of register f |
| BTFSS f,b / BTFSC f,b | Test bit b; skip the next instruction if set / if clear |
| INCF f,F / DECF f,F | Increment / decrement register f |
| DECFSZ f,F | Decrement f; skip next instruction if the result is zero |
| ADDWF f,F / SUBWF f,F | Add / subtract W and f |
| ANDLW k, IORLW k, XORLW k | Logic with a literal |
| GOTO label | Jump |
| CALL label / RETURN | Call and return from a subroutine |
| NOP | Do nothing for one cycle |

Ports are set up by writing to TRIS registers (in a separate memory bank on many PICs, selected with bank-select bits; follow the setup code given in questions).

### Worked example

Light an LED on RB0 while a switch on RA0 is pressed:

```
        BSF   STATUS,RP0    ; select bank 1
        MOVLW b'00000001'   ; RA0 input
        MOVWF TRISA
        CLRF  TRISB         ; port B all outputs
        BCF   STATUS,RP0    ; back to bank 0
LOOP    BTFSS PORTA,0       ; is switch pressed (RA0 = 1)?
        GOTO  OFF           ; no
        BSF   PORTB,0       ; yes: LED on
        GOTO  LOOP
OFF     BCF   PORTB,0       ; LED off
        GOTO  LOOP
```

**Delay subroutine** using DECFSZ:

```
DELAY   MOVLW d'250'
        MOVWF COUNT
DLOOP   NOP
        DECFSZ COUNT,F      ; count down to zero
        GOTO  DLOOP
        RETURN
```

Each pass of the loop takes about 4 instruction cycles (NOP 1, DECFSZ 1, GOTO 2). With a 4 MHz clock (1 µs per instruction cycle), the delay ≈ 250 × 4 µs = 1 ms. Nesting this inside another loop gives longer delays.

**Counting events**: test the input; when it goes high, increment a register, then wait until it goes low again (so one press counts once), with a short debounce delay. Compare the count with a target using SUBWF or XORLW and test the Z (zero) flag in STATUS.

### Common mistakes

- Forgetting to set TRIS directions, so pins do not drive outputs.
- Using BTFSS when BTFSC is needed (check which case skips).
- Counting one press many times by not waiting for release.
- Not clearing the interrupt flag in an ISR.

## Check questions

1. Draw a flowchart for a system that flashes an LED on and off once per second while a switch is closed. (4)
2. State the function of the program memory, data memory and clock in a PIC. (3)
3. Explain the advantage of using an interrupt rather than polling for an emergency stop button. (3)
4. Describe what happens when an interrupt occurs. (4)
5. Explain what this code does: BTFSC PORTA,1 / GOTO LOOP / BSF PORTB,3. (3)
6. A delay loop runs 200 times with 4 instruction cycles per loop and a 1 µs instruction cycle. Calculate the delay. (1)
7. Write assembly code to set RB2 high if RA0 = 1, otherwise clear it, repeating forever (assume ports already set up). (4)
8. Give two advantages of using a microcontroller rather than discrete logic ICs in a washing machine. (2)

## Mark scheme

1. Start; test switch decision (1); LED on, wait 0.5 s (1); LED off, wait 0.5 s (1); loop back to the switch test (1).
2. Program memory: stores program, non-volatile (1); data memory: stores variables and registers, volatile (1); clock: sets the rate instructions are executed (1).
3. Response is immediate whatever the program is doing (1); polling might miss a short press or respond late if the program is in a long delay (1); safety-critical (1).
4. Current instruction completed (1); return address saved on the stack (1); jumps to interrupt service routine (1); after RETFIE returns to the main program (1).
5. Tests bit 1 of port A (1); if it is clear (0), skip the GOTO, so RB3 is set (1); if set (1), go back to LOOP (1). (Accept equivalent: waits until RA1 is low, then sets RB3.)
6. 200 × 4 × 1 µs = 800 µs (1).
7. LOOP BTFSS PORTA,0 (1); GOTO CLR (1); BSF PORTB,2 / GOTO LOOP (1); CLR BCF PORTB,2 / GOTO LOOP (1).
8. Any two: fewer components / smaller; cheaper; reprogrammable / easy to change; handles complex timing and sequences; built-in timers / ADC.
