# Antigravity Workspace Context

## 🛠️ Tech Stack & Architecture
- **Framework & Tooling:** React, Vite (Single-page app configuration)
- **Architecture:** Monorepo structure managed via active workspaces
- **Styling Engine:** Tailwind CSS utilizing strict utility tokens

## 🎯 Active Agentic Skillmaps
This workspace uses a prioritized chain of skills. The agent must pass all generated code through these specific playbooks located in `./skills/`:

1. **System & Layout Structure:** `@monorepo-architect` -> `@frontend-design`
2. **Visual & Aesthetic Identity:** `@ui-ux-pro-max` -> `@ui-ux-designer` -> `@tailwind-design-system`
3. **Validation & Compliance:** `@code-reviewer` -> `@seo-audit`

---

## 💎 Project Execution Rules

### 1. Visual & Aesthetic Standards (`@ui-ux-pro-max` & `@ui-ux-designer`)
- **Theme:** Clean, premium dark-mode aesthetic with high-end contrast accents (e.g., sophisticated deep blues, muted emeralds, or metallic golds).
- **Style:** Strict minimalist and professional design. Generous negative space, fluid typography scaling, and subtle interactive transitions. No cluttered blocks.
- **Component Design:** Modular, atomic React components. Isolate layout wrappers cleanly from functional UI primitives.

### 2. Styling Guardrails (`@tailwind-design-system` & `@frontend-design`)
- Avoid arbitrary values in Tailwind class names (e.g., do not use `h-[432px]` or `bg-[#010101]`). Strictly use the configured Tailwind design tokens or safe CSS custom properties.
- Ensure 100% responsive, mobile-first layouts. Test and guard against horizontal viewport overflow on smaller screens.

### 3. Verification & SEO (`@code-reviewer` & `@seo-audit`)
- **Semantic HTML Only:** Ensure exactly one `<h1>` per page view. Use structured sectioning (`<header>`, `<main>`, `<section>`, `<footer>`) instead of generic nested `<div>` wrappers.
- **Metadata and Compliance:** All media assets must include descriptive, accessible `alt` text. Code must automatically conform to Web Vitals performance guidelines to maintain optimal search rankings.
- **Review Loop:** The agent must critically run a self-review pass on layout integrity and DOM nesting hierarchy before outputting the final component code.