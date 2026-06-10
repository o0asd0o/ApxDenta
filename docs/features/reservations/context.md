# Reservations Context

## Scope

Clinic reservation calendar UI, reservation route entrypoint, reservation visual semantics, and matching domain route behavior.

## Current Baseline

- Prior OMX work captured a visual alignment rule for reservation cards: workflow status and visual/payment state are separate layers.
- Workflow status controls the right-side status pill label and dot.
- Visual/payment state controls the event card background and top-left icon.
- If a reservation is `DONE` but visually unpaid, the pill still represents the workflow status while the card background/icon represent payment state.
- `apps/webapp/src/features/reservations/**`
- `apps/webapp/src/routes/_protected/(clinic)/reservations.tsx`
- `packages/domain/src/server/routes/reservations/**`

## Load When

Load this context for reservation calendar UI, day/week views, reservation cards, visual state, reservation route, or reservation domain changes.

## Update Triggers

Update this file when reservation workflow states, visual/payment semantics, calendar data shape, route ownership, or reservation domain contracts change.
