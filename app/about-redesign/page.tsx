import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import sk from "@/components/redesign/skin.module.css";
import s from "./about-redesign.module.css";
import SkinNav from "@/components/redesign/SkinNav";
import EdgeFX from "@/components/redesign/EdgeFX";
import FocalWord from "@/components/redesign/FocalWord";
import MonumentCTA from "@/components/redesign/MonumentCTA";

export const metadata: Metadata = {
  title: "About (redesign preview)",
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
      <SkinNav />

      {/* hero */}
      <section className={sk.hero}>
        <div
          className={sk.heroPhoto}
          aria-hidden="true"
          style={{ "--hero-img": "url(/images/gym-atmosphere.jpg)" } as React.CSSProperties}
        />
        <span className={sk.heroBloom} aria-hidden="true" />

        <div className={sk.heroBody}>
          <div>
            <p className={sk.kicker}>&mdash; A boxing room in Bondi, est. MMXXV &mdash;</p>
            <p className={sk.preline}>EVERYTHING HERE IS</p>
            <FocalWord word="Built" dash={2050} viewBox="0 0 680 200" />
            <p className={sk.heroSub}>
              On discipline, driven by community. Authentic training, certified
              coaches, no shortcuts. Four coaches, one standard.
            </p>
            <div className={sk.ctaRow}>
              <Link href="/booking" className={sk.btnSolid}>
                Book a Class &rarr;
              </Link>
              <Link href="/timetable-redesign" className={sk.btnGhost}>
                View Timetable
              </Link>
            </div>
          </div>

          {/* the space */}
          <aside className={s.space}>
            <span className={s.spaceKey}>
              <span className={sk.dot} aria-hidden="true" />
              The Arena
            </span>
            <p className={s.spaceHead}>A SPACE BUILT FOR THE WORK</p>
            <ul className={s.spaceList}>
              {SPACE.map((f) => (
                <li key={f}>
                  <span aria-hidden="true">&#10022;</span>
                  {f}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <EdgeFX />
      </section>

      {/* values */}
      <section className={sk.section}>
        <div className={sk.sectionHead}>
          <span className={sk.sectionKicker}>What we stand on</span>
          <h2 className={sk.sectionTitle}>BUILT ON DISCIPLINE. DRIVEN BY COMMUNITY.</h2>
          <p className={sk.sectionSub}>
            Four things we don't compromise on &mdash; the reason the room feels
            the way it does.
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
          <span className={sk.sectionKicker}>Meet the team</span>
          <h2 className={sk.sectionTitle}>FOUR COACHES, ONE STANDARD</h2>
          <p className={sk.sectionSub}>
            Fighters and working pros who teach for a living. Full bios landing
            soon &mdash; for now, come meet them on the floor.
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

      {/* creed band */}
      <section className={s.creed}>
        <p className={s.creedQuote}>
          &ldquo;Authentic training. Certified coaches. No shortcuts. We don't
          talk about fighting &mdash; we teach it.&rdquo;
          <span className={s.creedBy}>&mdash; the founding creed, MMXXV</span>
        </p>
      </section>

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
