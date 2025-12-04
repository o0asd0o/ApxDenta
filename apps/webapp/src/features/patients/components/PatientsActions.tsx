import type { PaginationState } from '@/components/__types';
import { Button } from '@repo/ui/components';
import { Grid3X3, List } from 'lucide-react';
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
      <Button
        onClick={() => {
          setLayoutTab('list');
          setPagination((prev) => ({ ...prev, current: 1 }));
        }}
        variant={layoutTab === 'list' ? 'primary' : 'outline'}
        className="h-9 w-9 p-0"
      >
        <List className="size-4" />
      </Button>
      <Button
        onClick={() => {
          setLayoutTab('card');
          setPagination((prev) => ({ ...prev, current: 1 }));
        }}
        variant={layoutTab === 'card' ? 'primary' : 'outline'}
        className="h-9 w-9 p-0 ml-1"
      >
        <Grid3X3 className="size-4" />
      </Button>
    </div>
  );
};

export default PatientsActions;
