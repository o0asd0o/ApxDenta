import type { DatabaseInstance } from '@/db';
import type { ReservationStatus } from '@/db/prisma/out/enums';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

export type StaffAppointmentResult = {
  id: string;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
  treatment: {
    id: string;
    name: string;
  };
  startTime: Date;
  endTime: Date;
  duration: number;
  status: ReservationStatus;
  note: string | null;
};

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
): Promise<{
  data: StaffAppointmentResult[];
  count: number;
  hasNextPage: boolean;
}> => {
  const { staffId, page, perPage, status, search } = params;
  const offset = (page - 1) * perPage;

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

  // Get count
  const countResult = await db
    .selectFrom('Reservation')
    .innerJoin('Patient', 'Patient.id', 'Reservation.patientId')
    .innerJoin('Treatment', 'Treatment.id', 'Reservation.initialTreatmentId')
    .select((eb) => eb.fn.countAll<number>().as('count'))
    .where('Reservation.staffId', '=', staffId)
    .where('Reservation.isArchived', '=', false)
    .$if(!!status, (qb) =>
      qb.where('Reservation.status', '=', status as ReservationStatus),
    )
    .$if(!!search, (qb) =>
      qb.where((eb) =>
        eb.or([
          eb('Patient.firstName', 'ilike', `%${search}%`),
          eb('Patient.lastName', 'ilike', `%${search}%`),
          eb('Treatment.name', 'ilike', `%${search}%`),
        ]),
      ),
    )
    .executeTakeFirst();

  const count = Number(countResult?.count || 0);

  const results = await query
    .orderBy('Reservation.startTime', 'desc')
    .limit(perPage)
    .offset(offset)
    .execute();

  const data: StaffAppointmentResult[] = results.map((r) => ({
    id: r.id,
    patient: {
      id: r.patientId,
      firstName: r.patientFirstName,
      lastName: r.patientLastName,
      avatar: (r.patientAvatar as { url: string } | null)?.url || null,
    },
    treatment: {
      id: r.treatmentId,
      name: r.treatmentName,
    },
    startTime: r.startTime,
    endTime: r.endTime,
    duration: r.duration,
    status: r.status,
    note: r.note,
  }));

  return {
    data,
    count,
    hasNextPage: offset + data.length < count,
  };
};
