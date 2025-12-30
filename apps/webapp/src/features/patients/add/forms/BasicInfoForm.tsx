import { UploadAvatar } from '@/components/UploadAvatar';
import AddressInput from '@/components/maps/AddressInput';
import type { PatientBasicInfoFormType } from '@repo/schemas';
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
} from '@repo/ui/components';
import { Mail, Phone } from 'lucide-react';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';

type Props = {
  // biome-ignore lint/suspicious/noExplicitAny: Flexible form type for create/update
  form: UseFormReturn<PatientBasicInfoFormType, any, any>;
};

const BasicInfoForm: React.FC<Props> = ({ form }) => {
  return (
    <div className="flex flex-col gap-4">
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

      <div className="flex gap-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
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
            <FormItem className="flex flex-col w-full">
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Enter last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex gap-2">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter age"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioCardGroup
                  className="grid-cols-2 text-sm"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <RadioCardItem value="MALE">
                    <div className="flex items-center gap-3">
                      <RadioCardIndicator />
                      <span>Male</span>
                    </div>
                  </RadioCardItem>
                  <RadioCardItem value="FEMALE">
                    <div className="flex items-center gap-3">
                      <RadioCardIndicator />
                      <span>Female</span>
                    </div>
                  </RadioCardItem>
                </RadioCardGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter email address"
                icon={<Mail className="size-4" />}
                {...field}
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
          <FormItem className="flex flex-col">
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input
                masked
                type="tel"
                placeholder="Enter phone number"
                icon={<Phone className="size-4" />}
                {...field}
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
          <FormItem className="flex flex-col">
            <FormLabel>Address</FormLabel>
            <FormControl>
              <AddressInput value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInfoForm;
