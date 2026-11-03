export const niches = [
  {
    id: "clinical",
    name: "offload.clinical",
    label: "Clinical students",
    who: "Medicine, dentistry, nursing, radiology",
    about: "An ad for Offload about their revision. Not clinical advice.",
    lead: "hadiqa",
    needsSecond: true,
  },
  {
    id: "analytical",
    name: "offload.analytical",
    label: "Analytical students",
    who: "Maths, economics, computer science",
    about: "An ad for Offload about unfinished work. Not a worked answer.",
    lead: "hadiqa",
    needsSecond: false,
  },
  {
    id: "mentalhealth",
    name: "offload.mentalhealth",
    label: "Time",
    who: "Kids with ADHD and other mental health difficulties",
    about: "Offload helps them manage time. Not treatment.",
    lead: "laiba",
    needsSecond: true,
  },
  {
    id: "gcsealevel",
    name: "offload.gcsealevel",
    label: "GCSE and A-level",
    who: "GCSE and A-level students",
    about: "An ad for Offload about revision. Not a grade.",
    lead: "laiba",
    needsSecond: false,
  },
] as const;

export type NicheId = (typeof niches)[number]["id"];
