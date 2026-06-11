# Hapana Widget Usage Examples - Arena Boxing

Quick reference for using Hapana widgets in different pages.

---

## Classes Widget (Book Individual Sessions)

### Basic Usage (Current Implementation)

**In `app/booking/page.tsx`:**
```tsx
import HapanaEmbed from '@/components/sections/HapanaEmbed';

export default function BookingPage() {
  return (
    <main>
      <h1>Book a Class</h1>

      {/* Automatically uses environment variables */}
      <HapanaEmbed
        theme="light"
        dataType="classes"
      />
    </main>
  );
}
```

**What This Does:**
- Shows class schedule from Hapana
- Allows booking individual sessions
- Reads widget ID from `NEXT_PUBLIC_HAPANA_WIDGET_ID`
- Switches between demo/live based on `NEXT_PUBLIC_HAPANA_MODE`

---

### Filter by Instructor

**Show only classes by a specific trainer:**
```tsx
<HapanaEmbed
  theme="light"
  dataType="classes"
  instructorId="sarah-jones"  // Replace with actual instructor ID from Hapana
/>
```

**Use Case:** Trainer profile pages where you want to show only that trainer's classes.

---

### Filter by Session Type

**Show only specific class types (e.g., only Bootcamp classes):**
```tsx
<HapanaEmbed
  theme="light"
  dataType="classes"
  sessionType="bootcamp"  // Replace with actual session type from Hapana
/>
```

**Use Case:** Landing pages for specific class types.

---

## Packages Widget (Buy Memberships)

### Basic Usage

**In `app/membership/page.tsx`:**
```tsx
import HapanaEmbed from '@/components/sections/HapanaEmbed';

export default function MembershipPage() {
  return (
    <main>
      <h1>Membership Plans</h1>

      {/* Show all membership packages */}
      <HapanaEmbed
        theme="light"
        dataType="packages"
      />
    </main>
  );
}
```

**What This Does:**
- Shows all membership plans from Hapana
- Allows purchasing memberships
- Displays pricing, features, and purchase flow

---

### Show Specific Package

**Highlight a specific membership tier:**
```tsx
<HapanaEmbed
  theme="light"
  dataType="packages"
  packageId="unlimited-monthly"  // Replace with actual package ID
  variant="featured"
/>
```

**Use Case:** Direct link to a specific membership plan from marketing campaigns.

---

## Advanced Usage

### Track Booking Completions

**Send booking data to Google Analytics:**
```tsx
import HapanaEmbed from '@/components/sections/HapanaEmbed';
import { trackEvent } from '@/lib/analytics';

export default function BookingPage() {
  const handleBookingComplete = (booking: unknown) => {
    // Log to console for debugging
    console.log('Booking completed:', booking);

    // Track in Google Analytics
    trackEvent('complete_booking', {
      value: booking.amount,
      currency: 'AUD',
    });

    // Optional: Show success message
    alert('Booking confirmed! Check your email for details.');
  };

  return (
    <HapanaEmbed
      theme="light"
      dataType="classes"
      onBookingComplete={handleBookingComplete}
    />
  );
}
```

---

### Dark Theme

**Use dark theme for widgets in dark sections:**
```tsx
<Section variant="dark">
  <HapanaEmbed
    theme="dark"
    dataType="classes"
  />
</Section>
```

---

### Manual Mode Override

**Force demo mode even if env says live:**
```tsx
<HapanaEmbed
  mode="demo"  // Overrides NEXT_PUBLIC_HAPANA_MODE
  dataType="classes"
/>
```

**Use Case:** Testing or showing demo to client while production is live.

---

## Common Patterns

### Side-by-Side: Classes + Packages

**Show booking and membership options together:**
```tsx
export default function GetStartedPage() {
  return (
    <main>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Book a Class */}
        <div>
          <h2>Book a Single Class</h2>
          <p>Try us out with a drop-in session.</p>
          <HapanaEmbed
            theme="light"
            dataType="classes"
          />
        </div>

        {/* Buy Membership */}
        <div>
          <h2>Join as a Member</h2>
          <p>Unlimited access with our monthly plans.</p>
          <HapanaEmbed
            theme="light"
            dataType="packages"
          />
        </div>
      </div>
    </main>
  );
}
```

---

### Conditional Rendering

**Show different widgets for members vs non-members:**
```tsx
export default function BookingPage({ userIsMember }: { userIsMember: boolean }) {
  return (
    <main>
      {userIsMember ? (
        // Members: Book classes
        <HapanaEmbed
          theme="light"
          dataType="classes"
        />
      ) : (
        // Non-members: Buy membership first
        <>
          <p>Become a member to book unlimited classes.</p>
          <HapanaEmbed
            theme="light"
            dataType="packages"
          />
        </>
      )}
    </main>
  );
}
```

---

## Environment Configuration Reference

### Demo Mode (Development)

```bash
# .env.local
NEXT_PUBLIC_HAPANA_MODE=demo
```

**Result:** Shows fake booking cards, no real Hapana integration.

---

### Live Mode (Production)

```bash
# Vercel Environment Variables
NEXT_PUBLIC_HAPANA_MODE=live
NEXT_PUBLIC_HAPANA_WIDGET_ID=ZjV0eGJ3cGUzU1c1VGtlcUxGOVFDUT09
NEXT_PUBLIC_HAPANA_SCRIPT_URL=https://widget.hapana.com/hapana_widget.js
```

**Result:** Shows real Hapana widget with live bookings.

---

## Props Reference

### HapanaEmbed Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `widgetId` | string | From env var | Hapana widget ID (Base64 string) |
| `theme` | `'light' \| 'dark'` | `'light'` | Color theme for widget |
| `mode` | `'demo' \| 'live'` | From env var | Demo (fake) or live (real) widget |
| `dataType` | `'classes' \| 'packages'` | `'classes'` | Show classes or membership packages |
| `instructorId` | string | `''` | Filter classes by instructor |
| `sessionType` | string | `''` | Filter classes by type |
| `packageId` | string | `''` | Show specific package |
| `variant` | string | `''` | Package display variant |
| `onBookingComplete` | function | undefined | Callback when booking completes |
| `className` | string | `''` | Additional CSS classes |

---

## Testing Checklist

### Before Going Live

- [ ] Set `NEXT_PUBLIC_HAPANA_MODE=live` in Vercel
- [ ] Verify widget ID is correct (`ZjV0eGJ3cGUzU1c1VGtlcUxGOVFDUT09`)
- [ ] Test in staging environment first
- [ ] Make test booking and verify it appears in Hapana dashboard
- [ ] Test on mobile devices
- [ ] Verify confirmation emails are sent
- [ ] Check analytics tracking fires

### After Going Live

- [ ] Monitor Vercel logs for errors
- [ ] Make real booking to confirm everything works
- [ ] Check PageSpeed score (should stay >80)
- [ ] Verify no console errors
- [ ] Test cancellation flow

---

## Troubleshooting

**Widget not showing:**
- Check `NEXT_PUBLIC_HAPANA_MODE` is set to `'live'`
- Verify widget ID in environment variables
- Check browser console for errors

**Wrong classes showing:**
- Verify classes exist in Hapana dashboard
- Check instructor ID / session type filters
- Ensure Hapana account is active

**Styling looks off:**
- Check `theme` prop (`'light'` or `'dark'`)
- Verify CSS variables are applied (inspect element)
- Contact Hapana support for theming options

---

**For more details, see:**
- `HAPANA_INTEGRATION_NOTES.md` - Complete integration guide
- `components/sections/HapanaEmbed.tsx` - Component source code
- `components/sections/RealHapanaWidget.tsx` - Live widget implementation

**Last Updated:** November 19, 2025
