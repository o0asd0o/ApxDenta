# Database Seams

## Known Seams

Document stable database extension boundaries here as they are confirmed.

Initial candidates to validate before documenting deeply:

- Prisma schema and migration history under `packages/domain/src/db/prisma`.
- Database client exports consumed by domain routes and auth services.
- Seeder fixtures for holidays, specialists, and dental treatments.

## Seam Entry Template

- Entry points:
- Owner:
- Invariants:
- Extension points:
- Avoid:
