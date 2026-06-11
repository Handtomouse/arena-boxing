# Arena Boxing Design System v1.0

**Philosophy:** "Those Who Dare" — Premium · Gritty but Clean · Boutique · High Contrast

---

## Colors

### Primary Palette
- **Burgundy Primary** `#7D1E1E` - Main brand, backgrounds
- **Burgundy Light** `#8B2635` - Hover states, accents  
- **Burgundy Dark** `#6B1A1A` - Shadows, depth

- **Cream Primary** `#E8DDD3` - Primary text, borders
- **Cream Light** `#F0E6DB` - Highlights
- **Cream Dark** `#D4C8BD` - Supporting text

- **Charcoal Black** `#1A1A1A` - Dark backgrounds
- **Charcoal Light** `#2D2D2D` - Card backgrounds

- **Blood Red** `#A31F1F` - CTAs, errors, focus

### Shadows
- `--shadow-grunge`: `0 4px 12px rgba(26, 26, 26, 0.4)`
- `--shadow-intense`: `0 8px 24px rgba(125, 30, 30, 0.5)`

---

## Typography

### Fonts
- **Display** (Headings): Old London (Gothic Blackletter)
- **Tagline**: Old London Alternative  
- **Body**: Inter
- **UI** (Buttons/Nav): Barlow Semi Condensed

### Sizes (Responsive)
- Hero: `clamp(3rem, 8vw, 6rem)`
- H1: `clamp(3rem, 8vw, 7rem)`  
- H2: `clamp(2.25rem, 6vw, 4.5rem)`
- H3: `clamp(1.75rem, 4vw, 3rem)`
- Body: 18px (16px mobile)

### Patterns
```jsx
// Responsive text
className="text-lg sm:text-xl md:text-2xl lg:text-3xl"

// Letter spacing
className="tracking-[0.20em] sm:tracking-[0.22em] md:tracking-[0.25em]"
```

---

## Spacing (8px Grid)

| Token | Value | Pixels |
|-------|-------|--------|
| space-1 | 0.25rem | 4px |
| space-4 | 1rem | 16px |
| space-6 | 1.5rem | 24px |
| space-8 | 2rem | 32px |
| space-12 | 3rem | 48px |
| space-24 | 6rem | 96px |

### Responsive Padding
```jsx
className="px-4 sm:px-5 md:px-6 lg:px-8"
className="py-6 sm:py-8 md:py-10 lg:py-12"
className="gap-6 sm:gap-8 md:gap-10 lg:gap-12"
```

---

## Breakpoints

| Name | Width | Target |
|------|-------|--------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |
| 2xl | 1536px | Extra large |

---

## Components

### Button
**Variants:** primary, secondary, outline  
**Sizes:** sm (px-4 py-2), md (px-8 py-4), lg (px-12 py-6)

```jsx
<Button variant="primary" size="lg">Enter The Arena</Button>
```

**Styles:**
- Font: var(--font-ui), uppercase, tracking-wide
- Border: 2px solid, border-radius: 0
- Transition: 300ms ease
- Grunge texture: 10% opacity

### Card  
**Variants:** default (light), dark

```jsx
<Card variant="default">
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

**Styles:**
- Padding: 32px (p-8)
- Border: 3px solid
- Grunge texture: 10% opacity

---

## Animations

### Durations
- `--transition-base`: 300ms ease
- `--transition-fast`: 200ms ease

### Key Animations
- `blur-fade-in`: 3s (cinematic entrance)
- `fade-in`: 2s (simple opacity)  
- `staged-fade`: 1s (slide up + fade)
- `blood-glow`: 1.5s infinite (CTA pulse)
- `ken-burns`: 20s (video zoom)

### Usage
```jsx
<div className="animate-blur-in" style={{ animationDelay: '0.5s' }}>
  {content}
</div>
```

---

## Global Utilities

### Grunge Texture
```css
.grunge-texture::before {
  background-image: url('/textures/grunge-light.webp');
  opacity: 0.10;
  mix-blend-mode: multiply;
}
```

### Focus States
```css
*:focus-visible {
  outline: 3px solid var(--blood-red);
  outline-offset: 2px;
}
```

---

## Accessibility

- **Contrast Ratios:** All meet WCAG AA (4.5:1+)
- **Touch Targets:** Minimum 44×44px
- **Font Minimums:** 14px mobile, 16px desktop
- **Focus:** Visible on all interactive elements

---

## File Locations

- Design tokens: `/design-tokens.ts`
- Global styles: `/app/globals.css`
- Components: `/components/ui/`
- Assets: `/public/images/`, `/public/textures/`

---

**For detailed specs, see `design-tokens.ts` and component files.**
