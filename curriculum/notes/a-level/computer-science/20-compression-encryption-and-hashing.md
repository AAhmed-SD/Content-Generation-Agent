---
level: A-level
subject: Computer Science
topic: "Compression (lossy, lossless, RLE, dictionary), encryption (Caesar, Vernam, symmetric, asymmetric) and hashing"
as_content: "AQA 4.5.6.9 and 4.5.6.10 are also AS (7516 3.5.6.7, 3.5.6.8). OCR: lossy and lossless compression are also AS; RLE, dictionary coding, encryption and hashing (1.3.1) are A-level only."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.5.6.9", "4.5.6.10"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.3.1(a)", "1.3.1(b)", "1.3.1(c)", "1.3.1(d)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C1.3: Compression", "C1.2: Logical operations", "C2.8: Cryptography"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Compression, encryption and hashing

This file covers why files are compressed, lossy and lossless compression, run length encoding and dictionary-based methods, measuring compression, encryption terms, the Caesar and Vernam ciphers, perfect versus computational security, symmetric and asymmetric encryption, and the uses of hashing. Digital certificates and signatures are in [28-the-internet-and-internet-security.md](28-the-internet-and-internet-security.md).

Builds on [GCSE: Units and compression](../../gcse/computer-science/11-units-and-compression.md) (lossy and lossless, RLE, Huffman for AQA) and the encryption basics in [GCSE: Cyber security](../../gcse/computer-science/17-cyber-security.md).

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Compression | Why; lossy vs lossless; RLE and dictionary-based | Lossy vs lossless; RLE and dictionary coding | Compression algorithms; compare by ratio, compression and decompression time, saving % |
| Ciphers | Caesar and Vernam; perfect vs computational security | Symmetric and asymmetric encryption | Need for cryptography; follow cryptographic algorithms; compare strengths; XOR in encryption (C1.2) |
| Hashing | Not here (hash tables in file 06) | Different uses of hashing | Hashing for files (file 36) |
| Public key | In 4.9.3.2 (file 28) | Asymmetric here | Compare methods |

## 4.5.6.9 Data compression

*Refs: AQA 4.5.6.9 · OCR 1.3.1(a), 1.3.1(b) · Eduqas C1.3: Compression.*

### What you need to know

- Why compress: smaller files take less storage, transfer faster over networks (less bandwidth and lower cost), stream with less buffering, and fit more in an email attachment or on a device. Images and sound are often compressed because raw files are very large; text and program files can be compressed too.
- Lossless compression: the original file can be rebuilt exactly. Needed for text, program code, spreadsheets and anything where every bit matters. Usually smaller savings. Formats: ZIP, PNG, FLAC, GIF.
- Lossy compression: permanently removes data that is judged least noticeable (detail the eye or ear is less sensitive to, such as sounds outside hearing range or tiny colour changes). Much bigger savings, but quality is reduced and the original cannot be recovered; repeated saving loses more. Formats: JPEG, MP3, MP4/H.264. Not suitable for text or code.
- Run length encoding (RLE, lossless): replace a run of repeated values with one copy of the value and a count. Works well on data with long runs (simple graphics, icons, fax images), but can make data with few runs larger.
- Dictionary-based methods (lossless; LZ-family, used in ZIP and GIF): build a dictionary of repeated sequences (words or byte patterns) and replace each occurrence with a short reference (index) into the dictionary. The dictionary is stored with the file or rebuilt during decompression. Works well on text with repeated words.
- Eduqas measures of efficiency:
  - compression ratio = original size ÷ compressed size (for example 4:1);
  - saving percentage = (original − compressed) ÷ original × 100;
  - compression time and decompression time: a method with a better ratio may be slower; for streaming, fast decompression matters most.

### Worked example

RLE on a row of pixels: `WWWWWWBBBWWWWWWWWRR` → `6W3B8W2R`: 19 characters become 8. On `WBWBWB` it gives `1W1B1W1B1W1B`: longer than the original.

RLE in code:

```python
def rle_encode(s):
    out = []
    i = 0
    while i < len(s):
        run = 1
        while i + run < len(s) and s[i + run] == s[i]:
            run += 1
        out.append(f"{run}{s[i]}")
        i += run
    return "".join(out)

print(rle_encode("WWWWWWBBBWWWWWWWWRR"))   # 6W3B8W2R
```

Dictionary method on "THE CAT AND THE HAT AND THE BAT":

| Index | Entry |
| --- | --- |
| 1 | THE |
| 2 | CAT |
| 3 | AND |
| 4 | HAT |
| 5 | BAT |

Encoded: 1 2 3 1 4 3 1 5 (spaces implied). Eight words become eight small indices; each repeated word is stored only once in the dictionary. The longer the text and the more repetition, the bigger the saving.

Measuring: a 12 MB file compresses to 3 MB. Ratio 12 ÷ 3 = 4:1. Saving (12 − 3) ÷ 12 = 75%.

### Common mistakes

- Saying lossy compression "removes unnecessary data". It removes real data that is judged less noticeable; it cannot be recovered.
- Recommending lossy compression for text, code or medical images where every detail matters.

## 4.5.6.10 Encryption

*Refs: AQA 4.5.6.10 · OCR 1.3.1(c) · Eduqas C2.8: Cryptography, C1.2: Logical operations.*

### What you need to know

- Encryption transforms plaintext (the readable message) into ciphertext (unreadable without the key) using a cipher (the algorithm) and a key, so that only intended recipients can read it. Decryption reverses it.
- Cryptography is needed to protect the confidentiality of data in transmission (online banking, messaging) and in storage (stolen laptops, cloud), and to support authentication and integrity.
- Caesar cipher: shift every letter a fixed number of places along the alphabet (the key). Easily cracked because there are only 25 possible keys (brute force) and letter frequencies are preserved (frequency analysis: the most common ciphertext letter probably stands for E).
- Vernam cipher (one-time pad): combine each bit (or character) of the plaintext with the matching bit of a key using XOR. The key must be:
  - truly random,
  - at least as long as the message,
  - used once only, and kept secret.
  Decryption XORs the ciphertext with the same key.
- Why Vernam has perfect security: because the key is chosen uniformly at random and used once, the ciphertext is also uniformly random. Every possible plaintext of that length is equally likely, so the ciphertext gives an attacker no information at all, whatever computing power they have. It is the only cipher mathematically proved to be unbreakable.
- Computational security: every other cipher can in theory be broken given enough ciphertext and time; it is considered secure because breaking it would take an impractical amount of time with current computers (for example trying 2²⁵⁶ keys). These ciphers are practical because keys are short and reusable. The Vernam cipher's drawback is key distribution: a key as long as all the data must be shared securely in advance and never reused.
- Symmetric encryption (OCR): the same key encrypts and decrypts (AES, Caesar, Vernam). Fast, but the key must be shared securely, and each pair of users needs its own key.
- Asymmetric (public key) encryption (OCR, and AQA 4.9.3.2): each user has a public key (shared with anyone) and a private key (kept secret), mathematically linked. Data encrypted with the recipient's public key can only be decrypted with their private key. No secret key needs to be exchanged, but it is much slower. In practice (for example in TLS), asymmetric encryption is used to exchange a symmetric session key, which then encrypts the rest of the data.
- Eduqas: compare methods by strength: key length (number of possible keys), whether frequency patterns survive, resistance to brute force, and key management.

### Worked example

Caesar with key 3: plaintext ATTACK → DWWDFN (A→D, T→W, C→F, K→N). Decrypt by shifting back 3.

Vernam with bits. Plaintext letter "H" = 0100 1000; key 1100 1011.

```
plaintext   0100 1000
key       ⊕ 1100 1011
ciphertext  1000 0011
key       ⊕ 1100 1011
plaintext   0100 1000   ← XOR with the same key restores it
```

Vernam with letters (A = 0 … Z = 25, add mod 26): plaintext HI = 7, 8; key XM = 23, 12. Ciphertext (7 + 23) mod 26 = 4 → E; (8 + 12) mod 26 = 20 → U. "EU". Decrypt by subtracting the key mod 26.

```python
import secrets

def vernam(data: bytes, key: bytes) -> bytes:
    assert len(key) >= len(data)
    return bytes(d ^ k for d, k in zip(data, key))

msg = b"MEET AT NOON"
key = secrets.token_bytes(len(msg))      # truly random, used once
cipher = vernam(msg, key)
print(vernam(cipher, key))               # b'MEET AT NOON'
```

### Common mistakes

- Saying Vernam is unbreakable "because the key is long". The key must also be truly random and never reused; reusing it breaks the security.
- Saying asymmetric encryption encrypts with the private key for confidentiality. For confidentiality you encrypt with the recipient's public key.
- Mixing up encryption (reversible with the key) and hashing (one-way).

## Hashing

*Refs: OCR 1.3.1(d).*

### What you need to know

- A hash function turns data of any length into a fixed-length value (hash, digest). A cryptographic hash is one-way (you cannot get the input back from the hash), deterministic (same input, same hash), and a tiny change in the input changes the hash completely; it should be very hard to find two inputs with the same hash.
- Uses:
  - storing passwords: store the hash (with a random salt), not the password. At login, hash what is typed and compare. A data breach does not reveal the passwords directly;
  - checking integrity: compare the hash of a downloaded file with the published hash to show it has not been changed or corrupted;
  - digital signatures: the sender's private key encrypts a hash of the message (file 28);
  - hash tables and database indexing for fast look-up (file 06);
  - detecting duplicate files.

### Worked example

```python
import hashlib
print(hashlib.sha256(b"password1").hexdigest()[:16])
print(hashlib.sha256(b"password2").hexdigest()[:16])
# two completely different digests from a one-character change
```

## Check questions

1. Give two reasons for compressing a video before uploading it. [2 marks]
2. Explain why lossy compression is not suitable for a program's source code. [2 marks]
3. Encode `AAAABBBCCDAAAA` with RLE and calculate the compression ratio (count each character or digit as one unit). [3 marks]
4. Describe how a dictionary-based method compresses text. [3 marks]
5. (Eduqas) A 40 MB file compresses to 16 MB. Calculate the compression ratio and the saving percentage. [2 marks]
6. Encrypt COMPUTER with a Caesar cipher using a shift of 5. [1 mark]
7. Explain two reasons why the Caesar cipher is easily cracked. [2 marks]
8. Encrypt the bit pattern 1011 0110 with the Vernam key 0110 1100, then show decryption. [2 marks]
9. State three conditions on the key for a Vernam cipher to give perfect security. [3 marks]
10. Compare the Vernam cipher with ciphers that depend on computational security. [3 marks]
11. (OCR) Explain the difference between symmetric and asymmetric encryption, and why both are often used together. [4 marks]
12. (OCR) Explain why passwords are stored as hashes. [2 marks]

## Mark scheme

1. Any two: less storage on the server (1); faster upload/download (1); less bandwidth/data used (1); smoother streaming (1).
2. Lossy removes data permanently (1); every character of code matters, so the program would not work/the original cannot be recovered exactly (1).
3. 4A3B2C1D4A (1); 14 units to 10 units (1); ratio 1.4:1 (1).
4. Repeated words/patterns are found and stored once in a dictionary (1); each occurrence is replaced by a short reference/index to the dictionary entry (1); the dictionary is stored/rebuilt so the text can be decompressed exactly (1).
5. Ratio 40 ÷ 16 = 2.5:1 (1); saving 24 ÷ 40 = 60% (1).
6. HTRUZYJW (1).
7. Only 25 possible keys so brute force is quick (1); letter frequencies are preserved so frequency analysis works (1).
8. Ciphertext 1101 1010 (1); 1101 1010 XOR 0110 1100 = 1011 0110 (1).
9. Truly random (1); at least as long as the message (1); used only once/kept secret (1).
10. Vernam is mathematically proven perfectly secure/gives no information about the plaintext (1); other ciphers could be broken in theory given enough time and ciphertext; they rely on it taking too long (1); Vernam keys are hard to generate and distribute securely, so computationally secure ciphers are more practical (1).
11. Symmetric: same key to encrypt and decrypt (1). Asymmetric: public key to encrypt, matching private key to decrypt (1). Asymmetric avoids sharing a secret key but is slow; symmetric is fast but needs a shared key (1). So asymmetric is used to exchange a symmetric session key, which encrypts the bulk data (1).
12. Hashes are one-way, so if the database is stolen the passwords cannot be read (1); at login the entered password is hashed and compared with the stored hash (1).
