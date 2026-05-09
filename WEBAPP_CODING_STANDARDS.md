# Webapp Coding Standards and Structure (SolidJS)

## 1) Scope and Intent

This document defines front-end architecture, structure, coding standards, and optimization rules for the SolidJS webapp.

Applies to:
- `apps/webapp/src`

Tech Stack:
- **SolidJS** for reactive UI components
- **TanStack Router (Solid)** (`@tanstack/solid-router`) for file-based routing
- **TanStack Query (Solid)** (`@tanstack/solid-query`) for server state and data fetching
- **modular-forms** for form handling with Zod validation
- **Tailwind CSS + solid-ui** for styling and UI components (solid-ui is the SolidJS port of shadcn/ui)

Goals:
- Keep routing predictable and file-based
- Keep features modular and easy to scale
- Leverage SolidJS fine-grained reactivity to eliminate performance micro-optimization
- Keep UI, state, and data concerns separated
- Maximize type safety and readability

## 2) Core Architecture

### 2.1 App Entry and Providers

Entry point: `src/main.tsx`

Responsibilities:
- Create TanStack Router (Solid) instance from generated route tree
- Provide app-level wrappers (`RootProvider`, `NuqsAdapter`)
- Configure QueryClientProvider for TanStack Query (Solid)
- Attach authenticated context and oRPC client to router context

**Setup Pattern:**
```typescript
import { render } from 'solid-js/web';
import { RouterProvider, createRouter } from '@tanstack/solid-router';
import { QueryClientProvider } from '@tanstack/solid-query';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  context: { ...getContext(), auth: undefined, orpc: null },
  defaultPreload: 'intent',
});

render(
  () => (
    <QueryClientProvider client={queryClient}>
      <RootProvider>
        <NuqsAdapter>
          <RouterProvider router={router} />
        </NuqsAdapter>
      </RootProvider>
    </QueryClientProvider>
  ),
  document.getElementById('app')!
);
```

### 2.2 Routing Model

- Use TanStack Router (Solid) file-based routing in `src/routes`.
- Keep generated router tree file (`routeTree.gen.ts`) unmanaged manually.
- Use route groups for concerns (example patterns: auth and protected groups).
- Leverage route loaders for pre-fetching critical data before render.
- URL state (filters, tabs, pagination) managed via `nuqs` for search params.

## 3) Feature Folder Structure

Preferred structure for table-driven and complex features:

```text
src/features/<feature>/
  __types.ts
  __helpers.ts
  __columns.tsx
  components/
  view/
    sub-pages/
      __types.ts
      __helpers.ts
      __columns.tsx
      <PageComponent>.tsx
  add/
  update/
  delete/
```

Required conventions from project instructions:
- `__types.ts`: feature types and interfaces
- `__helpers.ts`: pure helper functions/constants, re-export common helpers when possible
- `__columns.tsx`: table columns and convenience re-exports of types/helpers

## 4) Naming Standards

- Feature root component: `<Feature>.tsx`
- List component: `<Feature>List.tsx`
- Action blocks: `<Feature>Actions.tsx`
- Providers: `<Feature>Provider.tsx`
- Types files: `__types.ts`
- Helper files: `__helpers.ts`
- Table definitions: `__columns.tsx`

Guidelines:
- Use PascalCase for SolidJS components.
- Use descriptive names over abbreviations.
- Keep one primary export per component module when practical.

## 5) Data Fetching and Server State

Use TanStack Query (Solid) + oRPC as the default approach.

**Query Pattern:**
```typescript
import { createQuery } from '@tanstack/solid-query';

const StaffList = () => {
  const query = createQuery(() => ({
    queryKey: ['staff', { page: page() }],
    queryFn: () => orpc.staff.getAllStaffs.query({ page: page(), perPage: 20 }),
  }));

  return (
    <Show when={!query.isLoading} fallback={<LoaderCard />}>
      <ul>
        <For each={query.data?.items}>
          {(staff) => <li>{staff.id}>{staff.firstName}</li>}
        </For>
      </ul>
    </Show>
  );
};
```

**Mutation Pattern:**
```typescript
import { createMutation } from '@tanstack/solid-query';

const StaffActions = () => {
  const queryClient = useQueryClient();
  const mutation = createMutation(() => ({
    mutationFn: (data: CreateStaffInput) => orpc.staff.createStaff.call(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    },
  }));

  return (
    <button onClick={() => mutation.mutate(staffData)} disabled={mutation.isPending}>
      {mutation.isPending ? 'Creating...' : 'Create Staff'}
    </button>
  );
};
```

Rules:
- Always invalidate affected lists/details on successful mutation.
- Avoid broad invalidation when targeted invalidation is possible.
- Keep server state in Query cache; avoid duplicating it in component signals.
- Use `createQuery` for reads and `createMutation` for writes.

## 6) Local State and Context

Use the smallest sufficient scope:
- Component signals for local UI state (toggles, form fields)
- Feature-level context providers for shared feature state
- SolidJS `createContext` + `useContext` for prop drilling avoidance (no selector overhead needed)

**Signal Pattern:**
```typescript
import { createSignal } from 'solid-js';

const StaffModal = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <Show when={isOpen()}>
        <Dialog onClose={() => setIsOpen(false)} />
      </Show>
    </>
  );
};
```

**Context Pattern:**
```typescript
import { createContext, useContext, type ParentComponent } from 'solid-js';

const StaffContext = createContext<StaffContextType>();

export const useStaffContext = () => {
  const ctx = useContext(StaffContext);
  if (!ctx) throw new Error('useStaffContext must be used within StaffProvider');
  return ctx;
};

export const StaffProvider: ParentComponent = (props) => {
  const [selectedStaff, setSelectedStaff] = createSignal<Staff | null>(null);
  return (
    <StaffContext.Provider value={{ selectedStaff, setSelectedStaff }}>
      {props.children}
    </StaffContext.Provider>
  );
};
```

Rules:
- Do not lift state higher than necessary.
- Keep provider values focused to a single concern.
- SolidJS reactivity is fine-grained; no subscription overhead to worry about.

## 7) Forms and Validation

Use modular-forms for reactive form handling with Zod validation.

**Form Pattern:**
```typescript
import { createForm } from '@modular-forms/solid';
import { zodField, zodForm } from '@modular-forms/solid';
import { z } from 'zod';

const staffSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
});

type StaffFormData = z.infer<typeof staffSchema>;

const CreateStaffForm = () => {
  const [form, { Form, Field }] = createForm<StaffFormData>({
    validate: zodForm(staffSchema),
    initialValues: { firstName: '', lastName: '', email: '' },
  });

  const mutation = createMutation(() => ({
    mutationFn: (data: StaffFormData) => orpc.staff.createStaff.call(data),
  }));

  return (
    <Form onSubmit={mutation.mutate}>
      <Field name="firstName">
        {(field, props) => (
          <>
            <input {...props} type="text" />
            {field.error && <span>{field.error}</span>}
          </>
        )}
      </Field>
      <button type="submit" disabled={mutation.isPending}>Submit</button>
    </Form>
  );
};
```

Rules:
- Validate via Zod schemas before submission.
- Keep form-specific types near form modules.
- Keep transformation and normalization close to submit handlers.

## 8) Styling and UI Standards

Stack:
- Tailwind CSS (utility-first)
- solid-ui components from shared UI package (`@repo/ui`) — the SolidJS port of shadcn/ui
- `cn()` utility for class merging

Rules:
- Prefer utility classes over inline styles.
- Reuse shared UI components before introducing custom primitives.
- Use semantic design tokens/classes consistently (`text-muted-foreground`, `bg-card`, etc.).
- Keep complex conditional classes centralized in helper functions/constants.

## 9) Date and Utility Standards

Mandatory date guidance from project instructions:
- Use shared date helpers from `src/lib/utils` first (`formatDate`, `formatMonthYear`, `formatYear`, `formatRelativeTime`).
- Use `dayjs` directly only for custom/advanced date operations.
- Do not introduce `date-fns`.

Utility guidance:
- Reuse existing utility helpers (`cn`, `getInitials`, `slugify`) before adding new ones.
- Keep helper modules pure and framework-light when possible.

## 10) Table and List Standards

For TanStack Table feature modules:
- Keep column definitions in `__columns.tsx`.
- Keep related table types in `__types.ts`.
- Keep formatting and display constants in `__helpers.ts`.
- Use object lookups for status-color mappings instead of switch-heavy rendering logic.

## 11) TypeScript and Imports

Webapp TS aliases:
- `@/*` -> `./src/*`
- `@repo/ui/*` -> `../../packages/ui/src/*`

Rules:
- Use aliases for readability and maintainability.
- Avoid deep relative import chains.
- Prefer explicit types where inference is ambiguous.

## 12) Performance Optimization Rules

SolidJS has fine-grained reactivity; most React-style performance micro-optimizations are unnecessary:

- **No `useMemo`/`useCallback`** — SolidJS only re-executes the parts of the UI that depend on changed signals.
- Use `createMemo` only for genuinely expensive derivations (e.g., filtering/sorting large lists).
- Keep objects in context stable only when passing to non-reactive consumers.
- Keep list rendering keys stable via `<For each>` (preferred over `.map()` — `<For>` diffs by reference).
- Avoid duplicate network requests by relying on TanStack Query (Solid) caching behavior.
- Invalidate only what changed after mutations.
- Keep route-level pending UI lightweight (spinner or skeleton only).

**SolidJS Reactive Primitives:**
```typescript
// Derived state (cheap, reactive)
const activeCount = () => staff().filter(s => s.status === 'ACTIVE').length;

// Memoized (use only when the derivation is expensive)
const filteredStaff = createMemo(() =>
  staff().filter(s => s.status === filter())
);

// Side effect
createEffect(() => {
  document.title = `Staff (${activeCount()})`;
});
```

## 13) Accessibility and UX Baselines

- Ensure keyboard operability for dialogs, forms, and interactive controls.
- Use accessible labels and status text.
- Keep loading states and empty states explicit and consistent.
- Use toasts for feedback on async actions where appropriate.

## 14) Dev Workflow Commands

App-level commands:
- `bun run dev`
- `bun run build`
- `bun run test`

Monorepo-level checks:
- `bun run lint`
- `bun run test`
- `bun run build`

## 15) Route Loaders and Data Prefetching

TanStack Router (Solid) supports route loaders for pre-fetching data before a route renders.

**Loader Pattern:**
```typescript
import { createRoute } from '@tanstack/solid-router';

export const staffRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/staff',
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(staffListQueryOptions()),
  component: StaffPage,
});
```

**Accessing Loader Data in Component:**
```typescript
const StaffPage = () => {
  const data = staffRoute.useLoaderData();
  return <For each={data.items}>{(s) => <StaffRow staff={s} />}</For>;
};
```

Rules:
- Use loaders for critical data needed immediately on route render.
- Use in-component `createQuery` for lazy-loaded or user-triggered data.
- Loaders run before component renders; keep them fast and targeted.

## 16) URL State Management (Search Params)

Use `nuqs` (with its Solid adapter) to persist UI state in URL search params.

**Pattern:**
```typescript
import { useQueryState } from 'nuqs';

const StaffList = () => {
  const [page, setPage] = useQueryState('page', { defaultValue: '1' });
  const [status, setStatus] = useQueryState('status', { defaultValue: 'active' });

  const query = createQuery(() => ({
    queryKey: ['staff', { page: page(), status: status() }],
    queryFn: () =>
      orpc.staff.getAllStaffs.query({ page: Number(page()), status: status() }),
  }));

  return (
    <>
      <button onClick={() => setPage(String(Number(page()) + 1))}>
        Next Page
      </button>
      <select
        value={status()}
        onChange={(e) => {
          setStatus(e.currentTarget.value);
          setPage('1');
        }}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </>
  );
};
```

Rules:
- Use URL state for user-facing filters, pagination, tabs, and sort order.
- Avoid storing sensitive data in URL.
- Reset pagination to page 1 when filters change.

## 17) Modal and Dialog Routing Patterns

**Pattern: URL-Driven Modals (Recommended)**
Modals controlled via URL search params, allowing deep linking and back-button support.

```typescript
const StaffList = () => {
  const [dialog, setDialog] = useQueryState('dialog', { defaultValue: '' });

  return (
    <>
      <button onClick={() => setDialog('create')}>
        Create Staff
      </button>
      <Show when={dialog() === 'create'}>
        <CreateStaffDialog onClose={() => setDialog('')} />
      </Show>
    </>
  );
};
```

**Pattern: Context-Driven Modals (Internal feature flows)**
```typescript
const [activeModal, setActiveModal] = createSignal<'edit' | 'delete' | null>(null);

<Show when={activeModal() === 'edit'}>
  <EditStaffDialog onClose={() => setActiveModal(null)} />
</Show>
```

Rules:
- Prefer URL-driven modals for user-facing workflows (deep-linkable).
- Use context-driven modals for internal, transient feature flows.
- Always provide a way to dismiss (Close button, ESC key).
- Validate form data before submitting.

## 18) Do and Do Not

Do:
- Follow feature file split (`__types`, `__helpers`, `__columns`).
- Reuse shared helpers and UI components.
- Use modular-forms + Zod for forms.
- Use `createSignal`/`createMemo`/`createEffect` from `solid-js` for reactive primitives.
- Use targeted query invalidation.
- Prefer `<Show>`, `<For>`, `<Switch>` over manual conditional rendering.
- Keep route and feature boundaries clear.

Do not:
- Use React hooks (`useState`, `useEffect`, `useMemo`, `useCallback`) — SolidJS has its own equivalents.
- Place generated route files (`routeTree.gen.ts`) under manual editing workflows.
- Introduce duplicate helper functions already available in `src/lib/utils`.
- Add alternate date libraries (`date-fns`).
- Mix heavy business logic directly in visual components.
- Scatter feature types across many unrelated files.
- Use `.map()` with `key` for lists — use `<For each>` instead.

## 19) Pull Request Checklist (Webapp)

- Feature structure follows conventions (`__types`, `__helpers`, `__columns` where applicable).
- New table features include `__types`, `__helpers`, `__columns`.
- Date formatting uses shared helpers first (`formatDate`, `formatMonthYear`, etc.).
- Forms use modular-forms + Zod schema validation.
- Query invalidation covers impacted views.
- No React-isms introduced (`useState`, `useMemo`, `useEffect` — use SolidJS equivalents).
- List rendering uses `<For each>`, conditionals use `<Show>` / `<Switch>`.
- Build, lint, and tests pass.