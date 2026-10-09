import { en, type Dict } from "./en";
import { vi } from "./vi";

export type Locale = "en" | "vi";
export type { Dict };

const dictionaries: Record<Locale, Dict> = { en, vi };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

// The same page in the other language, for the language switch and hreflang.
export type PageKey = "home" | "privacy" | "terms";

export function pagePath(locale: Locale, page: PageKey): string {
  return dictionaries[locale].paths[page];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "vi" : "en";
}

// Fill "{name}" placeholders in a dictionary string.
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
}
