import type { Metadata } from "next";
import Link from "next/link";
import s from "./home-redesign.module.css";

export const metadata: Metadata = {
  title: "Home (redesign preview)",
  description:
    "Loader-skin Home reference — Old London focal blackletter, neon outline trace, edge package. Preview route on the redesign branch.",
};

// Timetable / Membership / About are live routes. Programs + Start Here are
// part of the redesign rollout and not built yet — placeholder "#" so the
// preview never 404s. Wire to real routes when those pages land.
const NAV = [
  { href: "/timetable", label: "Timetable" },
  { href: "#", label: "Programs" },
  { href: "/membership", label: "Membership" },
  { href: "#", label: "Start Here" },
  { href: "/about", label: "About" },
];

const WHY = [
  { t: "Real Training", d: "Coaching that meets you where you are and pushes from there. No filler rounds." },
  { t: "Real Coaches", d: "Fighters and working pros who actually teach, corner to corner, every session." },
  { t: "Real Environment", d: "A room that respects the work. No mirrors to pose in, no ego to feed." },
  { t: "Real Community", d: "People who show up for the work, and for each other. You'll be missed if you don't." },
];

export default function HomeRedesignPage() {
  return (
    <div className={s.page}>
      {/* skinned top bar */}
      <header className={s.topbar}>
        <Link href="/home-redesign" className={s.wordmark}>
          Arena
        </Link>
        <nav className={s.navlinks} aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className={s.navright}>
          <span className={s.live}>
            <span className={s.dot} aria-hidden="true" />
            Open &middot; Bondi &middot; 05.30
          </span>
          <Link href="/booking" className={s.bookBtn}>
            Book a Class
          </Link>
        </div>
      </header>

      {/* hero */}
      <section className={s.hero}>
        <div className={s.heroPhoto} aria-hidden="true" />
        <span className={s.heroBloom} aria-hidden="true" />

        <div className={s.heroBody}>
          <div>
            <p className={s.kicker}>&mdash; A boxing room in Bondi, after dark &mdash;</p>
            <p className={s.preline}>THOSE WHO</p>
            <svg
              className={s.focalSvg}
              viewBox="0 0 560 200"
              role="img"
              aria-label="Dare"
            >
              <text className={s.focalBase} x="0" y="160">Dare</text>
              <text className={s.focalDraw} x="0" y="160">Dare</text>
              <text className={s.focalRun} x="0" y="160">Dare</text>
            </svg>
            <p className={s.heroSub}>Real training. Real coaches. Real results.</p>
            <div className={s.ctaRow}>
              <Link href="/booking" className={s.btnSolid}>
                Book Your Class &rarr;
              </Link>
              <Link href="/timetable" className={s.btnGhost}>
                View Timetable
              </Link>
            </div>
          </div>

          {/* THE WORK — next class panel (solid, legible) */}
          <aside className={s.work}>
            <span className={s.workKey}>
              <span className={s.dot} aria-hidden="true" />
              Next Class
            </span>
            <p className={s.workTitle}>THE WORK</p>
            <div className={s.workMeta}>
              <span>Today 06:30</span>
              <span>50 min</span>
              <span>Floor 1</span>
            </div>
            <div className={s.workBar} aria-label="6 of 16 spots left">
              {Array.from({ length: 16 }).map((_, i) => (
                <i key={i} className={i < 6 ? s.on : undefined} />
              ))}
            </div>
            <Link href="/booking" className={s.workBtn}>
              Book 06:30 The Work &rarr;
            </Link>
          </aside>
        </div>

        <div className={s.grain} aria-hidden="true" />
        <div className={s.scan} aria-hidden="true" />
        <div className={s.vignette} aria-hidden="true" />
      </section>

      {/* WHY ARENA */}
      <section className={s.why} aria-label="Why Arena">
        {WHY.map((c) => (
          <article key={c.t} className={s.card}>
            <span className={s.cardIcon} aria-hidden="true">
              &#10022;
            </span>
            <h3 className={s.cardTitle}>{c.t}</h3>
            <p className={s.cardBody}>{c.d}</p>
          </article>
        ))}
      </section>

      {/* conversion band */}
      <section className={s.cta}>
        <span className={s.ctaGhost} aria-hidden="true">
          Begin
        </span>
        <div className={s.ctaLeft}>
          <h2 className={s.ctaHead}>
            READY TO
            <br />
            GET STARTED?
          </h2>
          <p className={s.ctaSub}>First class on the house. No commitment, no follow-up.</p>
        </div>
        <Link href="/booking" className={s.btnSolid} style={{ position: "relative", zIndex: 1 }}>
          Book Your First Class &rarr;
        </Link>
      </section>
    </div>
  );
}
