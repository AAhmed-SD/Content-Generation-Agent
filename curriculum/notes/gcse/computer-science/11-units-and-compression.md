---
level: GCSE
subject: Computer Science
topic: "Units of data and compression"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.3.3", "3.3.8"]
  - board: OCR
    code: "J277"
    spec_refs: ["1.2.3", "1.2.5"]
  - board: Edexcel
    code: "1CP2"
    spec_refs: ["2.3.1", "2.3.2"]
  - board: Eduqas
    code: "C500QS"
    spec_refs: ["4: Storage requirements", "4: Compression"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-gcse/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Units of data and compression

This file covers the units of data (bit, nibble, byte and the larger multiples), the difference between decimal and binary prefixes, calculating file sizes and storage requirements, why data is compressed, lossy and lossless compression, run-length encoding and Huffman coding (AQA), and compression ratios (Eduqas).

## Overview

The boards disagree about one thing here: whether a kilobyte is 1000 or 1024 bytes. Learn your board's rule, and always show your working so a method mark is safe either way.

### Board differences

| | AQA 8525 | OCR J277 | Edexcel 1CP2 | Eduqas C500QS |
| --- | --- | --- | --- | --- |
| Multiples | Decimal: 1 kB = 1000 B up to TB | Decimal: 1 KB = 1000 B up to PB; 1024 also accepted | Binary: kibibyte (1024 B), mebibyte, gibibyte, tebibyte | Base 2: kilobyte = 1024 B up to petabyte |
| Nibble | Not named | Yes | Yes | Yes |
| Symbols | b for bit, B for byte | | | |
| Compression | Why compress; Huffman trees; RLE | Need for compression; lossy and lossless; no algorithms | Need; lossless and lossy | Principles; lossy and lossless; compression ratios |

AQA 3.3.3 and 3.3.8: Paper 2. OCR 1.2.3 and 1.2.5: J277/01. Edexcel 2.3: Paper 1. Eduqas section 4: Component 1. AQA says binary prefixes (kibi, mebi) are not needed. Edexcel uses the binary names (kibibyte, KiB).

## Units of data

*Refs: AQA 3.3.3 · OCR 1.2.3 · Edexcel 2.3.1 · Eduqas 4: Storage requirements.*

### What you need to know

- Bit: a single binary digit, 0 or 1; the smallest unit. Symbol b.
- Nibble: 4 bits (one hex digit).
- Byte: 8 bits. Symbol B.
- Decimal multiples (AQA, OCR): kilobyte (kB) = 1000 bytes; megabyte = 1000 kB; gigabyte = 1000 MB; terabyte = 1000 GB; petabyte (OCR) = 1000 TB.
- Binary multiples (Edexcel, Eduqas): kibibyte (KiB) = 1024 bytes; mebibyte (MiB) = 1024 KiB; gibibyte (GiB) = 1024 MiB; tebibyte (TiB) = 1024 GiB. Eduqas uses the names kilobyte, megabyte ... petabyte for these 1024 multiples.
- Data must be in binary because the computer's circuits have two states.
- Calculate storage needed for a set of files, and how many files fit on a device.

### Explained

| Unit | Decimal (AQA, OCR) | Binary (Edexcel, Eduqas) |
| --- | --- | --- |
| 1 kilo- / kibi- | 1000 B | 1024 B |
| 1 mega- / mebi- | 1000² B = 1 000 000 B | 1024² B = 1 048 576 B |
| 1 giga- / gibi- | 1000³ B | 1024³ B |
| 1 tera- / tebi- | 1000⁴ B | 1024⁴ B |
| 1 peta- (OCR, Eduqas) | 1000⁵ B | 1024⁵ B |

Going to a bigger unit: divide. Going to a smaller unit: multiply.

Text file size (OCR) = bits per character × number of characters.

### Worked example

How many 4 MB photos fit on a 64 GB memory card?

1. Decimal: 64 GB = 64 000 MB. 64 000 ÷ 4 = 16 000 photos.
2. Binary (Edexcel/Eduqas, treating them as GiB and MiB): 64 × 1024 = 65 536 MiB. 65 536 ÷ 4 = 16 384 photos.

A folder holds 20 songs of 3.5 MB, 150 photos of 2.4 MB and a 1.2 GB film. Will it fit on an 8 GB USB stick (decimal units)?

1. Songs: 20 × 3.5 = 70 MB. Photos: 150 × 2.4 = 360 MB. Film: 1200 MB.
2. Total 1630 MB = 1.63 GB. Yes, it fits.

(Edexcel) Write an expression for the size in KiB of a 1000-character text file using 7-bit ASCII stored in bytes.

1. 1000 × 8 bits = 8000 bits (each character takes a whole byte).
2. 8000 ÷ 8 ÷ 1024 KiB, about 0.98 KiB.

### Common mistakes

- Mixing b (bit) and B (byte).
- Multiplying when converting to a bigger unit.
- Using 1024 on AQA where answers expect 1000 (or the other way on Edexcel). Use your board's value.

## Why compress data

*Refs: AQA 3.3.8 · OCR 1.2.5 · Edexcel 2.3.2 · Eduqas 4: Compression.*

### What you need to know

- Compression reduces file size.
- Benefits: less storage space; faster transmission over networks and the internet (quicker downloads and uploads, smoother streaming); less bandwidth used; meets size limits (such as email attachments).

## Lossy and lossless compression

*Refs: OCR 1.2.5 · Edexcel 2.3.2 · Eduqas 4: Compression · AQA 3.3.8.*

### What you need to know

- Lossless compression: the file is made smaller without losing any data. The original can be rebuilt exactly. Used for text, program code, spreadsheets and anything where every bit matters. Typical formats: ZIP, PNG, FLAC.
- Lossy compression: permanently removes data that people are unlikely to notice (fine colour differences, sounds outside the range of hearing or masked by louder sounds). Much smaller files, but the original cannot be rebuilt and quality drops if compressed too much or repeatedly. Used for photos, music and video. Typical formats: JPEG, MP3, MP4.

| | Lossless | Lossy |
| --- | --- | --- |
| Data lost? | No | Yes, permanently |
| Size reduction | Smaller | Much smaller |
| Original recoverable? | Yes | No |
| Use for | Text, code, documents, some images | Photos, audio, video for streaming |

### Common mistakes

- Choosing lossy for a text document or a program. Losing even one character can change the meaning or break the code.
- Saying lossy "lowers the resolution". It usually removes detail in other ways; say "removes data permanently".

## Run-length encoding (AQA)

*Refs: AQA 3.3.8.*

### What you need to know

- RLE is lossless. It replaces a run of the same value with a pair: how many times it repeats (frequency) and the value (data).
- Effective when data has long runs (simple images, a bitmap row of the same colour). It can make data with few runs bigger.

### Worked example

Encode the bitmap row 1111000000110000.

1. Runs: four 1s, six 0s, two 1s, four 0s.
2. Pairs: 4 1 6 0 2 1 4 0.

Encode the text AAAABBBCCD: 4A 3B 2C 1D. Decode 3X 1Y 5Z: XXXYZZZZZ.

```python
def rle(s):
    out = []
    count = 1
    for i in range(1, len(s) + 1):
        if i < len(s) and s[i] == s[i - 1]:
            count = count + 1
        else:
            out.append(str(count) + s[i - 1])
            count = 1
    return " ".join(out)

print(rle("1111000000110000"))   # 41 60 21 40
```

### Common mistakes

- Writing the data before the frequency when the question asks for frequency then data.
- Encoding ABCD as 1A 1B 1C 1D and calling it compressed: it doubled in size.

## Huffman coding (AQA)

*Refs: AQA 3.3.8.*

### What you need to know

- Huffman coding is lossless. It gives the most frequent characters the shortest binary codes and rare characters longer codes, instead of a fixed number of bits for each.
- A Huffman tree is a binary tree with characters at the leaves. Read a character's code by following the branches from the root (left 0, right 1, or as labelled).
- AQA: interpret a given tree, calculate the bits needed for Huffman-coded data, the bits needed in ASCII, and the bits saved. (Building a tree is not required, but helps understanding.)
- No code is the start of another code, so a bit string can be decoded without separators.

### Worked example

Text: MISSISSIPPI. Frequencies: I 4, S 4, P 2, M 1. A Huffman tree for it:

```
        (root)
        /    \
      0/      \1
      S       (*)
             /   \
           0/     \1
           I      (*)
                 /   \
               0/     \1
               P       M
```

Codes: S = 0, I = 10, P = 110, M = 111.

1. Huffman bits: S 4 × 1 + I 4 × 2 + P 2 × 3 + M 1 × 3 = 4 + 8 + 6 + 3 = 21 bits.
2. ASCII (7 bits per character): 11 × 7 = 77 bits. (With 8 bits per character: 88.)
3. Saved: 77 − 21 = 56 bits.

Decode 1100111 with this tree: 110 = P, 0 = S, 111 = M. Answer PSM.

### Common mistakes

- Counting characters instead of total bits: multiply each code length by how often the character appears.
- Forgetting spaces are characters too, if the text has them.

## Compression ratios (Eduqas)

*Refs: Eduqas 4: Compression.*

### What you need to know

- Compression ratio = original size : compressed size (often written as a single number, original ÷ compressed).
- Percentage saving = (original − compressed) ÷ original × 100.

### Worked example

A 12 MB image compresses to 3 MB.

1. Ratio 12 : 3 = 4 : 1 (it is 4 times smaller).
2. Saving (12 − 3) ÷ 12 × 100 = 75%.

A 50 MB video is compressed with a ratio of 10 : 1. The compressed size is 50 ÷ 10 = 5 MB.

## Check questions

1. How many bits are there in 3 nibbles? [1 mark]
2. Convert 2.5 GB into MB using your board's units. [1 mark]
3. A 32 GB phone has 6.4 GB free. How many 8 MB photos can it still store (use 1000)? [2 marks]
4. Give two reasons for compressing a file before emailing it. [2 marks]
5. Explain why lossless compression should be used for a spreadsheet. [2 marks]
6. Explain why lossy compression is often used for music streaming. [2 marks]
7. (AQA) Show the RLE for 000011111110001. [2 marks]
8. (AQA) In a Huffman tree the codes are A = 0, B = 10, C = 110, D = 111. The text is AABACADA. Calculate the Huffman bits, the 7-bit ASCII bits and the bits saved. [3 marks]
9. (Eduqas) A 900 KB file compresses to 300 KB. Give the compression ratio and the percentage saving. [2 marks]
10. (Edexcel) Write an expression for the number of bytes in 3 MiB. [1 mark]

## Mark scheme

1. 12 bits (1).
2. AQA/OCR: 2500 MB; Edexcel/Eduqas: 2560 MiB/MB (1).
3. 6400 MB ÷ 8 MB (1) = 800 photos (1).
4. Any two: smaller file uploads/downloads faster (1); may exceed attachment size limit otherwise (1); takes less storage space for the recipient (1); uses less bandwidth (1).
5. No data can be lost (1); every value/character must be exactly the same, or the data would be wrong (1).
6. Files are much smaller, so they stream/download faster and use less data (1); the lost data is hard to hear, so quality is acceptable (1).
7. Runs: four 0s, seven 1s, three 0s, one 1 (1). 4 0 7 1 3 0 1 1 (1).
8. A appears 5 times, B 1, C 1, D 1: 5 × 1 + 1 × 2 + 1 × 3 + 1 × 3 = 13 bits (1). ASCII 8 × 7 = 56 bits (1). Saved 43 bits (1).
9. 3 : 1 (1); 66.7% (1).
10. 3 × 1024 × 1024 (1) (= 3 145 728).
