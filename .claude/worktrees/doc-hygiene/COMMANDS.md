# Arena Boxing - Command Reference

Quick reference guide for all project commands and workflows.

---

## 🚀 Setup

### Initial Setup (Run Once)
```bash
# Make setup script executable
chmod +x setup.sh

# Run automated setup
./setup.sh
```

This will:
- Install all dependencies
- Create directory structure
- Configure ESLint, Prettier, Husky
- Generate starter files
- Set up environment variables

### Manual Setup
```bash
# Install dependencies
npm install

# Create .env.local from template
cp .env.example .env.local

# Edit environment variables
nano .env.local
```

---

## 💻 Development

### Start Development Server
```bash
npm run dev
```
Opens at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Start Production Server (Local Test)
```bash
npm run start
```

### Type Check
```bash
npm run type-check
```

---

## 🧹 Code Quality

### Linting
```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### Formatting
```bash
# Format all files
npm run format

# Check formatting without changes
npm run format:check
```

### Pre-commit (Automatic)
Git hooks automatically run on commit:
- ESLint on `.ts`, `.tsx` files
- Prettier on all supported files

---

## 📦 Dependencies

### Add New Package
```bash
# Production dependency
npm install package-name

# Development dependency
npm install --save-dev package-name
```

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update all to latest
npm update

# Update Next.js specifically
npm install next@latest react@latest react-dom@latest
```

---

## 🚢 Deployment

### Deploy to Vercel (Automatic)
1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. Vercel automatically deploys from `main` branch

### Manual Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Environment Variables on Vercel
```bash
# Set via CLI
vercel env add RESEND_API_KEY production

# Or via Vercel Dashboard:
# Settings > Environment Variables
```

---

## 🧪 Testing (Future)

### Unit Tests (Setup Required)
```bash
# Install Jest + Testing Library
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom

# Run tests
npm test

# Watch mode
npm test -- --watch
```

### E2E Tests (Setup Required)
```bash
# Install Playwright
npm install --save-dev @playwright/test

# Run E2E tests
npm run test:e2e
```

---

## 📊 Performance & Analytics

### Run Lighthouse Audit
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view
```

### Analyze Bundle Size
```bash
# Install analyzer
npm install --save-dev @next/bundle-analyzer

# Run analysis
ANALYZE=true npm run build
```

---

## 🔧 Utilities

### Clean Build Artifacts
```bash
rm -rf .next
rm -rf node_modules
npm install
```

### Reset Git Hooks
```bash
rm -rf .husky
npx husky init
```

### Generate Sitemap
```bash
# Add to package.json scripts:
"postbuild": "next-sitemap"

# Install next-sitemap
npm install --save-dev next-sitemap

# Run after build
npm run build
```

---

## 🐛 Debugging

### Enable Next.js Debug Mode
```bash
NODE_OPTIONS='--inspect' npm run dev
```

### Check Environment Variables
```bash
# Print all env vars (development only!)
node -e "console.log(process.env)" | grep NEXT_PUBLIC
```

### Clear Next.js Cache
```bash
rm -rf .next/cache
npm run dev
```

---

## 📝 Git Workflow

### Feature Branch
```bash
# Create and switch to new branch
git checkout -b feature/your-feature-name

# Make changes, commit
git add .
git commit -m "feat: add feature description"

# Push to GitHub
git push origin feature/your-feature-name

# Create pull request on GitHub
```

### Commit Message Convention
```bash
feat: new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons, etc.
refactor: code restructuring
test: adding tests
chore: updating build tasks, configs, etc.
```

---

## 🔐 Security

### Scan for Vulnerabilities
```bash
# Audit dependencies
npm audit

# Fix auto-fixable issues
npm audit fix

# Force fix (may introduce breaking changes)
npm audit fix --force
```

### Check for Secrets
```bash
# Install gitleaks
brew install gitleaks

# Scan repository
gitleaks detect --source . --verbose
```

---

## 📚 Documentation

### Generate TypeScript Docs
```bash
# Install TypeDoc
npm install --save-dev typedoc

# Generate docs
npx typedoc --out docs src
```

### Component Documentation (Storybook - Future)
```bash
# Install Storybook
npx storybook@latest init

# Run Storybook
npm run storybook
```

---

## 🎯 Quick Tasks

### Create New Page
```bash
# Create directory
mkdir -p app/your-page

# Create page file
cat > app/your-page/page.tsx << EOF
export default function YourPage() {
  return <div>Your Page</div>;
}
EOF
```

### Create New Component
```bash
cat > components/YourComponent.tsx << EOF
interface YourComponentProps {
  // props here
}

export default function YourComponent({}: YourComponentProps) {
  return <div>Your Component</div>;
}
EOF
```

### Create New API Route
```bash
mkdir -p app/api/your-route

cat > app/api/your-route/route.ts << EOF
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello' });
}
EOF
```

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -ti:3000

# Kill process
kill -9 $(lsof -ti:3000)

# Or use different port
PORT=3001 npm run dev
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Restart TypeScript server (VS Code)
# Cmd+Shift+P > TypeScript: Restart TS Server

# Rebuild types
npm run type-check
```

---

**Last Updated**: 2025-11-17
