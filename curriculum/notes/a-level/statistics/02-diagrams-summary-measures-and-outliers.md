---
level: A-level
subject: Statistics
topic: "Diagrams, published visualisations, summary measures, outliers and technology"
boards:
  - board: Edexcel
    code: "9ST0"
    spec_refs: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "SEC C1", "SEC C2", "SEC C3", "App4"]
refs_checked: false
spec_url: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/a-level-statistics/
---

# Diagrams, summary measures, outliers and technology

This file covers interpreting statistical diagrams (including published and multivariate visualisations), what makes a representation fair or misleading, comparing data sets with measures of location and spread, calculating those measures, outliers and their causes, and the language of spreadsheets, databases and graph-plotting software.

## Overview

How to read each diagram, and how to calculate the mean, median, quartiles, variance and standard deviation, are written up in [A-level Maths 20](../maths/20-data-presentation-and-interpretation.md); GCSE-level construction is in [GCSE Statistics 05](../../gcse/statistics/05-tables-and-pictorial-representations.md), [06](../../gcse/statistics/06-graphs-histograms-and-cumulative-frequency.md), [07](../../gcse/statistics/07-averages.md) and [08](../../gcse/statistics/08-spread-outliers-and-skewness.md). A-level Statistics adds three things: you are never asked to draw a diagram, only to read, judge and criticise one; diagrams may show several variables at once (multivariate data); and you must explain where an outlier came from, not just find it.

### Board differences

- Edexcel 9ST0 topic 1 (1.1 to 1.8) is on Paper 1. Appendix 4 lists the spreadsheet, database and software language you may meet on any paper.
- The diagrams that may appear are: bar charts, pie charts (assumed knowledge), stem and leaf diagrams, box plots, cumulative frequency diagrams, histograms with equal or unequal classes, time series (with trend lines) and scatter diagrams (with regression lines). No other visualisation types are set, apart from published tables.
- Edexcel's outlier rules to learn: below LQ − 1.5 × IQR or above UQ + 1.5 × IQR, or outside μ ± 3σ. A question will say which to use.

## 1.1 Interpreting statistical diagrams

*Refs: Edexcel 1.1. Paper 1.*

### What you need to know

- Read and interpret bar charts, stem and leaf diagrams, box plots, cumulative frequency diagrams, histograms (equal or unequal class widths), time series and scatter diagrams.
- Comment on the main features of published visualisations, including those showing multivariate data (three or more variables, often using colour, symbol shape or panels for the extra variables).
- In a histogram, area is proportional to frequency; the height is the frequency density.

```latex
\text{frequency density} = \frac{\text{frequency}}{\text{class width}}
```

### Explained

**Main features.** For one variable, comment on location (where the centre is), spread, shape (symmetric, positive or negative skew, one or two peaks) and unusual values. For a time series, comment on trend, seasonal pattern and any one-off spikes. For a scatter diagram, comment on direction, strength, whether the pattern is linear, and any clusters or outliers.

**Multivariate visualisations.** A scatter diagram of petal length against petal width with points coloured by species shows three variables. Look for whether the groups form separate clusters, whether the relationship has the same direction in each group, and whether one group is much more spread out. A pattern in the whole data set can disappear or reverse within groups, so always look at the groups as well as the whole.

### Worked example

A histogram shows journey times (minutes) with classes 0–10, 10–20, 20–30, 30–50 and 50–90 and frequency densities 0.8, 1.4, 1.0, 0.3 and 0.05. Find the frequencies, the total, an estimate of the mean, and describe the shape.

1. Frequency = density × width: 0.8 × 10 = 8, 1.4 × 10 = 14, 1.0 × 10 = 10, 0.3 × 20 = 6, 0.05 × 40 = 2. Total 40.
2. Midpoints 5, 15, 25, 40, 70.

```latex
\bar{x} = \frac{\sum f x}{\sum f} = \frac{8(5) + 14(15) + 10(25) + 6(40) + 2(70)}{40} = \frac{880}{40} = 22.0 \text{ minutes}
```

3. The modal class is 10–20 and the tail stretches far to the right, so the distribution is positively skewed.

### Common mistakes

- Reading the height of an unequal-width histogram bar as the frequency.
- Describing a multivariate plot as if it were one group, missing that the groups behave differently.

## 1.2 Features of an appropriate representation

*Refs: Edexcel 1.2. Paper 1.*

### What you need to know

- A fair diagram has: a title, labelled axes with units, a scale that starts at zero for bar heights (or a clear axis break), equal intervals on each axis, a key for colours or symbols, and the same scale when two diagrams are compared.
- Misrepresentation happens through truncated axes, unequal scales, 3D effects that distort size, pictograms scaled by length instead of area, missing data, cherry-picked time windows, and pie charts with too many or overlapping categories.

### Explained

The eye judges a bar by its length and a picture by its area. If an axis starts at 90 instead of 0, a bar of 95 looks twice the height of a bar of 92.5 even though the values differ by under 3%. If a coin picture is doubled in width and height to show a value doubled, its area quadruples, so the increase looks four times as big.

### Worked example

A bar chart shows sales of 92 and 98 thousand units, with the vertical axis starting at 90. By what factor does the second bar appear larger, and by what factor is it actually larger?

1. Visible heights: 92 − 90 = 2 and 98 − 90 = 8, so it looks 8 ÷ 2 = 4 times larger.
2. Actual ratio: 98 ÷ 92 ≈ 1.07, so only about 7% larger.

### Common mistakes

- Saying a diagram is misleading without naming the feature and its effect.

## 1.3 Justifying a representation and commenting on published ones

*Refs: Edexcel 1.3. Paper 1.*

### What you need to know

- Choose the diagram that suits the data type and purpose, and give a reason.
- Comment critically on published diagrams: what they show well, what they hide, and how they could mislead.

### Explained

| Purpose | Suitable | Why |
| --- | --- | --- |
| compare two distributions of a numerical variable | back-to-back box plots or stem and leaf | shows median, spread and skew side by side |
| show raw values in a small data set | stem and leaf | keeps every value |
| grouped continuous data with unequal classes | histogram | area keeps frequencies fair |
| estimate median and percentiles from grouped data | cumulative frequency | quartiles and percentiles read directly |
| change over time | time series | shows trend and seasonality |
| relationship between two numerical variables | scatter diagram | shows direction, strength and form |
| proportions of a whole | pie chart or bar chart | bar chart is easier to compare |

A box plot hides the number of values and any gaps or second peak; a histogram hides individual values; a pie chart hides totals.

### Worked example

A report shows the ages of 2,000 festival-goers in a pie chart with 15 age groups. Suggest a better diagram and justify it.

1. Age is continuous and grouped, and 15 sectors are hard to compare.
2. A histogram (with frequency density if the groups have unequal widths) shows the shape of the age distribution, and a cumulative frequency diagram would let the organiser read off the median and the percentage under 18.

### Common mistakes

- Recommending a pie chart for continuous data or for comparing two large data sets.

## 1.4 and 1.5 Comparing data sets and calculating measures

*Refs: Edexcel 1.4, 1.5. Paper 1.*

### What you need to know

- Compare data sets with a measure of location (mean, median, mode) and a measure of spread (range, IQR, percentiles, variance, standard deviation), always in context.
- From raw data, get the mean, variance and standard deviation directly from a calculator. Know when to use the population formula (divide by N) and the sample formula (divide by n − 1); the formulae booklet gives both.

```latex
\sigma^2 = \frac{\sum x^2}{N} - \mu^2, \qquad s^2 = \frac{1}{n-1}\left(\sum x^2 - \frac{(\sum x)^2}{n}\right)
```

- For grouped data, use midpoints; the results are estimates.

### Explained

Use σ when the data are the whole population and you want to describe it. Use s when the data are a sample and you want to estimate the population's spread; dividing by n − 1 makes s² an unbiased estimator of σ² (see [09-hypothesis-testing-principles-and-one-sample-tests.md](09-hypothesis-testing-principles-and-one-sample-tests.md)). On a calculator, σx (or σn) is the divisor-n value and sx (or σn−1) is the divisor-(n − 1) value.

A comparison needs two sentences: one on location, one on spread, each with numbers and context. "On average Route B is quicker (median 19 min against 22 min), but its times are more variable (IQR 11 min against 6 min), so Route A is more reliable."

### Worked example

Ten commuting times (minutes): 12, 15, 18, 18, 21, 22, 25, 27, 30, 52. Find the mean, median, quartiles, and both the population and sample standard deviation.

1. Σx = 240, so the mean is 24.0 minutes.
2. Median: average of the 5th and 6th values = (21 + 22) ÷ 2 = 21.5.
3. LQ: 10 ÷ 4 = 2.5, round up to the 3rd value = 18. UQ: 30 ÷ 4 = 7.5, round up to the 8th value = 27. IQR = 9.
4. Σx² = 6900.

```latex
\sigma = \sqrt{\frac{6900}{10} - 24^2} = \sqrt{114} = 10.68, \qquad s = \sqrt{\frac{6900 - 240^2/10}{9}} = \sqrt{126.67} = 11.25
```

5. The mean (24.0) is above the median (21.5) because of the long journey of 52 minutes; the data are positively skewed, so the median and IQR describe a typical journey better.

### Common mistakes

- Using σ when the question gives a sample and asks for an estimate of the population standard deviation.
- Comparing only averages and forgetting spread.
- Writing "the range is higher" without saying what that means in context.

## 1.6 and 1.7 Outliers: finding them and explaining them

*Refs: Edexcel 1.6, 1.7. Paper 1.*

### What you need to know

- Identify outliers by inspection (a value far from the rest on a diagram) and by calculation:

```latex
x < Q_1 - 1.5 \times \text{IQR} \quad \text{or} \quad x > Q_3 + 1.5 \times \text{IQR}, \qquad \text{or } x \text{ outside } \mu \pm 3\sigma
```

- Decide the nature of an outlier by thinking about the population and how the data were collected: a recording or measuring error (remove or correct it), a value from a different population (exclude it and say why), or a genuine extreme value (keep it, and perhaps use resistant measures).

### Explained

An outlier is a question, not a mistake. A height of 17.5 m in a survey of trees might be real; a height of 175 m is almost certainly a typing error. A rainfall reading of 0 mm in a wet month might be a broken gauge. A very high income in a sample of nurses may belong to someone who is also a company director, so is a genuine value but perhaps from outside the intended population. Never delete a value just because it is an outlier; state the reason.

The two rules can disagree: the IQR rule ignores extreme values when setting the fences, while μ ± 3σ uses a mean and standard deviation that the outlier itself inflates.

### Worked example

For the commuting times in 1.4 (LQ 18, UQ 27, μ = 24.0, σ = 10.68), test 52 with both rules and comment.

1. IQR rule: upper fence = 27 + 1.5 × 9 = 40.5. Since 52 > 40.5, it is an outlier.
2. 3σ rule: 24.0 + 3 × 10.68 = 56.0. Since 52 < 56.0, it is not an outlier by this rule.
3. The 52 inflates σ, which widens the 3σ fence. Without it, the other nine values have mean 20.9 and s = 5.8, and 52 would be far outside 20.9 ± 3 × 5.8 = (3.5, 38.3).
4. Nature: a 52-minute commute is plausible (a train delay or a different route), so keep it unless there is evidence of an error, and report the median and IQR.

### Common mistakes

- Using 1.5 × IQR added to the median instead of to the upper quartile.
- Removing an outlier without giving a reason linked to the context.

## 1.8 Misrepresentation out of context or through misleading visualisation

*Refs: Edexcel 1.8, SEC C3. Paper 1.*

### What you need to know

- Data can mislead when taken out of context: totals instead of rates, a short or selected time window, missing comparisons, or changes in definitions.
- Visual tricks (truncated axes, area distortion, dual axes with different scales) can exaggerate or hide a pattern.

### Explained

"Cycle accidents doubled in our city" may be true while the number of cyclists tripled, so the accident rate per cyclist fell. Always ask "per what?" and "compared with what?". A graph showing only the last three months may hide that the long-term trend is the opposite.

### Worked example

Town A had 30 burglaries in 2024 and 45 in 2025. Town B had 300 and 330. A leaflet says "Town A's burglary problem is growing far faster". The populations are 6,000 (A) and 120,000 (B). Comment.

1. Percentage increase: A, 15 ÷ 30 = 50%; B, 30 ÷ 300 = 10%. The leaflet's claim is true for percentage change.
2. Rates per 1,000 people in 2025: A, 45 ÷ 6 = 7.5; B, 330 ÷ 120 = 2.75. A does have a higher rate.
3. But A's numbers are small, so a change of 15 could be chance; one year's data is too short a window to call a trend.

### Common mistakes

- Comparing totals between groups of very different sizes.

## App4 and SEC C1, C2 Technology: calculators, spreadsheets, databases and software output

*Refs: Edexcel App4, SEC C1, SEC C2. All papers.*

### What you need to know

- Calculators: summary statistics (mean, standard deviations, regression and correlation coefficients) and probabilities from binomial, Poisson and normal distributions.
- Spreadsheets: filter, sort, functions that count or sum (COUNT, SUM, COUNTIF), and functions for averages and spread (AVERAGE, MEDIAN, STDEV).
- Databases: a record is one row (one item or person); a field is one column (one variable). Filter, sort, and write a query that groups by a field, counts or sums another field, and joins two tables on a shared field.
- Graph-plotting software: read the outputs listed in 1.1 and common abbreviations such as df (degrees of freedom), SE (standard error), Coef (coefficient), N (sample size), StDev and p.

### Explained

**Filter versus sort.** Sorting reorders all records; filtering hides records that do not meet a condition. Neither changes the data.

**Query by grouping.** "Group by Region, count Customer_ID" returns one row per region with the number of customers in it. "Group by Region, sum Spend" gives total spend per region.

**Join.** If a Sales table has fields Shop_ID and Amount, and a Shops table has Shop_ID and Town, joining on Shop_ID lets you total Amount by Town.

### Worked example

A database table Results has fields Student_ID, Subject and Mark, with 1,200 records. A second table Students has Student_ID, Year and Gender. Describe how to find the mean Statistics mark for each year group.

1. Join Results to Students on Student_ID, so each record has a Year.
2. Filter Subject = "Statistics".
3. Group by Year and use an average function on Mark.
4. The output is one row per year group with its mean mark.

### Common mistakes

- Confusing a field (a variable) with a record (one case).
- Taking every value from a software output instead of the one the question needs.

## Check questions

1. A histogram of masses has a bar for 40–60 g of height 1.8 and a bar for 60–65 g of height 6.0. Which class has more items, and by how many? [3 marks]
2. A scatter diagram shows price against age for 60 used cars, coloured by three makes. Give two things to look for in the diagram. [2 marks]
3. A bar chart compares two exam pass rates, 81% and 84%, with the axis starting at 78%. Explain how it misleads. [2 marks]
4. Eight weights (kg) are 3.2, 3.5, 3.6, 3.6, 3.8, 4.0, 4.1, 5.9. Find the median, the quartiles and test 5.9 for being an outlier with the IQR rule. [4 marks]
5. For the data in question 4, find the mean and the sample standard deviation s, and test 5.9 with the μ ± 3σ rule using these estimates. [4 marks]
6. The weights in question 4 are of newborn babies. Discuss whether 5.9 kg should be removed. [2 marks]
7. Give a reason why a box plot might be a poor choice to show 15 values that form two clear clusters. [1 mark]
8. A table Orders has fields Order_ID, Customer_ID, Date, Value. Describe a query to find the total value of orders for each customer. [2 marks]

## Mark scheme

1. 40–60: 1.8 × 20 = 36 (1); 60–65: 6.0 × 5 = 30 (1); 40–60 has 6 more (1).
2. Any two: whether makes form separate clusters; whether price falls with age in each make; differences in gradient or spread between makes; outliers (2).
3. Visible bar heights 3 and 6 suggest one rate is double the other (1), but 84 ÷ 81 ≈ 1.04, only about 4% higher (1).
4. Median = (3.6 + 3.8) ÷ 2 = 3.7 (1); LQ = (3.5 + 3.6) ÷ 2 = 3.55, UQ = (4.0 + 4.1) ÷ 2 = 4.05 (1); fence 4.05 + 1.5 × 0.5 = 4.8 (1); 5.9 > 4.8 so outlier (1).
5. Mean = 31.7 ÷ 8 = 3.9625 (1); s = 0.8331 (1); 3.9625 + 3 × 0.8331 = 6.46 (1); 5.9 < 6.46, not an outlier by this rule (1).
6. 5.9 kg is heavy but possible for a newborn (1), so it is likely a genuine value and should be kept unless there is evidence of a recording error (1).
7. A box plot shows only five summary values, so the two clusters (gap in the middle) are hidden (1).
8. Group by Customer_ID (1) and sum Value (1).
