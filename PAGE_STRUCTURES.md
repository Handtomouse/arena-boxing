# Arena Boxing - Page Structures & Wireframes

**Version:** 1.0.0  
**Design Philosophy:** "Those Who Dare" — Cinematic Drama + Editorial Luxury

---

## Table of Contents

1. [Home](#1-home)
2. [Timetable / Classes](#2-timetable--classes)
3. [Membership / Pricing](#3-membership--pricing)
4. [Booking (Hapana)](#4-booking-hapana)
5. [About the Gym](#5-about-the-gym)
6. [Location / Contact](#6-location--contact)
7. [FAQ](#7-faq)

---

## 1. HOME

**Purpose:** Manifesto-driven landing that establishes Arena's identity and invites trial bookings.

### Hero Structure

```
┌─────────────────────────────────────────────────────┐
│ [FULL-SCREEN VIDEO BACKGROUND - Boxing Training]   │
│                                                     │
│     ┌────────┐  Beast Icon (cream, 90px)          │
│                                                     │
│           ARENA                                     │
│        (Wordmark - cream, clamp(4rem,12vw,10rem)) │
│                                                     │
│      those who dare                                │
│     (Tagline - cream, italic, 3rem)               │
│                                                     │
│         [ENTER THE ARENA]                          │
│       (Primary CTA Button)                         │
│                                                     │
│          20s countdown                             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Layout: Centered vertical stack
- Background: Video (40% opacity) + burgundy overlay (70%)
- Typography: Gothic display + tagline fonts
- Animation: 
  - ARENA fades in (0-3s)
  - Tagline blur-in (1.0s delay)
  - Icon blur-in (1.3s delay)
  - Button blur-in (1.6s delay)
  - Auto-redirect after 20s OR click Enter

### Manifesto Section

```
┌─────────────────────────────────────────────────────┐
│ [CHARCOAL BLACK BACKGROUND + GRUNGE 10%]           │
│                                                     │
│  ┌──────────────────────┐  ┌───────────────┐     │
│  │ "The arena doesn't   │  │     dare      │     │
│  │  care who you were.  │  │  (Pull quote) │     │
│  │  Only who you        │  │   Blood red,  │     │
│  │  become."            │  │   8rem italic)│     │
│  │                      │  │               │     │
│  │ This is Bondi's     │  │               │     │
│  │ fight culture...    │  │               │     │
│  └──────────────────────┘  └───────────────┘     │
│     60% width                 40% width           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Layout: 60/40 asymmetric grid
- Background: Charcoal + grunge texture (10%)
- Typography: 
  - Left: Cream primary, 3rem leading-loose
  - Right: Blood red, 8rem italic (editorial pullout)
- Animation: Scroll-triggered fade-slide-up

### Classes Preview

```
┌─────────────────────────────────────────────────────┐
│ [BURGUNDY PRIMARY BACKGROUND + GRUNGE 10%]         │
│                                                     │
│         CHOOSE YOUR TRIAL                          │
│      (H2 - Cream, clamp(2.5rem,6vw,4rem))        │
│                                                     │
│  ┌─────────┐  ┌──────┐  ┌─────────┐              │
│  │10 ROUNDS│  │FIGHT │  │ BONDI   │              │
│  │         │  │ CAMP │  │SESSIONS │              │
│  │Pure     │  │      │  │         │              │
│  │boxing   │  │Str+  │  │Outdoor  │              │
│  │tech...  │  │Cond  │  │sunrise  │              │
│  │         │  │...   │  │boxing   │              │
│  │[Book]   │  │[Book]│  │[Book]   │              │
│  └─────────┘  └──────┘  └─────────┘              │
│   2fr width    1fr       2fr width                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Layout: Irregular 3-column grid (2fr 1fr 2fr)
- Cards: Cream background, burgundy borders (3px)
- Typography:
  - Card H3: Display font, 2xl, burgundy-primary
  - Body: charcoal-black, leading-loose
- Buttons: Secondary variant (cream bg, burgundy text)
- Animation: Staggered slide-in (0.2s delay per card)

### Final CTA

```
┌─────────────────────────────────────────────────────┐
│ [CHARCOAL BLACK + GRUNGE 10%]                      │
│                                                     │
│   Those who dare don't wait for permission        │
│        (Tagline font, 3.5rem, italic)             │
│                                                     │
│       [CLAIM YOUR TRIAL BY FIRE]                   │
│         (Primary Button, lg size)                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Background: Charcoal black + grunge
- CTA: Primary button (burgundy bg, cream text)
- Animation: Button blood-glow on hover

### Trust Elements
- Class card descriptions (authentic language)
- Manifesto establishes values
- No reviews (confidence-based positioning)

---

## 2. TIMETABLE / CLASSES

**Purpose:** Display weekly schedule + detailed class information.

### Hero Structure

```
┌─────────────────────────────────────────────────────┐
│ [BURGUNDY DARK BACKGROUND + GRUNGE 25%]           │
│                                                     │
│  [Beast Icon - 100px]                              │
│                                                     │
│         YOUR WEEK                                  │
│       IN THE ARENA                                 │
│    (H1 - Cream, 7rem, split lines)               │
│                                                     │
│  Choose your rounds. Book your time.              │
│     (Subhead - Cream dark, 1.5rem)                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Layout: Centered, minimal
- Background: Burgundy dark + heavy grunge (25%)
- Animation: Blur-fade-in sequence
- Height: 60vh

### Weekly Schedule Grid

```
┌─────────────────────────────────────────────────────┐
│ [CREAM LIGHT BACKGROUND]                           │
│                                                     │
│ ┌───┬────────────────────────────────────────────┐│
│ │MON│ 6am: 10 Rounds │ 7am: Fight Camp │ 6pm... ││
│ ├───┼────────────────────────────────────────────┤│
│ │TUE│ 6am: Bondi     │ 12pm: 10 Rounds │ 6pm... ││
│ ├───┼────────────────────────────────────────────┤│
│ │WED│ 6am: 10 Rounds │ 7am: Fight Camp │ 6pm... ││
│ ├───┼────────────────────────────────────────────┤│
│ │THU│ 6am: Bondi     │ 12pm: Fight Camp│ 6pm... ││
│ ├───┼────────────────────────────────────────────┤│
│ │FRI│ 6am: 10 Rounds │ 7am: Fight Camp │ 6pm... ││
│ ├───┼────────────────────────────────────────────┤│
│ │SAT│ 8am: Bondi     │ 10am: 10 Rounds │        ││
│ ├───┼────────────────────────────────────────────┤│
│ │SUN│ 8am: Fight Camp│ 10am: Bondi     │        ││
│ └───┴────────────────────────────────────────────┘│
│                                                     │
│         [BOOK YOUR TRIAL]                          │
│       (Primary CTA, centered)                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Layout: 7-row table (Mon-Sun) × time slots
- Each cell: Class name + time + trainer initials
- Styling:
  - Table borders: 2px charcoal
  - Cell padding: 1rem
  - Hover: Cell bg → burgundy-light, text → cream
- Mobile: Accordion by day (collapse/expand)
- Animation: None (functional focus)

### Class Details

```
┌─────────────────────────────────────────────────────┐
│ [CHARCOAL BLACK BACKGROUND]                        │
│                                                     │
│         THE CLASSES                                │
│      (H2 - Cream, 4.5rem)                         │
│                                                     │
│ ┌────────────────────┬────────────────────┐       │
│ │ [Image: Rounds]    │ 10 ROUNDS          │       │
│ │                    │                    │       │
│ │                    │ 50min · Boxing     │       │
│ │                    │                    │       │
│ │                    │ Pure technique...  │       │
│ │                    │                    │       │
│ │                    │ [BOOK NOW]         │       │
│ └────────────────────┴────────────────────┘       │
│                                                     │
│ ┌────────────────────┬────────────────────┐       │
│ │ FIGHT CAMP         │ [Image: Strength]  │       │
│ │                    │                    │       │
│ │ 60min · Hybrid     │                    │       │
│ │                    │                    │       │
│ │ Strength + boxing  │                    │       │
│ │                    │                    │       │
│ │ [BOOK NOW]         │                    │       │
│ └────────────────────┴────────────────────┘       │
│                                                     │
│ ┌────────────────────┬────────────────────┐       │
│ │ [Image: Bondi]     │ BONDI SESSIONS     │       │
│ │                    │                    │       │
│ │                    │ 60min · Outdoor    │       │
│ │                    │                    │       │
│ │                    │ Sunrise boxing...  │       │
│ │                    │                    │       │
│ │                    │ [BOOK NOW]         │       │
│ └────────────────────┴────────────────────┘       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Layout: Alternating image/text blocks (magazine editorial)
- Cards: Dark variant (charcoal bg, cream border)
- Images: 50% width, grayscale with burgundy tint
- Typography:
  - Class name: Display font, 3rem
  - Meta: UI font, uppercase, tracking-wide
  - Description: Body font, cream-dark
- Animation: Scroll-triggered fade-slide (0.3s per class)

### Trust Elements
- Class duration + type clearly labeled
- Trainer initials in schedule
- "No experience required" callout

---

## 3. MEMBERSHIP / PRICING

**Purpose:** Transparent pricing with value propositions.

### Hero Structure

```
┌─────────────────────────────────────────────────────┐
│ [BURGUNDY PRIMARY + GRUNGE 10%]                    │
│                                                     │
│         THOSE WHO                                  │
│        COMMIT EARN                                 │
│         THEIR PLACE                                │
│      (H1 - Cream, 6rem, stacked)                  │
│                                                     │
│  No lock-ins. No bullshit. Just show up.         │
│        (Subhead - Cream dark, 1.5rem)             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Layout: Centered, editorial
- Background: Burgundy + grunge
- Animation: Letter-expand on headline
- Height: 70vh

### Pricing Tiers

```
┌─────────────────────────────────────────────────────┐
│ [CREAM LIGHT BACKGROUND]                           │
│                                                     │
│ ┌───────────┬───────────┬───────────┐            │
│ │  TRIAL    │  CASUAL   │ UNLIMITED │            │
│ │           │           │           │            │
│ │   $35     │   $45     │   $60     │            │
│ │   /drop   │   /class  │   /week   │            │
│ │           │           │           │            │
│ │ • 1 class │ •10-class │ • Unlimited│           │
│ │ • No lock │  pack     │  classes  │            │
│ │ • Gloves  │ • 3mo exp │ • Priority │           │
│ │   incl.   │ • $40/cls │   booking │            │
│ │           │   avg     │ • Locker  │            │
│ │           │           │           │            │
│ │ [BOOK]    │ [BUY NOW] │ [JOIN]    │            │
│ └───────────┴───────────┴───────────┘            │
│                                                     │
│         Most popular: Unlimited                    │
│       (Trust indicator, small text)                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Layout: 3-column equal grid
- Cards: Cream bg, burgundy border (3px)
- Middle card (Unlimited): Blood-red border (emphasized)
- Typography:
  - Tier name: Display font, 2xl, uppercase
  - Price: Display font, 5xl
  - Features: Body font, bulleted list
- Buttons: 
  - Trial: Secondary
  - Casual: Secondary
  - Unlimited: Primary (blood-glow animation)
- Animation: Cards slide-in from bottom (0.15s stagger)

### What's Included

```
┌─────────────────────────────────────────────────────┐
│ [CHARCOAL BLACK + GRUNGE 10%]                      │
│                                                     │
│         WHAT YOU GET                               │
│      (H2 - Cream, 4rem)                           │
│                                                     │
│  ┌──────────────┬──────────────┬──────────────┐  │
│  │ Equipment    │ Showers      │ Community    │  │
│  │              │              │              │  │
│  │ Gloves, wraps│ Fresh towels │ Fight culture│  │
│  │ on loan      │ provided     │ no egos      │  │
│  └──────────────┴──────────────┴──────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Layout: 3-column icon grid
- Icons: Beast symbol variants (cream, 80px)
- Typography: UI font, cream, centered
- Animation: Icon-float on hover

### Trust Elements
- "No lock-ins" emphasized
- "Most popular" indicator
- Transparent pricing (no hidden fees)

---

**[Continued in next part due to length...]**

## 4. BOOKING (HAPANA)

**Purpose:** Seamless integration with Hapana booking system.

### Hero Structure

```
┌─────────────────────────────────────────────────────┐
│ [BURGUNDY DARK + GRUNGE 10%]                       │
│                                                     │
│         BOOK YOUR                                  │
│          ROUND                                     │
│      (H1 - Cream, 7rem)                           │
│                                                     │
│   Select your class. Reserve your spot.           │
│        (Subhead - Cream dark)                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Hapana Embedded Widget

```
┌─────────────────────────────────────────────────────┐
│ [CREAM LIGHT BACKGROUND]                           │
│                                                     │
│ ┌─────────────────────────────────────────────────┐│
│ │ <HAPANA WIDGET IFRAME>                          ││
│ │                                                 ││
│ │ - Calendar view of available classes           ││
│ │ - Class details (time, trainer, spots left)    ││
│ │ - Booking flow (select → login → confirm)      ││
│ │ - Member dashboard link                        ││
│ │                                                 ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│  Need help? Contact us: [LINK]                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Layout: Full-width iframe container
- Styling: Minimal wrapper (let Hapana handle UX)
- Custom CSS overrides (if Hapana allows):
  - Primary color → burgundy-primary
  - CTA buttons → match Arena design system
  - Fonts → inject Arena fonts
- Mobile: Responsive iframe, scroll-within-page
- Animation: None (functional booking flow)

### Post-Booking Confirmation

```
┌─────────────────────────────────────────────────────┐
│ [CHARCOAL BLACK + GRUNGE 10%]                      │
│                                                     │
│   ✓ YOU'RE IN                                      │
│    (H2 - Cream, 5rem)                             │
│                                                     │
│  Check your email for class details.              │
│  See you in the arena.                            │
│                                                     │
│      [VIEW MY BOOKINGS]                            │
│    (Secondary button → Hapana)                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Triggered after successful booking
- Layout: Centered confirmation
- Animation: Victory-burst (radial expansion)
- Auto-dismiss after 5s OR click to Hapana dashboard

### Trust Elements
- "Secure booking" badge
- "Cancel anytime" policy
- Spots remaining counter (via Hapana API)

---

## 5. ABOUT THE GYM

**Purpose:** Origin story + values + community ethos.

### Hero Structure

```
┌─────────────────────────────────────────────────────┐
│ [IMAGE: Gym interior, grayscale + burgundy tint]  │
│                                                     │
│  THE ARENA ISN'T BUILT.                           │
│   IT'S EARNED.                                     │
│  (H1 - Cream, 6rem, overlay on image)            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Layout: Full-width hero image + text overlay
- Image: High-contrast grayscale, burgundy color grade
- Overlay: 60% opacity charcoal gradient (bottom to top)
- Animation: Ken-burns slow zoom on image
- Height: 80vh

### Origin Story

```
┌─────────────────────────────────────────────────────┐
│ [CREAM LIGHT BACKGROUND]                           │
│                                                     │
│  ┌────────────────────────────────────────────┐   │
│  │ How Arena Began                            │   │
│  │                                            │   │
│  │ [Founder photo]  "Bondi needed a place    │   │
│  │   (left, 40%)     where courage meets      │   │
│  │                   craft. Not a wellness    │   │
│  │                   retreat. Not a hardcore  │   │
│  │                   gym. A fight culture     │   │
│  │                   built on respect..."     │   │
│  │                                            │   │
│  │                   — Founder Name, Year     │   │
│  └────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Layout: 40% image / 60% text split
- Image: Founder portrait, grayscale
- Typography:
  - Quote: Tagline font, 2rem, italic
  - Attribution: UI font, uppercase
- Background: Cream light
- Animation: Scroll-triggered fade-slide

### Values Grid

```
┌─────────────────────────────────────────────────────┐
│ [CHARCOAL BLACK + GRUNGE 10%]                      │
│                                                     │
│         WHAT WE STAND FOR                          │
│      (H2 - Cream, 4rem)                           │
│                                                     │
│  ┌──────────────┬──────────────┬──────────────┐  │
│  │ COURAGE      │ CRAFT        │ COMMUNITY    │  │
│  │              │              │              │  │
│  │ Step into    │ Technique    │ No egos.     │  │
│  │ the arena.   │ over ego.    │ Just respect.│  │
│  │ Face your    │ Every round  │ We rise      │  │
│  │ fear.        │ teaches.     │ together.    │  │
│  └──────────────┴──────────────┴──────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Layout: 3-column equal grid
- Cards: Charcoal bg, cream border
- Typography:
  - Value name: Display font, 2xl, uppercase
  - Description: Body font, cream-dark
- Icons: Beast symbol variants (top of each card)
- Animation: Staggered slide-in

### Community Proof

```
┌─────────────────────────────────────────────────────┐
│ [BURGUNDY PRIMARY]                                 │
│                                                     │
│  [Instagram feed grid - 6 recent posts]           │
│                                                     │
│         @arenaboxingbondi                          │
│      (Instagram handle, cream, 1.5rem)            │
│                                                     │
│      [FOLLOW US]                                   │
│    (Secondary button)                              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Layout: 2×3 grid of Instagram posts (via API)
- Images: Square crop, grayscale on load → color on hover
- CTA: Links to Instagram profile
- Animation: Grid fade-in, images scale on hover

### Trust Elements
- Founder story (authenticity)
- Values grid (brand principles)
- Instagram feed (social proof + community)

---

## 6. LOCATION / CONTACT

**Purpose:** Practical information for first-time visitors.

### Hero Structure

```
┌─────────────────────────────────────────────────────┐
│ [BURGUNDY DARK + GRUNGE 25%]                       │
│                                                     │
│         FIND US                                    │
│      (H1 - Cream, 7rem)                           │
│                                                     │
│   Bondi Beach. Where it all began.                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Map + Details

```
┌─────────────────────────────────────────────────────┐
│ [CREAM LIGHT BACKGROUND]                           │
│                                                     │
│ ┌──────────────────┬──────────────────────────────┐│
│ │ [Google Map]     │ ARENA BOXING BONDI           ││
│ │                  │                              ││
│ │ Interactive map  │ 123 Campbell Parade         ││
│ │ with pin marker  │ Bondi Beach NSW 2026        ││
│ │                  │                              ││
│ │                  │ HOURS                        ││
│ │                  │ Mon-Fri: 6am - 8pm          ││
│ │                  │ Sat-Sun: 8am - 2pm          ││
│ │                  │                              ││
│ │                  │ PHONE                        ││
│ │                  │ 0400 123 456                ││
│ │                  │                              ││
│ │                  │ EMAIL                        ││
│ │                  │ hello@arenaboxing.com.au    ││
│ │                  │                              ││
│ │                  │ [GET DIRECTIONS]             ││
│ │                  │ (Secondary button)           ││
│ └──────────────────┴──────────────────────────────┘│
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Layout: 50/50 split (map / details)
- Map: Google Maps embed, custom burgundy pin
- Typography:
  - Heading: Display font, 2xl
  - Details: Body font, cream-dark
  - Hours: UI font, uppercase
- Mobile: Stack vertically (map on top)
- Animation: None (functional)

### Contact Form

```
┌─────────────────────────────────────────────────────┐
│ [CHARCOAL BLACK + GRUNGE 10%]                      │
│                                                     │
│         GET IN TOUCH                               │
│      (H2 - Cream, 4rem)                           │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │ Name:    [________________]                 │  │
│  │                                             │  │
│  │ Email:   [________________]                 │  │
│  │                                             │  │
│  │ Message: [________________                  │  │
│  │           ________________                  │  │
│  │           ________________]                 │  │
│  │                                             │  │
│  │         [SEND MESSAGE]                      │  │
│  │        (Primary button)                     │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  We'll get back to you within 24 hours.           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Form fields:
  - Name: Single line input
  - Email: Email validation
  - Message: Textarea (4 rows)
- Styling:
  - Inputs: Cream bg, burgundy border (2px)
  - Focus: Blood-red border
  - Placeholder: Cream-dark, italic
- Validation: Client-side + server-side
- Success: "Message sent!" confirmation overlay
- Animation: Field focus → subtle scale-up

### Parking & Access

```
┌─────────────────────────────────────────────────────┐
│ [CREAM LIGHT BACKGROUND]                           │
│                                                     │
│  ┌─────────────┬──────────────┬──────────────┐   │
│  │ PARKING     │ PUBLIC       │ FIRST TIME?  │   │
│  │             │ TRANSPORT    │              │   │
│  │ Street park │ Bus: 380, 33│ Arrive 15min │   │
│  │ or Wilson's │ 3            │ early. We'll │   │
│  │ car park    │              │ show you     │   │
│  │             │ Walk from    │ around.      │   │
│  │             │ Bondi Junct. │              │   │
│  └─────────────┴──────────────┴──────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Layout: 3-column grid
- Cards: Cream bg, charcoal text
- Icons: Simple line icons (parking, bus, info)
- Animation: Fade-in on scroll

### Trust Elements
- Precise location (no guesswork)
- Contact form (responsive team)
- Parking info (removes friction)

---

## 7. FAQ

**Purpose:** Answer common questions pre-emptively.

### Hero Structure

```
┌─────────────────────────────────────────────────────┐
│ [BURGUNDY PRIMARY + GRUNGE 10%]                    │
│                                                     │
│         QUESTIONS                                  │
│        BEFORE YOU                                  │
│         STEP IN                                    │
│      (H1 - Cream, 6rem, stacked)                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### FAQ Categories

```
┌─────────────────────────────────────────────────────┐
│ [CREAM LIGHT BACKGROUND]                           │
│                                                     │
│ ┌───────────────────────────────────────────────┐ │
│ │ GETTING STARTED                               │ │
│ │                                               │ │
│ │ ▼ Do I need experience?                       │ │
│ │   No. All levels welcome...                   │ │
│ │                                               │ │
│ │ ▶ What should I bring?                        │ │
│ │                                               │ │
│ │ ▶ What's a trial class like?                  │ │
│ └───────────────────────────────────────────────┘ │
│                                                     │
│ ┌───────────────────────────────────────────────┐ │
│ │ MEMBERSHIP & BOOKING                          │ │
│ │                                               │ │
│ │ ▶ Can I pause my membership?                  │ │
│ │                                               │ │
│ │ ▶ How do I book classes?                      │ │
│ │                                               │ │
│ │ ▶ What's your cancellation policy?            │ │
│ └───────────────────────────────────────────────┘ │
│                                                     │
│ ┌───────────────────────────────────────────────┐ │
│ │ CLASSES & TRAINING                            │ │
│ │                                               │ │
│ │ ▶ What's the difference between classes?      │ │
│ │                                               │ │
│ │ ▶ How intense are the classes?                │ │
│ │                                               │ │
│ │ ▶ Can I train if I'm injured?                 │ │
│ └───────────────────────────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Layout: Vertical stack of category cards
- Accordion interaction:
  - ▶ Collapsed (click to expand)
  - ▼ Expanded (click to collapse)
  - Only one question open at a time per category
- Styling:
  - Category card: Cream bg, burgundy border
  - Question: UI font, uppercase, 1.25rem
  - Answer: Body font, cream-dark, leading-relaxed
  - Border: 2px burgundy
- Animation:
  - Expand: Slide-down (300ms ease)
  - Collapse: Slide-up (200ms ease)
  - Icon rotate: ▶ → ▼ (90deg, 200ms)

### Still Have Questions?

```
┌─────────────────────────────────────────────────────┐
│ [CHARCOAL BLACK + GRUNGE 10%]                      │
│                                                     │
│     CAN'T FIND YOUR ANSWER?                        │
│      (H2 - Cream, 3.5rem)                         │
│                                                     │
│         [CONTACT US]                               │
│      (Primary button → Contact page)               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- CTA: Links to Contact page (#contact form)
- Background: Charcoal + grunge
- Animation: Button blood-glow on hover

### Trust Elements
- "All levels welcome" (inclusive)
- Transparent policies (cancellation, pause)
- Practical answers (what to bring, etc.)

---

## GLOBAL NAVIGATION

**Applies to all pages (sticky header)**

```
┌─────────────────────────────────────────────────────┐
│ [BURGUNDY PRIMARY + GRUNGE 10%]                    │
│                                                     │
│  [Icon] ARENA  |  Classes  Trainers  Pricing      │
│                |  Booking  About  Contact  FAQ    │
│                |                    [BOOK TRIAL]   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Position: Fixed top, z-50
- Logo: Beast icon (48px) + wordmark (h-8)
- Nav links: UI font, uppercase, tracking-wide, cream
- Hover: Blood-red color + underline animation
- Mobile: Hamburger menu (animated 3-line)
- Scroll behavior: Shrink padding (py-5 → py-3.5)

---

## GLOBAL FOOTER

**Applies to all pages**

```
┌─────────────────────────────────────────────────────┐
│ [CHARCOAL BLACK + GRUNGE 10%]                      │
│                                                     │
│  ARENA BOXING BONDI                                │
│                                                     │
│  123 Campbell Parade                               │
│  Bondi Beach NSW 2026                              │
│                                                     │
│  hello@arenaboxing.com.au                          │
│  0400 123 456                                      │
│                                                     │
│  [Instagram] [Facebook]                            │
│                                                     │
│  © 2025 Arena Boxing. Those who dare.             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Background: Charcoal + grunge (10%)
- Typography: Body font, cream-dark
- Social icons: Cream, 32px, hover → blood-red
- Copyright: Small text, centered
- Animation: None

---

## ANIMATION TIMING SUMMARY

| Page | Hero Animation | Content Animations | Interactive |
|------|----------------|-------------------|-------------|
| Home | Wordmark sequence (0-3s) | Scroll-triggered fade-slide | Button glow |
| Timetable | Blur-fade-in | None (functional table) | Cell hover bg |
| Membership | Letter-expand | Card slide-in (0.15s stagger) | Price card glow |
| Booking | Blur-fade-in | None (Hapana iframe) | Confirmation burst |
| About | Ken-burns zoom | Scroll fade-slide | Image color on hover |
| Location | None | None (functional) | Form field focus |
| FAQ | Blur-fade-in | Accordion expand/collapse | Arrow rotation |

---

**END OF PAGE STRUCTURES**

For implementation, reference:
- `DESIGN_SYSTEM.md` for colors, typography, spacing
- `design-tokens.ts` for programmatic values
- `DESIGN_QUICK_REF.md` for component patterns
