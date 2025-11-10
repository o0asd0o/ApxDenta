import {
  useCurrentIndex,
  useCurrentIndexAction,
} from '@/components/dialog/stacked/StackProvider';
import type { TreatmentFormType } from '@repo/schemas';
import { Button } from '@repo/ui/components';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<TreatmentFormType>;
  loading?: boolean;
};
const CreateTreamentFooter: React.FC<Props> = ({ form, loading }) => {
  const currentIndex = useCurrentIndex();
  const setCurrentIndex = useCurrentIndexAction('set');

  return (
    <Button
      type={currentIndex === 0 ? 'submit' : 'button'}
      variant="primary"
      className="w-[120px]"
      loadingText="Saving..."
      isLoading={loading}
      onClick={() => {
        if (currentIndex > 0) {
          form.setValue('components', []);
          setCurrentIndex(currentIndex - 1);
        }
      }}
    >
      {currentIndex === 0 ? 'Save' : 'Submit'}
    </Button>
  );
};

export default CreateTreamentFooter;
