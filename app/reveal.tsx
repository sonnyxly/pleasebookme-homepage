"use client";

import { useEffect, useRef, useState } from "react";

// Scroll reveal. Content is visible on the server and without JavaScript. On
// mount, anything that starts below the fold is hidden, then eased in when it
// scrolls into view. Nothing hides when the user prefers reduced motion.
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"visible" | "armed" | "in">("visible");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setState("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("in");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${
        state === "visible" ? "" : "reveal-armed"
      } ${state === "in" ? "reveal-in" : ""}`}
      style={{ ["--delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
