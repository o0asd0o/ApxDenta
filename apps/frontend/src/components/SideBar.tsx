import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from '@repo/ui/components/sidebar';
import { Link, useLocation } from '@tanstack/react-router';
import {
  Calendar,
  CalendarCheck,
  ChartColumnBig,
  CircleUserRound,
  CreditCard,
  FileChartColumnIncreasing,
  Headset,
  Home,
  Inbox,
  LayoutDashboard,
  PillBottle,
  Search,
  Settings,
  ShoppingCart,
  Stethoscope,
  UsersRound,
  WalletCards,
  Wrench,
} from 'lucide-react';
import type { MenuItem, TRoutes } from './types';

const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

const MENU_LIST: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard />,
  },
  {
    title: 'Clinic',
    subMenu: [
      {
        icon: <CalendarCheck />,
        title: 'Reservations',
        path: '/reservations',
      },
      {
        icon: <CircleUserRound />,
        title: 'Patients',
        path: '/patients',
      },
      {
        icon: <Stethoscope />,
        title: 'Treatments',
        path: '/treatments',
      },
      {
        icon: <UsersRound />,
        title: 'Staff List',
        path: '/staff-list',
      },
    ],
  },

  {
    title: 'Finance',
    subMenu: [
      {
        icon: <WalletCards />,
        title: 'Accounts',
        path: '/accounts',
      },
      {
        icon: <ChartColumnBig />,
        title: 'Sales',
        path: '/sales',
      },
      {
        icon: <ShoppingCart />,
        title: 'Purchases',
        path: '/purchases',
      },
      {
        icon: <CreditCard />,
        title: 'Payment Methods',
        path: '/payment-methods',
      },
    ],
  },
  {
    title: 'Physical Asset',
    subMenu: [
      {
        icon: <PillBottle />,
        title: 'Stocks',
        path: '/stocks',
      },
      {
        icon: <Wrench />,
        title: 'Peripherals',
        path: '/peripherals',
      },
    ],
  },
];

const EXTRA_MENUS = [
  {
    title: 'Report',
    path: '/',
    icon: <FileChartColumnIncreasing />,
  },
  {
    title: 'Customer Support',
    path: '/',
    icon: <Headset />,
  },
];

export const SideBar = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarTrigger className="absolute right-[-14px] top-[23px] rounded-full border border-border bg-white" />
        <div className="flex gap-2 pt-2 pb-2 ml-1">
          <img className="size-6" src="/images/zendenta-logo.png" alt="logo" />
          <h2 className="text-md font-bold text-black">Zendenta</h2>
        </div>
        <div className="pt-2">
          <div className="flex gap-2 px-2 py-1.5 items-center border border-solid border-border rounded-md">
            <div className="size-5 bg-gray-300 rounded-full" />
            <div className="flex flex-col">
              <span className="text-xs font-medium">Avicena Clinic</span>
              <span className="text-[11px] text-muted-foreground">
                845 Euclid Avenue, CA
              </span>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-3 mt-3">
        {MENU_LIST.map((menu) => {
          if (menu.subMenu && !menu.path) {
            return (
              <SidebarGroup>
                <SidebarGroupLabel>{menu.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menu.subMenu.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className="text-[13px]"
                          isActive={item.path === location.pathname}
                        >
                          <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          }

          return (
            <SidebarMenu className="px-3" key={`side-bar-menu-${menu.title}`}>
              <SidebarMenuItem key={menu.title}>
                <SidebarMenuButton
                  asChild
                  isActive={menu.path === location.pathname}
                >
                  <Link to={menu.path as TRoutes}>
                    {menu.icon}
                    <span>{menu.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          );
        })}
        <SidebarSeparator />
        {EXTRA_MENUS.map((menu) => (
          <SidebarMenu className="px-3" key={`side-bar-menu-${menu.title}`}>
            <SidebarMenuItem key={menu.title}>
              <SidebarMenuButton asChild>
                <Link to={menu.path as TRoutes}>
                  {menu.icon}
                  <span>{menu.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ))}
      </SidebarContent>
      <SidebarSeparator />
      {/* <SidebarContent className="gap-3">
        
      </SidebarContent> */}
    </Sidebar>
  );
};
