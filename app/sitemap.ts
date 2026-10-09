import type { MetadataRoute } from "next";
import { pagePath, type PageKey } from "./i18n";
import { SITE_URL } from "./seo";
import { LEGAL_UPDATED_ISO } from "./site";

// Served at /sitemap.xml. Dates are fixed, not "now", so the file only changes
// when a page really does. Update them when a page's content changes.
// Each URL lists its twin in the other language (hreflang) so search engines
// pair the English and Vietnamese pages.
const HOME_UPDATED = "2026-10-09";

const PAGES: { page: PageKey; lastModified: string; changeFrequency: "weekly" | "yearly"; priority: number }[] = [
  { page: "home", lastModified: HOME_UPDATED, changeFrequency: "weekly", priority: 1 },
  { page: "privacy", lastModified: LEGAL_UPDATED_ISO, changeFrequency: "yearly", priority: 0.3 },
  { page: "terms", lastModified: LEGAL_UPDATED_ISO, changeFrequency: "yearly", priority: 0.3 },
];

const abs = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ page, ...rest }) =>
    (["en", "vi"] as const).map((locale) => ({
      url: abs(pagePath(locale, page)),
      ...rest,
      alternates: {
        languages: {
          en: abs(pagePath("en", page)),
          vi: abs(pagePath("vi", page)),
          "x-default": abs(pagePath("en", page)),
        },
      },
    })),
  );
}
