/**
 * /timetable — H4ab design-language translation.
 *
 * Order per UX brief Rank 5:
 *   1) Hero (compact, ~600px)
 *   2) § 01 Class Types (placed FIRST — glossary before schedule)
 *   3) § 02 Today (pinned, with NEXT session highlight)
 *   4) § 03 This Week (day-by-day grid, plain-English difficulty captions)
 *   5) § 04 Drop-in (phone CTA)
 *   6) Policy strip (cancel 7d / freeze 3mo / student 15% — locked PR #12)
 *
 * Locked policy values come from PR #12. Real coach names come from
 * lib/trainers.ts (Brendan, Henry, Matt, Zach).
 *
 * Spots-left bars are factual ("8 of 20"), not flashing-red urgency theatre.
 */
import type { Metadata } from "next";
import s from "./timetable.module.css";

export const metadata: Metadata = {
  title: "Class Timetable",
  description:
    "Seven days of boxing sessions at Arena Boxing Bondi. THE WORK, THE LONG ROUND, THE CRAFT and THE OPENER — coach-led, capped at twenty, plainly laid out.",
};

/* ─────────── Static schedule data ──────────────────────────────────── */

type Level = "beg" | "int" | "adv" | "all";

interface SessionCard {
  time: string;       // "06·30" formatted
  duration: string;   // "50m" or "past"
  name: string;
  coach: string;
  level: Level;
  cap: string;
  open: number;       // spots remaining
  total: number;
  waitlist?: boolean;
  past?: boolean;
}

interface DayColumn {
  day: string;
  date: string;
  isToday?: boolean;
  cards: SessionCard[];
}

const BEG_CAP = "Beginner: zero experience needed.";
const INT_CAP = "Some experience helpful — not new to the stance.";
const ADV_CAP = "Advanced: contact/sparring · coach approval.";
const ALL_CAP = "Mixed room — effort sets the pace.";

const todaySessions: (SessionCard & { flag: string; isNext?: boolean })[] = [
  {
    time: "12·00", duration: "50 min · Beginner-friendly", name: "THE WORK",
    coach: "Henry Payten", level: "beg", cap: BEG_CAP,
    open: 12, total: 20, flag: "NEXT", isNext: true,
  },
  {
    time: "18·00", duration: "60 min · All levels", name: "THE LONG ROUND",
    coach: "Matt Bull", level: "all", cap: ALL_CAP,
    open: 6, total: 20, flag: "SOON",
  },
  {
    time: "19·00", duration: "45 min · Advanced · sparring", name: "THE CRAFT",
    coach: "Brendan McDonnell", level: "adv", cap: ADV_CAP,
    open: 9, total: 16, flag: "EVENING",
  },
  {
    time: "06·30", duration: "50 min · Beginner-friendly", name: "THE WORK",
    coach: "Zach Levy", level: "beg", cap: BEG_CAP,
    open: 0, total: 20, flag: "EARLIER · 06.30", past: true,
  },
];

const week: DayColumn[] = [
  {
    day: "MON", date: "25.05.26",
    cards: [
      { time: "06·30", duration: "50m", name: "THE WORK", coach: "Zach Levy", level: "beg", cap: BEG_CAP, open: 4, total: 20 },
      { time: "12·00", duration: "50m", name: "THE WORK", coach: "Henry Payten", level: "beg", cap: BEG_CAP, open: 11, total: 20 },
      { time: "18·00", duration: "60m", name: "THE LONG ROUND", coach: "Matt Bull", level: "all", cap: ALL_CAP, open: 2, total: 20 },
      { time: "19·00", duration: "45m", name: "THE CRAFT", coach: "Brendan McDonnell", level: "adv", cap: ADV_CAP, open: 5, total: 16 },
    ],
  },
  {
    day: "TUE", date: "26.05.26",
    cards: [
      { time: "06·30", duration: "50m", name: "THE WORK", coach: "Brendan McDonnell", level: "beg", cap: BEG_CAP, open: 7, total: 20 },
      { time: "12·00", duration: "50m", name: "THE WORK", coach: "Henry Payten", level: "beg", cap: BEG_CAP, open: 14, total: 20 },
      { time: "18·00", duration: "60m", name: "THE LONG ROUND", coach: "Zach Levy", level: "all", cap: ALL_CAP, open: 0, total: 20, waitlist: true },
      { time: "19·00", duration: "45m", name: "THE CRAFT", coach: "Brendan McDonnell", level: "adv", cap: ADV_CAP, open: 8, total: 16 },
    ],
  },
  {
    day: "WED", date: "27.05.26",
    cards: [
      { time: "06·30", duration: "50m", name: "THE WORK", coach: "Matt Bull", level: "beg", cap: BEG_CAP, open: 9, total: 20 },
      { time: "12·00", duration: "50m", name: "THE WORK", coach: "Henry Payten", level: "beg", cap: BEG_CAP, open: 13, total: 20 },
      { time: "18·00", duration: "60m", name: "THE LONG ROUND", coach: "Zach Levy", level: "all", cap: ALL_CAP, open: 4, total: 20 },
      { time: "19·00", duration: "45m", name: "THE CRAFT", coach: "Brendan McDonnell", level: "adv", cap: ADV_CAP, open: 10, total: 16 },
    ],
  },
  {
    day: "THU", date: "28.05.26", isToday: true,
    cards: [
      { time: "06·30", duration: "past", name: "THE WORK", coach: "Zach Levy", level: "beg", cap: BEG_CAP, open: 0, total: 20, past: true },
      { time: "12·00", duration: "50m", name: "THE WORK", coach: "Henry Payten", level: "beg", cap: BEG_CAP, open: 12, total: 20 },
      { time: "18·00", duration: "60m", name: "THE LONG ROUND", coach: "Matt Bull", level: "all", cap: ALL_CAP, open: 6, total: 20 },
      { time: "19·00", duration: "45m", name: "THE CRAFT", coach: "Brendan McDonnell", level: "adv", cap: ADV_CAP, open: 9, total: 16 },
    ],
  },
  {
    day: "FRI", date: "29.05.26",
    cards: [
      { time: "06·30", duration: "50m", name: "THE WORK", coach: "Brendan McDonnell", level: "beg", cap: BEG_CAP, open: 6, total: 20 },
      { time: "12·00", duration: "50m", name: "THE WORK", coach: "Henry Payten", level: "beg", cap: BEG_CAP, open: 15, total: 20 },
      { time: "18·00", duration: "60m", name: "THE LONG ROUND", coach: "Matt Bull", level: "all", cap: ALL_CAP, open: 0, total: 20, waitlist: true },
      { time: "19·00", duration: "45m", name: "THE CRAFT", coach: "Brendan McDonnell", level: "adv", cap: ADV_CAP, open: 7, total: 16 },
    ],
  },
  {
    day: "SAT", date: "30.05.26",
    cards: [
      { time: "08·00", duration: "50m", name: "THE OPENER", coach: "Henry Payten", level: "int", cap: INT_CAP, open: 8, total: 20 },
      { time: "09·00", duration: "60m", name: "THE LONG ROUND", coach: "Matt Bull", level: "all", cap: ALL_CAP, open: 5, total: 20 },
      { time: "10·30", duration: "45m", name: "THE CRAFT", coach: "Brendan McDonnell", level: "adv", cap: ADV_CAP, open: 6, total: 16 },
    ],
  },
  {
    day: "SUN", date: "31.05.26",
    cards: [
      { time: "09·00", duration: "50m", name: "THE OPENER", coach: "Zach Levy", level: "int", cap: INT_CAP, open: 10, total: 20 },
      { time: "10·00", duration: "60m", name: "THE LONG ROUND", coach: "Henry Payten", level: "all", cap: ALL_CAP, open: 3, total: 20 },
    ],
  },
];

/* ─────────── Helpers ───────────────────────────────────────────────── */

function fillPercent(open: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round(((total - open) / total) * 100);
}

const badgeClass: Record<Level, string> = {
  beg: s.badgeBeg,
  int: s.badgeInt,
  adv: s.badgeAdv,
  all: s.badgeAll,
};

const levelLabel: Record<Level, string> = {
  beg: "Beginner",
  int: "Intermediate",
  adv: "Advanced",
  all: "All levels",
};

/* ─────────── Page ──────────────────────────────────────────────────── */

export default function TimetablePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className={s.hero} aria-labelledby="hero-title">
        <div className={s.heroWrap}>
          <div className={s.heroRailSub}>
            <span className={s.heroKicker}>
              — The week, plainly laid out. Choose your hour. —
            </span>
            <span className={s.heroKickerR}>
              <span className={s.livedot} aria-hidden="true" />
              <span className={s.liveLbl}>LIVE</span>
              <span className={s.sep}>/</span>
              Bondi · Sydney · 33°53′S 151°16′E
            </span>
          </div>

          <div className={s.anchorBlock}>
            <div className={s.anchorSide}>
              <span className={s.anchorSideKey}>§ This page</span>
              <span className={s.anchorSideLine} />
              <span className={s.anchorSideNote}>
                Pinned-today on mobile. Plain-English difficulty.
                <br />
                <em>Visiting Bondi?</em> Drop-in by phone before 10 AM.
              </span>
            </div>
            <div className={s.anchorMain}>
              <span className={s.anchorOverline}>
                — Twenty-seven sessions this week —
              </span>
              <h1 id="hero-title" className={s.anchorWord}>
                TIMETABLE
              </h1>
              <div className={s.anchorSub}>
                <span className={s.anchorSubRule} />
                <span className={s.anchorSubTxt}>
                  <em>find your week,</em>
                </span>
              </div>
            </div>
          </div>

          <div className={s.heroBot}>
            <div className={s.heroBotCell}>
              <span className={s.heroBotK}>This week</span>
              <span className={s.heroBotV}>
                27 <em>sessions</em>
              </span>
            </div>
            <div className={`${s.heroBotCell} ${s.heroBotCellCenter}`}>
              <span className={s.heroBotK}>Open today</span>
              <span className={s.heroBotV}>
                06<em>·</em>30 <em>—</em> 19<em>·</em>00
              </span>
            </div>
            <div className={`${s.heroBotCell} ${s.heroBotCellRight}`}>
              <span className={s.heroBotK}>Cap per session</span>
              <span className={s.heroBotV}>
                20 <em>—</em> personalised attention
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── § 01 CLASS TYPES ──────────────────────────────────────── */}
      <section className={s.section} aria-labelledby="s01-title">
        <div className={s.wrap}>
          <div className={s.edgeTop}>
            <span className={s.edgeFolio}>Plate I</span>
            <span className={s.edgeLine} />
            <span className={s.edgeMeta}>A short glossary — read first, choose later</span>
          </div>

          <header className={s.shead}>
            <div className={s.sheadL}>
              <span className={s.sheadNum}>§ 01</span>
              <h2 id="s01-title" className={s.sheadTitle}>
                The Classes<em>,</em>
              </h2>
              <span className={s.sheadSub}>
                — four formats. One room. Sequenced from gentle to sharp.
              </span>
            </div>
            <div className={s.sheadR}>
              <span className={s.sheadKicker}>Four types</span>
              <span className={s.sheadRule} />
              <span className={s.sheadIndex}>I · II · III · IV</span>
            </div>
          </header>

          <div className={s.types}>
            <article className={s.type}>
              <span className={s.typeNum}>i.</span>
              <h3 className={s.typeName}>THE WORK</h3>
              <span className={s.typeRule} />
              <p className={s.typeDesc}>
                <strong>Foundations and technique — the room you walk into first.</strong>{" "}
                Footwork, stance, the four basic shots. Pad rounds, never sparring.
              </p>
              <div className={s.typeMeta}>
                <span className={s.typeDur}>
                  50 <em>min</em>
                </span>
                <span className={`${s.typeTag} ${s.typeTagBeg}`}>
                  <span className={s.typeTagDot} />
                  Beginner
                </span>
                <span className={s.typeCap}>
                  Zero experience needed — the right starting line.
                </span>
              </div>
            </article>

            <article className={s.type}>
              <span className={s.typeNum}>ii.</span>
              <h3 className={s.typeName}>THE LONG ROUND</h3>
              <span className={s.typeRule} />
              <p className={s.typeDesc}>
                <strong>Sixty minutes of conditioning under the lights.</strong>{" "}
                Heavy bag, pad rounds, skipping, core. Sweat-heavy. Open to all levels.
              </p>
              <div className={s.typeMeta}>
                <span className={s.typeDur}>
                  60 <em>min</em>
                </span>
                <span className={`${s.typeTag} ${s.typeTagAll}`}>
                  <span className={s.typeTagDot} />
                  All levels
                </span>
                <span className={s.typeCap}>
                  Mixed room — your effort, not your record, sets the pace.
                </span>
              </div>
            </article>

            <article className={s.type}>
              <span className={s.typeNum}>iii.</span>
              <h3 className={s.typeName}>THE CRAFT</h3>
              <span className={s.typeRule} />
              <p className={s.typeDesc}>
                <strong>
                  Advanced sparring. Headgear, mouthguard, contact gear required.
                </strong>{" "}
                Coach-paired rounds. The room where reflexes get sharpened against another fighter.
              </p>
              <div className={s.typeMeta}>
                <span className={s.typeDur}>
                  45 <em>min</em>
                </span>
                <span className={`${s.typeTag} ${s.typeTagAdv}`}>
                  <span className={s.typeTagDot} />
                  Advanced
                </span>
                <span className={s.typeCap}>
                  Contact and sparring — coach approval required to enter.
                </span>
              </div>
            </article>

            <article className={s.type}>
              <span className={s.typeNum}>iv.</span>
              <h3 className={s.typeName}>THE OPENER</h3>
              <span className={s.typeRule} />
              <p className={s.typeDesc}>
                <strong>Saturday morning — slower tempo, technique-led.</strong>{" "}
                Bag work, shadow, pad-feedback rounds. The weekend re-set.
              </p>
              <div className={s.typeMeta}>
                <span className={s.typeDur}>
                  50 <em>min</em>
                </span>
                <span className={`${s.typeTag} ${s.typeTagInt}`}>
                  <span className={s.typeTagDot} />
                  Intermediate
                </span>
                <span className={s.typeCap}>
                  Some experience helpful — comfortable on the bag, not new to the stance.
                </span>
              </div>
            </article>
          </div>

          <div className={s.edgeBot}>
            <span className={s.edgeFolio}>— Read once, then choose your week —</span>
            <span className={s.edgeLine} />
            <span className={s.edgeMeta}>I · II · III · IV</span>
          </div>
        </div>
      </section>

      {/* ── § 02 TODAY ─────────────────────────────────────────────── */}
      <section className={s.section} aria-labelledby="s02-title">
        <div className={s.wrap}>
          <div className={s.edgeTop}>
            <span className={s.edgeFolio}>Plate II</span>
            <span className={s.edgeLine} />
            <span className={s.edgeMeta}>
              Today&rsquo;s sessions — pinned for the impatient
            </span>
          </div>

          <header className={s.shead}>
            <div className={s.sheadL}>
              <span className={s.sheadNum}>§ 02</span>
              <h2 id="s02-title" className={s.sheadTitle}>
                Today<em>,</em>
              </h2>
              <span className={s.sheadSub}>
                — what&rsquo;s open right now, in order.
              </span>
            </div>
            <div className={s.sheadR}>
              <span className={s.sheadKicker}>Thu 28.05</span>
              <span className={s.sheadRule} />
              <span className={s.sheadIndex}>4 sessions</span>
            </div>
          </header>

          <div className={s.today}>
            <header className={s.todayHead}>
              <span className={s.todayHeadL}>
                <span className={s.livedot} aria-hidden="true" />
                <strong>NOW</strong>&nbsp;·&nbsp;Next call in 47 min
              </span>
              <span className={s.todayHeadC}>
                — The day, laid out from this hour forward —
              </span>
              <span className={s.todayHeadR}>Thu 28.05.26</span>
            </header>

            <div className={s.todayStrip}>
              {todaySessions.map((sess) => {
                const pct = fillPercent(sess.open, sess.total);
                const classes = [s.session, sess.isNext ? s.sessionIsNext : ""]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <article key={`${sess.time}-${sess.name}`} className={classes}>
                    <div className={s.sessionTop}>
                      <span className={s.sessionTime}>
                        {sess.time.split("·")[0]}
                        <em>·</em>
                        {sess.time.split("·")[1]}
                      </span>
                      <span className={s.sessionFlag}>{sess.flag}</span>
                    </div>
                    <h3 className={s.sessionName}>{sess.name}</h3>
                    <span className={s.sessionDur}>{sess.duration}</span>
                    <div className={s.sessionSpots}>
                      <span className={s.sessionSpotsL}>
                        {sess.past || sess.open === 0 ? "Closed " : "Spots open "}
                        <strong>
                          {sess.past ? sess.total : sess.open} of {sess.total}
                        </strong>
                      </span>
                      <div className={s.sessionBar}>
                        <span
                          className={s.sessionBarFill}
                          style={{
                            width: `${pct}%`,
                            opacity: sess.past ? 0.4 : undefined,
                          }}
                        />
                      </div>
                    </div>
                    <div className={s.sessionBot}>
                      <div className={s.sessionCoach}>
                        <span className={s.sessionCoachK}>Coach</span>
                        <span className={s.sessionCoachV}>{sess.coach}</span>
                      </div>
                      {sess.past ? (
                        <span className={`${s.sessionBook} ${s.sessionBookPast}`}>
                          PAST
                        </span>
                      ) : (
                        <a
                          className={s.sessionBook}
                          href="/booking"
                          aria-label={`Book ${sess.name} at ${sess.time}`}
                        >
                          BOOK →
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className={s.edgeBot}>
            <span className={s.edgeFolio}>
              — A pinned hour, then onward to the week —
            </span>
            <span className={s.edgeLine} />
            <span className={s.edgeMeta}>II of IV</span>
          </div>
        </div>
      </section>

      {/* ── § 03 THIS WEEK ─────────────────────────────────────────── */}
      <section className={s.section} aria-labelledby="s03-title">
        <div className={s.wrap}>
          <div className={s.edgeTop}>
            <span className={s.edgeFolio}>Plate III</span>
            <span className={s.edgeLine} />
            <span className={s.edgeMeta}>The week ahead — read across, pick a date</span>
          </div>

          <header className={s.shead}>
            <div className={s.sheadL}>
              <span className={s.sheadNum}>§ 03</span>
              <h2 id="s03-title" className={s.sheadTitle}>
                This Week<em>,</em>
              </h2>
              <span className={s.sheadSub}>
                — seven days, twenty-seven sessions, plainly listed.
              </span>
            </div>
            <div className={s.sheadR}>
              <span className={s.sheadKicker}>Wk 22 · 25.05 — 31.05</span>
              <span className={s.sheadRule} />
              <span className={s.sheadIndex}>7 days</span>
            </div>
          </header>

          <div className={s.weekbar}>
            {week.map((col) => (
              <div
                key={col.day}
                className={`${s.daycol} ${col.isToday ? s.daycolIsToday : ""}`}
              >
                <div className={s.daycolHead}>
                  <span className={s.daycolChip}>{col.day}</span>
                  <span className={s.daycolDate}>
                    {col.date}
                    {col.isToday ? " · today" : ""}
                  </span>
                </div>
                <div className={s.daycolList}>
                  {col.cards.map((card) => {
                    const pct = fillPercent(card.open, card.total);
                    const cardClasses = [
                      s.card,
                      card.waitlist ? s.cardIsWaitlist : "",
                      card.past ? s.cardIsPast : "",
                    ]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <article
                        key={`${col.day}-${card.time}-${card.name}`}
                        className={cardClasses}
                      >
                        <div className={s.cardTime}>
                          <span className={s.cardTimeV}>
                            {card.time.split("·")[0]}
                            <em>·</em>
                            {card.time.split("·")[1]}
                          </span>
                          <span className={s.cardTimeD}>· {card.duration}</span>
                        </div>
                        <span className={s.cardName}>{card.name}</span>
                        <span className={s.cardCoach}>w/ {card.coach}</span>
                        <span className={`${s.badge} ${badgeClass[card.level]}`}>
                          {levelLabel[card.level]}
                        </span>
                        <span className={s.cardCap}>{card.cap}</span>
                        {card.waitlist && (
                          <span className={s.waitlistTag}>WAITLIST</span>
                        )}
                        <div className={s.cardSpots}>
                          <span className={s.cardSpotsL}>
                            {card.waitlist || card.open === 0
                              ? "Closed "
                              : "Open "}
                            <strong>
                              {card.waitlist ? card.total : card.open} of{" "}
                              {card.total}
                            </strong>
                          </span>
                          <div className={s.cardBar}>
                            <span
                              className={s.cardBarFill}
                              style={{
                                width: card.waitlist ? "100%" : `${pct}%`,
                              }}
                            />
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className={s.weekLegend}>
            <div className={s.weekLegendL}>
              <span className={s.weekLegendK}>Levels</span>
              <span className={`${s.weekLegendI} ${s.weekLegendIBeg}`}>
                Beginner
              </span>
              <span className={`${s.weekLegendI} ${s.weekLegendIInt}`}>
                Intermediate
              </span>
              <span className={`${s.weekLegendI} ${s.weekLegendIAdv}`}>
                Advanced
              </span>
              <span className={`${s.weekLegendI} ${s.weekLegendIAll}`}>
                All levels
              </span>
            </div>
            <span className={s.weekLegendR}>
              — <em>Spots</em> are factual. We don&rsquo;t flash red at you.
            </span>
          </div>

          <div className={s.edgeBot}>
            <span className={s.edgeFolio}>
              — Twenty-seven sessions. Pick your hour. —
            </span>
            <span className={s.edgeLine} />
            <span className={s.edgeMeta}>III of IV</span>
          </div>
        </div>
      </section>

      {/* ── § 04 DROP-IN ───────────────────────────────────────────── */}
      <section className={s.section} aria-labelledby="s04-title">
        <div className={s.wrap}>
          <div className={s.edgeTop}>
            <span className={s.edgeFolio}>Plate IV</span>
            <span className={s.edgeLine} />
            <span className={s.edgeMeta}>Visiting Bondi — drop in by phone</span>
          </div>

          <header className={s.shead}>
            <div className={s.sheadL}>
              <span className={s.sheadNum}>§ 04</span>
              <h2 id="s04-title" className={s.sheadTitle}>
                Drop-in<em>,</em>
              </h2>
              <span className={s.sheadSub}>
                — for the visitor with one morning, not one membership.
              </span>
            </div>
            <div className={s.sheadR}>
              <span className={s.sheadKicker}>Same-day welcome</span>
              <span className={s.sheadRule} />
              <span className={s.sheadIndex}>$45 walk-in</span>
            </div>
          </header>

          <div className={s.dropin}>
            <div className={s.dropinL}>
              <span className={s.dropinOverline}>
                — For tourists, travellers, and the one-time curious —
              </span>
              <h3 className={s.dropinHeadline}>
                Visiting Bondi? <em>Call ahead, drop in.</em>
              </h3>
              <p className={s.dropinSub}>
                We hold a small number of drop-in spots in every public
                session. <em>Phone before 10 AM same-day</em> and we&rsquo;ll
                save you one. No app, no card, no membership. Bring shoes, a
                towel, water. The rest is on the wall.
              </p>
              <span className={s.dropinRule} />
              <div className={s.dropinMeta}>
                <div className={s.dropinMetaI}>
                  <span className={s.dropinMetaK}>Walk-in rate</span>
                  <span className={s.dropinMetaV}>$45 — any single session</span>
                </div>
                <div className={s.dropinMetaI}>
                  <span className={s.dropinMetaK}>First class</span>
                  <span className={s.dropinMetaV}>Free, no card asked</span>
                </div>
                <div className={s.dropinMetaI}>
                  <span className={s.dropinMetaK}>Notice</span>
                  <span className={s.dropinMetaV}>Before 10 AM, same day</span>
                </div>
              </div>
            </div>
            <div className={s.dropinR}>
              <span className={s.dropinPhoneK}>— Pick up the phone. —</span>
              <a className={s.dropinPhone} href="tel:+61400123456">
                +61 <em>·</em> 400 <em>·</em> 123 <em>·</em> 456
              </a>
              <a className={s.dropinCta} href="mailto:hello@arenaboxing.com.au">
                OR EMAIL HELLO @ ARENABOXING.COM.AU
                <span className={s.dropinCtaRule} />
              </a>
            </div>
          </div>

          {/* Policy strip — locked values from PR #12 */}
          <div className={s.policy} aria-label="Membership policies">
            <div className={s.policyCell}>
              <span className={s.policyK}>Cancellation</span>
              <span className={s.policyV}>
                Free up to 7 days before class. No penalty.
              </span>
            </div>
            <div className={s.policyCell}>
              <span className={s.policyK}>Freeze</span>
              <span className={s.policyV}>
                Up to 3 months per year. Travel, injury, life.
              </span>
            </div>
            <div className={s.policyCell}>
              <span className={s.policyK}>Student rate</span>
              <span className={s.policyV}>
                15% off all memberships with valid ID.
              </span>
            </div>
          </div>

          <div className={s.edgeBot}>
            <span className={s.edgeFolio}>
              — Five minutes from the sand. One phone call away. —
            </span>
            <span className={s.edgeLine} />
            <span className={s.edgeMeta}>IV of IV</span>
          </div>
        </div>
      </section>
    </>
  );
}
