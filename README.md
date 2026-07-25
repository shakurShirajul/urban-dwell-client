# Urban Dwell

Urban Dwell is a role-based apartment management web application. Visitors can
explore available apartments and request an agreement, while residents, members,
and administrators receive dedicated dashboard experiences for announcements,
rent payments, agreements, coupons, and member management.

## Features

- Public landing page with apartment highlights, coupons, and an interactive map
- Apartment browsing and agreement requests
- Email/password and Google authentication through Firebase
- Server-verified authentication with signed, HTTP-only session cookies
- Role-protected dashboards for users, members, and administrators
- Stripe-powered rent payments and payment history
- Announcement, coupon, agreement, and member administration
- Responsive layouts with loading, empty, error, and unauthorized states

## Technology

- [Next.js](https://nextjs.org/) App Router
- React 19 and strict TypeScript
- Tailwind CSS 4 and DaisyUI 5
- Firebase Authentication and Firebase Admin
- TanStack Query and Axios
- React Hook Form
- Stripe Elements
- React Leaflet
- Zod and JOSE

## Prerequisites

Before running the project, install or provision:

- Node.js 20.9 or newer
- npm
- A running Urban Dwell backend API
- A Firebase project with client and service-account credentials
- Stripe publishable credentials for rent payments
- An ImgBB API key for image uploads

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create the local environment file:

   ```bash
   cp .env.example .env
   ```

3. Fill in the required values in `.env`.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).w

## Environment Variables

The checked-in [.env.example](./.env.example) file is the source of truth for
local configuration.

### Browser-safe configuration

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Authentication domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase application ID |
| `NEXT_PUBLIC_IMAGE_HOSTING_KEY` | ImgBB API key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `NEXT_PUBLIC_SITE_URL` | Canonical application URL used by Next.js metadata |

### Server-only configuration

| Variable | Description |
| --- | --- |
| `API_URL` | Backend origin, with or without a trailing `/api` |
| `NEXT_SESSION_SECRET` | Secret used to sign application sessions; use at least 32 random bytes |

Never prefix secrets with `NEXT_PUBLIC_`, and never
commit a populated `.env` file.

## Available Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run typecheck` | Check strict TypeScript without emitting files |
| `npm run lint` | Run ESLint and fail on warnings |
| `npm run test` | Run the currently configured validation test (TypeScript checking) |
| `npm run build` | Create an optimized production build |
| `npm start` | Serve the production build |

No unit or integration test runner is configured yet. Type checking, linting, a
production build, and manual browser verification are the current quality gates.

## Project Structure

```text
src/
├── app/
│   ├── (auth)/          # Login and signup routes
│   ├── (public)/        # Public pages and layout
│   ├── api/             # Session exchange and authenticated backend proxy
│   ├── dashboard/       # Role-protected dashboard routes and layouts
│   ├── layout.tsx       # Root layout and metadata
│   └── providers.tsx    # Application-level client providers
├── assets/              # Bundled images and fonts
├── features/            # Domain UI, forms, and feature-specific hooks
├── layouts/             # Shared application shells
├── server/              # Server environment, Firebase Admin, and sessions
├── shared/              # Reusable API, components, contexts, hooks, and utilities
└── types/               # Shared domain types
```

Cross-feature imports use the `@/` alias. Feature-private modules stay beside
their owning feature, and shared modules do not depend on `app/` or `features/`.

## Routes and Access

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Landing page |
| `/apartments` | Public | Browse apartments and request an agreement |
| `/login`, `/signup` | Public | Authentication |
| `/dashboard/myprofile` | Any authenticated role | Resident profile |
| `/dashboard/announcement` | Any authenticated role | Building announcements |
| `/dashboard/makepayment` | Member | Prepare a rent payment |
| `/dashboard/paymentpage` | Member | Complete a Stripe payment |
| `/dashboard/paymenthistory` | Member | View rent payment history |
| `/dashboard/adminprofile` | Admin | Administrative overview |
| `/dashboard/managemember` | Admin | Manage members |
| `/dashboard/makeannouncement` | Admin | Publish announcements |
| `/dashboard/agreementrequest` | Admin | Review apartment agreements |
| `/dashboard/managecoupons` | Admin | Manage payment coupons |
| `/unauthorized` | Public | Role-access error page |

The backend uses three roles:

- `user`: an authenticated resident who has not yet become a member
- `member`: a resident with access to rent payment features
- `admin`: a building administrator

## Authentication Architecture

Firebase handles user authentication in the browser. After sign-in, the
backend verifies the Firebase ID token against Firebase public signing keys and
stores the resulting
application session in a signed, HTTP-only cookie.

Protected layouts validate that session and refresh the user's current role from
the backend before rendering. Authenticated browser requests go through
`/api/backend/[...path]`, which adds the backend token on the server. This keeps
the token out of browser storage and client-side application code.

Sessions expire after one hour. Invalid sessions redirect to `/login`, while
authenticated users without the required role are sent to `/unauthorized`.

## Verification

Run the complete project checks before submitting a change:

```bash
npm run typecheck
npm run lint
npm run build
```

For UI changes, also check the affected routes at desktop and mobile widths.
Exercise relevant loading, empty, error, authentication, and role-restricted
states.

## Deployment

Deploy Urban Dwell to a Next.js-compatible Node.js host:

1. Configure all required environment variables in the hosting platform.
2. Run `npm run build`.
3. Start the application with `npm start`.

The application uses dynamic server rendering, server-side authentication, and
route handlers. It cannot be deployed as a static `out/` directory.
