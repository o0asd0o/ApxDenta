import { useTRPC } from '@/lib/trpc';
import type { TreatmentFormType } from '@repo/schemas';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';
import { noop } from 'lodash';
import { InfoIcon } from 'lucide-react';
import React, { useMemo } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import EstimatedHoursField from './EstimatedHoursField';

type Props = {
  form: UseFormReturn<TreatmentFormType>;
};

const PriceAndDuration: React.FC<Props> = ({ form }) => {
  const trpc = useTRPC();
  const visits = form.watch('visits');

  const isMulitVisit = (visits?.length || 0) > 0;
  const { data: configuredVisitTreaments } = useQuery({
    ...trpc.treatments.getAllTreatments.queryOptions({
      status: 'ACTIVE',
      treatmentIdIn: visits
        ?.map((item) => item.treatmentId?.split('--')[0])
        .filter(Boolean) as string[],
    }),
    enabled: isMulitVisit,
  });

  const { price, duration } = useMemo(() => {
    const treatments = configuredVisitTreaments?.data || [];

    if (treatments.length === 0) {
      return { price: undefined, duration: undefined };
    }

    const totalPrice = treatments.reduce(
      (acc, curr) => acc + (curr.pricePerDuration || 0) * (curr.duration || 0),
      0,
    );

    const totalDuration = treatments.reduce(
      (acc, curr) => acc + (curr.duration || 0),
      0,
    );

    return {
      price: Number.parseFloat(totalPrice.toFixed(2)),
      duration: totalDuration,
    };
  }, [configuredVisitTreaments]);

  if (isMulitVisit) {
    return (
      <div className="pb-4">
        <h2 className="font-medium mb-3">Price & Duration</h2>
        <div className="flex flex-col gap-5">
          <div className="flex gap-4 w-full md:w-4/5 flex-col xs:flex-row">
            <FormItem className="flex flex-col w-full">
              <FormLabel>Treatment Price</FormLabel>
              <FormControl>
                <Input
                  disabled
                  type="text"
                  inputMode="numeric"
                  icon={<span className="text-gray-500 text-xl">₱</span>}
                  value={price}
                />
              </FormControl>
              <FormDescription className="flex items-center">
                <InfoIcon className="inline mr-1 size-3.5" />
                <span className="whitespace-nowrap">
                  Price for all treatment visits
                </span>
              </FormDescription>
            </FormItem>
            <EstimatedHoursField
              onChange={noop}
              value={duration}
              showDescription={isMulitVisit}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-4">
      <h2 className="font-medium mb-3">Price & Duration</h2>
      <div className="flex flex-col gap-5">
        <div className="flex gap-4 w-full md:w-4/5 flex-col xs:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Treatment Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    suffix={<span className="text-gray-500 text-sm">/jaw</span>}
                    type="text"
                    inputMode="numeric"
                    icon={<span className="text-gray-500 text-xl">₱</span>}
                    value={
                      field.value ? field.value.toLocaleString('en-US') : ''
                    }
                    onChange={(e) => {
                      const value = e.target.value.replace(/,/g, '');
                      const numValue = Number.parseFloat(value);
                      field.onChange(
                        Number.isNaN(numValue) ? undefined : numValue,
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => <EstimatedHoursField {...field} />}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceAndDuration;
