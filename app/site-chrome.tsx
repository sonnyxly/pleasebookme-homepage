import Link from "next/link";
import { getDict, otherLocale, type Locale, type PageKey } from "./i18n";
import Mark from "./mark";
import { CONTACT_EMAIL, CONTACT_HREF } from "./site";

// `page` is the page being shown, so the language switch lands on its twin.
export function SiteHeader({
  locale,
  page = "home",
}: {
  locale: Locale;
  page?: PageKey;
}) {
  const d = getDict(locale);
  const t = d.chrome;
  const other = otherLocale(locale);
  const switchHref = getDict(other).paths[page];

  return (
    <header
      id="top"
      className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-5 sm:px-8"
    >
      <Link
        href={d.paths.home}
        className="flex items-center gap-2.5 sm:gap-3"
        aria-label={t.homeAria}
      >
        <Mark className="h-8 w-8 text-ink sm:h-9 sm:w-9" />
        <span className="wordmark text-[0.8125rem] sm:text-xl">pleasebookme</span>
      </Link>
      <nav
        aria-label={t.navLabel}
        className="hidden items-center gap-7 text-sm text-muted lg:flex"
      >
        {t.nav.map((n) => (
          <Link key={n.id} href={`${d.paths.home}#${n.id}`} className="hover:text-ink">
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href={switchHref}
          hrefLang={t.switchTo.lang}
          lang={t.switchTo.lang}
          aria-label={t.switchTo.aria}
          className="rounded-lg px-2 py-2 text-sm font-medium text-muted hover:text-ink"
        >
          <span className="sm:hidden">{t.switchTo.short}</span>
          <span className="hidden sm:inline">{t.switchTo.label}</span>
        </Link>
        <a
          href={CONTACT_HREF}
          className="whitespace-nowrap rounded-lg border border-line px-3 py-2 text-sm font-medium hover:border-ink sm:px-4"
        >
          {t.cta}
        </a>
      </div>
    </header>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const f = d.chrome.footer;
  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-5 py-8 text-sm text-muted sm:px-8">
      <span className="flex items-center gap-3">
        <Mark className="h-6 w-6 text-ink" />
        {f.made}
      </span>
      <nav aria-label={f.nav} className="flex flex-wrap gap-x-6 gap-y-2">
        <Link href={d.paths.privacy} className="hover:text-ink">
          {f.privacy}
        </Link>
        <Link href={d.paths.terms} className="hover:text-ink">
          {f.terms}
        </Link>
        <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-ink">
          {CONTACT_EMAIL}
        </a>
      </nav>
    </footer>
  );
}
