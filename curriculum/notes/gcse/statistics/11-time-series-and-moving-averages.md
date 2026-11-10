---
level: GCSE
subject: Statistics
topic: "Time series and moving averages"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8382"
    spec_refs: ["3.3.3", "3.4.1", "3.4.6", "3.5.15"]
  - board: Edexcel
    code: "1ST0"
    spec_refs: ["2a.03", "2b.01", "2f.01", "2f.02"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/statistics/gcse/statistics-8382/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/past-papers/gcse-statistics/
---

# Time series and moving averages

This file covers time series graphs, trends, seasonal and cyclic variation, 4-point and (Higher) other moving averages, trend lines, and (Higher) mean seasonal variation and using it to make predictions.

## Overview

On both tiers: drawing and reading time series graphs, trends by inspection, 4-point moving averages, trend lines, interpreting seasonal and cyclic patterns. (HT only) Choosing other moving averages (such as 3-point, 5-point or 7-point), mean seasonal variation, and predictions.

### Board differences

- AQA 8382: time series graphs are in 3.3.3 (C2); trends and moving averages in 3.4.6 (D4); mean seasonal variation in 3.4.1 (D1a, Higher); seasonal and cyclic trends in 3.5.15 (E6), with predictions Higher only.
- Edexcel 1ST0: time series graphs in 2a.03; mean seasonal variation in 2b.01 (Higher); trends and moving averages in 2f.01; seasonal and cyclic trends in 2f.02, with predictions using the average seasonal effect Higher only. Edexcel expects you to interpret the gradient of a trend line and to know the dangers of extrapolation.
- The topics, tiers and methods are the same on both boards.

## 3.4.6 / 2f.01 Trends and moving averages

*Refs: AQA 3.3.3 (C2), 3.4.6 (D4) · Edexcel 2a.03, 2f.01. Tier: F & H (part Higher only).*

### What you need to know

- A time series is data recorded at regular intervals (monthly, quarterly, yearly). Plot time on the x-axis and join points with straight lines.
- The trend is the general direction over time (rising, falling, steady). Identify it by inspection.
- A moving average smooths out the ups and downs of a repeating pattern to show the trend. A 4-point moving average suits quarterly data (4 quarters in a year).
- Plot each moving average at the middle of the time points it covers.
- Draw a trend line by eye through the moving averages, and interpret its gradient (the change per time period).
- (HT only) Choose a moving average whose length matches the length of the repeating cycle (3 for termly data, 7 for daily data with a weekly pattern, 12 for monthly data with a yearly pattern).

### Explained

A 4-point moving average for quarters Q1 to Q4 covers one whole year, so each season appears once and the seasonal ups and downs cancel out. Then move along one quarter: Q2 to Q1 of the next year, and so on.

The middle of Q1 to Q4 is halfway between Q2 and Q3, so plot it there. (HT only) An odd-length moving average (3, 5, 7) is plotted at the middle time point exactly.

### Worked example

A shop's sales (£000s) by quarter:

| | Q1 | Q2 | Q3 | Q4 |
| --- | --- | --- | --- | --- |
| 2023 | 30 | 42 | 51 | 37 |
| 2024 | 34 | 46 | 55 | 41 |

Find the 4-point moving averages.

1. (30 + 42 + 51 + 37) ÷ 4 = 160 ÷ 4 = 40.
2. (42 + 51 + 37 + 34) ÷ 4 = 164 ÷ 4 = 41.
3. (51 + 37 + 34 + 46) ÷ 4 = 168 ÷ 4 = 42.
4. (37 + 34 + 46 + 55) ÷ 4 = 172 ÷ 4 = 43.
5. (34 + 46 + 55 + 41) ÷ 4 = 176 ÷ 4 = 44.
6. Plot 40 between 2023 Q2 and Q3, 41 between Q3 and Q4, and so on.
7. The moving averages rise by £1000 each quarter: an upward trend. The gradient of the trend line is about +1 (£1000 per quarter).

Quick check: each new moving average = previous + (new value − value dropped) ÷ 4. For example, 40 + (34 − 30) ÷ 4 = 41.

(HT only) 3-point moving averages for termly attendance data 92, 88, 95, 93, 89, 96:

1. (92 + 88 + 95) ÷ 3 = 91.67; (88 + 95 + 93) ÷ 3 = 92; (95 + 93 + 89) ÷ 3 = 92.33; (93 + 89 + 96) ÷ 3 = 92.67.
2. Each is plotted at the middle term of its three.

### Common mistakes

- Plotting a 4-point moving average at the third or fourth point instead of between the second and third.
- Drawing the trend line through the original data instead of the moving averages.
- Using a 4-point moving average for data with a 3-term cycle.

## 3.5.15 / 2f.02 Seasonal and cyclic variation and predictions

*Refs: AQA 3.4.1 (D1a), 3.5.15 (E6) · Edexcel 2b.01, 2f.02. Tier: F & H (part Higher only).*

### What you need to know

- Seasonal variation: a pattern that repeats over a fixed period, such as each year (ice cream sales high in summer).
- Cyclic variation: longer up-and-down patterns that do not have a fixed period, such as an economy's cycles of growth and recession.
- Interpret seasonal and cyclic patterns in context.
- (HT only) Seasonal variation for one time point = actual value − trend value (read from the trend line or moving average).
- (HT only) Mean seasonal variation for a season = mean of the seasonal variations for that season over the years.
- (HT only) Prediction = trend value read from the extended trend line + mean seasonal variation.
- (HT only) Predictions rely on extrapolating the trend, so they become less reliable the further ahead you go.

### Explained

(HT only) The trend says where the series is heading; the mean seasonal variation says how much a particular season is usually above or below the trend. Adding the two gives a forecast for a particular future season.

### Worked example

(HT only) Using the shop data above. Read from the trend line: 2023 Q3 trend = 40.5 and 2024 Q3 trend = 44.5 (the line through the moving averages rises by 1 per quarter).

1. Seasonal variation for Q3 2023 = 51 − 40.5 = 10.5.
2. Seasonal variation for Q3 2024 = 55 − 44.5 = 10.5.
3. Mean seasonal variation for Q3 = (10.5 + 10.5) ÷ 2 = 10.5.
4. Extend the trend line to 2025 Q3: 44.5 + 4 × 1 = 48.5.
5. Prediction for 2025 Q3 = 48.5 + 10.5 = 59, so about £59 000.

(HT only) A second example with negative variation. A café's winter quarter sales have seasonal variations −8.2, −7.6 and −9.0 over three years. The trend for next winter is predicted to be 62.

1. Mean seasonal variation = (−8.2 − 7.6 − 9.0) ÷ 3 = −8.27.
2. Prediction = 62 − 8.27 = 53.7.

### Common mistakes

- (HT only) Subtracting the wrong way: seasonal variation is actual minus trend.
- (HT only) Forgetting to add the (possibly negative) mean seasonal variation to the trend value.
- Calling any up-and-down pattern "seasonal" when its period is not fixed.

## Check questions

1. Explain why a 4-point moving average is used for quarterly data. [1 mark]
2. Quarterly visitors (hundreds) to a museum: 12, 20, 25, 15, 14, 22, 27, 17. Calculate all the 4-point moving averages. [3 marks]
3. Describe the trend shown by your answer to question 2. [1 mark]
4. Where should the first moving average in question 2 be plotted? [1 mark]
5. (HT only) Daily cinema ticket sales show a weekly pattern. What length of moving average should be used? Explain why. [2 marks]
6. (HT only) In question 2, the trend value for Q2 of the first year is 17.5 and for Q2 of the second year is 19.5. Find the mean seasonal variation for Q2. [2 marks]
7. (HT only) The trend for Q2 of the third year is predicted to be 21.5. Use your answer to question 6 to predict the number of visitors. [1 mark]
8. (HT only) Give one reason why your prediction may not be reliable. [1 mark]

## Mark scheme

1. Each average covers one full year, so the seasonal effect is removed (1).
2. 18, 18.5, 19, 19.5, 20 (1 for first, 1 for at least three correct, 1 for all five).
3. Increasing by about 50 visitors (0.5 hundred) per quarter (1).
4. Halfway between the second and third quarters of the first year (1).
5. 7-point (1), because the pattern repeats every 7 days (1).
6. Q2 variations: 20 − 17.5 = 2.5 and 22 − 19.5 = 2.5 (1); mean 2.5 (1).
7. 21.5 + 2.5 = 24, i.e. 2400 visitors (1).
8. It uses extrapolation; the trend or seasonal pattern may change (e.g. a new exhibition, closures) (1).
