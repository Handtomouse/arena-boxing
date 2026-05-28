import type { Metadata } from "next";
import { HeroBanner, Section, Container, HapanaEmbed } from "@/components";

export const metadata: Metadata = {
  title: "Book a Class",
  description: "Book your next training session at Arena Boxing Bondi. Reserve your spot in our premium classes.",
};

export default function BookingPage() {
  return (
    <>
      <HeroBanner
        variant="booking"
        title="BOOK A CLASS"
        subtitle="Reserve your spot"
        backgroundImage="/images/ring.jpg"
        height="50vh"
        overlayOpacity={80}
      />

      {/* Pre-booking info section */}
      <Section variant="default" spacing="md">
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border-2 border-burgundy-primary bg-white">
              <div className="text-4xl mb-3">🎁</div>
              <p className="font-[family-name:var(--font-ui)] font-bold text-lg uppercase tracking-wide text-burgundy-primary mb-2">
                First Class Free
              </p>
              <p className="text-sm text-charcoal-black/80">
                New members get their first session on us. No credit card required.
              </p>
            </div>
            <div className="text-center p-6 border-2 border-burgundy-primary bg-white">
              <div className="text-4xl mb-3">📅</div>
              <p className="font-[family-name:var(--font-ui)] font-bold text-lg uppercase tracking-wide text-burgundy-primary mb-2">
                Book Anytime
              </p>
              <p className="text-sm text-charcoal-black/80">
                Reserve your spot up to 7 days in advance. Classes fill up fast.
              </p>
            </div>
            <div className="text-center p-6 border-2 border-burgundy-primary bg-white">
              <div className="text-4xl mb-3">🔄</div>
              <p className="font-[family-name:var(--font-ui)] font-bold text-lg uppercase tracking-wide text-burgundy-primary mb-2">
                Free Cancellation
              </p>
              <p className="text-sm text-charcoal-black/80">
                Cancel up to 12 hours before class with no penalty.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Your First Class walkthrough — Non-Negotiable #4 (UX brief) */}
      <Section variant="dark" spacing="lg">
        <Container maxWidth="lg">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl uppercase tracking-wider text-cream-primary mb-4">
              Your First Class
            </h2>
            <p className="text-lg text-cream-dark max-w-2xl mx-auto leading-relaxed">
              Exactly what happens, start to finish. No surprises. No contact in class one.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 list-none">
            {[
              {
                numeral: "I",
                title: "Arrive 10 minutes early",
                body: "Meet your coach, sign the waiver, fit your hand wraps.",
              },
              {
                numeral: "II",
                title: "We'll wrap your hands",
                body: "Wraps are lent free; we'll show you how to do it yourself for next time.",
              },
              {
                numeral: "III",
                title: "Warm-up",
                body: "Bodyweight movements + boxing fundamentals; everyone's first round is technique-only.",
              },
              {
                numeral: "IV",
                title: "Bag work",
                body: "No contact in class one. We teach footwork, jab, cross, slip on heavy bags. No sparring until you ask.",
              },
              {
                numeral: "V",
                title: "Cool down + Q&A",
                body: "5 minutes with the coach; ask anything.",
              },
            ].map((step) => (
              <li
                key={step.numeral}
                className="bg-charcoal-black/60 border border-cream-primary/15 p-6 flex flex-col"
              >
                <span
                  aria-hidden="true"
                  className="font-[family-name:var(--font-cormorant)] italic text-5xl leading-none text-burgundy-primary mb-4"
                >
                  {step.numeral}
                </span>
                <h3 className="font-[family-name:var(--font-ui)] text-base uppercase tracking-wide text-cream-primary mb-2">
                  <span className="sr-only">Step {step.numeral}: </span>
                  {step.title}
                </h3>
                <p className="text-sm text-cream-dark leading-relaxed">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <figure className="mt-12 max-w-3xl mx-auto text-center border-t border-cream-primary/15 pt-10">
            <blockquote className="font-[family-name:var(--font-cormorant)] italic text-2xl sm:text-3xl text-cream-primary leading-snug">
              &ldquo;You won&rsquo;t be the worst in the room. Everyone here started somewhere. We teach technique first &mdash; no contact in class one.&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm font-[family-name:var(--font-ui)] uppercase tracking-widest text-burgundy-primary">
              &mdash; Head Coach, Arena Bondi
            </figcaption>
          </figure>
        </Container>
      </Section>

      <Section variant="default" spacing="lg">
        <Container maxWidth="lg">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl uppercase tracking-wider text-burgundy-primary mb-4">
              Choose Your Session
            </h2>
            <p className="text-lg text-charcoal-black max-w-2xl mx-auto leading-relaxed">
              Select a class from the calendar below. All sessions are led by certified coaches and capped at 20 participants for personalized attention.
            </p>
          </div>

          {/* Enhanced Hapana Booking Widget with custom styling */}
          <HapanaEmbed
            widgetId="arena-boxing-bondi"
            theme="light"
            dataType="classes"
            className="mb-8"
          />

          {/* Quick help section below widget */}
          <div className="text-center mt-8 p-6 bg-cream-light border-2 border-burgundy-primary/20">
            <p className="text-sm text-charcoal-black mb-3">
              <strong>Need help booking?</strong> Our team is here to assist.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+61400123456"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-[family-name:var(--font-ui)] uppercase tracking-wide border-2 border-burgundy-primary text-burgundy-primary bg-transparent hover:bg-burgundy-primary hover:text-cream-primary transition-all duration-300"
              >
                <span>📞</span>
                <span>Call Us</span>
              </a>
              <a
                href="mailto:hello@arenaboxing.com.au"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-[family-name:var(--font-ui)] uppercase tracking-wide border-2 border-burgundy-primary text-burgundy-primary bg-transparent hover:bg-burgundy-primary hover:text-cream-primary transition-all duration-300"
              >
                <span>✉️</span>
                <span>Email Support</span>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="dark" spacing="md">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wider text-cream-primary mb-6">
              What to Bring
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-[family-name:var(--font-ui)] text-lg uppercase tracking-wide text-cream-primary mb-2">
                  Required
                </h4>
                <ul className="space-y-2 text-cream-dark">
                  <li>• Water bottle</li>
                  <li>• Athletic clothing</li>
                  <li>• Indoor training shoes</li>
                  <li>• Positive attitude</li>
                </ul>
              </div>
              <div>
                <h4 className="font-[family-name:var(--font-ui)] text-lg uppercase tracking-wide text-cream-primary mb-2">
                  We Provide
                </h4>
                <ul className="space-y-2 text-cream-dark">
                  <li>• Boxing gloves</li>
                  <li>• Hand wraps</li>
                  <li>• Training equipment</li>
                  <li>• Towel service</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="burgundy" spacing="md">
        <Container>
          <div className="text-center max-w-xl mx-auto">
            <h3 className="font-[family-name:var(--font-display)] text-xl uppercase tracking-wider text-cream-primary mb-4">
              Cancellation Policy
            </h3>
            <p className="text-cream-dark text-sm">
              Cancel up to 12 hours before class for a full credit. Late cancellations or no-shows will be charged to your account.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
