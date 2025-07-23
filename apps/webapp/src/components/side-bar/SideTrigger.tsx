import { cn } from '@/lib/utils';
import { SidebarTrigger, useSidebar } from '@repo/ui/components';
import type React from 'react';

export const SideTrigger: React.FC = () => {
  const { open, openMobile } = useSidebar();

  const closed = !(open || openMobile);

  return (
    <SidebarTrigger
      className={cn(
        'absolute right-[-14px] top-[23px] rounded-full border border-border bg-white ',
        closed && 'rotate-180',
      )}
    />
  );
};
