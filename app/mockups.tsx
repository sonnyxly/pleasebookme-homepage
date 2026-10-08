import Mark from "./mark";

// Illustrations of the product with sample data, drawn in code so they follow
// the palette, fonts and light/dark themes. They show what the product is meant
// to do, not a screenshot: the dashboard is still being built, so every use of
// these carries a "sample data" caption. Sample bookings match the live demo's
// taken slots for "Today".

const START = 9; // timeline starts at 09:00
const HOUR = 64; // px per hour
const HOURS = [9, 10, 11, 12, 13, 14, 15];

type Booking = { t: string; m: number; name: string; svc: string };

const BOOKINGS: Booking[] = [
  { t: "09:00", m: 30, name: "Minh", svc: "Haircut" },
  { t: "09:30", m: 30, name: "Hùng", svc: "Haircut" },
  { t: "10:30", m: 45, name: "Long", svc: "Haircut and beard" },
  { t: "13:30", m: 30, name: "Nam", svc: "Haircut" },
  { t: "14:00", m: 20, name: "Quân", svc: "Shave" },
];

const ARRIVING: Booking = { t: "11:30", m: 20, name: "Việt", svc: "Shave" };

function offset(t: string) {
  const [h, m] = t.split(":").map(Number);
  return (h - START + m / 60) * HOUR;
}

function Block({ b, fresh = false }: { b: Booking; fresh?: boolean }) {
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
      <span className="truncate opacity-80">{b.svc}</span>
      {fresh && (
        <span className="rounded bg-titanium px-1.5 py-1 text-[0.625rem] font-semibold text-soft-black">
          New
        </span>
      )}
      <span className="ml-auto tabular-nums opacity-75">{b.t}</span>
    </div>
  );
}

export function DashboardMock({ className = "" }: { className?: string }) {
  const height = (HOURS.length - 1) * HOUR;
  return (
    <div
      role="img"
      aria-label="Sample dashboard: a day schedule with five bookings of different lengths, and a sixth booking arriving."
      className={`overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_30px_70px_-35px_rgba(26,26,26,0.5)] ${className}`}
    >
      <div aria-hidden>
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-3 text-sm font-semibold">Sample Barbershop</span>
          <span className="ml-auto text-sm text-muted">Today</span>
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
                <Block key={b.t} b={b} />
              ))}
              <Block b={ARRIVING} fresh />
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
            <p className="text-sm text-muted">Bookings today</p>
            <p className="display mt-1 grid text-6xl">
              <span className="count-before col-start-1 row-start-1">5</span>
              <span className="count-after col-start-1 row-start-1">6</span>
            </p>
            <p className="mt-7 text-sm font-semibold">Next up</p>
            <ul className="mt-3 grid gap-2.5 text-sm">
              <li className="arrive flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-brand-ink">
                <span className="font-semibold">Việt</span>
                <span className="opacity-80">Shave</span>
                <span className="ml-auto tabular-nums">11:30</span>
              </li>
              <li className="flex items-center gap-2 rounded-lg border border-line px-3 py-2">
                <span className="font-semibold">Nam</span>
                <span className="text-muted">Haircut</span>
                <span className="ml-auto tabular-nums">13:30</span>
              </li>
              <li className="flex items-center gap-2 rounded-lg border border-line px-3 py-2">
                <span className="font-semibold">Quân</span>
                <span className="text-muted">Shave</span>
                <span className="ml-auto tabular-nums">14:00</span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}

const SERVICES = ["Haircut", "Haircut and beard", "Shave"];
const TIMES = [
  "09:00", "09:30", "10:30", "11:00",
  "13:30", "14:00", "15:30", "16:00",
  "17:00", "17:30", "18:30", "19:00",
];
const TAKEN = ["10:30", "15:30", "17:00"];

export function PhoneMock({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Sample phone screen: a barbershop's own website with the pleasebookme booking widget open, taken times crossed out."
      className={`float relative mx-auto w-[17.5rem] overflow-hidden rounded-[2.6rem] border-[7px] border-ink/90 bg-paper shadow-[0_40px_80px_-40px_rgba(26,26,26,0.6)] ${className}`}
    >
      <div aria-hidden className="relative flex h-[34rem] flex-col">
        <span className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink/90" />

        <div className="bg-soft-black px-5 pb-16 pt-10 text-titanium">
          <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em]">
            Sample Barbershop
          </p>
          <p className="display mt-5 text-3xl">Haircuts and shaves.</p>
          <div className="mt-5 flex gap-4 text-xs opacity-70">
            <span>Services</span>
            <span>Gallery</span>
            <span>Contact</span>
          </div>
        </div>

        <div className="flex-1 bg-surface" />

        <div className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-line bg-paper p-4 shadow-[0_-18px_40px_-22px_rgba(26,26,26,0.5)]">
          <div className="flex items-center gap-2">
            <Mark className="h-5 w-5 text-ink" />
            <span className="text-sm font-semibold">Book a visit</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {SERVICES.map((s, i) => (
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
            {["Today", "Tomorrow", "In 2 days"].map((d, i) => (
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
            {TIMES.map((t) => {
              const taken = TAKEN.includes(t);
              const on = t === "16:00";
              return (
                <span
                  key={t}
                  className={`rounded-md border py-1.5 text-center text-[0.6875rem] font-medium tabular-nums ${
                    taken
                      ? "border-transparent text-muted line-through decoration-signal decoration-2"
                      : on
                        ? "border-accent bg-accent text-accent-ink"
                        : "border-line"
                  }`}
                >
                  {t}
                </span>
              );
            })}
          </div>

          <span className="mt-3 block rounded-lg bg-ink py-2.5 text-center text-xs font-semibold text-paper">
            Confirm Tomorrow, 16:00
          </span>
        </div>
      </div>
    </div>
  );
}

const MENU = [
  { vi: "Cắt tóc", en: "Haircut", board: "80k", price: "80,000₫", len: "30 min" },
  { vi: "Cắt + cạo râu", en: "Haircut and beard", board: "110k", price: "110,000₫", len: "45 min" },
  { vi: "Cạo mặt", en: "Shave", board: "40k", price: "40,000₫", len: null },
];

// A menu board photo on the left, and the draft list of services it becomes on
// the right. The last row has no length on purpose: a menu names services and
// prices, so the owner sets how long each one takes and checks every line.
export function MenuMock({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Sample: a photo of a printed menu on the left becomes a draft list of services on the right. The owner checks each line and sets any missing length."
      className={`grid items-center gap-8 md:grid-cols-[1fr_auto_1.15fr] ${className}`}
    >
      <div aria-hidden className="relative mx-auto w-full max-w-[19rem] px-3 py-3">
        <span className="absolute left-0 top-0 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-ink" />
        <span className="absolute right-0 top-0 h-6 w-6 rounded-tr-lg border-r-2 border-t-2 border-ink" />
        <span className="absolute bottom-0 left-0 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-ink" />
        <span className="absolute bottom-0 right-0 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-ink" />
        <div className="relative -rotate-2 overflow-hidden rounded-lg bg-soft-black p-6 text-titanium ring-1 ring-line shadow-[0_24px_50px_-28px_rgba(26,26,26,0.7)]">
          <p lang="vi" className="display text-2xl">
            Bảng giá
          </p>
          <ul lang="vi" className="mt-5 grid gap-3.5">
            {MENU.map((m) => (
              <li key={m.vi} className="flex items-baseline gap-2">
                <span>{m.vi}</span>
                <span className="flex-1 border-b border-dotted border-titanium/40" />
                <span className="tabular-nums">{m.board}</span>
              </li>
            ))}
          </ul>
          <span className="scan" />
        </div>
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
        className="overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_30px_70px_-40px_rgba(26,26,26,0.5)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
          <span className="text-sm font-semibold">Your services</span>
          <span className="ml-auto rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
            Draft
          </span>
        </div>
        <ul className="grid gap-2.5 p-4">
          {MENU.map((m, i) => (
            <li
              key={m.vi}
              className="row-in flex items-center gap-3 rounded-lg border border-line px-3.5 py-3 text-sm"
              style={{ ["--i" as string]: i }}
            >
              <span className="min-w-0">
                <span lang="vi" className="font-semibold">
                  {m.vi}
                </span>
                <span className="block text-xs text-muted">{m.en}</span>
              </span>
              <span className="ml-auto tabular-nums">{m.price}</span>
              <span
                className={`rounded-md px-2 py-1 text-xs tabular-nums ${
                  m.len
                    ? "bg-highlight text-highlight-ink"
                    : "border border-dashed border-ink text-ink"
                }`}
              >
                {m.len ?? "Set length"}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 border-t border-line px-5 py-3.5 text-xs text-muted">
          <span>3 services read. Check each line before it goes live.</span>
          <span className="ml-auto whitespace-nowrap rounded-md bg-ink px-3 py-1.5 font-semibold text-paper opacity-40">
            Publish
          </span>
        </div>
      </div>
    </div>
  );
}
