import type { Metadata } from "next";
import { RootShell } from "../root-shell";
import { baseMetadata, baseViewport } from "../seo";

export const metadata: Metadata = baseMetadata("en");
export const viewport = baseViewport;

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootShell lang="en">{children}</RootShell>;
}
