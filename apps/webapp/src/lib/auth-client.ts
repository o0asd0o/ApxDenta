import { createAuthHooks } from '@daveyplate/better-auth-tanstack';
import { createAuthClient } from '@repo/domain/auth-client';

const authClient = createAuthClient({
  apiBaseUrl: `${import.meta.env.VITE_PUBLIC_SERVER_URL}`,
});

export const authHooks = createAuthHooks(authClient);

export const {
  signIn,
  signOut,
  signUp,
  requestPasswordReset,
  resetPassword,
  organization,
  useListOrganizations,
  useActiveOrganization,
  getSession,
  useActiveMember,
  verifyEmail,
} = authClient;

export const { useSession } = authHooks;
