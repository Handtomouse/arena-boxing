# Hapana Integration Plan - Arena Boxing

> **Ready-to-execute plan for embedding Hapana V2 booking widget**

---

## 🎯 Integration Method Comparison

### Option 1: Script Embed (RECOMMENDED ✅)
**Method**: Load Hapana SDK via `<script>` tag, initialize widget in React component

**Pros**:
- ✅ Full control over styling with CSS overrides
- ✅ Best performance (lazy loading, code splitting)
- ✅ Proper React lifecycle management
- ✅ Type-safe with TypeScript declarations
- ✅ Easy error handling
- ✅ Widget updates handled by Hapana

**Cons**:
- ⚠️ Requires custom CSS for brand matching
- ⚠️ Widget API changes could break implementation
- ⚠️ Limited customization of internal widget logic

**Verdict**: **Use this approach** - Best balance of control, performance, and maintainability

---

### Option 2: iframe Embed
**Method**: Embed Hapana booking page in `<iframe>`

**Pros**:
- ✅ Complete style isolation (no CSS conflicts)
- ✅ Simplest implementation (2 lines of code)
- ✅ Zero maintenance

**Cons**:
- ❌ Cannot restyle to match gothic brand
- ❌ Poor mobile UX (scrolling within iframe)
- ❌ Slower loading (full page load)
- ❌ Accessibility issues (nested scrolling)
- ❌ No access to booking events/state

**Verdict**: **Avoid** - Cannot achieve brand consistency

---

### Option 3: API-Driven (Custom UI)
**Method**: Build custom booking UI, use Hapana API for backend

**Pros**:
- ✅ 100% brand control
- ✅ Perfect gothic aesthetic
- ✅ Optimal performance
- ✅ Custom workflows

**Cons**:
- ❌ Massive development time (2-3 weeks)
- ❌ Ongoing maintenance burden
- ❌ Must handle booking logic, validation, errors
- ❌ Hapana API changes require updates

**Verdict**: **Overkill** - Not worth effort for v1

---

## 📋 Recommended Approach: Script Embed + CSS Overrides

### Implementation Strategy
1. Load Hapana V2 SDK script
2. Initialize widget in React component
3. Apply custom CSS to match gothic brand
4. Isolate styles with scoped selectors
5. Handle loading/error states
6. Test on mobile

---

## 🛠️ Step-by-Step Implementation

### Step 1: Environment Setup

**Add to `.env.local`:**
```env
NEXT_PUBLIC_HAPANA_WIDGET_ID=arena-boxing-bondi
HAPANA_API_KEY=hpn_live_xxxxxxxxxxxx
HAPANA_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
```

**Add to `.env.example`:**
```env
NEXT_PUBLIC_HAPANA_WIDGET_ID=your_widget_id
HAPANA_API_KEY=your_api_key
HAPANA_WEBHOOK_SECRET=your_webhook_secret
```

---

### Step 2: Create TypeScript Declarations

**Create `types/hapana.ts`:**
```typescript
// Hapana V2 SDK type declarations

export interface HapanaConfig {
  widgetId: string;
  container?: string;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  };
  locale?: 'en' | 'es' | 'fr';
  onBookingComplete?: (booking: HapanaBooking) => void;
  onBookingCancelled?: (booking: HapanaBooking) => void;
  onError?: (error: HapanaError) => void;
}

export interface HapanaBooking {
  id: string;
  classId: string;
  className: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  customerName: string;
  customerEmail: string;
}

export interface HapanaError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface HapanaSDK {
  init: (config: HapanaConfig) => void;
  destroy: () => void;
  refresh: () => void;
  getBookings: () => Promise<HapanaBooking[]>;
}

declare global {
  interface Window {
    Hapana?: HapanaSDK;
    HapanaWidget?: {
      load: (widgetId: string) => void;
    };
  }
}

export {};
```

---

### Step 3: Create HapanaWidget Component

**Create `components/embeds/HapanaWidget.tsx`:**
```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import type { HapanaConfig, HapanaBooking, HapanaError } from '@/types/hapana';

interface HapanaWidgetProps {
  widgetId: string;
  className?: string;
  onBookingComplete?: (booking: HapanaBooking) => void;
  onError?: (error: HapanaError) => void;
}

export default function HapanaWidget({
  widgetId,
  className = '',
  onBookingComplete,
  onError,
}: HapanaWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (isInitialized) return;

    // Load Hapana SDK
    const script = document.createElement('script');
    script.src = 'https://embed.hapana.com/v2/widget.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      try {
        // Initialize widget
        if (window.Hapana) {
          const config: HapanaConfig = {
            widgetId,
            container: `#hapana-widget-${widgetId}`,
            theme: {
              primaryColor: '#7D1E1E',      // Arena burgundy
              secondaryColor: '#A31F1F',    // Arena blood-red
              fontFamily: 'Barlow, sans-serif',
            },
            locale: 'en',
            onBookingComplete: (booking) => {
              console.log('Booking completed:', booking);
              onBookingComplete?.(booking);
            },
            onBookingCancelled: (booking) => {
              console.log('Booking cancelled:', booking);
            },
            onError: (error) => {
              console.error('Hapana error:', error);
              setLoadError(error.message);
              onError?.(error);
            },
          };

          window.Hapana.init(config);
          setIsLoading(false);
          setIsInitialized(true);
        } else {
          throw new Error('Hapana SDK not available');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize Hapana';
        setLoadError(errorMessage);
        setIsLoading(false);
      }
    };

    script.onerror = () => {
      setLoadError('Failed to load Hapana SDK');
      setIsLoading(false);
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      if (window.Hapana && isInitialized) {
        window.Hapana.destroy();
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [widgetId, onBookingComplete, onError, isInitialized]);

  return (
    <div className={`hapana-widget-wrapper ${className}`} ref={containerRef}>
      {/* Loading State */}
      {isLoading && (
        <div className="hapana-loading min-h-[500px] flex items-center justify-center bg-[var(--charcoal-black)]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[var(--cream-primary)] border-t-[var(--blood-red)] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[var(--cream-dark)]">Loading booking system...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {loadError && (
        <div className="hapana-error min-h-[500px] flex items-center justify-center bg-[var(--charcoal-black)]">
          <div className="text-center max-w-md">
            <h3 className="text-[var(--blood-red)] text-2xl mb-4">Booking Unavailable</h3>
            <p className="text-[var(--cream-primary)] mb-6">{loadError}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[var(--burgundy-primary)] text-[var(--cream-primary)] border-2 border-[var(--cream-primary)] uppercase tracking-wider hover:bg-[var(--blood-red)] transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Widget Container */}
      <div
        id={`hapana-widget-${widgetId}`}
        className={`hapana-widget-container ${isLoading ? 'hidden' : ''}`}
      />
    </div>
  );
}
```

---

### Step 4: Add Custom CSS Overrides

**Add to `app/globals.css`:**
```css
/* ==================== HAPANA WIDGET GOTHIC OVERRIDES ==================== */

/* Scoped to .hapana-widget-container to prevent global CSS conflicts */
.hapana-widget-container {
  font-family: var(--font-body);
  --hapana-primary: var(--burgundy-primary);
  --hapana-secondary: var(--blood-red);
  --hapana-text: var(--cream-primary);
  --hapana-text-muted: var(--cream-dark);
  --hapana-bg: var(--charcoal-black);
  --hapana-border: var(--cream-primary);
}

/* Override Hapana's default buttons */
.hapana-widget-container button,
.hapana-widget-container .hapana-btn,
.hapana-widget-container [class*="button"] {
  background: var(--burgundy-primary) !important;
  color: var(--cream-primary) !important;
  border: 2px solid var(--cream-primary) !important;
  border-radius: 0 !important; /* No rounded corners */
  font-family: var(--font-ui) !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  padding: 12px 24px !important;
  transition: all 300ms ease !important;
}

.hapana-widget-container button:hover,
.hapana-widget-container .hapana-btn:hover,
.hapana-widget-container [class*="button"]:hover {
  background: var(--blood-red) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(163, 31, 31, 0.4) !important;
}

/* Override Hapana's cards/containers */
.hapana-widget-container .hapana-card,
.hapana-widget-container [class*="card"],
.hapana-widget-container [class*="container"] {
  background: var(--charcoal-black) !important;
  border: 2px solid var(--cream-primary) !important;
  border-radius: 0 !important;
  box-shadow: 0 4px 12px rgba(26, 26, 26, 0.4) !important;
}

/* Override Hapana's text */
.hapana-widget-container h1,
.hapana-widget-container h2,
.hapana-widget-container h3,
.hapana-widget-container .hapana-heading {
  font-family: var(--font-display) !important;
  color: var(--cream-primary) !important;
  text-transform: uppercase !important;
}

.hapana-widget-container p,
.hapana-widget-container span,
.hapana-widget-container label {
  font-family: var(--font-body) !important;
  color: var(--cream-primary) !important;
}

/* Override Hapana's inputs */
.hapana-widget-container input,
.hapana-widget-container textarea,
.hapana-widget-container select {
  background: var(--cream-primary) !important;
  color: var(--charcoal-black) !important;
  border: 2px solid var(--burgundy-primary) !important;
  border-radius: 0 !important;
  font-family: var(--font-body) !important;
  padding: 12px !important;
}

.hapana-widget-container input:focus,
.hapana-widget-container textarea:focus,
.hapana-widget-container select:focus {
  border-color: var(--blood-red) !important;
  outline: none !important;
  box-shadow: 0 0 0 3px rgba(163, 31, 31, 0.2) !important;
}

/* Override Hapana's links */
.hapana-widget-container a {
  color: var(--blood-red) !important;
  text-decoration: underline !important;
}

.hapana-widget-container a:hover {
  color: var(--burgundy-light) !important;
}

/* Override Hapana's calendar/date picker */
.hapana-widget-container .hapana-calendar,
.hapana-widget-container [class*="calendar"],
.hapana-widget-container [class*="date-picker"] {
  background: var(--charcoal-black) !important;
  border: 2px solid var(--cream-primary) !important;
}

.hapana-widget-container .hapana-calendar-day,
.hapana-widget-container [class*="calendar-day"] {
  color: var(--cream-primary) !important;
}

.hapana-widget-container .hapana-calendar-day.selected,
.hapana-widget-container [class*="calendar-day"][class*="selected"] {
  background: var(--burgundy-primary) !important;
  color: var(--cream-primary) !important;
}

.hapana-widget-container .hapana-calendar-day:hover,
.hapana-widget-container [class*="calendar-day"]:hover {
  background: var(--blood-red) !important;
}

/* Override Hapana's time slots */
.hapana-widget-container .hapana-time-slot,
.hapana-widget-container [class*="time-slot"] {
  background: var(--charcoal-black) !important;
  border: 2px solid var(--cream-primary) !important;
  color: var(--cream-primary) !important;
}

.hapana-widget-container .hapana-time-slot.selected,
.hapana-widget-container [class*="time-slot"][class*="selected"] {
  background: var(--burgundy-primary) !important;
  border-color: var(--blood-red) !important;
}

/* Override Hapana's loading states */
.hapana-widget-container .hapana-spinner,
.hapana-widget-container [class*="spinner"],
.hapana-widget-container [class*="loading"] {
  border-color: var(--cream-primary) !important;
  border-top-color: var(--blood-red) !important;
}

/* Override Hapana's error/success messages */
.hapana-widget-container .hapana-error,
.hapana-widget-container [class*="error"] {
  background: rgba(163, 31, 31, 0.1) !important;
  border: 2px solid var(--blood-red) !important;
  color: var(--blood-red) !important;
}

.hapana-widget-container .hapana-success,
.hapana-widget-container [class*="success"] {
  background: rgba(125, 30, 30, 0.1) !important;
  border: 2px solid var(--burgundy-primary) !important;
  color: var(--cream-primary) !important;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .hapana-widget-container {
    font-size: 14px !important;
  }

  .hapana-widget-container button,
  .hapana-widget-container .hapana-btn {
    padding: 10px 20px !important;
    font-size: 14px !important;
  }

  .hapana-widget-container input,
  .hapana-widget-container textarea,
  .hapana-widget-container select {
    font-size: 16px !important; /* Prevent iOS zoom on focus */
  }
}

/* Grunge texture overlay for Hapana cards (optional) */
.hapana-widget-container .hapana-card::before,
.hapana-widget-container [class*="card"]::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/textures/grunge-light.webp');
  background-size: cover;
  opacity: 0.05;
  mix-blend-mode: multiply;
  pointer-events: none;
}
```

---

### Step 5: Create Classes Page

**Create `app/classes/page.tsx`:**
```tsx
import HapanaWidget from '@/components/embeds/HapanaWidget';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Classes | Arena Boxing Bondi',
  description: 'Book your trial. 10 Rounds, Fight Camp, Bondi Sessions. Those who dare.',
};

export default function ClassesPage() {
  const handleBookingComplete = (booking: any) => {
    console.log('Booking completed:', booking);
    // Optional: Track analytics, show confirmation modal, etc.
  };

  const handleBookingError = (error: any) => {
    console.error('Booking error:', error);
    // Optional: Show error toast, log to error tracking service
  };

  return (
    <div className="min-h-screen bg-[var(--charcoal-black)]">
      {/* Hero Section */}
      <section className="py-24 bg-[var(--burgundy-primary)] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'url(/textures/grunge-light.webp)',
            backgroundSize: 'cover',
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-center mb-6 text-[var(--cream-primary)] font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,6rem)]">
            Choose Your Trial
          </h1>
          <p className="text-center text-[var(--cream-dark)] text-xl max-w-2xl mx-auto">
            Three paths into the arena. All demand courage.
          </p>
        </div>
      </section>

      {/* Classes Preview */}
      <section className="py-16 bg-[var(--charcoal-black)]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <Card variant="default" distressed>
              <h3 className="font-[family-name:var(--font-display)] text-2xl mb-4 text-[var(--burgundy-primary)]">
                10 Rounds
              </h3>
              <p className="text-[var(--charcoal-black)] mb-4">
                The foundational Arena experience. Pure boxing technique, high-intensity rounds, authentic fight culture.
              </p>
              <ul className="text-sm text-[var(--charcoal-black)] space-y-2">
                <li>• 50 minutes</li>
                <li>• All levels welcome</li>
                <li>• Gloves provided</li>
              </ul>
            </Card>

            <Card variant="default" distressed>
              <h3 className="font-[family-name:var(--font-display)] text-2xl mb-4 text-[var(--burgundy-primary)]">
                Fight Camp
              </h3>
              <p className="text-[var(--charcoal-black)] mb-4">
                Strength, conditioning, and boxing combined. Build the fighter's body, cultivate the fighter's mind.
              </p>
              <ul className="text-sm text-[var(--charcoal-black)] space-y-2">
                <li>• 60 minutes</li>
                <li>• Intermediate+</li>
                <li>• Bring water bottle</li>
              </ul>
            </Card>

            <Card variant="default" distressed>
              <h3 className="font-[family-name:var(--font-display)] text-2xl mb-4 text-[var(--burgundy-primary)]">
                Bondi Sessions
              </h3>
              <p className="text-[var(--charcoal-black)] mb-4">
                Outdoor training at Bondi Beach. Sunrise boxing, headland workouts, beach culture at dawn.
              </p>
              <ul className="text-sm text-[var(--charcoal-black)] space-y-2">
                <li>• 45 minutes</li>
                <li>• All levels</li>
                <li>• Sunrise only (6am)</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Hapana Booking Widget */}
      <section className="py-16 bg-[var(--burgundy-dark)]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12 text-[var(--cream-primary)] font-[family-name:var(--font-tagline)] text-[clamp(2rem,5vw,3rem)] italic">
              Book Your Trial
            </h2>

            <HapanaWidget
              widgetId={process.env.NEXT_PUBLIC_HAPANA_WIDGET_ID!}
              className="shadow-[var(--shadow-intense)]"
              onBookingComplete={handleBookingComplete}
              onError={handleBookingError}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--charcoal-black)]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-tagline)] text-[clamp(2rem,5vw,3rem)] text-[var(--cream-primary)] italic mb-8">
            Questions before you book?
          </h2>
          <Button variant="secondary" size="lg">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}
```

---

## 🔒 Style Isolation Strategy

### 1. Scoped Selectors
All CSS overrides are scoped to `.hapana-widget-container` to prevent:
- Bleeding into global styles
- Affecting other components
- Breaking Hapana's internal functionality

### 2. `!important` Usage
Used strategically on critical brand properties:
- Colors (burgundy, cream, blood-red)
- Typography (gothic fonts, uppercase)
- Border radius (removing rounded corners)
- Spacing (consistent with Arena design)

### 3. CSS Variable Mapping
Map Hapana's CSS variables to Arena's design tokens:
```css
.hapana-widget-container {
  --hapana-primary: var(--burgundy-primary);
  --hapana-secondary: var(--blood-red);
  --hapana-text: var(--cream-primary);
}
```

### 4. Grunge Texture Overlay
Optional pseudo-element overlay for authentic gothic feel:
```css
.hapana-widget-container .hapana-card::before {
  content: '';
  background-image: url('/textures/grunge-light.webp');
  opacity: 0.05;
}
```

---

## 📱 Mobile Performance Considerations

### 1. Font Size Optimization
```css
@media (max-width: 768px) {
  .hapana-widget-container input,
  .hapana-widget-container select {
    font-size: 16px !important; /* Prevent iOS zoom on focus */
  }
}
```

### 2. Touch Target Sizes
Ensure buttons meet minimum 44x44px tap target:
```css
.hapana-widget-container button {
  min-height: 44px !important;
  min-width: 44px !important;
}
```

### 3. Script Loading Strategy
- Use `async` and `defer` attributes
- Load SDK only when widget component mounts
- Prevent multiple script loads with initialization flag

### 4. Lazy Loading
Widget only loads when user navigates to `/classes` page (route-based code splitting via Next.js)

---

## ⏳ Loading Behavior

### Initial Load Sequence
1. **Page renders** → Show skeleton loader (spinning ring + "Loading booking system...")
2. **SDK script loads** (~500ms) → No visual change yet
3. **SDK initializes** (~300ms) → Widget content appears
4. **Total time**: ~800ms from page load

### Loading States
```tsx
{isLoading && (
  <div className="min-h-[500px] flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-cream border-t-blood-red animate-spin" />
    <p>Loading booking system...</p>
  </div>
)}
```

### Optimization
- **Preconnect** to Hapana CDN in `<head>`:
  ```html
  <link rel="preconnect" href="https://embed.hapana.com" />
  ```
- **Lazy load** component with React.lazy() if below fold

---

## ❌ Error State Handling

### Error Types & Solutions

#### 1. SDK Load Failure
**Cause**: Network error, CDN down, ad blocker
**Solution**:
```tsx
script.onerror = () => {
  setLoadError('Failed to load booking system. Please check your connection.');
};
```

**UI**: Show retry button, contact fallback

#### 2. Initialization Failure
**Cause**: Invalid widget ID, API key issue
**Solution**:
```tsx
if (!window.Hapana) {
  throw new Error('Hapana SDK not available');
}
```

**UI**: Show error message with support email

#### 3. Booking API Errors
**Cause**: Class full, invalid date, server error
**Solution**:
```tsx
onError: (error) => {
  console.error('Booking error:', error);
  // Show user-friendly message based on error.code
}
```

**UI**: Inline error messages, suggest alternatives

### Error UI Component
```tsx
{loadError && (
  <div className="min-h-[500px] flex items-center justify-center bg-charcoal">
    <div className="text-center max-w-md">
      <h3 className="text-blood-red text-2xl mb-4">Booking Unavailable</h3>
      <p className="text-cream mb-6">{loadError}</p>
      <button onClick={() => window.location.reload()}>
        Try Again
      </button>
      <p className="text-cream-dark text-sm mt-4">
        Or contact us at info@arenaboxing.com.au
      </p>
    </div>
  </div>
)}
```

---

## 🧪 Testing Checklist

### Pre-Launch Testing

#### Desktop
- [ ] Widget loads successfully
- [ ] Gothic styling applied (burgundy buttons, cream text, no rounded corners)
- [ ] Calendar displays correctly
- [ ] Time slots selectable
- [ ] Booking flow completes
- [ ] Confirmation shown
- [ ] Error states display properly

#### Mobile (iOS Safari)
- [ ] Widget responsive on 375px viewport
- [ ] Touch targets ≥44x44px
- [ ] No input zoom (16px font size)
- [ ] Scrolling smooth (no nested scroll issues)
- [ ] Keyboard doesn't obscure inputs

#### Mobile (Android Chrome)
- [ ] Widget displays correctly
- [ ] Touch interactions work
- [ ] Form submission successful

#### Performance
- [ ] Lighthouse score ≥90
- [ ] SDK loads in <1s
- [ ] No layout shift (CLS <0.1)
- [ ] Widget initializes in <1s

#### Cross-Browser
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

---

## 🔄 Webhook Integration (Optional)

**If you need server-side booking notifications:**

### Create Webhook Endpoint

**Create `app/api/webhook/hapana/route.ts`:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature
    const signature = request.headers.get('x-hapana-signature');
    const body = await request.text();

    const expectedSignature = crypto
      .createHmac('sha256', process.env.HAPANA_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);

    // Handle different event types
    switch (event.type) {
      case 'booking.created':
        // Send confirmation email, log to database, etc.
        console.log('New booking:', event.data);
        break;

      case 'booking.cancelled':
        // Handle cancellation
        console.log('Booking cancelled:', event.data);
        break;

      default:
        console.log('Unknown event type:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
```

### Configure in Hapana Dashboard
1. Navigate to Settings → Webhooks
2. Add endpoint: `https://arenaboxing.com.au/api/webhook/hapana`
3. Select events: `booking.created`, `booking.cancelled`
4. Copy webhook secret to `.env.local`

---

## 📊 Analytics Tracking (Optional)

**Track booking events with Vercel Analytics or Google Analytics:**

```tsx
import { track } from '@vercel/analytics';

const handleBookingComplete = (booking: HapanaBooking) => {
  // Track conversion
  track('booking_completed', {
    class_name: booking.className,
    class_date: booking.date,
    class_time: booking.time,
  });

  // Show confirmation
  alert(`Booking confirmed for ${booking.className} on ${booking.date}`);
};
```

---

## 🚀 Deployment Checklist

### Before Going Live

- [ ] Set `NEXT_PUBLIC_HAPANA_WIDGET_ID` in Vercel env vars
- [ ] Set `HAPANA_WEBHOOK_SECRET` in Vercel env vars (if using webhooks)
- [ ] Test widget on production URL
- [ ] Verify webhook endpoint receives events
- [ ] Test booking flow end-to-end
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit
- [ ] Verify error states
- [ ] Test with ad blocker enabled
- [ ] Confirm analytics tracking (if implemented)

---

## 📝 Maintenance Notes

### Regular Tasks
- **Monthly**: Check Hapana SDK version, update if needed
- **Quarterly**: Review CSS overrides, ensure still working after Hapana updates
- **As needed**: Update widget ID if changing Hapana account

### Monitoring
- Set up error tracking (Sentry) for widget failures
- Monitor booking completion rate
- Track widget load time (Vercel Analytics)

---

## 🆘 Troubleshooting

### Widget Not Loading
1. Check `NEXT_PUBLIC_HAPANA_WIDGET_ID` is set
2. Verify SDK script loaded (Network tab)
3. Check browser console for errors
4. Test with ad blocker disabled

### Styles Not Applied
1. Verify `.hapana-widget-container` class on parent div
2. Check `globals.css` imported in layout
3. Increase CSS specificity with `!important`
4. Inspect element to find actual Hapana class names

### Mobile Issues
1. Test on real device (not just emulator)
2. Check input font size ≥16px
3. Verify touch target sizes
4. Test keyboard behavior

---

## ✅ Ready-to-Execute Summary

### Implementation Order
1. ✅ **Step 1**: Add environment variables (`.env.local`)
2. ✅ **Step 2**: Create TypeScript types (`types/hapana.ts`)
3. ✅ **Step 3**: Create HapanaWidget component (`components/embeds/HapanaWidget.tsx`)
4. ✅ **Step 4**: Add CSS overrides to `globals.css`
5. ✅ **Step 5**: Create Classes page (`app/classes/page.tsx`)
6. ⚠️ **Step 6**: Test locally (http://localhost:3002/classes)
7. ⚠️ **Step 7**: Deploy to Vercel
8. ⚠️ **Step 8**: Test on production
9. ⚠️ **Step 9**: Set up webhooks (optional)
10. ⚠️ **Step 10**: Add analytics tracking (optional)

### Time Estimate
- **Development**: 3-4 hours
- **Testing**: 1-2 hours
- **Deployment**: 30 minutes
- **Total**: ~5-7 hours

---

**🥊 Integration plan complete. Ready to execute.**
