import { TRPCError, initTRPC } from '@trpc/server';
import SuperJSON from 'superjson';
import { ZodError, z } from 'zod/v4';
import type { TRPCContext, TrpcContextSession } from './types';
import { extractOrganizationIdFromSession } from './utils/organization';

export const createTRPCContext = async ({
  auth,
  db,
  headers,
}: TRPCContext): Promise<TrpcContextSession> => {
  const session = await auth.api.getSession({ headers });
  const organizationId = extractOrganizationIdFromSession(session);
  return { db, session, organizationId };
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
  errorFormatter(opts) {
    return {
      ...opts.shape,
      data: {
        zodError:
          opts.error.code === 'BAD_REQUEST' &&
          opts.error.cause instanceof ZodError
            ? z.treeifyError(opts.error.cause)
            : null,
        ...opts.shape.data,
      },
    };
  },
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
