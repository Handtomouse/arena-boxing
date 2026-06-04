import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import sk from "@/components/redesign/skin.module.css";
import s from "./location-redesign.module.css";
import SkinNav from "@/components/redesign/SkinNav";
import EdgeFX from "@/components/redesign/EdgeFX";
import FocalWord from "@/components/redesign/FocalWord";
import MonumentCTA from "@/components/redesign/MonumentCTA";

export const metadata: Metadata = {
  title: "Location (redesign preview)",
  description:
    "Arena Boxing Bondi. 123 Campbell Pde, a five-minute walk from the beach. Getting here, the hours, and the door.",
};

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=123+Campbell+Parade+Bondi+Beach+NSW";

const GETTING = [
  { t: "By Bus", d: "The 333 and 380 run Campbell Pde end to end. Step off at Bondi Beach and you're at the door." },
  { t: "By Car", d: "Metered street parking along Campbell Pde and the side streets. Easiest before the morning rush." },
  { t: "On Foot", d: "Five minutes from the sand, eight from Bondi Junction. The whole walk smells like salt." },
];

const FACILITIES = [
  { t: "The Ring", d: "A full competition ring where THE CRAFT and sparring happen, under a coach's eye." },
  { t: "Heavy Bags", d: "A wall of heavy and speed bags, plus the floor space to actually move between them." },
  { t: "Strength Floor", d: "Rack, bars and free weights. Power built for punchers, not mirrors." },
  { t: "Recovery", d: "Change rooms and showers. Somewhere to land before you walk back into the day." },
];

export default function LocationRedesignPage() {
  return (
    <div className={sk.page}>
      <SkinNav />

      {/* hero */}
      <section className={sk.hero}>
        <span className={sk.heroBloom} aria-hidden="true" />

        <div className={sk.heroBody}>
          <div>
            <p className={sk.kicker}>A short walk from the surf</p>
            <p className={sk.preline}>YOU'LL FIND US</p>
            <FocalWord word="Here" dash={1700} viewBox="0 0 560 200" />
            <p className={sk.heroSub}>
              123 Campbell Pde, Bondi. Five minutes from the beach, eight from the
              Junction. Open today 05.30 &ndash; 21.00.
            </p>
            <div className={sk.ctaRow}>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={sk.btnSolid}>
                Get Directions &rarr;
              </a>
              <Link href="/timetable-redesign" className={sk.btnGhost}>
                View Timetable
              </Link>
            </div>
          </div>

          {/* map plate */}
          <div className={s.mapPlate}>
            <Image src="/images/map-bondi-duotone.jpg" alt="Map of Bondi showing Arena Boxing on Campbell Parade" fill sizes="(max-width: 900px) 100vw, 40vw" />
            <span className={s.mapPin} aria-hidden="true">
              <span className={s.mapPinDot} />
              <span className={s.mapPinLabel}>Arena</span>
            </span>
            <div className={s.mapMeta}>
              <span><b>123 Campbell Pde</b> &middot; Bondi NSW 2026</span>
              <span>33&deg;53&prime;S 151&deg;16&prime;E</span>
            </div>
          </div>
        </div>

        <EdgeFX />
      </section>

      {/* getting here */}
      <section className={sk.section}>
        <div className={sk.sectionHead}>
          <span className={sk.sectionKicker}>Getting here</span>
          <h2 className={sk.sectionTitle}>THREE WAYS TO THE DOOR</h2>
        </div>
        <div className={`${sk.cardGrid} ${sk.cols3}`}>
          {GETTING.map((g) => (
            <article key={g.t} className={sk.card}>
              <span className={sk.cardIcon} aria-hidden="true">
                &#10148;
              </span>
              <h3 className={sk.cardTitle}>{g.t}</h3>
              <p className={sk.cardBody}>{g.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* facility highlights */}
      <section className={`${sk.section} ${sk.sectionPlate}`}>
        <div className={sk.sectionHead}>
          <span className={sk.sectionKicker}>Inside the room</span>
          <h2 className={sk.sectionTitle}>FACILITY HIGHLIGHTS</h2>
        </div>
        <div className={`${sk.cardGrid} ${sk.cols4}`}>
          {FACILITIES.map((f) => (
            <article key={f.t} className={sk.card}>
              <span className={sk.cardIcon} aria-hidden="true">
                &#10022;
              </span>
              <h3 className={sk.cardTitle}>{f.t}</h3>
              <p className={sk.cardBody}>{f.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* opening hours */}
      <section className={sk.section}>
        <div className={sk.sectionHead}>
          <span className={sk.sectionKicker}>When we're open</span>
          <h2 className={sk.sectionTitle}>THE DOOR, THE HOURS, NO FINE PRINT</h2>
        </div>
        <div className={s.hours}>
          <div className={`${s.hoursCell} ${s.focal}`}>
            <p className={s.hoursDay}>MON &ndash; FRI</p>
            <p className={s.hoursTime}>06.00 &ndash; 21.00</p>
            <p className={s.hoursNote}>First call 06.00 &middot; last bell 21.00.</p>
          </div>
          <div className={s.hoursCell}>
            <p className={s.hoursDay}>SAT</p>
            <p className={s.hoursTime}>07.00 &ndash; 13.00</p>
            <p className={s.hoursNote}>Long round 07.00 (members).</p>
          </div>
          <div className={s.hoursCell}>
            <p className={s.hoursDay}>SUN</p>
            <p className={s.hoursTime}>08.00 &ndash; 12.00</p>
            <p className={s.hoursNote}>Open floor &middot; bag &amp; rope, no class.</p>
          </div>
          <div className={s.hoursCell}>
            <p className={s.hoursDay}>PUB HOL</p>
            <p className={s.hoursTime}>Reduced</p>
            <p className={s.hoursNote}>Check before you walk.</p>
          </div>
        </div>
      </section>

      {/* contact band */}
      <section className={sk.section}>
        <div className={s.contact}>
          <div className={s.contactText}>
            <h3>HAVE A QUESTION?</h3>
            <p>
              First time, drop-in, or just want to see the place? Walk in during
              open hours and our team will show you around. No appointment, no
              pitch.
            </p>
          </div>
          <Link href="/location" className={sk.btnSolid}>
            Send a Message &rarr;
          </Link>
        </div>
      </section>

      <MonumentCTA
        ghost="Here"
        head={
          <>
            TRAIN
            <br />
            RIGHT HERE.
          </>
        }
        sub="123 Campbell Pde, Bondi. First class on the house."
        cta="Book a Class →"
      />
    </div>
  );
}
