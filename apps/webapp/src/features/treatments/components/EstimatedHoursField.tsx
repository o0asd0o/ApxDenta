import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components';
import { InfoIcon } from 'lucide-react';
import React from 'react';

type Props = {
  onChange: (value: number) => void;
  value?: number;
  showDescription?: boolean;
  disabled?: boolean;
};

const EstimatedHoursField: React.FC<Props> = ({
  onChange,
  value,
  disabled,
  showDescription,
}) => {
  return (
    <FormItem className="flex flex-col w-full">
      <FormLabel className="whitespace-nowrap">
        Estimated Duration (Hours)
      </FormLabel>
      <FormControl>
        <Select
          onValueChange={(value) => onChange(Number(value))}
          value={String(value)}
          disabled={disabled || showDescription}
        >
          <SelectTrigger className="w-full h-[38px] text-sm">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'0.5'}>0.5 hours</SelectItem>
            <SelectItem value={'1'}>1 hour</SelectItem>
            <SelectItem value={'1.5'}>1.5 hours</SelectItem>
            <SelectItem value={'2'}>2 hours</SelectItem>
            <SelectItem value={'2.5'}>2.5 hours</SelectItem>
            <SelectItem value={'3'}>3 hours</SelectItem>
            <SelectItem value={'3.5'}>3.5 hours</SelectItem>
            <SelectItem value={'4'}>4 hours</SelectItem>
            <SelectItem value={'4.5'}>4.5 hours</SelectItem>
            <SelectItem value={'5'}>5 hours</SelectItem>
            {showDescription && (value || 0) > 5 && (
              <SelectItem value={String(value)}>{value} hours</SelectItem>
            )}
          </SelectContent>
        </Select>
      </FormControl>
      {showDescription && (
        <FormDescription className="flex items-center">
          <InfoIcon className="inline mr-1 size-3.5" />
          <span className="whitespace-nowrap">Estimated total duration</span>
        </FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
};

export default EstimatedHoursField;
