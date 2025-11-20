import type { Metadata } from "next";
import { HeroBanner, Section, Container } from "@/components";
import HapanaEmbed from "@/components/sections/HapanaEmbed";

export const metadata: Metadata = {
  title: "Class Timetable",
  description: "View our weekly class schedule. From early morning bootcamps to evening sparring sessions. Find your perfect training time.",
};

export default function TimetablePage() {
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
              All classes are 60 minutes unless otherwise noted. Book early to secure your spot.
            </p>
          </div>

          {/* Hapana widget will display real class schedule */}
          <HapanaEmbed
            theme="light"
            dataType="classes"
          />
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
