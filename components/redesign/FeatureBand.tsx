import Link from "next/link";
import sk from "./skin.module.css";
import s from "./FeatureBand.module.css";

/**
 * Horizontal statement band. Two modes:
 *   quote — big testimonial + attribution (About).
 *   cta   — heading + body + a button (Location contact, generic).
 */
export default function FeatureBand(
  props:
    | { mode: "quote"; quote: string; cite: string }
    | { mode: "cta"; head: string; body: string; cta: { href: string; label: string } },
) {
  if (props.mode === "quote") {
    return (
      <section className={s.band}>
        <div className={`${s.inner} ${s.quote}`}>
          <span className={s.mark} aria-hidden="true">&ldquo;</span>
          <p className={s.quoteText}>{props.quote}</p>
          <cite className={s.cite}>{props.cite}</cite>
        </div>
      </section>
    );
  }
  return (
    <section className={s.band}>
      <div className={`${s.inner} ${s.cta}`}>
        <div className={s.ctaText}>
          <h3 className={s.ctaHead}>{props.head}</h3>
          <p className={s.ctaBody}>{props.body}</p>
        </div>
        <Link href={props.cta.href} className={sk.btnSolid}>
          {props.cta.label} &rarr;
        </Link>
      </div>
    </section>
  );
}
