import { SideBar } from '@/components/SideBar';
import type { FileRoutesByTo } from '@/routeTree.gen';
import { Button, SidebarInset, SidebarProvider } from '@repo/ui/components';
import { Outlet, useLocation } from '@tanstack/react-router';
import { Activity, CircleHelp, Settings } from 'lucide-react';
import { SearchBox } from './SearchBox';
import { UserMenu } from './UserMenu';

type AllRoutes = keyof FileRoutesByTo;

const ROUTE_LABEL_MAPPING: Record<AllRoutes, string> = {
  '': '',
  '/forgot-pasword': '',
  '/login': '',
  '/register': '',
  '/': '',

  // Protected
  '/patients': 'Patients',
  '/reservations': 'Reservations',
  '/payment-methods': 'Payment Methods',
  '/peripherals': 'Peripherals',
  '/purchases': 'Purchases',
  '/sales': 'Sales',
  '/staff-list': 'Staff List',
  '/stocks': 'Stocks',
  '/treatments': 'Treatments',
  '/accounts': 'Accounts',
  '/dashboard': 'Dashboard',
};

export const Protected = () => {
  const location = useLocation();
  return (
    <SidebarProvider>
      <SideBar />
      <SidebarInset className="flex flex-col">
        <div>
          <header className="grid grid-cols-3 h-18 shrink-0 justify-center items-center gap-2 border-b px-6 py-2">
            <h1 className="text-2xl font-bold">
              {ROUTE_LABEL_MAPPING[location.pathname as AllRoutes]}
            </h1>
            <SearchBox />
            <div className="flex ml-auto items-center justify-end gap-2 divide-accent-foreground">
              <div className="flex gap-1">
                <Button variant="ghost" className="size-7 p-1">
                  <CircleHelp />
                </Button>
                <Button variant="ghost" className="size-7 p-1">
                  <Activity />
                </Button>
                <Button variant="ghost" className="size-7 p-1">
                  <Settings />
                </Button>
              </div>

              <UserMenu />
            </div>
          </header>
        </div>

        <main className="flex flex-col w-full">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
