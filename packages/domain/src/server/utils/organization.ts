import type { AuthInstance } from '@/auth/auth-server';

export const extractOrganizationIdFromSession = (
  session: AuthInstance['$Infer']['Session'] | null,
) => {
  const _session = session as unknown as {
    session: { activeOrganizationId: string };
  };

  const organizationId = _session.session.activeOrganizationId;

  return organizationId;
};
