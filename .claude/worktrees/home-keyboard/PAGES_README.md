# Arena Boxing - Pages & Routing

Complete page structure for the Arena Boxing website using Next.js 14 App Router.

## Site Structure

```
app/
├── layout.tsx          # Root layout with Navigation, Footer, fonts
├── page.tsx            # Landing page (/) - 20s intro animation
├── home/
│   └── page.tsx        # Main homepage (/home)
├── timetable/
│   └── page.tsx        # Class schedule (/timetable)
├── membership/
│   └── page.tsx        # Pricing & plans (/membership)
├── booking/
│   └── page.tsx        # Book classes (/booking)
├── about/
│   └── page.tsx        # Our story & trainers (/about)
├── location/
│   └── page.tsx        # Contact & map (/location)
└── faq/
    └── page.tsx        # FAQ accordion (/faq)
```

## Routes

| Route | Title | Description |
|-------|-------|-------------|
| `/` | Landing | 20s cinematic intro with ARENA wordmark animation |
| `/home` | Home | Main homepage with hero, features, CTA sections |
| `/timetable` | Class Timetable | Weekly schedule with table/accordion views |
| `/membership` | Membership & Pricing | 3 pricing tiers with feature comparison |
| `/booking` | Book a Class | Hapana widget integration |
| `/about` | About Us | Story, values, trainer profiles, Instagram feed |
| `/location` | Location & Contact | Address, hours, map, contact form |
| `/faq` | FAQ | Accordion-style Q&A by category |

---

## Page Details

### 1. Landing Page (`/`)
**Component:** `Landing.tsx`
**Features:**
- 20-second countdown timer
- ARENA SVG stroke animation
- "Those who dare" tagline fade-in
- Beast icon reveal
- Auto-redirect to `/home` or manual "Enter" button
- Background video with cinematic fade

**Flow:**
```
User lands → 20s intro → Auto-redirect to /home
           ↓ (or)
          Click "Enter" → Immediate redirect
```

---

### 2. Home Page (`/home`)
**Metadata:** Existing implementation
**Sections:**
- Hero banner
- Features/highlights
- Call-to-action sections
- Trust elements

**Note:** Already built in previous session

---

### 3. Timetable Page (`/timetable`)
**Metadata:** "Class Timetable"
**Components:**
- `HeroBanner` (variant: timetable)
- `ClassSchedule` (with mock data)
- Class type cards

**Features:**
- Weekly schedule in table view (desktop) or accordion (mobile)
- Live highlighting of current class
- Spots remaining indicators
- Difficulty levels (Beginner/Intermediate/Advanced/All Levels)
- Quick class type reference section

**Mock Data:** 6 sample classes across the week

---

### 4. Membership Page (`/membership`)
**Metadata:** "Membership & Pricing"
**Components:**
- `HeroBanner` (variant: membership)
- Pricing `Grid` with 3 `Card` components
- Benefits grid
- Free trial CTA

**Plans:**
1. **Drop-In:** $35/class - No commitment
2. **Monthly Unlimited:** $220/month - Featured (most popular)
3. **10-Class Pack:** $300 (3 months) - Shareable

**Inclusions:**
- Premium equipment
- Expert coaches
- Shower facilities
- Community events

---

### 5. Booking Page (`/booking`)
**Metadata:** "Book a Class"
**Components:**
- `HeroBanner` (variant: booking)
- `HapanaEmbed` (booking widget)
- "What to Bring" section
- Cancellation policy

**Integration:**
- Hapana widget ID: `arena-boxing-bondi`
- Fallback: Phone booking CTA if widget fails

**Policies:**
- 12-hour cancellation window
- First class free for new members

---

### 6. About Page (`/about`)
**Metadata:** "About Us"
**Components:**
- `HeroBanner` (variant: about, with icon)
- Story section (3 paragraphs)
- `TrainersModule` (grid layout, 3 trainers)
- Values grid (4 values)
- `InstagramEmbed` (6 posts)

**Trainers:**
1. Sarah Jones - Head Coach
2. Tom Wong - Technique Specialist
3. Coach J - Sparring Coach

**Values:**
- Authenticity
- Excellence
- Courage
- Community

---

### 7. Location Page (`/location`)
**Metadata:** "Location & Contact"
**Components:**
- `HeroBanner` (variant: location)
- 2-column grid (info + contact form)
- `GoogleMapsEmbed`
- Trust elements section

**Information:**
- Address: 123 Campbell Parade, Bondi Beach NSW 2026
- Hours: Mon-Fri 6AM-9PM, Sat 8AM-6PM, Sun 8AM-2PM
- Contact: hello@arenaboxing.com.au, 0400 123 456
- Transport: Bus routes, parking, 5min from beach

**Form:**
- Name, Email, Message fields
- Client-side validation
- Success/error states

---

### 8. FAQ Page (`/faq`)
**Type:** Client Component (accordion state)
**Metadata:** Via separate export (Client Component limitation)
**Components:**
- `HeroBanner` (variant: faq)
- Accordion FAQ items (5 categories)
- CTA section

**Categories:**
1. Getting Started (3 questions)
2. Membership (3 questions)
3. Classes (4 questions)
4. Facilities (3 questions)
5. Policies (3 questions)

**Interactivity:**
- Click to expand/collapse
- Smooth transitions
- One or multiple open at once

---

## Root Layout Features

### Metadata (SEO)
```typescript
{
  title: {
    default: "Arena Boxing Bondi | Those Who Dare",
    template: "%s | Arena Boxing Bondi"
  },
  description: "Bondi's premier combat sports experience...",
  keywords: ["boxing", "fitness", "bondi", "gym", ...],
  openGraph: { ... },
  twitter: { ... }
}
```

### Global Elements
- **Navigation:** Sticky header with desktop/mobile hamburger menu
- **Footer:** Contact info, social links, copyright
- **Fonts:** Inter loaded via `next/font/google`
- **Background:** `bg-cream-primary` on body

### Layout Structure
```tsx
<html lang="en">
  <body>
    <Navigation />
    <main>{children}</main>
    <Footer />
  </body>
</html>
```

---

## Navigation Structure

**Desktop Menu:**
- Home
- Timetable
- Membership
- Booking
- About
- Location
- FAQ

**Mobile Menu:**
- Hamburger icon (3 lines → X animation)
- Slide-in drawer from right
- Same links, stacked vertically

**CTA Button:**
- "Book Trial" - Links to `/booking`

---

## Design System Integration

All pages use:
- **HeroBanner** component with 7 variants
- **Section** component for spacing (sm/md/lg/xl)
- **Container** for max-width control
- **Grid** for responsive layouts
- Burgundy/Cream/Charcoal color palette
- Gothic typography (Old London display font)
- Mobile-first responsive patterns

---

## Mock Data & TODOs

### Replace Mock Data:
- [ ] Class schedule (currently 6 sample classes)
- [ ] Trainer profiles (currently 3 sample trainers)
- [ ] Instagram feed (currently placeholder images)
- [ ] Membership pricing (verify actual prices)

### Implement APIs:
- [ ] Contact form submission endpoint
- [ ] Hapana widget configuration
- [ ] Google Maps API key (optional)
- [ ] Instagram API integration

### Add Images:
- [ ] Hero backgrounds (7 unique images)
- [ ] Trainer photos (3 photos)
- [ ] Social OG image (1200x630)
- [ ] Placeholder images for components

---

## Routing Patterns

### Client vs Server Components

**Server Components (Default):**
- Timetable, Membership, Booking, About, Location
- Can use async/await, access DB, read files
- Cannot use hooks or browser APIs

**Client Components:**
- FAQ (uses useState for accordion)
- Landing (uses countdown timer, audio)
- Navigation (uses menu state)

**Pattern:**
```tsx
'use client'; // Add at top if you need interactivity

export default function Page() {
  // Can now use useState, useEffect, etc.
}
```

### Metadata Export

**Server Components:**
```typescript
export const metadata: Metadata = { ... };
```

**Client Components:**
- Cannot export metadata
- Set via separate server component or layout

---

## Next Steps

1. **Test all routes** - Verify navigation works
2. **Add real images** - Replace placeholder paths
3. **Configure Hapana** - Get actual widget ID
4. **Set up form backend** - Email/API endpoint for contact form
5. **Add analytics** - Google Analytics or similar
6. **Performance** - Optimize images, lazy load components
7. **Accessibility audit** - Test with screen readers
8. **Mobile testing** - Verify all breakpoints

---

**Total Pages:** 8 (including landing)
**Build Status:** ✅ Complete and ready for content population
**Framework:** Next.js 14 App Router
**Styling:** Tailwind CSS + Design Tokens
