---
level: A-level
subject: Further Mathematics
topic: "Maclaurin series and limits"
as_content: "All of this file is A-level only."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["D5", "D6", "D7"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["CP4.5", "CP4.6", "FP1 2.2", "FP1 2.4"]
  - board: OCR
    code: "H245"
    spec_refs: ["4.08a", "4.08b"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Ps3", "Ps4", "Ps5"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-core-pure/
---

# Maclaurin series and limits

This file covers finding Maclaurin series by repeated differentiation, the standard series and where they are valid, combining standard series to get new ones, and using series or l'Hôpital's rule to find limits.

## Overview

All A-level only. You need differentiation from A-level Maths ([../maths/13-differentiation-further-techniques.md](../maths/13-differentiation-further-techniques.md)) and the binomial expansion ([../maths/07-binomial-expansion.md](../maths/07-binomial-expansion.md)). Taylor series about points other than 0, and Leibnitz's theorem (Edexcel FP1), are in [23-t-formulae-taylor-series-and-leibnitz.md](23-t-formulae-taylor-series-and-leibnitz.md).

### Board differences

- AQA D5 to D7; Edexcel CP4.5, CP4.6 (and FP1 2.2 and 2.4 for compound series and L'Hospital's rule); OCR 4.08a, 4.08b; MEI Ps3 to Ps5.
- Limits by series or l'Hôpital's rule (AQA D7) are compulsory on AQA, and on Edexcel only in the FP1 option. OCR and MEI do not list limits explicitly in core.
- MEI Ps4 asks you to know that a series may only converge for some x.

## D5 Maclaurin series by differentiation

*Refs: AQA D5 · Edexcel CP4.5 · OCR 4.08a · MEI Ps3. Level: A-level only.*

### What you need to know

```latex
f(x) = f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3 + \dots + \frac{f^{(r)}(0)}{r!}x^r + \dots
```

- This needs f and all its derivatives to exist at x = 0. For example ln x and √x have no Maclaurin series.
- Find the general term when the derivatives follow a pattern.

### Explained

A Maclaurin series is a polynomial that matches f(0), f′(0), f″(0), ... at x = 0, extended forever. Near 0 a few terms give a good approximation.

Method: make a table of f, f′, f″, ... and their values at 0, then substitute into the formula. Keep derivatives factorised; you often only need their values at 0.

### Worked example

Find the Maclaurin series of eˣ, including the general term.

1. Every derivative is eˣ, and e⁰ = 1.
2. eˣ = 1 + x + x²/2! + x³/3! + ... + xʳ/r! + ...

Find the first three non-zero terms of the Maclaurin series of ln(1 + sin x).

1. f = ln(1 + sin x), f(0) = 0.
2. f′ = cos x/(1 + sin x), f′(0) = 1.
3. f″ = [−sin x(1 + sin x) − cos²x]/(1 + sin x)² = −(sin x + 1)/(1 + sin x)² = −1/(1 + sin x). f″(0) = −1.
4. f‴ = cos x/(1 + sin x)², f‴(0) = 1.
5. Series: x − x²/2 + x³/6 − ...

Find the series for sec x up to x⁴.

1. Differentiating sec x four times is slow, so use sec x = 1/cos x = (1 + u)⁻¹ with u = −x²/2 + x⁴/24.
2. (1 + u)⁻¹ = 1 − u + u² − ... = 1 + x²/2 − x⁴/24 + x⁴/4 + (higher powers).
3. sec x = 1 + x²/2 + 5x⁴/24 + ...
4. Only even powers appear, as expected for an even function.

### Common mistakes

- Forgetting the factorials.
- Simplifying derivatives badly and making an algebra slip; substitute x = 0 early when you can.

## D6 Standard series and combining them

*Refs: AQA D6 · Edexcel CP4.6, FP1 2.2 · OCR 4.08b · MEI Ps4, Ps5. Level: A-level only.*

### What you need to know

```latex
e^x = \sum_{r=0}^{\infty}\frac{x^r}{r!}\ \text{(all }x)
```

```latex
\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \dots + (-1)^{r+1}\frac{x^r}{r} + \dots\quad (-1 < x \le 1)
```

```latex
\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \dots,\qquad \cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \dots\ \text{(all }x)
```

```latex
(1+x)^n = 1 + nx + \frac{n(n-1)}{2!}x^2 + \dots\quad (|x| < 1\text{ unless }n\text{ is a positive integer})
```

- Get new series by substituting (e^{2x} from eˣ), multiplying, adding, differentiating or integrating term by term.
- A substitution changes the range of validity: ln(1 + 2x) is valid for −½ < x ≤ ½.

### Explained

These series are in the formula book, but know their ranges of validity. Substituting is usually faster than differentiating. For a product, multiply the series and keep only terms up to the power you need. For a composite like ln(cos x), substitute the series for cos x − 1 into ln(1 + u).

### Worked example

Find the series for e^{2x} ln(1 + x) up to x³.

1. e^{2x} = 1 + 2x + 2x² + ...; ln(1 + x) = x − x²/2 + x³/3 − ...
2. Multiply, keeping terms up to x³: x − x²/2 + x³/3 + 2x² − x³ + 2x³.
3. = x + (3/2)x² + (4/3)x³.

Find the series for ln[(1 + x)/(1 − x)] up to x⁵, and state where it is valid.

1. ln(1 + x) − ln(1 − x).
2. ln(1 − x) = −x − x²/2 − x³/3 − x⁴/4 − x⁵/5 − ...
3. Difference: 2x + 2x³/3 + 2x⁵/5.
4. Valid for −1 < x < 1 (both series need to be valid).

Find ln(cos x) up to x⁴.

1. cos x = 1 + u, where u = −x²/2 + x⁴/24.
2. ln(1 + u) = u − u²/2 + ... = −x²/2 + x⁴/24 − (x⁴/4)/2 = −x²/2 + x⁴/24 − x⁴/8.
3. = −x²/2 − x⁴/12.

Use the series for cos x to estimate cos 0.2 to 6 decimal places.

1. 1 − 0.04/2 + 0.0016/24 = 1 − 0.02 + 0.0000667 = 0.980067.

### Common mistakes

- Forgetting to change the range of validity after a substitution.
- Multiplying series and keeping terms beyond the required power, or missing cross terms.

## D7 Limits using series or l'Hôpital's rule

*Refs: AQA D7 · Edexcel FP1 2.4. Level: A-level only (Edexcel FP1 option).*

### What you need to know

- If f(a) = g(a) = 0, then (when the limit on the right exists)

```latex
\lim_{x\to a}\frac{f(x)}{g(x)} = \lim_{x\to a}\frac{f'(x)}{g'(x)}
```

- Repeat if the result is still 0/0. The rule also works for ∞/∞.
- Or replace each function by its Maclaurin series and cancel the lowest power of x.

### Explained

Both methods deal with "0/0" forms. The series method shows the reason: near 0, sin x behaves like x, so sin x/x → 1.

Before using the rule, check that it really is 0/0. Differentiate the top and bottom separately; this is not the quotient rule.

### Worked example

Find lim_{x→0} (eˣ − 1 − x)/x².

1. Series: eˣ − 1 − x = x²/2 + x³/6 + ...
2. Divide by x²: ½ + x/6 + ... → ½.

Find lim_{x→0} (x − sin x)/x³.

1. x − sin x = x³/6 − x⁵/120 + ...
2. Limit 1/6.

Find lim_{x→0} (1 − cos 3x)/(x sin x) using l'Hôpital's rule.

1. 0/0. Differentiate: 3 sin 3x/(sin x + x cos x), still 0/0.
2. Again: 9 cos 3x/(2 cos x − x sin x) → 9/2.

Find lim_{x→2} (x² − 4)/(x − 2).

1. 0/0. Differentiate: 2x/1 → 4.

### Common mistakes

- Using the quotient rule.
- Applying the rule when the form is not 0/0 or ∞/∞.

## Check questions

1. Use differentiation to find the Maclaurin series of tan x up to the term in x⁵. [6 marks]
2. Find the Maclaurin series of √(1 + 2x) up to x³ and state the range of x for which it is valid. [4 marks]
3. Find the series for eˣ cos x up to the term in x⁴. [4 marks]
4. Show that the series for cos²x begins 1 − x² + x⁴/3. [4 marks]
5. Find lim_{x→0} [ln(1 + x) − x]/x². [3 marks]
6. Find lim_{x→0} sin 3x/tan 2x. [3 marks]
7. Find lim_{x→0} (eˣ − e^{−x} − 2x)/(x − sin x). [4 marks]
8. f(x) = ln(1 + eˣ). Show that f(0) = ln 2, f′(0) = ½ and f″(0) = ¼, and write down the series up to x². [5 marks]

## Mark scheme

1. f′ = sec²x = 1 + tan²x (1). Write t = tan x: f″ = 2tt′, f‴ = 2t′² + 2tt″ ... values at 0: f′ = 1, f″ = 0, f‴ = 2, f⁗ = 0, f⁽⁵⁾ = 16 (3). x + x³/3 + 2x⁵/15 (2).
2. 1 + x − x²/2 + x³/2 (3). Valid for −½ < x < ½ (1).
3. (1 + x + x²/2 + x³/6 + x⁴/24)(1 − x²/2 + x⁴/24) (1). Terms: 1 + x + 0x² − x³/3 − x⁴/6 (3).
4. cos²x = ½(1 + cos 2x) (1). cos 2x = 1 − 2x² + (2/3)x⁴ (2). ½(2 − 2x² + 2x⁴/3) = 1 − x² + x⁴/3 (1).
5. ln(1 + x) − x = −x²/2 + x³/3 ... (2). Limit −½ (1).
6. sin 3x ≈ 3x, tan 2x ≈ 2x, or l'Hôpital: 3 cos 3x/(2 sec²2x) (2). Limit 3/2 (1).
7. Top: 2x + x³/3 + ... − 2x = x³/3 + ... (1). Bottom: x³/6 + ... (1). Ratio → (1/3)/(1/6) (1) = 2 (1).
8. f(0) = ln 2 (1). f′ = eˣ/(1 + eˣ), f′(0) = ½ (1). f″ = eˣ/(1 + eˣ)², f″(0) = ¼ (2). ln 2 + x/2 + x²/8 (1).
