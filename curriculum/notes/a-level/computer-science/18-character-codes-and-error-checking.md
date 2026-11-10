---
level: A-level
subject: Computer Science
topic: "Information coding: character codes (ASCII, Unicode) and error checking and correction"
as_content: "All of this file is also AS for AQA (7516 3.5.5) and OCR (H046 1.4.1(h) character sets)."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.5.5.1", "4.5.5.2", "4.5.5.3"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.4.1(j)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C2.3: Storage of characters"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Character codes and error checking

This file covers the difference between a digit stored as a character and as a number, ASCII and Unicode, and error checking and correction with parity bits, majority voting, checksums and check digits.

Builds on [GCSE: Representing text, images and sound](../../gcse/computer-science/10-representing-text-images-and-sound.md) (ASCII and Unicode basics) and the check digit and validation ideas in [GCSE: Robust programs and testing](../../gcse/computer-science/06-robust-programs-and-testing.md).

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Character sets | Character form of a digit; ASCII and Unicode, why Unicode was introduced | ASCII and Unicode used to represent text | How characters are stored; standardised character sets |
| Error checking | Parity, majority voting, checksums, check digits | Not in this section (checksums appear with networks, file 29) | Validation and verification (C1.3, C2.5: file 30); online integrity (C2.8: file 36) |

## 4.5.5.1 Character form of a decimal digit

*Refs: AQA 4.5.5.1 · Eduqas C2.3: Storage of characters.*

### What you need to know

- A digit can be stored as a character (its character code) or as a number (pure binary). They are different bit patterns.
- The character "7" has ASCII code 55 (0011 0111). The number 7 is 0000 0111. In ASCII, the code of a digit character is the digit + 48 (0011 0000), so the lower nibble of a digit's code equals its value.
- You cannot do arithmetic directly on character codes: "7" + "2" as characters is not 9. Text read from a keyboard or file must be converted (string to integer) before calculating.

### Worked example

"2" + "5" as character codes: 50 + 53 = 103, which is the code for "g". To get 7, convert: (50 − 48) + (53 − 48) = 7.

## 4.5.5.2 ASCII and Unicode

*Refs: AQA 4.5.5.2 · OCR 1.4.1(j) · Eduqas C2.3: Storage of characters.*

### What you need to know

- A character set is a defined list of characters a computer recognises, each with a unique binary code. Sender and receiver must use the same set.
- ASCII (American Standard Code for Information Interchange) uses 7 bits: 2⁷ = 128 characters: English upper and lower case letters, digits, punctuation and control codes (such as carriage return). Extended ASCII uses 8 bits for 256 characters, but the extra 128 vary between versions.
- Codes are in order: "A" = 65, "B" = 66, …; "a" = 97 (so lower case = upper case + 32); "0" = 48.
- Unicode was introduced because ASCII cannot represent the characters of most of the world's languages (Arabic, Chinese, Hindi), mathematical symbols or emoji, and different extended ASCII versions clashed. Unicode aims to give a unique code (code point) to every character in every writing system: over a million possible code points.
- Unicode encodings: UTF-8 uses 1 to 4 bytes per character and is backwards compatible with ASCII (the first 128 code points are the same and take one byte); UTF-16 uses 2 or 4 bytes; UTF-32 uses 4 bytes always.
- Trade-off: Unicode text may take more storage and transmission time than ASCII, but it allows global, multilingual text in one standard.
- Eduqas: storage of characters means each character is held as its code in binary; the number of bits per character sets how many characters can be represented.

### Worked example

"Hi!" in ASCII: H = 72 = 100 1000, i = 105 = 110 1001, ! = 33 = 010 0001. In 8-bit bytes: 01001000 01101001 00100001: 3 bytes. In UTF-32 it would take 12 bytes; in UTF-8, 3 bytes.

"س" (Arabic letter seen) is code point U+0633. It cannot be written in ASCII; in UTF-8 it takes 2 bytes.

```python
print(ord("A"), chr(97), ord("7") - 48)       # 65 a 7
print("س".encode("utf-8"), len("س".encode("utf-8")))   # b'\xd8\xb3' 2
```

### Common mistakes

- Saying ASCII uses 8 bits. Standard ASCII is 7 bits; 8 bits is extended ASCII.
- Saying Unicode always uses 16 bits. The number of bytes depends on the encoding.

## 4.5.5.3 Error checking and correction

*Refs: AQA 4.5.5.3.*

### What you need to know

Data can be corrupted during transmission (interference, noise) or storage. Error detection finds that an error has happened; error correction also fixes it.

- Parity bit: an extra bit added to each group of bits (often a byte) so the total number of 1s is even (even parity) or odd (odd parity), as agreed. The receiver counts the 1s; if the parity is wrong, an error is detected and the data is re-sent. Detects any single-bit error (any odd number of flipped bits), but not an even number of flipped bits, and cannot say which bit is wrong.
- Majority voting: each bit is sent several times (an odd number, usually three). The receiver takes the value that appears most often in each group. Can detect and correct single-bit errors in a group, but triples the data sent.
- Checksum: the sender calculates a value from the block of data (for example the sum of the bytes MOD 256) and sends it with the data. The receiver recalculates it; if it differs, an error has occurred and the block is re-sent. Detects many errors in a block; cannot correct; some errors (for example two bytes swapped, with a simple sum) are not detected.
- Check digit: an extra digit calculated from the other digits of a code number (ISBN, barcodes, bank account numbers) and added to the end. Recalculating it detects mistakes in data entry, especially single-digit errors and swapped (transposed) digits when the digits are weighted. Used for typed or scanned data rather than transmission.

### Worked example

Even parity: data 1011 001 (7 bits) has four 1s, so the parity bit is 0: sent as 0101 1001 with parity first, or 1011 0010 with parity last, depending on the agreed position. If the receiver gets 0101 1101, it counts five 1s: odd, so error detected.

Majority voting: sending 1 0 1 as 111 000 111. Received 101 000 111: first group has two 1s and one 0, so it is taken as 1. Data correctly recovered as 1 0 1.

Checksum (sum MOD 256): bytes 200, 100, 50 → 350 MOD 256 = 94. Send 200, 100, 50, 94. If 100 arrives as 101, the receiver gets 351 MOD 256 = 95 ≠ 94: error.

Check digit using the ISBN-13 rule: multiply digits alternately by 1 and 3, add, and choose the check digit that makes the total a multiple of 10. For 978-0-306-40615-?:

| Digit | 9 | 7 | 8 | 0 | 3 | 0 | 6 | 4 | 0 | 6 | 1 | 5 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Weight | 1 | 3 | 1 | 3 | 1 | 3 | 1 | 3 | 1 | 3 | 1 | 3 |
| Product | 9 | 21 | 8 | 0 | 3 | 0 | 6 | 12 | 0 | 18 | 1 | 15 |

Sum = 93. Next multiple of 10 is 100, so the check digit is 7.

```python
def even_parity_bit(bits):
    return bits.count("1") % 2           # 1 if odd number of 1s, to make it even

def majority(triple):
    return "1" if triple.count("1") >= 2 else "0"

def isbn13_check(first12):
    total = sum(int(d) * (1 if i % 2 == 0 else 3) for i, d in enumerate(first12))
    return (10 - total % 10) % 10

print(even_parity_bit("1011001"), majority("101"), isbn13_check("978030640615"))  # 0 1 7
```

### Common mistakes

- Saying a parity bit corrects errors. It only detects (and only an odd number of flipped bits).
- Saying a check digit checks that the data is correct. It checks the number was entered or read correctly, not that it is the right number for that person.
- Confusing a checksum (calculated over a block, for transmission) with a check digit (one extra digit in a code number).

## Check questions

1. The character "4" and the integer 4 are stored in 8 bits. Give both bit patterns. [2 marks]
2. Explain why Unicode was introduced. [2 marks]
3. Give one advantage of UTF-8 over UTF-32. [1 mark]
4. How many characters can 7-bit ASCII represent? [1 mark]
5. Add an odd parity bit (as the most significant bit) to 110 1100. [1 mark]
6. Explain why parity checking cannot detect two flipped bits in the same byte. [2 marks]
7. Using majority voting with three copies, decode 110 011 000 101. [2 marks]
8. A checksum is the sum of the bytes MOD 256. Calculate the checksum of 150, 180, 90. [1 mark]
9. Calculate the ISBN-13 check digit for 978-1-86197-271. [3 marks]
10. Compare majority voting with parity bits. [3 marks]

## Mark scheme

1. Character "4": 0011 0100 (1); integer 4: 0000 0100 (1).
2. ASCII could only represent 128/256 characters, mostly English (1); Unicode can represent characters from all the world's languages and symbols with one standard (1).
3. Uses less storage for English/ASCII text (1 byte per character) or is backwards compatible with ASCII (1).
4. 128 (1).
5. 110 1100 has four 1s, so odd parity bit is 1: 1110 1100 (1).
6. Two flips leave the count of 1s with the same parity (odd or even) (1); so the parity check still passes (1).
7. 110 → 1, 011 → 1, 000 → 0, 101 → 1 (1 for any three correct); data 1101 (1).
8. 420 MOD 256 = 164 (1).
9. Products: 9, 21, 8, 3, 8, 18, 1, 27, 7, 6, 7, 3 (1); sum 118 (1); check digit 2 (1).
10. Majority voting can correct errors as well as detect them (1); parity only detects (1); majority voting sends three times the data, parity adds only one bit per byte (1).
