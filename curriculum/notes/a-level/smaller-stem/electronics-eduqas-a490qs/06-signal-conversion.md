---
level: A-level
subject: Electronics
topic: "C1.4 Signal conversion: DACs and ADCs"
as_content: "A level only."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["C1.4(a)", "C1.4(b)", "C1.4(c)", "C1.4(d)", "C1.4(e)", "C1.4(f)", "C1.4(g)", "C1.4(h)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# C1.4 Signal conversion

The real world is analogue (continuous voltages), but processing, storage and communication are mostly digital. Digital-to-analogue converters (DACs) and analogue-to-digital converters (ADCs) link the two. Op-amp circuits are in [05](05-operational-amplifiers.md); GCSE background in [GCSE Electronics 10](../../../gcse/smaller-stem/electronics-eduqas/10-interfacing.md).

Equation to select and apply: resolution of an n-bit flash converter = input voltage range ÷ 2ⁿ.

## C1.4(a) Why convert

- Sensors produce analogue voltages; microprocessors and microcontrollers process only binary numbers, so an ADC is needed at the input.
- Digital results often need to drive analogue outputs (loudspeakers, motor speed), so a DAC is needed at the output.
- Digital signals are transmitted and stored with less degradation from noise and can be regenerated ([08](08-communications-systems.md), [14](14-digital-communications.md)), so communications systems convert speech and music to digital form and back.

## C1.4(b), (c) Summing-amplifier DAC

### What you need to know

Describe, analyse and design a DAC based on an op-amp summing amplifier to meet a specification.

### Explained

Each bit of the digital input drives a resistor into the virtual-earth input of an inverting summing amplifier. The resistor values are weighted in binary: the most significant bit (MSB) has the smallest resistor (R), the next 2R, then 4R, 8R for the least significant bit (LSB). With logic-high voltage VH on each "1" input:

Vout = −RF × VH × (b₃/R + b₂/2R + b₁/4R + b₀/8R)

So each bit contributes in proportion to its binary weight, and the output is proportional to the binary number. The output is negative (inverting); a second inverting stage, or the arrangement of supply, can make it positive.

**Design steps**: choose the full-scale output; set RF and R so the MSB gives half full scale; check the largest number gives the required maximum without saturating; choose preferred values (in practice resistor tolerance limits accuracy for many bits; an R-2R ladder is used in real DACs).

### Worked example

4-bit DAC, logic high 5 V, R = 10 kΩ (MSB), 20 kΩ, 40 kΩ, 80 kΩ (LSB), RF = 2 kΩ. Each LSB step = 2 × 5 ÷ 80 = 0.125 V. Input 1011 (11): Vout = −11 × 0.125 = −1.375 V. Full scale 1111 (15): −1.875 V.

To make the LSB step 0.25 V, double RF to 4 kΩ (full scale −3.75 V).

## C1.4(d) Comparators as an ADC

A comparator outputs a 1 when the input exceeds a reference voltage and 0 otherwise: a 1-bit ADC. Using several comparators with different reference voltages (from a resistor chain) gives a thermometer-style code showing how many thresholds the input exceeds.

## C1.4(e) Digitising audio

### What you need to know

The process of digitising audio; effects of sampling rate and resolution.

### Explained

1. A low-pass (anti-aliasing) filter removes frequencies above half the sampling rate.
2. A sample-and-hold circuit measures the signal at regular intervals (the sampling rate).
3. The ADC converts each sample to an n-bit number (quantisation).

- **Sampling rate**: must be at least twice the highest frequency in the signal (Nyquist, [14](14-digital-communications.md)), or false low-frequency components (aliasing) appear. Higher rates reproduce higher frequencies but give more data.
- **Resolution** (number of bits): more bits give more levels (2ⁿ), smaller steps, less quantisation error (less quantisation noise) and greater dynamic range, but more data. Each extra bit doubles the number of levels.
- **Data rate** = sampling rate × bits per sample × number of channels.

### Worked example

CD audio: 44.1 kHz sampling, 16 bits, 2 channels. Data rate = 44 100 × 16 × 2 = 1.41 Mbit s⁻¹. Highest frequency that can be reproduced: 22.05 kHz (above human hearing).

## C1.4(f), (g) Flash ADC

### What you need to know

Analyse and design a flash converter using comparators and a priority encoder; factors affecting resolution; resolution = input voltage range ÷ 2ⁿ.

### Explained

An n-bit flash ADC uses 2ⁿ − 1 comparators. A chain of equal resistors across the reference voltage sets each comparator's threshold one step apart. The input goes to all comparators at once; all those with thresholds below the input give a 1. A **priority encoder** converts the highest active comparator into an n-bit binary number. It is called "flash" because conversion happens in a single step, limited only by comparator and encoder delays: very fast.

**Resolution**: the smallest change in input that changes the output = input range ÷ 2ⁿ. More bits (and a smaller range) give finer resolution, but the number of comparators doubles with each extra bit, so flash ADCs are usually limited to about 8 bits. Resistor accuracy and comparator offset also limit it.

### Worked example

A 3-bit flash ADC with a 0 to 4 V range: 7 comparators; resolution = 4 ÷ 2³ = 0.5 V. Thresholds at 0.5, 1.0, 1.5 ... 3.5 V (if set at whole steps). An input of 2.3 V exceeds four thresholds (0.5 to 2.0 V), so the encoder outputs 100 (4).

## C1.4(h) Digital ramp ADC compared with flash ADC

A **digital ramp** (counter-type) ADC uses one comparator, a counter and a DAC. A clock makes the counter count up; the DAC output rises in a staircase (ramp). When the DAC output exceeds the input, the comparator stops the counter; the count is the digital value. Then the counter resets.

| | Flash ADC | Digital ramp ADC |
| --- | --- | --- |
| Speed | Very fast, one step | Slow: up to 2ⁿ clock pulses per conversion; time depends on input size |
| Complexity | 2ⁿ − 1 comparators | One comparator, counter and DAC |
| Cost and power | High for many bits | Low |
| Resolution | Usually limited to about 8 bits | Easily higher |

### Worked example

An 8-bit ramp ADC with a 1 MHz clock needs up to 255 clock pulses: maximum conversion time 255 µs, so at most about 3900 conversions per second.

### Common mistakes

- Giving the MSB the largest resistor in a weighted DAC.
- Saying an n-bit flash ADC needs 2ⁿ comparators (it needs 2ⁿ − 1).
- Forgetting the summing-amplifier DAC output is negative.

## Check questions

1. Explain why a microcontroller measuring temperature needs an ADC. (2)
2. A 4-bit summing DAC uses R = 8 kΩ for the MSB. State the other resistor values. (2)
3. In a 4-bit summing DAC, logic 1 = 5 V, MSB resistor 10 kΩ and RF = 4 kΩ. Calculate the output for input 0110. (3)
4. Explain the effect of increasing the resolution of an audio ADC. (3)
5. Calculate the data rate for a mono signal sampled at 8 kHz with 12-bit resolution. (2)
6. How many comparators does a 5-bit flash ADC need, and what is its resolution for a 0 to 3.2 V input? (2)
7. Describe how a flash ADC converts an analogue voltage. (4)
8. Compare a flash ADC and a digital ramp ADC for digitising a fast video signal. (3)

## Mark scheme

1. Sensor gives an analogue voltage (1); microcontroller only processes binary / digital values (1).
2. 16 kΩ, 32 kΩ, 64 kΩ (2; 1 for one error).
3. Bits for 0110: 2R (20 kΩ) and 4R (40 kΩ) inputs high (1); Vout = −4 × 5 × (1/20 + 1/40) (1) = −1.5 V (1).
4. More bits so more quantisation levels (1); smaller step size / less quantisation error / noise (1); more data to store or transmit (1).
5. 8000 × 12 (1) = 96 000 bit s⁻¹ (1).
6. 31 comparators (1); 3.2 ÷ 32 = 0.1 V (1).
7. Resistor chain sets reference voltages one step apart (1); input compared with all at once (1); comparators below the input give 1 (1); priority encoder converts the highest active one to binary (1).
8. Video is high frequency so needs fast conversion (1); flash is fast (single step) (1); ramp too slow (up to 2ⁿ clock cycles) though cheaper (1).
