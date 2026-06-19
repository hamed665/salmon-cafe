# Phase 7 Admin Analytics

Phase 7 adds the real management brain of the platform.

## Scope

- Real cafe analytics dashboard
- Platform admin overview
- Cafe activation and publishing controls
- Plan creation and updates
- Manual subscription assignment
- Manual payment registration
- QR scan, menu view, and product view reporting
- Top product reporting
- Recent event feed

## Files

```txt
lib/admin/queries.ts
lib/admin/actions.ts
lib/analytics/dashboard.ts
app/admin/page.tsx
app/dashboard/analytics/page.tsx
```

## Dashboard Analytics

The cafe dashboard now shows:

- Menu views
- QR scans
- Product views
- Mood selections
- Searches
- Recommendation clicks
- Top products
- QR performance
- Recent events

## Admin Panel

The admin panel now supports:

- Platform totals
- Cafe status management
- Public publish toggle
- Plan creation
- Plan editing
- Subscription assignment
- Manual payment record
- Recent payment list

## Notes

Payments are manual records only. No payment gateway is implemented in this phase.
