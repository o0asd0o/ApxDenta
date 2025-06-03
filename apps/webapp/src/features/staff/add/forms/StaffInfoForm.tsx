import { Combobox } from '@/components/Combobox';
import { UploadAvatar } from '@/components/UploadAvatar';
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
import { z } from 'zod';

export const staffInfoSchea = z.object({
  avatar: z.instanceof(File, { message: 'Please attach a valid image' }),
  type: z.enum(['FULL_TIME', 'PART_TIME'], {
    required_error: 'Employment type is required',
  }),
  name: z.string({ required_error: 'Name is required' }),
  specialistId: z.string({ required_error: 'Specialist field is required' }),
  phoneNumber: z.string({ required_error: 'Phone Number is required' }),
  email: z.string({ required_error: 'Email is required' }),
  address: z.string().optional(),
});

export const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

type Props = {
  form: UseFormReturn<z.infer<typeof staffInfoSchea>>;
};

export const StaffInfoForm: React.FC<Props> = ({ form }) => {
  return (
    <div className="flex flex-col gap-3">
      <FormField
        control={form.control}
        name="avatar"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <UploadAvatar
                name="avatar"
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
            <FormLabel>Type</FormLabel>
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
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="space-y-1 flex flex-col">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/** YOU STOPPED HERE. You're about to implement staff creation form */}
      <FormField
        control={form.control}
        name="specialistId"
        render={({ field }) => (
          <FormItem className="space-y-1 flex flex-col">
            <FormLabel>Specialist</FormLabel>
            <FormControl>
              <Combobox
                key={field.name}
                onChange={field.onChange}
                items={frameworks}
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
