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
                <FormItem className="flex flex-col">
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
                        if (checked) {
                          // Only set value if we have valid defaults, otherwise leave as undefined
                          // The value will be set when user picks actual times
                          if (
                            defaultValue?.startTime &&
                            defaultValue?.endTime
                          ) {
                            field.onChange({
                              startTime: defaultValue.startTime,
                              endTime: defaultValue.endTime,
                            });
                          }
                        } else {
                          field.onChange(undefined);
                        }
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
