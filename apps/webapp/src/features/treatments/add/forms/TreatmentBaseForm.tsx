import Tooth from '@/assets/tooth';
import MedicalComponentSeeder from '@/components/@seeders/MedicalComponentSeeder';
import NumberButtonInput from '@/components/NumberButtonInput';
import { useCurrentIndexAction } from '@/components/dialog/stacked/StackProvider';
import { cn } from '@/lib/utils';
import type { TreatmentFormType } from '@repo/schemas';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
  Textarea,
} from '@repo/ui/components';
import { Plus, Trash2, Wrench } from 'lucide-react';
import React from 'react';
import { type UseFormReturn, useFieldArray } from 'react-hook-form';
import EstimatedHoursField from '../../components/EstimatedHoursField';
import FreeDiscount from '../../components/FreeDiscount';
import MedicalComponentSelector from '../../components/MedicalComponentSelector';
import MultipleVisitTrigger from '../../components/MultipleVisitTrigger';

type Props = {
  form: UseFormReturn<TreatmentFormType>;
};
const TreatmentBaseForm: React.FC<Props> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'components',
  });

  console.log('ERRORS!!', {
    errors: form.formState.errors,
  });

  const category = form.watch('category');

  const setCurrentIndex = useCurrentIndexAction('increment');

  return (
    <div className="flex divide-y divide-gray-200 flex-col gap-4">
      <div className="pb-4">
        <h2 className="font-medium mb-3">Basic info</h2>
        <div className="flex gap-5 flex-col">
          <FormField
            control={form.control}
            name="treatmentName"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Treatment name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter treatment name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Treatment Category</FormLabel>
                <FormControl>
                  <RadioCardGroup
                    className="grid-cols-2 text-sm"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <RadioCardItem value="MEDICAL">
                      <div className="flex items-center gap-3">
                        <RadioCardIndicator />
                        <span className="inline-block xs:hidden text-[0.8125rem]">
                          Medical
                        </span>
                        <span className="hidden xs:inline-block">
                          Medical Service
                        </span>
                      </div>
                    </RadioCardItem>
                    <RadioCardItem value="COSMETIC">
                      <div className="flex items-center gap-3">
                        <RadioCardIndicator />
                        <span className="inline-block xs:hidden text-[0.8125rem]">
                          Cosmetic
                        </span>
                        <span className="hidden xs:inline-block">
                          Cosmetic Service
                        </span>
                      </div>
                    </RadioCardItem>
                  </RadioCardGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="relative">
                  Treatment Description
                  <span className="absolute right-0 top-0 text-xs text-gray-500">
                    {field.value?.length || 0}/300
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    rows={4}
                    {...field}
                    onChange={(e) => {
                      if (e.target.value.length > 300) {
                        e.target.value = e.target.value.slice(0, 300);
                      }
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <MultipleVisitTrigger
            form={form}
            onClick={() => setCurrentIndex(1)}
          />
        </div>
      </div>
      {!!category && (
        <div className="flex flex-col gap-4 divide-y divide-gray-200">
          <div className="pb-4">
            <h2 className="font-medium mb-3">Price & Duration</h2>
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 w-full md:w-4/5 flex-col xs:flex-row">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>Treatment Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          suffix={
                            <span className="text-gray-500 text-sm">/jaw</span>
                          }
                          type="text"
                          inputMode="numeric"
                          icon={
                            <span className="text-gray-500 text-xl">₱</span>
                          }
                          value={
                            field.value
                              ? field.value.toLocaleString('en-US')
                              : ''
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
          {fields.length > 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex gap-2">
                <div className=" relative size-10 p-2 bg-accent rounded-sm text-gray-500">
                  <Tooth />
                  <Wrench
                    strokeWidth={2.5}
                    className="absolute size-3.5 p-[1px] bottom-[7px] right-[5px] transform scale-x-[-1] bg-accent rounded-full"
                  />
                </div>

                <div className="flex flex-col">
                  <h3 className="text-black text-base font-medium">
                    Components used <MedicalComponentSeeder />
                  </h3>
                  <span className="text-gray-500 text-xs">
                    Every part/component used for patient&apos;s treatment
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex gap-3 items-center border-b border-accent pb-4"
                  >
                    <div className="flex gap-3 flex-col w-full">
                      <div className="flex justify-between gap-3 xs:flex-row flex-col w-full">
                        <div className="flex flex-col gap-3 w-full">
                          <FormField
                            control={form.control}
                            name={`components.${index}.id`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormControl>
                                  <MedicalComponentSelector
                                    value={field.value as string}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex gap-3 items-center">
                          <FormField
                            control={form.control}
                            name={`components.${index}.quantity`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col w-full">
                                <FormControl>
                                  <NumberButtonInput
                                    value={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            className={cn(
                              'size-8 p-1.5 hover:bg-red-50 hidden xs:inline-flex',
                              fields.length === 1 && 'invisible',
                            )}
                            aria-label="Remove component"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="text-red-600" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name={`components.${index}.free`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <FreeDiscount
                                  value={{
                                    type: field.value
                                      ? 'TOTALLY_FREE'
                                      : 'FREE_UP_TO',
                                    amount: 0, // field.value,
                                  }}
                                  onChange={(value) => {
                                    field.onChange(
                                      value.type === 'TOTALLY_FREE',
                                    );
                                    form.setValue(
                                      `components.${index}.freeUpTo`,
                                      value.amount || 0,
                                    );
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex xs:hidden">
                      <Button
                        type="button"
                        variant="ghost"
                        className={cn(
                          'size-8 p-1.5 hover:bg-red-50',
                          fields.length === 1 && 'invisible',
                        )}
                        aria-label="Remove component"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div>
                  <Button
                    variant="outline"
                    className="gap-2 border-dashed w-full"
                    type="button"
                    onClick={() =>
                      append({ id: '', quantity: 1, free: false, freeUpTo: 0 })
                    }
                  >
                    <Plus className="size-4" />
                    Add Component
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TreatmentBaseForm;
