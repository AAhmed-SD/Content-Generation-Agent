---
board: Eduqas
level: GCSE
subject: Electronics
code: "C490QS"
also_covers: []
topic: "Component 2 Topic 1 Operational amplifiers"
spec_refs: ["C2.1(a)", "C2.1(b)", "C2.1(c)", "C2.1(d)", "C2.1(e)", "C2.1(f)", "C2.1(g)", "C2.1(h)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-gcse/
pmt_url: null
---

# C2.1 Operational amplifiers

Amplifiers make small signals bigger. This topic covers voltage gain, bandwidth, input and output waveforms, op-amp non-inverting and inverting amplifiers, clipping, summing amplifiers (mixers) and the block diagram of an audio system.

Equations (given in a list): G = V_OUT ÷ V_IN; non-inverting G = 1 + R_F ÷ R₁; inverting G = −R_F ÷ R_IN; summing V_OUT = −R_F (V₁ ÷ R₁ + V₂ ÷ R₂ + ...).

## C2.1(a) Amplifiers and voltage gain

### What you need to know

- Amplifiers increase the power or the voltage of signals.
- Select and apply G = V_OUT ÷ V_IN.

### Explained

A microphone produces a signal of a few millivolts with very little power; a loudspeaker needs several volts and watts. An amplifier uses energy from its power supply to produce an output signal that has the same shape as the input but is larger. A voltage amplifier increases the signal voltage; a power amplifier supplies the large current (and so power) needed to drive a low-resistance load such as a loudspeaker.

Voltage gain G = V_OUT ÷ V_IN. It has no units. A gain of 50 means the output is 50 times the input. A negative gain means the output is inverted (upside down compared with the input).

### Worked example

An input of 20 mV gives an output of 1.5 V. G = 1.5 ÷ 0.020 = 75.

### Common mistakes

- Dividing input by output.
- Giving gain units such as V.

## C2.1(b) Gain-frequency graphs and bandwidth

### What you need to know

- Draw a gain-frequency graph for an amplifier, measure the bandwidth from it, and describe the trade-off between gain and bandwidth.

### Explained

An amplifier does not amplify all frequencies equally. A graph of gain (vertical) against frequency (horizontal, usually on a logarithmic scale such as 10 Hz, 100 Hz, 1 kHz, 10 kHz, 100 kHz) is flat over the middle range and falls away at high frequencies (and, for some amplifiers, at low frequencies too).

Bandwidth is the range of frequencies over which the amplifier works well. It is measured between the frequencies at which the gain has fallen to 0.7 (strictly 1/√2) of its maximum value. For an op-amp amplifier that works down to DC (0 Hz), the bandwidth is simply the upper frequency where the gain falls to 0.7 of the maximum.

Gain-bandwidth trade-off: for an op-amp, gain × bandwidth is roughly constant (the gain-bandwidth product, for example 1 MHz for a general purpose op-amp). So if the circuit is set to a higher gain, its bandwidth is smaller, and vice versa. To get both high gain and wide bandwidth, use two amplifier stages, each with a moderate gain.

Audio amplifiers need a bandwidth covering human hearing, about 20 Hz to 20 kHz.

### Worked example

An op-amp has a gain-bandwidth product of 1 MHz. With a gain of 100, bandwidth = 1 000 000 ÷ 100 = 10 kHz, not enough for full audio. Two stages each with gain 10 give overall gain 10 × 10 = 100, and each stage has bandwidth 1 000 000 ÷ 10 = 100 kHz.

From a graph: maximum gain 40; 0.7 × 40 = 28; the curve crosses a gain of 28 at 25 kHz, so bandwidth = 25 kHz (from 0 Hz).

### Common mistakes

- Reading the bandwidth where the gain reaches zero.
- Thinking higher gain also gives wider bandwidth.

## C2.1(c) and C2.1(e) Voltage-time graphs and clipping

### What you need to know

- Produce and interpret voltage-time graphs for the input and output of amplifiers.
- Show graphically and explain how clipping distortion can affect the output.

### Explained

For a non-inverting amplifier, the output waveform has the same shape and timing as the input, but a larger amplitude. For an inverting amplifier, the output is larger and inverted: when the input rises, the output falls (they are 180° out of phase). The frequency (and period) is unchanged by amplification.

Clipping: an amplifier cannot produce an output voltage beyond its supply voltages (in practice, an op-amp's output saturates about 1 to 2 V inside the supply rails, unless it is a "rail-to-rail" type). If gain × input would exceed this, the tops and bottoms of the output waveform are cut flat at the saturation voltage. This is clipping distortion: the output is no longer the same shape as the input, which in audio sounds harsh and adds unwanted frequencies. To avoid it, reduce the gain or the input signal, or increase the supply voltage.

### Worked example

An inverting amplifier with gain −10 runs from ±9 V supplies and saturates at ±7.5 V. Input sine wave amplitude 0.5 V: output amplitude 5 V, inverted, not clipped. Input 1.0 V: the expected output would be 10 V, beyond 7.5 V, so the peaks are clipped flat at ±7.5 V.

### Common mistakes

- Drawing a different frequency for the output.
- Showing a clipped waveform with rounded rather than flat tops.

## C2.1(d) and C2.1(f) Non-inverting and inverting op-amp amplifiers

### What you need to know

- Draw and analyse non-inverting and inverting amplifier circuits based on an op-amp.
- Select and apply G = 1 + R_F ÷ R₁ and G = −R_F ÷ R_IN to choose resistors for a given gain.

### Explained

An operational amplifier (op-amp) is an IC amplifier with two inputs (non-inverting + and inverting −) and one output. On its own it has an enormous gain (open-loop gain, often 100 000 or more), far too high to use directly. Negative feedback, a resistor R_F from the output back to the inverting input, sets the gain precisely by the ratio of resistors. Op-amps often use a dual supply (for example +9 V, 0 V, −9 V) so the output can swing positive and negative.

Non-inverting amplifier:

- The input signal goes to the + input.
- A feedback resistor R_F connects the output to the − input; a resistor R₁ connects the − input to 0 V.
- G = 1 + R_F ÷ R₁. The gain is positive (output in phase with input) and always at least 1.
- Very high input resistance, so it does not load the source.

Inverting amplifier:

- The + input is connected to 0 V.
- The input signal goes through R_IN to the − input; R_F connects the output to the − input.
- G = −R_F ÷ R_IN. The minus sign means the output is inverted. The gain can be less than 1 in size.
- The input resistance equals R_IN.

### Worked example

1. Non-inverting, R_F = 47 kΩ, R₁ = 2.2 kΩ: G = 1 + 47 ÷ 2.2 = 1 + 21.4 = 22.4.
2. Design a non-inverting amplifier with G = 11: R_F ÷ R₁ = 10. Choose R₁ = 10 kΩ, R_F = 100 kΩ.
3. Inverting, R_F = 100 kΩ, R_IN = 4.7 kΩ: G = −100 ÷ 4.7 = −21.3. Input 0.2 V gives output −4.3 V.
4. Design an inverting amplifier with gain −5 and input resistance 10 kΩ: R_IN = 10 kΩ, R_F = 50 kΩ; nearest E24 is 51 kΩ, giving −5.1.

### Common mistakes

- Forgetting the "1 +" in the non-inverting formula.
- Forgetting the minus sign for the inverting amplifier, or connecting the input to the wrong op-amp input.

## C2.1(g) Summing amplifiers (mixers)

### What you need to know

- Draw and analyse mixer circuits based on a summing op-amp and select and apply V_OUT = −R_F (V₁ ÷ R₁ + V₂ ÷ R₂ + ...).

### Explained

A summing amplifier is an inverting amplifier with several inputs, each through its own resistor to the − input, and one feedback resistor R_F. The output is the inverted, weighted sum of the inputs. If all input resistors equal R_F, the output is simply −(V₁ + V₂ + ...). Using different input resistors (or variable resistors) gives each input a different gain, which is how an audio mixer sets the volume of each microphone or instrument. The inputs do not affect each other, because the − input is held at (virtually) 0 V.

### Worked example

R_F = 20 kΩ, R₁ = 10 kΩ, R₂ = 40 kΩ. V₁ = 0.3 V, V₂ = 0.8 V.
V_OUT = −20 000 × (0.3 ÷ 10 000 + 0.8 ÷ 40 000) = −20 000 × (0.00003 + 0.00002) = −20 000 × 0.00005 = −1.0 V.

### Common mistakes

- Adding the voltages without dividing each by its own resistor.
- Leaving out the minus sign.

## C2.1(h) Amplifier system block diagram

### What you need to know

- Draw a block diagram of a typical amplifier system: signal source, preamplifier, mixer, power amplifier and loudspeaker.

### Explained

Signal source(s) (microphones, instruments, music player) → preamplifier (one per source; a voltage amplifier that raises weak signals to a standard level with low noise) → mixer (summing amplifier that combines the signals and sets their relative levels) → power amplifier (supplies the large current and power, with a volume control) → loudspeaker (converts the electrical signal to sound).

Each block is a sub-system that can be designed and tested separately (C1.1).

### Common mistakes

- Putting the power amplifier before the mixer: mixing is done at low power.

## Check questions

1. An amplifier gives an output of 3.6 V for an input of 45 mV. Calculate its voltage gain. [2 marks]
2. Explain what is meant by the bandwidth of an amplifier and how it is measured from a gain-frequency graph. [3 marks]
3. An op-amp has a gain-bandwidth product of 2 MHz. Calculate the bandwidth when the gain is 40. [2 marks]
4. Sketch the input and output waveforms of an inverting amplifier with a gain of −3. [3 marks]
5. Explain what causes clipping and describe its effect on a sine wave. [3 marks]
6. Draw a non-inverting amplifier circuit using an op-amp and label the resistors. [3 marks]
7. Select resistors from the E24 series for a non-inverting amplifier with a gain of about 23. [2 marks]
8. An inverting amplifier has R_IN = 3.3 kΩ and R_F = 33 kΩ. Calculate the output voltage for an input of +0.25 V. [2 marks]
9. A summing amplifier has R_F = 10 kΩ, R₁ = 10 kΩ, R₂ = 5 kΩ. V₁ = 0.4 V and V₂ = −0.1 V. Calculate V_OUT. [3 marks]
10. Draw a block diagram for a public address system with two microphones. [3 marks]

## Mark scheme

1. G = 3.6 ÷ 0.045 (1) = 80 (1).
2. The range of frequencies over which the amplifier gives useful gain (1); find the maximum gain, calculate 0.7 of it (1); read the frequency (or frequencies) where the gain falls to this value (1).
3. 2 000 000 ÷ 40 (1) = 50 kHz (1).
4. Output same frequency as input (1); output amplitude three times input (1); output inverted / 180° out of phase (1).
5. The output cannot exceed the supply / saturation voltage (1); if gain × input is too large (1), the peaks of the sine wave are cut off flat (1).
6. Input to + input (1); R_F from output to − input (1); R₁ from − input to 0 V (1).
7. R_F ÷ R₁ = 22 (1); e.g. R_F = 220 kΩ and R₁ = 10 kΩ, or 22 kΩ and 1 kΩ (1).
8. G = −33 ÷ 3.3 = −10 (1); V_OUT = −2.5 V (1).
9. V_OUT = −10 000 × (0.4 ÷ 10 000 + (−0.1) ÷ 5000) (1) = −10 000 × (0.00004 − 0.00002) (1) = −0.2 V (1).
10. Two microphones each feeding a preamplifier (1); both into a mixer (1); mixer → power amplifier → loudspeaker (1).
