---
level: GCSE
subject: Computer Science
topic: "Representing text, images and sound"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.3.5", "3.3.6", "3.3.7"]
  - board: OCR
    code: "J277"
    spec_refs: ["1.2.4"]
  - board: Edexcel
    code: "1CP2"
    spec_refs: ["2.2.1", "2.2.2", "2.2.3", "2.2.4"]
  - board: Eduqas
    code: "C500QS"
    spec_refs: ["4: Representation of characters", "4: Representation of graphics", "4: Representation of sound"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-gcse/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Representing text, images and sound

This file covers how characters are stored using character sets (ASCII and Unicode), how bitmap images are stored as pixels (resolution, colour depth, metadata), how sound is sampled and stored (sample rate, bit depth, duration, sample interval), the file size calculations for each, and the limits of storing data in a fixed number of bits.

## Overview

Text, pictures and sound are all turned into numbers, and the numbers are stored in binary. More bits give better quality but bigger files.

### Board differences

- AQA 8525: 3.3.5 to 3.3.7 (Paper 2). 7-bit ASCII and Unicode; convert using a given table; Unicode matches ASCII for the first 128 codes; UTF-8 and UTF-16 are not required. Images: pixels, size as width × height, colour depth; formula size in bits = W × H × D, in bytes divide by 8; convert binary to a bitmap and back. Sound: sampling, sampling rate (Hz), sample resolution; size in bits = rate × resolution × seconds.
- OCR J277: 1.2.4 (J277/01). ASCII and Unicode, and how bits per character limits the number of characters; ASCII is shown with 8 bits in the exam; no memorising codes. Images: pixels, metadata, resolution, colour depth and their effect on quality and size. Sound: sample rate, duration, bit depth and their effect on quality and size. File size formulas are in 1.2.3 (with units in [11-units-and-compression.md](11-units-and-compression.md)) and are worked here.
- Edexcel 1CP2: 2.2.1 to 2.2.4 (Paper 1). 7-bit ASCII only (Unicode is not named); bitmaps (pixels, resolution, colour depth); sound (amplitude, sample rate, bit depth, sample interval); limitations of binary representation when the number of bits is limited.
- Eduqas C500QS: section 4 (Component 1). ASCII and Unicode; graphics and sound storage, quality, and storage calculations.

## Characters and character sets

*Refs: AQA 3.3.5 · OCR 1.2.4 · Edexcel 2.2.1 · Eduqas 4: Representation of characters.*

### What you need to know

- A character set is a defined list of characters a computer recognises, each with a unique binary code.
- Characters are stored as their binary code. The number of bits per character limits how many characters the set can have: n bits give 2ⁿ characters.
- ASCII (American Standard Code for Information Interchange): 7 bits, so 128 characters: English letters, digits, punctuation and control codes (such as new line). Often stored in 8 bits; extended ASCII uses the 8th bit for another 128 characters.
- Unicode: uses more bits per character (up to 32), so it can represent over a million characters, covering almost every writing system, symbols and emoji. Its first 128 codes are the same as ASCII.
- Advantages of Unicode: one standard for every language; text can be shared worldwide. Disadvantage: files with Unicode text can be larger than ASCII.
- Codes are in order: 'A' is 65, 'B' 66 ... 'Z' 90; 'a' is 97; '0' is 48. So if you know one code, you can work out the rest of the sequence. You do not need to memorise codes.

### Worked example

'D' has ASCII code 68. Give the code for 'G' in denary and in 8-bit binary.

1. G is 3 letters after D: 68 + 3 = 71.
2. 71 = 64 + 4 + 2 + 1 = 01000111.

The digit character '7' is not the number 7: its code is 55 (48 + 7). That is why `"7" + "7"` gives "77".

```python
print(ord("D"), chr(71), ord("7"))     # 68 G 55
```

How many bits does "Hello" take in 8-bit ASCII? 5 characters × 8 bits = 40 bits = 5 bytes.

### Common mistakes

- Saying ASCII uses 8 bits. Standard ASCII is 7 bits (OCR shows it as 8 in the exam; extended ASCII is 8).
- Saying Unicode "replaced" ASCII codes. It includes them, with the same values.

## Bitmap images

*Refs: AQA 3.3.6 · OCR 1.2.4 · Edexcel 2.2.2 · Eduqas 4: Representation of graphics.*

### What you need to know

- A bitmap image is a grid of pixels (picture elements). Each pixel's colour is stored as a binary code.
- Image size (AQA) / resolution: the number of pixels, written width × height, for example 1920 × 1080. Resolution can also mean pixels per inch (density).
- Colour depth: the number of bits used for each pixel. n bits give 2ⁿ colours: 1 bit 2 colours (black and white), 8 bits 256 colours, 24 bits about 16.7 million.
- More pixels or more colour depth give better quality (more detail, smoother colours) but a bigger file.
- Metadata (OCR): extra data stored with the image so it can be displayed, such as width, height, colour depth, file type, date and camera settings.
- File size (bits) = width × height × colour depth. In bytes, divide by 8. (OCR writes it as colour depth × height × width; metadata may be ignored or allowed for.)

### Worked example

Find the file size of an 800 × 600 image with a colour depth of 24 bits, in megabytes.

1. Bits = 800 × 600 × 24 = 11 520 000.
2. Bytes = 11 520 000 ÷ 8 = 1 440 000.
3. MB = 1 440 000 ÷ 1 000 000 = 1.44 MB.

Turn a binary pattern into a 1-bit bitmap (1 = black, 0 = white), 5 pixels wide:

```
00100     . . # . .
01110     . # # # .
11111     # # # # #
00100     . . # . .
00100     . . # . .
```

It is an arrow pointing up. Going the other way, read each row of pixels and write 1 for black, 0 for white.

An image uses 4 colours. What is the smallest colour depth? 2 bits, since 2² = 4. For 5 colours you would need 3 bits (2³ = 8).

### Common mistakes

- Forgetting to divide by 8 to get bytes.
- Saying a higher resolution means "bigger pixels". It means more, smaller pixels in the same area.

## Sound

*Refs: AQA 3.3.7 · OCR 1.2.4 · Edexcel 2.2.3 · Eduqas 4: Representation of sound.*

### What you need to know

- Sound is analogue (a continuously varying wave), so it must be converted to digital to be stored.
- Sampling: measuring the amplitude (height) of the wave at regular time intervals and storing each measurement as a binary number.
- Sample rate (sampling rate): number of samples per second, in hertz (Hz). CD audio uses 44 100 Hz.
- Sample interval (Edexcel): the time between samples = 1 ÷ sample rate.
- Bit depth (sample resolution): number of bits per sample. More bits give more possible amplitude values (2ⁿ levels), so each sample is closer to the true value.
- Duration: number of seconds of audio.
- Higher sample rate and higher bit depth give a more accurate copy of the wave (better quality) but a bigger file.
- File size (bits) = sample rate × bit depth × duration (× number of channels, for stereo).

### Worked example

A 30-second mono clip is recorded at 44 100 Hz with 16-bit samples. Find its size in MB.

1. Bits = 44 100 × 16 × 30 = 21 168 000.
2. Bytes = 21 168 000 ÷ 8 = 2 646 000.
3. MB = 2.646 MB, about 2.65 MB.
4. Stereo would double it.

A sound is sampled at 8 kHz. What is the sample interval? 1 ÷ 8000 = 0.000125 s = 0.125 ms.

Explain the effect of halving the sample rate: half as many samples, so the file is half the size, but changes in the wave between samples are missed, so quality is lower (high-pitched sounds are lost).

### Common mistakes

- Mixing up sample rate (how often) and bit depth (how precisely).
- Leaving kHz as kHz in the formula. 44.1 kHz = 44 100 Hz.

## Limits of binary representation

*Refs: Edexcel 2.2.4 · OCR 1.2.4 · AQA 3.3.6, 3.3.7.*

### What you need to know

- A fixed number of bits can only store a fixed number of values (2ⁿ), so:
  - Numbers outside the range cause overflow.
  - Colour depth limits the number of colours; subtle shades are lost.
  - Bit depth limits how precisely amplitude is stored; sampling between measurements loses detail.
  - Character sets limit how many characters can be shown.
  - Real numbers such as 0.1 cannot be stored exactly, so small rounding errors appear.
- Every digital copy of an analogue thing is an approximation; more bits make it closer but bigger.

### Worked example

```python
print(0.1 + 0.2)          # 0.30000000000000004
```

0.1 and 0.2 have no exact binary form with a limited number of bits, so the stored values are slightly off.

## Check questions

1. Explain what is meant by a character set. [2 marks]
2. 'k' has code 107. Give the code for 'n' in binary. [2 marks]
3. Give one advantage and one disadvantage of Unicode compared with ASCII. [2 marks]
4. How many characters can a 7-bit character set represent? [1 mark]
5. Calculate the file size in kilobytes of a 200 × 150 image with colour depth 8 bits. [3 marks]
6. Explain the effect on quality and file size of increasing colour depth. [2 marks]
7. Describe how sound is sampled and stored. [3 marks]
8. A 2-minute stereo recording uses 48 kHz and 24-bit samples. Write an expression for its size in bytes. [3 marks]
9. State what is meant by metadata in an image file and give two examples. [2 marks]
10. (Edexcel) A sound is sampled at 20 000 Hz. Calculate the sample interval. [1 mark]

## Mark scheme

1. A defined list of characters recognised by a computer (1), each represented by a unique binary code (1).
2. 107 + 3 = 110 (1) = 01101110 (1).
3. Advantage: can represent many more characters / all languages and symbols (1). Disadvantage: uses more bits per character, so larger files (1).
4. 2⁷ = 128 (1).
5. 200 × 150 × 8 = 240 000 bits (1); ÷ 8 = 30 000 bytes (1); = 30 kB (1). Accept 29.3 KiB if 1024 used.
6. More colours available, so better quality/more realistic image (1); more bits per pixel, so bigger file (1).
7. Amplitude of the sound wave is measured (1) at regular intervals/the sample rate (1); each measurement stored as a binary number with a set number of bits (bit depth) (1).
8. 48 000 × 24 × 120 × 2 (1 for rate × depth, 1 for 120 s and × 2 for stereo) ÷ 8 (1). (= 34 560 000 bytes.)
9. Data about the image stored with it (1); any two of width, height, colour depth, resolution, date, file format (1).
10. 1 ÷ 20 000 = 0.00005 s (0.05 ms) (1).
