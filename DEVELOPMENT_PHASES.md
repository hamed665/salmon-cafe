# Development Phases

## Build Strategy

Use 5 epic prompts and about 10 smaller PRs.

Do not ask Codex to build the whole project in one step. That is how software becomes archaeology.

## Phase 0: Architecture Lock

Time: 1-2 days

Outputs:

- Confirm MVP scope
- Confirm Persian-only UI
- Confirm routes
- Confirm database schema
- Confirm design tokens
- Confirm plan limits

## Phase 1: Foundation

Time: 2-4 days

Tasks:

- Next.js App Router setup
- TypeScript setup
- Tailwind setup
- Base UI components
- Global RTL layout
- Environment config
- Supabase client/server helpers
- Basic landing page

Acceptance:

- `npm run dev` starts
- Root page loads
- Persian RTL layout works
- Build passes

## Phase 2: Database and Auth Foundation

Time: 3-5 days

Tasks:

- Supabase migrations
- Profiles
- Cafes
- Cafe members
- Categories
- Products
- Product profiles
- Product stories
- Moods
- QR codes
- Analytics events
- Plans/subscriptions
- RLS policies
- Seed data

Acceptance:

- Migrations run cleanly
- Seed demo cafe exists
- RLS policies are in place
- Tables have useful indexes

## Phase 3: Cafe Owner Dashboard

Time: 5-7 days

Tasks:

- Dashboard layout
- Cafe profile page
- Product management page
- Category management architecture
- Product profile/story fields
- Availability toggles
- Image URL fields now, upload later

Acceptance:

- Owner can view dashboard shell
- Owner can understand menu management flow
- Forms are validated with Zod

## Phase 4: Public Premium Menu

Time: 5-7 days

Tasks:

- `/m/[cafeSlug]`
- Cafe hero
- Mood selector
- Category tabs
- Product cards
- Search
- Product detail route
- Taste profile
- Coffee story
- Recommendations
- Mobile-first polish

Acceptance:

- Demo cafe menu looks premium on mobile
- Product detail page works
- UI is fully RTL
- No multi-language UI exists

## Phase 5: QR and Analytics

Time: 3-5 days

Tasks:

- `/q/[qrCode]` redirect
- Record QR scan event
- Record menu/product view events
- Analytics dashboard cards
- Top products section

Acceptance:

- QR redirect works
- Basic event schema exists
- Dashboard can show placeholder or real aggregated analytics

## Phase 6: Admin and Subscription Control

Time: 4-6 days

Tasks:

- Admin layout
- Cafe list
- Plan assignment architecture
- Manual subscription fields
- Payment status fields
- Activate/deactivate cafes

Acceptance:

- Admin can conceptually control cafe status and subscription
- No payment gateway is implemented

## Phase 7: Polish and Launch Demo

Time: 4-7 days

Tasks:

- Empty states
- Loading states
- Error states
- Responsive testing
- Demo data
- README polish
- Deployment notes

Acceptance:

- Demo is ready for cafe sales calls
- UI does not embarrass the human species too severely

## Total Timeline

```txt
Fast MVP demo: 14-21 days
Sellable MVP: 21-30 days
Cleaner production MVP: 30-45 days
```

## PR Breakdown

```txt
PR 1: Foundation and configs
PR 2: Supabase schema and seed
PR 3: Auth and dashboard shell
PR 4: Cafe profile management
PR 5: Menu/product management
PR 6: Public cafe menu
PR 7: Product detail and smart layer
PR 8: QR redirect and events
PR 9: Admin and subscription control
PR 10: Polish, docs, demo data
```
