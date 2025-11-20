/**
 * Arena Boxing Design Tokens
 * Type-safe design system values for programmatic use
 * @version 1.0.0
 */

export const colors = {
  burgundy: {
    primary: '#7D1E1E',
    light: '#8B2635',
    dark: '#6B1A1A',
  },
  cream: {
    primary: '#E8DDD3',
    light: '#F0E6DB',
    dark: '#D4C8BD',
  },
  charcoal: {
    black: '#1A1A1A',
    light: '#2D2D2D',
  },
  bloodRed: '#A31F1F',
} as const;

export const typography = {
  fonts: {
    display: "'Old London', 'UnifrakturMaguntia', 'Old English Text MT', 'Fraktur', serif",
    tagline: "'Old London Alternative', 'Bebas Neue', 'Oswald', sans-serif",
    body: "'Inter', 'Barlow', 'Source Sans 3', system-ui, sans-serif",
    ui: "'Barlow Semi Condensed', 'Oswald', sans-serif",
  },
  sizes: {
    hero: '96px',
    h1: '72px',
    h2: '48px',
    h3: '32px',
    body: '18px',
    small: '14px',
  },
  weights: {
    light: 300,
    regular: 400,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.1,
    normal: 1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.15em',
    widest: '0.25em',
  },
} as const;

export const spacing = {
  1: '0.25rem', // 4px
  2: '0.5rem',  // 8px
  3: '0.75rem', // 12px
  4: '1rem',    // 16px
  5: '1.25rem', // 20px
  6: '1.5rem',  // 24px
  8: '2rem',    // 32px
  10: '2.5rem', // 40px
  12: '3rem',   // 48px
  16: '4rem',   // 64px
  20: '5rem',   // 80px
  24: '6rem',   // 96px
  32: '8rem',   // 128px
  section: '6rem',
  content: '2rem',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const shadows = {
  grunge: '0 4px 12px rgba(26, 26, 26, 0.4)',
  intense: '0 8px 24px rgba(125, 30, 30, 0.5)',
  subtle: '0 2px 8px rgba(0, 0, 0, 0.15)',
} as const;

export const animations = {
  durations: {
    fast: '200ms',
    base: '300ms',
    slow: '500ms',
    slower: '1s',
    slowest: '3s',
  },
  easings: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// Type exports for autocomplete
export type BurgundyColor = keyof typeof colors.burgundy;
export type CreamColor = keyof typeof colors.cream;
export type CharcoalColor = keyof typeof colors.charcoal;
export type FontFamily = keyof typeof typography.fonts;
export type FontSize = keyof typeof typography.sizes;
export type Spacing = keyof typeof spacing;
export type Breakpoint = keyof typeof breakpoints;
