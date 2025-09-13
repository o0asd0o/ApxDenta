import type { DatabaseInstance, StaffType } from '@/db';

export const getAllStaffCount = async (
  db: DatabaseInstance,
  orgId: string,
  staffType?: StaffType,
) => {
  let query = db
    .selectFrom('Staff')
    .where('Staff.organizationId', '=', orgId)
    .where('Staff.isArchived', '=', false)
    .select((eb) => eb.fn.countAll().as('count'));

  if (staffType) {
    query = query.where('type', '=', staffType);
  }

  return query
    .executeTakeFirstOrThrow()
    .then((result) => result.count as number);
};
