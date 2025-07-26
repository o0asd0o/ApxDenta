import type { FileRoutesByTo } from '@/routeTree.gen';
import { useLocation } from '@tanstack/react-router';
import { HeaderSidebarTrigger } from './HeaderSidebarTrigger';
import { SearchBox } from './SearchBox';
import { UserMenu } from './UserMenu';

type AllRoutes = keyof FileRoutesByTo;

const ROUTE_LABEL_MAPPING: Record<AllRoutes, string> = {
  '': '',
  '/': '',
  '/forgot-password': '',
  '/reset-password': '',
  '/login': '',
  '/register': '',

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

export default function Header() {
  const location = useLocation();
  return (
    <header className="grid grid-cols-2 md:grid-cols-3 h-15 md:h-18 shrink-0 justify-center items-center gap-2 border-b px-6 py-2">
      <h1 className="text-2xl font-bold whitespace-nowrap">
        {ROUTE_LABEL_MAPPING[location.pathname as AllRoutes]}
      </h1>
      <SearchBox />
      <div className="hidden md:flex ml-auto items-center justify-end gap-2 divide-accent-foreground">
        <UserMenu />
      </div>
      <HeaderSidebarTrigger />
    </header>
  );
}
