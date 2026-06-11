#!/bin/bash

# Arena Boxing - Project Setup Script
# This script configures the complete development environment

set -e  # Exit on error

echo "🥊 Arena Boxing - Project Setup"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running from project root
if [ ! -f "package.json" ]; then
  echo -e "${RED}Error: Must run from project root directory${NC}"
  exit 1
fi

# Step 1: Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install --save-dev \
  prettier \
  eslint-config-prettier \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  lint-staged \
  husky \
  zod

npm install \
  resend \
  @vercel/analytics \
  @vercel/speed-insights

echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 2: Create directory structure
echo -e "${YELLOW}📁 Creating directory structure...${NC}"

mkdir -p app/api/contact
mkdir -p app/api/webhook/hapana
mkdir -p app/api/health
mkdir -p app/classes
mkdir -p app/manifesto
mkdir -p app/fighters
mkdir -p app/contact
mkdir -p components/sections
mkdir -p components/embeds
mkdir -p components/ui
mkdir -p lib
mkdir -p types
mkdir -p public/textures
mkdir -p public/sounds
mkdir -p public/cursors
mkdir -p public/images
mkdir -p public/videos

echo -e "${GREEN}✓ Directories created${NC}"
echo ""

# Step 3: Update next.config.ts with security headers
echo -e "${YELLOW}⚙️  Configuring Next.js security headers...${NC}"

cat > next.config.ts << 'EOF'
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
    domains: ['embed.hapana.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
EOF

echo -e "${GREEN}✓ Next.js configured${NC}"
echo ""

# Step 4: Update .eslintrc.json
echo -e "${YELLOW}🔍 Configuring ESLint...${NC}"

cat > .eslintrc.json << 'EOF'
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
EOF

echo -e "${GREEN}✓ ESLint configured${NC}"
echo ""

# Step 5: Update package.json with new scripts and lint-staged config
echo -e "${YELLOW}📝 Updating package.json...${NC}"

# Use Node to update package.json
node << 'NODESCRIPT'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pkg.scripts = {
  ...pkg.scripts,
  "format": "prettier --write \"**/*.{ts,tsx,json,css,md}\"",
  "format:check": "prettier --check \"**/*.{ts,tsx,json,css,md}\"",
  "type-check": "tsc --noEmit",
  "prepare": "husky || true"
};

pkg["lint-staged"] = {
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,css,md}": [
    "prettier --write"
  ]
};

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
NODESCRIPT

echo -e "${GREEN}✓ package.json updated${NC}"
echo ""

# Step 6: Initialize Husky
echo -e "${YELLOW}🐕 Setting up Git hooks (Husky)...${NC}"

npx husky init

# Create pre-commit hook
mkdir -p .husky
cat > .husky/pre-commit << 'EOF'
npx lint-staged
EOF

chmod +x .husky/pre-commit

echo -e "${GREEN}✓ Git hooks configured${NC}"
echo ""

# Step 7: Copy .env.example to .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
  echo -e "${YELLOW}📋 Creating .env.local from template...${NC}"
  cp .env.example .env.local
  echo -e "${GREEN}✓ .env.local created${NC}"
  echo -e "${YELLOW}⚠️  Remember to fill in your actual values in .env.local${NC}"
  echo ""
fi

# Step 8: Create starter files
echo -e "${YELLOW}📄 Creating starter files...${NC}"

# Create error.tsx
cat > app/error.tsx << 'EOF'
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
          className="px-6 py-3 bg-[var(--burgundy-primary)] text-[var(--cream-primary)] border-2 border-[var(--cream-primary)] uppercase tracking-wider hover:bg-[var(--blood-red)] transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
EOF

# Create loading.tsx
cat > app/loading.tsx << 'EOF'
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
EOF

# Create not-found.tsx
cat > app/not-found.tsx << 'EOF'
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--charcoal-black)]">
      <div className="text-center">
        <Image
          src="/images/ASSET.jpg"
          alt="Arena"
          width={128}
          height={128}
          className="mx-auto mb-8 invert opacity-50"
        />
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
EOF

# Create health check API route
cat > app/api/health/route.ts << 'EOF'
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
}
EOF

# Create lib/utils.ts
cat > lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
EOF

# Create types/index.ts
cat > types/index.ts << 'EOF'
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ClassType {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
EOF

echo -e "${GREEN}✓ Starter files created${NC}"
echo ""

# Step 9: Format all files
echo -e "${YELLOW}✨ Formatting code...${NC}"
npm run format
echo -e "${GREEN}✓ Code formatted${NC}"
echo ""

# Final summary
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo -e "Next steps:"
echo -e "1. Edit ${YELLOW}.env.local${NC} with your API keys and configuration"
echo -e "2. Run ${YELLOW}npm run dev${NC} to start development server"
echo -e "3. Open ${YELLOW}http://localhost:3000${NC} in your browser"
echo -e "4. Review ${YELLOW}PROJECT_BLUEPRINT.md${NC} for full documentation"
echo ""
echo -e "Useful commands:"
echo -e "  ${YELLOW}npm run dev${NC}          - Start development server"
echo -e "  ${YELLOW}npm run build${NC}        - Build for production"
echo -e "  ${YELLOW}npm run lint${NC}         - Run ESLint"
echo -e "  ${YELLOW}npm run format${NC}       - Format code with Prettier"
echo -e "  ${YELLOW}npm run type-check${NC}   - Check TypeScript types"
echo ""
echo -e "🥊 ${GREEN}Those Who Dare!${NC}"
