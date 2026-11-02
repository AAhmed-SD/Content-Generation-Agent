# Offload desk

Two people, four niches, one paper card. Claude writes a script from the brand files and the week’s brief. Remotion renders `OffloadCard`. A person posts by hand.

## Map

- `brand/` is what the model may say. `templates.md`, `assets.md`, and `brand/briefs/` are generated. Do not edit those by hand.
- `web/` is the desk. Pieces live in `web/data/desk.json`. Week research lives in `web/data/research.json` and `web/data/briefs.json`.
- `remotion/` is the picture. The schema is `remotion/src/template-schema.mjs`. Colours are `remotion/src/tokens.ts` and the variables in `web/src/app/globals.css`.
- `remotion/assets/` is the only pose and prop folder. It is empty. There is no character to place.
- `scripts/generate-brand-docs.mjs` rewrites the generated files.
- `web/.env.local` holds secrets. It is gitignored.

## Commands

From `web/`:

```
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Regenerate templates, assets, and this week’s briefs from the repo root:

```
node scripts/generate-brand-docs.mjs
```

Remotion studio, from `remotion/`:

```
npm run dev
```

## Conventions

Never hardcode colours. Use `tokens` in Remotion and the CSS variables `--paper`, `--ink`, `--blue`, `--stamp`, `--line`, `--quiet` in the desk. The values match. Change both together.

Never add a product claim that is not in `brand/product-facts.md`. Never name a pose or a prop that is not in `brand/assets.md`. Never put a number on a card that is not already in the week’s brief.

The writer reads `brand.md`, the niche file, `safety.md`, `platforms.md`, `product-facts.md`, `templates.md`, `assets.md`, and `brand/briefs/{niche}-{week}.md`. It does not read raw research.
