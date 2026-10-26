"use client";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Browser({ flowers, current, onPick, onClose }) {
  const [q, setQ] = useState("");
  const input = useRef(null);

  useEffect(() => {
    input.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return flowers
      .map((f, i) => ({ f, i }))
      .filter(({ f }) => !t || [f.name, f.scientific, f.family, f.origin, f.color].join(" ").toLowerCase().includes(t));
  }, [q, flowers]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 px-8 pb-12 pt-24 sm:px-14" role="dialog" aria-modal="true" aria-label="Browse all flowers">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-6">
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${flowers.length} flowers by name, family, origin or colour`}
            className="w-full border-b border-white/30 bg-transparent pb-3 text-lg outline-none placeholder:text-white/30 focus:border-white"
          />
          <button onClick={onClose} className="text-xs text-white/60 hover:text-white">Close</button>
        </div>
        <p className="mt-4 text-[11px] text-white/50">{list.length} results</p>
        <ul className="mt-6 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-4">
          {list.map(({ f, i }) => (
            <li key={f.id} className="bg-black">
              <button
                onClick={() => onPick(i)}
                className={`block w-full px-4 py-4 text-left transition hover:bg-white/10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white ${i === current ? "bg-white/10" : ""}`}
              >
                <span className="block text-sm">{f.name}</span>
                <span className="mt-1 block text-[10px] italic text-white/45">{f.scientific}</span>
                <span className="mt-1 block text-[10px] text-white/45">{f.family}</span>
              </button>
            </li>
          ))}
        </ul>
        {list.length === 0 && <p className="mt-10 text-sm text-white/50">No flowers match that search.</p>}
      </div>
    </div>
  );
}
