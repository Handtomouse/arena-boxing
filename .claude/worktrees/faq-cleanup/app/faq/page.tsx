'use client';

import type { Metadata } from "next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeroBanner, Section, Container, Button } from "@/components";

// Note: Metadata export must be in Server Component, so we'll add it separately
// For now, this is a Client Component due to accordion interactivity

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "Do I need boxing experience to join?",
        a: "Not at all. We welcome complete beginners and design our classes to accommodate all skill levels. Our coaches will teach you proper technique from day one.",
      },
      {
        q: "What should I bring to my first class?",
        a: "Just bring water, athletic clothing, and indoor training shoes. We provide gloves, wraps, and all equipment. Towel service is included.",
      },
      {
        q: "Is there a trial class?",
        a: "Yes! Your first class is completely free. No credit card required. Just book online and show up ready to train.",
      },
    ],
  },
  {
    category: "Membership",
    questions: [
      {
        q: "What membership options do you offer?",
        a: "We offer drop-in single classes ($35), 10-class packs ($300, valid 3 months), and unlimited monthly memberships ($220). No lock-in contracts on any option.",
      },
      {
        q: "Can I cancel my membership anytime?",
        a: "Yes. Our monthly unlimited membership can be cancelled anytime with 7 days notice. No penalties or fees.",
      },
      {
        q: "Do you offer student or concession rates?",
        a: "We offer 15% off monthly memberships for students and concession card holders. Bring valid ID to reception.",
      },
    ],
  },
  {
    category: "Classes",
    questions: [
      {
        q: "How long are classes?",
        a: "Most classes are 60 minutes. Our Saturday Open Gym runs for 90 minutes. Check the timetable for specific class durations.",
      },
      {
        q: "What's the difference between Bootcamp and Technique classes?",
        a: "Bootcamp is high-intensity circuit training mixing boxing and bodyweight exercises. Technique focuses on proper form, combinations, and skill development. Both are great workouts.",
      },
      {
        q: "Can I attend sparring sessions as a beginner?",
        a: "Sparring sessions are for advanced members only. You'll need coach approval and at least 3 months of consistent training before joining.",
      },
      {
        q: "What's the maximum class size?",
        a: "We cap classes at 20 people to ensure quality coaching and equipment availability. Book early for popular time slots.",
      },
    ],
  },
  {
    category: "Facilities",
    questions: [
      {
        q: "Do you have showers and changing rooms?",
        a: "Yes. We have clean, modern changing rooms with showers, lockers, and towel service included in all memberships.",
      },
      {
        q: "Is there parking nearby?",
        a: "Street parking is available on Campbell Parade and surrounding streets. There are also paid parking lots within 2 blocks.",
      },
      {
        q: "What equipment do you have?",
        a: "Heavy bags, speed bags, double-end bags, focus mitts, a full boxing ring, weights, TRX systems, and all the gloves/wraps you need.",
      },
    ],
  },
  {
    category: "Policies",
    questions: [
      {
        q: "What's your cancellation policy?",
        a: "Cancel up to 12 hours before class for a full credit. Late cancellations or no-shows are charged. Emergency exemptions considered.",
      },
      {
        q: "Can I freeze my membership?",
        a: "Monthly unlimited members can freeze for up to 3 months per year at no charge. Medical freezes with doctor's note have no time limit.",
      },
      {
        q: "Do you have rules about fighting outside the gym?",
        a: "We encourage competitive boxing and will support members who want to compete. However, street fighting or unsanctioned violence is grounds for immediate termination.",
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b-2 border-burgundy-primary/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-start text-left hover:text-blood-red transition-colors duration-300"
        aria-expanded={isOpen}
      >
        <span className="font-[family-name:var(--font-ui)] text-lg uppercase tracking-wide pr-4">
          {question}
        </span>
        <span className="text-2xl flex-shrink-0">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="pb-6 text-charcoal-black/80 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const router = useRouter();

  return (
    <>
      <HeroBanner
        variant="faq"
        title="FAQ"
        subtitle="Questions answered"
        backgroundImage="/images/gloves.jpg"
        height="50vh"
        overlayOpacity={80}
      />

      <Section variant="default" spacing="lg">
        <Container maxWidth="lg">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl uppercase tracking-wider text-burgundy-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-charcoal-black max-w-2xl mx-auto">
              Everything you need to know about joining Arena Boxing. Can't find your answer? Contact us directly.
            </p>
          </div>

          <div className="space-y-12">
            {faqs.map((category) => (
              <div key={category.category}>
                <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wider text-burgundy-primary mb-6 pb-3 border-b-4 border-burgundy-primary">
                  {category.category}
                </h3>
                <div className="space-y-0">
                  {category.questions.map((faq, idx) => (
                    <FAQItem key={idx} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="dark" spacing="lg">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl uppercase tracking-wider text-cream-primary mb-6">
              Still Have Questions?
            </h3>
            <p className="text-lg text-cream-light mb-8">
              Our team is here to help. Send us a message or drop by the gym anytime during open hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push('/location')}
              >
                Contact Us
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => router.push('/booking')}
              >
                Book Free Trial
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
