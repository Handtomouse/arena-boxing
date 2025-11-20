/**
 * ScrollTransition Component
 * Pure black fade overlay triggered by scroll (IntersectionObserver)
 * Creates cinematic separation between homepage sections
 */

'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollTransitionProps {
  /** Optional className for customization */
  className?: string;
  /** Duration in milliseconds (default: 500ms) */
  duration?: number;
}

export default function ScrollTransition({
  className = '',
  duration = 500
}: ScrollTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger fade when element enters viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Reset after animation completes
          setTimeout(() => setIsVisible(false), duration);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% visible
        rootMargin: '0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [duration]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-24 md:h-32 ${className}`}
      aria-hidden="true"
    >
      {/* Black fade overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black pointer-events-none transition-opacity ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transitionDuration: `${duration}ms`,
        }}
      />
    </div>
  );
}
