# Urban Dwell

Urban Dwell is a responsive building-management web application for apartment discovery, resident services, and administrative operations. Visitors can explore available apartments and request an agreement, while authenticated residents and administrators receive role-specific dashboards.

[View the live application](https://urbandwell.netlify.app/)

## Features

- Browse available apartments with pagination and agreement requests
- Authenticate with email/password or Google through Firebase
- Access protected, member-only, and administrator-only routes
- Manage apartment agreements, members, coupons, and announcements
- Complete rent payments with Stripe and review payment history
- Explore the building location with an interactive Leaflet map
- Switch between responsive light and dark interfaces
- Cache and synchronize server data with dedicated TanStack Query hooks

## Technology stack

| Area | Technology |
| --- | --- |
| Application | React 18, Vite 5, React Router 6 |
| Styling | Tailwind CSS 4, DaisyUI 5 |
| Server state | TanStack Query 5, Axios |
| Forms | React Hook Form |
| Authentication | Firebase Authentication, JWT API sessions |
| Payments | Stripe Elements |
| Maps | Leaflet, React Leaflet |
| Metadata | React Helmet Async |

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- A Firebase web application
- Access to a compatible Urban Dwell API
- Stripe and ImgBB credentials for payment and profile-image features

### Installation

```bash
git clone git@github.com:shakurShirajul/urban-dwell-client.git
cd urban-dwell-client
npm install
cp .env.example .env
```

Add your local credentials to `.env`, then start the development server:

```bash
npm run dev
```

Vite prints the local development URL in the terminal, typically `http://localhost:5173`.

## Environment variables

All client environment variables must begin with `VITE_`. Copy `.env.example` and configure the following values:

| Variable | Purpose |
| --- | --- |
| `VITE_apiKey` | Firebase web API key |
| `VITE_authDomain` | Firebase authentication domain |
| `VITE_projectId` | Firebase project identifier |
| `VITE_storageBucket` | Firebase storage bucket |
| `VITE_messagingSenderId` | Firebase messaging sender identifier |
| `VITE_appId` | Firebase application identifier |
| `VITE_IMAGE_HOSTING_KEY` | ImgBB API key for profile-image uploads |
| `VITE_PAYMENT_GATEWAY_PK` | Stripe publishable key |
| `VITE_API_URL` | Backend API base URL |

> Every `VITE_*` value is bundled into browser code. Never place Firebase service-account credentials, Stripe secret keys, JWT secrets, or other private server credentials in this file.

## Available commands

```bash
npm run dev      # Start the Vite development server
npm run lint     # Run ESLint; warnings fail the command
npm run build    # Create an optimized production build in dist/
npm run preview  # Preview the production build locally
```

Before submitting a change, run:

```bash
npm run lint && npm run build
```

## Project structure

```text
src/
├── app/                 # Router, authentication provider, and route guards
├── assets/              # Bundled images and fonts
├── features/            # Feature-owned pages, components, and query hooks
│   ├── apartments/
│   ├── auth/
│   ├── coupons/
│   ├── dashboard/
│   └── home/
├── layouts/             # Public and dashboard application shells
├── shared/
│   ├── api/             # Public and authenticated HTTP clients
│   ├── components/      # Reusable UI and feedback components
│   ├── contexts/        # Shared React contexts
│   ├── hooks/           # Cross-feature hooks
│   └── lib/             # Firebase and shared utilities
├── index.css            # Tailwind, DaisyUI, theme tokens, and global styles
└── main.jsx             # Application providers and React entry point
```

Feature-specific code should stay inside its feature directory. Shared UI should remain presentation-focused, while API calls, query keys, mutations, and cache invalidation belong in dedicated hooks.

The `@` import alias points to `src`, so imports can use paths such as:

```jsx
import { publicApi } from "@/shared/api/http-clients";
```

## Main routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Marketing home page |
| `/apartments` | Public | Available apartment listings |
| `/login` | Public | Resident sign-in |
| `/signup` | Public | Account registration |
| `/dashboard/*` | Authenticated | Role-aware resident and admin tools |

Dashboard pages are further protected with private, member, and administrator route guards.

## Data and authentication flow

Firebase manages browser authentication. After Firebase resolves the signed-in user, the client exchanges the user's email with the API for a JWT and stores it in local storage. Authenticated Axios requests attach that token through the secure API hook.

TanStack Query handles remote data. Components consume feature hooks rather than calling queries directly, which centralizes cache keys, request behavior, loading state, mutations, and invalidation.

## Deployment

Run `npm run build` and deploy the generated `dist/` directory. Because the application uses client-side routing, configure the hosting provider to rewrite unknown routes to `/index.html`.

Set all required environment variables in the hosting provider before building. Use a Stripe publishable key in the client and keep all secret credentials on the backend.

## Quality checks

The repository currently uses ESLint and the production build as its required automated checks. No automated test runner is configured yet. Manually verify affected routes at mobile and desktop widths, including loading, empty, error, authentication, and role-restricted states.

## Contributing

- Use ES modules and functional React components.
- Use kebab-case for JavaScript and JSX filenames.
- Keep reusable server-state logic in custom query hooks.
- Prefer existing Tailwind utilities, theme tokens, and shared components.
- Keep changes focused and include screenshots for visible UI updates.
