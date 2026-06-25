# ServiceHub

ServiceHub is a full-stack marketplace that connects customers with local service
professionals — electricians, plumbers, carpenters, AC technicians, painters and
appliance repair technicians. Providers list their services and pricing, customers
browse and book appointments with an approximate budget, and admins oversee the
whole platform.

## Tech stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT with role-based access control (customer / provider / admin)

## Project structure

```
servicehub/
├── frontend/      React + Vite app
├── backend/       Express API
├── .env.example   Reference for environment variables
└── README.md
```

## Getting started

### 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# edit .env with your MongoDB Atlas URI and a JWT secret
npm run dev
```

The API runs on `http://localhost:5000` by default.

### 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
# edit .env if your API runs on a different URL
npm run dev
```

The app runs on `http://localhost:5173` by default.

### 3. Create an admin user

There is no public admin signup screen by design. To create an admin:

1. Register a normal account through the app (role customer or provider).
2. In MongoDB Atlas (or via `mongosh`), update that user's `role` field to `"admin"`.
3. Log in again — you'll be routed to `/admin/dashboard`.

## Environment variables

| Variable | Location | Description |
|---|---|---|
| `MONGO_URI` | `backend/.env` | MongoDB Atlas connection string |
| `JWT_SECRET` | `backend/.env` | Secret used to sign JWTs |
| `PORT` | `backend/.env` | Port for the Express server (default 5000) |
| `VITE_API_URL` | `frontend/.env` | Base URL the frontend uses to call the API |

## Core features

**Customers**
- Register / log in
- Browse and search providers, filter by category
- View a provider's profile
- Schedule an appointment with a preferred date and an approximate budget
- View booking history and status (pending / accepted / rejected / completed)

**Service providers**
- Register / log in
- Create and update a provider profile (category, experience, location, pricing, description)
- View incoming booking requests
- Accept, reject or mark bookings as completed

**Admin**
- View all customers and providers
- Remove users or providers
- View all bookings on the platform
- See platform-wide stats

## Deployment

- **Frontend → Vercel:** set the project root to `frontend/`, build command `npm run build`,
  output directory `dist`, and add the `VITE_API_URL` environment variable pointing to your
  deployed backend.
- **Backend → Render:** set the project root to `backend/`, build command `npm install`,
  start command `npm start`, and add `MONGO_URI`, `JWT_SECRET`, `PORT`, `NODE_ENV` as
  environment variables.
- **Database → MongoDB Atlas:** create a free cluster, whitelist `0.0.0.0/0` (or your
  Render IPs) and use the connection string as `MONGO_URI`.

## API overview

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/profile` | Authenticated |
| GET | `/api/providers` | Public |
| GET | `/api/providers/:id` | Public |
| GET | `/api/providers/me/profile` | Provider |
| POST | `/api/providers` | Provider |
| DELETE | `/api/providers/:id` | Admin |
| POST | `/api/bookings` | Customer |
| GET | `/api/bookings/my` | Customer |
| GET | `/api/bookings/provider` | Provider |
| PUT | `/api/bookings/:id/status` | Provider |
| GET | `/api/bookings` | Admin |
| GET | `/api/admin/users` | Admin |
| DELETE | `/api/admin/users/:id` | Admin |
| GET | `/api/admin/stats` | Admin |
