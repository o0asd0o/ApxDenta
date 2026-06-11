# Finance Context

## Scope

Finance-facing accounts, purchases, payment methods, sales UI, and matching billing/purchase domain routes.

## Current Baseline

- `apps/webapp/src/features/accounts/**`
- `apps/webapp/src/features/purchases/**`
- `apps/webapp/src/features/sales/**`
- `apps/webapp/src/routes/_protected/(finance)/**`
- `packages/domain/src/server/routes/billing/**`
- `packages/domain/src/server/routes/purchases/**`

## Load When

Load this context for finance route views, account, payment method, purchase, sales, billing, or purchase domain changes.

## Update Triggers

Update this file when accounting rules, billing contracts, sales flows, purchase lifecycle, or payment-method ownership changes.
