# Antigravity Workspace Context

## 🛠️ Tech Stack & Architecture
- **Framework & Tooling:** React, Vite (Single-page landing page & dashboard applications)
- **Architecture:** Monorepo structure managed via active workspaces
- **Styling Engine:** Tailwind CSS utilizing strict tokens

## 🎨 Active Agentic Skillmaps & Reference Files
This workspace uses a prioritized chain of skills. The agent must pass all generated code through these specific playbooks mapped directly from the workspace root:

1. **Orchestration & Workflow Control:** `./antigravity-skill-orchestrator/SKILL.md` -> `./antigravity-agent-manager/SKILL.md` -> `./antigravity-workflows/SKILL.md`
2. **System & Layout Structure:** `./monorepo-architect/SKILL.md` -> `./frontend-design/SKILL.md`
3. **Visual, UI Elements & Mobile:** `./ui-ux-pro-max/SKILL.md` -> `./ui-ux-designer/SKILL.md` -> `./tailwind-design-system/SKILL.md` -> `./mobile-design/SKILL.md`
4. **Motion & Spatial Depth:** `./antigravity-design-expert/SKILL.md` -> `./animejs-animation/SKILL.md`
5. **Design Token Rules:** Refer strictly to the custom design palette defined in `./color.md`
6. **Validation & Compliance:** `./code-reviewer/SKILL.md` -> `./seo-audit/SKILL.md`

---

## 💎 Project Redesign & Branding Rules

### 1. Brand Identity & Color Token Strict Compliance
When redesigning layout components or editing the dashboard interface, the agent must strictly apply the core palettes declared in `./color.md`:
- **Landing Page (Tailwind):** Follow the precise balance of **Primary Navy (`#1b3b5f`)** and **Background Dark (`#13191f`)**, using the high-impact **Secondary Gold (`#f2b824`)** strictly for call-to-actions, highlights, and critical interactive buttons.
- **Dashboard View (CSS Variables):** Custom interactive dashboard items must explicitly map to the dark navy and bright gold tokens (`--dash-primary` and `--dash-secondary`).

### 2. Styling, Components & Mobile-First Standards
- **Component Design:** Build modular, highly atomic React components. Isolate structural layout wrappers cleanly from functional UI primitives.
- **Mobile Engineering (`./mobile-design/`):** Ensure 100% fluid, responsive layouts optimized for touch targets. Aggressively safeguard components against horizontal viewport overflow on smaller screens.
- **Motion & Interactivity:** Pair `antigravity-design-expert` with `animejs-animation` to orchestrate subtle, ultra-premium entrance states, scroll-linked typography transitions, and complex interactive hover events. 
- **Utility Constraints:** Never write loose arbitrary Tailwind values (e.g., avoid raw inline hex colors or custom spacing hacks like `h-[432px]`). Cross-reference all utility styling classes with the tokens established in your design system configuration.

### 3. Agent Execution & Verification Gates
- **Orchestration Workflow:** The workspace agent must cross-reference tasks with `antigravity-skill-orchestrator` and `antigravity-agent-manager` to ensure sub-agents seamlessly communicate state management changes without overwriting code logic.
- **SEO Hierarchy:** Enforce strict semantic HTML layout rules using the `seo-audit` playbook (exactly one `<h1>` per view, clean sequential header trees, descriptive image alt tokens).
- **Review Loop:** The agent must critically run a self-review pass via `code-reviewer` on layout integrity and DOM nesting hierarchy before outputting the final component code.