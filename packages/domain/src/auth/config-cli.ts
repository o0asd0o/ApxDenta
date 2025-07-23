import { createDb } from '@/db/client';
import { env } from '@/env';
import { type AuthInstance, createAuth } from './auth-server';

/** For Internal use only */

export const auth: AuthInstance = createAuth({
  webUrl: env.PUBLIC_WEB_URL,
  googleCredentials: {
    clientId: env.SERVER_GOOGLE_CLIENT_ID,
    clientSecret: env.SERVER_GOOGLE_CLIENT_SECRET,
  },
  authSecret: env.SERVER_AUTH_SECRET,
  db: createDb({ databaseUrl: env.SERVER_POSTGRES_URL }),
});
