import { createAuthClient } from '@repo/domain/auth';

const authClient = createAuthClient({
  apiBaseUrl: 'http://localhost:3035',
});

export const { signIn, signOut, signUp, useSession } = authClient;
