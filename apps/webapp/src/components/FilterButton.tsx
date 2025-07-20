import { Button } from '@repo/ui/components';
import { ListFilterIcon } from 'lucide-react';
import React from 'react';

type Props = {
  onClick: () => void;
  hasFilters?: boolean;
};

const FilterButton: React.FC<Props> = ({ onClick, hasFilters }) => {
  return (
    <Button variant="outline" onClick={onClick}>
      <div className="relative inline-flex mr-1.5">
        <ListFilterIcon className="size-3" />
        {hasFilters && (
          <span className="right-[-3px] top-[-3px] absolute rounded-full size-[10px] bg-[#61B0FF] border-2 border-white" />
        )}
      </div>
      Filter
    </Button>
  );
};

export default FilterButton;
