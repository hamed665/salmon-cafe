# Codex Prompts

## Rules for Codex

Use small, scoped implementation prompts. Every prompt must include:

- Scope
- Files to modify
- Files to avoid
- Acceptance criteria
- Commands to run
- Explicit exclusions

Never ask Codex to build the whole MVP in one prompt. That is not ambition; that is software gambling with extra steps.

## Global Guardrails

```txt
Language: Persian only
Direction: RTL
Currency: Toman
Framework: Next.js App Router
Database: Supabase PostgreSQL
Auth: Supabase Auth
Storage: Supabase Storage
Do not implement online ordering.
Do not implement online payment.
Do not implement AI chat.
Do not implement loyalty.
Do not implement mobile app.
Do not implement multi-language UI.
```

## Prompt 1: Foundation

```txt
Build the Salmon Cafe foundation.

Scope:
- Next.js App Router structure
- TypeScript config
- Tailwind config
- RTL Persian global layout
- Basic shadcn-style UI primitives
- Supabase client and server helpers
- Landing page
- Dashboard and admin route shells

Do not implement:
- Database migrations
- Auth UI
- Product CRUD
- QR tracking
- Payment
- AI

Acceptance criteria:
- npm run dev works
- npm run typecheck works
- Home page loads
- /dashboard loads
- /admin loads
- Layout is RTL Persian
```

## Prompt 2: Database Schema

```txt
Implement Supabase database migrations for the MVP.

Scope:
- profiles
- cafes
- cafe_members
- cafe_settings
- themes
- categories
- products
- product_profiles
- product_stories
- moods
- product_moods
- product_recommendations
- qr_codes
- visitor_sessions
- analytics_events
- plans
- subscriptions
- payments
- audit_logs
- RLS policies
- useful indexes
- seed data

Do not implement:
- Online ordering tables
- Payment gateway integration
- Loyalty tables
- AI tables

Acceptance criteria:
- supabase db reset works locally
- Seed creates demo cafe: cafe-noir
- Public read policies work for published menu
- Tenant owner policies are prepared
```

## Prompt 3: Cafe Owner Dashboard

```txt
Build the cafe owner dashboard.

Scope:
- Dashboard layout
- Cafe profile form
- Category management UI
- Product management UI
- Product profile fields
- Product story fields
- Availability status
- Recommendation fields

Do not implement:
- Multi-language UI
- Payment
- AI
- Ordering

Acceptance criteria:
- Dashboard pages are responsive
- Forms use Zod validation
- UI is Persian and RTL
- Empty states exist
```

## Prompt 4: Public Menu Experience

```txt
Build the public customer menu experience.

Scope:
- /m/[cafeSlug]
- Cafe hero
- Mood selector
- Category tabs
- Product cards
- Search
- Product detail page
- Taste profile
- Coffee story
- Manual recommendations
- Popular products
- Mobile-first premium UI

Do not implement:
- Cart
- Ordering
- Payment
- User login for customers
- Reviews

Acceptance criteria:
- /m/cafe-noir loads beautifully on mobile
- Product details work
- Search filters products
- Mood selector changes product emphasis
- UI stays fast and RTL
```

## Prompt 5: QR, Analytics, Admin

```txt
Build QR, analytics, and admin control.

Scope:
- /q/[qrCode] redirect route
- QR scan event model usage
- menu_view and product_view events
- dashboard analytics cards
- admin cafes page
- manual subscription controls
- activation/deactivation model

Do not implement:
- Payment gateway
- Complex charts
- SMS
- AI

Acceptance criteria:
- QR redirects to the correct public menu
- Analytics event function is reusable
- Admin pages are protected by role architecture
- Cafe owner can see basic analytics placeholders or real aggregates
```

## Required Commands After Each Prompt

```bash
npm run typecheck
npm run build
```

Add lint once the ESLint setup is stable.
