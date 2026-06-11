/**
 * /membership — H4ab design-language port (Task #18).
 *
 * Translates mockups/membership-page.html into Next.js. Preserves:
 *   - PR #18: Cancellation transparency line on Unlimited tier
 *     ("Cancel anytime in your account. No lock-in, no email chase.")
 *   - 3 pricing tiers: Drop-in $35, Unlimited $220/mo, 10-Pack $300
 *   - PR #12 locked policy: 7-day cancel, 3-month freeze, 15% student discount
 *
 * Structure (per UX brief Rank — order = decision flow):
 *   1) Hero (compact, ~600px)         MEMBERSHIP anchor
 *   2) § 01 Three Tiers               persona labels + breakeven math + gift link
 *   3) § 02 Frequency Calculator      slider + 3 horizontal cost bars
 *   4) § 03 What's Included           12-row comparison table (4 columns)
 *   5) § 04 No Lock-in transparency   how-to-cancel · how-to-freeze · what-you-keep
 *   6) § 05 Gift a Membership         mailto CTA
 *   7) Final CTA                      first class free
 *
 * Founder's tier is shown as "By invitation" per the UX brief deferred-section
 * note — not a real price.
 *
 * Styling: app/membership/membership.css (scoped under .member-page).
 * Layout chrome (Navigation, Footer) comes from app/layout.tsx — untouched.
 */
'use client';

import { useRouter } from 'next/navigation';

const TIER_HANDLERS = {
  dropIn: 'drop-in',
  unlimited: 'monthly-unlimited',
  tenPack: '10-class-pack',
  trial: 'free-trial',
} as const;

export default function MembershipPage() {
  const router = useRouter();
  const go = (planId: string) => router.push(`/booking?plan=${planId}`);

  return (
    <div className="member-page">
      {/* ─────────────── 1. SLIM HERO ─────────────── */}
      <section className="mh-hero" aria-labelledby="membership-anchor">
        <div className="mh-wrap">
          <div className="mh-rail-sub">
            <span className="mh-kicker">— Three tiers, plain math, no lock-in —</span>
            <span className="mh-kicker-r">
              <span className="mh-livedot" aria-hidden="true"></span>
              <span className="live-lbl">OPEN</span>
              <span className="sep">/</span>
              Cancel anytime · in one click
            </span>
          </div>

          <div className="mh-stack">
            <h1 id="membership-anchor" className="mh-anchor">MEMBERSHIP</h1>
            <div className="mh-counter">
              <span className="mh-counter-italic">choose your path,</span>
              <span className="mh-counter-rule"></span>
              <span className="mh-counter-sub">
                Pay the way that lets you keep showing up — <em>drop-in for the
                curious, ten-pack for the casual, unlimited for the committed.</em>
              </span>
            </div>
          </div>

          <div className="mh-foot">
            <span>Est. MMXXV</span>
            <span className="mh-foot-dot">·</span>
            <span>Bondi · Sydney</span>
            <span className="mh-foot-dot">·</span>
            <span>Three tiers · plus an invitation-only Founder&rsquo;s seat</span>
            <span className="mh-foot-spacer"></span>
            <span className="mh-foot-end">No lock-in. No surprises.</span>
          </div>
        </div>
      </section>

      {/* ─────────────── 2. § 01 — THREE TIERS ─────────────── */}
      <section className="ab-section">
        <div className="ab-wrap">
          <div className="ab-edge-top">
            <span className="ab-edge-folio">Plate I</span>
            <span className="ab-edge-line"></span>
            <span className="ab-edge-meta">Three tiers · one room</span>
          </div>

          <header className="ab-shead">
            <div className="ab-shead-l">
              <span className="ab-shead-num">§ 01</span>
              <h2 className="ab-shead-title">The Tiers<em>,</em></h2>
              <span className="ab-shead-sub">— match your week to a price.</span>
            </div>
            <div className="ab-shead-r">
              <span className="ab-shead-kicker">A · B · C</span>
              <span className="ab-shead-rule"></span>
              <span className="ab-shead-index">DROP · UNLIM · 10-PACK</span>
            </div>
          </header>

          <div className="mt-tiers">
            {/* A — DROP-IN */}
            <article className="mt-tier">
              <span className="mt-tier-letter"><em>A.</em></span>
              <span className="mt-tier-persona">first class / tourists / once-off training</span>
              <h3 className="mt-tier-name">DROP-IN</h3>
              <div className="mt-tier-price">
                <span className="mt-tier-amount">$35</span>
                <span className="mt-tier-unit">/SESSION</span>
              </div>
              <p className="mt-tier-break mt-tier-break-neutral">No commitment, no contract — pay per round.</p>
              <ul className="mt-tier-list">
                <li><span className="mt-tier-li-mark" aria-hidden="true"></span>Single session, any class type</li>
                <li><span className="mt-tier-li-mark" aria-hidden="true"></span>No commitment, no lock-in</li>
                <li><span className="mt-tier-li-mark" aria-hidden="true"></span>Same coaches, same standard</li>
                <li><span className="mt-tier-li-mark" aria-hidden="true"></span>Cancel up to 12 hours before class</li>
              </ul>
              <p className="mt-tier-bestfor">
                <strong>Best for</strong>
                Trying us out · drop-in while in Sydney · one-off sweat.
              </p>
              <a
                className="mt-tier-gift"
                href="mailto:hello@arenaboxing.au?subject=Gift%20a%20Drop-in"
              >Gift this →</a>
              <button
                type="button"
                className="mt-tier-cta"
                onClick={() => go(TIER_HANDLERS.dropIn)}
              >Book a session →</button>
            </article>

            {/* B — UNLIMITED — promoted */}
            <article className="mt-tier mt-tier-rec">
              <span className="mt-tier-rec-rule"></span>
              <span className="mt-tier-rec-tag">Most Popular</span>
              <span className="mt-tier-letter"><em>B.</em></span>
              <span className="mt-tier-persona">daily training / fighters / committed</span>
              <h3 className="mt-tier-name">UNLIMITED</h3>
              <div className="mt-tier-price">
                <span className="mt-tier-amount">$220</span>
                <span className="mt-tier-unit">/MONTH</span>
              </div>
              <p className="mt-tier-break"><strong>Pays off after 7 sessions</strong> — every class after that is on the house.</p>
              <ul className="mt-tier-list">
                <li><span className="mt-tier-li-mark" aria-hidden="true"></span>Unlimited classes, every coach</li>
                <li><span className="mt-tier-li-mark" aria-hidden="true"></span>Priority booking · 14 days ahead</li>
                <li><span className="mt-tier-li-mark" aria-hidden="true"></span>Free fight-night seating · house events</li>
                <li><span className="mt-tier-li-mark" aria-hidden="true"></span>Freeze up to 3 months per year if you&rsquo;re travelling</li>
              </ul>
              <div className="mt-tier-focal">
                <span className="mt-tier-square" aria-hidden="true"></span>
                <span className="mt-tier-focal-tag">The committed path · the only red on this page</span>
              </div>
              {/* PR #18 — cancellation transparency line, preserved verbatim */}
              <p className="mt-tier-cancel-line">
                Cancel anytime in your account. No lock-in, no email chase.
              </p>
              <a
                className="mt-tier-gift"
                href="mailto:hello@arenaboxing.au?subject=Gift%20Unlimited%20Membership"
              >Gift this →</a>
              <button
                type="button"
                className="mt-tier-cta"
                onClick={() => go(TIER_HANDLERS.unlimited)}
              >Start Unlimited →</button>
            </article>

            {/* C — 10-PACK */}
            <article className="mt-tier">
              <span className="mt-tier-letter"><em>C.</em></span>
              <span className="mt-tier-persona">2x/week casual / corporate / irregular schedule</span>
              <h3 className="mt-tier-name">10-PACK</h3>
              <div className="mt-tier-price">
                <span className="mt-tier-amount">$300</span>
                <span className="mt-tier-unit">/10 PACK</span>
              </div>
              <p className="mt-tier-break">$30 per session — <strong>save $50 vs drop-ins.</strong></p>
              <ul className="mt-tier-list">
                <li><span className="mt-tier-li-mark" aria-hidden="true"></span>10 sessions, all class types</li>
                <li><span className="mt-tier-li-mark" aria-hidden="true"></span>3-month validity from purchase</li>
                <li><span className="mt-tier-li-mark" aria-hidden="true"></span>Share with a friend on your account</li>
                <li><span className="mt-tier-li-mark" aria-hidden="true"></span>Stack with another pack any time</li>
              </ul>
              <p className="mt-tier-bestfor">
                <strong>Best for</strong>
                Twice-a-week training · corporate weeks · irregular schedule.
              </p>
              <a
                className="mt-tier-gift"
                href="mailto:hello@arenaboxing.au?subject=Gift%20a%2010-Pack"
              >Gift this →</a>
              <button
                type="button"
                className="mt-tier-cta"
                onClick={() => go(TIER_HANDLERS.tenPack)}
              >Buy 10-Pack →</button>
            </article>
          </div>

          <div className="ab-edge-bot">
            <span className="ab-edge-meta">— Every tier walks into the same room —</span>
            <span className="ab-edge-line"></span>
            <span className="ab-edge-folio">End § 01</span>
          </div>
        </div>
      </section>

      {/* ─────────────── 3. § 02 — FREQUENCY CALCULATOR ─────────────── */}
      <section className="ab-section">
        <div className="ab-wrap">
          <div className="ab-edge-top">
            <span className="ab-edge-folio">Plate II</span>
            <span className="ab-edge-line"></span>
            <span className="ab-edge-meta">The math · made horizontal</span>
          </div>

          <header className="ab-shead">
            <div className="ab-shead-l">
              <span className="ab-shead-num">§ 02</span>
              <h2 className="ab-shead-title">How Often<em>,</em></h2>
              <span className="ab-shead-sub">— will you actually train?</span>
            </div>
            <div className="ab-shead-r">
              <span className="ab-shead-kicker">Breakeven Calculator</span>
              <span className="ab-shead-rule"></span>
              <span className="ab-shead-index">1 · 2 · 3 · 4 · 5</span>
            </div>
          </header>

          <div className="mfc-frame">
            <div className="mfc-q">
              <span className="mfc-q-num">Q.</span>
              <span className="mfc-q-text">How many sessions per week — <em>realistically?</em></span>
            </div>

            <div className="mfc-slider">
              <div className="mfc-slider-rail">
                <span className="mfc-slider-fill"></span>
                <span className="mfc-slider-thumb-label">3 / week <em>your pick</em></span>
                <span className="mfc-slider-thumb" aria-hidden="true"></span>
              </div>
              <div className="mfc-slider-ticks">
                <span className="mfc-slider-tick">1<em>once</em></span>
                <span className="mfc-slider-tick">2<em>twice</em></span>
                <span className="mfc-slider-tick active">3<em>thrice</em></span>
                <span className="mfc-slider-tick">4<em>four</em></span>
                <span className="mfc-slider-tick">5+<em>daily</em></span>
              </div>
            </div>

            <div className="mfc-bars">
              <div className="mfc-bar-row">
                <div className="mfc-bar-label">
                  <span className="mfc-bar-label-name">DROP-IN</span>
                  <span className="mfc-bar-label-sub">$35 · 12 sessions / mo</span>
                </div>
                <div className="mfc-bar-track">
                  <span className="mfc-bar-fill" style={{ width: '100%' }}></span>
                </div>
                <div className="mfc-bar-cap">$420<em>/ mo</em></div>
              </div>

              <div className="mfc-bar-row">
                <div className="mfc-bar-label">
                  <span className="mfc-bar-label-name">10-PACK</span>
                  <span className="mfc-bar-label-sub">$300 · burns through in &lt; 1 mo</span>
                </div>
                <div className="mfc-bar-track">
                  <span className="mfc-bar-fill" style={{ width: '78%' }}></span>
                </div>
                <div className="mfc-bar-cap">$330<em>/ mo</em></div>
              </div>

              <div className="mfc-bar-row winner">
                <div className="mfc-bar-label">
                  <span className="mfc-bar-label-name">UNLIMITED</span>
                  <span className="mfc-bar-label-sub">flat · use it all you want</span>
                </div>
                <div className="mfc-bar-track">
                  <span className="mfc-bar-fill" style={{ width: '52%' }}></span>
                </div>
                <div className="mfc-bar-cap">$220<em>/ mo</em></div>
              </div>
            </div>

            <div className="mfc-result">
              <span className="mfc-result-k">Right tier</span>
              <span className="mfc-result-v">
                At 3 sessions / week — <strong>UNLIMITED</strong> wins by $110/mo over a 10-pack and $200/mo over drop-ins.
              </span>
              <span className="mfc-result-fine">
                Math reverses below ~1 visit / wk — at that frequency, drop-ins or a 10-pack stretched across 3 months come out ahead.
              </span>
            </div>
          </div>

          <div className="ab-edge-bot">
            <span className="ab-edge-meta">— Honest math · no salesperson —</span>
            <span className="ab-edge-line"></span>
            <span className="ab-edge-folio">End § 02</span>
          </div>
        </div>
      </section>

      {/* ─────────────── 4. § 03 — WHAT'S INCLUDED (TABLE) ─────────────── */}
      <section className="ab-section">
        <div className="ab-wrap">
          <div className="ab-edge-top">
            <span className="ab-edge-folio">Plate III</span>
            <span className="ab-edge-line"></span>
            <span className="ab-edge-meta">Side by side · nothing hidden</span>
          </div>

          <header className="ab-shead">
            <div className="ab-shead-l">
              <span className="ab-shead-num">§ 03</span>
              <h2 className="ab-shead-title">What&rsquo;s Included<em>,</em></h2>
              <span className="ab-shead-sub">— the full inventory.</span>
            </div>
            <div className="ab-shead-r">
              <span className="ab-shead-kicker">12 lines · 4 tiers</span>
              <span className="ab-shead-rule"></span>
              <span className="ab-shead-index">+ FOUNDER&rsquo;S</span>
            </div>
          </header>

          <table className="mc-table">
            <thead>
              <tr>
                <th>
                  <span className="mc-table-feat">
                    Feature
                    <em>What you actually get, line by line.</em>
                  </span>
                </th>
                <th>
                  <span className="mc-th-name">DROP-IN</span>
                  <span className="mc-th-price">$35<em>/SESSION</em></span>
                  <span className="mc-th-key">single-use</span>
                </th>
                <th>
                  <span className="mc-th-name">10-PACK</span>
                  <span className="mc-th-price">$300<em>/10 PACK</em></span>
                  <span className="mc-th-key">3-month validity</span>
                </th>
                <th className="mc-col-unl">
                  <span className="mc-th-name">UNLIMITED</span>
                  <span className="mc-th-price">$220<em>/MONTH</em></span>
                  <span className="mc-th-key">month-to-month</span>
                </th>
                <th className="mc-th-founders">
                  <span className="mc-th-name">FOUNDER&rsquo;S</span>
                  <span className="mc-th-price">By invitation</span>
                  <span className="mc-th-key">— inner circle —</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* 01 — Unlimited classes */}
              <tr>
                <td>
                  <span className="mc-row-label">
                    Unlimited classes
                    <em>Use the studio as often as you can show up.</em>
                  </span>
                </td>
                <td className="mc-cell"><span className="mc-dash" aria-hidden="true"></span></td>
                <td className="mc-cell"><span className="mc-dash" aria-hidden="true"></span></td>
                <td className="mc-cell mc-col-unl"><span className="mc-tick mc-tick-strong" aria-hidden="true"></span></td>
                <td className="mc-cell mc-col-founders"><span className="mc-tick" aria-hidden="true"></span></td>
              </tr>
              {/* 02 — Priority booking */}
              <tr>
                <td>
                  <span className="mc-row-label">
                    Priority booking
                    <em>Reserve up to 14 days ahead, before the public window opens.</em>
                  </span>
                </td>
                <td className="mc-cell"><span className="mc-dash" aria-hidden="true"></span></td>
                <td className="mc-cell"><span className="mc-cell-val">3 days</span></td>
                <td className="mc-cell mc-col-unl"><span className="mc-cell-val">14 days</span></td>
                <td className="mc-cell mc-col-founders"><span className="mc-cell-val">30 days</span></td>
              </tr>
              {/* 03 — All class types */}
              <tr>
                <td>
                  <span className="mc-row-label">
                    All class types
                    <em>The Work · The Craft · The Long Round · open spar.</em>
                  </span>
                </td>
                <td className="mc-cell"><span className="mc-tick" aria-hidden="true"></span></td>
                <td className="mc-cell"><span className="mc-tick" aria-hidden="true"></span></td>
                <td className="mc-cell mc-col-unl"><span className="mc-tick mc-tick-strong" aria-hidden="true"></span></td>
                <td className="mc-cell mc-col-founders"><span className="mc-tick" aria-hidden="true"></span></td>
              </tr>
              {/* 04 — Class-pack validity */}
              <tr>
                <td>
                  <span className="mc-row-label">
                    Class-pack validity
                    <em>How long credits live before they expire.</em>
                  </span>
                </td>
                <td className="mc-cell"><span className="mc-cell-val">— <em>n/a</em></span></td>
                <td className="mc-cell"><span className="mc-cell-val">3 months</span></td>
                <td className="mc-cell mc-col-unl"><span className="mc-cell-val">— <em>n/a</em></span></td>
                <td className="mc-cell mc-col-founders"><span className="mc-cell-val">— <em>n/a</em></span></td>
              </tr>
              {/* 05 — Fight-night seating */}
              <tr>
                <td>
                  <span className="mc-row-label">
                    Fight-night seating
                    <em>Free seats for every in-house card we run.</em>
                  </span>
                </td>
                <td className="mc-cell"><span className="mc-dash" aria-hidden="true"></span></td>
                <td className="mc-cell"><span className="mc-dash" aria-hidden="true"></span></td>
                <td className="mc-cell mc-col-unl"><span className="mc-tick mc-tick-strong" aria-hidden="true"></span></td>
                <td className="mc-cell mc-col-founders"><span className="mc-cell-val">Ringside</span></td>
              </tr>
              {/* 06 — Guest passes */}
              <tr>
                <td>
                  <span className="mc-row-label">
                    Guest passes
                    <em>Bring a friend in on your account.</em>
                  </span>
                </td>
                <td className="mc-cell"><span className="mc-dash" aria-hidden="true"></span></td>
                <td className="mc-cell"><span className="mc-cell-val">1 / pack</span></td>
                <td className="mc-cell mc-col-unl"><span className="mc-cell-val">2 / month</span></td>
                <td className="mc-cell mc-col-founders"><span className="mc-cell-val">Unlimited</span></td>
              </tr>
              {/* 07 — Member events */}
              <tr>
                <td>
                  <span className="mc-row-label">
                    Member events
                    <em>Quarterly socials, coach masterclasses, sparring sessions.</em>
                  </span>
                </td>
                <td className="mc-cell"><span className="mc-dash" aria-hidden="true"></span></td>
                <td className="mc-cell"><span className="mc-dash" aria-hidden="true"></span></td>
                <td className="mc-cell mc-col-unl"><span className="mc-tick mc-tick-strong" aria-hidden="true"></span></td>
                <td className="mc-cell mc-col-founders"><span className="mc-tick" aria-hidden="true"></span></td>
              </tr>
              {/* 08 — Student discount (15% — locked PR #12) */}
              <tr>
                <td>
                  <span className="mc-row-label">
                    Student discount
                    <em>Valid student ID — applied at checkout, every tier.</em>
                  </span>
                </td>
                <td className="mc-cell"><span className="mc-cell-val">15%</span></td>
                <td className="mc-cell"><span className="mc-cell-val">15%</span></td>
                <td className="mc-cell mc-col-unl"><span className="mc-cell-val">15%</span></td>
                <td className="mc-cell mc-col-founders"><span className="mc-cell-val">— <em>n/a</em></span></td>
              </tr>
              {/* 09 — Personal-training discount */}
              <tr>
                <td>
                  <span className="mc-row-label">
                    Personal-training discount
                    <em>Off any one-on-one session with a coach.</em>
                  </span>
                </td>
                <td className="mc-cell"><span className="mc-dash" aria-hidden="true"></span></td>
                <td className="mc-cell"><span className="mc-cell-val">10%</span></td>
                <td className="mc-cell mc-col-unl"><span className="mc-cell-val">20%</span></td>
                <td className="mc-cell mc-col-founders"><span className="mc-cell-val">2 / quarter</span></td>
              </tr>
              {/* 10 — Wraps & water provided */}
              <tr>
                <td>
                  <span className="mc-row-label">
                    Wraps &amp; water provided
                    <em>Borrow a fresh pair · refill the cold press.</em>
                  </span>
                </td>
                <td className="mc-cell"><span className="mc-tick" aria-hidden="true"></span></td>
                <td className="mc-cell"><span className="mc-tick" aria-hidden="true"></span></td>
                <td className="mc-cell mc-col-unl"><span className="mc-tick mc-tick-strong" aria-hidden="true"></span></td>
                <td className="mc-cell mc-col-founders"><span className="mc-tick" aria-hidden="true"></span></td>
              </tr>
              {/* 11 — Cancel anytime (7-day notice — locked PR #12) */}
              <tr>
                <td>
                  <span className="mc-row-label">
                    Cancel anytime
                    <em>One click in your account · 7-day notice for next billing cycle.</em>
                  </span>
                </td>
                <td className="mc-cell"><span className="mc-cell-val">— <em>n/a</em></span></td>
                <td className="mc-cell"><span className="mc-cell-val">— <em>n/a</em></span></td>
                <td className="mc-cell mc-col-unl"><span className="mc-tick mc-tick-strong" aria-hidden="true"></span></td>
                <td className="mc-cell mc-col-founders"><span className="mc-tick" aria-hidden="true"></span></td>
              </tr>
              {/* 12 — Freeze available (3 months — locked PR #12) */}
              <tr>
                <td>
                  <span className="mc-row-label">
                    Freeze available
                    <em>Pause your membership while travelling.</em>
                  </span>
                </td>
                <td className="mc-cell"><span className="mc-dash" aria-hidden="true"></span></td>
                <td className="mc-cell"><span className="mc-dash" aria-hidden="true"></span></td>
                <td className="mc-cell mc-col-unl"><span className="mc-cell-val">3 months / yr</span></td>
                <td className="mc-cell mc-col-founders"><span className="mc-cell-val">Unlimited</span></td>
              </tr>
            </tbody>
          </table>

          <div className="mc-foot">
            <span className="mc-foot-mark" aria-hidden="true"></span>
            <p>
              The Founder&rsquo;s tier exists. We don&rsquo;t sell it.
              <em> Those who turn up enough rounds, long enough,</em> get the
              seat. Twelve seats total — that&rsquo;s the cap, that&rsquo;s the math.
            </p>
          </div>

          <div className="ab-edge-bot">
            <span className="ab-edge-meta">— Twelve lines · no footnotes —</span>
            <span className="ab-edge-line"></span>
            <span className="ab-edge-folio">End § 03</span>
          </div>
        </div>
      </section>

      {/* ─────────────── 5. § 04 — NO LOCK-IN TRANSPARENCY ─────────────── */}
      <section className="ab-section">
        <div className="ab-wrap">
          <div className="ab-edge-top">
            <span className="ab-edge-folio">Plate IV</span>
            <span className="ab-edge-line"></span>
            <span className="ab-edge-meta">The exit door · always open</span>
          </div>

          <header className="ab-shead">
            <div className="ab-shead-l">
              <span className="ab-shead-num">§ 04</span>
              <h2 className="ab-shead-title">Cancel &amp; Freeze<em>,</em></h2>
              <span className="ab-shead-sub">— the door swings both ways.</span>
            </div>
            <div className="ab-shead-r">
              <span className="ab-shead-kicker">Plain English</span>
              <span className="ab-shead-rule"></span>
              <span className="ab-shead-index">FTC · Click-to-Cancel</span>
            </div>
          </header>

          <div className="mx-frame">
            <div className="mx-head">
              <h3 className="mx-head-anchor">NO LOCK-IN. NO SURPRISES.</h3>
              <div className="mx-head-counter">
                <span className="mx-head-italic">the door swings both ways,</span>
                <p className="mx-head-body">
                  Cancel any membership in your account in <strong>one click.</strong>
                  {' '}Freeze for up to three months a year if you&rsquo;re travelling.
                  {' '}<strong>No retention specialists. No 30-day notice. No fine print.</strong>
                </p>
              </div>
            </div>

            <div className="mx-rows">
              <div className="mx-row">
                <div className="mx-row-k">
                  <span className="mx-row-num">01.</span>
                  <span className="mx-row-label">How to cancel</span>
                </div>
                <span className="mx-row-v">
                  In your account → <code>Settings</code> → <code>Cancel membership.</code>
                  {' '}One click, no email chase, no phone tree. 7-day notice applies to the next billing cycle — your current month finishes its run.
                </span>
                <span className="mx-row-side">7-day notice · self-serve</span>
              </div>

              <div className="mx-row">
                <div className="mx-row-k">
                  <span className="mx-row-num">02.</span>
                  <span className="mx-row-label">How to freeze</span>
                </div>
                <span className="mx-row-v">
                  <code>Settings</code> → <code>Freeze membership</code> · maximum
                  {' '}3 months per year. Resume any time before the freeze ends — no penalty either way.
                </span>
                <span className="mx-row-side">3 months / yr · self-serve</span>
              </div>

              <div className="mx-row">
                <div className="mx-row-k">
                  <span className="mx-row-num">03.</span>
                  <span className="mx-row-label">What you keep</span>
                </div>
                <span className="mx-row-v">
                  Unused 10-pack sessions <em>never expire mid-pack</em> — only the 3-month validity window from purchase. Cancel an Unlimited and your prepaid month finishes its run. Students keep their 15% off any future tier when they return.
                </span>
                <span className="mx-row-side">No retention voodoo</span>
              </div>
            </div>
          </div>

          <div className="ab-edge-bot">
            <span className="ab-edge-meta">— The kind of fine print we&rsquo;re proud to print —</span>
            <span className="ab-edge-line"></span>
            <span className="ab-edge-folio">End § 04</span>
          </div>
        </div>
      </section>

      {/* ─────────────── 6. § 05 — GIFT A MEMBERSHIP ─────────────── */}
      <section className="ab-section" style={{ padding: '64px 0' }}>
        <div className="ab-wrap">
          <div className="ab-edge-top">
            <span className="ab-edge-folio">Plate V</span>
            <span className="ab-edge-line"></span>
            <span className="ab-edge-meta">For someone you want to share the room with</span>
          </div>

          <header className="ab-shead" style={{ marginBottom: 20 }}>
            <div className="ab-shead-l">
              <span className="ab-shead-num">§ 05</span>
              <h2 className="ab-shead-title">Gift a Membership<em>,</em></h2>
              <span className="ab-shead-sub">— printed voucher, handed over.</span>
            </div>
            <div className="ab-shead-r">
              <span className="ab-shead-kicker">By Email · 24h Turnaround</span>
              <span className="ab-shead-rule"></span>
              <span className="ab-shead-index">P6</span>
            </div>
          </header>

          <div className="mg-block">
            <div className="mg-l">
              <span className="mg-overline">— Quietly —</span>
              <h3 className="mg-anchor">GIFT BOXING.</h3>
              <span className="mg-italic">
                Buy any tier as a gift — we&rsquo;ll send a printed voucher to your recipient, sealed, with no price on it.
              </span>
            </div>
            <div className="mg-r">
              <span className="mg-r-sub">
                Tell us the tier, the name, and the date you&rsquo;d like it to arrive. We do the rest.
              </span>
              <a
                className="mg-btn"
                href="mailto:hello@arenaboxing.au?subject=Gift%20a%20Membership"
              >Email us to gift →</a>
              <span className="mg-fine">Posted in 24 hours · Australia-wide.</span>
            </div>
          </div>

          <div className="ab-edge-bot">
            <span className="ab-edge-meta">— Hand it over · not the discount code, the room —</span>
            <span className="ab-edge-line"></span>
            <span className="ab-edge-folio">End § 05</span>
          </div>
        </div>
      </section>

      {/* ─────────────── 7. FINAL CTA ─────────────── */}
      <section className="ml-cta">
        <div className="ab-wrap">
          <div className="ml-cta-grid">
            <div className="ml-cta-l">
              <span className="ml-cta-overline">— Begin —</span>
              <h2 className="ml-cta-anchor">START WITH YOUR FIRST CLASS FREE</h2>
              <span className="ml-cta-underline"></span>
              <span className="ml-cta-sub">
                No card up front · no follow-up call · no soft landing.
              </span>
            </div>
            <div className="ml-cta-r">
              <em className="ml-cta-counter">those who dare,</em>
              <span className="ml-cta-meta">
                step under the rope at 05.30 sharp. The room is the medicine.
              </span>
              <button
                type="button"
                className="ml-cta-btn"
                onClick={() => go(TIER_HANDLERS.trial)}
              >Book my first class →</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
