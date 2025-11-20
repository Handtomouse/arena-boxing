'use client';

import { useRouter } from 'next/navigation';
import { HeroBanner, Section, Container, Button } from "@/components";
import HapanaEmbed from "@/components/sections/HapanaEmbed";

export default function TimetablePage() {
  const router = useRouter();

  return (
    <>
      <HeroBanner
        variant="timetable"
        title="CLASS TIMETABLE"
        subtitle="Find your perfect session"
        backgroundImage="/images/gym-training.jpg"
        height="60vh"
        icon
      />

      <Section variant="default" spacing="lg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl uppercase tracking-wider text-burgundy-primary mb-4">
              Weekly Schedule
            </h2>
            <p className="text-lg text-charcoal-black max-w-2xl mx-auto">
              Browse our real-time class schedule below. All classes are led by certified coaches with limited spots to ensure personalized attention. Book early to secure your spot.
            </p>
          </div>

          {/* Real Hapana booking widget with live class schedule */}
          <HapanaEmbed
            theme="light"
            dataType="classes"
          />
        </Container>
      </Section>

      {/* Membership CTA */}
      <Section variant="default" spacing="md">
        <Container>
          <div className="bg-burgundy-primary/10 border-2 border-burgundy-primary p-8 md:p-12 text-center">
            <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl uppercase tracking-wider text-burgundy-primary mb-4">
              Ready to Commit?
            </h3>
            <p className="text-charcoal-black max-w-2xl mx-auto mb-6">
              Save up to 40% with our Monthly Unlimited membership. Train as often as you want with no lock-in contracts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push('/membership')}
              >
                View Membership Plans
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push('/booking?plan=free-trial')}
              >
                Book Free Trial
              </Button>
            </div>
            <p className="text-xs text-charcoal-black/60 mt-4">
              Compare all plans • No hidden fees • Cancel anytime
            </p>
          </div>
        </Container>
      </Section>

      {/* Beginner Guidance Section */}
      <Section variant="burgundy" spacing="lg">
        <Container>
          <div className="text-center mb-8">
            <h3 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl uppercase tracking-wider text-cream-primary mb-4">
              New to Boxing?
            </h3>
            <p className="text-lg text-cream-dark max-w-2xl mx-auto">
              Don't worry - everyone starts somewhere. Here's everything you need to know before your first class.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What to Expect */}
            <div className="p-6 border-2 border-cream-primary bg-burgundy-dark/30">
              <h4 className="font-[family-name:var(--font-ui)] text-xl uppercase tracking-wide text-cream-primary mb-4 flex items-center gap-2">
                <span className="text-2xl">👊</span>
                What to Expect
              </h4>
              <ul className="space-y-3 text-cream-dark">
                <li className="flex items-start gap-2">
                  <span className="text-cream-primary mt-1">•</span>
                  <span><strong>Warm-up:</strong> 10 minutes of dynamic stretching and cardio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cream-primary mt-1">•</span>
                  <span><strong>Technique work:</strong> Learn proper stance, punches, and footwork</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cream-primary mt-1">•</span>
                  <span><strong>Bag work:</strong> Practice combinations on heavy bags</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cream-primary mt-1">•</span>
                  <span><strong>Conditioning:</strong> Bodyweight exercises and core work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cream-primary mt-1">•</span>
                  <span><strong>Cool-down:</strong> Stretching and recovery</span>
                </li>
              </ul>
            </div>

            {/* Tips for Success */}
            <div className="p-6 border-2 border-cream-primary bg-burgundy-dark/30">
              <h4 className="font-[family-name:var(--font-ui)] text-xl uppercase tracking-wide text-cream-primary mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Tips for Success
              </h4>
              <ul className="space-y-3 text-cream-dark">
                <li className="flex items-start gap-2">
                  <span className="text-cream-primary mt-1">•</span>
                  <span><strong>Arrive early:</strong> 10 minutes before class to get oriented</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cream-primary mt-1">•</span>
                  <span><strong>Stay hydrated:</strong> Bring water and sip throughout class</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cream-primary mt-1">•</span>
                  <span><strong>Go at your pace:</strong> It's okay to take breaks when needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cream-primary mt-1">•</span>
                  <span><strong>Ask questions:</strong> Our coaches are here to help you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cream-primary mt-1">•</span>
                  <span><strong>Have fun:</strong> Enjoy the process and the community!</span>
                </li>
              </ul>
            </div>

            {/* What to Bring */}
            <div className="p-6 border-2 border-cream-primary bg-burgundy-dark/30">
              <h4 className="font-[family-name:var(--font-ui)] text-xl uppercase tracking-wide text-cream-primary mb-4 flex items-center gap-2">
                <span className="text-2xl">🎒</span>
                What to Bring
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-cream-primary font-semibold mb-2">Required:</p>
                  <ul className="space-y-2 text-cream-dark text-sm">
                    <li>• Water bottle (large!)</li>
                    <li>• Athletic clothing (breathable)</li>
                    <li>• Indoor training shoes</li>
                    <li>• Positive attitude</li>
                  </ul>
                </div>
                <div>
                  <p className="text-cream-primary font-semibold mb-2">We Provide:</p>
                  <ul className="space-y-2 text-cream-dark text-sm">
                    <li>• Boxing gloves (all sizes)</li>
                    <li>• Hand wraps</li>
                    <li>• Training equipment</li>
                    <li>• Towel service</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Recommended Classes */}
            <div className="p-6 border-2 border-cream-primary bg-burgundy-dark/30">
              <h4 className="font-[family-name:var(--font-ui)] text-xl uppercase tracking-wide text-cream-primary mb-4 flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                Start Here
              </h4>
              <p className="text-cream-dark mb-4 text-sm">
                Best classes for complete beginners:
              </p>
              <div className="space-y-3">
                <div className="bg-burgundy-primary/50 p-3 border border-cream-primary/50">
                  <p className="text-cream-primary font-bold text-sm mb-1">Beginner Fundamentals</p>
                  <p className="text-cream-dark text-xs">Learn the basics of stance, punches, and movement</p>
                </div>
                <div className="bg-burgundy-primary/50 p-3 border border-cream-primary/50">
                  <p className="text-cream-primary font-bold text-sm mb-1">Technique & Drills</p>
                  <p className="text-cream-dark text-xs">Focus on form with smaller class sizes</p>
                </div>
                <div className="bg-burgundy-primary/50 p-3 border border-cream-primary/50">
                  <p className="text-cream-primary font-bold text-sm mb-1">All Levels Bootcamp</p>
                  <p className="text-cream-dark text-xs">Modified options for every fitness level</p>
                </div>
              </div>
              <p className="text-cream-dark text-xs mt-4 italic">
                💬 Look for classes marked "Beginner" or "All Levels" in the schedule above
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="dark" spacing="md">
        <Container>
          <div className="text-center">
            <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl uppercase tracking-wider text-cream-primary mb-6">
              Class Types
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border-2 border-cream-primary">
                <h4 className="font-[family-name:var(--font-ui)] text-xl uppercase tracking-wide text-cream-primary mb-2">
                  Bootcamp
                </h4>
                <p className="text-cream-dark">
                  High-intensity circuit training combining boxing, bodyweight exercises, and cardio.
                </p>
              </div>
              <div className="p-6 border-2 border-cream-primary">
                <h4 className="font-[family-name:var(--font-ui)] text-xl uppercase tracking-wide text-cream-primary mb-2">
                  Technique
                </h4>
                <p className="text-cream-dark">
                  Focus on proper form, footwork, and combinations. Perfect for beginners and skill refinement.
                </p>
              </div>
              <div className="p-6 border-2 border-cream-primary">
                <h4 className="font-[family-name:var(--font-ui)] text-xl uppercase tracking-wide text-cream-primary mb-2">
                  Sparring
                </h4>
                <p className="text-cream-dark">
                  Controlled sparring sessions with experienced coaches. Advanced level only.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
