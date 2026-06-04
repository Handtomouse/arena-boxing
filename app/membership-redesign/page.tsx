import type { Metadata } from "next";
import Link from "next/link";
import sk from "@/components/redesign/skin.module.css";
import s from "./membership-redesign.module.css";
import SkinNav from "@/components/redesign/SkinNav";
import MonumentCTA from "@/components/redesign/MonumentCTA";

export const metadata: Metadata = {
  title: "Membership (redesign preview)",
  description:
    "Three tiers, plain math, no lock-in. Drop-in $35, Unlimited $220/month, 10-Pack $300, plus an invitation-only Founder's seat at Arena Boxing Bondi.",
};

const TIERS = [
  {
    persona: "First class · tourists · once-off",
    name: "DROP-IN",
    amount: "$35",
    unit: "/ session",
    note: "No commitment, no contract. Pay per round.",
    rec: false,
    cta: "Get Started",
    perks: [
      "Single session, any class type",
      "No commitment, no lock-in",
      "Same coaches, same standard",
      "Cancel up to 12 hours before",
    ],
  },
  {
    persona: "Daily training · fighters · committed",
    name: "UNLIMITED",
    amount: "$220",
    unit: "/ month",
    note: "Pays off after 7 sessions. Every class after is on the house.",
    rec: true,
    cta: "Start Unlimited",
    perks: [
      "Unlimited classes, every coach",
      "Priority booking · 14 days ahead",
      "Free fight-night seating · house events",
      "Freeze up to 3 months a year",
    ],
  },
  {
    persona: "2x a week · corporate · irregular",
    name: "10-PACK",
    amount: "$300",
    unit: "/ 10 pack",
    note: "Ten sessions at your own pace. Work the week that suits you.",
    rec: false,
    cta: "Buy 10-Pack",
    perks: [
      "Ten sessions, any class type",
      "Use them on your own schedule",
      "Same coaches, same standard",
      "Gloves and wraps provided",
    ],
  },
];

const ROWS: { label: string; cells: (boolean | string)[] }[] = [
  { label: "Any class type", cells: [true, true, true] },
  { label: "Coach-led, capped at twenty", cells: [true, true, true] },
  { label: "Gloves & wraps provided", cells: [true, true, true] },
  { label: "Priority booking · 14 days ahead", cells: [false, true, false] },
  { label: "Freeze up to 3 months a year", cells: [false, true, false] },
  { label: "Free fight-night seating", cells: [false, true, false] },
  { label: "Cancellation window", cells: ["12 hours", "7 days", "12 hours"] },
];

export default function MembershipRedesignPage() {
  return (
    <div className={sk.page}>
      <SkinNav />

      {/* compact hero — dense page, NO focal trace */}
      <section className={s.mhero}>
        <div className={s.mheroWrap}>
          <p className={sk.kicker}>Three tiers, plain math, no lock-in</p>
          <h1 className={s.mheroTitle}>MEMBERSHIP</h1>
          <p className={s.mheroSub}>Match your week to a price. Cancel anytime, no contracts.</p>
        </div>
      </section>

      {/* tiers */}
      <section className={sk.section} style={{ borderTop: "0" }}>
        <div className={s.tiers}>
          {TIERS.map((t) => (
            <article key={t.name} className={`${s.tier}${t.rec ? ` ${s.tierRec}` : ""}`}>
              {t.rec && <span className={s.recTag}>Most Popular</span>}
              <span className={s.tierPersona}>{t.persona}</span>
              <h2 className={s.tierName}>{t.name}</h2>
              <div className={s.tierPrice}>
                <span className={`${s.tierAmount}${t.rec ? ` ${s.tierAmountRec}` : ""}`}>{t.amount}</span>
                <span className={s.tierUnit}>{t.unit}</span>
              </div>
              <p className={s.tierBreak}>
                {t.rec ? (
                  <>
                    <strong>Pays off after 7 sessions.</strong> Every class
                    after that is on the house.
                  </>
                ) : (
                  t.note
                )}
              </p>
              <ul className={s.tierList}>
                {t.perks.map((p) => (
                  <li key={p}>
                    <span aria-hidden="true">&#10022;</span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href="/booking"
                className={t.rec ? sk.btnSolid : sk.btnGhost}
                style={{ textAlign: "center" }}
              >
                {t.cta} &rarr;
              </Link>
            </article>
          ))}
        </div>

        {/* founder strip */}
        <div className={s.founder}>
          <div className={s.founderText}>
            <h3>THE FOUNDER&rsquo;S SEAT</h3>
            <p>
              A small, invitation-only tier for the regulars who help build the
              room. Not a price you can buy. One you&rsquo;re asked into.
            </p>
          </div>
          <Link href="/location-redesign" className={sk.btnGhost}>
            Enquire &rarr;
          </Link>
        </div>

        <p className={s.policy}>
          All tiers month-to-month, no contracts. 15% student discount on Unlimited
          with valid ID. Prices in AUD, GST included.
        </p>
      </section>

      {/* comparison table */}
      <section className={`${sk.section} ${sk.sectionPlate}`}>
        <div className={sk.sectionHead}>
          <span className={sk.sectionKicker}>Side by side</span>
          <h2 className={sk.sectionTitle}>WHAT&rsquo;S INCLUDED</h2>
        </div>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th aria-hidden="true" />
                <th>Drop-in</th>
                <th className={s.rec}>Unlimited</th>
                <th>10-Pack</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {r.cells.map((c, i) => (
                    <td key={i}>
                      {typeof c === "string" ? (
                        <span className={s.cellNote}>{c}</span>
                      ) : c ? (
                        <span className={s.yes} aria-label="Included">&#10003;</span>
                      ) : (
                        <span className={s.no} aria-label="Not included">&ndash;</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <MonumentCTA
        ghost="In"
        head={
          <>
            YOU&rsquo;RE
            <br />
            IN.
          </>
        }
        sub="First class on the house. Pick a tier when you're ready, not before."
        cta="Book Your First Class →"
      />
    </div>
  );
}
