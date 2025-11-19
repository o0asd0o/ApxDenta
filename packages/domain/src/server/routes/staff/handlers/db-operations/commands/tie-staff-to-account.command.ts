import type { DatabaseInstance } from '@/db';
import * as errors from '@/server/common/errors';
import dayjs from 'dayjs';

export const tieStaffToAccount = async (
  db: DatabaseInstance,
  staffId: string,
  userId: string,
  invitationId: string,
) => {
  const [account, staff, invitation] = await Promise.all([
    db
      .selectFrom('account')
      .select('id')
      .where('userId', '=', userId)
      .executeTakeFirstOrThrow(),
    db
      .selectFrom('Staff')
      .selectAll()
      .where('id', '=', staffId)
      .executeTakeFirstOrThrow(),
    db
      .selectFrom('invitation')
      .selectAll()
      .where('id', '=', invitationId)
      .executeTakeFirstOrThrow(),
  ]);

  if (dayjs(invitation.expiresAt).isBefore(dayjs())) {
    throw errors.badRequest(undefined, 'Invitation has expired');
  }

  db.transaction()
    .execute(async (tx) => {
      await Promise.all([
        tx
          .updateTable('invitation')
          .set('status', 'accepted')
          .where('id', '=', invitationId)
          .execute(),
        tx
          .insertInto('member')
          .values({
            organizationId: staff.organizationId as string,
            role: staff.type === 'DOCTOR' ? 'doctor' : 'genStaff',
            createdAt: new Date(),
            id: crypto.randomUUID(),
            userId: userId,
          })
          .executeTakeFirstOrThrow(),
        tx
          .updateTable('Staff')
          .set({ accountId: account.id })
          .where('id', '=', staffId)
          .executeTakeFirstOrThrow(),
      ]);
    })
    .catch((error) => {
      console.error('Error tying staff to account:', error);
      throw errors.serverError();
    });
};
