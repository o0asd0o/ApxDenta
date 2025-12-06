import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import type { WorkingDay } from '@repo/domain/db';
import { Circle, CircleCheck } from 'lucide-react';
import React from 'react';

const options: { label: string; value: WorkingDay }[] = [
  { label: 'Monday', value: 'MONDAY' },
  { label: 'Tuesday', value: 'TUESDAY' },
  { label: 'Wednesday', value: 'WEDNESDAY' },
  { label: 'Thursday', value: 'THURSDAY' },
  { label: 'Friday', value: 'FRIDAY' },
  { label: 'Saturday', value: 'SATURDAY' },
  { label: 'Sunday', value: 'SUNDAY' },
];

type Props<T extends string> = {
  items: { label: string; value: T }[];
  selectedValues: T[];
  onChecked: (value: T, checked: CheckboxPrimitive.CheckedState) => void;
};

function CheckboxCard<T extends string>({
  items,
  selectedValues,
  onChecked,
}: Props<T>) {
  return (
    <div className="w-full flex gap-3 flex-wrap">
      {items.map((option) => (
        <CheckboxPrimitive.Root
          key={option.value}
          onCheckedChange={(checked) => onChecked(option.value, checked)}
          defaultChecked={selectedValues.includes(option.value)}
          className="relative  items-center ring-[1px] ring-border rounded-md pr-2 pl-7 py-1 transition-all duration-100 ease-out text-start text-gray-600 data-[state=checked]:ring-2 data-[state=checked]:ring-primary data-[state=checked]:text-primary"
        >
          <div className="absolute left-1.5 top-2">
            <Circle className="size-4  text-primary-foreground border border-gray-300 rounded-full" />
          </div>
          <CheckboxPrimitive.Indicator
            asChild
            className="absolute top-1.5 left-1"
          >
            <CircleCheck className="size-5 fill-primary text-primary-foreground" />
          </CheckboxPrimitive.Indicator>
          <span className="text-sm tracking-tight">{option.label}</span>
        </CheckboxPrimitive.Root>
      ))}
    </div>
  );
}
export default CheckboxCard;
