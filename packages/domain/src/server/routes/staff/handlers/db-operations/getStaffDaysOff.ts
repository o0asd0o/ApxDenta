import type { DatabaseInstance } from '@/db';
import { jsonArrayFrom } from 'kysely/helpers/postgres';

export const getStaffDaysOff = async (
  db: DatabaseInstance,
  staffId: string,
) => {
  return db
    .selectFrom('Staff')
    .select((eb) => {
      return jsonArrayFrom(
        eb
          .selectFrom('DayOff')
          .select([
            'DayOff.from',
            'DayOff.to',
            'DayOff.id',
            'DayOff.isDefault',
            'DayOff.name',
            'DayOff.repeat',
          ])
          .innerJoin('_StaffDayOff', '_StaffDayOff.A', 'DayOff.id')
          .whereRef('Staff.id', '=', '_StaffDayOff.B'),
      ).as('daysOff');
    })
    .where('Staff.id', '=', staffId)
    .executeTakeFirstOrThrow();
};
