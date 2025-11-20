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
  const [countdown, setCountdown] = useState(20);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [showVictoryFlash, setShowVictoryFlash] = useState(false);
  const [pathLengths, setPathLengths] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

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
      // Note: Keeping 20s countdown for all visitors now
    }

    // Auto-enter after countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Trigger victory flash at completion
          setShowVictoryFlash(true);
          setTimeout(() => setShowVictoryFlash(false), 400);

          // Navigate to home after animations complete (10s delay for wordmark stroke animation)
          setIsTransitioning(true);
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

  useEffect(() => {
    // Calculate SVG path lengths for wordmark stroke-dasharray animation
    const wordmarkPaths = document.querySelectorAll('.wordmark-animation-path');

    if (wordmarkPaths.length > 0) {
      const lengths = Array.from(wordmarkPaths).map((path) => {
        return (path as SVGPathElement).getTotalLength();
      });
      setPathLengths(lengths);

      // Start drawing animation after a brief delay
      setTimeout(() => {
        setIsDrawing(true);
      }, 100);
    }
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

    // Navigate after skip flash
    setTimeout(() => {
      setIsTransitioning(true);
    }, 200);
    setTimeout(() => {
      router.push('/home');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-crosshair bg-black">
      {/* Full-Screen Video Background - Fades in over black */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/video-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-0"
        style={{
          animation: 'ken-burns 20s ease-out forwards, fade-in 4s ease-out forwards',
        }}
      >
        <source
          src="/videos/arena-background-compressed.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay - Luxury Editorial (75% opacity) */}
      <div className="absolute inset-0 bg-black opacity-75" />

      {/* Enhanced Burgundy Tint with Depth + Parallax Movement */}
      <div
        className="absolute inset-0 animate-slow-pan"
        style={{
          background: 'radial-gradient(ellipse at 45% 50%, rgba(125,30,30,0.15) 0%, rgba(80,20,20,0.20) 50%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      {/* Content - Premium Layout with Perfect Vertical Rhythm */}
      <div
        className="relative z-10 flex flex-col items-center justify-between min-h-[100dvh] min-h-screen px-4 sm:px-5 md:px-6 lg:px-8 pt-14 pb-14 sm:pt-18 sm:pb-18 md:pt-[86px] md:pb-[86px] lg:pt-[101px] lg:pb-[101px]"
        style={{
          paddingTop: 'max(3.5rem, calc(env(safe-area-inset-top) + 1.5rem))',
          paddingBottom: 'max(3.5rem, calc(env(safe-area-inset-bottom) + 1.5rem))',
          minHeight: '-webkit-fill-available',
        }}
      >

        {/* 1. TOP: "those who dare" SVG Logo - Cinematic Entrance */}
        <div
          className="animate-blur-in motion-reduce:animate-none motion-reduce:opacity-100 w-full max-w-[340px] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl opacity-90"
          style={{
            animationDelay: '1.0s',
            letterSpacing: '0.08em',
            textRendering: 'optimizeLegibility',
            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.6)) drop-shadow(0 0 30px rgba(125,30,30,0.15))'
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

        {/* 2. MIDDLE: MASSIVE "ARENA" Wordmark + Enter Button */}
        <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full">
          {/* ARENA Wordmark (HERO) - Stroke-Drawing Animation */}
          <div
            className={`w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[520px] xl:max-w-[640px] 2xl:max-w-[720px] transition-transform duration-700 hover:scale-[1.01] ${countdown > 0 && countdown < 20 ? 'wordmark-glow-active' : 'drop-shadow-2xl'}`}
            style={{
              animation: 'fade-in 3s ease-out forwards',
              opacity: 0
            }}
          >
            <svg
              id="wordmark-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 4000 1461"
              className="w-full h-auto"
              style={{ imageRendering: 'crisp-edges' }}
            >
              <g>
                {/* Path 1 - First A (Dual Layer) */}
                <g>
                  {/* Static base stroke - dim outline (10% opacity) */}
                  <path
                    d="M874.3,1305.1c-53.5-30.5-84.6-65.5-93.3-104.8-3.3-14.2-6-30.3-8.2-48.3-2.2-18-3.8-38.5-4.9-61.4l-275,214.4c-89.5-64.4-173-112.4-250.5-144.1-26.2-9.8-49.1-14.7-68.8-14.7s-16.9,3.8-24.6,11.5c-7.6,7.6-11.5,15.8-11.5,24.6s1.9,8.7,5.7,16.4c3.8,7.6,7.9,15.6,12.3,23.7,4.3,8.2,8.2,16.4,11.5,24.6,3.3,8.2,4.9,15,4.9,20.5-2.2,21.8-16.4,32.7-42.6,32.7s-46.4-16.9-54-50.8v-8.2c-1.1-2.2-1.6-4.9-1.6-8.2,0-29.5,9.8-60.6,29.5-93.3,8.7-14.2,18-27.8,27.8-40.9,9.8-13.1,19.1-26.7,27.8-40.9l117.9-173.5c-138.6-86.2-207.9-199.2-207.9-338.9s39.8-188.3,119.5-263.6c79.6-75.3,170.8-115.1,273.4-119.5h14.7c105.8,0,211.7,33.8,317.6,101.5,5.4,3.3,11.5,7.4,18,12.3,6.5,4.9,14.2,10.6,22.9,17.2,25.1-27.3,51.8-51.3,80.2-72,28.4-20.7,58.4-38.2,90-52.4l18,26.2-26.2,18c-45.8,30.6-74.2,61.1-85.1,91.7-9.8,26.2-14.7,58.9-14.7,98.2v27.8c0-1.1,0,1.1,0,6.5s.5,14.2,1.6,26.2l26.2,553.3v13.1c0,46.9,5.4,81.8,16.4,104.8,6.5,15.3,16.9,22.9,31.1,22.9s27.8-8.2,47.5-24.6c1.1-1.1,3.3-3,6.5-5.7,3.3-2.7,5.4-4.6,6.5-5.7l26.2,27.8-185,155.5ZM429,499.7c-40.4,0-77.5,21.8-111.3,65.5l-29.5-14.7c40.4-101.5,100.4-152.2,180.1-152.2s85.7,6,135.9,18l45.8-68.8c-61.1-32.7-131.5-49.1-211.2-49.1s-154.4,28.9-224.3,86.8c-55.7,48-83.5,107.5-83.5,178.4,0,111.3,56.2,206.8,168.6,286.5l222.6-320.9c-36-19.6-67.1-29.5-93.3-29.5ZM296.4,917.1l-63.8,91.7,374.9,158.8,158.8-122.8-6.5-127.7h-463.3ZM681.1,368.7l-304.5,432.2h376.5l-18-389.6c-14.2-14.2-32.2-28.4-54-42.6Z"
                    fill="none"
                    stroke="#E8DDD3"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.1}
                  />
                  {/* Animated stroke - initial trace + breathing pulse */}
                  <path
                    className="wordmark-animation-path"
                    d="M874.3,1305.1c-53.5-30.5-84.6-65.5-93.3-104.8-3.3-14.2-6-30.3-8.2-48.3-2.2-18-3.8-38.5-4.9-61.4l-275,214.4c-89.5-64.4-173-112.4-250.5-144.1-26.2-9.8-49.1-14.7-68.8-14.7s-16.9,3.8-24.6,11.5c-7.6,7.6-11.5,15.8-11.5,24.6s1.9,8.7,5.7,16.4c3.8,7.6,7.9,15.6,12.3,23.7,4.3,8.2,8.2,16.4,11.5,24.6,3.3,8.2,4.9,15,4.9,20.5-2.2,21.8-16.4,32.7-42.6,32.7s-46.4-16.9-54-50.8v-8.2c-1.1-2.2-1.6-4.9-1.6-8.2,0-29.5,9.8-60.6,29.5-93.3,8.7-14.2,18-27.8,27.8-40.9,9.8-13.1,19.1-26.7,27.8-40.9l117.9-173.5c-138.6-86.2-207.9-199.2-207.9-338.9s39.8-188.3,119.5-263.6c79.6-75.3,170.8-115.1,273.4-119.5h14.7c105.8,0,211.7,33.8,317.6,101.5,5.4,3.3,11.5,7.4,18,12.3,6.5,4.9,14.2,10.6,22.9,17.2,25.1-27.3,51.8-51.3,80.2-72,28.4-20.7,58.4-38.2,90-52.4l18,26.2-26.2,18c-45.8,30.6-74.2,61.1-85.1,91.7-9.8,26.2-14.7,58.9-14.7,98.2v27.8c0-1.1,0,1.1,0,6.5s.5,14.2,1.6,26.2l26.2,553.3v13.1c0,46.9,5.4,81.8,16.4,104.8,6.5,15.3,16.9,22.9,31.1,22.9s27.8-8.2,47.5-24.6c1.1-1.1,3.3-3,6.5-5.7,3.3-2.7,5.4-4.6,6.5-5.7l26.2,27.8-185,155.5ZM429,499.7c-40.4,0-77.5,21.8-111.3,65.5l-29.5-14.7c40.4-101.5,100.4-152.2,180.1-152.2s85.7,6,135.9,18l45.8-68.8c-61.1-32.7-131.5-49.1-211.2-49.1s-154.4,28.9-224.3,86.8c-55.7,48-83.5,107.5-83.5,178.4,0,111.3,56.2,206.8,168.6,286.5l222.6-320.9c-36-19.6-67.1-29.5-93.3-29.5ZM296.4,917.1l-63.8,91.7,374.9,158.8,158.8-122.8-6.5-127.7h-463.3ZM681.1,368.7l-304.5,432.2h376.5l-18-389.6c-14.2-14.2-32.2-28.4-54-42.6Z"
                    fill="none"
                    stroke="#E8DDD3"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      '--path-length': `${pathLengths[0] || 10000}px`,
                      strokeDasharray: pathLengths[0] || 10000,
                      strokeDashoffset: pathLengths[0] || 10000,
                      animation: isDrawing ? 'initial-trace 1s ease-out forwards, breathing-trace 3s ease-in-out 1s infinite alternate' : 'none',
                    } as React.CSSProperties}
                  />
                </g>
                {/* Path 2 - R (Dual Layer) */}
                <g>
                  {/* Static base stroke - dim outline (10% opacity) */}
                  <path
                    d="M1224.6,470.2c55.7,31.7,93.8,75.9,114.6,132.6l149-135.9,117.9,145.7-111.3,103.1-96.6-119.5-65.5,57.3v460l80.2,58.9,75.3-58.9,22.9,26.2-198.1,158.8c-66.6-64.4-133.2-103.1-199.7-116.2v-19.6c37.1-20.7,55.7-63.8,55.7-129.3v-330.7c0-43.6-7.6-74.7-22.9-93.3l-16.4-16.4-47.5,39.3-19.6-22.9,162.1-139.1Z"
                    fill="none"
                    stroke="#E8DDD3"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.1}
                  />
                  {/* Animated stroke - initial trace + breathing pulse */}
                  <path
                    className="wordmark-animation-path"
                    d="M1224.6,470.2c55.7,31.7,93.8,75.9,114.6,132.6l149-135.9,117.9,145.7-111.3,103.1-96.6-119.5-65.5,57.3v460l80.2,58.9,75.3-58.9,22.9,26.2-198.1,158.8c-66.6-64.4-133.2-103.1-199.7-116.2v-19.6c37.1-20.7,55.7-63.8,55.7-129.3v-330.7c0-43.6-7.6-74.7-22.9-93.3l-16.4-16.4-47.5,39.3-19.6-22.9,162.1-139.1Z"
                    fill="none"
                    stroke="#E8DDD3"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      '--path-length': `${pathLengths[1] || 10000}px`,
                      strokeDasharray: pathLengths[1] || 10000,
                      strokeDashoffset: pathLengths[1] || 10000,
                      animation: isDrawing ? 'initial-trace 1s ease-out forwards, breathing-trace 3s ease-in-out 1s infinite alternate' : 'none',
                    } as React.CSSProperties}
                  />
                </g>
                {/* Path 3 - E (Dual Layer) */}
                <g>
                  {/* Static base stroke - dim outline (10% opacity) */}
                  <path
                    d="M1902.3,1298.5c-93.9-54.6-177.9-88.4-252.1-101.5v-18c33.8-16.4,51.8-53.5,54-111.3v-355.2c0-41.5-18-62.2-54-62.2l-6.5-18c65.5-28.4,124.4-55.9,176.8-82.7,52.4-26.7,99.3-52.6,140.8-77.8l199.7,255.4-296.3,245.5v150.6c58.9,29.5,106.4,54,142.4,73.7l116.2-81.8,16.4,22.9-237.4,160.4ZM2031.6,782.9l-167-214.4v350.3l167-135.9Z"
                    fill="none"
                    stroke="#E8DDD3"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.1}
                  />
                  {/* Animated stroke - initial trace + breathing pulse */}
                  <path
                    className="wordmark-animation-path"
                    d="M1902.3,1298.5c-93.9-54.6-177.9-88.4-252.1-101.5v-18c33.8-16.4,51.8-53.5,54-111.3v-355.2c0-41.5-18-62.2-54-62.2l-6.5-18c65.5-28.4,124.4-55.9,176.8-82.7,52.4-26.7,99.3-52.6,140.8-77.8l199.7,255.4-296.3,245.5v150.6c58.9,29.5,106.4,54,142.4,73.7l116.2-81.8,16.4,22.9-237.4,160.4ZM2031.6,782.9l-167-214.4v350.3l167-135.9Z"
                    fill="none"
                    stroke="#E8DDD3"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      '--path-length': `${pathLengths[2] || 10000}px`,
                      strokeDasharray: pathLengths[2] || 10000,
                      strokeDashoffset: pathLengths[2] || 10000,
                      animation: isDrawing ? 'initial-trace 1s ease-out forwards, breathing-trace 3s ease-in-out 1s infinite alternate' : 'none',
                    } as React.CSSProperties}
                  />
                </g>
                {/* Path 4 - N (Dual Layer) */}
                <g>
                  {/* Static base stroke - dim outline (10% opacity) */}
                  <path
                    d="M2354.1,470.2c36,31.7,59.5,56.2,70.4,73.7,15.3,25.1,22.9,56.8,22.9,94.9l203-168.6,117.9,117.9,76.9-73.7,22.9,26.2c-6.5,6.5-14.2,14.7-22.9,24.6-8.7,9.8-18.6,21.8-29.5,36-20.7,31.7-31.1,83-31.1,153.9v325.8c0,52.4,13.1,78.6,39.3,78.6s22.4-6,37.7-18v-1.6l13.1-9.8,19.6,31.1-171.9,137.5c-7.6-5.5-16.1-13.1-25.4-22.9-9.3-9.8-19.9-21.8-31.9-36-27.3-38.2-40.9-98.2-40.9-180.1v-410.9l-63.8-65.5-113,93.3v448.5l55.7,58.9-140.8,114.6-139.1-117.9,63.8-58.9v-425.6c0-3.3.5-5.5,1.6-6.5v-31.1c-1.1-37.1-13.1-55.7-36-55.7s-25.7,5.5-40.9,16.4l-19.6-26.2,162.1-122.8Z"
                    fill="none"
                    stroke="#E8DDD3"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.1}
                  />
                  {/* Animated stroke - initial trace + breathing pulse */}
                  <path
                    className="wordmark-animation-path"
                    d="M2354.1,470.2c36,31.7,59.5,56.2,70.4,73.7,15.3,25.1,22.9,56.8,22.9,94.9l203-168.6,117.9,117.9,76.9-73.7,22.9,26.2c-6.5,6.5-14.2,14.7-22.9,24.6-8.7,9.8-18.6,21.8-29.5,36-20.7,31.7-31.1,83-31.1,153.9v325.8c0,52.4,13.1,78.6,39.3,78.6s22.4-6,37.7-18v-1.6l13.1-9.8,19.6,31.1-171.9,137.5c-7.6-5.5-16.1-13.1-25.4-22.9-9.3-9.8-19.9-21.8-31.9-36-27.3-38.2-40.9-98.2-40.9-180.1v-410.9l-63.8-65.5-113,93.3v448.5l55.7,58.9-140.8,114.6-139.1-117.9,63.8-58.9v-425.6c0-3.3.5-5.5,1.6-6.5v-31.1c-1.1-37.1-13.1-55.7-36-55.7s-25.7,5.5-40.9,16.4l-19.6-26.2,162.1-122.8Z"
                    fill="none"
                    stroke="#E8DDD3"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      '--path-length': `${pathLengths[3] || 10000}px`,
                      strokeDasharray: pathLengths[3] || 10000,
                      strokeDashoffset: pathLengths[3] || 10000,
                      animation: isDrawing ? 'initial-trace 1s ease-out forwards, breathing-trace 3s ease-in-out 1s infinite alternate' : 'none',
                    } as React.CSSProperties}
                  />
                </g>
              </g>
              {/* Path 5 - Second A (Dual Layer) */}
              <g>
                {/* Static base stroke - dim outline (10% opacity) */}
                <path
                  d="M2940.8,1143l26.2-27.8c1.1,1.1,3.3,3,6.5,5.7,3.3,2.7,5.5,4.7,6.5,5.7,19.6,16.4,35.5,24.6,47.5,24.6,14.2,0,24.6-7.6,31.1-22.9,10.9-22.9,16.4-57.8,16.4-104.8v-6.5s0-6.5,0-6.5l26.2-553.3c1.1-12,1.6-20.7,1.6-26.2,0-5.4,0-7.6,0-6.5v-27.8c0-39.3-4.9-72-14.7-98.2-10.9-30.5-39.3-61.1-85.1-91.7l-26.2-18,18-26.2c31.7,14.2,61.7,31.7,90,52.4,28.4,20.7,55.1,44.8,80.2,72,8.7-6.5,16.4-12.3,22.9-17.2,6.5-4.9,12.6-9,18-12.3,105.9-67.7,211.7-101.5,317.6-101.5h6.5s8.2,0,8.2,0c102.6,4.4,193.7,44.2,273.4,119.5,79.7,75.3,119.5,163.2,119.5,263.6,0,139.7-69.3,252.7-207.9,338.9l117.9,173.5c8.7,14.2,18,27.8,27.8,40.9,9.8,13.1,19.1,26.8,27.8,40.9,19.6,32.7,29.5,63.8,29.5,93.3,0,3.3-.5,6-1.6,8.2v8.2c-7.6,33.8-25.6,50.8-54,50.8-26.2,0-40.4-10.9-42.6-32.7,0-5.5,1.6-12.3,4.9-20.5,3.3-8.2,7.1-16.4,11.5-24.6,4.4-8.2,8.5-16.1,12.3-23.7,3.8-7.6,5.7-13.1,5.7-16.4,0-8.7-3.8-16.9-11.5-24.6-7.6-7.6-15.8-11.5-24.6-11.5-19.6,0-42.6,4.9-68.8,14.7-77.5,31.7-161,79.7-250.5,144.1l-275-214.4c-1.1,22.9-2.7,43.4-4.9,61.4-2.2,18-4.9,34.1-8.2,48.3-8.7,39.3-39.8,74.2-93.3,104.8l-185-155.5ZM3477.7,522.6l222.6,320.9c112.4-79.7,168.6-175.2,168.6-286.5,0-70.9-27.8-130.4-83.5-178.4-69.8-57.8-144.6-86.8-224.3-86.8-79.7,0-150,16.4-211.2,49.1l45.8,68.8c50.2-12,95.5-18,135.9-18,79.7,0,139.7,50.8,180.1,152.2l-29.5,14.7c-33.8-43.6-70.9-65.5-111.3-65.5-26.2,0-57.3,9.8-93.3,29.5ZM3240.3,910.6l-6.5,127.7,158.8,122.8,374.9-158.8-63.8-91.7h-463.3ZM3264.9,404.7l-18,389.6h376.5s-304.5-432.2-304.5-432.2c-21.8,14.2-39.8,28.4-54,42.6Z"
                  fill="none"
                  stroke="#E8DDD3"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.1}
                />
                {/* Animated stroke - initial trace + breathing pulse */}
                <path
                  className="wordmark-animation-path"
                  d="M2940.8,1143l26.2-27.8c1.1,1.1,3.3,3,6.5,5.7,3.3,2.7,5.5,4.7,6.5,5.7,19.6,16.4,35.5,24.6,47.5,24.6,14.2,0,24.6-7.6,31.1-22.9,10.9-22.9,16.4-57.8,16.4-104.8v-6.5s0-6.5,0-6.5l26.2-553.3c1.1-12,1.6-20.7,1.6-26.2,0-5.4,0-7.6,0-6.5v-27.8c0-39.3-4.9-72-14.7-98.2-10.9-30.5-39.3-61.1-85.1-91.7l-26.2-18,18-26.2c31.7,14.2,61.7,31.7,90,52.4,28.4,20.7,55.1,44.8,80.2,72,8.7-6.5,16.4-12.3,22.9-17.2,6.5-4.9,12.6-9,18-12.3,105.9-67.7,211.7-101.5,317.6-101.5h6.5s8.2,0,8.2,0c102.6,4.4,193.7,44.2,273.4,119.5,79.7,75.3,119.5,163.2,119.5,263.6,0,139.7-69.3,252.7-207.9,338.9l117.9,173.5c8.7,14.2,18,27.8,27.8,40.9,9.8,13.1,19.1,26.8,27.8,40.9,19.6,32.7,29.5,63.8,29.5,93.3,0,3.3-.5,6-1.6,8.2v8.2c-7.6,33.8-25.6,50.8-54,50.8-26.2,0-40.4-10.9-42.6-32.7,0-5.5,1.6-12.3,4.9-20.5,3.3-8.2,7.1-16.4,11.5-24.6,4.4-8.2,8.5-16.1,12.3-23.7,3.8-7.6,5.7-13.1,5.7-16.4,0-8.7-3.8-16.9-11.5-24.6-7.6-7.6-15.8-11.5-24.6-11.5-19.6,0-42.6,4.9-68.8,14.7-77.5,31.7-161,79.7-250.5,144.1l-275-214.4c-1.1,22.9-2.7,43.4-4.9,61.4-2.2,18-4.9,34.1-8.2,48.3-8.7,39.3-39.8,74.2-93.3,104.8l-185-155.5ZM3477.7,522.6l222.6,320.9c112.4-79.7,168.6-175.2,168.6-286.5,0-70.9-27.8-130.4-83.5-178.4-69.8-57.8-144.6-86.8-224.3-86.8-79.7,0-150,16.4-211.2,49.1l45.8,68.8c50.2-12,95.5-18,135.9-18,79.7,0,139.7,50.8,180.1,152.2l-29.5,14.7c-33.8-43.6-70.9-65.5-111.3-65.5-26.2,0-57.3,9.8-93.3,29.5ZM3240.3,910.6l-6.5,127.7,158.8,122.8,374.9-158.8-63.8-91.7h-463.3ZM3264.9,404.7l-18,389.6h376.5s-304.5-432.2-304.5-432.2c-21.8,14.2-39.8,28.4-54,42.6Z"
                  fill="none"
                  stroke="#E8DDD3"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    '--path-length': `${pathLengths[4] || 10000}px`,
                    strokeDasharray: pathLengths[4] || 10000,
                    strokeDashoffset: pathLengths[4] || 10000,
                    animation: isDrawing ? 'initial-trace 1s ease-out forwards, breathing-trace 3s ease-in-out 1s infinite alternate' : 'none',
                  } as React.CSSProperties}
                />
              </g>
            </svg>
          </div>

          {/* Enter Button with Enhanced Cinematic Animation */}
          <button
            onClick={handleEnter}
            className="
              text-[var(--cream-primary)]
              text-lg
              sm:text-xl
              md:text-2xl
              lg:text-3xl
              font-[family-name:var(--font-display)]
              font-extralight
              tracking-[0.20em]
              sm:tracking-[0.22em]
              md:tracking-[0.25em]
              px-8
              py-4
              min-w-[120px]
              min-h-[44px]
              transition-all
              duration-700
              delay-75
              hover:text-[var(--blood-red)]
              hover:scale-110
              hover:tracking-[0.35em]
              active:scale-95
              active:brightness-90
              subpixel-antialiased
              animate-blur-in
              motion-reduce:animate-none
              motion-reduce:opacity-100
              relative
            "
            style={{
              animationDelay: '1.6s',
              textRendering: 'optimizeLegibility',
              textShadow: '0 4px 16px rgba(0,0,0,0.6), 0 0 30px rgba(125,30,30,0.2)',
            }}
          >
            Enter
            {/* Underline glow effect */}
            <div
              className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--cream-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </button>
        </div>

        {/* 3. BOTTOM: Icon with Premium Blur-In Animation */}
        <div
          className="animate-blur-in flex flex-col items-center"
          style={{ animationDelay: '1.3s' }}
        >
          {/* Icon Container with Premium Effects (Responsive) */}
          <div
            className="relative w-[70px] h-[50px] sm:w-[80px] sm:h-[55px] md:w-[90px] md:h-[60px] lg:w-[100px] lg:h-[65px] xl:w-[110px] xl:h-[70px] py-2 flex items-center justify-center transition-all duration-500 hover:scale-105 hover:-translate-y-1"
            style={{
              // Rotation settle at completion
              animation: countdown === 0 ? 'settle-rotate 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)' : 'none',
            }}
          >

            {/* Icon with Premium Subtle Glow (Intensity Scales with Countdown) */}
            <div
              className="premium-glow-icon"
              style={{
                filter: `drop-shadow(0 0 ${60 + (20 - countdown) * 4}px rgba(125, 30, 30, ${0.25 + (20 - countdown) * 0.0375})) drop-shadow(0 4px 16px rgba(0,0,0,0.5))`,
                transition: 'filter 1s ease-out',
              }}
            >
              <img
                src="/images/icon/icon-cream.svg"
                alt="Arena Boxing"
                className="w-[55px] h-[35px] sm:w-[62px] sm:h-[39px] md:w-[70px] md:h-[44px] lg:w-[78px] lg:h-[49px] xl:w-[86px] xl:h-[54px] object-contain"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
          </div>

          {/* Countdown Text with Urgency Escalation */}
          <p
            className="mt-3 sm:mt-4 text-cream-primary/40 text-sm sm:text-[13px] lg:text-[14px] leading-tight font-[family-name:var(--font-body)]"
            style={{
              animation: `countdown-pulse ${countdown > 15 ? '2s' : countdown > 10 ? '1.5s' : countdown > 5 ? '1s' : '0.5s'} ease-in-out infinite`,
            }}
          >
            {countdown}s
          </p>

          {/* Victory Flash Burst */}
          {showVictoryFlash && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 70%, rgba(163,31,31,0.8) 0%, transparent 70%)',
                animation: 'victory-burst 0.4s ease-out forwards',
              }}
            />
          )}
        </div>
      </div>


      {/* Blood-Red Skip Flash */}
      {isSkipping && (
        <div
          className="absolute inset-0 bg-[var(--blood-red)] z-40 animate-blood-flash"
          style={{
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Pure Black Transition Overlay (stays visible during redirect) */}
      {isTransitioning && (
        <div
          className="absolute inset-0 bg-black z-50"
          style={{
            pointerEvents: 'none',
            animation: 'fade-in 0.3s ease-out forwards',
          }}
        />
      )}
    </div>
  );
}
