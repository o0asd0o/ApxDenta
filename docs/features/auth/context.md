# Auth Context

## Scope

Webapp auth routes, auth client behavior, domain auth logic, permissions, and user account email templates.

## Current Baseline

- `apps/webapp/src/features/auth/**`
- `apps/webapp/src/routes/(auth)/**`
- `apps/webapp/src/lib/auth-client.ts`
- `packages/domain/src/auth/**`
- `packages/email/src/templates/users/**`

## Load When

Load this context for login, registration, password reset, email verification, invitation, auth-client, permission, or auth email changes.

## Update Triggers

Update this file when auth flows, token rules, permission invariants, invitation ownership, or auth email contracts change.
