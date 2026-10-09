import { ImageResponse } from "next/og";
import { getDict, type Locale } from "./i18n";
import { TILE, WINDOW } from "./mark";

// Share card for links on Zalo, Facebook, X and search previews (1200x630).
// It uses the renderer's built-in sans, because it cannot read the site's web
// fonts. Replace with a designed PNG (app/opengraph-image.png) when one exists.
export const OG_SIZE = { width: 1200, height: 630 };

export function ogAlt(locale: Locale) {
  return getDict(locale).og.alt;
}

const FOLD =
  "M600 600 H894 A64 64 0 0 1 881.25 618.75 L618.75 881.25 A64 64 0 0 1 600 894 Z";

function wave(y: number, amp: number) {
  return `M0 ${y} Q150 ${y - amp * 2} 300 ${y} T600 ${y} T900 ${y} T1200 ${y}`;
}

export function ogCard(locale: Locale) {
  const og = getDict(locale).og;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          position: "relative",
          background: "#1A1A1A",
          color: "#F7F7F7",
          backgroundImage:
            "linear-gradient(to right, rgba(247,247,247,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,247,247,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          <path d={wave(404, 22)} fill="none" stroke="#C8DFF2" strokeOpacity="0.5" strokeWidth="2" />
          <path d={wave(448, 28)} fill="none" stroke="#C8DFF2" strokeOpacity="0.3" strokeWidth="2" />
          <path d={wave(492, 18)} fill="none" stroke="#C8DFF2" strokeOpacity="0.18" strokeWidth="2" />
        </svg>

        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width="76" height="76" viewBox="0 0 900 900">
            <path d={`${TILE} ${WINDOW}`} fill="#F7F7F7" fillRule="evenodd" />
            <path d={FOLD} fill="#7A1F2E" />
          </svg>
          <div
            style={{
              marginLeft: 24,
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "0.14em",
            }}
          >
            PLEASEBOOKME
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {og.lines.map((line) => (
            <div
              key={line}
              style={{
                fontSize: og.lines.length > 2 ? 84 : 100,
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              {line}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 32,
            fontSize: 30,
            color: "#C8DFF2",
          }}
        >
          <span>{og.tagline}</span>
          <span style={{ flexShrink: 0 }}>pleasebookme.app</span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
