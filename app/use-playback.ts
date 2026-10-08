"use client";

import { useEffect, useRef, useState } from "react";

// Plays a sequence one step at a time once the element scrolls into view.
// `shown` counts the steps revealed so far. The element is only "armed" (see
// .chat in globals.css) when JavaScript runs and the user has not asked for
// reduced motion, so without either, every step is simply visible.
export function usePlayback(count: number, interval = 650) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.setAttribute("data-armed", "");
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        let n = 0;
        timer = setInterval(() => {
          n += 1;
          setShown(n);
          if (n >= count) clearInterval(timer);
        }, interval);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [count, interval]);

  return { ref, shown };
}
