# Repository Guidelines

## Project Structure & Module Organization

Urban Dwell is a Next.js App Router application using React 19 and strict TypeScript. Application code uses a feature-first structure in `src/`:

- `app/` contains file-system routes, nested role layouts, API handlers, providers, metadata, and loading states.
- `layouts/` defines the public and dashboard shells.
- `features/` owns route-level screens and feature-private components, grouped by domain.
- `shared/` contains reusable components, hooks, API clients, contexts, and library configuration.
- `assets/` stores bundled images and fonts; `public/` contains files copied unchanged at build time.

Use the `@/` alias for shared and cross-feature imports. Use relative imports only within the same feature folder. Shared modules must not import from `app/` or `features/`. Keep feature-specific components beside their page; extract only genuinely reused code.

## Build, Test, and Development Commands

- `npm install` installs the locked dependencies from `package-lock.json`.
- `npm run dev` starts the Next.js development server.
- `npm run typecheck` checks strict TypeScript without emitting files.
- `npm run lint` checks TypeScript and TSX using the Next.js ESLint rules.
- `npm run build` creates an optimized production build in `.next/`.
- `npm start` serves the production build.

Before opening a pull request, run `npm run lint && npm run build`.

## Coding Style & Naming Conventions

Use ES modules and strict TypeScript. Follow ESLint, React Hooks rules, and nearby code. Use 2-space indentation, semicolons, and double quotes. Keep pages and layouts as Server Components unless browser APIs or interactivity require a narrow `"use client"` boundary. Prefer `next/link`, `next/image`, and Next.js metadata over SPA-specific alternatives.

## Testing Guidelines

No automated test runner or coverage threshold is configured. Treat linting and a production build as required checks. Manually verify changed routes at desktop and mobile widths, including loading, empty, error, authentication, and role-restricted states. If introducing tests, use `*.test.jsx` beside the component and add the runner command to `package.json`.

## Configuration & Security

Expose browser-safe configuration only through `NEXT_PUBLIC_*`. Keep `NEXT_SESSION_SECRET` and Firebase Admin credentials server-only. Never commit `.env`, access tokens, private Stripe keys, service-account credentials, or session secrets.

## Commit & Pull Request Guidelines

Recent commits use short descriptive subjects such as `Dark Mode Updated` and `navlink bug fixed`, without Conventional Commit prefixes. Keep subjects concise and imperative, preferably scoped to one change (for example, `Fix dashboard payment route`). Pull requests should explain the user-visible impact, list verification performed, link relevant issues, and include screenshots or recordings for UI changes. Call out new environment variables or backend/API dependencies explicitly.
