# Database Context

## Scope

Prisma schema, migrations, database client exports, and seed fixtures under `packages/domain/src/db`.

## Current Baseline

- `packages/domain/src/db/index.ts`
- `packages/domain/src/db/client.ts`
- `packages/domain/src/db/prisma/schema.prisma`
- `packages/domain/src/db/prisma/migrations/**`
- `packages/domain/src/db/seeder-fixtures/**`

## Load When

Load this context for database schema, migration, database client, seed fixture, or persistence-contract changes.

## Update Triggers

Update this file when schema invariants, migration strategy, model ownership, seed data rules, or persistence boundaries change.
