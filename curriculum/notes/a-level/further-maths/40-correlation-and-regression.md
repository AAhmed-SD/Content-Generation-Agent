---
level: A-level
subject: Further Mathematics
topic: "Correlation and regression"
as_content: "AS on OCR (5.08, 5.09 Stage 1) and MEI (section (a)). Edexcel FS2 is A-level option content. AQA does not include this in Further Maths."
boards:
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FS2 1.1", "FS2 1.2", "FS2 3.1", "FS2 3.2", "FS2 3.3"]
  - board: OCR
    code: "H245"
    spec_refs: ["5.08a", "5.08b", "5.08c", "5.08d", "5.08e", "5.08f", "5.08g", "5.09a", "5.09b", "5.09c", "5.09d", "5.09e"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["Sb1", "Sb2", "Sb3", "Sb4", "Sb5", "Sb6", "Sb7", "Sb8", "Sb9", "Sb10", "Sb11", "Sb12", "Sb13", "Sb14", "Sb15", "Sb16"]
refs_checked: false
spec_urls:
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-statistics/
---

# Correlation and regression

This file covers bivariate data and scatter diagrams, the product moment correlation coefficient (pmcc) and its hypothesis test, Spearman's rank correlation coefficient and its test, choosing between them, least squares regression lines, the effect of coding, residuals, and using regression lines for prediction.

## Overview

Scatter diagrams and interpreting correlation are in A-level Maths ([../maths/20-data-presentation-and-interpretation.md](../maths/20-data-presentation-and-interpretation.md)), with the pmcc test in [../maths/23-hypothesis-testing.md](../maths/23-hypothesis-testing.md) for some boards.

### Board differences

- Edexcel FS2 1.1, 1.2 (least squares regression, residuals and residual sum of squares), 3.1 to 3.3 (pmcc, Spearman, tests).
- OCR 5.08a to 5.08g, 5.09a to 5.09e. OCR expects you to know when the pmcc test is valid (bivariate normal) and to choose between tests.
- MEI Sb1 to Sb16 includes the regression line of x on y as well as y on x (Sb13), effect size (Sb7), and interpreting computer output.
- AQA 7367 does not include correlation and regression.

## Product moment correlation

*Refs: Edexcel FS2 3.1, 3.3 · OCR 5.08a, 5.08b, 5.08c, 5.08d · MEI Sb1, Sb2, Sb3, Sb4, Sb5, Sb6, Sb7. Level: AS & A (OCR, MEI).*

### What you need to know

```latex
S_{xx} = \sum x^2 - \frac{(\sum x)^2}{n},\quad S_{xy} = \sum xy - \frac{\sum x\sum y}{n},\quad r = \frac{S_{xy}}{\sqrt{S_{xx}S_{yy}}}
```

- −1 ≤ r ≤ 1. r measures linear association only. Correlation does not imply causation.
- Coding x and y by linear transformations does not change r (except for sign if one scale is reversed).
- Test H₀: ρ = 0 against ρ > 0, ρ < 0 or ρ ≠ 0 using tables of critical values for n. The test assumes the data come from a bivariate normal distribution (an elliptical scatter).

### Worked example

x: 2, 4, 5, 7, 8, 10. y: 15, 22, 24, 30, 35, 40. Find r and test at 5% for positive correlation.

1. Σx = 36, Σx² = 258, Σy = 166, Σy² = 5010, Σxy = 1128.
2. S_xx = 42, S_yy = 417.33, S_xy = 132.
3. r = 132/√(42 × 417.33) = 0.997.
4. H₀: ρ = 0, H₁: ρ > 0. Critical value for n = 6 at 5% one-tailed: 0.7293. Reject H₀: strong evidence of positive correlation.

### Common mistakes

- Using the pmcc test when the scatter is clearly not elliptical.

## Spearman's rank correlation

*Refs: Edexcel FS2 3.2, 3.3 · OCR 5.08e, 5.08f, 5.08g · MEI Sb8, Sb9, Sb10. Level: AS & A (OCR, MEI).*

### What you need to know

```latex
r_s = 1 - \frac{6\sum d^2}{n(n^2-1)}
```

- Rank each variable, find differences d. (With tied ranks, give the mean rank and use the pmcc formula on the ranks.)
- Spearman measures monotonic association (whether one tends to increase as the other does), not just linear.
- Test H₀: no association, using tables for Spearman.
- Choose Spearman when the data are ranks, the relationship is non-linear but monotonic, or the data are not bivariate normal.

### Worked example

Two judges rank seven entries: A 1, 2, 3, 4, 5, 6, 7 and B 2, 1, 4, 3, 7, 5, 6. Test at 5% for agreement.

1. d² values: 1, 1, 1, 1, 4, 1, 1, Σd² = 10.
2. r_s = 1 − 60/(7 × 48) = 0.821.
3. H₁: positive association. Critical value for n = 7 at 5% one-tailed: 0.7143. Reject H₀: evidence the judges agree.

### Common mistakes

- Ranking one variable in ascending order and the other descending.

## Least squares regression

*Refs: Edexcel FS2 1.1, 1.2 · OCR 5.09a, 5.09b, 5.09c, 5.09d, 5.09e · MEI Sb11, Sb12, Sb13, Sb14, Sb15, Sb16. Level: AS & A (OCR, MEI).*

### What you need to know

- The regression line of y on x, y = a + bx, minimises the sum of squared vertical distances (residuals):

```latex
b = \frac{S_{xy}}{S_{xx}},\qquad a = \bar y - b\bar x
```

- Use y on x when x is the independent (controlled) variable and y is to be predicted. (MEI) The line of x on y is x = a′ + b′y with b′ = S_xy/S_yy; both lines pass through (x̄, ȳ).
- Residual = observed y − predicted y. Residual sum of squares RSS = S_yy − (S_xy)²/S_xx (Edexcel).
- Interpolation (inside the data range) is reliable; extrapolation is not.
- Coding: if X = (x − p)/q and Y = (y − r)/s, find the line in X and Y and substitute back.

### Worked example

For the data above, find the regression line of y on x, the residual at x = 5, and the RSS.

1. b = 132/42 = 3.143. a = 27.667 − 3.143 × 6 = 8.81. y = 8.81 + 3.14x.
2. At x = 5: predicted 24.52, residual 24 − 24.52 = −0.52.
3. RSS = 417.33 − 132²/42 = 2.48.

Interpret the gradient if x is hours of practice and y is a test score.

1. Each extra hour of practice is associated with about 3.1 more marks.

### Common mistakes

- Using the y on x line to predict x.
- Extrapolating far outside the data.

## Check questions

1. For 8 data pairs, Σx = 40, Σy = 96, Σx² = 240, Σy² = 1300, Σxy = 530. Find r and the regression line of y on x. [6 marks]
2. A pmcc of −0.62 is found for 10 pairs. Test at 5% (two-tailed) whether there is correlation (critical value 0.6319). [3 marks]
3. Explain when Spearman's coefficient is preferable to the pmcc. [2 marks]
4. Find r_s for ranks (1, 2, 3, 4, 5, 6) and (3, 1, 2, 6, 4, 5), and test for positive association at 5% (critical value 0.8286). [5 marks]
5. The data were coded with X = (x − 100)/5 and Y = y/10. The coded regression line is Y = 2.4 + 0.6X. Find the line in terms of x and y. [3 marks]

## Mark scheme

1. S_xx = 40, S_yy = 148, S_xy = 50 (3). r = 50/√5920 = 0.650 (1). b = 1.25, a = 12 − 1.25 × 5 = 5.75 (1). y = 5.75 + 1.25x (1).
2. |−0.62| < 0.6319 (1). Do not reject H₀ (1). No significant evidence of correlation (1).
3. When data are ranked, or the relationship is monotonic but not linear, or the data are not bivariate normal (2).
4. d: −2, 1, 1, −2, 1, 1; Σd² = 12 (2). r_s = 1 − 72/210 = 0.657 (2). 0.657 < 0.8286, no evidence of positive association (1).
5. y/10 = 2.4 + 0.6(x − 100)/5 (1). y = 24 + 1.2(x − 100) (1) = 1.2x − 96 (1).
