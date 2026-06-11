# UFC ClaudeCode Workflow - Arena Boxing

> **Zero-thought operational system for managing Arena Boxing in UFC**

---

## 📁 UFC Folder Structure

### Location
```
/Users/handtomouse/Desktop/MrCC_PAI_Stage1_Files/UFC/clients/arena_boxing/
```

### Directory Tree
```
UFC/clients/arena_boxing/
├── CLAUDE.md                      # Project-specific Claude instructions
├── project/
│   ├── setup.md                   # Dependencies, environment, deployment
│   ├── research.md                # Hapana docs, competitor analysis, brand assets
│   ├── routes.md                  # Page routes, API endpoints, navigation
│   ├── components.md              # Component inventory & specs
│   └── brand.md                   # Colors, fonts, imagery, voice
├── deliverables/
│   ├── wireframes/                # Figma exports, sketches
│   ├── builds/
│   │   ├── v01_landing/          # Versioned feature builds
│   │   ├── v02_classes_page/
│   │   └── v03_hapana_integration/
│   └── exports/                   # Production builds, screenshots
├── meetings/
│   ├── 2025_11_17_kickoff.md
│   └── [date]_[topic].md
├── invoices/                      # If client project
└── archive/                       # Old versions, deprecated files
```

---

## 🏷️ Naming Conventions

### Files & Folders
```bash
# Rule: snake_case, lowercase, no spaces, underscores only
✅ CORRECT:
- arena_boxing
- setup.md
- hapana_integration.md
- v01_landing_page
- 2025_11_17_kickoff.md

❌ WRONG:
- Arena-Boxing (hyphens)
- Setup.MD (caps extension)
- Hapana Integration.md (spaces)
- v1-landing-page (hyphens)
```

### Versioning
```bash
# Format: v[two-digit]_[feature-description]
v01_landing_page
v02_classes_hapana
v03_contact_form
v04_manifesto
v05_fighters_page

# NOT: v1, version-01, 1.0, etc.
```

### Meeting Notes
```bash
# Format: YYYY_MM_DD_[topic].md
2025_11_17_kickoff.md
2025_11_20_design_review.md
2025_12_01_hapana_setup.md
```

---

## 📄 Core Project Files

### 1. `CLAUDE.md` (Client Context)
**Location**: `UFC/clients/arena_boxing/CLAUDE.md`

```markdown
# Arena Boxing - ClaudeCode Context

## Project Overview
- **Type**: Next.js 14 website for boxing gym
- **Client**: Arena Boxing Bondi
- **Tagline**: "Those Who Dare"
- **Aesthetic**: Gothic/grunge, burgundy + cream
- **Stack**: Next.js 14, TypeScript, Tailwind v4, Vercel
- **Integration**: Hapana V2 booking widget

## Repository
- **Path**: ~/Documents/GitHub/arena-boxing
- **Dev Server**: http://localhost:3002 (ports 3000-3001 in use)
- **Deployment**: Vercel (TBD)

## Current Status
- [x] Landing page with 20 improvements
- [x] Navigation component
- [x] Homepage layout
- [x] Design system (burgundy/cream/gothic)
- [x] Project documentation
- [ ] Classes page + Hapana integration
- [ ] Contact form + API
- [ ] Manifesto, Fighters pages

## Quick Commands
```bash
cd ~/Documents/GitHub/arena-boxing
npm run dev          # Start dev (port 3002)
npm run build        # Build
npm run lint         # Lint
./setup.sh           # Run setup automation
```

## Key Files
- Landing: `components/Landing.tsx`
- Homepage: `app/home/page.tsx`
- Nav: `components/ui/Navigation.tsx`
- Styles: `app/globals.css`
- Docs: `PROJECT_BLUEPRINT.md`

## Brand Assets
- Logo: `/public/images/ASSET.jpg`
- Tagline: `/public/images/ASSET 3.jpg`
- Wordmark: `/public/images/ASSET 4.jpg`
- Video: `/public/videos/bb9897603397493d9b48c695b009df4e.HD-1080p-7.2Mbps-55774870.mp4`

## Environment Variables
See `.env.example` for required vars:
- NEXT_PUBLIC_HAPANA_WIDGET_ID
- RESEND_API_KEY
- CONTACT_EMAIL

## Notes
- Gothic fonts: UnifrakturMaguntia (display), Bebas Neue (tagline)
- Colors: Burgundy (#7D1E1E), Cream (#E8DDD3), Blood Red (#A31F1F)
- Never rounded corners - use distressed/medieval shapes
```

---

### 2. `setup.md` (Technical Setup)
**Location**: `UFC/clients/arena_boxing/project/setup.md`

```markdown
# Setup - Arena Boxing

## Dependencies
### Production
- next: 16.0.3
- react: 19.2.0
- react-dom: 19.2.0
- resend (email)
- @vercel/analytics

### Development
- typescript: ^5
- tailwindcss: ^4
- eslint, prettier
- husky, lint-staged
- zod (validation)

## Environment Setup
```bash
# 1. Clone & Install
git clone [repo]
cd arena-boxing
npm install

# 2. Environment Variables
cp .env.example .env.local
# Edit: HAPANA_WIDGET_ID, RESEND_API_KEY, CONTACT_EMAIL

# 3. Run Setup Script
./setup.sh

# 4. Start Dev Server
npm run dev  # Opens on port 3002
```

## Deployment (Vercel)
1. Push to GitHub
2. Import at vercel.com/new
3. Set env vars in dashboard
4. Deploy automatically on push to `main`

## Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server (local)
- `npm run lint` - ESLint
- `npm run format` - Prettier
- `npm run type-check` - TypeScript check
- `./setup.sh` - Automated setup

## Ports
- 3000: In use
- 3001: In use
- 3002: Arena Boxing dev server ✅

## Troubleshooting
See `COMMANDS.md` in repo for full reference.
```

---

### 3. `research.md` (Research & References)
**Location**: `UFC/clients/arena_boxing/project/research.md`

```markdown
# Research - Arena Boxing

## Hapana Integration
### Docs
- Main: https://docs.hapana.com/embed
- V2 Widget: https://embed.hapana.com/v2/widget.js
- Webhook Events: booking.created, booking.cancelled

### Widget Implementation
```tsx
// See: components/embeds/HapanaWidget.tsx
<HapanaWidget widgetId="arena-boxing-bondi" />
```

### Custom Styling
CSS variables in globals.css:
- `--hapana-primary`: var(--burgundy-primary)
- `--hapana-secondary`: var(--blood-red)

## Competitor Analysis
### Reference Sites (Avoid These Patterns!)
**User Feedback**: "boring as fuck, all follow same template"

Generic patterns to AVOID:
- Clean minimal white backgrounds
- Sans-serif only typography
- Rounded corners everywhere
- Stock photos of smiling people
- Pastel color schemes
- Generic CTA buttons

### Unique Approaches (Inspiration)
- Film grain effects
- Glitch animations
- Gothic typography
- Distressed textures
- Dark, moody color palettes
- Analog video aesthetics

## Brand Assets
### Provided Files
- `/public/images/ASSET.jpg` - Beast symbol (burgundy bg)
- `/public/images/ASSET 3.jpg` - "those who dare" tagline
- `/public/images/ASSET 4.jpg` - "ARENA" gothic wordmark
- `/public/videos/bb9897...mp4` - Brand video

### Instagram
- @arenaboxing_bondi (reference for content/tone)

## Typography Research
### Gothic Fonts
- UnifrakturMaguntia (free, Google Fonts)
- Old English Text MT (system)
- Blackletter alternatives for licensing

### Body Fonts
- Inter (clean, readable)
- Barlow (condensed for UI)
- Source Sans 3 (fallback)

## Performance Benchmarks
Target Lighthouse scores:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+
```

---

### 4. `routes.md` (Site Structure)
**Location**: `UFC/clients/arena_boxing/project/routes.md`

```markdown
# Routes - Arena Boxing

## Public Routes (Marketing)

### `/` - Landing Page
- **Component**: `components/Landing.tsx`
- **Purpose**: Video immersion entry point
- **Features**: Auto-enter countdown, keyboard shortcuts, localStorage
- **Redirects to**: `/home` after 5s (or 2s for repeat visitors)

### `/home` - Homepage
- **File**: `app/home/page.tsx`
- **Sections**:
  - Hero (video bg, ARENA wordmark, CTA)
  - Manifesto (brand story)
  - Classes preview (10 Rounds, Fight Camp, Bondi Sessions)
  - Final CTA
- **Layout**: Uses root layout with Navigation

### `/classes` - Classes & Booking
- **File**: `app/classes/page.tsx` (NOT YET BUILT)
- **Purpose**: Class descriptions + Hapana booking widget
- **Components**: HapanaWidget, ClassCard grid
- **Features**: Filter by type, view schedule

### `/manifesto` - Brand Story
- **File**: `app/manifesto/page.tsx` (NOT YET BUILT)
- **Purpose**: "Those Who Dare" philosophy, origin story
- **Style**: Long-form text, blockquotes, imagery

### `/fighters` - Community
- **File**: `app/fighters/page.tsx` (NOT YET BUILT)
- **Purpose**: Testimonials, member stories, community
- **Features**: Photo grid, quotes, social proof

### `/contact` - Contact Form
- **File**: `app/contact/page.tsx` (NOT YET BUILT)
- **Purpose**: Contact form, location, hours
- **API**: `/api/contact` for form submission

## API Routes

### `/api/contact` - POST
- **File**: `app/api/contact/route.ts` (NOT YET BUILT)
- **Purpose**: Handle contact form submissions
- **Validation**: Zod schema (name, email, phone?, message)
- **Service**: Resend (email delivery)
- **Rate Limit**: 5 req/min per IP

### `/api/webhook/hapana` - POST
- **File**: `app/api/webhook/hapana/route.ts` (NOT YET BUILT)
- **Purpose**: Receive Hapana booking webhooks
- **Events**: booking.created, booking.cancelled
- **Verification**: Signature check via HAPANA_WEBHOOK_SECRET

### `/api/health` - GET
- **File**: `app/api/health/route.ts` (BUILT via setup.sh)
- **Purpose**: Health check for monitoring
- **Response**: `{ status: 'healthy', timestamp, environment }`

## Special Routes

### `/not-found` - 404
- **File**: `app/not-found.tsx` (BUILT via setup.sh)
- **Design**: Gothic 404 with beast symbol, "Return Home" CTA

### Error Boundary
- **File**: `app/error.tsx` (BUILT via setup.sh)
- **Purpose**: Catch runtime errors, display gothic error page

### Loading States
- **File**: `app/loading.tsx` (BUILT via setup.sh)
- **Design**: Spinning ring loader (burgundy/cream)

## Navigation Structure
```
┌─ Landing (/)
│  └─ Auto-redirects to /home
│
├─ Home (/home)
│  ├─ Hero
│  ├─ Manifesto preview
│  └─ Classes preview → /classes
│
├─ Classes (/classes)
│  └─ Hapana booking widget
│
├─ Manifesto (/manifesto)
│
├─ Fighters (/fighters)
│
└─ Contact (/contact)
   └─ Form → /api/contact
```

## Route Groups
Using `(marketing)` group for public pages (future):
```
app/
├── (marketing)/
│   ├── page.tsx          # Landing
│   ├── home/
│   ├── classes/
│   └── ...
└── api/
```
```

---

### 5. `components.md` (Component Inventory)
**Location**: `UFC/clients/arena_boxing/project/components.md`

```markdown
# Components - Arena Boxing

## UI Components (`components/ui/`)

### Button.tsx ✅ BUILT
**Props**: variant, size, className, children
**Variants**: primary (burgundy), secondary (cream), outline
**Sizes**: sm, md, lg
**Features**: Grunge texture overlay, hover effects

```tsx
<Button variant="primary" size="lg">Enter The Arena</Button>
```

### Card.tsx ✅ BUILT
**Props**: variant, distressed, className, children
**Variants**: default (cream bg), dark (charcoal bg)
**Features**: Distressed borders (if enabled), grunge texture

```tsx
<Card variant="default" distressed>Content</Card>
```

### Navigation.tsx ✅ BUILT
**Location**: `components/ui/Navigation.tsx`
**Features**:
- Sticky header
- Beast logo + ARENA wordmark
- Desktop menu: Home, Classes, Manifesto, Fighters, Contact
- Mobile hamburger menu
- "Enter The Arena" CTA button
**State**: isScrolled (changes padding on scroll)

### Input.tsx ❌ NOT BUILT
**Props**: type, label, error, required, className
**Usage**: Contact form fields
**Features**: Gothic styling, error states, validation feedback

### Footer.tsx ❌ NOT BUILT
**Sections**: Links, social, legal, newsletter signup
**Style**: Dark burgundy bg, cream text

## Page Components

### Landing.tsx ✅ BUILT
**Location**: `components/Landing.tsx`
**Purpose**: Video immersion landing page
**Features** (20 improvements):
- Full-screen video background
- "ARENA" gothic text + "those who dare" tagline
- Auto-enter countdown (5s first visit, 2s repeat)
- Keyboard shortcuts (Enter/Space)
- Film grain, vignette, scanline overlays
- Glitch animation on load
- SVG progress ring
- Mouse parallax on textures
- Sound effect + haptic feedback
- Custom crosshair cursor
- Blood splatter accent

**State**:
- countdown: number
- isFirstVisit: boolean
- mousePos: { x, y }

## Section Components (`components/sections/`) ❌ NOT BUILT

### Hero.tsx
**Usage**: Homepage hero section
**Features**: Video bg, ARENA wordmark, CTA

### ClassesGrid.tsx
**Usage**: Homepage + Classes page
**Features**: Grid of class cards (10 Rounds, Fight Camp, Bondi)

### Manifesto.tsx
**Usage**: Homepage preview + Manifesto page
**Features**: Blockquote styling, beast symbol watermark

### ContactForm.tsx
**Usage**: Contact page
**Features**: Form validation, API submission, loading states
**Fields**: name, email, phone (optional), message

## Embed Components (`components/embeds/`)

### HapanaWidget.tsx ❌ NOT BUILT
**Purpose**: Wrap Hapana V2 booking widget
**Props**: widgetId, className
**Features**:
- Load Hapana SDK script
- Initialize widget on mount
- Custom CSS overrides for gothic brand

```tsx
<HapanaWidget
  widgetId={process.env.NEXT_PUBLIC_HAPANA_WIDGET_ID!}
  className="max-w-4xl mx-auto"
/>
```

## Component Standards

### File Structure
```tsx
// 1. Imports
import { ... } from 'react';
import { ... } from 'next/...';

// 2. Types/Interfaces
interface ComponentProps {
  prop: type;
}

// 3. Component
export default function Component({ ... }: ComponentProps) {
  // State
  // Effects
  // Handlers

  return (
    // JSX
  );
}
```

### Naming
- PascalCase for component files: `Button.tsx`
- camelCase for props: `className`, `onClick`
- Descriptive booleans: `isLoading`, `hasError`, `isOpen`

### Styling
- Tailwind utility classes (primary)
- CSS variables for colors: `var(--burgundy-primary)`
- Inline styles for dynamic values only
- Class naming: `group`, `group-hover:`, etc.
```

---

### 6. `brand.md` (Brand Guidelines)
**Location**: `UFC/clients/arena_boxing/project/brand.md`

```markdown
# Brand - Arena Boxing

## Tagline
**"Those Who Dare"**

## Brand Positioning
- **NOT**: Wellness retreat, luxury fitness, clean minimal
- **YES**: Gothic fight culture, grunge underground, raw intensity
- **Vibe**: Medieval combat meets modern boxing, Bondi edge

## Colors

### Primary Palette
```css
--burgundy-primary: #7D1E1E;   /* Main brand color */
--burgundy-light: #8B2635;     /* Hover states */
--burgundy-dark: #6B1A1A;      /* Depth */

--cream-primary: #E8DDD3;      /* Text, borders */
--cream-light: #F0E6DB;        /* Highlights */
--cream-dark: #D4C8BD;         /* Muted text */

--charcoal-black: #1A1A1A;     /* Backgrounds */
--blood-red: #A31F1F;          /* Accents, CTAs */
```

### Usage Rules
- **Backgrounds**: Burgundy or Charcoal
- **Text**: Cream on dark, Charcoal on light
- **CTAs**: Blood Red with Cream text
- **Borders**: Cream, 2-3px, distressed
- **Never**: Rounded corners (use angular/torn edges)

## Typography

### Font Families
```css
--font-display: 'UnifrakturMaguntia', 'Old English Text MT', serif;
  /* Usage: "ARENA" wordmark, H1 headings */

--font-tagline: 'Bebas Neue', 'Oswald', 'Impact', sans-serif;
  /* Usage: "those who dare", subheadings */

--font-body: 'Inter', 'Barlow', 'Source Sans 3', system-ui;
  /* Usage: Body text, paragraphs */

--font-ui: 'Barlow Semi Condensed', 'Oswald', sans-serif;
  /* Usage: Buttons, labels, nav */
```

### Type Scale
- **Hero**: clamp(6rem, 20vw, 16rem) - "ARENA" on landing
- **H1**: clamp(48px, 8vw, 96px)
- **H2**: clamp(36px, 6vw, 72px)
- **H3**: clamp(28px, 4vw, 48px)
- **Body**: 18px
- **Small**: 14px

### Type Rules
- **ALL CAPS**: Display font (gothic), UI labels
- **Italic**: Tagline ("those who dare"), emphasis
- **Tracking**: Wide (0.1-0.3em) for gothic, normal for body
- **Leading**: Tight (1.1) for headings, relaxed (1.6) for body

## Imagery

### Photography Style
- **Lighting**: Moody, high contrast, dramatic shadows
- **Subject**: Close-ups of gloves, bags, sweat, grit
- **Color Grade**: Desaturated with burgundy/cream tint
- **Avoid**: Stock photos, smiling faces, bright lighting

### Textures
- Grunge overlays (mix-blend-mode: multiply, opacity 0.15-0.3)
- Film grain animations
- Scanlines (analog video aesthetic)
- Blood splatters (subtle, 0.1 opacity)

### Icons & Symbols
- **Beast Symbol**: `/public/images/ASSET.jpg` (lion/fighter)
- **Usage**: Watermarks, loading states, 404 page
- **Treatment**: Invert to cream, low opacity (0.05-0.2)

## Voice & Tone

### Voice Attributes
- **Confident**: Not arrogant, earned swagger
- **Direct**: No fluff, get to the point
- **Intense**: High energy, urgent
- **Inclusive**: "Those who dare" = everyone with courage

### Tone Examples

**✅ CORRECT**:
- "The arena doesn't care who you were. Only who you dare to become."
- "Not a wellness retreat. Not a hardcore gym. A place where courage meets craft."
- "Enter The Arena"
- "Claim Your Trial By Fire"

**❌ WRONG**:
- "Join our fitness community!" (too generic)
- "Transform your body in 30 days" (wellness cliché)
- "Premium boutique experience" (too luxury)
- "Sign up now!" (too salesy)

### Writing Rules
1. Short sentences. Punchy paragraphs.
2. Active voice only.
3. Second person ("you") for engagement.
4. Avoid superlatives ("amazing", "incredible").
5. Use metaphors from combat/arena/medieval.

## UI Patterns

### Buttons
- **Primary**: Burgundy bg, cream text, cream border (2px)
- **Hover**: Blood red bg, scale 1.05, blood-red glow
- **States**: Grunge texture overlay, letterpress text shadow
- **No**: Rounded corners, gradients, shadows (except glow)

### Cards
- **Borders**: 3px solid cream, slightly irregular (distressed)
- **Shadows**: Grunge depth (0 4px 12px rgba(26, 26, 26, 0.4))
- **Backgrounds**: Cream or charcoal with grunge texture
- **No**: Drop shadows, rounded corners

### Forms
- **Inputs**: Cream bg, charcoal text, burgundy border (2px)
- **Focus**: Blood red border, no glow/shadow
- **Labels**: Uppercase, tracking wide, small font
- **Errors**: Blood red text, inline below field

### Navigation
- **Position**: Sticky top
- **Background**: Burgundy with grunge texture
- **Links**: Uppercase, cream text, blood red hover
- **Mobile**: Hamburger menu (no fancy animations)

## Motion & Animation

### Principles
- **Subtle**: Enhance, don't distract
- **Gothic**: Glitch, distortion, analog effects
- **Performance**: GPU-accelerated only (transform, opacity)

### Effects Inventory
- Glitch animation on load (0.3s, clip-path + skew)
- Film grain loop (steps animation, 0.5s)
- Ken Burns zoom (slow scale 1.0 → 1.1, 20s)
- Parallax on mouse move (grunge textures)
- Countdown pulse (opacity 0.3 → 0.5, 2s)
- Blood-red glow on hover (box-shadow animation, 1.5s)

### Animation Rules
- Use `@keyframes` in globals.css
- Apply via class names (`.animate-glitch`)
- Max duration: 20s (Ken Burns exception)
- No cubic-bezier (use ease/ease-in-out/linear)
```

---

## 🔄 Versioning Approach

### Build Versions
```bash
# Each feature/page = new version
v01_landing_page           # Landing + 20 improvements
v02_classes_hapana         # Classes page + Hapana widget
v03_contact_form           # Contact form + API
v04_manifesto             # Manifesto page
v05_fighters              # Fighters/community page
v06_polish_performance    # Final polish, optimization
```

### Version Folders
```bash
UFC/clients/arena_boxing/deliverables/builds/
├── v01_landing/
│   ├── screenshot_desktop.png
│   ├── screenshot_mobile.png
│   ├── notes.md                    # Changes, decisions, issues
│   └── commit_hash.txt             # Git commit for this version
├── v02_classes_hapana/
└── ...
```

### Git Strategy
```bash
# Branch naming
feature/v02-classes-page
feature/v03-contact-form
fix/v01-landing-glitch

# Commit messages (conventional)
feat(v02): add Hapana widget integration
fix(v01): resolve countdown timer bug
docs: update routes.md with API endpoints
chore: update dependencies

# Tags
git tag v01-landing-complete
git tag v02-classes-complete
```

---

## ⚡ ClaudeCode Task Workflow

### Step 1: Prepare Context Files

**Before starting work**, ensure these are up to date:

```bash
# 1. Update CLAUDE.md with current status
nano UFC/clients/arena_boxing/CLAUDE.md

# 2. Update relevant project files
nano UFC/clients/arena_boxing/project/routes.md        # If adding routes
nano UFC/clients/arena_boxing/project/components.md    # If building components
```

### Step 2: Launch ClaudeCode Session

```bash
# Navigate to repo
cd ~/Documents/GitHub/arena-boxing

# Start dev server (if needed)
npm run dev

# Open ClaudeCode with context
# ClaudeCode will auto-load ~/CLAUDE.md and /arena-boxing/CLAUDE.md
```

### Step 3: Task Prompt Template

**Use this exact format for fastest iteration:**

```markdown
MrCC — Build Task

[Task Description]

Context:
- Version: v0X_[feature_name]
- Files: [list files to edit/create]
- Reference: UFC/clients/arena_boxing/project/[relevant_file].md

Requirements:
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

Acceptance:
- [ ] Builds without errors
- [ ] Follows brand guidelines (brand.md)
- [ ] Component documented in components.md
- [ ] Route added to routes.md (if applicable)

Deliver:
- Working code
- Screenshot (if UI)
- Update components.md/routes.md
```

**Example:**

```markdown
MrCC — Build Task

Build Hapana booking widget integration for /classes page

Context:
- Version: v02_classes_hapana
- Files: app/classes/page.tsx, components/embeds/HapanaWidget.tsx
- Reference: UFC/clients/arena_boxing/project/research.md (Hapana section)

Requirements:
1. Create HapanaWidget.tsx component that loads Hapana V2 SDK
2. Build /classes page with class descriptions + widget
3. Add custom CSS overrides to match gothic brand (burgundy/cream)
4. Use NEXT_PUBLIC_HAPANA_WIDGET_ID from env

Acceptance:
- [ ] Widget loads and displays booking interface
- [ ] Gothic styling applied (burgundy buttons, cream text)
- [ ] Responsive on mobile
- [ ] Component added to components.md

Deliver:
- HapanaWidget.tsx component
- app/classes/page.tsx
- Updated globals.css with Hapana overrides
- Update components.md and routes.md
```

### Step 4: Handoff & Versioning

**After ClaudeCode completes task:**

```bash
# 1. Test locally
npm run dev

# 2. Take screenshots
# Desktop: Cmd+Shift+4
# Save to: UFC/clients/arena_boxing/deliverables/builds/v0X_[feature]/

# 3. Update project files
nano UFC/clients/arena_boxing/project/components.md    # Add new components
nano UFC/clients/arena_boxing/project/routes.md        # Add new routes

# 4. Create version notes
cat > UFC/clients/arena_boxing/deliverables/builds/v02_classes_hapana/notes.md << EOF
# v02 - Classes Page + Hapana Integration

## Completed
- [x] HapanaWidget component
- [x] Classes page layout
- [x] Custom gothic CSS overrides
- [x] Mobile responsive

## Issues
- Widget loads slowly on first render (Hapana SDK)

## Next Steps
- Test booking flow with real Hapana account
- Add loading skeleton

## Commit
$(git rev-parse HEAD)
EOF

# 5. Commit
git add .
git commit -m "feat(v02): add Hapana booking widget integration"
git tag v02-classes-complete
```

### Step 5: Update Master Checklist

**In `CLAUDE.md`:**

```markdown
## Current Status
- [x] Landing page with 20 improvements (v01)
- [x] Classes page + Hapana integration (v02)
- [ ] Contact form + API (v03)
- [ ] Manifesto page (v04)
- [ ] Fighters page (v05)
```

---

## 🎯 Quick Reference Commands

### UFC Navigation
```bash
# Jump to Arena project
cd ~/Desktop/MrCC_PAI_Stage1_Files/UFC/clients/arena_boxing

# Edit project context
nano CLAUDE.md

# View component inventory
cat project/components.md

# View routes
cat project/routes.md
```

### Development
```bash
# Start dev server
cd ~/Documents/GitHub/arena-boxing
npm run dev

# Build & test
npm run build
npm run start

# Lint & format
npm run lint
npm run format
```

### Version Management
```bash
# Create new version folder
mkdir -p UFC/clients/arena_boxing/deliverables/builds/v0X_[feature]

# Screenshot to version folder
# (Take screenshot with Cmd+Shift+4, move to folder)

# Create version notes
nano UFC/clients/arena_boxing/deliverables/builds/v0X_[feature]/notes.md

# Tag version
git tag v0X-[feature]-complete
```

---

## 📋 Pre-Session Checklist

**Before every ClaudeCode session, verify:**

- [ ] `CLAUDE.md` updated with latest status
- [ ] Relevant project files (routes.md, components.md) current
- [ ] Dev server running (if working on UI)
- [ ] `.env.local` configured (if testing integrations)
- [ ] Task prompt prepared with clear acceptance criteria

---

## 🚨 Emergency Recovery

### If Session Context Lost
```bash
# 1. Check current_work.md
cat ~/Desktop/MrCC_PAI_Stage1_Files/UFC/memory/brain/current_work.md

# 2. Load last session
# In ClaudeCode: "load last arena_boxing"

# 3. Restore from version folder
ls UFC/clients/arena_boxing/deliverables/builds/
# Find latest version, review notes.md
```

### If Files Corrupted
```bash
# 1. Check git status
git status

# 2. View recent commits
git log --oneline -10

# 3. Restore from git
git checkout <commit-hash> -- <file-path>

# 4. Or reset to tag
git reset --hard v0X-feature-complete
```

---

**🥊 Zero-thought system complete. Just follow the steps.**
