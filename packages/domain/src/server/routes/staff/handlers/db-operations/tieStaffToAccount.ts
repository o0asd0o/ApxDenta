import type { DatabaseInstance } from '@/db';

export const tieStaffToAccount = async (
  db: DatabaseInstance,
  staffId: string,
  userId: string,
) => {
  const account = await db
    .selectFrom('account')
    .select('id')
    .where('id', '=', userId)
    .executeTakeFirstOrThrow();

  return db
    .updateTable('Staff')
    .set({ accountId: account.id })
    .where('id', '=', staffId)
    .executeTakeFirstOrThrow();
};
