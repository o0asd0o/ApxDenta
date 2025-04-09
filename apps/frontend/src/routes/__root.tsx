// import Header from '@/components/Header';
import { authClient } from '@/lib/auth-client';
import type { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

interface MyRouterContext {
  queryClient: QueryClient;
  auth: ReturnType<typeof authClient.useSession>['data'];
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    const { data: session, isPending } = authClient.useSession();

    console.log({ session, isPending });
    return <Outlet />;
  },
});
