import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from '@repo/ui/components/sidebar';
import { useLocation } from '@tanstack/react-router';
import {
  CalendarCheck,
  ChartColumnBig,
  CircleUserRound,
  CreditCard,
  FileChartColumnIncreasing,
  Headset,
  LayoutDashboard,
  PillBottle,
  ShoppingCart,
  Stethoscope,
  UsersRound,
  WalletCards,
  Wrench,
} from 'lucide-react';
import type { MenuItem } from '../types';
import { CompanySection } from './CompanySection';
import { SideBarButton } from './SideBarButton';
import { SideBarLogo } from './SideBarLogo';
import { SideTrigger } from './SideTrigger';

const MENU_LIST: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Clinic',
    subMenu: [
      {
        icon: CalendarCheck,
        title: 'Reservations',
        path: '/reservations',
      },
      {
        icon: CircleUserRound,
        title: 'Patients',
        path: '/patients',
      },
      {
        icon: Stethoscope,
        title: 'Treatments',
        path: '/treatments',
      },
      {
        icon: UsersRound,
        title: 'Staff List',
        path: '/staff-list',
      },
    ],
  },

  {
    title: 'Finance',
    subMenu: [
      {
        icon: WalletCards,
        title: 'Accounts',
        path: '/accounts',
      },
      {
        icon: ChartColumnBig,
        title: 'Sales',
        path: '/sales',
      },
      {
        icon: ShoppingCart,
        title: 'Purchases',
        path: '/purchases',
      },
      {
        icon: CreditCard,
        title: 'Payment Methods',
        path: '/payment-methods',
      },
    ],
  },
  {
    title: 'Physical Asset',
    subMenu: [
      {
        icon: PillBottle,
        title: 'Stocks',
        path: '/stocks',
      },
      {
        icon: Wrench,
        title: 'Peripherals',
        path: '/peripherals',
      },
    ],
  },
];

const EXTRA_MENUS: MenuItem[] = [
  {
    title: 'Report',
    path: '/',
    icon: FileChartColumnIncreasing,
  },
  {
    title: 'Customer Support',
    path: '/',
    icon: Headset,
  },
];

export const AppSideBar = () => {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SideTrigger />
        <SideBarLogo />
        <CompanySection name="Avicena Clinic" slogan="845 Euclid Avenue, CA" />
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
                      <SideBarButton
                        key={`${item.path}-${item.title}`}
                        pathname={location.pathname}
                        item={item}
                      />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          }

          return (
            <SidebarMenu className="px-3" key={`side-bar-menu-${menu.title}`}>
              <SidebarMenuItem key={menu.title}>
                <SideBarButton
                  key={`${menu.path}-${menu.title}`}
                  pathname={location.pathname}
                  item={menu}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          );
        })}
        <SidebarSeparator />
        {EXTRA_MENUS.map((menu) => (
          <SidebarMenu className="px-3" key={`side-bar-menu-${menu.title}`}>
            <SidebarMenuItem key={menu.title}>
              <SideBarButton
                key={`${menu.path}-${menu.title}`}
                pathname={location.pathname}
                item={menu}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        ))}
      </SidebarContent>
      <SidebarSeparator />
    </Sidebar>
  );
};
