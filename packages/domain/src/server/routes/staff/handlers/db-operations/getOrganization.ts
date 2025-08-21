import type { DatabaseInstance } from '@/db';

// TODO: Move this to a more general folder
export const getOrganizationById = async (
  db: DatabaseInstance,
  organizationId: string,
) => {
  return db
    .selectFrom('organization')
    .select(['id', 'name', 'logo'])
    .where('organization.id', '=', organizationId)
    .executeTakeFirstOrThrow();
};
