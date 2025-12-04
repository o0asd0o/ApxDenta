// import type { AuthInstance } from '@repo/auth/server';
// import type { DatabaseInstance } from '@repo/db/client';
import type { AuthInstance } from '@/auth/auth-server';
import type { DatabaseInstance } from '@/db/client';
import seeder from './routes/_aux/@seeder';
import components from './routes/_aux/components';
import dayOff from './routes/_aux/day-off';
import files from './routes/_aux/files';
import specialistRecord from './routes/_aux/specialists-record';
import assets from './routes/assets';
import patients from './routes/patient';
import staffs from './routes/staff';
import treatments from './routes/treatments';
import { createTRPCContext as createTRPCContextInternal, router } from './trpc';

type ApiType = {
  auth: AuthInstance;
  db: DatabaseInstance;
};

const routes = {
  assets,
  patients,
  staffs,
  treatments,

  // auxilalries
  files,
  dayOff,
  components,
  specialistRecord,
  seeder,
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
