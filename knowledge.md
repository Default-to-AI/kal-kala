# Project knowledge — kal-kala

## What this is
**Kal-Kala** (קל-כל-ה) — an interactive RTL/Hebrew web platform for accounting students, with guided step-by-step exercises on equity, loans, bonds, securities, equity-method investment, and cash-flow statements. Inherits its design + tech from a sibling project called **statisti-kal**.

The actual app lives under `web/` — the repo root holds `.agents/` (skills + types) and this `knowledge.md`.

## Quickstart
Run everything from inside `web/`:

| Action | Command | Notes |
|---|---|---|
| Install | `cd web && npm install` | one-time |
| Dev | `cd web && npm run dev` | Vite dev server, HMR |
| Build | `cd web && npm run build` | `tsc -b && vite build` (TS project refs) |
| Preview build | `cd web && npm run preview` | |
| Lint | `cd web && npm run lint` | Oxlint (see `web/.oxlintrc.json`) |
| Test | `cd web && npm test` | vitest run, CI-friendly exit code; `npm run test:watch` for interactive watch |
| Coverage | `cd web && npm run test:coverage` | vitest with `@vitest/coverage-v8` (v8 provider). HTML report in `web/coverage/index.html`; text summary in stdout |
| CI | n/a — triggered on push/PR | `.github/workflows/ci.yml` runs `lint` → `test` → `build` in `web/`, on Node 22 + ubuntu-latest. Cancel-in-progress concurrency group is set. |

## Architecture

```
web/
  index.html              ← lang="he" dir="rtl", loads Google Fonts + KaTeX via main.tsx
  src/
    main.tsx              ← React 19 root; imports katex CSS + index.css
    App.tsx               ← BrowserRouter; routes for 7 chapters + LandingPage
    index.css             ← DESIGN.md token bridge (@theme for Tailwind v4)
    components/
      LandingPage.tsx     ← grid of chapter cards
      SiteHeader.tsx      ← sticky nav w/ active-route highlight
      SiteFooter.tsx
      PageTransition.tsx
      ScrollToTopButton.tsx
      pages/              ← one file per chapter (EquityChapter, BondsChapter, …)
      ui/                 ← shared primitives (Card, etc.)
    hooks/
      useLocalStorageState.ts   ← typed localStorage state hook
      useNumericField.ts        ← numeric input helper
      useScrollPosition.ts
    utils/
      accounting.ts       ← pure functions: bond amortization (straight-line + effective interest), accrued interest cutoff
      accounting.test.ts  ← vitest unit tests for the above
  docs/syllabus.md        ← Hebrew course syllabus (10 chapters)
  package.json
  vite.config.ts          ← plugins: react(), tailwindcss() (v4 vite plugin)
  tsconfig.{json,app,node}.json ← TS project refs; ES2023, bundler resolution, jsx: react-jsx
  .oxlintrc.json          ← react plugins + rules-of-hooks / only-export-components
```

### Routing map (App.tsx)
- `/` → LandingPage
- `/equity`, `/changes-in-equity`, `/loans`, `/bonds`, `/securities`, `/equity-method`, `/cash-flow` → chapter pages

### Syllabus ↔ app mapping
The course syllabus (`web/docs/syllabus.md`) lists **11 topics**, but the app teaches them as **7 chapters**:
- App #4 (Bonds) covers only syllabus #4 (straight-line amortization). Syllabus #5 (effective-interest method) is **not yet taught** in the app.
- App #7 (Cash Flow) folds syllabus #8–11 into a single chapter.
- See the "מיפוי ל-7 פרקי האפליקציה" table at the bottom of `web/docs/syllabus.md` for the canonical mapping (and the explicit list of uncovered topics).

### LandingPage card-title conventions
The cards in `web/src/components/LandingPage.tsx` mix two styles on purpose — do not unify them:
- **Formal chapter-title cards** (Equity, Changes-in-Equity, Securities, Equity-Method, Cash-Flow): the H3 inside `<Card>` matches the chapter file's `<PageHeader title>` exactly.
- **Technique-focused cards** (Loans → "הלוואות וחתך ריבית"; Bonds → "אג״ח (הפחתה בקו ישר)"): the H3 is a punchy one-liner describing the lesson focus rather than the formal chapter title. Keep this convention; do not "correct" them back to the formal title.

### Chapter file naming
All chapter files use `<Stem>Chapter.tsx`. Compounds have no separator (`ChangesInEquityChapter.tsx`, `CashFlowChapter.tsx`, `EquityMethodChapter.tsx`). Routes use kebab-case English (`/changes-in-equity`, `/equity-method`).

### State / data flow
- Pure accounting math in `src/utils/accounting.ts` (no React, no I/O) — easy to unit-test.
- Per-chapter state lives in the chapter page component; cross-session persistence via `useLocalStorageState`.
- No backend. All data is static exercise fixtures embedded in the chapter components.

## Conventions

### Tech stack (pinned in `web/package.json`)
- **React 19**, **TypeScript ~6.0**, **Vite 8**
- **Tailwind CSS v4** via `@tailwindcss/vite` (no PostCSS config; tokens live in CSS `@theme`)
- **framer-motion** for animated transitions
- **KaTeX** for math rendering (via `<InlineMathToken>` in `web/src/components/ui/`). **Do NOT use `react-katex`** — its peer-dep range `react: ">=15.3.2 <20"` excludes React 19, so its `<InlineMath>` silently renders raw LaTeX (\cdot, \sigma, etc.). The wrapper calls `katex.renderToString()` + `dangerouslySetInnerHTML` directly.
- **lucide-react** for icons
- **react-router-dom v7**
- **vitest** for tests, **oxlint** for lint, **puppeteer** is a devDep (used by gstack browser skill)

### Design system is sacred — `web/DESIGN.md` is the source of truth
- **Index of 5 font roles:** Playfair Display (logo, italic) · David Libre (formal/heb accounting, THE font students recognize) · Outfit (UI chrome) · Plus Jakarta Sans (casual "classmate voice") · DM Sans (numbers, `tabular-nums`).
- **Palette** is dark-mode-first (Slate 900 bg, Emerald 500 accent) with `html.light` overrides. Semantic: `--positive` emerald, `--negative` rose, `--info` blue, `--warning` amber.
- **Tokens are mirrored** into `src/index.css` via `@theme` (Tailwind v4 exposes as `bg-primary`, `text-primary`, etc.) and `:root` CSS custom properties (consumed as `var(--color-*)`, `var(--spacing-*)`, `var(--rounded-*)`).
- **Restrained motion:** `var(--motion-duration-*)` + `var(--motion-easing-*)`. Respect `prefers-reduced-motion` — see the `@media` block at the bottom of `index.css`.
- **Signature classes** already implemented: `.accent-bar`, `.curve-glow`, `.stagger-in`, `.pulse-brass`, `.pulse-success`, `.pulse-error`, `.megamenu-*`.
- When in doubt: mirror values from DESIGN.md into `index.css`. Do not invent new tokens.

### Type/Tone with utility classes (defined in `index.css` `@layer utilities`)
- `.t-hero` → Playfair italic gradient (logo only)
- `.t-h1` / `.t-h2` / `.t-h3` → Outfit
- `.t-formal` / `.t-formal-title` → David Libre (definitions, journal entries, exercises)
- `.t-casual` → Plus Jakarta Sans (explanations, tips, side notes)
- `.t-data` → DM Sans with `tabular-nums` (financial tables, stat values, calculator inputs)

### RTL / KaTeX
- HTML is `dir="rtl"` Hebrew. KaTeX fragments are forced LTR via the `.katex*` overrides in `index.css` — **do not touch** this block (it's flagged "hard constraint" in comments).
- Every `<InlineMathToken>` self-imports `katex/dist/katex.min.css`, so it renders correctly even outside `main.tsx`'s global import (tests, Storybook, etc.). The KaTeX `.katex` wrapper class is the target of the index.css overrides.

### Coding patterns
- Components are **named exports** (`export function EquityChapter()`), not default — except `App.tsx` which is the Vite convention.
- Hooks: typed generics; co-locate reusable hooks in `src/hooks/`.
- Pure logic in `src/utils/*` is testable independent of React — keep calculations pure.

## Things to avoid / gotchas
- **Vitest config lives at `web/vitest.config.ts`** and merges on top of `vite.config.ts` so the dev plugins (`react()`, `tailwindcss()`) stay available for component tests. Currently pinned: `environment: 'node'`, `include: ['src/**/*.test.ts?(x)']`, `globals: false`, `setupFiles: []`. Change these explicitly when adding hook dependencies or new test environments — don't rely on default drift.
- **`noUnusedLocals` / `noUnusedParameters` are off** in `tsconfig.app.json` — don't rely on TS to catch unused imports. Lint is the gate.
- **Vite 8 + React 19 + TypeScript ~6** — bleeding-edge. If you see weird TS errors about types/Vite client, check `tsconfig.app.json` `types: ["vite/client"]` is preserved.
- **Tailwind v4 has no `tailwind.config.js`** — config is CSS-side in `index.css` `@theme`. Do not create a JS config.
- **`puppeteer` is heavy** (~300MB Chromium). First install is slow; don't re-install unless `package.json` changes.
- **`page-transition` / animation hazards:** Removing `data-state` attributes on Radix mega-menu elements will break positioning. Don't refactor `.mega-menu-*` CSS without testing open/close.
- **Submodules** `.agents/skills/{browser-harness,cron-job-maker,...}` are dirty in git status — leave them alone unless working on the skill itself.
- **Root has no app** — naive `npm run dev` from repo root will fail. Always `cd web` first.
- **Hebrew content:** Don't transliterate in code/tests — exercises reference companies like "חברת שניר", use literal strings.
- **`x.oxlintrc.json` only enables a few rules.** For stricter type-aware linting, follow `web/README.md` guidance to add `oxlint-tsgolint`.

## Common workflows
- **Add a new chapter:** create `src/components/pages/<Name>Chapter.tsx`, register route in `src/App.tsx`, add a landing-page card in `LandingPage.tsx`.
- **Add an accounting formula:** create a pure function in `src/utils/accounting.ts`, write a vitest spec next to it (`*.test.ts`).
- **Add a new design token:** edit `web/DESIGN.md` first, then mirror into `:root` and (if Tailwind utility exposure is wanted) `@theme` blocks in `src/index.css`.

## References
- Course syllabus: `web/docs/syllabus.md` (Hebrew, 10 topics)
- Design system spec: `web/DESIGN.md`
- Project-level conventions: `AGENTS.md` (root) and `~/.knowledge.md`
