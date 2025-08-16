import type { DatabaseInstance } from '@/db';

export const getOrganizationIdForUser = async (
  db: DatabaseInstance,
  userId: string,
) => {
  const activeOrganization = await db
    .selectFrom('organization')
    .innerJoin('member', 'member.organizationId', 'organization.id')
    .where('member.userId', '=', userId)
    .select('organization.id')
    .executeTakeFirst();

  return activeOrganization?.id as string;
};
