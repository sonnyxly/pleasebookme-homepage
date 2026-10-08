import BookingDemo from "./booking-demo";

// TODO: replace with the real contact address (or a Zalo / form link) before launch.
const CONTACT_HREF = "mailto:lyhoagson@gmail.com?subject=pleasebookme%20early%20access";

const CHAT: { from: "customer" | "shop"; text: string }[] = [
  { from: "customer", text: "Mai còn lịch không anh?" },
  { from: "shop", text: "Còn em, mấy giờ em?" },
  { from: "customer", text: "Tầm 3 giờ chiều ạ" },
  { from: "shop", text: "3h đầy rồi, 4h được không em?" },
  { from: "customer", text: "Dạ được ạ" },
];

const STEPS = [
  {
    title: "Set up your shop",
    body: "List your services, how long each one takes, and your opening hours.",
  },
  {
    title: "Customers pick a time",
    body: "They choose a service and a free slot. Taken slots are already crossed out.",
  },
  {
    title: "You see your day",
    body: "Each booking appears on your schedule, with no back-and-forth to confirm it.",
  },
];

function CtaLink({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={CONTACT_HREF}
      className="inline-block rounded-lg bg-accent px-6 py-3.5 font-semibold text-accent-ink transition-opacity hover:opacity-90"
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <span className="display text-2xl font-bold">pleasebookme</span>
        <a
          href={CONTACT_HREF}
          className="rounded-lg border border-line px-4 py-2 text-sm font-medium hover:border-ink"
        >
          Get early access
        </a>
      </header>

      <main className="flex-1">
        <section className="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-16">
          <div>
            <h1 className="display text-5xl font-bold sm:text-7xl">
              Let customers book their own slot.
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted">
              pleasebookme is a booking widget for barbershops, PMU studios and
              other small shops in Vietnam. Customers pick a service and a free
              time. You stop answering the same questions in chat.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CtaLink>Get early access</CtaLink>
              <span className="text-sm text-muted">
                Try the demo. It works.
              </span>
            </div>
          </div>
          <div className="lg:-mr-10">
            <BookingDemo />
          </div>
        </section>

        <section className="border-y border-line bg-surface">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="display text-4xl font-bold sm:text-5xl">
                Booking by chat takes five messages.
              </h2>
              <p className="mt-5 max-w-[32rem] text-lg leading-relaxed text-muted">
                One haircut, fixed over Zalo or Messenger. Multiply that by
                every customer, every day, while your hands are busy. With a
                booking widget it is one choice and one tap.
              </p>
            </div>
            <ol
              aria-label="Example chat that books one haircut"
              className="flex flex-col gap-2.5 rounded-2xl bg-paper p-5 sm:p-7"
            >
              {CHAT.map((m, i) => (
                <li
                  key={i}
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    m.from === "customer"
                      ? "self-start bg-surface"
                      : "self-end bg-accent text-accent-ink"
                  }`}
                >
                  {m.text}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <h2 className="display max-w-2xl text-4xl font-bold sm:text-5xl">
            Three steps, and only one is yours.
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="border-t-2 border-ink pt-5">
                <span className="display text-5xl font-bold text-accent">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
          <div className="grid gap-10 border-t border-line pt-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold">Barbershops</h2>
              <p className="mt-3 max-w-[30rem] leading-relaxed text-muted">
                Short appointments, many per day. A full chair shows as full, so
                nobody has to ask twice.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">PMU studios</h2>
              <p className="mt-3 max-w-[30rem] leading-relaxed text-muted">
                Long sessions that need the right amount of time held. Every
                service has its own length, and the calendar respects it.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-ink text-paper">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
            <h2 className="display max-w-3xl text-4xl font-bold sm:text-6xl">
              Want it for your shop?
            </h2>
            <p className="mt-5 max-w-[32rem] text-lg leading-relaxed opacity-75">
              We are working with a small number of shops first. Tell us what
              you do and we will set up your booking page with you.
            </p>
            <div className="mt-8">
              <CtaLink>Get early access</CtaLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-6xl px-5 py-8 text-sm text-muted sm:px-8">
        pleasebookme. Made in Vietnam.
      </footer>
    </>
  );
}
