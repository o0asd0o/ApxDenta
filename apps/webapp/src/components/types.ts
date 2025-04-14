import type { FileRoutesByTo } from '@/routeTree.gen';
import type { LucideProps } from 'lucide-react';
import type React from 'react';

export type TRoutes = keyof FileRoutesByTo;

export type MenuBase = {
  icon: React.FC<LucideProps>;
  path: TRoutes;
};

export type MenuItem = Partial<MenuBase> & {
  title: string;
  subMenu?: (MenuItem & MenuBase)[];
};
