# ApxDenta Context Index

Use this file as the first stop for repository memory. Match the paths you are changing, then load only the linked docs that apply.

## Global Rules

Always load:

- `docs/memory-policy.md` when changing `AGENTS.md`, `docs/**`, `.github/copilot-instructions.md`, or repository memory/routing behavior.
- `docs/global/architecture.md` when changing app/package boundaries, cross-package contracts, build tooling, dependency strategy, authentication shape, database strategy, or deployment assumptions.
- `docs/global/coding-standards.md` when changing `apps/webapp/src/features/**`, feature route entrypoints under `apps/webapp/src/routes/**`, or feature file organization/import patterns. This global standard supersedes older convenience re-export examples in `.github/copilot-instructions.md`.

## Path Routing

| Touched path | Load these docs |
| --- | --- |
| `apps/webapp/src/features/reservations/**`, `apps/webapp/src/routes/_protected/(clinic)/reservations.tsx` | `docs/features/reservations/context.md`, `docs/features/reservations/seams.md`, `docs/features/reservations/debugging.md` |
| `apps/webapp/src/features/patients/**`, `apps/webapp/src/routes/_protected/(clinic)/patients.tsx`, `packages/domain/src/server/routes/patient/**`, `packages/schemas/src/patient.schema.ts` | `docs/features/patients/context.md`, `docs/features/patients/seams.md`, `docs/features/patients/debugging.md` |
| `apps/webapp/src/features/staff/**`, `apps/webapp/src/routes/_protected/(clinic)/staff-list/**`, `packages/domain/src/server/routes/staff/**`, `packages/schemas/src/staff.schema.ts`, `packages/email/src/templates/staff/**` | `docs/features/staff/context.md`, `docs/features/staff/seams.md`, `docs/features/staff/debugging.md` |
| `apps/webapp/src/features/treatments/**`, `apps/webapp/src/routes/_protected/(clinic)/treatments/**`, `packages/domain/src/server/routes/treatments/**`, `packages/schemas/src/treatment.schema.ts` | `docs/features/treatments/context.md`, `docs/features/treatments/seams.md`, `docs/features/treatments/debugging.md` |
| `apps/webapp/src/features/accounts/**`, `apps/webapp/src/features/sales/**`, `apps/webapp/src/features/purchases/**`, `packages/domain/src/server/routes/billing/**`, `packages/domain/src/server/routes/purchases/**` | `docs/features/finance/context.md`, `docs/features/finance/seams.md`, `docs/features/finance/debugging.md` |
| `apps/webapp/src/features/stocks/**`, `apps/webapp/src/features/peripherals/**`, `packages/domain/src/server/routes/stocks/**`, `packages/domain/src/server/routes/peripherals/**` | `docs/features/physical-assets/context.md`, `docs/features/physical-assets/seams.md`, `docs/features/physical-assets/debugging.md` |
| `apps/webapp/src/features/auth/**`, `apps/webapp/src/routes/(auth)/**`, `packages/domain/src/auth/**`, `packages/email/src/templates/users/**` | `docs/features/auth/context.md`, `docs/features/auth/seams.md`, `docs/features/auth/debugging.md` |
| `apps/webapp/src/components/**`, `packages/ui/**`, `apps/webapp/src/lib/**`, `apps/webapp/src/hooks/**` | `docs/features/shared-ui/context.md`, `docs/features/shared-ui/seams.md`, `docs/features/shared-ui/debugging.md` |
| `apps/server/**`, `packages/domain/src/server/**`, `packages/domain/src/api-client.ts` | `docs/features/server-api/context.md`, `docs/features/server-api/seams.md`, `docs/features/server-api/debugging.md` |
| `packages/domain/src/db/**`, `packages/domain/src/db/prisma/**` | `docs/features/database/context.md`, `docs/features/database/seams.md`, `docs/features/database/debugging.md` |
| `packages/email/**` | `docs/features/email/context.md`, `docs/features/email/seams.md`, `docs/features/email/debugging.md` |
| `packages/schemas/**` | `docs/features/schemas/context.md`, `docs/features/schemas/seams.md`, `docs/features/schemas/debugging.md` |
| `packages/error/**` | `docs/features/error-handling/context.md`, `docs/features/error-handling/seams.md`, `docs/features/error-handling/debugging.md` |
| `package.json`, `turbo.json`, `vitest.*`, `biome.json`, `lefthook.yml`, `tools/**` | `docs/features/tooling/context.md`, `docs/features/tooling/seams.md`, `docs/features/tooling/debugging.md` |

If a matching file is still a scaffold, update it only when you have durable context worth preserving.

## Documentation Update Rules

- Keep `AGENTS.md` operational and short.
- Keep this index focused on routing, not explanations.
- Put feature facts in `docs/features/<feature>/context.md`.
- Put stable extension boundaries and cross-module contracts in `seams.md`.
- Put repeated failures, setup traps, and verified fixes in `debugging.md`.
- Put decisions with considered alternatives in `adr/`.
- Prefer one small, accurate note over broad speculative documentation.

## Session Closeout

Before finishing substantial work, check whether touched paths imply a docs update. If no docs changed, mention that no durable memory update was needed.
