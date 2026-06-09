import s from "./skin.module.css";

/**
 * Edge package — grain / scanline / vignette. Drop inside a
 * `position: relative; overflow: hidden` section (e.g. a hero) so the layers
 * clip to it. Matches the locked reference exactly. Purely decorative.
 */
export default function EdgeFX() {
  return (
    <>
      <div className={s.grain} aria-hidden="true" />
      <div className={s.scan} aria-hidden="true" />
      <div className={s.vignette} aria-hidden="true" />
    </>
  );
}
