import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@repo/ui/components';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { addMinutes, formatTimeValue } from '../../components/__helpers';
import type {
  ReservationAddSlot,
  TreatmentAndDentistFormValues,
  TreatmentOption,
} from '../../components/__types';
import type { Doctor } from '../../components/types';
import AttachedFilesInput from './AttachedFilesInput';
import PopularTreatmentList from './PopularTreatmentList';
import ReservationDateTimeFields from './ReservationDateTimeFields';
import ReservationDoctorCard from './ReservationDoctorCard';
import TreatmentInput from './TreatmentInput';

type Props = {
  form: UseFormReturn<TreatmentAndDentistFormValues>;
  slot: ReservationAddSlot;
  doctors: Doctor[];
  treatments: TreatmentOption[];
  rangeError?: string;
};

export const TreatmentAndDentistForm: React.FC<Props> = ({
  form,
  slot,
  doctors,
  treatments,
  rangeError,
}) => {
  const selectedTreatmentId = form.watch('treatmentId');
  const selectedStartTime = form.watch('startTime');
  const note = form.watch('note') ?? '';

  React.useEffect(() => {
    const treatment = treatments.find(
      (item) => item.id === selectedTreatmentId,
    );

    if (!treatment) return;

    const [hour = '0', minute = '0'] = selectedStartTime.split(':');
    const selectedStart = new Date(slot.date);
    selectedStart.setHours(Number(hour), Number(minute), 0, 0);
    form.setValue(
      'endTime',
      formatTimeValue(addMinutes(selectedStart, treatment.duration)),
      {
        shouldValidate: true,
      },
    );
  }, [form, selectedStartTime, selectedTreatmentId, slot.date, treatments]);

  const selectedDoctor = doctors.find((doctor) => doctor.id === slot.doctor.id);
  const displayDoctor = selectedDoctor ?? slot.doctor;

  return (
    <div className="flex flex-col gap-5">
      <FormField
        control={form.control}
        name="treatmentId"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Treatment</FormLabel>
            <FormControl>
              <TreatmentInput
                value={field.value}
                onChange={field.onChange}
                treatments={treatments}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {!selectedTreatmentId && (
        <PopularTreatmentList
          treatments={treatments}
          onSelect={(treatmentId) => {
            form.setValue('treatmentId', treatmentId, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        />
      )}

      <ReservationDoctorCard doctor={displayDoctor} />

      <FormField
        control={form.control}
        name="doctorId"
        render={({ field }) => <input type="hidden" {...field} />}
      />

      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <Input className="hidden" type="hidden" {...field} />
        )}
      />

      <ReservationDateTimeFields form={form} date={slot.date} />

      {rangeError && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
          {rangeError}
        </div>
      )}

      <FormField
        control={form.control}
        name="note"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="flex items-center justify-between gap-3">
              <FormLabel>
                Quick Note <span className="text-gray-400">(Optional)</span>
              </FormLabel>
              <span className="text-xs text-gray-400">{note.length} / 200</span>
            </div>
            <FormControl>
              <Textarea
                placeholder="Type a message..."
                maxLength={200}
                className="min-h-[96px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <AttachedFilesInput form={form} />
    </div>
  );
};
