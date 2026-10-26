import { featured } from "./flowers";
import { rows } from "./rows";
import { media } from "./media";

const PALETTE = {
  red: ["#f08a7a", "#d83a3a", "#a31a2a", "#6a0f1c"],
  pink: ["#f9c6d8", "#ec80a8", "#c8457a", "#8e2456"],
  purple: ["#d2b4f0", "#a56fe0", "#7a3fc0", "#4e1f86"],
  blue: ["#b6d4f7", "#6fa3ee", "#3f6fd0", "#223f8c"],
  white: ["#ffffff", "#f1f1ee", "#d9d6cf", "#b9b4a8"],
  yellow: ["#fff09a", "#ffd23f", "#f1b300", "#c28400"],
  orange: ["#ffcf8a", "#ffa040", "#f27010", "#b84708"],
  mixed: ["#ffd1a8", "#ff8aa0", "#e0457a", "#a02a6a"],
};

const SHAPE = {
  d: { layers: 2, petals: 26, radius: 150, width: 16, tip: 0.25, disc: 44, rotate: 0 },
  l: { layers: 5, petals: 12, radius: 145, width: 42, tip: 0.75, rotate: 6 },
  r: { layers: 2, petals: 5, radius: 150, width: 72, tip: 0.9, rotate: 0 },
  s: { layers: 2, petals: 6, radius: 160, width: 34, tip: 0.15, rotate: 0 },
};

const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function parse() {
  const out = [];
  let family = "";
  for (const line of rows.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith("#")) { family = t.slice(1).replace(/\(.*\)/, "").trim(); continue; }
    const [name, scientific, origin, bloomTime, color, shape] = t.split("|");
    const colorWord = color === "mixed" ? "multicoloured" : color;
    out.push({
      id: slug(name),
      name,
      scientific,
      family,
      origin,
      bloomTime,
      color,
      summary: `${name} (${scientific}) is a flowering plant in the ${family} family, native to ${origin}. Its ${colorWord} blooms appear ${bloomTime.toLowerCase()}.`,
      facts: [
        `Native range: ${origin}.`,
        `Flowering time: ${bloomTime.toLowerCase()}.`,
        `Typical bloom colour: ${colorWord}.`,
        `Botanical family: ${family}.`,
      ],
      bloom: { ...SHAPE[shape], colors: PALETTE[color], center: shape === "d" ? "#3a2412" : PALETTE[color][3] },
      stem: "#5d7a2a",
    });
  }
  return out;
}

const taken = new Set(featured.map((f) => f.id));
export const flowers = [...featured, ...parse().filter((f) => !taken.has(f.id))].map((f) => ({ ...f, ...media[f.id] }));
