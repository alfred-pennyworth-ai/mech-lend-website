# Mech Lend website

Marketing site for Mech Lend: *Capital for machines that work.* A single static page in plain HTML, CSS and JS, with no build step.

- Brand rules and tokens: `design-system/` (start with `design-system/README.md`)
- Copy source: `CONTENT.md` (summary of the company overview deck); brief: `BRIEF.md`

## Layout

```
site/
  index.html            the page: hero, problem, approach, how it works, what we finance,
                        valuation, why Mech Lend, contact
  favicon.svg           the Night app icon
  .nojekyll             tells GitHub Pages to serve files as they are
  css/tokens.css        copied unchanged from design-system/tokens.css
  css/components.css    static copy of the design-system component styles (ml-*)
  css/site.css          page layout and section styles
  js/site.js            Night/Studio theme toggle and the LTV meter reveal
  assets/logos/         Visor mark and app icon SVGs from the design system
  assets/og-image.png   1200×630 share image (source: og-image.svg)
  assets/apple-touch-icon.png
tools/render-png.py     regenerates the two PNGs (pure Python, no dependencies)
```

If `design-system/tokens.css` changes, copy it over `site/css/tokens.css` again.

## Preview

```sh
python3 -m http.server -d site
```

Then open http://localhost:8000.

## Deploy to GitHub Pages

The workflow-free way serves `site/` from a branch:

1. Push the repo to GitHub.
2. Publish `site/` as the root of a `gh-pages` branch:
   ```sh
   git subtree push --prefix site origin gh-pages
   ```
3. In the repo on GitHub: Settings → Pages → Build and deployment → Source: *Deploy from a branch*, Branch: `gh-pages`, folder `/ (root)`.

Re-run step 2 after each change. Alternatively, use a GitHub Actions Pages workflow with `actions/upload-pages-artifact` pointed at `path: site`.

Any other static host works too: upload the contents of `site/`.

## Before launch

- **Placeholders.** Unknown facts from the deck are shown as visible `[__]`: days to funding (How it works, step 4), the Sweep C3 valuation and advance (`[$__]`), and the contact name and email. Search `index.html` for `class="tbd"`. When the email is known, make it a `mailto:` link.
- **Share image URL.** `og:image` and `twitter:image` use a relative path. Most crawlers need an absolute URL, so change them to `https://<your-domain>/assets/og-image.png` once the domain is set, and add `<link rel="canonical">` and `og:url`.
- **LTV thresholds.** The illustrative unit's meter uses the design system's default watch and call thresholds (60% and 75%); the caption says they are examples.
