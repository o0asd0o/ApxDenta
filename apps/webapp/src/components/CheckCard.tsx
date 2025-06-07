import { cn } from '@/lib/utils';
import { Checkbox, Label } from '@repo/ui/components';
import { RefreshCw } from 'lucide-react';
import React from 'react';

type Props = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};
const CheckCard: React.FC<Props> = ({ checked, onCheckedChange }) => {
  return (
    <Label
      key={'check-card'}
      htmlFor={'check-card'}
      className={cn(
        'flex items-center ring ring-gray-200 gap-2 py-2 px-3  cursor-pointer font-medium rounded-lg',
        checked && 'ring-[var(--primary)]',
      )}
    >
      <div className="flex gap-3 items-center">
        <Checkbox
          id={'check-card'}
          checked={checked}
          onCheckedChange={onCheckedChange}
          className="size-4"
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm">Eid Mubarak</span>
          <span className="text-xs text-gray-400">
            23 Jun 2022 - 22 Nov 2022
          </span>
        </div>
      </div>
      <div className="flex gap-2 ml-auto">
        <RefreshCw className="size-4" />
        Repeat yearly
      </div>
    </Label>
  );
};

export default CheckCard;
