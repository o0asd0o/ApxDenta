import { createAuthClient } from '@repo/domain/auth';

const authClient = createAuthClient({
  apiBaseUrl: `${import.meta.env.VITE_PUBLIC_SERVER_URL}`,
});

export const { signIn, signOut, signUp, useSession } = authClient;
