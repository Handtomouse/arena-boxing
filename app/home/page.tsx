/**
 * Arena Boxing - Homepage
 * Cinematic Drama + Editorial Luxury aesthetic
 */

'use client';

import { useEffect, useRef } from 'react';
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Image from "next/image";

export default function HomePage() {
  const manifestoRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll-triggered animations
    const observers: IntersectionObserver[] = [];

    if (manifestoRef.current) {
      const manifestoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-slide');
            }
          });
        },
        { threshold: 0.2 }
      );
      manifestoObserver.observe(manifestoRef.current);
      observers.push(manifestoObserver);
    }

    if (cardsRef.current) {
      const cardElements = cardsRef.current.querySelectorAll('.card-item');
      cardElements.forEach((card, index) => {
        const cardObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                (entry.target as HTMLElement).style.animationDelay = `${index * 0.2}s`;
                entry.target.classList.add('animate-slide-in');
              }
            });
          },
          { threshold: 0.2 }
        );
        cardObserver.observe(card);
        observers.push(cardObserver);
      });
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Pure Black Transition Overlay (fades out after transition complete) */}
      <div
        className="fixed inset-0 bg-black z-[100] pointer-events-none"
        style={{
          animation: 'fade-out 0.5s ease-out 1.5s forwards',
        }}
      />

      {/* Hero Section - Full Screen Video Background */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-start pt-[20vh] pb-[30vh]">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40 animate-slow-pan"
          >
            <source src="/videos/bb9897603397493d9b48c695b009df4e.HD-1080p-7.2Mbps-55774870.mp4" type="video/mp4" />
          </video>

          {/* Dark Burgundy Overlay */}
          <div className="absolute inset-0 bg-[var(--burgundy-dark)] opacity-70" />

          {/* Grunge Texture Overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'url(/textures/grunge-light.webp)',
              backgroundSize: 'cover',
            }}
          />

          {/* Cinematic Spotlight Effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 50% 40% at 40% 50%, transparent 0%, rgba(0,0,0,0.7) 100%)'
            }}
          />
        </div>

        {/* Hero Content - Asymmetric Editorial Layout */}
        <div className="relative z-10 container mx-auto px-6 w-full max-w-[45%] ml-[10%]">
          {/* Beast Symbol - Slow Zoom */}
          <div className="mb-8">
            <Image
              src="/images/ASSET.jpg"
              alt="Arena Boxing"
              width={128}
              height={128}
              className="object-contain opacity-80 invert animate-slow-zoom animate-staged-fade"
              style={{ animationDelay: '0s' }}
              priority
            />
          </div>

          {/* ARENA Wordmark - Dramatic Shadows */}
          <h1
            className="
              font-[family-name:var(--font-display)]
              text-[clamp(4rem,12vw,10rem)]
              text-[var(--cream-primary)]
              uppercase
              mb-6
              tracking-wider
              text-left
              animate-staged-fade
            "
            style={{
              textShadow: '0 8px 32px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.9), 0 0 60px rgba(125,30,30,0.3)',
              animationDelay: '0.3s'
            }}
          >
            Arena
          </h1>

          {/* "Those Who Dare" Tagline */}
          <p
            className="
              font-[family-name:var(--font-tagline)]
              text-[clamp(1.5rem,4vw,3rem)]
              text-[var(--cream-primary)]
              italic
              mb-12
              tracking-wide
              opacity-90
              text-left
              animate-staged-fade
            "
            style={{ animationDelay: '0.6s' }}
          >
            those who dare
          </p>

          {/* CTA - Minimal Underline Style */}
          <div
            className="text-left animate-staged-fade"
            style={{ animationDelay: '0.9s' }}
          >
            <button
              className="
                group
                relative
                text-[var(--cream-primary)]
                text-xl
                uppercase
                tracking-[0.2em]
                font-[family-name:var(--font-ui)]
                transition-all
                duration-300
                bg-transparent
                border-none
                pb-2
                animate-spotlight-glow
              "
            >
              <span className="relative z-10">Enter The Arena</span>
              <div className="
                absolute
                bottom-0
                left-0
                w-32
                h-[2px]
                bg-[var(--cream-primary)]
                group-hover:w-full
                group-hover:bg-[var(--blood-red)]
                transition-all
                duration-500
              " />
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-16 md:bottom-12 left-1/2 -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-[var(--cream-primary)] flex justify-center p-2">
              <div className="w-1.5 h-3 bg-[var(--cream-primary)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section
        ref={manifestoRef}
        className="py-[clamp(4rem,10vw,8rem)] bg-[var(--charcoal-black)] relative"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/textures/grunge-light.webp)',
            backgroundSize: 'cover',
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Two-Column Asymmetric Layout (60/40) */}
          <div className="max-w-7xl mx-auto grid md:grid-cols-[60%_40%] gap-12 items-center">
            {/* Left Column: Main Quote */}
            <blockquote className="relative">
              <p className="
                text-[clamp(1.75rem,3.5vw,3rem)]
                text-[var(--cream-primary)]
                text-left
                leading-loose
                font-light
              ">
                The arena doesn&apos;t care who you were.
                <br />
                Only who you become.
              </p>

              <p className="
                text-[var(--cream-dark)]
                text-left
                text-lg
                leading-loose
                mt-8
              ">
                This is Bondi&apos;s fight culture. Not a wellness retreat. Not a hardcore gym.
                A place where courage meets craft, and those who step into the arena.
              </p>
            </blockquote>

            {/* Right Column: Pullout Quote "DARE" */}
            <div className="relative">
              {/* Beast symbol background */}
              <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <Image
                  src="/images/ASSET.jpg"
                  alt=""
                  fill
                  className="object-contain invert"
                />
              </div>

              {/* Oversized "dare" pullout */}
              <div className="relative z-10 text-right">
                <p className="
                  font-[family-name:var(--font-tagline)]
                  text-[clamp(4rem,10vw,8rem)]
                  text-[var(--blood-red)]
                  italic
                  leading-[0.9]
                  opacity-90
                ">
                  dare
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Preview */}
      <section className="py-[clamp(4rem,10vw,8rem)] bg-[var(--burgundy-primary)] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/textures/grunge-light.webp)',
            backgroundSize: 'cover',
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="
            text-center
            mb-16
            text-[var(--cream-primary)]
            font-[family-name:var(--font-display)]
            text-[clamp(2.5rem,6vw,4rem)]
          ">
            Choose Your Trial
          </h2>

          {/* Irregular Magazine Grid (2fr 1fr 2fr) */}
          <div
            ref={cardsRef}
            className="grid md:grid-cols-[2fr_1fr_2fr] gap-6 lg:gap-8 max-w-7xl mx-auto"
          >
            <Card variant="default" className="card-item">
              <h3 className="font-[family-name:var(--font-display)] text-2xl mb-4 text-[var(--burgundy-primary)]">
                10 Rounds
              </h3>
              <p className="text-[var(--charcoal-black)] mb-6 leading-loose">
                The foundational Arena experience. Pure boxing technique, high-intensity rounds, authentic fight culture.
              </p>
              <Button variant="secondary" className="w-full">
                Book Trial
              </Button>
            </Card>

            <Card variant="default" className="card-item">
              <h3 className="font-[family-name:var(--font-display)] text-2xl mb-4 text-[var(--burgundy-primary)]">
                Fight Camp
              </h3>
              <p className="text-[var(--charcoal-black)] mb-6 leading-loose">
                Strength, conditioning, and boxing combined. Build the fighter&apos;s body, cultivate the fighter&apos;s mind.
              </p>
              <Button variant="secondary" className="w-full">
                Book Trial
              </Button>
            </Card>

            <Card variant="default" className="card-item">
              <h3 className="font-[family-name:var(--font-display)] text-2xl mb-4 text-[var(--burgundy-primary)]">
                Bondi Sessions
              </h3>
              <p className="text-[var(--charcoal-black)] mb-6 leading-loose">
                Outdoor training at Bondi Beach. Sunrise boxing, headland workouts, beach culture at dawn.
              </p>
              <Button variant="secondary" className="w-full">
                Book Trial
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-[clamp(4rem,10vw,8rem)] bg-[var(--charcoal-black)] relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/textures/grunge-light.webp)',
            backgroundSize: 'cover',
          }}
        />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="
            font-[family-name:var(--font-tagline)]
            text-[clamp(2rem,5vw,3.5rem)]
            text-[var(--cream-primary)]
            italic
            mb-8
          ">
            Those who dare don&apos;t wait for permission
          </h2>

          <Button size="lg" variant="primary">
            Claim Your Trial By Fire
          </Button>
        </div>
      </section>
    </div>
  );
}
