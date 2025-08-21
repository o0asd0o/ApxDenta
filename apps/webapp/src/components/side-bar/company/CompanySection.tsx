import { useActiveOrganization, useListOrganizations } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useSidebar,
} from '@repo/ui/components';
import { InfoIcon } from 'lucide-react';
import React, { useState } from 'react';
import { CreateCompanyModal } from './CreateCompanyModal';

type Props = {
  name: string;
  slogan: string;
};

export const CompanySection: React.FC<Props> = () => {
  const { state, isMobile } = useSidebar();
  const { data: _activeOrg, isPending } = useActiveOrganization();
  const { data: _organizations } = useListOrganizations();

  const [showCreateOrgModal, setShowCreateOrgModal] = useState(false);

  const activeOrg = _activeOrg as typeof _activeOrg & {
    address: string;
    slogan: string;
  };

  if (!activeOrg && !isPending) {
    return (
      <div className={cn(state === 'collapsed' && 'ml-1')}>
        <CreateCompanyModal
          open={showCreateOrgModal}
          onOpenChange={setShowCreateOrgModal}
        />
        <button
          type="button"
          onClick={() => setShowCreateOrgModal(true)}
          className={cn(
            'w-full gap-2 px-2 py-1.5 items-center border border-red-500 border-solid rounded-md overflow-hidden relative grid grid-cols-[20px_auto_20px]',
            state === 'collapsed' && !isMobile && 'max-w-10',
          )}
        >
          <div className="size-5! bg-gray-200 rounded-full" />
          {(state === 'expanded' || isMobile) && (
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-medium whitespace-nowrap">
                No created organization
              </span>
              <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                click to create
              </span>
            </div>
          )}
          <div className="ml-auto">
            <Tooltip>
              <TooltipTrigger
                asChild
                className="bg-transparent text-primary text-xs font-bold"
              >
                <InfoIcon className="size-4.5 text-red-500" />
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                You need to setup an organization
              </TooltipContent>
            </Tooltip>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className={cn(state === 'collapsed' && 'ml-1')}>
      <div
        className={cn(
          'gap-2 px-2 py-1.5 items-center border border-boirder border-solid rounded-md overflow-hidden relative grid grid-cols-[20px_auto_20px]',
          state === 'collapsed' && !isMobile && 'max-w-10',
        )}
      >
        {isPending && (
          <div className="size-5! rounded-full text-xs bg-gray-200" />
        )}
        {!isPending && (
          <img
            src={activeOrg?.logo as string}
            className="size-5! rounded-full text-xs object-cover"
            alt="logo"
          />
        )}

        {(state === 'expanded' || isMobile) && (
          <div className={cn('flex flex-col', isPending && 'gap-1')}>
            <span className="text-xs font-medium whitespace-nowrap">
              {isPending && <div className="h-4 w-24 rounded bg-gray-200" />}
              {!isPending && <>{activeOrg?.name}</>}
            </span>
            <span className="text-[11px] text-muted-foreground whitespace-nowrap">
              {isPending && <div className="h-3 w-32 rounded bg-gray-200" />}
              {!isPending && <> {activeOrg?.address}</>}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
