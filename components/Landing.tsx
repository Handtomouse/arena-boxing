/**
 * Arena Boxing - Landing Page
 * Simple video immersion with "ARENA" + "Enter"
 * Auto-enters after 5 seconds or click
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Landing() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);

  useEffect(() => {
    // Preload critical assets
    const preloadAssets = [
      { href: '/images/icon/icon-cream.webp', as: 'image', type: 'image/webp' },
      { href: '/images/wordmark/arena-cream.webp', as: 'image', type: 'image/webp' },
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

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('arena-visited');
    if (hasVisited) {
      setIsFirstVisit(false);
      setCountdown(2); // Reduce countdown for repeat visitors
    }

    // Auto-enter after countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Trigger cinematic transition
          setIsTransitioning(true);
          // Navigate after animation
          setTimeout(() => {
            router.push('/home');
          }, 800);
          return 0;
        }

        // Haptic pulse on each countdown tick (mobile only)
        if (navigator.vibrate) {
          navigator.vibrate(30);
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  useEffect(() => {
    // Keyboard shortcuts (Enter/Space to skip)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    // Mouse parallax effect with intensification
    const handleMouseMove = (e: MouseEvent) => {
      // Amplify movement by 20% for more dramatic effect
      const x = (e.clientX / window.innerWidth) * 120 - 10;
      const y = (e.clientY / window.innerHeight) * 120 - 10;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEnter = () => {
    // Play sound effect
    const audio = new Audio('/sounds/punch.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => {
      // Ignore audio play errors (autoplay policy)
    });

    // Haptic feedback on mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Mark as visited for future sessions
    localStorage.setItem('arena-visited', 'true');

    // Trigger blood-red skip flash
    setIsSkipping(true);

    // Then trigger cinematic fade-out transition after flash
    setTimeout(() => {
      setIsTransitioning(true);
    }, 200);

    // Navigate after both animations complete (200ms flash + 800ms transition)
    setTimeout(() => {
      router.push('/home');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-crosshair">
      {/* Full-Screen Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
      >
        <source
          src="/videos/bb9897603397493d9b48c695b009df4e.HD-1080p-7.2Mbps-55774870.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay (70% opacity) */}
      <div className="absolute inset-0 bg-black opacity-70" />

      {/* Vignette Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Grunge Texture Overlay with Intensified Parallax */}
      <div
        className="absolute inset-0 transition-all duration-100"
        style={{
          backgroundImage: 'url(/textures/grunge-light.webp)',
          backgroundSize: 'cover',
          backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
          opacity: 0.15, // Increased from 0.10
        }}
      />

      {/* Blood Splatter Accent (Bottom Left) */}
      <div
        className="absolute bottom-0 left-0 w-64 h-64 opacity-10 pointer-events-none animate-fade-in"
        style={{
          backgroundImage: 'url(/textures/blood-splatter.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom left',
          animationDelay: '1.4s',
        }}
      />

      {/* Content - Asymmetric Left Positioning (40%) */}
      <div className="relative z-10 max-w-[40%] ml-[10%] py-[25vh]">
        {/* ARENA Wordmark - Old London typeface with Letter Expansion */}
        <div
          className="
            mb-8
            animate-letter-expand
            px-4
          "
          style={{
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))',
            textShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
            animationDelay: '0s',
          }}
        >
          <picture>
            <source srcSet="/images/wordmark/arena-cream.webp" type="image/webp" />
            <img
              src="/images/wordmark/arena-cream.svg"
              alt="ARENA"
              className="w-full max-w-[clamp(20rem,60vw,50rem)] mx-auto"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </picture>
        </div>

        {/* "Those Who Dare" Tagline - Old London Alternative with Letterpress */}
        <div
          className="
            mb-12
            opacity-90
            animate-fade-in
            px-4
          "
          style={{
            animationDelay: '0.3s',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
            textShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
          }}
        >
          <picture>
            <source srcSet="/images/tagline/those-who-dare-cream.webp" type="image/webp" />
            <img
              src="/images/tagline/those-who-dare-cream.svg"
              alt="those who dare"
              className="w-full max-w-[clamp(16rem,50vw,32rem)]"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </picture>
        </div>

        {/* Enter Button with Micro-Bounce */}
        <button
          onClick={handleEnter}
          className="
            group
            text-[var(--cream-primary)]
            text-xl
            tracking-widest
            uppercase
            font-[family-name:var(--font-ui)]
            transition-all
            duration-300
            hover:text-[var(--blood-red)]
            hover-micro-bounce
            hover:animate-blood-glow
            animate-fade-in
          "
          style={{
            animationDelay: '0.5s',
            textShadow: '0 1px 0 rgba(0,0,0,0.8), 0 -1px 0 rgba(255,255,255,0.1)',
          }}
        >
          Enter
          <div className="
            w-16 h-[2px]
            bg-[var(--cream-primary)]
            mx-auto
            mt-2
            group-hover:w-24
            group-hover:bg-[var(--blood-red)]
            transition-all
            duration-300
          " />
        </button>

        {/* Countdown Indicator with Icon + Progress Ring */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          {/* Icon + SVG Progress Ring Container */}
          <div className="relative w-[140px] h-[140px] flex items-center justify-center">
            {/* Arena Icon - Rotating */}
            <div
              className="absolute w-16 h-16 transition-transform duration-1000 ease-linear"
              style={{
                transform: `rotate(${((isFirstVisit ? 5 : 2) - countdown) * (360 / (isFirstVisit ? 5 : 2))}deg)`,
              }}
            >
              <picture>
                <source srcSet="/images/icon/icon-cream.webp" type="image/webp" />
                <img
                  src="/images/icon/icon-cream.svg"
                  alt="Arena"
                  className="w-full h-full object-contain opacity-90"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </picture>
            </div>

            {/* SVG Progress Ring */}
            <svg
              className="absolute"
              width="140"
              height="140"
              style={{ transform: 'rotate(-90deg)' }}
            >
              {/* Background ring */}
              <circle
                cx="70"
                cy="70"
                r="64"
                stroke="var(--cream-dark)"
                strokeWidth="2"
                fill="none"
                opacity="0.2"
              />
              {/* Progress ring */}
              <circle
                cx="70"
                cy="70"
                r="64"
                stroke="var(--blood-red)"
                strokeWidth="3"
                fill="none"
                strokeDasharray={2 * Math.PI * 64}
                strokeDashoffset={(countdown / (isFirstVisit ? 5 : 2)) * (2 * Math.PI * 64)}
                className="transition-all duration-1000 ease-linear"
                opacity="0.8"
                style={{
                  filter: countdown === 1 ? 'drop-shadow(0 0 8px var(--blood-red))' : 'none',
                }}
              />
            </svg>
          </div>

          {/* Countdown Text */}
          <p
            className="
              mt-4
              text-[var(--cream-dark)]
              text-sm
              font-[family-name:var(--font-body)]
              animate-countdown-pulse
            "
          >
            Auto-entering in {countdown}s
          </p>
        </div>
      </div>

      {/* Skip hint (corners) */}
      <p
        className="
          absolute
          top-6
          right-6
          text-[var(--cream-dark)]
          text-xs
          opacity-40
          uppercase
          tracking-wider
          font-[family-name:var(--font-ui)]
          animate-fade-in
        "
        style={{ animationDelay: '1s' }}
      >
        Press Enter or Click to Skip
      </p>

      {/* Blood-Red Skip Flash */}
      {isSkipping && (
        <div
          className="absolute inset-0 bg-[var(--blood-red)] z-40 animate-blood-flash"
          style={{
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Cinematic Fade-Out Transition Overlay */}
      {isTransitioning && (
        <div
          className="absolute inset-0 bg-black z-50 animate-fade-out-collapse"
          style={{
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}
