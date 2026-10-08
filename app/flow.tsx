// Water flow: stacked wave lines that drift left at slightly different speeds.
// Each path is three wavelengths long and moves exactly one wavelength, so the
// loop is seamless. Motion is CSS only (see .flow in globals.css).
const WAVELENGTH = 600;
const SEGMENTS = 6; // half-wavelengths per path: 3 wavelengths

function wave(y: number, amplitude: number) {
  let d = `M0 ${y} Q${WAVELENGTH / 4} ${y - amplitude * 2} ${WAVELENGTH / 2} ${y}`;
  for (let k = 2; k <= SEGMENTS; k++) {
    d += ` T${(WAVELENGTH / 2) * k} ${y}`;
  }
  return d;
}

export default function Flow({
  lines = 8,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <svg
      className={`flow ${className}`}
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {Array.from({ length: lines }, (_, i) => {
        const y = 40 + (i * 320) / Math.max(lines - 1, 1);
        const amplitude = 12 + ((i * 5) % 4) * 5;
        return (
          <path
            key={i}
            d={wave(y, amplitude)}
            strokeWidth={1.5}
            strokeOpacity={0.3 + ((i * 3) % 5) * 0.12}
            style={{
              animationDuration: `${28 + ((i * 7) % 17)}s`,
              animationDelay: `-${(i * 5) % 23}s`,
            }}
          />
        );
      })}
    </svg>
  );
}
