---
level: A-level
subject: Mathematics
topic: "Exponentials and logarithms"
as_content: "All of this file is AS content."
boards:
  - board: AQA
    code: "7357"
    spec_refs: ["F1", "F2", "F3", "F4", "F5", "F6", "F7"]
  - board: Edexcel
    code: "9MA0"
    spec_refs: ["P6.1", "P6.2", "P6.3", "P6.4", "P6.5", "P6.6", "P6.7"]
  - board: OCR
    code: "H240"
    spec_refs: ["1.06a", "1.06b", "1.06c", "1.06d", "1.06e", "1.06f", "1.06g", "1.06h", "1.06i"]
  - board: OCR MEI
    code: "H640"
    spec_refs: ["ME1", "ME2", "ME3", "ME4", "ME5", "ME6", "ME7", "ME8", "ME9", "ME10", "ME11"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-b-mei-h630-h640-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/a-level-maths/
---

# Exponentials and logarithms

This file covers the functions aˣ and eˣ, why eˣ is special, logarithms and their laws, solving equations with the unknown in the power, using log graphs to find the constants in y = axⁿ and y = kbˣ, and exponential growth and decay models.

## Overview

All AS content. Differentiating eˣ and ln x in general (beyond the gradient of e^{kx}) is A-level and is in file 13.

### Board differences

- AQA F1 to F7; Edexcel 6.1 to 6.7; OCR H240 1.06a to 1.06i.
- OCR MEI H640: ME1 to ME11. MEI lists the index-to-log conversion (ME2) and the values logₐa = 1, logₐ1 = 0 (ME5) separately.

## F1 Exponential functions

*Refs: AQA F1 · Edexcel 6.1 · OCR 1.06a · MEI ME1, ME8. Level: AS & A.*

### What you need to know

- The graph of y = aˣ for a > 0: it passes through (0, 1), is always positive, and has the x-axis as an asymptote.
- For a > 1 the graph increases (growth); for 0 < a < 1 it decreases (decay).
- The function eˣ, where e = 2.71828..., and its graph.

### Explained

y = aˣ is never zero or negative. y = a⁻ˣ = (1/a)ˣ is the reflection of y = aˣ in the y-axis. Transformations from file 04 apply: y = e^{x} + 2 has asymptote y = 2; y = 3e^{−x} passes through (0, 3).

### Worked example

Sketch y = e^{−x} + 2 and state its asymptote and y-intercept.

1. y = e^{−x} is decreasing, through (0, 1), approaching 0.
2. Add 2: through (0, 3), approaching y = 2 from above as x → ∞.

### Common mistakes

- Drawing the curve crossing the x-axis.
- Putting the y-intercept of y = 3e^{x} at (0, 1).

## F2 The gradient of e^{kx}

*Refs: AQA F2 · Edexcel 6.2 · OCR 1.06b · MEI ME9. Level: AS & A.*

### What you need to know

- The gradient of y = e^{kx} is ke^{kx}.
- This means the rate of change is proportional to the value, which is why exponential models suit so many situations.

### Explained

e is the one base for which the gradient of y = eˣ equals the value of y everywhere. For y = Ae^{kx}, dy/dx = kAe^{kx} = ky. "Rate of growth proportional to size" describes populations, money with continuous interest, and (with k negative) radioactive decay and cooling.

### Worked example

Find the gradient of y = 3e^{2x} at x = 0 and at x = ln 2.

1. dy/dx = 6e^{2x}.
2. At x = 0: 6. At x = ln 2: 6e^{2 ln 2} = 6 × 4 = 24.

### Common mistakes

- Writing the derivative of e^{2x} as e^{2x} or 2xe^{2x−1}.

## F3 Logarithms

*Refs: AQA F3 · Edexcel 6.3 · OCR 1.06c, 1.06d, 1.06e · MEI ME2, ME3, ME5, ME10. Level: AS & A.*

### What you need to know

- logₐx is the power you raise a to in order to get x:

```latex
y = a^x \iff x = \log_a y \qquad (a > 0,\ a \ne 1,\ y > 0)
```

- logₐa = 1 and logₐ1 = 0.
- ln x means logₑx. ln x is the inverse of eˣ: e^{ln x} = x and ln(eˣ) = x.
- The graph of y = ln x is the reflection of y = eˣ in the line y = x. It passes through (1, 0), and the y-axis is an asymptote.

### Explained

A logarithm answers "what power?". log₂ 32 = 5 because 2⁵ = 32. Logs are only defined for positive numbers. Your calculator has ln and log₁₀ (often written log or lg).

### Worked example

Write 3⁴ = 81 in log form, and find log₅ 125 and log₄ 2.

1. log₃ 81 = 4.
2. 5³ = 125, so log₅ 125 = 3.
3. 4^{1/2} = 2, so log₄ 2 = 1/2.

Solve ln(2x − 1) = 3.

1. 2x − 1 = e³.
2. x = (e³ + 1)/2 = 10.5 (3 s.f.).

### Common mistakes

- Taking the log of a negative number or zero.
- Confusing ln and log₁₀.

## F4 Laws of logarithms

*Refs: AQA F4 · Edexcel 6.4 · OCR 1.06f · MEI ME4. Level: AS & A.*

### What you need to know

```latex
\log_a x + \log_a y \equiv \log_a(xy) \qquad \log_a x - \log_a y \equiv \log_a\!\left(\frac{x}{y}\right) \qquad k\log_a x \equiv \log_a(x^k)
```

including k = −1 (so −logₐx = logₐ(1/x)) and k = 1/2.

### Explained

These come from the index laws: adding powers when multiplying. Use them to combine several logs into one, then remove the log.

### Worked example

Write 2 log a + 3 log b − log c as a single logarithm.

1. log(a²) + log(b³) − log c = log(a²b³/c).

Solve log₂x + log₂(x − 2) = 3.

1. log₂[x(x − 2)] = 3, so x(x − 2) = 8.
2. x² − 2x − 8 = 0, (x − 4)(x + 2) = 0.
3. x = −2 makes log₂x undefined, so x = 4.

Solve 2 ln x − ln(x + 2) = ln 3.

1. ln[x²/(x + 2)] = ln 3, so x² = 3(x + 2), x² − 3x − 6 = 0.
2. x = (3 + √33)/2 = 4.37. (The other root is negative and is rejected.)

### Common mistakes

- Writing log(x + y) as log x + log y.
- Writing (log x)² as 2 log x. Only log(x²) = 2 log x.
- Keeping solutions that make a log of a negative number.

## F5 Solving aˣ = b

*Refs: AQA F5 · Edexcel 6.5 · OCR 1.06g · MEI ME6. Level: AS & A.*

### What you need to know

- Solve equations of the form aˣ = b by taking logs of both sides.
- Solve equations that become quadratics in aˣ or eˣ.

### Explained

```latex
a^x = b \implies x\ln a = \ln b \implies x = \frac{\ln b}{\ln a}
```

Any base of log works, as long as you use the same one on both sides. If the unknown appears in two powers with different bases, take logs, expand, and collect the x terms.

### Worked example

Solve 5ˣ = 20.

1. x = ln 20 / ln 5 = 1.86 (3 s.f.).

Solve 3^{2x+1} = 7ˣ.

1. (2x + 1) ln 3 = x ln 7.
2. x(2 ln 3 − ln 7) = −ln 3.
3. x = −ln 3/(2 ln 3 − ln 7) = −4.37 (3 s.f.).

Solve e^{2x} − 5eˣ + 6 = 0.

1. (eˣ − 2)(eˣ − 3) = 0.
2. x = ln 2 or x = ln 3.

### Common mistakes

- Writing log(3^{2x+1}) as 2x + 1 log 3 without the bracket.
- Dividing logs instead of subtracting: ln 20 / ln 5 is not ln 4.

## F6 Logarithmic graphs

*Refs: AQA F6 · Edexcel 6.6 · OCR 1.06h · MEI ME7. Level: AS & A.*

### What you need to know

- If y = axⁿ, plotting log y against log x gives a straight line with gradient n and intercept log a.
- If y = kbˣ, plotting log y against x gives a straight line with gradient log b and intercept log k.
- Use these lines to estimate the constants from data.

### Explained

```latex
y = ax^n \implies \log y = n\log x + \log a
```

```latex
y = kb^x \implies \log y = (\log b)\,x + \log k
```

Compare each with Y = mX + c. Decide which model fits by checking which plot is straight. Then read the gradient and intercept, and undo the logs: a = 10^{intercept} (or e^{intercept} if you used ln).

### Worked example

Data for x and y give a straight line when ln y is plotted against ln x, with gradient 1.5 and intercept 0.7. Find the relationship.

1. ln y = 1.5 ln x + 0.7.
2. n = 1.5 and a = e^{0.7} = 2.01.
3. y = 2.01x^{1.5}.

A plot of log₁₀ y against x is a straight line with intercept 0.48 and gradient 0.30. Find k and b in y = kbˣ.

1. log₁₀ k = 0.48, so k = 10^{0.48} = 3.02.
2. log₁₀ b = 0.30, so b = 10^{0.30} = 2.00 (3 s.f.).
3. y ≈ 3.02 × 2ˣ.

### Common mistakes

- Using the intercept as a instead of e^{intercept} or 10^{intercept}.
- Plotting log y against log x for an exponential model.

## F7 Exponential growth and decay

*Refs: AQA F7 · Edexcel 6.7 · OCR 1.06i · MEI ME11. Level: AS & A.*

### What you need to know

- Use models of the form y = Ae^{kt} (growth if k > 0, decay if k < 0), for example continuous compound interest, radioactive decay, drug concentration and population growth.
- Find the constants from given information, interpret them, and comment on the limitations of the model.

### Explained

A is the initial value (t = 0). k controls the rate: the rate of change is k times the current value. Time to double: ln 2 / k. Half-life (for k < 0): ln 2 / |k|.

Limitations: real populations run out of food or space, so growth slows; a drug may be absorbed before it starts decaying; a model fitted to a short time may not hold for long times.

### Worked example

A population is modelled by N = 500e^{0.04t}, t in years. Find the time to double, and the rate of growth when t = 10.

1. 1000 = 500e^{0.04t}, so e^{0.04t} = 2, t = ln 2/0.04 = 17.3 years.
2. dN/dt = 0.04N = 0.04 × 500e^{0.4} = 29.8 per year.

Carbon-14 has a half-life of 5730 years. The mass of carbon-14 in a sample is modelled by m = 80e^{−kt}. Find k and the mass after 2000 years.

1. 40 = 80e^{−5730k}, so k = ln 2/5730 = 1.21 × 10⁻⁴.
2. m = 80e^{−2000k} = 62.8.

£1000 is invested at 4% a year compounded continuously. Find its value after 10 years.

1. V = 1000e^{0.04 × 10} = £1491.82.

A drug's concentration is C = 12e^{−0.3t} mg/l, t hours after a dose. When does it fall below 2 mg/l?

1. 12e^{−0.3t} < 2, so e^{−0.3t} < 1/6.
2. −0.3t < ln(1/6), so t > ln 6/0.3 = 5.97 hours.

### Common mistakes

- Forgetting to reverse the inequality when dividing by a negative number.
- Using percentage growth (1.04ᵗ) when the question says continuous (e^{0.04t}).

## Check questions

1. Solve 4ˣ = 30, giving x to 3 significant figures. [2 marks]
2. Solve 2^{x+1} = 3^{x−1}, giving x to 3 significant figures. [4 marks]
3. Solve log₃(x + 4) − log₃(x − 2) = 2. [4 marks]
4. Solve e^{2x} − 7eˣ + 12 = 0, giving exact answers. [3 marks]
5. Solve ln(3x + 2) = 2 + ln x, giving x to 3 significant figures. [4 marks]
6. Sketch y = e^{−x} + 2, showing its asymptote and y-intercept. [2 marks]
7. The population P of a type of bacteria is thought to follow P = abᵗ. A graph of log₁₀P against t is a straight line with intercept 2.1 and gradient 0.045. Find a and b, and interpret b. [4 marks]
8. A town's population is modelled by P = 2000e^{0.03t}, t years after 2020. (a) Find P when t = 10. (b) Find when the population reaches 5000. (c) Find the rate of increase when t = 10. (d) Give one reason why the model may not be suitable in the long term. [7 marks]

## Mark scheme

1. x = ln 30/ln 4 (1) = 2.45 (1).
2. (x + 1) ln 2 = (x − 1) ln 3 (1); x(ln 3 − ln 2) = ln 3 + ln 2 (1); x = ln 6/ln 1.5 (1) = 4.42 (1).
3. log₃[(x + 4)/(x − 2)] = 2 (1); (x + 4)/(x − 2) = 9 (1); x + 4 = 9x − 18 (1); x = 11/4 (1).
4. (eˣ − 3)(eˣ − 4) = 0 (1); x = ln 3 (1); x = ln 4 (1).
5. ln[(3x + 2)/x] = 2 (1); 3x + 2 = e²x (1); x = 2/(e² − 3) (1) = 0.456 (1).
6. Decreasing curve through (0, 3) (1); asymptote y = 2 (1).
7. log₁₀a = 2.1, a = 126 (1); log₁₀b = 0.045 (1); b = 1.11 (1); the population grows by about 11% each unit of time (1).
8. (a) 2000e^{0.3} = 2700 (1). (b) e^{0.03t} = 2.5 (1); t = ln 2.5/0.03 = 30.5 years, so during 2050 (1). (c) dP/dt = 60e^{0.03t} (1); 81.0 people per year (1). (d) e.g. it grows without limit, but housing and space are limited (2).
