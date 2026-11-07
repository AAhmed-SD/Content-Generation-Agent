#!/usr/bin/env node
// Step 1 of the script lead: understand each niche fully. Researches the audience on the web and writes
// brand/niches/<niche>-dossier.md, the deep picture every truth and script is built from.
//
//   node scripts/lead/dossier.mjs [niche ...]      (from web/; all four when none is given)
import fs from "node:fs";
import path from "node:path";
import { brand, claude, LABEL, NICHES, root, sql } from "./lib.mjs";

const SECTIONS = `
# <Account>: dossier

Written <date> from research. For the team and the writer. Numbers here are background: never put one on a card or in a film unless the week's brief carries it. Name no creator, account, brand, school, university or person.

## 1. Who they are
Each sub-group separately (for example, for clinical: medicine, dentistry, nursing, radiography; for each, the years of the course). Age range, where they study, how many there are (background), what makes each group different.

## 2. Their year, month by month
September to August. For every month: what is happening (term dates, placements and rotations, mocks, exam windows, results days, applications, holidays, deadlines), what they are worried about, what they are doing instead of studying. Be specific to the UK.

## 3. The courses and the assessments
Every exam and assessment they actually sit, by its real name and format (for example: written papers, OSCEs, progress tests, required practicals, problem sheets, coursework, NEA, dissertations, mocks). How each is marked, when it lands, what students find hardest about it.

## 4. A day in their life
Five to eight different real days (a placement day, a lecture day, a shift day, a school day, a weekend before exams, a holiday day...). Hour by hour, where the study time actually goes.

## 5. How they actually study
The methods and tools they really use, by type (flashcard apps, question banks, past papers, revision websites, lecture recordings, group chats, notes apps), what they love and hate about each, and the habits that waste their time.

## 6. Pains, ranked
At least 40 specific, recognisable pains, most painful first. Each one a concrete moment, not a category ("the 11pm problem sheet you opened at 10:58", not "procrastination").

## 7. Beliefs and myths
At least 25 things they believe about studying, memory, exams and time, and whether each is true, half true or false (with the evidence in brief).

## 8. Their words
The words, phrases, abbreviations and in-jokes they use, and the ones that make them cringe (words an adult or a brand would use that they never would).

## 9. Feelings
What they fear, what they're proud of, what makes them feel behind, what makes them feel on top of it. The emotional moments of the year.

## 10. What they watch
The kinds of short videos that do well with them (formats and tones, not creators), what makes them save, share, comment, and what makes them scroll past.

## 11. Where Offload fits
Map the top pains to what Offload actually does, using only product-facts.md. Plain words, no feature names unless needed. Pains Offload does not solve: say so.

## 12. Care
What is sensitive for this audience (from safety.md and the research), and how to stay on the right side of it.
`;

async function dossier(niche) {
  const file = path.join(root, "brand", "niches", `${niche}-dossier.md`);
  const prompt = `Research this audience in depth and write its dossier.

Audience: ${LABEL[niche]}.

Use web search to check UK facts: term and exam dates, the real names and formats of assessments, the structure of courses and placements, the tools students use, and what students say about their own struggles (student forums, surveys, guidance from universities and exam boards). Prefer recent sources (2024 to 2026). Where you are not sure, say so rather than guess.

Write the dossier as Markdown with exactly these sections, in this order, and be generous: it should run to several thousand words, dense with specific, true detail. Today's date is ${new Date().toISOString().slice(0, 10)}.
${SECTIONS}

The account's current file (rules and what we already know):
${brand(`brand/niches/${niche}.md`)}

What Offload may claim:
${brand("brand/product-facts.md").slice(0, 30000)}

Safety:
${brand("brand/safety.md")}

Reply with only the dossier Markdown, starting with the "# " heading.`;
  const text = await claude({ task: `dossier-${niche}`, prompt, search: true, maxTokens: 64000 });
  const md = text.slice(Math.max(0, text.indexOf("# ")));
  fs.writeFileSync(file, md.trim() + "\n");
  console.log(`${niche}: ${md.split(/\s+/).length} words -> ${path.relative(root, file)}`);
}

const which = process.argv.slice(2).filter((a) => NICHES.includes(a));
await Promise.all((which.length ? which : NICHES).map((n) => dossier(n).catch((e) => console.error(`${n}: ${e.message}`))));
await sql.end();
