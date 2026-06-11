'use client';

import { useState } from 'react';
import { HeroBanner, Section, Container, Grid, Card, Button } from "@/components";
import { useRouter } from 'next/navigation';
import PricingCalculator from '@/components/ui/PricingCalculator';
import FAQAccordion from '@/components/ui/FAQAccordion';

const membershipPlans = [
  {
    name: "Drop-In",
    price: "$35",
    period: "per class",
    features: [
      "Single class access",
      "All class types included",
      "No commitment",
      "Perfect for trying us out",
    ],
    cta: "Book Single Class",
    variant: "outline" as const,
    planId: "drop-in",
  },
  {
    name: "Monthly Unlimited",
    price: "$220",
    period: "per month",
    features: [
      "Unlimited classes",
      "All class types included",
      "Cancel anytime",
      "Best value for regulars",
      "Priority booking",
    ],
    cta: "Start Membership",
    variant: "primary" as const,
    featured: true,
    planId: "monthly-unlimited",
  },
  {
    name: "10-Class Pack",
    price: "$300",
    period: "valid 3 months",
    features: [
      "10 class credits",
      "All class types included",
      "3-month validity",
      "Share with a friend",
    ],
    cta: "Buy Class Pack",
    variant: "outline" as const,
    planId: "10-class-pack",
  },
];

export default function MembershipPage() {
  const router = useRouter();

  const handlePlanSelect = (planId: string) => {
    router.push(`/booking?plan=${planId}`);
  };

  return (
    <>
      <HeroBanner
        variant="membership"
        title="MEMBERSHIP"
        subtitle="Choose your path"
        backgroundImage="/images/equipment.jpg"
        height="60vh"
      />

      <Section variant="default" spacing="xl">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl uppercase tracking-wider text-burgundy-primary mb-4">
              Flexible Options
            </h2>
            <p className="text-lg text-charcoal-black max-w-2xl mx-auto">
              No lock-in contracts. No hidden fees. Just premium training at Bondi's most authentic boxing gym.
            </p>
          </div>

          <Grid columns={3} gap={8}>
            {membershipPlans.map((plan) => (
              <Card
                key={plan.name}
                variant={plan.featured ? "dark" : "default"}
                className={plan.featured ? "border-4 border-blood-red" : ""}
              >
                {plan.featured && (
                  <div className="mb-4 px-3 py-1 bg-blood-red text-cream-primary text-xs uppercase tracking-wide inline-block">
                    Most Popular
                  </div>
                )}
                <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wider mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-charcoal-black/70 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blood-red mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.variant}
                  size="lg"
                  className="w-full"
                  onClick={() => handlePlanSelect(plan.planId)}
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Interactive Pricing Calculator */}
      <Section variant="default" spacing="lg">
        <Container>
          <PricingCalculator />
        </Container>
      </Section>

      {/* Detailed Comparison Table */}
      <Section variant="default" spacing="lg">
        <Container>
          <div className="text-center mb-8">
            <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl uppercase tracking-wider text-burgundy-primary mb-4">
              Plan Comparison
            </h3>
            <p className="text-charcoal-black/80 max-w-2xl mx-auto">
              Compare features side-by-side to find the perfect fit
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-2 border-burgundy-primary">
              <thead>
                <tr className="bg-burgundy-primary text-cream-primary">
                  <th className="p-4 text-left font-[family-name:var(--font-ui)] uppercase tracking-wide">Feature</th>
                  <th className="p-4 text-center font-[family-name:var(--font-ui)] uppercase tracking-wide">Drop-In</th>
                  <th className="p-4 text-center font-[family-name:var(--font-ui)] uppercase tracking-wide bg-blood-red">
                    Monthly Unlimited
                    <div className="text-xs normal-case mt-1">Most Popular</div>
                  </th>
                  <th className="p-4 text-center font-[family-name:var(--font-ui)] uppercase tracking-wide">10-Class Pack</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-burgundy-primary/20">
                  <td className="p-4 font-semibold">Price</td>
                  <td className="p-4 text-center">$35/class</td>
                  <td className="p-4 text-center bg-cream-light">$220/month</td>
                  <td className="p-4 text-center">$300</td>
                </tr>
                <tr className="border-b border-burgundy-primary/20">
                  <td className="p-4 font-semibold">Classes Included</td>
                  <td className="p-4 text-center">1</td>
                  <td className="p-4 text-center bg-cream-light font-bold text-burgundy-primary">Unlimited</td>
                  <td className="p-4 text-center">10</td>
                </tr>
                <tr className="border-b border-burgundy-primary/20">
                  <td className="p-4 font-semibold">Validity Period</td>
                  <td className="p-4 text-center">Same day</td>
                  <td className="p-4 text-center bg-cream-light">30 days</td>
                  <td className="p-4 text-center">90 days</td>
                </tr>
                <tr className="border-b border-burgundy-primary/20">
                  <td className="p-4 font-semibold">Priority Booking</td>
                  <td className="p-4 text-center text-charcoal-black/40">—</td>
                  <td className="p-4 text-center bg-cream-light text-green-700 font-bold">✓</td>
                  <td className="p-4 text-center text-charcoal-black/40">—</td>
                </tr>
                <tr className="border-b border-burgundy-primary/20">
                  <td className="p-4 font-semibold">Can Share with Friend</td>
                  <td className="p-4 text-center text-charcoal-black/40">—</td>
                  <td className="p-4 text-center bg-cream-light text-charcoal-black/40">—</td>
                  <td className="p-4 text-center text-green-700 font-bold">✓</td>
                </tr>
                <tr className="border-b border-burgundy-primary/20">
                  <td className="p-4 font-semibold">Cancellation</td>
                  <td className="p-4 text-center text-xs">12hrs before</td>
                  <td className="p-4 text-center bg-cream-light text-xs">Anytime</td>
                  <td className="p-4 text-center text-xs">12hrs before</td>
                </tr>
                <tr className="border-b border-burgundy-primary/20">
                  <td className="p-4 font-semibold">All Class Types</td>
                  <td className="p-4 text-center text-green-700 font-bold">✓</td>
                  <td className="p-4 text-center bg-cream-light text-green-700 font-bold">✓</td>
                  <td className="p-4 text-center text-green-700 font-bold">✓</td>
                </tr>
                <tr className="border-b border-burgundy-primary/20">
                  <td className="p-4 font-semibold">Best For</td>
                  <td className="p-4 text-center text-xs">Trying us out</td>
                  <td className="p-4 text-center bg-cream-light text-xs font-semibold">Regular training</td>
                  <td className="p-4 text-center text-xs">Casual training</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Accordion View */}
          <div className="md:hidden space-y-4">
            {membershipPlans.map((plan, idx) => (
              <div key={plan.name} className={`border-2 ${plan.featured ? 'border-blood-red' : 'border-burgundy-primary'}`}>
                <div className={`p-4 ${plan.featured ? 'bg-blood-red' : 'bg-burgundy-primary'} text-cream-primary`}>
                  <h4 className="font-[family-name:var(--font-ui)] text-lg uppercase tracking-wide">
                    {plan.name}
                  </h4>
                  <p className="text-sm mt-1">{plan.price} {plan.period}</p>
                </div>
                <div className="p-4 bg-white space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal-black/70">Classes:</span>
                    <span className="font-semibold">{idx === 1 ? 'Unlimited' : idx === 0 ? '1' : '10'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-black/70">Validity:</span>
                    <span className="font-semibold">{idx === 0 ? 'Same day' : idx === 1 ? '30 days' : '90 days'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-black/70">Priority Booking:</span>
                    <span className="font-semibold">{idx === 1 ? '✓ Yes' : '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-black/70">Can Share:</span>
                    <span className="font-semibold">{idx === 2 ? '✓ Yes' : '—'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Timetable CTA */}
      <Section variant="default" spacing="md">
        <Container>
          <div className="bg-cream-light border-2 border-burgundy-primary/30 p-8 md:p-12 text-center">
            <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl uppercase tracking-wider text-burgundy-primary mb-4">
              Explore Our Classes
            </h3>
            <p className="text-charcoal-black max-w-2xl mx-auto mb-6">
              Check out our full weekly schedule including Bootcamp, Technique, HIIT, and Sparring sessions.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push('/timetable')}
            >
              View Full Timetable
            </Button>
          </div>
        </Container>
      </Section>

      {/* FAQ Accordion */}
      <Section variant="default" spacing="lg">
        <Container maxWidth="lg">
          <div className="text-center mb-12">
            <h3 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl uppercase tracking-wider text-burgundy-primary mb-4">
              Common Questions
            </h3>
            <p className="text-charcoal-black/80 max-w-2xl mx-auto">
              Everything you need to know about memberships and billing
            </p>
          </div>

          <FAQAccordion />
        </Container>
      </Section>

      <Section variant="burgundy" spacing="lg">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl uppercase tracking-wider text-cream-primary mb-6">
              What's Included
            </h3>
            <Grid columns={2} gap={6}>
              <div className="p-6 border-2 border-cream-primary">
                <h4 className="font-[family-name:var(--font-ui)] text-lg uppercase tracking-wide text-cream-primary mb-2">
                  Premium Equipment
                </h4>
                <p className="text-cream-dark text-sm">
                  Gloves, wraps, bags, and training gear included in all memberships.
                </p>
              </div>
              <div className="p-6 border-2 border-cream-primary">
                <h4 className="font-[family-name:var(--font-ui)] text-lg uppercase tracking-wide text-cream-primary mb-2">
                  Expert Coaches
                </h4>
                <p className="text-cream-dark text-sm">
                  Trained professionals with competitive boxing experience.
                </p>
              </div>
              <div className="p-6 border-2 border-cream-primary">
                <h4 className="font-[family-name:var(--font-ui)] text-lg uppercase tracking-wide text-cream-primary mb-2">
                  Shower Facilities
                </h4>
                <p className="text-cream-dark text-sm">
                  Clean, modern changing rooms and showers available.
                </p>
              </div>
              <div className="p-6 border-2 border-cream-primary">
                <h4 className="font-[family-name:var(--font-ui)] text-lg uppercase tracking-wide text-cream-primary mb-2">
                  Community Events
                </h4>
                <p className="text-cream-dark text-sm">
                  Regular social events, workshops, and fight nights.
                </p>
              </div>
            </Grid>
          </div>

          {/* Trust Signals */}
          <div className="border-t-2 border-cream-primary/30 pt-12">
            <div className="text-center mb-8">
              <h4 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wider text-cream-primary mb-4">
                Our Guarantee
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* No Contracts */}
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🤝</div>
                <h5 className="font-[family-name:var(--font-ui)] text-sm uppercase tracking-wide text-cream-primary mb-2">
                  No Lock-In Contracts
                </h5>
                <p className="text-cream-dark text-xs">
                  Cancel anytime with 7 days notice
                </p>
              </div>

              {/* Secure Payment */}
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🔒</div>
                <h5 className="font-[family-name:var(--font-ui)] text-sm uppercase tracking-wide text-cream-primary mb-2">
                  Secure Payments
                </h5>
                <p className="text-cream-dark text-xs">
                  Visa • Mastercard • Amex • Direct Debit
                </p>
              </div>

              {/* Money Back */}
              <div className="text-center p-4">
                <div className="text-4xl mb-3">💰</div>
                <h5 className="font-[family-name:var(--font-ui)] text-sm uppercase tracking-wide text-cream-primary mb-2">
                  7-Day Money Back
                </h5>
                <p className="text-cream-dark text-xs">
                  Not satisfied? Full refund within 7 days
                </p>
              </div>

              {/* Flexible Pausing */}
              <div className="text-center p-4">
                <div className="text-4xl mb-3">⏸️</div>
                <h5 className="font-[family-name:var(--font-ui)] text-sm uppercase tracking-wide text-cream-primary mb-2">
                  Flexible Pausing
                </h5>
                <p className="text-cream-dark text-xs">
                  Pause membership for travel or injury
                </p>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-8 p-6 bg-burgundy-dark/30 border-2 border-cream-primary/30">
              <div className="text-center">
                <p className="text-cream-primary text-sm font-semibold mb-3">
                  Accepted Payment Methods
                </p>
                <div className="flex justify-center items-center gap-4 flex-wrap">
                  <span className="text-cream-dark text-xs bg-white/10 px-4 py-2 border border-cream-primary/30">VISA</span>
                  <span className="text-cream-dark text-xs bg-white/10 px-4 py-2 border border-cream-primary/30">MASTERCARD</span>
                  <span className="text-cream-dark text-xs bg-white/10 px-4 py-2 border border-cream-primary/30">AMEX</span>
                  <span className="text-cream-dark text-xs bg-white/10 px-4 py-2 border border-cream-primary/30">DIRECT DEBIT</span>
                </div>
                <p className="text-cream-dark text-xs mt-4">
                  All payments are processed securely. We never store your card details.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="default" spacing="md">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl uppercase tracking-wider text-burgundy-primary mb-4">
              First Class Free
            </h3>
            <p className="text-lg text-charcoal-black mb-6">
              Not sure which plan is right for you? Try your first class on us.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => handlePlanSelect('free-trial')}
            >
              Book Free Trial
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
