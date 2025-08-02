import { useIsMobile } from '@/hooks/use-mobile';
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
  useSidebar,
} from '@repo/ui/components/sidebar';
import { useLocation } from '@tanstack/react-router';
import { debounce } from 'lodash';
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
import { useCallback } from 'react';
import type { MenuItem } from '../__types';
import { UserMenu } from '../header/UserMenu';
import { SideBarButton } from './SideBarButton';
import { SideBarLogo } from './SideBarLogo';
import { SideTrigger } from './SideTrigger';
import { CompanySection } from './company/CompanySection';

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
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  const debouncedToggle = useCallback(debounce(toggleSidebar, 100), []);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-15 md:h-18 justify-center border-b">
        <SideTrigger />
        <SideBarLogo />
      </SidebarHeader>

      <SidebarContent className="gap-3 pt-3 pb-2">
        <div className="px-2">
          <CompanySection
            name="Avicena Clinic"
            slogan="845 Euclid Avenue, CA"
          />
        </div>
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
                        {...(isMobile && { onClick: () => debouncedToggle() })}
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
                  {...(isMobile && { onClick: () => debouncedToggle() })}
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
                {...(isMobile && { onClick: () => debouncedToggle() })}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        ))}
      </SidebarContent>
      <div className="flex md:hidden items-center p-2 [&>button]:w-full! justify-center gap-2 divide-accent-foreground border-t border-s-gray-200">
        <UserMenu />
      </div>
    </Sidebar>
  );
};
