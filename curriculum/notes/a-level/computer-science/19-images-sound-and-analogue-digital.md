---
level: A-level
subject: Computer Science
topic: "Representing images and sound: analogue and digital, ADC and DAC, bitmaps, vector graphics, sampling and MIDI"
as_content: "AQA 4.5.6.1 to 4.5.6.4, 4.5.6.7 and 4.5.6.8 are also AS (7516 3.5.6.1 to 3.5.6.6). Vector graphics (4.5.6.5, 4.5.6.6) are A-level only."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.5.6.1", "4.5.6.2", "4.5.6.3", "4.5.6.4", "4.5.6.5", "4.5.6.6", "4.5.6.7", "4.5.6.8"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Images, sound and analogue/digital conversion

This file covers how bit patterns represent other data, analogue and digital data and signals, analogue-to-digital and digital-to-analogue converters, bitmapped images (resolution, colour depth, storage, metadata), vector graphics and how they compare with bitmaps, digital sound (sampling rate, sample resolution, Nyquist theorem, file sizes) and MIDI. Compression and encryption are in [20-compression-encryption-and-hashing.md](20-compression-encryption-and-hashing.md).

Builds on [GCSE: Representing text, images and sound](../../gcse/computer-science/10-representing-text-images-and-sound.md). New here: analogue and digital signals, ADC and DAC, dots per inch, metadata, vector graphics, the Nyquist theorem and MIDI.

### Board differences

Only AQA 7517 names this content. OCR H446 and Eduqas A500QS do not examine image and sound representation in this detail (Eduqas covers input and output devices in C2.1, file 25).

## 4.5.6.1 Bit patterns, images, sound and other data

*Refs: AQA 4.5.6.1.*

### What you need to know

- All data in a computer (numbers, text, images, sound, video, instructions) is stored as bit patterns. A bit pattern has no meaning on its own: the same 8 bits could be a number, a character, the colour of one pixel or one sound sample. The program decides how to interpret it.

## 4.5.6.2 Analogue and digital

*Refs: AQA 4.5.6.2.*

### What you need to know

- Analogue data varies continuously and can take any value in a range (temperature, sound pressure, light level).
- Digital data takes only discrete (separate, distinct) values, for example whole numbers from 0 to 255.
- An analogue signal is a continuously varying electrical (or other) quantity, such as the voltage from a microphone. A digital signal switches between a fixed number of levels (usually two, representing 0 and 1).
- Digital signals are less affected by noise: a slightly distorted 1 is still read as 1, and digital signals can be regenerated exactly; analogue signals pick up noise that cannot be removed.

## 4.5.6.3 Analogue/digital conversion

*Refs: AQA 4.5.6.3.*

### What you need to know

- Analogue to digital converter (ADC): measures (samples) the analogue signal at regular time intervals and converts each measurement to the nearest of a fixed set of levels (quantisation), output as a binary number. Used with analogue sensors (temperature, light, pressure, microphones) so a computer can process their readings.
- Digital to analogue converter (DAC): turns a sequence of binary values into a voltage level for each one, producing a (stepped, then smoothed) analogue signal. Most common use: converting digital audio to an analogue signal to drive speakers or headphones.

## 4.5.6.4 Bitmapped graphics

*Refs: AQA 4.5.6.4.*

### What you need to know

- A bitmap stores an image as a grid of pixels (picture elements). Each pixel's colour is stored as a binary number.
- Size in pixels = width in pixels × height in pixels (sometimes called the image's resolution).
- Resolution is also expressed as dots per inch (dpi), where a dot is a pixel: how many pixels are printed or displayed per inch. Higher dpi means more detail at a given physical size.
- Colour depth = the number of bits stored for each pixel. n bits give 2ⁿ colours: 1 bit black and white; 8 bits 256 colours; 24 bits (8 each for red, green and blue) about 16.7 million.
- Storage (ignoring metadata) = size in pixels × colour depth (in bits). Divide by 8 for bytes.
- Metadata: data about the image stored in the file, such as width, height, colour depth, and often file format, date, camera settings and location. It lets software display the image correctly.

### Worked example

A 1920 × 1080 image with 24-bit colour: 1920 × 1080 × 24 = 49,766,400 bits ÷ 8 = 6,220,800 bytes ≈ 6.2 MB (≈ 5.93 MiB).

A 6 × 4 inch photo scanned at 300 dpi with 16-bit colour: (6 × 300) × (4 × 300) = 1800 × 1200 = 2,160,000 pixels × 16 bits = 34,560,000 bits = 4,320,000 bytes = 4.32 MB.

An image has 100 colours: the minimum colour depth is 7 bits (2⁶ = 64 is too few, 2⁷ = 128 is enough).

## 4.5.6.5 Vector graphics

*Refs: AQA 4.5.6.5.*

### What you need to know

- A vector graphic stores an image as a list of geometric objects (primitives) such as lines, rectangles, circles, polygons, curves and text, each with its properties.
- Typical properties: position (x, y coordinates), size (width, height, radius), line (stroke) colour and thickness, fill colour, rotation, layer (drawing order).
- To display it, the computer reads the list and draws each object, so it can be redrawn at any size.

### Worked example

A simple flag as a vector list (SVG, a common vector format):

```xml
<svg width="300" height="200">
  <rect x="0" y="0" width="300" height="200" fill="green"/>
  <circle cx="150" cy="100" r="50" fill="white"/>
  <line x1="0" y1="0" x2="300" y2="200" stroke="black" stroke-width="4"/>
</svg>
```

Three objects describe the whole image. As a 300 × 200 bitmap with 24-bit colour it would need 180,000 bytes.

## 4.5.6.6 Vector graphics versus bitmapped graphics

*Refs: AQA 4.5.6.6.*

| | Vector | Bitmap |
| --- | --- | --- |
| Scaling | Scales to any size with no loss of quality | Becomes blocky (pixelated) when enlarged |
| File size | Usually small for simple images; grows with the number of objects | Depends on pixel count and colour depth, not content |
| Editing | Each object can be moved or changed separately | Edit pixel by pixel |
| Realism | Poor for photographs and complex shading | Ideal for photographs and natural images |
| Processing | Must be calculated (rendered) to display | Displayed directly |
| Uses | Logos, icons, diagrams, maps, fonts, CAD | Photos, scanned images, detailed artwork, screenshots |

## 4.5.6.7 Digital representation of sound

*Refs: AQA 4.5.6.7.*

### What you need to know

- Sound is an analogue wave. To store it, an ADC samples its amplitude at regular intervals.
- Sampling rate: the number of samples per second, in hertz (Hz). CD quality is 44,100 Hz.
- Sample resolution: the number of bits used for each sample (CD quality: 16 bits). More bits mean more possible amplitude levels, so the stored value is closer to the true amplitude and there is less quantisation noise.
- Nyquist theorem: to reproduce a signal accurately, the sampling rate must be at least twice the highest frequency in the signal. Human hearing reaches about 20 kHz, so 44.1 kHz is enough.
- File size (bits) = sampling rate × sample resolution × duration in seconds (× number of channels, for stereo).
- Higher rate and resolution give better quality but larger files.

### Worked example

A 3-minute stereo recording at 44.1 kHz with 16-bit samples: 44,100 × 16 × 180 × 2 = 254,016,000 bits = 31,752,000 bytes ≈ 31.8 MB.

A sound with frequencies up to 8 kHz must be sampled at least 16,000 times per second.

## 4.5.6.8 Musical Instrument Digital Interface (MIDI)

*Refs: AQA 4.5.6.8.*

### What you need to know

- MIDI is a standard protocol that lets electronic musical instruments, computers and other devices communicate. It does not store sound itself; it stores instructions for playing it.
- A MIDI file is a sequence of event messages, such as: note on / note off (which note), velocity (how hard it was played, so how loud), instrument (program change), duration and timing, and controls such as sustain or pitch bend.
- Advantages: files are very small (a few bytes per note rather than thousands of samples per second); music is easy to edit (change a note, the tempo, the key or the instrument) without re-recording; instruments can be changed after recording; notation can be produced directly; devices from different makers work together.
- Disadvantages: the sound depends on the device playing it, so it may not sound the same everywhere; it cannot store speech or real recordings.

## Common mistakes

- Forgetting to divide by 8 to convert bits to bytes, or mixing up MB and MiB.
- Saying resolution is the same as colour depth. Resolution is about pixel count (or density); colour depth is bits per pixel.
- Saying a higher sampling rate "makes the sound louder". It makes the stored wave closer to the original.
- Saying MIDI "compresses" audio. It stores instructions, not audio samples.

## Check questions

1. Explain the difference between analogue and digital data. [2 marks]
2. Describe how an ADC converts a microphone signal into digital data. [3 marks]
3. Give the most common use of a DAC. [1 mark]
4. Calculate the storage needed, in kilobytes, for an 800 × 600 bitmap with 256 colours (ignore metadata). [3 marks]
5. State two items of metadata stored with a bitmap image and why they are needed. [2 marks]
6. List the vector objects and properties needed to draw a red square with sides of 100 units centred at (200, 200), with a black border 2 units wide. [3 marks]
7. Give two advantages of vector graphics over bitmaps and one situation where a bitmap is better. [3 marks]
8. Explain the Nyquist theorem and apply it to a sound containing frequencies up to 12 kHz. [2 marks]
9. Calculate the size in MB of a 2-minute mono recording at 22,050 Hz with 8-bit samples. [2 marks]
10. Explain two advantages of storing music as MIDI rather than as sampled audio. [2 marks]
11. Explain how increasing sample resolution improves sound quality. [2 marks]

## Mark scheme

1. Analogue data varies continuously and can take any value in a range (1); digital data takes only discrete values (1).
2. The signal is sampled at regular intervals (1); each sample's amplitude is measured and matched to the nearest available level/quantised (1); the level is output as a binary number (1).
3. Converting digital audio to an analogue signal for speakers/headphones (1).
4. 256 colours → 8 bits per pixel (1); 800 × 600 × 8 = 3,840,000 bits = 480,000 bytes (1); = 480 kB (accept 468.75 KiB) (1).
5. Any two from width, height, colour depth (1); needed so the software knows how to interpret the bits/how to rebuild the grid of pixels (1).
6. Rectangle (or square) object (1); position: x 150, y 150 (top-left) and width 100, height 100 (1); fill colour red, stroke colour black, stroke width 2 (1).
7. Advantages: scale without losing quality (1); smaller files for simple images/objects can be edited separately (1). Bitmap better for photographs/realistic images (1).
8. Sample at least twice the highest frequency (1); at least 24 kHz (24,000 samples per second) (1).
9. 22,050 × 8 × 120 = 21,168,000 bits (1); = 2,646,000 bytes ≈ 2.65 MB (1).
10. Any two: much smaller files (1); easy to edit notes/tempo/instruments (1); can produce sheet music (1).
11. More bits per sample gives more possible amplitude levels (1); so each sample is nearer the true value/less quantisation error (1).
