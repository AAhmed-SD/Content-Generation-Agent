import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fillCaptions, niches, readDesk, writeDesk, type NicheId } from "@/lib/desk";
import { usableOnACard, writeWeeklyBriefs } from "@/lib/weekly-briefs.mjs";

export const WEEK = "2026-W45";

const dataDir = path.join(process.cwd(), "data");

const searches: Record<NicheId, string> = {
  clinical: "medical student revision never ends dentistry nursing radiology",
  analytical: "maths economics computer science problem set unfinished",
  mentalhealth: "ADHD time management revision too many starts",
  gcsealevel: "GCSE A-level revision too much to remember",
};

const intents: Record<NicheId, string> = {
  clinical: "Find how medicine, dentistry, nursing, and radiology students talk about revision load. Not clinical advice.",
  analytical: "Find how maths, economics, and computer science students talk about unfinished problem sets. Not a worked answer.",
  mentalhealth: "Find how young people with ADHD talk about managing time. Not treatment.",
  gcsealevel: "Find how GCSE and A-level students talk about revision load. No student names.",
};

export const safety: Record<NicheId, string[]> = {
  clinical: [
    "This is an ad for Offload about revision.",
    "No clinical advice, no patient, no case.",
    "OSCE and UKMLA may be named as exams they sit.",
  ],
  analytical: [
    "This is an ad for Offload about unfinished work.",
    "Do not work the question.",
    "Do not invent a number.",
  ],
  mentalhealth: [
    "This is about managing time.",
    "Do not name a condition as theirs.",
    "No treatment claim. If the line is distressing, point to help.",
  ],
  gcsealevel: [
    "Syllabus-true and age-appropriate.",
    "No student names.",
    "Comments are stored as themes, never as profiles.",
  ],
};

const banned =
  /\b(cure|guaranteed|diagnos|suicide|kill myself|onlyfans|escort|nude|porn|hostess)\b/i;

export type Theme = {
  niche: NicheId;
  text: string;
  source: "reddit" | "web" | "youtube" | "virlo";
};

export type SourceReport = {
  niche: NicheId;
  name: "Reddit" | "Web" | "YouTube" | "Virlo";
  status: "hit" | "empty" | "skipped" | "failed";
  detail: string;
};

const subs: Record<NicheId, string> = {
  clinical: "medicalschooluk",
  analytical: "uniuk",
  mentalhealth: "ADHD",
  gcsealevel: "GCSE",
};

export const RESEARCH_PURPOSE = "student-struggle";

export type ResearchFile = {
  week: string;
  ranAt: string;
  purpose?: string;
  themes: Theme[];
  sources: SourceReport[];
};

export type Brief = {
  niche: NicheId;
  text: string;
  themes: string[];
};

export type BriefFile = {
  week: string;
  wroteAt: string;
  briefs: Brief[];
};

export type DraftRow = {
  id: string;
  reason: string;
};

export type DraftFile = {
  week: string;
  wroteAt: string;
  writer: "template" | "ollama";
  updated: DraftRow[];
  held: DraftRow[];
};

function readJson<T>(name: string): T | null {
  try {
    return JSON.parse(readFileSync(path.join(dataDir, name), "utf8")) as T;
  } catch {
    return null;
  }
}

function writeJson(name: string, value: unknown) {
  mkdirSync(dataDir, { recursive: true });
  writeFileSync(path.join(dataDir, name), JSON.stringify(value, null, 2));
}

export function readResearch() {
  const file = readJson<ResearchFile>("research.json");
  return file?.week === WEEK && file.purpose === RESEARCH_PURPOSE ? file : null;
}

export function readBriefs() {
  const file = readJson<BriefFile>("briefs.json");
  return file?.week === WEEK ? file : null;
}

export function readDraftLog() {
  const file = readJson<DraftFile>("drafts.json");
  return file?.week === WEEK ? file : null;
}

export function cleanTheme(raw: string) {
  const text = raw
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\b[ur]\/[A-Za-z0-9_-]+/g, "")
    .replace(/@\w+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length < 16 || text.length > 120) return null;
  if (/\d/.test(text) || banned.test(text)) return null;
  return text;
}

function takeThemes(niche: NicheId, source: Theme["source"], titles: string[]) {
  const themes: Theme[] = [];
  for (const title of titles) {
    const text = cleanTheme(title);
    if (!text || themes.some((theme) => theme.text === text)) continue;
    themes.push({ niche, source, text });
    if (themes.length === 4) break;
  }
  return themes;
}

function decodeXml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

/**
 * Reddit, through its official API (app-only OAuth). Reddit blocks anonymous readers, so this needs a free "script"
 * app from reddit.com/prefs/apps: REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET in .env.local.
 */
let redditToken: { value: string; until: number } | null = null;
async function redditAuth(id: string, secret: string) {
  if (redditToken && redditToken.until > Date.now() + 60_000) return redditToken.value;
  const response = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "content-type": "application/x-www-form-urlencoded",
      "user-agent": "offload-desk/1.0 (research)",
    },
    body: "grant_type=client_credentials",
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Reddit sign-in returned ${response.status}`);
  const json = (await response.json()) as { access_token?: string; expires_in?: number };
  if (!json.access_token) throw new Error("Reddit gave no token");
  redditToken = { value: json.access_token, until: Date.now() + (json.expires_in ?? 3600) * 1000 };
  return redditToken.value;
}

async function redditTitles(niche: NicheId, id: string, secret: string) {
  const token = await redditAuth(id, secret);
  const url = `https://oauth.reddit.com/r/${subs[niche]}/search?q=${encodeURIComponent(searches[niche])}&restrict_sr=1&sort=relevance&t=month&limit=12`;
  const response = await fetch(url, { headers: { authorization: `Bearer ${token}`, "user-agent": "offload-desk/1.0 (research)" }, signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`Reddit returned ${response.status}`);
  const json = (await response.json()) as { data?: { children?: { data?: { title?: string } }[] } };
  return (json.data?.children ?? []).map((child) => child.data?.title ?? "");
}

async function webTitles(query: string) {
  const response = await fetch(`https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`, {
    headers: { "User-Agent": "Mozilla/5.0" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Web search returned ${response.status}`);
  const html = await response.text();
  const titles: string[] = [];
  for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    const attrs = match[1];
    if (!attrs.includes("result-link") || attrs.includes("ad_domain")) continue;
    const title = decodeXml(match[2].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
    if (title && title.toLowerCase() !== "more info") titles.push(title);
  }
  return titles;
}

async function youtubeTitles(query: string, key: string) {
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("type", "video");
  url.searchParams.set("videoDuration", "short");
  url.searchParams.set("maxResults", "5");
  url.searchParams.set("q", query);
  url.searchParams.set("key", key);
  const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`YouTube returned ${response.status}`);
  const json = (await response.json()) as { items?: { snippet?: { title?: string } }[] };
  return (json.items ?? []).map((item) => item.snippet?.title ?? "");
}

async function virloKeywords(intent: string, topic: string, key: string) {
  const response = await fetch("https://api.virlo.ai/v1/agents/suggest-keywords", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent,
      topic_hint: topic,
      platforms: ["tiktok", "youtube", "instagram"],
      desired_count: 7,
    }),
    signal: AbortSignal.timeout(12000),
  });
  const cost = response.headers.get("x-cost");
  if (!response.ok) throw new Error(`Virlo returned ${response.status}`);
  const json = (await response.json()) as { data?: { keywords?: string[] } };
  return { keywords: json.data?.keywords ?? [], cost };
}

export async function gatherResearch() {
  const themes: Theme[] = [];
  const sources: SourceReport[] = [];
  const youtubeKey = process.env.YOUTUBE_API_KEY;
  const virloKey = process.env.VIRLO_API_KEY;

  const redditId = process.env.REDDIT_CLIENT_ID?.trim();
  const redditSecret = process.env.REDDIT_CLIENT_SECRET?.trim();

  for (const niche of niches) {
    if (!redditId || !redditSecret) {
      sources.push({
        niche: niche.id,
        name: "Reddit",
        status: "skipped",
        detail: "Reddit blocks anonymous readers. Add REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET (a free app at reddit.com/prefs/apps).",
      });
    } else
      try {
        const titles = await redditTitles(niche.id, redditId, redditSecret);
        const found = takeThemes(niche.id, "reddit", titles);
        themes.push(...found);
        sources.push({
          niche: niche.id,
          name: "Reddit",
          status: found.length ? "hit" : "empty",
          detail: found.length
            ? `${found.length} themes from r/${subs[niche.id]}. Authors were not stored.`
            : "Nothing usable came back.",
        });
      } catch (error) {
        sources.push({
          niche: niche.id,
          name: "Reddit",
          status: "failed",
          detail: error instanceof Error ? error.message : "Reddit failed",
        });
      }

      try {
        const titles = await webTitles(searches[niche.id]);
        const found = takeThemes(niche.id, "web", titles);
        themes.push(...found);
        sources.push({
          niche: niche.id,
          name: "Web",
          status: found.length ? "hit" : "empty",
          detail: found.length ? `${found.length} public titles. Numbers were dropped.` : "Nothing usable came back.",
        });
      } catch (error) {
        sources.push({
          niche: niche.id,
          name: "Web",
          status: "failed",
          detail: error instanceof Error ? error.message : "Web search failed",
        });
      }

      if (!youtubeKey) {
        sources.push({
          niche: niche.id,
          name: "YouTube",
          status: "skipped",
          detail: "No YOUTUBE_API_KEY.",
        });
      } else {
        try {
          const titles = await youtubeTitles(searches[niche.id], youtubeKey);
          const found = takeThemes(niche.id, "youtube", titles);
          themes.push(...found);
          sources.push({
            niche: niche.id,
            name: "YouTube",
            status: found.length ? "hit" : "empty",
            detail: found.length ? `${found.length} short titles.` : "Nothing usable came back.",
          });
        } catch (error) {
          sources.push({
            niche: niche.id,
            name: "YouTube",
            status: "failed",
            detail: error instanceof Error ? error.message : "YouTube failed",
          });
        }
      }

      if (!virloKey) {
        sources.push({
          niche: niche.id,
          name: "Virlo",
          status: "skipped",
          detail: "No VIRLO_API_KEY. The $0.50 agent was not created.",
        });
      } else {
        try {
          const result = await virloKeywords(intents[niche.id], niche.label, virloKey);
          const found = takeThemes(niche.id, "virlo", result.keywords);
          themes.push(...found);
          const charged = result.cost && result.cost !== "0" && result.cost !== "0.00";
          sources.push({
            niche: niche.id,
            name: "Virlo",
            status: found.length ? "hit" : "empty",
            detail: charged
              ? `Header said ${result.cost}. No research agent was created.`
              : "Free keyword pass. No research agent was created.",
          });
        } catch (error) {
          sources.push({
            niche: niche.id,
            name: "Virlo",
            status: "failed",
            detail: error instanceof Error ? error.message : "Virlo failed",
          });
        }
      }
  }

  const file: ResearchFile = {
    week: WEEK,
    ranAt: new Date().toISOString(),
    purpose: RESEARCH_PURPOSE,
    themes,
    sources,
  };
  writeJson("research.json", file);
  return file;
}

export function compileBriefs(research: ResearchFile) {
  const briefs: Brief[] = niches.map((niche) => {
    const themes = research.themes.filter((theme) => theme.niche === niche.id).map((theme) => theme.text);
    const lines = [
      niche.name,
      `Week ${WEEK}`,
      "",
      "Safety",
      ...safety[niche.id].map((rule) => `- ${rule}`),
      "",
      "How people are phrasing it",
      ...(themes.length ? themes.map((theme) => `- ${theme}`) : ["- No live theme this run."]),
      "",
      "These phrases are background. They are not the caption.",
      "The post is an ad for Offload. Relate to the struggle. Do not teach the subject and do not give advice in the field.",
    ];
    return { niche: niche.id, text: lines.join("\n"), themes };
  });
  const file: BriefFile = { week: WEEK, wroteAt: new Date().toISOString(), briefs };
  writeJson("briefs.json", file);
  writeWeeklyBriefs({ week: WEEK, themes: research.themes, sources: research.sources, pieces: readDesk() });
  return file;
}

const lockedNotes: Record<string, string> = {
  "clinical-hook": "Medicine, dentistry, nursing, radiology. The reading does not finish itself.",
  "clinical-payoff": "Offload is the card you return to. It is not advice.",
  "clinical-card": "The exam can be OSCE or UKMLA. The post is the revision.",
  "clinical-cards": "Three cards about the workload. No patient.",
  "analytical-hook": "Maths, economics, computer science. The method has to be reused.",
  "analytical-payoff": "Offload holds the card. It does not work the question.",
  "analytical-card": "The workload is the struggle. The answer is not on this card.",
  "analytical-cards": "Three cards about unfinished problems.",
  "mentalhealth-hook": "Too many starts, and the day is gone.",
  "mentalhealth-payoff": "Offload is for the next block of time. It is not treatment.",
  "mentalhealth-card": "A hard day, and the next card. The post is about time.",
  "mentalhealth-cards": "Three cards about managing time.",
  "gcsealevel-hook": "GCSE and A-level. The revision is the struggle.",
  "gcsealevel-payoff": "Offload holds what they still have to know.",
  "gcsealevel-card": "Syllabus-true. No named student. No invented grade.",
  "gcsealevel-cards": "Comments are kept as themes, never as profiles.",
};

async function rewriteBrief(text: string) {
  try {
    const response = await fetch("http://127.0.0.1:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL ?? "gemma3:4b",
        stream: false,
        options: { num_predict: 80 },
        messages: [
          {
            role: "system",
            content:
              "Rewrite as one short sentence for a paper card. Do not add numbers, names, cures, or diagnoses. Return only the sentence.",
          },
          { role: "user", content: text.slice(0, 1500) },
        ],
      }),
      signal: AbortSignal.timeout(25000),
    });
    if (!response.ok) return null;
    const json = (await response.json()) as { message?: { content?: string } };
    const sentence = (json.message?.content ?? "")
      .replace(/<think>[\s\S]*?<\/think>/g, "")
      .trim()
      .split("\n")
      .find((line) => line.trim()) ?? "";
    if (!sentence || sentence.length > 140 || /\d/.test(sentence) || banned.test(sentence)) return null;
    return sentence;
  } catch {
    return null;
  }
}

export async function applyDrafts(briefs: BriefFile) {
  const rewrites = new Map<NicheId, string>();
  await Promise.all(
    briefs.briefs.map(async (brief) => {
      const sentence = await rewriteBrief(brief.text);
      if (sentence) rewrites.set(brief.niche, sentence);
    }),
  );

  const pieces = readDesk();
  const updated: DraftRow[] = [];
  const held: DraftRow[] = [];
  for (const piece of pieces) {
    if (piece.stamps.length > 0) {
      held.push({ id: piece.id, reason: "Already stamped." });
      continue;
    }
    const brief = briefs.briefs.find((item) => item.niche === piece.niche);
    const theme = brief?.themes.find((item) => usableOnACard(item));
    const rewritten = rewrites.get(piece.niche);
    if (rewritten) {
      piece.note = rewritten;
      piece.researchNote = theme ? `Theme kept beside the card: ${theme}` : "The local writer saw the brief only.";
      piece.draftedFrom = `${WEEK} ollama`;
    } else if (theme) {
      piece.note = theme;
      piece.researchNote = "Theme only. No username stored.";
      piece.draftedFrom = `${WEEK} theme`;
    } else if (brief?.themes.length) {
      piece.note = lockedNotes[piece.id] ?? piece.note;
      piece.researchNote = "Themes stayed in the brief. The card kept its locked line.";
      piece.draftedFrom = `${WEEK} locked`;
    } else {
      piece.note = lockedNotes[piece.id] ?? piece.note;
      piece.researchNote = "No live theme. Locked line kept.";
      piece.draftedFrom = `${WEEK} locked`;
    }
    fillCaptions(piece);
    updated.push({ id: piece.id, reason: piece.researchNote });
  }
  writeDesk(pieces);

  const file: DraftFile = {
    week: WEEK,
    wroteAt: new Date().toISOString(),
    writer: rewrites.size > 0 ? "ollama" : "template",
    updated,
    held,
  };
  writeJson("drafts.json", file);
  return file;
}

