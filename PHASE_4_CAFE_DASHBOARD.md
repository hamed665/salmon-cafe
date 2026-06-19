# Phase 4 Cafe Dashboard

Phase 4 makes the cafe profile dashboard database-backed.

## Scope

- Create first cafe from dashboard
- Edit cafe identity and public metadata
- Manage publish status
- Manage public visibility
- Manage cafe experience settings
- Use PostgreSQL through Prisma

## Files

```txt
lib/cafes/permissions.ts
lib/cafes/queries.ts
lib/cafes/actions.ts
app/dashboard/cafe/page.tsx
app/dashboard/page.tsx
```

## Cafe fields

- Name
- Slug
- Description
- Phone
- Instagram URL
- Website URL
- City
- Area
- Address
- Logo URL
- Cover URL
- Status
- Published flag

## Settings

- Currency
- Show prices
- Show unavailable products
- Mood menu
- Product story
- Recommendations
- Analytics

File upload is not included in this phase. Logo and cover are URL fields for now.
