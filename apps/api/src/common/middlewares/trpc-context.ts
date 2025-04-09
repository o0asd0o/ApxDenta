import appRouter from '@/routes';
import { trpcServer } from '@hono/trpc-server';
import type { Context, Next } from 'hono';
import { createTrpcContext } from '../trpc/context';

export const trpcMiddleware = async (c: Context, next: Next) =>
  trpcServer({
    router: appRouter,
    createContext: createTrpcContext(c),
  })(c, next);
