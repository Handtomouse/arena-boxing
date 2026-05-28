/**
 * /home — H4ab design-language translation (Task #18).
 *
 * Ports home-page.html mockup into the live route. Preserves PR #22's
 * landmarks: "Book Your First Class — $0" CTA, 3 session cards
 * ("Or Browse This Week"), and the reassurance line
 * "First class on the house. No card required."
 *
 * Sections per spec:
 *   1) HERO — H4ab dark six-voice manifesto
 *      (DON'T / Comfort. / we do not, and we will not, /
 *       PANDER. / WE forge fighters, / FROM RAW WILL)
 *   2) § 01 — VALUES: AUTHENTICITY / EXCELLENCE / COURAGE / COMMUNITY
 *   3) § 02 — THIS WEEK: PR #22 CTA + cards + reassurance
 *   4) § 03 — MEMBERSHIP preview (3 tiers, links to /membership)
 *   5) § 04 — FIND US: Bondi map gradient + address + ENTER THE ARENA CTA
 *
 * Header nav, Footer, and StickyBottomCTA come from layout.tsx — not
 * duplicated here. UX brief Rank 1 surfacing: one trainer face (Brendan,
 * Head Coach) sits inside the hero's left side block as a warmth
 * counterweight to the gothic palette.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import s from "./home.module.css";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Arena Boxing Bondi — six voices, one creed. A boxing room five minutes from the surf. First class on the house. No card required.",
};

// Mock session preview — replaces the live Hapana widget on the homepage.
// Single canonical booking surface lives at /booking (Decision #1).
const upcomingSessions = [
  {
    dow: "THU",
    date: "29.05",
    kicker: "Session · open class",
    name: "THE WORK",
    desc: "Bag rounds, pads in pairs, conditioning circuit. The bread loaf of the week.",
    tag: "Next",
    time: "06",
    timeMin: "30",
    duration: "50 MIN",
    coach: "B. McDonnell",
    studio: "Floor 1",
    spotsOpen: 12,
    spotsTotal: 20,
    fine: "No cancellation after 22.00 prev. day.",
    isNext: true,
    isFeatured: false,
  },
  {
    dow: "FRI",
    date: "30.05",
    kicker: "Session · technical",
    name: "THE CRAFT",
    desc: "Drills, footwork, defensive shapes, one short spar. Slower tempo, sharper edges.",
    tag: "Featured",
    time: "17",
    timeMin: "30",
    duration: "60 MIN",
    coach: "H. Payten",
    studio: "Floor 2",
    spotsOpen: 6,
    spotsTotal: 16,
    fine: "Bring hand wraps. Gloves available.",
    isNext: false,
    isFeatured: true,
  },
  {
    dow: "SAT",
    date: "31.05",
    kicker: "Session · long form",
    name: "THE LONG ROUND",
    desc: "Bigger conditioning block. Pads, bag, hill, back to bag. Coffee after, on the house.",
    tag: "Weekend",
    time: "09",
    timeMin: "00",
    duration: "75 MIN",
    coach: "M. Bull",
    studio: "Floor 1 + Hill",
    spotsOpen: 3,
    spotsTotal: 14,
    fine: "Meet 08.55 in the alley.",
    isNext: false,
    isFeatured: false,
  },
];

function fillPercent(open: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round(((total - open) / total) * 100);
}

export default function HomePage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          SECTION 1 — HERO (H4ab six-voice manifesto)
          ════════════════════════════════════════════════════════════ */}
      <section className={s.hero} aria-labelledby="hero-manifesto">
        <div className={s.heroWrap}>
          {/* Top rail — folio + section index + Unifraktur wordmark */}
          <header className={`${s.rail} ${s.railTop}`}>
            <div className={`${s.railCol} ${s.railColL}`}>
              <span className={s.folio}>
                N<sup>o</sup> 01
                <span className={s.folioSlash}>/</span>
                <span className={s.folioB}>01</span>
              </span>
              <span className={s.railDivider} />
              <span className={s.railMeta}>Night Edition &mdash; MMXXVI</span>
            </div>
            <div className={`${s.railCol} ${s.railColC}`}>
              <nav className={s.railIndex} aria-label="Section index">
                <span>&sect; 01</span>
                <span>&sect; 02</span>
                <span>&sect; 03</span>
                <span>&sect; 04</span>
              </nav>
            </div>
            <div className={`${s.railCol} ${s.railColR}`}>
              <span className={s.wordmark}>Arena</span>
            </div>
          </header>

          {/* Sub-rail — kicker + LIVE pulse */}
          <div className={`${s.rail} ${s.railSub}`}>
            <span className={s.kicker}>
              &mdash; A Manifesto in Six Voices, after dark &mdash;
            </span>
            <span className={s.kickerR}>
              <span className={s.livedot} aria-hidden="true" />
              <span className={s.liveLbl}>LIVE</span>
              <span className={s.sep}>/</span>
              Bondi &middot; Sydney &middot; 33&deg;53&prime;S 151&deg;16&prime;E
            </span>
          </div>

          {/* Manifesto stack (six voices) */}
          <div className={s.stack} id="hero-manifesto">
            <div className={`${s.ln} ${s.ln1}`}>
              <span className={s.lnSide}>
                <em>Read it once.</em>
                <br />
                <em>Then read it slower.</em>
              </span>
              <h1
                className={`${s.lnText} ${s.tBebasMassive} ${s.tCream}`}
                aria-label="Don't"
              >
                DON&rsquo;T
              </h1>
            </div>

            <div className={`${s.cut} ${s.cut1}`}>
              <span className={s.cutLine} />
              <span className={s.cutMark}>I.</span>
              <span className={s.cutLine} />
            </div>

            <div className={`${s.ln} ${s.ln2}`}>
              <h2 className={`${s.lnText} ${s.tFraktur}`}>Comfort.</h2>
              <span className={s.lnTag}>
                <span className={s.lnTagNum}>02</span>
                <span className={s.lnTagTxt}>
                  &mdash; A soft room makes a soft fighter.
                </span>
              </span>
            </div>

            <div className={`${s.ln} ${s.ln3}`}>
              <span className={s.ln3Rule} />
              <em className={s.tCormorantItalic}>we do not, and we will not,</em>
              <span className={s.ln3Rule} />
            </div>

            <div className={`${s.ln} ${s.ln4}`}>
              <h2
                className={`${s.lnText} ${s.tBebasMega} ${s.tCream}`}
                aria-label="Pander."
              >
                PANDER.
              </h2>
            </div>

            <div className={`${s.cut} ${s.cut2}`}>
              <span className={s.cutLine} />
              <span className={s.cutMark}>II.</span>
              <span className={s.cutLine} />
            </div>

            <div className={`${s.ln} ${s.ln5}`}>
              <span className={s.ln5Pre}>WE</span>
              <h3 className={`${s.lnText} ${s.tCormorantScript}`}>
                forge fighters,
              </h3>
            </div>

            <div className={`${s.ln} ${s.ln6}`}>
              <h2
                className={`${s.lnText} ${s.tBebasOutline}`}
                aria-label="from raw will"
              >
                FROM RAW WILL
              </h2>
            </div>
          </div>

          {/* Bottom rail — byline + trainer face + CTA */}
          <footer className={`${s.rail} ${s.railBot}`}>
            <div className={s.byline}>
              <span className={s.bylineMark}>&para;</span>
              <div>
                <p>
                  Six lines. One creed. <em>Those who dare</em> step under
                  the rope at five-thirty sharp &mdash; no questions, no
                  soft landings, no promise except a sharper version of
                  yourself by sunrise.
                </p>
                {/* Trainer face — UX brief Rank 1 warmth counterweight */}
                <Link
                  href="/about"
                  className={s.trainerCard}
                  aria-label="Brendan McDonnell, Head Coach"
                >
                  <Image
                    src="/images/trainers/brendan-mcdonnell.jpg"
                    alt="Brendan McDonnell, Head Coach at Arena Boxing Bondi"
                    width={56}
                    height={56}
                    className={s.trainerImg}
                  />
                  <span className={s.trainerMeta}>
                    <span className={s.trainerName}>Brendan McDonnell</span>
                    <span className={s.trainerTitle}>Head Coach</span>
                  </span>
                </Link>
              </div>
            </div>

            <div className={s.ctaBlock}>
              <span className={s.ctaOverline}>&mdash; Begin &mdash;</span>
              <Link href="/booking" className={s.cta}>
                Enter the Arena
              </Link>
              <span className={s.ctaUnderline}>
                First class on the house.
              </span>
            </div>
          </footer>

          {/* Edge rail — site bottom landmarks */}
          <div className={s.edgeRail}>
            <span>Est. MMXXV</span>
            <span className={s.dot}>&middot;</span>
            <span>Bondi Beach</span>
            <span className={s.dot}>&middot;</span>
            <span>Open 0530 &mdash; 2100, Daily</span>
            <span className={s.spacer} />
            <span className={s.folioEnd}>Six voices, one creed.</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 2 — § 01 VALUES (Four Pillars)
          ════════════════════════════════════════════════════════════ */}
      <section className={s.section} aria-labelledby="s01-title">
        <div className={s.wrap}>
          <div className={s.edgeTop}>
            <span className={s.edgeFolio}>Plate II</span>
            <span className={s.edgeLine} />
            <span className={s.edgeMeta}>After the manifesto, the pillars.</span>
          </div>

          <header className={s.shead}>
            <div className={s.sheadL}>
              <span className={s.sheadNum}>&sect; 01</span>
              <h2 id="s01-title" className={s.sheadTitle}>
                Our Values<em>,</em>
              </h2>
              <span className={s.sheadSub}>
                &mdash; the bones beneath the gloves.
              </span>
            </div>
            <div className={s.sheadR}>
              <span className={s.sheadKicker}>Four Pillars</span>
              <span className={s.sheadRule} />
              <span className={s.sheadIndex}>I &middot; II &middot; III &middot; IV</span>
            </div>
          </header>

          <div className={s.pillars}>
            <article className={s.pillar}>
              <span className={s.pillarNum}>
                <em>I.</em>
              </span>
              <span className={s.pillarKey}>Pillar one</span>
              <h3 className={s.pillarName}>AUTHENTICITY</h3>
              <span className={s.pillarRule} />
              <p className={s.pillarBody}>
                No gimmicks. No trends. Just honest training in an environment
                that respects the sport &mdash; and the people who turn up to
                do it.
              </p>
              <span className={s.pillarTag}>
                Trad. boxing &middot; no chrome, no neon
              </span>
            </article>

            <article className={`${s.pillar} ${s.pillarFocal}`}>
              <span className={s.pillarNum}>
                <em>II.</em>
              </span>
              <span className={s.pillarKey}>Pillar two</span>
              <h3 className={s.pillarName}>EXCELLENCE</h3>
              <span className={s.pillarRule} />
              <p className={s.pillarBody}>
                Standards stay sharp. Every session is built, watched,
                corrected. We will not let you waste the hour you came here
                to spend.
              </p>
              <div className={s.pillarFocalBlock}>
                <span className={s.pillarSquare} aria-hidden="true" />
                <span className={s.pillarTag}>
                  Index mark &middot; the only red here.
                </span>
              </div>
            </article>

            <article className={s.pillar}>
              <span className={s.pillarNum}>
                <em>III.</em>
              </span>
              <span className={s.pillarKey}>Pillar three</span>
              <h3 className={s.pillarName}>COURAGE</h3>
              <span className={s.pillarRule} />
              <p className={s.pillarBody}>
                Step under the rope on the days you don&rsquo;t want to.
                That&rsquo;s the only training that compounds. The rest is
                theatre.
              </p>
              <span className={s.pillarTag}>
                Show up &middot; especially when reluctant
              </span>
            </article>

            <article className={s.pillar}>
              <span className={s.pillarNum}>
                <em>IV.</em>
              </span>
              <span className={s.pillarKey}>Pillar four</span>
              <h3 className={s.pillarName}>COMMUNITY</h3>
              <span className={s.pillarRule} />
              <p className={s.pillarBody}>
                You earn your place by sweating next to the same people for
                long enough that they expect you tomorrow. The room is the
                medicine.
              </p>
              <span className={s.pillarTag}>
                Bondi locals &middot; honest company
              </span>
            </article>
          </div>

          <div className={s.edgeBot}>
            <span className={s.edgeMeta}>&mdash; Those who dare &mdash;</span>
            <span className={s.edgeLine} />
            <span className={s.edgeFolio}>End &sect; 01</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 3 — § 02 THIS WEEK (PR #22 landmarks preserved)
          ════════════════════════════════════════════════════════════ */}
      <section className={s.section} aria-labelledby="s02-title">
        <div className={s.wrap}>
          <div className={s.edgeTop}>
            <span className={s.edgeFolio}>Plate III</span>
            <span className={s.edgeLine} />
            <span className={s.edgeMeta}>Service log &middot; current cycle</span>
          </div>

          <header className={s.shead}>
            <div className={s.sheadL}>
              <span className={s.sheadNum}>&sect; 02</span>
              <h2 id="s02-title" className={s.sheadTitle}>
                This Week<em>,</em>
              </h2>
              <span className={s.sheadSub}>
                &mdash; pick a session, then turn up.
              </span>
            </div>
            <div className={s.sheadR}>
              <span className={s.sheadKicker}>Timetable</span>
              <span className={s.sheadRule} />
              <Link href="/timetable" className={s.sheadLink}>
                View all &rarr;
              </Link>
            </div>
          </header>

          {/* Primary "Book Your First Class — $0" CTA (preserved from PR #22) */}
          <div className={s.bookFirst}>
            <span className={s.bookFirstOverline}>
              &mdash; Begin here &mdash;
            </span>
            <Link href="/booking" className={s.bookFirstBtn}>
              Book Your First Class &mdash; $0
            </Link>
            <span className={s.bookFirstFine}>
              No card required. No commitment. No follow-up.
            </span>
          </div>

          {/* "Or Browse This Week" subhead (preserved from PR #22) */}
          <h3 className={s.orBrowse}>Or Browse This Week</h3>

          {/* LIVE / NEXT meta strip */}
          <div className={s.weekMeta}>
            <span className={s.weekMetaL}>
              <span className={s.livedot} aria-hidden="true" />
              Next call &middot; <strong>Thu 29.05 &middot; 06.30</strong>
            </span>
            <span className={s.weekMetaC}>
              Three slots shown &middot; twelve more on the wall
            </span>
            <span className={s.weekMetaR}>As of 0530 AEST</span>
          </div>

          {/* Session cards 3-up */}
          <div className={s.sessions}>
            {upcomingSessions.map((sess) => {
              const fillPct = fillPercent(sess.spotsOpen, sess.spotsTotal);
              const wrapClasses = [
                s.session,
                sess.isNext ? s.sessionNext : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <Link
                  key={`${sess.dow}-${sess.time}-${sess.name}`}
                  href="/booking"
                  className={wrapClasses}
                  aria-label={`Book ${sess.name} on ${sess.dow} ${sess.date} at ${sess.time}.${sess.timeMin}`}
                >
                  <header className={s.sessionHead}>
                    <div className={s.sessionDay}>
                      <span className={s.sessionDow}>{sess.dow}</span>
                      <span className={s.sessionDate}>{sess.date}</span>
                    </div>
                    <div className={s.sessionMeta}>
                      <span
                        className={`${s.sessionTag} ${
                          sess.isFeatured ? s.sessionTagCraft : ""
                        }`}
                      >
                        {sess.isFeatured && (
                          <span
                            className={s.sessionSquare}
                            aria-hidden="true"
                          />
                        )}
                        {sess.tag}
                      </span>
                      <span className={s.sessionTime}>
                        {sess.time}
                        <span className={s.sep}>.</span>
                        {sess.timeMin}
                      </span>
                      <span className={s.sessionDur}>{sess.duration}</span>
                    </div>
                  </header>

                  <div className={s.sessionBody}>
                    <span className={s.sessionKicker}>{sess.kicker}</span>
                    <h4 className={s.sessionName}>{sess.name}</h4>
                    <p className={s.sessionDesc}>{sess.desc}</p>
                  </div>

                  <div className={s.sessionGrid}>
                    <div className={s.sessionCell}>
                      <span className={s.sessionCellK}>Coach</span>
                      <span className={s.sessionCellV}>{sess.coach}</span>
                    </div>
                    <div className={s.sessionCell}>
                      <span className={s.sessionCellK}>Studio</span>
                      <span className={s.sessionCellV}>{sess.studio}</span>
                    </div>
                    <div className={`${s.sessionCell} ${s.sessionCellSpots}`}>
                      <span className={s.sessionCellK}>Spots</span>
                      <span className={s.sessionCellV}>
                        {sess.spotsOpen} <em>of</em> {sess.spotsTotal}
                      </span>
                      <span className={s.sessionBar} aria-hidden="true">
                        <span
                          className={s.sessionBarFill}
                          style={{ width: `${fillPct}%` }}
                        />
                      </span>
                    </div>
                  </div>

                  <footer className={s.sessionFoot}>
                    <span className={s.sessionBook}>Book &rarr;</span>
                    <span className={s.sessionFine}>{sess.fine}</span>
                  </footer>
                </Link>
              );
            })}
          </div>

          {/* Reassurance line (preserved from PR #22) */}
          <p className={s.reassurance}>
            <Link href="/booking" className={s.reassuranceLink}>
              <em>First class on the house. No card required.</em>
            </Link>
          </p>

          <div className={s.edgeBot}>
            <span className={s.edgeMeta}>
              &mdash; Twelve more sessions on the wall &mdash;
            </span>
            <span className={s.edgeLine} />
            <span className={s.edgeFolio}>End &sect; 02</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 4 — § 03 MEMBERSHIP (three tiers, links to /membership)
          ════════════════════════════════════════════════════════════ */}
      <section className={s.section} aria-labelledby="s03-title">
        <div className={s.wrap}>
          <div className={s.edgeTop}>
            <span className={s.edgeFolio}>Plate IV</span>
            <span className={s.edgeLine} />
            <span className={s.edgeMeta}>Three paths &middot; one room</span>
          </div>

          <header className={s.shead}>
            <div className={s.sheadL}>
              <span className={s.sheadNum}>&sect; 03</span>
              <h2 id="s03-title" className={s.sheadTitle}>
                Membership<em>,</em>
              </h2>
              <span className={s.sheadSub}>
                &mdash; pay the way that fits.
              </span>
            </div>
            <div className={s.sheadR}>
              <span className={s.sheadKicker}>Three Paths</span>
              <span className={s.sheadRule} />
              <Link href="/membership" className={s.sheadLink}>
                Full details &rarr;
              </Link>
            </div>
          </header>

          <div className={s.tiers}>
            {/* TIER A — DROP IN */}
            <article className={s.tier}>
              <span className={s.tierLetter}>
                <em>A.</em>
              </span>
              <span className={s.tierKicker}>Single session</span>
              <h3 className={s.tierName}>DROP IN</h3>
              <div className={s.tierPrice}>
                <span className={s.tierAmount}>$45</span>
                <span className={s.tierUnit}>/SESSION</span>
              </div>
              <span className={s.tierBreak}>
                Walk-in rate &middot; no commitment.
              </span>
              <ul className={s.tierList}>
                <li>
                  <span className={s.tierLiNum}>01</span>
                  One class, any time
                </li>
                <li>
                  <span className={s.tierLiNum}>02</span>
                  No contract, no follow-up
                </li>
                <li>
                  <span className={s.tierLiNum}>03</span>
                  Phone before 10 AM same-day
                </li>
                <li>
                  <span className={s.tierLiNum}>04</span>
                  Same coaches, same standard
                </li>
              </ul>
              <Link href="/membership" className={s.tierCta}>
                Read more &rarr;
              </Link>
              <span className={s.tierFoot}>
                Visitors, travellers, the one-time curious.
              </span>
            </article>

            {/* TIER B — UNLIMITED (recommended) */}
            <article className={`${s.tier} ${s.tierRec}`}>
              <span className={s.tierRecRule} />
              <span className={s.tierRecTag}>Recommended</span>
              <span className={s.tierLetter}>
                <em>B.</em>
              </span>
              <span className={s.tierKicker}>Every session, every day</span>
              <h3 className={s.tierName}>UNLIMITED</h3>
              <div className={`${s.tierPrice} ${s.tierPriceRec}`}>
                <span className={s.tierAmount}>$240</span>
                <span className={s.tierUnit}>/MONTH</span>
              </div>
              <span className={s.tierBreak}>
                Breakeven at 6 sessions/mo &mdash; less than $10 a class
                if you show up 25+ times.
              </span>
              <ul className={s.tierList}>
                <li>
                  <span className={s.tierLiNum}>01</span>
                  Every session, every coach
                </li>
                <li>
                  <span className={s.tierLiNum}>02</span>
                  Cancel any time, no fee
                </li>
                <li>
                  <span className={s.tierLiNum}>03</span>
                  Freeze up to 3 months / year
                </li>
                <li>
                  <span className={s.tierLiNum}>04</span>
                  Student rate: 15% off with ID
                </li>
              </ul>
              <Link
                href="/membership"
                className={`${s.tierCta} ${s.tierCtaRec}`}
              >
                Start &rarr;
              </Link>
              <span className={s.tierFoot}>
                Month-to-month &middot; cancel any time, no fee.
              </span>
            </article>

            {/* TIER C — 10 CLASS PACK */}
            <article className={s.tier}>
              <span className={s.tierLetter}>
                <em>C.</em>
              </span>
              <span className={s.tierKicker}>Ten sessions, your pace</span>
              <h3 className={s.tierName}>10 CLASS PACK</h3>
              <div className={s.tierPrice}>
                <span className={s.tierAmount}>$380</span>
                <span className={s.tierUnit}>/10 PACK</span>
              </div>
              <span className={s.tierBreak}>
                $38/class &mdash; $7 less than drop-in, no monthly tie.
              </span>
              <ul className={s.tierList}>
                <li>
                  <span className={s.tierLiNum}>01</span>
                  Ten sessions, use as you go
                </li>
                <li>
                  <span className={s.tierLiNum}>02</span>
                  Three-month validity
                </li>
                <li>
                  <span className={s.tierLiNum}>03</span>
                  Share one with a friend
                </li>
                <li>
                  <span className={s.tierLiNum}>04</span>
                  Stack with another pack any time
                </li>
              </ul>
              <Link href="/membership" className={s.tierCta}>
                Buy &rarr;
              </Link>
              <span className={s.tierFoot}>
                For the regular who isn&rsquo;t ready for unlimited.
              </span>
            </article>
          </div>

          <div className={s.tierByline}>
            <span className={s.tierBylineMark}>&para;</span>
            <p>
              Every tier walks into the same room. <em>Those who dare</em>{" "}
              just pay the way that lets them keep showing up. Cancel any
              time, no fee.
            </p>
          </div>

          <div className={s.edgeBot}>
            <span className={s.edgeMeta}>
              &mdash; Refer a friend, get one week free &mdash;
            </span>
            <span className={s.edgeLine} />
            <span className={s.edgeFolio}>End &sect; 03</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 5 — § 04 FIND US (map + address + ENTER THE ARENA)
          ════════════════════════════════════════════════════════════ */}
      <section className={s.section} aria-labelledby="s04-title">
        <div className={s.wrap}>
          <div className={s.edgeTop}>
            <span className={s.edgeFolio}>Plate V</span>
            <span className={s.edgeLine} />
            <span className={s.edgeMeta}>Find us &middot; open daily</span>
          </div>

          <header className={s.shead}>
            <div className={s.sheadL}>
              <span className={s.sheadNum}>&sect; 04</span>
              <h2 id="s04-title" className={s.sheadTitle}>
                Find Us<em>,</em>
              </h2>
              <span className={s.sheadSub}>
                &mdash; a short walk from the surf.
              </span>
            </div>
            <div className={s.sheadR}>
              <span className={s.sheadKicker}>
                Bondi &middot; 5 min from the beach
              </span>
              <span className={s.sheadRule} />
              <span className={s.sheadIndex}>
                33&deg;53&prime;S 151&deg;16&prime;E
              </span>
            </div>
          </header>

          <div className={s.locGrid}>
            {/* Map — CSS aerial stand-in */}
            <div className={s.map}>
              <div className={s.mapFrame}>
                <span className={`${s.mapCorner} ${s.mapCornerTl}`} />
                <span className={`${s.mapCorner} ${s.mapCornerTr}`} />
                <span className={`${s.mapCorner} ${s.mapCornerBl}`} />
                <span className={`${s.mapCorner} ${s.mapCornerBr}`} />

                <span className={`${s.mapLabel} ${s.mapLabelBeach}`}>
                  BONDI BEACH
                </span>
                <span className={`${s.mapLabel} ${s.mapLabelOcean}`}>
                  TASMAN SEA
                </span>
                <span className={`${s.mapLabel} ${s.mapLabelPark}`}>
                  BONDI PARK
                </span>
                <span className={`${s.mapLabel} ${s.mapLabelPde}`}>
                  CAMPBELL PDE
                </span>
                <span className={`${s.mapLabel} ${s.mapLabelRd}`}>
                  CURLEWIS ST
                </span>

                <svg
                  className={s.mapCoast}
                  viewBox="0 0 600 400"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M -20 60 Q 200 140 360 220 T 660 360"
                    fill="none"
                    stroke="#E8DDD3"
                    strokeWidth="1"
                    opacity=".5"
                  />
                  <path
                    d="M -20 80 Q 200 160 360 240 T 660 380"
                    fill="none"
                    stroke="#E8DDD3"
                    strokeWidth="1"
                    opacity=".25"
                  />
                  <line x1="0" y1="180" x2="600" y2="180" stroke="#E8DDD3" strokeWidth=".6" opacity=".22" />
                  <line x1="0" y1="240" x2="600" y2="240" stroke="#E8DDD3" strokeWidth=".6" opacity=".18" />
                  <line x1="0" y1="300" x2="600" y2="300" stroke="#E8DDD3" strokeWidth=".6" opacity=".22" />
                  <line x1="160" y1="0" x2="160" y2="400" stroke="#E8DDD3" strokeWidth=".6" opacity=".18" />
                  <line x1="300" y1="0" x2="300" y2="400" stroke="#E8DDD3" strokeWidth=".6" opacity=".22" />
                  <line x1="440" y1="0" x2="440" y2="400" stroke="#E8DDD3" strokeWidth=".6" opacity=".18" />
                </svg>

                <div className={s.mapPin}>
                  <span className={s.mapPinRing} aria-hidden="true" />
                  <span className={s.mapPinDot} aria-hidden="true" />
                  <span className={s.mapPinLabel}>
                    <span className={s.mapPinKey}>A.B.B / 01</span>
                    <span className={s.mapPinName}>
                      Arena &middot; You are here
                    </span>
                  </span>
                </div>

                <div className={s.mapScale}>
                  <span className={s.mapScaleBar} />
                  <span className={s.mapScaleLabel}>
                    0 &middot; 200m
                  </span>
                </div>

                <div className={s.mapCompass}>
                  <span className={s.mapCompassN}>N</span>
                  <span className={s.mapCompassLine} />
                </div>

                <span className={s.mapStamp}>
                  Plate V &middot; Bondi &middot; 1:8000
                </span>
              </div>
            </div>

            {/* Details column */}
            <aside className={s.locDetails}>
              <div className={s.locBlock}>
                <span className={s.locKey}>Address</span>
                <span className={s.locRule} />
                <p className={s.locVal}>
                  204 Campbell Parade
                  <br />
                  Bondi Beach NSW 2026
                  <br />
                  Sydney &middot; Australia
                </p>
              </div>

              <div className={s.locBlock}>
                <span className={s.locKey}>Hours</span>
                <span className={s.locRule} />
                <div className={s.locHours}>
                  <span className={s.locHoursRow}>
                    <span>MON &mdash; FRI</span>
                    <span>
                      05<em>&middot;</em>30 &rarr; 21<em>&middot;</em>00
                    </span>
                  </span>
                  <span className={s.locHoursRow}>
                    <span>SAT</span>
                    <span>
                      06<em>&middot;</em>00 &rarr; 18<em>&middot;</em>00
                    </span>
                  </span>
                  <span className={s.locHoursRow}>
                    <span>SUN</span>
                    <span>
                      07<em>&middot;</em>00 &rarr; 14<em>&middot;</em>00
                    </span>
                  </span>
                </div>
              </div>

              <div className={s.locBlock}>
                <span className={s.locKey}>Getting here</span>
                <span className={s.locRule} />
                <div className={s.locTransport}>
                  <span className={s.locTrRow}>
                    <span className={s.locTrK}>Bus</span>
                    <span className={s.locTrV}>
                      333 &middot; 380 &middot; 381 &mdash; stop opposite
                    </span>
                  </span>
                  <span className={s.locTrRow}>
                    <span className={s.locTrK}>Walk</span>
                    <span className={s.locTrV}>
                      5 min from the south end of the beach
                    </span>
                  </span>
                  <span className={s.locTrRow}>
                    <span className={s.locTrK}>Park</span>
                    <span className={s.locTrV}>
                      Curlewis St &middot; 2hr free, then meter
                    </span>
                  </span>
                  <span className={s.locTrRow}>
                    <span className={s.locTrK}>Bike</span>
                    <span className={s.locTrV}>
                      Rack at the front &middot; 6 hooks inside
                    </span>
                  </span>
                </div>
              </div>
            </aside>
          </div>

          {/* ENTER THE ARENA — final CTA block */}
          <div className={s.locCta}>
            <div className={s.locCtaL}>
              <span className={s.locCtaOverline}>&mdash; Begin &mdash;</span>
              <h2 className={s.locCtaAnchor}>ENTER THE ARENA</h2>
              <span className={s.locCtaUnderline} />
              <span className={s.locCtaSub}>
                First class on the house. No commitment, no follow-up.
              </span>
            </div>
            <div className={s.locCtaR}>
              <em className={s.locCtaCounter}>those who dare,</em>
              <span className={s.locCtaMeta}>
                step under the rope at 05.30 sharp.
              </span>
              <Link href="/booking" className={s.locCtaBtn}>
                Book now &rarr;
              </Link>
            </div>
          </div>

          <div className={s.edgeBot}>
            <span className={s.edgeMeta}>
              &mdash; Six voices, one creed &mdash;
            </span>
            <span className={s.edgeLine} />
            <span className={s.edgeFolio}>End &sect; 04</span>
          </div>
        </div>
      </section>
    </>
  );
}
