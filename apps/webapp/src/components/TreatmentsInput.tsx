import { useTRPC } from '@/lib/trpc';
import type { TreatmentVisitType } from '@repo/domain/db';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Combobox } from './Combobox';

type Props = {
  onChange: (value: any) => void;
  value: string;
  placeholder?: string;
  type?: TreatmentVisitType;
};

const TreatmentsInput: React.FC<Props> = (props) => {
  const trpc = useTRPC();
  const { data: treatments } = useQuery(
    trpc.treatments.getAllTreatments.queryOptions({
      status: 'ACTIVE',
      type: props.type,
    }),
  );

  return (
    <Combobox
      {...props}
      items={(treatments?.data || []).map((item) => ({
        label: (
          <div className="inline-flex gap-2 items-center">
            <span>{item.name}</span>
            <span className="text-gray-400 text-xs">{item.duration}hrs</span>
          </div>
        ),
        value: `${item.id}--${item.name}`,
      }))}
      placeholder={props.placeholder || 'Select item'}
    />
  );
};

export default TreatmentsInput;
