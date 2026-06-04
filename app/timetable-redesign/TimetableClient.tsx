"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import sk from "@/components/redesign/skin.module.css";
import s from "./timetable-redesign.module.css";

/* ── data (mirrors the live /timetable static schedule) ───────────────── */
type Level = "beg" | "int" | "adv" | "all";

interface ClassCard {
  time: string;
  name: string;
  coach: string;
  level: Level;
  open: number;
  total: number;
  waitlist?: boolean;
  past?: boolean;
}
interface Day {
  day: string;
  date: string;
  today?: boolean;
  cards: ClassCard[];
}

const LEVEL_LABEL: Record<Level, string> = {
  beg: "Beginner",
  int: "Intermediate",
  adv: "Advanced",
  all: "All levels",
};

const CLASS_INFO: Record<
  string,
  { dur: string; level: Level; intensity: string; desc: string; floor: string }
> = {
  "THE WORK": {
    dur: "50 min",
    level: "beg",
    intensity: "Moderate",
    desc: "The foundation class. Stance, footwork, the first combinations and defence, drilled at your pace. Where everyone starts.",
    floor: "Floor 1",
  },
  "THE LONG ROUND": {
    dur: "60 min",
    level: "all",
    intensity: "High",
    desc: "Conditioning rounds that teach your lungs to keep up with your hands. Sixty minutes, all levels, no hiding.",
    floor: "Floor 1",
  },
  "THE CRAFT": {
    dur: "45 min",
    level: "adv",
    intensity: "High · contact",
    desc: "Controlled sparring under a coach's eye. Advanced and by approval, where everything you've drilled finally gets tested.",
    floor: "Floor 1",
  },
  "THE OPENER": {
    dur: "50 min",
    level: "int",
    intensity: "Moderate",
    desc: "The weekend on-ramp. Technique first, sweat second, the friendliest room to walk into cold.",
    floor: "Floor 1",
  },
};

const WEEK: Day[] = [
  { day: "MON", date: "25.05", cards: [
    { time: "06·30", name: "THE WORK", coach: "Zach Levy", level: "beg", open: 4, total: 20 },
    { time: "12·00", name: "THE WORK", coach: "Henry Payten", level: "beg", open: 11, total: 20 },
    { time: "18·00", name: "THE LONG ROUND", coach: "Matt Bull", level: "all", open: 2, total: 20 },
    { time: "19·00", name: "THE CRAFT", coach: "Brendan McDonnell", level: "adv", open: 5, total: 16 },
  ]},
  { day: "TUE", date: "26.05", cards: [
    { time: "06·30", name: "THE WORK", coach: "Brendan McDonnell", level: "beg", open: 7, total: 20 },
    { time: "12·00", name: "THE WORK", coach: "Henry Payten", level: "beg", open: 14, total: 20 },
    { time: "18·00", name: "THE LONG ROUND", coach: "Zach Levy", level: "all", open: 0, total: 20, waitlist: true },
    { time: "19·00", name: "THE CRAFT", coach: "Brendan McDonnell", level: "adv", open: 8, total: 16 },
  ]},
  { day: "WED", date: "27.05", cards: [
    { time: "06·30", name: "THE WORK", coach: "Matt Bull", level: "beg", open: 9, total: 20 },
    { time: "12·00", name: "THE WORK", coach: "Henry Payten", level: "beg", open: 13, total: 20 },
    { time: "18·00", name: "THE LONG ROUND", coach: "Zach Levy", level: "all", open: 4, total: 20 },
    { time: "19·00", name: "THE CRAFT", coach: "Brendan McDonnell", level: "adv", open: 10, total: 16 },
  ]},
  { day: "THU", date: "28.05", today: true, cards: [
    { time: "06·30", name: "THE WORK", coach: "Zach Levy", level: "beg", open: 0, total: 20, past: true },
    { time: "12·00", name: "THE WORK", coach: "Henry Payten", level: "beg", open: 12, total: 20 },
    { time: "18·00", name: "THE LONG ROUND", coach: "Matt Bull", level: "all", open: 6, total: 20 },
    { time: "19·00", name: "THE CRAFT", coach: "Brendan McDonnell", level: "adv", open: 9, total: 16 },
  ]},
  { day: "FRI", date: "29.05", cards: [
    { time: "06·30", name: "THE WORK", coach: "Brendan McDonnell", level: "beg", open: 6, total: 20 },
    { time: "12·00", name: "THE WORK", coach: "Henry Payten", level: "beg", open: 15, total: 20 },
    { time: "18·00", name: "THE LONG ROUND", coach: "Matt Bull", level: "all", open: 0, total: 20, waitlist: true },
    { time: "19·00", name: "THE CRAFT", coach: "Brendan McDonnell", level: "adv", open: 7, total: 16 },
  ]},
  { day: "SAT", date: "30.05", cards: [
    { time: "08·00", name: "THE OPENER", coach: "Henry Payten", level: "int", open: 8, total: 20 },
    { time: "09·00", name: "THE LONG ROUND", coach: "Matt Bull", level: "all", open: 5, total: 20 },
    { time: "10·30", name: "THE CRAFT", coach: "Brendan McDonnell", level: "adv", open: 6, total: 16 },
  ]},
  { day: "SUN", date: "31.05", cards: [
    { time: "09·00", name: "THE OPENER", coach: "Zach Levy", level: "int", open: 10, total: 20 },
    { time: "10·00", name: "THE LONG ROUND", coach: "Henry Payten", level: "all", open: 3, total: 20 },
  ]},
];

const FILTERS: { key: Level | "all-classes"; label: string }[] = [
  { key: "all-classes", label: "All" },
  { key: "beg", label: "Beginner" },
  { key: "int", label: "Intermediate" },
  { key: "all", label: "All levels" },
  { key: "adv", label: "Advanced" },
];

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");

function spotsLabel(c: ClassCard) {
  if (c.past) return { text: "Finished", cls: "" };
  if (c.waitlist || c.open === 0) return { text: "Waitlist", cls: s.spotsNone };
  if (c.open <= 3) return { text: `${c.open} of ${c.total} left`, cls: s.spotsLow };
  return { text: `${c.open} of ${c.total} left`, cls: "" };
}

export default function TimetableClient() {
  const [filter, setFilter] = useState<Level | "all-classes">("all-classes");
  const [active, setActive] = useState<(ClassCard & { date: string }) | null>(null);

  const openClass = useCallback((c: ClassCard, date: string) => setActive({ ...c, date }), []);
  const close = useCallback(() => {
    setActive(null);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  // deep-link / headless support: ?class=the-work opens that class on load
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("class");
    if (!param) return;
    for (const d of WEEK) {
      const hit = d.cards.find((c) => slugify(c.name) === param && !c.past);
      if (hit) {
        setActive({ ...hit, date: d.date });
        break;
      }
    }
  }, []);

  // escape to close + lock scroll while open
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, close]);

  const info = active ? CLASS_INFO[active.name] : null;

  return (
    <>
      {/* filter controls */}
      <div className={s.controls}>
        <span className={s.controlsKey}>This week &middot; Filter</span>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`${s.chip}${filter === f.key ? ` ${s.chipOn}` : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* week grid */}
      <div className={s.grid}>
        {WEEK.map((d) => (
          <div key={d.day} className={s.col}>
            <div className={`${s.dayHead}${d.today ? ` ${s.today}` : ""}`}>
              <span className={`${s.dayName}${d.today ? ` ${s.today}` : ""}`}>{d.day}</span>{" "}
              <span className={s.dayDate}>{d.date}</span>
            </div>
            {d.cards.map((c, i) => {
              const dim = filter !== "all-classes" && c.level !== filter;
              const sp = spotsLabel(c);
              return (
                <button
                  key={`${c.time}-${i}`}
                  type="button"
                  onClick={() => openClass(c, d.date)}
                  className={`${s.class}${dim ? ` ${s.classDim}` : ""}${c.past ? ` ${s.classPast}` : ""}`}
                  aria-label={`${c.name} ${c.time} with ${c.coach}`}
                >
                  <span className={s.classTime}>{c.time}</span>
                  <span className={s.className}>{c.name}</span>
                  <span className={s.classCoach}>{c.coach}</span>
                  <span className={s.classFoot}>
                    <span className={`${s.spots} ${sp.cls}`}>{sp.text}</span>
                    <span className={`${s.lvlDot} ${s[`lvl${c.level}`]}`} aria-hidden="true" />
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* can't find a time */}
      <div className={s.cantfind}>
        <div>
          <h3>CAN'T FIND A TIME?</h3>
          <p>
            Visiting Bondi or chasing an odd hour? Call the front desk before 10am
            for same-day drop-ins, or message us and we'll find you a round.
          </p>
        </div>
        <Link href="/location-redesign" className={sk.btnGhost}>
          Ask the Desk &rarr;
        </Link>
      </div>

      {/* booking modal */}
      {active && info && (
        <div
          className={s.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={`Book ${active.name}`}
          onClick={close}
        >
          <div className={s.modal} onClick={(e) => e.stopPropagation()}>
            <div className={s.modalPhoto} aria-hidden="true" />
            <button type="button" className={s.modalClose} aria-label="Close" onClick={close}>
              &times;
            </button>
            <div className={s.modalBody}>
              <span className={s.modalKey}>Book this class</span>
              <h2 className={s.modalName}>{active.name}</h2>
              <div className={s.modalMeta}>
                <span>{active.time}</span>
                <span>{info.dur}</span>
                <span>{LEVEL_LABEL[active.level]}</span>
                <span>{info.floor}</span>
              </div>

              <p className={s.modalDesc}>{info.desc}</p>

              <div className={s.modalSection}>
                <span className={s.modalSectionKey}>Class Details</span>
                <div className={s.modalGrid}>
                  <div className={s.modalRow}><span className={s.modalK}>Intensity</span><span className={s.modalV}>{info.intensity}</span></div>
                  <div className={s.modalRow}><span className={s.modalK}>Level</span><span className={s.modalV}>{LEVEL_LABEL[active.level]}</span></div>
                  <div className={s.modalRow}>
                    <span className={s.modalK}>Spots left</span>
                    <span className={s.modalV}>
                      {active.waitlist || active.open === 0 ? "Waitlist only" : `${active.open} of ${active.total}`}
                    </span>
                  </div>
                  <div className={s.modalRow}><span className={s.modalK}>Date</span><span className={s.modalV}>{active.date}</span></div>
                  <div className={s.modalRow}><span className={s.modalK}>Time</span><span className={s.modalV}>{active.time}</span></div>
                  <div className={s.modalRow}><span className={s.modalK}>Location</span><span className={s.modalV}>{info.floor}</span></div>
                </div>
                {!(active.waitlist || active.open === 0) && (
                  <div className={`${sk.fillBar}`} aria-hidden="true">
                    {Array.from({ length: active.total }).map((_, i) => (
                      <i key={i} className={i < active.total - active.open ? sk.on : undefined} />
                    ))}
                  </div>
                )}
              </div>

              <div className={s.modalSection}>
                <span className={s.modalSectionKey}>What to Bring</span>
                <ul className={s.bring}>
                  <li>Gloves and wraps, provided here</li>
                  <li>A water bottle</li>
                  <li>A small towel</li>
                  <li>Training shoes you can move in</li>
                </ul>
              </div>

              <div className={s.modalSection}>
                <span className={s.modalSectionKey}>Cancellation Policy</span>
                <p className={s.modalCancel}>
                  Cancel up to 12 hours before for drop-ins, 7 days for members. Freeze up to 3 months a year.
                </p>
              </div>

              <div className={s.modalActions}>
                <Link href="/booking" className={sk.btnSolid}>
                  {active.waitlist || active.open === 0
                    ? "Join the Waitlist →"
                    : `Book ${active.time} ${active.name} →`}
                </Link>
                <button type="button" className={sk.btnGhost} onClick={close} style={{ cursor: "pointer", background: "none" }}>
                  View Full Timetable
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
