# Arena Boxing - Deployment & SEO Metadata Guide

## Overview
This document explains how metadata, SEO, and social sharing are configured for the Arena Boxing website, and what changes are required before production deployment.

---

## 1. Metadata Base URL

### Current Configuration
**File:** `/app/layout.tsx` (line 14)

```typescript
metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://arena-boxing-demo.local')
```

### What It Does
The `metadataBase` property tells Next.js how to resolve relative URLs in metadata fields (like social share images). It's used to construct absolute URLs for:
- Open Graph images (`og:image`)
- Twitter Card images (`twitter:image`)
- Canonical URLs
- Sitemap entries

### What Needs to Change for Production

**Before Deployment:**
1. Set the `NEXT_PUBLIC_SITE_URL` environment variable in your deployment platform (Vercel/Netlify/etc.)
2. Use your actual production domain

**Vercel Example:**
```bash
# In Vercel Dashboard → Project Settings → Environment Variables
NEXT_PUBLIC_SITE_URL=https://arenaboxing.com.au
```

**Local Development:**
Create `.env.local` and add:
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Fallback Behavior
If `NEXT_PUBLIC_SITE_URL` is not set, it defaults to `https://arena-boxing-demo.local` (a safe non-production placeholder).

---

## 2. Social Share Images (Open Graph & Twitter)

### Image Location
**Path:** `/public/images/og-image.jpg`

### Current Configuration
```typescript
openGraph: {
  images: [
    {
      url: "/images/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Arena Boxing Bondi - Those Who Dare",
    },
  ],
}
```

### How It Resolves
With `metadataBase` set:
- **Development:** `http://localhost:3000/images/og-image.jpg`
- **Production:** `https://arenaboxing.com.au/images/og-image.jpg`

### Image Requirements
- **Dimensions:** 1200x630px (Facebook/LinkedIn standard)
- **Format:** JPG, PNG, or WebP
- **Size:** < 5MB (recommended < 1MB)
- **Content:** Should include branding, tagline, and be readable at small sizes

### Testing Social Shares
Use these tools to verify your og:image appears correctly:
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **LinkedIn Inspector:** https://www.linkedin.com/post-inspector/

**Steps:**
1. Deploy to production or use a public staging URL
2. Enter your page URL in the tool
3. Verify image loads and displays correctly
4. Use "Scrape Again" if you update the image

---

## 3. SEO-Critical Metadata Fields

### Title Template
**Location:** `/app/layout.tsx` (line 15-17)

```typescript
title: {
  default: "Arena Boxing Bondi | Those Who Dare",
  template: "%s | Arena Boxing Bondi",
}
```

**How It Works:**
- **Homepage:** Uses `default` → "Arena Boxing Bondi | Those Who Dare"
- **Other Pages:** Uses `template` → e.g., "Membership | Arena Boxing Bondi"

**To Override on Specific Pages:**
```typescript
// In app/membership/page.tsx
export const metadata = {
  title: "Premium Memberships",
  // Will render as "Premium Memberships | Arena Boxing Bondi"
}
```

### Description
**Location:** `/app/layout.tsx` (line 19)

```typescript
description: "Bondi's premier combat sports experience. Gothic fight culture meets boutique boxing. Those who dare, enter the arena."
```

**Character Limits:**
- **Google:** ~150-160 characters (current: 119 ✓)
- **Social:** ~200 characters max

**Best Practices:**
- Include primary keywords: "boxing", "Bondi", "combat sports"
- Match search intent
- Write for humans, not just search engines
- Can be overridden per-page

### Keywords
**Location:** `/app/layout.tsx` (line 20)

```typescript
keywords: ["boxing", "fitness", "bondi", "gym", "combat sports", "HIIT", "training"]
```

**Note:** Google doesn't use meta keywords for ranking, but other search engines might. Keep for completeness.

---

## 4. Open Graph Metadata

### Current Configuration
```typescript
openGraph: {
  type: "website",
  locale: "en_AU",
  url: "https://arenaboxing.com.au",
  siteName: "Arena Boxing Bondi",
  title: "Arena Boxing Bondi | Those Who Dare",
  description: "Bondi's premier combat sports experience. Gothic fight culture meets boutique boxing.",
  images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Arena Boxing Bondi - Those Who Dare" }],
}
```

### What Needs to Change
**Before Production:**
- Update `url` to match your actual domain (currently hardcoded to `arenaboxing.com.au`)
- Ensure this matches `NEXT_PUBLIC_SITE_URL`

**Per-Page Overrides:**
```typescript
// Example: app/membership/page.tsx
export const metadata = {
  openGraph: {
    title: "Premium Memberships - Arena Boxing",
    description: "Unlimited access to Bondi's most exclusive combat sports gym.",
    images: [{ url: "/images/membership-og.jpg" }],
  },
}
```

---

## 5. Twitter Card Metadata

### Current Configuration
```typescript
twitter: {
  card: "summary_large_image",
  title: "Arena Boxing Bondi | Those Who Dare",
  description: "Bondi's premier combat sports experience. Gothic fight culture meets boutique boxing.",
  images: ["/images/og-image.jpg"],
  creator: "@arenaboxing",
}
```

### Card Types
- **`summary_large_image`** (current): Full-width image with title/description
- **`summary`**: Square thumbnail with title/description
- **`player`**: For video/audio content
- **`app`**: For mobile apps

### What Needs to Change
**Before Production:**
- Verify Twitter handle `@arenaboxing` is correct (or update to actual handle)
- If no Twitter account exists, remove the `creator` field

---

## 6. Robots & Crawling

### Current Configuration
```typescript
robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}
```

### What It Does
- **`index: true`** - Allow search engines to index pages
- **`follow: true`** - Allow crawlers to follow links
- **`max-video-preview: -1`** - No limit on video preview length
- **`max-image-preview: 'large'`** - Show large image previews in search results
- **`max-snippet: -1`** - No limit on text snippet length

### Before Launch Checklist
**Development/Staging:**
Set `index: false` to prevent indexing:
```typescript
robots: {
  index: false,
  follow: false,
}
```

**Production:**
Ensure `index: true` (current setting is correct)

---

## 7. Search Console Verification

### Current Setup
**Location:** `/app/layout.tsx` (line 56-60)

```typescript
verification: {
  // Add your verification codes when available
  // google: 'your-google-site-verification',
  // yandex: 'your-yandex-verification',
}
```

### How to Add Verification Codes

**Google Search Console:**
1. Go to https://search.google.com/search-console
2. Add property → Enter your domain
3. Choose "HTML tag" verification method
4. Copy the `content` value (e.g., `abc123xyz`)
5. Add to metadata:
   ```typescript
   verification: {
     google: 'abc123xyz',
   }
   ```

**Bing Webmaster Tools:**
```typescript
verification: {
  google: 'your-code',
  microsoft: 'your-bing-code', // Add this
}
```

**Yandex Webmaster:**
```typescript
verification: {
  google: 'your-code',
  yandex: 'your-yandex-code', // Add this
}
```

---

## 8. Canonical URLs

### Current Status
**Not currently configured** (using defaults)

### What Are Canonical URLs?
Canonical URLs tell search engines which version of a page is the "main" one, preventing duplicate content issues.

### When to Add
If you have:
- Multiple domains pointing to the same site
- HTTP and HTTPS versions
- www and non-www versions
- URL parameters (e.g., `?utm_source=facebook`)

### How to Add
```typescript
// In app/layout.tsx or per-page metadata
export const metadata = {
  alternates: {
    canonical: 'https://arenaboxing.com.au',
  },
}
```

### Per-Page Example
```typescript
// app/membership/page.tsx
export const metadata = {
  alternates: {
    canonical: 'https://arenaboxing.com.au/membership',
  },
}
```

---

## 9. Structured Data (JSON-LD)

### Current Status
**Not currently implemented**

### Recommended Structured Data
For a boxing gym website, consider adding:

**LocalBusiness Schema:**
```typescript
// Add to app/layout.tsx or a component
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "name": "Arena Boxing Bondi",
  "description": "Bondi's premier combat sports experience",
  "url": "https://arenaboxing.com.au",
  "telephone": "+61-2-XXXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Campbell Parade",
    "addressLocality": "Bondi Beach",
    "addressRegion": "NSW",
    "postalCode": "2026",
    "addressCountry": "AU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -33.8915,
    "longitude": 151.2767
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "06:00",
      "closes": "21:00"
    }
  ],
  "image": "https://arenaboxing.com.au/images/og-image.jpg",
  "priceRange": "$$"
}
```

**Add to HTML:**
```typescript
// In app/layout.tsx <head>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
/>
```

---

## 10. Pre-Deployment Checklist

### Environment Variables
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production domain in deployment platform
- [ ] Verify all env vars in `.env.example` are set in production
- [ ] Test metadata with `process.env.NEXT_PUBLIC_SITE_URL` populated

### Metadata
- [ ] Update OpenGraph `url` field to match production domain
- [ ] Verify Twitter handle `@arenaboxing` is correct
- [ ] Replace placeholder og-image.jpg with final branded image
- [ ] Add Google Search Console verification code
- [ ] Set `robots.index: true` for production (already correct)

### Testing
- [ ] Build production version: `npm run build`
- [ ] Test all pages render metadata correctly
- [ ] Use Facebook Debugger to verify og:image
- [ ] Use Twitter Card Validator to verify twitter:image
- [ ] Check meta tags in browser DevTools → Elements → `<head>`

### Post-Deployment
- [ ] Submit sitemap to Google Search Console: `https://arenaboxing.com.au/sitemap.xml`
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Monitor search console for crawl errors
- [ ] Verify social shares work on Facebook, Twitter, LinkedIn

---

## 11. Quick Reference: File Locations

| What | File | Line |
|------|------|------|
| metadataBase | `/app/layout.tsx` | 14 |
| Title template | `/app/layout.tsx` | 15-17 |
| Description | `/app/layout.tsx` | 19 |
| Keywords | `/app/layout.tsx` | 20 |
| Open Graph | `/app/layout.tsx` | 22-36 |
| Twitter Card | `/app/layout.tsx` | 38-44 |
| Robots | `/app/layout.tsx` | 45-55 |
| Verification | `/app/layout.tsx` | 56-60 |
| OG Image | `/public/images/og-image.jpg` | - |
| Env Template | `/.env.example` | 24-26 |

---

## 12. Common Issues & Solutions

### Issue: Social share images not showing
**Cause:** `metadataBase` not set or incorrect
**Solution:**
1. Set `NEXT_PUBLIC_SITE_URL` environment variable
2. Rebuild and redeploy
3. Clear Facebook/Twitter cache using their debug tools

### Issue: Wrong domain in og:url
**Cause:** Hardcoded URL in OpenGraph config
**Solution:** Update `openGraph.url` in `/app/layout.tsx` to match production domain

### Issue: Search engines not indexing site
**Cause:** `robots.index: false` or missing verification
**Solution:**
1. Verify `robots.index: true` in production
2. Add site to Google Search Console
3. Submit sitemap
4. Check for `noindex` tags in page source

### Issue: Metadata not updating after deploy
**Cause:** Build cache or CDN cache
**Solution:**
1. Clear Next.js cache: `rm -rf .next`
2. Rebuild: `npm run build`
3. Purge CDN cache (Vercel does this automatically)
4. Use social debugger tools to force re-scrape

---

## Support Resources

- **Next.js Metadata Docs:** https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- **Open Graph Protocol:** https://ogp.me/
- **Twitter Cards:** https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards
- **Schema.org:** https://schema.org/
- **Google Search Console:** https://search.google.com/search-console
