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

- **Check common helpers first** before creating new utility functions
- Re-export common helpers from `@/lib/utils`:
  ```typescript
  // Re-export common helpers from lib
  export { formatDate, getInitials } from "@/lib/utils";
  ```
- Contains feature-specific helper constants and utility functions
- Use object lookups instead of switch statements for status colors:
  ```typescript
  export const PATIENT_STATUS_COLORS: Record<PatientStatus, string> = {
    ACTIVE: "bg-green-100 text-green-700 border-green-200",
    INACTIVE: "bg-gray-100 text-gray-700 border-gray-300",
    NEW: "bg-blue-100 text-blue-700 border-blue-200",
  };
  ```
- Pure functions with no React dependencies when possible

**Common Helpers Location:** `apps/webapp/src/lib/utils.ts`

- `formatDate` - Formats dates to "Month Day, Year" format
- `formatMonthYear` - Formats dates to "Jan 2024" format
- `formatYear` - Formats dates to just year "2024"
- `formatRelativeTime` - Formats to relative time like "2 hours ago"
- `getInitials` - Extracts initials from name(s)
- `cn` - Tailwind class name merger
- `slugify` - Convert string to URL-friendly slug

---

## Date Handling

Use `dayjs` for complex date formatting and manipulation. The library is already installed and configured with the `relativeTime` plugin.

**When to use dayjs:**

- Relative time formatting (e.g., "2 hours ago")
- Complex date formatting beyond simple locale strings
- Date arithmetic (add/subtract days, months, etc.)
- Date comparisons and validations

**Common helpers available in `@/lib/utils`:**

```typescript
import {
  formatDate,
  formatMonthYear,
  formatYear,
  formatRelativeTime,
} from "@/lib/utils";

formatDate(date); // "Jan 15, 2024"
formatMonthYear(date); // "Jan 2024"
formatYear(date); // "2024"
formatRelativeTime(date); // "2 hours ago"
```

**For custom formatting, import dayjs directly:**

```typescript
import dayjs from "dayjs";

dayjs(date).format("YYYY-MM-DD"); // "2024-01-15"
dayjs(date).format("dddd, MMMM D"); // "Monday, January 15"
```

**Do NOT use:** `date-fns` - Use `dayjs` instead for consistency.

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
