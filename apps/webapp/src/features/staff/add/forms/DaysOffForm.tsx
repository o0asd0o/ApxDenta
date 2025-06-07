import { PopoverDemo } from '@/components/AddOffDay';
import CheckCard from '@/components/CheckCard';
import React, { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const daysOffSchema = z.object({});

type Props = {
  form: UseFormReturn<z.infer<typeof daysOffSchema>>;
};
export const DaysOffForm: React.FC<Props> = ({ form }) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-2">
      <CheckCard checked={checked} onCheckedChange={setChecked} />
      <PopoverDemo />
    </div>
  );
};
