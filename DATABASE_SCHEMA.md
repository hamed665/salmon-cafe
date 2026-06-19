# Database Schema

## Current Production Direction

The production database layer uses PostgreSQL with Prisma.

Primary schema file:

```txt
prisma/schema.prisma
```

Seed file:

```txt
prisma/seed.ts
```

## Principles

- Every cafe is a tenant.
- Tenant-owned tables should include `cafeId`.
- Public users can read only published cafes and active menu content.
- Cafe owners can manage only their own cafe data.
- Admins can manage the platform.
- Store prices as integer Toman values.
- Store dates as `DateTime` and display Jalali dates in UI later.

## Core Models

```txt
User
Cafe
CafeMember
CafeSettings
Category
Product
ProductProfile
ProductStory
Mood
ProductMood
ProductRecommendation
QrCode
VisitorSession
AnalyticsEvent
Plan
Subscription
Payment
AuditLog
```

## Important Relationships

```txt
User 1:n Cafe as owner
Cafe 1:n CafeMember
Cafe 1:n Category
Cafe 1:n Product
Product 1:1 ProductProfile
Product 1:1 ProductStory
Product n:n Mood through ProductMood
Product n:n Product through ProductRecommendation
Cafe 1:n QrCode
Cafe 1:n AnalyticsEvent
Cafe 1:n Subscription
Plan 1:n Subscription
```

## Key Uniques and Indexes

Prisma schema defines:

```txt
Cafe.slug unique
Category cafeId+slug unique
Product cafeId+slug unique
QrCode.code unique
Product cafeId+categoryId index
Product cafeId+isActive+isAvailable index
AnalyticsEvent cafeId+createdAt index
AnalyticsEvent eventType+createdAt index
```

## Seed Data

The seed creates:

```txt
admin@salmon-cafe.local
owner@salmon-cafe.local
Starter / Pro / Premium plans
Mood menu values
Demo cafe: cafe-noir
Demo categories
Demo products
Product taste profiles
Product stories
Product recommendations
Demo QR code
Demo subscription and payment
Demo analytics events
```

Run:

```bash
npm run db:push
npm run db:seed
```

## Authorization Note

Because this project is self-hosted, tenant authorization is handled at application level rather than Supabase RLS.

The next auth phase must enforce:

- Admin can access all records.
- Cafe owner can access only owned/member cafes.
- Public routes can read only published cafes and active products.
