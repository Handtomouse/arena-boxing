# Arena Boxing - Staging Review Checklist

**Production URL:** https://arena-boxing.vercel.app
**Date Deployed:** 2025-11-20
**Build Status:** ✅ Ready (commit: f5740b9)

## Environment Configuration

- [x] Hapana mode: LIVE
- [x] Widget ID: Configured
- [x] Environment variables: Set in Vercel production

---

## Page-by-Page Review

### 1. Landing Page (`/`)
**URL:** https://arena-boxing.vercel.app

**Visual Elements:**
- [x] Cinematic hero video/image displays correctly
- [x] "Enter" button is visible and styled
- [x] Arena Boxing logo appears correctly
- [x] Page transitions smoothly to home page

**Functionality:**
- [x] Enter button navigates to `/home`
- [ ] Mobile responsive (test on phone)

**Notes:**
```
[Your notes here]
```

---

### 2. Home Page (`/home`)
**URL:** https://arena-boxing.vercel.app/home

**Visual Elements:**
- [ ] Hero banner displays with correct image
- [ ] "Book a Class" CTA button is prominent
- [ ] "Why Arena Boxing" section displays 3 values
- [ ] "Our Classes" section shows class types
- [ ] "Meet the Team" section displays trainer profiles
- [ ] Testimonials section (if applicable)
- [ ] Footer displays correctly

**Functionality:**
- [ ] Navigation menu works (all links clickable)
- [ ] "Book a Class" button navigates to `/booking`
- [ ] All section content is readable
- [ ] Mobile responsive (test on phone)

**Notes:**
```
[Your notes here]
```

---

### 3. Booking Page (`/booking`)
**URL:** https://arena-boxing.vercel.app/booking

**Visual Elements:**
- [ ] Hero banner displays correctly
- [ ] Hapana booking widget loads (real widget, not demo cards)
- [ ] Widget styling matches Arena Boxing brand
- [ ] Loading spinner appears briefly before widget loads

**Functionality:**
- [ ] Hapana widget displays real class/package data
- [ ] Can browse available sessions
- [ ] Booking flow initiates correctly
- [ ] Widget is mobile responsive

**Critical Test:**
- [ ] Verify this is LIVE mode (not demo mode with 6 fake cards)
- [ ] If demo mode still showing, check environment variables

**Notes:**
```
[Your notes here]
```

---

### 4. Timetable Page (`/timetable`)
**URL:** https://arena-boxing.vercel.app/timetable

**Visual Elements:**
- [ ] Hero banner displays correctly
- [ ] "Weekly Schedule" heading and description
- [ ] Hapana widget loads (classes view)
- [ ] "Class Types" section displays (Bootcamp, Technique, Sparring)

**Functionality:**
- [ ] Hapana widget shows real class schedule (not mock data)
- [ ] Can view class times and availability
- [ ] Widget is mobile responsive
- [ ] Class type cards are readable

**Critical Test:**
- [ ] Verify real Hapana classes display (not hardcoded mock data)
- [ ] Check dataType='classes' is working correctly

**Notes:**
```
[Your notes here]
```

---

### 5. Membership Page (`/membership`)
**URL:** https://arena-boxing.vercel.app/membership

**Visual Elements:**
- [ ] Hero banner displays correctly
- [ ] Membership tier cards display (likely 3 tiers)
- [ ] Pricing is clear and readable
- [ ] Features/benefits listed for each tier
- [ ] "Join Now" CTAs are visible

**Functionality:**
- [ ] Membership tier cards are interactive
- [ ] "Join Now" buttons work
- [ ] Mobile responsive layout
- [ ] All pricing information is correct

**Notes:**
```
[Your notes here]
```

---

### 6. About Page (`/about`)
**URL:** https://arena-boxing.vercel.app/about

**Visual Elements:**
- [ ] Hero banner displays correctly
- [ ] Gym philosophy/story section displays
- [ ] Team member profiles with photos
- [ ] Trainer bios are readable

**Functionality:**
- [ ] All images load correctly
- [ ] Text is properly formatted
- [ ] Mobile responsive layout

**Notes:**
```
[Your notes here]
```

---

### 7. Location/Contact Page (`/location`)
**URL:** https://arena-boxing.vercel.app/location

**Visual Elements:**
- [ ] Hero banner displays correctly
- [ ] Address information is visible
- [ ] Map embed displays (Google Maps or similar)
- [ ] Contact details (phone, email, hours)
- [ ] Contact form (if present)

**Functionality:**
- [ ] Map is interactive
- [ ] Contact form submits (if applicable)
- [ ] Links to phone/email work
- [ ] Mobile responsive layout

**Notes:**
```
[Your notes here]
```

---

### 8. FAQ Page (`/faq`)
**URL:** https://arena-boxing.vercel.app/faq

**Visual Elements:**
- [ ] Hero banner displays correctly
- [ ] FAQ items are organized clearly
- [ ] Accordion/expandable sections (if applicable)

**Functionality:**
- [ ] FAQ items expand/collapse correctly
- [ ] All questions and answers display
- [ ] Mobile responsive layout

**Notes:**
```
[Your notes here]
```

---

## Cross-Page Elements

### Navigation
- [ ] Logo links back to home
- [ ] All nav items work on every page
- [ ] Mobile menu (hamburger) works
- [ ] Active page is highlighted in nav

### Footer
- [ ] Displays on all pages
- [ ] Social media links work
- [ ] Contact information is correct
- [ ] Copyright year is current

### Brand Consistency
- [ ] Burgundy (#7D1E1E) used consistently
- [ ] Cream (#E8DDD3) used for backgrounds
- [ ] Display font (Bebas Neue) renders correctly
- [ ] Body text is readable
- [ ] Grunge texture overlays work

---

## Mobile Testing

**Test on actual devices:**
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet (iPad)

**Key mobile checks:**
- [ ] All pages scroll smoothly
- [ ] Hapana widgets are mobile responsive
- [ ] Navigation menu works on mobile
- [ ] Buttons are tappable (not too small)
- [ ] Images scale properly
- [ ] Text is readable (not too small)

---

## Performance

- [ ] Pages load quickly (under 3 seconds)
- [ ] No console errors (open browser DevTools)
- [ ] Images are optimized
- [ ] Hapana widget loads without delay

---

## Critical Issues

**Priority 1 (Must Fix Before Client Sees):**
```
[List any broken functionality, missing content, or visual issues]
```

**Priority 2 (Nice to Have):**
```
[List any minor improvements or polish items]
```

---

## Content Gaps

**Pages needing real content:**
- [ ] About page - Real trainer bios and photos
- [ ] Location page - Actual gym address and contact details
- [ ] Membership page - Finalized pricing
- [ ] FAQ page - Real questions from Arena Boxing

**Images needed:**
- [ ] Gym interior photos
- [ ] Trainer headshots
- [ ] Action shots of classes
- [ ] Equipment photos

---

## Next Steps

1. ✅ Complete this checklist page-by-page
2. ⏳ Document all issues in "Critical Issues" section
3. ⏳ Share checklist with Arena Boxing team for their review
4. ⏳ Collect real content from client (use CONTENT_COLLECTION_ARENA.md)
5. ⏳ Fix any critical issues discovered
6. ⏳ Final QA pass before client presentation

---

## Sign-Off

**Reviewed by:** _________________
**Date:** _________________
**Approved for client review:** [ ] Yes [ ] No

**Notes:**
```
[Final review notes]
```
