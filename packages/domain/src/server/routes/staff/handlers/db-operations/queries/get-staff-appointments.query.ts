import type { DatabaseInstance } from '@/db';
import type { ReservationStatus } from '@/db/prisma/out/enums';
import { executeWithOffsetPagination } from '@/server/utils/pagination';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

type GetStaffAppointmentsParams = {
  staffId: string;
  page: number;
  perPage: number;
  status?: ReservationStatus;
  search?: string;
};

export const getStaffAppointments = async (
  db: DatabaseInstance,
  params: GetStaffAppointmentsParams,
) => {
  const { staffId, page, perPage, status, search } = params;

  let query = db
    .selectFrom('Reservation')
    .innerJoin('Patient', 'Patient.id', 'Reservation.patientId')
    .innerJoin('Treatment', 'Treatment.id', 'Reservation.initialTreatmentId')
    .select([
      'Reservation.id',
      'Reservation.startTime',
      'Reservation.endTime',
      'Reservation.duration',
      'Reservation.status',
      'Reservation.note',
      'Patient.id as patientId',
      'Patient.firstName as patientFirstName',
      'Patient.lastName as patientLastName',
      'Treatment.id as treatmentId',
      'Treatment.name as treatmentName',
    ])
    .select((eb) =>
      jsonObjectFrom(
        eb
          .selectFrom('File')
          .select(['File.url'])
          .whereRef('File.id', '=', 'Patient.avatarId'),
      ).as('patientAvatar'),
    )
    .where('Reservation.staffId', '=', staffId)
    .where('Reservation.isArchived', '=', false);

  if (status) {
    query = query.where('Reservation.status', '=', status);
  }

  if (search) {
    query = query.where((eb) =>
      eb.or([
        eb('Patient.firstName', 'ilike', `%${search}%`),
        eb('Patient.lastName', 'ilike', `%${search}%`),
        eb('Treatment.name', 'ilike', `%${search}%`),
      ]),
    );
  }

  query = query.orderBy('Reservation.startTime', 'desc');

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
