import type { TreatmentFormType } from '@repo/schemas';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<TreatmentFormType>;
};
const MultipleVisitForm: React.FC<Props> = ({ form }) => {
  console.log({ form });
  return <div>MultipleVisitForm</div>;
};

export default MultipleVisitForm;
