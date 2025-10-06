import type { DatabaseInstance } from '@/db';

export const getAllTreatmentCount = async (
  db: DatabaseInstance,
  orgId: string,
  status?: 'ACTIVE' | 'INACTIVE',
) => {
  let query = db
    .selectFrom('Treatment')
    .where('Treatment.organizationId', '=', orgId)
    .where('Treatment.isArchived', '=', false)
    .select((eb) => eb.fn.countAll().as('count'));

  if (status === 'ACTIVE') {
    query = query.where('status', '!=', 'INACTIVE');
  }

  if (status === 'INACTIVE') {
    query = query.where('status', '=', 'INACTIVE');
  }

  return query
    .executeTakeFirstOrThrow()
    .then((result) => result.count as number);
};
