# Database Schema

## Principles

- Every cafe is a tenant.
- Every tenant-owned table must include `cafe_id`.
- Public users can read only published cafes and active menu content.
- Cafe owners can manage only their own cafe data.
- Admins can manage the platform.
- Store prices as numbers, display them as Persian formatted Toman in UI.
- Store dates as `timestamptz`, display them as Jalali in UI later.

## Core Tables

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
cafe_tables
visitor_sessions
analytics_events
daily_analytics
plans
subscriptions
payments
audit_logs
```

## Important Relationships

```txt
profiles 1:n cafes
cafes 1:n cafe_members
cafes 1:n categories
cafes 1:n products
products 1:1 product_profiles
products 1:1 product_stories
products n:n moods through product_moods
products n:n products through product_recommendations
cafes 1:n qr_codes
cafes 1:n analytics_events
cafes 1:n subscriptions
plans 1:n subscriptions
```

## Key Indexes

```sql
create unique index cafes_slug_key on public.cafes(slug);
create unique index categories_cafe_slug_key on public.categories(cafe_id, slug);
create unique index products_cafe_slug_key on public.products(cafe_id, slug);
create unique index qr_codes_code_key on public.qr_codes(code);

create index products_cafe_category_idx on public.products(cafe_id, category_id);
create index products_active_available_idx on public.products(cafe_id, is_active, is_available);
create index analytics_events_cafe_created_idx on public.analytics_events(cafe_id, created_at desc);
create index analytics_events_type_created_idx on public.analytics_events(event_type, created_at desc);
```

## MVP RLS Summary

### Public Read

Allowed:

- `cafes` where `is_published = true` and `status = 'active'`
- active categories
- active products
- product profiles and stories attached to active products
- active moods

### Cafe Owner

Allowed when the user is a member of the cafe:

- Read/write cafe profile
- Read/write categories
- Read/write products
- Read QR codes
- Read analytics

### Admin

Allowed when `profiles.role = 'platform_admin'`.

## Notes

The full SQL implementation lives in:

```txt
supabase/migrations/0001_initial_schema.sql
```

Do not add payment, online ordering, or loyalty tables until the MVP has real customers. Databases also deserve boundaries, unlike most product roadmaps.
