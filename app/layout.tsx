import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_NAME, SITE_URL } from "./seo";

// Display and headlines: Libron (SIL OFL, see app/fonts/NOTICE.txt). Full
// Vietnamese coverage, checked glyph by glyph. Text and UI: Be Vietnam Pro, a
// static font, so only the two weights the type system uses are loaded.
const libron = localFont({
  src: [
    { path: "./fonts/Libron-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Libron-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/Libron-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-libron",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: { default: HOME_TITLE, template: `%s | ${SITE_NAME}` },
  description: HOME_DESCRIPTION,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f7" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${libron.variable} ${beVietnam.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
