import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { requestId } from 'hono/request-id';
import { auth } from '~/lib/auth';
// import { auth } from '~/lib/auth';
// import { handleError } from './common/errors';
import { corsMiddleware } from './common/middlewares/cors';
import { sessionMiddleware } from './common/middlewares/session';
import { trpcMiddleware } from './common/middlewares/trpc-context';
import type { AppType } from './common/types/hono';

const app = new Hono<AppType>({ strict: false })
  .get('/', (c) => {
    return c.text('Welcome to Zendenta API! (c)');
  })
  .use('*', requestId())
  .use('*', logger())
  .use('*', prettyJSON())
  .use('*', corsMiddleware)
  .use('*', sessionMiddleware)
  .on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw))
  .use('/api/trpc/*', trpcMiddleware);

if (process.env.NODE_ENV === 'development') {
  showRoutes(app, { verbose: true, colorize: true });
}

export default app;
