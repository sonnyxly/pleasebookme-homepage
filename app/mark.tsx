import { useId } from "react";

// The pleasebookme mark (A3, small flat version): a tile with a chamfered
// top-left corner, a window, and a folded bottom-right corner. The tile follows
// the text colour, the fold uses the brand red. Full-detail artwork lives in
// public/brand/pleasebookme-mark.svg.
export const TILE =
  "M281.25 18.75 A64 64 0 0 1 326.51 0 L864 0 A36 36 0 0 1 900 36 L900 573.49 A64 64 0 0 1 881.25 618.75 L618.75 881.25 A64 64 0 0 1 573.49 900 L36 900 A36 36 0 0 1 0 864 L0 326.51 A64 64 0 0 1 18.75 281.25 Z";
export const WINDOW =
  "M342 312 H534 A30 30 0 0 1 564 342 V534 A30 30 0 0 1 534 564 H342 A30 30 0 0 1 312 534 V342 A30 30 0 0 1 342 312 Z";

// The mark as a repeating pattern: two marks per tile, diagonal, each sitting
// inside its own grid box. `size` is the grid box size in px.
export function MarkPattern({ size }: { size: number }) {
  const id = useId();
  const tile = size * 2;
  const s = size / 2 / 900;
  const d = `${TILE} ${WINDOW}`;
  return (
    <svg
      className="absolute inset-0 h-full w-full text-titanium opacity-[0.07]"
      aria-hidden
    >
      <defs>
        <pattern id={id} width={tile} height={tile} patternUnits="userSpaceOnUse">
          <path
            d={d}
            fill="currentColor"
            fillRule="evenodd"
            transform={`translate(${size / 4} ${size / 4}) scale(${s})`}
          />
          <path
            d={d}
            fill="currentColor"
            fillRule="evenodd"
            transform={`translate(${size + size / 4} ${size + size / 4}) scale(${s})`}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default function Mark({ className }: { className?: string }) {
  const clip = useId();
  return (
    <svg
      viewBox="0 0 900 900"
      className={className}
      role="img"
      aria-label="pleasebookme"
    >
      <defs>
        <clipPath id={clip}>
          <path d={TILE} />
        </clipPath>
      </defs>
      <path d={`${TILE} ${WINDOW}`} fill="currentColor" fillRule="evenodd" />
      <path
        d="M600 600 L900 600 L600 900 Z"
        fill="var(--mark-fold)"
        clipPath={`url(#${clip})`}
      />
    </svg>
  );
}
