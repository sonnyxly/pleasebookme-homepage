import Flow from "./flow";
import Spotlight from "./spotlight";
import { MarkPattern } from "./mark";

// Background pattern layer: gridlines (small boxes), a few boxes that light up
// like taken slots, and water flow. Place inside a `relative` section.
// `cells` are [column, row, delay in seconds] on the grid.
export default function Field({
  cells = [],
  lines = 8,
  box = 32,
  spotlight = false,
  marks = false,
  className = "",
}: {
  cells?: [number, number, number][];
  lines?: number;
  box?: number;
  spotlight?: boolean;
  marks?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`field ${className}`}
      style={{ ["--box" as string]: `${box}px` }}
      aria-hidden
    >
      <div className="field-grid" />
      {marks && <MarkPattern size={box} />}
      <Flow lines={lines} />
      {cells.map(([c, r, d]) => (
        <span
          key={`${c}-${r}`}
          className="field-cell"
          style={{
            ["--c" as string]: c,
            ["--r" as string]: r,
            ["--d" as string]: `${d}s`,
          }}
        />
      ))}
      {spotlight && <Spotlight />}
    </div>
  );
}
