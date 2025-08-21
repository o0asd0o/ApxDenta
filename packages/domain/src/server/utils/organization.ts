import type { AuthInstance } from '@/auth/auth-server';

export const extractOrganizationInfoFromSession = (
  session: AuthInstance['$Infer']['Session'] | null,
) => {
  const _session = session as unknown as {
    session: { activeOrganizationId: string; role: string };
  };

  return _session?.session?.activeOrganizationId || null;
};
