# Analytics Setup Guide — Gym Website

## Overview

This guide shows you how to set up Google Analytics 4 (GA4) tracking for your gym website to measure performance, understand user behavior, and optimize conversions.

**Time Required:** 30-45 minutes
**Skill Level:** Beginner-friendly

---

## Why Google Analytics 4?

✅ **Free** - No cost for up to 10 million events per month
✅ **Industry Standard** - Most widely used analytics platform
✅ **Event-Based** - Tracks specific actions (bookings, form submissions, clicks)
✅ **Privacy-Compliant** - GDPR/CCPA friendly with proper configuration
✅ **Integrated** - Works seamlessly with Google Search Console and Google Ads

---

## Step 1: Create Google Analytics Account

### 1.1 Set Up GA4 Property

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **Admin** (bottom left gear icon)
3. Click **Create Property**
4. Fill in property details:
   - **Property Name:** Arena Boxing Bondi (or your gym name)
   - **Reporting Time Zone:** Australia/Sydney
   - **Currency:** Australian Dollar (AUD)
5. Click **Next**
6. Select business details:
   - **Industry Category:** Sports & Fitness
   - **Business Size:** Small (1-10 employees) or appropriate size
7. Select objectives:
   - ✅ Generate leads
   - ✅ Examine user behavior
8. Click **Create**
9. Accept Terms of Service

### 1.2 Create Data Stream

1. Select platform: **Web**
2. Enter website details:
   - **Website URL:** https://arenaboxing.com.au (your actual domain)
   - **Stream Name:** Arena Boxing Website
3. Click **Create Stream**
4. **Copy your Measurement ID** (format: `G-XXXXXXXXXX`)
   - You'll need this in Step 2

---

## Step 2: Install Analytics in Next.js

### Option A: Using Next.js App Router (Recommended)

#### 2.1 Install Google Analytics Package

```bash
npm install @next/third-parties
```

#### 2.2 Add Environment Variable

Create or update `.env.local`:

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID from Step 1.2

#### 2.3 Update Root Layout

Open `app/layout.tsx` and add the Google Analytics component:

```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}
```

**Why this approach?**
- Automatic script optimization by Next.js
- Lazy loads analytics (doesn't block page rendering)
- Respects user privacy settings
- Zero performance impact

---

### Option B: Manual Script Tag (Alternative)

If you prefer manual installation:

#### 2.1 Create Analytics Component

Create `app/components/Analytics.tsx`:

```typescript
'use client'

import Script from 'next/script'

export default function Analytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID

  if (!GA_ID) return null

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
```

#### 2.2 Add to Layout

```typescript
import Analytics from '@/components/Analytics'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## Step 3: Configure Key Events

GA4 automatically tracks page views, but you should manually track important user actions.

### 3.1 Create Analytics Utility

Create `lib/analytics.ts`:

```typescript
// Type-safe analytics event tracking

export type AnalyticsEvent =
  | 'view_booking_page'
  | 'view_membership'
  | 'view_timetable'
  | 'submit_contact_form'
  | 'click_phone'
  | 'click_email'
  | 'click_directions'
  | 'click_instagram'
  | 'start_booking'
  | 'view_trainer_profile'

interface EventParams {
  [key: string]: string | number | boolean
}

/**
 * Track custom event in Google Analytics
 * @param eventName - Name of the event to track
 * @param params - Optional parameters to send with the event
 */
export function trackEvent(eventName: AnalyticsEvent, params?: EventParams) {
  // Only track in browser (not during SSR)
  if (typeof window === 'undefined') return

  // Check if gtag is available
  if (typeof window.gtag === 'undefined') {
    console.warn('Google Analytics not loaded')
    return
  }

  // Send event to GA4
  window.gtag('event', eventName, params)

  // Log in development (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, params)
  }
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      eventOrConfig: string | Date,
      params?: EventParams
    ) => void
    dataLayer: unknown[]
  }
}
```

---

### 3.2 Track Events in Components

#### Example 1: Track Booking Page View

In `app/booking/page.tsx`:

```typescript
'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export default function BookingPage() {
  useEffect(() => {
    trackEvent('view_booking_page')
  }, [])

  return (
    // ... your booking page content
  )
}
```

#### Example 2: Track Contact Form Submission

In your contact form component:

```typescript
'use client'

import { trackEvent } from '@/lib/analytics'

export default function ContactForm() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Track form submission
    trackEvent('submit_contact_form', {
      form_location: 'location_page',
    })

    // ... rest of your form submission logic
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  )
}
```

#### Example 3: Track Phone Click

In your phone link:

```typescript
import { trackEvent } from '@/lib/analytics'

export default function PhoneLink() {
  return (
    <a
      href="tel:+61291305555"
      onClick={() => trackEvent('click_phone')}
      className="..."
    >
      (02) 9130 5555
    </a>
  )
}
```

#### Example 4: Track Membership Page View

```typescript
'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export default function MembershipPage() {
  useEffect(() => {
    trackEvent('view_membership')
  }, [])

  return (
    // ... membership page content
  )
}
```

---

## Step 4: Key Events to Track

### Essential Events (Must Track)

| Event Name | When to Fire | Where to Implement | Why It Matters |
|------------|--------------|-------------------|----------------|
| `view_booking_page` | User lands on /booking | Booking page mount | Measures intent to book |
| `start_booking` | User clicks in Hapana widget | Hapana iframe (if accessible) | Measures booking funnel entry |
| `submit_contact_form` | Contact form submitted | Form submit handler | Counts lead generation |
| `view_membership` | User lands on /membership | Membership page mount | Measures pricing interest |
| `view_timetable` | User lands on /timetable | Timetable page mount | Shows schedule interest |

### High-Value Events (Recommended)

| Event Name | When to Fire | Where to Implement | Why It Matters |
|------------|--------------|-------------------|----------------|
| `click_phone` | Phone link clicked | Phone number links | Tracks call intent |
| `click_email` | Email link clicked | Email links | Tracks email intent |
| `click_directions` | Google Maps link clicked | Map/directions buttons | Measures visit intent |
| `click_instagram` | Instagram link clicked | Social media links | Tracks social engagement |
| `view_trainer_profile` | Trainer bio expanded/clicked | Trainer cards | Shows interest in staff |

### Conversion Events (Set as Conversions in GA4)

Mark these as "Conversions" in GA4 Admin:
1. `submit_contact_form` - Lead generation
2. `start_booking` - Booking funnel entry
3. `click_phone` - Call initiation

**How to mark as conversion:**
1. Go to GA4 Admin → Events
2. Find the event
3. Toggle "Mark as conversion"

---

## Step 5: Verify Analytics Installation

### 5.1 Real-Time Testing

1. Go to [analytics.google.com](https://analytics.google.com)
2. Select your property
3. Click **Reports** → **Realtime**
4. Open your website in a new tab
5. Navigate around (click links, submit forms)
6. **Verify:**
   - You appear in "Users by page title and screen name"
   - Page views are being tracked
   - Custom events appear in "Event count by Event name"

**If you don't see data:**
- Wait 30 seconds (real-time has a slight delay)
- Check browser console for errors
- Verify Measurement ID is correct
- Check ad blockers are disabled (for testing)

### 5.2 Check Event Tracking

Test each custom event:
1. Trigger the event (e.g., click phone number)
2. Check browser console (should log in development)
3. Check GA4 Realtime → Events
4. Verify event appears with correct name

---

## Step 6: Set Up Enhanced Measurement

GA4 includes automatic tracking for common interactions. Enable these:

1. Go to GA4 Admin → Data Streams
2. Click your web stream
3. Click **Enhanced measurement**
4. Toggle ON:
   - ✅ **Scrolls** - Tracks 90% scroll depth
   - ✅ **Outbound clicks** - Tracks external links
   - ✅ **Site search** - If you add search later
   - ✅ **Video engagement** - If you add videos
   - ✅ **File downloads** - Tracks PDF/document downloads

**Note:** Form interactions auto-tracks form starts (not submits - you track that manually).

---

## Step 7: Link Google Search Console (Recommended)

Connect GA4 to Search Console for SEO insights:

1. Go to GA4 Admin → Property Settings
2. Scroll to **Search Console Links**
3. Click **Link**
4. Select your Search Console property (or set one up)
5. Click **Submit**

**Benefits:**
- See which Google searches bring traffic
- Track keyword rankings
- Identify SEO opportunities

---

## Step 8: Set Up Custom Reports (Optional but Recommended)

### 8.1 Create Conversions Report

1. Go to **Reports** → **Engagement** → **Events**
2. Click on your conversion events (`submit_contact_form`, `click_phone`)
3. Add secondary dimensions:
   - **Page title** - Where did the conversion happen?
   - **Source/Medium** - How did they find you?

### 8.2 Create Booking Funnel Report

Track the path to booking:
1. Go to **Explore** → Create new exploration
2. Select **Funnel exploration**
3. Add steps:
   - Step 1: `page_view` (path contains `/membership` or `/timetable`)
   - Step 2: `view_booking_page`
   - Step 3: `start_booking` (if trackable)
4. Name: "Booking Funnel"
5. Save

**Insight:** Shows drop-off rates at each step.

---

## Step 9: Privacy & Compliance

### 9.1 Update Privacy Policy

Add to your Privacy Policy page:

```markdown
## Analytics

We use Google Analytics to understand how visitors use our website.
Google Analytics collects information such as:
- Pages visited
- Time spent on site
- How you arrived at our site (e.g., Google search, social media)
- General location (city/region, not exact address)

This data is anonymized and helps us improve our website.

You can opt out of Google Analytics tracking by installing the
[Google Analytics Opt-Out Browser Add-on](https://tools.google.com/dlpage/gaoptout).

For more information, see [Google's Privacy Policy](https://policies.google.com/privacy).
```

### 9.2 Cookie Consent (If Required)

**Australia:** Cookie consent banners are not strictly required (unlike EU/GDPR), but recommended for transparency.

**Optional Cookie Banner:**
If you want to add one, use a simple solution:
- **CookieYes** (free tier available): https://www.cookieyes.com
- **Osano** (free for small sites): https://www.osano.com

Most gym websites in Australia don't use cookie banners - just a clear privacy policy.

---

## Step 10: Deployment Checklist

Before deploying to production:

- [ ] Measurement ID added to `.env.local`
- [ ] Analytics component added to root layout
- [ ] Test in development (check console logs)
- [ ] Test in staging (verify real-time data in GA4)
- [ ] Custom events implemented (minimum 5)
- [ ] Enhanced measurement enabled
- [ ] Privacy policy updated
- [ ] Conversions marked in GA4
- [ ] Search Console linked (optional)

**For Vercel deployment:**
- [ ] Add `NEXT_PUBLIC_GA_ID` to Vercel environment variables
- [ ] Redeploy site
- [ ] Test on production URL
- [ ] Verify analytics data flows within 24 hours

---

## Troubleshooting

### Analytics not loading
**Check:**
- `NEXT_PUBLIC_GA_ID` environment variable is set
- Measurement ID format is correct (`G-XXXXXXXXXX`)
- No ad blockers interfering
- Browser console shows no errors

### Events not tracking
**Check:**
- Event names match exactly (case-sensitive)
- `trackEvent()` is being called (add `console.log` temporarily)
- GA4 real-time report (events appear within 30 seconds)
- gtag is loaded (`typeof window.gtag !== 'undefined'`)

### No data in reports
**Wait:** GA4 can take 24-48 hours to populate full reports (real-time is instant)

### High bounce rate
**Normal for gyms:** 40-60% bounce rate is typical. Users often just check hours or timetable.

---

## Ongoing Maintenance

### Weekly
- Check real-time to ensure tracking is working

### Monthly
- Review top pages (which pages get most traffic?)
- Review conversions (how many form submissions/calls?)
- Review traffic sources (Google, Instagram, direct?)

### Quarterly
- Analyze booking funnel (where do people drop off?)
- Review mobile vs. desktop usage (optimize accordingly)
- Check site speed (slow pages hurt conversions)

---

## Key Metrics to Monitor

### Traffic Metrics
- **Users** - How many people visited
- **Sessions** - How many visits total
- **Pageviews** - Total pages viewed
- **Bounce Rate** - % who left after one page (40-60% is normal)

### Engagement Metrics
- **Average Session Duration** - How long people stay (2-3 min is good)
- **Pages per Session** - How many pages they visit (2-3 is typical)

### Conversion Metrics
- **Form Submissions** - How many contacted you
- **Phone Clicks** - How many tried to call
- **Booking Page Views** - How many saw booking page

### Traffic Sources
- **Organic Search** - Google/Bing searches (should be 40-60%)
- **Direct** - Typed URL or bookmarked (20-30%)
- **Social** - Instagram, Facebook (10-20%)
- **Referral** - Links from other sites (5-10%)

**Good benchmarks for gym websites:**
- 500-2,000 monthly users (depends on location/marketing)
- 2-5% conversion rate (form submissions + calls / total users)
- 50%+ mobile traffic (people checking schedules on phones)

---

## Resources

**Google Analytics Help:**
- GA4 Documentation: https://support.google.com/analytics
- GA4 Setup Guide: https://support.google.com/analytics/answer/9304153
- Event Tracking: https://support.google.com/analytics/answer/9267735

**Next.js Analytics Guides:**
- @next/third-parties: https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries
- Script Optimization: https://nextjs.org/docs/app/building-your-application/optimizing/scripts

**Free Training:**
- Google Analytics Academy: https://analytics.google.com/analytics/academy/
- GA4 Certification (free): https://skillshop.withgoogle.com

---

## Quick Reference: Event Implementation

**Pattern to follow for all events:**

```typescript
// 1. Import the function
import { trackEvent } from '@/lib/analytics'

// 2. For page views (use in useEffect)
useEffect(() => {
  trackEvent('event_name')
}, [])

// 3. For clicks (use in onClick)
<button onClick={() => trackEvent('event_name', { button_location: 'header' })}>
  Click Me
</button>

// 4. For form submits (use in handler)
const handleSubmit = () => {
  trackEvent('submit_contact_form', { form_type: 'contact' })
  // ... rest of submit logic
}
```

**Always test:**
```bash
# Development
npm run dev
# Click around, check console logs
# Verify events appear in GA4 Realtime

# Staging/Production
# Visit site, check GA4 Realtime within 30 seconds
```

---

**Document Version:** 1.0
**Last Updated:** November 19, 2025
**Compatible With:** Next.js 14+, GA4
**Reusable For:** All gym/fitness websites built with Next.js
