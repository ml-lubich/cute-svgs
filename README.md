# Cute SVGs

A small public-ready collection of animated flower SVG cards served by Bun.

Each flower card includes a package download. The zip contains `index.html`,
`flower.svg`, and `README.txt`, so recipients can unzip it and open the HTML
file directly in a browser.

```mermaid
flowchart LR
    USER(("👤<br/>Visitor"))
    SERVER{{"🌐 server.ts<br/>Bun static server<br/>:3000"}}
    HTML[/"📄 public/index.html<br/>card gallery"/]
    CSS[/"🎨 public/styles.css"/]
    SVGS[("🌸 public/svgs/*.svg<br/>30 animated flowers")]
    PKG["📦 src/packages.ts<br/>per-flower .zip<br/>(index.html + svg + readme.txt)"]
    DL[/"⬇ Browser download<br/>flower.zip"/]

    USER --> SERVER
    SERVER --> HTML
    HTML --> CSS
    HTML --> SVGS
    USER -- "click ⬇" --> PKG
    PKG --> DL

    classDef io fill:#0e1116,stroke:#2f81f7,stroke-width:1.5px,color:#e6edf3;
    classDef brain fill:#161b22,stroke:#d29922,stroke-width:1.5px,color:#e6edf3;
    classDef tool fill:#161b22,stroke:#3fb950,stroke-width:1.5px,color:#e6edf3;
    classDef out fill:#0e1116,stroke:#a371f7,stroke-width:1.5px,color:#e6edf3;
    class USER,SVGS io;
    class SERVER brain;
    class HTML,CSS,PKG tool;
    class DL out;
```

## Table of contents

- [Included flowers](#included-flowers)
- [Run locally](#run-locally)
- [Architecture at a glance](#architecture-at-a-glance)
- [Download flow (sequence)](#download-flow-sequence)
- [Project structure](#project-structure)
- [Known status](#known-status)
- [🗺️ Repository map](#️-repository-map)

## Download flow (sequence)

```mermaid
sequenceDiagram
    participant V as visitor
    participant SRV as server.ts (Bun)
    participant H as public/index.html
    participant J as public/app.js
    participant SVG as public/svgs/*.svg
    participant PKG as src/packages.ts

    V->>SRV: GET /
    SRV-->>V: index.html + styles + svgs
    V->>H: scroll gallery
    V->>J: click "download" on a flower
    J->>SVG: fetch flower.svg
    SVG-->>J: svg bytes
    J->>PKG: build zip(svg, index.html, README.txt)
    PKG-->>J: Blob
    J-->>V: trigger flower.zip download
```

## Included Flowers

- Cherry Blossom Pop
- Hibiscus Bloom
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
- Anemone Burst
- Buttercup Spark
- Camellia Spiral
- Dahlia Dream
- Lotus Lantern
- Magnolia Moon
- Morning Glory
- Snapdragon Parade

See [docs/FLOWERS.md](docs/FLOWERS.md) for the full design system reference and component vocabulary.

## Run Locally

Prerequisite: Bun installed.

```bash
bun run start
```

Then open:

- http://localhost:3000

Cute SVGs uses this single fixed local port. If `3000` is already busy, stop the existing Cute SVGs server before starting another one.

For auto-reload while editing:

```bash
bun run dev
```

## Architecture at a glance

```mermaid
flowchart TB
    subgraph SRV["🌐 Server"]
        S["server.ts<br/>Bun.serve()"]
    end
    subgraph STATIC["📁 public/"]
        H["index.html · gallery markup"]
        C["styles.css · grid + cards"]
        J["app.js · download wiring"]
        SV[("svgs/*.svg<br/>30 flowers")]
    end
    subgraph PKG["📦 Packaging"]
        P["src/packages.ts<br/>build flower.zip in browser"]
    end
    S --> H
    S --> C
    S --> J
    S --> SV
    J --> P
    P --> SV
```

## Project Structure

- `server.ts`: tiny static file server
- `public/index.html`: card gallery markup
- `public/styles.css`: page/card styling
- `public/svgs/*.svg`: animated flower assets
- `src/packages.ts`: browser-openable flower zip package generation

## Known Status

- Sunflower Smile and Hibiscus Bloom are considered good/stable.
- Cherry Blossom Pop was updated to better match the 🌸 emoji shape.
- Daisy Dance now points to the dedicated daisy asset.
- The gallery now includes 30 animated SVG cards with broader color variety.

Last remaining visual polish:

- Minor micro-alignment tweaks may still be done after visual QA.


## 🗺️ Repository map

Top-level layout of `cute-svgs` rendered as a Mermaid mindmap (auto-generated from the on-disk tree).

```mermaid
mindmap
  root((cute-svgs))
    docs/
      FLOWERS.md
      TESTING.md
    public/
      app.js
      index.html
      styles.css
      svgs
    src/
      packages.ts
    tests/
      svg-assets.test.ts
    files
      README.md
      package.json
```
