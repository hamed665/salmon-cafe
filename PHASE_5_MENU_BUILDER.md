# Phase 5 Menu Builder

Phase 5 makes menu management database-backed.

## Scope

- Category CRUD
- Product CRUD
- Price and discount price
- Product availability
- Product visibility flags
- Taste profile
- Product story
- Mood tags
- Complementary recommendations
- Owner and manager access control

## Files

```txt
lib/menu/queries.ts
lib/menu/actions.ts
app/dashboard/menu/products/page.tsx
```

## Notes

Product deletion is implemented as soft archive by setting `isActive=false` and `isAvailable=false`.

File upload is still not included. Product image and video are stored as URL fields for now.
