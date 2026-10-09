import { getDict, type Locale, type PageKey } from "./i18n";
import { SiteFooter, SiteHeader } from "./site-chrome";

export default function LegalShell({
  locale,
  page,
  title,
  intro,
  children,
}: {
  locale: Locale;
  page: PageKey;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  const legal = getDict(locale).legal;
  return (
    <>
      <SiteHeader locale={locale} page={page} />
      <main className="flex-1">
        <article className="legal mx-auto w-full max-w-3xl px-5 pb-20 pt-10 sm:px-8">
          <p className="text-sm text-muted">
            {legal.updatedLabel} {legal.updated}
          </p>
          <h1 className="mt-3">{title}</h1>
          <p className="mt-5 text-lg text-muted">{intro}</p>
          {children}
        </article>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
