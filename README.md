# Multi-Tenant SaaS Demo

A demo project implementing the three required technical tasks:

- Multi-tenant middleware with subdomain-based tenant resolution
- PostGIS geofence validation using Prisma and ST_Contains
- Real-time updates using Socket.io

## Tech Stack

- Next.js 16
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
│   └── middleware.ts
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

#### Web App

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
```

### 4. Run Socket Server

```bash
cd apps/socket-server
npm run dev
```

### 5. Run Next.js App

```bash
cd apps/web
npm run dev
```

## Features

### Multi-Tenant Middleware

- Extracts tenant from subdomain
- Performs tenant lookup
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
