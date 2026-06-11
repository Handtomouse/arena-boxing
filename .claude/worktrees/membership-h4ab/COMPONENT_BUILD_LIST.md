# Arena Boxing - Component Build List

**Version:** 1.0.0  
**Purpose:** Complete technical specifications for all components

---

## Table of Contents

### Status (Updated 2026-05-28)

**All components shipped.** This doc was originally written when only 4 of 14
catalog components were built. The build is now complete; see the actual tree
under `components/` (28 .tsx files across `ui/`, `forms/`, `sections/`,
`layout/`, `analytics/`, and root `Landing.tsx`). The per-component specs below
are kept as a reference for behaviour, props, and accessibility intent.

### Catalog Components (all built)
1. [Button](#1-button-)
2. [Card](#2-card-)
3. [Navigation](#3-navigation-)
4. [Landing](#4-landing-)
5. [Hero Banner](#5-hero-banner)
6. [Footer](#6-footer)
7. [Contact Form](#7-contact-form)
8. [Modal](#8-modal)
9. [Class Schedule](#9-class-schedule)
10. [Trainers Module](#10-trainers-module)
11. [Embed Wrappers](#11-embed-wrappers)
12. [Typography Components](#12-typography-components)
13. [Layout Components](#13-layout-components)
14. [Form Fields](#14-form-fields)

---

## 1. BUTTON ✅

**Status:** Built and production-ready  
**Location:** `/components/ui/Button.tsx`

### Description
Primary interactive element for CTAs, form submissions, and navigation.

### Props

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}
```

**Defaults:**
- `variant`: 'primary'
- `size`: 'md'
- `disabled`: false

### Behavior

**Primary Variant:**
- Background: var(--burgundy-primary)
- Text: var(--cream-primary)
- Hover: bg → var(--blood-red), translate-y-[-4px], shadow-grunge
- Active: translate-y-[0]
- Disabled: opacity-50, cursor-not-allowed

**Secondary Variant:**
- Background: var(--cream-primary)
- Text: var(--burgundy-primary)
- Hover: bg → var(--cream-light), shadow-grunge

**Outline Variant:**
- Background: transparent
- Border: 2px solid cream
- Hover: bg → burgundy, border → blood-red

**All Variants:**
- 300ms transition
- Grunge texture overlay (10%)
- No border-radius (sharp gothic corners)
- Font: var(--font-ui), uppercase, tracking-wide

### Accessibility

```jsx
// Minimum implementation
<button
  type="button"
  aria-label="Book trial class"
  disabled={isLoading}
>
  {isLoading ? 'Loading...' : 'Book Trial'}
</button>
```

**Requirements:**
- ✅ Minimum 44×44px touch target (all sizes meet this)
- ✅ Focus visible: 3px blood-red outline, 2px offset
- ✅ Keyboard accessible: Enter/Space activate
- ✅ Screen reader: aria-label when icon-only
- ✅ Disabled state: aria-disabled="true"
- ✅ Loading state: aria-busy="true"

### Edge Cases

| Case | Handling |
|------|----------|
| **Long text overflow** | Text wraps, button expands vertically |
| **Disabled + onClick** | onClick prevented, visual feedback only |
| **Loading state** | Show spinner, disable interaction, aria-busy |
| **Icon + text** | Flex layout, gap-2, icon left or right |
| **Submit in form** | type="submit" prop, form validation triggers |
| **Mobile tap delay** | CSS touch-action: manipulation |

---

## 2. CARD ✅

**Status:** Built and production-ready  
**Location:** `/components/ui/Card.tsx`

### Description
Container component for grouped content with gothic styling.

### Props

```typescript
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'dark';
  distressed?: boolean;
  className?: string;
}
```

**Defaults:**
- `variant`: 'default'
- `distressed`: true

### Behavior

**Default Variant:**
- Background: var(--cream-primary)
- Border: 3px solid burgundy
- Text: var(--charcoal-black)
- Padding: 32px (p-8)

**Dark Variant:**
- Background: var(--charcoal-black)
- Border: 3px solid cream
- Text: var(--cream-primary)
- Padding: 32px

**Grunge Texture:**
- Always applied at 10% opacity
- Mix-blend-mode: multiply
- Background image: `/textures/grunge-light.webp`

### Accessibility

**Requirements:**
- ✅ Semantic HTML: Use <article> or <section> depending on content
- ✅ Heading hierarchy: Ensure h3 inside doesn't skip levels
- ✅ Color contrast: Both variants meet WCAG AA (4.5:1)
- ✅ Focus within: Interactive children are keyboard accessible

### Edge Cases

| Case | Handling |
|------|----------|
| **Empty card** | Minimum height maintained, show placeholder |
| **Very long content** | Card expands, no max-height constraint |
| **Interactive card** | Add hover:scale-[1.02] transition |
| **Nested cards** | Allowed but discourage (visual confusion) |
| **No children** | Render empty div with min-height |

---

## 3. NAVIGATION ✅

**Status:** Built with mobile support  
**Location:** `/components/ui/Navigation.tsx`

### Description
Sticky header navigation with desktop/mobile variants.

### Props

```typescript
interface NavigationProps {
  activePath?: string;
}
```

### Behavior

**Desktop (md+):**
- Flex horizontal layout
- Logo left, nav links center, CTA right
- Hover: Link color → blood-red, underline animate in
- Scroll: Padding shrinks (py-5 → py-3.5)

**Mobile (<md):**
- Hamburger icon (3 lines, animate to X)
- Slide-in menu from right
- Full-screen overlay
- Links stack vertically

**Sticky Behavior:**
- Fixed top-0, z-50
- Background: burgundy-primary + grunge (10%)
- Scroll detection: py-5 default, py-3.5 when scrolled >50px

### Accessibility

**Requirements:**
- ✅ Skip link: "Skip to main content" (visually hidden)
- ✅ Hamburger aria-label: "Open navigation menu"
- ✅ Menu aria-expanded: true/false based on state
- ✅ Escape key: Close mobile menu
- ✅ Focus trap: Mobile menu captures focus when open
- ✅ Current page: aria-current="page" on active link

### Edge Cases

| Case | Handling |
|------|----------|
| **Scroll jank** | Use transform for shrink, not height change |
| **Menu open + resize** | Close menu when crossing md breakpoint |
| **Deep link** | Highlight active nav item on initial load |
| **Long nav items** | Truncate text with ellipsis on mobile |
| **No JS** | Desktop nav still works, mobile shows all links |

---

## 4. LANDING ✅

**Status:** Complex, production-ready  
**Location:** `/components/Landing.tsx`

### Description
Cinematic intro sequence with 20s countdown and auto-redirect.

### Props

```typescript
// No props - self-contained component
```

### Behavior

**Animation Sequence:**
1. **0-3s:** ARENA wordmark fade-in
2. **1.0s:** "those who dare" tagline blur-in
3. **1.3s:** Beast icon blur-in  
4. **1.6s:** "Enter" button blur-in
5. **0-20s:** Countdown timer (updates every second)
6. **0-20s:** ARENA breathing pulse (continuous)
7. **20s OR click:** Blood-red flash → redirect to /home

**Interactive:**
- Click "Enter" button: Immediate redirect
- Keyboard: Enter/Space triggers redirect
- Mouse parallax: Background moves with cursor (subtle)
- Haptic: Vibration on mobile when clicking Enter

**State Management:**
- localStorage: 'arena-visited' flag
- Countdown: useState hook, decrements every 1s
- Victory flash: Triggered at countdown=0
- Skip flash: Triggered on Enter click

### Accessibility

**Requirements:**
- ✅ Skip button: Allow users to bypass 20s wait
- ✅ Reduced motion: Respect prefers-reduced-motion
- ✅ Keyboard: Enter/Space work anywhere on page
- ✅ Screen reader: Announce countdown progress
- ✅ Focus visible: Enter button has clear focus state

### Edge Cases

| Case | Handling |
|------|----------|
| **Video load failure** | Show static background image fallback |
| **Sound blocked** | Gracefully fail audio.play(), no error shown |
| **localStorage unavailable** | Skip localStorage, allow redirect |
| **Slow connection** | Show loading state, allow manual Enter |
| **Page refresh** | Restart countdown (no resume from localStorage) |
| **Back button** | Respect browser back, don't force redirect |

---

**[Continued in next section...]**

## 5. HERO BANNER

**Status:** Built and production-ready  
**Priority:** CRITICAL (blocks all page implementations)

### Description
Reusable hero banner with multiple layout variants for different pages.

### Props

```typescript
interface HeroBannerProps {
  variant: 'home' | 'timetable' | 'membership' | 'booking' | 'about' | 'location' | 'faq';
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  backgroundImage?: string;
  backgroundVideo?: string;
  height?: '60vh' | '70vh' | '80vh' | '100vh';
  overlayColor?: 'burgundy' | 'charcoal' | 'none';
  overlayOpacity?: number; // 0-100
  icon?: boolean; // Show beast icon
  cta?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  className?: string;
}
```

**Defaults:**
- `height`: '70vh'
- `overlayColor`: 'burgundy'
- `overlayOpacity`: 70
- `icon`: false

### Behavior

**Layout Variants:**

1. **Home:** Full-screen video + centered content + countdown
2. **Timetable:** Burgundy dark bg + icon + stacked title
3. **Membership:** Burgundy primary + stacked title + editorial spacing
4. **Booking:** Minimal, centered
5. **About:** Image overlay + Ken-burns zoom effect
6. **Location:** Dark + grunge heavy (25%)
7. **FAQ:** Primary + stacked lines

**Animation:**
- Title: blur-fade-in or letter-expand (depending on variant)
- Subtitle: blur-fade-in with 0.3s delay
- Icon: blur-fade-in with 0.2s delay
- CTA: blur-fade-in with 0.5s delay

**Responsive:**
- Height: 100vh on mobile, configured vh on desktop
- Text size: clamp() for fluid scaling
- Padding: responsive (py-6 sm:py-8 md:py-10 lg:py-12)

### Accessibility

```jsx
<section 
  aria-labelledby="hero-title"
  className="hero-banner"
>
  <h1 id="hero-title">{title}</h1>
  {subtitle && <p>{subtitle}</p>}
  {cta && (
    <a href={cta.href} aria-label={`${cta.text} - navigate to ${cta.href}`}>
      {cta.text}
    </a>
  )}
</section>
```

**Requirements:**
- ✅ Semantic heading: h1 for title (page title)
- ✅ Background video: aria-hidden="true" (decorative)
- ✅ Overlay: Ensure text contrast meets WCAG AA
- ✅ CTA link: Descriptive aria-label

### Edge Cases

| Case | Handling |
|------|----------|
| **No background media** | Fallback to solid color + grunge |
| **Video fails to load** | Show background image or solid color |
| **Very long title** | Allow wrapping, adjust line-height |
| **No subtitle** | Center title vertically |
| **Multiple CTAs** | Flex row, gap-4, wrap on mobile |
| **Slow video load** | Show placeholder, fade-in when ready |

---

## 6. FOOTER

**Status:** Built and production-ready  
**Priority:** HIGH (needed on all pages)

### Description
Global footer with contact info and social links.

### Props

```typescript
interface FooterProps {
  showSocial?: boolean;
  className?: string;
}
```

**Defaults:**
- `showSocial`: true

### Behavior

**Layout:**
```
┌─────────────────────────────────────┐
│ ARENA BOXING BONDI                  │
│                                     │
│ 123 Campbell Parade                │
│ Bondi Beach NSW 2026               │
│                                     │
│ hello@arenaboxing.com.au           │
│ 0400 123 456                       │
│                                     │
│ [Instagram] [Facebook]             │
│                                     │
│ © 2025 Arena Boxing.               │
│ Those who dare.                    │
└─────────────────────────────────────┘
```

**Styling:**
- Background: var(--charcoal-black) + grunge (10%)
- Text: var(--cream-dark)
- Social icons: 32px, cream, hover → blood-red
- Padding: py-12 md:py-16
- Max-width: 1536px (centered)

**Responsive:**
- Desktop: Single column, centered
- Mobile: Stacked, text-center

### Accessibility

```jsx
<footer 
  role="contentinfo"
  aria-label="Site footer"
>
  <address>
    <p>123 Campbell Parade</p>
    <a href="mailto:hello@arenaboxing.com.au">Email us</a>
    <a href="tel:+61400123456">Call us</a>
  </address>
  
  <nav aria-label="Social media links">
    <a href="..." aria-label="Follow us on Instagram">
      <InstagramIcon />
    </a>
  </nav>
</footer>
```

**Requirements:**
- ✅ Semantic footer: role="contentinfo"
- ✅ Address: Use <address> element
- ✅ Links: Descriptive text or aria-label
- ✅ Phone: tel: protocol for click-to-call
- ✅ Email: mailto: protocol

### Edge Cases

| Case | Handling |
|------|----------|
| **Social disabled** | Hide social section, don't leave gap |
| **Missing social links** | Show placeholder or hide icon |
| **Long address** | Allow wrapping |
| **Print** | Show full URLs for email/phone |

---

## 7. CONTACT FORM

**Status:** Built and production-ready  
**Priority:** HIGH (needed for Contact page)

### Description
Contact form with validation and submission handling.

### Props

```typescript
interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
```

### Behavior

**Fields:**
1. **Name:** Single-line text input (required)
2. **Email:** Email input with validation (required)
3. **Message:** Textarea, 4 rows (required)

**Validation:**
- Client-side: Validate on blur, show errors inline
- Email format: Standard RFC 5322 regex
- Min message length: 10 characters
- Max message length: 1000 characters

**States:**
- **Idle:** Form ready for input
- **Validating:** Check fields on blur
- **Submitting:** Disable form, show loading spinner on button
- **Success:** Show success message, clear form
- **Error:** Show error message, keep form data

**Styling:**
- Inputs: Cream bg, burgundy border (2px)
- Focus: Blood-red border, no outline
- Error: Blood-red border + error text below field
- Labels: Cream primary, uppercase, tracking-wide
- Submit button: Primary variant

### Accessibility

```jsx
<form onSubmit={handleSubmit} noValidate>
  <label htmlFor="name">Name</label>
  <input
    id="name"
    type="text"
    required
    aria-required="true"
    aria-invalid={errors.name ? 'true' : 'false'}
    aria-describedby={errors.name ? 'name-error' : undefined}
  />
  {errors.name && (
    <span id="name-error" role="alert">
      {errors.name}
    </span>
  )}
  
  <button 
    type="submit"
    disabled={isSubmitting}
    aria-busy={isSubmitting}
  >
    {isSubmitting ? 'Sending...' : 'Send Message'}
  </button>
</form>
```

**Requirements:**
- ✅ Labels: Associated with inputs via htmlFor/id
- ✅ Required: aria-required="true"
- ✅ Errors: role="alert" + aria-describedby
- ✅ Submit state: aria-busy="true" when loading
- ✅ Focus: Auto-focus first field on mount
- ✅ Keyboard: Enter submits, Tab navigates

### Edge Cases

| Case | Handling |
|------|----------|
| **Network error** | Show retry button, preserve form data |
| **Validation error from server** | Map to field errors, highlight |
| **Spam submission** | Add honeypot field (hidden) |
| **Double submit** | Disable button, prevent duplicate POST |
| **Browser autofill** | Validate on mount if autofilled |
| **Copy/paste email** | Trim whitespace, validate format |

---

## 8. MODAL

**Status:** Built and production-ready  
**Priority:** MEDIUM (needed for confirmations)

### Description
Reusable modal dialog with backdrop and animations.

### Props

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  autoCloseDuration?: number; // milliseconds
  showCloseButton?: boolean;
  variant?: 'default' | 'confirmation';
  className?: string;
}
```

**Defaults:**
- `autoCloseDuration`: 0 (no auto-close)
- `showCloseButton`: true
- `variant`: 'default'

### Behavior

**Layout:**
```
┌───────────────── BACKDROP (charcoal-black 80%) ─────┐
│                                                      │
│         ┌─────────────────────────────┐            │
│         │  [X]  TITLE                 │            │
│         │                             │            │
│         │  Content here               │            │
│         │                             │            │
│         │  [ACTION BUTTONS]           │            │
│         └─────────────────────────────┘            │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**States:**
- **Opening:** Fade-in backdrop + scale-in modal (300ms)
- **Open:** Focus trapped inside modal
- **Closing:** Scale-out modal + fade-out backdrop (200ms)
- **Closed:** Unmounted from DOM

**Interactions:**
- Backdrop click: Close modal (unless variant=confirmation)
- Escape key: Close modal
- Close button: Close modal
- Auto-close: Close after X ms (if set)

**Styling:**
- Modal card: Cream bg, burgundy border (3px)
- Backdrop: Charcoal-black 80% opacity
- Title: Display font, 2xl
- Padding: 32px (p-8)
- Max-width: 600px
- Z-index: 100

### Accessibility

```jsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">{title}</h2>
  <div id="modal-description">
    {children}
  </div>
  
  <button
    onClick={onClose}
    aria-label="Close dialog"
  >
    <CloseIcon />
  </button>
</div>
```

**Requirements:**
- ✅ Focus trap: Tab cycles within modal
- ✅ Escape: Close on Escape key
- ✅ Focus return: Return focus to trigger element on close
- ✅ Backdrop: aria-hidden="true" (not interactive)
- ✅ Screen reader: role="dialog" + aria-modal="true"
- ✅ Title: aria-labelledby references title
- ✅ Description: aria-describedby references content

### Edge Cases

| Case | Handling |
|------|----------|
| **Nested modals** | Stack with z-index, allow multiple |
| **Long content** | Scroll within modal, max-height: 80vh |
| **Mobile** | Full-screen on small devices |
| **No title** | Use aria-label instead of aria-labelledby |
| **Outside click blocked** | Shake animation on backdrop click |
| **Rapid open/close** | Debounce state changes |

---

## 9. CLASS SCHEDULE

**Status:** Built and production-ready
**Priority:** CRITICAL (core business feature)

### Description
Weekly class timetable with desktop table and mobile accordion views.

### Props

```typescript
interface ClassScheduleProps {
  classes: ClassScheduleData[];
  view?: 'table' | 'accordion';
  highlightCurrent?: boolean;
}

interface ClassScheduleData {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string; // "06:00" 24hr format
  duration: number; // minutes
  className: string;
  trainer: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  capacity: number;
  spotsLeft?: number;
}
```

**Defaults:**
- `view`: Auto-detect (table on md+, accordion on mobile)
- `highlightCurrent`: true

### Behavior

**Desktop Table View:**
```
┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐
│  MON     │  TUE     │  WED     │  THU     │  FRI     │  SAT     │  SUN     │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ 06:00    │ 06:00    │ 06:00    │ 06:00    │ 06:00    │ 08:00    │ 08:00    │
│ Bootcamp │ Bootcamp │ Bootcamp │ Bootcamp │ Bootcamp │ Technique│ Open Gym │
│ Sarah    │ Tom      │ Sarah    │ Tom      │ Sarah    │ Coach J  │          │
│ 5 spots  │ FULL     │ 3 spots  │ 8 spots  │ 2 spots  │ 12 spots │ Unlimited│
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ 09:30    │ 09:30    │ 09:30    │ 09:30    │ 09:30    │ 10:00    │ 10:00    │
│ ...      │ ...      │ ...      │ ...      │ ...      │ ...      │ ...      │
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘
```

**Mobile Accordion View:**
```
▼ MONDAY
  ─────────────────────
  06:00 - 07:00
  Bootcamp
  Sarah • Intermediate
  5 spots left
  [BOOK NOW]
  ─────────────────────
  09:30 - 10:30
  Sparring
  ...

▶ TUESDAY (collapsed)
```

**Highlighting:**
- Current time slot: Blood-red border, pulse animation
- Past classes: 50% opacity
- Full classes: Burgundy-dark bg, strikethrough
- Almost full (<5 spots): Orange accent text

**Responsive:**
- Desktop (md+): 7-column grid table
- Tablet: Horizontal scroll with sticky day headers
- Mobile: Accordion (one day at a time)

### Accessibility

```jsx
<table role="table" aria-label="Weekly class schedule">
  <thead>
    <tr>
      <th scope="col">Monday</th>
      <th scope="col">Tuesday</th>
      {/* ... */}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <div
          role="button"
          aria-label="Book 6:00 AM Bootcamp with Sarah, 5 spots left"
          tabIndex={0}
        >
          {/* Class details */}
        </div>
      </td>
    </tr>
  </tbody>
</table>

{/* Mobile accordion */}
<div role="region" aria-label="Class schedule by day">
  <button
    aria-expanded={isExpanded}
    aria-controls="monday-classes"
  >
    MONDAY
  </button>
  <div id="monday-classes" hidden={!isExpanded}>
    {/* Classes */}
  </div>
</div>
```

**Requirements:**
- ✅ Semantic table: Use <table> for desktop
- ✅ Accordion: aria-expanded state
- ✅ Time format: Include AM/PM or use 24hr with label
- ✅ Status: Announce "Full" or "X spots left" to screen readers
- ✅ Keyboard: Arrow keys navigate cells

### Edge Cases

| Case | Handling |
|------|----------|
| **No classes for day** | Show "Rest Day" or "No classes" |
| **Time conflict** | Highlight conflicts in red, add warning |
| **Overlapping times** | Stack vertically in table cell |
| **Very long class name** | Truncate with tooltip on hover |
| **Timezone** | Show gym's local time, add timezone label |
| **Live updates** | Poll every 60s for spot availability |
| **Past classes** | Fade out, remove after 2 hours |

---

## 10. TRAINERS MODULE

**Status:** Built and production-ready
**Priority:** MEDIUM (About page feature)

### Description
Grid of trainer profiles with image, bio, and specialties.

### Props

```typescript
interface TrainersModuleProps {
  trainers: TrainerData[];
  layout?: 'grid' | 'list';
  showBio?: boolean;
}

interface TrainerData {
  id: string;
  name: string;
  title: string; // "Head Coach", "Technique Specialist"
  image: string;
  bio: string;
  specialties: string[]; // ["Boxing", "HIIT", "Strength"]
  certifications?: string[];
  instagram?: string;
}
```

**Defaults:**
- `layout`: 'grid'
- `showBio`: true

### Behavior

**Grid Layout:**
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   [Image]   │  │   [Image]   │  │   [Image]   │
│             │  │             │  │             │
│ SARAH JONES │  │  TOM WONG   │  │ COACH J     │
│ Head Coach  │  │ Technique   │  │ Sparring    │
│             │  │             │  │             │
│ Bio text... │  │ Bio text... │  │ Bio text... │
│             │  │             │  │             │
│ Boxing·HIIT │  │ Boxing·Pads │  │ Sparring    │
└─────────────┘  └─────────────┘  └─────────────┘
```

**List Layout:**
```
┌──────────────────────────────────────────────┐
│ [Image]  SARAH JONES                         │
│          Head Coach                          │
│                                              │
│          Bio: Started boxing at 12...        │
│          Specialties: Boxing · HIIT · ...    │
│          [Instagram Icon]                    │
└──────────────────────────────────────────────┘
```

**Styling:**
- Card: Dark variant
- Image: Grayscale default, color on hover
- Image shape: Square (1:1), no border-radius
- Hover: Scale image 1.05, burgundy border pulse
- Bio: 3-line clamp, "Read more" expands

**Responsive:**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column (list view auto-enabled)

### Accessibility

```jsx
<section aria-labelledby="trainers-heading">
  <h2 id="trainers-heading">Our Trainers</h2>

  <div role="list">
    {trainers.map(trainer => (
      <article role="listitem" key={trainer.id}>
        <img
          src={trainer.image}
          alt={`${trainer.name}, ${trainer.title}`}
        />
        <h3>{trainer.name}</h3>
        <p>{trainer.title}</p>
        <p>{trainer.bio}</p>

        <ul aria-label="Specialties">
          {trainer.specialties.map(s => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        {trainer.instagram && (
          <a
            href={trainer.instagram}
            aria-label={`Follow ${trainer.name} on Instagram`}
          >
            <InstagramIcon />
          </a>
        )}
      </article>
    ))}
  </div>
</section>
```

**Requirements:**
- ✅ Image alt text: Include name and title
- ✅ Semantic HTML: <article> for each trainer
- ✅ List semantics: role="list" for screen readers
- ✅ Social links: Descriptive aria-label
- ✅ Read more: aria-expanded state for bio

### Edge Cases

| Case | Handling |
|------|----------|
| **No image** | Show placeholder silhouette |
| **Very long bio** | Clamp to 3 lines, expand on click |
| **No specialties** | Hide specialties section |
| **Image aspect ratio mismatch** | object-fit: cover, center crop |
| **Missing trainer data** | Show "Coming soon" card |
| **Instagram private** | Link still works, no embed |

---

## 11. EMBED WRAPPERS

**Status:** Built and production-ready
**Priority:** MEDIUM (external integrations)

### Description
Wrapper components for third-party embeds (Hapana, Google Maps, Instagram).

### Props

```typescript
// Hapana Booking Widget
interface HapanaEmbedProps {
  widgetId: string;
  className?: string;
}

// Google Maps
interface GoogleMapsEmbedProps {
  address: string;
  zoom?: number;
  mapType?: 'roadmap' | 'satellite';
  className?: string;
}

// Instagram Feed
interface InstagramEmbedProps {
  username: string;
  limit?: number;
  layout?: 'grid' | 'carousel';
  className?: string;
}
```

**Defaults:**
- `zoom`: 15
- `mapType`: 'roadmap'
- `limit`: 6
- `layout`: 'grid'

### Behavior

**Hapana Embed:**
- Load Hapana script on mount
- Initialize widget in div container
- Handle widget events (booking confirmation)
- Show loading state while script loads
- Fallback: "Book via phone" CTA if script fails

**Google Maps:**
- Use iframe embed (no API key required for basic)
- Lazy load: Only load when scrolled into view
- Placeholder: Static map image until interaction
- Click: Load interactive map
- Styling: Match Arena brand (custom marker if possible)

**Instagram Feed:**
- Use Instagram embed API or oEmbed
- Grid: 2x3 on desktop, 1x6 on mobile
- Carousel: Swipeable on mobile
- Lazy load images
- Error: Hide section if feed unavailable

**Loading States:**
- Skeleton: Gray boxes with pulse animation
- Spinner: Blood-red spinner in center
- Fallback: Show static content if embed fails

### Accessibility

```jsx
{/* Hapana */}
<div
  role="region"
  aria-label="Class booking widget"
  aria-busy={isLoading}
>
  {isLoading && <p>Loading booking form...</p>}
  <div id="hapana-widget" />
</div>

{/* Google Maps */}
<div role="region" aria-label="Gym location map">
  <button onClick={loadMap} aria-label="Load interactive map">
    <img src="/static-map.png" alt="Map showing Arena Boxing at 123 Campbell Parade, Bondi Beach" />
  </button>
</div>

{/* Instagram */}
<section aria-labelledby="instagram-heading">
  <h2 id="instagram-heading">Follow Us on Instagram</h2>
  <div role="list">
    {posts.map(post => (
      <a
        href={post.url}
        aria-label={`Instagram post: ${post.caption}`}
      >
        <img src={post.image} alt={post.caption} />
      </a>
    ))}
  </div>
</section>
```

**Requirements:**
- ✅ Loading state: aria-busy="true"
- ✅ Lazy load: Use Intersection Observer
- ✅ Keyboard: All interactive elements focusable
- ✅ Error handling: Graceful degradation
- ✅ Privacy: Load embeds on interaction (GDPR)

### Edge Cases

| Case | Handling |
|------|----------|
| **Script blocked** | Show fallback CTA |
| **Slow network** | Show loading for max 10s, then fallback |
| **Embed not available** | Hide section, don't break page |
| **Instagram private** | Show message or hide feed |
| **Maps API limit** | Use static image permanently |
| **Content blocked (adblocker)** | Detect and show message |

---

## 12. TYPOGRAPHY COMPONENTS

**Status:** Built and production-ready
**Priority:** LOW (nice-to-have wrappers)

### Description
Semantic typography components with consistent styling.

### Props

```typescript
interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  uppercase?: boolean;
  gothic?: boolean; // Use display font
}

interface BodyTextProps {
  children: React.ReactNode;
  size?: 'sm' | 'base' | 'lg';
  color?: 'primary' | 'secondary' | 'muted';
  className?: string;
}

interface TaglineProps {
  children: React.ReactNode;
  className?: string;
}
```

**Defaults:**
- `uppercase`: false
- `gothic`: true (for h1-h3)
- `size`: 'base'
- `color`: 'primary'

### Behavior

**Heading Component:**
```jsx
<Heading level={1} gothic uppercase>
  Enter the Arena
</Heading>

// Renders:
<h1 className="font-[family-name:var(--font-display)] text-5xl uppercase tracking-wider">
  Enter the Arena
</h1>
```

**Body Text:**
```jsx
<BodyText size="lg" color="muted">
  Our story began in 2020...
</BodyText>

// Renders:
<p className="text-lg text-cream-dark">
  Our story began in 2020...
</p>
```

**Tagline:**
```jsx
<Tagline>Those who dare</Tagline>

// Renders:
<p className="font-[family-name:var(--font-tagline)] text-2xl italic">
  Those who dare
</p>
```

**Responsive Sizing:**
- H1: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- H2: `text-3xl sm:text-4xl md:text-5xl`
- H3: `text-2xl sm:text-3xl md:text-4xl`
- Body: `text-base md:text-lg`

### Accessibility

```jsx
// Semantic HTML
<Heading level={1}>Page Title</Heading> // <h1>
<Heading level={2}>Section</Heading>    // <h2>

// Don't skip levels
✅ h1 → h2 → h3
❌ h1 → h3 (skips h2)
```

**Requirements:**
- ✅ Semantic elements: Use actual h1-h6, p tags
- ✅ Heading hierarchy: Don't skip levels
- ✅ Color contrast: All variants meet WCAG AA
- ✅ Line height: 1.5 minimum for body text

### Edge Cases

| Case | Handling |
|------|----------|
| **Very long heading** | Allow wrapping, adjust line-height |
| **Empty children** | Render empty element (for spacing) |
| **Rich text** | Allow React.ReactNode (spans, links) |
| **Override styles** | className prop merges with defaults |

---

## 13. LAYOUT COMPONENTS

**Status:** Built and production-ready
**Priority:** MEDIUM (structure components)

### Description
Reusable layout primitives for consistent spacing and structure.

### Props

```typescript
interface SectionProps {
  children: React.ReactNode;
  variant?: 'default' | 'dark' | 'burgundy';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  className?: string;
}

interface GridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 4 | 6 | 8 | 10 | 12;
  className?: string;
}
```

**Defaults:**
- `variant`: 'default'
- `spacing`: 'lg'
- `maxWidth`: '2xl'
- `padding`: true
- `columns`: Auto (responsive)
- `gap`: 8

### Behavior

**Section:**
```jsx
<Section variant="dark" spacing="xl">
  {children}
</Section>

// Renders:
<section className="bg-charcoal-black py-16 md:py-24">
  {children}
</section>
```

**Spacing Scale:**
- `sm`: py-8 md:py-12
- `md`: py-12 md:py-16
- `lg`: py-16 md:py-20
- `xl`: py-20 md:py-32

**Container:**
```jsx
<Container maxWidth="lg">
  {children}
</Container>

// Renders:
<div className="max-w-lg mx-auto px-4 sm:px-6 md:px-8">
  {children}
</div>
```

**Grid:**
```jsx
<Grid columns={3} gap={8}>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</Grid>

// Renders:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {children}
</div>
```

**Responsive Grid:**
- columns={2}: `grid-cols-1 md:grid-cols-2`
- columns={3}: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- columns={4}: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`

### Accessibility

```jsx
<Section
  as="main"
  role="main"
  aria-labelledby="main-heading"
>
  <Heading level={1} id="main-heading">
    Welcome
  </Heading>
</Section>

// Use semantic HTML
<Section as="section" />  // <section>
<Section as="article" />  // <article>
<Section as="aside" />    // <aside>
```

**Requirements:**
- ✅ Semantic HTML: Allow custom element via `as` prop
- ✅ Landmarks: Use role when appropriate
- ✅ Heading: Each section should have heading
- ✅ Contrast: Check variant combinations

### Edge Cases

| Case | Handling |
|------|----------|
| **Nested sections** | Allow but warn in dev mode |
| **Empty section** | Render with min-height |
| **Full-bleed image** | Container padding={false} |
| **Grid overflow** | Responsive columns, never overflow |
| **Max-width full** | Remove max-w, use 100% |

---

## 14. FORM FIELDS

**Status:** Built and production-ready
**Priority:** HIGH (needed for Contact Form)

### Description
Reusable form input components with validation and error states.

### Props

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  helpText?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}
```

**Defaults:**
- `required`: false
- `rows`: 4
- `maxLength`: undefined

### Behavior

**Input Field:**
```jsx
<Input
  label="Email Address"
  type="email"
  required
  error={errors.email}
  helpText="We'll never share your email"
/>

// Renders:
<div>
  <label htmlFor="email">
    Email Address *
  </label>
  <input
    id="email"
    type="email"
    required
    aria-required="true"
    aria-invalid={!!errors.email}
    aria-describedby="email-help email-error"
  />
  <span id="email-help">We'll never share your email</span>
  {errors.email && (
    <span id="email-error" role="alert">
      {errors.email}
    </span>
  )}
</div>
```

**States:**
- **Default:** Cream bg, burgundy border (2px)
- **Focus:** Blood-red border (3px), no outline
- **Error:** Blood-red border + error text below
- **Disabled:** 50% opacity, cursor-not-allowed
- **Valid:** Green checkmark icon (optional)

**Textarea:**
- Auto-resize: Grows with content (max 500px height)
- Character count: Show when 80% of maxLength
- Styling: Same as Input

**Checkbox:**
- Custom styled: Square (20x20px), burgundy border
- Checked: Blood-red bg, cream checkmark
- Label: Click to toggle
- Alignment: Checkbox left, label right, gap-2

**Responsive:**
- Mobile: Full-width inputs
- Desktop: Configurable width via className

### Accessibility

```jsx
// Input
<div className="form-field">
  <label htmlFor={id}>
    {label} {required && <span aria-label="required">*</span>}
  </label>

  <input
    id={id}
    type={type}
    required={required}
    aria-required={required}
    aria-invalid={!!error}
    aria-describedby={`${id}-help ${id}-error`}
  />

  {helpText && (
    <span id={`${id}-help`} className="help-text">
      {helpText}
    </span>
  )}

  {error && (
    <span id={`${id}-error`} role="alert" className="error-text">
      {error}
    </span>
  )}
</div>

// Checkbox
<div className="checkbox-field">
  <input
    id={id}
    type="checkbox"
    required={required}
    aria-required={required}
    aria-describedby={error ? `${id}-error` : undefined}
  />

  <label htmlFor={id}>
    {label}
  </label>

  {error && (
    <span id={`${id}-error`} role="alert">
      {error}
    </span>
  )}
</div>
```

**Requirements:**
- ✅ Labels: Always visible, associated with input
- ✅ Required: Visual indicator (*) + aria-required
- ✅ Errors: role="alert" for screen readers
- ✅ Help text: aria-describedby links to help
- ✅ Focus: Clear visual focus indicator
- ✅ Keyboard: All inputs keyboard accessible

### Edge Cases

| Case | Handling |
|------|----------|
| **No label** | Throw error in dev mode |
| **Very long error** | Allow wrapping, don't truncate |
| **Multiple errors** | Show first error only |
| **Autofill styling** | Override browser autofill yellow |
| **Paste validation** | Validate on paste event |
| **Type mismatch** | Email/URL validation on blur |
| **Max length reached** | Prevent typing, show warning |

---

## SUMMARY

**Status (2026-05-28): All components shipped.**

**Catalog Components:** 14 / 14 built

**Actual tree on disk:** 28 `.tsx` files across `components/`:
- `ui/` (11): Button, Card, Navigation, Modal, FAQAccordion, BodyText, Heading,
  Tagline, PricingCalculator, HapanaSkeleton, StrokeAnimatedIcon
- `sections/` (8): HeroBanner, Footer, TrainersModule, ExpandableClassCard,
  HapanaEmbed, RealHapanaWidget, InstagramEmbed, GoogleMapsEmbed, ScrollTransition
- `forms/` (4): Input, Textarea, Checkbox, ContactForm
- `layout/` (3): Container, Grid, Section
- `analytics/` (1): GoogleAnalytics
- root (1): Landing.tsx

**Next Steps:** None. Component build is complete. This doc is reference-only.
For implementation status of the wider site see `PROJECT_STATUS.md`.

---

**End of Component Build List**
