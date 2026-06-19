# Auth Handoff

Phase 3 adds internal authentication for the self-host version.

## Runtime model

- Credentials auth
- Scrypt password hashing
- Signed HTTP-only session cookie
- Application-level route guards
- Admin and cafe-owner role checks

## Roles

```txt
PLATFORM_ADMIN
SUPPORT_ADMIN
CAFE_OWNER
CAFE_MANAGER
VIEWER
```

## Protected routes

```txt
/dashboard
/admin
```

The middleware checks whether a session cookie exists. Server-side layout guards verify the user and role before rendering protected pages.

## Admin setup

Use the admin creation script with environment variables for email and password. Run it after database setup.

```bash
npm run admin:create
```

## Required environment value

Set `AUTH_SECRET` in production. Use a long random value.
