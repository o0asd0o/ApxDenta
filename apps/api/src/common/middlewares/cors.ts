import { cors } from 'hono/cors';

export const corsMiddleware = cors({
  origin: [process.env.BETTER_AUTH_URL as string, 'http://localhost:3001'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
});
