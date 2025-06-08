import { useTRPC } from '@/lib/trpc';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Combobox } from './Combobox';

type Props = {
  onChange: () => void;
  value: string;
  placeholder?: string;
};
const SpecialistInput: React.FC<Props> = (props) => {
  const trpc = useTRPC();
  const { data: specialists } = useQuery(
    trpc.specialistRecord.getAllSpecialistRecords.queryOptions(),
  );

  return (
    <Combobox
      {...props}
      items={(specialists?.data || []).map((item) => ({
        label: (
          <div className="inline-flex gap-2 items-center">
            <span>{item.title}</span>
            <span className="text-gray-400 text-xs">{item.code}</span>
          </div>
        ),
        value: `${item.code}--${item.title}`,
      }))}
      placeholder="Select specialty..."
    />
  );
};

export default SpecialistInput;
