import { cn } from '@/lib/utils';
import { useSidebar } from '@repo/ui/components';
import type React from 'react';

export const SideBarLogo: React.FC = () => {
  const { state, isMobile } = useSidebar();
  return (
    <div
      className={cn(
        'flex gap-2 pt-2 pb-2 ml-1 transition duration-200 ease-in-out',
        state === 'collapsed' && !isMobile && 'translate-x-1',
      )}
    >
      <img className="size-6" src="/images/apxdenta-logo.png" alt="logo" />
      {(state === 'expanded' || isMobile) && (
        <h2 className="text-md font-medium text-black">
          <span className="text-primary font-bold">Apx</span>Denta
        </h2>
      )}
    </div>
  );
};
