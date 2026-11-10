---
level: A-level
subject: Computer Science
topic: "Input and output devices, secondary storage (magnetic, optical, solid state), RAM and ROM, virtual storage, fragmentation"
as_content: "AQA 4.7.4 is also AS (7516 3.7.4). OCR 1.1.3 is also AS."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.7.4.1", "4.7.4.2"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.1.3(a)", "1.1.3(b)", "1.1.3(c)", "1.1.3(d)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C2.1: Input / output", "C2.1: Secondary storage", "C2.1: Data storage on disc"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Input, output and storage

This file covers how barcode readers, digital cameras, laser printers, RFID and voice input work, choosing devices for a problem, why secondary storage is needed, hard disks, optical discs and solid-state drives, comparing storage media, RAM and ROM, virtual storage, and fragmentation and defragmentation.

Builds on [GCSE: Memory and storage](../../gcse/computer-science/13-memory-and-storage.md) (RAM, ROM, virtual memory, magnetic, optical and solid-state storage). New here: how the devices actually work, SSD pages and blocks, and voice input.

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Input/output devices | Barcode reader, digital camera, laser printer, RFID: how they work | Apply devices to the solution of problems | Contemporary input/output methods; voice command, dictation and voice-print systems |
| Storage | Hard disk, optical disk, SSD; compare capacity and speed | Magnetic, flash, optical; RAM and ROM; virtual storage | Compare contemporary secondary storage; fragmentation and defragmentation |

## 4.7.4.1 Input and output devices

*Refs: AQA 4.7.4.1 · OCR 1.1.3(a) · Eduqas C2.1: Input / output.*

### What you need to know

Barcode reader:

- A light source (laser or LED) shines across the barcode; the dark bars absorb light and the white spaces reflect it. A photodiode (or a CCD/camera sensor in imaging scanners) measures the reflected light as a pattern of high and low signals.
- The pattern of bar widths is decoded into digits; a check digit (file 18) confirms the read was correct.
- 2D codes (QR codes) are read by a camera and can hold much more data. Uses: shop tills, stock control, libraries, parcel tracking.

Digital camera:

- Light passes through the lens onto an image sensor (CCD or CMOS): a grid of millions of light-sensitive cells (photosites), one per pixel. Each cell builds up a charge proportional to the light hitting it.
- A colour filter array (usually a Bayer filter: red, green and blue filters over different cells) lets each cell record one colour; the camera combines neighbours to work out each pixel's full colour.
- An ADC converts each charge to a binary value; the image is processed (and usually compressed) and stored on flash memory with metadata.

Laser printer:

1. A drum is given an even electrostatic charge.
2. A laser, steered by a rotating mirror, scans across the drum; where it hits, the charge is removed, leaving an electrostatic image of the page.
3. Toner (fine charged powder) sticks to the charged areas (or discharged areas, depending on design) of the drum.
4. Paper, given an opposite charge, passes against the drum and the toner transfers onto it.
5. A fuser (heated rollers) melts the toner onto the paper. The drum is cleaned and the cycle repeats.

Colour laser printers repeat this with cyan, magenta, yellow and black toner. They are fast and cheap per page for high volumes.

RFID (radio frequency identification):

- A tag contains a microchip and an antenna; a reader sends out radio waves.
- Passive tags have no battery: the reader's radio waves induce a current in the tag's antenna, powering the chip, which sends back its data (a unique ID). Range is short (centimetres to a few metres).
- Active tags have their own battery and transmit over longer ranges (tens of metres or more).
- No line of sight needed; many tags can be read at once. Uses: contactless payment, travel cards, stock tracking, pet microchips, passports, door access.

Voice input (Eduqas):

- A microphone captures speech, an ADC samples it, and software matches the sounds against stored patterns.
- Command and control systems recognise a small set of spoken commands to operate a computer or device ("open mail", smart speakers, in-car controls, hands-free use for people with disabilities). Small vocabulary, so accurate and need little training; not for general text.
- Vocabulary dictation systems turn general speech into text (dictating documents, captions). They need a large vocabulary and language models to work out the likely word from context; accuracy is affected by accents, background noise and homophones; often trained to a user's voice.
- Voice print recognition identifies or verifies a person from the unique features of their voice (a biometric, file 36). Used for security, such as telephone banking. Can be affected by illness, noise or recordings.

Choosing devices (OCR): match the device to the situation. Consider the environment (dust, water, outdoors), the user (disabilities, skill), speed and volume, cost, and accuracy. For example, a warehouse tracking pallets without line of sight suits RFID; a supermarket till suits barcode scanners; a self-service kiosk suits a touch screen.

### Common mistakes

- Saying a passive RFID tag has a battery.
- Describing a laser printer as "spraying" toner. That is an inkjet printer (with ink).
- Saying dictation software understands meaning. It matches sounds to likely words.

## 4.7.4.2 Secondary storage devices

*Refs: AQA 4.7.4.2 · OCR 1.1.3(b) · Eduqas C2.1: Secondary storage.*

### What you need to know

- Why secondary storage is needed: main memory (RAM) is volatile (loses its contents when power goes off) and limited in size, so programs and data must be stored permanently somewhere else, non-volatile, and large enough to hold everything not currently in use.

Hard disk drive (magnetic):

- One or more rigid platters coated with magnetic material spin at high speed (often 5,400 to 7,200 rpm). Each surface is divided into concentric tracks, split into sectors.
- A read/write head on an actuator arm moves across the surface on a cushion of air, without touching it. Writing magnetises tiny areas in one of two directions (0 or 1); reading detects the direction.
- Access time = seek time (moving the head to the track) + rotational latency (waiting for the sector to come round).
- Large capacity, low cost per GB; but moving parts make it slower, noisier, power-hungry and vulnerable to knocks.

Optical disc (CD, DVD, Blu-ray):

- Data is stored in a spiral track. On a pressed (read-only) disc, the track has pits and lands. A laser shines on the track; light reflected from lands and from pits differs, and a change between pit and land represents a 1 (no change is 0).
- Recordable discs use a dye layer that the laser burns to make non-reflective areas; rewritable discs use a material that switches between crystalline and amorphous states.
- Blu-ray uses a shorter wavelength (blue-violet) laser than DVD (red), so pits are smaller and more data fits.
- Cheap, portable, durable for distribution; but small capacity, slow, and easily scratched; mostly replaced by downloads and flash.

Solid-state drive (SSD, flash):

- NAND flash memory plus a controller. Each cell is a floating gate transistor that traps electric charge to store data; the charge stays without power.
- Data is written in pages, and pages are grouped into blocks. A page cannot be overwritten directly: it must be erased first, and erasing works on whole blocks. So to change data, the controller writes the new data to a free page and marks the old page as invalid; later, garbage collection copies valid pages out of a block and erases it.
- The controller also spreads writes evenly over the cells (wear levelling), because each cell can only be erased a limited number of times.
- No moving parts: much lower latency and faster transfer than a hard disk, silent, low power, robust; but more expensive per GB and limited write endurance.

| | Hard disk | Optical | SSD |
| --- | --- | --- | --- |
| Typical capacity | 1–20 TB | 0.7 GB (CD) to 100 GB (Blu-ray) | 256 GB–8 TB |
| Speed | Medium (access ~10 ms) | Slow | Very fast (access ~0.1 ms) |
| Cost per GB | Low | Low per disc, but small | Higher |
| Durability | Moving parts, damaged by shock | Scratches | Robust, limited write cycles |
| Typical use | Bulk storage, servers, backups | Distributing films, software, archives | Laptops, phones, operating system drives |

### Worked example

Choose storage for: (a) a photographer's travelling laptop: SSD, as it is robust when carried, fast and light. (b) A company's nightly backup of 40 TB: hard disks (or tape) for low cost per GB at high capacity. (c) Sending a film to customers in shops: optical disc, cheap to mass-produce and read-only.

## RAM and ROM

*Refs: OCR 1.1.3(c) · Eduqas C2.1: Architecture.*

### What you need to know

- RAM (random access memory): main memory, read and write, volatile. Holds the OS, programs and data in use. Dynamic RAM (DRAM) is cheap and dense but must be refreshed; static RAM (SRAM, built from flip-flops) is faster and used for cache.
- ROM (read-only memory): non-volatile; contents are fixed (or rarely updated, as flash ROM). Holds the firmware such as the BIOS/UEFI and bootstrap loader that start the computer, and the programs in embedded devices.

## Virtual storage

*Refs: OCR 1.1.3(d).*

### What you need to know

- Virtual storage (OCR's term) covers storage that appears to be one local device but is really elsewhere or spread out: cloud storage, network storage (NAS and SANs), and storage pooled from several physical drives. Users and programs see a simple drive or folder; the system handles where the data really is.
- Benefits: access from anywhere, easy sharing and scaling, someone else manages backups. Drawbacks: depends on a network connection, ongoing cost, privacy and security concerns, less control.
- (Virtual memory, using secondary storage as an overflow for RAM, is an OS topic: [34-operating-systems.md](34-operating-systems.md).)

## Data storage on disc: fragmentation

*Refs: Eduqas C2.1: Data storage on disc.*

### What you need to know

- On a hard disk, files are stored in blocks (clusters). As files are created, deleted and grow, free space becomes scattered, so a new or growing file may be stored in many non-contiguous pieces: it is fragmented.
- Consequences: reading a fragmented file needs many head movements (seeks) and rotations, so files load more slowly and the disk works harder (more wear and noise).
- Defragmentation (a utility) moves blocks so each file's blocks are contiguous and free space is gathered together, making access faster.
- SSDs have no seek time, so fragmentation hardly matters, and defragmenting them only wastes their limited write cycles; the OS uses a TRIM command instead to help garbage collection.

## Check questions

1. Explain why a computer needs secondary storage. [2 marks]
2. Describe how a barcode reader reads a barcode. [3 marks]
3. Explain how a digital camera captures the colour of each pixel. [3 marks]
4. Describe the stages by which a laser printer prints a page. [4 marks]
5. Explain the difference between active and passive RFID tags, with a use of each. [4 marks]
6. Describe how data is read from a hard disk, and explain what affects its access time. [4 marks]
7. Explain why an SSD cannot simply overwrite a page and how the controller deals with this. [3 marks]
8. Recommend, with reasons, a storage device for a library's self-service kiosk that runs all day in a public area. [3 marks]
9. (OCR) State two differences between RAM and ROM. [2 marks]
10. (OCR) Explain what virtual storage is and one drawback of it. [2 marks]
11. (Eduqas) Explain what disk fragmentation is and why defragmentation improves performance on a hard disk but not an SSD. [4 marks]
12. (Eduqas) Compare command and control voice input with vocabulary dictation. [4 marks]

## Mark scheme

1. RAM is volatile so data is lost when power is off (1); RAM is too small to hold all programs/data, so permanent, large storage is needed (1).
2. Light shone onto the barcode (1); dark bars absorb, light spaces reflect, and a sensor detects reflected light as a pattern (1); pattern of widths converted to digits and validated with the check digit (1).
3. Light falls on a grid of sensor cells (1); a colour filter array means each cell records red, green or blue intensity (1); values combined/interpolated for each pixel and converted to binary by an ADC (1).
4. Drum charged (1); laser removes charge to form an image of the page (1); toner attracted to the image then transferred to oppositely charged paper (1); fuser heats/melts toner onto paper (1).
5. Passive: no battery, powered by the reader's radio waves, short range (1), e.g. contactless card/travel card/stock tags (1). Active: own battery, longer range (1), e.g. vehicle tracking/toll tags/shipping containers (1).
6. Platters spin; head moves across to the correct track (1); waits for the sector to rotate under it, then detects magnetised areas as 1s and 0s (1). Access time = seek time (head movement) (1) + rotational latency (waiting for the sector) (1).
7. A page must be erased before it can be written, and erasing works on whole blocks (1); the controller writes the new data to a free page and marks the old one invalid (1); garbage collection later copies valid pages and erases whole blocks (1).
8. SSD (1); no moving parts so robust/reliable for continuous use (1); fast boot and access, low power and silent (1).
9. RAM is volatile, ROM is non-volatile (1); RAM can be written to, ROM is read-only/rarely changed; RAM holds programs in use, ROM holds boot firmware (1).
10. Storage that appears as one local drive but is physically elsewhere/spread across devices, e.g. cloud (1); drawback: needs a network connection/privacy/security/ongoing cost (1).
11. File stored in non-contiguous blocks scattered around the disk (1); hard disk needs more head movement/seeks to read it, so slower (1); defragmenting makes blocks contiguous so fewer seeks (1); SSDs have no moving head so access time is the same anywhere, and extra writes reduce their lifespan (1).
12. Command and control: small set of commands to operate a device (1); high accuracy, little training (1). Dictation: converts general speech to text with a large vocabulary (1); lower accuracy, affected by accents/noise/homophones, may need training (1).
