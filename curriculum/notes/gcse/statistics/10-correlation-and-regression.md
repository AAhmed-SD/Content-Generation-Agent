---
level: GCSE
subject: Statistics
topic: "Correlation and regression"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8382"
    spec_refs: ["3.4.7", "3.4.8", "3.5.19", "3.5.20", "3.5.21", "3.5.22", "3.5.23", "3.5.24"]
  - board: Edexcel
    code: "1ST0"
    spec_refs: ["2e.01", "2e.02", "2e.03", "2e.04", "2e.05", "2e.06", "2e.07", "2e.08"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/statistics/gcse/statistics-8382/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/past-papers/gcse-statistics/
---

# Correlation and regression

This file covers scatter diagrams, the vocabulary of correlation, judging strength by eye, correlation and causation, lines of best fit (by eye, through the double mean point and, Higher, from the regression equation), interpolation and extrapolation, and (Higher) Spearman's rank correlation coefficient and Pearson's product moment correlation coefficient (PMCC).

## Overview

On both tiers: vocabulary, strong or weak by inspection, correlation is not causation, line of best fit by eye and through the double mean point, interpreting a given Spearman's coefficient. (HT only) Multiple interacting factors, the regression line, calculating Spearman's coefficient, interpreting PMCC, and the difference between Spearman's and PMCC.

### Board differences

- AQA 8382: 3.4.7 (D5) line of best fit, 3.4.8 (D6) calculating Spearman's (Higher only, formula given in the question), 3.5.19 to 3.5.24 (E8a to E9c). AQA gives a scale for describing coefficients: 0.6 or more (or −0.6 or less) is strong; from 0.2 up to 0.6 (or −0.2 down to −0.6) is weak; between −0.2 and 0.2 is no correlation. "Moderate" is not needed.
- Edexcel 1ST0: 2e.01 to 2e.08. Edexcel says no formal interpretation of strength is expected; values nearer ±1 are "stronger". Tied ranks will not be tested when calculating Spearman's. The regression line is written y = a + bx. Spearman's formula is on the formulae sheet.
- Both boards: PMCC is never calculated, only interpreted. Calculator functions may be used for Spearman's. Non-linear models are not tested.

## 3.5.19 / 2e.01 Vocabulary of correlation

*Refs: AQA 3.5.19 (E8a) · Edexcel 2e.01. Tier: F & H.*

### What you need to know

- Positive correlation: as one variable increases, the other tends to increase.
- Negative correlation: as one increases, the other tends to decrease.
- Zero (no) correlation: no linear pattern.
- Association: a relationship of any kind between two variables.
- Causation: a change in one variable directly causes a change in the other.
- Interpolation: estimating within the range of the data (reliable if correlation is strong).
- Extrapolation: estimating outside the range of the data (unreliable: the pattern may not continue).
- The dependent (response) variable goes on the y-axis.

### Common mistakes

- Using "correlation" and "causation" as if they mean the same.

## 3.5.20 / 2e.02 Strength of correlation by inspection

*Refs: AQA 3.5.20 (E8b) · Edexcel 2e.02. Tier: F & H.*

### What you need to know

- Strong correlation: points lie close to a straight line. Weak: a general trend but widely scattered.
- Compare the strength of correlation on two scatter diagrams.

### Explained

Picture a long, thin ellipse around the points. The thinner it is, the stronger the correlation. A cloud with no direction means no correlation.

### Worked example

Scatter diagram A shows points tightly along a rising line; B shows a wide rising band. Compare.

1. Both show positive correlation; A's correlation is stronger because its points are closer to a straight line.

### Common mistakes

- Judging strength by the steepness of the line. A steep line can have weak correlation.

## 3.5.21 / 2e.03 Correlation and causation

*Refs: AQA 3.5.21 (E8c) · Edexcel 2e.03. Tier: F & H (part Higher only).*

### What you need to know

- Correlation does not necessarily mean one variable causes the other.
- Spurious correlation: two variables are both linked to a third (hidden) variable.
- (HT only) Several factors can interact to affect a variable.

### Explained

Ice cream sales and sunburn cases are positively correlated, but ice cream does not cause sunburn: hot sunny weather causes both. In towns of different sizes, the number of cars and the number of births both rise with population.

(HT only) Exam results depend on revision, attendance, sleep, prior attainment and more, all affecting each other. One correlation with one factor cannot show it is the cause.

### Worked example

Cities with more libraries have more crime. Explain why libraries do not cause crime.

1. Larger cities have both more libraries and more crime, so population size is the third variable linking them.

### Common mistakes

- Saying "there is no relationship" when the point is that the relationship is not causal.

## 3.4.7 / 2e.04 Lines of best fit and regression

*Refs: AQA 3.4.7 (D5) · Edexcel 2e.04. Tier: F & H (part Higher only).*

### What you need to know

- Draw a line of best fit by eye: a straight line following the trend, with roughly equal numbers of points on each side.
- Better: draw it through the double mean point (x̄, ȳ), which must be plotted.
- (HT only) Use the equation of the regression line, y = a + bx, to draw the line and make predictions.
- Interpret the gradient (b: change in y for each 1 unit increase in x) and the intercept (a: the value of y when x = 0) in context.
- Use the line to interpolate; be careful with extrapolation.

### Explained

The double mean point is always on the regression line, so using it makes a line by eye more accurate. A line of best fit does not have to pass through the origin or through any data point.

(HT only) The regression line y = a + bx is the best-fitting straight line calculated from the data (often by software or calculator). Its intercept may have no sensible meaning if x = 0 is far outside the data.

### Worked example

Data for 6 students: hours of revision x = 2, 4, 5, 7, 8, 10; test score y = 41, 50, 52, 61, 66, 72. Find the double mean point.

1. x̄ = 36 ÷ 6 = 6.
2. ȳ = 342 ÷ 6 = 57.
3. Plot (6, 57) and draw the line of best fit through it.

(HT only) The regression line is y = 33.5 + 3.9x (from software). Interpret and use it.

1. Gradient 3.9: each extra hour of revision goes with about 3.9 more marks.
2. Intercept 33.5: a student who did no revision would be predicted to score about 33.5.
3. Predict for 6 hours: y = 33.5 + 3.9 × 6 = 56.9 marks. Reliable: interpolation within 2 to 10 hours.
4. Predict for 20 hours: y = 33.5 + 78 = 111.5, impossible if the test is out of 100. Extrapolation beyond the data is unreliable.

### Common mistakes

- Joining the points dot to dot instead of drawing one straight line.
- Forcing the line through the origin.
- (HT only) Swapping a and b: in y = a + bx, a is the intercept and b the gradient.

## 3.4.8 / 2e.05 Calculating Spearman's rank correlation coefficient

*Refs: AQA 3.4.8 (D6) · Edexcel 2e.05. Tier: Higher only.*

### What you need to know

- (HT only) Rank each variable separately (1 for the largest or smallest, the same way for both), find the difference d in each pair of ranks, and use:

```latex
r_s = 1 - \frac{6\sum d^2}{n(n^2 - 1)}
```

- (HT only) The formula is given. Calculator functions are allowed. Tied ranks are not tested on Edexcel.

### Worked example

(HT only) Two judges rank 6 cakes.

| Cake | A | B | C | D | E | F |
| --- | --- | --- | --- | --- | --- | --- |
| Judge 1 rank | 1 | 2 | 3 | 4 | 5 | 6 |
| Judge 2 rank | 2 | 1 | 4 | 3 | 6 | 5 |
| d | −1 | 1 | −1 | 1 | −1 | 1 |
| d² | 1 | 1 | 1 | 1 | 1 | 1 |

1. Σd² = 6, n = 6.
2. r_s = 1 − (6 × 6) ÷ (6 × 35) = 1 − 36/210 = 0.829 (3 s.f.).
3. Strong positive correlation: the judges largely agree.

(HT only) From raw data. Heights (cm) and arm spans (cm) of 5 people:

| Person | P | Q | R | S | T |
| --- | --- | --- | --- | --- | --- |
| Height | 172 | 158 | 181 | 165 | 177 |
| Arm span | 169 | 162 | 183 | 171 | 174 |
| Rank height | 3 | 5 | 1 | 4 | 2 |
| Rank arm span | 4 | 5 | 1 | 3 | 2 |
| d² | 1 | 0 | 0 | 1 | 0 |

1. Σd² = 2, n = 5.
2. r_s = 1 − 12 ÷ (5 × 24) = 1 − 0.1 = 0.9.

### Common mistakes

- (HT only) Ranking one variable from the top and the other from the bottom.
- (HT only) Forgetting the "1 −" in the formula, or using n² instead of n(n² − 1).
- (HT only) A Σd that is not zero: Σd should always be 0, which is a good check.

## 3.5.22 / 2e.06 Interpreting Spearman's rank correlation coefficient

*Refs: AQA 3.5.22 (E9a) · Edexcel 2e.06. Tier: F & H (part Higher only).*

### What you need to know

- Interpret a given Spearman's coefficient in context. (HT only) Interpret one you have calculated.
- Values lie from −1 to +1: +1 means the ranks agree perfectly, −1 means they are exactly reversed, 0 means no agreement.
- Values closer to ±1 show stronger correlation (AQA's scale is in the overview).

### Worked example

Spearman's coefficient between the order in which runners finished a race and their rank for hours trained is −0.75. Interpret this, given rank 1 is the fastest finisher and rank 1 is the most training.

1. Strong negative correlation between the ranks.
2. Rank 1 means "best" in both, so negative correlation means runners who trained most tended to finish in a worse position. This is surprising, and another factor (such as age or injury) might explain it.

### Common mistakes

- Forgetting to check what rank 1 means for each variable before interpreting the sign.

## 3.5.23 / 2e.07 Interpreting PMCC

*Refs: AQA 3.5.23 (E9b) · Edexcel 2e.07. Tier: Higher only.*

### What you need to know

- (HT only) Pearson's product moment correlation coefficient (PMCC, r) measures the strength of linear correlation between two variables.
- (HT only) r lies from −1 to +1: +1 is perfect positive linear correlation, −1 perfect negative linear correlation, 0 no linear correlation.
- (HT only) You only interpret given values; you do not calculate PMCC.

### Worked example

(HT only) The PMCC between daily temperature and the number of hot drinks sold at a café is −0.81. Interpret it.

1. Strong negative linear correlation: on warmer days, fewer hot drinks tend to be sold.

## 3.5.24 / 2e.08 Spearman's against PMCC

*Refs: AQA 3.5.24 (E9c) · Edexcel 2e.08. Tier: Higher only.*

### What you need to know

- (HT only) Spearman's measures how well the rank orders agree: whether one variable always goes up when the other does (a monotonic relationship), even along a curve.
- (HT only) PMCC measures how close the points are to a straight line.
- (HT only) Use Spearman's for ranked (ordinal) data or when the relationship is not linear; PMCC for linear relationships between measured data.

### Explained

(HT only) If points rise along a curve, every increase in x matches an increase in y, so the ranks agree perfectly: Spearman's is 1. But the points are not on a straight line, so PMCC is less than 1. With positive non-linear correlation, both are positive and Spearman's is larger.

### Worked example

(HT only) The points (1, 1), (2, 4), (3, 9), (4, 16), (5, 25). State Spearman's coefficient and compare it with PMCC.

1. Both variables rank in the same order, so every d = 0 and r_s = 1.
2. The points lie on a curve (y = x²), so the PMCC is high but less than 1. Spearman's is greater than the PMCC.

### Common mistakes

- (HT only) Saying that r = 0 means "no relationship". It means no linear relationship; there could be a curved one.

## Check questions

1. Describe the correlation you would expect between (a) the age of a child and their height, (b) the price of a car and the number sold. [2 marks]
2. Towns with more takeaways have more dentists. Explain why this does not mean takeaways cause the need for dentists. [1 mark]
3. Find the double mean point for x = 3, 5, 6, 9, 12 and y = 20, 26, 27, 35, 42. [2 marks]
4. Explain why using a line of best fit to estimate y for an x-value far beyond the data may be unreliable. [1 mark]
5. (HT only) The regression line for the mass of a dog, y kg, against its age, x months (from 2 to 12 months), is y = 1.8 + 1.4x. Interpret the gradient and predict the mass of a 7-month-old dog. [3 marks]
6. (HT only) Calculate Spearman's rank correlation coefficient for these ranks: Judge X 1, 2, 3, 4, 5, 6, 7; Judge Y 3, 1, 2, 5, 4, 7, 6. [3 marks]
7. (HT only) Interpret your answer to question 6. [1 mark]
8. (HT only) Data shows a curved relationship where y always increases as x increases. Explain whether Spearman's coefficient or the PMCC will be larger. [2 marks]

## Mark scheme

1. (a) Positive (1); (b) negative (1).
2. Both are linked to population size: bigger towns have more of each (1).
3. x̄ = 35 ÷ 5 = 7 (1); ȳ = 150 ÷ 5 = 30, so (7, 30) (1).
4. It is extrapolation; the trend may not continue beyond the data (1).
5. Each extra month of age goes with about 1.4 kg more mass (1); 1.8 + 1.4 × 7 (1) = 11.6 kg (1).
6. d = −2, 1, 1, −1, 1, −1, 1; Σd² = 4 + 1 + 1 + 1 + 1 + 1 + 1 = 10 (1); 1 − 60 ÷ (7 × 48) (1) = 1 − 0.179 = 0.821 (1).
7. Strong positive correlation: the judges mostly agree (1).
8. Spearman's will be larger (1): the ranks agree perfectly so it is 1, but the points are not on a straight line, so PMCC is less than 1 (1).
