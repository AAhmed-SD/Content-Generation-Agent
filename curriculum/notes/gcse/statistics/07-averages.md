---
level: GCSE
subject: Statistics
topic: "Averages"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8382"
    spec_refs: ["3.4.1", "3.4.2", "3.5.7"]
  - board: Edexcel
    code: "1ST0"
    spec_refs: ["2b.01", "2b.02", "2b.03"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/statistics/gcse/statistics-8382/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/past-papers/gcse-statistics/
---

# Averages

This file covers the mode, median and mean of lists, frequency tables and grouped data (including the median by linear interpolation), the effect of changing or transforming data, (Higher) weighted and geometric means, choosing the right average, and comparing data sets using averages. Mean seasonal variation is in file 11.

## Overview

Mode, median and arithmetic mean, choosing an average and comparing averages are on both tiers. (HT only) Weighted mean, geometric mean and mean seasonal variation; on Edexcel, (HT only) grouped data with unequal class widths.

### Board differences

- AQA 8382: 3.4.1 (D1a) calculate averages, 3.4.2 (D1b) choose an average (including when a geometric mean is more useful), 3.5.7 (E3a) compare data sets using averages. AQA uses "modal group".
- Edexcel 1ST0: 2b.01 calculate (including linear interpolation for the median of grouped data, the effect of adding or removing a value, and the effect of scaling and translating data), 2b.02 choose, 2b.03 compare. Edexcel uses "modal class".
- On both boards "mean" means the arithmetic mean unless "geometric" is stated.

## 3.4.1 / 2b.01 Mode, median and mean

*Refs: AQA 3.4.1 (D1a) · Edexcel 2b.01. Tier: F & H.*

### What you need to know

- Mode: the most common value. For grouped data, the modal class (group) has the highest frequency.
- Median: the middle value when the data is in order; for n values it is the (n + 1)/2 th value.
- Mean: total of the values ÷ number of values.

```latex
\bar{x} = \frac{\sum x}{n} \qquad \bar{x} = \frac{\sum fx}{\sum f}
```

- For grouped data, estimate the mean using class midpoints.
- For grouped data, estimate the median by reading a cumulative frequency graph or by linear interpolation.
- Know how the averages change when a value is added or removed, and when every value is scaled (multiplied) or translated (added to).

### Explained

Frequency table (discrete): multiply each value by its frequency, add, and divide by the total frequency. The median is found by counting through the cumulative frequencies to the (n + 1)/2 th value.

Grouped data: the exact values are unknown, so use the midpoint of each class as a stand-in. The answer is an estimate.

Median by linear interpolation: find the class containing the n/2 th value, then assume the values in that class are spread evenly:

```latex
\text{median} \approx L + \frac{\frac{n}{2} - F}{f} \times w
```

where L is the lower boundary of the median class, F the cumulative frequency before it, f its frequency and w its width.

Transformations: if every value has k added, the mean, median and mode all increase by k (the spread does not change). If every value is multiplied by k, all three averages are multiplied by k.

Adding or removing a value:

- The mean changes unless the value equals the mean. New mean = (old total ± value) ÷ new n.
- The median may shift to a neighbouring value.

### Worked example

Discrete frequency table. Number of pets owned by 30 students:

| Pets x | 0 | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- | --- |
| Frequency f | 7 | 11 | 6 | 4 | 2 |

1. Mode: 1 (frequency 11).
2. Median: (30 + 1)/2 = 15.5th value. Cumulative: 7, 18, … so the 15th and 16th values are both 1. Median = 1.
3. Mean: Σfx = 0 + 11 + 12 + 12 + 8 = 43. Mean = 43 ÷ 30 = 1.43 (2 d.p.).

Grouped data. Journey times of 50 commuters:

| Time t (min) | Frequency | Midpoint | f × midpoint |
| --- | --- | --- | --- |
| 0 < t ≤ 10 | 8 | 5 | 40 |
| 10 < t ≤ 20 | 17 | 15 | 255 |
| 20 < t ≤ 30 | 15 | 25 | 375 |
| 30 < t ≤ 40 | 10 | 35 | 350 |

1. Estimated mean = 1020 ÷ 50 = 20.4 min.
2. Modal class: 10 < t ≤ 20.
3. Median: n/2 = 25. Cumulative frequencies 8, 25, 40, 50. The 25th value is at the top of the 10–20 class: median ≈ 10 + (25 − 8)/17 × 10 = 20 min.

Effect of change: the mean mass of 12 parcels is 3.5 kg. One parcel of 6.1 kg is removed. Find the new mean.

1. Old total = 12 × 3.5 = 42 kg.
2. New total = 42 − 6.1 = 35.9 kg; new n = 11.
3. New mean = 35.9 ÷ 11 = 3.26 kg (3 s.f.).

Transformation: temperatures in °C have mean 15. Find the mean in °F, using F = 1.8C + 32.

1. Mean °F = 1.8 × 15 + 32 = 59 °F.

### Common mistakes

- Dividing Σfx by the number of rows instead of Σf.
- Using class boundaries instead of midpoints for the estimated mean.
- Giving the median of a frequency table as the middle frequency.
- Saying the mean of grouped data is exact.

## 3.4.1 / 2b.01 Weighted mean and geometric mean

*Refs: AQA 3.4.1 (D1a) · Edexcel 2b.01. Tier: Higher only (this part).*

### What you need to know

- (HT only) Weighted mean: each value counts according to its weight:

```latex
\text{weighted mean} = \frac{\sum wx}{\sum w}
```

- (HT only) Geometric mean of n positive values: the nth root of their product:

```latex
\text{geometric mean} = \sqrt[n]{x_1 \times x_2 \times \cdots \times x_n}
```

- (HT only) The geometric mean is the right average for rates of growth and percentage changes that multiply together.

### Explained

(HT only) Weighted means are used when some parts matter more: course marks where the exam counts more than coursework, or an index where food is a bigger share of spending than clothes (file 09).

(HT only) If an investment grows by multipliers 1.10, 1.30 and 0.90 over three years, the overall multiplier is the product 1.287. The average yearly multiplier m must satisfy m³ = 1.287, so m is the geometric mean. The arithmetic mean of the multipliers (1.10) would give 1.10³ = 1.331, which is too high.

### Worked example

(HT only) A student scores 64 in coursework (weight 2), 72 in a test (weight 3) and 58 in an exam (weight 5). Find the weighted mean.

1. Σwx = 2 × 64 + 3 × 72 + 5 × 58 = 128 + 216 + 290 = 634.
2. Σw = 10.
3. Weighted mean = 63.4.

(HT only) A town's population grew by 8%, then 2%, then 15% over three years. Find the average annual percentage growth.

1. Multipliers: 1.08, 1.02, 1.15.
2. Product = 1.26684.
3. Geometric mean = ∛1.26684 = 1.0820 (4 d.p.).
4. Average growth ≈ 8.2% per year.

### Common mistakes

- (HT only) Taking the geometric mean of the percentages (8, 2, 15) instead of the multipliers.
- (HT only) Dividing by the number of values instead of the total weight.

## 3.4.2 / 2b.02 Choosing an average

*Refs: AQA 3.4.2 (D1b) · Edexcel 2b.02. Tier: F & H.*

### What you need to know

- Justify the choice of average in context.

### Explained

| Average | Use when | Drawback |
| --- | --- | --- |
| Mode | Data is categorical, or you need the most popular item (shoe sizes to stock) | May not exist or there may be several; ignores most data |
| Median | Data is skewed or has outliers (incomes, house prices) | Ignores the actual size of most values |
| Mean | Data is fairly symmetrical with no outliers; you want every value used; you need it for standard deviation | Distorted by outliers |
| Geometric mean (HT only) | Averaging growth rates or ratios | Only for positive values |

### Worked example

Salaries at a small firm (£000s): 21, 22, 22, 24, 25, 27, 95. Which average best represents a typical salary?

1. Mean = 236 ÷ 7 = 33.7 (£33 700), which is above six of the seven salaries because of 95.
2. Median = 24 (£24 000).
3. The median is better because the data contains an outlier (the 95) that pulls the mean up.

### Common mistakes

- Saying "the mean is most accurate" without considering outliers.

## 3.5.7 / 2b.03 Comparing data sets using averages

*Refs: AQA 3.5.7 (E3a) · Edexcel 2b.03. Tier: F & H.*

### What you need to know

- Compare data sets using a suitable average (mode, modal class, median or mean), calculated or given (for example, from software output).
- Comparisons must be in context.

### Explained

A full comparison names the average, says which is higher, and says what that means in the context: "The median time for Group A (14.2 s) is higher than for Group B (12.8 s), so Group A were generally slower." Usually it is paired with a comparison of spread (file 08).

### Worked example

Software gives these summaries of daily rainfall (mm) in two towns in March: Town P mean 3.4, median 1.2; Town Q mean 2.9, median 2.5. Compare typical rainfall.

1. The means and medians differ a lot in Town P, suggesting a few very wet days (positive skew), so the median is the better comparison.
2. Town Q's median (2.5 mm) is higher than Town P's (1.2 mm), so on a typical day Town Q had more rain, even though Town P's mean is higher.

### Common mistakes

- Comparing numbers without saying what they mean for the context.

## Check questions

1. Find the mean, median and mode of: 7, 3, 9, 3, 12, 6, 8, 3, 10. [3 marks]
2. A frequency table shows goals scored in 40 matches: 0 goals (9), 1 (14), 2 (10), 3 (5), 4 (2). Find the mean and the median. [4 marks]
3. Estimate the mean for: 0 < m ≤ 4 (frequency 5), 4 < m ≤ 8 (12), 8 < m ≤ 12 (18), 12 < m ≤ 20 (5). [3 marks]
4. Use linear interpolation to estimate the median for the data in question 3. [2 marks]
5. The mean of 9 numbers is 14. A tenth number, 24, is added. Find the new mean. [2 marks]
6. Every value in a data set is multiplied by 3 and then 5 is added. The old median was 8. Find the new median. [1 mark]
7. (HT only) A shop's sales rose by 12% one year and fell by 4% the next. Find the geometric mean of the yearly multipliers, and hence the average yearly percentage change. [3 marks]
8. (HT only) A judge's scores carry weights 1, 1, 2: scores 7.5, 8.0 and 6.5. Find the weighted mean. [2 marks]
9. Explain why the median might be a better average than the mean for house prices. [1 mark]

## Mark scheme

1. Mean 61 ÷ 9 = 6.78 (1); median: ordered 3, 3, 3, 6, 7, 8, 9, 10, 12 so 7 (1); mode 3 (1).
2. Σfx = 0 + 14 + 20 + 15 + 8 = 57 (1); mean 57 ÷ 40 = 1.425 (1). Median is between the 20th and 21st values (1); both are 1, so median 1 (1).
3. Midpoints 2, 6, 10, 16 (1); Σfx = 10 + 72 + 180 + 80 = 342 (1); 342 ÷ 40 = 8.55 (1).
4. n/2 = 20; median class 8–12, CF before = 17 (1); 8 + (20 − 17)/18 × 4 = 8.67 (1).
5. Total 9 × 14 + 24 = 150 (1); 150 ÷ 10 = 15 (1).
6. 3 × 8 + 5 = 29 (1).
7. 1.12 × 0.96 = 1.0752 (1); √1.0752 = 1.0369 (1); about 3.7% increase per year (1).
8. (7.5 + 8.0 + 2 × 6.5) ÷ 4 (1) = 28.5 ÷ 4 = 7.125 (1).
9. House prices are skewed by a few very expensive houses, which raise the mean; the median is not affected by them (1).
