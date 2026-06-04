import type { Metadata } from "next";
import Link from "next/link";
import sk from "@/components/redesign/skin.module.css";
import s from "./programs.module.css";
import SkinNav from "@/components/redesign/SkinNav";
import EdgeFX from "@/components/redesign/EdgeFX";
import FocalWord from "@/components/redesign/FocalWord";
import MonumentCTA from "@/components/redesign/MonumentCTA";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Boxing, strength, conditioning, sparring and private coaching at Arena Boxing Bondi. Coach-led, capped at twenty, real results.",
};

const DISCIPLINES = [
  { name: "Boxing", tag: "The base" },
  { name: "Strength", tag: "Power" },
  { name: "Conditioning", tag: "The engine" },
  { name: "Sparring", tag: "By approval" },
  { name: "Private", tag: "One-on-one" },
];

const PROGRAMS = [
  {
    t: "Boxing",
    d: "The core. Stance, footwork, combinations, defence. THE WORK and THE OPENER build the foundation every other class stands on.",
    tag: "Beginner-friendly",
  },
  {
    t: "Strength",
    d: "Barbell and bodywork built for punchers. Power that holds up in the last round, not just the first.",
    tag: "All levels",
  },
  {
    t: "Conditioning",
    d: "Rounds that teach your lungs to keep up with your hands. THE LONG ROUND, sixty minutes, all levels.",
    tag: "All levels",
  },
  {
    t: "Sparring",
    d: "Controlled contact under a coach's eye. THE CRAFT, where everything you've drilled finally gets tested.",
    tag: "Advanced",
  },
  {
    t: "Private",
    d: "One-on-one, corner to corner. Faster progress at your pace, your goals. Book a coach direct.",
    tag: "By arrangement",
  },
];

const PATHWAY = [
  {
    t: "Turn Up",
    d: "Book THE WORK or THE OPENER. First class on the house, gloves and wraps provided.",
  },
  {
    t: "Learn The Base",
    d: "Stance, guard, the first three punches. No experience assumed, no one rushed.",
  },
  {
    t: "Find Your Rounds",
    d: "Add THE LONG ROUND once the basics land. Build the engine that carries the work.",
  },
  {
    t: "Step Up",
    d: "When you're ready, THE CRAFT and sparring. The coach says when, not the calendar.",
  },
];

export default function ProgramsPage() {
  return (
    <div className={sk.page}>
      <SkinNav />

      {/* hero */}
      <section className={sk.hero}>
        <div
          className={sk.heroPhoto}
          aria-hidden="true"
          style={{ "--hero-img": "url(/images/gym-training.jpg)" } as React.CSSProperties}
        />
        <span className={sk.heroBloom} aria-hidden="true" />

        <div className={sk.heroBody}>
          <div>
            <p className={sk.kicker}>&mdash; Five ways to train &mdash;</p>
            <p className={sk.preline}>PUT IN THE</p>
            <FocalWord word="Work" dash={1750} viewBox="0 0 560 200" />
            <p className={sk.heroSub}>
              Boxing, strength, conditioning, sparring and private coaching. Real
              coaching that meets you where you are, then pushes from there.
            </p>
            <div className={sk.ctaRow}>
              <Link href="/timetable-redesign" className={sk.btnSolid}>
                View Timetable &rarr;
              </Link>
              <Link href="/start-here" className={sk.btnGhost}>
                New Here? Start Here
              </Link>
            </div>
          </div>

          {/* disciplines index — solid, legible */}
          <aside className={s.index}>
            <span className={s.indexKey}>
              <span className={sk.dot} aria-hidden="true" />
              The Disciplines
            </span>
            <div className={s.indexList}>
              {DISCIPLINES.map((d) => (
                <div key={d.name} className={s.indexRow}>
                  <span className={s.indexName}>{d.name}</span>
                  <span className={s.indexTag}>{d.tag}</span>
                </div>
              ))}
            </div>
            <p className={s.indexNote}>
              Every class coach-led and capped at twenty. Plain-English
              difficulty, no filler rounds.
            </p>
            <Link href="/timetable-redesign" className={sk.btnSolid} style={{ display: "block", textAlign: "center" }}>
              See The Week &rarr;
            </Link>
          </aside>
        </div>

        <EdgeFX />
      </section>

      {/* program cards */}
      <section className={sk.section}>
        <div className={sk.sectionHead}>
          <span className={sk.sectionKicker}>What we train</span>
          <h2 className={sk.sectionTitle}>REAL TRAINING. REAL RESULTS.</h2>
          <p className={sk.sectionSub}>
            Five disciplines, one standard. Pick a door &mdash; the coaches take
            it from there.
          </p>
        </div>
        <div className={s.progGrid}>
          {PROGRAMS.map((p) => (
            <article key={p.t} className={sk.card}>
              <span className={sk.cardIcon} aria-hidden="true">
                &#10022;
              </span>
              <h3 className={sk.cardTitle}>{p.t}</h3>
              <p className={sk.cardBody}>{p.d}</p>
              <Link href="/timetable-redesign" className={sk.cardLink}>
                {p.tag} &rarr;
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* beginner pathway */}
      <section className={`${sk.section} ${sk.sectionPlate}`}>
        <div className={sk.sectionHead}>
          <span className={sk.sectionKicker}>How to progress</span>
          <h2 className={sk.sectionTitle}>THE BEGINNER PATHWAY</h2>
          <p className={sk.sectionSub}>
            Four honest steps from first class to sparring. No fast-tracking, no
            gatekeeping.
          </p>
        </div>
        <div className={s.pathway}>
          {PATHWAY.map((p, i) => (
            <article key={p.t} className={sk.step}>
              <span className={sk.stepNum}>{`0${i + 1}`}</span>
              <h3 className={sk.stepTitle}>{p.t}</h3>
              <p className={sk.stepBody}>{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      <MonumentCTA
        ghost="Work"
        head={
          <>
            READY TO
            <br />
            PUT IN THE WORK?
          </>
        }
        sub="First class on the house. Coach-led, capped at twenty, no follow-up."
        cta="Book Your First Class →"
      />
    </div>
  );
}
