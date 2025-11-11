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
      <div className="flex bg-gray-50 px-4 py-3  gap-2 rounded-md items-center relative before:content-[''] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-0.5 before:bg-primary before:rounded-full">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm">
            <span className="text-xl font-medium">{visits?.length || 0}</span>{' '}
            visit{(visits?.length || 0) > 1 ? 's' : ''}
          </h3>
          <span className="text-xs text-gray-400 truncate max-w-[250px]">
            {(visits || [])
              .map((item) => item.treatmentId?.split('--')[1] || '')
              .join(' --> ')}
          </span>
        </div>
        <div className="flex gap-1 ml-auto">
          <Button
            type="button"
            className="ml-auto text-primary hover:bg-primary-100/50"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Edit
          </Button>
          <Button
            type="button"
            className="ml-auto text-red-500 hover:bg-red-100/50"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              form.resetField('visits');
              form.resetField('price');
              form.resetField('duration');
              if (form.getValues('category')) {
                form.setValue('components', [
                  { id: '', quantity: 1, free: false, freeUpTo: 0 },
                ]);
              }
            }}
          >
            Remove
          </Button>
        </div>
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
