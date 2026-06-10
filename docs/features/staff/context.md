# Staff Context

## Scope

Staff management UI, clinic staff route entrypoints, domain staff routes, staff schema, auth/permission interactions, and staff email templates.

## Current Baseline

- `apps/webapp/src/features/staff/**`
- `apps/webapp/src/routes/_protected/(clinic)/staff-list/**`
- `packages/domain/src/server/routes/staff/**`
- `packages/domain/src/auth/permissions/**`
- `packages/schemas/src/staff.schema.ts`
- `packages/email/src/templates/staff/**`

## Load When

Load this context for staff list, detail, create, update, archive, permission, validation, invitation, or staff email changes.

## Update Triggers

Update this file when staff roles, permissions, lifecycle, archive behavior, invitation flows, or staff schema contracts change.
