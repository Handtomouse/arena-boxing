/**
 * Arena Boxing — Landing Intro (H4ab translation)
 *
 * Cinematic 10s intro at "/", per UX brief (Rank 8):
 *  - Skip CTA visible at t=0 (NOT t=3)
 *  - sessionStorage.arena_intro_seen → returning visitors auto-bypass to /home
 *  - prefers-reduced-motion → static frame, user-driven exit only
 *  - Preload /home hero (video-poster.jpg) during the intro
 *  - 10s countdown then redirect to /home
 *
 * Mockup spec: jobs/68358e70/mockups/landing-page.html
 * Locked design language: H4ab (charcoal + cream + burgundy + blood-red).
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

const STORAGE_KEY = 'arena_intro_seen';

export default function Landing() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [reducedMotion, setReducedMotion] = useState(false);
  const exitedRef = useRef(false);

  // ─── 1. Returning-visitor bypass (mount only) ─────────────────────────
  // Must run synchronously before paint where possible. useEffect is fine
  // because the markup is server-rendered with the intro present; the
  // bypass just kicks the user out before they read it.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        exitedRef.current = true;
        window.location.replace('/home');
      }
    } catch {
      // sessionStorage can throw in privacy mode — ignore, show the intro.
    }
  }, []);

  // ─── 2. prefers-reduced-motion detection ─────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  // ─── 3. Preload /home hero (video poster) during the intro ───────────
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = '/images/video-poster.jpg';
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  // ─── 4. Exit handler (skip CTA, Enter, Escape, Space) ────────────────
  const exit = () => {
    if (exitedRef.current) return;
    exitedRef.current = true;
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
    router.push('/home');
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
        e.preventDefault();
        exit();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── 5. 10s countdown + auto-redirect ────────────────────────────────
  // Skipped entirely under prefers-reduced-motion (user-driven exit only).
  useEffect(() => {
    if (reducedMotion) return;
    if (exitedRef.current) return;

    const tick = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(tick);
          // Defer exit() so router.push doesn't fire inside the setState
          // updater (React warns about setState-during-render).
          setTimeout(exit, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  // Display "T-09" → "T-00"
  const countdownLabel = `T-${String(Math.max(0, countdown)).padStart(2, '0')}`;

  return (
    <section
      className="landing-page"
      aria-label="Arena Boxing Bondi intro"
    >
      {/* Atmosphere stack */}
      <div className="lp-bloom" aria-hidden="true" />
      <div className="lp-bloom-2" aria-hidden="true" />
      <div className="lp-heat" aria-hidden="true" />
      <div className="lp-fog" aria-hidden="true" />
      <div className="lp-vignette" aria-hidden="true" />
      <div className="lp-grain" aria-hidden="true" />
      <div className="lp-spine" aria-hidden="true" />

      {/* Letterbox bars */}
      <div className="lp-letterbox lp-letterbox--t" aria-hidden="true" />
      <div className="lp-letterbox lp-letterbox--b" aria-hidden="true" />

      {/* TOP RAIL: countdown (left) + REC plate (right) */}
      <div className="lp-top">
        <div className="lp-countdown" aria-live="polite">
          <span className="lp-cd-label">Intro</span>
          <span className="lp-cd-value">{countdownLabel}</span>
        </div>
        <div className="lp-plate" aria-hidden="true">
          <span className="lp-plate__dot" />
          <span>REC · BONDI · CHAPTER I</span>
        </div>
      </div>

      {/* CENTER STACK */}
      <div className="lp-center">
        <div className="lp-kicker">Those Who Dare</div>

        <h1 className="lp-wordmark">
          <img src="/images/wordmark/arena-cream.svg" alt="Arena" />
        </h1>

        <div className="lp-counterpoint">those who dare,</div>

        <div className="lp-rule" aria-hidden="true" />

        <p className="lp-tagline">
          A proving ground for those who refuse <em>to be ordinary</em>.
        </p>

        {/* Knot icon — gothic interlace single-stroke SVG */}
        <svg
          className="lp-knot"
          viewBox="0 0 64 64"
          aria-hidden="true"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M32 6 C 18 14, 14 28, 22 38 C 28 46, 36 46, 42 38 C 50 28, 46 14, 32 6 Z" />
            <path d="M32 58 C 46 50, 50 36, 42 26 C 36 18, 28 18, 22 26 C 14 36, 18 50, 32 58 Z" />
            <path d="M32 22 L 42 32 L 32 42 L 22 32 Z" />
            <circle cx="32" cy="32" r="1.4" fill="currentColor" stroke="none" />
          </g>
        </svg>
      </div>

      {/* Reassurance line (sits above the bottom letterbox) */}
      <div className="lp-reassure">
        <span>If you&apos;ve been here before, this won&apos;t show again.</span>
      </div>

      {/* BOTTOM RAIL: Press-to-skip hint (left) + Skip CTA (right) */}
      <div className="lp-bottom">
        <div className="lp-press">
          Press <kbd>Enter</kbd> to skip.
        </div>
        <button
          type="button"
          className="lp-skip"
          aria-label="Skip intro and go to home"
          onClick={(e) => {
            e.preventDefault();
            exit();
          }}
        >
          <span>Skip Intro</span>
          <span className="lp-skip__arrow" aria-hidden="true">
            <svg viewBox="0 0 32 8">
              <path
                d="M0 4h30M26 1l4 3-4 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </span>
        </button>
      </div>

      {/* Editorial film-credit band */}
      <div className="lp-credit" aria-hidden="true">
        <span className="lp-credit__txt">Bondi Beach · MMXXVI · Chapter I</span>
      </div>
    </section>
  );
}
