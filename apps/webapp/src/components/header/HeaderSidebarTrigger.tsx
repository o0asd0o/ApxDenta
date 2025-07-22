import { cn } from '@/lib/utils';
import { Button, useSidebar } from '@repo/ui/components';
import { MenuIcon } from 'lucide-react';
import type React from 'react';

export const HeaderSidebarTrigger: React.FC = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="outline"
      className={cn('size-9 p-2 ml-auto flex md:hidden')}
      onClick={toggleSidebar}
    >
      <MenuIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};
