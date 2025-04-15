import { TRPCError, initTRPC } from '@trpc/server';
import SuperJSON from 'superjson';
import type { TRPCContext, TrpcContextSession } from './types';

export const createTRPCContext = async ({
  auth,
  db,
  headers,
}: TRPCContext): Promise<TrpcContextSession> => {
  const session = await auth.api.getSession({ headers });

  return { db, session };
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
});

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: { ...ctx.session },
    },
  });
});
