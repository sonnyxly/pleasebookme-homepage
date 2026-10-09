import "./globals.css";
import { beVietnam, libron } from "./typefaces";

// The <html> element for both language versions. Each language has its own root
// layout so that <html lang> is right in the first byte of the page, which
// search engines and screen readers read before anything else.
export function RootShell({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={lang}
      className={`${libron.variable} ${beVietnam.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
