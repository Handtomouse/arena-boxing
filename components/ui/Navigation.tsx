/**
 * Arena Boxing Navigation Component
 * Gothic typography, burgundy background, sticky header
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtHero, setIsAtHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroThreshold = window.innerHeight * 0.2; // Show nav after scrolling 20% of viewport
      setIsAtHero(window.scrollY < heroThreshold);
      setIsScrolled(window.scrollY > 50);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/classes', label: 'Classes' },
    { href: '/manifesto', label: 'Manifesto' },
    { href: '/fighters', label: 'Fighters' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        bg-[var(--burgundy-primary)]
        border-b-2 border-[var(--cream-primary)]
        transition-all duration-500 ease-out
        ${isAtHero ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
        ${isScrolled ? 'py-3.5 shadow-[var(--shadow-intense)]' : 'py-5'}
      `}
    >
      {/* Grunge texture overlay */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: 'url(/textures/grunge-light.webp)',
          backgroundSize: 'cover',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo/Wordmark */}
          <Link
            href="/"
            className="flex items-center space-x-6 group"
          >
            {/* Beast Symbol */}
            <div className="w-12 h-12 relative">
              <Image
                src="/images/ASSET.jpg"
                alt="Arena Boxing"
                fill
                className="object-contain invert opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>

            {/* ARENA Wordmark - Old London typeface */}
            <div className="h-8 w-auto">
              <picture>
                <source srcSet="/images/wordmark/arena-cream.webp" type="image/webp" />
                <img
                  src="/images/wordmark/arena-cream.svg"
                  alt="ARENA"
                  className="h-full w-auto object-contain group-hover:opacity-90 transition-opacity"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </picture>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  text-[var(--cream-primary)]
                  hover:text-[var(--blood-red)]
                  font-[family-name:var(--font-ui)]
                  uppercase
                  text-sm
                  tracking-wider
                  transition-colors
                  duration-300
                  relative
                  group
                "
              >
                {link.label}

                {/* Underline on hover */}
                <span className="
                  absolute bottom-0 left-0 w-0 h-[2px]
                  bg-[var(--blood-red)]
                  group-hover:w-full
                  transition-all duration-300
                " />
              </Link>
            ))}

            {/* CTA Button */}
            <Link
              href="/trial"
              className="
                px-6 py-3
                bg-[var(--blood-red)]
                text-[var(--cream-primary)]
                border-2 border-[var(--cream-primary)]
                font-[family-name:var(--font-ui)]
                uppercase
                text-sm
                tracking-wider
                hover:bg-[var(--burgundy-light)]
                hover:shadow-[var(--shadow-grunge)]
                hover:-translate-y-0.5
                transition-all
                duration-300
              "
            >
              Enter The Arena
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col space-y-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-[var(--cream-primary)] transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-[var(--cream-primary)] transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-[var(--cream-primary)] transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-8 pb-8">
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="
                    text-[var(--cream-primary)]
                    hover:text-[var(--blood-red)]
                    font-[family-name:var(--font-ui)]
                    uppercase
                    text-lg
                    tracking-wider
                    transition-colors
                    py-4
                  "
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/trial"
                onClick={() => setIsMobileMenuOpen(false)}
                className="
                  px-6 py-4
                  bg-[var(--blood-red)]
                  text-[var(--cream-primary)]
                  border-2 border-[var(--cream-primary)]
                  font-[family-name:var(--font-ui)]
                  uppercase
                  text-center
                  tracking-wider
                  hover:bg-[var(--burgundy-light)]
                  transition-all
                  mt-4
                "
              >
                Enter The Arena
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
