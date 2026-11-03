"use client";

import type { ReactNode } from "react";
import type { Dict } from "./i18n";
import Mark from "./mark";
import { usePlayback } from "./use-playback";

// What happens after a customer books: the booking arrives, the confirmation
// email goes out in the shop's own words, and the booking appears in the
// owner's Google Calendar. The email is the owner's template with its blanks
// filled; the filled words are highlighted so the template shows through. The
// time matches the live demo's "Tomorrow" column (16:00 free). Plays once, one
// step at a time, like the chats above.

const HOURS = ["15:00", "16:00", "17:00"];

// "{name}" in a template line becomes the highlighted value from `fill`.
function filled(line: string, fill: Record<string, string>): ReactNode[] {
  return line.split(/(\{[a-z]+\})/).map((part, i) => {
    const key = part.match(/^\{([a-z]+)\}$/)?.[1];
    return key && fill[key] ? (
      <mark key={i} className="rounded bg-highlight px-1 text-highlight-ink">
        {fill[key]}
      </mark>
    ) : (
      part
    );
  });
}

export default function ConfirmDemo({ t }: { t: Dict["confirmDemo"] }) {
  const { ref, shown } = usePlayback(3, 900);
  const on = (i: number) => (i < shown ? "" : undefined);

  return (
    <div ref={ref} className="chat" role="img" aria-label={t.aria}>
      <div aria-hidden className="grid gap-3">
        <p
          data-on={on(0)}
          className="chat-msg justify-self-center rounded-full border border-line bg-paper px-3.5 py-1 text-xs text-muted"
        >
          <span className="mr-1.5 text-confirm">✓</span>
          {t.booked}
        </p>

        <div
          data-on={on(1)}
          className="chat-msg overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_70px_-40px_rgba(26,26,26,0.5)]"
        >
          <div className="flex items-center gap-3 border-b border-line px-5 py-3">
            <Mark className="h-5 w-5 text-ink" />
            <span className="text-xs text-muted">{t.emailLabel}</span>
          </div>
          <div className="grid gap-2 px-5 py-4 text-sm leading-relaxed">
            <p className="font-semibold">{t.subject}</p>
            {t.body.map((line) => (
              <p key={line} className="text-muted">
                {filled(line, t.fill)}
              </p>
            ))}
          </div>
        </div>

        <div
          data-on={on(2)}
          className="chat-msg overflow-hidden rounded-2xl border border-line bg-surface"
        >
          <p className="border-b border-line px-5 py-3 text-xs text-muted">{t.calendarLabel}</p>
          <div className="relative px-5 py-2">
            {HOURS.map((h) => (
              <div key={h} className="flex h-10 items-start gap-3 border-t border-line first:border-t-0">
                <span className="w-10 -translate-y-px pt-1 text-xs tabular-nums text-muted">{h}</span>
              </div>
            ))}
            {/* 16:00 to 16:30: the second hour row, half its height */}
            <span className="absolute left-[4.75rem] right-5 top-[3rem] h-5 rounded-md bg-highlight px-2 text-xs font-semibold leading-5 text-highlight-ink">
              {t.event}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
