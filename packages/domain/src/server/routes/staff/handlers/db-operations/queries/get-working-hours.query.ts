import type { DatabaseInstance } from '@/db';
import { jsonArrayFrom } from 'kysely/helpers/postgres';

export const getStaffWorkingHours = async (
  db: DatabaseInstance,
  staffId: string,
) => {
  return db
    .selectFrom('Staff')
    .select((eb) => {
      return jsonArrayFrom(
        eb
          .selectFrom('WorkSchedule')
          .select(['WorkSchedule.day', 'WorkSchedule.from', 'WorkSchedule.to'])
          .whereRef('WorkSchedule.staffId', '=', 'Staff.id'),
      ).as('workSchedules');
    })
    .where('Staff.id', '=', staffId)
    .executeTakeFirstOrThrow();
};
