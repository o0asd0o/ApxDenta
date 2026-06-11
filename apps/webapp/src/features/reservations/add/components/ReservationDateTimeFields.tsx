import TimeSelector from '@/components/TimeSelector';
import { FormField, FormItem, FormMessage } from '@repo/ui/components';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { TreatmentAndDentistFormValues } from '../../components/__types';

type Props = {
  form: UseFormReturn<TreatmentAndDentistFormValues>;
  date: Date;
};

const RESERVATION_START_TIME = 600;
const RESERVATION_END_TIME = 1800;

const formatDisplayDate = (date: Date) => {
  const dateParts = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).formatToParts(date);
  const getDatePart = (type: Intl.DateTimeFormatPartTypes) =>
    dateParts.find((part) => part.type === type)?.value ?? '';
  const weekday = getDatePart('weekday').slice(0, 3);
  const month = getDatePart('month');
  const day = String(Number(getDatePart('day')));
  const year = getDatePart('year').slice(-2);

  return `${weekday} ${month} ${day}, '${year}`;
};

const timeStringToSelectorValue = (value?: string) => {
  if (!value) return undefined;

  const [hour = '0', minute = '0'] = value.split(':');
  return Number(hour) * 100 + Number(minute);
};

const selectorValueToTimeString = (value: number) => {
  const hour = Math.floor(value / 100);
  const minute = value % 100;

  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

const ReservationDateTimeFields: React.FC<Props> = ({ form, date }) => {
  const startTime = form.watch('startTime');
  const endTime = form.watch('endTime');
  const startValue = timeStringToSelectorValue(startTime);
  const endValue = timeStringToSelectorValue(endTime);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs leading-none text-gray-900">Date & Time</p>
      <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_auto_auto]">
        <div className="flex min-h-10 items-center gap-3">
          <span className="h-8 w-1 rounded-full bg-primary" />
          <span className="text-sm font-semibold text-gray-900">
            {formatDisplayDate(date)}
          </span>
        </div>

        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <TimeSelector
                value={timeStringToSelectorValue(field.value)}
                onSelect={(value) =>
                  field.onChange(selectorValueToTimeString(value))
                }
                disabledGt={endValue}
                minValue={RESERVATION_START_TIME}
                maxValue={RESERVATION_END_TIME}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <span className="hidden text-sm text-gray-400 sm:inline">to</span>

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <TimeSelector
                value={timeStringToSelectorValue(field.value)}
                onSelect={(value) =>
                  field.onChange(selectorValueToTimeString(value))
                }
                disabledLt={startValue}
                minValue={RESERVATION_START_TIME}
                maxValue={RESERVATION_END_TIME}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ReservationDateTimeFields;
