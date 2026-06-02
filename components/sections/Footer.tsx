'use client';

import React from 'react';
import styles from './Footer.module.css';

export interface FooterProps {
  showSocial?: boolean;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ showSocial = true, className = '' }) => {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className={`${styles.footer} grunge-texture ${className}`}
    >
      <div className={styles.wrap}>
        {/* Top folio rail */}
        <div className={styles.folio}>
          <span className={styles.folioKey}>&sect; Colophon</span>
          <span className={styles.folioLine} />
          <span className={styles.folioEnd}>Est. MMXXV &middot; Bondi Beach</span>
        </div>

        {/* Main block */}
        <div className={styles.main}>
          {/* Brand */}
          <div className={styles.brand}>
            <h2 className={styles.wordmark}>Arena Boxing Bondi</h2>
            <span className={styles.tagline}>
              Those who <em>dare.</em>
            </span>

            {showSocial && (
              <nav aria-label="Social media links" className={styles.social}>
                <a
                  href="https://instagram.com/arenaboxing"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Arena Boxing on Instagram"
                  className={styles.socialLink}
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com/arenaboxing"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Arena Boxing on Facebook"
                  className={styles.socialLink}
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </nav>
            )}
          </div>

          {/* Contact cells */}
          <div className={styles.cells}>
            <div className={styles.cell}>
              <span className={styles.cellKey}>Visit</span>
              <span className={styles.cellVal}>
                123 Campbell Pde <em>Bondi Beach</em>
              </span>
              <span className={styles.cellFine}>NSW 2026</span>
            </div>

            <div className={styles.cell}>
              <span className={styles.cellKey}>Phone &middot; tap to call</span>
              <a className={styles.cellVal} href="tel:+61400123456">
                0400 123 456
              </a>
              <span className={styles.cellFine}>During open hours.</span>
            </div>

            <div className={`${styles.cell} ${styles.cellWide}`}>
              <span className={styles.cellKey}>Email &middot; tap to open</span>
              <a className={styles.cellVal} href="mailto:hello@arenaboxing.com.au">
                hello@arenaboxing.com.au
              </a>
              <span className={styles.cellFine}>Replies within one business day.</span>
            </div>
          </div>
        </div>

        {/* Bottom edge rail */}
        <div className={styles.rail}>
          <span className={styles.liveDot} aria-hidden="true" />
          <span>Est. MMXXV</span>
          <span className={styles.railDot}>&middot;</span>
          <span>Bondi</span>
          <span className={styles.railDot}>&middot;</span>
          <span>33&deg;53&prime;S 151&deg;16&prime;E</span>
          <span className={styles.railDot}>&middot;</span>
          <span>Open 0530&ndash;2100</span>
          <span className={styles.railSpacer} />
          <span className={styles.railEnd}>
            &copy; {year} Arena Boxing. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
