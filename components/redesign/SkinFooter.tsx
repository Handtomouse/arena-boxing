import Link from "next/link";
import s from "./SkinFooter.module.css";

/**
 * Skinned footer for the redesign routes — the dark folio shown in the comps.
 * Brand / Find Us / Hours / Contact columns over a giant monument line.
 * Rendered through ChromeFooter so the live site keeps its own footer.
 */

const HOURS = [
  { d: "Mon – Fri", t: "06.00 – 21.00" },
  { d: "Saturday", t: "07.00 – 13.00" },
  { d: "Sunday", t: "08.00 – 12.00" },
];

export default function SkinFooter() {
  return (
    <footer className={s.footer} role="contentinfo" aria-label="Site footer">
      <div className={s.wrap}>
        <p className={s.folioKey}>Arena Boxing · Bondi Beach</p>

        <div className={s.cols}>
          <div className={s.brand}>
            <Link href="/home-redesign" className={s.wordmark}>
              Arena
            </Link>
            <span className={s.tagline}>Those who dare.</span>
            <nav className={s.social} aria-label="Social media">
              <a href="https://instagram.com/arenaboxing" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://facebook.com/arenaboxing" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </nav>
          </div>

          <div className={s.col}>
            <p className={s.colKey}>Find Us</p>
            <a href="https://www.google.com/maps/search/?api=1&query=123+Campbell+Parade+Bondi+Beach+NSW" target="_blank" rel="noopener noreferrer">
              123 Campbell Pde
            </a>
            <p>Bondi Beach NSW 2026</p>
            <p>Five minutes from the sand.</p>
          </div>

          <div className={s.col}>
            <p className={s.colKey}>Hours</p>
            {HOURS.map((h) => (
              <span key={h.d} className={s.hours}>
                <span>{h.d}</span>
                <span>{h.t}</span>
              </span>
            ))}
          </div>

          <div className={s.col}>
            <p className={s.colKey}>Contact</p>
            <a href="tel:+61400123456">0400 123 456</a>
            <a href="mailto:hello@arenaboxing.com.au">hello@arenaboxing.com.au</a>
            <p>Replies within one business day.</p>
          </div>
        </div>

        <p className={s.monument} aria-hidden="true">
          DISCIPLINE TODAY. <b>FREEDOM TOMORROW.</b>
        </p>

        <div className={s.rail}>
          <span className={s.dot} aria-hidden="true" />
          <span>Est. MMXXV</span>
          <span className={s.railSep}>·</span>
          <span>Bondi</span>
          <span className={s.railSep}>·</span>
          <span>33°53′S 151°16′E</span>
          <span className={s.railEnd}>© {"2026"} Arena Boxing. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
