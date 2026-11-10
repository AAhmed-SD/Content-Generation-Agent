---
level: A-level
subject: Computer Science
topic: "Instruction sets, opcodes and operands, addressing modes, AQA assembly language and Little Man Computer"
as_content: "AQA 4.7.3.3 to 4.7.3.5 are also AS (7516 3.7.3.3 to 3.7.3.5). OCR: Little Man Computer is also AS; addressing modes (1.2.4(d)) are A-level only."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.7.3.3", "4.7.3.4", "4.7.3.5"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.2.4(c)", "1.2.4(d)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C2.1: Assembly language programming"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Assembly language and addressing modes

This file covers what an instruction set is, how an instruction splits into opcode and operand, addressing modes (immediate, direct, indirect, indexed), the operations of AQA's assembly language with traced programs, and OCR's Little Man Computer (LMC). How instructions are fetched and executed is in [23-processor-and-fetch-execute.md](23-processor-and-fetch-execute.md).

New at A-level (GCSE only names assembly language as low-level).

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Language used | AQA assembly language (register-based; instruction set given in the exam) | Little Man Computer (accumulator-based) | Simple assembly programs; the instruction set is given in the question |
| Addressing modes | Immediate and direct | Immediate, direct, indirect, indexed | Not named |
| Operations | Load, store, add, subtract, compare, branch (conditional and unconditional), AND, OR, NOT, XOR, logical shifts, halt | LMC's ADD, SUB, STA, LDA, BRA, BRZ, BRP, INP, OUT, HLT, DAT | Write programs and show how they are executed |

## 4.7.3.3 The processor instruction set

*Refs: AQA 4.7.3.3 · OCR 1.2.4(c).*

### What you need to know

- A processor's instruction set is the complete set of machine code instructions it can execute. It is processor-specific: machine code for one processor family will not run on another.
- An instruction is made of an opcode (the operation to perform, and in AQA's simple model also the addressing mode) and one or more operands (a value, a memory address or a register).
- The number of bits for the opcode limits how many different instructions there can be: with n opcode bits, 2ⁿ opcodes. The number of operand bits limits the largest value or address in the operand.

### Worked example

An 8-bit instruction has 4 bits of opcode (3 for the operation, 1 for the addressing mode) and 4 bits of operand. There are 2⁴ = 16 possible opcodes (8 operations × 2 modes). The operand can hold 0 to 15, so a direct-addressing instruction can only reach addresses 0 to 15.

## 4.7.3.4 Addressing modes

*Refs: AQA 4.7.3.4 · OCR 1.2.4(d).*

### What you need to know

- Immediate addressing: the operand is the actual value (datum) to use. Fast (no memory access), but the value is fixed in the program. AQA writes it with #: `ADD R1, R2, #5` adds 5.
- Direct addressing: the operand is the address of the datum (in main memory or a register). `LDR R0, 100` loads whatever is stored at address 100. AQA treats a register name as a direct address too.
- Indirect addressing (OCR): the operand is the address of a location that holds the address of the datum (a pointer). Lets a short operand reach any address in a large memory, and lets the program change where it reads from at run time.
- Indexed addressing (OCR): the actual address = the operand + the contents of an index register (IR). Changing the index register steps through consecutive locations, ideal for arrays and loops.

### Worked example

Memory: address 10 holds 25; address 25 holds 99; address 13 holds 42. Index register = 3.

| Instruction | Mode | Value loaded into the accumulator |
| --- | --- | --- |
| LOAD #10 | Immediate | 10 |
| LOAD 10 | Direct | 25 (the contents of 10) |
| LOAD (10) | Indirect | 99 (address 10 holds 25; address 25 holds 99) |
| LOAD 10,X | Indexed | 42 (10 + 3 = 13; address 13 holds 42) |

## 4.7.3.5 Machine-code and assembly language operations

*Refs: AQA 4.7.3.5 · Eduqas C2.1: Assembly language programming.*

### What you need to know

The AQA instruction set (provided in the exam; R registers, `<operand2>` is either `#n` immediate or `Rm` a register):

| Mnemonic | Meaning |
| --- | --- |
| LDR Rd, \<memory ref\> | Load the value at the memory address into register d |
| STR Rd, \<memory ref\> | Store the value in register d at the memory address |
| ADD Rd, Rn, \<operand2\> | Rd ← Rn + operand2 |
| SUB Rd, Rn, \<operand2\> | Rd ← Rn − operand2 |
| MOV Rd, \<operand2\> | Copy operand2 into Rd |
| CMP Rn, \<operand2\> | Compare Rn with operand2 (sets the status flags) |
| B \<label\> | Branch (jump) always to the label |
| B\<condition\> \<label\> | Branch if the condition holds after the last CMP: BEQ (equal), BNE (not equal), BGT (greater than), BLT (less than) |
| AND Rd, Rn, \<operand2\> | Bitwise AND |
| ORR Rd, Rn, \<operand2\> | Bitwise OR |
| EOR Rd, Rn, \<operand2\> | Bitwise XOR |
| MVN Rd, \<operand2\> | Bitwise NOT of operand2 into Rd |
| LSL Rd, Rn, \<operand2\> | Logical shift left Rn by operand2 places into Rd |
| LSR Rd, Rn, \<operand2\> | Logical shift right |
| HALT | Stop |

- Selection and iteration in assembly are built from CMP and branches: there are no IF or WHILE statements.
- Eduqas: you are given the instruction set; write simple programs and show (trace) how they execute.

### Worked example: selection

Store the larger of the values at addresses 100 and 101 in address 102.

```
        LDR R0, 100
        LDR R1, 101
        CMP R0, R1
        BGT first        ; if R0 > R1 jump to first
        STR R1, 102      ; otherwise R1 is larger (or equal)
        B done
first:  STR R0, 102
done:   HALT
```

Trace with [100] = 8, [101] = 13: R0 = 8, R1 = 13; CMP: 8 > 13 is false, so no branch; store 13 at 102; branch to done; halt.

### Worked example: iteration

Multiply the value at address 200 by the value at 201 using repeated addition (both positive), and store the result at 202.

```
        LDR R0, 200      ; R0 = number to add
        LDR R1, 201      ; R1 = counter
        MOV R2, #0       ; R2 = running total
loop:   CMP R1, #0
        BEQ end
        ADD R2, R2, R0
        SUB R1, R1, #1
        B loop
end:    STR R2, 202
        HALT
```

Trace with [200] = 6, [201] = 3:

| R0 | R1 | R2 | CMP R1, #0 |
| --- | --- | --- | --- |
| 6 | 3 | 0 | not equal |
| 6 | 2 | 6 | not equal |
| 6 | 1 | 12 | not equal |
| 6 | 0 | 18 | equal → end |

[202] = 18.

### Worked example: bitwise and shifts

```
        LDR R0, 50       ; suppose [50] = 0110 1101
        AND R1, R0, #15  ; 15 = 0000 1111 → R1 = 0000 1101 (lower nibble)
        LSR R2, R0, #4   ; R2 = 0000 0110 (upper nibble moved down)
        LSL R3, R0, #1   ; R3 = 1101 1010 (× 2; a 0 was shifted out)
        EOR R4, R0, R0   ; R4 = 0 (XOR with itself clears a register)
        HALT
```

## Little Man Computer

*Refs: OCR 1.2.4(c).*

### What you need to know

- The LMC is a simple model computer with 100 memory locations (mailboxes 00 to 99), each holding a three-digit decimal number, an accumulator, a program counter, an input tray and an output tray.
- Instructions (opcode digit and two-digit address):

| Mnemonic | Code | Meaning |
| --- | --- | --- |
| ADD | 1xx | Add the value at address xx to the accumulator |
| SUB | 2xx | Subtract the value at xx from the accumulator |
| STA | 3xx | Store the accumulator at address xx |
| LDA | 5xx | Load the value at xx into the accumulator |
| BRA | 6xx | Branch always to xx |
| BRZ | 7xx | Branch to xx if the accumulator is zero |
| BRP | 8xx | Branch to xx if the accumulator is zero or positive |
| INP | 901 | Input a value into the accumulator |
| OUT | 902 | Output the accumulator |
| HLT | 000 | Stop |
| DAT | | Reserve a memory location (with an optional initial value) and give it a label |

- LMC uses direct addressing only. Labels stand for addresses.

### Worked example

Input two numbers and output the larger.

```
        INP
        STA first
        INP
        STA second
        SUB first        ; second − first
        BRP secbig       ; if ≥ 0, second is larger or equal
        LDA first
        OUT
        HLT
secbig  LDA second
        OUT
        HLT
first   DAT
second  DAT
```

Trace with inputs 12 then 7: first = 12, second = 7; accumulator 7 − 12 = −5; BRP does not branch; load 12; output 12.

Count down from an input number to 0, outputting each value:

```
        INP
loop    OUT
        BRZ end
        SUB one
        BRA loop
end     HLT
one     DAT 1
```

Input 3: outputs 3, 2, 1, 0. When the accumulator is 0 after output, BRZ jumps to end.

## Common mistakes

- Mixing up `#5` (the number 5) and `5` (the contents of address 5) in AQA assembly.
- Forgetting the unconditional branch that skips the "else" part, so both parts run.
- Branching on the wrong condition after CMP (BGT tests the first operand greater than the second).
- In LMC, forgetting that SUB changes the accumulator: reload values you still need.
- Forgetting DAT lines, so labels have no addresses.

## Check questions

1. Explain what is meant by a processor's instruction set and why it is processor-specific. [2 marks]
2. A 16-bit instruction uses 6 bits for the opcode and 10 for the operand. How many opcodes are possible, and what is the highest address directly accessible? [2 marks]
3. Explain the difference between immediate and direct addressing, with an AQA assembly example of each. [4 marks]
4. (OCR) Address 30 holds 70, address 70 holds 5, address 34 holds 12 and the index register holds 4. State the value loaded by LDA with operand 30 in immediate, direct, indirect and indexed modes. [4 marks]
5. Trace this AQA program with [100] = 5 and state the value stored at 101 and the purpose of the program. [4 marks]

```
        LDR R0, 100
        MOV R1, #1
loop:   CMP R0, #1
        BEQ end
        ADD R1, R1, R1
        SUB R0, R0, #1
        B loop
end:    STR R1, 101
        HALT
```

6. Write an AQA assembly program that stores 1 in address 202 if the value in address 200 equals the value in address 201, otherwise stores 0. [5 marks]
7. Write AQA assembly to clear bits 0 to 3 of R0 and keep the rest. [2 marks]
8. (OCR) Write an LMC program that inputs two numbers and outputs their sum. [3 marks]
9. (OCR) Write an LMC program that inputs a number and outputs it doubled, repeating until 0 is input. [5 marks]
10. (OCR) Explain why indexed addressing is useful for processing an array. [2 marks]

## Mark scheme

1. The complete set of machine code instructions a processor can execute (1); different processor families have different circuits/opcodes, so machine code for one will not run on another (1).
2. 2⁶ = 64 opcodes (1); 2¹⁰ − 1 = 1,023 (1).
3. Immediate: the operand is the value itself (1), e.g. `ADD R0, R0, #3` (1). Direct: the operand is the address of the value (1), e.g. `LDR R0, 30` (1).
4. Immediate 30 (1); direct 70 (1); indirect 5 (1); indexed: 30 + 4 = 34 → 12 (1).
5. R0 = 5, R1 = 1; loop doubles R1 and decrements R0: R1 2, 4, 8, 16 as R0 goes 4, 3, 2, 1 (2); 16 stored at 101 (1); calculates 2^(n−1) for the input n (1).
6. Example:

```
        LDR R0, 200
        LDR R1, 201
        CMP R0, R1
        BEQ same
        MOV R2, #0
        B store
same:   MOV R2, #1
store:  STR R2, 202
        HALT
```

Loads both values (1); CMP (1); correct conditional branch (1); sets 1 and 0 on the correct paths with an unconditional branch to avoid falling through (1); stores at 202 and halts (1).
7. `AND R0, R0, #240` (accept the binary mask 1111 0000 for an 8-bit value) (1 for AND, 1 for the correct mask).
8. INP; STA a; INP; ADD a; OUT; HLT; a DAT (1 for input and store, 1 for ADD, 1 for output, halt and DAT).
9. Example:

```
loop    INP
        BRZ end
        STA num
        ADD num
        OUT
        BRA loop
end     HLT
num     DAT
```

Input in a loop (1); BRZ to end on 0 (1); store then add to itself to double (1); output (1); branch back and DAT (1).
10. The index register is added to a base address, so the same instruction accesses successive elements (1); incrementing the index in a loop steps through the array without changing the instruction (1).
