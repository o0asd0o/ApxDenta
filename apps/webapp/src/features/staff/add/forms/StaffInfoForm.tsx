import SpecialistInput from '@/components/SpecialistInput';
import { UploadAvatar } from '@/components/UploadAvatar';
import type { StaffInfoFormType } from '@repo/schemas';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
  Textarea,
} from '@repo/ui/components';
import { Mail, Phone } from 'lucide-react';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<StaffInfoFormType>;
  isUpdate?: boolean;
};

export const StaffInfoForm: React.FC<Props> = ({ form, isUpdate }) => {
  return (
    <div className="flex flex-col gap-3">
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem className="mb-2">
            <FormControl>
              <UploadAvatar
                name="file"
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem className="space-y-1 flex flex-col">
            <FormLabel>Employment type</FormLabel>
            <FormControl>
              <RadioCardGroup
                className="grid-cols-2 text-sm"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <RadioCardItem value="FULL_TIME">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>Full Time</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="PART_TIME">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>Part Time</span>
                  </div>
                </RadioCardItem>
              </RadioCardGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
      <FormField
        control={form.control}
        name="specialistId"
        render={({ field }) => (
          <FormItem className="space-y-1 flex flex-col">
            <FormLabel>Specialist</FormLabel>
            <FormControl>
              <SpecialistInput
                key={field.name}
                onChange={field.onChange}
                value={field.value}
                placeholder="Select specialty..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem className="space-y-1 flex flex-col">
            <FormLabel>Phone Nuber</FormLabel>
            <FormControl>
              <Input
                type="tel"
                {...field}
                icon={<Phone className="size-4" />}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        disabled={isUpdate}
        render={({ field }) => (
          <FormItem className="space-y-1 flex flex-col">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                {...field}
                icon={<Mail className="size-4" />}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="space-y-1 flex flex-col">
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
