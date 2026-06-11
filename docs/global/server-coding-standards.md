# Server Coding Standards and Structure

## 1) Scope and Intent

This document defines the server-side architecture, coding standards, and performance-oriented implementation rules for this monorepo.

Applies to:
- `apps/server`
- `packages/domain/src/server`
- shared server-facing schemas and utilities consumed by server routes

Goals:
- Keep `apps/server` lean (transport and middleware only)
- Keep business logic in domain handlers/queries/commands
- Enforce consistent validation, pagination, and error handling
- Preserve type safety across request, database, and response boundaries

## 2) High-Level Architecture

### 2.1 Runtime Layer (`apps/server`)

Responsibilities:
- Initialize Hono app
- Register middleware (request id, logger, pretty JSON, CORS, rate limiting)
- Mount auth handler
- Mount tRPC server adapter
- Redirect root and expose healthcheck
- Parse and validate environment variables

Not responsible for:
- business logic
- direct database feature queries
- feature-level validation schemas

### 2.2 Domain Layer (`packages/domain/src/server`)

Responsibilities:
- Define feature routers
- Define handler input schemas and handler functions
- Execute database queries and commands
- Normalize responses
- Throw standardized server errors

## 3) Directory Structure Standards

Use this structure for domain features:

```text
packages/domain/src/server/routes/<feature>/
  index.ts
  handlers/
    __types.ts
    __helpers.ts
    <action>.ts
    db-operations/
      queries/
        get-<resource>.query.ts
      commands/
        <action>-<resource>.command.ts
      _shared/
        <SharedBehavior>.class.ts
```

Guidelines:
- `index.ts` composes tRPC procedures only.
- `handlers/*.ts` define input schema + orchestrate logic.
- `db-operations/queries` contains read-only database logic.
- `db-operations/commands` contains write operations.
- Shared post-processing/workflow logic goes to `db-operations/_shared`.

## 4) Handler Contract and Procedure Composition

Every handler module should follow one pattern:
1. Define `inputSchema` (typically Zod).
2. Define a typed handler context alias using `HandlerType`.
3. Implement `handler` function.
4. Export `{ inputSchema, handler }`.

**Template:**
```typescript
import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z.object({
  // Define inputs
}).merge(offsetPaginationInput); // if needed

export type MyActionProps = HandlerType<z.infer<typeof inputSchema>>;

const handler = async (context: MyActionProps) => {
  const { ctx, input } = context;
  // ctx contains: db, organizationId, user (if protected)
  // orchestrate query/command and return response
};

export { inputSchema, handler };
```

Procedure composition in router:
- Use `publicProcedure` for unauthenticated endpoints (rare).
- Use `protectedProcedure` where auth is required (most common).
- Use `.input(<feature>.inputSchema)`.
- Use `.query(<feature>.handler)` for reads.
- Use `.mutation(<feature>.handler)` for writes.

## 4.5) Handler Response Envelope

All handlers must return a normalized response shape:

```typescript
{
  status: 'SUCCESS' | 'ERROR' as const,  // Always include
  data: T,                               // Actual payload (varies by handler)
  // Pagination fields (if applicable)
  hasNextPage?: boolean,
  hasPrevPage?: boolean,
  endCursor: null | string,
  count: number,                         // Total count (or item count if unpaginated)
}
```

**Rules:**
- `status` is always present and discriminates success/error.
- `data` contains the main result type.
- Pagination fields are optional and only included for list endpoints.
- `count` represents total or current-page item count depending on `excludeTotalCount`.
- Error responses are handled separately (see Error Handling Standards).

## 5) Validation Standards

### 5.1 Request Validation

- Use Zod for route input schemas.
- Co-locate schema with handler unless shared by multiple handlers.
- Use merged pagination inputs when needed.

### 5.2 Environment Validation

- Use Valibot in `apps/server/src/env.ts`.
- Parse environment once and export a typed `env` object.
- Prefer constrained schemas (`email`, `url`, min length, bounded ports).

## 6) Database Standards (Kysely)

- Build SQL using Kysely query builders.
- Keep query builders in `queries/*.query.ts`.
- Keep write operations in `commands/*.command.ts`.
- Use `jsonObjectFrom` and `jsonArrayFrom` for nested objects/relations when it improves clarity and avoids N+1 patterns.
- Keep filters additive and explicit (`if (input.someFilter?.length) ...`).
- Keep default ordering deterministic.

## 7) Mandatory Pagination Rule

For offset-based pagination, always use:
- `executeWithOffsetPagination` from `@/server/utils/pagination`

Do not implement ad hoc manual pagination logic in feature queries.

Recommended pattern:
1. Build base query with filters and ordering.
2. If paginated input is present, call pagination utility.
3. If not paginated, execute query and return non-paginated shape.

## 8) Authentication Context and Authorization

**Auth Flow:**
- `protectedProcedure` automatically validates session via Better Auth middleware.
- Authenticated context includes:
  - `user`: session user object
  - `organizationId`: extracted from user context (tenant ID)
  - `db`: Kysely instance scoped to organization

**Usage in handler:**
```typescript
const handler = async ({ ctx, input }: MyActionProps) => {
  const { db, organizationId, user } = ctx;
  // organizationId is always present for protected procedures
  // Use in WHERE clauses: .where('organizationId', '=', organizationId)
};
```

**Authorization Rules:**
- All queries/commands must filter by `organizationId`.
- Do not assume user can access any organization's data; always filter.
- Multi-tenancy is enforced at the query level, not at the procedure level.

## 8.5) Error Handling Standards

- Prefer centralized error factories (for example, from common errors module).
- Throw typed, consistent application errors (not raw `Error` for business cases).
- Wrap risky mutation workflows in `try/catch` and rethrow normalized error.
- Include context in logs, but keep thrown messages safe and user-appropriate.
- Error responses are marshalled by tRPC; handlers throw, not return errors.

**Error Factory Pattern:**
```typescript
try {
  const result = await db.insertInto('Resource').values(...).execute();
} catch (error) {
  if (error instanceof DBError && error.code === 'UNIQUE_VIOLATION') {
    throw errors.alreadyExists('Resource');
  }
  throw errors.serverError('Failed to create resource');
}
```

## 9) Naming and File Conventions

- Handlers: `<verb>-<resource>.ts` (example: `get-all-staffs.ts`, `create-staff.ts`)
- Queries: `get-*.query.ts`
- Commands: `<verb>-*.command.ts`
- Shared classes: `<Name>.class.ts`
- Types helpers per folder: `__types.ts`, `__helpers.ts`

Code conventions:
- TypeScript strictness first.
- Named exports preferred for handlers and utilities.
- Keep modules focused; one main concern per file.

## 10) Imports and Paths

Server TS path aliases:
- `@/*` -> `./src/*`
- `~/lib/*` -> `./lib/*`
- `~/prisma/*` -> `./prisma/*`

Guidelines:
- Prefer alias imports over deep relative traversal.
- Avoid circular imports across feature modules.

## 11) Middleware and API Surface

Global middleware should be wired once in `apps/server/src/index.ts`:
- request id
- logging
- response formatting
- rate limit
- auth CORS
- tRPC CORS

Public endpoints should stay minimal:
- `/healthcheck` for liveness
- auth endpoints under `/api/auth/*`
- tRPC endpoints under `/trpc/*`

## 11.5) Feature Interdependency and Composition

**Cross-Feature Query Sharing:**
- If handler A needs data from feature B, prefer importing B's query function directly rather than calling B's tRPC procedure.
- Queries are composable and can be reused internally.
- Do not create circular dependencies between feature modules.

**Multi-Step Operations (Sagas):**
- If a mutation spans multiple resources (e.g., create staff + send email), handle in a shared `_shared` class or dedicated orchestration function.
- Separate read/write concerns: do reads first, then writes, then side effects.
- On partial failure, decide: rollback, retry, or mark for manual cleanup (document decision).
- Example pattern:
  ```typescript
  const handler = async ({ ctx, input }: CreateStaffProps) => {
    // 1. Validate input
    // 2. Execute mutation in transaction (create staff)
    // 3. Trigger side effect (send email) outside transaction if possible
    // 4. Return response
  };
  ```

## 12) Performance and Reliability Rules

- Keep transport layer free of heavy business logic.
- Keep query select lists intentional (avoid selecting unused columns).
- Apply filters in SQL rather than post-processing in JavaScript.
- Use pagination for list endpoints by default.
- Support total count exclusion when not required (`excludeTotalCount`) to reduce heavy count operations.
- Use deterministic ordering for stable pagination.
- Reduce repeated DB roundtrips by composing nested relational projections where appropriate.

## 13) Dev Workflow Commands

Common commands:
- `bun run dev`
- `bun run build`
- `bun run ts-compile`
- `bun run prisma:generate`
- `bun run prisma:migrate`
- `bun run prisma:studio`

Monorepo-level checks:
- `bun run lint`
- `bun run test`
- `bun run build`

## 14) Do and Do Not

Do:
- Keep business logic in domain handlers/queries/commands.
- Validate all external input.
- Use shared pagination utility.
- Keep read and write logic separated.
- Return predictable response envelopes from handlers.

Do not:
- Add feature logic directly in `apps/server/src/index.ts`.
- Duplicate pagination logic.
- Throw inconsistent error shapes.
- Mix unrelated handlers in a single module.
- Bypass schema validation for incoming request input.

## 15) Example: Complete Handler Flow

**Scenario:** Get all staff for an organization with optional filtering.

**Handler File** (`packages/domain/src/server/routes/staff/handlers/get-all-staffs.ts`):
```typescript
import { getAllStaff } from './db-operations/queries/get-all-staff.query';
import { offsetPaginationInput } from '@/server/common/schemas';
import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z.object({
  search: z.string().optional(),
  statusIn: z.enum(['ACTIVE', 'INACTIVE']).array().optional(),
}).merge(offsetPaginationInput);

export type GetAllStaffsProps = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ ctx, input }: GetAllStaffsProps) => {
  const result = await getAllStaff({ ctx, input });
  return {
    status: 'SUCCESS' as const,
    data: result.items,
    hasNextPage: result.hasNextPage,
    hasPrevPage: result.hasPrevPage,
    endCursor: result.endCursor,
    count: result.count,
  };
};

export { inputSchema, handler };
```

**Query File** (`db-operations/queries/get-all-staff.query.ts`):
```typescript
import { executeWithOffsetPagination } from '@/server/utils/pagination';
import type { GetAllStaffsProps } from '../../get-all-staffs';

export const getAllStaff = async (context: GetAllStaffsProps) => {
  const { ctx: { db, organizationId }, input } = context;

  let query = db.selectFrom('Staff')
    .selectAll()
    .where('organizationId', '=', organizationId)
    .where('isArchived', '=', false)
    .orderBy('createdAt', 'desc');

  if (input.search) {
    query = query.where((eb) => eb.or([
      eb('firstName', 'ilike', `%${input.search}%`),
      eb('lastName', 'ilike', `%${input.search}%`),
    ]));
  }

  if (input.statusIn?.length) {
    query = query.where('status', 'in', input.statusIn);
  }

  if (input.perPage) {
    return executeWithOffsetPagination(query, {
      page: input.page || 1,
      perPage: input.perPage,
    });
  }

  const items = await query.execute();
  return {
    items,
    hasNextPage: false,
    hasPrevPage: false,
    endCursor: null,
    count: items.length,
  };
};
```

**Router Composition** (`routes/staff/index.ts`):
```typescript
import * as getAllStaffs from './handlers/get-all-staffs';

const staffs = router({
  getAllStaffs: protectedProcedure
    .input(getAllStaffs.inputSchema)
    .query(getAllStaffs.handler),
});
```

## 16) Pull Request Checklist (Server)

- New handler exports `inputSchema` and `handler`.
- Handler uses `HandlerType<...>` type alias.
- Response shape includes `status` and required fields.
- All queries filter by `organizationId`.
- Router composition updated in feature `index.ts`.
- Read operations are in `queries`, writes are in `commands`.
- Pagination uses `executeWithOffsetPagination`.
- Errors use standard factory methods.
- No secret values hardcoded.
- Scripts build successfully.
- Lint and type checks pass.