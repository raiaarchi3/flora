"use client";
import { useEffect, useState } from "react";
import FlowerArt from "./FlowerArt";

// Shows (in order): an uploaded/explicit video, a photo, or the SVG drawing.
// Photos are found automatically: drop public/flowers/<id>.png (or .webp / .jpg) and it appears.
// Make photos / drawings smaller or bigger here (0.75 = 75%). Videos are not affected.
// Keep the full class text, e.g. "[scale:0.6]", "[scale:0.75]", "[scale:0.9]".
const IMAGE_SIZE = "[scale:0.75]";

export default function FlowerMedia({ flower, crop = false, className = "" }) {
  const candidates = [flower.image, `/flowers/${flower.id}.png`, `/flowers/${flower.id}.webp`, `/flowers/${flower.id}.jpg`].filter(Boolean);
  const [n, setN] = useState(0);
  useEffect(() => setN(0), [flower.id, flower.image]);

  const fit = crop ? "object-cover" : "object-contain";
  const small = crop ? "" : IMAGE_SIZE; // thumbnails stay as they are

  if (flower.heroVideo) {
    return <video key={flower.heroVideo} src={flower.heroVideo} autoPlay loop muted playsInline className={`${className} ${fit}`} />;
  }
  if (n < candidates.length) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img key={candidates[n]} src={candidates[n]} alt={flower.name} draggable={false} onError={() => setN(n + 1)} className={`${className} ${fit} ${small}`} />
    );
  }
  return <FlowerArt flower={flower} crop={crop} className={`${className} ${small}`} />;
}