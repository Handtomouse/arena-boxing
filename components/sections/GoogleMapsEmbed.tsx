'use client';

import React from 'react';
import styles from './GoogleMapsEmbed.module.css';

export interface GoogleMapsEmbedProps {
  address: string;
  /** Retained for API compatibility; the duotone map is rendered for the studio address. */
  zoom?: number;
  mapType?: 'roadmap' | 'satellite';
  className?: string;
}

/**
 * §01 map block. A duotone static map of the studio (charcoal/burgundy,
 * matched to the editorial field) with letterpress chrome and a
 * click-through to live Google Maps directions. No third-party iframe and
 * no API key — the wayfinding lives in the directions deep-link, which
 * opens the visitor's native maps app.
 */
const GoogleMapsEmbed: React.FC<GoogleMapsEmbedProps> = ({ address, className = '' }) => {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <a
      href={directionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      role="region"
      aria-label={`Map showing Arena Boxing at ${address}. Opens Google Maps directions in a new tab.`}
      className={`${styles.map} ${className}`}
    >
      <img
        src="/images/map-bondi-duotone.jpg"
        alt={`Duotone map of ${address}`}
        className={styles.img}
        loading="lazy"
        decoding="async"
      />
      <span className={styles.bloom} aria-hidden="true" />
      <span className={styles.grain} aria-hidden="true" />

      <span className={`${styles.corner} ${styles.tl}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.tr}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.bl}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.br}`} aria-hidden="true" />

      <span className={styles.coord} aria-hidden="true">
        33&deg;53&prime;S &middot; 151&deg;16&prime;E
      </span>

      <span className={styles.pinWrap} aria-hidden="true">
        <span className={styles.pin}>
          <span className={styles.pulse} />
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="48" height="48">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </span>
        <span className={styles.place}>Arena Boxing &middot; Bondi</span>
      </span>

      <span className={styles.open}>
        Open in Google Maps <span className={styles.arrow}>&rarr;</span>
      </span>

      <span className={styles.scale} aria-hidden="true">
        <span className={styles.scaleBar} />
        <span>200 m</span>
      </span>
    </a>
  );
};

export default GoogleMapsEmbed;
