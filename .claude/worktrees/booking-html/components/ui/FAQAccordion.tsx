'use client';

import React, { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Can I cancel my Monthly Unlimited membership anytime?",
    answer: "Yes! There are no lock-in contracts. You can cancel your Monthly Unlimited membership at any time with 7 days notice. Your membership will remain active until the end of your current billing period."
  },
  {
    question: "What happens if I need to pause my membership?",
    answer: "Life happens! You can pause your Monthly Unlimited membership for up to 3 months per year (medical reasons, injury, travel, etc.). Just let us know 7 days in advance. The 10-Class Pack validity automatically pauses if you're away for 2+ weeks."
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Absolutely. You can upgrade from Drop-In or 10-Class Pack to Monthly Unlimited at any time - we'll credit your remaining classes. Downgrades take effect at the end of your current billing cycle."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, Amex), debit cards, and direct debit for Monthly Unlimited memberships. Payment is processed automatically on your billing date."
  },
  {
    question: "Is there a joining fee or contract?",
    answer: "No joining fees, no contracts, no hidden costs. Just choose your plan and start training. Monthly Unlimited memberships are month-to-month with no long-term commitment required."
  },
  {
    question: "What's your cancellation policy for classes?",
    answer: "You can cancel a booked class up to 12 hours before the start time with no penalty. Late cancellations (under 12 hours) or no-shows will be deducted from your package or membership."
  },
  {
    question: "Can I share my 10-Class Pack with a friend or family member?",
    answer: "Yes! The 10-Class Pack is transferable. You can share it with one other person - just let us know their details when they book. Perfect for couples or training partners."
  },
  {
    question: "Do unused classes roll over?",
    answer: "Monthly Unlimited classes don't roll over (unlimited means use as many as you want!). The 10-Class Pack is valid for 90 days from purchase - all 10 classes must be used within this period."
  },
  {
    question: "Is there a refund policy?",
    answer: "We offer a 7-day money-back guarantee on Monthly Unlimited memberships (first month only). The 10-Class Pack is refundable within 14 days if no classes have been used. Drop-In classes are non-refundable but can be rescheduled."
  },
  {
    question: "Do you offer student or corporate discounts?",
    answer: "Yes! Students get 10% off Monthly Unlimited with valid student ID. We also offer corporate group rates for teams of 5+ members. Contact us at hello@arenaboxing.com.au for details."
  }
];

const FAQAccordion: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isExpanded = expandedIndex === index;

        return (
          <div
            key={index}
            className="border-2 border-burgundy-primary overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-4 md:p-6 text-left bg-white hover:bg-cream-light transition-colors duration-200 flex justify-between items-start gap-4"
              aria-expanded={isExpanded}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-[family-name:var(--font-ui)] text-base md:text-lg uppercase tracking-wide text-burgundy-primary pr-4">
                {faq.question}
              </span>
              <span
                className={`text-2xl text-burgundy-primary flex-shrink-0 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </button>

            {isExpanded && (
              <div
                id={`faq-answer-${index}`}
                className="p-4 md:p-6 pt-0 bg-cream-light border-t-2 border-burgundy-primary/20 animate-fadeIn"
              >
                <p className="text-charcoal-black leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* Contact CTA */}
      <div className="mt-8 p-6 bg-burgundy-primary/5 border-2 border-burgundy-primary/20 text-center">
        <p className="text-charcoal-black mb-2">
          <strong className="text-burgundy-primary">Still have questions?</strong>
        </p>
        <p className="text-sm text-charcoal-black/70">
          Our team is here to help! Email us at{' '}
          <a
            href="mailto:hello@arenaboxing.com.au"
            className="text-burgundy-primary hover:text-blood-red underline font-semibold"
          >
            hello@arenaboxing.com.au
          </a>
          {' '}or call{' '}
          <a
            href="tel:+61400123456"
            className="text-burgundy-primary hover:text-blood-red underline font-semibold"
          >
            0400 123 456
          </a>
        </p>
      </div>
    </div>
  );
};

export default FAQAccordion;
