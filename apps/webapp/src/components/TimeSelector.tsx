import { getTimeIntervalItems } from '@/lib/dates';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components';
import { Clock8 } from 'lucide-react';
import React, { useMemo } from 'react';

const data = getTimeIntervalItems();

type TimeProps = {
  onSelect: (value: number) => void;
  error?: string;
  value?: number;
  disabledGt?: number;
  disabledLt?: number;
  minValue?: number;
  maxValue?: number;
};

const TimeSelector: React.FC<TimeProps> = ({
  onSelect,
  value,
  disabledGt,
  disabledLt,
  minValue,
  maxValue,
  error,
}) => {
  const list = useMemo(() => {
    return data
      .filter((item) =>
        typeof minValue === 'number' ? item.value >= minValue : true,
      )
      .filter((item) =>
        typeof maxValue === 'number' ? item.value <= maxValue : true,
      )
      .filter((item) =>
        typeof disabledGt === 'number' ? item.value < disabledGt : true,
      )
      .filter((item) =>
        typeof disabledLt === 'number' ? item.value > disabledLt : true,
      );
  }, [disabledGt, disabledLt, maxValue, minValue]);

  return (
    <Select
      value={typeof value === 'number' ? String(value) : undefined}
      onValueChange={(v) => onSelect(Number.parseInt(v))}
    >
      <SelectTrigger
        icon={
          <Clock8 className="xs:block hidden opacity-50 size-4 text-[11px] xs:text-xs" />
        }
        className={cn(
          'mb-0 w-[94px] xs:w-[130px] px-1.5 xs:p-2 flex h-[32px] [&>span]:text-[12px] xs:[&>span]:text-[13px]',
          error && 'border-rose-500 focus:border-rose-500',
        )}
      >
        <SelectValue placeholder="Pick time" />
      </SelectTrigger>
      <SelectContent>
        {list.map((item) => (
          <SelectItem key={item.value} value={String(item.value)}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimeSelector;
