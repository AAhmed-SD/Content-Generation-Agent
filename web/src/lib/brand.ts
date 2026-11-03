import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "..", "brand");

export const brandDocs = [
  { slug: "brand", file: "brand.md", title: "Brand", group: "System" },
  { slug: "product-facts", file: "product-facts.md", title: "Product facts", group: "System" },
  { slug: "hooks", file: "hooks.md", title: "Hooks", group: "System" },
  { slug: "safety", file: "safety.md", title: "Safety", group: "System" },
  { slug: "platforms", file: "platforms.md", title: "Platforms", group: "System" },
  { slug: "templates", file: "templates.md", title: "Templates", group: "Generated" },
  { slug: "assets", file: "assets.md", title: "Assets", group: "Generated" },
  { slug: "clinical", file: "niches/clinical.md", title: "offload.clinical", group: "Niches" },
  { slug: "analytical", file: "niches/analytical.md", title: "offload.analytical", group: "Niches" },
  { slug: "mentalhealth", file: "niches/mentalhealth.md", title: "offload.mentalhealth", group: "Niches" },
  { slug: "gcsealevel", file: "niches/gcsealevel.md", title: "offload.gcsealevel", group: "Niches" },
  { slug: "hook", file: "posts/hook.md", title: "Hook", group: "Content" },
  { slug: "payoff", file: "posts/payoff.md", title: "Payoff", group: "Content" },
  { slug: "still", file: "posts/still.md", title: "Still", group: "Content" },
  { slug: "carousel", file: "posts/carousel.md", title: "Carousel", group: "Content" },
  { slug: "motion", file: "motion.md", title: "Motion", group: "Picture" },
  { slug: "sound", file: "sound.md", title: "Sound", group: "Picture" },
] as const;

export type BrandSlug = (typeof brandDocs)[number]["slug"];

export function listBriefs() {
  try {
    return readdirSync(path.join(root, "briefs"))
      .filter((name) => name.endsWith(".md"))
      .map((name) => ({
        slug: name.replace(/\.md$/, ""),
        file: `briefs/${name}`,
        title: name.replace(/\.md$/, ""),
        group: "This week",
      }));
  } catch {
    return [];
  }
}

export function brandDoc(slug: string) {
  return brandDocs.find((doc) => doc.slug === slug) ?? listBriefs().find((doc) => doc.slug === slug);
}

export function readBrandFile(file: string) {
  return readFileSync(path.join(root, file), "utf8");
}

const editableFiles = new Set([
  "brand.md",
  "product-facts.md",
  "posts/hook.md",
  "posts/payoff.md",
  "posts/still.md",
  "posts/carousel.md",
  "motion.md",
  "sound.md",
]);

export function brandFileEditable(slug: string) {
  const doc = brandDocs.find((item) => item.slug === slug);
  return Boolean(doc && editableFiles.has(doc.file));
}

export function writeBrandFile(file: string, text: string) {
  if (!editableFiles.has(file)) throw new Error("This file is not editable.");
  const full = path.resolve(root, file);
  const folder = path.resolve(root);
  if (full !== path.join(folder, file)) throw new Error("This file is not editable.");
  const clean = text.replace(/^\uFEFF/, "").replace(/\0/g, "").replace(/\r\n/g, "\n");
  writeFileSync(full, clean.endsWith("\n") ? clean : `${clean}\n`, "utf8");
}

export function section(markdown: string, heading: string) {
  const lines = markdown.split("\n");
  const start = lines.findIndex((line) => line.trim().toLowerCase() === `## ${heading}`.toLowerCase());
  if (start < 0) return "";
  const body: string[] = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    if (lines[index].startsWith("## ")) break;
    body.push(lines[index]);
  }
  return body.join("\n").trim();
}

export function nicheCopy(nicheId: string) {
  const doc = brandDoc(nicheId);
  if (!doc) return { line: "", goal: "", never: "" };
  const text = readBrandFile(doc.file);
  return {
    line: section(text, "Line").split("\n")[0] ?? "",
    goal: section(text, "Goal"),
    never: section(text, "Rules"),
  };
}

export function postSlug(format: string, part: string) {
  if (format === "still") return "still";
  if (format === "carousel") return "carousel";
  if (part.toLowerCase().includes("payoff")) return "payoff";
  return "hook";
}

export function postCopy(format: string, part: string) {
  const doc = brandDoc(postSlug(format, part));
  if (!doc) return { job: "", success: "" };
  const text = readBrandFile(doc.file);
  return { job: section(text, "Job"), success: section(text, "Success") };
}

export function scriptContext(nicheId: string, format: string, part: string) {
  const niche = nicheCopy(nicheId);
  const post = postCopy(format, part);
  const rules = section(readBrandFile("brand.md"), "Hard rules");
  const facts = section(readBrandFile("product-facts.md"), "Allowed");
  const assets = readBrandFile("assets.md");
  return [
    "Hard rules:",
    rules,
    "Product claims that are allowed:",
    facts,
    "Niche:",
    niche.goal,
    niche.never ? `Rule: ${niche.never}` : "",
    post.job ? `This piece: ${post.job}` : "",
    post.success ? `It is working when: ${post.success}` : "",
    assets.includes("The folder is empty")
      ? "There is no pose and no prop. Do not name one."
      : "Poses and props may only be IDs listed in assets.md.",
  ]
    .filter(Boolean)
    .join("\n");
}
