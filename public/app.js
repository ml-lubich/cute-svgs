const themeSelect = document.querySelector("#theme-select");
const generateButton = document.querySelector("#generate-button");
const generatedCaption = document.querySelector("#generated-caption");
const generatedPreview = document.querySelector("#generated-preview");
const downloadLink = document.querySelector("#download-link");

const themeLabels = {
  rose: "Rose bloom",
  flower: "Flower spin",
  cloud: "Cloud hearts",
  farm: "Farm sprout sway",
  garden: "Tiny garden wiggle"
};

const themeBuilders = {
  rose: buildRose,
  flower: buildFlower,
  cloud: buildCloud,
  farm: buildFarm,
  garden: buildGarden
};

const concreteThemes = Object.keys(themeBuilders);

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function createToken() {
  return Math.random().toString(36).slice(2, 9);
}

function buildRose(token) {
  const petalA = pick(["#ff6e9f", "#ff84a6", "#ff7f8e"]);
  const petalB = pick(["#c82c66", "#b62f5a", "#d53c6b"]);
  const glow = pick(["#ffd1dc", "#ffc9d8", "#ffd7e8"]);
  const swaySpeed = randomBetween(3.6, 5.2).toFixed(2);
  const bloomSpeed = randomBetween(2.6, 3.8).toFixed(2);

  return {
    name: "rose-bloom",
    title: "Rosy Bloom Loop",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 260" role="img" aria-label="Animated rose bloom">
  <defs>
    <linearGradient id="stem-${token}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#5dbf5f"/>
      <stop offset="100%" stop-color="#2f7938"/>
    </linearGradient>
    <radialGradient id="petal-${token}" cx="50%" cy="45%" r="62%">
      <stop offset="0%" stop-color="${petalA}"/>
      <stop offset="100%" stop-color="${petalB}"/>
    </radialGradient>
    <filter id="glow-${token}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3"/>
    </filter>
  </defs>
  <style>
    .stem { transform-origin: 120px 220px; animation: sway ${swaySpeed}s ease-in-out infinite; }
    .flower { transform-origin: 120px 76px; animation: bloom ${bloomSpeed}s ease-in-out infinite; }
    .spark { animation: pulse 2.5s ease-in-out infinite; }
    @keyframes sway { 0%,100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
    @keyframes bloom { 0%,100% { transform: scale(0.95); } 50% { transform: scale(1.06); } }
    @keyframes pulse { 0%,100% { opacity: .35; } 50% { opacity: .7; } }
  </style>
  <ellipse class="spark" cx="120" cy="82" rx="56" ry="30" fill="${glow}" filter="url(#glow-${token})"/>
  <g class="stem">
    <path d="M120 224 C110 175,112 126,120 84" stroke="url(#stem-${token})" stroke-width="8" stroke-linecap="round" fill="none"/>
    <path d="M114 161 C91 149, 90 130, 112 126 C126 124,131 138,114 161" fill="#499a4b"/>
    <path d="M126 141 C149 129,153 110,132 105 C117 102,110 118,126 141" fill="#54aa55"/>
    <ellipse cx="120" cy="230" rx="43" ry="12" fill="#977051"/>
  </g>
  <g class="flower">
    <circle cx="120" cy="76" r="20" fill="url(#petal-${token})"/>
    <ellipse cx="103" cy="76" rx="16" ry="21" fill="url(#petal-${token})" transform="rotate(-30 103 76)"/>
    <ellipse cx="137" cy="76" rx="16" ry="21" fill="url(#petal-${token})" transform="rotate(30 137 76)"/>
    <ellipse cx="120" cy="58" rx="15" ry="12" fill="#ffc7d5"/>
    <circle cx="120" cy="80" r="7" fill="#fff0f4"/>
  </g>
</svg>`
  };
}

function buildFlower() {
  const petal = pick(["#ffcc61", "#ffbe7a", "#ffc06b"]);
  const center = pick(["#ff9348", "#f9882c", "#f08c3a"]);
  const stem = pick(["#64b466", "#4c9a63", "#73bd76"]);
  const spinSpeed = randomBetween(4.4, 6.3).toFixed(2);

  return {
    name: "flower-spin",
    title: "Daisy Spin Loop",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 260" role="img" aria-label="Animated spinning flower">
  <style>
    .stem { transform-origin: 120px 220px; animation: drift 4.7s ease-in-out infinite; }
    .bloom { transform-origin: 120px 92px; animation: spin ${spinSpeed}s linear infinite; }
    @keyframes drift { 0%,100% { transform: rotate(2deg); } 50% { transform: rotate(-2deg); } }
    @keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
  </style>
  <g class="stem">
    <path d="M120 224 C110 183, 114 132, 120 95" stroke="${stem}" stroke-width="8" stroke-linecap="round" fill="none"/>
    <ellipse cx="120" cy="230" rx="43" ry="12" fill="#987151"/>
    <path d="M115 160 C90 146, 91 130, 112 128 C126 126,132 143,115 160" fill="#64b466"/>
    <path d="M126 143 C149 133, 154 116, 134 111 C119 107,111 123,126 143" fill="#72be72"/>
    <g class="bloom">
      <ellipse cx="120" cy="92" rx="10" ry="31" fill="${petal}"/>
      <ellipse cx="120" cy="92" rx="10" ry="31" fill="${petal}" transform="rotate(45 120 92)"/>
      <ellipse cx="120" cy="92" rx="10" ry="31" fill="${petal}" transform="rotate(90 120 92)"/>
      <ellipse cx="120" cy="92" rx="10" ry="31" fill="${petal}" transform="rotate(135 120 92)"/>
      <circle cx="120" cy="92" r="13" fill="${center}"/>
    </g>
  </g>
</svg>`
  };
}

function buildCloud(token) {
  const cloud = pick(["#ffffff", "#fffdf8", "#fffaf5"]);
  const heartA = pick(["#ff6f9f", "#ff7fa4", "#ff7990"]);
  const heartB = pick(["#ffc2d1", "#ffd3dc", "#ffcad7"]);
  const floatSpeed = randomBetween(3.7, 5.2).toFixed(2);

  return {
    name: "cloud-hearts",
    title: "Cloud Hearts Loop",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 260" role="img" aria-label="Animated cloud with hearts">
  <defs>
    <filter id="cloud-shadow-${token}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#efc5d0" flood-opacity="0.55"/>
    </filter>
  </defs>
  <style>
    .cloud { transform-origin: 120px 120px; animation: bob ${floatSpeed}s ease-in-out infinite; }
    .heart-a { animation: floatA 2.8s ease-in-out infinite; }
    .heart-b { animation: floatB 3.4s ease-in-out infinite; }
    @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
    @keyframes floatA { 0%,100% { transform: translateY(0); opacity: .4; } 50% { transform: translateY(-8px); opacity: 1; } }
    @keyframes floatB { 0%,100% { transform: translateY(0); opacity: .35; } 50% { transform: translateY(-10px); opacity: .95; } }
  </style>
  <rect width="240" height="260" fill="#e8f6ff"/>
  <g class="cloud" filter="url(#cloud-shadow-${token})">
    <circle cx="95" cy="118" r="30" fill="${cloud}"/>
    <circle cx="123" cy="107" r="35" fill="${cloud}"/>
    <circle cx="153" cy="118" r="27" fill="${cloud}"/>
    <rect x="76" y="118" width="98" height="30" rx="15" fill="${cloud}"/>
    <circle cx="111" cy="124" r="3" fill="#6f7c8a"/>
    <circle cx="132" cy="124" r="3" fill="#6f7c8a"/>
    <path d="M110 136 Q121 144 132 136" stroke="#6f7c8a" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>
  <path class="heart-a" d="M88 177 C88 168, 99 166, 103 174 C107 166, 118 168, 118 177 C118 186, 108 192, 103 198 C98 192, 88 186, 88 177 Z" fill="${heartA}"/>
  <path class="heart-b" d="M140 184 C140 176, 149 174, 153 181 C157 174, 166 176, 166 184 C166 192, 158 197, 153 202 C148 197, 140 192, 140 184 Z" fill="${heartB}"/>
</svg>`
  };
}

function buildFarm() {
  const sky = pick(["#f4f9ff", "#eaf6ff", "#f1fbff"]);
  const hill = pick(["#b3de94", "#aedc9a", "#a7d68f"]);
  const sprout = pick(["#4aa95d", "#54b766", "#4f9f5f"]);
  const swaySpeed = randomBetween(2.8, 4.2).toFixed(2);

  return {
    name: "farm-sprout",
    title: "Farm Sprout Sway",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 260" role="img" aria-label="Animated farm sprout">
  <style>
    .sprout { transform-origin: 120px 189px; animation: sway ${swaySpeed}s ease-in-out infinite; }
    .sun { animation: pulse 3.1s ease-in-out infinite; }
    @keyframes sway { 0%,100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
    @keyframes pulse { 0%,100% { transform: scale(1); opacity: .8; } 50% { transform: scale(1.08); opacity: 1; } }
  </style>
  <rect width="240" height="260" fill="${sky}"/>
  <circle class="sun" cx="46" cy="46" r="19" fill="#ffd46d"/>
  <path d="M0 182 C48 157, 90 165, 132 182 C170 197, 205 194, 240 175 L240 260 L0 260 Z" fill="${hill}"/>
  <path d="M0 198 C35 185, 80 188, 120 198 C157 207, 201 206, 240 194 L240 260 L0 260 Z" fill="#8cc879"/>
  <g class="sprout">
    <path d="M120 188 L120 142" stroke="#3f8f4f" stroke-width="7" stroke-linecap="round"/>
    <path d="M120 153 C99 138, 95 117, 113 110 C130 103, 138 125, 120 153 Z" fill="${sprout}"/>
    <path d="M120 165 C142 151, 146 130, 128 123 C111 116, 103 137, 120 165 Z" fill="#66c676"/>
    <ellipse cx="120" cy="195" rx="24" ry="8" fill="#996f49"/>
  </g>
</svg>`
  };
}

function buildGarden() {
  const pink = pick(["#ff8fab", "#ffa2bc", "#ff9cb0"]);
  const yellow = pick(["#ffd36d", "#ffd15a", "#ffca5f"]);
  const blue = pick(["#9ed8ff", "#a4ddff", "#90cdf5"]);
  const swingSpeed = randomBetween(4.9, 6.5).toFixed(2);

  return {
    name: "tiny-garden",
    title: "Tiny Garden Wiggle",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 260" role="img" aria-label="Animated tiny flower garden">
  <style>
    .flowers { transform-origin: 120px 210px; animation: swing ${swingSpeed}s ease-in-out infinite; }
    .sparkle { animation: sparkle 2.4s ease-in-out infinite; }
    @keyframes swing { 0%,100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
    @keyframes sparkle { 0%,100% { opacity: .3; } 50% { opacity: .95; } }
  </style>
  <rect width="240" height="260" fill="#fff8ef"/>
  <ellipse cx="120" cy="220" rx="70" ry="26" fill="#b4df9b"/>
  <g class="flowers">
    <path d="M92 217 L92 166" stroke="#4da263" stroke-width="5" stroke-linecap="round"/>
    <path d="M120 217 L120 154" stroke="#4da263" stroke-width="5" stroke-linecap="round"/>
    <path d="M148 217 L148 170" stroke="#4da263" stroke-width="5" stroke-linecap="round"/>
    <circle cx="92" cy="163" r="12" fill="${pink}"/>
    <circle cx="120" cy="151" r="13" fill="${yellow}"/>
    <circle cx="148" cy="167" r="11" fill="${blue}"/>
    <circle cx="92" cy="163" r="4" fill="#fff"/>
    <circle cx="120" cy="151" r="4" fill="#fff"/>
    <circle cx="148" cy="167" r="4" fill="#fff"/>
  </g>
  <circle class="sparkle" cx="64" cy="82" r="3" fill="#ff9dbc"/>
  <circle class="sparkle" cx="176" cy="72" r="3" fill="#9dd8ff"/>
  <circle class="sparkle" cx="120" cy="64" r="3" fill="#ffd36d"/>
</svg>`
  };
}

function pickTheme(themeChoice) {
  if (themeChoice !== "random") {
    return themeChoice;
  }

  return pick(concreteThemes);
}

function renderSvg(themeChoice) {
  const theme = pickTheme(themeChoice);
  const token = createToken();
  const builder = themeBuilders[theme];

  if (!builder || !generatedPreview || !generatedCaption || !downloadLink) {
    return;
  }

  const result = builder(token);
  const encoded = encodeURIComponent(result.svg);
  const fileName = `${result.name}-${Date.now()}.svg`;

  generatedPreview.innerHTML = result.svg;
  generatedCaption.textContent = `${result.title} (${themeLabels[theme]})`;
  downloadLink.href = `data:image/svg+xml;charset=utf-8,${encoded}`;
  downloadLink.download = fileName;
}

if (generateButton && themeSelect) {
  generateButton.addEventListener("click", () => {
    renderSvg(themeSelect.value);
  });

  themeSelect.addEventListener("change", () => {
    renderSvg(themeSelect.value);
  });
}

renderSvg("rose");
