"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import s from "./skin.module.css";

/**
 * Skinned top bar — the redesigned global nav. Matches the locked reference
 * topbar (wordmark / nav links / live dot / Book a Class) and adds the mobile
 * hamburger drawer the reference lacked. Links point at the canonical routes.
 * Rendered once from app/layout.tsx via LegacyChrome on the promoted routes
 * (not per page). Non-sticky, in flow — matches the reference's scroll
 * behaviour. Carries its own solid dark bg (.topbar) so it reads correctly
 * outside the dark .page shell.
 */

const NAV = [
  { href: "/timetable", label: "Timetable" },
  { href: "/programs", label: "Programs" },
  { href: "/membership", label: "Membership" },
  { href: "/start-here", label: "Start Here" },
  { href: "/about", label: "About" },
  { href: "/location", label: "Location" },
];

export default function SkinNav({
  wordmarkHref = "/",
}: {
  wordmarkHref?: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className={s.topbar}>
        <Link href={wordmarkHref} className={s.wordmark}>
          <img src="/images/wordmark/arena-cream.svg" alt="Arena Boxing" />
        </Link>

        <nav className={s.navlinks} aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} data-active={isActive(n.href)}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className={s.navright}>
          <span className={s.live}>
            <span className={s.dot} aria-hidden="true" />
            Open &middot; Bondi &middot; 05.30
          </span>
          <Link href="/booking" className={s.bookBtn}>
            Book a Class
          </Link>
          <button
            type="button"
            className={`${s.burger}${open ? ` ${s.burgerOpen}` : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {open && (
        <div className={s.mobilePanel}>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              data-active={isActive(n.href)}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
          <span className={s.mobileLive}>
            <span className={s.dot} aria-hidden="true" />
            Open today &middot; Bondi &middot; 05.30 &ndash; 21.00
          </span>
        </div>
      )}
    </>
  );
}
