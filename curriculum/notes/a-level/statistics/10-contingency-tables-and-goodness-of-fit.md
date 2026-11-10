---
level: A-level
subject: Statistics
topic: "Chi-squared tests: contingency tables and goodness of fit"
boards:
  - board: Edexcel
    code: "9ST0"
    spec_refs: ["9.1", "9.2", "9.3", "19.1"]
refs_checked: false
spec_url: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/a-level-statistics/
---

# Chi-squared tests: contingency tables and goodness of fit

This file covers building contingency tables from real data, the chi-squared test for independence (association) with its degrees of freedom, the rule that expected frequencies must be at least 5 and how to combine classes, and goodness of fit tests for binomial, Poisson, normal, exponential and specified discrete distributions.

## Overview

The chi-squared statistic, contingency tables and goodness of fit are written up in [Further Maths 34](../further-maths/34-chi-squared-tests.md). A-level Statistics extends goodness of fit to the normal and exponential distributions (continuous, so the classes are intervals) and asks you to build tables from raw data and justify combining classes. Yates' correction is never needed.

### Board differences

- Edexcel 9ST0 topics 9 and 19 are on Paper 2.
- The statistic Σ(O − E)²/E is in the formulae booklet, with chi-squared percentage points (Table 6). You must know how to find the degrees of freedom.
- Combine classes when an expected frequency is below 5 and pooling makes sense.

## 9.1 Contingency tables from real data

*Refs: Edexcel 9.1. Paper 2.*

### What you need to know

- A contingency table counts how many items fall in each combination of two categorical variables (rows × columns), with row and column totals.
- Build one by tallying raw records, or from a database query that groups by two fields and counts.
- Combine categories where it makes sense (for example joining "rarely" and "never") either to answer a simpler question or to meet the expected-frequency rule.
- Interpret the result in context, for example by comparing row percentages.

### Explained

Row percentages show the pattern: if 26% of Year 12 travel by car but 43% of Year 13 do, travel mode may be associated with year. The chi-squared test asks whether such differences are bigger than chance would produce.

Only combine categories that belong together. Joining "bus" and "train" into "public transport" is sensible; joining "bus" and "car" is not.

### Worked example

A survey of 150 students records year group and how they travel to college. Build the table and compare row percentages.

| | Walk | Bus | Car | Total |
| --- | --- | --- | --- | --- |
| Year 12 | 22 | 30 | 18 | 70 |
| Year 13 | 18 | 28 | 34 | 80 |
| Total | 40 | 58 | 52 | 150 |

1. Year 12 by car: 18 ÷ 70 = 26%. Year 13 by car: 34 ÷ 80 = 43%.
2. Year 13 students appear more likely to drive (many can now drive themselves); a test will show whether the difference is significant.

### Common mistakes

- Comparing raw counts when the row totals differ.
- Combining categories that do not belong together just to reach 5.

## 9.2 The chi-squared test for independence

*Refs: Edexcel 9.2. Paper 2.*

### What you need to know

- H₀: the two variables are independent (no association). H₁: they are not independent (there is an association).
- Expected frequency for each cell, assuming H₀:

```latex
E = \frac{\text{row total} \times \text{column total}}{\text{grand total}}
```

```latex
X^2 = \sum \frac{(O - E)^2}{E} \approx \chi^2_\nu, \qquad \nu = (r - 1)(c - 1)
```

- Reject H₀ if X² exceeds the critical value χ²ᵥ at the chosen level (or if the p-value is below the level).

### Explained

The degrees of freedom count how many cells you could fill freely once the row and column totals are fixed. The test is always one-tailed (upper tail): a large X² means observed and expected differ a lot.

After the test, look at the largest contributions (O − E)²/E to say where the association lies, and whether O is above or below E there.

Upper 5% points of χ²: ν = 1, 3.841; ν = 2, 5.991; ν = 3, 7.815; ν = 4, 9.488; ν = 5, 11.070.

### Worked example

Test at 5% whether travel mode and year group are associated, for the table in 9.1.

1. H₀: travel mode and year group are independent. H₁: they are associated.
2. Expected: Year 12 Walk = 70 × 40 ÷ 150 = 18.67; Bus 27.07; Car 24.27. Year 13: 21.33, 30.93, 27.73. All are at least 5.
3. Contributions: 0.595, 0.318, 1.618, 0.521, 0.278, 1.416. X² = 4.746.
4. ν = (2 − 1)(3 − 1) = 2; critical value 5.991.
5. 4.746 < 5.991 (p-value 0.093), so do not reject H₀. There is insufficient evidence at 5% of an association between year group and travel mode. The largest contributions come from "car", where Year 13 is above expected, which may be worth a larger study.

### Common mistakes

- Using ν = rc − 1.
- Rounding expected frequencies to whole numbers.
- Concluding "the variables are independent" instead of "insufficient evidence of association".

## 9.3 Expected frequencies of at least 5

*Refs: Edexcel 9.3. Paper 2.*

### What you need to know

- The chi-squared approximation needs every expected frequency to be at least 5. If not, combine rows or columns (or classes) where pooling is sensible, then recalculate expected frequencies and degrees of freedom.

### Explained

Small expected frequencies make (O − E)²/E unstable: one extra observation in a cell with E = 1.2 changes X² a lot. Combining adjacent or similar categories fixes this. Combining reduces the number of rows or columns, so ν goes down.

### Worked example

A 3 × 3 table has a row "Retired" with expected frequencies 2.1, 3.4 and 4.0. The other rows are "Employed" and "Student". Explain what to do.

1. All three expected frequencies in the "Retired" row are below 5.
2. Combining "Retired" with "Student" makes no sense; combining it with "Employed" to make "Adult, not student" is possible, or the row could be removed with the change reported.
3. After combining, the table is 2 × 3, so ν = (2 − 1)(3 − 1) = 2, not 4.

### Common mistakes

- Forgetting to reduce ν after combining.

## 19.1 Goodness of fit tests

*Refs: Edexcel 19.1. Paper 2.*

### What you need to know

- H₀: the data come from the stated distribution. H₁: they do not.
- Expected frequencies = total × probability for each class, from the binomial, Poisson, normal, exponential or a specified discrete distribution (such as uniform). For continuous distributions the classes are intervals, and the end classes stretch to cover all values.
- Combine classes with E < 5.

```latex
\nu = \text{number of classes after combining} - 1 - \text{number of parameters estimated from the data}
```

| Distribution | Parameters estimated from data | ν |
| --- | --- | --- |
| specified (e.g. uniform, or given p or λ) | 0 | k − 1 |
| binomial, p estimated | 1 | k − 2 |
| Poisson, λ estimated | 1 | k − 2 |
| exponential, λ estimated | 1 | k − 2 |
| normal, μ and σ estimated | 2 | k − 3 |

### Explained

Each estimated parameter makes the expected frequencies fit the data more closely, so one degree of freedom is lost per estimate. If a question gives the parameter (for example "λ = 0.5"), it is not estimated and no extra degree of freedom is lost.

For a normal fit, the first class is "below a" and the last "above b", so the probabilities add to 1. For an exponential fit, the first class starts at 0 and the last is open-ended.

### Worked example

A Poisson fit. The goals scored by a team in 100 matches were:

| Goals | 0 | 1 | 2 | 3 | 4 | 5 or more |
| --- | --- | --- | --- | --- | --- | --- |
| Matches | 18 | 30 | 27 | 15 | 7 | 3 |

The sample mean is 1.7. Test at 5% whether a Poisson model fits.

1. H₀: goals per match follow a Poisson distribution. H₁: they do not.
2. With λ = 1.7, expected = 100 × P(X = x): 18.27, 31.06, 26.40, 14.96, 6.36 and (5 or more) 2.96.
3. The last E is below 5, so combine "4" and "5 or more": O = 10, E = 9.32.
4. Contributions: 0.004, 0.036, 0.014, 0.000, 0.050. X² = 0.103.
5. Classes k = 5; λ was estimated, so ν = 5 − 1 − 1 = 3; critical value 7.815.
6. 0.103 < 7.815, so do not reject H₀. A Poisson model with λ = 1.7 fits well.

An exponential fit with a given rate. 80 gaps between buses (minutes) are recorded:

| Gap (min) | 0–1 | 1–2 | 2–4 | 4 or more |
| --- | --- | --- | --- | --- |
| Observed | 28 | 15 | 20 | 17 |

Test at 5% whether the gaps follow Exp(0.5).

1. H₀: gaps follow Exp(0.5). H₁: they do not.
2. Probabilities from P(a < T < b) = e^(−0.5a) − e^(−0.5b): 0.3935, 0.2387, 0.2325, 0.1353. Expected: 31.48, 19.09, 18.60, 10.83.
3. Contributions: 0.384, 0.877, 0.105, 3.520. X² = 4.886.
4. λ given, not estimated: ν = 4 − 1 = 3; critical value 7.815.
5. 4.886 < 7.815, do not reject H₀: the Exp(0.5) model is consistent with the data, although the long gaps are more frequent than expected.

A specified discrete distribution. A die is rolled 120 times: 14, 22, 17, 25, 16, 26 for faces 1 to 6. Test at 5% whether it is fair.

1. H₀: each face has probability 1/6. E = 20 for each face.
2. X² = (36 + 4 + 9 + 25 + 16 + 36) ÷ 20 = 6.3.
3. ν = 6 − 1 = 5; critical value 11.070. 6.3 < 11.070, so there is no evidence the die is biased.

### Common mistakes

- Forgetting to subtract one degree of freedom for each estimated parameter.
- Leaving the last class closed (for example 4–6) so the expected frequencies do not add to the total.
- Combining classes in the observed row but not the expected row.

## Check questions

1. In a survey, 130 adults are classified by age group and whether they recycle: 18–34: 30 yes, 20 no; 35–59: 25 yes, 35 no; 60+: 5 yes, 15 no. Find the expected frequencies assuming independence. [3 marks]
2. Test at 5% whether recycling is associated with age group for the data in question 1. [5 marks]
3. Explain why a table with an expected frequency of 3.2 should not be tested as it stands, and what you would do. [2 marks]
4. Sixty groups of 4 students are surveyed for the number who are left-handed: 0 in 20 groups, 1 in 24, 2 in 12, 3 in 3, 4 in 1. Estimate p, and test at 5% whether a binomial model fits. [8 marks]
5. State the degrees of freedom for a goodness of fit test of a normal distribution to 8 classes, when the mean and standard deviation are estimated from the data. [1 mark]
6. In an exponential goodness of fit test, explain why the last class must be open-ended. [1 mark]

## Mark scheme

1. Totals: yes 60, no 70 (1); 18–34: 23.08, 26.92; 35–59: 27.69, 32.31 (1); 60+: 9.23, 10.77 (1).
2. H₀: independent, H₁: associated (1); all E ≥ 5 (1); X² = 7.944 (1); ν = 2, critical value 5.991 (1); reject H₀: evidence of association; older adults recycle less than expected (1).
3. The chi-squared approximation is unreliable when E < 5 (1); combine that class with a sensible neighbouring class and reduce ν (1).
4. Mean = 61 ÷ 60 = 1.0167 (1); p = 1.0167 ÷ 4 = 0.254 (1); expected: 18.57, 25.31, 12.94, 2.94, 0.25 (1); combine 2, 3 and 4: O = 16, E = 16.13 (1); contributions 0.111, 0.068, 0.001 (1), X² = 0.179 (1); ν = 3 − 1 − 1 = 1, critical value 3.841 (1); do not reject H₀: a binomial model fits (1).
5. ν = 8 − 1 − 2 = 5 (1).
6. The exponential distribution has no upper limit, so the classes must cover all values for the expected frequencies to sum to the total (1).
