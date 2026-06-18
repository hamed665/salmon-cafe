# Iran Delivery and Handoff Plan

## Recommended Delivery Rule

Do not make the project depend on Supabase Cloud for an Iran-based handoff.

For an Iran delivery, the project should be handed off in one of these modes:

1. Source code only
2. Self-host-ready deployment
3. Client-managed cloud deployment

The safest commercial option is self-host-ready deployment.

## Recommended Production Stack for Iran Handoff

```txt
Next.js
PostgreSQL
Prisma or Drizzle ORM
Auth.js or custom credentials auth
Local file storage or S3-compatible storage
Docker Compose
Nginx reverse proxy
VPS deployment
```

## What Changes From Supabase Cloud

Replace:

```txt
Supabase Auth
Supabase PostgreSQL cloud access
Supabase Storage
Supabase RLS dependency
```

With:

```txt
PostgreSQL database
Application-level authorization
Auth.js or custom auth
Local/S3-compatible storage
ORM migrations
Docker Compose
```

## Delivery Package

The final handoff should include:

```txt
README.md
.env.example
Dockerfile
docker-compose.yml
DATABASE_SCHEMA.md
MVP_SCOPE.md
PROJECT_ARCHITECTURE.md
DEPLOYMENT.md
Migration files
Seed data
Admin user setup instructions
Build instructions
Production runbook
```

## Client Responsibility

If the agreement is source-code handoff only, the client is responsible for:

```txt
VPS
Domain
SSL
Database hosting
Object storage
Environment variables
Deployment
Backups
Monitoring
Maintenance
```

## Seller Responsibility

If the agreement includes deployment, the seller is responsible for:

```txt
Deploying the app
Configuring environment variables
Running migrations
Creating admin account
Testing public menu
Testing dashboard
Testing QR redirect
Providing handoff documentation
```

## Important Contract Wording

Use this wording in the delivery agreement:

```txt
This delivery includes source code and technical documentation. Production deployment, server purchase, domain setup, SSL setup, backup configuration, and ongoing maintenance are separate services unless explicitly included in the agreement.
```

## Practical Recommendation

For the Iran market, build the MVP so it can run without Supabase Cloud. Supabase can stay as an optional development path, but the deliverable should be deployable on a normal VPS with PostgreSQL and Docker.
