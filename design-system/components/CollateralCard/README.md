# CollateralCard

One robot pledged as collateral, with the loan against it: class, model, serial plate, LTV meter, then valuation, principal and APR.

- Consumer provides: `robotClass`, `model`, `serial`, `valuation`, `principal`, `apr`, the loan's `watch`/`call` thresholds, and optional actions as `children` (one or two `Button size="sm"`; `primary` only when it's the page's main action).
- LTV is computed from principal ÷ valuation; don't pass it separately.
- Lay out in a grid with `space-6` gaps; the card is at most 420px wide.
