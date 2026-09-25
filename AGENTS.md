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

## Site assistant (AI chat widget)

- Floating chat bubble (`components/chat-widget.tsx`) mounted in `app/layout.tsx`, calling `app/api/chat/route.ts`.
- The route streams from the Gemini API with plain `fetch` — no AI SDK dependency. Requires `GEMINI_API_KEY` (set in `.env.local` locally, and in Vercel project env vars). Without it the route returns 503 and the widget shows that message.
- `GEMINI_MODEL` optionally overrides the default (`gemini-3.5-flash`).
- Client-safe UI strings (greeting, chips) live in `config/assistant.ts`. The prompt and CV knowledge live in `config/assistant-knowledge.ts`, which is `import "server-only"` — that build guard is what keeps CV content out of the browser. Never move the prompt into `config/assistant.ts` or import the knowledge file from a client component.
- **After any build, verify no leak**: search `.next/static` for a CV phrase (e.g. `Briha Tech`). It must not appear; UI strings like `Open site assistant` should.
- The assistant may answer questions from the CV and write essays from it, but must not reproduce the CV as a document — `/cv` stays the only path to the real file, and `public/cv/` must never exist. Reference contacts in the prompt are names/roles only.
- Abuse controls are best-effort: same-origin check, 12 requests/minute/IP in-memory counter (resets per serverless instance), 16 messages × 4000 chars max.

## Privacy: the CV is intentionally not public

- The `/cv` route (`app/cv/page.tsx`) deliberately shows a blurred placeholder plus a mailto request form. Do not link, embed, or serve the real CV.
- Local CV copies live in `private/` (gitignored) and `my information/` (tracked).
- `scripts/generate-cv.py` writes `public/cv/Sandeep_Kafle_CV.pdf` — anything under `public/` is served publicly, so running it exposes the CV. Do not run it (or commit its output).

## Repo hygiene

- `my information/` contains personal photos and a CV PDF and IS tracked in git (98 files). Do not add more personal files to the repo, and do not copy these into `public/`.
- `public/gallery/README.md` is the canonical guide for gallery edits; keep it in sync if you change how the gallery works.
- Favicons are generated from `public/sign.jpg` via `scripts/make-favicon.mjs` (uses `sharp`); regenerate after changing `sign.jpg`, don't hand-edit the PNGs.
