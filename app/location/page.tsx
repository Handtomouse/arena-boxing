import type { Metadata } from "next";
import Image from "next/image";
import sk from "@/components/redesign/skin.module.css";
import s from "./location-redesign.module.css";
import Hero from "@/components/redesign/Hero";
import FeatureBand from "@/components/redesign/FeatureBand";
import MonumentCTA from "@/components/redesign/MonumentCTA";
import {
  ADDRESS_LINE,
  ADDRESS_SUBURB,
  MAPS_QUERY_URL,
} from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Location",
  description: `Arena Boxing Bondi. ${ADDRESS_LINE}, a five-minute walk from the beach. Getting here, the hours, and the door.`,
};

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

const HOURS = [
  { day: "MON – FRI", time: "06.00 – 21.00", note: "First call 06.00, last bell 21.00.", focal: true },
  { day: "SAT", time: "07.00 – 13.00", note: "Long round 07.00 (members)." },
  { day: "SUN", time: "08.00 – 12.00", note: "Open floor, bag and rope, no class." },
  { day: "PUB HOL", time: "Reduced", note: "Check before you walk." },
];

export default function LocationRedesignPage() {
  return (
    <div className={sk.page}>
      <Hero
        kicker="A short walk from the surf"
        preline="YOU'LL FIND US"
        focal={{ word: "Here", dash: 1700, viewBox: "0 0 560 200" }}
        ghost="Dare"
        sub={`${ADDRESS_LINE}, Bondi. Five minutes from the beach, eight from the Junction. Open today 06.00 – 21.00.`}
        photo="/images/bondi-beach.jpg"
        photoAlt="The Arena Boxing floor in Bondi"
        primaryCta={{ href: MAPS_QUERY_URL, label: "Get Directions" }}
        secondaryCta={{ href: "/timetable", label: "View Timetable" }}
        aside={
          <div className={s.mapPlate}>
            <Image
              src="/images/map-bondi-duotone.jpg"
              alt="Map of Bondi showing Arena Boxing on Campbell Parade"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
            />
            <span className={s.mapPin} aria-hidden="true">
              <span className={s.mapPinDot} />
              <span className={s.mapPinLabel}>Arena</span>
            </span>
            <div className={s.mapMeta}>
              <span>
                <b>{ADDRESS_LINE}</b> &middot; {ADDRESS_SUBURB}
              </span>
              <span>33&deg;53&prime;S 151&deg;16&prime;E</span>
            </div>
          </div>
        }
      />

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
          <span className={sk.sectionKicker}>When we&apos;re open</span>
          <h2 className={sk.sectionTitle}>OPENING HOURS</h2>
        </div>
        <div className={s.hours}>
          {HOURS.map((h) => (
            <div
              key={h.day}
              className={`${s.hoursCell}${h.focal ? ` ${s.focal}` : ""}`}
            >
              <p className={s.hoursDay}>{h.day}</p>
              <p className={s.hoursTime}>{h.time}</p>
              <p className={s.hoursNote}>{h.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* contact band */}
      <FeatureBand
        mode="cta"
        head="HAVE A QUESTION?"
        body="First time, drop-in, or just want to see the place? Walk in during open hours and our team will show you around. No appointment, no pitch."
        cta={{ href: "/location", label: "Send a Message" }}
      />

      <MonumentCTA
        ghost="Here"
        head={
          <>
            TRAIN
            <br />
            RIGHT HERE.
          </>
        }
        sub={`${ADDRESS_LINE}, Bondi. First class on the house.`}
        cta="Book a Class →"
      />
    </div>
  );
}
