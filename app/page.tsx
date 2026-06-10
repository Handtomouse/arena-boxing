import type { Metadata } from "next";
import sk from "@/components/redesign/skin.module.css";
import s from "./home-redesign.module.css";
import Hero from "@/components/redesign/Hero";
import IntroGate from "@/components/IntroGate";
import NextClassCard from "@/components/redesign/NextClassCard";
import MonumentCTA from "@/components/redesign/MonumentCTA";

export const metadata: Metadata = {
  title: "Arena Boxing Bondi",
  description:
    "Real training, real coaches, real results. Coach-led boxing in Bondi, capped at twenty. Book your first class on the house.",
};

const WHY = [
  {
    t: "Real Training",
    d: "Coaching that meets you where you are and pushes from there. No filler rounds.",
    photo: "/images/gym-training.jpg",
  },
  {
    t: "Real Coaches",
    d: "Fighters and working pros who actually teach, corner to corner, every session.",
    photo: "/images/trainers/henry-payten.jpg",
  },
  {
    t: "Real Environment",
    d: "A room that respects the work. No mirrors to pose in, no ego to feed.",
    photo: "/images/ring.jpg",
  },
  {
    t: "Real Community",
    d: "People who show up for the work, and for each other. You'll be missed if you don't.",
    photo: "/images/gym-atmosphere.jpg",
  },
];

export default function HomeRedesignPage() {
  return (
    <IntroGate>
      <div className={sk.page}>
        <Hero
          kicker="A boxing room in Bondi, after dark"
          preline="THOSE WHO"
          focal={{ word: "Dare", dash: 1700, viewBox: "0 0 560 200" }}
          ghost="Arena"
          sub="Real training. Real coaches. Real results."
          photo="/images/gym-atmosphere.jpg"
          photoAlt="Boxers training on the Arena floor in Bondi"
          primaryCta={{ href: "/booking", label: "Book Your Class" }}
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

        {/* WHY ARENA - photo-backed cards */}
        <section className={sk.section} aria-label="Why Arena">
          <div className={s.whyGrid}>
            {WHY.map((c) => (
              <article
                key={c.t}
                className={s.photoCard}
                style={{ backgroundImage: `url(${c.photo})` }}
              >
                <span className={s.shade} aria-hidden="true" />
                <div className={s.cardBody}>
                  <h3 className={s.cardTitle}>{c.t}</h3>
                  <p className={s.cardText}>{c.d}</p>
                </div>
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
              GET STARTED?
            </>
          }
          sub="First class on the house. No commitment, no follow-up."
          cta="Book Your First Class →"
        />
      </div>
    </IntroGate>
  );
}
