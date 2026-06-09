import type { Metadata } from "next";
import Image from "next/image";
import sk from "@/components/redesign/skin.module.css";
import s from "./about-redesign.module.css";
import Hero from "@/components/redesign/Hero";
import FeatureBand from "@/components/redesign/FeatureBand";
import MonumentCTA from "@/components/redesign/MonumentCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "Arena Boxing opened in Bondi, MMXXV. Authentic training, certified coaches, no shortcuts. Four coaches, one standard.",
};

const SPACE = [
  "Full competition boxing ring",
  "Heavy bags, speed bags, the floor space to move",
  "Strength rack and free weights",
  "Change rooms, showers, somewhere to recover",
];

const VALUES = [
  { t: "Our Philosophy", d: "Authentic training, no shortcuts. We teach the craft the way it's meant to be taught, round by round." },
  { t: "The Training", d: "Coach-led, capped at twenty, plain-English difficulty. You're seen and corrected every session." },
  { t: "Our Coaches", d: "Fighters and working pros who actually teach. Corner to corner, every class, no autopilot." },
  { t: "The Community", d: "Regulars, sparring partners and first-timers in one room. You'll be missed if you don't show." },
];

const COACHES = [
  { name: "Brendan McDonnell", role: "Head Coach", img: "/images/trainers/brendan-mcdonnell.jpg" },
  { name: "Henry Payten", role: "Coach", img: "/images/trainers/henry-payten.jpg" },
  { name: "Matt Bull", role: "Coach", img: "/images/trainers/matt-bull.jpg" },
  { name: "Zach Levy", role: "Coach", img: "/images/trainers/zach-levy.jpg" },
];

export default function AboutRedesignPage() {
  return (
    <div className={sk.page}>
      <Hero
        kicker="A boxing room in Bondi, est. MMXXV"
        preline="EVERYTHING HERE IS"
        focal={{ word: "Built", dash: 2050, viewBox: "0 0 680 200" }}
        ghost="Dare"
        sub="On discipline, driven by community. Authentic training, certified coaches, no shortcuts. Four coaches, one standard."
        photo="/images/gym-atmosphere.jpg"
        photoAlt="The Arena floor in Bondi"
        primaryCta={{ href: "/booking", label: "Book a Class" }}
        secondaryCta={{ href: "/timetable", label: "View Timetable" }}
        aside={
          <aside className={s.space}>
            <span className={s.spaceKey}>
              <span className={sk.dot} aria-hidden="true" />
              The Space
            </span>
            <p className={s.spaceHead}>A SPACE BUILT FOR PURPOSE</p>
            <ul className={s.spaceList}>
              {SPACE.map((f) => (
                <li key={f}>
                  <span aria-hidden="true">&#10022;</span>
                  {f}
                </li>
              ))}
            </ul>
          </aside>
        }
      />

      {/* values */}
      <section className={sk.section}>
        <div className={sk.sectionHead}>
          <span className={sk.sectionKicker}>Our Values</span>
          <h2 className={sk.sectionTitle}>BUILT ON DISCIPLINE. DRIVEN BY COMMUNITY.</h2>
          <p className={sk.sectionSub}>
            Four things we don&apos;t compromise on. The reason the room feels the
            way it does.
          </p>
        </div>
        <div className={`${sk.cardGrid} ${sk.cols4}`}>
          {VALUES.map((v) => (
            <article key={v.t} className={sk.card}>
              <span className={sk.cardIcon} aria-hidden="true">
                &#10022;
              </span>
              <h3 className={sk.cardTitle}>{v.t}</h3>
              <p className={sk.cardBody}>{v.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* coaches */}
      <section className={`${sk.section} ${sk.sectionPlate}`}>
        <div className={sk.sectionHead}>
          <span className={sk.sectionKicker}>Our Coaches</span>
          <h2 className={sk.sectionTitle}>FOUR COACHES, ONE STANDARD</h2>
          <p className={sk.sectionSub}>
            Fighters and working pros who teach for a living. Full bios landing
            soon. For now, come meet them on the floor.
          </p>
        </div>
        <div className={s.coaches}>
          {COACHES.map((c) => (
            <article key={c.name} className={s.coach}>
              <div className={s.coachPhoto}>
                <Image src={c.img} alt={c.name} fill sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 25vw" />
              </div>
              <div className={s.coachBody}>
                <h3 className={s.coachName}>{c.name}</h3>
                <p className={s.coachRole}>{c.role}</p>
                <p className={s.coachBio}>Bio coming soon.</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FeatureBand
        mode="quote"
        quote="BEST TRAINING. BEST PEOPLE. BEST DECISION I'VE EVER MADE."
        cite="A regular, two years in"
      />

      <MonumentCTA
        ghost="Built"
        head={
          <>
            COME BUILD
            <br />
            SOMETHING REAL.
          </>
        }
        sub="First class on the house. Four coaches, one room, one standard."
        cta="Book a Class →"
      />
    </div>
  );
}
