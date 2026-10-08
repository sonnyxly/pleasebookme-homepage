import { SiteFooter, SiteHeader } from "./site-chrome";
import { LEGAL_UPDATED } from "./site";

export default function LegalShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <article className="legal mx-auto w-full max-w-3xl px-5 pb-20 pt-10 sm:px-8">
          <p className="text-sm text-muted">Last updated {LEGAL_UPDATED}</p>
          <h1 className="mt-3">{title}</h1>
          <p className="mt-5 text-lg text-muted">{intro}</p>
          {children}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
