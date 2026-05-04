# Cute SVGs

A small public-ready collection of animated flower SVG cards served by Bun.

## Included Flowers

- Cherry Blossom Pop
- Hibiscus Sway
- Daisy Dance
- Sunflower Smile
- Rose Bloom
- Rose Vine Twirl
- Hydrangea Cluster
- Lavender Sprig
- Peony Puff
- Poppy Pop
- Wisteria Droop
- Lily Belle
- Tulip Breeze
- Monstera Glow
- Rainbow Zinnia
- Bluebell Chime
- Golden Marigold
- Coral Orchid
- Cosmos Confetti
- Iris Shimmer
- Forget-Me-Not Stars
- Cactus Bloom

See [docs/FLOWERS.md](docs/FLOWERS.md) for the full design system reference and component vocabulary.

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
- Daisy Dance now points to the dedicated daisy asset.
- The gallery now includes 22 animated SVG cards with broader color variety.

Last remaining visual polish:

- Minor micro-alignment tweaks may still be done after visual QA.
