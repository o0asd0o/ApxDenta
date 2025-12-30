import PillTabs from '@/components/PillTabs';
import type { PaginationState } from '@/components/__types';
import { cn } from '@/lib/utils';
import { LayoutGrid, ListIcon } from 'lucide-react';
import type React from 'react';
import CreatePatient from '../add/CreatePatient';
import { CreatePatientProvider } from '../add/context/CreatePatientProvider';

type Props = {
  className?: string;
  layoutTab: 'card' | 'list';
  setLayoutTab: (value: 'card' | 'list') => void;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  isActive?: boolean;
};

const PatientsActions: React.FC<Props> = ({
  className,
  layoutTab,
  setLayoutTab,
  setPagination,
  isActive = true,
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
      {isActive && (
        <CreatePatientProvider>
          <CreatePatient />
        </CreatePatientProvider>
      )}
    </div>
  );
};

export default PatientsActions;
