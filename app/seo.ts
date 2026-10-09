import type { Metadata } from "next";

// Canonical origin. The Vercel project redirects the apex (pleasebookme.app) to
// www with a 308, so www is the host that serves pages. Canonical URLs, the
// sitemap and structured data must name the host that answers 200, never one
// that redirects. If the primary domain is switched to the apex in Vercel,
// change this to match.
export const SITE_URL = "https://www.pleasebookme.app";
export const SITE_NAME = "pleasebookme";

export const HOME_TITLE = "pleasebookme: booking for barbershops and PMU studios";
export const HOME_DESCRIPTION =
  "Booking for barbershops, PMU studios and small shops in Vietnam. Customers pick a time or just ask. The slot holds, and you see your day.";

// Per-page metadata. A page that sets `openGraph` replaces the layout's whole
// object, so each page spells out its own title, URL and card type here.
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const full = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
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
