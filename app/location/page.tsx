'use client';

import { useState, FormEvent } from 'react';
import { GoogleMapsEmbed } from '@/components';

type ContactSubject = '' | 'press' | 'corporate' | 'gift' | 'other';

interface LocationContactData {
  name: string;
  email: string;
  subject: ContactSubject;
  message: string;
}

interface LocationContactErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LocationPage() {
  const [formData, setFormData] = useState<LocationContactData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<LocationContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Form submission handler — POSTs to /api/contact (Resend transport).
  const handleFormSubmit = async (data: LocationContactData): Promise<void> => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      throw new Error(payload?.error || `Send failed (${res.status})`);
    }
  };

  const validate = (): boolean => {
    const next: LocationContactErrors = {};
    if (!formData.name.trim()) next.name = 'Required';
    if (!formData.email.trim()) {
      next.email = 'Required';
    } else if (!EMAIL_RX.test(formData.email)) {
      next.email = 'Invalid email';
    }
    if (!formData.subject) next.subject = 'Pick one';
    if (!formData.message.trim()) {
      next.message = 'Required';
    } else if (formData.message.trim().length < 10) {
      next.message = 'A bit more, please';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await handleFormSubmit(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = <K extends keyof LocationContactData>(field: K, value: LocationContactData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="location-page">
      {/* ═══════ HERO — FIND US ═══════ */}
      <section className="loc-hero">
        <div className="wrap">
          <div className="rail rail-sub">
            <span className="kicker">BONDI &middot; 33&deg;53&prime;S 151&deg;16&prime;E</span>
            <span className="kicker-r">
              <span className="livedot" aria-hidden="true" />
              <span className="live-lbl">LIVE</span>
              <span className="sep">/</span>
              Open today 05.30 &mdash; 21.00
            </span>
          </div>

          <div className="anchor-block">
            <div className="anchor-side">
              <span className="anchor-side-key">&sect; This page</span>
              <span className="anchor-side-line" />
              <span className="anchor-side-note">
                Address, hours, the bus, the parking, the form.
                <br />
                <em>Everything you need to physically arrive.</em>
              </span>
            </div>
            <div className="anchor-main">
              <span className="anchor-overline">&mdash; A short walk from the surf &mdash;</span>
              <h1 className="anchor-word">FIND US.</h1>
              <div className="anchor-sub">
                <span className="anchor-sub-rule" />
                <span className="anchor-sub-txt">
                  <strong>5 minutes</strong> <em>from the beach,</em>
                </span>
              </div>
            </div>
          </div>

          <div className="hero-bot">
            <div className="hero-bot-cell">
              <span className="hero-bot-k">Address</span>
              <span className="hero-bot-v">
                123 <em>Campbell Pde</em>
              </span>
            </div>
            <div className="hero-bot-cell center">
              <span className="hero-bot-k">From the beach</span>
              <span className="hero-bot-v">
                5 <em>min walk</em>
              </span>
            </div>
            <div className="hero-bot-cell right">
              <span className="hero-bot-k">From the Junction</span>
              <span className="hero-bot-v">
                8 <em>min walk</em>
              </span>
            </div>
          </div>

          <div className="edge-rail">
            <span>Est. MMXXV</span>
            <span className="dot">&middot;</span>
            <span>Bondi Beach</span>
            <span className="dot">&middot;</span>
            <span>Open 0530 &mdash; 2100, Daily</span>
            <span className="spacer" />
            <span className="folio-end">&mdash; Plate V of VIII &mdash;</span>
          </div>
        </div>
      </section>

      {/* ═══════ § 01 — THE STUDIO ═══════ */}
      <section className="ab-section" data-k="S01">
        <div className="ab-wrap">
          <div className="ab-edge-top">
            <span className="ab-edge-folio">Plate V &middot; i</span>
            <span className="ab-edge-line" />
            <span className="ab-edge-meta">Address &middot; copy &middot; route</span>
          </div>

          <header className="ab-shead">
            <div className="ab-shead-l">
              <span className="ab-shead-num">&sect; 01</span>
              <h2 className="ab-shead-title">
                The Studio<em>,</em>
              </h2>
              <span className="ab-shead-sub">&mdash; one address, two ways to arrive.</span>
            </div>
            <div className="ab-shead-r">
              <span className="ab-shead-kicker">Plain Text &middot; Tap to Copy</span>
              <span className="ab-shead-rule" />
              <span className="ab-shead-index">123 Campbell Pde</span>
            </div>
          </header>

          <div className="loc-addr-grid with-map-right">
            {/* LEFT — copyable address + CTA */}
            <div className="loc-addr-col">
              <span className="loc-addr-key">Studio address</span>
              <span className="loc-addr-rule" />

              <span className="copyable">
                123 Campbell Parade,
                <br />
                Bondi Beach NSW 2026
              </span>
              <span className="copyable-caption">Tap to copy</span>

              <p className="loc-addr-sub">
                Plain copyable text, not an image &mdash;{' '}
                <em>
                  so you can paste it into your maps app, your friend&rsquo;s message, your ride home.
                </em>
              </p>

              <div className="loc-addr-cta-row">
                <span className="loc-addr-cta-overline">&mdash; Or open it now &mdash;</span>
                <a
                  className="loc-addr-cta"
                  href="https://www.google.com/maps/dir/?api=1&destination=123+Campbell+Parade+Bondi+Beach+NSW+2026"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions in Google Maps &rarr;
                </a>
                <span className="loc-addr-cta-fine">
                  Opens a new tab. Walking, driving, transit &mdash; the app picks for you.
                </span>
              </div>

              <div className="loc-addr-coords">
                <div className="loc-addr-coord">
                  <span className="loc-addr-coord-k">Latitude</span>
                  <span className="loc-addr-coord-v">33&deg;53&prime;S</span>
                </div>
                <div className="loc-addr-coord">
                  <span className="loc-addr-coord-k">Longitude</span>
                  <span className="loc-addr-coord-v">151&deg;16&prime;E</span>
                </div>
              </div>
            </div>

            {/* RIGHT — Map (live Google Maps embed for future API wire-in) */}
            <div className="loc-map-wrap">
              <GoogleMapsEmbed address="123 Campbell Parade, Bondi Beach NSW 2026" zoom={15} />
            </div>
          </div>

          <div className="ab-edge-bot">
            <span className="ab-edge-meta">&mdash; One address. Two ways to arrive. &mdash;</span>
            <span className="ab-edge-line" />
            <span className="ab-edge-folio">End &sect; 01</span>
          </div>
        </div>
      </section>

      {/* ═══════ § 02 — WHEN WE'RE OPEN ═══════ */}
      <section className="ab-section" data-k="S02">
        <div className="ab-wrap">
          <div className="ab-edge-top">
            <span className="ab-edge-folio">Plate V &middot; ii</span>
            <span className="ab-edge-line" />
            <span className="ab-edge-meta">Every day &middot; first call to last bell</span>
          </div>

          <header className="ab-shead">
            <div className="ab-shead-l">
              <span className="ab-shead-num">&sect; 02</span>
              <h2 className="ab-shead-title">
                When We&rsquo;re Open<em>,</em>
              </h2>
              <span className="ab-shead-sub">&mdash; the door, the hours, no fine print.</span>
            </div>
            <div className="ab-shead-r">
              <span className="ab-shead-kicker">Four blocks</span>
              <span className="ab-shead-rule" />
              <span className="ab-shead-index">I &middot; II &middot; III &middot; IV</span>
            </div>
          </header>

          <div className="loc-hours">
            <article className="loc-hours-cell focal">
              <span className="loc-hours-num">
                <em>I.</em>
              </span>
              <span className="loc-hours-key">Weekdays</span>
              <h3 className="loc-hours-day">MON &mdash; FRI</h3>
              <span className="loc-hours-rule" />
              <p className="loc-hours-time">
                06<em>:</em>00 <em>&rarr;</em> 21<em>:</em>00
              </p>
              <div className="loc-hours-focal-block">
                <span className="loc-hours-square" aria-hidden="true" />
                <span className="loc-hours-note">First call 06.00 &middot; last bell 21.00</span>
              </div>
            </article>

            <article className="loc-hours-cell">
              <span className="loc-hours-num">
                <em>II.</em>
              </span>
              <span className="loc-hours-key">Saturday</span>
              <h3 className="loc-hours-day">SAT</h3>
              <span className="loc-hours-rule" />
              <p className="loc-hours-time">
                08<em>:</em>00 <em>&rarr;</em> 18<em>:</em>00
              </p>
              <span className="loc-hours-note">Long round 07.00 (members)</span>
            </article>

            <article className="loc-hours-cell">
              <span className="loc-hours-num">
                <em>III.</em>
              </span>
              <span className="loc-hours-key">Sunday</span>
              <h3 className="loc-hours-day">SUN</h3>
              <span className="loc-hours-rule" />
              <p className="loc-hours-time">
                08<em>:</em>00 <em>&rarr;</em> 14<em>:</em>00
              </p>
              <span className="loc-hours-note">Open floor &middot; bag &amp; rope, no class</span>
            </article>

            <article className="loc-hours-cell">
              <span className="loc-hours-num">
                <em>IV.</em>
              </span>
              <span className="loc-hours-key">Public holidays</span>
              <h3 className="loc-hours-day">PUB HOL</h3>
              <span className="loc-hours-rule" />
              <p className="loc-hours-time">
                <em>&mdash;</em> Call ahead
              </p>
              <span className="loc-hours-note">Reduced hours &middot; check before you walk</span>
            </article>
          </div>

          <div className="loc-dropin-byline">
            <span className="loc-dropin-mark">&para;</span>
            <p>
              <strong>Drop in anytime.</strong> Want to check out the gym before committing? Come by
              during open hours &mdash; our team will show you around. No appointment, no pitch.
            </p>
            <span className="loc-dropin-tag">No booking required</span>
          </div>

          <div className="ab-edge-bot">
            <span className="ab-edge-meta">
              &mdash; The door is open. The room is the medicine. &mdash;
            </span>
            <span className="ab-edge-line" />
            <span className="ab-edge-folio">End &sect; 02</span>
          </div>
        </div>
      </section>

      {/* ═══════ § 03 — GETTING HERE ═══════ */}
      <section className="ab-section" data-k="S03">
        <div className="ab-wrap">
          <div className="ab-edge-top">
            <span className="ab-edge-folio">Plate V &middot; iii</span>
            <span className="ab-edge-line" />
            <span className="ab-edge-meta">Three routes &middot; one room</span>
          </div>

          <header className="ab-shead">
            <div className="ab-shead-l">
              <span className="ab-shead-num">&sect; 03</span>
              <h2 className="ab-shead-title">
                Getting Here<em>,</em>
              </h2>
              <span className="ab-shead-sub">&mdash; pick the way that fits the morning.</span>
            </div>
            <div className="ab-shead-r">
              <span className="ab-shead-kicker">Three Routes</span>
              <span className="ab-shead-rule" />
              <span className="ab-shead-index">A &middot; B &middot; C</span>
            </div>
          </header>

          <div className="loc-transit">
            <article className="loc-transit-cell">
              <span className="loc-transit-num">
                <em>A.</em>
              </span>
              <span className="loc-transit-key">Route one</span>
              <h3 className="loc-transit-mode">BY BUS</h3>
              <span className="loc-transit-rule" />
              <p className="loc-transit-body">
                The <strong>333</strong>, <strong>380</strong>, and <strong>381</strong> all stop on
                Campbell Parade. Two minutes&rsquo; walk from the door &mdash; look for the lifeguard
                tower, we&rsquo;re the next block north.
              </p>
              <div className="loc-transit-stat">
                <span className="loc-transit-stat-k">From stop</span>
                <span className="loc-transit-stat-v">
                  2 <em>min</em>
                </span>
              </div>
            </article>

            <article className="loc-transit-cell">
              <span className="loc-transit-num">
                <em>B.</em>
              </span>
              <span className="loc-transit-key">Route two</span>
              <h3 className="loc-transit-mode">BY CAR</h3>
              <span className="loc-transit-rule" />
              <p className="loc-transit-body">
                Street parking along Campbell Parade is <strong>paid hourly metered</strong> (8am to
                8pm). For longer stays, use the <strong>council carpark</strong> on Queen Elizabeth
                Drive &mdash; two minutes&rsquo; walk back to the door.
              </p>
              <div className="loc-transit-stat">
                <span className="loc-transit-stat-k">From carpark</span>
                <span className="loc-transit-stat-v">
                  2 <em>min</em>
                </span>
              </div>
            </article>

            <article className="loc-transit-cell">
              <span className="loc-transit-num">
                <em>C.</em>
              </span>
              <span className="loc-transit-key">Route three</span>
              <h3 className="loc-transit-mode">ON FOOT</h3>
              <span className="loc-transit-rule" />
              <p className="loc-transit-body">
                <strong>Five minutes</strong> from the south end of the beach.{' '}
                <strong>Eight minutes</strong> from Bondi Junction station &mdash; straight down Bondi
                Road, then left on Campbell. The walk is the warm-up.
              </p>
              <div className="loc-transit-stat">
                <span className="loc-transit-stat-k">From the surf</span>
                <span className="loc-transit-stat-v">
                  5 <em>min</em>
                </span>
              </div>
            </article>
          </div>

          <div className="ab-edge-bot">
            <span className="ab-edge-meta">
              &mdash; Bus, boot, or boots &mdash; the door is the same. &mdash;
            </span>
            <span className="ab-edge-line" />
            <span className="ab-edge-folio">End &sect; 03</span>
          </div>
        </div>
      </section>

      {/* ═══════ § 04 — GET IN TOUCH ═══════ */}
      <section className="ab-section" data-k="S04">
        <div className="ab-wrap">
          <div className="ab-edge-top">
            <span className="ab-edge-folio">Plate V &middot; iv</span>
            <span className="ab-edge-line" />
            <span className="ab-edge-meta">Press &middot; corporate &middot; gifting</span>
          </div>

          <header className="ab-shead">
            <div className="ab-shead-l">
              <span className="ab-shead-num">&sect; 04</span>
              <h2 className="ab-shead-title">
                Get In Touch<em>,</em>
              </h2>
              <span className="ab-shead-sub">
                &mdash; for the things a booking widget can&rsquo;t handle.
              </span>
            </div>
            <div className="ab-shead-r">
              <span className="ab-shead-kicker">Two ways</span>
              <span className="ab-shead-rule" />
              <span className="ab-shead-index">Form &middot; Direct</span>
            </div>
          </header>

          {/* Form purpose declaration — UX brief rank 7 */}
          <div className="loc-form-purpose">
            <span className="loc-form-purpose-mark">&para;</span>
            <p>
              <strong>This form is for press, corporate enquiries, and gift purchases.</strong> To
              book a class, head to <code>/booking</code> &mdash; that&rsquo;s the only place the
              calendar lives.
            </p>
            <span className="loc-form-purpose-tag">Not for class bookings</span>
          </div>

          <div className="loc-contact-grid">
            {/* LEFT — Contact form */}
            <form className="loc-form" onSubmit={onSubmit} noValidate>
              <header className="loc-form-head">
                <span className="loc-form-head-num">
                  <em>i.</em>
                </span>
                <h3 className="loc-form-head-title">SEND A NOTE</h3>
                <span className="loc-form-head-tag">replies inside 1 business day</span>
              </header>

              <div className="loc-form-row-grid">
                <div className="loc-form-row">
                  <label className="loc-form-label" htmlFor="loc-name">
                    Name <em>&mdash; what to call you</em>
                  </label>
                  <input
                    className="loc-form-input"
                    type="text"
                    id="loc-name"
                    name="name"
                    placeholder="First & last"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => update('name', e.target.value)}
                    disabled={isSubmitting}
                    aria-invalid={errors.name ? 'true' : 'false'}
                  />
                  {errors.name && <span className="loc-form-field-error">{errors.name}</span>}
                </div>
                <div className="loc-form-row">
                  <label className="loc-form-label" htmlFor="loc-email">
                    Email <em>&mdash; where to reply</em>
                  </label>
                  <input
                    className="loc-form-input"
                    type="email"
                    id="loc-email"
                    name="email"
                    placeholder="you@somewhere.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => update('email', e.target.value)}
                    disabled={isSubmitting}
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && <span className="loc-form-field-error">{errors.email}</span>}
                </div>
              </div>

              <div className="loc-form-row">
                <label className="loc-form-label" htmlFor="loc-subject">
                  Subject <em>&mdash; what this is about</em>
                </label>
                <select
                  className="loc-form-select"
                  id="loc-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => update('subject', e.target.value as ContactSubject)}
                  disabled={isSubmitting}
                  aria-invalid={errors.subject ? 'true' : 'false'}
                >
                  <option value="">&mdash; Choose one &mdash;</option>
                  <option value="press">Press</option>
                  <option value="corporate">Corporate enquiry</option>
                  <option value="gift">Gift purchase</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && <span className="loc-form-field-error">{errors.subject}</span>}
              </div>

              <div className="loc-form-row">
                <label className="loc-form-label" htmlFor="loc-message">
                  Message <em>&mdash; tell us what you need</em>
                </label>
                <textarea
                  className="loc-form-textarea"
                  id="loc-message"
                  name="message"
                  rows={5}
                  placeholder="A few sentences will do."
                  value={formData.message}
                  onChange={(e) => update('message', e.target.value)}
                  disabled={isSubmitting}
                  aria-invalid={errors.message ? 'true' : 'false'}
                />
                {errors.message && <span className="loc-form-field-error">{errors.message}</span>}
              </div>

              <div className="loc-form-foot">
                <span className="loc-form-foot-fine">
                  We read every note. No marketing list, no follow-up unless you ask for one.
                </span>
                <button className="loc-form-submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Send →'}
                </button>
              </div>

              {submitStatus === 'success' && (
                <div className="loc-form-status success" role="alert">
                  Thank you. We&rsquo;ll be in touch inside one business day.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="loc-form-status error" role="alert">
                  Something went wrong. Please try again or email us directly.
                </div>
              )}
            </form>

            {/* RIGHT — Direct lines */}
            <aside className="loc-direct">
              <header className="loc-direct-head">
                <span className="loc-direct-key">Direct</span>
                <span className="loc-direct-rule" />
              </header>
              <p className="loc-direct-sub">Faster than the form, when it&rsquo;s urgent.</p>

              <div className="loc-direct-line">
                <span className="loc-direct-line-k">Phone &middot; tap to call</span>
                <a className="loc-direct-v" href="tel:+61400123456">
                  +61 400 123 456
                </a>
                <span className="loc-direct-fine">
                  Studio mobile &middot; manned during open hours.
                </span>
              </div>

              <div className="loc-direct-line">
                <span className="loc-direct-line-k">Email &middot; tap to open</span>
                <a className="loc-direct-v" href="mailto:hello@arenaboxing.com.au">
                  hello@arenaboxing.com.au
                </a>
                <span className="loc-direct-fine">Replies within one business day.</span>
              </div>

              <div className="loc-direct-foot">
                <span className="loc-direct-foot-k">For booking</span>
                <span className="loc-direct-foot-v">
                  use <em>/booking</em>
                </span>
              </div>
            </aside>
          </div>

          <div className="ab-edge-bot">
            <span className="ab-edge-meta">
              &mdash; Press, corporate, gifting &middot; class booking lives on /booking &mdash;
            </span>
            <span className="ab-edge-line" />
            <span className="ab-edge-folio">End &sect; 04</span>
          </div>
        </div>
      </section>

      {/* ═══════ § 05 — CTA ═══════ */}
      <section className="ab-section" data-k="S05">
        <div className="ab-wrap">
          <div className="ab-edge-top">
            <span className="ab-edge-folio">Plate V &middot; v</span>
            <span className="ab-edge-line" />
            <span className="ab-edge-meta">Final call &middot; first class on the house</span>
          </div>

          <header className="ab-shead">
            <div className="ab-shead-l">
              <span className="ab-shead-num">&sect; 05</span>
              <h2 className="ab-shead-title">
                Step Under the Rope<em>,</em>
              </h2>
              <span className="ab-shead-sub">&mdash; you found the door, now use it.</span>
            </div>
            <div className="ab-shead-r">
              <span className="ab-shead-kicker">Bondi &middot; 05.30 sharp</span>
              <span className="ab-shead-rule" />
              <span className="ab-shead-index">End plate V</span>
            </div>
          </header>

          <div className="loc-cta">
            <div className="loc-cta-l">
              <span className="loc-cta-overline">&mdash; Begin &mdash;</span>
              <h2 className="loc-cta-anchor">ENTER THE ARENA</h2>
              <span className="loc-cta-underline" />
              <span className="loc-cta-sub">
                First class on the house. No commitment, no follow-up.
              </span>
            </div>
            <div className="loc-cta-r">
              <em className="loc-cta-counter">those who dare,</em>
              <span className="loc-cta-meta">step under the rope at 05.30 sharp.</span>
              <a className="loc-cta-btn" href="/booking">
                Book now &rarr;
              </a>
            </div>
          </div>

          <div className="ab-edge-bot">
            <span className="ab-edge-meta">&mdash; Six voices, one creed &mdash;</span>
            <span className="ab-edge-line" />
            <span className="ab-edge-folio">End &sect; 05</span>
          </div>
        </div>
      </section>
    </div>
  );
}
