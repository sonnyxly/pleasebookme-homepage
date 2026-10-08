import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "pleasebookme: booking for barbershops and PMU studios",
  description:
    "Booking for barbershops, PMU studios and small shops in Vietnam. Customers pick a time or just ask. The slot holds, and you see your day.",
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
