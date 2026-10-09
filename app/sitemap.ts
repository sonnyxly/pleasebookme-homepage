import type { MetadataRoute } from "next";
import { LEGAL_UPDATED_ISO } from "./site";
import { SITE_URL } from "./seo";

// Served at /sitemap.xml. Dates are fixed, not "now", so the file only changes
// when a page really does. Update them when a page's content changes.
const HOME_UPDATED = "2026-10-09";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: HOME_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: LEGAL_UPDATED_ISO,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: LEGAL_UPDATED_ISO,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
