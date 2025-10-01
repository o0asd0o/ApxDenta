import PillTabs from '@/components/PillTabs';
import { cn } from '@/lib/utils';
import type { StaffType } from '@repo/domain/db';
import { LayoutGrid, ListIcon } from 'lucide-react';
import React from 'react';
import CreateTreatment from '../add/CreateTreatment';

type Props = {
  staffType: StaffType;
  className?: string;
  layoutTab: 'card' | 'list';
  setLayoutTab: (value: 'card' | 'list') => void;
  setPagination: React.Dispatch<
    React.SetStateAction<{ current: number; pageSize: number }>
  >;
};
const TreatmentActions: React.FC<Props> = ({
  layoutTab,
  setLayoutTab,
  setPagination,
  className,
}) => {
  return (
    <div className={cn('items-center gap-2', className)}>
      <PillTabs
        selectedTab={layoutTab}
        onChangeTab={(value) => {
          setPagination({
            current: 1,
            pageSize: value === 'card' ? 12 : 10,
          });
          setLayoutTab(value);
        }}
        defaultSelectedTab="list"
        tabs={[
          { label: <ListIcon className="size-4" />, value: 'list' },
          { label: <LayoutGrid className="size-4" />, value: 'card' },
        ]}
      />
      <CreateTreatment />
    </div>
  );
};

export default TreatmentActions;
