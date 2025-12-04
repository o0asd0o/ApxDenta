import PillTabs from '@/components/PillTabs';
import type { PaginationState } from '@/components/__types';
import { LayoutGrid, ListIcon } from 'lucide-react';
import type React from 'react';

type Props = {
  className?: string;
  layoutTab: 'card' | 'list';
  setLayoutTab: (value: 'card' | 'list') => void;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
};

const PatientsActions: React.FC<Props> = ({
  className,
  layoutTab,
  setLayoutTab,
  setPagination,
}) => {
  return (
    <div className={className}>
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
    </div>
  );
};

export default PatientsActions;
