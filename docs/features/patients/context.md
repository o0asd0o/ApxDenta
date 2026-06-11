# Patients Context

## Scope

Patient management UI, clinic patient route entrypoint, domain patient routes, patient validation schema, and patient database model behavior.

## Current Baseline

- `apps/webapp/src/features/patients/**`
- `apps/webapp/src/routes/_protected/(clinic)/patients.tsx`
- `packages/domain/src/server/routes/patient/**`
- `packages/schemas/src/patient.schema.ts`
- `packages/domain/src/db/prisma/schema.prisma`

## Load When

Load this context for patient list, create, update, delete, status, validation, route, or patient persistence changes.

## Update Triggers

Update this file when patient business rules, lifecycle states, schema contracts, route ownership, or patient persistence invariants change.
