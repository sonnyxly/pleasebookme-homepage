import type { Metadata } from "next";
import { RootShell } from "../root-shell";
import { baseMetadata, baseViewport } from "../seo";

export const metadata: Metadata = baseMetadata("vi");
export const viewport = baseViewport;

export default function VietnameseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootShell lang="vi">{children}</RootShell>;
}
