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
import type { BasicInformationFormValues } from '../../components/__types';
import type { Patient } from '../../components/types';
import PatientNameInput from '../components/PatientNameInput';

type Props = {
  form: UseFormReturn<BasicInformationFormValues>;
  patients: Patient[];
};

export const BasicInformationForm: React.FC<Props> = ({ form, patients }) => {
  const selectedPatientId = form.watch('patientId');

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="patientName"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Patient name</FormLabel>
            <FormControl>
              <PatientNameInput
                patients={patients}
                value={field.value}
                selectedPatientId={selectedPatientId}
                onNameChange={(name) => {
                  form.setValue('patientId', '', {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                  field.onChange(name);
                }}
                onPatientSelect={(patient) => {
                  form.setValue('patientId', patient.id, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                  form.setValue('patientName', patient.name, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
                onPatientClear={() => {
                  form.setValue('patientId', '', {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                  form.setValue('patientName', '', {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
                placeholder="Search or enter patient name"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="patientId"
        render={({ field }) => <input type="hidden" {...field} />}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Age"
                  {...field}
                  onChange={(event) => {
                    field.onChange(
                      event.target.value
                        ? Number(event.target.value)
                        : undefined,
                    );
                  }}
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
            <FormItem className="flex flex-col">
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
                {...field}
                placeholder="youremail@example.com"
                type="email"
                icon={<Mail className="size-4" />}
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
                {...field}
                icon={<Phone className="size-4" />}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
