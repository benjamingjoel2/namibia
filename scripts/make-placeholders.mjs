// Generates art-directed placeholder photographs into public/images.
// Each is a simple layered landscape with a "Placeholder" caption so nobody
// mistakes it for final photography. Replace any file with a real photo of
// the same name (any aspect ratio works; components crop with object-fit).
//
//   node scripts/make-placeholders.mjs          # only missing files
//   node scripts/make-placeholders.mjs --force  # regenerate everything

import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const OUT = join(process.cwd(), "public/images");
const force = process.argv.includes("--force");
mkdirSync(OUT, { recursive: true });

// ---------- tiny seeded RNG ----------
function rng(seed) {
  let s = 0;
  for (const ch of String(seed)) s = (s * 31 + ch.charCodeAt(0)) >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- building blocks ----------
const sky = (id, stops) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops
    .map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`)
    .join("")}</linearGradient>`;

function stars(r, w, h, n, maxY = 0.75) {
  let out = "";
  for (let i = 0; i < n; i++) {
    const x = r() * w;
    const y = r() * h * maxY;
    const rad = r() < 0.92 ? 0.6 + r() * 0.9 : 1.6 + r() * 1.2;
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(2)}" fill="#fff" opacity="${(0.35 + r() * 0.65).toFixed(2)}"/>`;
  }
  return out;
}

function milkyWay(w, h) {
  return `<defs><radialGradient id="mw" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#f5e6cf" stop-opacity="0.55"/><stop offset="0.45" stop-color="#9fb2d8" stop-opacity="0.22"/><stop offset="1" stop-color="#0d1829" stop-opacity="0"/></radialGradient><filter id="blur"><feGaussianBlur stdDeviation="${w / 90}"/></filter></defs>
  <ellipse cx="${w * 0.55}" cy="${h * 0.38}" rx="${w * 0.62}" ry="${h * 0.11}" fill="url(#mw)" transform="rotate(-28 ${w * 0.55} ${h * 0.38})" filter="url(#blur)"/>
  <ellipse cx="${w * 0.5}" cy="${h * 0.42}" rx="${w * 0.1}" ry="${h * 0.035}" fill="#20150f" opacity="0.5" transform="rotate(-28 ${w * 0.5} ${h * 0.42})" filter="url(#blur)"/>`;
}

/** A dune ridge: a smooth curve across the frame, filled down to the bottom. */
function ridge(r, w, h, baseY, amp, color, opts = {}) {
  const n = 5 + Math.floor(r() * 3);
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const x = (w / n) * i + (i > 0 && i < n ? (r() - 0.5) * (w / n) * 0.5 : 0);
    const y = baseY - (opts.peak && i === Math.floor(n / 2) ? amp * 1.6 : r() * amp);
    pts.push([x, y]);
  }
  let d = `M0 ${h} L0 ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx.toFixed(1)} ${y0.toFixed(1)} ${cx.toFixed(1)} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  d += ` L${w} ${h} Z`;
  let out = `<path d="${d}" fill="${color}"/>`;
  if (opts.shadow) {
    // shadow side of a sharp dune: a darker wedge on one flank of the peak
    const i = Math.floor(n / 2);
    const [px, py] = pts[i];
    out += `<path d="M${px} ${py} C${px + w * 0.05} ${py + amp * 0.6} ${px + w * 0.16} ${baseY} ${px + w * 0.28} ${baseY + h * 0.05} L${px + w * 0.28} ${h} L${px} ${h} Z" fill="${opts.shadow}" opacity="0.85"/>`;
  }
  return out;
}

function tree(x, groundY, s, color) {
  // A camelthorn: crooked trunk, wide flat crown of bare branches.
  const t = `<g stroke="${color}" stroke-linecap="round" fill="none">
    <path d="M${x} ${groundY} C${x - 4 * s} ${groundY - 30 * s} ${x + 6 * s} ${groundY - 50 * s} ${x} ${groundY - 70 * s}" stroke-width="${5 * s}"/>
    <path d="M${x} ${groundY - 62 * s} C${x - 20 * s} ${groundY - 80 * s} ${x - 45 * s} ${groundY - 84 * s} ${x - 70 * s} ${groundY - 92 * s}" stroke-width="${3 * s}"/>
    <path d="M${x} ${groundY - 66 * s} C${x + 25 * s} ${groundY - 84 * s} ${x + 50 * s} ${groundY - 86 * s} ${x + 76 * s} ${groundY - 96 * s}" stroke-width="${3 * s}"/>
    <path d="M${x - 30 * s} ${groundY - 82 * s} L${x - 40 * s} ${groundY - 104 * s}" stroke-width="${2 * s}"/>
    <path d="M${x + 30 * s} ${groundY - 84 * s} L${x + 38 * s} ${groundY - 106 * s}" stroke-width="${2 * s}"/>
    <path d="M${x - 8 * s} ${groundY - 72 * s} L${x - 6 * s} ${groundY - 100 * s}" stroke-width="${2 * s}"/>
  </g>`;
  return t;
}

function acacia(x, groundY, s, color) {
  return `<g fill="${color}"><path d="M${x - 2 * s} ${groundY} L${x - 1 * s} ${groundY - 40 * s} L${x + 2 * s} ${groundY - 40 * s} L${x + 3 * s} ${groundY} Z"/>
  <ellipse cx="${x}" cy="${groundY - 44 * s}" rx="${42 * s}" ry="${9 * s}"/></g>`;
}

function animal(x, y, s, color, kind = "elephant") {
  if (kind === "giraffe")
    return `<g fill="${color}"><rect x="${x}" y="${y - 22 * s}" width="${22 * s}" height="${10 * s}" rx="${4 * s}"/><path d="M${x + 18 * s} ${y - 20 * s} L${x + 30 * s} ${y - 55 * s} L${x + 34 * s} ${y - 54 * s} L${x + 23 * s} ${y - 18 * s} Z"/><rect x="${x + 2 * s}" y="${y - 13 * s}" width="${2 * s}" height="${13 * s}"/><rect x="${x + 17 * s}" y="${y - 13 * s}" width="${2 * s}" height="${13 * s}"/></g>`;
  if (kind === "springbok")
    return `<g fill="${color}"><ellipse cx="${x}" cy="${y - 8 * s}" rx="${8 * s}" ry="${4 * s}"/><rect x="${x - 6 * s}" y="${y - 6 * s}" width="${1.4 * s}" height="${6 * s}"/><rect x="${x + 5 * s}" y="${y - 6 * s}" width="${1.4 * s}" height="${6 * s}"/><path d="M${x + 6 * s} ${y - 10 * s} L${x + 10 * s} ${y - 16 * s} L${x + 12 * s} ${y - 15 * s} L${x + 9 * s} ${y - 9 * s} Z"/></g>`;
  return `<g fill="${color}"><ellipse cx="${x}" cy="${y - 16 * s}" rx="${20 * s}" ry="${13 * s}"/><ellipse cx="${x + 19 * s}" cy="${y - 20 * s}" rx="${8 * s}" ry="${9 * s}"/><path d="M${x + 24 * s} ${y - 16 * s} C${x + 28 * s} ${y - 6 * s} ${x + 26 * s} ${y} ${x + 29 * s} ${y}" stroke="${color}" stroke-width="${3 * s}" fill="none"/><rect x="${x - 15 * s}" y="${y - 8 * s}" width="${6 * s}" height="${8 * s}"/><rect x="${x + 6 * s}" y="${y - 8 * s}" width="${6 * s}" height="${8 * s}"/></g>`;
}

function caption(w, h, text) {
  const fs = Math.max(14, Math.round(w / 85));
  const safe = text.toUpperCase().replace(/&/g, "&amp;").replace(/</g, "&lt;");
  return `<g font-family="DejaVu Sans, Arial, sans-serif" font-size="${fs}" fill="#fff" opacity="0.85" stroke="#1e1a17" stroke-opacity="0.35" stroke-width="3" paint-order="stroke">
    <text x="${w - fs}" y="${h - fs}" text-anchor="end" letter-spacing="1">PLACEHOLDER · ${safe}</text></g>`;
}

// ---------- scene presets ----------
const P = {
  dawn: [[0, "#2b3a5a"], [0.38, "#a9708a"], [0.62, "#f0a77a"], [1, "#f6d3a6"]],
  day: [[0, "#6f9fc0"], [0.6, "#a9c3d3"], [1, "#e8dccb"]],
  sunset: [[0, "#3a2c4c"], [0.4, "#b0546a"], [0.7, "#ec8f5c"], [1, "#f6c27e"]],
  night: [[0, "#050a14"], [0.55, "#0d1829"], [1, "#1f2f4c"]],
  fog: [[0, "#b9c2c4"], [0.6, "#d8d6cf"], [1, "#e9e4da"]],
  green: [[0, "#5f8fb0"], [0.6, "#b4cbd6"], [1, "#e4e3d2"]],
  dusk: [[0, "#1a2340"], [0.5, "#53466a"], [1, "#d58a64"]],
};

function scene(kind, w, h, seed) {
  const r = rng(seed);
  let defs = "";
  let body = "";
  const bg = (p) => {
    defs += sky("s", P[p]);
    body += `<rect width="${w}" height="${h}" fill="url(#s)"/>`;
  };
  const sun = (x, y, rad, c = "#fbe3b5", o = 0.95) =>
    (body += `<circle cx="${w * x}" cy="${h * y}" r="${w * rad}" fill="${c}" opacity="${o}"/>`);
  const moon = (x, y) => (body += `<circle cx="${w * x}" cy="${h * y}" r="${w * 0.018}" fill="#f1e8da"/>`);

  switch (kind) {
    case "dunes-dawn":
      bg("dawn");
      sun(0.72, 0.5, 0.035);
      body += ridge(r, w, h, h * 0.62, h * 0.18, "#c46a3c", { peak: true, shadow: "#6e2c1a" });
      body += ridge(r, w, h, h * 0.78, h * 0.12, "#d9824a", { peak: true, shadow: "#7a3420" });
      body += ridge(r, w, h, h * 0.92, h * 0.06, "#e9b98c");
      break;
    case "dunes-sunset":
      bg("sunset");
      sun(0.25, 0.55, 0.04, "#ffd9a0");
      body += ridge(r, w, h, h * 0.66, h * 0.2, "#9b3f24", { peak: true, shadow: "#4a1a10" });
      body += ridge(r, w, h, h * 0.86, h * 0.1, "#b5542f", { shadow: "#5a2214" });
      break;
    case "dunes-night":
    case "milky-way":
      bg("night");
      body += stars(r, w, h, Math.round((w * h) / 2600));
      body += milkyWay(w, h);
      body += ridge(r, w, h, h * 0.74, h * 0.16, "#141b2b", { peak: true, shadow: "#0a0f1a" });
      body += ridge(r, w, h, h * 0.9, h * 0.06, "#1b2335");
      if (kind === "milky-way") body += tree(w * 0.3, h * 0.88, w / 900, "#06090f");
      break;
    case "deadvlei":
      bg("day");
      body += ridge(r, w, h, h * 0.62, h * 0.3, "#c0582f", { peak: true, shadow: "#6a2414" });
      body += `<rect y="${h * 0.7}" width="${w}" height="${h * 0.3}" fill="#ece3d6"/>`;
      body += tree(w * 0.3, h * 0.86, w / 700, "#1e1a17");
      body += tree(w * 0.68, h * 0.8, w / 1100, "#1e1a17");
      break;
    case "deadvlei-night":
      bg("night");
      body += stars(r, w, h, Math.round((w * h) / 2200));
      body += milkyWay(w, h);
      body += ridge(r, w, h, h * 0.64, h * 0.26, "#1a1420", { peak: true });
      body += `<rect y="${h * 0.7}" width="${w}" height="${h * 0.3}" fill="#2a2a33"/>`;
      body += tree(w * 0.38, h * 0.86, w / 700, "#05070c");
      break;
    case "waterhole":
    case "waterhole-green":
      bg(kind === "waterhole" ? "day" : "green");
      body += `<rect y="${h * 0.58}" width="${w}" height="${h * 0.42}" fill="${kind === "waterhole" ? "#e4d7c2" : "#a6b07a"}"/>`;
      body += `<ellipse cx="${w * 0.5}" cy="${h * 0.78}" rx="${w * 0.32}" ry="${h * 0.07}" fill="${kind === "waterhole" ? "#8aa3ad" : "#7f9fae"}"/>`;
      body += acacia(w * 0.12, h * 0.6, w / 700, "#3b3a2a");
      body += animal(w * 0.36, h * 0.76, w / 700, "#3e3a36");
      body += animal(w * 0.52, h * 0.75, w / 800, "#4a4540");
      body += animal(w * 0.7, h * 0.74, w / 650, "#3e3a36", "giraffe");
      for (let i = 0; i < 6; i++) body += animal(w * (0.2 + r() * 0.6), h * (0.66 + r() * 0.04), w / 900, "#7a5a40", "springbok");
      break;
    case "waterhole-night":
      bg("night");
      body += stars(r, w, h, Math.round((w * h) / 2600), 0.5);
      body += `<defs><radialGradient id="flood" cx="0.5" cy="0.75" r="0.6"><stop offset="0" stop-color="#f3d9a4" stop-opacity="0.75"/><stop offset="1" stop-color="#0d1829" stop-opacity="0"/></radialGradient></defs>`;
      body += `<rect y="${h * 0.58}" width="${w}" height="${h * 0.42}" fill="#1a1b22"/>`;
      body += `<rect y="${h * 0.4}" width="${w}" height="${h * 0.6}" fill="url(#flood)"/>`;
      body += `<ellipse cx="${w * 0.5}" cy="${h * 0.8}" rx="${w * 0.3}" ry="${h * 0.06}" fill="#5c6a72"/>`;
      body += animal(w * 0.42, h * 0.78, w / 650, "#141414");
      body += animal(w * 0.6, h * 0.77, w / 900, "#141414");
      break;
    case "coast-fog":
      bg("fog");
      body += `<rect y="${h * 0.52}" width="${w}" height="${h * 0.12}" fill="#8e9ea4"/>`;
      body += `<path d="M0 ${h * 0.6} C${w * 0.3} ${h * 0.58} ${w * 0.6} ${h * 0.63} ${w} ${h * 0.6} L${w} ${h} L0 ${h} Z" fill="#cdb894"/>`;
      body += `<path d="M${w * 0.55} ${h * 0.62} l${w * 0.18} -${h * 0.03} l${w * 0.02} ${h * 0.04} l-${w * 0.2} ${h * 0.02} Z" fill="#5a4a3f"/>`;
      body += `<rect y="0" width="${w}" height="${h}" fill="#fff" opacity="0.18"/>`;
      break;
    case "canyon":
      bg("sunset");
      body += ridge(r, w, h, h * 0.42, h * 0.04, "#7a4a35");
      body += `<path d="M0 ${h * 0.5} L${w * 0.4} ${h * 0.5} C${w * 0.45} ${h * 0.7} ${w * 0.5} ${h * 0.8} ${w * 0.52} ${h} L0 ${h} Z" fill="#5a3324"/>`;
      body += `<path d="M${w} ${h * 0.48} L${w * 0.62} ${h * 0.5} C${w * 0.58} ${h * 0.7} ${w * 0.56} ${h * 0.85} ${w * 0.55} ${h} L${w} ${h} Z" fill="#6b3d2a"/>`;
      body += `<path d="M${w * 0.5} ${h} C${w * 0.52} ${h * 0.85} ${w * 0.56} ${h * 0.75} ${w * 0.54} ${h * 0.62}" stroke="#9fb5bd" stroke-width="${w / 200}" fill="none"/>`;
      break;
    case "granite":
      bg("sunset");
      body += `<path d="M${w * 0.1} ${h * 0.8} C${w * 0.15} ${h * 0.4} ${w * 0.3} ${h * 0.25} ${w * 0.42} ${h * 0.3} C${w * 0.5} ${h * 0.34} ${w * 0.52} ${h * 0.5} ${w * 0.6} ${h * 0.48} C${w * 0.7} ${h * 0.46} ${w * 0.78} ${h * 0.6} ${w * 0.9} ${h * 0.8} Z" fill="#a8502e"/>`;
      body += ridge(r, w, h, h * 0.84, h * 0.04, "#6b4a2e");
      body += acacia(w * 0.78, h * 0.84, w / 900, "#2a2219");
      break;
    case "savanna":
      bg("day");
      body += ridge(r, w, h, h * 0.62, h * 0.03, "#c9b48a");
      body += acacia(w * 0.2, h * 0.64, w / 600, "#4a4632");
      body += acacia(w * 0.7, h * 0.63, w / 900, "#4a4632");
      body += animal(w * 0.45, h * 0.72, w / 700, "#5a5048", "giraffe");
      body += animal(w * 0.6, h * 0.76, w / 800, "#5a5048");
      break;
    case "river":
      bg("green");
      body += ridge(r, w, h, h * 0.55, h * 0.03, "#6e8a52");
      body += `<path d="M0 ${h * 0.7} C${w * 0.3} ${h * 0.64} ${w * 0.6} ${h * 0.76} ${w} ${h * 0.68} L${w} ${h * 0.82} C${w * 0.6} ${h * 0.9} ${w * 0.3} ${h * 0.78} 0 ${h * 0.84} Z" fill="#7d9aa6"/>`;
      body += `<rect y="${h * 0.84}" width="${w}" height="${h * 0.16}" fill="#58703f"/>`;
      body += acacia(w * 0.8, h * 0.58, w / 800, "#2f3a24");
      break;
    case "kalahari":
      bg("sunset");
      body += ridge(r, w, h, h * 0.66, h * 0.05, "#b4552c");
      body += ridge(r, w, h, h * 0.8, h * 0.05, "#c8693a");
      body += acacia(w * 0.3, h * 0.68, w / 700, "#2a1d16");
      body += animal(w * 0.62, h * 0.82, w / 600, "#3a2418", "springbok");
      break;
    case "ghost-town":
      bg("day");
      body += `<rect y="${h * 0.62}" width="${w}" height="${h * 0.38}" fill="#e2c49c"/>`;
      body += `<g fill="#cfb9a0"><rect x="${w * 0.25}" y="${h * 0.38}" width="${w * 0.36}" height="${h * 0.3}"/><path d="M${w * 0.22} ${h * 0.4} L${w * 0.43} ${h * 0.24} L${w * 0.64} ${h * 0.4} Z"/></g>`;
      body += `<rect x="${w * 0.33}" y="${h * 0.46}" width="${w * 0.07}" height="${h * 0.18}" fill="#5a4636"/>`;
      body += `<rect x="${w * 0.48}" y="${h * 0.46}" width="${w * 0.06}" height="${h * 0.09}" fill="#5a4636"/>`;
      body += `<path d="M0 ${h * 0.75} C${w * 0.3} ${h * 0.62} ${w * 0.5} ${h * 0.58} ${w * 0.62} ${h * 0.6} C${w * 0.8} ${h * 0.64} ${w * 0.9} ${h * 0.72} ${w} ${h * 0.74} L${w} ${h} L0 ${h} Z" fill="#e8b98a"/>`;
      break;
    case "town-coast":
      bg("fog");
      body += `<rect y="${h * 0.62}" width="${w}" height="${h * 0.38}" fill="#7f9aa4"/>`;
      body += `<rect x="${w * 0.6}" y="${h * 0.42}" width="${w * 0.02}" height="${h * 0.22}" fill="#c9b7a2"/><path d="M${w * 0.6} ${h * 0.42} l${w * 0.01} -${h * 0.04} l${w * 0.01} ${h * 0.04} Z" fill="#a8401f"/>`;
      body += `<path d="M0 ${h * 0.66} L${w * 0.5} ${h * 0.66} L${w * 0.5} ${h * 0.64} L${w} ${h * 0.64} L${w} ${h * 0.68} L0 ${h * 0.68} Z" fill="#5a5048"/>`;
      body += `<rect y="0" width="${w}" height="${h}" fill="#fff" opacity="0.12"/>`;
      break;
    case "mountains":
      bg("dawn");
      body += ridge(r, w, h, h * 0.55, h * 0.22, "#6b4a52", { peak: true });
      body += ridge(r, w, h, h * 0.7, h * 0.16, "#8a5a44", { peak: true });
      body += ridge(r, w, h, h * 0.88, h * 0.06, "#b98a5e");
      break;
    case "rock":
      bg("day");
      body += `<rect width="${w}" height="${h}" fill="#b0623c"/>`;
      body += `<g stroke="#f0dec7" stroke-width="${w / 260}" fill="none" stroke-linecap="round" opacity="0.85">
        <path d="M${w * 0.3} ${h * 0.5} c${w * 0.05} -${h * 0.08} ${w * 0.12} -${h * 0.08} ${w * 0.16} 0 M${w * 0.33} ${h * 0.5} l0 ${h * 0.1} M${w * 0.43} ${h * 0.5} l0 ${h * 0.1} M${w * 0.46} ${h * 0.46} l${w * 0.04} -${h * 0.1}"/>
        <circle cx="${w * 0.66}" cy="${h * 0.4}" r="${w * 0.03}"/><circle cx="${w * 0.66}" cy="${h * 0.4}" r="${w * 0.012}"/></g>`;
      break;
    case "camp":
      bg("dusk");
      body += stars(r, w, h, 120, 0.4);
      body += ridge(r, w, h, h * 0.7, h * 0.05, "#3a2a26");
      body += `<path d="M${w * 0.35} ${h * 0.72} L${w * 0.5} ${h * 0.48} L${w * 0.65} ${h * 0.72} Z" fill="#e7c48e" opacity="0.92"/>`;
      body += `<rect x="${w * 0.47}" y="${h * 0.6}" width="${w * 0.06}" height="${h * 0.12}" fill="#f6d79a"/>`;
      break;
    case "lodge":
      bg("sunset");
      body += ridge(r, w, h, h * 0.62, h * 0.08, "#7a4a33");
      body += `<rect x="${w * 0.2}" y="${h * 0.56}" width="${w * 0.6}" height="${h * 0.12}" fill="#3a2a22"/><path d="M${w * 0.16} ${h * 0.57} L${w * 0.84} ${h * 0.57} L${w * 0.78} ${h * 0.5} L${w * 0.22} ${h * 0.5} Z" fill="#d4b48a"/>`;
      for (let i = 0; i < 5; i++) body += `<rect x="${w * (0.25 + i * 0.11)}" y="${h * 0.59}" width="${w * 0.05}" height="${h * 0.06}" fill="#f2c27c"/>`;
      body += `<rect y="${h * 0.68}" width="${w}" height="${h * 0.32}" fill="#9a5a38"/>`;
      break;
    case "craft":
      body += `<rect width="${w}" height="${h}" fill="#e7d3b6"/>`;
      for (let i = 0; i < 9; i++)
        body += `<circle cx="${w / 2}" cy="${h / 2}" r="${(w / 2.4) * (1 - i / 9)}" fill="none" stroke="${i % 2 ? "#a8401f" : "#3a2a22"}" stroke-width="${w / 50}" opacity="0.85"/>`;
      break;
    case "portrait":
      bg("dusk");
      body += `<circle cx="${w / 2}" cy="${h * 0.4}" r="${w * 0.16}" fill="#e9b98c" opacity="0.85"/><path d="M${w * 0.18} ${h} C${w * 0.2} ${h * 0.65} ${w * 0.8} ${h * 0.65} ${w * 0.82} ${h} Z" fill="#e9b98c" opacity="0.85"/>`;
      break;
    case "road":
      bg("day");
      body += ridge(r, w, h, h * 0.55, h * 0.1, "#b97a52");
      body += `<rect y="${h * 0.58}" width="${w}" height="${h * 0.42}" fill="#d8b98e"/>`;
      body += `<path d="M${w * 0.47} ${h * 0.58} L${w * 0.53} ${h * 0.58} L${w * 0.85} ${h} L${w * 0.15} ${h} Z" fill="#c69c70"/>`;
      body += `<rect x="${w * 0.44}" y="${h * 0.74}" width="${w * 0.12}" height="${h * 0.08}" rx="${w * 0.01}" fill="#3a3a36"/><rect x="${w * 0.45}" y="${h * 0.7}" width="${w * 0.1}" height="${h * 0.05}" fill="#2a2a26"/>`;
      break;
    case "plane":
      bg("day");
      body += ridge(r, w, h, h * 0.8, h * 0.06, "#c98a5a");
      body += `<g fill="#f5f0e8" transform="translate(${w * 0.5} ${h * 0.35}) scale(${w / 900})"><rect x="-90" y="-6" width="180" height="12" rx="6"/><rect x="-14" y="-60" width="28" height="120" rx="6" transform="rotate(90)"/><rect x="-6" y="-70" width="12" height="140" rx="4"/><rect x="70" y="-24" width="8" height="48" rx="3"/></g>`;
      break;
    default:
      bg("day");
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${defs}</defs>${body}`;
}

// ---------- manifest ----------
// [file, scene, caption, width, height]
const L = [2000, 1250];
const M = [1400, 1000];
const S = [900, 1100];

const manifest = [
  ["hero-home-day", "dunes-dawn", "Sossusvlei dunes at dawn", ...L],
  ["hero-home-night", "milky-way", "Milky Way over the dunes", ...L],
  ["band-deadvlei-day", "deadvlei", "Deadvlei camelthorns", ...L],
  ["band-deadvlei-night", "deadvlei-night", "Deadvlei under the stars", ...L],
  ["cta-day", "dunes-sunset", "Red dunes at sunset", ...L],
  ["cta-night", "dunes-night", "Night over the dune sea", ...L],
  ["hero-destinations", "road", "Gravel road towards the dunes", ...L],
  ["hero-journeys", "dunes-sunset", "Evening light on the dunes", ...L],
  ["hero-night-sky", "milky-way", "The southern Milky Way", ...L],
  ["hero-how-to-travel", "road", "4x4 on a gravel road", ...L],
  ["hero-waterhole", "waterhole", "Etosha waterhole, dry season", ...L],
  ["hero-waterhole-night", "waterhole-night", "Floodlit waterhole at night", ...L],
  ["hero-cultures", "mountains", "Hills of the Kunene at dawn", ...L],
  ["hero-our-story", "dunes-dawn", "First light on the NamibRand", ...L],
  ["hero-contact", "dunes-sunset", "Dunes at last light", ...L],
  ["hero-journal", "road", "The road south", ...L],
  ["hero-faq", "granite", "Granite and evening light", ...L],
  ["hero-legal", "dunes-dawn", "Quiet dunes", ...L],
  ["band-night-sky", "dunes-night", "Star-filled sky over the desert", ...L],
  ["band-etosha", "savanna", "Etosha grassland", ...L],
  ["band-cultures", "rock", "Ancient rock engravings", ...L],

  // destinations: hero + detail
  ["dest-sossusvlei", "dunes-dawn", "Sossusvlei", ...L],
  ["dest-sossusvlei-2", "deadvlei", "Deadvlei", ...M],
  ["dest-namibrand", "dunes-night", "NamibRand at night", ...L],
  ["dest-namibrand-2", "camp", "Desert camp", ...M],
  ["dest-windhoek", "mountains", "Hills around Windhoek", ...L],
  ["dest-windhoek-2", "lodge", "Guesthouse near Windhoek", ...M],
  ["dest-swakopmund", "town-coast", "Swakopmund lighthouse", ...L],
  ["dest-swakopmund-2", "coast-fog", "Walvis Bay lagoon", ...M],
  ["dest-skeleton-coast", "coast-fog", "Skeleton Coast in fog", ...L],
  ["dest-skeleton-coast-2", "dunes-sunset", "Dunes meeting the sea", ...M],
  ["dest-damaraland", "granite", "Damaraland", ...L],
  ["dest-damaraland-2", "savanna", "Desert-adapted elephants", ...M],
  ["dest-twyfelfontein", "rock", "Twyfelfontein engravings", ...L],
  ["dest-twyfelfontein-2", "granite", "Sandstone at Twyfelfontein", ...M],
  ["dest-spitzkoppe", "granite", "Spitzkoppe", ...L],
  ["dest-spitzkoppe-2", "milky-way", "Spitzkoppe at night", ...M],
  ["dest-kaokoland", "mountains", "Kaokoland", ...L],
  ["dest-kaokoland-2", "river", "Kunene River", ...M],
  ["dest-etosha", "waterhole", "Etosha waterhole", ...L],
  ["dest-etosha-2", "waterhole-night", "Floodlit waterhole", ...M],
  ["dest-zambezi", "river", "Zambezi Region", ...L],
  ["dest-zambezi-2", "savanna", "Floodplain", ...M],
  ["dest-fish-river", "canyon", "Fish River Canyon", ...L],
  ["dest-fish-river-2", "kalahari", "The rim at dusk", ...M],
  ["dest-luderitz", "ghost-town", "Kolmanskop", ...L],
  ["dest-luderitz-2", "town-coast", "Lüderitz harbour", ...M],
  ["dest-kalahari", "kalahari", "Kalahari red dunes", ...L],
  ["dest-kalahari-2", "savanna", "Kalahari grassland", ...M],

  // journeys
  ["journey-first-light", "dunes-dawn", "Namibia, First Light", ...L],
  ["journey-classic-self-drive", "road", "The Classic Self-Drive", ...L],
  ["journey-skeleton-coast-air", "plane", "Skeleton Coast by Air", ...L],
  ["journey-dunes-dark-skies", "milky-way", "Dunes & Dark Skies", ...L],
  ["journey-etosha-zambezi", "river", "Etosha & the Zambezi", ...L],
  ["journey-deep-south", "canyon", "The Deep South", ...L],
  ["journey-photographers", "deadvlei", "Photographer's Namibia", ...L],
  ["journey-kids", "waterhole", "Namibia with Kids", ...L],

  // stays
  ["stay-1", "camp", "Desert camp", ...M],
  ["stay-2", "lodge", "Dune lodge", ...M],
  ["stay-3", "lodge", "Coastal guesthouse", ...M],
  ["stay-4", "camp", "Coast camp", ...M],
  ["stay-5", "lodge", "Damaraland lodge", ...M],
  ["stay-6", "camp", "Kunene camp", ...M],
  ["stay-7", "lodge", "Etosha lodge", ...M],
  ["stay-8", "lodge", "River lodge", ...M],
  ["stay-9", "camp", "Canyon camp", ...M],
  ["stay-10", "lodge", "Kalahari farm", ...M],

  // home three points
  ["point-light", "dunes-sunset", "Light", ...M],
  ["point-space", "camp", "Space", ...M],
  ["point-honesty", "road", "Honest roads", ...M],

  // team
  ["team-1", "portrait", "Team member", ...S],
  ["team-2", "portrait", "Team member", ...S],
  ["team-3", "portrait", "Team member", ...S],
  ["team-4", "portrait", "Team member", ...S],

  // cultures (no people; landscapes and craft)
  ["culture-craft", "craft", "Basketry pattern", ...M],
  ["culture-landscape", "mountains", "Northern landscape", ...M],

  // journal
  ["journal-sossusvlei", "dunes-dawn", "Sossusvlei at sunrise", ...L],
  ["journal-self-drive", "road", "Gravel road", ...L],
  ["journal-namibrand", "milky-way", "NamibRand stars", ...L],
  ["journal-etosha", "waterhole-green", "Etosha in the green season", ...L],

  // misc
  ["style-self-drive", "road", "Self-drive", ...M],
  ["style-guided", "savanna", "Guided", ...M],
  ["style-fly-in", "plane", "Fly-in", ...M],
  ["og-default", "dunes-dawn", "Namib Light", 1200, 630],
];

let made = 0;
for (const [file, kind, cap, w, h] of manifest) {
  const path = join(OUT, `${file}.jpg`);
  if (!force && existsSync(path)) continue;
  const svg = scene(kind, w, h, file) + caption(w, h, cap) + "</svg>";
  await sharp(Buffer.from(svg)).jpeg({ quality: 74, mozjpeg: true }).toFile(path);
  made++;
}
console.log(`placeholders: ${made} written, ${manifest.length - made} kept`);
