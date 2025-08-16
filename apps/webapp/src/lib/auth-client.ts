import { createAuthClient } from '@repo/domain/auth-client';

const authClient = createAuthClient({
  apiBaseUrl: `${import.meta.env.VITE_PUBLIC_SERVER_URL}`,
});

export const {
  signIn,
  signOut,
  signUp,
  requestPasswordReset,
  resetPassword,
  useSession,
  organization,
  useListOrganizations,
  useActiveOrganization,
  useActiveMember,
  verifyEmail,
} = authClient;
