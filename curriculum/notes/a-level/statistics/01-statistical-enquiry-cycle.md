---
level: A-level
subject: Statistics
topic: "The statistical enquiry cycle: planning, collecting, processing, interpreting and evaluating"
boards:
  - board: Edexcel
    code: "9ST0"
    spec_refs: ["SEC A1", "SEC A2", "SEC A3", "SEC A4", "SEC A5", "SEC A6", "SEC B1", "SEC B2", "SEC B3", "SEC B4", "SEC C1", "SEC C2", "SEC C3", "SEC D1", "SEC D2", "SEC D3", "SEC D4", "SEC D5", "SEC E1", "SEC E2", "SEC E3", "SEC E4"]
refs_checked: false
spec_url: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/statistics-2017.html
pmt_url: https://www.physicsandmathstutor.com/a-level-statistics/
---

# The statistical enquiry cycle

This file covers the five stages of the statistical enquiry cycle (SEC) as A-level Statistics uses them: initial planning, data collection, data processing and presentation, interpretation of results, and evaluation and review. The SEC is examined on all three papers, usually as part of a longer question set in a real context, and it carries most of the AO3 marks (critically assessing methods and conclusions).

## Overview

The cycle is a loop, not a line. You plan, collect, process, interpret and evaluate, and the evaluation usually sends you back to planning with a sharper question. At GCSE the cycle is described in [GCSE Statistics 01](../../gcse/statistics/01-statistical-enquiry-cycle-and-planning.md) and data collection in [GCSE Statistics 04](../../gcse/statistics/04-collecting-and-cleaning-data.md). At A-level you are expected to go further: run exploratory data analysis before committing to a method, choose a formal test, judge reliability against sample size and sampling method, and write for a named audience. Questions often include unfamiliar acronyms or real data you have not met; read the context carefully and use it in every answer.

### Board differences

- Edexcel is the only board with an A-level in Statistics. The SEC is listed after topic 21 as stages A to E; it has no numbers of its own in the spec, so here the points are written SEC A1 to SEC E4.
- The SEC is set on all three papers (9ST0/01, /02, /03). Paper 3 (Statistics in Practice) leans on it most.

## SEC A Initial planning

*Refs: Edexcel SEC A1, A2, A3, A4, A5, A6.*

### What you need to know

- A1: list the factors that may be related to the problem, including possible confounding factors you will need to control or record.
- A2: turn a vague aim into a precise question or a testable hypothesis (or several).
- A3: decide which variables to measure, the units, whether data are primary or secondary, the sampling method and sample size, and how data will be recorded, with a reason for each choice.
- A4: carry out exploratory data analysis (EDA): quick summaries and plots of a pilot or existing data set to see shape, spread, outliers and possible relationships before the main analysis.
- A5: plan how the data will be processed and shown (which summary measures, diagrams and tests), with reasons linked to the data type and question.
- A6: justify the plan, explaining how it keeps bias low.

### Explained

**From aim to hypothesis.** "Does exercise help sleep?" is an aim. A hypothesis is precise enough to be tested: "Adults aged 18 to 30 who do at least 150 minutes of moderate exercise a week have a higher median sleep duration than those who do less." It names the population, the variables and the direction.

**Factors.** A good plan lists variables that could affect the response other than the one you care about. For sleep these include age, caffeine, screen time and shift work. You either control them (keep them fixed), record them (so you can compare groups fairly), or randomise to spread them evenly (see [12-experimental-design.md](12-experimental-design.md)).

**Exploratory data analysis.** EDA is looking before you test. With a small pilot sample you might draw a box plot and a histogram. If the data are strongly skewed, a test that assumes normality (a t-test) may be unsuitable and a non-parametric test (Wilcoxon) better. If a scatter diagram is curved, Pearson's correlation is unsuitable and Spearman's may be better. EDA can also reveal recording errors (a sleep time of 80 hours) and suggest new hypotheses.

**Strategy for processing.** Match the method to the data:

| Data and question | Summary and diagram | Possible test |
| --- | --- | --- |
| one numerical variable, two groups | medians and IQRs, back-to-back box plots | two-sample t, Wilcoxon rank-sum |
| one numerical variable, paired | differences, mean and sd of differences | paired t, Wilcoxon signed-rank, sign |
| two numerical variables | scatter diagram, correlation | pmcc or Spearman test, regression |
| two categorical variables | two-way table, compound bar chart | chi-squared test for association |
| one numerical variable, three or more groups | box plots side by side | one-way ANOVA |

**Justifying the plan.** Examiners reward reasons tied to the context: "random sampling from the full staff list so that every department is represented without the researcher choosing who takes part" is better than "to avoid bias".

### Worked example

A council asks whether a new 20 mph limit has reduced speeds on residential streets. Plan the enquiry.

1. Factors (A1): time of day, day of week, weather, road width, school terms, traffic volume.
2. Hypothesis (A2): the mean speed of cars on residential streets is lower after the limit than before.
3. Data (A3): primary data, speeds from a radar gun at the same 12 sites, at the same times and days of the week, for one week before and one week after. Record time, weather and site with each speed.
4. EDA (A4): a pilot hour at two sites shows a few very high speeds (motorbikes overtaking). Speeds are slightly positively skewed, so medians should be reported as well as means.
5. Strategy (A5): for each site, the mean speed before and after gives paired data across 12 sites. Draw a box plot of the 12 differences and use a paired t-test if the differences look roughly normal, otherwise a Wilcoxon signed-rank test.
6. Justification (A6): the same sites and time slots remove differences between sites and times; choosing sites at random from the list of affected streets stops the council choosing streets where speeds have obviously fallen.

### Common mistakes

- Writing an aim ("investigate speeds") instead of a testable hypothesis with a population and direction.
- Listing factors without saying how each will be controlled, recorded or randomised.
- Choosing a test before looking at the data's shape.

## SEC B Data collection

*Refs: Edexcel SEC B1, B2, B3, B4.*

### What you need to know

- B1: design primary data collection to reduce bias: random sampling, clear definitions, consistent measurement, trained data collectors, piloting questionnaires.
- B2: secondary data (reference publications, official statistics, the internet, the media) is quick and cheap but you did not control how it was collected; check source, date, definitions, sample size and purpose.
- B3: always state how data were collected and acknowledge sources, so others can judge reliability and repeat the work.
- B4: leading questions bias responses, either by accident (careless wording) or on purpose (agenda-driven design, for example by a pressure group or a company advertising its product).

### Explained

**Primary data.** You control it, so you can match it to the question, but it costs time and money. Bias creeps in through who is asked (sampling bias), who answers (non-response bias), how they are asked (question wording, interviewer effect) and how values are measured (an uncalibrated scale).

**Secondary data.** Ask: who collected it and why? When? How were terms defined (does "unemployed" mean the same in two countries)? Was it a sample or a census? A charity survey of "1,000 people" who answered a pop-up on its own website is not a random sample of the public.

**Declaring methodology.** A report that says "a random sample of 200 Year 12 students from five colleges, selected from enrolment lists using random numbers, answered an online questionnaire in March" lets a reader judge the scope. Acknowledging sources (for example, the Office for National Statistics table and its date) gives credit and lets others check.

**Leading questions.** "Don't you agree that the new car park is a waste of money?" pushes towards yes. "Do you think the new car park is good value for money?" with balanced response options is neutral. Agenda-driven surveys may also offer unbalanced options (Excellent, Very good, Good, Fair) or omit "don't know".

### Worked example

A newspaper headline says "Three in four parents back longer school day". The article says the paper asked readers on its website: "Would a longer school day help working parents and raise standards?" 3,200 people voted, 2,400 yes. Criticise the claim.

1. Sampling: self-selected website readers, not a random sample of parents; voters may not be parents at all.
2. Wording: the question is leading (it assumes the longer day helps) and asks two things at once.
3. 2,400 ÷ 3,200 = 0.75, so "three in four" is correct for respondents, but cannot be generalised to all parents.
4. Methodology: the article does not say whether multiple votes were blocked. A fair report would declare this.

### Common mistakes

- Saying secondary data is "unreliable" without a specific reason.
- Thinking a large sample removes bias; a large biased sample is still biased.
- Spotting a leading question but not rewriting it neutrally when asked.

## SEC C Data processing and presentation

*Refs: Edexcel SEC C1, C2, C3.*

### What you need to know

- C1: organise raw data (sorting, filtering, grouping, cleaning) and use technology: spreadsheets, databases, calculators and graph-plotting software. The language of these tools is in [02-diagrams-summary-measures-and-outliers.md](02-diagrams-summary-measures-and-outliers.md).
- C2: choose diagrams and summary measures that let you make inferences about the population, and read outputs produced by software (for example a regression output with "df", "Coef" and "p").
- C3: avoid misrepresentation: honest scales, a sensible choice of measure, and no cherry-picked subsets.

### Explained

**Cleaning.** Before calculating, remove or correct impossible values (negative ages), duplicate records and inconsistent units (heights in m and cm mixed). Note how many records you removed and why.

**Choosing measures.** For symmetrical data without outliers, the mean and standard deviation use every value. For skewed data or data with outliers, the median and interquartile range are more representative.

**Reading software output.** You may be shown a block such as:

| | Coef | SE Coef | T | P |
| --- | --- | --- | --- | --- |
| Constant | 12.4 | 3.1 | 4.00 | 0.001 |
| Hours | 2.35 | 0.62 | 3.79 | 0.002 |

Pick out what you need: the regression line is y = 12.4 + 2.35x, and the small p-value for "Hours" means the gradient is significantly different from zero at 5%.

### Worked example

A spreadsheet holds 480 rows of house sales with fields Town, Bedrooms and Price. You want the median price of 3-bedroom houses in each of two towns, and a fair diagram to compare them.

1. Filter Bedrooms = 3 and sort by Town (C1).
2. Remove rows with a missing price or a price of 0 (cleaning); note the number removed.
3. House prices are usually positively skewed with high outliers, so use medians and IQRs, with back-to-back box plots on the same scale (C2).
4. Do not use a pictogram with house icons scaled by area, and do not start a bar chart's axis above zero (C3).

### Common mistakes

- Using the mean for skewed data with outliers.
- Drawing two box plots on different scales.
- Copying every number from a software output instead of picking the relevant ones.

## SEC D Interpretation of results

*Refs: Edexcel SEC D1, D2, D3, D4, D5.*

### What you need to know

- D1: interpret diagrams and calculated measures in context (compare a measure of location and a measure of spread, with units).
- D2: draw conclusions that answer the original question or hypothesis.
- D3: use an appropriate hypothesis test to decide whether an effect is statistically significant (tests are in files 08 to 17).
- D4: discuss reliability: sample size, sampling method, measurement error, whether the sample represents the population.
- D5: communicate clearly and concisely for the audience: a technical report for researchers, plain language and one clear chart for the public.

### Explained

A conclusion has three parts: what the data show, whether that is significant, and how far it can be trusted. "The median sleep of the exercise group was 7.4 hours, 0.6 hours more than the other group, and the spread was similar. A Wilcoxon rank-sum test at 5% gave significant evidence of a difference. The sample was 40 volunteers from one university, so the result may not apply to all adults."

Statistically significant does not mean large or important (see effect size in [17-effect-size.md](17-effect-size.md)). Not significant does not prove there is no difference; it means there was not enough evidence.

### Worked example

A study of 25 students finds that the correlation between hours of revision and test score is r = 0.42. The 5% one-tailed critical value for n = 25 is 0.3365. Write a conclusion for (a) a statistics teacher, (b) a school newsletter.

1. (a) 0.42 > 0.3365, so reject H₀: ρ = 0. There is evidence at the 5% level of positive correlation between revision hours and test score in the population of students. The correlation is only moderate and n = 25 is small; the sample came from one school.
2. (b) Students who revised for longer tended to score higher, although the link was not strong and some students who revised a lot still scored low. The study was small, so we will check again with more students.

### Common mistakes

- Concluding "revision causes higher scores" from correlation.
- Stating a test result as certain ("this proves").
- Ignoring the audience when the question names one.

## SEC E Evaluation and review

*Refs: Edexcel SEC E1, E2, E3, E4.*

### What you need to know

- E1: identify weaknesses in how data were collected or displayed.
- E2: recognise limits from the sample size (small samples give wide confidence intervals and low power) and the sampling method (non-random samples may not represent the population).
- E3: suggest specific improvements: a larger random sample, stratification, a control group, blinding, a better diagram.
- E4: refine the process to clarify the hypothesis, often starting the cycle again with a narrower question.

### Explained

Improvements should be specific and should fix the weakness you named. "Use a bigger sample" is weak; "increase the sample from 20 to 80, chosen by stratified random sampling across the four year groups, so the confidence interval for the mean is about half as wide and every year is represented" is strong. The interval width halves because it is proportional to 1/√n, and √80 = 2√20.

### Worked example

A café owner records the number of cakes sold on 10 sunny days and 10 rainy days in July. Sunny days averaged 42 cakes and rainy days 35. She concludes "rain cuts cake sales by a sixth". Evaluate and suggest improvements.

1. E1: only July; sunny days may also be weekends or school holidays (a confounding factor).
2. E2: 10 days per group is small; a difference of 7 may be due to chance. 7 ÷ 42 ≈ 0.17, so "a sixth" describes this sample only.
3. E3: record sales over a whole year, note day of the week, and compare sunny and rainy days of the same weekday (blocking), then use a test for two means.
4. E4: refine the hypothesis to "on weekdays in summer, mean daily cake sales are lower on rainy days than on dry days".

### Common mistakes

- Generic improvements that do not match the weakness.
- Forgetting to say how the improvement would change the conclusion.

## Check questions

1. A gym says "Members who use our app lose more weight." Write a precise hypothesis that could be tested, naming the population and variables. [2 marks]
2. Give two factors other than diet that could affect weight loss, and say how one of them could be controlled. [3 marks]
3. A pilot sample of reaction times is strongly positively skewed. Explain how this affects your choice of summary measures and of a test comparing two groups. [3 marks]
4. A survey asks "How much do you agree that the unfair parking charges should be scrapped?" Explain why this question may cause bias and rewrite it. [3 marks]
5. Give two checks you would make before using a table of regional crime figures found on a website. [2 marks]
6. A test of a new teaching method on 12 pupils in one class gives p = 0.03. Give two reasons to be cautious about applying this to all pupils in England. [2 marks]
7. A study compares mean commuting times in two towns using samples of 15. Suggest one improvement and explain its effect on the confidence interval for the difference. [3 marks]
8. Write one sentence reporting the finding "median journey time fell from 34 to 29 minutes after the new timetable" for a local newspaper. [1 mark]

## Mark scheme

1. Population named, e.g. adult members of the gym over 3 months (1); clear direction and variables, e.g. members who log in to the app at least weekly have a greater mean weight loss than members who do not (1).
2. Any two, e.g. amount of exercise, starting weight, age, sleep, medical conditions (2); a control, e.g. compare members with similar starting weights / record exercise hours and compare like with like (1).
3. Use median and IQR rather than mean and standard deviation (1) because they are not distorted by the long tail or outliers (1); prefer a non-parametric test such as Wilcoxon rank-sum, as a t-test assumes normality (1).
4. The word "unfair" is leading / assumes an opinion (1), so people are pushed to agree (1); a neutral version, e.g. "Should parking charges be kept, changed or scrapped?" with balanced options (1).
5. Any two: who published it and why; date; definitions of crimes; how collected / sample or census; whether regions are comparable (population sizes) (2).
6. Any two: small sample; one class only, not random; class or teacher effect; no control group mentioned; p = 0.03 is evidence, not proof (2).
7. Increase sample size (e.g. to 60 per town) / use random sampling (1); the standard error falls with larger n (1), so the interval is narrower, here about half as wide since √60 = 2√15 (1).
8. e.g. "After the new timetable, the typical journey took 5 minutes less, 29 minutes instead of 34." (1)
