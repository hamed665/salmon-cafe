# Salmon Cafe

Salmon Cafe is a Persian-first premium smart QR menu and cafe experience platform for the Iran market.

The MVP is focused on a fast, responsive, mobile-first cafe menu with QR access, premium visual design, basic analytics, product stories, taste profiles, mood-based browsing, and a simple cafe owner dashboard.

## Product Positioning

Salmon Cafe is positioned as a **Premium Smart Cafe Menu** for cafes that care about brand, customer experience, and upselling.

## MVP Language

- UI language: Persian only
- Direction: RTL
- Currency: Toman
- Public URLs: Latin slugs
- Multi-language support: excluded from MVP

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma
- Docker Compose
- Nginx reverse proxy
- VPS self-host deployment

## Local Start

```bash
cp package.selfhost.json package.json
npm install
cp .env.example .env.local
npm run dev
```

Open:

```txt
http://localhost:3000
http://localhost:3000/m/cafe-noir
http://localhost:3000/dashboard
http://localhost:3000/admin
```

## Docker Start

```bash
cp .env.docker.example .env.docker
docker compose up -d --build
docker compose exec app npm run db:push
```

## Documentation

- `PROJECT_ARCHITECTURE.md`
- `MVP_SCOPE.md`
- `DEVELOPMENT_PHASES.md`
- `DATABASE_SCHEMA.md`
- `CODEX_PROMPTS.md`
- `DEPLOYMENT.md`
- `HOSTING_HANDOFF.md`
- `HANDOFF_IRAN.md`

## MVP Exclusions

The following are excluded from the first build:

- Online ordering
- Online payment
- AI chat
- Loyalty club
- Full gamification
- POS integration
- Mobile app
- Complex multi-branch management

The first build should validate the premium QR menu experience before expanding into larger modules.
