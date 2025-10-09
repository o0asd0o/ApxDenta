import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@repo/ui/components';
import React from 'react';
import { useForm } from 'react-hook-form';

const TreatmentBaseForm: React.FC = () => {
  const form = useForm();

  return (
    <div>
      <h2>Basic info</h2>
      <div className="flex gap-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="space-y-1 flex flex-col w-full">
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="space-y-1 flex flex-col w-full">
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Enter last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default TreatmentBaseForm;
