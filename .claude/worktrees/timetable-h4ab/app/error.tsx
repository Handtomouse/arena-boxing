/**
 * Root Error Boundary
 * Catches errors in the app router and shows a branded error page
 */

'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console (and could send to error tracking service)
    console.error('💥 App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-charcoal-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Arena Icon */}
        <div className="mb-8">
          <img
            src="/images/icon/icon-cream.svg"
            alt="Arena Boxing"
            className="w-24 h-24 mx-auto opacity-50"
          />
        </div>

        {/* Error Message */}
        <h1 className="font-display text-cream-primary text-4xl md:text-5xl uppercase tracking-wider mb-4">
          Something Went Wrong
        </h1>

        <p className="font-body text-cream-dark text-lg md:text-xl mb-8 max-w-lg mx-auto">
          Even the best fighters stumble. We've logged this issue and are working to fix it.
        </p>

        {/* Error Details (dev mode only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-6 bg-burgundy-primary/10 border-2 border-burgundy-primary rounded text-left overflow-auto max-h-64">
            <p className="font-mono text-sm text-cream-primary whitespace-pre-wrap">
              {error.message}
            </p>
            {error.digest && (
              <p className="font-mono text-xs text-cream-dark mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={reset}
          >
            TRY AGAIN
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.href = '/'}
          >
            GO HOME
          </Button>
        </div>

        {/* Support Link */}
        <p className="mt-8 text-cream-dark text-sm">
          Need help?{' '}
          <a
            href="mailto:hello@arenaboxing.com.au"
            className="text-blood-red hover:text-cream-primary transition-colors underline"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
