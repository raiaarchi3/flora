"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { flowers } from "@/data/allFlowers";
import FlowerMedia from "@/components/FlowerMedia";
import DetailPanel from "@/components/DetailPanel";
import ScrollCursor from "@/components/ScrollCursor";
import Browser from "@/components/Browser";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [dir, setDir] = useState(1);
  const [browse, setBrowse] = useState(false);
  const lock = useRef(false);
  const touchY = useRef(null);
  const flower = flowers[index];

  const goTo = useCallback((i, d) => {
    if (lock.current) return;
    lock.current = true;
    setDir(d ?? (i > index ? 1 : -1));
    setIndex((i + flowers.length) % flowers.length);
    setTimeout(() => (lock.current = false), 900);
  }, [index]);

  // Wheel, mouse drag, touch swipe and arrow keys all switch flowers
  useEffect(() => {
    if (open || browse) return;
    const step = (d) => goTo(index + d, d);
    let acc = 0, accTimer, start = null;

    const onWheel = (e) => {
      acc += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      clearTimeout(accTimer);
      accTimer = setTimeout(() => (acc = 0), 150);
      if (Math.abs(acc) > 40) { step(acc > 0 ? 1 : -1); acc = 0; }
    };
    const onKey = (e) => {
      if (["ArrowDown", "ArrowRight", "PageDown"].includes(e.key)) step(1);
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) step(-1);
    };
    const onDown = (e) => {
      if (e.target.closest("button, a")) return;
      start = { x: e.clientX, y: e.clientY };
    };
    const onUp = (e) => {
      if (!start) return;
      const dx = start.x - e.clientX, dy = start.y - e.clientY;
      start = null;
      const d = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      if (Math.abs(d) > 50) step(d > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      clearTimeout(accTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [index, open, browse, goTo]);

  return (
    <main className="relative min-h-screen select-none overflow-hidden bg-black" style={{ touchAction: "none" }}>
      {/* Center flower */}
      <div key={flower.id} className={`${dir > 0 ? "animate-bloom-down" : "animate-bloom-up"} pointer-events-none absolute inset-0 flex items-center justify-center`}>
        <FlowerMedia flower={flower} className="h-[78vh] w-auto max-w-[90vw] lg:translate-y-[100px]" />
      </div>

      {/* Content grid */}
      <section className="relative z-10 grid min-h-screen grid-rows-[1fr_auto] px-8 pb-8 pt-28 sm:px-14 lg:grid-cols-[1fr_auto]">
        <div className="flex flex-col justify-center lg:max-w-[18rem]">
          <div key={flower.id + "t"} className="animate-rise">
            <p className="flex items-center gap-2 text-[11px] font-semibold">
              <span className="h-2 w-2 bg-white/30" /> {flower.family}
            </p>
            <h1 className="mt-4 break-words font-display text-6xl leading-[1.05] sm:text-7xl">{flower.name}</h1>
            <p className="mt-6 text-[12px] leading-relaxed text-white/80">{flower.summary}</p>
            <div className="mt-10 flex gap-10 text-[11px]">
              <div>
                <p className="font-semibold">Origin</p>
                <p className="mt-2 max-w-[8rem] text-white/60">{flower.origin}</p>
              </div>
              <div>
                <p className="font-semibold">Family</p>
                <p className="mt-2 text-white/60">{flower.family}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="mt-10 flex w-full flex-col justify-center lg:mt-0 lg:w-72">
          <h2 className="text-[11px] font-semibold">Observe its beauty of Daisy family</h2>
          <p className="mt-3 text-[10px] leading-relaxed text-white/60">
            Asteraceae is a very large and widespread family of flowering plants. The family includes over 32,000
            currently accepted species, in over 1,900 genera in 13 subfamilies.
          </p>
          <p className="mt-4 flex items-center gap-2 text-[10px] text-white/60">
            <span className="h-px w-4 bg-white/40" /> Christine R.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="mt-8 w-full bg-[#222] py-4 text-[11px] font-semibold transition hover:bg-[#333] focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
          >
            View Detail
          </button>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between lg:col-span-2 lg:pt-6">
          <div className="flex items-center gap-5">
          <button onClick={() => goTo(index - 1, -1)} aria-label="Previous flower" className="text-[11px] text-white/70 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-white">Prev</button>
          <span className="min-w-[4.5rem] text-center text-[11px] tabular-nums text-white/70" aria-live="polite">
              {String(index + 1).padStart(3, "0")} / {flowers.length}
            </span>
          <button onClick={() => goTo(index + 1, 1)} aria-label="Next flower" className="text-[11px] text-white/70 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-white">Next</button>
          <button onClick={() => setBrowse(true)} className="ml-3 border border-white/30 px-3 py-1.5 text-[11px] hover:bg-white/10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white">Browse all</button>
          </div>
          <div className="flex items-center gap-5 text-[10px]">
            <span className="font-semibold">Share on</span>
            <a href="#" className="text-white/60 hover:text-white">Fb</a>
            <a href="#" className="text-white/60 hover:text-white">Tw</a>
            <a href="#" className="text-white/60 hover:text-white">Ig</a>
          </div>
        </div>
      </section>

      <ScrollCursor />
      {browse && (
        <Browser flowers={flowers} current={index} onClose={() => setBrowse(false)} onPick={(i) => { setDir(i > index ? 1 : -1); setIndex(i); setBrowse(false); }} />
      )}
      {open && <DetailPanel flower={flower} onClose={() => setOpen(false)} />}
    </main>
  );
}