---
level: GCSE
subject: Computer Science
topic: "The CPU, systems architecture and embedded systems"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.4.5"]
  - board: OCR
    code: "J277"
    spec_refs: ["1.1.1", "1.1.2", "1.1.3"]
  - board: Edexcel
    code: "1CP2"
    spec_refs: ["3.1.1", "3.1.3"]
  - board: Eduqas
    code: "C500QS"
    spec_refs: ["1: Central processing unit", "1: Additional hardware components", "1: Embedded systems"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-gcse/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# The CPU, systems architecture and embedded systems

This file covers the purpose of the CPU, the Von Neumann stored program architecture, the CPU's components (ALU, control unit, registers, cache, clock and buses), the fetch-decode-execute cycle, the factors that affect CPU performance, embedded systems, and (Eduqas) graphics processing units, sound cards and motherboards.

## Overview

The CPU (central processing unit) is the part of the computer that processes data and runs program instructions. Every board asks you to describe what each part does during the fetch-decode-execute cycle and to explain what makes one CPU faster than another.

### Board differences

- AQA 8525: 3.4.5 (Paper 2). Main memory, ALU, control unit, clock, register and bus; a bus is a set of parallel wires carrying signals. AQA does not require named registers. Performance: clock speed, number of cores, cache size. Embedded and non-embedded systems, with examples of both. Memory and storage parts of 3.4.5 are in [13-memory-and-storage.md](13-memory-and-storage.md).
- OCR J277: 1.1.1 to 1.1.3 (J277/01). ALU, CU, cache, registers, and Von Neumann registers MAR, MDR, program counter and accumulator: what each stores (data or an address) and does in the cycle. Passing data between registers step by step is not required. Performance: clock speed, cache size, number of cores, individually or in combination.
- Edexcel 1CP2: 3.1.1 and 3.1.3 (Paper 1). Von Neumann stored program concept; RAM, CPU (control unit, ALU, registers), clock, address bus, data bus and control bus in the fetch-decode-execute cycle. Edexcel does not name individual registers or list performance factors.
- Eduqas C500QS: section 1 (Component 1). The fullest list: CU, ALU, main memory, cache, registers, program counter (PC), current instruction register (CIR), accumulator (ACC), MAR, MDR, input and output devices. Performance: cache size and levels of cache, clock speed, number of cores. Additional hardware: integrated and dedicated GPUs, sound cards, motherboards.

## Purpose of the CPU and the Von Neumann architecture

*Refs: AQA 3.4.5 · OCR 1.1.1 · Edexcel 3.1.1 · Eduqas 1: Central processing unit.*

### What you need to know

- The CPU fetches instructions from main memory, decodes them and executes them, processing data to produce output. It does this billions of times a second.
- Von Neumann architecture / stored program concept: program instructions and data are stored together, in the same main memory, in binary. The CPU fetches both over the same buses. Instructions are fetched and run one after another.
- Main memory (RAM) holds the programs and data currently in use. The CPU can access it directly.

### Explained

Before stored-program computers, changing what a machine did meant rewiring it. Storing instructions in memory as data means a new program can simply be loaded.

## Components of the CPU

*Refs: AQA 3.4.5 · OCR 1.1.1 · Edexcel 3.1.1 · Eduqas 1: Central processing unit.*

### What you need to know

- Arithmetic logic unit (ALU): does arithmetic (add, subtract, shifts) and logic operations (AND, OR, NOT, comparisons).
- Control unit (CU): decodes instructions and sends control signals to the other parts to carry them out; controls the flow of data inside the CPU and to and from memory; manages the fetch-decode-execute cycle.
- Clock: sends out regular electrical pulses that keep all parts in step. Each pulse lets the CPU do a step of work.
- Registers: very small, very fast storage locations inside the CPU, each with a set job:
  - Program counter (PC): holds the address of the next instruction to fetch.
  - Memory address register (MAR): holds the address of the memory location to be read from or written to.
  - Memory data register (MDR): holds the data or instruction just fetched from memory, or about to be written to it.
  - Current instruction register (CIR) (Eduqas): holds the instruction currently being decoded and executed.
  - Accumulator (ACC): holds the results of calculations done by the ALU.
  - Address vs data: the PC and MAR hold addresses; the MDR, CIR and ACC hold data or instructions.
- Cache: a small amount of very fast memory in or next to the CPU that holds frequently used instructions and data, so the CPU does not have to wait for slower RAM.
- Buses: sets of parallel wires that carry signals between the CPU and memory:
  - Address bus: carries memory addresses from the CPU to memory (one direction).
  - Data bus: carries data and instructions between the CPU and memory (both directions).
  - Control bus: carries control signals such as read, write and clock signals (both directions).
- Input and output devices (Eduqas) send data to and receive data from the CPU via the buses and controllers.

### Common mistakes

- Saying the PC "counts how many instructions have run". It holds the address of the next one.
- Mixing up the MAR (an address) and the MDR (the contents at that address).
- Saying the ALU "stores" results. It calculates; the accumulator stores the result.

## The fetch-decode-execute cycle

*Refs: AQA 3.4.5 · OCR 1.1.1 · Edexcel 3.1.1 · Eduqas 1: Central processing unit.*

### What you need to know

Fetch:

1. The address in the PC is copied to the MAR.
2. The address is sent along the address bus to memory, and a read signal is sent on the control bus.
3. The instruction at that address is sent back on the data bus into the MDR.
4. The instruction is copied to the CIR (Eduqas; boards that do not name the CIR just say it goes to the CU).
5. The PC is incremented (increased by 1) so it points to the next instruction.

Decode:

6. The control unit decodes the instruction to work out what to do (the opcode) and what data it uses (the operand).

Execute:

7. The instruction is carried out. For example, data is fetched from memory (its address goes into the MAR, the data comes back into the MDR), the ALU does a calculation and the result goes into the accumulator, or a value is written to memory. A jump instruction changes the PC.

Then the cycle repeats.

### Worked example

The instruction at address 20 is "ADD 50": add the value in memory location 50 to the accumulator. The accumulator holds 7 and location 50 holds 5. Describe the cycle.

1. PC holds 20; 20 is copied into the MAR.
2. The instruction ADD 50 is fetched from address 20 into the MDR, then copied to the CIR.
3. PC becomes 21.
4. CU decodes: opcode ADD, operand address 50.
5. 50 is put in the MAR; the value 5 is read into the MDR.
6. The ALU adds 5 to the accumulator's 7; the accumulator now holds 12.

### Common mistakes

- Incrementing the PC during execute instead of during fetch.
- Missing out the buses when the question asks how the instruction gets from memory to the CPU.

## CPU performance

*Refs: AQA 3.4.5 · OCR 1.1.2 · Eduqas 1: Central processing unit.*

### What you need to know

- Clock speed: number of cycles per second, in hertz (3.5 GHz = 3.5 billion cycles per second). Higher clock speed means more instructions fetched and executed per second. Limits: more heat and power use.
- Number of cores: each core is a separate processing unit that can run its own fetch-decode-execute cycle. More cores can process more instructions at the same time, but only if the software is written to split tasks between cores; some tasks must run in order, and cores share resources, so doubling cores does not double speed.
- Cache size: a bigger cache holds more frequently used data and instructions, so the CPU waits for RAM less often.
- Levels of cache (Eduqas): L1 is smallest and fastest (inside each core); L2 is larger and a little slower; L3 is larger still, slower, and often shared between cores. The CPU checks L1, then L2, then L3, then RAM.

### Worked example

A user wants to replace a 2-core 2.4 GHz CPU with 4 MB cache with either a 2-core 3.6 GHz CPU or a 6-core 2.4 GHz CPU. Explain which suits (a) an old single-threaded game, (b) video editing software that uses many threads.

1. (a) The game can only use one core, so extra cores give little benefit. The faster clock (3.6 GHz) does 50% more cycles per second, so choose the 2-core 3.6 GHz CPU.
2. (b) Video editing splits work across cores, so six cores can process far more at once. Choose the 6-core CPU.

### Common mistakes

- Saying "more cores always means faster".
- Saying cache is "extra RAM" or "storage". It is a small, fast memory close to the CPU.

## Embedded systems

*Refs: AQA 3.4.5 · OCR 1.1.3 · Edexcel 3.1.3 · Eduqas 1: Embedded systems.*

### What you need to know

- An embedded system is a computer system built into a larger device to do one specific, dedicated task (or a small set of tasks).
- Characteristics: small; low power; low cost; reliable; often real-time; has its program stored in ROM or flash (firmware) that the user cannot change; limited or no user interface.
- Examples: washing machines, microwave ovens, central heating thermostats, traffic lights, car engine management and anti-lock brakes, digital cameras, smart meters, fitness trackers, medical devices such as pacemakers.
- Non-embedded (general-purpose) systems, such as a PC, laptop or smartphone, can run many different programs chosen by the user (AQA asks for examples of both).

### Worked example

Explain why a washing machine uses an embedded system rather than a general-purpose computer.

1. It only needs to run a few wash programs: a dedicated system is enough.
2. An embedded system is small enough to fit inside, cheap, and uses little power.
3. Its fixed program in ROM is reliable and does not need updating by the user.

### Common mistakes

- Giving a smartphone as an embedded system. It is general-purpose: it runs any apps the user installs.

## Additional hardware components (Eduqas)

*Refs: Eduqas 1: Additional hardware components.*

### What you need to know

- Graphics processing unit (GPU): a processor designed to do huge numbers of simple calculations in parallel, used to draw images and video on screen (and for tasks such as machine learning).
  - Integrated GPU: built into the CPU chip or motherboard; shares main memory; cheap, low power; fine for everyday use.
  - Dedicated (discrete) GPU: a separate graphics card with its own fast video memory; much more powerful, for gaming, 3D design and video editing; costs more and uses more power.
- Sound card: converts digital audio data to analogue signals for speakers and headphones, and analogue microphone input to digital (converters), often with its own processing. Most computers now have sound built into the motherboard; a dedicated card gives higher quality.
- Motherboard: the main circuit board that connects all the components: CPU socket, RAM slots, expansion slots (for graphics and sound cards), storage connectors, ports, the buses between them, and the chip that holds the start-up firmware.

### Common mistakes

- Saying a GPU "makes the computer faster" in general. It speeds up graphics and parallel tasks, not everything.

## Check questions

1. State the purpose of the CPU. [1 mark]
2. Describe the role of the control unit. [2 marks]
3. Explain what is meant by the stored program concept. [2 marks]
4. Describe the purpose of the program counter and the memory address register. [2 marks]
5. Describe the fetch stage of the fetch-decode-execute cycle. [4 marks]
6. State the purpose of the data bus and the address bus. [2 marks]
7. Explain why doubling the number of cores might not double performance. [2 marks]
8. Explain how cache size affects CPU performance. [2 marks]
9. Give two characteristics of an embedded system and two examples. [4 marks]
10. (Eduqas) Explain why a video editor might choose a dedicated GPU rather than an integrated GPU. [2 marks]

## Mark scheme

1. To fetch, decode and execute instructions / process data (1).
2. Any two: decodes instructions (1); sends control signals to coordinate other components (1); controls the fetch-decode-execute cycle / flow of data (1).
3. Instructions and data are both stored in the same main memory (1) in binary, and are fetched and executed by the CPU in sequence (1).
4. PC holds the address of the next instruction to be fetched (1); MAR holds the address of the memory location being read from or written to (1).
5. Address in the PC copied to the MAR (1); instruction at that address fetched from memory along the data bus (1) into the MDR (1); PC incremented (1).
6. Data bus carries data/instructions between CPU and memory (1); address bus carries the address of the memory location from the CPU (1).
7. Software must be written to use multiple cores / some tasks cannot be split (1); cores share resources such as cache and memory / have to communicate (1).
8. Larger cache holds more frequently used data/instructions (1), so the CPU has to fetch from slower RAM less often, improving performance (1).
9. Any two characteristics: dedicated to one task; low power; small; low cost; reliable; program in ROM/firmware (2). Any two examples such as washing machine, microwave, traffic lights, car engine control (2).
10. A dedicated GPU has its own memory and far more processing power (1), so rendering/previewing video is much faster (1).
