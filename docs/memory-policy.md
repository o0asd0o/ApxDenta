# Repository Memory Policy

ApxDenta should get smarter over time without becoming harder to navigate. The goal is path-routed memory: future agents load the smallest useful set of docs for the files they are touching.

## What Belongs Where

### `AGENTS.md`

Use for operating rules only:

- how agents should retrieve context,
- verification expectations,
- repository-wide behavioral constraints,
- pointers to docs and external instructions.

Do not put feature architecture, debugging stories, or long-lived design rationale in `AGENTS.md`.

### `docs/context-index.md`

Use for retrieval routing:

- path-to-doc mappings,
- global docs that should be loaded for broad changes,
- rules for when docs should be updated.

Do not turn the index into a knowledge base.

### `docs/global/architecture.md`

Use for rare cross-repository truths:

- monorepo boundaries,
- app/package responsibilities,
- dependency and runtime constraints,
- system-wide invariants.

If a note applies to only one feature, keep it under `docs/features/<feature>/`.

### `docs/features/<feature>/context.md`

Use for durable feature context:

- business rules,
- domain vocabulary,
- important data flows,
- files that future agents usually need together,
- assumptions that are not obvious from code.

### `docs/features/<feature>/seams.md`

Use for stable integration boundaries:

- UI-to-domain contracts,
- API request/response expectations,
- schema boundaries,
- extension points future work should preserve.

### `docs/features/<feature>/debugging.md`

Use for hard-won operational memory:

- recurring errors,
- flaky tests and root causes,
- migration traps,
- environment setup pitfalls,
- verified fixes.

### `docs/features/<feature>/adr/`

Use ADRs only when a real decision was made among alternatives. Include:

- context,
- options considered,
- chosen option,
- consequences,
- date and status.

## What Not To Store

- Task transcripts.
- Temporary plans.
- Unverified guesses.
- Low-level restatements of code.
- One-off implementation details unlikely to matter again.
- Large pasted logs when a short root cause would do.

## Update Heuristic

Update memory when at least one answer is yes:

- Would a future agent otherwise repeat this investigation?
- Did we discover a non-obvious invariant?
- Did we choose between meaningful alternatives?
- Did a test, build, migration, or integration fail in a reusable way?
- Did a feature boundary or path routing change?

If all answers are no, skip the docs update.

## Quality Bar

Good memory is small, specific, and retrievable. Prefer a few precise bullets with file paths over broad essays.
