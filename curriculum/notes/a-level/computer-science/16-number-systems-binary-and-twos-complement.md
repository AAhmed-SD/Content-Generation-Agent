---
level: A-level
subject: Computer Science
topic: "Number systems, number bases, units, unsigned and signed binary, binary arithmetic, shifts and masks"
as_content: "AQA 4.5.1 to 4.5.4.3 are also AS (7516 3.5.1 to 3.5.4.3). OCR 1.4.1(b) to (f) are also AS; bitwise manipulation and masks (1.4.1(i)) are A-level only."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.5.1.1", "4.5.1.2", "4.5.1.3", "4.5.1.4", "4.5.1.5", "4.5.1.6", "4.5.1.7", "4.5.2.1", "4.5.3.1", "4.5.3.2", "4.5.4.1", "4.5.4.2", "4.5.4.3"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.4.1(b)", "1.4.1(c)", "1.4.1(d)", "1.4.1(e)", "1.4.1(f)", "1.4.1(i)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C2.3: Representation of data as bit patterns", "C2.3: Representation of numbers as bit patterns", "C1.2: Logical operations"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Number systems, binary and two's complement

This file covers the sets of numbers (natural, integer, rational, irrational, real, ordinal), counting and measuring, number bases and conversion, bits, bytes, words and binary and decimal prefixes, unsigned binary, binary addition and multiplication, two's complement and sign and magnitude, subtraction, logical and arithmetic shifts, and bitwise masks. Fractions and floating point are in [17-fixed-and-floating-point.md](17-fixed-and-floating-point.md).

Builds on [GCSE: Number systems and binary arithmetic](../../gcse/computer-science/09-number-systems-and-binary-arithmetic.md) (conversions, addition, overflow, shifts, two's complement for some boards) and [GCSE: Units and compression](../../gcse/computer-science/11-units-and-compression.md). At A-level, numbers can be any number of bits, multiplication and binary prefixes are new, and every board uses negative numbers.

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Sets of numbers | ℕ, ℤ, ℚ, irrational, ℝ, ordinal; counting vs measuring | Not named | Not named |
| Units | Bit, byte; binary prefixes Ki, Mi, Gi, Ti and decimal k, M, G, T | Not named here | Bit, byte, word |
| Negative numbers | Two's complement only | Sign and magnitude and two's complement | Two's complement and sign and magnitude |
| Arithmetic | Add and multiply unsigned; subtract with two's complement | Add and subtract | Binary arithmetic |
| Shifts and masks | Not named here (shifts in assembly, file 24) | Bitwise manipulation and masks: shifts, AND, OR, XOR | Logical and arithmetic shifts; masking and clearing registers (C1.2) |

## 4.5.1 Number systems

*Refs: AQA 4.5.1.1, 4.5.1.2, 4.5.1.3, 4.5.1.4, 4.5.1.5, 4.5.1.6, 4.5.1.7.*

### What you need to know

- Natural numbers ℕ = {0, 1, 2, 3, …} (AQA includes 0).
- Integers ℤ = {…, −3, −2, −1, 0, 1, 2, 3, …}: whole numbers, positive, negative and zero.
- Rational numbers ℚ: numbers that can be written as a fraction p/q of integers (q ≠ 0). Every integer is rational (7 = 7/1). Recurring decimals like 0.333… = 1/3 are rational.
- Irrational numbers: cannot be written as a fraction, for example √2, π. Their decimals never end or repeat.
- Real numbers ℝ: all "possible real-world quantities": the rationals and the irrationals together. ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ.
- Ordinal numbers describe position in an ordered set: 1st, 2nd, 3rd. In S = {'a', 'b', 'c', 'd'}, 'a' is the 1st object.
- Natural numbers are used for counting (how many); real numbers for measurement (how much: length, mass, time).

### Common mistakes

- Saying 0.5 is irrational because it is not whole. It is 1/2, so rational.
- Saying computers can store irrational numbers exactly. They can only store approximations.

## 4.5.2.1 Number bases

*Refs: AQA 4.5.2.1 · OCR 1.4.1(b), 1.4.1(e), 1.4.1(f) · Eduqas C2.3: Representation of data as bit patterns.*

### What you need to know

- Decimal (base 10), binary (base 2), hexadecimal (base 16, digits 0–9 and A–F). Write the base as a subscript: 67₁₀, 10011011₂, AE₁₆.
- In base b, place values are powers of b: …, b³, b², b¹, b⁰.
- Hexadecimal is shorthand for binary: one hex digit is exactly 4 bits (a nibble), so conversion is quick; hex is shorter, easier for people to read, write and remember, and less error-prone. Used for memory addresses, colour codes, MAC addresses and machine code listings.

### Worked example

Convert 1101 0110₂ to decimal and hex: 128 + 64 + 16 + 4 + 2 = 214₁₀. Nibbles 1101 = D, 0110 = 6, so D6₁₆.

Convert 3A7₁₆ to decimal: 3 × 256 + 10 × 16 + 7 = 768 + 160 + 7 = 935₁₀. To binary: 0011 1010 0111₂.

Convert 300₁₀ to binary by repeated division by 2 (read remainders bottom up): 300 → 150 r0 → 75 r0 → 37 r1 → 18 r1 → 9 r0 → 4 r1 → 2 r0 → 1 r0 → 0 r1, so 100101100₂. Hex: 1 0010 1100 → 12C₁₆.

## 4.5.3 Units of information

*Refs: AQA 4.5.3.1, 4.5.3.2 · Eduqas C2.3: Representation of data as bit patterns.*

### What you need to know

- The bit (binary digit, 0 or 1) is the fundamental unit of information. A byte is 8 bits.
- n bits give 2ⁿ different values: 3 bits give 2³ = 8 patterns (000 to 111).
- A word is the number of bits a processor handles as one unit, for example 32 or 64 bits (Eduqas); word size is set by the processor's design (register and data bus width).
- Binary prefixes (powers of 2): kibi Ki = 2¹⁰ (1,024); mebi Mi = 2²⁰; gibi Gi = 2³⁰; tebi Ti = 2⁴⁰.
- Decimal prefixes (powers of 10): kilo k = 10³; mega M = 10⁶; giga G = 10⁹; tera T = 10¹².
- Historically "kilobyte" was often used to mean 1,024 bytes; strictly 1 kB = 1,000 B and 1 KiB = 1,024 B.

### Worked example

A file is 3 MiB. How many bytes? 3 × 2²⁰ = 3,145,728 B. In MB: 3.145728 MB. A "1 TB" drive holds 10¹² B = 10¹² ÷ 2⁴⁰ ≈ 0.909 TiB, which is why a computer may report it as "931 GB" (really GiB).

### Common mistakes

- Using 1,000 for kibi or 1,024 for kilo.
- Writing a lower-case b for bytes: b is bits, B is bytes.

## 4.5.4.1 Unsigned binary

*Refs: AQA 4.5.4.1 · OCR 1.4.1(b).*

### What you need to know

- Unsigned binary represents only zero and positive numbers. Signed binary can represent negative numbers too.
- With n bits, unsigned binary ranges from 0 to 2ⁿ − 1. 8 bits: 0 to 255; 16 bits: 0 to 65,535.

## 4.5.4.2 Unsigned binary arithmetic

*Refs: AQA 4.5.4.2 · OCR 1.4.1(d) · Eduqas C2.3: Representation of numbers as bit patterns.*

### What you need to know

- Addition rules: 0 + 0 = 0, 0 + 1 = 1, 1 + 1 = 0 carry 1, 1 + 1 + 1 = 1 carry 1. If the result needs more bits than are available, overflow occurs.
- Multiplication uses long multiplication: for each 1 in the multiplier, write the multiplicand shifted left by that bit's position, then add the rows. (Multiplying by 2ⁿ is a left shift by n.)

### Worked example

Add 0110 1101 (109) and 0101 1011 (91):

```
  carries  1111 1111
           0110 1101
         + 0101 1011
         -----------
           1100 1000   = 200 ✓
```

Multiply 1101 (13) by 101 (5):

```
        1101
      ×  101
      ------
        1101      (1 × 1101)
       0000       (0 × 1101, shifted 1)
      1101        (1 × 1101, shifted 2)
      ------
     1000001      = 65 ✓
```

## 4.5.4.3 Signed binary: two's complement and sign and magnitude

*Refs: AQA 4.5.4.3 · OCR 1.4.1(c), 1.4.1(d) · Eduqas C2.3: Representation of numbers as bit patterns.*

### What you need to know

- Two's complement: the most significant bit (MSB) has a negative place value. In 8 bits the place values are −128, 64, 32, 16, 8, 4, 2, 1. A leading 1 means the number is negative.
- Range with n bits: −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1. 8 bits: −128 to +127. 4 bits: −8 to +7.
- To write −x: write +x in binary, flip every bit, add 1. (Shortcut: copy bits from the right up to and including the first 1, then flip the rest.)
- To read a negative pattern: add the place values with −2ⁿ⁻¹ for the MSB, or flip and add 1 and put a minus sign in front.
- Subtraction A − B = A + (−B): convert B to two's complement and add, ignoring any carry out of the MSB. Overflow has happened if two positives give a negative or two negatives give a positive.
- Sign and magnitude (OCR, Eduqas; not examined by AQA): the MSB is a sign bit (0 positive, 1 negative) and the other bits are the size. 8 bits: −127 to +127. Drawbacks: two zeros (+0 and −0), and ordinary binary addition does not work on it, so arithmetic circuits are more complex. Two's complement has one zero and the same adder works for addition and subtraction, which is why it is used.

### Worked example

Represent −57 in 8-bit two's complement. 57 = 0011 1001. Flip: 1100 0110. Add 1: 1100 0111. Check: −128 + 64 + 4 + 2 + 1 = −57 ✓.

Convert 1011 0100 (two's complement) to decimal: −128 + 32 + 16 + 4 = −76.

Calculate 45 − 73 in 8 bits. 45 = 0010 1101. 73 = 0100 1001, so −73 = 1011 0111.

```
   0010 1101   (45)
 + 1011 0111   (−73)
 -----------
   1110 0100   = −128 + 64 + 32 + 4 = −28 ✓
```

Overflow example: 100 + 50 in 8-bit two's complement: 0110 0100 + 0011 0010 = 1001 0110, which reads as −106. Two positives gave a negative: overflow (150 > 127).

Sign and magnitude: −57 = 1011 1001 (sign bit 1, then 0111001 for 57).

## Bitwise operations, shifts and masks

*Refs: OCR 1.4.1(i) · Eduqas C1.2: Logical operations, C2.3: Representation of numbers as bit patterns.*

### What you need to know

- Logical shift: move all bits left or right; fill empty places with 0; bits shifted out are lost. Left by n multiplies an unsigned number by 2ⁿ; right by n divides by 2ⁿ (rounding down).
- Arithmetic shift (for signed numbers): a right arithmetic shift copies the sign bit into the empty places, so the sign is kept and the number is divided by 2ⁿ (rounding towards −∞). A left arithmetic shift fills with 0 (as logical), and overflow has happened if the sign bit changes.
- (Circular shift or rotate: bits shifted out of one end come back in at the other; used in cryptography and in some assembly languages.)
- A mask is a bit pattern combined with data using a bitwise operator to pick out, set, clear or flip particular bits:
  - AND with a mask clears bits where the mask has 0 and keeps bits where it has 1 (used to test or extract bits, or clear a register: AND with 0000 0000);
  - OR with a mask sets bits where the mask has 1, leaving others unchanged;
  - XOR with a mask flips bits where the mask has 1 (used in simple encryption: XOR again with the same key restores the data; XOR a register with itself clears it).

### Worked example

Data 1011 0110.

- Test whether bit 2 (value 4) is set: AND 0000 0100 → 0000 0100, non-zero, so yes.
- Keep only the lower nibble: AND 0000 1111 → 0000 0110.
- Set the top bit: OR 1000 0000 → 1011 0110 (already set; no change).
- Flip all bits: XOR 1111 1111 → 0100 1001.
- Arithmetic right shift by 2 of 1011 0110 (−74): 1110 1101 = −19 (−74 ÷ 4 = −18.5, rounded down to −19). A logical right shift would give 0010 1101 = 45, which is wrong for a signed value.

```python
x = 0b10110110
print(bin(x & 0b00001111))   # 0b110   keep lower nibble
print(bin(x | 0b00000001))   # 0b10110111 set bit 0
print(bin(x ^ 0xFF))         # 0b1001001 flip all
print(bool(x & 0b100))       # True: bit 2 set
print(-74 >> 2)              # -19: Python's >> is arithmetic for negative ints
```

### Common mistakes

- Forgetting the "add 1" when forming two's complement (flip only gives one's complement).
- Keeping the carry out of the MSB in a two's complement sum. Discard it; check overflow by signs instead.
- Saying a mask "deletes" bits with OR. OR sets bits; AND clears them.
- Using a logical right shift on a negative two's complement number.

## Check questions

1. Classify each as natural, integer (not natural), rational (not integer) or irrational: −4, 7, 2/3, √5, 0. [3 marks]
2. Explain the difference between counting and measuring, and which set of numbers each uses. [2 marks]
3. Convert 2F9₁₆ to binary and to decimal. [2 marks]
4. How many bytes are in 5 KiB? How many in 5 kB? [2 marks]
5. State the range of unsigned and of two's complement integers in 12 bits. [2 marks]
6. Multiply 1011₂ by 110₂, showing your working, and check in decimal. [3 marks]
7. Represent −100 in 8-bit two's complement and in 8-bit sign and magnitude. [2 marks]
8. Using 8-bit two's complement, calculate 23 − 61. Show your working. [3 marks]
9. Explain why two's complement is preferred to sign and magnitude. [2 marks]
10. Show that adding 0111 0000 and 0101 0000 in 8-bit two's complement causes overflow. [2 marks]
11. (OCR, Eduqas) A status register holds 0110 1011. Give the mask and operator to: (a) clear the lowest 4 bits; (b) set bit 7; (c) flip bits 0 and 1. [3 marks]
12. (OCR, Eduqas) Perform an arithmetic right shift of 2 on 1111 0000 and give the decimal values before and after. [2 marks]

## Mark scheme

1. Natural: 7, 0 (1). Integer: −4; rational: 2/3 (1). Irrational: √5 (1).
2. Counting: how many discrete items, uses natural numbers (1). Measuring: a continuous quantity, uses real numbers (1).
3. 0010 1111 1001 (1); 2 × 256 + 15 × 16 + 9 = 761 (1).
4. 5 × 1024 = 5,120 B (1); 5,000 B (1).
5. Unsigned 0 to 4,095 (1); two's complement −2,048 to 2,047 (1).
6. Rows 0000 (×0), 10110 (×1 shifted 1), 101100 (×1 shifted 2) (1); sum 1000010 (1); 11 × 6 = 66 ✓ (1).
7. Two's complement 1001 1100 (1); sign and magnitude 1110 0100 (1).
8. 23 = 0001 0111; 61 = 0011 1101 so −61 = 1100 0011 (1); sum 1101 1010 (1); = −38 (1).
9. Only one representation of zero (1); addition and subtraction use the same simple adder circuit/normal binary addition works (1).
10. 112 + 80 = 192 > 127 (1); result 1100 0000 has MSB 1, so reads as negative (−64) from two positives: overflow (1).
11. (a) AND 1111 0000 (1); (b) OR 1000 0000 (1); (c) XOR 0000 0011 (1).
12. Result 1111 1100 (1); −16 before, −4 after (1).
