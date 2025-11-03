import { useTRPC } from '@/lib/trpc';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

const MedicalComponentSelector: React.FC<Props> = ({ value, onChange }) => {
  const trpc = useTRPC();
  const { data: components } = useQuery(
    trpc.components.getAllComponents.queryOptions({}),
  );

  console.log({ components });

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="xs:w-[200px]">
        <SelectValue placeholder="Select component" />
      </SelectTrigger>
      <SelectContent>
        {(components?.data || []).map((component) => (
          <SelectItem key={component.id} value={component.id}>
            {component.name} - ₱{component.price.toFixed(2)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MedicalComponentSelector;
