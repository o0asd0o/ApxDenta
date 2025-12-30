import type { DatabaseInstance } from '@/db';

export const deletePatients = async (
  db: DatabaseInstance,
  patientIds: string[],
) => {
  await db.deleteFrom('Patient').where('id', 'in', patientIds).execute();
};
