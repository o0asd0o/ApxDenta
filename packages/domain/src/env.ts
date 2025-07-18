import * as v from 'valibot';

export const CLIENT_ENV_PREFIX = 'PUBLIC_';

export const envSchema = v.object({
  SERVER_AUTH_SECRET: v.string(),
  SERVER_POSTGRES_URL: v.string(),

  SERVER_GOOGLE_CLIENT_ID: v.string(),
  SERVER_GOOGLE_CLIENT_SECRET: v.string(),

  SERVER_RESEND_EMAIL: v.pipe(v.string(), v.email()),
  SERVER_RESEND_API_KEY: v.pipe(v.string(), v.startsWith('re_')),

  AWS_BUCKET_REGION: v.string(),
  AWS_BUCKET_NAME: v.string(),
  AWS_ACCESS_KEY: v.string(),
  AWS_ACCESS_KEY_SECRET: v.string(),

  PUBLIC_WEB_URL: v.string(),
});

export const env = v.parse(envSchema, process.env);
