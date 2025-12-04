import { executeWithOffsetPagination } from '@/server/utils/pagination';
import { jsonObjectFrom } from 'kysely/helpers/postgres';
import type { GetAllPatientsProps } from '../../get-all-patients';

export const getAllPatients = async (context: GetAllPatientsProps) => {
  const {
    ctx: { db, organizationId },
    input,
  } = context;

  // Define 6 months ago for active/inactive logic
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  let query = db
    .selectFrom('Patient')
    .selectAll('Patient')
    .where('Patient.organizationId', '=', organizationId)
    // Get last reservation info
    .select((eb) =>
      jsonObjectFrom(
        eb
          .selectFrom('Reservation')
          .select([
            'Reservation.createdAt',
            'Reservation.initialTreatmentId',
            'Reservation.id',
          ])
          .whereRef('Reservation.patientId', '=', 'Patient.id')
          .orderBy('Reservation.createdAt', 'desc')
          .limit(1),
      ).as('lastReservation'),
    )
    // Get last treatment info through last reservation
    .select((eb) =>
      jsonObjectFrom(
        eb
          .selectFrom('Reservation as R')
          .innerJoin('Treatment', 'Treatment.id', 'R.initialTreatmentId')
          .select(['Treatment.name', 'Treatment.id'])
          .whereRef('R.patientId', '=', 'Patient.id')
          .orderBy('R.createdAt', 'desc')
          .limit(1),
      ).as('lastTreatment'),
    );

  // Filter by active/inactive status
  if (input.isActive !== undefined) {
    if (input.isActive) {
      // Active: has reservation in last 6 months
      query = query.where(({ exists, selectFrom }) =>
        exists(
          selectFrom('Reservation')
            .select('id')
            .whereRef('Reservation.patientId', '=', 'Patient.id')
            .where('Reservation.createdAt', '>=', sixMonthsAgo),
        ),
      );
    } else {
      // Inactive: no reservation in last 6 months
      query = query.where(({ not, exists, selectFrom }) =>
        not(
          exists(
            selectFrom('Reservation')
              .select('id')
              .whereRef('Reservation.patientId', '=', 'Patient.id')
              .where('Reservation.createdAt', '>=', sixMonthsAgo),
          ),
        ),
      );
    }
  }

  // Search filter
  if (input.search) {
    query = query.where((eb) => {
      const search = input.search?.toLowerCase();
      return eb.or([
        eb(db.fn('lower', ['firstName']), 'like', `%${search}%`),
        eb(db.fn('lower', ['lastName']), 'like', `%${search}%`),
        eb(db.fn('lower', ['email']), 'like', `%${search}%`),
        eb(db.fn('lower', ['phoneNumber']), 'like', `%${search}%`),
        eb(db.fn('lower', ['address']), 'like', `%${search}%`),
      ]);
    });
  }

  // Sorting
  if (input.orderBy) {
    const { field, direction } = input.orderBy;
    query = query.orderBy(field, direction);
  } else {
    query = query.orderBy('createdAt', 'desc');
  }

  // Pagination
  if (input.perPage) {
    return executeWithOffsetPagination(query, {
      page: input.page || 1,
      perPage: input.perPage,
      excludeTotalCount: input.excludeTotalCount,
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
