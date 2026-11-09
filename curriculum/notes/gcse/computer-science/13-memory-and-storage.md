---
level: GCSE
subject: Computer Science
topic: "Memory and storage"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.4.5"]
  - board: OCR
    code: "J277"
    spec_refs: ["1.2.1", "1.2.2"]
  - board: Edexcel
    code: "1CP2"
    spec_refs: ["3.1.1", "3.1.2"]
  - board: Eduqas
    code: "C500QS"
    spec_refs: ["1: Primary storage", "1: Secondary storage"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-gcse/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Memory and storage

This file covers primary storage (RAM, ROM, cache, registers, flash memory and virtual memory), volatile and non-volatile memory, why secondary storage is needed, magnetic, optical and solid state storage and how they work, cloud storage, and choosing storage by capacity, speed, portability, durability, reliability and cost.

## Overview

Primary storage (main memory) is what the CPU uses directly while it works: fast but small, and mostly volatile. Secondary storage keeps everything else permanently: slower, larger and cheaper per gigabyte.

### Board differences

- AQA 8525: 3.4.5 (Paper 2). RAM, ROM, cache and registers: uses, and volatile vs non-volatile. Main memory means what the CPU can access directly (not counting cache and registers). Secondary storage: solid state and magnetic (how they work, without NAND-gate detail), and cloud storage compared with local storage. Optical is not named in the 2025 specification (it was in earlier AQA specs) but is covered here for other boards.
- OCR J277: 1.2.1 and 1.2.2 (J277/01). RAM, ROM, virtual memory and cache. Optical, magnetic and solid state, compared by capacity, speed, portability, durability, reliability and cost, in scenarios. Component parts of storage devices are not required.
- Edexcel 1CP2: 3.1.1 (role of RAM) and 3.1.2 (secondary storage: magnetic, optical, solid state, and how data is stored on each).
- Eduqas C500QS: section 1. RAM, ROM, flash, cache and virtual memory; optical, magnetic, solid state and cloud storage, compared by capacity, durability, portability, speed and cost.

## Primary storage: RAM and ROM

*Refs: AQA 3.4.5 · OCR 1.2.1 · Edexcel 3.1.1 · Eduqas 1: Primary storage.*

### What you need to know

- Computers need primary storage to hold the instructions and data the CPU is using right now, because the CPU can only work on data in main memory, and secondary storage is far too slow to fetch from directly.
- Volatile memory loses its contents when the power is off. Non-volatile memory keeps them.
- RAM (random access memory):
  - Volatile; can be read and written.
  - Holds the operating system, open programs and their data while they are in use.
  - More RAM lets more programs and data be held at once without using virtual memory.
- ROM (read only memory):
  - Non-volatile; contents are set at manufacture and cannot normally be changed.
  - Holds the boot program (BIOS/firmware start-up instructions) that runs when the computer is switched on, checks the hardware and loads the operating system from secondary storage.
  - Small capacity.

| | RAM | ROM |
| --- | --- | --- |
| Volatile? | Yes | No |
| Read/write | Read and write | Read only |
| Holds | OS, programs and data in use | Start-up (boot) instructions |
| Size | Gigabytes | Small |

### Common mistakes

- Saying ROM stores "the operating system". It stores the program that loads the OS.
- Confusing RAM with storage: a "16 GB phone RAM" and "256 GB storage" are different things.

## Cache, registers and flash memory

*Refs: AQA 3.4.5 · OCR 1.2.1 · Eduqas 1: Primary storage.*

### What you need to know

- Cache: small, very fast, volatile memory between the CPU and RAM that holds frequently used instructions and data. See [12-cpu-and-embedded-systems.md](12-cpu-and-embedded-systems.md) for its effect on performance.
- Registers: the fastest and smallest memory, inside the CPU, each holding one value used in the fetch-decode-execute cycle.
- Memory hierarchy, fastest and smallest first: registers → cache → RAM → secondary storage.
- Flash memory (Eduqas): non-volatile memory that can be electrically erased and rewritten. Used in SSDs, USB sticks, SD cards, phones, and to hold firmware that can be updated.

## Virtual memory

*Refs: OCR 1.2.1 · Eduqas 1: Primary storage.*

### What you need to know

- Virtual memory is part of secondary storage used as if it were extra RAM, when RAM is full.
- How it works: the operating system moves data that is not being used right now from RAM to virtual memory on the storage drive, freeing RAM for the program that needs it. When the moved data is needed again, it is swapped back into RAM (and something else is moved out).
- Why: lets the computer keep more programs open than RAM alone would allow, instead of crashing or refusing to open them.
- Drawback: secondary storage is much slower than RAM, so heavy use of virtual memory slows the computer down. When data is constantly swapped back and forth, the computer becomes very slow (often called disk thrashing). Fix: add more RAM.

### Common mistakes

- Saying virtual memory makes the computer faster. It lets it run more, but slower.
- Saying virtual memory is "in the CPU" or "in the cloud". It is on the secondary storage drive.

## Why secondary storage is needed

*Refs: AQA 3.4.5 · OCR 1.2.2 · Edexcel 3.1.2 · Eduqas 1: Secondary storage.*

### What you need to know

- Secondary storage is non-volatile, so it keeps the operating system, programs and files when the power is off.
- It has a much larger capacity than RAM, and costs much less per gigabyte.
- The CPU cannot access it directly: data must be loaded into RAM first.

## Magnetic, optical and solid state storage

*Refs: AQA 3.4.5 · OCR 1.2.2 · Edexcel 3.1.2 · Eduqas 1: Secondary storage.*

### What you need to know

- Magnetic (hard disk drive, magnetic tape):
  - HDD: data is stored on spinning platters coated in magnetic material. A read/write head on a moving arm magnetises tiny areas in one of two directions to store 0s and 1s, and reads them back.
  - Large capacity, low cost per GB. Moving parts make it slower than SSD, noisier, use more power and easily damaged if dropped while running. Data can be fragmented, slowing access.
  - Magnetic tape: very large, cheap, read in order (sequential), used for archives and backups.
- Optical (CD, DVD, Blu-ray):
  - A laser reads the disc. Data is stored as pits and lands (flat areas) along a spiral track; the laser light reflects differently where the surface changes, and this is read as binary. Writable discs use a dye layer that the laser changes.
  - Cheap, portable, light. Small capacity (CD about 700 MB, DVD 4.7 GB, Blu-ray 25 GB or more per layer), slow, easily scratched. Used for distributing films, software and games, though now rarely.
- Solid state (SSD, USB flash drive, SD card):
  - Uses flash memory: electrical charges are trapped in cells made of transistors, with no moving parts. A charged or uncharged cell represents 1 or 0.
  - Very fast access, robust (no moving parts, shock-resistant), silent, low power, small and light. More expensive per GB than HDD; each cell can only be rewritten a limited number of times (though modern SSDs last for many years of normal use).
- Cloud storage (AQA, Eduqas): files are stored on remote servers (which use magnetic and/or solid state storage) owned by a provider, reached over the internet.
  - Advantages: access from any device anywhere; easy sharing and collaboration; the provider handles backups and hardware; capacity can grow as needed.
  - Disadvantages: needs an internet connection; slower than local storage for large files; ongoing cost; you trust a third party with security and privacy; the provider could change terms or close.

### Explained

Comparing by the characteristics in the specs:

| | Magnetic HDD | Optical | Solid state |
| --- | --- | --- | --- |
| Capacity | Very high | Low | High |
| Speed | Medium | Slow | Very fast |
| Portability | Bulky internal; external drives portable | Very portable | Very portable (USB, SD) |
| Durability | Damaged by knocks and magnets | Scratches easily | Very durable |
| Reliability | Moving parts can fail | Can degrade over years | Reliable; limited write cycles |
| Cost per GB | Very low | Low per disc but not per GB | Higher |

### Worked example

Recommend storage for each and justify.

1. A photographer backing up 6 TB of images at home every week: external magnetic HDD. Very large capacity at low cost; speed and portability matter less.
2. A laptop for a student who travels: SSD. Fast boot and load times; no moving parts so it survives being carried; light and low power so the battery lasts longer.
3. A band selling an album at gigs: optical CD. Cheap to produce in bulk and easy to hand out; capacity is enough for audio.
4. A team writing a report together from different places: cloud storage. Everyone can access and edit the latest version from anywhere.

### Common mistakes

- Answering "it is better" or "it is faster" without linking the feature to the scenario.
- Saying SSDs "use magnets" or optical discs "use flash".
- Treating cloud storage as a different kind of storage technology. It is someone else's magnetic or solid state storage, reached over a network.

## Check questions

1. Explain why a computer needs both RAM and ROM. [4 marks]
2. State what is meant by volatile memory and give one example. [2 marks]
3. Explain how virtual memory works and why it can slow a computer down. [4 marks]
4. Give two reasons why computers need secondary storage. [2 marks]
5. Describe how data is stored on a magnetic hard disk. [2 marks]
6. Describe how data is read from an optical disc. [2 marks]
7. Recommend a storage device for a fitness tracker and justify your choice. [3 marks]
8. Give two advantages and two disadvantages of cloud storage for a small business. [4 marks]
9. A user's computer is slow when many programs are open. Suggest an upgrade and explain why it helps. [2 marks]

## Mark scheme

1. RAM holds the OS, programs and data currently in use (1), and can be written to, so it changes as programs run (1). ROM holds the start-up/boot instructions (1), which must not be lost when the power is off (non-volatile) (1).
2. Memory that loses its contents when power is lost (1); RAM or cache (1).
3. When RAM is full, part of secondary storage is used as extra memory (1); data not currently needed is moved from RAM to it (1) and swapped back when needed (1). Secondary storage is much slower than RAM, so swapping takes time (1).
4. Non-volatile: keeps data when power is off (1); much larger capacity / cheaper per GB than RAM (1).
5. Platters coated in magnetic material (1); a read/write head magnetises areas in one of two directions to represent 0 and 1 (1).
6. A laser shines on the spinning disc (1); pits and lands reflect light differently, which is read as binary (1).
7. Solid state/flash (1); any two linked reasons: small and light, no moving parts so durable when worn while moving, low power for battery life (2).
8. Advantages, any two: access from anywhere; easy sharing; provider manages backups/hardware; scalable (2). Disadvantages, any two: needs internet; security/privacy depends on provider; ongoing cost; slower for large files (2).
9. Add more RAM (1); more programs and data can be held in RAM, so less virtual memory/swapping is needed (1).
