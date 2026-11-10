---
level: GCSE
subject: Statistics
topic: "Types of data"
tiers: Foundation and Higher (Higher-only content is tagged (HT only))
boards:
  - board: AQA
    code: "8382"
    spec_refs: ["3.2.1", "3.2.2", "3.2.3", "3.2.4"]
  - board: Edexcel
    code: "1ST0"
    spec_refs: ["1b.01", "1b.02", "1b.03", "1b.04"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/statistics/gcse/statistics-8382/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/past-papers/gcse-statistics/
---

# Types of data

This file covers the words used to describe data, grouping data into classes, explanatory and response variables, and primary and secondary data.

## Overview

All on both tiers except the term "multivariate", which is Higher only.

### Board differences

- AQA 8382: 3.2.1 (B1a) to 3.2.4 (B2a). AQA splits the terms into basic foundation (raw, categorical, ordinal, discrete, continuous, ungrouped, grouped), additional foundation (quantitative, qualitative, bivariate) and Higher (multivariate). AQA may ask you to choose suitable class intervals for a data set.
- Edexcel 1ST0: 1b.01 to 1b.04. Edexcel lists all terms together, with multivariate in bold (Higher). Edexcel adds that the explanatory variable goes on the x-axis of a scatter diagram, and expects you to consider rounding and accuracy when judging secondary data.

## 3.2.1 / 1b.01 Describing data

*Refs: AQA 3.2.1 (B1a) · Edexcel 1b.01. Tier: F & H (part Higher only).*

### What you need to know

- Raw data: data as collected, before any sorting or processing.
- Qualitative data: described in words (colour, type of pet). Also called categorical data.
- Quantitative data: numbers (height, number of siblings).
- Categorical data: data in categories with no natural order (favourite fruit).
- Ordinal data: categories with a natural order but no fixed gap between them (shoe size labels S, M, L; grades "poor, fair, good").
- Discrete data: can only take particular values, usually counted (number of goals, shoe size 5, 5½, 6).
- Continuous data: can take any value in a range, measured (mass, time, length).
- Ungrouped data: each value listed separately.
- Grouped data: values put into classes, with frequencies.
- Bivariate data: two variables measured on each item (height and mass of each student).
- (HT only) Multivariate data: three or more variables measured on each item.
- More than one term can apply to the same data; identify which variables matter for a hypothesis.

### Explained

Ask two questions. Is it a number? If not, it is qualitative (categorical; ordinal if the categories have an order). If it is a number, was it counted or measured? Counted usually means discrete; measured means continuous.

Watch for traps:

- Age is continuous (time passes all the time), even though we usually state it in whole years.
- Shoe size is discrete: only certain values exist.
- Money is usually treated as discrete (whole pence).
- Ordinal data can be numbers used as labels, like a rating from 1 to 5. You can order them but "4" is not twice as good as "2".

Bivariate data lets you look for a relationship, for example with a scatter diagram. (HT only) Multivariate data (for example, age, mass and blood pressure of each patient) lets you look at several relationships, or at how one variable depends on two others.

### Worked example

A vet records, for each dog seen: breed, mass (kg), number of visits this year, and the owner's rating of the service (poor / fair / good / excellent). Describe each variable.

1. Breed: qualitative, categorical.
2. Mass: quantitative, continuous.
3. Number of visits: quantitative, discrete.
4. Rating: qualitative, ordinal.
5. Taken together for each dog, the data is multivariate (four variables). Any two of them, such as mass and number of visits, form bivariate data.

### Common mistakes

- Calling age or time discrete because the answers were whole numbers.
- Calling ordinal data "categorical" when the question wants the more precise word.
- Saying bivariate means "two sets of data" rather than "two variables measured on the same items".

## 3.2.2 / 1b.02 Merging categories and grouping

*Refs: AQA 3.2.2 (B1b) · Edexcel 1b.02. Tier: F & H.*

### What you need to know

- Merging categories (for example, "cat", "dog", "rabbit" into "mammal") and grouping numbers into class intervals makes data easier to display and summarise.
- But grouping loses detail: you no longer know the exact values, so calculations (mean, median) become estimates and diagrams lose information.
- Know the class width: the upper class boundary minus the lower class boundary.
- Choose sensible class intervals: no gaps, no overlaps, similar widths where possible, usually 5 to 10 classes.

### Explained

Writing classes for continuous data uses inequalities so every value fits into exactly one class: 10 ≤ t < 20, 20 ≤ t < 30. Writing "10–20, 20–30" is ambiguous because 20 fits both.

For discrete data, classes like 0–4, 5–9, 10–14 work because there are no values between 4 and 5.

Class boundaries matter for continuous data that has been rounded. Lengths recorded to the nearest cm in the class 10–14 really run from 9.5 to 14.5, so the class width is 5.

Too few classes hides the shape of the data; too many leaves most classes with tiny frequencies.

### Worked example

The times (minutes, to the nearest minute) of 20 runners are:

24, 31, 27, 35, 29, 22, 40, 33, 26, 38, 30, 28, 25, 36, 32, 29, 41, 27, 34, 30

Choose class intervals and make a grouped frequency table.

1. Smallest 22, largest 41, so the range is 19. Width 5 gives four or five classes.
2. Classes 20–24, 25–29, 30–34, 35–39, 40–44.
3. Tally: 20–24: 22, 24 → 2. 25–29: 25, 26, 27, 27, 28, 29, 29 → 7. 30–34: 30, 30, 31, 32, 33, 34 → 6. 35–39: 35, 36, 38 → 3. 40–44: 40, 41 → 2.
4. Check: 2 + 7 + 6 + 3 + 2 = 20.
5. Disadvantage: from the table alone you cannot tell the exact times, so the mean will only be an estimate.

### Common mistakes

- Overlapping classes such as 20–25, 25–30.
- Leaving gaps (10 ≤ x < 20 then 21 ≤ x < 30 for continuous data).
- Not checking that the frequencies add up to the total.

## 3.2.3 / 1b.03 Explanatory and response variables

*Refs: AQA 3.2.3 (B1c) · Edexcel 1b.03. Tier: F & H.*

### What you need to know

- The explanatory (independent) variable is the one that is changed or that might cause the change.
- The response (dependent) variable is the one that is measured and may depend on the explanatory variable.
- On a scatter diagram the explanatory variable goes on the x-axis and the response variable on the y-axis.

### Explained

Ask: "Which one might affect the other?" In "the longer you revise, the higher your score", hours of revision is explanatory and score is the response.

Sometimes neither causes the other (shoe size and reading age in children are both linked to age). Then either can go on the x-axis, but you still label which you chose.

### Worked example

A farmer tests how the amount of fertiliser (g per m²) affects the yield of tomatoes (kg per plant). Identify the variables.

1. Fertiliser is controlled by the farmer: explanatory (independent). Plot on the x-axis.
2. Yield is measured: response (dependent). Plot on the y-axis.

### Common mistakes

- Putting the response variable on the x-axis.
- Mixing up "independent variable" with "independent events" in probability; they are different ideas.

## 3.2.4 / 1b.04 Primary and secondary data

*Refs: AQA 3.2.4 (B2a) · Edexcel 1b.04. Tier: F & H.*

### What you need to know

- Primary data is collected by you (or for you) for your purpose.
- Secondary data was collected by someone else, for another purpose (government statistics, websites, newspapers, company records).
- Know the advantages and disadvantages of each, and the limits of secondary data: accuracy, rounding, age, how it was collected, and whether you can access it.

### Explained

| | Primary | Secondary |
| --- | --- | --- |
| Advantages | You control how it is collected, so you know its accuracy; it fits your question exactly; it is up to date | Quick and cheap; often large data sets; may cover things you could not collect yourself (national census) |
| Disadvantages | Slow and costly to collect; your sample may be small | May be out of date; may not match your question; you do not know how carefully it was collected; may be rounded or summarised; may be biased; may be restricted or confidential |

Rounding in secondary data matters. A table that gives populations "to the nearest thousand" cannot support a comparison of two towns that differ by 300 people.

### Worked example

A student uses a website's table of average house prices by region, rounded to the nearest £1000, to compare prices in two regions. Give one advantage and two possible problems.

1. Advantage: quick and free; covers many sales the student could not collect.
2. Problem 1: the data may be out of date or the source may be unreliable or biased (an estate agent selling homes).
3. Problem 2: values are rounded to £1000, so small differences between regions cannot be trusted; and the "average" used (mean or median) may not be stated.

### Common mistakes

- Saying secondary data is "less accurate" without saying why.
- Calling data from your own school's records "primary". If it was collected by the school for its own purpose, it is secondary for you.

## Check questions

1. State whether each is discrete or continuous: (a) number of texts sent in a day, (b) time to run 100 m, (c) a person's age. [3 marks]
2. A survey records each person's favourite colour and their satisfaction rating (very unhappy, unhappy, happy, very happy). Give the best word to describe each variable. [2 marks]
3. Explain the difference between bivariate and (HT only) multivariate data, with an example of each. [2 marks]
4. A teacher groups test marks out of 50 into classes 0–10, 10–20, 20–30, 30–40, 40–50. Give one problem with these classes. [1 mark]
5. Give one advantage and one disadvantage of grouping data. [2 marks]
6. Mass is recorded to the nearest kg in the class 60–64. Write down the class boundaries and the class width. [2 marks]
7. A scientist studies how temperature affects the time a candle takes to burn down. Which is the response variable, and which axis should it go on? [2 marks]
8. A student uses government figures for unemployment. Give two possible problems with using this secondary data. [2 marks]

## Mark scheme

1. (a) discrete (1); (b) continuous (1); (c) continuous (1).
2. Colour: categorical / qualitative (1). Rating: ordinal (1).
3. Bivariate: two variables recorded for each item, e.g. height and mass of each student (1). Multivariate: three or more variables for each item, e.g. height, mass and age (1).
4. Classes overlap: a mark of 10, 20, 30 or 40 fits two classes (1).
5. Advantage: easier to display or see patterns / summarise large data sets (1). Disadvantage: exact values lost, so calculations are estimates (1).
6. 59.5 and 64.5 (1); width 5 (1).
7. Time to burn down is the response (1); y-axis (1).
8. Any two (1 each): may be out of date; may be rounded; collected for another purpose or defined differently; unknown collection method or accuracy; possible bias in the source.
