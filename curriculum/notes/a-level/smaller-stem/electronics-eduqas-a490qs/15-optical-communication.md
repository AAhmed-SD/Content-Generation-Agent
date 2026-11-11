---
level: A-level
subject: Electronics
topic: "C2.5 Optical communication"
as_content: "A level only."
boards:
  - board: Eduqas
    code: "A490QS"
    spec_refs: ["C2.5(a)", "C2.5(b)", "C2.5(c)", "C2.5(d)"]
refs_checked: false
spec_url: https://www.eduqas.co.uk/qualifications/electronics-asa-level/
pmt_url: null
---

# C2.5 Optical communication

Optical fibres carry information as pulses of light. They have very large bandwidth and low loss, so they carry the bulk of long-distance and internet traffic. This file covers how fibres guide light, what limits them, the two fibre types, and the circuits that convert between electrical and optical signals. Communications ideas: [08](08-communications-systems.md), [14](14-digital-communications.md). Photodiodes and LEDs: [03](03-semiconductor-components.md).

## C2.5(a) How fibres carry light

### Explained

An optical fibre has a glass **core** surrounded by **cladding** of slightly lower refractive index, with a protective outer coating. Light travelling along the core meets the core-cladding boundary at angles greater than the **critical angle**, so it is **totally internally reflected** and stays in the core, even around gentle bends. Very pure glass absorbs little light, so signals travel tens of kilometres before needing amplification or regeneration.

Critical angle: sin c = n₂/n₁ (cladding index ÷ core index). Light entering within a cone of acceptance is guided.

### Worked example

Core n₁ = 1.48, cladding n₂ = 1.46. sin c = 1.46 ÷ 1.48 = 0.9865; c = 80.6°. Rays must strike the boundary at more than 80.6° to the normal, so only rays travelling nearly parallel to the axis are guided.

## C2.5(b) Losses, dispersion and fibre types

### What you need to know

Effects of dispersion, attenuation and radiation losses; relative advantages of single-mode and multimode fibres.

### Explained

- **Attenuation**: loss of light power by absorption (impurities in the glass) and scattering (tiny density variations, Rayleigh scattering, worse at shorter wavelengths). Measured in dB km⁻¹ (as low as about 0.2 dB km⁻¹ at 1550 nm). Infrared wavelengths (850, 1310, 1550 nm) are used because losses are lowest there.
- **Radiation losses**: light escapes where the fibre is bent too sharply (the angle at the boundary falls below critical) or at tiny imperfections (microbends) and joints.
- **Dispersion**: spreading of pulses in time as they travel, so that neighbouring pulses overlap and cannot be told apart. This limits the bit rate × distance.
  - **Multimode (modal) dispersion**: in a wide core, rays take different paths (modes): those zigzagging at steep angles travel further than those straight down the axis, so arrive later.
  - **Material (chromatic) dispersion**: the refractive index depends on wavelength, so different wavelengths in the source travel at different speeds. Reduced with narrow-spectrum sources (lasers).

| | Multimode fibre | Single-mode (monomode) fibre |
| --- | --- | --- |
| Core diameter | Large (about 50 to 62.5 µm) | Very small (about 8 to 10 µm, a few wavelengths) |
| Paths | Many modes | Only one path along the axis |
| Modal dispersion | Large | None |
| Bandwidth and distance | Lower: local networks, short links | Very high: long-distance, high-speed links |
| Source | Cheap LEDs or lasers; easy to couple light in | Lasers needed; precise alignment |
| Cost of connectors and equipment | Lower | Higher |

Graded-index multimode fibre (core index decreasing towards the edge) reduces modal dispersion, because rays further from the axis travel faster.

## C2.5(c) Converting between electrical and optical signals

### Explained

**Transmitter (electrical to optical)**: a transistor or MOSFET driver switches the LED or laser current on and off (digital), with a series resistor to set the current; for analogue transmission, the drive current is varied about a bias level. A laser needs current control to stay just above its threshold current and avoid damage.

**Receiver (optical to electrical)**: a reverse-biased photodiode (fast response) converts light pulses into a small current. A transimpedance amplifier (an op-amp with a feedback resistor RF, photodiode feeding the virtual-earth input) converts the current to a voltage: Vout = −I × RF. A Schmitt trigger then regenerates clean digital levels ([14](14-digital-communications.md)). Phototransistors are more sensitive but slower.

### Worked example

A photodiode current of 2 µA into a transimpedance amplifier with RF = 470 kΩ gives Vout = −2 × 10⁻⁶ × 470 × 10³ = −0.94 V.

Power budget: 5 mW launched into a 40 km fibre at 0.35 dB km⁻¹ plus 3 dB of connector losses: total loss = 14 + 3 = 17 dB. Received power = 5 × 10^(−1.7) = 0.10 mW.

## C2.5(d) LED and laser sources

| | LED | Laser diode |
| --- | --- | --- |
| Light | Incoherent, spread over a wide range of wavelengths (about 30 to 60 nm) | Coherent, very narrow spectrum (under 1 nm) |
| Beam | Wide angle, hard to couple into a narrow core | Narrow beam, couples well into single-mode fibre |
| Speed | Slower switching (lower data rate) | Very fast switching (gigabits per second) |
| Dispersion | More material dispersion | Little material dispersion |
| Cost and life | Cheap, robust, long life | Expensive, sensitive to temperature, needs current control |
| Typical use | Short multimode links | Long-distance single-mode links |

### Common mistakes

- Saying light escapes from the cladding rather than being reflected at the core-cladding boundary.
- Confusing attenuation (power loss) with dispersion (pulse spreading).
- Saying single-mode fibre has a single wavelength; it has a single path.

## Check questions

1. Explain how light is kept inside an optical fibre. (3)
2. Calculate the critical angle for a core of index 1.50 and cladding 1.47. (2)
3. Explain how modal dispersion limits the data rate of a multimode fibre. (3)
4. Distinguish between attenuation and dispersion. (2)
5. Compare single-mode and multimode fibres for a link between cities. (4)
6. A photodiode gives 0.8 µA. Choose RF for a transimpedance amplifier to give an output of 2.0 V (magnitude). (2)
7. A system launches 2 mW. The fibre loses 0.25 dB km⁻¹ over 60 km and connectors lose 2 dB. Calculate the received power. (3)
8. Give two reasons why lasers are used rather than LEDs in long-distance fibre systems. (2)

## Mark scheme

1. Core has a higher refractive index than the cladding (1); light hits the boundary at more than the critical angle (1); totally internally reflected so stays in the core (1).
2. sin c = 1.47 ÷ 1.50 = 0.98 (1); c = 78.5° (1).
3. Rays take different paths / modes with different lengths (1); arrive at different times so pulses spread (1); adjacent pulses overlap so pulses must be further apart / lower bit rate (1).
4. Attenuation: loss of signal power along the fibre (1); dispersion: spreading of pulses in time (1).
5. Single-mode: one path, no modal dispersion (1), very high bandwidth over long distances (1); multimode: cheaper, easier coupling (1), but modal dispersion limits bandwidth over long distances, so single-mode for cities (1).
6. RF = 2.0 ÷ 0.8 × 10⁻⁶ (1) = 2.5 MΩ (choose 2.4 MΩ or 2.7 MΩ) (1).
7. Loss = 15 + 2 = 17 dB (1); 2 × 10^(−1.7) (1) = 0.040 mW (40 µW) (1).
8. Any two: narrow spectrum so less material dispersion; narrow beam couples into single-mode fibre; faster switching / higher data rate; higher power.
