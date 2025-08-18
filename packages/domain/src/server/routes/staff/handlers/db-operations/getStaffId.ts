import type { DatabaseInstance } from '@/db';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

export const getStaffById = async (db: DatabaseInstance, staffId: string) => {
  return db
    .selectFrom('Staff')
    .select((eb) => {
      return jsonObjectFrom(
        eb
          .selectFrom('File')
          .select(['File.url'])
          .whereRef('File.id', '=', 'Staff.avatarId'),
      ).as('avatar');
    })
    .selectAll()
    .where('Staff.id', '=', staffId)
    .executeTakeFirstOrThrow();
};
