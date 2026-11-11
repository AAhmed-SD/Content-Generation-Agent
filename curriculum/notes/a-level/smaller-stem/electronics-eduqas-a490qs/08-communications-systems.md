---
level: A-level
subject: Electronics
topic: "C1.6 Communications systems"
as_content: "A level only."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["C1.6(a)", "C1.6(b)", "C1.6(c)", "C1.6(d)", "C1.6(e)", "C1.6(f)", "C1.6(g)", "C1.6(h)", "C1.6(i)", "C1.6(j)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# C1.6 Communications systems

This topic gives the general framework for the wireless ([09](09-wireless-transmission.md)), digital ([14](14-digital-communications.md)) and optical ([15](15-optical-communication.md)) communication topics: the parts of a system, bandwidth and data rate, multiplexing, filters, decibels, noise, distortion and attenuation.

Equations to select and apply: N_CH = available bandwidth ÷ channel bandwidth; maximum data rate = 2 × available bandwidth; G(dB) = 10 log₁₀(Pout/Pin); SNR(dB) = 10 log₁₀(PS/PN) = 20 log₁₀(VS/VN).

## C1.6(a), (b) Communication systems

**Communication** is the transfer of meaningful information from one place to another.

A simple system:

information source → transmitter/encoder → transmission medium (with amplifiers or regenerators along the way) → receiver/decoder → information destination

- Source: microphone, camera, keyboard, sensor.
- Transmitter/encoder: converts the information into a form suited to the medium (modulation, coding, conversion to light or radio).
- Medium: copper cable, optical fibre, radio waves (free space).
- Amplifiers (analogue) or regenerators (digital) restore the signal strength after losses.
- Receiver/decoder: extracts the original information.
- Destination: loudspeaker, screen, computer.

## C1.6(c) Bandwidth, data rate and capacity

### Explained

**Bandwidth** of a channel is the range of frequencies it can carry. Information-carrying capacity increases with bandwidth: a wider band can carry more data per second, or more channels.

- Number of channels: N_CH = available bandwidth ÷ bandwidth needed per channel.
- Maximum data rate (for a binary signal, ideal noise-free channel) = 2 × available bandwidth (bits per second). The fastest pattern 1010... has one cycle per two bits, so a bandwidth B carries up to 2B bits per second.

### Worked example

A band from 88 MHz to 108 MHz with 200 kHz per FM station: N_CH = 20 MHz ÷ 0.2 MHz = 100 channels. A cable with 3.4 kHz bandwidth can carry at most 6.8 kbit s⁻¹ of binary data.

## C1.6(d) Multiplexing

Multiplexing sends several signals over one transmission medium, which is cheaper than separate links.

- **Frequency division multiplexing (FDM)**: each signal is modulated onto a different carrier frequency; they share the medium at the same time, separated in frequency, with guard bands between them. The receiver uses band-pass filters to select one. Used in radio and TV broadcasting.
- **Time division multiplexing (TDM)**: each signal is sampled in turn and given its own short time slot; the samples are interleaved in a repeating frame. The receiver separates them using synchronised timing. Used in digital telephony ([14](14-digital-communications.md)).

## C1.6(e) Filters in communications

Low-pass filters remove high-frequency noise and limit the signal bandwidth before sampling (anti-aliasing) and after a DAC (smoothing). Band-pass filters select one channel in FDM or tune a radio receiver. High-pass filters remove low-frequency hum or DC. See [07](07-ac-circuits-and-passive-filters.md).

## C1.6(f), (h) Decibels and system gain

### Explained

Power gain in decibels: G(dB) = 10 log₁₀(Pout/Pin). Positive dB is gain (amplifiers); negative dB is loss (attenuation in cables and fibres). Doubling power ≈ +3 dB; ×10 = +10 dB; ×100 = +20 dB; halving = −3 dB.

Because logs turn multiplication into addition, the total gain of a system in dB is the sum of the gains and losses of its parts.

### Worked example

A 30 km cable attenuates 2 dB km⁻¹ (−60 dB). It is followed by an amplifier of +45 dB. Total = −15 dB. If 1 mW is input, output = 1 × 10^(−15/10) = 0.0316 mW = 31.6 µW.

Converting: Pout/Pin = 10^(G/10). A gain of 27 dB = 10^2.7 = 501 times.

## C1.6(g) Noise and distortion

- **Noise**: unwanted random signals added to the wanted signal from outside or inside the system: thermal noise in resistors and amplifiers, interference from other equipment, lightning, crosstalk from neighbouring wires. Noise is added; it is not part of the original signal.
- **Distortion**: an unwanted change in the shape of the signal caused by the system itself, for example clipping in an overdriven amplifier, slew-rate limiting, or a channel with too little bandwidth rounding pulse edges. It depends on the signal.

## C1.6(i), (j) Signal-to-noise ratio and attenuation

**Signal-to-noise ratio** (SNR) compares signal power with noise power: SNR(dB) = 10 log₁₀(PS/PN) = 20 log₁₀(VS/VN) (voltage form, since P ∝ V²). A high SNR means a clear signal.

**Attenuation** is loss of signal power along the medium (in dB, often dB per km). The noise picked up along the way is not attenuated in the same way, so as the signal weakens the SNR falls. An analogue amplifier boosts signal and noise together, so the SNR cannot be recovered; amplifiers (repeaters) must be placed before the SNR becomes too low. Digital regenerators recreate clean pulses, removing noise ([14](14-digital-communications.md)).

### Worked example

Signal 2.5 mV rms, noise 40 µV rms. SNR = 20 log₁₀(2.5 × 10⁻³ ÷ 40 × 10⁻⁶) = 20 log₁₀(62.5) = 35.9 dB.

### Common mistakes

- Using 20 log for power ratios or 10 log for voltage ratios.
- Multiplying dB values instead of adding them.
- Confusing noise (added from outside or inside, random) with distortion (shape changed by the system).

## Check questions

1. Draw a block diagram of a simple communication system and state the job of each block. (4)
2. A band 470 to 790 MHz carries channels each 8 MHz wide. How many channels fit? (1)
3. Calculate the maximum binary data rate for a channel bandwidth of 25 kHz. (1)
4. Compare FDM and TDM. (4)
5. An amplifier has input 20 mW and output 3.2 W. Calculate the gain in dB. (2)
6. A link has three parts: −12 dB, +20 dB, −15 dB. Calculate the overall gain and the output power for 50 mW input. (3)
7. Distinguish between noise and distortion. (2)
8. A signal of 1.2 V has noise of 3 mV. Calculate the SNR in dB. (2)
9. Explain why the SNR of an analogue signal falls along a long cable even with amplifiers. (3)

## Mark scheme

1. Source → transmitter / encoder → medium (with amplifier / regenerator) → receiver / decoder → destination (2); one correct job per block (2).
2. 320 ÷ 8 = 40 (1).
3. 50 kbit s⁻¹ (1).
4. FDM: signals on different carrier frequencies at the same time (1), separated by band-pass filters (1); TDM: signals take turns in time slots (1), needs synchronisation / used for digital signals (1).
5. 10 log₁₀(3.2 ÷ 0.02) = 10 log₁₀(160) (1) = 22 dB (1).
6. −7 dB (1); 50 × 10^(−0.7) (1) = 10 mW (1).
7. Noise: unwanted random signals added (1); distortion: change in waveform shape caused by the system (1).
8. 20 log₁₀(1.2 ÷ 0.003) = 20 log₁₀(400) (1) = 52 dB (1).
9. Signal attenuated along the cable while noise is picked up (1); amplifiers boost signal and noise equally (1); so noise accumulates and SNR cannot be restored (1).
