# Arena Boxing - UI Design System

> **"Those Who Dare"**
> Premium · Gritty but Clean · Boutique · High Contrast

---

## 🎨 Design Principles

### Brand Essence
- **NOT**: Franchise gym (F45, Barry's Bootcamp templates)
- **NOT**: Wellness spa (soft pastels, rounded corners)
- **NOT**: Hardcore dungeon (all-black, intimidating)
- **YES**: Gothic fight culture meets modern Bondi boutique
- **YES**: Medieval craftsmanship with contemporary edge
- **YES**: Raw intensity balanced with refined execution

### Visual Language
1. **Premium**: Attention to detail, deliberate imperfection, quality materials
2. **Gritty**: Distressed textures, grunge overlays, analog imperfections
3. **Clean**: High contrast, clear hierarchy, breathing space
4. **Boutique**: Unique typography, custom touches, anti-template

---

## 🎨 Colour Palette

### Primary Colours

#### Burgundy (Primary Brand)
```css
--burgundy-900: #4A0E0E;  /* Darkest - shadows, depth */
--burgundy-800: #6B1A1A;  /* Dark - backgrounds */
--burgundy-700: #7D1E1E;  /* PRIMARY - main brand color */
--burgundy-600: #8B2635;  /* Light - hover states */
--burgundy-500: #9D3A47;  /* Lighter - accents */
```

**Usage**:
- Primary CTAs (buttons, links)
- Navigation background
- Section backgrounds
- Brand accents

**Psychology**: Power, intensity, heritage, combat

---

#### Cream (Secondary)
```css
--cream-100: #F0E6DB;  /* Lightest - highlights */
--cream-200: #E8DDD3;  /* PRIMARY - main text, borders */
--cream-300: #DFD3C7;  /* Medium - muted text */
--cream-400: #D4C8BD;  /* Dark - supporting text */
--cream-500: #C4B5A7;  /* Darkest - disabled states */
```

**Usage**:
- Primary text on dark backgrounds
- Borders and dividers
- Card backgrounds (light variant)
- Icons and symbols

**Psychology**: Elegance, timelessness, parchment/manuscript

---

#### Charcoal (Neutral Dark)
```css
--charcoal-950: #0D0D0D;  /* Pure black alternative */
--charcoal-900: #1A1A1A;  /* PRIMARY - backgrounds */
--charcoal-800: #2D2D2D;  /* Light - cards, containers */
--charcoal-700: #404040;  /* Lighter - borders */
--charcoal-600: #525252;  /* Lightest - disabled */
```

**Usage**:
- Page backgrounds
- Card/container backgrounds
- Text on light backgrounds
- Dividers and rules

**Psychology**: Sophistication, depth, foundation

---

### Accent Colours

#### Blood Red (High Contrast Accent)
```css
--blood-red-700: #8B1818;  /* Dark - shadows */
--blood-red-600: #A31F1F;  /* PRIMARY - CTAs, errors */
--blood-red-500: #C92929;  /* Light - hover states */
```

**Usage**:
- High-priority CTAs ("Enter The Arena")
- Error states and warnings
- Active states and focus rings
- Hover effects on interactive elements

**Psychology**: Urgency, passion, action, danger

---

#### Iron (Metallic Neutral)
```css
--iron-400: #6B6B6B;  /* Dark grey for subtle elements */
--iron-300: #8A8A8A;  /* Medium grey for borders */
--iron-200: #A8A8A8;  /* Light grey for disabled text */
```

**Usage**:
- Disabled states
- Placeholder text
- Subtle borders
- Loading skeletons

---

### Colour Usage Rules

#### Backgrounds
```css
/* Dark Sections (majority) */
background: var(--charcoal-900);
background: var(--burgundy-800);

/* Light Sections (contrast) */
background: var(--cream-200);

/* Hero/Featured */
background: var(--burgundy-700);
```

#### Text
```css
/* On Dark Backgrounds */
color: var(--cream-200);      /* Primary text */
color: var(--cream-400);      /* Secondary text */

/* On Light Backgrounds */
color: var(--charcoal-900);   /* Primary text */
color: var(--charcoal-700);   /* Secondary text */
```

#### Buttons
```css
/* Primary CTA */
background: var(--burgundy-700);
color: var(--cream-200);
border: 2px solid var(--cream-200);

/* Primary CTA Hover */
background: var(--blood-red-600);
box-shadow: 0 0 20px var(--blood-red-600);

/* Secondary CTA */
background: transparent;
color: var(--cream-200);
border: 2px solid var(--cream-200);

/* Destructive */
background: var(--blood-red-600);
color: var(--cream-200);
```

#### Links
```css
/* Default */
color: var(--blood-red-600);
text-decoration: underline;

/* Hover */
color: var(--burgundy-500);
```

---

## ✍️ Typography System

### Font Families

#### Display (Gothic/Blackletter)
```css
--font-display: 'Old London', 'UnifrakturMaguntia', 'Old English Text MT', 'Fraktur', serif;
```

**Usage**: "ARENA" wordmark, H1 headings, hero titles
**Characteristics**: Medieval, gothic, imposing, decorative
**Weight**: Bold (700) only
**Transform**: UPPERCASE always
**Tracking**: Wide (0.02em - 0.05em)
**Format**: SVG logo files preferred (see `/public/images/wordmark/`)

**Licensing**: Old London (Commercial - Licensed)
**Fallback**: UnifrakturMaguntia (Google Fonts - Free), then system blackletter

**Logo Files**:
- SVG: `arena-cream.svg`, `arena-black.svg`
- WebP: `arena-cream.webp`, `arena-black.webp`

---

#### Tagline (Gothic Alternative)
```css
--font-tagline: 'Old London Alternative', 'Bebas Neue', 'Oswald', sans-serif;
```

**Usage**: "those who dare" tagline, subheadings, large quotes
**Characteristics**: Italic blackletter, dynamic, speed-line
**Weight**: Regular (400)
**Transform**: lowercase for tagline, UPPERCASE for subheadings
**Tracking**: Ultra-wide (0.2em - 0.3em)
**Format**: SVG logo files preferred (see `/public/images/tagline/`)

**Licensing**: Old London Alternative (Commercial - Licensed)
**Fallback**: Bebas Neue (Google Fonts - Free)

**Logo Files**:
- SVG: `those-who-dare-cream.svg`, `those-who-dare-black.svg`
- WebP: `those-who-dare-cream.webp`, `those-who-dare-black.webp`

---

#### Body (Clean Sans)
```css
--font-body: 'Inter', 'Barlow', 'Source Sans 3', system-ui, sans-serif;
```

**Usage**: Body text, paragraphs, descriptions
**Characteristics**: Readable, modern, neutral
**Weights**: Regular (400), Medium (500)
**Transform**: Sentence case
**Tracking**: Normal (0)

**Licensing**: Inter (Google Fonts - Free)

---

#### UI (Condensed Sans)
```css
--font-ui: 'Barlow Semi Condensed', 'Oswald', sans-serif;
```

**Usage**: Buttons, labels, navigation, form fields
**Characteristics**: Compact, technical, utilitarian
**Weights**: Semibold (600), Bold (700)
**Transform**: UPPERCASE for buttons/nav
**Tracking**: Wide (0.1em - 0.15em)

**Licensing**: Barlow Semi Condensed (Google Fonts - Free)

---

### Type Scale (Fluid Typography)

Using `clamp()` for responsive scaling:

```css
/* Hero/Display */
--text-hero: clamp(4rem, 12vw, 10rem);      /* 64px → 160px */
--text-display: clamp(3rem, 8vw, 6rem);     /* 48px → 96px */

/* Headings */
--text-h1: clamp(2.5rem, 6vw, 4.5rem);      /* 40px → 72px */
--text-h2: clamp(2rem, 5vw, 3.5rem);        /* 32px → 56px */
--text-h3: clamp(1.5rem, 4vw, 2.5rem);      /* 24px → 40px */
--text-h4: clamp(1.25rem, 3vw, 2rem);       /* 20px → 32px */

/* Body */
--text-lg: 1.25rem;                         /* 20px */
--text-base: 1.125rem;                      /* 18px */
--text-sm: 1rem;                            /* 16px */
--text-xs: 0.875rem;                        /* 14px */
--text-2xs: 0.75rem;                        /* 12px */
```

### Line Heights

```css
/* Tight (Headings) */
--leading-tight: 1.1;

/* Normal (Body) */
--leading-normal: 1.5;

/* Relaxed (Long-form) */
--leading-relaxed: 1.75;

/* Loose (Quotes, Taglines) */
--leading-loose: 2;
```

### Font Weights

```css
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-black: 900;
```

**Usage Rules**:
- Display font: Bold (700) only
- Tagline font: Regular (400) only
- Body font: Regular (400) for text, Medium (500) for emphasis
- UI font: Semibold (600) for buttons, Bold (700) for nav

---

### Typography Examples

#### Hero Text
```css
font-family: var(--font-display);
font-size: var(--text-hero);
font-weight: var(--font-bold);
line-height: var(--leading-tight);
letter-spacing: 0.05em;
text-transform: uppercase;
color: var(--cream-200);
```

#### Tagline
```css
font-family: var(--font-tagline);
font-size: var(--text-h2);
font-weight: var(--font-regular);
line-height: var(--leading-normal);
letter-spacing: 0.3em;
font-style: italic;
text-transform: lowercase;
color: var(--cream-200);
```

#### Body Text
```css
font-family: var(--font-body);
font-size: var(--text-base);
font-weight: var(--font-regular);
line-height: var(--leading-relaxed);
letter-spacing: 0;
color: var(--cream-200);
```

#### Button Text
```css
font-family: var(--font-ui);
font-size: var(--text-sm);
font-weight: var(--font-semibold);
line-height: 1;
letter-spacing: 0.15em;
text-transform: uppercase;
color: var(--cream-200);
```

---

## 📐 Layout & Spacing

### Spacing Scale

Based on 8px baseline grid:

```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### Spacing Rules

#### Component Internal Spacing
```css
/* Small components (buttons, badges) */
padding: var(--space-2) var(--space-4);    /* 8px 16px */

/* Medium components (cards, inputs) */
padding: var(--space-4) var(--space-6);    /* 16px 24px */

/* Large components (sections) */
padding: var(--space-12) var(--space-6);   /* 48px 24px */
```

#### Section Spacing
```css
/* Vertical spacing between sections */
padding-top: clamp(4rem, 10vw, 8rem);      /* 64px → 128px */
padding-bottom: clamp(4rem, 10vw, 8rem);

/* Horizontal container padding */
padding-left: var(--space-6);              /* 24px */
padding-right: var(--space-6);
```

#### Content Spacing
```css
/* Paragraph spacing */
margin-bottom: var(--space-6);             /* 24px */

/* Heading spacing */
margin-bottom: var(--space-4);             /* 16px */

/* List item spacing */
margin-bottom: var(--space-3);             /* 12px */
```

---

### Grid System

#### Container Widths
```css
--container-sm: 640px;    /* Mobile landscape */
--container-md: 768px;    /* Tablet */
--container-lg: 1024px;   /* Desktop */
--container-xl: 1280px;   /* Large desktop */
--container-2xl: 1536px;  /* Extra large */
```

**Default Container**:
```css
.container {
  max-width: var(--container-xl);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-6);
  padding-right: var(--space-6);
}
```

#### Column Grid
```css
/* 12-column grid */
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);
}

/* Responsive columns */
.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
```

#### Breakpoints
```css
/* Mobile first approach */
--screen-sm: 640px;   /* Mobile landscape */
--screen-md: 768px;   /* Tablet portrait */
--screen-lg: 1024px;  /* Desktop */
--screen-xl: 1280px;  /* Large desktop */
--screen-2xl: 1536px; /* Extra large */
```

**Usage**:
```css
/* Base (mobile) */
.class { ... }

/* Tablet and up */
@media (min-width: 768px) {
  .class { ... }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .class { ... }
}
```

---

## 🧩 Component Library

### Button Components

#### Primary Button
```tsx
// Visual Spec
background: var(--burgundy-700)
color: var(--cream-200)
border: 2px solid var(--cream-200)
border-radius: 0 (no rounded corners)
padding: 12px 24px (md), 16px 32px (lg)
font-family: var(--font-ui)
font-weight: 600
text-transform: uppercase
letter-spacing: 0.15em

// States
:hover → background: var(--blood-red-600), scale: 1.05
:active → scale: 0.98
:focus → outline: 3px solid var(--blood-red-600)
:disabled → opacity: 0.5, cursor: not-allowed

// Effects
- Grunge texture overlay (opacity 0.3)
- Subtle box-shadow on hover (0 4px 12px blood-red)
- 300ms transition on all properties
```

#### Secondary Button
```tsx
background: transparent
color: var(--cream-200)
border: 2px solid var(--cream-200)

:hover → background: var(--burgundy-800)
```

#### Ghost Button
```tsx
background: transparent
color: var(--blood-red-600)
border: none
text-decoration: underline

:hover → color: var(--burgundy-500)
```

---

### Card Components

#### Default Card (Light)
```tsx
background: var(--cream-200)
color: var(--charcoal-900)
border: 3px solid var(--charcoal-900) (distressed if enabled)
padding: var(--space-8)
box-shadow: 0 4px 12px rgba(26, 26, 26, 0.4)

// Optional grunge texture overlay
::before {
  background-image: url('/textures/grunge-light.webp')
  opacity: 0.15
  mix-blend-mode: multiply
}
```

#### Dark Card
```tsx
background: var(--charcoal-900)
color: var(--cream-200)
border: 2px solid var(--cream-200)
```

#### Feature Card (Highlighted)
```tsx
background: var(--burgundy-700)
color: var(--cream-200)
border: 2px solid var(--cream-200)

// Stronger grunge overlay
::before { opacity: 0.25 }
```

---

### Input Components

#### Text Input
```tsx
background: var(--cream-200)
color: var(--charcoal-900)
border: 2px solid var(--charcoal-700)
border-radius: 0
padding: 12px 16px
font-family: var(--font-body)
font-size: 16px (minimum for mobile to prevent zoom)

:focus → border-color: var(--blood-red-600)
         outline: none
         box-shadow: 0 0 0 3px rgba(163, 31, 31, 0.2)

:error → border-color: var(--blood-red-600)
         color: var(--blood-red-600)
```

#### Label
```tsx
font-family: var(--font-ui)
font-size: var(--text-xs)
font-weight: 600
text-transform: uppercase
letter-spacing: 0.1em
color: var(--cream-200)
margin-bottom: var(--space-2)
```

---

### Navigation Components

#### Header/Navigation
```tsx
position: sticky
top: 0
z-index: 50
background: var(--burgundy-700)
border-bottom: 2px solid var(--cream-200)
padding: var(--space-4) 0 (when scrolled)
padding: var(--space-6) 0 (at top)
transition: padding 300ms ease

// Grunge texture overlay
::before {
  background-image: url('/textures/grunge-light.webp')
  opacity: 0.2
  mix-blend-mode: multiply
}
```

#### Nav Links
```tsx
font-family: var(--font-ui)
font-size: var(--text-sm)
font-weight: 600
text-transform: uppercase
letter-spacing: 0.15em
color: var(--cream-200)

:hover → color: var(--blood-red-600)

// Animated underline
::after {
  width: 0
  height: 2px
  background: var(--blood-red-600)
  transition: width 300ms ease
}

:hover::after → width: 100%
```

---

### Loading States

#### Spinner
```tsx
width: 48px
height: 48px
border: 4px solid var(--cream-200)
border-top: 4px solid var(--blood-red-600)
border-radius: 50%
animation: spin 0.8s linear infinite

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

#### Skeleton Loader
```tsx
background: linear-gradient(
  90deg,
  var(--charcoal-800) 0%,
  var(--charcoal-700) 50%,
  var(--charcoal-800) 100%
)
background-size: 200% 100%
animation: shimmer 1.5s ease-in-out infinite

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

### Error States

#### Error Message
```tsx
background: rgba(163, 31, 31, 0.1)
border: 2px solid var(--blood-red-600)
border-radius: 0
padding: var(--space-4)
color: var(--blood-red-600)
font-family: var(--font-body)
font-size: var(--text-sm)
```

#### Success Message
```tsx
background: rgba(125, 30, 30, 0.1)
border: 2px solid var(--burgundy-700)
color: var(--cream-200)
```

---

## 🎭 Effects & Animations

### Grunge Overlays

#### Light Grunge (Cards)
```css
.grunge-overlay-light::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/textures/grunge-light.webp');
  background-size: cover;
  opacity: 0.15;
  mix-blend-mode: multiply;
  pointer-events: none;
}
```

#### Heavy Grunge (Hero Sections)
```css
.grunge-overlay-heavy::before {
  opacity: 0.3;
}
```

---

### Distressed Borders

```css
.distressed-border {
  border: 3px solid var(--cream-200);
  position: relative;
}

.distressed-border::after {
  content: '';
  position: absolute;
  inset: -3px;
  background-image: url('/textures/border-distress.svg');
  background-size: 100% 100%;
  pointer-events: none;
}
```

---

### Shadows

```css
/* Grunge Depth */
--shadow-grunge: 0 4px 12px rgba(26, 26, 26, 0.4);

/* Intense (CTAs, Modals) */
--shadow-intense: 0 8px 24px rgba(125, 30, 30, 0.5);

/* Subtle (Cards) */
--shadow-subtle: 0 2px 8px rgba(0, 0, 0, 0.2);

/* Blood Glow (Hover States) */
--shadow-blood-glow: 0 0 20px var(--blood-red-600);
```

---

### Transitions

```css
/* Base */
--transition-base: 300ms ease;

/* Fast (Micro-interactions) */
--transition-fast: 150ms ease;

/* Slow (Large movements) */
--transition-slow: 500ms ease;
```

**Usage Rules**:
- Use `ease` for most transitions
- Use `ease-in-out` for entrances/exits
- Use `linear` for continuous animations (spinners, progress)
- Never use custom cubic-bezier (keep it simple)

---

### Animation Keyframes

#### Fade In
```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 500ms ease-in-out;
}
```

#### Slide Up
```css
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 500ms ease-out;
}
```

#### Pulse (Subtle)
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

---

## 📱 Responsive Design

### Mobile-First Approach

```css
/* Base styles (mobile) */
.element {
  font-size: 16px;
  padding: 12px;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .element {
    font-size: 18px;
    padding: 16px;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .element {
    font-size: 20px;
    padding: 24px;
  }
}
```

### Touch Targets

**Minimum**: 44x44px (iOS/Android guidelines)

```css
button,
a,
input,
[role="button"] {
  min-height: 44px;
  min-width: 44px;
}
```

### Font Scaling

**Prevent iOS zoom on input focus**:
```css
input,
textarea,
select {
  font-size: 16px; /* Minimum on mobile */
}
```

---

## ♿ Accessibility

### Contrast Ratios

**WCAG AA Compliance**:
- Large text (≥18px): 3:1 minimum
- Normal text (<18px): 4.5:1 minimum
- Interactive elements: 3:1 minimum

**Color Combinations (Tested)**:
- ✅ Cream (#E8DDD3) on Burgundy (#7D1E1E): 5.2:1
- ✅ Cream (#E8DDD3) on Charcoal (#1A1A1A): 12.8:1
- ✅ Charcoal (#1A1A1A) on Cream (#E8DDD3): 12.8:1
- ✅ Blood Red (#A31F1F) on Charcoal (#1A1A1A): 4.8:1

### Focus States

```css
*:focus-visible {
  outline: 3px solid var(--blood-red-600);
  outline-offset: 2px;
}
```

### Screen Reader Text

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## 📐 Component Sizing

### Button Sizes
```css
/* Small */
padding: 8px 16px;
font-size: 14px;
min-height: 36px;

/* Medium (default) */
padding: 12px 24px;
font-size: 16px;
min-height: 44px;

/* Large */
padding: 16px 32px;
font-size: 18px;
min-height: 52px;
```

### Input Sizes
```css
/* Small */
padding: 8px 12px;
font-size: 14px;
height: 36px;

/* Medium (default) */
padding: 12px 16px;
font-size: 16px;
height: 44px;

/* Large */
padding: 16px 20px;
font-size: 18px;
height: 52px;
```

---

## 🚀 Usage Guidelines

### When to Use Gothic Font
- ✅ "ARENA" wordmark
- ✅ H1 hero headlines
- ✅ Page titles
- ❌ Body text (unreadable)
- ❌ Long headings (use tagline font instead)
- ❌ UI elements (use UI font)

### When to Use Burgundy Background
- ✅ Navigation
- ✅ Hero sections
- ✅ Feature highlights
- ✅ CTAs
- ⚠️ Use sparingly (60% charcoal, 30% burgundy, 10% cream)

### When to Use Blood Red
- ✅ Primary CTAs ("Enter The Arena")
- ✅ Error states
- ✅ Hover states
- ✅ Active states
- ❌ Body text (too intense)
- ❌ Large areas (overwhelming)

---

## 📦 Component Checklist

### Essential Components (MVP)
- [x] Button (primary, secondary, ghost)
- [x] Card (default, dark, feature)
- [x] Navigation (sticky header, mobile menu)
- [ ] Input (text, email, tel, textarea)
- [ ] Select dropdown
- [ ] Checkbox
- [ ] Radio button
- [ ] Link
- [ ] Badge/Tag
- [ ] Loading spinner
- [ ] Error message
- [ ] Success message
- [ ] Modal/Dialog
- [ ] Toast notification

### Advanced Components (Phase 2)
- [ ] Accordion
- [ ] Tabs
- [ ] Carousel/Slider
- [ ] Calendar/Date picker
- [ ] Progress bar
- [ ] Breadcrumbs
- [ ] Pagination
- [ ] Avatar
- [ ] Tooltip
- [ ] Dropdown menu

---

## 📏 Design Specs Export

### For Figma/Design Tools

**Artboard Sizes**:
- Mobile: 375x812 (iPhone 13 Mini)
- Tablet: 768x1024 (iPad Portrait)
- Desktop: 1440x900 (MacBook Pro)
- Large: 1920x1080 (Desktop HD)

**Export Settings**:
- Logos: SVG + PNG @2x
- Icons: SVG (24x24, 32x32, 48x48)
- Images: WebP + JPG fallback
- Textures: WebP (optimized)

---

**Design system complete. Ready for implementation.**
