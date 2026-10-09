import { Be_Vietnam_Pro } from "next/font/google";
import localFont from "next/font/local";

// Display and headlines: Libron (SIL OFL, see app/fonts/NOTICE.txt). Full
// Vietnamese coverage, checked glyph by glyph. Text and UI: Be Vietnam Pro, a
// static font, so only the two weights the type system uses are loaded.
export const libron = localFont({
  src: [
    { path: "./fonts/Libron-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Libron-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/Libron-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-libron",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600"],
  display: "swap",
});
