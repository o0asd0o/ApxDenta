import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@repo/ui/components';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import {
  addMinutes,
  formatDisplayTime,
  formatTimeValue,
} from '../../components/__helpers';
import type {
  ReservationAddSlot,
  TreatmentAndDentistFormValues,
  TreatmentOption,
} from '../../components/__types';
import type { Doctor } from '../../components/types';

type Props = {
  form: UseFormReturn<TreatmentAndDentistFormValues>;
  slot: ReservationAddSlot;
  doctors: Doctor[];
  treatments: TreatmentOption[];
  timeOptions: string[];
  rangeError?: string;
};

export const TreatmentAndDentistForm: React.FC<Props> = ({
  form,
  slot,
  doctors,
  treatments,
  timeOptions,
  rangeError,
}) => {
  const selectedTreatmentId = form.watch('treatmentId');
  const selectedStartTime = form.watch('startTime');

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

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="treatmentId"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Treatment</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Treatment" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {treatments.map((treatment) => (
                  <SelectItem key={treatment.id} value={treatment.id}>
                    {treatment.name} - {treatment.duration} min
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="rounded-lg border bg-gray-50 p-3">
        <p className="text-xs font-medium uppercase text-gray-400">Dentist</p>
        <p className="mt-1 text-sm font-semibold text-gray-900">
          Drg {selectedDoctor?.firstName ?? slot.doctor.firstName}{' '}
          {selectedDoctor?.lastName ?? slot.doctor.lastName}
        </p>
        <p className="text-xs text-gray-500">
          {selectedDoctor?.position ?? slot.doctor.position}
        </p>
      </div>

      <FormField
        control={form.control}
        name="doctorId"
        render={({ field }) => <input type="hidden" {...field} />}
      />

      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date</FormLabel>
            <FormControl>
              <Input readOnly {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start time</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Start" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {formatDisplayTime(time)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End time</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="End" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {formatDisplayTime(time)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

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
            <FormLabel>Quick Note (Optional)</FormLabel>
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
    </div>
  );
};
