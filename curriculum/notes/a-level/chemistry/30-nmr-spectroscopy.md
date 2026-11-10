---
level: A-level
subject: Chemistry
topic: "NMR spectroscopy and combined structure determination"
as_content: "A-level only, except Eduqas C3.5(c) (¹³C and low-resolution ¹H NMR), which is AS."
boards:
  - board: AQA
    code: "7405"
    spec_refs: ["3.3.15"]
  - board: Edexcel
    code: "9CH0"
    spec_refs: ["19.2", "19.3", "19.4", "19.5"]
  - board: OCR A
    code: "H432"
    spec_refs: ["6.3.2(a)", "6.3.2(b)", "6.3.2(c)", "6.3.2(d)", "6.3.2(e)"]
  - board: OCR B
    code: "H433"
    spec_refs: ["PL(s)", "PL(t)"]
  - board: Eduqas
    code: "A410QS"
    spec_refs: ["C3.5(c)", "OA4(f)"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/chemistry/a-level/chemistry-7405/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/chemistry-2015.html
  OCR A: https://www.ocr.org.uk/qualifications/as-and-a-level/chemistry-a-h032-h432-from-2015/
  OCR B: https://www.ocr.org.uk/qualifications/as-and-a-level/chemistry-b-salters-h033-h433-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/chemistry-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/chemistry-revision/
---

# NMR spectroscopy and combined structure determination

Nuclear magnetic resonance (NMR) shows the different environments of carbon and hydrogen atoms in a molecule. This file covers how NMR works, carbon-13 spectra, proton spectra (chemical shift, integration and splitting), TMS and deuterated solvents, and how to combine NMR with other data to solve a structure.

## Overview

A-level for most boards. Mass spectrometry, infrared and test-tube tests are in file 22; empirical formula from combustion data is in file 2.

### Board differences

- AQA 3.3.15: ¹³C and ¹H NMR, chemical shift, integration, n+1 splitting, TMS, CDCl₃ and other solvents.
- Edexcel 19.2 to 19.5: ¹³C and high-resolution ¹H NMR.
- OCR A 6.3.2(a) to (e): adds the use of D₂O to identify O–H and N–H protons (6.3.2(b)), and combining elemental analysis, mass spectra, IR and NMR (6.3.2(e)).
- OCR B PL(s), (t): ¹H and ¹³C NMR and combining spectroscopic techniques.
- Eduqas C3.5(c) (AS: ¹³C and low-resolution ¹H) and OA4(f) (A-level: high-resolution ¹H).

## 3.3.15 Nuclear magnetic resonance spectroscopy

*Refs: AQA 3.3.15 · Edexcel 19.2 to 19.5 · OCR A 6.3.2(a) to (e) · OCR B PL(s), PL(t) · Eduqas C3.5(c), OA4(f). Level: A-level only (Eduqas C3.5(c) AS).*

### What you need to know

- NMR gives information about the positions of ¹³C or ¹H atoms in a molecule.
- Chemical shift (δ, in ppm) depends on the environment; it is measured relative to TMS.
- ¹³C NMR: number of peaks = number of carbon environments.
- ¹H NMR: number of peaks = proton environments; integration (relative peak area) = ratio of protons; splitting by the n+1 rule.
- Why TMS is the standard; why CDCl₃ or other deuterated solvents are used.
- OCR A: D₂O exchange to identify –OH and –NH protons.

### Explained

**How it works.** Nuclei with an odd mass number (¹H, ¹³C) have spin and behave like tiny magnets. In a strong magnetic field they line up with or against it. Radio waves of the right frequency flip them to the higher-energy state (resonance). The frequency needed depends on how much the nucleus is shielded by surrounding electrons. Electronegative atoms nearby pull electron density away (deshielding), so the nucleus resonates at a higher chemical shift.

**Chemical shift and TMS.** δ is measured relative to tetramethylsilane, Si(CH₃)₄, set at 0 ppm. TMS is used because:

- all 12 H (and 4 C) are in one environment, giving one strong peak;
- its peak is well away from most organic peaks (upfield, because Si is less electronegative than C);
- it is inert, non-toxic, and volatile so it is easily removed.

**Solvents.** Samples are dissolved in deuterated solvents such as CDCl₃, which have no ¹H atoms and so give no peak in ¹H spectra. (CDCl₃ still has carbon, but its ¹³C peak is known and ignored.) Deuterium (²H) does not show in ¹H NMR.

**Equivalent environments.** Atoms in the same environment are related by symmetry. Ethanol CH₃CH₂OH has 2 carbon environments and 3 proton environments. Propanone CH₃COCH₃ has 2 carbon environments and 1 proton environment.

**¹³C NMR.** Each carbon environment gives one peak (no splitting in the spectra used). Typical shifts:

| Carbon environment | δ / ppm |
| --- | --- |
| C–C (alkyl) | 5 to 40 |
| C–Cl, C–Br | 10 to 70 |
| C–N (amines) | 25 to 60 |
| C–O (alcohols, ethers, esters) | 50 to 90 |
| C=C (alkenes) | 90 to 150 |
| Aromatic C | 110 to 160 |
| C=O (acids, esters, amides) | 160 to 185 |
| C=O (aldehydes, ketones) | 190 to 220 |

Use the values on the data sheet in an exam.

**¹H NMR.** Typical shifts:

| Proton environment | δ / ppm |
| --- | --- |
| R–CH₃ | 0.7 to 1.2 |
| R–CH₂–R | 1.2 to 1.4 |
| H–C–C=O (next to carbonyl) | 2.1 to 2.6 |
| H–C–N | 2.3 to 2.9 |
| Benzene ring C–H attached to ring (Ar–CH) | 2.3 to 3.0 |
| H–C–O (alcohol, ether), H–C–Cl/Br | 3.1 to 4.2 |
| ester O–CH | 3.7 to 4.1 |
| Alkene C=C–H | 4.5 to 6.0 |
| R–OH | 1 to 5 (variable, broad) |
| Aromatic H | 6.5 to 8.0 |
| Aldehyde –CHO | 9.0 to 10.0 |
| Carboxylic acid –COOH | 10 to 12 |

**Integration.** The area under each peak is proportional to the number of H in that environment. Often shown as an integration trace or as relative numbers. For ethanol: 3 : 2 : 1.

**Splitting (n+1 rule).** A peak is split by the H atoms on neighbouring carbons (three bonds away). If there are n equivalent neighbouring H atoms, the peak splits into n + 1 lines.

| Neighbouring H | Pattern | Relative heights |
| --- | --- | --- |
| 0 | Singlet | 1 |
| 1 | Doublet | 1 : 1 |
| 2 | Triplet | 1 : 2 : 1 |
| 3 | Quartet | 1 : 3 : 3 : 1 |

An ethyl group CH₃CH₂– shows a triplet (CH₃, next to 2 H) and a quartet (CH₂, next to 3 H). H atoms on O or N usually appear as singlets and do not split their neighbours (fast exchange).

**D₂O exchange (OCR A).** Shake the sample with D₂O. –OH and –NH protons are replaced by D: O–H + D₂O → O–D + HDO. Their peak disappears from the spectrum, identifying it.

**Solving structures.** Combine:

1. Molecular formula (from percentage composition and Mᵣ from mass spectrum).
2. IR for functional groups.
3. ¹³C NMR for the number and types of carbon.
4. ¹H NMR: shifts (environment), integration (how many H), splitting (how many neighbours).
5. Fragmentation in the mass spectrum to confirm.

### Worked example

A compound C₄H₈O₂ has: IR C=O at 1740 cm⁻¹, no broad O–H. ¹H NMR: δ 4.1 (2H, quartet), 2.0 (3H, singlet), 1.3 (3H, triplet). Identify it.

- C=O and no O–H with two O: an ester.
- Quartet (2H) and triplet (3H): an ethyl group, CH₂ at 4.1 so bonded to O (O–CH₂CH₃).
- Singlet 3H at 2.0: CH₃ next to C=O with no neighbouring H.
- Ethyl ethanoate, CH₃COOCH₂CH₃.

### Common mistakes

- Counting the H atoms on the carbon itself for splitting. Count the neighbours.
- Forgetting that CH₃ groups that are equivalent (as in propanone) give one peak.
- Saying TMS is used because it "has no protons". It has 12 equivalent protons, giving one peak at 0.
- Saying CDCl₃ is used because it is non-polar. It is used because it has no ¹H.

## Check questions

1. How many peaks are there in the ¹³C NMR spectrum of (a) propan-2-ol, (b) 2-methylpropane, (c) 1,4-dimethylbenzene? (3 marks)
2. Give two reasons why TMS is used as the standard. (2 marks)
3. Explain why CDCl₃ is used as the solvent in ¹H NMR. (1 mark)
4. Predict the ¹H NMR spectrum of propanal, CH₃CH₂CHO: number of peaks, approximate shift, integration and splitting of each. (4 marks)
5. A compound C₃H₆O has one peak in its ¹H NMR spectrum. Identify it. (1 mark)
6. A compound C₃H₇Br has ¹H NMR peaks: a doublet (6H) and a septet (1H). Identify it and explain the splitting. (3 marks)
7. Explain how D₂O can show which peak in a ¹H NMR spectrum is from an –OH group. (2 marks)
8. Compound X, C₄H₈O, gives an orange precipitate with 2,4-DNPH and no reaction with Tollens' reagent. Its ¹H NMR spectrum has a quartet (2H), a singlet (3H) and a triplet (3H). Identify X, explaining each piece of evidence. (5 marks)

## Mark scheme

1. (a) 2 (1); (b) 2 (1); (c) 3 (1).
2. Any two: single peak (all H equivalent); peak at 0, away from others; inert / non-toxic; volatile so easily removed.
3. No ¹H atoms so does not give a peak (1).
4. Three peaks (1); CH₃ about 1.0, triplet, 3H (1); CH₂ about 2.4, quintet / multiplet (split by 3 + 1), 2H (1); CHO about 9.8, triplet, 1H (1).
5. Propanone (1).
6. 2-bromopropane (1); 6H doublet: two equivalent CH₃ each next to one H (1); 1H septet: CH next to 6 H (1).
7. Shake with D₂O; OH replaced by OD (1); OH peak disappears (1).
8. 2,4-DNPH positive: carbonyl (1); Tollens' negative: ketone (1); quartet 2H and triplet 3H: ethyl group CH₂CH₃ (1); singlet 3H: CH₃ with no neighbouring H, next to C=O (1); butanone, CH₃COCH₂CH₃ (1).
