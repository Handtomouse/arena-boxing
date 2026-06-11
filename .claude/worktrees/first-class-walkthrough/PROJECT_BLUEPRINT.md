# Arena Boxing - Project Blueprint

> **Next.js 14 + App Router + TypeScript + Tailwind CSS + Vercel**
> Gothic/Grunge Boxing Gym Website with Hapana Integration

---

## 📁 Directory Structure

```
arena-boxing/
├── app/                          # Next.js 14 App Router
│   ├── (marketing)/              # Route group: public marketing pages
│   │   ├── page.tsx              # Landing page (/)
│   │   ├── home/                 # Homepage (/home)
│   │   ├── classes/              # Classes page with Hapana embed
│   │   ├── manifesto/            # Brand story
│   │   ├── fighters/             # Community/testimonials
│   │   └── contact/              # Contact form
│   ├── api/                      # API routes
│   │   ├── contact/route.ts      # Contact form submission
│   │   ├── webhook/              # Hapana webhooks
│   │   └── health/route.ts       # Health check endpoint
│   ├── layout.tsx                # Root layout (Navigation, fonts, metadata)
│   ├── globals.css               # Global styles + Tailwind + animations
│   ├── error.tsx                 # Error boundary
│   ├── not-found.tsx             # 404 page
│   └── loading.tsx               # Loading states
├── components/
│   ├── Landing.tsx               # Landing page component
│   ├── ui/                       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── Input.tsx
│   ├── sections/                 # Page sections
│   │   ├── Hero.tsx
│   │   ├── Manifesto.tsx
│   │   ├── ClassesGrid.tsx
│   │   └── ContactForm.tsx
│   └── embeds/                   # External integrations
│       └── HapanaWidget.tsx      # Hapana booking widget wrapper
├── lib/                          # Utility functions
│   ├── utils.ts                  # General utilities
│   ├── api.ts                    # API helpers
│   ├── hapana.ts                 # Hapana SDK wrapper
│   └── constants.ts              # App constants
├── types/                        # TypeScript type definitions
│   ├── index.ts                  # Exported types
│   ├── api.ts                    # API types
│   └── hapana.ts                 # Hapana types
├── public/
│   ├── videos/                   # Brand videos
│   ├── images/                   # Brand assets (ASSET.jpg, etc.)
│   ├── textures/                 # Grunge textures
│   ├── sounds/                   # Audio effects
│   ├── cursors/                  # Custom cursors
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── .env.local                    # Environment variables (gitignored)
├── .env.example                  # Template for env vars
├── .eslintrc.json                # ESLint config
├── .prettierrc                   # Prettier config
├── .gitignore
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration (if needed)
├── tsconfig.json                 # TypeScript configuration
├── package.json
├── vercel.json                   # Vercel deployment config
└── PROJECT_BLUEPRINT.md          # This file
```

---

## 🎨 Styling Approach

**Hybrid: Tailwind CSS v4 + Inline Theme + CSS Modules for Complex Animations**

### 1. Tailwind CSS v4 (Primary)
- **Usage**: 90% of styling via utility classes
- **Config**: Using `@theme inline` in `globals.css` (no separate config file needed)
- **Custom Properties**: Arena brand colors, fonts, shadows defined in `:root`

### 2. CSS Modules (Secondary)
- **Usage**: Complex animations, component-specific styles
- **Pattern**: `ComponentName.module.css` alongside component files
- **Example**: Countdown progress ring, glitch effects

### 3. Inline Styles (Tertiary)
- **Usage**: Dynamic styles (mouse parallax, animation delays)
- **Pattern**: `style={{ ... }}` for runtime-calculated values

**Example from `globals.css`:**
```css
:root {
  --burgundy-primary: #7D1E1E;
  --cream-primary: #E8DDD3;
  --blood-red: #A31F1F;
}

@theme inline {
  --font-display: 'UnifrakturMaguntia', serif;
  --font-body: 'Inter', system-ui, sans-serif;
}

@keyframes glitch { /* ... */ }
.animate-glitch { animation: glitch 0.3s ease-in-out; }
```

---

## 🧩 Component Architecture

### UI Components (`components/ui/`)
**Presentational, reusable, fully typed**

- **Button.tsx**: Primary/secondary/outline variants, grunge texture overlay
- **Card.tsx**: Distressed borders, default/dark variants
- **Navigation.tsx**: Sticky header, mobile menu, brand logo
- **Footer.tsx**: Site links, social icons, legal
- **Input.tsx**: Form inputs with gothic styling

### Section Components (`components/sections/`)
**Composite, page-specific, business logic**

- **Hero.tsx**: Full-screen video background, CTA
- **ClassesGrid.tsx**: 10 Rounds, Fight Camp, Bondi Sessions cards
- **Manifesto.tsx**: Brand story, blockquote styling
- **ContactForm.tsx**: Form with validation, API submission

### Embed Components (`components/embeds/`)
**External service integrations**

- **HapanaWidget.tsx**: Hapana V2 Embed Widget wrapper with custom CSS overrides

**Component Pattern:**
```tsx
// Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      <span className="absolute inset-0 opacity-30 grunge-texture" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
```

---

## 🛣️ API Routes

### 1. Contact Form (`/api/contact/route.ts`)
**POST /api/contact**
- Validates form data (name, email, message, phone)
- Sends email via Resend or SendGrid
- Rate limiting (5 requests/minute per IP)
- Returns JSON response

```ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10).max(1000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // Send email via Resend
    await sendEmail(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
```

### 2. Hapana Webhook (`/api/webhook/hapana/route.ts`)
**POST /api/webhook/hapana**
- Receives booking confirmations from Hapana
- Verifies webhook signature
- Logs to database or sends confirmation emails
- Returns 200 OK

### 3. Health Check (`/api/health/route.ts`)
**GET /api/health**
- Returns service status
- Used by Vercel monitoring

---

## 🔗 Hapana Integration

### Overview
Hapana provides embeddable booking widgets for fitness studios. Arena uses **Hapana V2 Embed Widgets**.

### Implementation Strategy

#### 1. Widget Embedding (`components/embeds/HapanaWidget.tsx`)
```tsx
'use client';

import { useEffect } from 'react';

interface HapanaWidgetProps {
  widgetId: string;
  className?: string;
}

export default function HapanaWidget({ widgetId, className = '' }: HapanaWidgetProps) {
  useEffect(() => {
    // Load Hapana SDK
    const script = document.createElement('script');
    script.src = 'https://embed.hapana.com/v2/widget.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore - Hapana SDK types
      window.Hapana.init(widgetId);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [widgetId]);

  return (
    <div className={`hapana-widget-container ${className}`}>
      <div id={`hapana-widget-${widgetId}`} />
    </div>
  );
}
```

#### 2. Custom Styling Overrides
Add to `globals.css` to match Arena brand:
```css
/* Hapana Widget Gothic Overrides */
.hapana-widget-container {
  font-family: var(--font-body);
  --hapana-primary: var(--burgundy-primary);
  --hapana-secondary: var(--blood-red);
  --hapana-text: var(--cream-primary);
}

.hapana-widget-container .btn-primary {
  background: var(--burgundy-primary) !important;
  border: 2px solid var(--cream-primary) !important;
  font-family: var(--font-ui) !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
}
```

#### 3. Environment Variables
```env
NEXT_PUBLIC_HAPANA_WIDGET_ID=arena-boxing-bondi
HAPANA_WEBHOOK_SECRET=your_webhook_secret
```

#### 4. Usage in Pages
```tsx
// app/classes/page.tsx
import HapanaWidget from '@/components/embeds/HapanaWidget';

export default function ClassesPage() {
  return (
    <section>
      <h1>Book Your Trial</h1>
      <HapanaWidget
        widgetId={process.env.NEXT_PUBLIC_HAPANA_WIDGET_ID!}
        className="max-w-4xl mx-auto"
      />
    </section>
  );
}
```

---

## 🔒 Security & Performance

### Security Headers (`next.config.ts`)
```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },
  images: {
    domains: ['embed.hapana.com'], // Allow Hapana images
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
```

### Environment Variables
**`.env.local`** (gitignored):
```env
# Hapana
NEXT_PUBLIC_HAPANA_WIDGET_ID=arena-boxing-bondi
HAPANA_WEBHOOK_SECRET=your_webhook_secret_here

# Email Service (Resend)
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=info@arenaboxing.com.au

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**`.env.example`** (committed):
```env
NEXT_PUBLIC_HAPANA_WIDGET_ID=
HAPANA_WEBHOOK_SECRET=
RESEND_API_KEY=
CONTACT_EMAIL=
NEXT_PUBLIC_GA_ID=
```

### Performance Optimizations
1. **Video optimization**: Use MP4 with H.264 codec, max 1080p, 7.2Mbps
2. **Image optimization**: Next.js `<Image>` component with AVIF/WebP
3. **Font loading**: Use `next/font` for self-hosted fonts
4. **Code splitting**: Route-based automatic code splitting
5. **Static generation**: Pre-render marketing pages at build time
6. **CDN**: Vercel Edge Network for global distribution

---

## 🛠️ Linting & Formatting

### ESLint (`.eslintrc.json`)
```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### Prettier (`.prettierrc`)
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### Husky + lint-staged (Git Hooks)
```bash
# Pre-commit: Run linting and formatting
npx husky add .husky/pre-commit "npx lint-staged"
```

**`package.json` addition:**
```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

---

## 🚀 Deployment (Vercel)

### Vercel Configuration (`vercel.json`)
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["syd1"],
  "env": {
    "NEXT_PUBLIC_HAPANA_WIDGET_ID": "@hapana-widget-id",
    "HAPANA_WEBHOOK_SECRET": "@hapana-webhook-secret",
    "RESEND_API_KEY": "@resend-api-key"
  }
}
```

### Deployment Steps
1. **Connect GitHub**: Link `arena-boxing` repo to Vercel
2. **Configure environment variables**: Add secrets in Vercel dashboard
3. **Set build settings**:
   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`
   - Install command: `npm install`
4. **Custom domain**: Add `arenaboxing.com.au` (or desired domain)
5. **Enable analytics**: Vercel Analytics + Speed Insights

### CI/CD Pipeline
- **Push to `main`**: Auto-deploy to production
- **Push to `dev`**: Auto-deploy to preview environment
- **Pull requests**: Generate preview URLs for testing

---

## 📦 Starter Code Examples

### 1. Error Boundary (`app/error.tsx`)
```tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--charcoal-black)]">
      <div className="text-center">
        <h1 className="text-[var(--blood-red)] text-6xl mb-4">Error</h1>
        <p className="text-[var(--cream-primary)] mb-8">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-[var(--burgundy-primary)] text-[var(--cream-primary)] border-2 border-[var(--cream-primary)]"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
```

### 2. Loading State (`app/loading.tsx`)
```tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--charcoal-black)]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[var(--cream-primary)] border-t-[var(--blood-red)] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[var(--cream-dark)]">Loading...</p>
      </div>
    </div>
  );
}
```

### 3. 404 Page (`app/not-found.tsx`)
```tsx
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--charcoal-black)]">
      <div className="text-center">
        <Image src="/images/ASSET.jpg" alt="Arena" width={128} height={128} className="mx-auto mb-8 invert opacity-50" />
        <h1 className="text-[var(--blood-red)] text-8xl mb-4">404</h1>
        <p className="text-[var(--cream-primary)] text-2xl mb-8">Page Not Found</p>
        <Link
          href="/"
          className="px-8 py-4 bg-[var(--burgundy-primary)] text-[var(--cream-primary)] border-2 border-[var(--cream-primary)] uppercase tracking-wider hover:bg-[var(--blood-red)] transition-all"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
```

---

## 📋 Setup Checklist

### Initial Setup
- [x] Initialize Next.js 14 project
- [x] Configure Tailwind CSS v4
- [x] Set up TypeScript
- [x] Create directory structure
- [x] Implement design system (colors, fonts, animations)
- [x] Build landing page with 20 improvements

### Remaining Tasks
- [ ] Create remaining pages (classes, manifesto, fighters, contact)
- [ ] Implement API routes (contact form, health check)
- [ ] Integrate Hapana booking widget
- [ ] Set up environment variables
- [ ] Configure ESLint + Prettier
- [ ] Add Husky + lint-staged
- [ ] Create error/loading/404 pages
- [ ] Optimize images and videos
- [ ] Set up Vercel deployment
- [ ] Configure custom domain
- [ ] Add analytics (Vercel Analytics or Google Analytics)
- [ ] Test accessibility (WCAG AA compliance)
- [ ] Run Lighthouse audit (target: 90+ all metrics)
- [ ] Set up monitoring (Sentry or LogRocket)
- [ ] Create sitemap and robots.txt
- [ ] Implement SEO metadata for all pages

---

## 🎯 Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| **First Contentful Paint** | < 1.8s | TBD |
| **Largest Contentful Paint** | < 2.5s | TBD |
| **Time to Interactive** | < 3.8s | TBD |
| **Cumulative Layout Shift** | < 0.1 | TBD |
| **Total Blocking Time** | < 200ms | TBD |
| **Lighthouse Score** | 90+ | TBD |

---

## 📚 Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS v4**: https://tailwindcss.com/docs/v4-beta
- **Hapana Integration**: https://docs.hapana.com/embed
- **Vercel Deployment**: https://vercel.com/docs
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/

---

**Blueprint Version**: 1.0
**Last Updated**: 2025-11-17
**Author**: MrCC PAI
**Project**: Arena Boxing Bondi
