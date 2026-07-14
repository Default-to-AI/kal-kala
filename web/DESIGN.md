# Design System — Kal-Kala

## Product Context
- **What this is:** Interactive accounting learning platform for students
- **Who it's for:** Hebrew-speaking accounting students
- **Space/industry:** Educational technology, accounting
- **Project type:** Web app (React SPA)
- **Memorable thing:** The complex math felt approachable

## Aesthetic Direction
- **Direction:** Editorial/Utilitarian hybrid — clean modernist lines for data, editorial layout for learning
- **Decoration level:** Intentional — typography and micro-animations do the work, not heavy borders
- **Mood:** Precise but approachable. Like a well-organized notebook from the smartest person in class.
- **Inherited from:** statisti-kal project (same tech stack, same energy)

## Typography

Five fonts, five roles. The typography system is the backbone of the content hierarchy.

### Logo
- **Font:** Playfair Display (italic, weight 700)
- **Usage:** "Kal-Kala" brand mark only. English, italic, with emerald gradient.
- **Loading:** Google Fonts

### Formal (Accounting Voice)
- **Font:** David Libre
- **Usage:** Exercises, formal definitions, journal entries, formal templates. Mirrors the Word documents in `docs/chapter-materials/`.
- **Size:** 1.25rem body / 1.55rem title (post-2025-07-13 bump for Hebrew legibility)
- **Line height:** 1.85-1.95
- **Rationale:** David is THE Hebrew accounting font. Students recognize it from textbooks and official materials. Using it for formal content creates instant credibility.

### Display (UI Voice)
- **Font:** Outfit
- **Usage:** Headings, labels, buttons, navigation, UI chrome
- **Weights:** 400-800
- **Rationale:** Geometric, friendly, sharp. Gives the app a modern tech feel without being cold.

### Casual (Classmate Voice)
- **Font:** Plus Jakarta Sans
- **Usage:** Explanations, side notes, tips, "classmate genius helper" commentary, any informal text
- **Size:** 1.125rem (post-2025-07-13 bump)
- **Line height:** 1.7-1.75
- **Rationale:** Highly legible, warm personality. Creates a clear tonal shift from the formal David Libre content.

### Data (Numbers Voice)
- **Font:** DM Sans (with `font-variant-numeric: tabular-nums`)
- **Usage:** Numbers in tables, calculators, financial figures, stat cards
- **Size:** 0.85-1.75rem depending on context
- **Rationale:** Clean zeros (no dotted zero), perfect digit alignment via tabular-nums. Looks professional without the "programmer terminal" aesthetic of monospace fonts.

### Loading Strategy
All fonts loaded via Google Fonts `<link>` tag with `display=swap`:
```
David Libre (400, 500, 700)
Outfit (300-800)
Playfair Display (400-800, italic 400)
Plus Jakarta Sans (300-700, italic 400)
DM Sans (400-700)
```

### Type Scale
| Level | Font | Size | Weight | Use |
|-------|------|------|--------|-----|
| Hero | Playfair Display | clamp(2.5rem, 5vw, 4rem) | 700 italic | Logo only |
| H1 | Outfit | clamp(1.75rem, 3vw, 2.25rem) | 700 | Page titles |
| H2 | Outfit | 1.375rem | 600 | Section headings |
| H3 | Outfit | 1.125rem | 600 | Card/block headings |
| Formal Title | David Libre | 1.55rem | 700 | Definition terms, exercise headers |
| Formal Body | David Libre | 1.25rem | 400 | Formal content body |
| Casual Body | Plus Jakarta Sans | 1.125rem | 400 | Explanations, tips |
| Data Large | DM Sans | 1.75rem | 600 | Stat card values |
| Data Table | DM Sans | 0.85rem | 500 | Table cells |
| Label | Outfit | 0.75rem | 600 uppercase | Section labels, badges |

> **Note (2025-07-13):** Tailwind `.text-xs/.sm/.base/.lg/.xl` overrides were tightened beyond the original 0.85/0.95/1.05/1.2/1.35 scale — see `index.css @layer base - Hebrew legibility`. This affects inline Tailwind sizing across all components, not just these role-font utilities.

## Color

### Source of truth: `web/src/index.css :root`

`index.css` is the canonical implementation of the color system. The lists below are derived *from* `:root`, not the other way around — when the CSS changes, update DESIGN.md in the same commit. Do not invent new tokens here; mirror from index.css.

A previous version of this file listed legacy tokens (`--bg`, `--text`, `--surface`, `--positive`, `--accent`, …). Those were all consolidated into canonical `--color-*` names on 2025-07-13 (see Decisions Log). The only legacy token intentionally retained is `--accent-glow`, an rgba that has no canonical equivalent — see "Intentionally retained legacy token" below.

### Surfaces (dark mode base)

| Token | Value | Semantic |
|---|---|---|
| `--color-background` | `#0f172a` | Slate 900 — document body |
| `--color-surface` | `#1e293b` | Slate 800 — cards, panels |
| `--color-surface-raised` | `#334155` | Slate 700 — borders, dividers, raised banner backgrounds |
| `--color-surface-elevated` | `#475569` | Slate 600 — hovered elevations |
| `--color-border` | `#334155` | Default border (same hex as `surface-raised`, kept separate for theming) |
| `--color-border-strong` | `#475569` | Prominent bordered containers |

### Text layer

| Token | Value | Semantic |
|---|---|---|
| `--color-text-primary` | `#f1f5f9` | Slate 100 — primary text, headings, key content |
| `--color-text-secondary` | `#94a3b8` | Slate 400 — secondary text, labels |
| `--color-text-tertiary` | `#64748b` | Slate 500 — disabled, placeholder, dimmed meta (added 2025-07-13, was previously `--text-dim`) |

### Primary

| Token | Value | Semantic |
|---|---|---|
| `--color-primary` | `#10b981` | Emerald 500 — primary action, positive amounts, success. The canonical name for the legacy `--accent`. |

### Accent layer (Academic Precision)

These are role-specific accents. Most components stay on `--color-primary` (emerald); the accent set is for chart-accurate statistical contexts (z-scores, H₀/H₁, α/β regions) and for design polish that needs to distinguish "active" from "primary".

| Token | Value | Semantic |
|---|---|---|
| `--color-accent-primary` | `#4361EE` | Indigo — generic accent anchor (used for the `.accent-bar` gradient endpoint) |
| `--color-accent-brass` | `#D4A843` | Brass — H₀ reference curve, ledger spine, formal accent |
| `--color-accent-teal` | `#10B981` | Teal/Green — Power (1-β), acceptance regions, H₁ reference |
| `--color-accent-crimson` | `#EF4444` | Crimson — Type I error (α), rejection regions, error state |
| `--color-accent-amber` | `#FFBF00` | Amber — warning-adjacent for chart contexts (NOT the warning chip — see semantic aliases) |
| `--color-accent-cobalt` | `#4361EE` | Indigo — Active/Selected state, navigation pill background; reads clearly on dark surfaces |

### Accent variants — cobalt specifically

These pre-compute the indigo at various alpha levels for state stacking (background washes, hover, lines). Live as their own tokens so theming can rewire them.

| Token | Value | Use |
|---|---|---|
| `--color-accent-cobalt-bg` | `rgba(67, 97, 238, 0.08)` | 8% indigo wash — selected nav pill, current TOC entry background |
| `--color-accent-cobalt-bg-hover` | `rgba(67, 97, 238, 0.15)` | 15% — hover state on cobalt-bg |
| `--color-accent-cobalt-line` | `rgba(67, 97, 238, 0.4)` | 40% — borders on cobalt-accented panels |
| `--color-accent-cobalt-strong` | `#364EC7` | Indigo-on-indigo-bg text color (AA contrast) |
| `--color-accent-cobalt-dark` | `#2B3EA1` | Deepest cobalt state |

### Semantic aliases (intuitive color names)

Short names for common component intent. Each alias resolves to an accent token above. Use these in component code, not the accent layer directly, unless you specifically need the chart or contrast role of the underlying accent.

| Token | Value | Use |
|---|---|---|
| `--color-success` | `#10B981` | Correct answers, credit amounts, positive totals. |
| `--color-error` | `#EF4444` | Errors, debit amounts, negative numbers, rejections. |
| `--color-warning` | `#D4A843` | Caution chips, missing data, "read this first" highlights. (See Decisions Log 2025-07-13 — shifted from amber `#f59e0b` to brass `#D4A843` during consolidation.) |
| `--color-info` | `#4361EE` | Info chips, definition-block borders, formal content accents. (See Decisions Log 2025-07-13 — shifted from blue `#3b82f6` to indigo.) |
| `--color-info-bg` | `rgba(67, 97, 238, 0.15)` | 15% indigo wash — role-formal badge background. (Mirrors the `--color-accent-cobalt-bg` variant pattern; added 2025-07-13.) |

### Chart colors (Recharts / Chart.js parity)

| Token | Value | Use |
|---|---|---|
| `--chart-1` | `#4361EE` | First series (indigo) |
| `--chart-2` | `#10B981` | Second series (emerald) |
| `--chart-3` | `#1A1A1A` | Ink series |
| `--chart-4` | `var(--color-accent-teal)` | H₁ reference curve (aliased to emerald accent) |
| `--chart-5` | `#EF4444` | Rejection region (crimson) |
| `--chart-grid` | `#E2E2E2` | Grid line color |
| `--chart-axis-label` | `#4A4A4A` | Axis tick labels |
| `--chart-rejection` | `rgba(239, 68, 68, 0.2)` | α region shading |
| `--chart-acceptance` | `rgba(16, 185, 129, 0.2)` | 1−β region shading |

### Shadow tokens

| Token | Value | Use |
|---|---|---|
| `--shadow-soft` | `0 1px 2px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.06)` | Default elevation (cards, panels) |
| `--shadow-elevated` | `0 4px 6px rgba(0,0,0,0.05), 0 10px 15px rgba(0,0,0,0.1)` | Hover/drop state |

### Intentionally retained legacy token

`--accent-glow: rgba(16, 185, 129, 0.15)` is the **only** legacy DESIGN.md token preserved during the 2025-07-13 consolidation. It is an emerald-with-alpha rgba value consumed only as a Tailwind shadow tint (e.g. `hover:shadow-lg hover:shadow-[var(--accent-glow)]` on LandingPage card hover-glows and the ExerciseStep "show solution" button hover background). It has no opaque canonical equivalent — aliasing through `--color-primary` would lose the alpha channel — so when a glow is needed, use `--accent-glow` directly. A `--color-accent-glow` mirror is intentionally NOT defined.

### Text Contrast Rules
- **Headings and key content:** `var(--color-text-primary)` (#f1f5f9)
- **Body text on cards:** `var(--color-text-primary)` with `opacity: 0.85` (NOT `--color-text-secondary`)
- **Secondary labels:** `var(--color-text-secondary)` (#94a3b8)
- **Disabled/placeholder:** `var(--color-text-tertiary)` (#64748b)

### Financial Color Conventions
- **Positive amounts / credits:** `var(--color-success)` (emerald)
- **Negative amounts / debits:** `var(--color-error)` (crimson)
- **Neutral amounts:** `var(--color-text-primary)` (default)
- **Formal content accent border:** `var(--color-info)` (indigo — was blue pre-2025-07-13)

## Light Mode

### Status: NOT IMPLEMENTED (gap)

`html.light` overrides are documented below for the next person to wire up, but the **override block is currently absent from `web/src/index.css`**. Today, `:root` defines dark-mode values only and `html { color-scheme: light; }` is set without a token override — `document.documentElement.classList.add('light')` produces no visible theme change.

The original draft of DESIGN.md published a light-mode override for the legacy tokens (`--bg`, `--text`, …). When light mode ships, the same hex values apply — re-keyed to the canonical `--color-*` names, plus a dimmer `--accent-glow`:

```css
html.light {
  --color-background: #f8fafc;        /* was --bg: #f8fafc */
  --color-surface: #ffffff;          /* was --surface: #ffffff */
  --color-surface-raised: #f1f5f9;   /* was --surface-alt: #f1f5f9 */
  --color-surface-elevated: #e2e8f0; /* was --elevated: #e2e8f0 */
  --color-text-primary: #0f172a;     /* was --text: #0f172a */
  --color-text-secondary: #475569;   /* was --text-muted: #475569 */
  --color-text-tertiary: #94a3b8;    /* was --text-dim: #94a3b8 */
  --accent-glow: rgba(16, 185, 129, 0.10); /* dimmer glow for light surfaces */
}
```

### Open design decisions before light mode ships

These are unresolved and need a design pass before the override block can be merged:

1. **Primary on white.** `--color-primary: #10b981` emerald on `#ffffff` surfaces passes AA for large text but fails AA for small text. Should light mode override `--color-primary` to `#065f46` (emerald-900, the legacy `--accent-dim`) for AA on small body text, or keep `#10b981` and require larger font sizes for emerald-on-light call-to-actions?
2. **Definition-block raw-blue escapees.** `.definition-block` in `index.css @layer components` uses raw `#3b82f6` in two places (`border-right` and `.role-formal`): `--color-info` should be substituted before light mode ships so the indigo shifts with theme.
3. **Accent-amber vs warning.** `--color-accent-amber` (#FFBF00) was designed as *chart*-amber (statistical warning only); the UI `--color-warning` (brass #D4A843) is a separate, calmer warning. Confirm amber does NOT migrate into UI warning chips in light mode.
4. **Shadow strength on white.** `--shadow-soft` and `--shadow-elevated` use `rgba(0,0,0,0.04)` etc. — readable on dark surfaces. On white surfaces, shadows need to be deeper or skip the `0.04` tier entirely. A `--shadow-soft-light` override may be needed.
5. **Cobalt active state on light surface.** `--color-accent-cobalt-bg` (8% indigo rgba) on `#ffffff` is barely visible (~2.5:1 contrast). Light mode may need a heavier `--color-accent-cobalt-bg` (e.g. 15%) or a solid hex fallback.

## Spacing
- **Base unit:** 4px
- **Density:** Comfortable — financial data needs breathing room
- **Scale:**

| Token | Value | Usage |
|-------|-------|-------|
| 2xs | 2px | Hairline gaps |
| xs | 4px | Tight internal padding |
| sm | 8px | Table cell padding, small gaps |
| md | 16px | Component padding, standard gap |
| lg | 24px | Card padding, section gaps |
| xl | 32px | Card internal padding |
| 2xl | 48px | Section spacing |
| 3xl | 64px | Page section padding |

> **Note:** Spacing tokens live in `index.css :root` as `--spacing-0_5` … `--spacing-24`. They are intentionally NOT in `@theme` — the design instruction is to consume them via `var(--spacing-N)` directly (no Tailwind utility generation for spacing).

## Layout
- **Approach:** Grid-disciplined — strict alignment for financial tables, stacked cards on mobile
- **Max content width:** 1120px
- **Border radius scale:** sm: 4px, md: 8px, lg: 12px, full: 9999px (exposed as `--rounded-sm|md|lg|xl|2xl|full` var() tokens; `rounded-md` Tailwind utility not generated — use `var(--rounded-md)` directly)
- **Table style:** No borders. Zebra-striping with `rgba(255,255,255,0.02)` + hover glow with `--accent-glow`
- **Mobile tables:** `overflow-x: auto` with scroll, or convert to stacked `<Card>` elements

## Motion
- **Approach:** Intentional — Framer Motion spring transitions for calculations, micro-success pulses
- **Easing tokens** (canonical `index.css :root`):
  - `--motion-easing-standard`: `cubic-bezier(0.4, 0, 0.2, 1)` — generic UI transitions
  - `--motion-easing-entrance`: `cubic-bezier(0.16, 1, 0.3, 1)` — entering elements (mega-menu, content switch)
  - `--motion-easing-exit`: `cubic-bezier(0.4, 0, 1, 1)` — exiting elements
- **Duration tokens** (canonical `index.css :root`):

| Spec name | Token | Value | Usage |
|-------|-------|-------|-------|
| micro | `--motion-duration-fast` | 150ms | Instant feedback (hover, focus) |
| short | `--motion-duration-normal` | 280ms | Button transitions, small state changes |
| medium | `--motion-duration-slow` | 500ms | Card animations, page transitions |
| (choreographed) | `--motion-duration-choreographed` | 1000ms | Staggered mega-menu content switch |
| (stagger-step) | `--motion-stagger-delay` | 50ms | Per-item delay in choreographed entrances |

- **Success animation:** Emerald curve-glow/pulse when student enters correct answer
- **Calculator state:** Spring transition on result values when inputs change

> **Note (2025-07-13):** Motion tokens are defined via `--motion-duration-fast|normal|slow|choreographed` and `--motion-easing-standard|entrance|exit` in the second `:root` block of `index.css` (added later for the mega-menu animation system). They are distinct from the `micro|short|medium` table above (which is the spec) — the spec is realized via the fast/medium/slow tiers in the CSS. Keep the design intent here; the variable names are an implementation detail.

## Content Block Patterns

### Definition Block
- Border-right: 3px solid `var(--color-info)` (note: pre-2025-07-13 used raw `#3b82f6` blue — see Light Mode §Open decisions #2)
- Font: David Libre, 1.2rem body, 1.45rem term
- Padding: `var(--spacing-8)` vertical, `var(--spacing-12)` horizontal (32px / 48px — was `--sp-xl` / `--sp-2xl`)

### Exercise Block
- Font: David Libre, 1.2rem body
- Exercise number: Outfit, 0.8rem, uppercase, `var(--color-primary)` color
- Padding: `var(--spacing-8)` vertical, `var(--spacing-12)` horizontal (was `--sp-xl` / `--sp-2xl`)

### Tip/Explanation Block
- Font: Plus Jakarta Sans, 1.05rem (legacy) / 1.125rem (post-2025-07-13)
- Starts with emoji (💡, 👀, etc.) + bold label
- Uses casual, conversational tone

### Calculator Layout
- Two-column grid: inputs (left/right) | results (opposite side)
- Results panel: subtle green gradient background with `var(--color-primary)` border
- Numbers: DM Sans with tabular-nums
- Mobile: stacks to single column

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-07-11 | Initial design system created | Created by /design-consultation based on statisti-kal inheritance |
| 2025-07-11 | David Libre for formal content | Matches Word documents in chapter-materials; students recognize the font |
| 2025-07-11 | DM Sans over JetBrains Mono for data | Clean zeros, no dotted zero. Tabular-nums for alignment without monospace aesthetic |
| 2025-07-11 | Playfair Display for logo | English serif logo "Kal-Kala" in italic — editorial, distinguished |
| 2025-07-11 | Text contrast: opacity 0.85 over secondary text | `--color-text-secondary` (#94a3b8) is borderline-dim on dark cards; opacity-on-primary keeps body text bright with consistent type-color |
| 2025-07-13 | Bumped Tailwind text-size overrides (text-xs/sm/base/lg/xl + body + .t-formal/.t-formal-title/.t-casual) | User-reported "paragraphs are too small" complaint. text-xs was 0.85rem → 0.92rem (conservative bump to leave Badge `px-2 py-0.5` room on mobile); text-sm 0.95→1.0625rem (~17px); text-base 1.05→1.1875rem (~19px); text-lg 1.2→1.375rem; text-xl 1.35→1.5rem. Body 16.5→17.5px. David Libre body 1.15→1.25rem; titles 1.4→1.55rem. Plus Jakarta Sans 1.05→1.125rem |
| 2025-07-13 | Step-heading text-color shift to `var(--color-text-primary)` | The "שלב 2: מכירת מחצית..." step-heading disappeared into the cybernetic-background wallpaper because `text-[var(--color-accent-cobalt)]` (#4361EE) is the same indigo the wallpaper uses. Border underlines kept cobalt accent; text now bright slate-white. Applied across StepByStepExercise h4, EquityMethodChapter/SecuritiesChapter/CashFlowChapter/BondsChapter/EquityMethodChapter h3+h4 step headings |
| 2025-07-13 | ChapterNavigation renumbering | Bottom nav pill showed "8" for `/cash-flow` and skipped `5`. Renumbered CHAPTERS array to contiguous `1-7`. Verified LandingPage/SiteFooter/PageHeader titles already aligned with 1-7 |
| 2025-07-13 | Consolidated legacy `--accent-*` to canonical `--color-primary` | 8 files (App.tsx, LandingPage, ScrollToTopButton, SiteHeader, SiteFooter, ui/ExerciseStep, pages/SecuritiesChapter, pages/LoansChapter) had 70 `var(--accent)` references resolving to emerald #10b981 — aliasable to `--color-primary` with zero visual change. `var(--accent-glow)` and `var(--accent-dim)` retained (distinct rgba / distinct hex) |
| 2025-07-13 | Consolidated 13 more legacy DESIGN.md tokens to canonical `--color-*` names (`--bg`/`--text`/`--text-muted`/`--text-dim`/`--surface`/`--surface-alt`/`--elevated`/`--positive`/`--negative`/`--warning`/`--info`) | 14 `.tsx` files converted via single `find -exec sed -i` (longest-match-first to prevent `var(--text-muted)` → `var(--color-text-primary-muted)` corruption). Seven tokens had byte-identical hex matches (zero visual change); three pairs had intentional shade shifts (negative rose→red, warning amber→brass, info blue→indigo) |
| 2025-07-13 | Added `--color-text-tertiary` to `:root` | The `--text-dim` → `--color-text-tertiary` migration needed a canonical hex (#64748b slate-500). No prior canonical covered slate-500; introducing the third tier aligns with the existing primary/secondary hierarchy |
| 2025-07-13 | DESIGN.md now mirrors `index.css :root` instead of declaring its own values | Previously DESIGN.md and index.css had drifted: DESIGN.md declared legacy tokens (`--bg`, `--text`, …) that did not match what was actually in the CSS, and the Light Mode override was a draft that was never implemented. This rewrite puts `index.css :root` as the source of truth; DESIGN.md reflects what ships. Light-mode spec is preserved here as a "NOT IMPLEMENTED (gap)" section for the next iteration |
| 2025-07-13 | Migrated 4 raw hex literals in `index.css` to canonical `--color-*` tokens | `.role-formal` background `rgba(59,130,246,0.15)` → `var(--color-info-bg)` (new token added, mirrors `--color-accent-cobalt-bg` pattern). Three `#3b82f6` raw-blue references (`.role-formal` color, `.tone-block.formal-block` border-right, `.definition-block` border-right) → `var(--color-info)`. Visual shift: blue #3b82f6 → indigo #4361EE (already documented in §Light Mode §Open decisions #2 — these were the "definition-block raw-blue escapees"). Also fixed: `--accent-glow` and `--font-handwriting` were referenced in CSS but undefined in :root (8 + 1 silent-broken references respectively); both added. The `@import` url was missing David Libre / Outfit / Playfair Display / DM Sans — only the fallback fonts (Frank Ruhl Libre, Assistant, Geist Mono, Gveret Levin, Plus Jakarta Sans) were loading, so `.t-formal` / `.t-h1` / `.t-hero` / `.t-data` were rendering with system fallbacks. @import now loads all five DESIGN.md-spec fonts. Intentionally retained: `#34d399` mid-stop in `.t-hero` gradient — it's a brighter emerald (emerald-400) that has no canonical equivalent; adding a one-off `--color-primary-bright` token for a single gradient stop would be more debt than the raw hex it replaces |
| 2025-07-13 | Added `--color-info-bg: rgba(67, 97, 238, 0.15)` to `:root` semantic variants | The role-formal badge background was a 15% blue-500 rgba. Migrating to indigo `#4361EE` at 15% preserves the visual relationship to `--color-info` and matches the existing `--color-accent-cobalt-bg` variant pattern. Without this token the migration would have required either a hardcoded rgba (drift) or `color-mix(in srgb, var(--color-info) 15%, transparent)` (browser-compat concerns) |
