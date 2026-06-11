/**
 * StrokeAnimatedIcon Component
 * Arena beast icon with SVG stroke-draw animation
 * Breathing pulse effect for cinematic entrance
 */

'use client';

import { useEffect, useState } from 'react';

interface StrokeAnimatedIconProps {
  /** Optional className for sizing */
  className?: string;
  /** Start animation automatically (default: true) */
  autoPlay?: boolean;
}

export default function StrokeAnimatedIcon({
  className = 'w-32 h-32',
  autoPlay = true,
}: StrokeAnimatedIconProps) {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (autoPlay) {
      // Start drawing animation after brief delay
      setTimeout(() => setIsDrawing(true), 100);
    }
  }, [autoPlay]);

  return (
    <div className={`relative ${className}`}>
      {/* Use the pre-existing cream icon with glow effect */}
      <img
        src="/images/icon/icon-cream.svg"
        alt="Arena Boxing Icon"
        className={`w-full h-auto transition-all duration-1000 ${
          isDrawing ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          filter: isDrawing
            ? 'drop-shadow(0 0 20px rgba(232,221,211,0.5)) drop-shadow(0 0 40px rgba(125,30,30,0.3))'
            : 'drop-shadow(0 0 0px rgba(232,221,211,0))',
        }}
      />

      {/* Pulsing glow effect */}
      {isDrawing && (
        <div
          className="absolute inset-0 animate-blood-glow pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(163,31,31,0.2) 0%, transparent 70%)',
          }}
        />
      )}
    </div>
  );
}
