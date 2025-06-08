import AddDayOff from '@/components/AddOffDay';
import CheckCard from '@/components/CheckCard';
import React, { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const daysOffSchema = z.object({
  dayOffs: z
    .object({
      id: z.string(),
      name: z.string(),
      to: z.date(),
      from: z.date(),
      repeat: z.boolean().optional(),
      isDefault: z.boolean().optional(),
    })
    .array()
    .default([]),
});

type Props = {
  form: UseFormReturn<z.infer<typeof daysOffSchema>>;
};
export const DaysOffForm: React.FC<Props> = ({ form }) => {
  const [checked, setChecked] = useState<boolean>(false);

  // TODO: add feature to include default holidays (PH Holidays)
  // handle form
  return (
    <div className="flex flex-col gap-2">
      <CheckCard checked={checked} onCheckedChange={setChecked} />
      <AddDayOff onAdd={(added) => console.log({ added })} />
    </div>
  );
};
