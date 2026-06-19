# Phase 6 Public Menu

Phase 6 connects the public customer-facing menu to PostgreSQL and upgrades the public experience.

## Scope

- `/m/[cafeSlug]` reads published cafe data from PostgreSQL
- `/m/[cafeSlug]/product/[productSlug]` reads product detail from PostgreSQL
- `/q/[qrCode]` reads active QR codes from PostgreSQL
- QR scans increment `scanCount`
- Public analytics records `qr_scan`, `menu_view`, and `product_view`
- Public menu UI is upgraded for a premium mobile-first experience

## Files

```txt
lib/public-menu/queries.ts
lib/public-menu/analytics.ts
app/(public)/m/[cafeSlug]/page.tsx
app/(public)/m/[cafeSlug]/product/[productSlug]/page.tsx
app/(public)/q/[qrCode]/route.ts
components/public-menu/cafe-hero.tsx
components/public-menu/cafe-menu-client.tsx
components/public-menu/product-card.tsx
```

## Public UX

- Premium hero with cafe cover, identity, contact, Instagram, and address
- Search-first mobile menu
- Sticky category filters
- Mood-based sorting
- Responsive product grid
- Product detail page with taste profile, story, and recommendations

## Analytics

Events are best-effort and do not break the public UX if analytics insertion fails.

## Notes

Only published and active cafes are visible publicly. Only active products are shown. Product availability is controlled by cafe settings.
