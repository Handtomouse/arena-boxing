import s from "./skin.module.css";

/**
 * Focal blackletter word — faint base outline + neon-red DRAW-ON stroke that
 * settles (page-hero motion; no electric chase — that's landing-only).
 *
 * The trace geometry is per-word: `<text>` has no reliable getTotalLength(),
 * so stroke-dasharray must be sized to the glyph-outline length of THIS word.
 * Defaults are tuned for ~4-glyph words like the reference "Dare" (≈1700).
 * Longer words (Begin/Built) need a wider viewBox + bigger `dash`. Slightly
 * over-sizing `dash` guarantees a clean full draw (worst case: a touch of
 * settle time at the end). Verify each word renders fully before shipping.
 *
 * Reduced-motion: skin.module.css forces the stroke fully drawn, no animation.
 */
export default function FocalWord({
  word,
  dash = 1700,
  viewBox = "0 0 560 200",
  x = 0,
  y = 160,
  className,
  ariaLabel,
}: {
  word: string;
  dash?: number;
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
    </svg>
  );
}
