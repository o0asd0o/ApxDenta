# Schemas Context

## Scope

Shared Zod validation schemas and package exports consumed across webapp and domain boundaries.

## Current Baseline

- `packages/schemas/src/auth.schema.ts`
- `packages/schemas/src/patient.schema.ts`
- `packages/schemas/src/staff.schema.ts`
- `packages/schemas/src/treatment.schema.ts`
- `packages/schemas/src/index.ts`

## Load When

Load this context for auth, patient, staff, treatment, shared validation, or schema export changes.

## Update Triggers

Update this file when validation rules, schema ownership, cross-package schema contracts, or exported schema surfaces change.
