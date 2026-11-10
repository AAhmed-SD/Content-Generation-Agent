---
level: A-level
subject: Computer Science
topic: "Fixed point and floating point binary, normalisation, errors, range and precision, overflow and underflow"
as_content: "AQA: fixed point only is also AS (7516 3.5.4.4). Floating point, rounding errors, absolute and relative error, range and precision, normalisation, underflow and overflow are A-level only. OCR: normalised floating point (1.4.1(g)) is also AS; floating point arithmetic (1.4.1(h)) is A-level only."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.5.4.4", "4.5.4.5", "4.5.4.6", "4.5.4.7", "4.5.4.8", "4.5.4.9"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.4.1(g)", "1.4.1(h)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C2.3: Representation of numbers as bit patterns"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Fixed point and floating point

This file covers binary fractions in fixed point, floating point with a two's complement mantissa and exponent, converting both ways, normalisation, why both forms can be inaccurate (rounding and truncation), absolute and relative errors, range and precision, overflow and underflow, and adding and subtracting floating point numbers. It assumes two's complement from [16-number-systems-binary-and-twos-complement.md](16-number-systems-binary-and-twos-complement.md).

New at A-level: GCSE stops at integers.

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Fixed point | Yes | Not named | Not named |
| Floating point | Two's complement mantissa and exponent (no IEEE) | Positive and negative normalised floating point | Nature and uses; convert real ↔ floating point |
| Errors | Rounding; absolute and relative error | Not named | Truncation and rounding and their effect on accuracy |
| Arithmetic | Not required | Add and subtract floating point numbers | Not named |
| Comparisons | Fixed vs floating: range, precision, speed | Not named | Integer vs floating point: advantages and disadvantages |
| Overflow and underflow | Yes | Not named here | Causes of overflow and underflow |

## 4.5.4.4 Numbers with a fractional part

*Refs: AQA 4.5.4.4 · OCR 1.4.1(g) · Eduqas C2.3: Representation of numbers as bit patterns.*

### Fixed point: what you need to know

- The binary point is in a fixed position, agreed in advance (for example 4 bits before it and 4 after). Place values after the point are ½, ¼, ⅛, 1/16 and so on.
- With a two's complement fixed point number, the leftmost place value is negative, as usual.

| −8 | 4 | 2 | 1 | . | 0.5 | 0.25 | 0.125 | 0.0625 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

### Fixed point: worked example

0110.1010 (unsigned or positive) = 4 + 2 + 0.5 + 0.125 = 6.625.

1010.1100 (two's complement) = −8 + 2 + 0.5 + 0.25 = −5.25.

Convert 5.375 to fixed point with 4 integer and 4 fraction bits: 5 = 0101; 0.375 = 0.25 + 0.125 = .0110. So 0101.0110.

Convert 2.7 with the same format: 0010; 0.7 → 0.5 (1, remainder 0.2) → 0.25 too big (0) → 0.125 (1, remainder 0.075) → 0.0625 (1, remainder 0.0125). So 0010.1011 = 2.6875, the closest that fits (by truncation).

### Floating point: what you need to know

- A floating point number has a mantissa (the significant digits) and an exponent (the power of 2 that says where the binary point really goes): value = mantissa × 2^exponent.
- In the AQA (and usual OCR) format both are two's complement. The mantissa has its binary point just after the first (sign) bit: 0.1011000 or 1.0110000.
- Decode: work out the exponent (in two's complement); move the binary point in the mantissa that many places right (positive exponent) or left (negative exponent); then read the fixed point number.
- Encode: write the number in binary, then move the point so the mantissa is normalised (below), counting how many places it moved: that is the exponent.

### Floating point: worked example

8-bit mantissa, 4-bit exponent.

Decode 0.1011000 | 0011. Exponent 3: move the point 3 right: 0101.1000 = 5.5.

Decode 1.0110000 | 0010. Exponent 2: move the point 2 right: 101.10000. In two's complement: −4 + 1 + 0.5 = −2.5.

Decode 0.1100000 | 1110. Exponent −2: move the point 2 left: 0.0011000 = 0.125 + 0.0625 = 0.1875.

Encode 13.25: 1101.01 = 0.110101 × 2⁴. Mantissa 0.1101010, exponent 0100.

Encode −13.25: start from the positive mantissa 0.1101010 and take its two's complement: 1.0010110. Exponent 0100. Check: (−1 + 0.125 + 0.03125 + 0.015625) × 16 = −0.828125 × 16 = −13.25 ✓.

Encode 0.375: 0.011 = 0.11 × 2⁻¹. Mantissa 0.1100000, exponent 1111 (−1).

## 4.5.4.8 Normalisation of floating point form

*Refs: AQA 4.5.4.8 · OCR 1.4.1(g).*

### What you need to know

- A normalised floating point number has its mantissa start with 0.1 if positive or 1.0 if negative: the first two bits differ.
- Why normalise:
  - it gives the greatest possible precision for the number of mantissa bits (no wasted leading 0s or 1s);
  - every number has only one representation, which makes comparison and testing for equality easier;
  - it makes the best use of the range.
- To normalise: shift the mantissa left until the first two bits differ, and decrease the exponent by the number of places shifted (or, if the mantissa has overflowed, shift right and increase the exponent).

### Worked example

Normalise 0.0010110 | 0101. Shift the mantissa left 2 places: 0.1011000. Exponent 5 − 2 = 3: 0011. Value check: before 0.0010110 × 2⁵ = 101.10 = 5.5; after 0.1011 × 2³ = 101.1 = 5.5 ✓.

Normalise 1.1101000 | 0011. Leading 1s are redundant, like leading 0s in a positive number. Shift left 2: 1.0100000. Exponent 3 − 2 = 1: 0001. Check: before (−1 + 0.5 + 0.25 + 0.0625) × 8 = −1.5; after (−1 + 0.25) × 2 = −1.5 ✓.

## 4.5.4.5 Rounding errors

*Refs: AQA 4.5.4.5 · Eduqas C2.3: Representation of numbers as bit patterns.*

### What you need to know

- Both fixed and floating point can be inaccurate because only a limited number of bits is available.
- A decimal value can only be stored exactly if it can be written as a binary fraction (sum of halves, quarters, eighths and so on) within the bits available. Some values can never be stored exactly, whatever the number of bits, for example 0.1₁₀ (in binary it is 0.000110011001100… recurring), just as 1/3 recurs in decimal.
- Truncation: drop the bits that do not fit (always towards zero). Rounding: choose the nearest value that fits. Rounding gives a smaller maximum error; truncation is simpler. Errors grow when many calculations are chained (for example adding 0.1 a million times).

### Worked example

Store 0.1 in a fixed point format with 8 fraction bits by truncation: 0.00011001 = 1/16 + 1/32 + 1/256 = 0.09765625.

```python
print(0.1 + 0.2)            # 0.30000000000000004
print(sum([0.1] * 10))      # 0.9999999999999999
```

## 4.5.4.6 Absolute and relative errors

*Refs: AQA 4.5.4.6.*

### What you need to know

- Absolute error = |true value − stored value|.
- Relative error = absolute error ÷ |true value| (often given as a percentage).
- For very large numbers, an absolute error that looks big may be a tiny relative error; for very small numbers, a tiny absolute error may be a huge relative error. For numbers close to 1, absolute and relative errors are about the same.

### Worked example

0.1 stored as 0.09765625. Absolute error = 0.00234375. Relative error = 0.00234375 ÷ 0.1 = 0.0234 = 2.34%.

A distance of 1,000,000 m stored as 999,936 m: absolute error 64 m, relative error 0.0064%. A length of 0.002 m stored as 0.0015 m: absolute error only 0.0005 m but relative error 25%.

## 4.5.4.7 Range and precision

*Refs: AQA 4.5.4.7 · Eduqas C2.3: Representation of numbers as bit patterns.*

### What you need to know

- Range: the gap between the largest and smallest (most negative) values that can be stored. Precision: how close together the values that can be stored are (how many significant bits).
- For a fixed total number of bits in floating point: more mantissa bits gives more precision; more exponent bits gives more range.

| | Fixed point | Floating point |
| --- | --- | --- |
| Range | Small for the number of bits | Much larger for the same bits |
| Precision | Absolute precision is the same everywhere (the smallest fraction bit) | Relative precision is roughly constant; absolute precision is fine for small numbers and coarse for large ones |
| Speed | Faster: processed like integers | Slower: needs normalising and aligning; needs a floating point unit |
| Simplicity | Simpler hardware | More complex |
| Good for | Money (pence), sensors with a known range, small devices | Science and graphics with very large and very small values |

- Eduqas: integers versus floating point. Integers are exact, quick to process and use less storage, but have no fractions and limited range. Floating point stores fractions and very large or small values, but is usually approximate and slower.

## 4.5.4.9 Underflow and overflow

*Refs: AQA 4.5.4.9 · Eduqas C2.3: Representation of numbers as bit patterns.*

### What you need to know

- Overflow: the result of a calculation is too large (in magnitude) to be represented with the bits available. In floating point, the exponent would need to be bigger than its maximum. Example: multiplying two very large numbers.
- Underflow: the result is too small in magnitude (too close to zero) to be represented: the exponent would need to be more negative than its minimum. The result is usually set to 0, losing information. Example: dividing a very small number by a very large one.
- In integer arithmetic, "overflow" also describes a carry out of the available bits (file 16); Eduqas also uses "underflow" for a result below the minimum value (for example below −128 in 8-bit two's complement).

### Worked example

With a 4-bit two's complement exponent, the range of exponents is −8 to +7. The largest positive normalised value with an 8-bit mantissa is 0.1111111 × 2⁷ = 1111111.0 = 127. Doubling 100 would overflow. The smallest positive normalised value is 0.1000000 × 2⁻⁸ = 2⁻⁹ ≈ 0.00195; halving that underflows.

## Floating point addition and subtraction

*Refs: OCR 1.4.1(h).*

### What you need to know

1. Make the exponents the same: shift the mantissa of the number with the smaller exponent right, increasing its exponent by one for each place, until the exponents match.
2. Add (or, for subtraction, add the two's complement of the second mantissa).
3. Normalise the result (and watch for a mantissa overflow, which needs a shift right and the exponent increased).

### Worked example

A = 0.1100000 | 0011 (6). B = 0.1010000 | 0001 (1.25). 8-bit mantissa, 4-bit exponent.

A + B: B's exponent is 2 less, so shift B's mantissa right 2: 0.0010100 | 0011.

```
   0.1100000
 + 0.0010100
 -----------
   0.1110100   exponent 0011 → 111.01 = 7.25 ✓ (already normalised)
```

A − B: negate B's aligned mantissa: 0.0010100 → 1.1101100.

```
   0.1100000
 + 1.1101100
 -----------
  10.1001100   discard the carry → 0.1001100 | 0011 → 100.11 = 4.75 ✓
```

Shifting right to align can push 1s off the end, losing precision: adding a very small number to a very large one may leave the large one unchanged.

## Common mistakes

- Forgetting that the exponent is in two's complement: 1110 is −2, not 14.
- Moving the binary point the wrong way: a positive exponent moves it right.
- Negating a floating point number by changing only the first bit. Take the two's complement of the whole mantissa.
- Normalising a negative mantissa to start 1.1. It must start 1.0.
- Changing the exponent the wrong way when normalising: shifting the mantissa left makes it bigger, so the exponent must go down.

## Check questions

1. Convert 0101.1100 (4.4 fixed point, two's complement) and 1101.0100 to decimal. [2 marks]
2. Represent 3.625 in 8-bit fixed point with 4 fraction bits. [1 mark]
3. Floating point: 8-bit mantissa, 4-bit exponent, both two's complement. Convert to decimal: (a) 0.1101000 | 0010; (b) 1.0100000 | 0011; (c) 0.1000000 | 1101. [3 marks]
4. Represent 22.5 as a normalised floating point number in this format. [2 marks]
5. Represent −0.75 as a normalised floating point number in this format. [2 marks]
6. Normalise 0.0001101 | 0110 and 1.1110010 | 0010. [4 marks]
7. Give two reasons why floating point numbers are normalised. [2 marks]
8. Explain why 0.2 cannot be stored exactly in binary floating point. [2 marks]
9. 0.6 is stored as 0.59375. Calculate the absolute and relative errors. [2 marks]
10. A designer has 16 bits for a floating point number. Explain the effect of increasing the number of exponent bits. [2 marks]
11. Explain the difference between overflow and underflow in floating point. [2 marks]
12. Compare fixed point and floating point for storing amounts of money in a banking system. [3 marks]
13. (OCR) Add 0.1010000 | 0010 and 0.1100000 | 0001, giving a normalised result. [3 marks]

## Mark scheme

1. 4 + 1 + 0.5 + 0.25 = 5.75 (1); −8 + 4 + 1 + 0.25 = −2.75 (1).
2. 0011.1010 (1).
3. (a) 011.01000 = 3.25 (1). (b) 1010.0000 = −6 (1). (c) exponent −3: 0.0001000 = 0.0625 (1).
4. 22.5 = 10110.1 = 0.101101 × 2⁵ (1); mantissa 0.1011010, exponent 0101 (1).
5. 0.75 = 0.11; −0.75 = 1.01 (two's complement of 0.1100000 is 1.0100000) (1); mantissa 1.0100000 with exponent 0000 (1). (Check: −1 + 0.25 = −0.75.)
6. 0.0001101 | 0110: shift left 3 → 0.1101000 (1); exponent 6 − 3 = 3 → 0011 (1). 1.1110010 | 0010: shift left 3 → 1.0010000 (1); exponent 2 − 3 = −1 → 1111 (1).
7. Any two: maximum precision for the bits available (1); unique representation of each number/easier comparison (1); best use of range (1).
8. 0.2 is a recurring fraction in binary (0.001100110011…) (1); a finite number of bits can only hold an approximation (1).
9. Absolute 0.00625 (1); relative 0.00625 ÷ 0.6 ≈ 0.0104 or 1.04% (1).
10. Larger range of values (1); fewer mantissa bits, so less precision (1).
11. Overflow: number too large in magnitude/exponent above the maximum (1). Underflow: number too close to zero/exponent below the minimum, often stored as 0 (1).
12. Fixed point (or integer pence) gives exact values for pence with no rounding errors (1); faster/simpler (1); floating point's larger range is not needed and its approximations could cause errors in accounts (1).
13. Align: second number shifted right 1 → 0.0110000 | 0010 (1); sum 0.1010000 + 0.0110000 = 1.0000000, which is a mantissa overflow (it reads as negative) (1); shift right and increase exponent: 0.1000000 | 0011 = 4 (2.5 + 1.5 = 4 ✓) (1).
