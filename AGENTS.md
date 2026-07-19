# Repository Guidelines

## Project Structure & Module Organization

UrbanDwell is a Vite-powered React 18 client. Application code uses a feature-first structure in `src/`:

- `app/` contains application composition, authentication providers, routing, and access guards.
- `layouts/` defines the public and dashboard shells.
- `features/` owns route-level screens and feature-private components, grouped by domain.
- `shared/` contains reusable components, hooks, API clients, contexts, and library configuration.
- `assets/` stores bundled images and fonts; `public/` contains files copied unchanged at build time.

Use the `@/` alias for shared and cross-feature imports. Use relative imports only within the same feature folder. Shared modules must not import from `app/` or `features/`. Keep feature-specific components beside their page; extract only genuinely reused code.

## Build, Test, and Development Commands

- `npm install` installs the locked dependencies from `package-lock.json`.
- `npm run dev` starts Vite with hot module replacement.
- `npm run lint` checks all JavaScript and JSX with ESLint; warnings fail the command.
- `npm run build` creates the production bundle in `dist/`.
- `npm run preview` serves the built bundle for a local production check.

Before opening a pull request, run `npm run lint && npm run build`.

## Coding Style & Naming Conventions

Use ES modules and JSX. Follow ESLint, React Hooks rules, and nearby code. Use 2-space indentation, semicolons, and double quotes. Name components and files in PascalCase (`PaymentHistoryTable.jsx`), hooks with a `use` prefix (`useAxiosPublic.jsx`), and variables/functions in camelCase. Prefer small functional components and Tailwind/DaisyUI utilities over new global CSS.

## Testing Guidelines

No automated test runner or coverage threshold is configured. Treat linting and a production build as required checks. Manually verify changed routes at desktop and mobile widths, including loading, empty, error, authentication, and role-restricted states. If introducing tests, use `*.test.jsx` beside the component and add the runner command to `package.json`.

## Configuration & Security

Store Firebase, image-hosting, and Stripe values in local `VITE_*` environment variables. Never commit `.env` files, access tokens, private Stripe keys, or production credentials. Remember that every `VITE_*` value is exposed to browser code.

## Commit & Pull Request Guidelines

Recent commits use short descriptive subjects such as `Dark Mode Updated` and `navlink bug fixed`, without Conventional Commit prefixes. Keep subjects concise and imperative, preferably scoped to one change (for example, `Fix dashboard payment route`). Pull requests should explain the user-visible impact, list verification performed, link relevant issues, and include screenshots or recordings for UI changes. Call out new environment variables or backend/API dependencies explicitly.
