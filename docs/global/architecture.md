# Global Architecture

ApxDenta is a Bun/Turborepo monorepo for a dental management platform.

## Major Boundaries

- `apps/webapp`: React/Vite frontend using TanStack Router, React Query, Tailwind, and shared UI components.
- `apps/server`: Hono-based server entrypoint and middleware shell.
- `packages/domain`: business/domain layer, authentication helpers, database client/schema/migrations, API routes, and API client.
- `packages/ui`: shared React UI primitives, hooks, styles, and utility helpers.
- `packages/schemas`: Zod validation schemas shared across app and domain boundaries.
- `packages/email`: email rendering and transactional templates.
- `packages/error`: shared error types and utilities.
- `tools`: shared TypeScript configuration.

## Repository Invariants

- Prefer shared packages for cross-app contracts instead of duplicating types or UI primitives in app folders.
- Check `docs/global/coding-standards.md` for established pagination, feature file organization, and current feature/page coding patterns; the staff feature is the reference shape for list/card/detail/create/update/archive pages.
- Do not add dependencies for routine UI or data-flow work without a clear need; use existing packages first.
- Keep feature-specific knowledge under `docs/features/<feature>/` and reserve this file for cross-repo truths.

## Verification Shape

Prefer targeted verification first:

- app/package-level typecheck or test when available,
- `bun run lint` or `bun run ts-compile` for broader TypeScript/style confidence,
- `bun run build` when boundaries, routing, or package exports changed.

Document any verification gap in the final response.
