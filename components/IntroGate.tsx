'use client';

import { ReactNode, useEffect, useState } from 'react';
import LandingMockG from './LandingMockG';

const STORAGE_KEY = 'arena_intro_seen';

export default function IntroGate({ children }: { children: ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        setShowIntro(false);
      }
    } catch {
      // If storage is blocked, keep the brand intro available.
    }
  }, []);

  return (
    <>
      {children}
      {showIntro && (
        <LandingMockG
          mode="gate"
          exitHref="/"
          onComplete={() => setShowIntro(false)}
        />
      )}
    </>
  );
}
