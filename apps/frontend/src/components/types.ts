import type { FileRoutesByTo } from '@/routeTree.gen';
import type React from 'react';

export type TRoutes = keyof FileRoutesByTo;

export type MenuBase = {
  icon: React.JSX.Element;
  path: TRoutes;
};

export type MenuItem = Partial<MenuBase> & {
  title: string;
  subMenu?: (MenuItem & MenuBase)[];
};
