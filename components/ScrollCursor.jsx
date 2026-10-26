"use client";
import { useEffect, useRef, useState } from "react";

// White ring that follows the mouse and stretches into a pill while scrolling/dragging.
export default function ScrollCursor() {
  const ref = useRef(null);
  const [stretch, setStretch] = useState(false);
  const [show, setShow] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("has-cursor");
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf;

    const move = (e) => { x = e.clientX; y = e.clientY; setShow(true); };
    const pulse = () => {
      setStretch(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setStretch(false), 700);
    };
    const tick = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      if (ref.current) ref.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("mousemove", move);
    window.addEventListener("wheel", pulse, { passive: true });
    window.addEventListener("keydown", (e) => ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) && pulse());
    document.addEventListener("mouseleave", () => setShow(false));
    return () => {
      document.body.classList.remove("has-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("wheel", pulse);
    };
  }, []);

  return (
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[60]" aria-hidden="true">
      <div
        className={`h-10 rounded-full border-2 border-white transition-all duration-500 ease-out ${
          stretch ? "w-20" : "w-10"
        } ${show ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
