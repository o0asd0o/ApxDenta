import { cn } from '@/lib/utils';
import { Checkbox, Label } from '@repo/ui/components';
import dayjs from 'dayjs';
import { RefreshCw } from 'lucide-react';
import React from 'react';

type Props = {
  checked: boolean;
  onCheckedChange: (name: string, checked: boolean | 'indeterminate') => void;
  item: {
    id: string;
    name: string;
    from: Date;
    to: Date | null;
    repeat?: boolean | null;
    isDefault?: boolean | null;
  };
};
const DayOffCheckCard: React.FC<Props> = ({
  checked,
  onCheckedChange,
  item,
}) => {
  const fromDate = dayjs(item.from).format('DD MMM YYYY');
  const toDate = dayjs(item.to).format('DD MMM YYYY');
  return (
    <Label
      key={item.id}
      htmlFor={item.id}
      className={cn(
        'flex items-center ring ring-gray-200 gap-2 py-2 px-3  cursor-pointer font-medium rounded-lg',
        checked && 'ring-[var(--primary)]',
      )}
    >
      <div className="flex gap-3 items-center">
        <Checkbox
          id={item.id}
          name={item.id}
          checked={checked}
          onCheckedChange={(checked) => onCheckedChange(item.id, checked)}
          className="size-4"
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm truncate max-w-[150px] xxs:max-w-[100px] xs:max-w-[250px]">
            {item.name}
          </span>
          <span className="text-xs text-gray-400">
            {fromDate === toDate ? `${fromDate}` : `${fromDate} to ${toDate}`}
          </span>
        </div>
      </div>
      {item.repeat && (
        <div className="flex gap-2 ml-auto whitespace-nowrap">
          <RefreshCw className="size-4" />
          Repeat yearly
        </div>
      )}
    </Label>
  );
};

export default DayOffCheckCard;
