import type { Context } from 'hono';
import type { auth } from '~/lib/auth';

export type AppType = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

export type TrpcContext = Context<AppType, '/api/trpc/*'>;
