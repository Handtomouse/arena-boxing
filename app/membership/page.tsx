import type { Metadata } from "next";
import { HeroBanner, Section, Container, Grid, Card, Button } from "@/components";

export const metadata: Metadata = {
  title: "Membership & Pricing",
  description: "Join Arena Boxing Bondi. Flexible membership options for all commitment levels. No lock-in contracts, just results.",
};

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
  },
];

export default function MembershipPage() {
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
                <Button variant={plan.variant} size="lg" className="w-full">
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section variant="burgundy" spacing="lg">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
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
            <Button variant="primary" size="lg">
              Book Free Trial
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
