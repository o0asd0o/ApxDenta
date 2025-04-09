import { router } from '@/common/trpc/trpc';
import assets from './assets';

const appRouter = router({
  assets,
});

export default appRouter;
export type AppRouter = typeof appRouter;
