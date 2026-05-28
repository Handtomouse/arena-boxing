/**
 * Arena Boxing Sticky Bottom CTA
 *
 * Non-Negotiable #2 from the UX brief — worth 12-27% mobile conversion lift
 * per Contentsquare / Convertica.
 *
 * Persistent 60px bottom bar on mobile-only (<lg) carrying the primary
 * "Book My First Class" offer to every page except the cinematic / landing.
 * Hidden on lg+ where the standard nav CTA does the work.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StickyBottomCTA() {
  const pathname = usePathname();

  // Don't appear on the / landing intro (film frame, sticky CTA breaks the cinema).
  // Exact match so /booking, /about, etc. all still get the bar.
  if (pathname === '/') {
    return null;
  }

  return (
    <Link
      href="/booking"
      aria-label="Book my first class — free, no card required"
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        h-[60px]
        flex
        items-center
        justify-between
        bg-[var(--charcoal-black)]
        text-[var(--cream-primary)]
        pl-6
        pr-5
        no-underline
        shadow-[0_-4px_12px_rgba(0,0,0,0.35)]
        active:bg-[var(--charcoal-light)]
        transition-colors
        duration-200
        lg:hidden
      "
      data-cta="sticky-bottom"
    >
      {/* Blood-red left edge accent stub */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-[6px] bg-[var(--blood-red)]"
      />

      {/* Copy block — primary line + italic micro-tagline on the same row */}
      <span className="flex items-baseline gap-3 min-w-0 flex-1">
        <span
          className="
            font-[family-name:var(--font-ui)]
            uppercase
            tracking-[0.2em]
            text-[15px]
            font-semibold
            whitespace-nowrap
            text-[var(--cream-primary)]
          "
        >
          Book My First Class · $0
        </span>
        <span
          className="
            hidden
            sm:inline
            italic
            text-[12px]
            tracking-normal
            text-[#C9A2A2]
            whitespace-nowrap
          "
          style={{ fontFamily: "'Cormorant', 'Cormorant Garamond', Georgia, serif" }}
        >
          Free · no card required
        </span>
      </span>

      {/* Chevron */}
      <span
        aria-hidden="true"
        className="
          flex-shrink-0
          ml-3
          text-[var(--cream-primary)]
          text-xl
          leading-none
          font-light
        "
      >
        &rarr;
      </span>
    </Link>
  );
}
