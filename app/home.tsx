import AssistantDemo from "./assistant-demo";
import BookingDemo from "./booking-demo";
import ChatDemo from "./chat-demo";
import Field from "./field";
import { getDict, type Locale } from "./i18n";
import { DashboardMock, MenuMock, PhoneMock } from "./mockups";
import Reveal from "./reveal";
import { SITE_NAME, SITE_URL } from "./seo";
import { CONTACT_EMAIL, CONTACT_HREF } from "./site";
import { SiteFooter, SiteHeader } from "./site-chrome";

// The home page for both languages. All copy lives in app/i18n (en.ts, vi.ts);
// this file is layout only, so the two versions cannot drift apart in structure.

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

// Structured data for search engines. Deliberately small: who we are, the site,
// and how to reach us. No ratings, reviews, prices or app listing, because there
// are none to claim yet.
function structuredData(locale: Locale) {
  const d = getDict(locale);
  const url = `${SITE_URL}${locale === "en" ? "/" : "/vi"}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        description: d.meta.homeDescription,
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
        "@id": `${url}#website`,
        name: SITE_NAME,
        url,
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}

export default function Home({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const t = d.home;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData(locale)).replace(/</g, "\\u003c"),
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
        <SiteHeader locale={locale} page="home" />

        <section className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 pb-24 pt-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-16">
          <div>
            <p
              lang="vi"
              className="settle inline-block rounded-full border border-line px-3.5 py-1 text-sm text-muted"
            >
              {t.hero.eyebrow}
            </p>
            <h1
              className="display settle mt-5 text-5xl sm:text-7xl"
              style={{ animationDelay: "80ms" }}
            >
              {t.hero.h1Lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="booked">{t.hero.h1Key}</span>
            </h1>
            <p
              className="settle mt-6 max-w-[34rem] text-lg leading-relaxed text-muted"
              style={{ animationDelay: "160ms" }}
            >
              {t.hero.body}
            </p>
            <div
              className="settle mt-8 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "240ms" }}
            >
              <CtaLink>{t.hero.cta}</CtaLink>
              <span className="text-sm text-muted">{t.hero.demoNote}</span>
            </div>
          </div>
          <div className="settle lg:-mr-8" style={{ animationDelay: "320ms" }}>
            <BookingDemo t={d.demo} />
          </div>
        </section>
      </div>

      <main className="flex-1">
        <section id="problem" className="scroll-mt-4 border-y border-line bg-surface">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h2 className="display text-4xl sm:text-5xl">{t.problem.h2}</h2>
              <p className="mt-5 max-w-[32rem] text-lg leading-relaxed text-muted">
                {t.problem.body}
              </p>
            </Reveal>
            <ChatDemo t={d.chat} />
          </div>
        </section>

        <section id="assistant" className="scroll-mt-4">
          <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-semibold text-accent">{t.assistant.eyebrow}</p>
                <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                  {t.assistant.pill}
                </span>
              </div>
              <h2 className="display mt-3 max-w-xl text-4xl sm:text-5xl">
                {t.assistant.h2}
              </h2>
              <p className="mt-5 max-w-[32rem] text-lg leading-relaxed text-muted">
                {t.assistant.body}
              </p>
              <ul className="mt-8 grid max-w-[32rem] gap-4">
                {t.assistant.points.map((p) => (
                  <li key={p.title} className="border-t border-line pt-4">
                    <span className="font-semibold">{p.title}</span>{" "}
                    <span className="text-muted">{p.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <AssistantDemo t={d.assistantDemo} />
              <p className="mt-5 text-sm text-muted">{t.assistant.caption}</p>
            </Reveal>
          </div>
        </section>

        <section id="whole" className="scroll-mt-4 border-y border-line bg-surface">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
            <Reveal>
              <h2 className="display max-w-3xl text-4xl sm:text-5xl">{t.whole.h2}</h2>
              <p className="mt-5 max-w-[40rem] text-lg leading-relaxed text-muted">
                {t.whole.body}
              </p>
            </Reveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
              {t.whole.promises.map((p, i) => (
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

        <section id="in-use" className="relative scroll-mt-4 overflow-hidden">
          <Field lines={5} />
          <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="text-sm font-semibold text-accent">{t.inUse.eyebrow}</p>
              <h2 className="display mt-3 max-w-xl text-4xl sm:text-5xl">{t.inUse.h2}</h2>
              <p className="mt-5 max-w-[32rem] text-lg leading-relaxed text-muted">
                {t.inUse.body}
              </p>
              <ul className="mt-8 grid max-w-[32rem] gap-4">
                {t.inUse.points.map((p) => (
                  <li key={p.title} className="border-t border-line pt-4">
                    <span className="font-semibold">{p.title}</span>{" "}
                    <span className="text-muted">{p.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <PhoneMock t={d.mocks} />
              <p className="mt-6 text-center text-sm text-muted">{t.inUse.caption}</p>
            </Reveal>
          </div>
        </section>

        <section id="dashboard" className="scroll-mt-4 border-y border-line bg-surface">
          <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
            <Reveal>
              <p className="text-sm font-semibold text-accent">{t.dashboard.eyebrow}</p>
              <h2 className="display mt-3 max-w-3xl text-4xl sm:text-5xl">
                {t.dashboard.h2}
              </h2>
              <p className="mt-5 max-w-[40rem] text-lg leading-relaxed text-muted">
                {t.dashboard.body}
              </p>
            </Reveal>
            <Reveal delay={120} className="mt-12">
              <DashboardMock t={d.mocks} />
              <p className="mt-5 text-sm text-muted">{t.dashboard.caption}</p>
            </Reveal>
          </div>
        </section>

        <section id="menu" className="scroll-mt-4">
          <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-semibold text-accent">{t.menu.eyebrow}</p>
                <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                  {t.menu.pill}
                </span>
              </div>
              <h2 className="display mt-3 max-w-3xl text-4xl sm:text-5xl">{t.menu.h2}</h2>
              <p className="mt-5 max-w-[40rem] text-lg leading-relaxed text-muted">
                {t.menu.body}
              </p>
            </Reveal>
            <Reveal delay={120} className="mt-14">
              <MenuMock t={d.mocks} />
              <p className="mt-6 text-sm text-muted">{t.menu.caption}</p>
            </Reveal>
          </div>
        </section>

        <section id="how" className="scroll-mt-4 border-y border-line bg-surface">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
            <Reveal>
              <h2 className="display max-w-2xl text-4xl sm:text-5xl">{t.steps.h2}</h2>
            </Reveal>
            <ol className="mt-12 grid gap-10 md:grid-cols-3">
              {t.steps.items.map((s, i) => (
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

        <section
          id="for-shops"
          className="mx-auto w-full max-w-6xl scroll-mt-4 px-5 py-20 sm:px-8"
        >
          <Reveal className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="display text-3xl">{t.shops.barber.title}</h2>
              <p className="mt-3 max-w-[30rem] leading-relaxed text-muted">
                {t.shops.barber.body}
              </p>
            </div>
            <div>
              <h2 className="display text-3xl">{t.shops.pmu.title}</h2>
              <p className="mt-3 max-w-[30rem] leading-relaxed text-muted">
                {t.shops.pmu.body}
              </p>
            </div>
          </Reveal>
        </section>

        <section id="story" className="scroll-mt-4 border-y border-line bg-surface">
          <Reveal className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
            <h2 className="display max-w-3xl text-4xl sm:text-5xl">{t.story.h2}</h2>
            <div className="mt-6 grid max-w-[44rem] gap-5 text-lg leading-relaxed text-muted">
              <p>{t.story.p1}</p>
              <p>{t.story.p2}</p>
            </div>
          </Reveal>
        </section>

        <section id="questions" className="scroll-mt-4">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <h2 className="display text-4xl sm:text-5xl">{t.questions.h2}</h2>
              <p className="mt-5 max-w-[24rem] leading-relaxed text-muted">
                {t.questions.sub}
              </p>
            </Reveal>
            <Reveal delay={120} className="faq border-t border-line">
              {t.questions.items.map((item) => (
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
            <h2 className="display max-w-3xl text-4xl sm:text-6xl">{t.contact.h2}</h2>
            <p className="mt-5 max-w-[32rem] text-lg leading-relaxed opacity-80">
              {t.contact.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <CtaLink onBrand>{t.contact.cta}</CtaLink>
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

      <SiteFooter locale={locale} />
    </>
  );
}
