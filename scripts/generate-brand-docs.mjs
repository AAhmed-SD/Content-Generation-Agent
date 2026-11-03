import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { templates } from "../remotion/src/template-schema.mjs";
import { writeWeeklyBriefsFromDisk } from "../web/src/lib/weekly-briefs.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const brand = path.join(root, "brand");
const banner = "<!-- Generated from code. Do not edit by hand. Run node scripts/generate-brand-docs.mjs -->";

function fieldMeta(field) {
  const description = field.description ?? "";
  const values = field.options ?? field.def?.entries ?? null;
  const inner = field.element ?? field.def?.element ?? field._def?.type;
  return { description, values, inner };
}

function slotLines(schema) {
  const lines = [];
  for (const [name, field] of Object.entries(schema.shape)) {
    const meta = fieldMeta(field);
    const values = Array.isArray(meta.values) ? ` One of: ${meta.values.join(", ")}.` : "";
    const inner = meta.inner?.description ? ` Each item: ${meta.inner.description}` : "";
    lines.push(`- \`${name}\`. ${meta.description}${values}${inner}`);
  }
  return lines;
}

function writeTemplates() {
  const lines = [
    banner,
    "# Templates",
    "",
    "Pick a template only from this file. The list is the Remotion schema. A template that is not here cannot be rendered.",
    "",
  ];
  for (const template of templates) {
    lines.push(`## ${template.id}`, "", template.for, "", "### Slots", ...slotLines(template.schema), "", "### When to pick it");
    for (const [format, reason] of template.when) {
      lines.push(`- ${format}: ${reason}`);
    }
    lines.push("");
  }
  writeFileSync(path.join(brand, "templates.md"), lines.join("\n"));
}

function writeAssets() {
  const folder = path.join(root, "remotion", "assets");
  mkdirSync(folder, { recursive: true });
  const files = readdirSync(folder).filter((name) => !name.startsWith(".") && name !== "README.md");
  const lines = [
    banner,
    "# Assets",
    "",
    "Generated from `remotion/assets`. An ID that is not listed does not exist. Do not ask for a pose, a prop, or a character that is missing.",
    "",
  ];
  if (files.length === 0) {
    const pin = templates.find((template) => template.id === "OffloadPin");
    const layoutField = pin?.schema.shape.layout;
    const names = layoutField?.options ?? layoutField?.def?.entries ?? [];
    const drawn = names.length ? names.join(", ") : "the paper layouts";
    lines.push(
      `The folder is empty. OffloadPin draws ${drawn}. There is no pose file and no photo to copy.`,
      "",
    );
  } else {
    for (const file of files) {
      const id = file.replace(/\.[a-z0-9]+$/i, "");
      lines.push(`- \`${id}\`. File \`${file}\`.`);
    }
    lines.push("");
  }
  writeFileSync(path.join(brand, "assets.md"), lines.join("\n"));
}

writeTemplates();
writeAssets();
const briefs = writeWeeklyBriefsFromDisk();
console.log(`Wrote templates, assets, and ${briefs.length} briefs.`);
