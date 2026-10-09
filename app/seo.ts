import type { Metadata } from "next";

// Canonical origin. pleasebookme.app is the registered domain; the apex (no www)
// is assumed to be the canonical host. Change it here if that is not the case.
export const SITE_URL = "https://pleasebookme.app";
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
