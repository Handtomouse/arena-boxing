/**
 * Arena Boxing - Homepage (The Immersive)
 * Cinematic, interactive homepage with expandable class cards
 * Option 3 design from plan
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import StrokeAnimatedIcon from '@/components/ui/StrokeAnimatedIcon';
import ScrollTransition from '@/components/sections/ScrollTransition';
import HapanaSkeleton from '@/components/ui/HapanaSkeleton';

// Code-split heavy components that aren't needed for initial render
const ExpandableClassCard = dynamic(
  () => import('@/components/sections/ExpandableClassCard'),
  {
    loading: () => (
      <div className="animate-pulse bg-charcoal-light h-64 border-3 border-cream-primary"></div>
    ),
  }
);

const RealHapanaWidget = dynamic(
  () => import('@/components/sections/RealHapanaWidget'),
  {
    loading: () => <HapanaSkeleton />,
    ssr: false, // Hapana widget requires browser APIs
  }
);

// Import ClassType separately for type safety
import type { ClassType } from '@/components/sections/ExpandableClassCard';

export default function HomePage() {
  const router = useRouter();
  const [expandedCard, setExpandedCard] = useState<ClassType | null>(null);
  const [showVictoryBurst, setShowVictoryBurst] = useState(false);

  const handleExpandCard = (type: ClassType) => {
    setExpandedCard(expandedCard === type ? null : type);
  };

  const handleCTAClick = () => {
    // Haptic feedback (mobile)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Trigger victory burst animation
    setShowVictoryBurst(true);
    setTimeout(() => setShowVictoryBurst(false), 800);

    // Navigate to booking page after animation
    setTimeout(() => {
      router.push('/booking');
    }, 400);
  };

  // Preload critical assets
  useEffect(() => {
    const preloadAssets = [
      { href: '/images/icon/icon-cream.webp', as: 'image', type: 'image/webp' },
      { href: '/images/tagline/those-who-dare-cream.webp', as: 'image', type: 'image/webp' },
    ];

    const links = preloadAssets.map((asset) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = asset.href;
      link.as = asset.as;
      if (asset.type) link.type = asset.type;
      document.head.appendChild(link);
      return link;
    });

    return () => {
      // Cleanup preload links
      links.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCTAClick();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="relative bg-charcoal-black">
      {/* ==================== SECTION 1: HERO ==================== */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          minHeight: '-webkit-fill-available',
        }}
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0"
          style={{
            animation: 'ken-burns 20s ease-out forwards, fade-in 4s ease-out forwards',
          }}
        >
          <source
            src="/videos/bb9897603397493d9b48c695b009df4e.HD-1080p-7.2Mbps-55774870.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-75" />

        {/* Burgundy Radial Gradient with Slow Pan */}
        <div
          className="absolute inset-0 animate-slow-pan"
          style={{
            background:
              'radial-gradient(ellipse at 45% 50%, rgba(125,30,30,0.15) 0%, rgba(80,20,20,0.20) 50%, rgba(0,0,0,0.3) 100%)',
          }}
        />

        {/* Grunge Texture Overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'url(/textures/grunge-light.webp)',
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
          }}
        />

        {/* Content */}
        <div
          className="relative z-10 flex flex-col items-center justify-center gap-8 md:gap-12 px-4 sm:px-6 md:px-8 text-center"
          style={{
            paddingTop: 'max(3.5rem, calc(env(safe-area-inset-top) + 1.5rem))',
            paddingBottom: 'max(3.5rem, calc(env(safe-area-inset-bottom) + 1.5rem))',
          }}
        >
          {/* Animated Icon */}
          <div
            className="animate-blur-in motion-reduce:animate-none motion-reduce:opacity-100 relative w-[55px] h-[35px] sm:w-[62px] sm:h-[39px] md:w-[70px] md:h-[44px] lg:w-[78px] lg:h-[49px] xl:w-[86px] xl:h-[54px] transition-all duration-500 hover:scale-105 hover:-translate-y-1"
            style={{
              animationDelay: '1.3s',
              animation: showVictoryBurst
                ? 'blur-in 3s ease-out backwards, settle-rotate 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
                : undefined,
            }}
          >
            <div
              className="premium-glow-icon animate-breathing-pulse"
              style={{
                filter:
                  'drop-shadow(0 0 60px rgba(125, 30, 30, 0.25)) drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
                transition: 'filter 1s ease-out',
              }}
            >
              <img
                src="/images/icon/icon-cream.svg"
                alt="Arena Boxing"
                className="w-full h-full object-contain"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
          </div>

          {/* "Those Who Dare" SVG Asset (from Landing) */}
          <div
            className="animate-blur-in motion-reduce:animate-none motion-reduce:opacity-100 w-full max-w-[340px] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl opacity-90"
            style={{
              animationDelay: '1.0s',
              letterSpacing: '0.08em',
              textRendering: 'optimizeLegibility',
              filter:
                'drop-shadow(0 4px 16px rgba(0,0,0,0.6)) drop-shadow(0 0 30px rgba(125,30,30,0.15))',
            }}
          >
            <picture>
              <source srcSet="/images/tagline/those-who-dare-cream.webp" type="image/webp" />
              <img
                src="/images/tagline/those-who-dare-cream.svg"
                alt="those who dare"
                className="w-full h-auto mx-auto"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </picture>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-blur-in"
            style={{ animationDelay: '1.6s' }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleCTAClick}
              className="animate-blood-glow transition-all duration-700 hover:tracking-[0.35em]"
              style={{ letterSpacing: '0.20em' }}
            >
              BOOK NOW
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                document.getElementById('who-we-are')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="transition-all duration-700 hover:tracking-[0.35em]"
              style={{ letterSpacing: '0.20em' }}
            >
              EXPLORE →
            </Button>
          </div>
        </div>

        {/* Victory Burst Overlay */}
        {showVictoryBurst && (
          <div
            className="fixed inset-0 z-50 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(163,31,31,0.4) 0%, transparent 70%)',
              animation: 'victory-burst 0.8s ease-out forwards',
            }}
          />
        )}
      </section>

      {/* ==================== SCROLL TRANSITION ==================== */}
      <ScrollTransition />

      {/* ==================== SECTION 2: WHO WE ARE ==================== */}
      <section
        id="who-we-are"
        className="relative bg-charcoal-black py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8"
      >
        {/* Headline */}
        <div className="max-w-6xl mx-auto mb-12 md:mb-16">
          <h2 className="font-ui text-cream-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight uppercase tracking-wider text-center">
            Arena Boxing Isn't a Gym.
            <br />
            It's a Proving Ground.
          </h2>
        </div>

        {/* Asymmetric Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[60fr_40fr] gap-8 md:gap-12">
          {/* Left: Body Copy (60%) */}
          <div className="space-y-6">
            <p className="font-body text-cream-primary text-lg md:text-xl leading-relaxed">
              We don't coddle.
            </p>
            <p className="font-body text-cream-primary text-lg md:text-xl leading-relaxed">
              We don't pander.
            </p>
            <p className="font-body text-cream-primary text-lg md:text-xl leading-relaxed">
              We forge fighters from raw will.
            </p>
          </div>

          {/* Right: Oversized "DARE" Pull (40%) */}
          <div className="relative flex items-center justify-center">
            {/* Faint beast icon background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'url(/images/icon/icon-cream.svg)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />

            {/* DARE text */}
            <p
              className="relative font-tagline italic text-blood-red text-6xl sm:text-7xl md:text-8xl lg:text-9xl opacity-25"
              style={{
                filter: 'drop-shadow(0 8px 32px rgba(163,31,31,0.5))',
              }}
            >
              DARE
            </p>
          </div>
        </div>
      </section>

      {/* ==================== SCROLL TRANSITION ==================== */}
      <ScrollTransition />

      {/* ==================== SECTION 3: CHOOSE YOUR BATTLE ==================== */}
      <section
        className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(125,30,30,0.3) 0%, rgba(26,26,26,1) 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <h2 className="font-ui text-cream-primary text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-center mb-12 md:mb-16">
            Choose Your Battle
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <ExpandableClassCard
              type="work"
              isExpanded={expandedCard === 'work'}
              onToggle={() => handleExpandCard('work')}
            />
            <ExpandableClassCard
              type="craft"
              isExpanded={expandedCard === 'craft'}
              onToggle={() => handleExpandCard('craft')}
            />
            <ExpandableClassCard
              type="spar"
              isExpanded={expandedCard === 'spar'}
              onToggle={() => handleExpandCard('spar')}
            />
          </div>
        </div>
      </section>

      {/* ==================== SCROLL TRANSITION ==================== */}
      <ScrollTransition />

      {/* ==================== SECTION 4: BROWSE ALL SESSIONS ==================== */}
      <section className="relative bg-charcoal-black py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <h2 className="font-ui text-cream-primary text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-center mb-12 md:mb-16">
            Or Browse All Sessions
          </h2>

          {/* Hapana Widget */}
          <div
            className="border-3 border-cream-dark p-6 md:p-8"
            style={{
              backgroundImage: 'url(/textures/grunge-light.webp)',
              backgroundBlendMode: 'multiply',
              backgroundSize: 'cover',
            }}
          >
            <RealHapanaWidget
              widgetId={process.env.NEXT_PUBLIC_HAPANA_WIDGET_ID || 'ZjV0eGJ3cGUzU1c1VGtlcUxGOVFDUT09'}
              dataType="classes"
              theme="dark"
            />
          </div>

          {/* Free Trial CTA */}
          <p className="text-center text-cream-primary font-body text-lg md:text-xl mt-8">
            Not sure where to start?{' '}
            <button
              onClick={handleCTAClick}
              className="text-blood-red underline hover:text-cream-primary transition-colors"
            >
              Free trial →
            </button>
          </p>
        </div>
      </section>

      {/* ==================== SCROLL TRANSITION ==================== */}
      <ScrollTransition />

      {/* ==================== SECTION 5: FINAL CTA ==================== */}
      <section className="relative min-h-screen flex items-center justify-center bg-charcoal-black px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Headline */}
          <h2 className="font-tagline italic text-cream-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-12">
            First session free.
            <br />
            After that, you earn it.
          </h2>

          {/* CTA Button */}
          <Button
            variant="primary"
            size="lg"
            onClick={handleCTAClick}
            className="animate-blood-glow text-xl md:text-2xl px-12 py-6"
          >
            CLAIM YOUR TRIAL BY FIRE
          </Button>
        </div>

        {/* Victory Burst on Click */}
        {showVictoryBurst && (
          <div
            className="fixed inset-0 z-50 pointer-events-none"
            style={{
              background: 'rgba(163,31,31,0.3)',
              animation: 'blood-flash 0.2s ease-out forwards',
            }}
          />
        )}
      </section>
    </div>
  );
}
