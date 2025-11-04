import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components';
import React from 'react';

type Props = {
  onChange: (value: number) => void;
};
const EstimatedHoursField: React.FC<Props> = ({ onChange }) => {
  return (
    <FormItem className="flex flex-col w-full">
      <FormLabel className="whitespace-nowrap">
        Estimated Duration (Hours)
      </FormLabel>
      <FormControl>
        <Select onValueChange={(value) => onChange(Number(value))}>
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
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default EstimatedHoursField;
