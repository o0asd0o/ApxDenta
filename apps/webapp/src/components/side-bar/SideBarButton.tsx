import { SidebarMenuButton, useSidebar } from '@repo/ui/components';
import { Link } from '@tanstack/react-router';
import type React from 'react';
import type { MenuBase, MenuItem } from '../__types';

type Props = {
  item: (MenuItem & MenuBase) | MenuItem;
  pathname: string;
  onClick?: () => void;
};
export const SideBarButton: React.FC<Props> = ({ item, pathname, onClick }) => {
  const { state } = useSidebar();
  const _item = item as MenuItem & MenuBase;
  return (
    <SidebarMenuButton
      asChild
      className="text-[14px]"
      isActive={item.path === pathname}
      tooltip={state === 'collapsed' ? item.title : undefined}
      onClick={onClick}
    >
      <Link to={_item.path}>
        <_item.icon className="size-10" />
        <span>{_item.title}</span>
      </Link>
    </SidebarMenuButton>
  );
};
