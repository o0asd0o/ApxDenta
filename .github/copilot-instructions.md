# Copilot Coding Instructions

## Pagination Pattern

Always use `executeWithOffsetPagination` utility from `@/server/utils/pagination` for paginated queries instead of manual pagination implementation.

**Pattern:**

```typescript
import { executeWithOffsetPagination } from '@/server/utils/pagination';

// Build your query with filters
let query = db.selectFrom('Table').select([...]).where(...);

// Apply pagination using the utility
if (perPage) {
  return executeWithOffsetPagination(query, {
    page: page || 1,
    perPage,
    excludeTotalCount: input.excludeTotalCount, // optional
  });
}

// Fallback for non-paginated requests
const items = await query.execute();
return {
  items,
  hasNextPage: false,
  hasPrevPage: false,
  endCursor: null,
  count: items.length,
};
```

**Reference:** See `packages/domain/src/server/routes/staff/handlers/db-operations/queries/get-all-staff.query.ts`

---

## Feature File Organization

When creating feature components with data tables, organize files into separate concerns:

### File Structure

```
features/<feature-name>/view/sub-pages/
├── __types.ts      # TypeScript interfaces and types
├── __helpers.ts    # Helper/utility functions (status colors, formatters, etc.)
├── __columns.tsx   # Table column definitions (imports from __types and __helpers)
├── Component1.tsx  # Feature components (import from __columns for convenience)
└── Component2.tsx
```

### \_\_types.ts

- Contains all TypeScript interfaces and types for the feature
- Import domain types from `@repo/domain/db`

### \_\_helpers.ts

- Contains helper constants and utility functions
- Use object lookups instead of switch statements for status colors:
  ```typescript
  export const PATIENT_STATUS_COLORS: Record<PatientStatus, string> = {
    ACTIVE: "bg-green-100 text-green-700 border-green-200",
    INACTIVE: "bg-gray-100 text-gray-700 border-gray-300",
    NEW: "bg-blue-100 text-blue-700 border-blue-200",
  };
  ```
- Helper functions like `getInitials`, `formatDate`
- Pure functions with no React dependencies when possible

### \_\_columns.tsx

- Contains table column definitions (`ColumnDef<T>[]`)
- Re-exports types and helpers for convenience:
  ```typescript
  export type { Patient, Appointment } from "./__types";
  export { PATIENT_STATUS_COLORS, formatDate, getInitials } from "./__helpers";
  ```

### Component Files

- Import from `__columns.tsx` for column definitions, types, and helpers
- Use object lookups: `className={PATIENT_STATUS_COLORS[status]}`
- Keeps component files focused on UI logic
