---
level: A-level
subject: Electronics
topic: "C2.4 Digital communications: regeneration, pulse modulation, PCM, Nyquist and TDM"
as_content: "A level only."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["C2.4(a)", "C2.4(b)", "C2.4(c)", "C2.4(d)", "C2.4(e)", "C2.4(f)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# C2.4 Digital communications

Digital communication sends information as pulses. Because a receiver only has to decide "high or low", noise can be removed and the signal regenerated perfectly, as long as the noise is not too large. This file covers regeneration, pulse modulation, pulse code modulation (PCM), sampling and time division multiplexing. Communications basics are in [08](08-communications-systems.md); ADCs and DACs in [06](06-signal-conversion.md); shift registers in [12](12-sequential-logic-systems.md).

## C2.4(a) Regenerating a digital signal with a Schmitt trigger

### Explained

After travelling along a cable or fibre, pulses are attenuated (smaller), have noise added, and have rounded edges (limited bandwidth). A **Schmitt trigger** with thresholds between the low and high levels restores them: the output switches high only when the input rises above the upper threshold and low only when it falls below the lower threshold. Noise smaller than the gap between thresholds (the hysteresis) has no effect, and the output has sharp edges and full logic levels. Repeaters (regenerators) are placed along long links before the noise grows too large.

Design (op-amp Schmitt trigger, non-inverting form): positive feedback from output to the non-inverting input through RF, with input through R1. Switching thresholds are ±(R1/RF) × Vsat (for a symmetrical supply and reference at 0 V). Choose them inside the expected signal swing but outside the noise.

### Worked example

Supply ±12 V, output saturates at ±10 V, R1 = 10 kΩ, RF = 47 kΩ. Thresholds = ±(10/47) × 10 = ±2.1 V. A received signal swinging between −4 V and +4 V with noise of ±1 V is cleanly regenerated.

## C2.4(b) Pulse modulation

### Explained

The amplitude of a sampled analogue signal is represented by changing one property of a train of regular pulses:

- **Pulse amplitude modulation (PAM)**: pulse height follows the signal at each sample. Simple, but noise changes the amplitude, so it is not robust.
- **Pulse width modulation (PWM)**: pulse width (duration) is proportional to the signal; pulse height constant. Noise has less effect; also used for motor speed and LED brightness control.
- **Pulse position modulation (PPM)**: pulses all the same width and height, but their position (time delay) within each slot depends on the signal. Efficient in power.

Draw graphs by sampling the analogue waveform at regular intervals and drawing the pulse whose height, width or delay matches each sample.

## C2.4(c) Pulse code modulation (PCM)

### What you need to know

Block diagram and operation of a PCM system. Transmitter: low-pass filter, sampling gate, sampling clock, ADC, PISO shift register, PISO clock. Receiver: Schmitt trigger, SIPO shift register, SIPO clock, DAC, low-pass filter.

### Explained

**Transmitter**:

1. Low-pass (anti-aliasing) filter removes frequencies above half the sampling rate.
2. Sampling gate, controlled by the sampling clock, takes samples at regular intervals (sample and hold).
3. ADC converts each sample to an n-bit parallel binary number.
4. PISO shift register, loaded in parallel, is shifted out serially by the faster PISO clock onto the single transmission line.

**Receiver**:

1. Schmitt trigger regenerates the received pulses.
2. SIPO shift register, clocked by the SIPO clock (synchronised to the transmitter), collects the serial bits and presents each word in parallel.
3. DAC converts each word back to a voltage level (a staircase waveform).
4. Low-pass filter smooths the steps, recovering the analogue signal.

The PISO clock must run at least n times faster than the sampling clock (n bits per sample), plus any extra bits for synchronisation.

## C2.4(d) Sampling and the Nyquist theorem

The sampling frequency must be at least twice the highest frequency present in the signal: fs ≥ 2fmax (Nyquist). If it is lower, high frequencies are misrepresented as false lower frequencies (aliasing) that cannot be removed afterwards, hence the anti-aliasing filter. In practice the sampling rate is somewhat higher than 2fmax.

### Worked example

Telephone speech limited to 3.4 kHz: minimum sampling rate 6.8 kHz; the standard is 8 kHz. With 8 bits per sample: bit rate = 8000 × 8 = 64 kbit s⁻¹.

## C2.4(e), (f) Time division multiplexing and channel limits

### What you need to know

How TDM improves the user capacity of a PCM link; the limit on the number of channels; calculate the number of channels from given data.

### Explained

Each sample takes only a short time to send, so the gaps between samples of one channel can carry samples (words) from other channels. A frame contains one word from each channel in turn, repeated at the sampling rate. The receiver uses synchronisation to route each word to the correct output.

**Limit**: the total bit rate of the link is fixed by its bandwidth and the speed of the electronics. Number of channels = maximum link bit rate ÷ bit rate per channel (round down; subtract any channels or bits used for synchronisation and signalling).

The time available for each bit falls as more channels are added; the link must be able to carry the narrow pulses (maximum data rate = 2 × bandwidth, [08](08-communications-systems.md)).

### Worked example

A link can carry 2.048 Mbit s⁻¹. Each channel is sampled at 8 kHz with 8 bits: 64 kbit s⁻¹. Channels = 2 048 000 ÷ 64 000 = 32 (in the European E1 standard, 30 for speech, 2 for synchronisation and signalling).

Frame time = 1 ÷ 8000 = 125 µs; each bit lasts 125 µs ÷ (32 × 8) = 0.49 µs.

### Common mistakes

- Placing the ADC in the receiver or the DAC in the transmitter.
- Using the highest frequency itself as the sampling rate.
- Forgetting the PISO clock must be faster than the sampling clock.

## Check questions

1. Explain how a Schmitt trigger regenerates a noisy digital signal. (3)
2. An op-amp Schmitt trigger saturates at ±9 V. R1 = 4.7 kΩ and RF = 22 kΩ. Calculate the switching thresholds. (2)
3. Sketch PAM, PWM and PPM waveforms for a slowly rising analogue signal. (3)
4. Draw a block diagram of a PCM transmitter and state the function of each block. (6)
5. Explain the purpose of the low-pass filter at the receiver output. (2)
6. Audio up to 15 kHz is to be digitised. State the minimum sampling rate and explain what happens if a lower rate is used. (3)
7. A link carries 1.544 Mbit s⁻¹. Each channel needs 8 kHz sampling with 8 bits and one extra bit per frame is used for synchronisation. Calculate the number of channels. (3)
8. Explain why the number of TDM channels on a link is limited. (2)

## Mark scheme

1. Two thresholds with a gap / hysteresis (1); switches only when the input crosses a threshold, ignoring smaller noise (1); output has full logic levels and sharp edges (1).
2. ±(4.7/22) × 9 (1) = ±1.92 V (1).
3. PAM: heights follow the signal (1); PWM: widths increase (1); PPM: pulses shift later in each slot (1).
4. Low-pass filter removes frequencies above fs/2 (1); sampling gate (1) with sampling clock takes samples (1); ADC converts to binary (1); PISO shift register converts parallel to serial (1); PISO clock shifts bits out at the bit rate (1).
5. DAC output is a staircase (1); filter removes the steps / high-frequency components, smoothing to the original analogue shape (1).
6. 30 kHz (1); aliasing (1); high frequencies appear as false low frequencies that cannot be removed (1).
7. Frame length = 1 544 000 ÷ 8000 = 193 bits (1); minus 1 sync bit = 192 (1); ÷ 8 = 24 channels (1).
8. Link has a maximum bit rate set by its bandwidth / electronics (1); each channel needs a fixed bit rate, so only a limited number fit (1).
