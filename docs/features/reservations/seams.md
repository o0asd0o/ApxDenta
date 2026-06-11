# Reservations Seams

## Known Seams

### Calendar Visual Contract

Reservation cards currently use a two-layer visual model:

- workflow status: label/dot semantics such as finished, doing treatment, registered, cancelled, or no-show,
- visual/payment state: background color and top-left icon.

Do not collapse these into one status without checking product intent. A finished workflow can still need an unpaid visual treatment.

### Scope Boundary

Frontend-only visual state may be acceptable for mock or presentation alignment work. Backend/domain schema changes require explicit product need and matching updates to domain routes, schemas, and persistence.

### Slot Add Boundary

The webapp waitlist add flow is intentionally separated from backend reservation creation while the calendar uses mock data. Slot validation lives client-side and must reject unavailable doctors, break time, invalid ranges, and overlaps before appending the local pending reservation.

Drag-to-reschedule uses the same validation boundary. A dragged reservation may
ignore its own current range during collision checks, but it must still reject
unavailable doctors, break time, invalid ranges, and other reservations. The
calendar must request confirmation before mutating the local reservation time.

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
