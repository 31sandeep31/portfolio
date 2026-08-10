# AGENTS.md

Personal portfolio site for Sandeep Kafle. Next.js 15 (App Router) + React 18 + TypeScript (strict) + Tailwind CSS v4 + HeroUI. Deployed to Vercel.

## Commands

- `npm run dev` — dev server (`next dev --turbopack`)
- `npm run build` — production build; `npm run start` — serve it
- `npm run lint` — `eslint --fix` (auto-fixes, so it can rewrite files)
- No test framework and no typecheck script. Run `npx tsc --noEmit` to typecheck.
- `package-lock.json` is gitignored even though `.npmrc` sets `package-lock=true`; do not commit it.

## Architecture notes

- HeroUI is imported as per-component packages, not one bundle: `@heroui/card`, `@heroui/button`, `@heroui/navbar`, etc. Never import from a global `@heroui/react`.
- Tailwind v4 is configured CSS-first in `styles/globals.css`. The HeroUI theme plugin `heroui()` lives in the root `hero.ts` and is loaded via `@plugin '../hero.ts'`; the plugin must stay at the repo root for that relative path.
- Path alias `@/*` maps to the repo root.
- New pages are plain App Router routes under `app/`; no other routing setup.

## Gallery

The gallery is file-driven and self-documenting: read `public/gallery/README.md` before touching anything. Sections = folders under `public/gallery/<folder>/`, cataloged in `app/gallery/galleryData.ts` (`categoryConfig`). Dropping/removing images needs no code; adding a section means adding a `categoryConfig` entry. Images are scanned at build/runtime via Node `fs`, so new images require a rebuild to appear in a static deploy.

## Privacy: the CV is intentionally not public

- The `/cv` route (`app/cv/page.tsx`) deliberately shows a blurred placeholder plus a mailto request form. Do not link, embed, or serve the real CV.
- Local CV copies live in `private/` (gitignored) and `my information/` (tracked).
- `scripts/generate-cv.py` writes `public/cv/Sandeep_Kafle_CV.pdf` — anything under `public/` is served publicly, so running it exposes the CV. Do not run it (or commit its output).

## Repo hygiene

- `my information/` contains personal photos and a CV PDF and IS tracked in git (98 files). Do not add more personal files to the repo, and do not copy these into `public/`.
- `public/gallery/README.md` is the canonical guide for gallery edits; keep it in sync if you change how the gallery works.
- Favicons are generated from `public/sign.jpg` via `scripts/make-favicon.mjs` (uses `sharp`); regenerate after changing `sign.jpg`, don't hand-edit the PNGs.
