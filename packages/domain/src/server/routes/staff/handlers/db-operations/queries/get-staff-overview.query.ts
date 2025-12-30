import type { DatabaseInstance } from '@/db';

export type StaffOverviewStats = {
  totalAppointments: number;
  activePatients: number;
  weeklyWorkingHours: number;
  averageRating: number;
  completionRate: number;
};

export type StaffRecentActivity = {
  id: string;
  type: 'appointment' | 'review';
  description: string;
  time: Date;
  status: 'completed' | 'scheduled' | 'cancelled';
};

export type StaffCertification = {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate: Date | null;
  credentialId: string | null;
  credentialUrl: string | null;
};

export type StaffEducation = {
  id: string;
  institution: string;
  degree: string;
  field: string | null;
  startDate: Date | null;
  endDate: Date | null;
  isCurrent: boolean | null;
};

export const getStaffOverviewStats = async (
  db: DatabaseInstance,
  staffId: string,
): Promise<StaffOverviewStats> => {
  // Get total appointments count
  const appointmentsResult = await db
    .selectFrom('Reservation')
    .select((eb) => eb.fn.countAll<number>().as('count'))
    .where('staffId', '=', staffId)
    .where('isArchived', '=', false)
    .executeTakeFirst();

  const totalAppointments = Number(appointmentsResult?.count || 0);

  // Get active patients count (unique patients with appointments)
  const patientsResult = await db
    .selectFrom('Reservation')
    .select((eb) => eb.fn.count<number>('patientId').distinct().as('count'))
    .where('staffId', '=', staffId)
    .where('isArchived', '=', false)
    .executeTakeFirst();

  const activePatients = Number(patientsResult?.count || 0);

  // Get weekly working hours from WorkSchedule
  const workSchedules = await db
    .selectFrom('WorkSchedule')
    .select(['from', 'to'])
    .where('staffId', '=', staffId)
    .execute();

  let weeklyWorkingHours = 0;
  for (const schedule of workSchedules) {
    const fromTime = new Date(`1970-01-01T${schedule.from}`);
    const toTime = new Date(`1970-01-01T${schedule.to}`);
    const hours = (toTime.getTime() - fromTime.getTime()) / (1000 * 60 * 60);
    weeklyWorkingHours += hours;
  }

  // Get average rating from treatments this staff is assigned to
  const ratingsResult = await db
    .selectFrom('Rating')
    .innerJoin('Treatment', 'Treatment.id', 'Rating.treatmentId')
    .innerJoin(
      '_StaffAssignedTreatment',
      '_StaffAssignedTreatment.B',
      'Treatment.id',
    )
    .select((eb) => eb.fn.avg<number>('Rating.rate').as('avgRating'))
    .where('_StaffAssignedTreatment.A', '=', staffId)
    .executeTakeFirst();

  const averageRating = Number(ratingsResult?.avgRating || 0);

  // Get completion rate (DONE / total non-cancelled)
  const completedResult = await db
    .selectFrom('Reservation')
    .select((eb) => eb.fn.countAll<number>().as('count'))
    .where('staffId', '=', staffId)
    .where('status', '=', 'DONE')
    .where('isArchived', '=', false)
    .executeTakeFirst();

  const totalNonCancelled = await db
    .selectFrom('Reservation')
    .select((eb) => eb.fn.countAll<number>().as('count'))
    .where('staffId', '=', staffId)
    .where('status', '!=', 'CANCELLED')
    .where('isArchived', '=', false)
    .executeTakeFirst();

  const completedCount = Number(completedResult?.count || 0);
  const totalCount = Number(totalNonCancelled?.count || 1);
  const completionRate =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return {
    totalAppointments,
    activePatients,
    weeklyWorkingHours: Math.round(weeklyWorkingHours),
    averageRating: Math.round(averageRating * 10) / 10,
    completionRate,
  };
};

export const getStaffRecentActivities = async (
  db: DatabaseInstance,
  staffId: string,
  limit = 10,
): Promise<StaffRecentActivity[]> => {
  const reservations = await db
    .selectFrom('Reservation')
    .innerJoin('Patient', 'Patient.id', 'Reservation.patientId')
    .innerJoin('Treatment', 'Treatment.id', 'Reservation.initialTreatmentId')
    .select([
      'Reservation.id',
      'Reservation.status',
      'Reservation.updatedAt',
      'Patient.firstName as patientFirstName',
      'Patient.lastName as patientLastName',
      'Treatment.name as treatmentName',
    ])
    .where('Reservation.staffId', '=', staffId)
    .where('Reservation.isArchived', '=', false)
    .orderBy('Reservation.updatedAt', 'desc')
    .limit(limit)
    .execute();

  return reservations.map((r) => {
    let status: 'completed' | 'scheduled' | 'cancelled' = 'scheduled';
    let description = '';

    if (r.status === 'DONE') {
      status = 'completed';
      description = `Completed ${r.treatmentName} with ${r.patientFirstName} ${r.patientLastName}`;
    } else if (r.status === 'CANCELLED') {
      status = 'cancelled';
      description = `Cancelled appointment with ${r.patientFirstName} ${r.patientLastName}`;
    } else {
      status = 'scheduled';
      description = `Scheduled ${r.treatmentName} for ${r.patientFirstName} ${r.patientLastName}`;
    }

    return {
      id: r.id,
      type: 'appointment' as const,
      description,
      time: r.updatedAt,
      status,
    };
  });
};

export const getStaffCertifications = async (
  db: DatabaseInstance,
  staffId: string,
): Promise<StaffCertification[]> => {
  const certifications = await db
    .selectFrom('StaffCertification')
    .select([
      'id',
      'name',
      'issuer',
      'issueDate',
      'expiryDate',
      'credentialId',
      'credentialUrl',
    ])
    .where('staffId', '=', staffId)
    .orderBy('issueDate', 'desc')
    .execute();

  return certifications;
};

export const getStaffEducations = async (
  db: DatabaseInstance,
  staffId: string,
): Promise<StaffEducation[]> => {
  const educations = await db
    .selectFrom('StaffEducation')
    .select([
      'id',
      'institution',
      'degree',
      'field',
      'startDate',
      'endDate',
      'isCurrent',
    ])
    .where('staffId', '=', staffId)
    .orderBy('endDate', 'desc')
    .execute();

  return educations;
};
