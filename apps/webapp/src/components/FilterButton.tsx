import { cn } from '@/lib/utils';
import { Button } from '@repo/ui/components';
import { ListFilterIcon } from 'lucide-react';
import React from 'react';

type Props = {
  onClick: () => void;
  hasFilters?: boolean;
  className?: string;
};

const FilterButton: React.FC<Props> = ({ onClick, hasFilters, className }) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn(className, 'h-[38px]')}
    >
      <div className="relative inline-flex sm:mr-1.5">
        <ListFilterIcon className="size-4.5 sm:size-3" />
        {hasFilters && (
          <span className="right-[-3px] top-[-3px] absolute rounded-full size-[10px] bg-[#61B0FF] border-2 border-white" />
        )}
      </div>
      <span className="hidden sm:inline">Filter</span>
    </Button>
  );
};

export default FilterButton;
