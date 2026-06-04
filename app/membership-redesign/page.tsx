import type { Metadata } from "next";
import Link from "next/link";
import sk from "@/components/redesign/skin.module.css";
import s from "./membership-redesign.module.css";
import SkinNav from "@/components/redesign/SkinNav";
import MonumentCTA from "@/components/redesign/MonumentCTA";

export const metadata: Metadata = {
  title: "Membership (redesign preview)",
  description:
    "Flexible options, no lock-in contracts. Drop-in $35, Unlimited $79/week, 10-Class Pack $320, Private Coaching $120 at Arena Boxing Bondi.",
};

const CHIPS = ["No lock-in contracts", "Cancel anytime", "Same coaches, every tier", "Student discount"];

const TIERS = [
  {
    name: "DROP IN",
    persona: "Pay as you train",
    amount: "$35",
    unit: "/ class",
    rec: false,
    cta: "Get Started",
    href: "/booking",
    perks: [
      "Any class, any time",
      "Gloves and wraps provided",
      "Book up to 12 hours ahead",
      "No lock-in, cancel anytime",
    ],
  },
  {
    name: "UNLIMITED",
    persona: "Train as often as you like",
    amount: "$79",
    unit: "/ week",
    rec: true,
    cta: "Get Started",
    href: "/booking",
    perks: [
      "Unlimited classes, every coach",
      "Priority booking, 14 days ahead",
      "Bring-a-friend pass each month",
      "Freeze up to 3 months a year",
    ],
  },
  {
    name: "10 CLASS PACK",
    persona: "Ten sessions, your pace",
    amount: "$320",
    unit: "/ 10 classes",
    rec: false,
    cta: "Buy Now",
    href: "/booking",
    perks: [
      "Ten classes, any type",
      "Valid for six months",
      "Gloves and wraps provided",
      "Share with a training partner",
    ],
  },
  {
    name: "PRIVATE COACHING",
    persona: "One-on-one with a coach",
    amount: "$120",
    unit: "/ session",
    rec: false,
    cta: "Enquire",
    href: "/location-redesign",
    perks: [
      "1:1 with a head coach",
      "Built around your goals",
      "Technique-first, no filler",
      "Flexible scheduling",
    ],
  },
];

const ROWS: { label: string; cells: (boolean | string)[] }[] = [
  { label: "Any class type", cells: [true, true, true, true] },
  { label: "Gloves and wraps provided", cells: [true, true, true, true] },
  { label: "Coach-led, capped at twenty", cells: [true, true, true, "1:1"] },
  { label: "Priority booking, 14 days ahead", cells: [false, true, false, true] },
  { label: "Freeze / pause option", cells: [false, true, false, false] },
  { label: "One-on-one coaching", cells: [false, false, false, true] },
  { label: "Cancellation window", cells: ["12 hours", "7 days", "6 months", "24 hours"] },
];

const PAYMENT = [
  { k: "Billing", v: "Unlimited bills weekly. No contracts, no joining fee." },
  { k: "Freeze and cancel", v: "Pause or cancel any membership with 7 days notice." },
  { k: "Drop-ins", v: "Refundable up to 12 hours before class." },
  { k: "Students", v: "15% off Unlimited with a valid student ID." },
  { k: "Prices", v: "All prices in AUD, GST included." },
];

export default function MembershipRedesignPage() {
  return (
    <div className={sk.page}>
      <SkinNav />

      {/* compact hero — dense page, NO focal trace */}
      <section className={s.mhero}>
        <div className={s.mheroWrap}>
          <div>
            <p className={sk.kicker}>Flexible options, no lock-in</p>
            <h1 className={s.mheroTitle}>MEMBERSHIP OPTIONS</h1>
            <p className={s.mheroSub}>Match your week to a price. Cancel anytime, no contracts.</p>
          </div>
          <ul className={s.chips}>
            {CHIPS.map((c) => (
              <li key={c}>
                <span className={sk.dot} aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* tiers */}
      <section className={s.tierSection}>
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
              <ul className={s.tierList}>
                {t.perks.map((p) => (
                  <li key={p}>
                    <span aria-hidden="true">&#10003;</span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link href={t.href} className={t.rec ? sk.btnSolid : sk.btnGhost} style={{ textAlign: "center" }}>
                {t.cta} &rarr;
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* what's included + payment */}
      <section className={`${sk.section} ${sk.sectionPlate}`}>
        <div className={s.includeGrid}>
          <div>
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
                    <th>Private</th>
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
          </div>

          <aside className={s.payment}>
            <span className={s.paymentKey}>
              <span className={sk.dot} aria-hidden="true" />
              Payment &amp; Cancellation
            </span>
            <dl className={s.paymentList}>
              {PAYMENT.map((p) => (
                <div key={p.k}>
                  <dt>{p.k}</dt>
                  <dd>{p.v}</dd>
                </div>
              ))}
            </dl>
            <Link href="/timetable-redesign" className={sk.btnGhost} style={{ textAlign: "center" }}>
              View Timetable &rarr;
            </Link>
          </aside>
        </div>
      </section>

      <MonumentCTA
        ghost="In"
        head={
          <>
            READY TO
            <br />
            START TRAINING?
          </>
        }
        sub="First class on the house. Pick a tier when you're ready, not before."
        cta="Book Your First Class →"
      />
    </div>
  );
}
