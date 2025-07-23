import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { requestId } from 'hono/request-id';
import { api, auth } from './domains';
import { env } from './env';
import { authCors, rateLimit, trpcCors } from './middlewares/cors';
import type { AppType } from './types';
import { cors } from 'hono/cors';

const SERVER_PATHS = {
  ALL: '*',
  BETTER_AUTH: '/api/auth/**',
  TRPC: '/trpc/*',
  UPLOAD: '/upload',
} as const;

const app = new Hono<AppType>({ strict: false })
  .get('/', (c) => c.text('Welcome to ApxDenta API! (c)'))
  .get('/healthcheck', (c) => c.text('OK'))
  .options(SERVER_PATHS.ALL, cors())
  .use(SERVER_PATHS.ALL, requestId())
  .use(SERVER_PATHS.ALL, logger())
  .use(SERVER_PATHS.ALL, prettyJSON())
  .use(SERVER_PATHS.ALL, rateLimit)
  .use(SERVER_PATHS.BETTER_AUTH, authCors)
  .use(SERVER_PATHS.TRPC, trpcCors)
  .on(['POST', 'GET'], SERVER_PATHS.BETTER_AUTH, (c) => auth.handler(c.req.raw))
  .use(
    SERVER_PATHS.TRPC,
    trpcServer({
      router: api.trpcRouter,
      createContext: (c) => api.createTRPCContext({ headers: c.req.headers }),
    }),
  )
  

if (process.env.NODE_ENV === 'development') {
  showRoutes(app, { verbose: true, colorize: true });
}

export default {
  port: env.SERVER_PORT,
  fetch: app.fetch,
  hostname: env.SERVER_HOST,
};
