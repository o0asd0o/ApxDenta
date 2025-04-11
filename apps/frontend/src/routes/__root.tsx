// import Header from '@/components/Header';
import type { authClient } from '@/lib/auth-client';
import type { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

interface MyRouterContext {
  queryClient: QueryClient;
  auth: ReturnType<typeof authClient.useSession>['data'];
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
});
