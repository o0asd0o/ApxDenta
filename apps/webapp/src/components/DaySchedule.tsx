import type { WorkingHoursDays } from '@/features/staff/add/forms/WorkingHoursForm';
import { getTimeIntervalItems } from '@/lib/dates';
import { cn } from '@/lib/utils';
import type { workingHoursSchema } from '@repo/schemas';
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  useFormField,
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
  onToggle: (checked: boolean) => void;
};
export const DaySchedule: React.FC<Props> = ({
  name,
  label,
  schedule,
  onChange,
  onToggle,
  form,
}) => {
  const [checked, setChecked] = useState<boolean>(
    !!schedule.from || !!schedule.to,
  );

  const { error: err } = useFormField();

  const error = err as unknown as
    | { startTime: { message: string }; endTime: { message: string } }
    | undefined;

  const start = form.watch(`${name}.startTime`);
  const end = form.watch(`${name}.endTime`);

  return (
    <div className="flex items-center gap-4 not-[:last-child]:border-b border-border py-4">
      <div className="flex items-center gap-2 w-[120px]">
        <Switch
          id={name}
          checked={checked}
          onCheckedChange={(checked) => {
            setChecked(checked);
            onToggle(checked);
          }}
        />
        <Label htmlFor={name}>{label}</Label>
      </div>
      {checked && (
        <div className="ml-auto flex items-center gap-2 h-[38px]">
          <TimeSelector
            error={
              typeof error?.startTime?.message === 'string'
                ? error?.startTime?.message
                : undefined
            }
            value={schedule.from}
            onSelect={(value) => onChange(value, 'from')}
            disabledGt={end}
          />
          <span className="text-xs xs:text-sm text-gray-500 ">to</span>
          <TimeSelector
            error={
              typeof error?.endTime?.message === 'string'
                ? error?.endTime?.message
                : undefined
            }
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
  error?: string;
  value?: number;
  disabledGt?: number;
  disabledLt?: number;
};
const TimeSelector: React.FC<TimeProps> = ({
  onSelect,
  value,
  disabledGt,
  disabledLt,
  error,
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
        icon={
          <Clock8 className="xs:block hidden opacity-50 size-4 text-[11px] xs:text-xs" />
        }
        className={cn(
          'w-[94px] xs:w-[130px] px-1.5 xs:p-2 flex h-[32px] [&>span]:text-[12px] xs:[&>span]:text-[13px]',
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
