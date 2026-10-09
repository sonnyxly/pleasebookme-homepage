import type { Metadata } from "next";
import AssistantDemo from "./assistant-demo";
import BookingDemo from "./booking-demo";
import ChatDemo from "./chat-demo";
import Field from "./field";
import { DashboardMock, MenuMock, PhoneMock } from "./mockups";
import Reveal from "./reveal";
import { SiteFooter, SiteHeader } from "./site-chrome";
import { CONTACT_EMAIL, CONTACT_HREF } from "./site";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_NAME, SITE_URL, pageMetadata } from "./seo";

export const metadata: Metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

// Structured data for search engines. Deliberately small: who we are, the site,
// and how to reach us. No ratings, reviews, prices or app listing, because there
// are none to claim yet.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      description: HOME_DESCRIPTION,
      areaServed: "VN",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CONTACT_EMAIL,
        availableLanguage: ["en", "vi"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

// Copy follows the brand brief: plain, calm, specific, "we" and "you". Two
// customer words stay Vietnamese on purpose: chắc chắn (the slot holds) and
// hoàn chỉnh (the booking arrives whole). No testimonials, no counts, no claims
// about customers: there are none to claim yet.

const STEPS = [
  {
    title: "Set up your shop",
    body: "Add your services, how long each takes and your opening hours, or photograph your menu and check our draft. The first time, we do it with you.",
  },
  {
    title: "Customers pick a time",
    body: "They choose a service and a free slot, or just ask the assistant. Taken slots are already crossed out.",
  },
  {
    title: "You see your day",
    body: "Each booking lands on your schedule. No back-and-forth to confirm it.",
  },
];

const QUESTIONS = [
  {
    q: "Is it ready?",
    a: "Not finished. pleasebookme is in early access: we set up a small number of shops with you and fix what breaks. You will see the real product before you decide anything.",
  },
  {
    q: "What does it cost?",
    a: "Early access is free. If we introduce fees, we will tell you at least 30 days before they apply, with the price, and you can stop without paying.",
  },
  {
    q: "What do I need to start?",
    a: "Your list of services, how long each one takes, and your opening hours. That is the whole setup, and we do it with you the first time.",
  },
  {
    q: "Does the assistant make mistakes?",
    a: "It can, which is why it never guesses. It checks your real availability through our booking system before it offers a time, and a booking only counts once the system confirms it. Everything it books shows up on your schedule.",
  },
  {
    q: "Will it read my menu photo correctly?",
    a: "Often, but not always: handwriting and small print are hard. That is why you check every line, and set how long each service takes, before anything goes live.",
  },
  {
    q: "Who sees my customers' details?",
    a: "You do. We handle them for you, only to run the booking, and we do not sell them. The Privacy Policy has the details.",
  },
];

const PROMISES = [
  {
    word: "Chắc chắn",
    line: "It holds.",
    body: "When a customer books, the slot is held for them and gone from everyone else's list.",
  },
  {
    word: "Hoàn chỉnh",
    line: "It's whole.",
    body: "A booking carries everything it needs in one pass: the services, the length, the time. Nothing is left for you to chase.",
  },
];

function CtaLink({
  children,
  onBrand = false,
}: {
  children: React.ReactNode;
  onBrand?: boolean;
}) {
  return (
    <a
      href={CONTACT_HREF}
      className={`inline-block rounded-lg px-6 py-3.5 font-semibold transition-all hover:-translate-y-0.5 hover:opacity-90 ${
        onBrand ? "bg-titanium text-soft-black" : "bg-ink text-paper"
      }`}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, "\u003c"),
        }}
      />
      <div data-spot className="relative">
        <Field
          spotlight
          lines={9}
          cells={[
            [3, 3, 0],
            [11, 2, 2.5],
            [6, 8, 5],
            [17, 5, 1.5],
            [22, 9, 6.5],
            [2, 11, 3.5],
          ]}
        />
        <SiteHeader />

        <section className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 pb-24 pt-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-16">
          <div>
            <p
              lang="vi"
              className="settle inline-block rounded-full border border-line px-3.5 py-1 text-sm text-muted"
            >
              Đặt lịch, chắc chắn.
            </p>
            <h1
              className="display settle mt-5 text-5xl sm:text-7xl"
              style={{ animationDelay: "80ms" }}
            >
              If it says booked, <em>it&apos;s booked.</em>
            </h1>
            <p
              className="settle mt-6 max-w-[34rem] text-lg leading-relaxed text-muted"
              style={{ animationDelay: "160ms" }}
            >
              pleasebookme is a booking widget for barbershops, PMU studios and
              other small shops in Vietnam. A customer picks a service and a
              free time, or just asks. The slot holds, you see your day, and you stop
              answering the same questions in chat.
            </p>
            <div
              className="settle mt-8 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "240ms" }}
            >
              <CtaLink>Get early access</CtaLink>
              <span className="text-sm text-muted">
                Try the demo. Nothing you tap is sent.
              </span>
            </div>
          </div>
          <div
            className="settle lg:-mr-8"
            style={{ animationDelay: "320ms" }}
          >
            <BookingDemo />
          </div>
        </section>
      </div>

      <main className="flex-1">
        <section id="problem" className="scroll-mt-4 border-y border-line bg-surface">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h2 className="display text-4xl sm:text-5xl">
                Booking by chat takes five messages.
              </h2>
              <p className="mt-5 max-w-[32rem] text-lg leading-relaxed text-muted">
                One haircut, fixed over Zalo or Messenger, one message at a
                time, while your hands are busy. Miss a single reply and the
                customer is gone. With a booking page it is one choice and one
                tap.
              </p>
            </Reveal>
            <ChatDemo />
          </div>
        </section>

                <section id="assistant" className="scroll-mt-4">
          <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-semibold text-accent">Customer assistant</p>
                <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                  In development
                </span>
              </div>
              <h2 className="display mt-3 max-w-xl text-4xl sm:text-5xl">
                Customers can just ask.
              </h2>
              <p className="mt-5 max-w-[32rem] text-lg leading-relaxed text-muted">
                Most customers already book by chatting. The pleasebookme
                assistant takes that chat. It reads the question in Vietnamese,
                checks your real availability, holds the slot and books it, so
                you are not the one typing.
              </p>
              <ul className="mt-8 grid max-w-[32rem] gap-4">
                <li className="border-t border-line pt-4">
                  <span className="font-semibold">It never guesses.</span>{" "}
                  <span className="text-muted">
                    Every time it offers comes from your real schedule, through
                    our booking system.
                  </span>
                </li>
                <li className="border-t border-line pt-4">
                  <span className="font-semibold">It says what it is.</span>{" "}
                  <span className="text-muted">
                    Customers always know they are talking to an assistant.
                  </span>
                </li>
                <li className="border-t border-line pt-4">
                  <span className="font-semibold">You see every booking.</span>{" "}
                  <span className="text-muted">
                    What it books appears on your schedule like any other.
                  </span>
                </li>
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <AssistantDemo />
              <p className="mt-5 text-sm text-muted">
                Sample conversation. The assistant is in development, and this
                is how we are building it to work.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="whole" className="scroll-mt-4 border-y border-line bg-surface">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <h2 className="display max-w-3xl text-4xl sm:text-5xl">
              Whole from the first tap.
            </h2>
            <p className="mt-5 max-w-[40rem] text-lg leading-relaxed text-muted">
              Many booking tools give every service its own form. A customer who
              wants a haircut and a beard trim books twice and hopes the two
              times line up. pleasebookme puts the services and the time in one
              form, so a booking stays whole from the first tap to the chair.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {PROMISES.map((p, i) => (
              <Reveal key={p.word} delay={i * 120} className="bg-paper">
                <div className="p-7 sm:p-9">
                  <p lang="vi" className="text-sm font-semibold text-accent">
                    {p.word}
                  </p>
                  <h3 className="display mt-3 text-3xl">{p.line}</h3>
                  <p className="mt-3 max-w-[26rem] leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          </div>
        </section>

        <section
          id="in-use"
          className="relative scroll-mt-4 overflow-hidden"
        >
          <Field lines={5} />
          <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="text-sm font-semibold text-accent">On your website</p>
              <h2 className="display mt-3 max-w-xl text-4xl sm:text-5xl">
                It sits on the website you already have.
              </h2>
              <p className="mt-5 max-w-[32rem] text-lg leading-relaxed text-muted">
                Customers book without leaving your page. They pick a service
                and a time, and the times that are taken are already crossed
                out.
              </p>
              <ul className="mt-8 grid max-w-[32rem] gap-4">
                <li className="border-t border-line pt-4">
                  <span className="font-semibold">Your services, your lengths.</span>{" "}
                  <span className="text-muted">
                    A haircut, a beard trim and a shave each hold the time they
                    need.
                  </span>
                </li>
                <li className="border-t border-line pt-4">
                  <span className="font-semibold">One form, one pass.</span>{" "}
                  <span className="text-muted">
                    No separate page for each service.
                  </span>
                </li>
                <li className="border-t border-line pt-4">
                  <span className="font-semibold">A small mark in the corner.</span>{" "}
                  <span className="text-muted">
                    So customers know whose booking page they are on.
                  </span>
                </li>
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <PhoneMock />
              <p className="mt-6 text-center text-sm text-muted">
                Sample data. An illustration of the widget, not a screenshot.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="dashboard" className="scroll-mt-4 border-y border-line bg-surface">
          <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
            <Reveal>
              <p className="text-sm font-semibold text-accent">For the owner</p>
              <h2 className="display mt-3 max-w-3xl text-4xl sm:text-5xl">
                Your day, on one screen.
              </h2>
              <p className="mt-5 max-w-[40rem] text-lg leading-relaxed text-muted">
                Every booking lands on your schedule and takes the room its
                service needs: a short block for a haircut, a longer one for a
                beard trim. A taken slot is already gone from your customers&apos;
                list, so you stop confirming in chat.
              </p>
            </Reveal>
            <Reveal delay={120} className="mt-12">
              <DashboardMock />
              <p className="mt-5 text-sm text-muted">
                Sample data. An illustration of the dashboard while we finish
                building it.
              </p>
            </Reveal>
          </div>
        </section>

                <section id="menu" className="scroll-mt-4">
          <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-semibold text-accent">Setting up</p>
                <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                  In development
                </span>
              </div>
              <h2 className="display mt-3 max-w-3xl text-4xl sm:text-5xl">
                Photograph your menu. We draft your services.
              </h2>
              <p className="mt-5 max-w-[40rem] text-lg leading-relaxed text-muted">
                Setting up should not mean typing out a price list. Take a photo
                of the menu you already have, and pleasebookme reads the names
                and prices into a draft list of services. You check every line
                and set how long each one takes. Nothing goes live until you say
                so.
              </p>
            </Reveal>
            <Reveal delay={120} className="mt-14">
              <MenuMock />
              <p className="mt-6 text-sm text-muted">
                Sample menu and prices. Reading menu photos is in development.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="how" className="scroll-mt-4 border-y border-line bg-surface">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
            <Reveal>
              <h2 className="display max-w-2xl text-4xl sm:text-5xl">
                Three steps. Only one is yours.
              </h2>
            </Reveal>
            <ol className="mt-12 grid gap-10 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <Reveal delay={i * 140} className="draw-rule pt-5">
                    <span className="display text-5xl text-accent">{i + 1}</span>
                    <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="for-shops" className="mx-auto w-full max-w-6xl scroll-mt-4 px-5 py-20 sm:px-8">
          <Reveal className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="display text-3xl">Barbershops</h2>
              <p className="mt-3 max-w-[30rem] leading-relaxed text-muted">
                Short appointments, many a day. A full chair shows as full, so
                nobody has to ask twice.
              </p>
            </div>
            <div>
              <h2 className="display text-3xl">PMU studios</h2>
              <p className="mt-3 max-w-[30rem] leading-relaxed text-muted">
                Long sessions that need the right amount of time held. Every
                service has its own length, and the calendar respects it.
              </p>
            </div>
          </Reveal>
        </section>

        <section id="story" className="scroll-mt-4 border-y border-line bg-surface">
          <Reveal className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
            <h2 className="display max-w-3xl text-4xl sm:text-5xl">
              We started with one barbershop&apos;s website.
            </h2>
            <div className="mt-6 grid max-w-[44rem] gap-5 text-lg leading-relaxed text-muted">
              <p>
                In April we built a website for a barbershop in Hanoi, with
                booking added on. Booking was the part that kept breaking. We
                tried stitching Calendly and Google Sheets together, then
                decided to stop patching other people&apos;s tools and build our
                own booking engine.
              </p>
              <p>
                We are two co-founders in Hanoi. One of us builds the product,
                the other looks after design, research and operations. We are
                early, and we would rather say so than pretend.
              </p>
            </div>
          </Reveal>
        </section>

        <section id="questions" className="scroll-mt-4">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <h2 className="display text-4xl sm:text-5xl">Questions we expect.</h2>
              <p className="mt-5 max-w-[24rem] leading-relaxed text-muted">
                Something missing? Write to us and we will answer plainly.
              </p>
            </Reveal>
            <Reveal delay={120} className="faq border-t border-line">
              {QUESTIONS.map((item) => (
                <details key={item.q} className="border-b border-line">
                  <summary className="flex items-center justify-between gap-6 py-5 text-lg font-semibold">
                    {item.q}
                  </summary>
                  <p className="max-w-[36rem] pb-6 leading-relaxed text-muted">
                    {item.a}
                  </p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        <section
          id="contact"
          className="on-brand relative overflow-hidden bg-brand text-brand-ink"
        >
          <Field box={48} lines={6} marks />
          <Reveal className="relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
            <h2 className="display max-w-3xl text-4xl sm:text-6xl">
              Want it for your shop?
            </h2>
            <p className="mt-5 max-w-[32rem] text-lg leading-relaxed opacity-80">
              We are working with a small number of shops first, and we set up
              each one with you. Tell us what you do and which days are busiest.
              You can write in Vietnamese or English.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <CtaLink onBrand>Get early access</CtaLink>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="underline underline-offset-4 opacity-90 hover:opacity-100"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
