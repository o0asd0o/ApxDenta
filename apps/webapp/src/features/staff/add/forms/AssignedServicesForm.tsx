import {
  CollapsibeSelection,
  TEMP_ITEMS,
} from '@/components/CollapsibeSelection';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@repo/ui/components';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const assignedServicesSchema = z.object({
  cosmeticServices: z
    .array(z.string())
    .min(1, 'Should be selecting at least 1 cosmetic service')
    .default([]),
  treatmentService: z
    .array(z.string())
    .min(1, 'Should be selecting at least 1 treatment service')
    .default([]),
});

type Props = {
  form: UseFormReturn<z.infer<typeof assignedServicesSchema>>;
};

export const AssignedServicesForm: React.FC<Props> = ({ form }) => {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="cosmeticServices"
        render={({ field }) => (
          <FormItem className="space-y-1 flex flex-col">
            <FormControl>
              <CollapsibeSelection
                name={field.name}
                label="Costmetic Service"
                items={TEMP_ITEMS}
                onSelect={(name, selected) => {
                  const currentSelections = (field.value || []).slice(0);
                  const newSelections = selected
                    ? [...currentSelections, name]
                    : currentSelections.filter((item) => item !== name);

                  field.onChange(newSelections);
                }}
                selections={field.value || []}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="treatmentService"
        render={({ field }) => (
          <FormItem className="space-y-1 flex flex-col">
            <FormControl>
              <CollapsibeSelection
                name={field.name}
                label="Treatment Service"
                items={TEMP_ITEMS}
                onSelect={(name, selected) => {
                  const currentSelections = (field.value || []).slice(0);
                  const newSelections = selected
                    ? [...currentSelections, name]
                    : currentSelections.filter((item) => item !== name);

                  field.onChange(newSelections);
                }}
                selections={field.value || []}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
