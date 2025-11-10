import TreatmentsInput from '@/components/TreatmentsInput';
import type { TreatmentFormType } from '@repo/schemas';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components';
import { ArrowDown, ArrowUp, PlusIcon, X } from 'lucide-react';
import React from 'react';
import { type UseFormReturn, useFieldArray } from 'react-hook-form';
import SingleTreatmentDetails from '../../components/SingleTreatmentDetails';

type Props = {
  form: UseFormReturn<TreatmentFormType>;
};
const MultipleVisitForm: React.FC<Props> = ({ form }) => {
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'visits',
  });

  return (
    <>
      <div className="z-10 flex gap-4 py-4 px-10 justify-between items-center mb-8 fixed w-full bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] translate-x-[-24px] translate-y-[-17px] border-t border-gray-200">
        <h2 className="font-medium">Visitation Settings</h2>
        <Button
          type="button"
          variant="secondary"
          className="h-9"
          onClick={() => append({ treatmentId: null })}
        >
          <PlusIcon className="text-inherit size-5 mr-1" /> Add New Visit
        </Button>
      </div>

      <div className="flex divide-y divide-gray-200 flex-col gap-4 mt-20">
        <div className="pb-4">
          <div className="flex gap-5 flex-col">
            {fields.map((item, index) => (
              <div key={item.id} className="flex gap-3">
                <div className="flex gap-2 flex-col">
                  <Button
                    onClick={() => move(index, index - 1)}
                    disabled={index === 0}
                    type="button"
                    variant="secondary"
                    className="border-primary rounded-full h-8 w-8 p-0 flex items-center justify-center disabled:bg-gray-200 disabled:text-white disabled:border-none"
                  >
                    <ArrowUp className="size-4" />
                  </Button>
                  <Button
                    onClick={() => move(index, index + 1)}
                    disabled={index === fields.length - 1}
                    type="button"
                    variant="secondary"
                    className="border-primary rounded-full h-8 w-8 p-0 flex items-center justify-center disabled:bg-gray-200 disabled:text-white disabled:border-none"
                  >
                    <ArrowDown className="size-4" />
                  </Button>
                </div>
                <div className="rounded-lg flex-1 border border-gray-200 overflow-hidden">
                  <div className="w-full p-3 bg-accent border-b border-gray-200 relative">
                    <h2 className="font-medium">Visit #{index + 1}</h2>
                    {index !== 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute right-3 top-2.5 text-gray-400 p-1 hover:bg-gray-200 rounded-full"
                        onClick={() => remove(index)}
                      >
                        <X className="size-4.5" />
                      </Button>
                    )}
                  </div>
                  <div className="py-3 px-4">
                    <FormField
                      control={form.control}
                      name={`visits.${index}.treatmentId`}
                      render={({ field }) => (
                        <div className="flex flex-col gap-5">
                          <FormItem className="flex flex-col">
                            <FormLabel>Treatment</FormLabel>
                            <FormControl>
                              <TreatmentsInput
                                type="SINGLE_VISIT"
                                key={field.name}
                                onChange={field.onChange}
                                value={field.value || ''}
                                placeholder="Select treatment..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                          {field.value && (
                            <SingleTreatmentDetails
                              treatmentId={(field.value || '').split('--')[0]}
                            />
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MultipleVisitForm;
