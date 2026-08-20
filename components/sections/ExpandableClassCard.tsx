/**
 * ExpandableClassCard Component
 * Interactive cards for Work/Craft/Spar with expand/collapse functionality
 * Shows inline Hapana widget when expanded
 */

'use client';

import RealHapanaWidget from './RealHapanaWidget';
import { HAPANA_WIDGET_ID_FALLBACK } from '@/lib/hapana-config';

export type ClassType = 'work' | 'craft' | 'spar';

interface ExpandableClassCardProps {
  type: ClassType;
  isExpanded: boolean;
  onToggle: () => void;
}

const classConfig = {
  work: {
    title: 'WORK',
    subtitle: 'Build your foundation',
    icon: '🥊', // Heavy bag icon (can be replaced with SVG)
    description: '10 brutal rounds. No mercy. No excuses.',
    fullDescription:
      'High-intensity conditioning that builds the engine. Heavy bag work, speed drills, bodyweight circuits, and relentless rounds. This is where fighters are forged.',
    hapanaFilter: 'bootcamp', // Adjust based on actual Hapana class names
  },
  craft: {
    title: 'CRAFT',
    subtitle: 'Master the technique',
    icon: '🥋', // Pad icon (can be replaced with SVG)
    description: 'Precision. Form. The sweet science.',
    fullDescription:
      'Technical mastery through focused pad work, combination drills, and footwork fundamentals. Perfect for beginners and advanced fighters refining their craft.',
    hapanaFilter: 'technique', // Adjust based on actual Hapana class names
  },
  spar: {
    title: 'SPAR',
    subtitle: 'Test your mettle',
    icon: '🥊', // Ring icon (can be replaced with SVG)
    description: 'Put your skills to the test against real opposition.',
    fullDescription:
      'Controlled sparring sessions with experienced coaches. Light contact, full contact, and ring work. Advanced level only - requires coach approval.',
    hapanaFilter: 'sparring', // Adjust based on actual Hapana class names
  },
};

export default function ExpandableClassCard({
  type,
  isExpanded,
  onToggle,
}: ExpandableClassCardProps) {
  const config = classConfig[type];

  return (
    <div
      className={`relative transition-all duration-500 ${
        isExpanded ? 'col-span-full' : 'col-span-1'
      }`}
    >
      {/* Card Button (always visible) */}
      <button
        onClick={onToggle}
        className={`w-full bg-charcoal-light border-3 border-cream-primary p-8 transition-all duration-300 hover:border-blood-red hover:scale-[1.02] ${
          isExpanded ? 'border-blood-red' : ''
        }`}
        style={{
          backgroundImage: 'url(/textures/grunge-light.webp)',
          backgroundBlendMode: 'multiply',
          backgroundSize: 'cover',
        }}
      >
        {/* Icon */}
        <div className="text-6xl mb-4 transition-transform duration-300 hover:scale-110">
          {config.icon}
        </div>

        {/* Title */}
        <h3
          className="font-display text-3xl md:text-4xl text-cream-primary uppercase tracking-wide mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {config.title}
        </h3>

        {/* Subtitle */}
        <p className="font-body text-cream-dark text-sm md:text-base mb-4">
          {config.subtitle}
        </p>

        {/* Short description */}
        {!isExpanded && (
          <p className="font-body text-cream-primary text-base md:text-lg leading-relaxed">
            {config.description}
          </p>
        )}

        {/* Expand/Collapse indicator */}
        <div className="mt-6 text-blood-red text-sm uppercase tracking-wider">
          {isExpanded ? '↑ COLLAPSE' : '↓ EXPAND'}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div
          className="mt-6 bg-charcoal-black border-3 border-blood-red p-8 animate-fade-slide-up"
          style={{
            backgroundImage: 'url(/textures/grunge-light.webp)',
            backgroundBlendMode: 'multiply',
            backgroundSize: 'cover',
          }}
        >
          {/* Full description */}
          <p className="font-body text-cream-primary text-lg md:text-xl leading-relaxed mb-8">
            {config.fullDescription}
          </p>

          {/* Hapana Widget */}
          <div className="border-2 border-cream-dark p-6">
            <h4 className="font-ui text-cream-primary text-xl uppercase tracking-wide mb-4">
              {config.title} CLASSES THIS WEEK
            </h4>
            <RealHapanaWidget
              widgetId={process.env.NEXT_PUBLIC_HAPANA_WIDGET_ID || HAPANA_WIDGET_ID_FALLBACK}
              dataType="classes"
              theme="dark"
              // Note: Hapana widget filtering might need custom implementation
              // or may need to show all classes with visual filtering
            />
          </div>

          {/* Collapse button */}
          <button
            onClick={onToggle}
            className="mt-6 w-full py-3 border-2 border-cream-primary text-cream-primary uppercase tracking-wide font-ui hover:bg-cream-primary hover:text-charcoal-black transition-colors duration-300"
          >
            ↑ COLLAPSE
          </button>
        </div>
      )}
    </div>
  );
}
