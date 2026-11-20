Mech Lend lends against robots — humanoids, quadrupeds, industrial arms, mobile platforms. The brand looks the way the best humanoid hardware is presented: a black stage, brushed metal, white type, lots of empty space, and one cool status light. It should read as precise, calm and expensive — a lender who understands the machine.

Tagline: **Capital for machines that work.**

## Principles

- **The machine is the hero.** Lead with the robot — photo, model, class, serial — then the money. Give it room: generous `space-24` padding on heroes.
- **Monochrome, one light.** Everything is black, white and silver. The only hue is `signal`, and it means something is live, healthy or focused.
- **Numbers are the product.** Valuation, principal, rate and LTV are always visible in `figure` styles, never rounded away.
- **State is said, not just coloured.** Every LTV state carries its word ("Healthy", "Watch", "Margin call") and its own marker shape.
- **Thin and exact.** Light-weight headings, hairline rules, near-square corners.

## Voice and content

- Speak as "we" to "you". Short, confident declaratives. "We value the robot from live telemetry." — not "Our innovative AI-powered valuation engine…".
- Sentence case for headings and menu items. Capitals only through the `label`, `serial` and `wordmark` styles (buttons are styled to capitals; write their text in sentence case).
- Verbs first on actions: "Request terms", "Add collateral", "Repay $4,210.00". Never "Submit" or "Click here".
- Say the real number: "Your LTV is 71.8% — 3.2 points from a margin call".
- Name robots by maker, model and class: "Kestrel H2 · Humanoid". Third-party model names (e.g. Optimus) appear in plain text as collateral descriptions only. Asset and loan IDs go in `serial`.
- Robot classes: Humanoid, Quadruped, Industrial arm, Mobile platform (AMR), Aerial. Don't say "bot", "droid" or "mech".
- No emoji. No exclamation marks in product UI.
- Money: currency symbol, thousands separators, two decimals in product UI (`$184,200.00`); whole dollars allowed in marketing. Percentages to one decimal. Rates as APR.

## Color

- **Night** (`dark`) is the primary theme — marketing, the app default, the cover. **Studio** (`light`) is for statements, documents, print and users who prefer light.
- Page on `surface`; cards and inputs on `surface-raised`; tracks and wells on `surface-sunken`. Separate with `line`; edge controls with `line-strong`.
- Text in `ink`; secondary text in `ink-muted`. Links in `signal`.
- The primary button is `primary` with `on-primary` — white on Night, black on Studio. One per view.
- `metal` is for rules, dimension lines and decoration — never text.
- `graphite` + `on-graphite` for inverse bands (most useful in Studio).
- LTV states: `ltv-safe` (the `signal` blue) → `ltv-watch` (amber) → `ltv-call` (red). Healthy is blue, not green, so the scale reads without red/green discrimination. The `-soft` tokens are badge and banner grounds only. `ltv-call` doubles as error and destructive.
- Never add a second brand hue. If something needs emphasis, use size, weight or space.

## Type

- **Michroma** (`--font-display`) for the wordmark only: "MECH LEND", capitals, `wordmark` style (0.42em tracking).
- **Geist** (`--font-sans`) for everything you read. Headings are light: `display` and `h1` at 300, `h2` at 400, `h3` at 600.
- **Geist Mono** (`--font-mono`) for everything you count: `figure-lg`, `figure`, `serial`. Right-align figures in tables with `font-variant-numeric: tabular-nums`.
- `label` (11px, 600, 0.16em, capitals) for field labels, stat labels, badges and button text.
- All three are Google Fonts: `https://fonts.googleapis.com/css2?family=Michroma&family=Geist:wght@300..700&family=Geist+Mono:wght@400;500&display=swap` (the component stylesheet imports it).

## Spacing, radius, elevation

- A 4px grid: `space-1` … `space-12`, plus `space-24` for hero padding. Card padding `space-6`; page gutter `space-12` desktop, `space-4` mobile.
- `radius-sm` (2px) for buttons, inputs, badges; `radius-md` (4px) for cards; `radius-lg` for dialogs only. No pills.
- In Night, cards separate by `surface-raised` and a `line` border — no shadow. `shadow-2` only for menus and dialogs.

## Focus and states

- Focus ring: 2px solid `focus` (the status light), 2px offset, on every interactive element.
- Hover tints a fill 10% toward its own text colour; disabled is 40% opacity.
- Loading figures show a `surface-sunken` bar at the figure's height — never a spinner inside a number.

## Logo

- The mark is the **Visor**: a near-square head with one horizontal slot and one status light — a humanoid visor and a deposit slot in one shape. The lockup is the mark followed by MECH LEND in the `wordmark` style.
- In product UI use the `Logo` component; elsewhere use the files in the Logos group (`mechlend-mark-night.svg` on dark grounds, `mechlend-mark-studio.svg` on light, `mechlend-app-icon-night.svg` as the app icon and favicon).
- The mark is `ink`, the light is always `signal`, the slot is cut through to the ground. One colour plus the light — never other hues.
- Clear space: one third of the mark's height on every side. Minimum size: 16px tall (mark), 20px tall (lockup).
- Don't add eyes, antennas, a mouth or a second light; don't centre the light, rotate, outline, stretch or recolour the mark; don't place it on busy photos.

## Imagery and iconography

- Robots photographed as products on black (Night) or seamless white (Studio): the whole machine, side or three-quarter, hard rim light, no props. No glowing eyes, no "friendly" faces, no robot-hand-meets-human-hand.
- Spec-sheet line drawings in `metal`, 1px, with dimension lines, for empty states and onboarding.
- **Inspiration, not imitation.** Never use Tesla or Optimus logos, the Tesla lettering, their product photography or their slogans, and don't imply a partnership. Our wordmark is set in Michroma, not a recreation of anyone's mark.
- No icon set is supplied yet. Use Lucide at 1.25–1.5px stroke, 16 or 20px, coloured with the adjacent text; state icons take the state colour.

## Components

- `Logo` — the Visor mark, alone or with the wordmark.
- `Button` — primary, secondary (outlined), quiet, danger.
- `LtvBadge` — the LTV state word, coloured, with a marker shape.
- `LtvMeter` — LTV against watch and call thresholds.
- `Stat` — a label over a figure.
- `TextField` — labelled input with units and helper text.
- `CollateralCard` — one robot pledged as collateral, with its loan.
