import type { Metadata } from "next";
import { HeroBanner, Section, Container, TrainersModule, InstagramEmbed } from "@/components";
import type { TrainerData } from "@/components";

export const metadata: Metadata = {
  title: "About Us",
  description: "Born from Bondi's fight culture. Arena Boxing is where gothic authenticity meets premium training. Those who dare, welcome.",
};

// Mock trainer data - replace with CMS
const trainers: TrainerData[] = [
  {
    id: "1",
    name: "Sarah Jones",
    title: "Head Coach",
    image: "/images/trainers/sarah.jpg",
    bio: "Sarah started boxing at 12 and competed nationally for 8 years. With certifications in strength conditioning and sports nutrition, she brings a holistic approach to combat training. Her bootcamp sessions are legendary.",
    specialties: ["Boxing", "HIIT", "Strength & Conditioning"],
    certifications: ["Level 2 Boxing Coach", "NSCA-CPT"],
    instagram: "https://instagram.com/sarahjones",
  },
  {
    id: "2",
    name: "Tom Wong",
    title: "Technique Specialist",
    image: "/images/trainers/tom.jpg",
    bio: "Former amateur boxer with 50+ fights. Tom focuses on the fundamentals - footwork, combinations, and ring IQ. His patience and attention to detail make him perfect for beginners and advanced fighters alike.",
    specialties: ["Boxing Technique", "Pad Work", "Sparring"],
    certifications: ["Level 3 Boxing Coach", "First Aid"],
  },
  {
    id: "3",
    name: "Coach J",
    title: "Sparring Coach",
    image: "/images/trainers/coach-j.jpg",
    bio: "Coach J brings 15 years of competitive experience and a no-nonsense approach to training. He runs our advanced sparring sessions and has coached multiple state champions.",
    specialties: ["Sparring", "Competition Prep", "Mental Toughness"],
    certifications: ["Level 4 Boxing Coach", "Sports Psychology"],
  },
];

export default function AboutPage() {
  return (
    <>
      <HeroBanner
        variant="about"
        title="ARENA BOXING"
        subtitle="Those who dare"
        backgroundImage="/images/gym-atmosphere.jpg"
        height="70vh"
        icon
      />

      <Section variant="default" spacing="lg">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl uppercase tracking-wider text-burgundy-primary mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-lg text-charcoal-black">
              <p>
                Arena Boxing was born from a simple belief: boxing gyms had lost their edge. Too polished, too corporate, too afraid to embrace what makes combat sports raw and real.
              </p>
              <p>
                We opened in 2020 in the heart of Bondi with a different vision. Gothic aesthetics meet premium training. Old-school values meet modern coaching. A place where fighters, not influencers, set the tone.
              </p>
              <p>
                Our walls don't have motivational quotes. They have sweat stains and history. Our coaches don't just talk about fighting—they've lived it. And our members? They're the ones who dare to step into the arena.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="dark" spacing="xl">
        <Container>
          <TrainersModule trainers={trainers} layout="grid" showBio />
        </Container>
      </Section>

      <Section variant="burgundy" spacing="lg">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wider text-cream-primary mb-6">
              Our Values
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="p-6 border-2 border-cream-primary">
                <h4 className="font-[family-name:var(--font-ui)] text-xl uppercase tracking-wide text-cream-primary mb-3">
                  Authenticity
                </h4>
                <p className="text-cream-dark">
                  No gimmicks. No trends. Just honest training in an environment that respects the sport.
                </p>
              </div>
              <div className="p-6 border-2 border-cream-primary">
                <h4 className="font-[family-name:var(--font-ui)] text-xl uppercase tracking-wide text-cream-primary mb-3">
                  Excellence
                </h4>
                <p className="text-cream-dark">
                  Premium equipment, expert coaching, and a community that pushes you to be better.
                </p>
              </div>
              <div className="p-6 border-2 border-cream-primary">
                <h4 className="font-[family-name:var(--font-ui)] text-xl uppercase tracking-wide text-cream-primary mb-3">
                  Courage
                </h4>
                <p className="text-cream-dark">
                  We celebrate those who dare. Whether it's your first jab or your fiftieth fight.
                </p>
              </div>
              <div className="p-6 border-2 border-cream-primary">
                <h4 className="font-[family-name:var(--font-ui)] text-xl uppercase tracking-wide text-cream-primary mb-3">
                  Community
                </h4>
                <p className="text-cream-dark">
                  More than a gym. A brotherhood and sisterhood of fighters united by respect.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="default" spacing="lg">
        <Container>
          <InstagramEmbed username="arenaboxing" limit={6} layout="grid" />
        </Container>
      </Section>
    </>
  );
}
