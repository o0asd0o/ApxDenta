import type { DatabaseInstance } from '@/db';
import { jsonArrayFrom } from 'kysely/helpers/postgres';

export const getStaffServices = async (
  db: DatabaseInstance,
  staffId: string,
) => {
  return db
    .selectFrom('Staff')
    .select((eb) => {
      return jsonArrayFrom(
        eb
          .selectFrom('Treatment')
          .select(['Treatment.name', 'Treatment.id', 'Treatment.category'])
          .innerJoin(
            '_StaffAssignedTreatment',
            '_StaffAssignedTreatment.B',
            'Treatment.id',
          )
          .whereRef('_StaffAssignedTreatment.A', '=', 'Staff.id'),
      ).as('assignedServices');
    })
    .where('Staff.id', '=', staffId)
    .executeTakeFirstOrThrow();
};
