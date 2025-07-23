import { env } from '@/env';
import { rateLimiter } from 'hono-rate-limiter';
import { cors } from 'hono/cors';
import { v4 as uuidV4 } from 'uuid';

const trustedOrigins = [env.PUBLIC_WEB_URL, 'http://localhost:8080'].map(
  (url) => new URL(url).origin,
);

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

export const rateLimit = rateLimiter({
  windowMs: 5 * 60 * 1000,
  limit: 50,
  standardHeaders: 'draft-6',
  keyGenerator: () => uuidV4(),
});
