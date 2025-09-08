import { DaySchedule } from '@/components/DaySchedule';
import type { WorkingHoursFormType } from '@repo/schemas';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@repo/ui/components';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';

export type WorkingHoursDays = keyof WorkingHoursFormType;

type Props = {
  form: UseFormReturn<WorkingHoursFormType>;
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
              const defaultValue = form.formState.defaultValues?.[item];
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
                      onToggle={(checked) => {
                        field.onChange(
                          checked
                            ? {
                                startTime: defaultValue?.startTime,
                                endTime: defaultValue?.endTime,
                              }
                            : undefined,
                        );
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
