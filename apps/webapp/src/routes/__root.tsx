// import Header from '@/components/Header';
import type { useSession } from '@/lib/auth-client';
import type { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

interface MyRouterContext {
  queryClient: QueryClient;
  auth: ReturnType<typeof useSession>['data'];
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
});

// TODO:
// 1. sidebar responsiveness - mobile version and collapsed - DONE
// 2. user menu handling, signout, accounts, etc - DONE
// 3. Handle staff list
// 4. Handle patients
// 5. Handle accounts
// 6. Handle peripherals
// 8. Handle peripherals
// 9. Handle treatments
