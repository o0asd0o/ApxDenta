import type { DatabaseInstance } from '@/db';

export const archiveStaffByIds = async (
  db: DatabaseInstance,
  staffIds: string[],
) => {
  const qb = db.updateTable('Staff').set({ isArchived: true });
  return qb.where('id', 'in', staffIds).execute();
};
