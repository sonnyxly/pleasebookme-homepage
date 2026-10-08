"use client";

import { useEffect, useRef } from "react";

// Brighter gridlines that follow the pointer across the parent section.
// Only on devices that hover, and not when the user prefers reduced motion.
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.closest("section, header, div[data-spot]") as HTMLElement | null;
    if (!el || !section) return;
    const canHover = window.matchMedia("(hover: hover)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || calm) return;

    const move = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
      el.style.setProperty("--spot", "1");
    };
    const leave = () => el.style.setProperty("--spot", "0");

    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    return () => {
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={ref} className="field-spot" />;
}
