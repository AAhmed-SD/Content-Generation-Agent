---
level: A-level
subject: Physics
topic: "Digital signals, digital images, logic circuits and communication systems"
as_content: "AQA option (A-level only). OCR B 3.1.1 AS & A."
boards:
  - board: AQA
    code: "7408"
    spec_refs: ["3.13.2.1", "3.13.5.1", "3.13.5.2", "3.13.5.3", "3.13.6.1", "3.13.6.2", "3.13.6.3", "3.13.6.4"]
  - board: OCR B
    code: "H557"
    spec_refs: ["3.1.1(a)(ii)", "3.1.1(a)(iii)", "3.1.1(b)(i)", "3.1.1(b)(iii)", "3.1.1(c)(i)", "3.1.1(c)(vi)", "3.1.1(c)(vii)", "3.1.1(c)(viii)", "3.1.1(c)(ix)", "3.1.1(c)(x)"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification
  OCR B: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-b-advancing-physics-h157-h557-from-2015/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/a-level-aqa/
---

# Digital signals, digital images, logic circuits and communication systems

This file covers analogue and digital signals, sampling and quantisation, bits and bytes, the information in a digital image and image processing, noise, logic gates and Boolean algebra, counters and astables, and how information is transmitted: communication system blocks, transmission media and radio propagation, time-division multiplexing, and AM and FM.

## Overview

AQA option 3.13.2, 3.13.5, 3.13.6 (A-level only) and OCR B 3.1.1 (Imaging and signalling, AS & A). Optical fibres and dispersion are in file 05; op-amps and analogue processing are in file 28; lenses in file 22; polarisation in file 04.

### Board differences

- AQA 3.13.2, 3.13.5, 3.13.6 · OCR B 3.1.1(a)(ii), (iii), (b)(i), (iii), (c)(i), (vi) to (x).
- OCR B 3.1.1(a)(ii): images stored as arrays of numbers and processed (brightness, contrast, noise reduction, edge detection, false colour); 3.1.1(c)(i): information in an image = pixels × bits per pixel; 3.1.1(c)(x): b = log₂(V_total/V_noise).
- AQA only: logic gates, counters, astables, communication systems, multiplexing, AM and FM.
- AQA: binary numbers only from 1 to 10; no binary arithmetic.

## 3.13.2.1 Difference between analogue and digital signals

*Refs: AQA 3.13.2.1 · OCR B 3.1.1(a)(ii), (a)(iii), (b)(i), (b)(iii), (c)(i), (c)(vi) to (x). Level: A-level only (OCR B AS & A).*

### What you need to know

- Bits and bytes.
- Analogue-to-digital conversion: sampling audio for digital transmission; two voltage levels; quantisation; sampling rate; how sampling rate and bits per sample affect quality; advantages and disadvantages of digital sampling; recovering data from a noisy signal; the effect of noise.
- Pulse code modulation. A variety of sensors collect analogue data.
- (OCR B) Digital images: pixels, information content, image processing; N = 2^b, b = log₂N; minimum sampling rate > 2 × maximum signal frequency; rate of transmission = samples per second × bits per sample; b = log₂(V_total/V_noise).

### Explained

**Analogue and digital.** An analogue signal varies continuously and can take any value within a range (e.g. the output of a microphone). A digital signal takes only a few fixed levels, usually two (0 and 1, low and high).

**Bits and bytes.** A bit is one binary digit (0 or 1). A byte is 8 bits. With b bits, a number can take N = 2^b different values (b = log₂N). 8 bits give 256 levels; 16 bits give 65 536.

**Analogue-to-digital conversion (ADC).**

1. **Sampling**: measure the analogue signal at regular time intervals. The sampling rate (samples per second) must be more than twice the highest frequency in the signal (the Nyquist condition), or high frequencies are lost and false low-frequency signals (aliases) appear. CD audio: 44.1 kHz, enough for sounds up to about 20 kHz.
2. **Quantisation**: round each sample to the nearest of 2^b levels. The difference between the actual and the rounded value is the quantisation error. More bits per sample means smaller steps and a more faithful copy.
3. **Encoding**: each level is written as a b-bit binary number.
4. **Pulse code modulation (PCM)**: the binary numbers are sent as a stream of pulses (high for 1, low for 0).

Rate of transmission = samples per second × bits per sample (bit rate, in bit s⁻¹).

**Quality.** Higher sampling rate captures faster changes (higher frequencies); more bits per sample give finer resolution of the size of the signal. Both increase the data rate and storage needed.

**Noise.** Random unwanted variations added to a signal (from thermal motion, interference). In an analogue system, noise added along the way cannot be separated from the signal, and is amplified with it at each repeater. In a digital system, as long as the noise is small compared with the gap between the two levels, a regenerator can decide whether each pulse is a 0 or 1 and recreate a clean signal (using a comparator, file 28, with a threshold midway between levels).

OCR B 3.1.1(c)(x): the number of useful bits per sample is limited by noise: b = log₂(V_total/V_noise). There is no point resolving levels finer than the noise.

**Advantages of digital**: noise can be removed by regeneration; easy to store, copy and process by computer without loss; error-checking codes can detect and correct errors; many signals can share a channel (multiplexing); data can be compressed and encrypted. **Disadvantages**: needs higher bandwidth than the analogue original; quantisation error (some detail lost); needs ADC and DAC; sampling must be fast enough.

**Sensors** (AQA). Thermistors, LDRs, microphones, strain gauges, Hall sensors and photodiodes all give analogue outputs that are digitised for processing.

**Digital images** (OCR B). A digital image is an array of pixels (picture elements), each stored as a number for its brightness (and colour). Information in an image = number of pixels × bits per pixel. Processing changes the numbers:

- *Brightness*: add a constant to every pixel value.
- *Contrast*: stretch the range of values (multiply differences from the mean).
- *Noise reduction*: replace each pixel by the median (or mean) of itself and its neighbours, which removes isolated odd pixels.
- *Edge detection*: find where neighbouring pixel values change sharply (subtract neighbours), highlighting outlines.
- *False colour*: assign colours to ranges of values to make differences visible (e.g. temperature maps).

**Resolution** of an image is the size of the smallest detail that can be distinguished, often set by the size of a pixel on the object.

### Worked example

1. A sound signal contains frequencies up to 8 kHz. It is sampled at the minimum suitable rate with 12 bits per sample. Find the bit rate and the number of levels.

   Sampling rate > 16 kHz (use 16 kHz as the minimum). Bit rate = 16 000 × 12 = 1.92 × 10⁵ bit s⁻¹. Levels = 2¹² = 4096.

2. (OCR B) A camera has 3000 × 2000 pixels with 24 bits per pixel. Find the information in one image in bytes.

   6.0 × 10⁶ × 24 = 1.44 × 10⁸ bits = 1.8 × 10⁷ bytes (18 MB).

3. (OCR B) A signal varies over 5.0 V with noise of 20 mV. How many useful bits per sample?

   b = log₂(5.0/0.020) = log₂250 = 8.0 bits.

### Common mistakes

- Saying the sampling rate should equal the signal frequency.
- Saying digital signals have no noise (they have noise, but it can be removed).
- Confusing bits and bytes.

## 3.13.5.1 Combinational logic

*Refs: AQA 3.13.5.1. Level: A-level only.*

### What you need to know

- Boolean algebra with truth tables and logic gates: Ā (NOT A), A · B (A AND B), A + B (A OR B).
- AND, NAND, OR, NOR, NOT and EOR (exclusive OR) gates in combination.
- Building and deducing a logic circuit from a truth table.

### Explained

| A | B | NOT A (Ā) | AND (A·B) | NAND | OR (A+B) | NOR | EOR (A⊕B) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 0 | 1 | 1 | 0 | 1 |
| 1 | 1 | 0 | 1 | 0 | 1 | 0 | 0 |

- AND: output 1 only if all inputs are 1.
- OR: output 1 if any input is 1.
- NAND = NOT AND; NOR = NOT OR.
- EOR: output 1 if the inputs are different.

**Deducing a circuit from a truth table.** For each row with output 1, write an AND term of the inputs (using NOT for any input that is 0), then OR all the terms together. Simplify if possible. Example: output 1 only when A = 1 and B = 0: Q = A · B̄ (an AND gate with B passed through a NOT gate).

**Analysing a circuit.** Label the output of every gate and work through a truth table column by column.

### Worked example

1. Find the truth table of Q = (A + B) · C̄.

   Q = 1 when C = 0 and at least one of A, B is 1: rows (A, B, C) = (0, 1, 0), (1, 0, 0), (1, 1, 0). All others 0.

2. Show that a NAND gate with both inputs joined acts as a NOT gate.

   A·A = A, so NAND gives Ā.

### Common mistakes

- Confusing OR (1 when both are 1) with EOR (0 when both are 1).

## 3.13.5.2 Sequential logic

*Refs: AQA 3.13.5.2. Level: A-level only.*

### What you need to know

- Counting circuits: binary counter, BCD counter, Johnson counter.
- Inputs: clock, reset, up/down. Outputs.
- A modulo-n counter from a basic counter with logic driving the reset.

### Explained

Sequential circuits have outputs that depend on the order of past inputs: they have memory, and change state on clock pulses.

- **Binary counter**: outputs (e.g. 4 bits Q₃Q₂Q₁Q₀) show the number of clock pulses received in binary: 0000, 0001, 0010, … 1111 (0 to 15), then back to 0000. An up/down input chooses counting up or down; reset sets all outputs to 0.
- **BCD (binary coded decimal) counter**: counts 0000 to 1001 (0 to 9) then resets to 0000, so each digit of a decimal display can have its own counter.
- **Johnson counter** (twisted ring): a chain of stages where the inverted last output feeds back to the first. A 3-stage Johnson counter cycles through 000, 100, 110, 111, 011, 001 (6 states; 2n states for n stages); only one output changes at each step, which avoids glitches. Used for sequencing (e.g. traffic lights).
- **Modulo-n counter**: counts 0 to n − 1 and then resets. Logic gates detect when the count reaches n and immediately trigger the reset. For modulo-6: detect 0110 (Q₂ = 1 and Q₁ = 1) with an AND gate to the reset pin.

### Common mistakes

- Making a modulo-6 counter reset at 0101 (5); it must reset when it reaches 6.

## 3.13.5.3 Astables

*Refs: AQA 3.13.5.3. Level: A-level only.*

### What you need to know

- An astable is an oscillator that provides clock pulses.
- Clock rate (frequency), pulse width, period, duty cycle, mark-to-space ratio.
- Changing the frequency with an external RC network.

### Explained

An astable has no stable state: its output switches continuously between high and low, producing a square or rectangular wave used as a clock.

- Period T = mark time (high) + space time (low); frequency f = 1/T.
- Pulse width: duration of the high part (mark).
- Mark-to-space ratio = mark time ÷ space time.
- Duty cycle = mark time ÷ period (often as a percentage).

The timing is set by charging and discharging a capacitor through resistors (file 16), so the period is proportional to RC: a larger R or C gives a lower frequency.

### Worked example

1. An astable output is high for 3.0 ms and low for 1.0 ms. Find f, the mark-to-space ratio and the duty cycle.

   T = 4.0 ms, f = 250 Hz. Mark : space = 3 : 1. Duty cycle = 75%.

### Common mistakes

- Confusing duty cycle (mark ÷ period) with mark-to-space ratio (mark ÷ space).

## 3.13.6.1 Principles of communication systems

*Refs: AQA 3.13.6.1. Level: A-level only.*

### What you need to know

- The block diagram of a real-time communication system; the purpose of each stage.

### Explained

A typical system (e.g. a digital phone call):

1. **Input transducer** (microphone): converts sound into an analogue electrical signal.
2. **Amplifier / filter**: boosts the signal and removes frequencies outside the needed range.
3. **ADC (sampler and encoder)**: converts to a digital signal.
4. **Multiplexer**: combines several signals onto one channel.
5. **Modulator and transmitter**: puts the signal onto a carrier wave (or light pulses) and sends it.
6. **Transmission path** (wire, fibre or radio).
7. **Receiver**: picks up, filters and amplifies the incoming signal; **regenerators** along the way clean up digital pulses.
8. **Demodulator / demultiplexer**: separates the signals and removes the carrier.
9. **DAC**: converts back to analogue.
10. **Amplifier and output transducer** (loudspeaker).

### Common mistakes

- Putting the ADC after the modulator in a block diagram.

## 3.13.6.2 Transmission media

*Refs: AQA 3.13.6.2. Level: A-level only.*

### What you need to know

- Metal wire, optical fibre and electromagnetic (radio, microwave) paths.
- Ground waves, sky waves (refraction and reflection), diffraction of long wavelengths around the Earth.
- Satellite systems and typical frequencies; up- and down-links use different frequencies so receivers are not desensitised.
- Advantages and disadvantages of media: data rate, cost and security.

### Explained

| Medium | Advantages | Disadvantages |
| --- | --- | --- |
| Metal wire (twisted pair, coaxial) | Cheap, simple, easy to connect | Low bandwidth, high attenuation at high frequency, electrical interference and crosstalk, can be tapped |
| Optical fibre | Very high bandwidth and data rate, low attenuation (fewer repeaters), immune to electrical interference, hard to tap (secure), light | More expensive to install and join; needs conversion to and from light |
| Radio and microwaves | No cables, mobile, can reach remote areas, broadcast to many receivers | Limited bandwidth that must be shared, interference, weather effects, easy to intercept (needs encryption) |

**Radio propagation.**

- **Ground (surface) waves**: long and medium waves (below about 3 MHz) diffract around the Earth's curvature and follow its surface for hundreds of km. Long wavelengths diffract most.
- **Sky waves**: short waves (3 to 30 MHz) are refracted (bent back) by the ionosphere and return to Earth, then bounce off the ground; several hops can go round the world.
- **Space (line-of-sight) waves**: above about 30 MHz (VHF, UHF, microwaves), waves pass through the ionosphere, so they travel in straight lines: used for FM radio, TV, mobile phones (masts) and satellites.

**Satellites.** Geostationary satellites (file 14) relay TV and communications at microwave frequencies (GHz, e.g. uplink 6 GHz and downlink 4 GHz, or 14/11 GHz). The uplink and downlink frequencies are different, so that the strong signal the satellite transmits does not swamp (desensitise) its own very sensitive receiver. Low-orbit satellite networks give lower signal delay.

### Common mistakes

- Saying sky waves are reflected by the ground only (they are refracted back by the ionosphere).
- Saying satellites use the same frequency for uplink and downlink.

## 3.13.6.3 Time-division multiplexing

*Refs: AQA 3.13.6.3. Level: A-level only.*

### What you need to know

- Basic principles of time-division multiplexing (TDM).

### Explained

Several digital signals share one channel by taking turns. The channel is divided into repeating time slots; each signal is given a slot in every frame, and sends its bits (or a sample) then. At the receiver, a demultiplexer synchronised to the same timing separates the slots back into the original signals. The channel's bit rate must be at least the sum of the bit rates of all the signals. TDM is used in phone networks and digital broadcasting.

### Common mistakes

- Saying signals are sent at the same time in TDM (they take turns in time slots).

## 3.13.6.4 Amplitude (AM) and frequency modulation (FM) techniques

*Refs: AQA 3.13.6.4. Level: A-level only.*

### What you need to know

- Principles of modulation; carrier wave and information signal; bandwidth.
- Graphs of AM and FM signals; identifying carrier frequency and information frequency from a graph of signal voltage against time.
- Bandwidth: 2f_M for AM; 2(Δf + f_M) for FM.
- Data capacity of a channel; bandwidth available in different media.

### Explained

**Modulation.** An information signal (audio, frequency f_M) is combined with a high-frequency carrier wave (f_c) for transmission, because high frequencies can be transmitted efficiently by aerials of practical size, and different carriers allow many stations to share the air.

- **AM**: the amplitude of the carrier varies in step with the information signal; the carrier frequency stays constant. On a voltage–time graph, the carrier oscillations are enclosed by an envelope that has the shape of the information signal. The carrier frequency is found from the fast oscillations; the information frequency from the envelope.
- **FM**: the frequency of the carrier varies in step with the information signal (higher when the signal is positive, lower when negative); the amplitude is constant. On the graph, waves are bunched together and spread out alternately. Δf (frequency deviation) is the maximum change in carrier frequency.

**Bandwidth.** The range of frequencies a signal occupies.

- AM: carrier ± f_M, so bandwidth = 2f_M.
- FM: bandwidth ≈ 2(Δf + f_M) (Carson's rule), much wider.

| | AM | FM |
| --- | --- | --- |
| Bandwidth | Narrow, so more stations fit in a band | Wide |
| Noise | Noise changes amplitude, so it is heard | Much less affected by noise (amplitude changes are ignored) |
| Range | Long and medium wave AM travels far (ground waves) | VHF FM is line of sight, shorter range |
| Quality | Lower | Higher (stereo music) |

**Data capacity.** The maximum data rate of a channel increases with its bandwidth: a wider band can carry more bits per second. Optical fibres have far more bandwidth than copper wire or radio channels, so they carry much more data.

### Worked example

1. An AM station uses a 909 kHz carrier and audio up to 4.5 kHz. Find its bandwidth and frequency range.

   Bandwidth = 9.0 kHz, from 904.5 to 913.5 kHz.

2. An FM station has Δf = 75 kHz and audio up to 15 kHz. Find its bandwidth.

   2(75 + 15) = 180 kHz.

### Common mistakes

- Saying FM varies the amplitude.
- Using bandwidth = f_M for AM (it is 2f_M).

## Check questions

1. Explain why a digital signal can be transmitted over long distances with less loss of quality than an analogue signal. (3 marks)
2. A signal with frequencies up to 3.4 kHz is digitised with 8 bits per sample. Find the minimum sampling rate and the bit rate. (3 marks)
3. Explain the effect of increasing (a) the sampling rate and (b) the number of bits per sample. (2 marks)
4. (OCR B) Describe how noise can be removed from a digital image. (2 marks)
5. Draw the truth table for an EOR gate and show how it can be built from AND, OR and NOT gates. (4 marks)
6. Describe how a binary counter can be made into a modulo-10 counter. (2 marks)
7. Explain why satellite uplink and downlink frequencies are different. (2 marks)
8. Sketch AM and FM signals for the same information signal and compare their bandwidths. (4 marks)
9. Give two advantages of optical fibre over copper cable for data transmission. (2 marks)

## Mark scheme

1. Noise is added during transmission and amplified with an analogue signal (1); digital pulses have only two levels, so regenerators can restore them exactly (1); as long as noise is less than half the gap between levels (1).
2. Sampling rate > 6.8 kHz (1); bit rate = 6800 × 8 = 5.4 × 10⁴ bit s⁻¹ (2).
3. (a) Higher frequencies reproduced / more accurate in time (1); (b) more levels, smaller quantisation error / finer resolution (1).
4. Replace each pixel by the median of its neighbours (1); removes isolated pixels that differ greatly from surroundings (1).
5. Truth table: 00 → 0, 01 → 1, 10 → 1, 11 → 0 (2); Q = A·B̄ + Ā·B: two AND gates each with one input inverted, outputs into an OR gate (2).
6. Use AND gate to detect 1010 (Q₃ and Q₁ both 1) (1); output connected to the reset input so counter returns to 0 when it reaches 10 (1).
7. Satellite's transmitter is very powerful compared with weak signals it receives (1); different frequencies prevent its own transmission swamping / desensitising its receiver (1).
8. AM: constant frequency, amplitude envelope follows signal (1); FM: constant amplitude, frequency varies with signal (1); AM bandwidth 2f_M (1); FM bandwidth 2(Δf + f_M), wider (1).
9. Any two: higher bandwidth / data rate; lower attenuation, fewer repeaters; immune to electrical interference; more secure; lighter.
