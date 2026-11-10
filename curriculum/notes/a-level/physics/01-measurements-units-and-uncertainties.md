---
level: A-level
subject: Physics
topic: "Measurements, units, uncertainties and estimation"
as_content: "AS & A for every board."
boards:
  - board: AQA
    code: "7408"
    spec_refs: ["3.1.1", "3.1.2", "3.1.3"]
  - board: Edexcel
    code: "9PH0"
    spec_refs: ["1", "3", "4"]
  - board: OCR A
    code: "H556"
    spec_refs: ["2.1.1(a)", "2.1.1(b)", "2.1.2(a)", "2.1.2(b)", "2.1.2(c)", "2.1.2(d)", "2.1.2(e)", "2.1.2(f)", "2.2.1(a)", "2.2.1(b)", "2.2.1(c)", "2.2.1(d)"]
  - board: OCR B
    code: "H557"
    spec_refs: ["2(a)(i)", "2(a)(ii)", "2(b)(i)", "2(b)(ii)", "2(b)(iii)", "2(b)(iv)", "2(c)(i)", "2(c)(ii)", "2(c)(iii)"]
  - board: Eduqas
    code: "A420QS"
    spec_refs: ["C1.1(a)", "C1.1(b)", "C1.1(c)"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/physics-2015.html
  OCR A: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-a-h156-h556-from-2015/
  OCR B: https://www.ocr.org.uk/qualifications/as-and-a-level/physics-b-advancing-physics-h157-h557-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/physics-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/physics-revision/a-level-aqa/
---

# Measurements, units, uncertainties and estimation

Every number in physics has a unit and an uncertainty. This file covers SI base and derived units, prefixes, converting units, errors and uncertainties (including on graphs), and order-of-magnitude estimates. It is used in every other topic.

## Overview

AS & A for every board. Practical techniques, planning and the required or core practicals of each board are collected in file 32. Graph skills specific to one experiment are in that experiment's file.

### Board differences

- AQA 3.1.1 to 3.1.3. Edexcel 1, 3, 4. OCR A 2.1.1, 2.1.2, 2.2.1. OCR B Module 2 (Fundamental data analysis). Eduqas C1.1(a) to (c).
- AQA says dimensional analysis is not required. OCR A 2.1.2(d) and Eduqas C1.1(c) ask you to check equations for homogeneity using base units.
- OCR B 2(b)(ii) adds the terms sensitivity and response time, and 2(b)(iii) asks for dot-plots of repeated readings to estimate the mean and spread and spot outliers.
- Eduqas C1.1(a) lists six base units (kg, m, s, A, mol, K). AQA lists the same six quantities. Nobody needs the candela.
- OCR A 2.1.2(f) asks for the convention for labelling graph axes and table headings (quantity / unit).

## 3.1.1 Use of SI units and their prefixes

*Refs: AQA 3.1.1 · Edexcel 1 · OCR A 2.1.1(a), 2.1.2(a) to (f) · OCR B 2(b)(i) · Eduqas C1.1(a) to (c). Level: AS & A.*

### What you need to know

- The six SI base quantities used at A-level and their base units: mass (kg), length (m), time (s), amount of substance (mol), temperature (K) and electric current (A).
- Derived units are built from base units by multiplying and dividing, for example N = kg m s⁻², J = kg m² s⁻², W = kg m² s⁻³, C = A s, V = kg m² s⁻³ A⁻¹.
- The prefixes T, G, M, k, c, m, μ, n, p and f, with their powers of ten, and how to write values in standard form.
- How to convert between units of the same quantity, such as joules and electronvolts, or joules and kilowatt-hours.
- (OCR A, Eduqas) How to check that an equation is homogeneous: both sides must reduce to the same base units.

### Explained

**Base and derived.** A base quantity is one chosen to be independent of the others; its unit is defined directly. A derived quantity is defined by an equation linking base quantities, and its unit follows from that equation. Speed is distance ÷ time, so its unit is m s⁻¹.

| Base quantity | Unit | Symbol |
| --- | --- | --- |
| Mass | kilogram | kg |
| Length | metre | m |
| Time | second | s |
| Electric current | ampere | A |
| Temperature | kelvin | K |
| Amount of substance | mole | mol |

To find the base units of a derived unit, write down a defining equation and substitute:

- Force F = ma → kg × m s⁻² = kg m s⁻² (the newton).
- Energy W = Fs → kg m s⁻² × m = kg m² s⁻² (the joule).
- Power P = W/t → kg m² s⁻³ (the watt).
- Charge Q = It → A s (the coulomb).
- Potential difference V = W/Q → kg m² s⁻³ A⁻¹ (the volt).
- Resistance R = V/I → kg m² s⁻³ A⁻² (the ohm).
- Pressure p = F/A → kg m⁻¹ s⁻² (the pascal).

**Prefixes.**

| Prefix | Symbol | Multiplier |
| --- | --- | --- |
| tera | T | 10¹² |
| giga | G | 10⁹ |
| mega | M | 10⁶ |
| kilo | k | 10³ |
| centi | c | 10⁻² |
| milli | m | 10⁻³ |
| micro | μ | 10⁻⁶ |
| nano | n | 10⁻⁹ |
| pico | p | 10⁻¹² |
| femto | f | 10⁻¹⁵ |

Squared and cubed units need care: 1 cm² = (10⁻² m)² = 10⁻⁴ m², and 1 mm³ = 10⁻⁹ m³.

**Useful conversions.**

- 1 eV = 1.60 × 10⁻¹⁹ J (the energy gained by one electron accelerated through 1 V).
- 1 kW h = 1000 W × 3600 s = 3.6 × 10⁶ J.
- 1 tonne = 10³ kg; 1 litre = 10⁻³ m³; 1 hour = 3600 s.
- Speed: 1 km h⁻¹ = 1000 m ÷ 3600 s ≈ 0.278 m s⁻¹.

**Homogeneity** (OCR A, Eduqas). An equation that is physically correct must have the same base units on both sides, and every term that is added must have the same units. A homogeneous equation can still be wrong (a missing ½ or 2π has no units), but a non-homogeneous one is always wrong.

**Graph and table labels** (OCR A 2.1.2(f)). Write a column heading or axis label as quantity / unit, for example "time / s" or "length / m". The numbers in the column are then pure numbers.

### Worked example

1. Show that the equation for the speed of a wave on a string, v = √(T/μ), is homogeneous, where T is tension (N) and μ is mass per unit length (kg m⁻¹).

   T/μ has units kg m s⁻² ÷ kg m⁻¹ = m² s⁻². Square root: m s⁻¹, which is the unit of speed. Homogeneous.

2. A kettle of power 2.4 kW runs for 3.5 minutes. Find the energy in J and kW h.

   E = Pt = 2400 W × 210 s = 5.04 × 10⁵ J. In kW h: 2.4 kW × (3.5/60) h = 0.14 kW h. Check: 0.14 × 3.6 × 10⁶ = 5.04 × 10⁵ J.

3. An X-ray photon has energy 85 keV. Convert to joules.

   85 × 10³ × 1.60 × 10⁻¹⁹ = 1.36 × 10⁻¹⁴ J.

4. A wire has cross-sectional area 0.20 mm². Write this in m².

   0.20 × (10⁻³)² = 2.0 × 10⁻⁷ m².

### Common mistakes

- Writing kg as a derived unit, or treating the newton as a base unit.
- Converting mm² to m² by multiplying by 10⁻³ instead of 10⁻⁶.
- Using Kg, KG or Mg when you mean kg; mixing up m (milli) and M (mega).
- Forgetting to convert minutes or hours to seconds before using P = E/t.
- Labelling an axis "time (seconds)" in some places and "s" in others; use quantity / unit throughout.

## 3.1.2 Limitation of physical measurements

*Refs: AQA 3.1.2 · Edexcel 4 · OCR A 2.2.1(a) to (d) · OCR B 2(a)(i), (ii), 2(b)(ii) to (iv), 2(c)(i), (ii). Level: AS & A.*

### What you need to know

- The difference between random and systematic errors, and how each can be reduced or removed.
- The meanings of precision, repeatability, reproducibility, resolution and accuracy (OCR B also: sensitivity, response time, zero error).
- Absolute, fractional and percentage uncertainties, and how to give the uncertainty in a final answer.
- How to combine uncertainties when quantities are added, subtracted, multiplied, divided or raised to a power.
- How the number of significant figures in a value links to its uncertainty.
- How to draw error bars and find the uncertainty in the gradient and intercept of a straight-line graph using a best line and a worst acceptable line.

### Explained

**Errors.** An error is the difference between a measured value and the true value. There are two kinds.

- *Random errors* make repeated readings scatter unpredictably either side of the mean. Examples: judging when a pendulum passes the centre, fluctuations in a reading, parallax that varies from reading to reading. Reduce their effect by repeating and averaging, by measuring many cycles (time 20 oscillations, not 1), and by plotting a graph and drawing a line of best fit. They cannot be removed completely.
- *Systematic errors* shift every reading in the same direction by the same amount or proportion. Examples: a zero error on a micrometer, a meter that reads 2% high, reaction time when starting and stopping a stopwatch the same way, heat loss in every run of a heating experiment. Repeating does not help. Reduce them by calibrating instruments against a known standard, checking and correcting zero errors, changing the method, or using a graph: a zero error shows up as an intercept but does not change the gradient.

**Key terms.**

| Term | Meaning |
| --- | --- |
| Accuracy | How close a measurement is to the true value |
| Precision | How close repeated measurements are to each other (small spread); says nothing about the true value |
| Repeatability | The same person, method and equipment give the same results when repeated |
| Reproducibility | Different people, methods or equipment give the same results |
| Resolution | The smallest change in the quantity that the instrument can show (one scale division, or the last digit on a digital display) |
| Sensitivity (OCR B) | Change in output per unit change in input, for example mV per °C |
| Response time (OCR B) | How long an instrument takes to settle on a new reading |
| Zero error | The instrument reads a non-zero value when it should read zero |

A set of readings can be precise but inaccurate (tightly grouped, but all offset by a systematic error), or accurate on average but imprecise (large random scatter about the true value).

**Uncertainty.** The uncertainty is the interval within which the true value is expected to lie, written as value ± uncertainty. It comes from:

- *Resolution*: for a single reading on a scale, take ± half the smallest division (some boards accept ± one division; state your choice). For a length found from two readings (both ends of a ruler), both readings carry an uncertainty.
- *Spread of repeats*: uncertainty ≈ half the range = (largest − smallest) ÷ 2. Leave out anomalies before calculating the mean.

The *absolute* uncertainty has the same units as the quantity. The *fractional* uncertainty is absolute ÷ value. The *percentage* uncertainty is fractional × 100%.

**Combining uncertainties.**

| Operation | Rule |
| --- | --- |
| y = a + b or y = a − b | Add the absolute uncertainties: Δy = Δa + Δb |
| y = ab or y = a/b | Add the percentage (fractional) uncertainties |
| y = aⁿ | Multiply the percentage uncertainty by n |
| y = ka (k an exact constant) | Same percentage uncertainty as a |
| y = √a | Half the percentage uncertainty of a |

OCR B 2(c)(ii) also accepts the *extreme-value* method: recalculate y using the largest and smallest values the inputs could take; half the difference is the uncertainty in y.

**Significant figures.** Give a final answer to the same number of significant figures as the least precise input data (or one more). The uncertainty itself is usually given to one (or at most two) significant figures, and the value is rounded to the same decimal place: 9.81 ± 0.13 m s⁻² is better written 9.8 ± 0.1 m s⁻².

**Error bars and gradients.** Draw each point with a vertical (and if needed horizontal) bar showing ± its absolute uncertainty. Draw the line of best fit through the error bars. Then draw the *worst acceptable line*: the steepest (or shallowest) straight line that still passes through all the error bars. Then:

- Uncertainty in gradient = |best gradient − worst gradient|.
- Percentage uncertainty in gradient = (that difference ÷ best gradient) × 100%.
- The uncertainty in the intercept is found in the same way from the two lines.

Some points may have error bars too small to draw; then use the scatter of the points.

**Dot-plots** (OCR B 2(b)(iii)). Plot each repeated reading as a dot on a number line. The cluster shows the likely value, the spread shows the uncertainty, and any point far from the cluster is a possible outlier to investigate (a misread scale, a timing slip).

**Largest source of uncertainty** (OCR B 2(a)(ii)). Calculate the percentage uncertainty of each measurement. The biggest one dominates, so improving the experiment means attacking that one first.

### Worked example

1. A student measures the diameter of a wire with a micrometer at five places: 0.36, 0.38, 0.37, 0.37, 0.38 mm. Find the mean, its absolute uncertainty and the percentage uncertainty in the cross-sectional area.

   Mean = 1.86 ÷ 5 = 0.372 mm, so 0.37 mm. Half range = (0.38 − 0.36)/2 = 0.01 mm. Percentage uncertainty in d = 0.01/0.37 × 100 = 2.7%. A = πd²/4, so percentage uncertainty in A = 2 × 2.7% = 5.4% (π and 4 are exact).

2. The time for 10 swings of a pendulum is 15.6 ± 0.2 s and its length is 0.600 ± 0.002 m. Find g = 4π²L/T² and its uncertainty.

   T = 1.56 s; percentage uncertainty in T = 0.2/15.6 × 100 = 1.3% (timing 10 swings divides the absolute uncertainty by 10 but keeps the same percentage). g = 4π² × 0.600 / 1.56² = 9.73 m s⁻².
   Percentage uncertainty: L: 0.002/0.600 = 0.33%; T²: 2 × 1.3% = 2.6%. Total ≈ 2.9%.
   Δg = 0.029 × 9.73 = 0.28 m s⁻². Answer: g = 9.7 ± 0.3 m s⁻².

3. Two lengths are 25.0 ± 0.1 cm and 13.4 ± 0.1 cm. Find their difference.

   11.6 ± 0.2 cm. Note: the percentage uncertainty has risen from 0.4% to 1.7%, which is why taking a small difference of two large readings is a poor method.

4. On a graph the best-fit gradient is 4.20 V A⁻¹ and the steepest acceptable line has gradient 4.47 V A⁻¹. Find the percentage uncertainty.

   (4.47 − 4.20)/4.20 × 100 = 6.4%.

### Common mistakes

- Saying precision and accuracy mean the same thing.
- Saying repeating readings reduces systematic error. It does not.
- Adding percentage uncertainties for a sum or difference. For + and −, add absolute uncertainties.
- Forgetting to double the percentage uncertainty when a quantity is squared.
- Quoting an uncertainty to four significant figures, or a value to more decimal places than its uncertainty.
- Drawing the worst line through the first and last points instead of through the extremes of the error bars.
- Calling human error a type of error. Name the actual source (reaction time, parallax) and whether it is random or systematic.

## 3.1.3 Estimation of physical quantities

*Refs: AQA 3.1.3 · Edexcel 3 · OCR A 2.1.1(b) · OCR B 2(c)(iii). Level: AS & A.*

### What you need to know

- What an order of magnitude is, and how to give a value to the nearest power of ten.
- Sensible estimates of everyday quantities, and how to combine them with physics to make further estimates.

### Explained

An order of magnitude is the power of ten nearest to a value. 3000 is about 10³; 7000 is closer to 10⁴ (the switch is at about 3.16, the square root of 10, in the multiplier).

Estimating means choosing sensible round values, saying what you assumed, and then calculating. Final answers should be given to one significant figure or as a power of ten.

| Quantity | Typical value |
| --- | --- |
| Mass of an adult | 70 kg |
| Height of an adult | 1.7 m |
| Walking speed | 1.5 m s⁻¹ |
| Running speed (sprinter) | 10 m s⁻¹ |
| Car on a motorway | 30 m s⁻¹ |
| Mass of a car | 1000 to 1500 kg |
| Height of one storey | 3 m |
| Diameter of an atom | 10⁻¹⁰ m |
| Diameter of a nucleus | 10⁻¹⁵ to 10⁻¹⁴ m |
| Wavelength of visible light | 4 to 7 × 10⁻⁷ m |
| Power of a kettle | 2 to 3 kW |
| Mains p.d. (UK) | 230 V |
| Radius of the Earth | 6.4 × 10⁶ m |
| Density of water | 1000 kg m⁻³ |
| Density of air | 1.2 kg m⁻³ |
| Atmospheric pressure | 1.0 × 10⁵ Pa |

### Worked example

1. Estimate the kinetic energy of a family car on a motorway.

   m ≈ 1200 kg, v ≈ 30 m s⁻¹. Ek = ½ × 1200 × 30² = 5.4 × 10⁵ J, so about 10⁶ J.

2. Estimate the number of air molecules in a classroom.

   Room 8 m × 6 m × 3 m = 144 m³, so about 150 m³. Mass of air = 1.2 × 150 = 180 kg. Mean molar mass of air ≈ 0.029 kg mol⁻¹, so moles ≈ 180/0.029 ≈ 6000 mol. Molecules ≈ 6000 × 6 × 10²³ ≈ 4 × 10²⁷, about 10²⁸ to the nearest order of magnitude.

3. Estimate the power a student develops running up a flight of stairs.

   m = 60 kg, height of a flight ≈ 3 m, time ≈ 4 s. P = mgh/t = 60 × 9.8 × 3 / 4 ≈ 440 W, so about 10² to 10³ W (roughly 400 W).

### Common mistakes

- Giving an estimate to four significant figures; this suggests a precision you do not have.
- Not stating the assumed values, so the examiner cannot follow the method.
- Using wildly unrealistic values (a car of 100 kg, a person 3 m tall).

## Check questions

1. Express the ohm in SI base units. (2 marks)
2. Show that the equation E = ½mv² is homogeneous. (2 marks)
3. A battery stores 0.012 kW h. Convert this to joules. (1 mark)
4. Explain the difference between precision and accuracy, using a set of readings to illustrate each. (3 marks)
5. A student times a trolley over a fixed distance using a hand-held stopwatch. Identify one random and one systematic error and say how each could be reduced. (4 marks)
6. The side of a cube is measured as 2.50 ± 0.02 cm and its mass is 122.0 ± 0.5 g. Calculate its density in kg m⁻³ with the absolute uncertainty. (4 marks)
7. Describe how to find the uncertainty in the gradient of a straight-line graph with error bars. (3 marks)
8. Estimate the energy needed to boil the water in a full kettle, starting from room temperature. The specific heat capacity of water is 4200 J kg⁻¹ K⁻¹. (3 marks)

## Mark scheme

1. R = V/I and V = W/Q (1); kg m² s⁻³ A⁻² (1).
2. Left: J = kg m² s⁻² (1); right: kg × (m s⁻¹)² = kg m² s⁻², so the same; ½ has no units (1).
3. 0.012 × 3.6 × 10⁶ = 4.3 × 10⁴ J (1).
4. Precision: how closely repeated readings agree / small spread (1); accuracy: how close the result is to the true value (1); a valid illustration, e.g. readings 9.52, 9.53, 9.52 m s⁻² for g are precise but not accurate if the true value is 9.81 (1).
5. Random: variation in reaction time between runs (1); reduce by repeating and averaging / using light gates (1). Systematic: e.g. always starting the stopwatch late / a stopwatch that runs slow / distance measured from the wrong mark (1); reduce by using light gates / calibrating / measuring from the correct point (1).
6. V = 2.50³ = 15.6 cm³ = 1.56 × 10⁻⁵ m³; ρ = 0.1220/1.5625 × 10⁻⁵ = 7810 kg m⁻³ (1). % uncertainty: side 0.8%, so volume 2.4% (1); mass 0.4% (1); total 2.8%, so ρ = 7800 ± 200 kg m⁻³ (1).
7. Draw line of best fit through the error bars (1); draw steepest or shallowest line that still passes through all the error bars (1); uncertainty = difference between the gradients (as a percentage of the best gradient) (1).
8. Assume 1.5 kg (1.5 litres) of water heated from 20 °C to 100 °C (1); E = mcΔθ = 1.5 × 4200 × 80 (1); = 5 × 10⁵ J (about 10⁶ J to an order of magnitude) (1).
