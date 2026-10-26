"use client";
import { useEffect, useState } from "react";

export default function DetailPanel({ flower, onClose }) {
  const [noVideo, setNoVideo] = useState(false);
  useEffect(() => setNoVideo(false), [flower.id]);
  const videoSrc = flower.video || `/flowers/${flower.id}.mp4`;


  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const rows = [
    ["Scientific name", flower.scientific],
    ["Origin", flower.origin],
    ["Family", flower.family],
    ["Blooms", flower.bloomTime],
    ["Height", flower.height],
  ].filter(([, v]) => v);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70" onClick={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${flower.name} details`}
        onClick={(e) => e.stopPropagation()}
        className="animate-rise h-full w-full max-w-md overflow-y-auto bg-[#111] p-8 sm:p-10"
      >
        <button onClick={onClose} className="mb-8 text-xs text-white/60 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-white">
          Close
        </button>
        {!noVideo && (
          <video key={videoSrc} src={videoSrc} controls muted playsInline onError={() => setNoVideo(true)} className="mb-8 aspect-video w-full bg-black object-cover" />
        )}
        <h2 className="font-display text-5xl leading-none">{flower.name}</h2>
        <p className="mt-5 text-sm leading-relaxed text-white/70">{flower.summary}</p>

        <dl className="mt-8 divide-y divide-white/10 border-y border-white/10 text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 py-3">
              <dt className="text-white/50">{k}</dt>
              <dd className="text-right">{v}</dd>
            </div>
          ))}
        </dl>

        <h3 className="mt-8 text-sm font-semibold">Facts</h3>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-white/70">
          {flower.facts.map((f) => (
            <li key={f} className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/50" />
              {f}
            </li>
          ))}
        </ul>


        {flower.care && (
          <>
            <h3 className="mt-8 text-sm font-semibold">Growing it</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{flower.care}</p>
          </>
        )}
      </aside>
    </div>
  );
}
