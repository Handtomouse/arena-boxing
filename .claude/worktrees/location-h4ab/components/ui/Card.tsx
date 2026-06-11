/**
 * Arena Boxing Card Component
 * Distressed borders, grunge textures, gothic aesthetic
 */

import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark';
  distressed?: boolean;
}

export default function Card({
  children,
  className = '',
  variant = 'default',
  distressed = true,
}: CardProps) {
  const baseStyles = `
    relative
    p-8
    border-[3px]
    overflow-visible
  `;

  const variantStyles = {
    default: `
      bg-[var(--cream-primary)]
      border-[var(--burgundy-primary)]
      text-[var(--charcoal-black)]
    `,
    dark: `
      bg-[var(--charcoal-black)]
      border-[var(--cream-primary)]
      text-[var(--cream-primary)]
    `,
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {/* Grunge texture overlay */}
      {distressed && (
        <div
          className="absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: 'url(/textures/grunge-light.webp)',
            backgroundSize: 'cover',
          }}
          aria-hidden="true"
        />
      )}

      {/* Torn edge effect (optional future enhancement with SVG) */}
      {distressed && (
        <div
          className="absolute -inset-[3px] -z-10 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
