import React from 'react';
import type { TreatmentOption } from '../../components/__types';

type Props = {
  treatments: TreatmentOption[];
  onSelect: (treatmentId: string) => void;
};

const formatDuration = (duration: number) => {
  return duration % 60 === 0
    ? `${duration / 60} hour(s)`
    : `${duration / 60} hour(s)`;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

const PopularTreatmentList: React.FC<Props> = ({ treatments, onSelect }) => {
  if (treatments.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium uppercase text-gray-400">
        Popular Treatments
      </p>
      <div className="flex flex-col gap-2">
        {treatments.slice(0, 3).map((treatment) => (
          <button
            key={treatment.id}
            type="button"
            className="flex items-center gap-3 rounded-md bg-gray-50 px-4 py-3 text-left transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => onSelect(treatment.id)}
          >
            <span className="h-6 w-1 rounded-full bg-primary" />
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-900">
              {treatment.name}
            </span>
            <span className="whitespace-nowrap text-sm text-gray-700">
              {formatDuration(treatment.duration)}
            </span>
            <span className="h-5 w-px bg-gray-200" />
            <span className="whitespace-nowrap text-sm text-gray-400">
              Start from{' '}
              <span className="font-bold text-gray-900">
                {formatCurrency(treatment.pricePerDuration)}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularTreatmentList;
