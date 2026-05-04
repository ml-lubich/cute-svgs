# Testing

Canonical verification notes for Cute SVGs.

## Commands

Run the full test suite from the repository root:

```bash
bun run ci
```

For the same tests during local iteration:

```bash
bun run test
```

## Coverage

The SVG asset suite verifies:

- Every file in `public/svgs/` is referenced exactly once by `public/index.html`.
- Every gallery card has an SVG source, heading, and alt text.
- Every gallery card links to a matching package zip download.
- The gallery exposes the global rotation toggle and loads `public/app.js` for runtime SVG preview enhancement.
- Package generation creates a browser-openable `index.html`, bundled `flower.svg`, and plain `README.txt`.
- Every SVG has a standalone accessible shell with title and description references.
- Rose Vine Twirl stays transparent so it renders on the shared gallery card background.
- Internal SVG IDs are unique per file and all `url(#...)` / `aria-labelledby` references resolve.
- Assets remain animated and avoid scripts or external network resources.
- Asset file names stay catalog-friendly kebab-case.