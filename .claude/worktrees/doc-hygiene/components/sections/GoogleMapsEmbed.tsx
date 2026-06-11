'use client';

import React, { useState } from 'react';

export interface GoogleMapsEmbedProps {
  address: string;
  zoom?: number;
  mapType?: 'roadmap' | 'satellite';
  className?: string;
}

const GoogleMapsEmbed: React.FC<GoogleMapsEmbedProps> = ({
  address,
  zoom = 15,
  mapType = 'roadmap',
  className = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}&zoom=${zoom}&maptype=${mapType}`;

  // Fallback to simple iframe without API key
  const fallbackUrl = `https://maps.google.com/maps?q=${encodedAddress}&output=embed`;

  const loadMap = () => {
    setIsLoaded(true);
  };

  return (
    <div role="region" aria-label="Gym location map" className={`relative ${className}`}>
      {!isLoaded ? (
        <button
          onClick={loadMap}
          aria-label="Load interactive map"
          className="relative w-full h-[400px] md:h-[500px] overflow-hidden group cursor-pointer"
        >
          <img
            src="/images/map-placeholder.jpg"
            alt={`Map showing Arena Boxing at ${address}`}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />

          <div className="absolute inset-0 bg-burgundy-primary/50 flex items-center justify-center group-hover:bg-burgundy-primary/30 transition-all duration-300">
            <div className="text-center space-y-4">
              <svg
                className="w-16 h-16 mx-auto text-cream-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
              <p className="font-[family-name:var(--font-ui)] text-cream-primary text-lg uppercase tracking-wide">
                Load Interactive Map
              </p>
            </div>
          </div>
        </button>
      ) : (
        <div className="w-full h-[400px] md:h-[500px] border-3 border-burgundy-primary">
          <iframe
            src={fallbackUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map showing location: ${address}`}
          />
        </div>
      )}

      {/* Address below map */}
      <div className="mt-4 p-4 bg-cream-primary border-2 border-burgundy-primary">
        <p className="font-[family-name:var(--font-ui)] text-charcoal-black text-center">
          <strong>Arena Boxing Bondi</strong>
          <br />
          {address}
        </p>
      </div>
    </div>
  );
};

export default GoogleMapsEmbed;
