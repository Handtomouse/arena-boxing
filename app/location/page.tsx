'use client';

import { HeroBanner, Section, Container, GoogleMapsEmbed, ContactForm, Grid } from "@/components";

export default function LocationPage() {
  const handleFormSubmit = async (data: { name: string; email: string; message: string }) => {
    // TODO: Implement actual form submission
    void data;
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <>
      <HeroBanner
        variant="location"
        title="FIND US"
        subtitle="In the heart of Bondi"
        backgroundImage="/images/bondi-beach.jpg"
        height="50vh"
        overlayOpacity={75}
      />

      <Section variant="default" spacing="lg">
        <Container>
          <Grid columns={2} gap={12}>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wider text-burgundy-primary mb-6">
                Location
              </h2>
              <div className="space-y-6 text-lg">
                <div>
                  <h3 className="font-[family-name:var(--font-ui)] text-sm uppercase tracking-wide text-burgundy-primary mb-2">
                    Address
                  </h3>
                  <p className="text-charcoal-black">
                    123 Campbell Parade<br />
                    Bondi Beach NSW 2026<br />
                    Australia
                  </p>
                </div>

                <div>
                  <h3 className="font-[family-name:var(--font-ui)] text-sm uppercase tracking-wide text-burgundy-primary mb-2">
                    Hours
                  </h3>
                  <div className="text-charcoal-black space-y-1">
                    <p>Monday - Friday: 6:00 AM - 9:00 PM</p>
                    <p>Saturday: 8:00 AM - 6:00 PM</p>
                    <p>Sunday: 8:00 AM - 2:00 PM</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-[family-name:var(--font-ui)] text-sm uppercase tracking-wide text-burgundy-primary mb-2">
                    Contact
                  </h3>
                  <div className="text-charcoal-black space-y-1">
                    <p>
                      <a href="mailto:hello@arenaboxing.com.au" className="hover:text-blood-red transition-colors">
                        hello@arenaboxing.com.au
                      </a>
                    </p>
                    <p>
                      <a href="tel:+61400123456" className="hover:text-blood-red transition-colors">
                        0400 123 456
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-[family-name:var(--font-ui)] text-sm uppercase tracking-wide text-burgundy-primary mb-2">
                    Getting Here
                  </h3>
                  <div className="text-charcoal-black space-y-2 text-base">
                    <p><strong>Bus:</strong> Routes 333, 380, 381 stop nearby</p>
                    <p><strong>Parking:</strong> Street parking and paid lots available</p>
                    <p><strong>Walk:</strong> 5 minutes from Bondi Beach</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wider text-burgundy-primary mb-6">
                Get In Touch
              </h2>
              <ContactForm
                onSubmit={handleFormSubmit}
                onSuccess={() => alert("Message sent! We'll be in touch soon.")}
              />
            </div>
          </Grid>
        </Container>
      </Section>

      <Section variant="default" spacing="md" className="pb-0">
        <Container maxWidth="full" padding={false}>
          <GoogleMapsEmbed
            address="123 Campbell Parade, Bondi Beach NSW 2026"
            zoom={15}
          />
        </Container>
      </Section>

      <Section variant="dark" spacing="lg">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl uppercase tracking-wider text-cream-primary mb-6">
              Drop In Anytime
            </h3>
            <p className="text-lg text-cream-light mb-8">
              Want to check out the gym before committing? Come by during open hours. Our team will show you around and answer any questions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border-2 border-cream-primary">
                <div className="text-4xl mb-3">🥊</div>
                <h4 className="font-[family-name:var(--font-ui)] text-lg uppercase tracking-wide text-cream-primary mb-2">
                  Try Before You Buy
                </h4>
                <p className="text-cream-dark text-sm">
                  First class is free. No obligation.
                </p>
              </div>
              <div className="p-6 border-2 border-cream-primary">
                <div className="text-4xl mb-3">💪</div>
                <h4 className="font-[family-name:var(--font-ui)] text-lg uppercase tracking-wide text-cream-primary mb-2">
                  Flexible Options
                </h4>
                <p className="text-cream-dark text-sm">
                  Drop-in, class packs, or unlimited.
                </p>
              </div>
              <div className="p-6 border-2 border-cream-primary">
                <div className="text-4xl mb-3">🏆</div>
                <h4 className="font-[family-name:var(--font-ui)] text-lg uppercase tracking-wide text-cream-primary mb-2">
                  Expert Coaching
                </h4>
                <p className="text-cream-dark text-sm">
                  Trained fighters, not fitness instructors.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
