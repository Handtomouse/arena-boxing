import s from "./skin.module.css";

/**
 * Focal blackletter word — the full home-"Dare" treatment in three layers:
 *   1. faint base outline (focalBase)
 *   2. neon-red DRAW-ON stroke that settles (focalDraw; page-hero motion)
 *   3. a short bright segment that loops the glyph outline forever (focalRun) —
 *      the living highlight that makes the word feel alive.
 *
 * The trace geometry is per-word: `<text>` has no reliable getTotalLength(),
 * so stroke-dasharray must be sized to the glyph-outline length of THIS word.
 * Defaults are tuned for ~4-glyph words like the reference "Dare" (≈1700).
 * Longer words (Begin/Built) need a wider viewBox + bigger `dash`. Slightly
 * over-sizing `dash` guarantees a clean full draw. `runLen` is the length of
 * the looping highlight segment. Verify each word renders fully before shipping.
 *
 * Reduced-motion: skin.module.css forces the draw stroke fully settled and
 * hides the running highlight entirely.
 */
export default function FocalWord({
  word,
  dash = 1700,
  runLen = 55,
  viewBox = "0 0 560 200",
  x = 0,
  y = 160,
  className,
  ariaLabel,
}: {
  word: string;
  dash?: number;
  runLen?: number;
  viewBox?: string;
  x?: number;
  y?: number;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <svg
      className={`${s.focalSvg}${className ? ` ${className}` : ""}`}
      viewBox={viewBox}
      role="img"
      aria-label={ariaLabel ?? word}
    >
      <text className={s.focalBase} x={x} y={y}>
        {word}
      </text>
      <text
        className={s.focalDraw}
        x={x}
        y={y}
        style={{ strokeDasharray: dash, strokeDashoffset: dash }}
      >
        {word}
      </text>
      <text
        className={s.focalRun}
        x={x}
        y={y}
        style={{ strokeDasharray: `${runLen} ${dash - runLen}`, strokeDashoffset: dash }}
      >
        {word}
      </text>
    </svg>
  );
}
