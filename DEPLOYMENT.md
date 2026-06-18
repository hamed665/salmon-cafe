# Deployment Notes

## Local Setup

```bash
cp package.selfhost.json package.json
npm install
cp .env.example .env.local
npm run dev
```

## Docker Setup

```bash
cp .env.docker.example .env.docker
docker compose up -d --build
docker compose exec app npm run db:push
```

## Environment Variables

```txt
NEXT_PUBLIC_APP_URL
DATABASE_URL
```

## Production Target

```txt
VPS
Docker Compose
PostgreSQL
Nginx
SSL
```

## Checklist

- Prepare VPS
- Point domain to server
- Install Docker
- Clone repository
- Configure environment file
- Run Docker Compose
- Run database setup
- Create admin user
- Add first cafe
- Add products
- Test public menu
- Test dashboard
- Test QR redirect
