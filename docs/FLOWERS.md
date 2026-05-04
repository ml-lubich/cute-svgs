# Flower SVG Design System

Canonical reference for the animated flower SVG collection.
Max 10 docs files total per singleton rule.

---

## 1. Design System

### Canvas

| Property | Value |
|---|---|
| viewBox | `0 0 240 260` (plant with stem) |
| Coordinate origin | top-left |
| Stem base | y ≈ 228 |
| Flower head centre | y ≈ 88–95 |

### Accessibility

Every file includes:
```xml
<svg role="img" aria-labelledby="title desc">
  <title id="title">…</title>
  <desc id="desc">…</desc>
```

### Gradient ID prefixes

Each file uses a unique 2–3 character prefix on all `id` attributes to prevent
conflicts when files are ever embedded inline.

---

## 2. Component Vocabulary

| Component | SVG construct | Notes |
|---|---|---|
| **Stem** | `<path>` with cubic Bézier | `stroke="url(#XXStem)"`, `stroke-width` 7–8 |
| **Leaf pair** | Two `<path>` filled shapes | Left leaf faces ≈ 110° from stem; right ≈ 70° |
| **Petal ring** | `<ellipse>` repeated with `transform="rotate(N cx cy)"` | Rotates around the flower centre |
| **Concentric rings** | Multiple petal ring groups | Each ring at increasing cy, smaller radius |
| **Halo / glow** | `<ellipse>` + `filter feGaussianBlur` | Pulse-animated for sparkle |
| **Centre** | Layered `<circle>` elements | Stamen cluster or stigma disc |
| **Stamens** | `<line>` + `<ellipse>` anther | 6 filaments at 30°–60° intervals |
| **Florets** | `<ellipse>` groups | Used by hydrangea (4-petal clusters) and lavender (stack) and wisteria (pendant rows) |

---

## 3. Animation Classes

| Class pattern | Keyframe | Purpose |
|---|---|---|
| `.XX-plant` | sway — `rotate(-2° / +2°)` | Whole-plant pendulum, origin at stem base |
| `.XX-flower` / `.XX-bloom` | nod/bloom — `scale` + slight `rotate` | Flower head breathes |
| `.XX-outer` / `.XX-inner` | counter-rotating scales | Peony / multi-ring flowers |
| `.XX-petals` | `rotate(0→360deg)` slow spin | Daisy, poppy slow drift |
| `.XX-spires` | subtle sway | Lavender stalk tips |
| `.XX-halo` | opacity pulse | Soft glow sparkle |
| `.XX-clusterX` | `translateY(0 / 5px)` | Wisteria droop oscillation |

Timing conventions:
- Plant sway: 4.4–5.2 s
- Bloom breath: 3.2–3.8 s
- Petal spin: 18–22 s (slow enough to look natural)

---

## 4. Flower Catalog

### Existing (stable)

| Name | File | Head palette | Special |
|---|---|---|---|
| Cherry Blossom Pop | `cherry-blossom-pop.svg` | `#ffb7cc → #e06080` | 5-petal cluster with petals floating off |
| Hibiscus Bloom | `hibiscus-sway.svg` | `#ff8cb0 → #e94881` | 5 large ellipse petals + long stamen arm |
| Daisy Dance | `daisy-dance.svg` | White `#fffef9` | 8 petals + spinning ring + bouncing centre |
| Sunflower Smile | `sunflower-smile.svg` | `#f5bb2f / #ffd95e` | Two counter-rotating petal rings, dark disc |
| Rose Bloom | `rose-bloom.svg` | `#ff8fb2 → #d83f70` | Cupped bud with layered inner petal path |
| Emerald Vine Roses | `emerald-vine-roses.svg` | `#ff6e9f → #c82c66` | Forward-growing vine runner with roses along the top |
| Tulip Breeze | `tulip-breeze.svg` | `#ffbd7f → #d84f35` | 3-petal tulip cup, petal-breath L/R |
| Monstera Glow | `monstera-glow.svg` | Leaf greens | Tropical leaf, no flower |

### New (added May 2026)

| Name | File | Head palette | Special |
|---|---|---|---|
| Hydrangea Cluster | `hydrangea-cluster.svg` | `#ddd6fe → #7c3aed` | Hex arrangement of 7 four-petal florets |
| Lavender Sprig | `lavender-sprig.svg` | `#ddd6fe / #c084fc / #9333ea` | 3 branching stalks, stacked floret pairs |
| Peony Puff | `peony-puff.svg` | `#fbcfe8 → #be185d` | 4 concentric rings (8+8+8+6 petals) |
| Poppy Pop | `poppy-pop.svg` | `#ff8a50 → #c0392b` | 5 petals, slow spin, dark seed-head centre |
| Wisteria Droop | `wisteria-droop.svg` | `#e9d5ff → #6b21a8` | Vine + 3 drooping pendant raceme clusters |
| Lily Belle | `lily-belle.svg` | `#fffef9 / cream-white` | 6 petals (3+3 alternating), 6 golden stamens |
| Rainbow Zinnia | `rainbow-zinnia.svg` | Red, orange, yellow, green, cyan, blue, violet, pink | Two counter-rotating petal rings with seed disc |
| Bluebell Chime | `bluebell-chime.svg` | `#bfdbfe → #2563eb` | 3 bobbing bell blossoms on arched branches |
| Golden Marigold | `golden-marigold.svg` | `#fb923c / #facc15` | Ruffled pom-pom petals with pulse animation |
| Coral Orchid | `coral-orchid.svg` | `#fecdd3 → #be123c` | Butterfly-like orchid petals and cream lip |
| Cosmos Confetti | `cosmos-confetti.svg` | `#fdf2f8 → #db2777` | 8-petal cosmos with sparkling color dots |
| Iris Shimmer | `iris-shimmer.svg` | `#dbeafe → #3730a3` plus gold | Tall iris standards, falls, and shimmer halo |
| Forget-Me-Not Stars | `forget-me-not.svg` | `#bfdbfe / #60a5fa` | 3 tiny five-petal star clusters on branching stems |
| Cactus Bloom | `cactus-bloom.svg` | `#f9a8d4 → #be185d` | Cactus arms, hot-pink bloom, and sparkle dots |

---

## 5. Naming Conventions

- **File name**: `<adjective>-<flower-noun>.svg`  (kebab-case, ≤ 28 chars)
- **CSS class**: `.<2-3 char prefix>-<role>`  e.g. `.hy-plant`, `.hy-head`
- **Gradient / filter IDs**: `<prefix><PascalRole>` e.g. `#hyStem`, `#pyGlow`
- **`<title>`**: Title-case display name  e.g. `Hydrangea Cluster`
- **`<desc>`**: One plain-English sentence describing the animation

---

## 6. Adding a New Flower

1. Choose a unique 2–3 char prefix (check catalog above for conflicts).
2. Copy the stem + leaf block from any existing stable flower.
3. Build the petal component using the `rotate(N cx cy)` ring pattern.
4. Register the CSS class in `<style>` following the naming convention.
5. Add an `<article>` card to `public/index.html` using relative paths like `svgs/example-flower.svg`, not root-relative paths like `/svgs/example-flower.svg`.
6. Append a row to Section 4 of this file in the same transaction.
7. Add the display name to the **Included Flowers** list in `README.md`.

## 7. Portability

- Gallery assets use relative paths so `public/index.html` can be hosted at a subpath or opened from the `public/` directory.
- Each SVG remains standalone: no external fonts, scripts, stylesheets, or image dependencies.
- SVG IDs keep unique prefixes so multiple flowers can be embedded inline on the same page without gradient or filter conflicts.

## 8. Revision Notes

- 2026-05-04: `emerald-vine-roses.svg` changed from a vertical twirl into a forward-growing diagonal vine, with roses placed along the top of the vine and a bright reaching tip.
- 2026-05-04: `emerald-vine-roses.svg` top roses were enlarged, staggered, and nested under fixed translated groups so the flower-forward vine reads clearly during animation.
- 2026-05-04: `forget-me-not.svg` star blossoms were nested under fixed translated groups so twinkle scaling no longer detaches them from the branch tips.
- 2026-05-04: `bluebell-chime.svg` bell blossoms were nested under fixed translated groups and given local transform boxes so bobbing no longer detaches them from the branch tips.
