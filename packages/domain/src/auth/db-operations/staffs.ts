import type { DatabaseInstance } from '@/db';

export const getActiveStaffByEmail = async (
  db: DatabaseInstance,
  email: string,
) => {
  return db
    .selectFrom('Staff')
    .where('email', '=', email)
    .where('isArchived', '=', false)
    .select('Staff.id')
    .executeTakeFirst();
};

export const getInActiveStaffByEmail = async (
  db: DatabaseInstance,
  email: string,
) => {
  return db
    .selectFrom('Staff')
    .where('email', '=', email)
    .where('isArchived', '=', true)
    .select('Staff.id')
    .executeTakeFirst();
};

export const getInactiveStaffByUserId = async (
  db: DatabaseInstance,
  userId: string,
) => {
  const accountInactiveStaff = await db
    .selectFrom('user')
    .innerJoin('account', 'account.userId', 'user.id')
    .innerJoin('Staff', 'Staff.accountId', 'account.accountId')
    .where('user.id', '=', userId)
    .where('Staff.isArchived', '=', true)
    .select('Staff.id')
    .distinct()
    .executeTakeFirst();

  return accountInactiveStaff;
};
