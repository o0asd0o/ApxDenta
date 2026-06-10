# Reservations Seams

## Known Seams

### Calendar Visual Contract

Reservation cards currently use a two-layer visual model:

- workflow status: label/dot semantics such as finished, doing treatment, registered, cancelled, or no-show,
- visual/payment state: background color and top-left icon.

Do not collapse these into one status without checking product intent. A finished workflow can still need an unpaid visual treatment.

### Scope Boundary

Frontend-only visual state may be acceptable for mock or presentation alignment work. Backend/domain schema changes require explicit product need and matching updates to domain routes, schemas, and persistence.

Initial candidates to validate before documenting deeply:

- Day and week calendar views in the webapp reservation feature.
- Domain reservation routes and reservation data shape.
- Calendar visual mapping helpers shared by reservation cards.

## Seam Entry Template

- Entry points:
- Owner:
- Invariants:
- Extension points:
- Avoid:
