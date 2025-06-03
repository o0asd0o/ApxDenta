import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const daysOffSchema = z.object({});

type Props = {
  form: UseFormReturn<z.infer<typeof daysOffSchema>>;
};
export const DaysOffForm: React.FC<Props> = ({ form }) => {
  return <div>DaysOffForm</div>;
};
