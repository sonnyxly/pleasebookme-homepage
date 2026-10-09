"use client";

import { useState } from "react";
import { fill, type Dict } from "./i18n";

const TIMES = [
  "09:00", "09:30", "10:30", "11:00",
  "13:30", "14:00", "15:30", "16:00",
  "17:00", "17:30", "18:30", "19:00",
];

// Slots already taken in this demo, per day id.
const TAKEN: Record<string, string[]> = {
  today: ["09:00", "09:30", "10:30", "13:30", "14:00"],
  tomorrow: ["10:30", "15:30", "17:00"],
  in2: ["09:30", "11:00", "16:00", "18:30"],
};

export default function BookingDemo({ t }: { t: Dict["demo"] }) {
  const [serviceId, setServiceId] = useState(t.services[0].id);
  const [dayId, setDayId] = useState("tomorrow");
  const [time, setTime] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const chosen = t.services.find((s) => s.id === serviceId) ?? t.services[0];
  const dayLabel = t.days.find((d) => d.id === dayId)?.label ?? "";

  function pickDay(id: string) {
    setDayId(id);
    setTime(null);
  }

  function reset() {
    setTime(null);
    setDone(false);
  }

  const chip =
    "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors";
  const chipOff = "border-line text-ink hover:border-ink";
  const chipOn = "pop border-accent bg-accent text-accent-ink";

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-[0_24px_60px_-30px_rgba(26,26,26,0.45)] sm:p-7">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="text-lg font-semibold">{t.title}</p>
        <p className="text-sm text-muted">{t.subtitle}</p>
      </div>

      {done ? (
        <div className="settle py-6" role="status">
          <p className="text-sm font-semibold text-confirm">{t.booked}</p>
          <p className="display mt-1 text-4xl">
            {dayLabel}, {time}
          </p>
          <p className="mt-2 text-muted">
            {fill(t.result, { service: chosen.name, minutes: chosen.minutes })}
          </p>
          <p className="mt-2 text-sm text-muted">{t.demoNote}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-lg border border-line px-4 py-2.5 text-sm font-medium hover:border-ink"
          >
            {t.another}
          </button>
        </div>
      ) : (
        <>
          <fieldset className="mb-5">
            <legend className="mb-2 text-sm font-medium">{t.serviceLegend}</legend>
            <div className="flex flex-wrap gap-2">
              {t.services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={serviceId === s.id}
                  onClick={() => setServiceId(s.id)}
                  className={`${chip} ${serviceId === s.id ? chipOn : chipOff}`}
                >
                  {s.name}
                  <span className="ml-1.5 opacity-70">
                    {s.minutes} {t.minUnit}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mb-5">
            <legend className="mb-2 text-sm font-medium">{t.dayLegend}</legend>
            <div className="flex flex-wrap gap-2">
              {t.days.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  aria-pressed={dayId === d.id}
                  onClick={() => pickDay(d.id)}
                  className={`${chip} ${dayId === d.id ? chipOn : chipOff}`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mb-6">
            <legend className="mb-2 text-sm font-medium">{t.timeLegend}</legend>
            <div className="grid grid-cols-4 gap-2">
              {TIMES.map((slot) => {
                const taken = TAKEN[dayId].includes(slot);
                const on = time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={taken}
                    aria-pressed={on}
                    aria-label={taken ? fill(t.takenAria, { time: slot }) : slot}
                    onClick={() => setTime(slot)}
                    className={`rounded-lg border py-2 text-sm font-medium tabular-nums transition-colors ${
                      taken
                        ? "cursor-not-allowed border-transparent text-muted line-through decoration-signal decoration-2"
                        : on
                          ? chipOn
                          : chipOff
                    }`}
                  >
                    {slot}
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
            {time ? fill(t.confirm, { day: dayLabel, time }) : t.choose}
          </button>
        </>
      )}
    </div>
  );
}
