import type { DatabaseInstance } from '@/db';

export const archiveTreatmentsByIds = async (
  db: DatabaseInstance,
  treatmentIds: string[],
) => {
  const qb = db.updateTable('Treatment').set({ isArchived: true });
  return qb.where('id', 'in', treatmentIds).execute();
};
