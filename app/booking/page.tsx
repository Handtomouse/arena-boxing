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
