"use client";

import { useEffect, useRef, useState } from "react";

const CHAT: { from: "customer" | "shop"; text: string }[] = [
  { from: "customer", text: "Mai còn lịch không anh?" },
  { from: "shop", text: "Còn em, mấy giờ em?" },
  { from: "customer", text: "Tầm 3 giờ chiều ạ" },
  { from: "shop", text: "3h đầy rồi, 4h được không em?" },
  { from: "customer", text: "Dạ được ạ" },
];

// The chat plays out one message at a time when it scrolls into view. Layout is
// reserved up front, so nothing jumps. Without JavaScript, or with reduced
// motion, the container is never armed and every message is simply shown (see
// .chat in globals.css).
export default function ChatDemo() {
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
          if (n >= CHAT.length) clearInterval(timer);
        }, 650);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div ref={ref} className="chat">
      <ol
        aria-label="Example chat that books one haircut"
        className="flex flex-col gap-2.5 rounded-2xl bg-paper p-5 sm:p-7"
      >
        {CHAT.map((m, i) => (
          <li
            key={i}
            lang="vi"
            data-on={i < shown ? "" : undefined}
            className={`chat-msg max-w-[80%] rounded-2xl px-4 py-2.5 ${
              m.from === "customer"
                ? "self-start bg-surface"
                : "self-end bg-highlight text-highlight-ink"
            }`}
          >
            {m.text}
          </li>
        ))}
      </ol>
      <p
        data-on={shown >= CHAT.length ? "" : undefined}
        className="chat-note mt-4 text-sm text-muted"
      >
        Five messages for one haircut.
      </p>
    </div>
  );
}
