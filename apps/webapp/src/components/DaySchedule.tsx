import { getTimeIntervalItems } from '@/lib/dates';
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from '@repo/ui/components';
import { Clock8 } from 'lucide-react';
import React, { useState } from 'react';

type Props = {
  name: string;
  label: string | React.JSX.Element;

  schedule: { to?: number; from?: number };
  onChange: (value: number, what: 'to' | 'from') => void;
};
export const DaySchedule: React.FC<Props> = ({
  name,
  label,
  schedule,
  onChange,
}) => {
  const [checked, setChecked] = useState<boolean>(
    !!schedule.from || !!schedule.to,
  );

  return (
    <div className="flex items-center gap-4 not-[:last-child]:border-b border-border py-4">
      <div className="flex items-center gap-2 w-[120px]">
        <Switch
          id={name}
          checked={checked}
          onCheckedChange={(checked) => setChecked(checked)}
        />
        <Label htmlFor={name}>{label}</Label>
      </div>
      {checked && (
        <div className="ml-auto flex items-center gap-2 h-[38px]">
          <TimeSelector
            value={schedule.from}
            onSelect={(value) => onChange(value, 'from')}
          />
          <span className="text-sm text-gray-500">to</span>
          <TimeSelector
            value={schedule.to}
            onSelect={(value) => onChange(value, 'to')}
          />
        </div>
      )}
      {!checked && (
        <div className="ml-[30px] text-xs h-[38px] flex items-center text-gray-500">
          Not working on this day
        </div>
      )}
    </div>
  );
};

const data = getTimeIntervalItems();

type TimeProps = {
  onSelect: (value: number) => void;
  value?: number;
};
const TimeSelector: React.FC<TimeProps> = ({ onSelect, value }) => {
  return (
    <Select
      value={value ? String(value) : undefined}
      onValueChange={(v) => onSelect(Number.parseInt(v))}
    >
      <SelectTrigger
        icon={<Clock8 className="opacity-50 size-4 text-xs" />}
        className="w-[140px] flex h-[32px] [&>span]:text-[13px]"
      >
        <SelectValue placeholder="Pick time" />
      </SelectTrigger>
      <SelectContent>
        {data.map((item) => (
          <SelectItem key={item.value} value={String(item.value)}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
