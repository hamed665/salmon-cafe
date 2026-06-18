# Hosting Handoff Guide

This project should be deliverable without Vercel and without Supabase Cloud.

## Full App Hosting Needs

The full dynamic version needs one of these environments:

- VPS with Docker
- VPS with Node.js and PostgreSQL
- cPanel with Node.js support plus PostgreSQL
- DirectAdmin with Node.js support plus PostgreSQL

A PHP-only shared host is only suitable for a static demo, not the full app.

## Best Delivery Path

Recommended production target:

```txt
VPS + Docker Compose + PostgreSQL + Nginx
```

Deployment command:

```bash
docker compose up -d --build
```

## Delivery Modes

### Source Code Only

Client receives source code and docs. Client handles hosting, domain, database, SSL, deployment, backups, and maintenance.

### Self Hosted Package

Client receives source code plus Docker files, PostgreSQL service, Nginx config, and production run instructions.

### Static Demo

Client receives a static demo only. This mode does not include real dashboard CRUD, auth, database, analytics, or uploads.

## Contract Text

Delivery includes source code and technical documentation. Hosting, server purchase, domain setup, SSL, database setup, deployment, backups, and ongoing maintenance are separate services unless explicitly included in the agreement.

## Production Checklist

- Buy VPS
- Point domain to VPS
- Install Docker
- Clone repository
- Configure environment variables
- Run Docker Compose
- Configure SSL
- Run migrations
- Create admin user
- Test public menu
- Test dashboard
- Test QR redirect
- Configure backups
