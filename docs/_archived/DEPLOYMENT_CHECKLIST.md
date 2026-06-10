# Vercel Deployment Checklist — Gym Website

## Overview

This guide walks you through deploying your Next.js gym website to Vercel, from initial setup to post-launch verification. Follow each section in order for a smooth production launch.

**Time Required:** 45-60 minutes (first deployment)
**Platform:** Vercel (optimized for Next.js)
**Cost:** Free tier available (upgrade as needed)

---

## Prerequisites

Before starting deployment:

- [ ] GitHub account with repository access
- [ ] Vercel account (sign up at https://vercel.com)
- [ ] Domain name purchased (or use free .vercel.app subdomain)
- [ ] All environment variables documented
- [ ] Google Analytics ID obtained (if using analytics)
- [ ] Hapana Widget ID obtained (if using booking system)

---

## Phase 1: Pre-Deployment Preparation

### 1.1 Local Build Verification

**Test that your site builds without errors:**

```bash
cd /path/to/your-gym-website
npm run build
```

**Expected output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                              Size
┌ ○ /                                    XXX kB
├ ○ /about                               XXX kB
├ ○ /booking                             XXX kB
...
```

**If build fails:**
- Fix TypeScript errors shown in output
- Resolve missing image references
- Check all imports are correct
- Re-run `npm run build` until successful

### 1.2 Environment Variables Audit

**Create a checklist of all required environment variables:**

```bash
# View your .env.local file
cat .env.local

# View the template
cat .env.example
```

**Required variables for production:**
- [ ] `NEXT_PUBLIC_SITE_URL` - Your production domain
- [ ] `NEXT_PUBLIC_GA_ID` - Google Analytics measurement ID
- [ ] `NEXT_PUBLIC_HAPANA_WIDGET_ID` - Hapana booking widget ID
- [ ] `NEXT_PUBLIC_HAPANA_MODE` - Set to `production`
- [ ] `RESEND_API_KEY` - Email service API key (if using Resend)
- [ ] `CONTACT_EMAIL` - Your gym's contact email

**Create a temporary file with production values:**
```bash
# Save to deployment_env_vars.txt (DO NOT COMMIT THIS FILE)
NEXT_PUBLIC_SITE_URL=https://arenaboxing.com.au
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HAPANA_WIDGET_ID=your_real_widget_id
NEXT_PUBLIC_HAPANA_MODE=production
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL=info@arenaboxing.com.au
```

**Security check:**
- [ ] Add `deployment_env_vars.txt` to `.gitignore`
- [ ] Never commit production secrets to Git
- [ ] Delete this file after deployment

### 1.3 Metadata Update

**Update production-specific metadata:**

**File:** `app/layout.tsx`

**Check these values match your production domain:**
```typescript
// Line 14
metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://arena-boxing-demo.local')

// Line 31 (OpenGraph URL)
url: "https://arenaboxing.com.au", // ← Update to your domain

// Line 43 (Twitter creator)
creator: "@arenaboxing", // ← Update to your gym's Twitter handle
```

**Make these changes:**
1. Update OpenGraph `url` to match your production domain
2. Update Twitter `creator` handle (or remove if no Twitter account)
3. Ensure `metadataBase` reads from `NEXT_PUBLIC_SITE_URL` (already correct)

### 1.4 Social Share Image

**Verify og-image exists and meets requirements:**

```bash
# Check image exists
ls -lh public/images/og-image.jpg

# Check dimensions (requires ImageMagick: brew install imagemagick)
identify public/images/og-image.jpg
# Expected: og-image.jpg JPEG 1200x630
```

**Image requirements:**
- Dimensions: 1200x630px
- Format: JPG, PNG, or WebP
- File size: < 1MB (recommended)
- Content: Branding visible at thumbnail size

**If image doesn't exist or wrong size:**
- Create 1200x630px branded image
- Save as `/public/images/og-image.jpg`
- Include gym logo, tagline, and high-contrast design

### 1.5 Git Commit & Push

**Ensure all changes are committed:**

```bash
# Check status
git status

# Add all changes
git add .

# Commit with descriptive message
git commit -m "Prepare for production deployment - update metadata and env config"

# Push to GitHub
git push origin main
```

**Verify on GitHub:**
- Go to your repository on GitHub.com
- Confirm latest commit appears
- Check all files are present

---

## Phase 2: Vercel Setup

### 2.1 Create Vercel Project

1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your gym website repository
5. Click **"Import"**

### 2.2 Configure Project Settings

**Framework Preset:**
- Should auto-detect: "Next.js"
- Root Directory: `./` (leave default)
- Build Command: `npm run build` (auto-filled)
- Output Directory: `.next` (auto-filled)

**Environment Variables:**

Click **"Environment Variables"** section.

Add each variable from your `deployment_env_vars.txt` file:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-gym-domain.com` | Production |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Production |
| `NEXT_PUBLIC_HAPANA_WIDGET_ID` | `your_widget_id` | Production |
| `NEXT_PUBLIC_HAPANA_MODE` | `production` | Production |
| `RESEND_API_KEY` | `re_your_api_key` | Production |
| `CONTACT_EMAIL` | `info@yourgym.com` | Production |

**Important:**
- Click **"Add"** after each variable
- For `NEXT_PUBLIC_*` variables, they must be added before build
- Non-public secrets (API keys) don't need `NEXT_PUBLIC_` prefix

### 2.3 Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-5 minutes)
3. **Expected output:**
   - ✓ Building
   - ✓ Uploading Build Output
   - ✓ Assigning Custom Domains
   - ✓ Deployment Ready

**If deployment fails:**
- Click on the build log
- Read error messages (usually TypeScript or build errors)
- Fix locally, commit, push (Vercel auto-redeploys)

### 2.4 Get Vercel Preview URL

Once deployed successfully:
- You'll see a URL like: `https://your-gym-website-abc123.vercel.app`
- This is your temporary preview domain
- Use this for testing before connecting custom domain

---

## Phase 3: Custom Domain Setup (Optional)

Skip this section if using Vercel's free `.vercel.app` domain.

### 3.1 Add Custom Domain

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Enter your domain (e.g., `arenaboxing.com.au`)
4. Click **Add**

### 3.2 Configure DNS

Vercel will show you DNS records to add.

**Option A: Vercel Nameservers (Recommended)**
1. Update nameservers at your domain registrar (e.g., Namecheap, GoDaddy)
2. Point to Vercel nameservers shown on screen
3. Wait 24-48 hours for propagation

**Option B: A/CNAME Records**
1. Add A record: `@ → 76.76.21.21` (Vercel IP)
2. Add CNAME record: `www → cname.vercel-dns.com`
3. Wait 1-2 hours for propagation

### 3.3 SSL Certificate

**Automatic (Vercel handles this):**
- Vercel automatically provisions SSL certificate
- Usually takes 5-10 minutes after DNS propagates
- Check status in Domains tab (should show "Valid Certificate")

**If SSL fails:**
- Verify DNS records are correct
- Wait 30 minutes and refresh
- Contact Vercel support if issue persists

### 3.4 Verify Domain

```bash
# Test domain resolves
dig arenaboxing.com.au

# Test HTTPS works
curl -I https://arenaboxing.com.au
```

**Expected response:**
```
HTTP/2 200
```

---

## Phase 4: Pre-Launch QA Checklist

### 4.1 Routes & Pages

Test every page loads correctly:

**Pages to test:**
- [ ] Homepage: `https://your-domain.com/`
- [ ] Home (alternative): `https://your-domain.com/home`
- [ ] Timetable: `https://your-domain.com/timetable`
- [ ] Membership: `https://your-domain.com/membership`
- [ ] Booking: `https://your-domain.com/booking`
- [ ] About: `https://your-domain.com/about`
- [ ] Location: `https://your-domain.com/location`
- [ ] FAQ: `https://your-domain.com/faq`

**For each page, verify:**
- [ ] Page loads (HTTP 200)
- [ ] No console errors (open DevTools → Console)
- [ ] Images load correctly
- [ ] Text is readable
- [ ] Mobile view looks correct (test on phone or DevTools mobile emulator)

### 4.2 Forms & Interactions

**Contact Form (if applicable):**
- [ ] Fill out form with test data
- [ ] Submit form
- [ ] Verify submission success message
- [ ] Check email arrives at `CONTACT_EMAIL`
- [ ] Verify no errors in browser console

**Hapana Booking Widget:**
- [ ] Navigate to `/booking`
- [ ] Verify real Hapana widget loads (not demo mode)
- [ ] Check widget shows correct classes/schedule
- [ ] Test booking flow (click class, view details)
- [ ] DO NOT complete test booking (or cancel immediately)

**Navigation:**
- [ ] Click all menu links
- [ ] Test mobile hamburger menu (if applicable)
- [ ] Verify smooth scroll to sections (if using anchor links)
- [ ] Test "Book Now" CTA buttons

### 4.3 Metadata & SEO

**Open Graph (Social Sharing):**

Test social share preview:
1. Go to https://developers.facebook.com/tools/debug/
2. Enter your homepage URL
3. Click **"Debug"**
4. **Verify:**
   - [ ] Title: "Arena Boxing Bondi | Those Who Dare"
   - [ ] Description appears correctly
   - [ ] og:image shows correctly (1200x630px branded image)

**Twitter Card:**
1. Go to https://cards-dev.twitter.com/validator
2. Enter your homepage URL
3. **Verify:**
   - [ ] Card type: "summary_large_image"
   - [ ] Image displays correctly
   - [ ] Title and description correct

**Meta Tags:**
```bash
# Check meta tags in page source
curl https://your-domain.com | grep "<meta"
```

**Verify these tags exist:**
- [ ] `<meta name="description" content="..."`
- [ ] `<meta property="og:title" content="..."`
- [ ] `<meta property="og:image" content="https://your-domain.com/images/og-image.jpg"`
- [ ] `<meta name="twitter:card" content="summary_large_image"`

### 4.4 Analytics Verification

**Google Analytics:**
1. Go to https://analytics.google.com
2. Select your property
3. Click **Reports** → **Realtime**
4. Open your website in new tab
5. Navigate around (click 3-4 pages)
6. **Verify:**
   - [ ] You appear in "Users by page title and screen name"
   - [ ] Page views increment
   - [ ] Events fire (if you implemented custom events)

**Test custom events (if implemented):**
- [ ] Navigate to `/booking` → Check `view_booking_page` event
- [ ] Click phone number → Check `click_phone` event
- [ ] Submit contact form → Check `submit_contact_form` event

### 4.5 Performance Check

**PageSpeed Insights:**
1. Go to https://pagespeed.web.dev/
2. Enter your homepage URL
3. Run analysis (mobile + desktop)

**Target scores:**
- [ ] Performance: 70+ (mobile), 90+ (desktop)
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+
- [ ] SEO: 90+

**If scores are low:**
- Optimize images (compress, use WebP format)
- Remove unused CSS/JS
- Enable Vercel Analytics for detailed insights
- Consider lazy loading images below fold

**Quick mobile test:**
```bash
# Use Lighthouse CLI (requires Node.js)
npx lighthouse https://your-domain.com --only-categories=performance --preset=mobile --view
```

### 4.6 Cross-Browser Testing

Test on major browsers:
- [ ] Chrome (desktop + mobile)
- [ ] Safari (desktop + mobile iOS)
- [ ] Firefox (desktop)
- [ ] Edge (desktop)

**Quick test checklist per browser:**
- [ ] Homepage loads
- [ ] Forms work
- [ ] Booking widget loads
- [ ] No console errors

### 4.7 Security Headers

**Check security headers:**
```bash
curl -I https://your-domain.com | grep -E "X-|Content-Security-Policy|Strict-Transport-Security"
```

**Expected headers (Vercel adds automatically):**
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security: max-age=...`

---

## Phase 5: Post-Launch Verification

### 5.1 Monitor Initial Traffic (First 24 Hours)

**Google Analytics - Realtime:**
- [ ] Check hourly for first 6 hours
- [ ] Verify users appear in Realtime report
- [ ] Confirm events are firing correctly
- [ ] Check no pages show high exit rates

**Vercel Analytics:**
1. Go to Vercel dashboard → Your project
2. Click **Analytics** tab
3. **Monitor:**
   - [ ] Pageviews increasing
   - [ ] No 4xx/5xx errors
   - [ ] Average response time < 1s

### 5.2 Error Monitoring

**Check for errors:**

**Vercel Logs:**
1. Dashboard → Your project → **Logs**
2. Filter by: "Errors"
3. **Investigate any:**
   - Runtime errors (500 errors)
   - Build errors (shouldn't appear post-deploy)
   - API route errors

**Browser Console Errors:**
- Visit each page
- Open DevTools → Console
- Check for JavaScript errors (red text)
- Fix any errors found

### 5.3 Search Console Setup

**Add site to Google Search Console:**

1. Go to https://search.google.com/search-console
2. Click **"Add property"**
3. Enter your domain: `arenaboxing.com.au`
4. Choose verification method:
   - **Recommended:** HTML tag (add to `app/layout.tsx` metadata)
   - Alternative: DNS TXT record
5. Complete verification

**Submit sitemap:**
1. In Search Console, go to **Sitemaps**
2. Enter sitemap URL: `https://your-domain.com/sitemap.xml`
3. Click **"Submit"**

**Wait 24-48 hours**, then check:
- [ ] Pages indexed
- [ ] No crawl errors
- [ ] Mobile usability issues (should be none)

### 5.4 Social Share Verification

**Test social sharing on live platforms:**

**Facebook:**
1. Create a test post with your homepage URL
2. Verify correct image, title, description appear
3. Delete post (or keep if you want to announce launch)

**Instagram Stories (if linked):**
1. Post story with website link sticker
2. Tap link → verify opens correctly
3. Check mobile experience

**LinkedIn:**
1. Create test post with URL
2. Verify preview looks professional
3. Delete or publish

### 5.5 Booking System Live Test

**Test full booking flow:**
- [ ] Navigate to booking page
- [ ] Select a class
- [ ] Proceed through Hapana widget
- [ ] Complete test booking (use real card or test mode if available)
- [ ] Verify confirmation email received
- [ ] Cancel test booking in Hapana dashboard

**If using Hapana:**
- [ ] Verify webhook is receiving data (check Hapana dashboard)
- [ ] Test on mobile device
- [ ] Confirm classes sync from Hapana backend

### 5.6 Email Deliverability

**If using contact form + Resend:**

**Test email delivery:**
1. Submit contact form from production site
2. Check email arrives at `CONTACT_EMAIL`
3. Check spam folder if not in inbox
4. Verify sender domain (should be your domain if SPF/DKIM configured)

**Check Resend dashboard:**
1. Go to https://resend.com/dashboard
2. Click **Emails**
3. Verify email shows as "Delivered"
4. Check for bounces or errors

**If emails not delivering:**
- Check `RESEND_API_KEY` is correct in Vercel env vars
- Verify domain SPF/DKIM records (if using custom domain)
- Check Resend account is not rate-limited

### 5.7 Uptime Monitoring (Optional)

**Set up free uptime monitoring:**

**Option A: UptimeRobot (Free)**
1. Sign up at https://uptimerobot.com
2. Add new monitor:
   - Type: HTTP(s)
   - URL: `https://your-domain.com`
   - Interval: 5 minutes
3. Add alert email

**Option B: Vercel Pro Plan**
- Includes built-in uptime monitoring
- Alerts via email or Slack

### 5.8 Performance Baseline

**Establish baseline metrics:**

**Run initial performance tests:**
```bash
# Homepage performance
npx lighthouse https://your-domain.com --output=json --output-path=./baseline-homepage.json

# Booking page performance
npx lighthouse https://your-domain.com/booking --output=json --output-path=./baseline-booking.json
```

**Record baseline scores:**
- [ ] Homepage Performance: ___/100
- [ ] Homepage Accessibility: ___/100
- [ ] Booking Page Performance: ___/100
- [ ] Booking Page LCP: ___ seconds

**Re-run monthly** to track performance trends.

---

## Phase 6: Ongoing Maintenance

### Weekly Checks

- [ ] Check Google Analytics for traffic trends
- [ ] Review Vercel Analytics for errors
- [ ] Test booking widget still works
- [ ] Check Search Console for new issues

### Monthly Tasks

- [ ] Review PageSpeed Insights scores
- [ ] Update dependencies: `npm update`
- [ ] Check for Next.js updates
- [ ] Review analytics conversion rates
- [ ] Audit website content for freshness

### Quarterly Reviews

- [ ] Security audit (dependencies with known vulnerabilities)
- [ ] SEO performance review
- [ ] User feedback analysis
- [ ] Consider A/B testing improvements

---

## Rollback Procedure (Emergency)

**If critical issue found post-launch:**

### Option 1: Instant Rollback via Vercel

1. Go to Vercel dashboard → Your project
2. Click **Deployments**
3. Find previous working deployment
4. Click **⋯ (three dots)** → **"Promote to Production"**
5. Previous version now live (takes ~30 seconds)

### Option 2: Git Revert + Redeploy

```bash
# Revert to last working commit
git log --oneline # find commit hash
git revert <commit-hash>
git push origin main
# Vercel auto-deploys reverted version
```

### Option 3: Emergency Maintenance Page

```bash
# Create app/maintenance/page.tsx
export default function Maintenance() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1>Scheduled Maintenance</h1>
        <p>We'll be back shortly. Contact us at [phone].</p>
      </div>
    </div>
  )
}
```

```bash
# Redirect all traffic (in next.config.js)
module.exports = {
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: '/maintenance',
        permanent: false,
      },
    ]
  },
}
```

---

## Troubleshooting Common Issues

### Issue: Environment variables not loading

**Symptoms:** Hapana widget not loading, analytics not tracking, forms not working

**Solution:**
1. Go to Vercel dashboard → Project → Settings → Environment Variables
2. Verify all `NEXT_PUBLIC_*` variables are set
3. Trigger redeploy: Deployments → Latest → ⋯ → Redeploy
4. Wait 2-3 minutes for rebuild

### Issue: 404 errors on direct navigation

**Symptoms:** Pages work when clicking links, but return 404 when accessing directly

**Solution:**
- This shouldn't happen with Next.js App Router
- Check `app/` directory structure matches routes
- Verify all pages have `page.tsx` file
- Redeploy

### Issue: Images not loading

**Symptoms:** Broken image icons, 404 errors for images

**Solution:**
```bash
# Check images exist locally
ls public/images/

# Check image paths in code (should be /images/filename.jpg)
grep -r "public/images" app/
# ❌ Wrong: src="/public/images/photo.jpg"
# ✅ Correct: src="/images/photo.jpg"
```

### Issue: Slow page loads

**Symptoms:** Pages take >3 seconds to load

**Solutions:**
1. **Optimize images:**
   ```bash
   # Install image optimizer
   npm install sharp

   # Use next/image component
   import Image from 'next/image'
   ```

2. **Enable Vercel caching:**
   - Vercel automatically caches static assets
   - Check Network tab in DevTools (should see `cf-cache-status: HIT`)

3. **Lazy load components:**
   ```typescript
   import dynamic from 'next/dynamic'
   const HapanaWidget = dynamic(() => import('@/components/HapanaWidget'), {
     loading: () => <p>Loading...</p>,
   })
   ```

### Issue: Form submissions not working

**Symptoms:** Form submits but no email received

**Check:**
1. Verify `RESEND_API_KEY` in Vercel env vars
2. Check Resend dashboard for delivery status
3. Check spam folder
4. Verify API route exists: `app/api/contact/route.ts`
5. Check Vercel function logs for errors

### Issue: Metadata not updating on social platforms

**Symptoms:** Old image/title showing when sharing

**Solution:**
1. Verify metadata updated in `app/layout.tsx`
2. Redeploy to Vercel
3. Clear social platform cache:
   - Facebook: https://developers.facebook.com/tools/debug/ → "Scrape Again"
   - Twitter: https://cards-dev.twitter.com/validator → Re-validate
   - LinkedIn: https://www.linkedin.com/post-inspector/ → Inspect again

---

## Success Criteria

Your deployment is complete and successful when:

- [ ] All 8 pages load without errors
- [ ] Forms submit successfully
- [ ] Hapana booking widget loads in production mode
- [ ] Google Analytics shows real-time data
- [ ] Social share previews show correct image/metadata
- [ ] Custom domain SSL certificate valid
- [ ] PageSpeed score >70 (mobile), >90 (desktop)
- [ ] No console errors on any page
- [ ] Mobile experience smooth on iOS and Android
- [ ] Search Console successfully crawling site

---

## Quick Reference: Vercel Commands

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy from terminal (alternative to GitHub auto-deploy)
vercel --prod

# View deployment logs
vercel logs <deployment-url>

# List all deployments
vercel ls

# Open Vercel dashboard for current project
vercel

# Add environment variable via CLI
vercel env add NEXT_PUBLIC_SITE_URL production
```

---

## Resources

**Vercel Documentation:**
- Deployment: https://vercel.com/docs/concepts/deployments/overview
- Custom Domains: https://vercel.com/docs/concepts/projects/domains
- Environment Variables: https://vercel.com/docs/concepts/projects/environment-variables
- Analytics: https://vercel.com/docs/analytics

**Next.js Deployment:**
- Vercel Deployment Guide: https://nextjs.org/docs/deployment
- Environment Variables: https://nextjs.org/docs/basic-features/environment-variables

**Testing Tools:**
- PageSpeed Insights: https://pagespeed.web.dev/
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- Lighthouse CLI: https://github.com/GoogleChrome/lighthouse

---

**Document Version:** 1.0
**Last Updated:** November 19, 2025
**Compatible With:** Next.js 14+, Vercel
**Reusable For:** All Next.js gym/fitness websites

---

## Appendix: Environment Variables Template

Copy this checklist when deploying future gym websites:

```bash
# Production Environment Variables Checklist

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://__________.com.au

# Analytics
NEXT_PUBLIC_GA_ID=G-__________

# Booking System
NEXT_PUBLIC_HAPANA_WIDGET_ID=__________
NEXT_PUBLIC_HAPANA_MODE=production
NEXT_PUBLIC_HAPANA_SCRIPT_URL=https://widget.hapana.com/hapana_widget.js

# Email Service
RESEND_API_KEY=re___________
CONTACT_EMAIL=info@__________.com.au

# Optional: Webhooks
HAPANA_WEBHOOK_SECRET=__________ (if using webhooks)
```

**Add each to Vercel:**
Settings → Environment Variables → Add each individually → Select "Production" environment → Save
