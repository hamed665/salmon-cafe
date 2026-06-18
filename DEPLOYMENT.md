# Deployment Notes

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Required Environment Variables

```txt
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL
```

## Vercel Deployment

1. Import the repository into Vercel.
2. Add the environment variables.
3. Connect the Supabase project.
4. Deploy the `main` branch.

## Supabase Setup

Run migrations from the Supabase CLI:

```bash
supabase db reset
```

For production, apply migrations through the normal Supabase workflow.

## MVP Launch Checklist

- Create Supabase project
- Add env vars to Vercel
- Run database migration
- Create first admin user
- Create first demo cafe
- Upload cafe logo and cover
- Add products and categories
- Generate QR code
- Test `/m/cafe-noir`
- Test `/q/demo-cafe-noir`
- Test mobile layout on iPhone and Android
