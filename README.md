# Salmon Cafe

Salmon Cafe is a Persian-first premium smart QR menu and cafe experience platform for the Iran market.

The MVP is intentionally focused: a fast, responsive, mobile-first cafe menu with QR access, premium visual design, basic analytics, product stories, taste profiles, mood-based browsing, and a simple cafe owner dashboard.

## Product Positioning

This is **not** a cheap QR menu clone.

Salmon Cafe is positioned as a **Premium Smart Cafe Menu** for cafes that care about brand, customer experience, and upselling.

## MVP Language

- UI language: Persian only
- Direction: RTL
- Currency: Toman
- Public URLs: Latin slugs
- Multi-language support: excluded from MVP, prepared for future architecture only

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn-style components
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage
- Row Level Security
- Vercel deployment

## Main Areas

```txt
Public customer experience
Cafe owner dashboard
Platform admin panel
QR redirect and analytics
Supabase database schema
Codex-ready development phases
```

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open:

```txt
http://localhost:3000
http://localhost:3000/m/cafe-noir
http://localhost:3000/dashboard
http://localhost:3000/admin
```

## Documentation

- `PROJECT_ARCHITECTURE.md`
- `MVP_SCOPE.md`
- `DEVELOPMENT_PHASES.md`
- `DATABASE_SCHEMA.md`
- `CODEX_PROMPTS.md`

## MVP Exclusions

The following are deliberately excluded from the first build:

- Online ordering
- Online payment
- AI chat
- Loyalty club
- Full gamification
- POS integration
- Mobile app
- Complex multi-branch management

Build the thing that sells first. The rest can wait politely outside like every other overexcited feature in human history.
