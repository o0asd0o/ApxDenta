# Server API Context

## Scope

Hono server entrypoint/middleware, domain server routes, server utilities, and API client boundary.

## Current Baseline

- `apps/server/src/**`
- `packages/domain/src/server/**`
- `packages/domain/src/api-client.ts`
- `docs/global/coding-standards.md` says paginated queries should use `executeWithOffsetPagination` rather than ad hoc pagination.

## Load When

Load this context for server entrypoint, middleware, domain route, API client, pagination, or server utility changes.

## Update Triggers

Update this file when API route contracts, middleware behavior, pagination conventions, API client ownership, or server utility boundaries change.
