import type { DatabaseInstance } from '@/db';
import type { PatientStatus } from '@/db/prisma/out/enums';
import { executeWithOffsetPagination } from '@/server/utils/pagination';
import { sql } from 'kysely';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

type GetStaffPatientsParams = {
  staffId: string;
  page: number;
  perPage: number;
  status?: PatientStatus;
  search?: string;
};

export const getStaffPatients = async (
  db: DatabaseInstance,
  params: GetStaffPatientsParams,
) => {
  const { staffId, page, perPage, status, search } = params;

  // Get patients with aggregated data
  let query = db
    .selectFrom('Patient')
    .select([
      'Patient.id',
      'Patient.firstName',
      'Patient.lastName',
      'Patient.email',
      'Patient.phoneNumber',
      'Patient.status',
    ])
    .select((eb) =>
      jsonObjectFrom(
        eb
          .selectFrom('File')
          .select(['File.url'])
          .whereRef('File.id', '=', 'Patient.avatarId'),
      ).as('avatar'),
    )
    // Last visit (most recent completed appointment)
    .select((eb) =>
      eb
        .selectFrom('Reservation as r')
        .select('r.startTime')
        .whereRef('r.patientId', '=', 'Patient.id')
        .where('r.staffId', '=', staffId)
        .where('r.status', '=', 'DONE')
        .where('r.isArchived', '=', false)
        .orderBy('r.startTime', 'desc')
        .limit(1)
        .as('lastVisit'),
    )
    // Next appointment
    .select((eb) =>
      eb
        .selectFrom('Reservation as r')
        .select('r.startTime')
        .whereRef('r.patientId', '=', 'Patient.id')
        .where('r.staffId', '=', staffId)
        .where('r.status', 'in', ['PENDING', 'ENCOUNTER'])
        .where('r.startTime', '>', new Date())
        .where('r.isArchived', '=', false)
        .orderBy('r.startTime', 'asc')
        .limit(1)
        .as('nextAppointment'),
    )
    // Total treatments count
    .select((eb) =>
      eb
        .selectFrom('Reservation as r')
        .select((eb2) => eb2.fn.countAll<number>().as('cnt'))
        .whereRef('r.patientId', '=', 'Patient.id')
        .where('r.staffId', '=', staffId)
        .where('r.isArchived', '=', false)
        .as('totalTreatments'),
    )
    // Completed treatments count
    .select((eb) =>
      eb
        .selectFrom('Reservation as r')
        .select((eb2) => eb2.fn.countAll<number>().as('cnt'))
        .whereRef('r.patientId', '=', 'Patient.id')
        .where('r.staffId', '=', staffId)
        .where('r.status', '=', 'DONE')
        .where('r.isArchived', '=', false)
        .as('completedTreatments'),
    )
    .where((eb) =>
      eb.exists(
        eb
          .selectFrom('Reservation')
          .select(sql`1`.as('one'))
          .whereRef('Reservation.patientId', '=', 'Patient.id')
          .where('Reservation.staffId', '=', staffId)
          .where('Reservation.isArchived', '=', false),
      ),
    );

  if (status) {
    query = query.where('Patient.status', '=', status);
  }
  if (search) {
    query = query.where((eb) =>
      eb.or([
        eb('Patient.firstName', 'ilike', `%${search}%`),
        eb('Patient.lastName', 'ilike', `%${search}%`),
        eb('Patient.email', 'ilike', `%${search}%`),
      ]),
    );
  }

  query = query.orderBy('Patient.firstName', 'asc');

  if (perPage) {
    return executeWithOffsetPagination(query, {
      page: page || 1,
      perPage,
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
