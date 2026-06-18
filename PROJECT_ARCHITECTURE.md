# Salmon Cafe Architecture

## Architecture Goal

Salmon Cafe is a Persian-first, premium, responsive smart cafe menu platform for the Iran market.

The architecture has three hard priorities:

1. **Responsive premium UI** for mobile QR customers.
2. **Strong multi-tenant database** for cafes, products, QR, analytics, and subscription control.
3. **Next.js full-stack architecture** that is fast to build now and easy to split later.

## High-Level System

```txt
Customer phone
  -> QR code
  -> /q/[qrCode]
  -> analytics event: qr_scan
  -> /m/[cafeSlug]
  -> public cafe menu
  -> product detail / mood selection / recommendations
```

```txt
Cafe owner
  -> /dashboard
  -> manage cafe profile
  -> manage categories and products
  -> manage QR
  -> view analytics
```

```txt
Platform admin
  -> /admin
  -> manage cafes
  -> manage plans
  -> manage manual subscriptions
  -> activate/deactivate cafes
```

## Recommended Stack

```txt
Next.js App Router
TypeScript
Tailwind CSS
shadcn-style UI components
Supabase Auth
Supabase PostgreSQL
Supabase Storage
RLS policies
Vercel
Cloudflare DNS later
```

## Why Not NestJS in MVP?

NestJS, Redis, Docker, MinIO, workers, queues, and separate backend services are useful later. For the MVP they add weight before revenue.

MVP should ship as a **Next.js full-stack monolith**:

- Server Components for public menu pages
- Server Actions for dashboard mutations
- Route Handlers for QR redirect and analytics
- Supabase for auth, database, storage, and RLS

This gives enough structure without building a tiny space agency for a coffee menu. Humanity has suffered enough dashboards.

## Application Routes

### Public

```txt
/
/m/[cafeSlug]
/m/[cafeSlug]/product/[productSlug]
/q/[qrCode]
```

### Auth

```txt
/login
/register
```

### Cafe Owner Dashboard

```txt
/dashboard
/dashboard/cafe
/dashboard/menu/products
/dashboard/qr
/dashboard/analytics
```

### Platform Admin

```txt
/admin
/admin/cafes
/admin/subscriptions
/admin/users
```

## Core Modules

### 1. Public Cafe Experience

- Cafe hero
- Logo and cover
- Open/closed state
- Mood selector
- Category tabs
- Search
- Product cards
- Product detail
- Taste profile
- Coffee story
- Manual recommendations
- Popular products

### 2. Cafe Dashboard

- Cafe profile setup
- Logo/cover upload
- Category management
- Product management
- Availability toggles
- QR preview/download
- Basic analytics

### 3. Admin Panel

- Cafe list
- Subscription control
- Manual payment record
- Publish/unpublish cafe
- Plan assignment
- Audit log inspection later

### 4. QR and Analytics

- QR redirect route
- Anonymous session
- Events table
- Daily aggregate table later
- Cafe dashboard reports

## UI Architecture

### RTL Persian First

The root layout must use:

```html
<html lang="fa" dir="rtl">
```

### Design Principles

- Mobile-first
- Premium dark coffee theme
- Large product imagery
- Sticky category navigation
- Minimal text density
- Strong call-to-actions
- Fast loading on weak mobile internet

### Breakpoints

```txt
360px   small mobile
390px   common iPhone width
640px   large mobile
768px   tablet
1024px  laptop
1280px  desktop
1536px  large desktop
```

## Data Architecture

Every tenant-owned table must include `cafe_id`.

Important tables:

```txt
profiles
cafes
cafe_members
cafe_settings
themes
categories
products
product_profiles
product_stories
moods
product_moods
product_recommendations
qr_codes
visitor_sessions
analytics_events
daily_analytics
plans
subscriptions
payments
audit_logs
```

## Security Model

### Public Read

Published cafes, active categories, and active products are publicly readable.

### Owner Access

Cafe owners can only manage records that belong to cafes where they are owner/member.

### Admin Access

Platform admins can manage all cafes and subscriptions.

### Required Guards

- RLS on all tenant tables
- Server-side permission checks before mutations
- Zod validation for all forms
- Upload type and size validation
- Rate limiting on analytics endpoint later

## Performance Model

Public menu pages must be fast.

Targets:

```txt
Initial public page load: under 3 seconds
LCP target: under 2.5 seconds
Image weight: optimized WebP
JS: minimal on public pages
```

Techniques:

- Server Components for public reads
- Lazy-loaded product images
- Cached public menu data
- Revalidate pages after menu edits
- Dashboard pages stay dynamic

## Future Split Points

Only after real customers and revenue:

```txt
Backend API -> NestJS
Cache -> Redis
Analytics warehouse -> ClickHouse / BigQuery
Storage -> Cloudflare R2 / S3
Jobs -> Queue worker
AI -> separate service
Payments -> payment gateway integration
```

## MVP Rule

Do not build online ordering, online payment, real AI, loyalty, games, or POS integration in the first version.

The MVP exists to sell the premium QR experience first. Everything else is a future feature trying to sneak into the party wearing a fake mustache.
