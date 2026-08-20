/**
 * 404 Not Found Page
 * Branded 404 page for missing routes
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-charcoal-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Arena Icon */}
        <div className="mb-8">
          <img
            src="/images/icon/icon-cream.svg"
            alt="Arena Boxing"
            className="w-24 h-24 mx-auto opacity-50"
          />
        </div>

        {/* 404 Message */}
        <h1 className="font-display text-blood-red text-8xl md:text-9xl uppercase tracking-wider mb-4">
          404
        </h1>

        <h2 className="font-display text-cream-primary text-3xl md:text-4xl uppercase tracking-wider mb-4">
          Wrong Corner
        </h2>

        <p className="font-body text-cream-dark text-lg md:text-xl mb-8 max-w-lg mx-auto">
          This page doesn&apos;t exist. You must have taken a wrong turn.
          Let&apos;s get you back in the ring.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-12 py-6 text-lg font-[family-name:var(--font-ui)] uppercase tracking-wide border-2 bg-[var(--burgundy-primary)] text-[var(--cream-primary)] border-[var(--cream-primary)] hover:bg-[var(--blood-red)] hover:-translate-y-1 transition-all duration-300"
          >
            GO HOME
          </Link>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center px-12 py-6 text-lg font-[family-name:var(--font-ui)] uppercase tracking-wide border-2 bg-transparent text-[var(--cream-primary)] border-[var(--cream-primary)] hover:bg-[var(--burgundy-primary)] hover:border-[var(--blood-red)] transition-all duration-300"
          >
            BOOK A CLASS
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-cream-dark/20">
          <p className="text-cream-dark text-sm uppercase tracking-wider mb-4">
            Popular Pages
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/home" className="text-cream-primary hover:text-blood-red transition-colors">
              Home
            </Link>
            <Link href="/timetable" className="text-cream-primary hover:text-blood-red transition-colors">
              Timetable
            </Link>
            <Link href="/membership" className="text-cream-primary hover:text-blood-red transition-colors">
              Membership
            </Link>
            <Link href="/about" className="text-cream-primary hover:text-blood-red transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
