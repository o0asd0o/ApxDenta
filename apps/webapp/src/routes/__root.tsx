// import Header from '@/components/Header';
import NotFound from '@/features/not-found/NotFound';
import type { useSession } from '@/lib/auth-client';
import type { useTRPC, useTRPCClient } from '@/lib/trpc';
import type { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

interface MyRouterContext {
  queryClient: QueryClient;
  auth: ReturnType<typeof useSession>['data'];
  trpc: ReturnType<typeof useTRPC> | null;
  client: ReturnType<typeof useTRPCClient> | null;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
  notFoundComponent: () => <NotFound />,
});
