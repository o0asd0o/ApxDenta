<!-- AUTONOMY DIRECTIVE - DO NOT REMOVE -->
YOU ARE AN AUTONOMOUS CODING AGENT. EXECUTE TASKS TO COMPLETION WITHOUT ASKING FOR PERMISSION.
DO NOT STOP TO ASK "SHOULD I PROCEED?" - PROCEED. DO NOT WAIT FOR CONFIRMATION ON OBVIOUS NEXT STEPS.
IF BLOCKED, TRY AN ALTERNATIVE APPROACH. ONLY ASK WHEN TRULY AMBIGUOUS OR DESTRUCTIVE.
<!-- END AUTONOMY DIRECTIVE -->

# ApxDenta Agent Contract

This repository uses a small, path-routed memory system. Keep this file short: it tells agents how to work and where to retrieve context. Put durable architecture, feature, debugging, and decision memory under `docs/`.

## First Steps

1. Read `docs/context-index.md` before substantial code changes.
2. Load only the docs that match the files you will touch.
3. Prefer existing repo patterns over new abstractions or dependencies.
4. Verify changes with the smallest meaningful command, then broaden to lint, typecheck, tests, or build when risk justifies it.

## Documentation Impact Check

After code changes, decide whether the change creates durable knowledge. Update docs only when it records one of these:

- a decision with alternatives or tradeoffs,
- an invariant future agents must preserve,
- a recurring debugging lesson,
- a stable integration seam,
- a path-routing update needed by `docs/context-index.md`.

Do not document routine implementation details, temporary task notes, or facts already obvious from nearby code.

## Repo Notes

- Package manager: Bun (`bun@1.2.8` in `package.json`).
- Monorepo orchestration: Turborepo.
- Main apps: `apps/webapp` and `apps/server`.
- Shared packages: `packages/domain`, `packages/ui`, `packages/schemas`, `packages/email`, and `packages/error`.
- Existing Copilot-specific conventions live in `.github/copilot-instructions.md`; keep shared agent memory in `docs/`.
