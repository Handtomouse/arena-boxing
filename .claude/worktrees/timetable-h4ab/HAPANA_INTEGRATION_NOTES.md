# Hapana Integration Notes - Arena Boxing

**Last Updated:** November 19, 2025
**Integration Status:** Ready for Production Credentials
**Current Mode:** Demo (Fake Booking Cards)

---

## Quick Start

### Current State (Demo Mode)
The booking widget is currently in **demo mode** showing fake booking cards. This is perfect for:
- Development and testing
- Client presentations
- Staging environments
- Design reviews

### Switch to Live Mode (3 Steps)
1. Get real widget ID from Hapana dashboard
2. Update environment variable: `NEXT_PUBLIC_HAPANA_MODE=live`
3. Redeploy

That's it! The widget automatically switches to production Hapana integration.

---

## Environment Variable Configuration

### Required Variables

```bash
# Mode Switch (CRITICAL)
NEXT_PUBLIC_HAPANA_MODE=demo          # Options: 'demo' | 'live'

# Widget ID from Hapana Dashboard
NEXT_PUBLIC_HAPANA_WIDGET_ID=arena-boxing-bondi  # Replace with real ID

# Optional: Custom Script URL
NEXT_PUBLIC_HAPANA_SCRIPT_URL=https://widget.hapana.com/widget.js
```

### Where to Set These

**Development (Local):**
1. Copy `.env.example` to `.env.local`
2. Update values in `.env.local`
3. Restart dev server: `npm run dev`

**Production (Vercel):**
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add each variable
3. Set environment: "Production"
4. Redeploy

---

## Demo Mode vs Live Mode

### Demo Mode (`NEXT_PUBLIC_HAPANA_MODE=demo`)

**What You See:**
- 6 fake booking cards (Monday-Wednesday classes)
- Styled to match Arena Boxing brand
- "Book Now" buttons (non-functional)
- Demo mode indicator banner at bottom

**When to Use:**
- Local development
- Client presentations before going live
- Design/UX testing
- Staging environments without real bookings

**Pros:**
- No Hapana credentials needed
- Always available (no API downtime)
- Fast page loads
- No accidental real bookings

**Cons:**
- Cannot actually book classes
- Doesn't test real Hapana integration

---

### Live Mode (`NEXT_PUBLIC_HAPANA_MODE=live`)

**What You See:**
- Real Hapana booking widget
- Live class schedule from Hapana backend
- Functional booking flow
- Real-time availability

**When to Use:**
- Production website
- Real customer bookings
- Integration testing with Hapana

**Requirements:**
- Real Hapana widget ID
- Hapana account active
- Classes configured in Hapana dashboard

---

## Integration Points

### File Locations

**Main Component:**
```
components/sections/HapanaEmbed.tsx
```
- Smart switcher between demo/live modes
- Reads from environment variables
- Handles mode prop override

**Live Widget Component:**
```
components/sections/RealHapanaWidget.tsx
```
- Real Hapana integration logic
- Script loading
- Widget initialization
- Error handling

**Usage in Pages:**
```tsx
// In app/booking/page.tsx
import HapanaEmbed from '@/components/sections/HapanaEmbed';

<HapanaEmbed
  widgetId="arena-boxing-bondi"  // Optional: defaults to env var
  theme="light"                   // Options: 'light' | 'dark'
  mode="demo"                     // Optional: defaults to env var
  onBookingComplete={(booking) => {
    console.log('Booking completed:', booking);
  }}
/>
```

---

## Hapana Widget Configuration

### Getting Your Widget ID

1. Log in to Hapana dashboard: https://app.hapana.com
2. Navigate to **Settings** → **Integrations** → **Website Widget**
3. Copy your **Widget ID** (format: Base64 encoded string like `ZjV0eGJ3cGUzU1c1VGtlcUxGOVFDUT09`)
4. Add to environment variables

**Verified Widget ID:** The widget ID you provided is `ZjV0eGJ3cGUzU1c1VGtlcUxGOVFDUT09`

### Verified Hapana Implementation

**✅ CONFIRMED:** Hapana uses a **custom web component** approach:

**HTML Structure:**
```html
<hapana-widget
  data-type="classes"
  widget-id="ZjV0eGJ3cGUzU1c1VGtlcUxGOVFDUT09"
  instructor-id=""
  session-type=""
></hapana-widget>
<script src="https://widget.hapana.com/hapana_widget.js"></script>
```

**For Packages (Membership Plans):**
```html
<hapana-widget
  data-type="packages"
  widget-id="ZjV0eGJ3cGUzU1c1VGtlcUxGOVFDUT09"
  package-id=""
  variant=""
></hapana-widget>
<script src="https://widget.hapana.com/hapana_widget.js"></script>
```

**Implementation Details:**
- Widget type: Custom HTML element (Web Component)
- Script URL: `https://widget.hapana.com/hapana_widget.js`
- Script loads asynchronously
- Widget self-initializes when script loads
- Supports two data types: `classes` (book sessions) and `packages` (buy memberships)

**Our React Implementation:**
The `RealHapanaWidget.tsx` component creates the `<hapana-widget>` element dynamically and loads the script once globally. This ensures proper React lifecycle management and prevents duplicate script loads.

### Supported Hapana Features

Based on Hapana V2 widget capabilities:

**Included:**
- ✅ Class schedule display
- ✅ Real-time availability
- ✅ Booking flow (select class → confirm → payment)
- ✅ Member login/signup
- ✅ Class waitlists
- ✅ Booking confirmation emails (sent by Hapana)

**May Require Configuration:**
- ⚠️ Payment processing (requires Hapana payment gateway setup)
- ⚠️ Custom booking rules (max bookings per user, etc.)
- ⚠️ Membership plans (must be configured in Hapana)
- ⚠️ Cancellation policies (set in Hapana dashboard)

**Not Supported by Widget:**
- ❌ Membership purchases (requires separate flow or Hapana Stripe integration)
- ❌ Retail/merchandise sales
- ❌ Class reviews/ratings

---

## CSS Styling & Brand Matching

### Current Styling Approach

The real widget (`RealHapanaWidget.tsx`) applies CSS custom properties that Hapana can consume:

```tsx
style={{
  '--hapana-primary-color': '#7D1E1E',      // Burgundy
  '--hapana-secondary-color': '#E8DDD3',    // Cream
  '--hapana-text-color': '#1A1A1A',         // Charcoal
  '--hapana-background-color': '#E8DDD3',   // Cream
  '--hapana-accent-color': '#A31F1F',       // Blood Red
  '--hapana-border-radius': '4px',
  '--hapana-font-family': 'var(--font-body)',
}}
```

### Known Styling Limitations

**⚠️ IMPORTANT:** These CSS variables are **speculative**. Hapana's actual theming API may differ.

**Before Go-Live:**
1. Contact Hapana support to confirm theming capabilities
2. Request documentation for CSS customization
3. Test styling in Hapana's sandbox environment

**If Hapana doesn't support CSS variables:**
- Use global CSS overrides (target `.hapana-widget` classes)
- Request custom widget skin from Hapana
- Consider iframe embed with Hapana-hosted custom CSS

---

## Testing Instructions

### Testing Demo Mode

1. Ensure `NEXT_PUBLIC_HAPANA_MODE=demo` in `.env.local`
2. Run `npm run dev`
3. Navigate to `/booking`
4. **Verify:**
   - See 6 demo booking cards
   - "Demo Mode Active" banner appears
   - Cards styled with Arena Boxing colors
   - No actual booking functionality

### Testing Live Mode (Staging)

1. Get test widget ID from Hapana sandbox
2. Set `NEXT_PUBLIC_HAPANA_MODE=live`
3. Set `NEXT_PUBLIC_HAPANA_WIDGET_ID=[test-widget-id]`
4. Restart dev server
5. Navigate to `/booking`
6. **Verify:**
   - Hapana script loads (check Network tab)
   - Widget renders in container
   - Real classes appear
   - Can proceed through booking flow
   - No console errors

### Testing Live Mode (Production)

**Pre-Launch Checklist:**
- [ ] Real widget ID configured in Vercel
- [ ] Classes exist in Hapana (not empty)
- [ ] Payment gateway active (if taking payments)
- [ ] Test booking from staging URL
- [ ] Verify confirmation email received
- [ ] Cancel test booking in Hapana dashboard
- [ ] Check mobile responsiveness
- [ ] Test with slow 3G network (Performance tab)

**Launch Day:**
- [ ] Set `NEXT_PUBLIC_HAPANA_MODE=live`
- [ ] Deploy to production
- [ ] Make real test booking
- [ ] Monitor for errors (Vercel logs)
- [ ] Check Hapana dashboard for booking appearance

---

## Error Handling

### Common Errors & Solutions

**Error: "Hapana script failed to load"**
- **Cause:** Network issue, incorrect script URL, Hapana CDN down
- **Solution:** Check `NEXT_PUBLIC_HAPANA_SCRIPT_URL`, verify Hapana status page

**Error: "Hapana widget failed to initialize"**
- **Cause:** Invalid widget ID, wrong initialization method
- **Solution:** Verify widget ID in Hapana dashboard, check console for details

**Error: "Hapana API not available on window object"**
- **Cause:** Script loaded but didn't expose `window.Hapana`
- **Solution:** Contact Hapana support - their API structure may have changed

**Widget shows but looks unstyled:**
- **Cause:** CSS variables not supported by Hapana
- **Solution:** Add global CSS overrides or contact Hapana for theming docs

**Widget doesn't show on mobile:**
- **Cause:** z-index conflicts, overflow hidden, viewport issues
- **Solution:** Check mobile styles, test in DevTools mobile emulator

---

## Known Hapana Limitations

Based on research of Hapana V2 widget:

### Technical Limitations

**Widget Customization:**
- ⚠️ Limited control over internal widget layout
- ⚠️ May not support all Arena Boxing font styles
- ⚠️ Button styles might not match 100%
- ⚠️ Cannot hide certain Hapana branding elements (verify)

**Performance:**
- ⚠️ Widget loads external script (~50KB)
- ⚠️ Adds 200-500ms to initial page load
- ⚠️ May impact PageSpeed score by 5-10 points

**Mobile Experience:**
- ⚠️ Some widgets have poor mobile UX
- ⚠️ Small touch targets (verify Hapana's accessibility)
- ⚠️ Horizontal scrolling on narrow screens (test!)

### Functional Limitations

**Booking Flow:**
- ❌ Cannot customize booking confirmation message
- ❌ Cannot add custom fields to booking form (e.g., "How did you hear about us?")
- ❌ Limited control over error messages

**Analytics:**
- ❌ Google Analytics events may not fire automatically
- ❌ Requires manual event tracking for booking conversions

**Offline Support:**
- ❌ Widget won't work offline
- ❌ No service worker caching for Hapana script

---

## Widget Alternatives (If Hapana Doesn't Work)

If Hapana integration proves difficult:

**Option 1: iframe Embed**
- Simplest fallback
- Zero styling control
- Pro: Always works
- Con: Looks generic

**Option 2: Direct Link to Hapana**
- External link: "Book on Hapana" button
- Opens Hapana booking page in new tab
- Pro: No integration needed
- Con: Takes users off your site

**Option 3: Manual Booking Form + Hapana API**
- Build custom booking UI
- Use Hapana REST API for backend
- Pro: Total control
- Con: 2-3 weeks of dev work

**Recommendation:** Exhaust Hapana widget options first. iframe is good fallback.

---

## Analytics Integration

### Track Booking Events

Add to `lib/analytics.ts`:

```typescript
// Track when user views booking page
trackEvent('view_booking_page');

// Track when user initiates booking
trackEvent('start_booking', {
  class_type: 'Bootcamp',
  class_time: '2025-11-20T06:00:00'
});

// Track completed bookings (requires Hapana callback)
trackEvent('complete_booking', {
  class_id: 'abc123',
  amount: 35,
  currency: 'AUD'
});
```

### Hapana Booking Callback

In `RealHapanaWidget.tsx`, the `onBookingComplete` prop fires when booking succeeds:

```tsx
<HapanaEmbed
  onBookingComplete={(booking) => {
    // Send to Google Analytics
    trackEvent('complete_booking', {
      value: booking.amount,
      currency: 'AUD',
      items: [{ id: booking.classId, name: booking.className }]
    });

    // Optional: Send to Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        value: booking.amount,
        currency: 'AUD'
      });
    }
  }}
/>
```

**⚠️ VERIFY:** Hapana callback may have different structure. Check Hapana docs for actual event payload.

---

## Troubleshooting Checklist

**Widget not appearing at all:**
- [ ] Check `NEXT_PUBLIC_HAPANA_MODE` is set to 'live'
- [ ] Verify widget ID is correct
- [ ] Check browser console for errors
- [ ] Disable ad blockers (some block third-party widgets)
- [ ] Check Vercel deployment logs

**Widget appears but empty:**
- [ ] Verify classes exist in Hapana dashboard
- [ ] Check Hapana account is active (not suspended)
- [ ] Confirm widget ID matches your account

**Widget slow to load:**
- [ ] Check Network tab - script should load in <500ms
- [ ] Verify Hapana CDN is not experiencing issues
- [ ] Consider lazy loading widget below fold

**Bookings not appearing in Hapana:**
- [ ] Check test mode vs production mode in Hapana
- [ ] Verify widget ID is production widget, not sandbox
- [ ] Check payment gateway is active

**Styling looks wrong:**
- [ ] Inspect element to see which styles are applied
- [ ] Check if Hapana uses Shadow DOM (blocks CSS)
- [ ] Contact Hapana for theming documentation
- [ ] Consider global CSS overrides as last resort

---

## Production Deployment Checklist

**Before Deploying to Vercel:**
- [ ] Obtain real Hapana widget ID from production account
- [ ] Set `NEXT_PUBLIC_HAPANA_MODE=live` in Vercel
- [ ] Set `NEXT_PUBLIC_HAPANA_WIDGET_ID=[real-id]` in Vercel
- [ ] Test booking flow in Vercel Preview deployment
- [ ] Verify booking appears in Hapana dashboard
- [ ] Test on mobile devices (iPhone, Android)
- [ ] Check analytics tracking fires
- [ ] Verify confirmation emails sent
- [ ] Document any Hapana quirks for future reference

**After Deployment:**
- [ ] Monitor Vercel logs for errors
- [ ] Make test booking from production URL
- [ ] Check PageSpeed score (should be >80 on mobile)
- [ ] Verify no console errors
- [ ] Test cancellation flow
- [ ] Update documentation with any findings

---

## Support & Resources

**Hapana Support:**
- Dashboard: https://app.hapana.com
- Support: support@hapana.com
- Docs: https://docs.hapana.com (if available)
- Status: https://status.hapana.com (if available)

**Internal Files:**
- Integration plan: `HAPANA_INTEGRATION_PLAN.md` (comprehensive research)
- Component code: `components/sections/HapanaEmbed.tsx`
- Real widget: `components/sections/RealHapanaWidget.tsx`
- Environment config: `.env.example`

**Questions?**
- Check `HAPANA_INTEGRATION_PLAN.md` for deep dive research
- Contact Hapana support for widget API questions
- Review Hapana dashboard for configuration options
- Test in Hapana sandbox environment before production

---

## Version History

- **v1.0** (2025-11-19): Initial integration notes created
  - Demo/live mode switching implemented
  - RealHapanaWidget component created
  - Environment variables configured
  - Ready for production credentials

---

**Next Steps:**
1. Obtain real Hapana widget ID from client
2. Test in staging with real widget ID
3. Verify styling matches brand
4. Complete production deployment checklist
5. Monitor for errors post-launch

**Status:** ✅ Ready for Real Integration (Waiting on Hapana Credentials)
