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
| Rose Vine Twirl | `emerald-vine-roses.svg` | `#ffc5dc → #d83f78` | Vertical twirling rose vine with a flower crown on top and animated spiral runners |
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
| Anemone Burst | `anemone-burst.svg` | `#f0abfc → #7e22ce` | 8-petal anemone with dark dotted centre and glow |
| Buttercup Spark | `buttercup-spark.svg` | `#fef9c3 → #eab308` | 5 glossy yellow petals with sunny sparkle marks |
| Camellia Spiral | `camellia-spiral.svg` | `#fecaca → #dc2626` | Layered coral spiral petal rings |
| Dahlia Dream | `dahlia-dream.svg` | `#fed7aa → #ea580c` | Many pointed petals with slow outer rotation |
| Lotus Lantern | `lotus-lantern.svg` | `#fff1f2 → #f472b6` | Pond pads, cupped lotus bloom, and soft lantern glow |
| Magnolia Moon | `magnolia-moon.svg` | `#ffffff → #fde68a` | Broad creamy magnolia petals with moonlit halo |
| Morning Glory | `morning-glory.svg` | `#fff7ed / #93c5fd / #2563eb` | Blue trumpet bloom on a curling vine |
| Snapdragon Parade | `snapdragon-parade.svg` | `#fed7aa → #ec4899` | Stacked bobbing blossoms on a tall spike |

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
- Each gallery card links to `/packages/<flower-file>.zip`. The server generates a zip with `index.html`, `flower.svg`, and `README.txt`; the extracted `index.html` uses only relative local files.
- The gallery keeps static `<img>` previews as the no-script fallback, then inlines those SVGs at runtime so the global Rotation switch can pause full-spin/turn animation names while leaving sway, bounce, nod, pulse, glow, and sparkle motion active.

## 8. Revision Notes

- 2026-05-04: Added per-flower zip package downloads with a browser-openable `index.html`, bundled `flower.svg`, and plain text instructions.
- 2026-05-04: `emerald-vine-roses.svg` removed its internal full-canvas background so Rose Vine Twirl renders transparently on the gallery card.
- 2026-05-04: `emerald-vine-roses.svg` changed from a vertical twirl into a forward-growing diagonal vine, with roses placed along the top of the vine and a bright reaching tip.
- 2026-05-04: `emerald-vine-roses.svg` top roses were enlarged, staggered, and nested under fixed translated groups so the flower-forward vine reads clearly during animation.
- 2026-05-04: `emerald-vine-roses.svg` returned to a vertical Rose Vine Twirl, removed the ground ellipse, and replaced looping grow/disappear animation with constant visible roses, twirling curls, and whole-vine sway.
- 2026-05-04: `emerald-vine-roses.svg` was tightened into a 240x260 vertical Rose Vine Twirl with the roses grouped as a flower crown on top and animated spiral runners around the stem.
- 2026-05-04: `emerald-vine-roses.svg` restored a soft internal backdrop to make the pink flower crown read clearly in standalone previews.
- 2026-05-04: `forget-me-not.svg` star blossoms were nested under fixed translated groups so twinkle scaling no longer detaches them from the branch tips.
- 2026-05-04: `bluebell-chime.svg` bell blossoms were nested under fixed translated groups and given local transform boxes so bobbing no longer detaches them from the branch tips.
- 2026-05-04: `hibiscus-sway.svg`, `daisy-dance.svg`, and generated rose SVGs now nest blossom groups under the swaying stem/plant group so petals move uniformly with their stems.
- 2026-05-04: `daisy-dance.svg` petals changed from flat white to a pale cream gradient with a subtle warm outline and shadow so the white daisy remains visible on white gallery cards.
- 2026-05-04: `public/index.html`, `public/styles.css`, and `public/app.js` added a global Rotation switch. SVG previews are inlined at runtime, and elements whose computed animation name contains `spin` or `turn` receive `rotation-motion`, allowing rotation to be disabled without muting default sway motion.

## 9. Rose Vine Twirl Implementation Notes

`emerald-vine-roses.svg` is the reference for a vertical animated rose vine with
flowers concentrated at the top.

### Composition

- The asset uses the standard `0 0 240 260` flower canvas so it fits the shared
  gallery card and package preview without custom sizing.
- The outer canvas stays transparent; the visible softness comes from a local
  pink glow ellipse around the crown, not a full-canvas background rectangle.
- The vine is built from one main cubic Bézier stem plus two spiral runner paths.
- The rose crown uses four roses fixed at `translate(69 70)`, `translate(121 48)`,
  `translate(169 58)`, and `translate(113 82)` so the flowers read as a top
  cluster instead of drifting along the vine.

### Animation Stack

- `.ev-plant` sways the complete plant around `120px 230px`, keeping stem,
  curls, leaves, and roses visually attached.
- `.ev-twirl-front` and `.ev-twirl-back` animate `stroke-dashoffset` on separate
  spiral runner paths. Opposite timing makes the vine feel like it is rotating
  around the stem while the geometry remains stable.
- `.ev-curl` and `.ev-leaf` use `transform-box: fill-box` with local center
  origins, so their scale and rotation read as organic motion instead of sliding.
- `.ev-crown` gives the full flower cluster a small bob, while each `.ev-rose`
  has a delayed local scale/rotation pulse. The staggered delays make the crown
  feel alive without pulling roses away from their branch tips.
- `.ev-spark` elements sit outside the plant group, so sparkle drift stays around
  the crown glow rather than inheriting the full vine sway.

### Rose Construction

- Each rose is a compact reusable motif: green sepal base, radial outer circle,
  three inner petal ellipses, a lower petal cap, and a pale center dot.
- The large middle rose uses radius `25`; side roses use radius `21`; the lower
  crown rose uses radius `17`. This size hierarchy creates the rounded crown
  silhouette while preserving depth.
- `evRoseOuter` and `evRoseInner` gradients carry the pink palette; the stem and
  runner paths use separate green gradients so the flower crown remains the
  focal point.

### Lessons From Iteration

- Keeping the roses always visible worked better than grow/disappear loops for
  this asset because the point of the card is the flower crown, not a reveal.
- A diagonal vine read as motion, but the final vertical stem reads more clearly
  as a twirling rose vine in the small gallery card.
- Nested fixed-position rose groups solved the earlier detachment problem: the
  translation establishes placement, and the animated child handles only local
  bloom motion.
