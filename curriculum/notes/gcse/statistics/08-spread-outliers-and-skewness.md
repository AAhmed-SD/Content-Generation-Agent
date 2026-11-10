---
level: GCSE
subject: Statistics
topic: "Spread, outliers and skewness"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8382"
    spec_refs: ["3.4.3", "3.4.4", "3.4.5", "3.5.8", "3.5.9", "3.5.13", "3.5.14"]
  - board: Edexcel
    code: "1ST0"
    spec_refs: ["2a.09", "2a.10", "2c.01", "2c.02", "2c.03", "2c.04", "2c.05"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/statistics/gcse/statistics-8382/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/past-papers/gcse-statistics/
---

# Spread, outliers and skewness

This file covers the range, quartiles, interquartile range and percentiles; (Higher) interpercentile and interdecile ranges and standard deviation; outliers by inspection and (Higher) by calculation; skewness by inspection and (Higher) by calculation; and comparing data sets and samples using measures of average and spread together. Standardised scores are in file 14.

## Overview

On both tiers: range, quartiles, IQR, percentiles, outliers and skewness by inspection, commenting on outliers, comparing with median and IQR. (HT only) Interpercentile and interdecile ranges, standard deviation, outliers by calculation, skewness by calculation, comparing with mean and standard deviation.

### Board differences

- AQA 8382: 3.4.3 (D2) skewness, 3.4.4 (D3a) spread, 3.4.5 (D3b) outliers, 3.5.8 (E3b) comparing spread, 3.5.9 (E3c) comparing samples, 3.5.13 (E5a) interpreting skewness, 3.5.14 (E5b) commenting on outliers. On AQA, quartile questions use data sets with n one less than a multiple of 4 (such as 7, 11, 15), so quartiles are always data values. The skewness formula is given in the question.
- Edexcel 1ST0: 2a.09 and 2a.10 skewness, 2c.01 to 2c.05. On Edexcel, n can be any value, so quartiles may fall between data values; any clear method is accepted. Edexcel expects you to know the outlier rules and to apply the standard deviation formula (given for a list) to grouped data. The skewness formula is on the formulae sheet.
- Both boards: pair the median with the IQR, and the mean with the standard deviation. Do not mix them.

## 3.4.4 / 2c.01 Measures of spread

*Refs: AQA 3.4.4 (D3a) · Edexcel 2c.01. Tier: F & H (part Higher only).*

### What you need to know

- Range = largest − smallest.
- Quartiles split ordered data into four equal parts. For n values: lower quartile (LQ) is the (n + 1)/4 th value, median the (n + 1)/2 th, upper quartile (UQ) the 3(n + 1)/4 th.
- Interquartile range: IQR = UQ − LQ. It covers the middle 50% and is not affected by extremes.
- Percentiles split data into 100 parts: the 90th percentile has 90% of values below it. Read them from a cumulative frequency graph.
- (HT only) Interpercentile range, such as the 10th to 90th: the difference between two percentiles. The interdecile range is the 10th to 90th percentile range (the middle 80%).
- (HT only) Standard deviation measures the typical distance of the values from the mean.

```latex
\sigma = \sqrt{\frac{\sum (x-\bar{x})^2}{n}} = \sqrt{\frac{\sum x^2}{n} - \bar{x}^2}
```

```latex
\sigma = \sqrt{\frac{\sum f (x-\bar{x})^2}{\sum f}} = \sqrt{\frac{\sum f x^2}{\sum f} - \left(\frac{\sum fx}{\sum f}\right)^2}
```

- (HT only) For grouped data use class midpoints for x. Calculator statistics functions are allowed.

### Explained

The range uses only two values, so one extreme value changes it a lot. The IQR ignores the top and bottom quarters, so it is resistant to outliers. (HT only) The standard deviation uses every value; it is in the same units as the data, and is sensitive to outliers, like the mean.

(HT only) The interdecile range is a compromise: it covers more of the data than the IQR but still cuts off the extreme tenth at each end.

### Worked example

Data: 4, 7, 8, 10, 11, 13, 15, 18, 20, 21, 30 (n = 11).

1. Range = 30 − 4 = 26.
2. LQ: (11 + 1)/4 = 3rd value = 8. Median: 6th value = 13. UQ: 9th value = 20.
3. IQR = 20 − 8 = 12.

(Edexcel, n not one less than a multiple of 4) Data: 2, 5, 6, 9, 12, 14 (n = 6).

1. Median: 3.5th value = (6 + 9)/2 = 7.5.
2. LQ: (6 + 1)/4 = 1.75th value. A simple accepted method: take the median of the lower half (2, 5, 6) = 5. UQ: median of the upper half (9, 12, 14) = 12. IQR = 7. (Show the method you use.)

(HT only) Standard deviation of 3, 5, 6, 8, 13.

1. Mean = 35 ÷ 5 = 7.
2. Σx² = 9 + 25 + 36 + 64 + 169 = 303.
3. σ = √(303/5 − 7²) = √(60.6 − 49) = √11.6 = 3.41 (3 s.f.).

(HT only) Grouped standard deviation.

| Midpoint x | f | fx | fx² |
| --- | --- | --- | --- |
| 5 | 4 | 20 | 100 |
| 15 | 10 | 150 | 2250 |
| 25 | 6 | 150 | 3750 |
| Total | 20 | 320 | 6100 |

1. Mean = 320 ÷ 20 = 16.
2. σ = √(6100/20 − 16²) = √(305 − 256) = √49 = 7.

(HT only) Interdecile range from a cumulative frequency graph of 200 values: read across at 20 (10th percentile) and 180 (90th percentile). If these give 31 and 74, the interdecile range is 74 − 31 = 43.

### Common mistakes

- Finding quartiles without ordering the data first.
- (HT only) Forgetting to square-root, or subtracting the mean before squaring the total (Σx²/n − x̄², not (Σx − x̄)²/n).
- (HT only) Using Σx² instead of Σfx² for frequency tables.

## 3.4.5, 3.5.14 / 2c.02, 2c.03 Outliers

*Refs: AQA 3.4.5 (D3b), 3.5.14 (E5b) · Edexcel 2c.02, 2c.03. Tier: F & H (part Higher only).*

### What you need to know

- An outlier is a value that does not fit the pattern of the rest. Spot it by inspection.
- (HT only) By calculation, a value is an outlier if it is:
  - less than LQ − 1.5 × IQR or more than UQ + 1.5 × IQR, or
  - more than 3 standard deviations from the mean (outside x̄ ± 3σ).
- Comment on outliers in context: they may be genuine unusual values (keep them) or errors in recording (correct or remove them).
- On a box plot, outliers are marked with a cross and the whisker stops at the most extreme value that is not an outlier.

### Worked example

(HT only) For the data 4, 7, 8, 10, 11, 13, 15, 18, 20, 21, 30 above (LQ 8, UQ 20, IQR 12), is 30 an outlier?

1. Upper limit = 20 + 1.5 × 12 = 38. Lower limit = 8 − 18 = −10.
2. 30 < 38, so 30 is not an outlier.

(HT only) Exam marks have mean 54 and standard deviation 9. Are 82 and 26 outliers?

1. Limits: 54 ± 3 × 9 = 27 to 81.
2. 82 is above 81, so it is an outlier. 26 is below 27, so it is also an outlier.

Comment: a recorded adult height of 2.31 m in a survey of 50 people. This could be a typing error (1.31 m or 2.13 m are also unusual), so check the original record; if it is genuine, keep it but note it.

### Common mistakes

- Removing every outlier automatically. Only remove errors.
- (HT only) Adding 1.5 × IQR to the median instead of the quartile.

## 3.4.3, 3.5.13 / 2a.09, 2a.10 Skewness

*Refs: AQA 3.4.3 (D2), 3.5.13 (E5a) · Edexcel 2a.09, 2a.10. Tier: F & H (part Higher only).*

### What you need to know

- Symmetrical: mean = median = mode; median − LQ = UQ − median.
- Positive skew (tail to the right): mean > median > mode; median − LQ < UQ − median.
- Negative skew (tail to the left): mean < median < mode; median − LQ > UQ − median.
- Identify skew by inspection from diagrams or summary values, and interpret it in context.
- (HT only) Calculate skewness using the given formula:

```latex
\text{skew} = \frac{3(\text{mean} - \text{median})}{\text{standard deviation}}
```

  A positive value means positive skew, negative means negative skew, and near zero means roughly symmetrical. You are not asked to judge how strong the skew is (AQA).

### Explained

With positive skew, most values are small with a few large ones stretching the tail, so the values above the median are more spread out than those below it. Incomes are a classic example. Negative skew suits an easy test, where most people score highly and a few score low.

### Worked example

Box plot: LQ 22, median 26, UQ 40. Describe the skew.

1. Median − LQ = 4; UQ − median = 14.
2. 4 < 14, so positive skew: the upper half of the data is much more spread out.

(HT only) Data has mean 48.2, median 51.0 and standard deviation 8.4. Calculate the skewness and interpret it.

1. Skew = 3(48.2 − 51.0) ÷ 8.4 = −8.4 ÷ 8.4 = −1.
2. Negative skew: a few low values pull the mean below the median.

### Common mistakes

- Naming skew by where the peak is. Positive skew has its peak on the left and its tail on the right.

## 3.5.8 / 2c.04 Comparing data sets using spread

*Refs: AQA 3.5.8 (E3b) · Edexcel 2c.04. Tier: F & H (part Higher only).*

### What you need to know

- Compare spread using range, IQR or percentiles, and (HT only) standard deviation, calculated or given.
- Interpret in context: a smaller spread means more consistent data.

### Worked example

(HT only) Two machines fill bags of flour. Machine A: mean 1002 g, standard deviation 3.1 g. Machine B: mean 1005 g, standard deviation 7.8 g. Compare.

1. Average: B's mean is 3 g higher, so B tends to put in more flour.
2. Spread: A's standard deviation is smaller, so A's bags are more consistent in mass.

### Common mistakes

- Saying a bigger spread means "higher values". It means more variable values.

## 3.5.9 / 2c.05 Comparing samples and populations

*Refs: AQA 3.5.9 (E3c) · Edexcel 2c.05. Tier: F & H (part Higher only).*

### What you need to know

- Use median and IQR to compare samples, or a sample with its population.
- (HT only) Or use an interpercentile or interdecile range, or the mean and standard deviation.
- Always use a matching pair: median with IQR (or interpercentile range), mean with standard deviation.

### Worked example

A national survey gives the population median sleep time for teenagers as 7.6 hours with IQR 1.4 hours. A sample from one school has median 6.9 hours and IQR 2.1 hours. Compare.

1. The school's median is 0.7 hours lower, so students at this school typically sleep less than teenagers nationally.
2. The school's IQR is larger, so sleep times vary more at the school.
3. The sample is from one school, so it may not represent all teenagers.

### Common mistakes

- Pairing the mean with the IQR.
- Forgetting to mention the context or the reliability of the sample.

## Check questions

1. For 3, 6, 6, 9, 11, 14, 15, 18, 22, 25, 31 find the median, quartiles and IQR. [3 marks]
2. (HT only) Show whether 31 is an outlier in the data in question 1. [2 marks]
3. A data set has LQ 40, median 44, UQ 46. Describe the skewness and give a reason. [2 marks]
4. Explain why the IQR may be a better measure of spread than the range. [1 mark]
5. (HT only) Calculate the mean and standard deviation of 2, 4, 4, 5, 7, 8. [3 marks]
6. (HT only) Estimate the standard deviation for: midpoint 10 (frequency 3), midpoint 20 (frequency 5), midpoint 30 (frequency 2). [3 marks]
7. (HT only) A data set has mean 62, median 58 and standard deviation 10. Calculate the skewness using 3(mean − median) ÷ standard deviation, and interpret it. [2 marks]
8. (HT only) Daily sales have mean 140 and standard deviation 15. Find the limits outside which a day's sales would count as an outlier. [2 marks]
9. Class X test scores: median 64, IQR 10. Class Y: median 58, IQR 22. Compare the two classes. [2 marks]

## Mark scheme

1. Median 6th value = 14 (1); LQ 3rd = 6, UQ 9th = 22 (1); IQR 16 (1).
2. UQ + 1.5 × IQR = 22 + 24 = 46 (1); 31 < 46 so not an outlier (1).
3. Median − LQ = 4 > UQ − median = 2 (1), so negative skew (1).
4. The IQR is not affected by extreme values / outliers (1).
5. Mean 30 ÷ 6 = 5 (1); Σx² = 4 + 16 + 16 + 25 + 49 + 64 = 174 (1); σ = √(29 − 25) = 2 (1).
6. Σf = 10, Σfx = 30 + 100 + 60 = 190, mean 19 (1); Σfx² = 300 + 2000 + 1800 = 4100 (1); σ = √(410 − 361) = 7 (1).
7. 3 × 4 ÷ 10 = 1.2 (1); positive skew: a few high values pull the mean above the median (1).
8. 140 ± 3 × 15 (1): below 95 or above 185 (1).
9. Class X has the higher median, so scored better on average (1); Class X has the smaller IQR, so its scores were more consistent (1).
