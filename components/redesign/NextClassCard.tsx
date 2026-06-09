import Link from "next/link";
import s from "./NextClassCard.module.css";

/**
 * Live "next class" card used as the hero aside. Spots render as a fill bar
 * (filled = booked). Pure presentational — pass real schedule data in.
 */
export default function NextClassCard({
  label = "Next Class",
  title,
  meta,
  spotsTaken,
  spotsTotal,
  ctaHref = "/booking",
  ctaLabel,
}: {
  label?: string;
  title: string;
  meta: string[];
  spotsTaken: number;
  spotsTotal: number;
  ctaHref?: string;
  ctaLabel: string;
}) {
  return (
    <aside className={s.card}>
      <span className={s.key}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--blood-red, #a31f1f)", display: "inline-block" }} aria-hidden="true" />{label}</span>
      <p className={s.title}>{title}</p>
      <div className={s.meta}>{meta.map((m) => <span key={m}>{m}</span>)}</div>
      <div className={s.bar} aria-label={`${spotsTotal - spotsTaken} of ${spotsTotal} spots left`}>
        {Array.from({ length: spotsTotal }).map((_, i) => (
          <i key={i} className={i < spotsTaken ? s.on : undefined} />
        ))}
      </div>
      <Link href={ctaHref} className={s.btn}>{ctaLabel} &rarr;</Link>
    </aside>
  );
}
