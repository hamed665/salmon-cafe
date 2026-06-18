# MVP Scope

## Product Definition

Salmon Cafe MVP is a Persian-only premium smart QR menu platform for cafes.

It should help a cafe:

- Show a beautiful mobile-first menu
- Present products better than a normal QR menu
- Push complementary products
- Understand basic customer behavior
- Look more premium in front of customers

## MVP Language and Market

```txt
Market: Iran
Language: Persian only
Direction: RTL
Currency: Toman
Public URL slugs: Latin
```

## In Scope

### Public Customer Side

- Public cafe page
- Premium hero section
- Category tabs
- Product list
- Search
- Product detail page
- Product images
- Prices in Toman
- Mood selector
- Taste profile
- Coffee/product story
- Manual recommendations
- Popular items
- Call, Instagram, and directions links

### Cafe Owner Dashboard

- Auth placeholder architecture
- Cafe profile management
- Logo and cover fields
- Category management
- Product management
- Product availability
- Product taste profile
- Product story
- Manual recommendations
- QR page
- Basic analytics page

### Platform Admin

- Admin overview
- Cafe management placeholder
- Subscription control placeholder
- Manual activation/deactivation architecture

### QR and Analytics

- QR redirect route
- Event types prepared
- Basic analytics data model
- QR scan tracking architecture

### Database

- Multi-tenant schema
- RLS-ready tables
- Strong indexes
- Plan/subscription tables
- Audit logs

## Out of Scope

These are intentionally excluded from MVP:

```txt
Online ordering
Online payment
Waiter call
Kitchen display
POS integration
AI chat
AI recommendation engine
Loyalty club
Wallet
SMS campaigns
Full gamification
Mobile app
Advanced multi-branch management
Full multi-language system
```

## Success Criteria

The MVP is successful if it can be shown to real cafes and at least a few are willing to pay setup or monthly subscription.

### Validation Goals

- 5 real cafes shown a working demo
- 3 cafes willing to pay setup fee
- 2 cafes willing to continue monthly
- 1 cafe interested in premium/custom design

## Recommended Pricing Test

### Starter

```txt
Setup: 2M - 3M Toman
Monthly: 490K - 690K Toman
```

### Pro

```txt
Setup: 5M - 8M Toman
Monthly: 990K - 1.5M Toman
```

### Premium

```txt
Setup: 12M - 20M Toman
Monthly: 2M - 4M Toman
```

## MVP Build Rule

The first version should look premium, load fast, and be easy to manage. New features should be added only after they support validation, sales, or operational reliability.
