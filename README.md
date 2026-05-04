# Cute SVGs

A small public-ready collection of animated flower SVG cards served by Bun.

## Included Flowers

- Cherry Blossom Pop
- Hibiscus Sway
- Daisy Dance (currently mapped to the Tulip Breeze asset)
- Sunflower Smile
- Rose Bloom

## Run Locally

Prerequisite: Bun installed.

```bash
bun run start
```

Then open:

- http://localhost:3000

For auto-reload while editing:

```bash
bun run dev
```

## Project Structure

- `server.ts`: tiny static file server
- `public/index.html`: card gallery markup
- `public/styles.css`: page/card styling
- `public/svgs/*.svg`: animated flower assets

## Known Status

- Sunflower Smile and Hibiscus Sway are considered good/stable.
- Cherry Blossom Pop was updated to better match the 🌸 emoji shape.
- Daisy Dance currently presents the tulip artwork by request.

Last remaining visual polish:

- Final micro-alignment of tulip side petal rotation may still need a tiny angle tweak after visual QA.
