"use client";

import type { Dict } from "./i18n";
import { usePlayback } from "./use-playback";

// The customer and shop talk in Vietnamese on both language versions: that is
// the real conversation. Only the label and caption are translated.
const CHAT: { from: "customer" | "shop"; text: string }[] = [
  { from: "customer", text: "Mai còn lịch không anh?" },
  { from: "shop", text: "Còn em, mấy giờ em?" },
  { from: "customer", text: "Tầm 3 giờ chiều ạ" },
  { from: "shop", text: "3h đầy rồi, 4h được không em?" },
  { from: "customer", text: "Dạ được ạ" },
];

// The chat plays out one message at a time when it scrolls into view. Layout is
// reserved up front, so nothing jumps.
export default function ChatDemo({ t }: { t: Dict["chat"] }) {
  const { ref, shown } = usePlayback(CHAT.length);

  return (
    <div ref={ref} className="chat">
      <ol
        aria-label={t.aria}
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
        {t.caption}
      </p>
    </div>
  );
}
