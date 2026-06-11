'use client';

import React from 'react';
import Button from '@/components/ui/Button';

export interface HeroBannerProps {
  variant: 'home' | 'timetable' | 'membership' | 'booking' | 'about' | 'location' | 'faq';
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  backgroundImage?: string;
  backgroundVideo?: string;
  height?: '50vh' | '60vh' | '70vh' | '80vh' | '100vh';
  overlayColor?: 'burgundy' | 'charcoal' | 'none';
  overlayOpacity?: number;
  icon?: boolean;
  cta?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  className?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  variant,
  title,
  subtitle,
  backgroundImage,
  backgroundVideo,
  height = '70vh',
  overlayColor = 'burgundy',
  overlayOpacity = 70,
  icon = false,
  cta,
  className = '',
}) => {
  const overlayColors = {
    burgundy: 'bg-burgundy-primary',
    charcoal: 'bg-charcoal-black',
    none: '',
  };

  const variantStyles = {
    home: 'justify-center items-center text-center',
    timetable: 'justify-center items-center text-center',
    membership: 'justify-center items-start text-left',
    booking: 'justify-center items-center text-center',
    about: 'justify-center items-center text-center',
    location: 'justify-center items-center text-center',
    faq: 'justify-center items-start text-left',
  };

  return (
    <section
      aria-labelledby="hero-title"
      className={`relative flex ${variantStyles[variant]} overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* Background Video */}
      {backgroundVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}

      {/* Background Image */}
      {!backgroundVideo && backgroundImage && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      )}

      {/* Fallback solid background */}
      {!backgroundVideo && !backgroundImage && (
        <div className="absolute inset-0 w-full h-full bg-burgundy-primary grunge-texture" />
      )}

      {/* Overlay */}
      {overlayColor !== 'none' && (
        <div
          className={`absolute inset-0 ${overlayColors[overlayColor]}`}
          style={{ opacity: overlayOpacity / 100 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-5 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Icon */}
          {icon && (
            <div className="animate-blur-in" style={{ animationDelay: '0.2s' }}>
              <img
                src="/images/icon/icon-cream.svg"
                alt="Arena Boxing"
                className="w-[70px] h-[50px] sm:w-[80px] sm:h-[55px] md:w-[90px] md:h-[60px] mx-auto"
              />
            </div>
          )}

          {/* Title */}
          <h1
            id="hero-title"
            className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider text-cream-primary animate-blur-in"
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <div
              className="font-[family-name:var(--font-tagline)] text-xl sm:text-2xl md:text-3xl italic text-cream-light animate-blur-in max-w-3xl"
              style={{ animationDelay: '0.3s' }}
            >
              {subtitle}
            </div>
          )}

          {/* CTA */}
          {cta && (
            <div className="animate-blur-in" style={{ animationDelay: '0.5s' }}>
              <Button
                variant="primary"
                size="lg"
                onClick={cta.onClick}
                className="min-w-[200px]"
              >
                {cta.text}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
