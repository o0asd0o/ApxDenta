import type { DatabaseInstance } from '@/db';
import type { PatientStatus } from '@/db/prisma/out/enums';
import { sql } from 'kysely';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

export type StaffPatientResult = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar: string | null;
  status: PatientStatus;
  lastVisit: Date | null;
  nextAppointment: Date | null;
  totalTreatments: number;
  completedTreatments: number;
};

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
): Promise<{
  data: StaffPatientResult[];
  count: number;
  hasNextPage: boolean;
}> => {
  const { staffId, page, perPage, status, search } = params;
  const offset = (page - 1) * perPage;

  // Get unique patients who have appointments with this staff
  const baseQuery = db
    .selectFrom('Patient')
    .innerJoin('Reservation', 'Reservation.patientId', 'Patient.id')
    .where('Reservation.staffId', '=', staffId)
    .where('Reservation.isArchived', '=', false)
    .groupBy('Patient.id');

  // Apply filters
  let countQuery = baseQuery;
  if (status) {
    countQuery = countQuery.where(
      'Patient.status',
      '=',
      status,
    ) as typeof countQuery;
  }
  if (search) {
    countQuery = countQuery.where((eb) =>
      eb.or([
        eb('Patient.firstName', 'ilike', `%${search}%`),
        eb('Patient.lastName', 'ilike', `%${search}%`),
        eb('Patient.email', 'ilike', `%${search}%`),
      ]),
    ) as typeof countQuery;
  }

  // Get count of unique patients
  const countResult = await db
    .selectFrom(countQuery.select('Patient.id').as('subquery'))
    .select((eb) => eb.fn.countAll<number>().as('count'))
    .executeTakeFirst();

  const count = Number(countResult?.count || 0);

  // Get patients with aggregated data
  let dataQuery = db
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
    dataQuery = dataQuery.where('Patient.status', '=', status);
  }
  if (search) {
    dataQuery = dataQuery.where((eb) =>
      eb.or([
        eb('Patient.firstName', 'ilike', `%${search}%`),
        eb('Patient.lastName', 'ilike', `%${search}%`),
        eb('Patient.email', 'ilike', `%${search}%`),
      ]),
    );
  }

  const results = await dataQuery
    .orderBy('Patient.firstName', 'asc')
    .limit(perPage)
    .offset(offset)
    .execute();

  const data: StaffPatientResult[] = results.map((r) => ({
    id: r.id,
    firstName: r.firstName,
    lastName: r.lastName,
    email: r.email,
    phoneNumber: r.phoneNumber,
    avatar: (r.avatar as { url: string } | null)?.url || null,
    status: r.status,
    lastVisit: r.lastVisit as Date | null,
    nextAppointment: r.nextAppointment as Date | null,
    totalTreatments: Number(r.totalTreatments || 0),
    completedTreatments: Number(r.completedTreatments || 0),
  }));

  return {
    data,
    count,
    hasNextPage: offset + data.length < count,
  };
};
