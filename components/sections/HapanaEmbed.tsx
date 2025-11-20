'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import RealHapanaWidget from './RealHapanaWidget';

export interface HapanaEmbedProps {
  widgetId?: string;
  className?: string;
  theme?: 'light' | 'dark';
  mode?: 'demo' | 'live';
  dataType?: 'classes' | 'packages';
  onBookingComplete?: (booking: unknown) => void;
}

/**
 * HapanaEmbed - Smart booking widget with demo/live mode switching
 *
 * This component automatically switches between demo and live modes based on:
 * 1. Explicit `mode` prop
 * 2. NEXT_PUBLIC_HAPANA_MODE environment variable
 * 3. Defaults to 'demo' for safe development
 *
 * DEMO MODE: Shows fake booking cards for development/presentation
 * LIVE MODE: Loads real Hapana widget for production bookings
 *
 * @see HAPANA_INTEGRATION_NOTES.md for integration guide
 */
const HapanaEmbed: React.FC<HapanaEmbedProps> = ({
  widgetId,
  className = '',
  theme = 'light',
  mode,
  dataType = 'packages',
  onBookingComplete,
}) => {
  // Determine mode: prop > env > default
  const effectiveMode = mode || (process.env.NEXT_PUBLIC_HAPANA_MODE as 'demo' | 'live') || 'demo';

  // Get widget ID from props or environment
  const effectiveWidgetId = widgetId || process.env.NEXT_PUBLIC_HAPANA_WIDGET_ID || 'demo-widget-id';

  // LIVE MODE: Render real Hapana widget
  if (effectiveMode === 'live') {
    return (
      <div className={`hapana-embed-wrapper ${className}`}>
        <RealHapanaWidget
          widgetId={effectiveWidgetId}
          theme={theme}
          dataType={dataType}
          onBookingComplete={onBookingComplete}
        />
      </div>
    );
  }

  // DEMO MODE: Render fake booking interface for development
  return (
    <div
      role="region"
      aria-label="Demo booking widget"
      className={`relative ${className}`}
    >
      {/* Demo Booking Interface */}
      <div
        className="hapana-widget-wrapper bg-cream-primary border-3 border-burgundy-primary grunge-texture p-8"
        style={{ minHeight: '600px' }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl uppercase tracking-wider text-burgundy-primary mb-3">
            Book Your Class
          </h3>
          <p className="text-charcoal-black">Select a date and time below</p>
        </div>

        {/* Demo Class Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Class Card 1 */}
          <div className="p-6 border-2 border-burgundy-primary bg-white hover:shadow-lg transition-shadow">
            <div className="font-semibold text-burgundy-primary mb-2">Monday 6:00 AM</div>
            <div className="text-sm mb-1">Bootcamp</div>
            <div className="text-sm text-gray-600">Sarah Jones</div>
            <div className="text-xs mt-2 text-blood-red">5 spots left</div>
            <Button variant="primary" size="md" className="w-full mt-4">
              Book Now
            </Button>
          </div>

          {/* Class Card 2 */}
          <div className="p-6 border-2 border-burgundy-primary bg-white hover:shadow-lg transition-shadow">
            <div className="font-semibold text-burgundy-primary mb-2">Monday 9:30 AM</div>
            <div className="text-sm mb-1">Technique</div>
            <div className="text-sm text-gray-600">Tom Wong</div>
            <div className="text-xs mt-2 text-blood-red">12 spots left</div>
            <Button variant="primary" size="md" className="w-full mt-4">
              Book Now
            </Button>
          </div>

          {/* Class Card 3 */}
          <div className="p-6 border-2 border-burgundy-primary bg-white hover:shadow-lg transition-shadow">
            <div className="font-semibold text-burgundy-primary mb-2">Monday 6:00 PM</div>
            <div className="text-sm mb-1">Sparring</div>
            <div className="text-sm text-gray-600">Coach J</div>
            <div className="text-xs mt-2 text-blood-red">2 spots left</div>
            <Button variant="primary" size="md" className="w-full mt-4">
              Book Now
            </Button>
          </div>

          {/* Class Card 4 */}
          <div className="p-6 border-2 border-burgundy-primary bg-white hover:shadow-lg transition-shadow">
            <div className="font-semibold text-burgundy-primary mb-2">Tuesday 7:00 AM</div>
            <div className="text-sm mb-1">HIIT Burn</div>
            <div className="text-sm text-gray-600">Sarah Jones</div>
            <div className="text-xs mt-2 text-blood-red">8 spots left</div>
            <Button variant="primary" size="md" className="w-full mt-4">
              Book Now
            </Button>
          </div>

          {/* Class Card 5 */}
          <div className="p-6 border-2 border-burgundy-primary bg-white hover:shadow-lg transition-shadow">
            <div className="font-semibold text-burgundy-primary mb-2">Tuesday 6:30 PM</div>
            <div className="text-sm mb-1">Fight Fitness</div>
            <div className="text-sm text-gray-600">Tom Wong</div>
            <div className="text-xs mt-2 text-blood-red">10 spots left</div>
            <Button variant="primary" size="md" className="w-full mt-4">
              Book Now
            </Button>
          </div>

          {/* Class Card 6 */}
          <div className="p-6 border-2 border-burgundy-primary bg-white hover:shadow-lg transition-shadow">
            <div className="font-semibold text-burgundy-primary mb-2">Wednesday 6:00 AM</div>
            <div className="text-sm mb-1">Fundamentals</div>
            <div className="text-sm text-gray-600">Coach J</div>
            <div className="text-xs mt-2 text-blood-red">15 spots left</div>
            <Button variant="primary" size="md" className="w-full mt-4">
              Book Now
            </Button>
          </div>
        </div>

        {/* Demo Mode Indicator */}
        <div className="text-center p-6 bg-charcoal-black text-cream-primary mt-8 rounded">
          <p className="text-sm mb-2 font-semibold uppercase tracking-wide">
            🎭 Demo Mode Active
          </p>
          <p className="text-xs opacity-70">
            This is a demonstration interface. Real Hapana widget will appear when mode is set to 'live'.
          </p>
          <p className="text-xs opacity-50 mt-2">
            Set <code className="bg-white/10 px-2 py-1 rounded">NEXT_PUBLIC_HAPANA_MODE=live</code> to enable real bookings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HapanaEmbed;
