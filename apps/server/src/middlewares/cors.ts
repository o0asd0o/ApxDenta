import { env } from '@/env';
import { cors } from 'hono/cors';

const trustedOrigins = [env.PUBLIC_WEB_URL].map((url) => new URL(url).origin);

export const authCors = cors({
  origin: trustedOrigins,
  credentials: true,
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
});

export const trpcCors = cors({
  origin: trustedOrigins,
  credentials: true,
});
