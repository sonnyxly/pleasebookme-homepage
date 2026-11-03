import type { Dict } from "./i18n";
import Mark from "./mark";

// Illustrations of the product with sample data, drawn in code so they follow
// the palette, fonts and light/dark themes. They show what the product is meant
// to do, not a screenshot: the dashboard is still being built, so every use of
// these carries a "sample data" caption. Sample bookings match the live demo's
// taken slots for "Today". Customer names are Vietnamese in both languages.

const START = 9; // timeline starts at 09:00
const HOUR = 64; // px per hour
const HOURS = [9, 10, 11, 12, 13, 14, 15];

type ServiceKey = keyof Dict["mocks"]["services"];
type Booking = { t: string; m: number; name: string; svc: ServiceKey };

const BOOKINGS: Booking[] = [
  { t: "09:00", m: 30, name: "Minh", svc: "haircut" },
  { t: "09:30", m: 30, name: "Hùng", svc: "haircut" },
  { t: "10:30", m: 45, name: "Long", svc: "haircutBeard" },
  { t: "13:30", m: 30, name: "Nam", svc: "haircut" },
  { t: "14:00", m: 20, name: "Quân", svc: "shave" },
];

const ARRIVING: Booking = { t: "11:30", m: 20, name: "Việt", svc: "shave" };

function offset(t: string) {
  const [h, m] = t.split(":").map(Number);
  return (h - START + m / 60) * HOUR;
}

function Block({
  b,
  t,
  fresh = false,
}: {
  b: Booking;
  t: Dict["mocks"];
  fresh?: boolean;
}) {
  return (
    <div
      className={`absolute left-14 right-3 flex items-center gap-2 overflow-hidden rounded-md px-2.5 text-xs leading-none ${
        fresh
          ? "arrive bg-brand text-brand-ink"
          : "bg-highlight text-highlight-ink"
      }`}
      style={{ top: offset(b.t) + 2, height: (b.m / 60) * HOUR - 4 }}
    >
      <span className="font-semibold">{b.name}</span>
      <span className="truncate opacity-80">{t.services[b.svc]}</span>
      {fresh && (
        <span className="rounded bg-titanium px-1.5 py-1 text-[0.625rem] font-semibold text-soft-black">
          {t.dashboard.newTag}
        </span>
      )}
      <span className="ml-auto tabular-nums opacity-75">{b.t}</span>
    </div>
  );
}

export function DashboardMock({
  t,
  className = "",
}: {
  t: Dict["mocks"];
  className?: string;
}) {
  const height = (HOURS.length - 1) * HOUR;
  return (
    <div
      role="img"
      aria-label={t.dashboard.aria}
      className={`overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_30px_70px_-35px_rgba(26,26,26,0.5)] ${className}`}
    >
      <div aria-hidden>
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-3 text-sm font-semibold">{t.shopName}</span>
          <span className="ml-auto text-sm text-muted">{t.dashboard.today}</span>
        </div>

        <div className="grid md:grid-cols-[1fr_15rem]">
          <div className="relative p-4" style={{ height: height + 32 }}>
            <div className="relative" style={{ height }}>
              {HOURS.map((h) => (
                <div
                  key={h}
                  className="absolute inset-x-0 flex items-start"
                  style={{ top: (h - START) * HOUR }}
                >
                  <span className="w-11 -translate-y-1/2 text-xs tabular-nums text-muted">
                    {String(h).padStart(2, "0")}:00
                  </span>
                  <span className="mt-0 h-px flex-1 bg-line" />
                </div>
              ))}
              {BOOKINGS.map((b) => (
                <Block key={b.t} b={b} t={t} />
              ))}
              <Block b={ARRIVING} t={t} fresh />
              <div
                className="absolute inset-x-0 flex items-center pl-[2.6rem]"
                style={{ top: offset("11:05") }}
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-signal" />
                <span className="h-px flex-1 bg-signal" />
              </div>
            </div>
          </div>

          <aside className="border-t border-line p-5 md:border-l md:border-t-0">
            <p className="text-sm text-muted">{t.dashboard.bookingsToday}</p>
            <p className="display mt-1 grid text-6xl">
              <span className="count-before col-start-1 row-start-1">5</span>
              <span className="count-after col-start-1 row-start-1">6</span>
            </p>
            <p className="mt-7 text-sm font-semibold">{t.dashboard.nextUp}</p>
            <ul className="mt-3 grid gap-2.5 text-sm">
              <li className="arrive flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-brand-ink">
                <span className="font-semibold">Việt</span>
                <span className="opacity-80">{t.services.shave}</span>
                <span className="ml-auto tabular-nums">11:30</span>
              </li>
              <li className="flex items-center gap-2 rounded-lg border border-line px-3 py-2">
                <span className="font-semibold">Nam</span>
                <span className="text-muted">{t.services.haircut}</span>
                <span className="ml-auto tabular-nums">13:30</span>
              </li>
              <li className="flex items-center gap-2 rounded-lg border border-line px-3 py-2">
                <span className="font-semibold">Quân</span>
                <span className="text-muted">{t.services.shave}</span>
                <span className="ml-auto tabular-nums">14:00</span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}

const TIMES = [
  "09:00", "09:30", "10:30", "11:00",
  "13:30", "14:00", "15:30", "16:00",
  "17:00", "17:30", "18:30", "19:00",
];
const TAKEN = ["10:30", "15:30", "17:00"];

export function PhoneMock({
  t,
  className = "",
}: {
  t: Dict["mocks"];
  className?: string;
}) {
  const p = t.phone;
  const services = [t.services.haircut, t.services.haircutBeard, t.services.shave];
  return (
    <div
      role="img"
      aria-label={p.aria}
      className={`float relative mx-auto w-[17.5rem] overflow-hidden rounded-[2.6rem] border-[7px] border-ink/90 bg-paper shadow-[0_40px_80px_-40px_rgba(26,26,26,0.6)] ${className}`}
    >
      <div aria-hidden className="relative flex h-[34rem] flex-col">
        <span className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink/90" />

        <div className="bg-soft-black px-5 pb-16 pt-10 text-titanium">
          <p
            className={`text-[0.625rem] font-semibold tracking-[0.2em] ${
              p.caps ? "uppercase" : ""
            }`}
          >
            {t.shopName}
          </p>
          <p className="display mt-5 text-3xl">{p.headline}</p>
          <div className="mt-5 flex gap-4 text-xs opacity-70">
            {p.nav.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-surface" />

        <div className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-line bg-paper p-4 shadow-[0_-18px_40px_-22px_rgba(26,26,26,0.5)]">
          <div className="flex items-center gap-2">
            <Mark className="h-5 w-5 text-ink" />
            <span className="text-sm font-semibold">{p.bookVisit}</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {services.map((s, i) => (
              <span
                key={s}
                className={`rounded-md border px-2 py-1 text-[0.6875rem] font-medium ${
                  i === 0
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-line"
                }`}
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-2 flex gap-1.5">
            {p.days.map((d, i) => (
              <span
                key={d}
                className={`rounded-md border px-2 py-1 text-[0.6875rem] font-medium ${
                  i === 1
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-line"
                }`}
              >
                {d}
              </span>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {TIMES.map((slot) => {
              const taken = TAKEN.includes(slot);
              const on = slot === "16:00";
              return (
                <span
                  key={slot}
                  className={`rounded-md border py-1.5 text-center text-[0.6875rem] font-medium tabular-nums ${
                    taken
                      ? "border-transparent text-muted line-through decoration-signal decoration-2"
                      : on
                        ? "border-accent bg-accent text-accent-ink"
                        : "border-line"
                  }`}
                >
                  {slot}
                </span>
              );
            })}
          </div>

          <span className="mt-3 block rounded-lg bg-ink py-2.5 text-center text-xs font-semibold text-paper">
            {p.confirm}
          </span>
        </div>
      </div>
    </div>
  );
}

// The owner's list of questions on the left, and the customer's booking form
// that asks them on the right. A PMU studio, because asking about allergies
// before a brow session is the plainest reason a shop needs its own questions.
// The answers appear one by one, on the same 10s loop the other mockups use.
export function FormMock({
  t,
  className = "",
}: {
  t: Dict["mocks"];
  className?: string;
}) {
  const f = t.form;
  return (
    <div
      role="img"
      aria-label={f.aria}
      className={`grid items-center gap-8 md:grid-cols-[1fr_auto_1fr] ${className}`}
    >
      <div
        aria-hidden
        className="overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_30px_70px_-40px_rgba(26,26,26,0.5)]"
      >
        <p className="border-b border-line px-5 py-3.5 text-sm font-semibold">{f.editorTitle}</p>
        <ul className="grid gap-2.5 p-4">
          {f.items.map((item) => (
            <li
              key={item.q}
              className="flex items-center gap-3 rounded-lg border border-line px-3.5 py-3 text-sm"
            >
              <span className="min-w-0 font-semibold">{item.q}</span>
              <span className="ml-auto whitespace-nowrap rounded-md border border-line px-2 py-1 text-xs text-muted">
                {item.type}
              </span>
            </li>
          ))}
          <li className="rounded-lg border border-dashed border-ink px-3.5 py-3 text-sm">
            + {f.add}
          </li>
        </ul>
      </div>

      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="mx-auto h-8 w-8 rotate-90 text-muted md:rotate-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>

      <div
        aria-hidden
        className="mx-auto w-full max-w-[22rem] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_70px_-40px_rgba(26,26,26,0.5)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
          <Mark className="h-5 w-5 text-ink" />
          <span className="text-sm font-semibold">{f.formTitle}</span>
        </div>
        <div className="grid gap-3 p-5 text-sm">
          <p className="flex flex-wrap justify-between gap-x-3 gap-y-1">
            <span className="font-semibold">{f.service}</span>
            <span className="tabular-nums text-muted">{f.time}</span>
          </p>
          <div className="row-in grid gap-1.5 border-t border-line pt-3" style={{ ["--i" as string]: 0 }}>
            <span className="text-xs text-muted">{f.items[0].q}</span>
            <span className="rounded-md border border-line bg-paper px-3 py-2">{f.answer}</span>
          </div>
          <div className="row-in grid gap-1.5" style={{ ["--i" as string]: 1 }}>
            <span className="text-xs text-muted">{f.items[1].q}</span>
            <span className="flex gap-2">
              {f.choices.map((c, i) => (
                <span
                  key={c}
                  className={`rounded-md px-3 py-1.5 text-xs ${
                    i === 0 ? "bg-highlight text-highlight-ink" : "border border-line text-muted"
                  }`}
                >
                  {c}
                </span>
              ))}
            </span>
          </div>
          <span className="mt-1 block rounded-lg bg-ink py-2.5 text-center text-xs font-semibold text-paper">
            {f.confirm}
          </span>
        </div>
      </div>
    </div>
  );
}
