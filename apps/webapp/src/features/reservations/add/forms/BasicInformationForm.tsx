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
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type {
  BasicInformationFormValues,
  ReservationAddSlot,
} from '../../components/__types';
import type { Patient } from '../../components/types';

type Props = {
  form: UseFormReturn<BasicInformationFormValues>;
  patients: Patient[];
  slot: ReservationAddSlot;
};

export const BasicInformationForm: React.FC<Props> = ({
  form,
  patients,
  slot,
}) => {
  const listId = `reservation-patient-options-${slot.doctor.id}`;

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="patientName"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Patient name</FormLabel>
            <FormControl>
              <>
                <Input
                  list={listId}
                  placeholder="Search or enter patient name"
                  {...field}
                  onChange={(event) => {
                    const patient = patients.find(
                      (item) => item.name === event.target.value,
                    );
                    form.setValue('patientId', patient?.id, {
                      shouldDirty: true,
                    });
                    field.onChange(event);
                  }}
                />
                <datalist id={listId}>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.name} />
                  ))}
                </datalist>
              </>
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
                type="email"
                placeholder="Enter email address"
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
              <Input type="tel" placeholder="Enter phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
