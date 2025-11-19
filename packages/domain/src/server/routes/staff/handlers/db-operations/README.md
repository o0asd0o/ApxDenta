# DB Operations Structure

This folder follows a **CQRS-inspired** (Command Query Responsibility Segregation) organization pattern to maintain clarity as the codebase grows.

## Folder Structure

```
db-operations/
├── queries/           # Read operations (SELECT queries)
├── commands/          # Write operations (INSERT, UPDATE, DELETE)
└── _shared/           # Shared utilities and classes
```

## Naming Conventions

### Queries (Read Operations)
Files that **retrieve** data from the database:
- Pattern: `{operation}-{entity}.query.ts`
- Examples:
  - `get-staff.query.ts`
  - `get-all-staff.query.ts`
  - `get-staff-count.query.ts`
  - `get-staff-services.query.ts`

### Commands (Write Operations)
Files that **modify** data in the database:
- Pattern: `{operation}-{entity}.command.ts`
- Examples:
  - `save-staff.command.ts`
  - `update-staff-info.command.ts`
  - `archive-staff.command.ts`

### Shared Utilities
Cross-cutting concerns and utilities:
- Pattern: `{ClassName}.class.ts` or `{utility-name}.ts`
- Examples:
  - `StaffAfterSaveActions.class.ts`

## Benefits

1. **Clear Separation**: Easy to identify read vs write operations at a glance
2. **Scalability**: Structure remains clear as more operations are added
3. **Maintainability**: Related operations are grouped together
4. **Testability**: Easier to mock and test queries vs commands separately
5. **Performance**: Can optimize read and write operations independently

## Usage Examples

```typescript
// Query imports
import { getStaffById } from './db-operations/queries/get-staff.query';
import { getAllStaff } from './db-operations/queries/get-all-staff.query';

// Command imports
import { saveStaff } from './db-operations/commands/save-staff.command';
import { updateStaffInfo } from './db-operations/commands/update-staff-info.command';

// Shared imports
import { StaffDbAfterSaveActions } from './db-operations/_shared/StaffAfterSaveActions.class';
```

## Guidelines

- **Queries** should never modify data (idempotent)
- **Commands** should focus on single responsibility (one write operation)
- Keep database logic **out of handlers** - handlers should orchestrate, db-operations should execute
- Use descriptive names that clearly indicate what the operation does
