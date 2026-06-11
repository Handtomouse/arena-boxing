# Arena Boxing Design System - Quick Reference

One-page cheat sheet for developers.

---

## Colors

```tsx
import { colors } from './design-tokens';

// Burgundy
colors.burgundy.primary  // #7D1E1E
colors.burgundy.light    // #8B2635
colors.burgundy.dark     // #6B1A1A

// Cream
colors.cream.primary     // #E8DDD3
colors.cream.light       // #F0E6DB
colors.cream.dark        // #D4C8BD

// Charcoal
colors.charcoal.black    // #1A1A1A
colors.charcoal.light    // #2D2D2D

// Accent
colors.bloodRed          // #A31F1F
```

---

## Typography

```jsx
// Headings (Gothic)
className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl uppercase"

// Tagline (Gothic Alt)
className="font-[family-name:var(--font-tagline)] text-2xl italic"

// Body
className="font-[family-name:var(--font-body)] text-base md:text-lg"

// Buttons/Nav
className="font-[family-name:var(--font-ui)] text-sm uppercase tracking-wide"
```

---

## Responsive Patterns

```jsx
// Container
className="px-4 sm:px-5 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12"

// Max-width progression
className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"

// Text sizing
className="text-lg sm:text-xl md:text-2xl lg:text-3xl"

// Letter spacing
className="tracking-[0.20em] sm:tracking-[0.22em] md:tracking-[0.25em]"

// Gap/spacing
className="gap-6 sm:gap-8 md:gap-10 lg:gap-12"
```

---

## Components

### Primary Button
```jsx
<Button variant="primary" size="lg">
  Enter The Arena
</Button>
```

### Secondary Button  
```jsx
<Button variant="secondary" size="md">
  Learn More
</Button>
```

### Default Card
```jsx
<Card variant="default">
  <h3 className="font-[family-name:var(--font-display)] text-2xl mb-4 text-burgundy-primary">
    Title
  </h3>
  <p className="text-charcoal-black mb-6">
    Content here
  </p>
  <Button variant="secondary">Action</Button>
</Card>
```

### Dark Card
```jsx
<Card variant="dark">
  <h3 className="font-[family-name:var(--font-display)] text-2xl mb-4 text-cream-primary">
    Title
  </h3>
  <p className="text-cream-dark mb-6">
    Content here
  </p>
  <Button variant="primary">Action</Button>
</Card>
```

---

## Animations

### Blur Fade-In (Cinematic)
```jsx
<div className="animate-blur-in" style={{ animationDelay: '0.5s' }}>
  {content}
</div>
```

### Simple Fade-In
```jsx
<div className="animate-fade-in" style={{ animationDelay: '1s' }}>
  {content}
</div>
```

### Staged Fade (Slide Up)
```jsx
<div className="animate-staged-fade" style={{ animationDelay: '0.3s' }}>
  {content}
</div>
```

### Sequenced Entrance
```jsx
<div className="animate-blur-in" style={{ animationDelay: '0s' }}>ARENA</div>
<div className="animate-blur-in" style={{ animationDelay: '1.0s' }}>Tagline</div>
<div className="animate-blur-in" style={{ animationDelay: '1.3s' }}>Icon</div>
<div className="animate-blur-in" style={{ animationDelay: '1.6s' }}>Button</div>
```

---

## Utilities

### Grunge Texture
```jsx
<div className="grunge-texture bg-burgundy-primary p-8">
  {content}
</div>
```

### Distressed Border
```jsx
<div className="distressed-border p-6">
  {content}
</div>
```

### Shadow on Hover
```jsx
<div className="shadow-grunge-hover transition-shadow duration-300">
  {content}
</div>
```

---

## CSS Variables

```css
/* Colors */
var(--burgundy-primary)
var(--cream-primary)
var(--charcoal-black)
var(--blood-red)

/* Typography */
var(--font-display)
var(--font-tagline)
var(--font-body)
var(--font-ui)

/* Spacing */
var(--space-4)   /* 16px */
var(--space-8)   /* 32px */
var(--space-12)  /* 48px */

/* Shadows */
var(--shadow-grunge)
var(--shadow-intense)
```

---

## Breakpoints

```
sm:  640px   (mobile landscape)
md:  768px   (tablet)
lg:  1024px  (desktop)
xl:  1280px  (large desktop)
2xl: 1536px  (extra large)
```

---

## Common Mistakes

❌ **Don't:**
```jsx
// Desktop-first
className="w-[1200px] lg:w-[900px] md:w-[600px]"

// Missing breakpoints
className="text-sm lg:text-3xl"

// Inconsistent spacing
className="p-5 md:p-7 lg:p-9"
```

✅ **Do:**
```jsx
// Mobile-first
className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"

// Progressive scaling
className="text-sm sm:text-base md:text-lg lg:text-xl"

// 8px grid
className="p-4 sm:p-6 md:p-8 lg:p-12"
```

---

**See `DESIGN_SYSTEM.md` for full documentation.**
