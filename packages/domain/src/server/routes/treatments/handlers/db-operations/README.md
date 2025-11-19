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
  - `get-treatment.query.ts`
  - `get-all-treatments.query.ts`
  - `get-total-treatments.query.ts`

### Commands (Write Operations)
Files that **modify** data in the database:
- Pattern: `{operation}-{entity}.command.ts`
- Examples:
  - `create-treatment.command.ts`
  - `archive-treatments.command.ts`

### Shared Utilities
Cross-cutting concerns and utilities:
- Pattern: `{ClassName}.class.ts` or `{utility-name}.ts`
- Place shared helper functions or classes here

## Benefits

1. **Clear Separation**: Easy to identify read vs write operations at a glance
2. **Scalability**: Structure remains clear as more operations are added
3. **Maintainability**: Related operations are grouped together
4. **Testability**: Easier to mock and test queries vs commands separately
5. **Performance**: Can optimize read and write operations independently

## Usage Examples

```typescript
// Query imports
import { getTreatmentById } from './db-operations/queries/get-treatment.query';
import { getAllTreatments } from './db-operations/queries/get-all-treatments.query';

// Command imports
import { createTreatment } from './db-operations/commands/create-treatment.command';
import { archiveTreatmentsById } from './db-operations/commands/archive-treatments.command';

// Shared imports (if any)
// import { TreatmentHelper } from './db-operations/_shared/TreatmentHelper.class';
```

## Guidelines

- **Queries** should never modify data (idempotent)
- **Commands** should focus on single responsibility (one write operation)
- Keep database logic **out of handlers** - handlers should orchestrate, db-operations should execute
- Use descriptive names that clearly indicate what the operation does
- Export helper functions (like `getAverageDuration`, `getStartingPrice`) from query files when they're reused
