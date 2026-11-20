# TextField

A labelled single-line input with optional units and helper text.

- Consumer provides: `label`, `value`/`onChange` (or `defaultValue`), optional `prefix`/`suffix` units, `help`, `error`, and `numeric` for money, percentages and hours (mono, tabular, decimal keypad).
- `error` replaces the help text and turns the border `ltv-call`; write it as what to do: "Enter a term between 6 and 48 months."
- Labels are nouns ("Requested amount"), never questions or placeholders standing in for labels.
