# Treatments Context

## Scope

Treatment management UI, clinic treatment route entrypoints, domain treatment routes, treatment schema, seed fixtures, and treatment database model behavior.

## Current Baseline

- `apps/webapp/src/features/treatments/**`
- `apps/webapp/src/routes/_protected/(clinic)/treatments/**`
- `packages/domain/src/server/routes/treatments/**`
- `packages/schemas/src/treatment.schema.ts`
- `packages/domain/src/db/seeder-fixtures/dental-treatments.ts`

## Load When

Load this context for treatment list, detail, create, update, archive, validation, route, seed fixture, or treatment persistence changes.

## Update Triggers

Update this file when treatment lifecycle, schema rules, seed data assumptions, route ownership, or treatment persistence invariants change.
