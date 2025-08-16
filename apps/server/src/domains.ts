import { type AuthInstance, createAuth } from '@repo/domain/auth-server';
import { createDb } from '@repo/domain/db';
import { createResend } from '@repo/domain/lib';
import { type ApiInstance, createApi } from '@repo/domain/server';
import { env } from './env';

const db = createDb({ databaseUrl: env.SERVER_POSTGRES_URL });
const auth: AuthInstance = createAuth({
  webUrl: env.PUBLIC_WEB_URL,
  googleCredentials: {
    clientId: env.SERVER_GOOGLE_CLIENT_ID,
    clientSecret: env.SERVER_GOOGLE_CLIENT_SECRET,
  },
  authSecret: env.SERVER_AUTH_SECRET,
  db,
});
const api: ApiInstance = createApi({ auth, db });
const mailing = createResend({ apiKey: env.SERVER_RESEND_API_KEY });

export { auth, db, api, mailing };
