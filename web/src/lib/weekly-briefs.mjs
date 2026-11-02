import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const banned =
  /\b(cure|guaranteed|diagnos|suicide|kill myself|onlyfans|escort|nude|porn|hostess)\b/i;

export function usableOnACard(item) {
  const words = item.split(/\s+/).filter(Boolean);
  if (words.length < 6 || words.length > 16) return false;
  if (/[|/]/.test(item) || /\s-\s[A-Z]/.test(item)) return false;
  if (/\b(faq|recruitment|cookie|signup|log in|download|surgery|plasty|blood|symptom|treatment|prescription)\b/i.test(item))
    return false;
  if (/\b(has anyone|my result|i was|i have|diagnosed)\b/i.test(item)) return false;
  const capitals = words.filter((word) => /^[A-Z]/.test(word)).length;
  if (!item.includes("?") && capitals > words.length / 2) return false;
  return true;
}

function brandRoot() {
  return path.join(process.cwd(), process.cwd().endsWith(`${path.sep}web`) ? ".." : ".", "brand");
}

function metricNumber(value) {
  const parsed = Number(String(value ?? "").replace("%", ""));
  return Number.isFinite(parsed) && String(value ?? "").trim() ? parsed : null;
}

export function writeWeeklyBriefs({ week, themes, sources, pieces }) {
  const root = path.join(brandRoot(), "briefs");
  mkdirSync(root, { recursive: true });
  const niches = ["clinical", "analytical", "mentalhealth", "gcsealevel"];
  const written = [];
  for (const niche of niches) {
    const mine = themes.filter((theme) => theme.niche === niche);
    const phrases = mine.filter((theme) => usableOnACard(theme.text) && !banned.test(theme.text));
    const avoid = mine.filter((theme) => !phrases.includes(theme));
    const reports = sources.filter((source) => source.niche === niche);
    const cards = pieces.filter((piece) => piece.niche === niche);
    const scored = cards
      .map((piece) => ({
        id: piece.id,
        line: piece.line,
        views: metricNumber(piece.metrics?.["7d"]?.views) ?? metricNumber(piece.metrics?.["24h"]?.views),
        saves: metricNumber(piece.metrics?.["7d"]?.saves) ?? metricNumber(piece.metrics?.["24h"]?.saves),
      }))
      .filter((piece) => piece.views !== null);
    const winner = [...scored].sort((a, b) => (b.saves ?? 0) - (a.saves ?? 0) || b.views - a.views)[0];
    const flop = [...scored].sort((a, b) => (a.saves ?? 0) - (b.saves ?? 0) || a.views - b.views)[0];
    const lines = [
      "<!-- Generated from web/data. Do not edit by hand. Run node scripts/generate-brand-docs.mjs -->",
      `# ${niche} ${week}`,
      "",
      "The writer may use this page for this week only. A phrase that is not under Audience phrases is not an audience phrase.",
      "",
      "## Winners",
      winner ? `- ${winner.id}: “${winner.line}” with ${winner.saves ?? 0} saves.` : "- No piece has views stored, so this week has no winner.",
      "",
      "## Flops",
      flop && scored.length > 1 ? `- ${flop.id}: “${flop.line}” with ${flop.saves ?? 0} saves.` : "- No piece has views stored, so this week has no flop.",
      "",
      "## Audience phrases",
      ...(phrases.length ? phrases.map((theme) => `- ${theme.text}`) : ["- None passed the card filter."]),
      "",
      "## Topics to avoid",
      ...(avoid.length ? avoid.map((theme) => `- ${theme.text}`) : ["- None filed."]),
      "",
      "## Virlo",
      ...reports
        .filter((source) => source.name === "Virlo")
        .map((source) => `- ${source.status}. ${source.detail}`),
      "",
      "## Sources",
      ...reports.map((source) => `- ${source.name}: ${source.status}. ${source.detail}`),
      "",
    ];
    const file = path.join(root, `${niche}-${week}.md`);
    writeFileSync(file, lines.join("\n"));
    written.push(file);
  }
  return written;
}

export function writeWeeklyBriefsFromDisk() {
  const data = path.join(process.cwd(), process.cwd().endsWith(`${path.sep}web`) ? "data" : "web/data");
  const research = JSON.parse(readFileSync(path.join(data, "research.json"), "utf8"));
  const pieces = JSON.parse(readFileSync(path.join(data, "desk.json"), "utf8"));
  return writeWeeklyBriefs({
    week: research.week,
    themes: research.themes ?? [],
    sources: research.sources ?? [],
    pieces,
  });
}
