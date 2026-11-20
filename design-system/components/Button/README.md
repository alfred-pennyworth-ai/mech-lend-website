# Button

The one action control. `primary` is a solid `primary` fill — white on Night, black on Studio — and appears at most once per view, for the thing the page exists to do ("Request terms", "Repay $4,210.00"). Everything else is `secondary` (outlined) or `quiet`.

- Consumer provides: `children` (verb-first, sentence case — the style sets it in tracked capitals), `onClick`, optional `variant` (`primary` | `secondary` | `quiet` | `danger`) and `size` (`md` 40px, `sm` 32px).
- `danger` is outlined in `ltv-call`, for releasing collateral, closing a loan or deleting. Always confirm it in a dialog.
- Never colour a button `signal`; the status light is not an action colour.
