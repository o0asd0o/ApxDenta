import Tooth from '@/assets/tooth';
import { useTRPC } from '@/lib/trpc';
import { FormLabel, Textarea } from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';
import { noop } from 'lodash';
import { Wrench } from 'lucide-react';
import React from 'react';
import EstimatedHoursField from './EstimatedHoursField';

type Props = {
  treatmentId?: string | null;
};
const SingleTreatmentDetails: React.FC<Props> = ({ treatmentId }) => {
  const trpc = useTRPC();
  console.log({ treatmentId });
  const { data: treatment } = useQuery({
    ...trpc.treatments.getTreatment.queryOptions({ id: treatmentId as string }),
    enabled: Boolean(treatmentId),
  });

  const len = treatment?.data.description.length;

  return (
    <div className="flex flex-col gap-5">
      <EstimatedHoursField
        value={treatment?.data.duration as number}
        onChange={noop}
        disabled
      />
      <div className="flex flex-col gap-2">
        <FormLabel className="relative">
          Treatment Description
          <span className="absolute right-0 top-0 text-xs text-gray-500">
            {len || 0}/300
          </span>
        </FormLabel>
        <Textarea
          disabled
          value={treatment?.data.description}
          placeholder="Description"
          className="disabled:text-gray-400"
        />
      </div>
      <div className="flex gap-1 bg-accent rounded-sm px-1 py-2">
        <div className=" relative size-10 p-2 text-gray-500">
          <Tooth />
          <Wrench
            strokeWidth={2.5}
            className="absolute size-3.5 p-[1px] bottom-[7px] right-[5px] transform scale-x-[-1] bg-accent rounded-full"
          />
        </div>

        <div className="flex flex-col">
          <h3 className="text-black text-base font-medium">
            <span className="text-xl">
              {treatment?.data.components.length || 0}
            </span>{' '}
            components
          </h3>
          <span className="text-gray-500 text-xs">
            {(treatment?.data.components || []).length === 0 &&
              'No components to be displayed.'}
            {(treatment?.data.components || []).map((component) => (
              <span key={component.id} className="inline-block mr-1">
                {component.medicalComponent?.name || 'n/a'}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleTreatmentDetails;
