import type { Metadata, Viewport } from "next";
import { getDict, otherLocale, pagePath, type Locale, type PageKey } from "./i18n";

// Canonical origin. The Vercel project redirects the apex (pleasebookme.app) to
// www with a 308, so www is the host that serves pages. Canonical URLs, the
// sitemap and structured data must name the host that answers 200, never one
// that redirects. If the primary domain is switched to the apex in Vercel,
// change this to match.
export const SITE_URL = "https://www.pleasebookme.app";
export const SITE_NAME = "pleasebookme";

// Site-wide metadata for a language's root layout.
export function baseMetadata(locale: Locale): Metadata {
  const d = getDict(locale);
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: { default: d.meta.homeTitle, template: `%s | ${SITE_NAME}` },
    description: d.meta.homeDescription,
    robots: { index: true, follow: true },
  };
}

export const baseViewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f7" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

// Per-page metadata. A page that sets `openGraph` replaces the layout's whole
// object, so each page spells out its own title, URL and card type here. Every
// page names its twin in the other language (hreflang), and its own canonical.
export function pageMetadata({
  locale,
  page,
  title,
  description,
  absoluteTitle = false,
}: {
  locale: Locale;
  page: PageKey;
  title: string;
  description: string;
  absoluteTitle?: boolean;
}): Metadata {
  const d = getDict(locale);
  const full = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const path = pagePath(locale, page);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: pagePath("en", page),
        vi: pagePath("vi", page),
        "x-default": pagePath("en", page),
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: d.ogLocale,
      alternateLocale: [getDict(otherLocale(locale)).ogLocale],
      url: path,
      title: full,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
    },
  };
}
