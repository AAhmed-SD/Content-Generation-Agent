---
level: GCSE
subject: Computer Science
topic: "Number systems and binary arithmetic"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.3.1", "3.3.2", "3.3.4"]
  - board: OCR
    code: "J277"
    spec_refs: ["1.2.4"]
  - board: Edexcel
    code: "1CP2"
    spec_refs: ["2.1.1", "2.1.2", "2.1.3", "2.1.4", "2.1.5", "2.1.6"]
  - board: Eduqas
    code: "C500QS"
    spec_refs: ["4: Representation of numbers"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-gcse/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Number systems and binary arithmetic

This file covers why computers use binary, denary, binary and hexadecimal and converting between them, the number of values n bits can hold, binary addition and overflow, negative numbers in two's complement and sign and magnitude, binary subtraction and underflow, and logical and arithmetic binary shifts.

## Overview

Every board covers unsigned 8-bit binary, hexadecimal, binary addition with overflow, and shifts. Negative numbers are only on Edexcel and Eduqas. No calculator is allowed in these papers, so practise the methods by hand.

### Board differences

| Content | AQA 8525 | OCR J277 | Edexcel 1CP2 | Eduqas C500QS |
| --- | --- | --- | --- | --- |
| Range | 0 to 255; binary, denary, hex all ways | 0 to 255; 00 to FF; MSB and LSB; 1 to 8 bit numbers | 0 to 255 and −128 to +127; hex ↔ binary | Denary, binary, hex all ways |
| Addition | Up to three 8-bit numbers; at most three 1s in a column; no answers over 8 bits | Two 8-bit numbers; explain overflow | Two positive patterns; overflow | Addition and subtraction; overflow and underflow |
| Negative numbers | No | No | Two's complement | Two's complement and sign and magnitude |
| Shifts | Logical only | Left and right, effect on the number | Logical and arithmetic | Arithmetic shifts |
| Number of states | | | 2ⁿ for n bits (2.1.1) | |

AQA 3.3.1 to 3.3.4 are on Paper 2; OCR 1.2.4 on J277/01; Edexcel 2.1 on Paper 1; Eduqas section 4 on Component 1.

## Why binary, and why hexadecimal

*Refs: AQA 3.3.1 · OCR 1.2.3, 1.2.4 · Edexcel 2.1.1, 2.1.6 · Eduqas 4: Representation of numbers.*

### What you need to know

- Computers store and process all data and program instructions in binary (base 2), because their circuits are made of switches (transistors) with two states: on (1) and off (0).
- A bit pattern has no meaning on its own: the same pattern can be a number, a character, part of an image, a sound sample or an instruction, depending on how it is used.
- n bits can represent 2ⁿ different values (states): 1 bit 2, 4 bits 16, 8 bits 256 (Edexcel 2.1.1).
- Denary (decimal) is base 10. Hexadecimal is base 16, using digits 0 to 9 and A to F (A = 10, B = 11, C = 12, D = 13, E = 14, F = 15).
- Why hexadecimal is used: it is shorter than binary (one hex digit = 4 bits, a nibble), easier for people to read, remember and type, and less error-prone; it converts to and from binary very easily. Uses: colour codes (#FF8800), MAC addresses, memory addresses, error codes.
- Hex is for people only: the computer still stores binary.
- Most significant bit (MSB): the leftmost bit, with the largest place value. Least significant bit (LSB): the rightmost bit (OCR).

### Common mistakes

- Saying hex "takes less memory". It does not: the computer stores the same binary.
- Saying 8 bits can store numbers up to 256. The largest is 255; 256 is the number of different values.

## Converting between bases

*Refs: AQA 3.3.2 · OCR 1.2.4 · Edexcel 2.1.3, 2.1.6 · Eduqas 4: Representation of numbers.*

### What you need to know

8-bit place values:

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
| --- | --- | --- | --- | --- | --- | --- | --- |

- Binary → denary: add the place values where there is a 1.
- Denary → binary: from the left, take each place value that fits and subtract it (or repeatedly divide by 2 and read the remainders upwards).
- Binary ↔ hex: split the binary into nibbles (groups of 4 from the right) and convert each.
- Hex → denary: first digit × 16 + second digit. Denary → hex: divide by 16; the quotient is the first digit, the remainder the second (or go via binary).
- Largest 8-bit values: 255 = 11111111 = FF.
- Leading zeros do not change the value: 11010 = 00011010.

### Worked example

Convert 173 to binary and to hexadecimal.

1. 173 − 128 = 45 → 1 in the 128 column.
2. 64 does not fit → 0. 45 − 32 = 13 → 1. 16 does not fit → 0. 13 − 8 = 5 → 1. 5 − 4 = 1 → 1. 2 does not fit → 0. 1 − 1 = 0 → 1.
3. Binary 10101101.
4. Nibbles 1010 and 1101 → 10 and 13 → A and D. Hex AD.
5. Check: A × 16 + D = 160 + 13 = 173.

Convert 3F to denary and binary.

1. 3 × 16 + 15 = 63.
2. 3 → 0011, F → 1111. Binary 00111111.

Convert 10011 to denary: 16 + 2 + 1 = 19.

```python
print(bin(173), hex(173), int("10101101", 2), int("AD", 16))
# 0b10101101 0xad 173 173
```

### Common mistakes

- Splitting into nibbles from the left when the number has fewer than 8 bits. Always group from the right.
- Writing hex 10 to 15 as two digits ("1 3") instead of a letter (D).

## Binary addition and overflow

*Refs: AQA 3.3.4 · OCR 1.2.4 · Edexcel 2.1.4, 2.1.5 · Eduqas 4: Representation of numbers.*

### What you need to know

- Rules: 0 + 0 = 0; 0 + 1 = 1; 1 + 1 = 0 carry 1; 1 + 1 + 1 = 1 carry 1. AQA's three-number additions never have more than three 1s in one column (counting carries), so this last rule is the largest case you meet.
- Overflow: the result needs more bits than are available (for 8 bits, more than 255 unsigned). The extra carry bit is lost, so the stored answer is wrong.
- Overflow can cause errors, wrong results or crashes; the processor sets an overflow flag so it can be detected.

### Worked example

Add 01101101 and 00111011.

```
  0 1 1 0 1 1 0 1     (109)
+ 0 0 1 1 1 0 1 1     ( 59)
  ---------------
  1 0 1 0 1 0 0 0     (168)
```

Column by column from the right: 1+1 = 0 c1; 0+1+1 = 0 c1; 1+0+1 = 0 c1; 1+1+1 = 1 c1; 0+1+1 = 0 c1; 1+1+1 = 1 c1; 1+0+1 = 0 c1; 0+0+1 = 1. Result 10101000 = 168. Check: 109 + 59 = 168.

Add 11001000 and 01100100 (200 + 100).

1. The true sum is 300 = 100101100, which needs 9 bits.
2. In 8 bits only 00101100 = 44 is kept. The 9th bit is lost: overflow.

(AQA) Add three numbers: 00010110 + 00101011 + 00001101.

1. 22 + 43 + 13 = 78.
2. Working column by column (with carries of 1 or, where three 1s meet with a carry, a total of 3 = 1 carry 1): result 01001110.
3. Check: 64 + 8 + 4 + 2 = 78.

### Common mistakes

- Forgetting carries that cross several columns.
- Writing the 9th bit into an 8-bit answer box. Say overflow has occurred instead.

## Negative numbers: two's complement and sign and magnitude

*Refs: Edexcel 2.1.2, 2.1.3 · Eduqas 4: Representation of numbers.*

### What you need to know

- Unsigned integers: all bits are place values; 8 bits hold 0 to 255.
- Two's complement (Edexcel and Eduqas): the MSB has a negative place value. In 8 bits it is −128, so the range is −128 to +127.

| −128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
| --- | --- | --- | --- | --- | --- | --- | --- |

- To write a negative number: write the positive version in binary, invert every bit (flip 0s and 1s), then add 1. (Shortcut: from the right, copy bits up to and including the first 1, then flip the rest.)
- A two's complement number starting with 1 is negative; starting with 0 is positive.
- Sign and magnitude (Eduqas): the MSB is a sign bit (0 positive, 1 negative); the other 7 bits are the size. Range −127 to +127, with two zeros (00000000 and 10000000). Ordinary binary addition does not work with it, which is why computers use two's complement.

### Worked example

Write −45 in 8-bit two's complement.

1. +45 = 00101101.
2. Invert: 11010010.
3. Add 1: 11010011.
4. Check: −128 + 64 + 16 + 2 + 1 = −45.

Convert 10110110 (two's complement) to denary: −128 + 32 + 16 + 4 + 2 = −74.

(Eduqas) Write −45 in sign and magnitude: sign 1, magnitude 0101101 → 10101101.

### Common mistakes

- Forgetting to add 1 after inverting.
- Reading a two's complement number as unsigned (10110110 is 182 unsigned but −74 in two's complement). Check which the question says.

## Binary subtraction and underflow (Eduqas)

*Refs: Eduqas 4: Representation of numbers · Edexcel 2.1.2.*

### What you need to know

- To work out A − B, add A and the two's complement of B. Ignore any carry out of the MSB.
- Overflow in two's complement: adding two positives gives a negative-looking result, or adding two negatives gives a positive-looking one.
- Underflow: the result is smaller than the smallest value the format can store (for example below −128 in 8-bit two's complement, or below 0 for an unsigned number).

### Worked example

Work out 50 − 23 in 8 bits.

1. 50 = 00110010.
2. 23 = 00010111; invert 11101000; add 1: 11101001 (−23).
3. 00110010 + 11101001 = 1 00011011.
4. Discard the carry out: 00011011 = 27. Correct.

Work out −100 + (−50) in 8-bit two's complement.

1. −100 = 10011100. −50 = 11001110.
2. Sum: 1 01101010; discard carry: 01101010 = +106.
3. Two negatives gave a positive: the true answer, −150, is below −128, so the result has gone out of range (underflow).

## Binary shifts

*Refs: AQA 3.3.4 · OCR 1.2.4 · Edexcel 2.1.4 · Eduqas 4: Representation of numbers.*

### What you need to know

- Logical shift: move every bit left or right by n places. Bits moved out are lost; empty places are filled with 0.
  - Left shift by n multiplies by 2ⁿ.
  - Right shift by n divides by 2ⁿ (integer division: bits shifted out of the right are lost, so the result rounds down).
  - If a 1 is shifted out of the left, the result is wrong (overflow).
- Arithmetic shift (Edexcel, Eduqas): used for signed (two's complement) numbers. A right arithmetic shift copies the sign bit into the empty places on the left, keeping the sign. A left arithmetic shift fills with 0 like a logical shift (Edexcel treats left arithmetic and logical shifts the same; the sign bit should not change, or overflow has occurred).

### Worked example

00010110 (22), logical shift left 2: 01011000 = 88 = 22 × 4.

00010110 (22), logical shift right 1: 00001011 = 11 = 22 ÷ 2.

00010111 (23), logical shift right 2: 00000101 = 5. 23 ÷ 4 = 5.75, so precision is lost: the bits 11 fell off the right.

11000001, logical shift left 1: 10000010. The leading 1 is lost, so the answer is not 2 × 193 = 386: overflow.

(Edexcel, Eduqas) 11010000 (−48 in two's complement), arithmetic shift right 2: 11110100 = −128 + 64 + 32 + 16 + 4 = −12 = −48 ÷ 4. A logical right shift would give 00110100 = 52, which is wrong.

```python
x = 22
print(x << 2, x >> 1)        # 88 11   (Python shifts on integers)
print(-48 >> 2)              # -12     (Python's >> is arithmetic for negatives)
```

### Common mistakes

- Filling with 1s in a logical shift.
- Saying a right shift always divides exactly. Bits lost from the right mean the result is rounded down.

## Check questions

1. Convert 11100101 to denary. [1 mark]
2. Convert 94 to 8-bit binary and to hexadecimal. [2 marks]
3. Convert B7 to binary and to denary. [2 marks]
4. Give two reasons why hexadecimal is used by programmers. [2 marks]
5. Add 10110110 and 01011011. Show your working and state whether overflow occurs. [3 marks]
6. Perform a logical left shift of 3 on 00001101 and state the effect on the denary value. [2 marks]
7. (Edexcel, Eduqas) Write −90 in 8-bit two's complement. [2 marks]
8. (Edexcel, Eduqas) Give the range of numbers that can be stored in 8-bit two's complement. [1 mark]
9. (Eduqas) Work out 37 − 52 using 8-bit two's complement and give the answer in denary. [3 marks]
10. (Edexcel) How many different values can be represented with 6 bits? [1 mark]

## Mark scheme

1. 128 + 64 + 32 + 4 + 1 = 229 (1).
2. 01011110 (1); 5E (1).
3. 10110111 (1); 183 (1).
4. Any two: shorter/easier to read and remember than binary (1); fewer errors when reading or typing (1); easy to convert to and from binary (1).
5. Working with carries (1); result 1 00010001, so 8-bit result 00010001 (1); overflow occurs because 182 + 91 = 273 > 255 (1).
6. 01101000 (1); value multiplied by 8 (13 → 104) (1).
7. 90 = 01011010; invert 10100101 (1); add 1: 10100110 (1).
8. −128 to +127 (1).
9. 37 = 00100101; −52 = 11001100 (1). Sum 11110001 (1). = −128 + 64 + 32 + 16 + 1 = −15 (1).
10. 2⁶ = 64 (1).
