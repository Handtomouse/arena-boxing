import type { Metadata } from "next";
import Link from "next/link";
import sk from "@/components/redesign/skin.module.css";
import s from "./start-here.module.css";
import Hero from "@/components/redesign/Hero";
import NextClassCard from "@/components/redesign/NextClassCard";
import MonumentCTA from "@/components/redesign/MonumentCTA";

export const metadata: Metadata = {
  title: "Start Here",
  description:
    "New to Arena Boxing Bondi? Your first class is on the house. No experience, no kit, no ego. Here's exactly what to expect.",
};

const EXPECT = [
  { t: "Book It", d: "Grab a spot in THE WORK or THE OPENER online. Free for your first." },
  { t: "Arrive Early", d: "Ten minutes ahead. We'll show you the floor, the bags, the change rooms." },
  { t: "Gear Up", d: "Gloves and wraps are on us. Wear what you'd train in, bring a water bottle." },
  { t: "Warm Up", d: "Skipping, shadow, mobility. Your body's ready before a glove touches a bag." },
  { t: "Learn The Base", d: "Stance, guard, the first three punches. Drilled at your pace, not rushed." },
  { t: "Belong", d: "Round out, gloves off, you've met the room. You'll be missed if you don't come back." },
];

const ESSENTIALS = [
  { t: "What To Bring", d: "Water and a towel. That's the list. Gloves, wraps and bags are all here." },
  { t: "What To Wear", d: "Shorts or trackpants, a tee, training shoes. Nothing technical required." },
  { t: "Need Experience?", d: "None. THE WORK and THE OPENER assume zero. Everyone starts at the stance." },
  { t: "How Early?", d: "Ten minutes for a first class. Enough for the tour and to wrap your hands." },
];

const ETHOS = [
  { t: "Sign Up", d: "Book a beginner-friendly class. First one on the house, no commitment." },
  { t: "Work Hard", d: "Turn up, put in the round, and you'll feel the difference. Effort over ego." },
  { t: "Respect", d: "We train hard, look out for each other, and get better together." },
];

export default function StartHerePage() {
  return (
    <div className={sk.page}>
      <Hero
        kicker="New here? We've got you"
        preline="WHERE YOU"
        focal={{ word: "Begin", dash: 2150, viewBox: "0 0 700 200" }}
        ghost="Dare"
        sub="First class on the house. No experience, no kit, no ego. Turn up, wrap your hands, and we'll take it from there."
        photo="/images/ring.jpg"
        photoAlt="The Arena floor before a class"
        primaryCta={{ href: "/booking", label: "Book Your First Class" }}
        secondaryCta={{ href: "/timetable", label: "View Timetable" }}
        aside={
          <NextClassCard
            title="THE OPENER"
            meta={["Sat 08:00", "50 min", "Beginner"]}
            spotsTaken={4}
            spotsTotal={16}
            ctaLabel="Book The Opener"
          />
        }
      />

      {/* what to expect — six numbered steps */}
      <section className={sk.section}>
        <div className={sk.sectionHead}>
          <span className={sk.sectionKicker}>What to expect</span>
          <h2 className={sk.sectionTitle}>YOUR FIRST HOUR, START TO FINISH</h2>
          <p className={sk.sectionSub}>
            Six steps. No surprises. This is exactly how a first class runs.
          </p>
        </div>
        <div className={`${sk.steps} ${s.expect}`}>
          {EXPECT.map((e, i) => (
            <article key={e.t} className={sk.step}>
              <span className={sk.stepNum}>{`0${i + 1}`}</span>
              <h3 className={sk.stepTitle}>{e.t}</h3>
              <p className={sk.stepBody}>{e.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* the essentials — four cards */}
      <section className={`${sk.section} ${sk.sectionPlate}`}>
        <div className={sk.sectionHead}>
          <span className={sk.sectionKicker}>The essentials</span>
          <h2 className={sk.sectionTitle}>THE FOUR QUESTIONS EVERYONE ASKS</h2>
          <p className={sk.sectionSub}>
            Everything you need to know for your first class. No guesswork.
          </p>
        </div>
        <div className={`${sk.cardGrid} ${sk.cols4}`}>
          {ESSENTIALS.map((e) => (
            <article key={e.t} className={sk.card}>
              <span className={sk.cardIcon} aria-hidden="true">?</span>
              <h3 className={sk.cardTitle}>{e.t}</h3>
              <p className={sk.cardBody}>{e.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* beginner-friendly classes — two class cards */}
      <section className={sk.section}>
        <div className={sk.sectionHead}>
          <span className={sk.sectionKicker}>Where to start</span>
          <h2 className={sk.sectionTitle}>BEGINNER-FRIENDLY CLASSES</h2>
          <p className={sk.sectionSub}>
            Two classes built for day one. Zero experience assumed.
          </p>
        </div>
        <div className={s.classes}>
          <article className={s.classCard}>
            <div className={s.classTop}>
              <span className={s.className}>THE WORK</span>
              <span className={s.classTime}>06:30 &middot; 12:00 daily</span>
            </div>
            <p className={s.classBody}>
              The foundation class. Stance, footwork, the first combinations and
              defence. Fifty minutes, coach-led, capped at twenty.
            </p>
            <span className={s.classMeta}>50 min &middot; Beginner-friendly</span>
            <Link href="/booking" className={sk.cardLink}>
              Book The Work &rarr;
            </Link>
          </article>
          <article className={s.classCard}>
            <div className={s.classTop}>
              <span className={s.className}>THE OPENER</span>
              <span className={s.classTime}>Sat 08:00 &middot; Sun 09:00</span>
            </div>
            <p className={s.classBody}>
              The weekend on-ramp. A slower build for newer hands. Technique
              first, sweat second. The friendliest room to walk into cold.
            </p>
            <span className={s.classMeta}>50 min &middot; Beginner</span>
            <Link href="/booking" className={sk.cardLink}>
              Book The Opener &rarr;
            </Link>
          </article>
        </div>
      </section>

      {/* no ego. just effort. — three-item ethos band */}
      <section className={`${sk.section} ${sk.sectionPlate}`}>
        <div className={sk.sectionHead}>
          <span className={sk.sectionKicker}>How we train</span>
          <h2 className={sk.sectionTitle}>NO EGO. JUST EFFORT.</h2>
          <p className={sk.sectionSub}>
            Arena is built on respect, hard work and looking out for each other.
            We train hard, we support each other, and we all get better together.
          </p>
        </div>
        <div className={`${sk.cardGrid} ${sk.cols3}`}>
          {ETHOS.map((e) => (
            <article key={e.t} className={sk.card}>
              <span className={sk.cardIcon} aria-hidden="true">&#10022;</span>
              <h3 className={sk.cardTitle}>{e.t}</h3>
              <p className={sk.cardBody}>{e.d}</p>
            </article>
          ))}
        </div>
      </section>

      <MonumentCTA
        ghost="Begin"
        head={
          <>
            READY TO
            <br />
            BEGIN?
          </>
        }
        sub="First class on the house. Walk in a stranger, leave a regular."
        cta="Book Your First Class →"
      />
    </div>
  );
}
