# Mech Lend design system (local copy)

Saved 2026-11-19 from the Claude artifact https://claude.ai/artifact/VYuy7vgp4LpBGYKtk827jv (the live version may be newer).

For any AI tool (Claude, Codex, OpenClaw, etc.), start with:
- `README.md` — brand book: voice, color, type, spacing, logo, imagery, component list. Read this first.
- `tokens.json` — source of truth for tokens (themes: dark = Night, light = Studio).
- `tokens.css` — CSS custom properties generated from tokens.json (`:root` = Night, `[data-theme="light"]` = Studio).
- `components/` — React bundle (`bundle.js`, `window.MechLend`), `bundle.css`, `index.d.ts`, and per-component README + preview.html.
- `assets/Logos/` — Visor mark and app icon SVGs.
- `design-system.json` — index metadata.
