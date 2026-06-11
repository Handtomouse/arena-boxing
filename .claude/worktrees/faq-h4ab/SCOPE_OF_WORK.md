# Scope of Work — Arena Boxing Website Project

**Client**: Arena Boxing Bondi
**Prepared by**: [Your Company Name]
**Date**: November 19, 2025
**Project Duration**: 8 weeks (40 business days)
**Total Investment**: $18,500 AUD

---

## 1. Project Overview

### 1.1 Objective
Design and develop a premium, mobile-responsive website for Arena Boxing Bondi that reflects the gym's gothic aesthetic while providing seamless class booking functionality and driving membership conversions.

### 1.2 Success Criteria
- Fully functional 8-page website launched and live
- Hapana booking integration operational
- Mobile-optimized with PageSpeed >80
- WCAG AA accessibility compliant
- Client training completed and documentation delivered

---

## 2. Deliverables

### 2.1 Design Deliverables

#### Discovery & Strategy
- [x] Brand and competitive analysis document
- [x] User persona profiles (3 archetypes)
- [x] Site map and information architecture
- [x] Content strategy and inventory

#### Visual Design
- [x] Design system (typography, colors, spacing, components)
- [x] High-fidelity desktop designs (8 pages)
- [x] High-fidelity mobile designs (8 pages)
- [x] Interactive prototype (Figma or similar)
- [x] Animation specifications
- [x] Component library showcase

**Design Revisions Included**: 2 rounds of revisions

---

### 2.2 Development Deliverables

#### Pages (8 Total)
1. **Landing Page** (`/`)
   - 20-second cinematic intro animation
   - ARENA wordmark SVG animation
   - Auto-redirect to homepage
   - Skip button for immediate entry

2. **Homepage** (`/home`)
   - Hero banner with video/image background
   - Features/highlights sections
   - Class preview carousel
   - Testimonials section
   - CTA sections (book trial, view timetable)
   - Trust elements (certifications, accolades)

3. **Timetable Page** (`/timetable`)
   - Weekly class schedule display
   - Desktop: Table view
   - Mobile: Accordion view
   - Live "current class" highlighting
   - Spots remaining indicators
   - Difficulty level badges
   - Class type reference section

4. **Membership Page** (`/membership`)
   - 3 pricing tier cards (Drop-in, Monthly Unlimited, 10-Class Pack)
   - Feature comparison table
   - Benefits grid
   - Free trial CTA
   - FAQ accordion specific to membership

5. **Booking Page** (`/booking`)
   - Hapana widget integration (embedded iframe)
   - Custom styled booking calendar
   - Loading and error states
   - "What to Bring" section
   - Cancellation policy display
   - Fallback to phone/email if widget fails

6. **About Page** (`/about`)
   - Brand story (3-paragraph narrative)
   - Trainer profiles module (3 trainers minimum)
   - Values grid (4 core values)
   - Instagram feed integration (6 posts)
   - Gym photos gallery

7. **Location Page** (`/location`)
   - Contact information (address, hours, phone, email)
   - Google Maps embed
   - Contact form with validation
   - Transportation/parking information
   - "Drop-In Anytime" CTA section

8. **FAQ Page** (`/faq`)
   - Interactive accordion (5 categories)
   - Smooth expand/collapse animations
   - Search functionality (optional enhancement)
   - Contact CTA for unanswered questions

---

#### Technical Features
- [x] Next.js 14 App Router architecture
- [x] TypeScript for type safety
- [x] Tailwind CSS for styling
- [x] Responsive design (mobile-first approach)
- [x] SEO optimization (metadata, OpenGraph, Twitter cards)
- [x] Accessibility compliance (WCAG AA)
- [x] Performance optimization (lazy loading, image optimization)
- [x] Form validation and submission handling
- [x] Google Analytics integration
- [x] Google Search Console setup

#### Integrations
- [x] **Hapana Booking Widget**: Embedded class booking system
- [x] **Instagram Feed**: Live social media display (6 posts)
- [x] **Google Maps**: Embedded location map
- [x] **Contact Form**: Email delivery via SendGrid/similar

#### Component Library
22 reusable components across 4 categories:
- UI Components (7): Button, Card, Modal, Navigation, Heading, BodyText, Tagline
- Form Components (4): Input, Textarea, Checkbox, ContactForm
- Section Components (7): HeroBanner, Footer, ClassSchedule, TrainersModule, HapanaEmbed, GoogleMapsEmbed, InstagramEmbed
- Layout Components (3): Section, Container, Grid

---

### 2.3 Content & Assets

#### Client-Provided Content (Required)
- Copy for all 8 pages (provided in agreed format by Week 6)
- Trainer bios and headshots (3 minimum, high resolution)
- Class schedule data (CSV or Excel format)
- Membership pricing (final confirmed amounts)
- Hero images (8 unique images, 1920x1080 minimum)
- Facility photos (10-15 images for gallery/about page)
- Logo files (SVG, PNG in multiple sizes)
- Brand guidelines (if available)

#### Content Services Included
- Content template with character limits
- Image specification guide
- Light copywriting assistance (editing, proofreading)
- Image compression and optimization
- Alt text creation for accessibility

---

### 2.4 Quality Assurance

#### Testing Scope
- [x] Cross-browser testing (Chrome, Safari, Firefox - latest 2 versions)
- [x] Mobile device testing (iOS Safari, Android Chrome)
- [x] Tablet testing (iPad Safari)
- [x] Form functionality testing
- [x] Link validation (all internal/external links)
- [x] Performance testing (PageSpeed Insights)
- [x] Accessibility audit (WCAG AA compliance)
- [x] Security audit (HTTPS, form sanitization)

#### Performance Targets
- PageSpeed Score: >90 (desktop), >80 (mobile)
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.5s
- Cumulative Layout Shift: <0.1

---

### 2.5 Deployment & Launch

#### Pre-Launch
- [x] Staging environment setup for client review
- [x] Production environment configuration
- [x] Domain DNS setup assistance
- [x] SSL certificate installation
- [x] Analytics and tracking setup
- [x] Search engine verification (Google Search Console)

#### Launch Day
- [x] Final content review and approval
- [x] Production deployment
- [x] Smoke testing (immediate post-launch verification)
- [x] 24-hour monitoring for critical issues

---

### 2.6 Training & Documentation

#### Training Session (90 minutes)
Topics covered:
- Content management (updating text, images)
- Managing Hapana booking widget settings
- Understanding Google Analytics dashboard
- Social media feed updates
- Basic troubleshooting
- When to request support

#### Documentation Package
- [x] Component library documentation (COMPONENTS_README.md)
- [x] Page structure guide (PAGES_README.md)
- [x] Design system reference (DESIGN_SYSTEM.md)
- [x] Deployment guide (step-by-step production deployment)
- [x] Troubleshooting guide (common issues and fixes)
- [x] Support contact information

---

### 2.7 Post-Launch Support (2 Weeks)

#### Included Support
- Bug fixes for issues present at launch (no limit)
- Minor content updates (up to 2 hours)
- Performance monitoring and optimization
- Critical issue response (4-hour response time)
- Email/Slack support for questions

#### Not Included in Post-Launch Support
- New feature development
- Design changes beyond original scope
- Content rewrites (beyond 2 hours)
- Third-party integration issues outside our control
- Training beyond the included 90-minute session

---

## 3. Timeline & Milestones

| Phase | Duration | Key Deliverables | Client Action Required |
|-------|----------|------------------|------------------------|
| **Week 1**: Discovery | 5 days | Discovery doc, brand analysis | Provide brand assets, approve discovery doc |
| **Week 2-3**: Design | 10 days | Wireframes, high-fidelity designs, prototype | Review & approve designs (2 revision rounds) |
| **Week 4**: Dev Milestone 1 | 5 days | Foundation, design system, landing page | Review staging link (async) |
| **Week 5**: Dev Milestone 2 | 5 days | Core pages (home, timetable, membership, booking, about) | Attend testing session, provide feedback |
| **Week 6**: Dev Milestone 3 | 5 days | Supporting pages, integrations, mobile optimization | Deliver final content, test full site |
| **Week 7**: Content Integration | 5 days | Client content integrated across all pages | Review integrated content, final approvals |
| **Week 8**: QA & Launch | 5 days | Full QA, production deployment, go-live | UAT testing, launch approval |

**Total Project Duration**: 8 weeks (40 business days)

**Post-Launch Support** (outside the 8-week project scope): a further 2 weeks / 10 business days of bug fixes, monitoring, and the client training session. Scope and inclusions are defined in §2.7 (Post-Launch Support). The training session itself is covered by project pricing under "Training & Documentation"; ongoing care beyond the 2-week window falls under the separate Care Plan.

### Key Milestones & Payment Triggers
- **Milestone 1**: Design Sign-Off (Week 3) → **40% payment due**
- **Milestone 2**: Staging Site Delivery (Week 6) → **40% payment due**
- **Milestone 3**: Launch (Week 8) → **20% payment due**

---

## 4. Pricing & Payment Terms

### 4.1 Investment Breakdown

| Item | Cost (AUD) |
|------|------------|
| Discovery & Strategy | $2,000 |
| Design (wireframes + high-fidelity) | $5,500 |
| Development (8 pages) | $8,000 |
| Integrations (Hapana, Instagram, Maps, Forms) | $1,500 |
| QA & Testing | $800 |
| Training & Documentation | $700 |
| **Total Project Investment** | **$18,500** |

### 4.2 Payment Schedule (Milestone-Based)

| Payment | Amount | Due Date | Trigger |
|---------|--------|----------|---------|
| Deposit | $7,400 (40%) | Upon contract signature | Project kickoff |
| Midpoint | $7,400 (40%) | End of Week 6 | Staging site delivery + content integration complete |
| Final | $3,700 (20%) | Upon launch | Site live and training completed |

### 4.3 Payment Terms
- **Invoice Due**: 7 business days from invoice date
- **Accepted Methods**: Bank transfer (preferred), credit card (+3% processing fee)
- **Late Payment**: 1.5% monthly interest on overdue balances
- **Work Suspension**: Work pauses if payment >14 days overdue
- **Currency**: All amounts in AUD (Australian Dollars)

### 4.4 Additional Costs (Not Included)
- Domain registration: ~$20-50/year (client pays directly to registrar)
- Hosting (Vercel Pro): ~$20/month (client pays directly, or included in Care Plan)
- Third-party API costs (Hapana subscription, Instagram API if premium features needed)
- Stock photography (if client cannot provide original images): ~$10-50/image
- Copywriting services beyond light editing: $150/hour
- Additional revisions beyond included rounds: $150/hour (2-hour minimum)

---

## 5. Out of Scope (Not Included)

The following items are **NOT included** in this scope and will require a separate change order:

### 5.1 E-commerce Functionality
- Online merchandise store
- Payment processing beyond booking deposits
- Inventory management
- Shopping cart functionality

### 5.2 Custom Backend/CMS
- Custom content management system
- Admin dashboard for content editing
- User account system (member login portal)
- Database design and management

### 5.3 Marketing Services
- SEO campaigns (ongoing optimization)
- Google Ads / Facebook Ads management
- Email marketing campaigns
- Social media management
- Content creation beyond launch

### 5.4 Additional Integrations
- CRM systems (Salesforce, HubSpot, etc.)
- Email marketing platforms (Mailchimp, Klaviyo)
- Advanced analytics (Mixpanel, Amplitude)
- Live chat widgets
- Membership management systems (beyond Hapana)

### 5.5 Video Production
- Promotional videos
- Trainer introduction videos
- Class preview videos
- Video editing services

### 5.6 Print/Offline Materials
- Business cards, flyers, posters
- Merchandise design
- Signage design

### 5.7 Ongoing Maintenance
- Monthly updates and enhancements
- Performance monitoring and optimization
- Security patches and updates
- Content updates beyond 2-week post-launch period

**Note**: See optional Care Plan document for ongoing maintenance services.

---

## 6. Revision Limits

### 6.1 Design Revisions
- **Wireframes**: 1 round of revisions included
- **High-Fidelity Designs**: 2 rounds of revisions included
- **Additional Rounds**: $150/hour (2-hour minimum)

**What Counts as a Revision Round:**
- Substantive changes to layout, color, typography
- Adding/removing page sections
- Redesigning components

**What Doesn't Count:**
- Minor copy tweaks
- Small color adjustments within design system
- Bug fixes or corrections to match approved designs

### 6.2 Development Revisions
- **Per Milestone**: 2 rounds of revisions included
- **Total Across Project**: 6 rounds (2 per dev milestone)
- **Additional Rounds**: $150/hour (2-hour minimum)

**What Counts as a Revision:**
- Functionality changes
- Layout adjustments beyond approved designs
- New features or components

**What Doesn't Count:**
- Bug fixes
- Performance optimizations
- Accessibility improvements
- Corrections to match approved designs

### 6.3 Content Revisions
- **During Integration (Week 7)**: Unlimited revisions to client-provided content
- **Post-Launch (Weeks 9-10)**: Up to 2 hours of content updates included
- **After Post-Launch Period**: $150/hour (billed in 30-minute increments)

---

## 7. Client Responsibilities

### 7.1 Timely Deliverables
Client agrees to provide the following within specified timelines:

| Item | Due Date | Consequence of Delay |
|------|----------|----------------------|
| Brand assets (logos, fonts, colors) | Week 1 | Design phase cannot begin |
| Design approval | Within 5 business days of delivery | Timeline extends 1:1 with delay |
| Final content (copy, images) | End of Week 6 | Content integration delayed, may push launch |
| Feedback on dev milestones | Within 3 business days | Development pauses until feedback received |
| UAT sign-off | Week 8 | Launch delayed until sign-off received |
| Final payment | Upon launch | Site ownership transfer delayed |

### 7.2 Access & Credentials
Client agrees to provide:
- Hapana booking system API credentials (Week 4)
- Instagram account access for feed integration (Week 6)
- Domain registrar login for DNS configuration (Week 8)
- Hosting platform account (if client-owned) (Week 8)
- Google Analytics account (Week 8)

### 7.3 Availability for Meetings
Client agrees to attend scheduled meetings:
- Kickoff (Week 1): 90 minutes
- Design Review (Week 3): 90 minutes
- Dev Milestone Reviews (Weeks 4, 5, 6): 60 minutes each
- Pre-Launch QA (Week 8): 90 minutes
- Training (Week 9): 90 minutes

**Rescheduling**: Maximum 1 reschedule per meeting with 48-hour notice. Repeated no-shows may result in timeline extension.

### 7.4 Single Point of Contact
Client agrees to designate 1-2 primary stakeholders for:
- Design approvals (binding decisions)
- Content sign-off
- Launch authorization
- Payment authorization

**Approval Authority**: Designated stakeholders have final decision-making power. Feedback from additional team members is welcome but decisions rest with designated contacts.

---

## 8. Change Request Process

### 8.1 How to Submit Changes
1. Client emails or posts in project management tool with subject: "CHANGE REQUEST - [brief description]"
2. Developer provides impact assessment within 48 business hours:
   - Time impact (days added to timeline)
   - Cost impact (additional fees)
   - Dependencies (what else must change)
3. Client approves or declines in writing
4. If approved: Change order document issued
5. Work begins upon signed change order + payment (if upfront payment required)

### 8.2 Change Order Pricing
- **Hourly Rate**: $150/hour
- **Minimum Billable**: 2 hours
- **Estimates**: Provided before work begins; not to exceed without client approval
- **Rush Fees**: +50% for requests requiring work within 48 hours

### 8.3 Timeline Impact
- Changes requested during design phase: Minimal impact if caught early
- Changes during development: 1-3 days per change depending on complexity
- Changes during QA/pre-launch: May push launch date; rush fees may apply

---

## 9. Intellectual Property & Ownership

### 9.1 Upon Final Payment
Client receives full ownership of:
- All custom code (website source code)
- All design files (Figma files, exported assets)
- All documentation produced for the project
- Rights to deploy, modify, and distribute the website

### 9.2 Third-Party Assets
The following remain property of their respective owners:
- Next.js framework (MIT license)
- Tailwind CSS (MIT license)
- React (MIT license)
- Google Fonts (SIL Open Font License)
- Any stock photos licensed for the project (usage rights transferred to client)
- Hapana booking widget (licensed separately by Hapana)

### 9.3 Developer Portfolio Rights
Developer retains the right to:
- Display the website in portfolio (online and in presentations)
- Use screenshots and descriptions in case studies
- Reference the project in proposals to prospective clients

Client may request confidentiality restrictions if needed (must be specified before contract signature).

---

## 10. Warranties & Limitations

### 10.1 Developer Warranties
Developer warrants that:
- Website will function as specified in approved designs
- Code will be original work or properly licensed
- Website will meet WCAG AA accessibility standards
- Website will achieve stated performance targets (PageSpeed >80 mobile)

### 10.2 Warranty Period
**90 days post-launch** for:
- Bug fixes related to original functionality
- Performance issues not caused by client changes
- Accessibility issues present at launch

**Does NOT cover**:
- Issues caused by client modifications to code
- Third-party service failures (Hapana, Instagram API, etc.)
- Hosting/server issues (unless hosting managed by developer)
- Browser updates that break functionality (will be fixed at hourly rate)
- User error or misuse of admin functions

### 10.3 Limitation of Liability
Developer's total liability shall not exceed the total project fee ($18,500 AUD). Developer is not liable for:
- Lost revenue or business opportunities
- Third-party claims arising from client-provided content
- Data loss (client responsible for backups)
- Downtime caused by hosting provider

---

## 11. Hosting & Domain

### 11.1 Recommended Hosting
**Vercel** (Next.js-optimized platform)
- **Hobby Plan**: Free (suitable for moderate traffic)
- **Pro Plan**: $20/month (recommended for business sites)
- Features: Auto-scaling, global CDN, SSL included, 99.99% uptime SLA

**Domain Registration**: Client responsible for purchasing domain (~$20-50/year)
- Recommended registrars: Namecheap, Google Domains, Hover

### 11.2 Developer Assistance
Developer will assist with:
- DNS configuration (pointing domain to hosting)
- SSL certificate setup (included with Vercel)
- Initial deployment to production
- Analytics and tracking setup

**Note**: Ongoing hosting management available via Care Plan (see separate document)

---

## 12. Confidentiality & Data Protection

### 12.1 Confidential Information
Both parties agree to keep confidential:
- Business strategies and pricing information
- User data and analytics
- Proprietary processes or trade secrets
- Financial information

### 12.2 Data Handling
Developer agrees to:
- Not share client data with third parties (except necessary service providers)
- Use industry-standard security practices
- Delete client data from development systems upon project completion (or retain securely if ongoing relationship)

### 12.3 GDPR/Privacy Compliance
Website will include:
- Privacy Policy page (client provides legal copy or uses template)
- Cookie consent banner (if required by jurisdiction)
- Contact form data handling per privacy policy

**Note**: Client responsible for ongoing compliance with privacy laws. Developer can provide technical implementation but not legal advice.

---

## 13. Termination Conditions

### 13.1 Termination by Client
Client may terminate project with 7 days written notice. Upon termination:
- Client pays for all work completed to date (billed at hourly rate for partial milestones)
- Client receives all deliverables completed up to termination date
- No refund of deposit or milestone payments already made
- Ownership rights transfer only upon full payment

### 13.2 Termination by Developer
Developer may terminate if:
- Client fails to pay invoices >30 days overdue
- Client repeatedly misses scheduled meetings without notice
- Client fails to provide required content/assets after 2 written requests
- Scope creep exceeds 20% without change order approval

Upon developer-initiated termination:
- Developer provides 14 days notice
- Client receives all work completed to date
- Pro-rated refund issued for incomplete milestones (if applicable)

### 13.3 Mutual Termination
Either party may propose mutual termination if:
- Project requirements change substantially
- External factors make completion impractical
- Parties agree project is no longer viable

Terms negotiated on case-by-case basis.

---

## 14. Acceptance & Sign-Off

### 14.1 Acceptance Criteria
Project is considered complete when:
- [x] All 8 pages delivered and functional
- [x] Hapana booking integration operational
- [x] Mobile responsiveness verified
- [x] PageSpeed scores meet targets (>80 mobile)
- [x] Accessibility audit passed (WCAG AA)
- [x] Client UAT checklist completed
- [x] Training session delivered
- [x] Documentation provided

### 14.2 Final Sign-Off Process
1. Developer notifies client that project is ready for final review
2. Client performs UAT testing (3 business days)
3. Client submits final feedback (critical issues only at this stage)
4. Developer addresses critical issues (2 business days)
5. Client provides written sign-off via email: "I approve the Arena Boxing website for launch"
6. Developer deploys to production
7. Final invoice issued

### 14.3 Deemed Acceptance
If client does not provide feedback or sign-off within 5 business days of notification, project is deemed accepted and final invoice becomes due.

---

## 15. Next Steps

### To Proceed with This Project:
1. **Review this Scope of Work** and raise any questions
2. **Sign and return** this document along with separate Service Agreement
3. **Submit deposit payment** (40% = $7,400 AUD)
4. **Schedule kickoff meeting** (Week 1)
5. **Provide initial brand assets** (logos, colors, fonts, any existing content)

### Questions or Modifications?
Contact:
- **Email**: [your-email]
- **Phone**: [your-phone]
- **Meeting**: Schedule via [Calendly link]

---

## 16. Signatures

**Client Approval:**

___________________________________
Signature

___________________________________
Name (Print)

___________________________________
Title

___________________________________
Date

---

**Developer Acceptance:**

___________________________________
Signature

___________________________________
Name (Print)

___________________________________
Title

___________________________________
Date

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| **WCAG AA** | Web Content Accessibility Guidelines, Level AA - industry standard for accessibility |
| **PageSpeed Score** | Google's performance metric (0-100) measuring load speed and optimization |
| **UAT** | User Acceptance Testing - client validates site meets requirements |
| **Staging** | Pre-production environment for testing before live launch |
| **CDN** | Content Delivery Network - global server network for fast content delivery |
| **SSL** | Secure Sockets Layer - encryption for secure HTTPS connections |
| **SEO** | Search Engine Optimization - techniques to improve search rankings |
| **CTA** | Call to Action - buttons/links prompting user action |
| **Responsive** | Design that adapts to different screen sizes (mobile, tablet, desktop) |

---

## Appendix B: Deliverables Checklist

### Design Phase
- [ ] Discovery document
- [ ] Wireframes (8 pages)
- [ ] Design system
- [ ] High-fidelity desktop designs (8 pages)
- [ ] High-fidelity mobile designs (8 pages)
- [ ] Interactive prototype
- [ ] Animation specifications

### Development Phase
- [ ] Landing page with intro animation
- [ ] Homepage with all sections
- [ ] Timetable page with schedule display
- [ ] Membership page with pricing tiers
- [ ] Booking page with Hapana integration
- [ ] About page with trainers and Instagram feed
- [ ] Location page with map and contact form
- [ ] FAQ page with accordion
- [ ] Navigation component (desktop + mobile)
- [ ] Footer component
- [ ] 22-component library
- [ ] Mobile responsiveness (all pages)
- [ ] SEO metadata (all pages)
- [ ] Accessibility compliance (WCAG AA)

### Launch Phase
- [ ] Staging environment
- [ ] Production deployment
- [ ] Domain/DNS configuration
- [ ] SSL certificate
- [ ] Google Analytics setup
- [ ] Search Console verification
- [ ] Training session (90 minutes)
- [ ] Documentation package

### Post-Launch
- [ ] 2 weeks monitoring and support
- [ ] Bug fixes as needed
- [ ] Content updates (up to 2 hours)

---

**Document Version**: 1.0
**Last Updated**: November 19, 2025
**Valid Until**: December 31, 2025 (pricing and terms subject to change after this date)
