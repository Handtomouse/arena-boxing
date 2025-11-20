'use client';

import React, { useState } from 'react';
import Card from '@/components/ui/Card';

export interface TrainerData {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  specialties: string[];
  certifications?: string[];
  instagram?: string;
}

export interface TrainersModuleProps {
  trainers: TrainerData[];
  layout?: 'grid' | 'list';
  showBio?: boolean;
}

const TrainersModule: React.FC<TrainersModuleProps> = ({
  trainers,
  layout = 'grid',
  showBio = true,
}) => {
  const [expandedBios, setExpandedBios] = useState<Set<string>>(new Set());

  const toggleBio = (id: string) => {
    setExpandedBios(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const truncateBio = (bio: string, maxLength: number = 120): string => {
    if (bio.length <= maxLength) return bio;
    return bio.substring(0, maxLength) + '...';
  };

  if (layout === 'list') {
    return (
      <section aria-labelledby="trainers-heading" className="space-y-6">
        <h2
          id="trainers-heading"
          className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl uppercase tracking-wider text-burgundy-primary text-center mb-8"
        >
          Our Trainers
        </h2>

        <div role="list" className="space-y-6">
          {trainers.map(trainer => (
            <article
              key={trainer.id}
              role="listitem"
              className="flex flex-col md:flex-row gap-6 bg-charcoal-black border-3 border-cream-primary p-6"
            >
              <div className="md:w-1/3">
                <img
                  src={trainer.image || '/images/placeholder-trainer.jpg'}
                  alt={`${trainer.name}, ${trainer.title}`}
                  className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="md:w-2/3 flex flex-col gap-4 text-cream-primary">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wider">
                    {trainer.name}
                  </h3>
                  <p className="font-[family-name:var(--font-ui)] text-sm uppercase tracking-wide text-cream-dark mt-1">
                    {trainer.title}
                  </p>
                </div>

                {showBio && (
                  <p className="text-base leading-relaxed">
                    {trainer.bio}
                  </p>
                )}

                {trainer.specialties.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold mb-2">Specialties:</p>
                    <ul aria-label="Specialties" className="flex flex-wrap gap-2">
                      {trainer.specialties.map((specialty, idx) => (
                        <li
                          key={idx}
                          className="px-3 py-1 border border-cream-primary text-xs uppercase tracking-wide"
                        >
                          {specialty}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {trainer.instagram && (
                  <a
                    href={trainer.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow ${trainer.name} on Instagram`}
                    className="text-cream-primary hover:text-blood-red transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Follow on Instagram
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  // Grid layout
  return (
    <section aria-labelledby="trainers-heading">
      <h2
        id="trainers-heading"
        className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl uppercase tracking-wider text-burgundy-primary text-center mb-8"
      >
        Our Trainers
      </h2>

      <div role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {trainers.map(trainer => {
          const isExpanded = expandedBios.has(trainer.id);
          const bioText = showBio && isExpanded ? trainer.bio : truncateBio(trainer.bio);
          const needsExpansion = trainer.bio.length > 120;

          return (
            <article key={trainer.id} role="listitem">
              <Card variant="dark" className="h-full flex flex-col">
                <img
                  src={trainer.image || '/images/placeholder-trainer.jpg'}
                  alt={`${trainer.name}, ${trainer.title}`}
                  className="w-full aspect-square object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500 mb-4"
                />

                <h3 className="font-[family-name:var(--font-display)] text-xl uppercase tracking-wider text-cream-primary">
                  {trainer.name}
                </h3>

                <p className="font-[family-name:var(--font-ui)] text-sm uppercase tracking-wide text-cream-dark mt-1 mb-4">
                  {trainer.title}
                </p>

                {showBio && (
                  <div className="mb-4 flex-1">
                    <p className="text-sm text-cream-light leading-relaxed">
                      {bioText}
                    </p>
                    {needsExpansion && (
                      <button
                        onClick={() => toggleBio(trainer.id)}
                        aria-expanded={isExpanded}
                        className="text-blood-red text-sm mt-2 hover:underline"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>
                )}

                {trainer.specialties.length > 0 && (
                  <ul aria-label="Specialties" className="flex flex-wrap gap-2 mb-4">
                    {trainer.specialties.map((specialty, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-cream-dark"
                      >
                        {specialty}{idx < trainer.specialties.length - 1 ? ' · ' : ''}
                      </li>
                    ))}
                  </ul>
                )}

                {trainer.instagram && (
                  <a
                    href={trainer.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow ${trainer.name} on Instagram`}
                    className="text-cream-primary hover:text-blood-red transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}
              </Card>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default TrainersModule;
