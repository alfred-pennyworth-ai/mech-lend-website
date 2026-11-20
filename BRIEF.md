# Brief: Mech Lend marketing website

Build a static, single-page (plus optional /team) marketing website for Mech Lend, a lender that finances robots (humanoid, quadruped, industrial arm, mobile platform, aerial).

## Source of truth
- Design system: `design-system/` — read `design-system/README.md` (brand book) first, then `tokens.css`, `components/` and `assets/Logos/`. Follow it strictly: Night theme default, Studio optional toggle, one signal-blue light, Michroma wordmark only, Geist + Geist Mono, sentence case, no emoji, no exclamation marks, no pills, near-square corners, "Request terms" style verbs.
- Content: the 10-slide company overview deck (summarised in `CONTENT.md`). Tagline: "Capital for machines that work."

## Requirements
- Plain HTML/CSS/JS, no build step, deployable to GitHub Pages / any static host. Use `tokens.css` directly (copy into `site/`); reuse the Logo SVGs; favicon = app icon SVG.
- Put everything in `site/` (index.html, styles, assets). Sections follow the deck: hero, problem, approach, how it works (4 steps), what we finance (5 classes), valuation (illustrative unit card with LTV meter: Sweep C3, SN SC3-1127-04B9, LTV 49.9% Healthy), why Mech Lend, team, contact.
- Keep deck placeholders as visible `[__]` only where facts are unknown (funding days, valuation/advance amounts, contact name/email). Do not invent numbers, rates, customers or testimonials.
- Responsive (mobile gutter space-4, desktop space-12), accessible (focus ring per brand, contrast, semantic landmarks, reduced-motion respected), fast, with meta/OG tags.
- Restrained motion only. The machine/numbers are the hero; no stock-photo clichés. Use generated SVG/CSS visuals consistent with the Visor mark.
- Add a README.md with how to preview (`python3 -m http.server -d site`) and deploy to GitHub Pages.
