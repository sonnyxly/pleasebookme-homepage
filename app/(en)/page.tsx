import type { Metadata } from "next";
import Home from "../home";
import { getDict } from "../i18n";
import { pageMetadata } from "../seo";

const d = getDict("en");

export const metadata: Metadata = pageMetadata({
  locale: "en",
  page: "home",
  title: d.meta.homeTitle,
  description: d.meta.homeDescription,
  absoluteTitle: true,
});

export default function Page() {
  return <Home locale="en" />;
}
