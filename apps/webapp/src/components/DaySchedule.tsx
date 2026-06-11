import type { WorkingHoursDays } from '@/features/staff/add/forms/WorkingHoursForm';
import type { workingHoursSchema } from '@repo/schemas';
import { Label, Switch, useFormField } from '@repo/ui/components';
import React, { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';
import TimeSelector from './TimeSelector';

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
