import {
  organization,
  useActiveOrganization,
  useListOrganizations,
} from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { useSidebar } from '@repo/ui/components';
import type React from 'react';

type Props = {
  name: string;
  slogan: string;
};

export const CompanySection: React.FC<Props> = () => {
  const { state, isMobile } = useSidebar();
  const { data: activeOrg } = useActiveOrganization();
  const { data: organizations } = useListOrganizations();

  console.log({ activeOrg, organizations });

  const create = () => {
    // Uncomment to create a new organization
    organization.create({
      name: 'Avicena Clinic',
      slug: 'avicena-clinic',
      logo: '/images/avicena-logo.png',
    });
    console.log('Create organization');
  };

  return (
    <div className={cn(state === 'collapsed' && 'ml-1')}>
      <div
        className={cn(
          'gap-2 px-2 py-1.5 items-center border border-solid border-border rounded-md overflow-hidden relative grid grid-cols-[20px_auto]',
          state === 'collapsed' && !isMobile && 'max-w-10',
        )}
      >
        <div className="size-5! bg-gray-300 rounded-full" />
        {(state === 'expanded' || isMobile) && (
          <div className="flex flex-col">
            <span className="text-xs font-medium whitespace-nowrap">
              Avicena Clinic
            </span>
            <span className="text-[11px] text-muted-foreground whitespace-nowrap">
              845 Euclid Avenue, CA
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
