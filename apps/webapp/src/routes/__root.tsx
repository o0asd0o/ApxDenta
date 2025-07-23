// import Header from '@/components/Header';
import type { useSession } from '@/lib/auth-client';
import type { useTRPC } from '@/lib/trpc';
import type { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

interface MyRouterContext {
  queryClient: QueryClient;
  auth: ReturnType<typeof useSession>['data'];
  trpc: ReturnType<typeof useTRPC> | null;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
});
