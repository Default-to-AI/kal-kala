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
- **Size:** 1.15-1.45rem for body/titles
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
- **Size:** 1.0-1.1rem
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
Playfair Display (400-800, italic)
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
| Formal Title | David Libre | 1.4rem | 700 | Definition terms, exercise headers |
| Formal Body | David Libre | 1.15rem | 400 | Formal content body |
| Casual Body | Plus Jakarta Sans | 1.0rem | 400 | Explanations, tips |
| Data Large | DM Sans | 1.75rem | 600 | Stat card values |
| Data Table | DM Sans | 0.85rem | 500 | Table cells |
| Label | Outfit | 0.75rem | 600 uppercase | Section labels, badges |

## Color

### Approach: Restrained
Color is rare and meaningful. The dark editorial palette lets the accent colors pop.

### CSS Custom Properties
```css
:root {
  /* Surfaces */
  --bg:          #0f172a;   /* Slate 900 — deep background */
  --surface:     #1e293b;   /* Slate 800 — cards, panels */
  --surface-alt: #334155;   /* Slate 700 — borders, dividers */
  --elevated:    #475569;   /* Slate 600 — hover states */

  /* Text */
  --text:        #f1f5f9;   /* Slate 100 — primary text */
  --text-muted:  #94a3b8;   /* Slate 400 — secondary text, labels */
  --text-dim:    #64748b;   /* Slate 500 — placeholder, disabled */

  /* Accent */
  --accent:      #10b981;   /* Emerald 500 — primary action, positive */
  --accent-dim:  #065f46;   /* Emerald 900 — subtle accent backgrounds */
  --accent-glow: rgba(16, 185, 129, 0.15); /* Glow effect for accent */

  /* Semantic */
  --positive:    #10b981;   /* Emerald — correct, credit, positive amounts */
  --negative:    #f43f5e;   /* Rose 500 — error, debit, negative amounts */
  --warning:     #f59e0b;   /* Amber 500 — caution, missing data */
  --info:        #3b82f6;   /* Blue 500 — formal content accent, info */
}
```

### Text Contrast Rules
- **Headings and key content:** Use `--text` (#f1f5f9)
- **Body text on cards:** Use `--text` with `opacity: 0.85` (NOT `--text-muted`)
- **Secondary labels:** Use `--text-muted` (#94a3b8)
- **Disabled/placeholder:** Use `--text-dim` (#64748b)

### Light Mode Override
```css
html.light {
  --bg:          #f8fafc;
  --surface:     #ffffff;
  --surface-alt: #f1f5f9;
  --elevated:    #e2e8f0;
  --text:        #0f172a;
  --text-muted:  #475569;
  --text-dim:    #94a3b8;
  --accent-glow: rgba(16, 185, 129, 0.10);
}
```

### Financial Color Conventions
- **Positive amounts / credits:** `--positive` (emerald)
- **Negative amounts / debits:** `--negative` (rose)
- **Neutral amounts:** `--text` (default)
- **Formal content accent border:** `--info` (blue)

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

## Layout
- **Approach:** Grid-disciplined — strict alignment for financial tables, stacked cards on mobile
- **Max content width:** 1120px
- **Border radius scale:** sm: 4px, md: 8px, lg: 12px, full: 9999px
- **Table style:** No borders. Zebra-striping with `rgba(255,255,255,0.02)` + hover glow with `--accent-glow`
- **Mobile tables:** `overflow-x: auto` with scroll, or convert to stacked `<Card>` elements

## Motion
- **Approach:** Intentional — Framer Motion spring transitions for calculations, micro-success pulses
- **Easing:** enter: `cubic-bezier(0, 0, 0.2, 1)` / exit: `cubic-bezier(0.4, 0, 1, 1)`
- **Duration scale:**

| Token | Value | Usage |
|-------|-------|-------|
| micro | 80ms | Instant feedback (hover, focus) |
| short | 180ms | Button transitions, small state changes |
| medium | 300ms | Card animations, page transitions |

- **Success animation:** Emerald curve-glow/pulse when student enters correct answer
- **Calculator state:** Spring transition on result values when inputs change

## Content Block Patterns

### Definition Block
- Border-right: 3px solid `--info`
- Font: David Libre, 1.2rem body, 1.45rem term
- Padding: `--sp-xl` vertical, `--sp-2xl` horizontal

### Exercise Block
- Font: David Libre, 1.2rem body
- Exercise number: Outfit, 0.8rem, uppercase, `--accent` color
- Padding: `--sp-xl` vertical, `--sp-2xl` horizontal

### Tip/Explanation Block
- Font: Plus Jakarta Sans, 1.05rem
- Starts with emoji (💡, 👀, etc.) + bold label
- Uses casual, conversational tone

### Calculator Layout
- Two-column grid: inputs (left/right) | results (opposite side)
- Results panel: subtle green gradient background with `--accent` border
- Numbers: DM Sans with tabular-nums
- Mobile: stacks to single column

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-07-11 | Initial design system created | Created by /design-consultation based on statisti-kal inheritance |
| 2025-07-11 | David Libre for formal content | Matches Word documents in chapter-materials; students recognize the font |
| 2025-07-11 | DM Sans over JetBrains Mono for data | Clean zeros, no dotted zero. Tabular-nums for alignment without monospace aesthetic |
| 2025-07-11 | Playfair Display for logo | English serif logo "Kal-Kala" in italic — editorial, distinguished |
| 2025-07-11 | Text contrast: opacity 0.85 over --text-muted | --text-muted (#94a3b8) too dim on dark cards; opacity approach keeps text bright |
