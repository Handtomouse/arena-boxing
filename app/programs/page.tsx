import type { Metadata } from "next";
import Link from "next/link";
import sk from "@/components/redesign/skin.module.css";
import s from "./programs.module.css";
import Hero from "@/components/redesign/Hero";
import NextClassCard from "@/components/redesign/NextClassCard";
import MonumentCTA from "@/components/redesign/MonumentCTA";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Boxing, strength, conditioning, sparring and private coaching at Arena Boxing Bondi. Coach-led, capped at twenty, real results.",
};

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
  { t: "Turn Up", d: "Book THE WORK or THE OPENER. First class on the house, gloves and wraps provided." },
  { t: "Learn The Base", d: "Stance, guard, the first three punches. No experience assumed, no one rushed." },
  { t: "Find Your Rounds", d: "Add THE LONG ROUND once the basics land. Build the engine that carries the work." },
  { t: "Step Up", d: "When you're ready, THE CRAFT and sparring. The coach says when, not the calendar." },
];

export default function ProgramsPage() {
  return (
    <div className={sk.page}>
      <Hero
        kicker="Five ways to train"
        preline="PUT IN THE"
        focal={{ word: "Work", dash: 1750, viewBox: "0 0 560 200" }}
        ghost="Dare"
        sub="Boxing, strength, conditioning, sparring and private coaching. Coaching that meets you where you are, then pushes from there."
        photo="/images/gym-training.jpg"
        photoAlt="Boxers training on the Arena floor"
        primaryCta={{ href: "/booking", label: "Book a Class" }}
        secondaryCta={{ href: "/timetable", label: "View Timetable" }}
        aside={
          <NextClassCard
            title="THE WORK"
            meta={["Today 06:30", "50 min", "Floor 1"]}
            spotsTaken={6}
            spotsTotal={16}
            ctaLabel="Book 06:30 The Work"
          />
        }
      />

      {/* disciplines */}
      <section className={sk.section}>
        <div className={sk.sectionHead}>
          <span className={sk.sectionKicker}>What we train</span>
          <h2 className={sk.sectionTitle}>REAL TRAINING. REAL RESULTS.</h2>
          <p className={sk.sectionSub}>
            Five disciplines, one standard. Pick a door. The coaches take it from there.
          </p>
        </div>
        <div className={s.disc}>
          {PROGRAMS.map((p) => (
            <article key={p.t} className={sk.card}>
              <span className={sk.cardIcon} aria-hidden="true">&#10022;</span>
              <h3 className={sk.cardTitle}>{p.t}</h3>
              <p className={sk.cardBody}>{p.d}</p>
              <Link href="/timetable" className={sk.cardLink}>{p.tag} &rarr;</Link>
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
            Four honest steps from first class to sparring. No fast-tracking, no gatekeeping.
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
        head={<>READY TO<br />PUT IN THE WORK?</>}
        sub="First class on the house. Coach-led, capped at twenty, no follow-up."
        cta="Book Your First Class →"
      />
    </div>
  );
}
