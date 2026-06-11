import { Combobox } from '@/components/Combobox';
import React from 'react';
import type { TreatmentOption } from '../../components/__types';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  treatments: TreatmentOption[];
  placeholder?: string;
};

const formatDuration = (duration: number) => {
  return duration % 60 === 0
    ? `${duration / 60} hour(s)`
    : `${duration / 60} hour(s)`;
};

const TreatmentInput: React.FC<Props> = ({
  value,
  onChange,
  treatments,
  placeholder = 'Select Treatment',
}) => {
  return (
    <Combobox
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      searchPlaceholder="Search treatment..."
      emptyText="No treatment found."
      items={treatments.map((treatment) => ({
        label: (
          <div className="inline-flex w-full items-center justify-between gap-3">
            <span>{treatment.name}</span>
            <span className="text-xs text-gray-400">
              {formatDuration(treatment.duration)}
            </span>
          </div>
        ),
        labelRaw: treatment.name,
        value: treatment.id,
      }))}
    />
  );
};

export default TreatmentInput;
