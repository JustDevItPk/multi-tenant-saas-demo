# Multi-Tenant SaaS Demo

Demo implementation covering:

- Multi-tenant middleware with subdomain-based tenant resolution
- PostGIS geofence validation using Prisma and ST_Contains
- Real-time updates using Socket.io

## Tech Stack

- Next.js 14 App Router
- TypeScript
- PostgreSQL + PostGIS
- Prisma ORM
- Socket.io
- Docker

## Project Structure

```text
apps/
├── web/
│   ├── app/
│   ├── lib/
│   ├── middleware.ts
│   └── prisma/
│
└── socket-server/
    └── server.ts
```

## Prerequisites

- Node.js
- Docker

## Setup

### 1. Start PostGIS

```bash
docker run --name postgis-demo \
-e POSTGRES_PASSWORD=password \
-p 5432:5432 \
-d postgis/postgis:17-3.5
```

### 2. Install Dependencies

#### Web Application

```bash
cd apps/web
npm install
```

#### Socket Server

```bash
cd apps/socket-server
npm install
```

### 3. Environment Variables

Create `.env` inside `apps/web`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/postgres"
NEXT_PUBLIC_SOCKET_URL="http://localhost:4000"
```

### 4. Generate Prisma Client

```bash
cd apps/web
npx prisma generate
```

### 5. Run Socket Server

```bash
cd apps/socket-server
npm run dev
```

### 6. Run Next.js App

```bash
cd apps/web
npm run dev
```

## Features

### Multi-Tenant Middleware

- Extracts tenant from subdomain
- Looks up tenant in a mock Redis store
- Injects tenant headers
- Returns 404 for unknown tenants

### Geofence Validation

POST:

```http
/api/geofence
```

Request:

```json
{
  "lat": 5,
  "lng": 5
}
```

Response:

```json
{
  "inside": true
}
```

### Real-Time Updates

- Socket.io based counter synchronization
- Updates reflected across multiple browser tabs

## Test Routes

```text
http://localhost:3000
http://tenant1.localhost:3000/tenant
http://tenant2.localhost:3000/tenant
http://unknown.localhost:3000/tenant
```