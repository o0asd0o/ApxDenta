import { DaySchedule } from '@/components/DaySchedule';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@repo/ui/components';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const interval = z
  .object({ startTime: z.number(), endTime: z.number() })
  .optional();

export const workingHoursSchema = z.object({
  monday: interval,
  tuesday: interval,
  wednesday: interval,
  thursday: interval,
  friday: interval,
  saturday: interval,
  sunday: interval,
});

export type WorkingHoursType = z.infer<typeof workingHoursSchema>;
export type WorkingHoursDays = keyof WorkingHoursType;
type Props = {
  form: UseFormReturn<z.infer<typeof workingHoursSchema>>;
};

const DAYS_OF_THE_WEEK: WorkingHoursDays[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];
export const WorkingHoursForm: React.FC<Props> = ({ form }) => {
  return (
    <div className="flex flex-col">
      {DAYS_OF_THE_WEEK.map((item) => {
        return (
          <FormField
            key={item}
            control={form.control}
            name={item}
            render={({ field }) => {
              return (
                <FormItem className="space-y-1 flex flex-col">
                  <FormControl>
                    <DaySchedule
                      form={form}
                      label={<span className="capitalize">{item}</span>}
                      name={field.name}
                      schedule={{
                        from: field.value?.startTime,
                        to: field.value?.endTime,
                      }}
                      onChange={(selected, what) => {
                        if (what === 'from') {
                          field.onChange({
                            ...field.value,
                            startTime: selected,
                          });
                        }
                        if (what === 'to') {
                          field.onChange({
                            ...field.value,
                            endTime: selected,
                          });
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        );
      })}
    </div>
  );
};
