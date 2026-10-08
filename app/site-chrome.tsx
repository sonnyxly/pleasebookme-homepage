import Link from "next/link";
import Mark from "./mark";
import { CONTACT_EMAIL, CONTACT_HREF } from "./site";

const NAV = [
  { href: "/#how", label: "How it works" },
  { href: "/#in-use", label: "On your site" },
  { href: "/#dashboard", label: "Dashboard" },
  { href: "/#questions", label: "Questions" },
];

export function SiteHeader() {
  return (
    <header
      id="top"
      className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8"
    >
      <Link href="/" className="flex items-center gap-2.5 sm:gap-3" aria-label="pleasebookme, home">
        <Mark className="h-8 w-8 text-ink sm:h-9 sm:w-9" />
        <span className="wordmark text-[0.8125rem] sm:text-xl">pleasebookme</span>
      </Link>
      <nav aria-label="Sections" className="hidden items-center gap-7 text-sm text-muted md:flex">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="hover:text-ink">
            {n.label}
          </Link>
        ))}
      </nav>
      <a
        href={CONTACT_HREF}
        className="whitespace-nowrap rounded-lg border border-line px-3 py-2 text-sm font-medium hover:border-ink sm:px-4"
      >
        Get early access
      </a>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-5 py-8 text-sm text-muted sm:px-8">
      <span className="flex items-center gap-3">
        <Mark className="h-6 w-6 text-ink" />
        pleasebookme. Made in Vietnam.
      </span>
      <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
        <Link href="/privacy" className="hover:text-ink">
          Privacy
        </Link>
        <Link href="/terms" className="hover:text-ink">
          Terms
        </Link>
        <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-ink">
          {CONTACT_EMAIL}
        </a>
      </nav>
    </footer>
  );
}
