# AGENTS.md — kal-kala

## Project Entry Point

This file routes AI agents to the canonical context, strategy, and material rules for the kal-kala Accounting Learning Platform project.

---

## Primary Documents

| Document | Purpose | Required Reading |
|----------|---------|------------------|
| **AGENTS.md** | Current architecture, known issues, component inventory, tech stack, rules | **YES** — All agents must read first |
| **web/DESIGN.md** | Design system: typography, color, spacing, motion, content block patterns | **YES** — All agents must read before any UI work |
| **docs/syllabus.md** | Core syllabus and topics covered | **YES** — All agents must read second |

---

## Quick Context (for immediate orientation)

**Product**: Hebrew RTL-first accounting learning platform for students. Precision aesthetic, interactive and visually focused learning experience (mirroring the statisti-kal project vibe). 

**Stack**: React 19 + TypeScript + Vite + Tailwind v4 + Motion + KaTeX

**Tone & Voice**: Mix formal accounting principles with a "classmate genius helper" or "street smart" tone. It should be engaging, interactive, and visually driven rather than purely reading-focused. Never leave material behind—use more material rather than less.

---

## Critical Material Rule (No Guessing Content)

**CRITICAL RULE FOR ALL AGENTS**: All content (explanations, exercises, templates, solutions) MUST be derived from the materials provided in `web/docs/chapter-materials`.

1. **Locate**: Look up the relevant chapter folder under `web/docs/chapter-materials/` (e.g., `bonds`, `cash-flow`, `equity`, etc.).
2. **Review**: Read the formal summaries, class notes, exercises, and solution files provided in those folders.
3. **Incorporate**: Use the exact structures, formats, tones, exercises, and solutions provided. 
4. **Do Not Skimp**: It is better to use more material than not enough. Convert the material into engaging, interactive, visually-focused learning UI.

---

## Routing Rules for Agents

| Agent Role | Entry Point | Then Read |
|------------|-------------|-----------|
| **strategist** | AGENTS.md | docs/syllabus.md, docs/chapter-materials |
| **engineer** | AGENTS.md | docs/syllabus.md, docs/chapter-materials |
| **reviewer** | AGENTS.md | docs/chapter-materials |

---

## Key Files Map

```
C:/Users/Tiger/Agents/Projects/kal-kala/
├── AGENTS.md                      ← READ FIRST (product anchor & rules)
├── web/
│   ├── DESIGN.md                  ← Design system (fonts, colors, spacing, motion)
│   ├── docs/
│   │   ├── syllabus.md            ← Course syllabus (11 topics)
│   │   ├── chapter-materials/     ← ALL CONTENT SOURCE OF TRUTH
│   ├── src/
│   │   ├── components/            ← UI, Pages, and Interactive widgets
│   │   ├── index.css              ← Design system & Tailwind tokens
```

---

## Verification Gates (Non-Negotiable)

| Gate | Requirement | Tool |
|------|-------------|------|
| **TypeScript** | `npm run lint:tsc` passes (noEmit) | tsc |
| **Build** | `npm run build` succeeds | Vite |
| **RTL Visual** | Hebrew RTL renders correctly | manual testing |
| **Material Usage** | Content matches `docs/chapter-materials` exactly | manual review |
| **Design System** | UI matches `web/DESIGN.md` (fonts, colors, spacing) | manual review |

## Workspace Cleanliness & Scratchpad Rules

**CRITICAL RULE FOR ALL AGENTS**: Do NOT pollute the project root or `web/src/` directories with temporary files, scripts, or patches.
- **Throwaway Files**: If you need to create throwaway scripts, tests, patches (`.patch`), debug logs, or intermediate code files, you **MUST** save them inside the `.scratch/` directory.
- **Test Artifacts**: Any generated files during testing (like screenshots, logs, or temporary DBs) that aren't needed must be proactively deleted.
- **Boy Scout Rule**: Always leave the workspace cleaner than you found it. Clean up any stray files you mistakenly create in the root before completing your task.

---

## KaTeX Formatting Rule (Crucial)

**ALWAYS use `String.raw` for KaTeX strings.**
When writing or modifying mathematical expressions in TypeScript/JSX (e.g., inside `<InlineMath>`, `<BlockMath>`, or data objects), you MUST use `` String.raw`...` `` template literals instead of standard string literals.

**Why:** JavaScript string literals silently consume escape sequences before KaTeX sees them.
- ✅ **Good:** `<InlineMath math={String.raw`\text{Hello}`} />`
- ✅ **Good:** `<InlineMath math={String.raw`\bar{x}=42`} />`
- ✅ **Good:** `<InlineMath math={String.raw`\sigma`} />`
