import Link from "next/link";
import s from "./skin.module.css";

/**
 * Monument CTA band — giant Old London OUTLINE ghost word behind a clean
 * Bebas headline + button. The locked conversion treatment. `ghost` is the
 * per-page focal word (Programs "Work", Start Here "Begin", etc.).
 */
export default function MonumentCTA({
  ghost,
  head,
  sub,
  href = "/booking",
  cta = "Book Your First Class →",
}: {
  ghost: string;
  head: React.ReactNode;
  sub: string;
  href?: string;
  cta?: string;
}) {
  return (
    <section className={s.cta}>
      <span className={s.ctaGhost} aria-hidden="true">
        {ghost}
      </span>
      <div className={s.ctaLeft}>
        <h2 className={s.ctaHead}>{head}</h2>
        <p className={s.ctaSub}>{sub}</p>
      </div>
      <Link href={href} className={s.btnSolid} style={{ position: "relative", zIndex: 1 }}>
        {cta}
      </Link>
    </section>
  );
}
