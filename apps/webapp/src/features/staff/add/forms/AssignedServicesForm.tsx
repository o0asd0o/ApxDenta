import { CollapsibeSelection } from '@/components/CollapsibeSelection';
import { useTRPC } from '@/lib/trpc';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
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
  const trpc = useTRPC();
  const { data: allTreatments } = useQuery(
    trpc.treatments.getAllTreatments.queryOptions(),
  );

  const { medical, cosmetics } = useMemo(() => {
    const list = allTreatments?.data || [];
    return {
      medical: list.filter((item) => item.category === 'MEDICAL_SERVICE'),
      cosmetics: list.filter((item) => item.category === 'COSMETIC_SERVICE'),
    };
  }, [allTreatments]);

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
                items={cosmetics.map((item) => ({
                  name: item.id,
                  description: item.name,
                }))}
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
                items={medical.map((item) => ({
                  name: item.id,
                  description: item.name,
                }))}
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
