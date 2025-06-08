import type {
  WorkingHoursDays,
  workingHoursSchema,
} from '@/features/staff/add/forms/WorkingHoursForm';
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
import React, { useMemo, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';

type Props = {
  form: UseFormReturn<z.infer<typeof workingHoursSchema>>;
  name: WorkingHoursDays;
  label: string | React.JSX.Element;

  schedule: { to?: number; from?: number };
  onChange: (value: number, what: 'to' | 'from') => void;
};
export const DaySchedule: React.FC<Props> = ({
  name,
  label,
  schedule,
  onChange,
  form,
}) => {
  const [checked, setChecked] = useState<boolean>(
    !!schedule.from || !!schedule.to,
  );

  const start = form.watch(`${name}.startTime`);
  const end = form.watch(`${name}.endTime`);

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
            disabledGt={end}
          />
          <span className="text-sm text-gray-500">to</span>
          <TimeSelector
            value={schedule.to}
            onSelect={(value) => onChange(value, 'to')}
            disabledLt={start}
          />
        </div>
      )}
      {!checked && (
        <div className="ml-2 text-sm h-[38px] flex items-center text-gray-500">
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
  disabledGt?: number;
  disabledLt?: number;
};
const TimeSelector: React.FC<TimeProps> = ({
  onSelect,
  value,
  disabledGt,
  disabledLt,
}) => {
  const list = useMemo(() => {
    return data
      .filter((item) => (disabledGt ? item.value < disabledGt : true))
      .filter((item) => (disabledLt ? item.value > disabledLt : true));
  }, [disabledGt, disabledLt]);

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
        {list.map((item) => (
          <SelectItem key={item.value} value={String(item.value)}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
