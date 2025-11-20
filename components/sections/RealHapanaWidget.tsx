'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface RealHapanaWidgetProps {
  widgetId: string;
  theme?: 'light' | 'dark';
  dataType?: 'classes' | 'packages';
  instructorId?: string;
  sessionType?: string;
  packageId?: string;
  variant?: string;
  onBookingComplete?: (booking: unknown) => void;
}

/**
 * RealHapanaWidget - Production Hapana booking widget integration
 *
 * Uses Hapana's custom web component (<hapana-widget>) to embed booking functionality.
 *
 * VERIFIED HAPANA IMPLEMENTATION:
 * - Uses <hapana-widget> custom HTML element
 * - Loads script from https://widget.hapana.com/hapana_widget.js
 * - Supports data-type: 'classes' or 'packages'
 * - Widget ID format: Base64 encoded string (e.g., "ZjV0eGJ3cGUzU1c1VGtlcUxGOVFDUT09")
 *
 * @see HAPANA_INTEGRATION_NOTES.md for full integration guide
 */
const RealHapanaWidget: React.FC<RealHapanaWidgetProps> = ({
  widgetId,
  theme = 'light',
  dataType = 'classes',
  instructorId = '',
  sessionType = '',
  packageId = '',
  variant = '',
  onBookingComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Hapana script URL (official)
    const scriptUrl = process.env.NEXT_PUBLIC_HAPANA_SCRIPT_URL || 'https://widget.hapana.com/hapana_widget.js';

    // Check if script already exists
    const existingScript = document.getElementById('hapana-widget-script');

    if (existingScript) {
      // Script already loaded
      setIsScriptLoaded(true);
      return;
    }

    // Load Hapana script
    const script = document.createElement('script');
    script.id = 'hapana-widget-script';
    script.src = scriptUrl;
    script.async = true;

    script.onload = () => {
      console.log('✅ Hapana widget script loaded successfully');
      setIsScriptLoaded(true);
    };

    script.onerror = () => {
      const errorMsg = 'Failed to load Hapana booking script';
      setError(errorMsg);
      console.error('❌', errorMsg, 'from:', scriptUrl);
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: Remove script on unmount if needed
      // Note: Usually keep script loaded for performance across page navigations
    };
  }, []);

  // Render custom element after script loads
  useEffect(() => {
    if (!isScriptLoaded || !containerRef.current) return;

    // Create Hapana widget custom element
    const hapanaWidget = document.createElement('hapana-widget');

    // Set attributes based on data type
    hapanaWidget.setAttribute('data-type', dataType);
    hapanaWidget.setAttribute('widget-id', widgetId);

    if (dataType === 'classes') {
      // Classes widget attributes
      if (instructorId) hapanaWidget.setAttribute('instructor-id', instructorId);
      if (sessionType) hapanaWidget.setAttribute('session-type', sessionType);
    } else if (dataType === 'packages') {
      // Packages widget attributes
      if (packageId) hapanaWidget.setAttribute('package-id', packageId);
      if (variant) hapanaWidget.setAttribute('variant', variant);
    }

    // Clear container and append widget
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(hapanaWidget);

    // Listen for Hapana events (if available)
    // Note: Verify event names with Hapana documentation
    const handleBookingComplete = (event: CustomEvent) => {
      console.log('🎉 Booking completed:', event.detail);
      if (onBookingComplete) {
        onBookingComplete(event.detail);
      }
    };

    // Add event listeners (verify these event names with Hapana)
    hapanaWidget.addEventListener('booking-complete', handleBookingComplete as EventListener);

    return () => {
      hapanaWidget.removeEventListener('booking-complete', handleBookingComplete as EventListener);
    };
  }, [isScriptLoaded, widgetId, dataType, instructorId, sessionType, packageId, variant, onBookingComplete]);

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 border-2 border-red-200 rounded-lg">
        <p className="text-red-600 font-semibold mb-2">⚠️ Booking Widget Error</p>
        <p className="text-sm text-red-500 mb-4">{error}</p>
        <div className="text-xs text-gray-600 bg-white p-4 rounded border border-gray-200">
          <p className="font-semibold mb-2">Troubleshooting:</p>
          <ul className="text-left space-y-1">
            <li>• Check your internet connection</li>
            <li>• Verify Hapana service is online</li>
            <li>• Check browser console for details</li>
            <li>• Try refreshing the page</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id="real-hapana-widget-container"
      className="hapana-widget-wrapper"
      data-widget-id={widgetId}
      data-theme={theme}
      style={{
        // Custom CSS variables for Hapana widget theming
        // Arena Boxing brand colors
        ['--hapana-primary-color' as string]: '#7D1E1E',      // Burgundy
        ['--hapana-secondary-color' as string]: '#E8DDD3',    // Cream
        ['--hapana-text-color' as string]: theme === 'dark' ? '#E8DDD3' : '#1A1A1A',
        ['--hapana-background-color' as string]: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
        ['--hapana-accent-color' as string]: '#A31F1F',       // Blood Red
        ['--hapana-border-radius' as string]: '4px',
        ['--hapana-font-family' as string]: 'var(--font-body)',
        minHeight: '600px',
        width: '100%',
      }}
    >
      {/* Hapana widget will render here as <hapana-widget> custom element */}
      {!isScriptLoaded && (
        <div className="flex items-center justify-center p-12 min-h-[400px]">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-burgundy-primary/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-burgundy-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-burgundy-primary font-semibold uppercase text-sm tracking-wide">
              Loading Booking System
            </p>
            <p className="text-xs text-gray-500 mt-2">Please wait...</p>
          </div>
        </div>
      )}
    </div>
  );
};

// TypeScript declarations for Hapana custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hapana-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'data-type'?: 'classes' | 'packages';
          'widget-id'?: string;
          'instructor-id'?: string;
          'session-type'?: string;
          'package-id'?: string;
          'variant'?: string;
        },
        HTMLElement
      >;
    }
  }

  interface WindowEventMap {
    'booking-complete': CustomEvent;
  }
}

export default RealHapanaWidget;
