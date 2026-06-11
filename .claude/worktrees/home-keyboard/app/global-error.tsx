/**
 * Global Error Boundary
 * Catches errors that bubble all the way to the root layout
 */

'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('💥 Global Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{
            minHeight: '100vh',
            backgroundColor: '#1A1A1A',
            color: '#E8DDD3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div style={{ maxWidth: '600px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', marginBottom: '16px', color: '#A31F1F' }}>
              CRITICAL ERROR
            </h1>
            <p style={{ fontSize: '18px', marginBottom: '32px', lineHeight: '1.6' }}>
              A critical error occurred. Please refresh the page or contact support.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <div
                style={{
                  backgroundColor: 'rgba(163, 31, 31, 0.1)',
                  border: '2px solid #A31F1F',
                  padding: '20px',
                  marginBottom: '32px',
                  textAlign: 'left',
                  overflow: 'auto',
                  maxHeight: '300px',
                }}
              >
                <pre style={{ fontSize: '12px', margin: 0, whiteSpace: 'pre-wrap' }}>
                  {error.message}
                </pre>
                {error.digest && (
                  <p style={{ fontSize: '10px', marginTop: '8px', opacity: 0.7 }}>
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button
                onClick={reset}
                style={{
                  padding: '12px 32px',
                  backgroundColor: '#A31F1F',
                  color: '#E8DDD3',
                  border: '2px solid #E8DDD3',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                TRY AGAIN
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                style={{
                  padding: '12px 32px',
                  backgroundColor: 'transparent',
                  color: '#E8DDD3',
                  border: '2px solid #E8DDD3',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                GO HOME
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
