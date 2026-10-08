"use client";

import Mark from "./mark";
import { usePlayback } from "./use-playback";

// A sample conversation with the booking assistant. It follows the same exchange
// as the chat above, but each fact comes from a call to the booking system (the
// small steps between messages), not from the assistant's guess. The times match
// the live demo's "Tomorrow" column: 15:30 taken, 16:00 and 17:30 free.
type Step =
  | { kind: "customer" | "assistant"; text: string }
  | { kind: "call"; text: string };

const STEPS: Step[] = [
  { kind: "customer", text: "Mai còn lịch không?" },
  { kind: "assistant", text: "Dạ còn ạ. Mình muốn đặt lúc mấy giờ ạ?" },
  { kind: "customer", text: "Tầm 3 rưỡi chiều" },
  { kind: "call", text: "Checked availability · 15:30 is taken" },
  {
    kind: "assistant",
    text: "3 rưỡi đã kín rồi ạ. Còn 4 giờ và 5 rưỡi, mình chọn giờ nào ạ?",
  },
  { kind: "customer", text: "4 giờ nhé" },
  { kind: "call", text: "Held 16:00 · Booked" },
  {
    kind: "assistant",
    text: "Đã đặt xong ạ: Cắt tóc, ngày mai lúc 16:00. Hẹn gặp mình!",
  },
];

export default function AssistantDemo() {
  const { ref, shown } = usePlayback(STEPS.length, 800);

  return (
    <div ref={ref} className="chat">
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_70px_-40px_rgba(26,26,26,0.5)]">
        <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
          <Mark className="h-6 w-6 text-ink" />
          <span className="text-sm font-semibold">Sample Barbershop</span>
          <span className="ml-auto rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
            AI assistant
          </span>
        </div>
        <ol
          aria-label="Sample conversation: a customer asks for a time and the assistant books it"
          className="flex flex-col gap-2.5 p-5 sm:p-6"
        >
          {STEPS.map((s, i) => {
            const on = i < shown ? "" : undefined;
            if (s.kind === "call") {
              return (
                <li
                  key={i}
                  data-on={on}
                  className="chat-msg self-center rounded-full border border-line bg-paper px-3.5 py-1 text-xs text-muted"
                >
                  <span aria-hidden className="mr-1.5 text-confirm">
                    ✓
                  </span>
                  {s.text}
                </li>
              );
            }
            return (
              <li
                key={i}
                lang="vi"
                data-on={on}
                className={`chat-msg max-w-[82%] rounded-2xl px-4 py-2.5 ${
                  s.kind === "customer"
                    ? "self-start bg-paper"
                    : "self-end bg-highlight text-highlight-ink"
                }`}
              >
                {s.text}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
