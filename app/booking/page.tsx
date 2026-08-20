/**
 * /booking — H4ab design-language translation (Task #18).
 *
 * Order per booking-page.html mockup:
 *   1) Hero — compact RESERVE. anchor (Bebas) + italic Cormorant counterpoint
 *   2) § 01 — What to bring (3 chips) + Hapana booking widget + Apple/Google
 *      Pay styled buttons (visual placeholders) + cancellation hairline line
 *   3) § 02 — Your First Class (5 numbered steps, Roman numerals preserved
 *      from PR #20)
 *   4) Pull quote — "You won't be the worst in the room..."
 *   5) § 03 — Phone + email fallback card
 *
 * PRESERVED:
 *   - HapanaEmbed mount (PR #22: canonical booking surface)
 *   - Roman-numeral 5-step walkthrough (PR #20)
 *   - "What to bring" chips (wraps / water / shoes)
 *   - Cancellation policy line (12h notice, no penalty)
 *   - Phone + email fallback card
 *   - Reassurance pull quote
 *   - No nested interactive elements (PR #14 fix)
 *   - var(--font-cormorant) only (PR #25 rename)
 *
 * Payment marks are non-interactive (role="img"); real checkout/payment
 * is handled inside the live Hapana booking widget.
 */
import type { Metadata } from "next";
import { HapanaEmbed } from "@/components";
import { HAPANA_WIDGET_ID_FALLBACK } from "@/lib/hapana-config";
import { EMAIL_GENERAL, PHONE_DISPLAY, PHONE_E164 } from "@/lib/site-contact";
import s from "./booking.module.css";

export const metadata: Metadata = {
  title: "Book a Class",
  description:
    "Reserve your spot at Arena Boxing Bondi. First class on the house. Twelve-hour cancellation, no penalty. Pick a session and step under the rope.",
};

interface BringChip {
  numeral: string;
  name: string;
  desc: React.ReactNode;
  icon: React.ReactNode;
}

interface FirstClassStep {
  numeral: string;
  time: string;
  title: string;
  body: React.ReactNode;
  tag: string;
  focal?: boolean;
}

/* ─────────── Data ──────────────────────────────────────────────────── */

const bringChips: BringChip[] = [
  {
    numeral: "I.",
    name: "WRAPS",
    desc: (
      <>
        <strong>We lend yours</strong> if it&rsquo;s your first one. Gloves on
        the wall. Bring your own if you have them.
      </>
    ),
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#E8DDD3"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <ellipse cx="12" cy="6" rx="7" ry="2.4" />
        <path d="M5 6v3.2c0 1.3 3.1 2.4 7 2.4s7-1.1 7-2.4V6" />
        <path d="M5 9.4v3.2c0 1.3 3.1 2.4 7 2.4s7-1.1 7-2.4V9.4" />
        <path d="M5 12.8V16c0 1.3 3.1 2.4 7 2.4s7-1.1 7-2.4v-3.2" />
        <line x1="14.6" y1="18.2" x2="17" y2="22" />
      </svg>
    ),
  },
  {
    numeral: "II.",
    name: "WATER",
    desc: (
      <>
        Bring a bottle, or <strong>buy one at the front</strong>. Filtered cold
        tap by the rope at all times.
      </>
    ),
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#E8DDD3"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9.6 3h4.8v2.4l1.2 1.6c.6.8.8 1.7.8 2.6V20a1.4 1.4 0 0 1-1.4 1.4H9a1.4 1.4 0 0 1-1.4-1.4V9.6c0-.9.2-1.8.8-2.6l1.2-1.6Z" />
        <line x1="9.6" y1="3" x2="14.4" y2="3" />
        <line x1="7.6" y1="13" x2="16.4" y2="13" />
      </svg>
    ),
  },
  {
    numeral: "III.",
    name: "SHOES",
    desc: (
      <>
        <strong>Clean indoor only</strong>, sand off the soles. Trainers,
        runners, or boxing shoes all work.
      </>
    ),
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#E8DDD3"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2.5 16.4h17a2 2 0 0 0 2-2v-.7c0-.6-.3-1.1-.8-1.4l-4-2.3-2.8-3.4a1.4 1.4 0 0 0-1-.5h-1.6a1 1 0 0 0-1 1l-.2 2.2-3.6 1c-.5.1-.9.6-.9 1.1v3.4a1.6 1.6 0 0 0 1.6 1.6Z" />
        <line x1="6.4" y1="12.4" x2="6.4" y2="14.8" />
        <line x1="9.4" y1="11.6" x2="9.4" y2="14.8" />
        <line x1="12.4" y1="11" x2="12.4" y2="14.8" />
      </svg>
    ),
  },
];

const firstClassSteps: FirstClassStep[] = [
  {
    numeral: "I.",
    time: "T-10 MIN",
    title: "ARRIVE",
    body: (
      <>
        Aim for ten minutes early. Front desk checks you in, you sign a one-page
        liability slip, and you&rsquo;re shown the lockers. Phones go in the
        wood pigeonholes by the rope.
      </>
    ),
    tag: "Take a breath. You're in the room.",
  },
  {
    numeral: "II.",
    time: "T-5 MIN",
    title: "WRAP UP",
    body: (
      <>
        Coach hand-wraps you the first time, slow, no rush. You&rsquo;ll
        learn it inside three sessions. Gloves come off the wall; we size you,
        then you&rsquo;re tied in.
      </>
    ),
    tag: "We do this for you, the first one.",
    focal: true,
  },
  {
    numeral: "III.",
    time: "0-12 MIN",
    title: "WARM-UP",
    body: (
      <>
        Bodyweight circuit then shadow rounds. Footwork drills, stance set,
        two-three basic combos walked through slowly. Twelve minutes. No
        pressure to keep up.
      </>
    ),
    tag: "Technique first. Always.",
  },
  {
    numeral: "IV.",
    time: "12-42 MIN",
    title: "BAG WORK",
    body: (
      <>
        Heavy bag, six rounds, three minutes on / one off. Coach walks the room
        , corrections, not commands. <strong>No contact in class one.</strong>{" "}
        Just you and the bag.
      </>
    ),
    tag: "Sweat by round three. Promise.",
  },
  {
    numeral: "V.",
    time: "42-50 MIN",
    title: "COOL-DOWN",
    body: (
      <>
        Stretch on the floor, core finisher, a slow round of breath work. Walk
        out. Coffee at the front desk, on us if it&rsquo;s your first. Soreness
        day two is normal, water helps.
      </>
    ),
    tag: "You made it through. Same time tomorrow?",
  },
];

/* ─────────── Page ──────────────────────────────────────────────────── */

export default function BookingPage() {
  return (
    <>
      {/* ── HERO — compact RESERVE. anchor ──────────────────────────── */}
      <section className={s.hero} aria-labelledby="booking-hero-title">
        <div className={s.heroWrap}>
          <div className={s.heroRailSub}>
            <span className={s.heroKicker}>
              Reserve your spot. Nothing else asked.
            </span>
            <span className={s.heroKickerR}>
              <span className={s.livedot} aria-hidden="true" />
              <span className={s.liveLbl}>LIVE</span>
              <span className={s.sep}>/</span>
              Bondi &middot; Sydney &middot; 33&deg;53&prime;S 151&deg;16&prime;E
            </span>
          </div>

          <div className={s.anchorBlock}>
            <div className={s.anchorSide}>
              <span className={s.anchorSideKey}>§ This page</span>
              <span className={s.anchorSideLine} />
              <span className={s.anchorSideNote}>
                Pick a session. Step under the rope.
                <br />
                <em>First class on the house</em>, no card asked.
              </span>
            </div>
            <div className={s.anchorMain}>
              <span className={s.anchorOverline}>
                Select a class from the calendar below
              </span>
              <h1 id="booking-hero-title" className={s.anchorWord}>
                RESERVE.
              </h1>
              <div className={s.anchorSub}>
                <span className={s.anchorSubRule} />
                <span className={s.anchorSubTxt}>
                  <strong>One class.</strong> <em>Nothing else asked.</em>
                </span>
              </div>
            </div>
          </div>

          <div className={s.heroBot}>
            <div className={s.heroBotCell}>
              <span className={s.heroBotK}>Next call</span>
              <span className={s.heroBotV}>
                06<em>&middot;</em>30 <em>Thu 28.05</em>
              </span>
            </div>
            <div className={`${s.heroBotCell} ${s.heroBotCellCenter}`}>
              <span className={s.heroBotK}>Cap per session</span>
              <span className={s.heroBotV}>
                20 <em>&middot;</em> personalised attention
              </span>
            </div>
            <div className={`${s.heroBotCell} ${s.heroBotCellRight}`}>
              <span className={s.heroBotK}>Cancellation</span>
              <span className={s.heroBotV}>
                12<em>h</em> notice <em>&middot;</em> no penalty
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── § 01 — WHAT TO BRING + WIDGET + CHECKOUT + CANCEL ───────── */}
      <section className={s.section} aria-labelledby="booking-s01-title">
        <div className={s.wrap}>
          <div className={s.edgeTop}>
            <span className={s.edgeFolio}>Plate I</span>
            <span className={s.edgeLine} />
            <span className={s.edgeMeta}>
              Before the bell: three small things
            </span>
          </div>

          <header className={s.shead}>
            <div className={s.sheadL}>
              <span className={s.sheadNum}>§ 01</span>
              <h2 id="booking-s01-title" className={s.sheadTitle}>
                What to bring<em>,</em>
              </h2>
              <span className={s.sheadSub}>
                and what we&rsquo;ll already have waiting.
              </span>
            </div>
            <div className={s.sheadR}>
              <span className={s.sheadKicker}>Three things</span>
              <span className={s.sheadRule} />
              <span className={s.sheadIndex}>I &middot; II &middot; III</span>
            </div>
          </header>

          {/* 3-chip strip — wraps / water / shoes */}
          <div className={s.bring}>
            {bringChips.map((chip) => (
              <article key={chip.name} className={s.chip}>
                <span className={s.chipIc}>{chip.icon}</span>
                <div className={s.chipBody}>
                  <span className={s.chipNum}>
                    <em>{chip.numeral}</em>
                  </span>
                  <h3 className={s.chipName}>{chip.name}</h3>
                  <span className={s.chipRule} />
                  <p className={s.chipDesc}>{chip.desc}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Hapana booking widget — canonical booking surface (PR #22) */}
          <div className={s.widget} aria-label="Booking widget">
            <div className={s.widgetHead}>
              <span className={s.widgetHeadL}>
                <span className={s.livedot} aria-hidden="true" />
                Sessions &middot; <strong>This week + next</strong>
              </span>
              <span className={s.widgetHeadC}>
                Select a class from the calendar below
              </span>
              <span className={s.widgetHeadR}>Live availability</span>
            </div>

            <div className={s.widgetBody}>
              <HapanaEmbed
                mode="live"
                widgetId={process.env.NEXT_PUBLIC_HAPANA_WIDGET_ID || HAPANA_WIDGET_ID_FALLBACK}
                theme="light"
                dataType="classes"
              />
            </div>

            <div className={s.widgetFoot}>
              <span className={s.widgetFootL}>
                Capped at 20 per session
              </span>
              <span className={s.widgetFootC}>
                Sessions sized small for personalised attention.
              </span>
              <span className={s.widgetFootR}>
                First class <em>free</em>
              </span>
            </div>
          </div>

          {/* Payment marks: Apple Pay / Google Pay / card accepted at checkout (via Hapana) */}
          <div className={s.checkout}>
            <div className={s.checkoutL}>
              <span className={s.checkoutK}>At checkout</span>
              <h3 className={s.checkoutTitle}>
                After you pick a session<em>,</em>
                <br />
                pay the way that suits.
              </h3>
              <span className={s.checkoutSub}>
                First class on the house, no card required at all.
              </span>
            </div>
            <div className={s.checkoutR}>
              <div className={s.payRow}>
                <span
                  className={s.payBtn}
                  role="img"
                  aria-label="Apple Pay accepted at checkout"
                >
                  <svg viewBox="0 0 32 32" aria-hidden="true">
                    <path
                      fill="#0E0B0B"
                      d="M22.55 16.95c-.03-3.28 2.68-4.85 2.8-4.93-1.53-2.24-3.91-2.55-4.76-2.58-2.03-.2-3.95 1.19-4.98 1.19-1.03 0-2.6-1.16-4.27-1.13-2.2.03-4.23 1.28-5.36 3.25-2.29 3.96-.59 9.82 1.65 13.04 1.09 1.57 2.39 3.34 4.1 3.27 1.65-.07 2.27-1.07 4.26-1.07 1.99 0 2.55 1.07 4.29 1.04 1.77-.03 2.89-1.6 3.98-3.18 1.25-1.83 1.77-3.6 1.8-3.69-.04-.02-3.46-1.33-3.51-5.21Zm-3.26-9.59c.91-1.1 1.52-2.63 1.36-4.15-1.31.05-2.9.88-3.84 1.97-.84.97-1.58 2.52-1.38 4.03 1.46.11 2.95-.74 3.86-1.85Z"
                    />
                  </svg>
                  <span>Pay</span>
                </span>
                <span
                  className={s.payBtn}
                  role="img"
                  aria-label="Google Pay accepted at checkout"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#0E0B0B"
                      d="M21.6 12.23c0-.69-.06-1.36-.18-2H12v3.79h5.39a4.62 4.62 0 0 1-2 3.04v2.51h3.24c1.9-1.75 2.97-4.32 2.97-7.34Z"
                    />
                    <path
                      fill="#0E0B0B"
                      d="M12 22c2.7 0 4.96-.89 6.62-2.43l-3.24-2.51c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.75-5.59-4.11H3.07v2.59A10 10 0 0 0 12 22Z"
                    />
                    <path
                      fill="#0E0B0B"
                      d="M6.41 13.91A6.01 6.01 0 0 1 6.09 12c0-.66.12-1.31.32-1.91V7.5H3.07A9.98 9.98 0 0 0 2 12c0 1.62.39 3.15 1.07 4.5l3.34-2.59Z"
                    />
                    <path
                      fill="#0E0B0B"
                      d="M12 5.96c1.47 0 2.79.5 3.83 1.5l2.87-2.87C16.95 2.98 14.7 2 12 2A10 10 0 0 0 3.07 7.5l3.34 2.59C7.2 7.71 9.4 5.96 12 5.96Z"
                    />
                  </svg>
                  <span>Pay</span>
                </span>
              </div>
              <div className={s.payDivider}>or pay with card</div>
              <span className={s.payCard}>
                Card &middot; Visa / Mastercard / Amex
              </span>
            </div>
          </div>

          {/* Cancellation hairline line */}
          <div className={s.cancel}>
            <span className={s.cancelK}>Cancellation policy</span>
            <p className={s.cancelP}>
              Cancel anytime up to 12 hours before, no penalty.{" "}
              <em>No lock-in on memberships.</em>
            </p>
          </div>

          <div className={s.edgeBot}>
            <span className={s.edgeMeta}>
              Live availability through Hapana
            </span>
            <span className={s.edgeLine} />
            <span className={s.edgeFolio}>End § 01</span>
          </div>
        </div>
      </section>

      {/* ── § 02 — YOUR FIRST CLASS (5 steps, Roman numerals from PR #20) */}
      <section className={s.section} aria-labelledby="booking-s02-title">
        <div className={s.wrap}>
          <div className={s.edgeTop}>
            <span className={s.edgeFolio}>Plate II</span>
            <span className={s.edgeLine} />
            <span className={s.edgeMeta}>
              Minute by minute: what to expect
            </span>
          </div>

          <header className={s.shead}>
            <div className={s.sheadL}>
              <span className={s.sheadNum}>§ 02</span>
              <h2 id="booking-s02-title" className={s.sheadTitle}>
                Your First Class<em>,</em>
              </h2>
              <span className={s.sheadSub}>
                five steps, no surprises, no contact.
              </span>
            </div>
            <div className={s.sheadR}>
              <span className={s.sheadKicker}>Walkthrough</span>
              <span className={s.sheadRule} />
              <span className={s.sheadIndex}>
                I &middot; II &middot; III &middot; IV &middot; V
              </span>
            </div>
          </header>

          <ol className={s.walk}>
            {firstClassSteps.map((step) => (
              <li
                key={step.numeral}
                className={`${s.step}${step.focal ? ` ${s.stepFocal}` : ""}`}
              >
                <span className={s.stepRoman}>
                  <em>{step.numeral}</em>
                </span>
                <span className={s.stepTime}>{step.time}</span>
                <h3 className={s.stepName}>
                  <span className="sr-only">Step {step.numeral} </span>
                  {step.title}
                </h3>
                <span className={s.stepRule} />
                <p className={s.stepBody}>{step.body}</p>
                <span className={s.stepTag}>{step.tag}</span>
              </li>
            ))}
          </ol>

          <div className={s.edgeBot}>
            <span className={s.edgeMeta}>
              Every first class follows this shape
            </span>
            <span className={s.edgeLine} />
            <span className={s.edgeFolio}>End § 02</span>
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE — coach reassurance ──────────────────────────── */}
      <aside className={s.quoteWrap} aria-label="Coach reassurance">
        <div className={s.quote}>
          <span className={s.quoteMark} aria-hidden="true">
            &ldquo;
          </span>
          <div className={s.quoteBody}>
            <span className={s.quoteOverline}>
              Coach voice &middot; pre-class
            </span>
            <blockquote className={s.quoteText}>
              You <em>won&rsquo;t</em> be the worst in the room. Everyone here
              started somewhere. We teach <em>technique first</em>, no
              contact in class one.
            </blockquote>
            <div className={s.quoteAttr}>
              <span className={s.quoteAttrLine} />
              <span className={s.quoteAttrTxt}>
                Head Coach, Arena Bondi
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── § 03 — Phone + email fallback card ──────────────────────── */}
      <section className={s.section} aria-labelledby="booking-s03-title">
        <div className={s.wrap}>
          <div className={s.edgeTop}>
            <span className={s.edgeFolio}>Plate III</span>
            <span className={s.edgeLine} />
            <span className={s.edgeMeta}>
              If the widget won&rsquo;t, talk to a human
            </span>
          </div>

          <header className={s.shead}>
            <div className={s.sheadL}>
              <span className={s.sheadNum}>§ 03</span>
              <h2 id="booking-s03-title" className={s.sheadTitle}>
                Or just call<em>,</em>
              </h2>
              <span className={s.sheadSub}>
                a person picks up between 0530 and 2100.
              </span>
            </div>
            <div className={s.sheadR}>
              <span className={s.sheadKicker}>Two ways</span>
              <span className={s.sheadRule} />
              <span className={s.sheadIndex}>A &middot; B</span>
            </div>
          </header>

          <div className={s.fallback}>
            <div className={s.fallCell}>
              <span className={s.fallKey}>A &middot; Call us</span>
              <span className={s.fallRule} />
              <span className={s.fallOverline}>
                Direct line to the desk
              </span>
              <a className={s.fallNum} href={`tel:${PHONE_E164}`}>
                {PHONE_DISPLAY.split(" ").flatMap((part, i) =>
                  i === 0
                    ? [part]
                    : [
                        <span key={`sep-${i}`} className={s.sep}>
                          &middot;
                        </span>,
                        part,
                      ],
                )}
              </a>
              <span className={s.fallMeta}>
                MON-FRI 05.30 → 21.00
                <br />
                SAT 06.00 → 18.00 &middot; SUN 07.00 → 14.00
                <br />
                <em>Voicemail is read inside the hour during open times.</em>
              </span>
            </div>

            <div className={s.fallCell}>
              <span className={s.fallKey}>B &middot; Email us</span>
              <span className={s.fallRule} />
              <span className={s.fallOverline}>
                For longer notes or gifting
              </span>
              <a
                className={`${s.fallNum} ${s.fallEmail}`}
                href={`mailto:${EMAIL_GENERAL}`}
              >
                {EMAIL_GENERAL.split("@")[0]}
                <span className={s.at}>@</span>
                {EMAIL_GENERAL.split("@")[1]}
              </a>
              <span className={s.fallMeta}>
                Replied within four hours, every day.
                <br />
                <em>
                  For press, corporate sessions, or buying a class as a gift.
                </em>
              </span>
            </div>
          </div>

          <div className={s.edgeBot}>
            <span className={s.edgeMeta}>
              Bookings shouldn&rsquo;t be the hard part
            </span>
            <span className={s.edgeLine} />
            <span className={s.edgeFolio}>End § 03</span>
          </div>
        </div>
      </section>
    </>
  );
}
