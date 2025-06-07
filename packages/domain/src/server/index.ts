// import type { AuthInstance } from '@repo/auth/server';
// import type { DatabaseInstance } from '@repo/db/client';
import type { AuthInstance } from '@/auth/auth-server';
import type { DatabaseInstance } from '@/db/client';
import dayOff from './routes/_aux/day-off';
import assets from './routes/assets';
import staffs from './routes/staff';
import { createTRPCContext as createTRPCContextInternal, router } from './trpc';

type ApiType = {
  auth: AuthInstance;
  db: DatabaseInstance;
};

const routes = {
  assets,
  staffs,

  // auxilalries
  dayOff,
};

export type ApiInstance = ReturnType<typeof createApi>;

export const createApi = ({ auth, db }: ApiType) => {
  return {
    trpcRouter: router(routes),
    createTRPCContext: ({ headers }: { headers: Headers }) => {
      return createTRPCContextInternal({ auth, db, headers });
    },
  };
};

const appRouter = router(routes);

export default appRouter;
export type AppRouter = typeof appRouter;
