# Physical Assets Context

## Scope

Stock and peripheral management UI plus matching domain routes.

## Current Baseline

- `apps/webapp/src/features/stocks/**`
- `apps/webapp/src/features/peripherals/**`
- `apps/webapp/src/routes/_protected/(physical-asset)/**`
- `packages/domain/src/server/routes/stocks/**`
- `packages/domain/src/server/routes/peripherals/**`

## Load When

Load this context for stock, peripheral, physical-asset route, inventory table, or physical-asset domain changes.

## Update Triggers

Update this file when stock/peripheral lifecycle, inventory rules, physical-asset ownership, or domain route contracts change.
