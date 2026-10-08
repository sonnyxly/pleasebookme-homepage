"use client";

import { useState } from "react";

const SERVICES = [
  { id: "cut", name: "Haircut", minutes: 30 },
  { id: "cut-beard", name: "Haircut and beard", minutes: 45 },
  { id: "shave", name: "Shave", minutes: 20 },
] as const;

const DAYS = ["Today", "Tomorrow", "In 2 days"] as const;

const TIMES = [
  "09:00", "09:30", "10:30", "11:00",
  "13:30", "14:00", "15:30", "16:00",
  "17:00", "17:30", "18:30", "19:00",
];

// Slots already taken in this demo, per day.
const TAKEN: Record<string, string[]> = {
  Today: ["09:00", "09:30", "10:30", "13:30", "14:00"],
  Tomorrow: ["10:30", "15:30", "17:00"],
  "In 2 days": ["09:30", "11:00", "16:00", "18:30"],
};

export default function BookingDemo() {
  const [service, setService] = useState<(typeof SERVICES)[number]["id"]>("cut");
  const [day, setDay] = useState<string>("Tomorrow");
  const [time, setTime] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const chosen = SERVICES.find((s) => s.id === service)!;

  function pickDay(d: string) {
    setDay(d);
    setTime(null);
  }

  function reset() {
    setTime(null);
    setDone(false);
  }

  const chip =
    "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors";
  const chipOff = "border-line text-ink hover:border-ink";
  const chipOn = "border-accent bg-accent text-accent-ink";

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-[0_24px_60px_-30px_rgba(16,28,46,0.45)] sm:p-7">
      <div className="mb-6 flex items-baseline justify-between gap-3">
        <p className="text-lg font-semibold">Book a visit</p>
        <p className="text-sm text-muted">Sample barbershop, live demo</p>
      </div>

      {done ? (
        <div className="settle py-6" role="status">
          <p className="text-sm text-muted">Booked</p>
          <p className="display mt-1 text-4xl font-semibold">
            {day}, {time}
          </p>
          <p className="mt-2 text-muted">
            {chosen.name}, {chosen.minutes} min. The slot is now held for this
            customer and gone from everyone else&apos;s list.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-lg border border-line px-4 py-2.5 text-sm font-medium hover:border-ink"
          >
            Book another
          </button>
        </div>
      ) : (
        <>
          <fieldset className="mb-5">
            <legend className="mb-2 text-sm font-medium">Service</legend>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={service === s.id}
                  onClick={() => setService(s.id)}
                  className={`${chip} ${service === s.id ? chipOn : chipOff}`}
                >
                  {s.name}
                  <span className="ml-1.5 opacity-70">{s.minutes} min</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mb-5">
            <legend className="mb-2 text-sm font-medium">Day</legend>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={day === d}
                  onClick={() => pickDay(d)}
                  className={`${chip} ${day === d ? chipOn : chipOff}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mb-6">
            <legend className="mb-2 text-sm font-medium">Time</legend>
            <div className="grid grid-cols-4 gap-2">
              {TIMES.map((t) => {
                const taken = TAKEN[day].includes(t);
                const on = time === t;
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={taken}
                    aria-pressed={on}
                    aria-label={taken ? `${t}, taken` : t}
                    onClick={() => setTime(t)}
                    className={`rounded-lg border py-2 text-sm font-medium tabular-nums transition-colors ${
                      taken
                        ? "cursor-not-allowed border-transparent text-muted line-through decoration-signal decoration-2"
                        : on
                          ? chipOn
                          : chipOff
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <button
            type="button"
            disabled={!time}
            onClick={() => setDone(true)}
            className="w-full rounded-lg bg-ink px-4 py-3 font-semibold text-paper transition-opacity enabled:hover:opacity-90 disabled:opacity-35"
          >
            {time ? `Confirm ${day}, ${time}` : "Choose a time"}
          </button>
        </>
      )}
    </div>
  );
}
