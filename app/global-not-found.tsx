import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Mark from "./mark";
import { beVietnam, libron } from "./typefaces";

// Served for any URL that matches no route. There is no single root layout to
// build it from (English and Vietnamese each have their own), so it brings its
// own <html> and shows both languages.
export const metadata: Metadata = {
  title: "404 | pleasebookme",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${libron.variable} ${beVietnam.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col items-center justify-center px-5 text-center">
        <Mark className="h-12 w-12 text-ink" />
        <h1 className="display mt-8 text-5xl">404</h1>
        <p className="mt-4 text-lg text-muted">This page does not exist.</p>
        <p lang="vi" className="mt-1 text-lg text-muted">
          Trang này không tồn tại.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/"
            className="rounded-lg bg-ink px-5 py-3 font-semibold text-paper"
          >
            Home
          </Link>
          <Link
            href="/vi"
            lang="vi"
            className="rounded-lg border border-line px-5 py-3 font-semibold hover:border-ink"
          >
            Trang chủ
          </Link>
        </div>
      </body>
    </html>
  );
}
