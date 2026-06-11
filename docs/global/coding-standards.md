# Global Coding Standards

These standards describe how feature pages should be organized and coded in ApxDenta. The current reference implementation is `apps/webapp/src/features/staff/**`; copy the shape, not every incidental line. Keep `.github/copilot-instructions.md` as a pointer to this file instead of duplicating coding rules there.

Server-side standards live in `docs/global/server-coding-standards.md`. Load that document for `apps/server/**`, `packages/domain/src/server/**`, and other server-facing route, handler, query, command, validation, pagination, or error-handling work.

## Staff-Style Feature Pattern

Use this pattern for record-management features with list, card, detail, create, update, filter, archive, and related sub-page flows.

### Route Boundary

- Keep TanStack route files thin. A route should lazy-load or directly mount the feature page, validate params when needed, and prefetch only the first useful query through `context.queryClient.ensureQueryData`.
- Keep page behavior inside `apps/webapp/src/features/<feature>/**`, not in `apps/webapp/src/routes/**`.
- Reference: `apps/webapp/src/routes/_protected/(clinic)/staff-list/index.tsx` prefetches `staffs.getAllStaffs`; `apps/webapp/src/routes/_protected/(clinic)/staff-list/$staffId.tsx` validates `staffId` and prefetches `staffs.getStaff`.

### Page Composition

- Let the route-level feature component own high-level tabs and URL state. Staff uses `StaffList.tsx` for `doctor` and `general` tabs via `nuqs`.
- Let the feature shell own list state: filters, search input, pagination, sorting, list/card layout, filter dialog visibility, and action providers. Staff uses `Staffs.tsx` for this role.
- Keep layout implementations separate. A table layout fetches paginated rows and renders `DataTable`; a card layout can fetch infinite pages and render a grid.
- Mount cross-cutting overlays, such as update and archive sheets/dialogs, once under the provider instead of duplicating modal state in every row or card.

### Action State

- Use feature-local context providers for shared action state that several render surfaces need, such as update, archive, and multi-archive actions.
- Prefer selector hooks from `use-context-selector` so callers consume only the state/action they need.
- Keep action triggers in shared renderers when both table rows and cards need the same menu behavior.
- Reference: `__common/context/StaffActionsProvider.tsx` owns modal mode, selected staff, selected rows, callbacks, and shared additional day-off state; `__common/context/context.tsx` exposes narrow selector hooks.

### Data Fetching

- Use `useTRPC()` with `queryOptions(...)` for standard React Query reads.
- Use `useTRPCClient()` only when the query shape requires a manual `queryFn`, such as an infinite query.
- Put the server filters into the query input, not client-only post-filtering.
- Use debounced search values for text search and reset pagination when search, filters, or layout changes alter the result set.
- Centralize invalidation for a feature in a small helper under `__common/queries.ts`. Staff invalidates total count, list query keys, and the manual card-list key after mutations.

### Mutations

- Keep mutation wrappers separate from presentational dialogs. The mutation wrapper owns `useMutation`, invalidation, toasts, and callbacks; the dialog receives `open`, `loading`, and command props.
- Use shared schemas from `@repo/schemas` for form validation and shared domain types from `@repo/domain/db` for display types.
- For create flows, use one flow-level orchestrator that accumulates step values and submits once at the final step.
- For update flows, reuse create leaf form components where possible, but let each update tab submit a partial mutation for its section.
- Remove temporary cached update defaults after a successful update.
- Upload files before submitting mutations that require stored file ids. When replacing an existing file, clean up the previous file when the existing feature pattern supports it.

### Detail Pages

- Wrap detail pages in the same action provider as list pages when they reuse update/archive actions.
- Keep the detail page responsible for header, breadcrumbs, main actions, archived-record redirects, and tab selection.
- Let each sub-page fetch its own specialized data. Do not overload the parent with every tab's data.
- Use sub-folder meta files for detail tabs that need table columns, shared display helpers, or local DTO types.

## Feature File Organization

Use direct file imports. Do not create `index.ts` or `index.tsx` barrel files for feature folders, component folders, context folders, or meta folders.

Preferred shape:

```text
apps/webapp/src/features/<feature>/
  FeaturePage.tsx
  FeatureShell.tsx
  __types.ts
  __helpers.ts
  __constants.ts
  __renderers.tsx
  __columns.tsx
  __common/
    queries.ts
    context/
      context.tsx
      FeatureActionsProvider.tsx
  components/
    OneComponent.tsx
  add/
    CreateFeature.tsx
    context/
      context.tsx
      CreateFeatureProvider.tsx
    forms/
      OneFormSection.tsx
  update/
    UpdateFeature.tsx
    forms/
      UpdateOneSection.tsx
  archive/
    ArchiveFeature.tsx
```

### Meta Files

Create meta files only when there is qualified code to put in them. Do not create empty scaffolds.

- `__types.ts`: feature-local DTOs, props shared by multiple files, filter types, layout prop types, and inferred form type aliases.
- `__columns.tsx`: TanStack `ColumnDef<T>[]` or column factory functions. This file may render cells, but it should import reusable JSX render helpers from `__renderers.tsx`.
- `__renderers.tsx`: shared JSX render helpers, menus, badges, compact row/card render snippets, and other React-dependent display functions used by more than one component.
- `__helpers.ts`: pure helpers, mapping functions, option lists, status color maps, and transformations with no JSX. Check `apps/webapp/src/lib/utils.ts` before adding new helpers; shared helpers include `cn`, `formatDate`, `getInitials`, `slugify`, `formatMonthYear`, `formatYear`, and `formatRelativeTime`. If several local files need the same shared helper, importing or re-exporting it through `__helpers.ts` is acceptable; do not route those convenience exports through `__columns.tsx`.
- `__constants.ts`: static constants that are feature-owned and not already available from shared app constants.
- `__common/queries.ts`: query invalidation helpers or query-key helpers shared by feature mutations/layouts.

Do not re-export types or helpers from `__columns.tsx` for convenience. Import from the owning meta file directly:

```ts
import { appointmentColumns } from './__columns';
import { APPOINTMENT_STATUS_COLORS, getInitials } from './__helpers';
import type { Appointment } from './__types';
```

## Component Rules

- One React component per file. If a component grows companion components, move each companion to its own file.
- Component files should focus on orchestration or presentation, not both. Move reusable table definitions, render helpers, option lists, data transforms, and shared types into qualified meta files.
- A file may keep small local helpers when they are private, pure, and not large enough to obscure the component.
- Prefer named exports for reusable leaf forms and helpers. Default exports are acceptable for route/page-level and single-owner components when that matches nearby code.
- Use `import type` for type-only imports.
- Use existing shared UI, app components, hooks, schemas, and domain types before adding new abstractions.
- Prefer object lookups for static status-to-class, status-to-label, and option maps instead of switch statements.
- Do not leave `console.log`, broad `@ts-ignore`, or commented-out imports in the adopted pattern.

## Forms

- Split each form section into its own component file under `add/forms` or the nearest flow folder.
- Create/update flows should reuse leaf form sections where the fields are the same.
- Keep stepper definitions and create-flow context in `add/context/context.tsx`; keep provider state in a separate provider file.
- For staff-like create flows, collect step values in context and submit the combined payload on the final step.
- For update flows, each tab should load defaults for its own section, submit only that section's payload, and invalidate through the feature helper.
- When schema differences depend on record type, derive the schema in the stepper factory instead of branching validation inside the leaf form.

## Table And Card Views

- Use `DataTable` for table/list mode and a dedicated card component for card mode.
- Keep list/card mode in the shared shell state via `useLayoutState` when the feature should preserve layout preference.
- Put column definitions in `__columns.tsx`; put card-only layout in a dedicated `*Card.tsx`; put pagination/infinite-scroll orchestration in separate `*ListLayout.tsx` and `*CardLayout.tsx` files.
- If list and card share actions or compact display snippets, move those to `__renderers.tsx`.
- Use stable empty, loading, and pagination states. Table mode should show loader rows; card mode should show grid loaders and an empty state.

## Domain And API Boundary

- Keep input validation schemas in `packages/schemas` when shared by webapp and domain.
- Keep frontend route files and feature code out of server business logic; server transport, handler, query, command, pagination, tenant filtering, and response-envelope rules are governed by `docs/global/server-coding-standards.md`.
- When a frontend change crosses into `apps/server/**` or `packages/domain/src/server/**`, load the server standards before editing the backend side of the contract.

## Staff Reference Map

- `StaffList.tsx`: route-level staff tab selection.
- `Staffs.tsx`: list/card shell state, search/filter/sort/pagination, action provider, and layout selection.
- `__columns.tsx`, `__renderers.tsx`, `__types.ts`, `__helpers.ts`: root list/card meta files.
- `components/StaffListLayout.tsx`: paginated table view.
- `components/StaffCardLayout.tsx` and `components/StaffCard.tsx`: infinite card view.
- `add/CreateStaff.tsx`, `add/context/**`, `add/forms/**`: create stepper flow.
- `update/UpdateStaff.tsx`, `update/forms/**`: tabbed partial update flow.
- `archive/**` plus archive dialogs in `components/**`: mutation/presentation split.
- `view/ViewStaffPage.tsx` and `view/ViewStaff.tsx`: detail provider, header, actions, archived redirect, and tab shell.
- `view/sub-pages/**`: detail tab pages with their own meta files when tables/helpers/types are needed.

## Known Non-Pattern Lines In Staff

The staff feature is the reference architecture, but future code should not copy these incidental deviations:

- `view/sub-pages/__columns.tsx` currently re-exports helpers and types for convenience. Prefer direct imports from `__helpers.ts` and `__types.ts`.
- `CreateStaff.tsx`, `StaffCardLayout.tsx`, and `ViewStaff.tsx` contain temporary `console.log` usage or placeholder action behavior. Do not preserve debug logs or no-op placeholder actions in new feature work.
- `CreateStaff.tsx` uses broad `@ts-ignore` comments around stepper schema typing. Prefer typed helper wrappers, narrowed casts, or a short explanation only when the local type system cannot express the runtime invariant.
