import type { TreatmentFormType } from '@repo/schemas';
import { Button } from '@repo/ui/components';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';

type Props = {
  onClick: () => void;
  form: UseFormReturn<TreatmentFormType>;
};

const MultipleVisitTrigger: React.FC<Props> = ({ onClick, form }) => {
  const visits = form.watch('visits');

  if ((visits?.length || 0) > 0) {
    return (
      <div className="flex bg-gray-50 px-4 py-3 rounded-md items-center relative before:content-[''] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[2px] before:bg-primary before:rounded-full">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm">
            <span className="text-xl font-medium">{visits?.length || 0}</span>{' '}
            visit{(visits?.length || 0) > 1 ? 's' : ''}
          </h3>
          <span className="text-xs text-gray-400 truncate max-w-[300px]">
            {(visits || [])
              .map((item) => item.treatmentId?.split('--')[1] || '')
              .join(' --> ')}
          </span>
        </div>
        <Button
          type="button"
          className="ml-auto text-primary"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Setup
        </Button>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 px-4 py-3 rounded-md items-center relative before:content-[''] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[2px] before:bg-primary before:rounded-full">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm">Set Multiple Visit</h3>
        <span className="text-xs text-gray-400">
          Allow multiple visits for this treatment
        </span>
      </div>
      <Button
        type="button"
        className="ml-auto text-primary"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        Setup
      </Button>
    </div>
  );
};

export default MultipleVisitTrigger;
