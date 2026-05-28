/**
 * /about — H4ab design-language translation.
 *
 * Order per UX brief:
 *   1) Hero (compact, ~600px) — ARENA BOXING anchor + italic Cormorant counterpoint
 *   2) § 01 Our Story — 60/40 grid (drop-cap brand-story + CSS studio plate)
 *   3) § 02 Meet Our Coaches — wraps TrainersModule with H4ab section frame
 *      (PR #10 wiring preserved; visual restyle of the module is follow-up)
 *   4) § 03 Member Voice — Cormorant italic pull-quote
 *      (Maya, "joined March 2026" — illustrative composite per UX brief)
 *   5) § 04 Our Values — 4-card grid (Authenticity / Excellence / Courage / Community)
 *   6) § 05 Instagram — wraps InstagramEmbed; sits AFTER trainers per UX brief
 *   7) Final CTA
 *
 * Real coach names come from lib/trainers.ts (Brendan, Henry, Matt, Zach)
 * with [PENDING] placeholders intact — bios/credentials/IG are not invented.
 *
 * Site Nav + Footer are rendered by app/layout.tsx and are not duplicated
 * here.
 */
import type { Metadata } from "next";
import { InstagramEmbed, TrainersModule } from "@/components";
import { trainers } from "@/lib/trainers";
import "./about.css";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "A boxing room in Bondi, opened MMXXV. Authentic training, certified coaches, no shortcuts. Four coaches, one standard.",
};

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* ═══════════════════════════════════════════════════════════════
          HERO — compact anchor + italic counterpoint
          ═══════════════════════════════════════════════════════════════ */}
      <section className="about-hero" aria-labelledby="about-hero-anchor">
        <div className="about-hero-wrap">
          <div className="about-hero-rail">
            <span className="about-hero-rail-l">— Plate I &middot; The Arena —</span>
            <span className="about-hero-rail-line" />
            <span className="about-hero-rail-r">About &middot; &sect; About the Room</span>
          </div>

          <div className="about-hero-stack">
            <span className="about-hero-side">
              <em>those who dare,</em>
              <br />
              <em className="about-hero-side-2">step under the rope.</em>
            </span>

            <h1 id="about-hero-anchor" className="about-hero-anchor">
              ARENA BOXING
            </h1>

            <span className="about-hero-meta">
              <span className="about-hero-meta-num">01</span>
              <span className="about-hero-meta-line" />
              <span className="about-hero-meta-txt">
                — A boxing room in Bondi, opened MMXXV.
              </span>
            </span>
          </div>

          <p className="about-hero-sub">
            We are a room of coaches, sparring partners, regulars and first-timers.{" "}
            <em>Five-thirty sharp.</em> Twenty bags. One creed.
          </p>

          <div className="about-hero-edge">
            <span>Est. MMXXV</span>
            <span className="about-hero-edge-dot">&middot;</span>
            <span>Bondi Beach</span>
            <span className="about-hero-edge-dot">&middot;</span>
            <span>Four coaches, one room</span>
            <span className="about-hero-edge-spacer" />
            <span className="about-hero-edge-folio">— begin reading —</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          § 01 — OUR STORY (60/40 grid)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="ab-section ab-story" aria-labelledby="about-story-h">
        <div className="ab-wrap">
          <div className="ab-edge-top">
            <span className="ab-edge-folio">Plate II</span>
            <span className="ab-edge-line" />
            <span className="ab-edge-meta">Why we opened this room</span>
          </div>

          <header className="ab-shead">
            <div className="ab-shead-l">
              <span className="ab-shead-num">&sect; 01</span>
              <h2 id="about-story-h" className="ab-shead-title">
                Our Story<em>,</em>
              </h2>
              <span className="ab-shead-sub">— and why we opened this room.</span>
            </div>
            <div className="ab-shead-r">
              <span className="ab-shead-kicker">Origins</span>
              <span className="ab-shead-rule" />
              <span className="ab-shead-index">MMXXV — MMXXVI</span>
            </div>
          </header>

          <div className="ab-story-grid">
            <div className="ab-story-prose">
              <span className="ab-story-caps">Bondi &middot; 2025 —</span>

              <p className="ab-story-p ab-story-p-lead">
                <span className="ab-story-drop">A</span>rena Boxing was born from a
                simple belief: boxing gyms had lost their edge. Too polished, too
                corporate, too afraid to embrace what makes combat sports raw and
                real.
              </p>

              <p className="ab-story-p">
                We opened in 2025 in the heart of Bondi with a different idea.
                Authentic training, certified coaches, no shortcuts. We teach
                technique first. We train fighters second. We don&rsquo;t apologise
                for the work it takes.
              </p>

              <p className="ab-story-p">
                The walls don&rsquo;t carry motivational quotes. They carry sweat
                stains and history. Our coaches don&rsquo;t talk about fighting —
                they have lived it. Our members are the ones who turn up at
                five-thirty, every week, in the dark.
              </p>

              <div className="ab-story-anchor">
                <span className="ab-story-anchor-mark">&para;</span>
                <em className="ab-story-anchor-q">
                  &ldquo;Nothing authentic gets watered down here.&rdquo;
                </em>
                <span className="ab-story-anchor-by">— founding creed, 2025</span>
              </div>
            </div>

            <figure className="ab-story-plate">
              <div className="ab-story-plate-frame" aria-hidden="true">
                <span className="ab-story-plate-light" />
                <span className="ab-story-plate-floor" />
                <span className="ab-story-plate-bag-1" />
                <span className="ab-story-plate-bag-2" />
                <span className="ab-story-plate-bag-3" />
                <span className="ab-story-plate-rope" />
                <span className="ab-story-plate-grain" />
              </div>
              <figcaption className="ab-story-plate-cap">
                <span className="ab-story-plate-cap-k">Plate I</span>
                <span className="ab-story-plate-cap-sep">&middot;</span>
                <span className="ab-story-plate-cap-v">
                  The Studio &middot; key light, single bulb
                </span>
              </figcaption>
            </figure>
          </div>

          <div className="ab-edge-bot">
            <span className="ab-edge-meta">— Authentic training, no shortcuts —</span>
            <span className="ab-edge-line" />
            <span className="ab-edge-folio">End &sect; 01</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          § 02 — MEET OUR COACHES (TrainersModule wrapped; PR #10 wiring)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="ab-section ab-coaches" aria-labelledby="about-coaches-h">
        <div className="ab-wrap">
          <div className="ab-edge-top">
            <span className="ab-edge-folio">Plate III</span>
            <span className="ab-edge-line" />
            <span className="ab-edge-meta">The people who run the room</span>
          </div>

          <header className="ab-shead">
            <div className="ab-shead-l">
              <span className="ab-shead-num">&sect; 02</span>
              <h2 id="about-coaches-h" className="ab-shead-title">
                Meet Our Coaches<em>,</em>
              </h2>
              <span className="ab-shead-sub">— four people, one standard.</span>
            </div>
            <div className="ab-shead-r">
              <span className="ab-shead-kicker">Four Coaches</span>
              <span className="ab-shead-rule" />
              <span className="ab-shead-index">I &middot; II &middot; III &middot; IV</span>
            </div>
          </header>

          <div className="ab-coaches-frame">
            {/* TrainersModule — PR #10 wiring preserved.
                Cards retain their current visual treatment; an H4ab card
                restyle is a follow-up. The module renders its own internal
                "Our Trainers" h2, which is hidden via about.css so the
                § 02 header above is the sole heading for this section. */}
            <TrainersModule trainers={trainers} />
          </div>

          <div className="ab-coach-byline">
            <span className="ab-coach-byline-mark">&para;</span>
            <p>
              Every coach in this room has held a corner, taken a fight, or run a
              return-from-injury block.{" "}
              <em>We don&rsquo;t train you with someone who hasn&rsquo;t.</em>
            </p>
          </div>

          <div className="ab-edge-bot">
            <span className="ab-edge-meta">— Four coaches &middot; one standard —</span>
            <span className="ab-edge-line" />
            <span className="ab-edge-folio">End &sect; 02</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          § 03 — MEMBER VOICE (Cormorant italic pull-quote)
          Maya is an illustrative composite per the UX brief; flagged
          explicitly in the right meta column.
          ═══════════════════════════════════════════════════════════════ */}
      <section className="ab-section ab-voice" aria-labelledby="about-voice-h">
        <div className="ab-wrap">
          <div className="ab-edge-top">
            <span className="ab-edge-folio">Plate IV</span>
            <span className="ab-edge-line" />
            <span className="ab-edge-meta">A voice from the room</span>
          </div>

          <header className="ab-shead">
            <div className="ab-shead-l">
              <span className="ab-shead-num">&sect; 03</span>
              <h2 id="about-voice-h" className="ab-shead-title">
                Member Voice<em>,</em>
              </h2>
              <span className="ab-shead-sub">— one of the people who turned up.</span>
            </div>
            <div className="ab-shead-r">
              <span className="ab-shead-kicker">Testimony</span>
              <span className="ab-shead-rule" />
              <span className="ab-shead-index">No. I</span>
            </div>
          </header>

          <div className="ab-voice-grid">
            <div className="ab-voice-q">
              <span className="ab-voice-q-mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="ab-voice-quote">
                I&rsquo;d never thrown a punch when I walked in. Tomás had me
                wrapping my hands by minute three. Twelve weeks later I&rsquo;m in
                the ring three times a week and stronger than I&rsquo;ve been in a
                decade.
              </blockquote>

              <div className="ab-voice-by">
                <span className="ab-voice-by-line" />
                <span className="ab-voice-by-name">MAYA</span>
                <span className="ab-voice-by-sep">&middot;</span>
                <span className="ab-voice-by-meta">joined March 2026</span>
              </div>
            </div>

            <aside className="ab-voice-meta">
              <span className="ab-voice-square" aria-hidden="true" />
              <span className="ab-voice-meta-k">Plate IV &middot; The Voice</span>
              <span className="ab-voice-meta-rule" />
              <p className="ab-voice-meta-body">
                We do not ask for testimonials. They turn up in DMs, on the wall,
                in the alley after class. <em>This one is illustrative</em> — a
                composite voice while real member quotes are being collected.
              </p>
              <span className="ab-voice-meta-foot">
                — Illustrative composite &middot; per UX brief
              </span>
            </aside>
          </div>

          <div className="ab-edge-bot">
            <span className="ab-edge-meta">— You will not be the worst in the room —</span>
            <span className="ab-edge-line" />
            <span className="ab-edge-folio">End &sect; 03</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          § 04 — OUR VALUES (4-card grid)
          Copy preserved from prior /about: Authenticity / Excellence /
          Courage / Community.
          ═══════════════════════════════════════════════════════════════ */}
      <section className="ab-section ab-values" aria-labelledby="about-values-h">
        <div className="ab-wrap">
          <div className="ab-edge-top">
            <span className="ab-edge-folio">Plate V</span>
            <span className="ab-edge-line" />
            <span className="ab-edge-meta">The bones beneath the gloves</span>
          </div>

          <header className="ab-shead">
            <div className="ab-shead-l">
              <span className="ab-shead-num">&sect; 04</span>
              <h2 id="about-values-h" className="ab-shead-title">
                Our Values<em>,</em>
              </h2>
              <span className="ab-shead-sub">
                — four pillars we don&rsquo;t apologise for.
              </span>
            </div>
            <div className="ab-shead-r">
              <span className="ab-shead-kicker">Four Pillars</span>
              <span className="ab-shead-rule" />
              <span className="ab-shead-index">I &middot; II &middot; III &middot; IV</span>
            </div>
          </header>

          <div className="ab-pillars">
            <article className="ab-pillar">
              <span className="ab-pillar-num">
                <em>I.</em>
              </span>
              <span className="ab-pillar-key">Pillar one</span>
              <h3 className="ab-pillar-name">AUTHENTICITY</h3>
              <span className="ab-pillar-rule" />
              <p className="ab-pillar-body">
                No gimmicks. No trends. Just honest training in an environment
                that respects the sport — and the people who turn up to do it.
              </p>
              <span className="ab-pillar-tag">Trad. boxing &middot; no chrome, no neon</span>
            </article>

            <article className="ab-pillar">
              <span className="ab-pillar-num">
                <em>II.</em>
              </span>
              <span className="ab-pillar-key">Pillar two</span>
              <h3 className="ab-pillar-name">EXCELLENCE</h3>
              <span className="ab-pillar-rule" />
              <p className="ab-pillar-body">
                Premium equipment, expert coaching, and a community that pushes
                you to be better. Standards stay sharp; we will not waste your hour.
              </p>
              <span className="ab-pillar-tag">Standards &middot; sharpened daily</span>
            </article>

            <article className="ab-pillar">
              <span className="ab-pillar-num">
                <em>III.</em>
              </span>
              <span className="ab-pillar-key">Pillar three</span>
              <h3 className="ab-pillar-name">COURAGE</h3>
              <span className="ab-pillar-rule" />
              <p className="ab-pillar-body">
                We celebrate those who dare. The ones who step under the rope on
                the days they don&rsquo;t want to. The rest is theatre.
              </p>
              <span className="ab-pillar-tag">Show up &middot; especially reluctant</span>
            </article>

            <article className="ab-pillar">
              <span className="ab-pillar-num">
                <em>IV.</em>
              </span>
              <span className="ab-pillar-key">Pillar four</span>
              <h3 className="ab-pillar-name">COMMUNITY</h3>
              <span className="ab-pillar-rule" />
              <p className="ab-pillar-body">
                More than a gym. A community of fighters who expect you to be
                there tomorrow because you were there today. The room is the
                medicine.
              </p>
              <span className="ab-pillar-tag">Bondi locals &middot; honest company</span>
            </article>
          </div>

          <div className="ab-edge-bot">
            <span className="ab-edge-meta">— Four pillars, one room —</span>
            <span className="ab-edge-line" />
            <span className="ab-edge-folio">End &sect; 04</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          § 05 — INSTAGRAM (wraps InstagramEmbed; AFTER trainers per UX brief)
          Real feed connection is Task #14; this wraps the placeholder
          component in the H4ab section frame.
          ═══════════════════════════════════════════════════════════════ */}
      <section className="ab-section ab-instagram" aria-labelledby="about-ig-h">
        <div className="ab-wrap">
          <div className="ab-edge-top">
            <span className="ab-edge-folio">Plate VI</span>
            <span className="ab-edge-line" />
            <span className="ab-edge-meta">Community proof &middot; the wall, after dark</span>
          </div>

          <header className="ab-shead">
            <div className="ab-shead-l">
              <span className="ab-shead-num">&sect; 05</span>
              <h2 id="about-ig-h" className="ab-shead-title">
                Instagram<em>,</em>
              </h2>
              <span className="ab-shead-sub">— the room on its own terms.</span>
            </div>
            <div className="ab-shead-r">
              <span className="ab-shead-kicker">@arenaboxing</span>
              <span className="ab-shead-rule" />
              <span className="ab-shead-index">Six tiles &middot; live feed</span>
            </div>
          </header>

          <div className="ab-instagram-frame">
            <InstagramEmbed username="arenaboxing" limit={6} layout="grid" />
          </div>

          <div className="ab-edge-bot">
            <span className="ab-edge-meta">— @arenaboxing &middot; the wall —</span>
            <span className="ab-edge-line" />
            <span className="ab-edge-folio">End &sect; 05</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FINAL CTA — Book Your First Class
          ═══════════════════════════════════════════════════════════════ */}
      <section className="ab-cta-final" aria-labelledby="about-cta-h">
        <div className="ab-wrap">
          <div className="ab-cta-grid">
            <div className="ab-cta-l">
              <span className="ab-cta-overline">
                <em>those who dare,</em>
              </span>
              <h2 id="about-cta-h" className="ab-cta-anchor">
                BOOK YOUR FIRST CLASS
              </h2>
              <span className="ab-cta-underline" aria-hidden="true" />
              <span className="ab-cta-sub">
                — First class on the house. No commitment, no kit, no excuses.
              </span>
            </div>
            <div className="ab-cta-r">
              <span className="ab-cta-counter">
                Twenty bags.
                <br />
                One room.
                <br />
                <em>Yours, on Tuesday.</em>
              </span>
              <a href="/timetable" className="ab-cta-btn">
                Enter the Arena
              </a>
              <span className="ab-cta-meta">
                Open 0530 — 2100 daily &middot; Bondi
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
