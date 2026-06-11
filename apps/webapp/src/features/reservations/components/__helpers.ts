import type {
  ReservationRangeValidationContext,
  TreatmentOption,
} from './__types';
import { BREAK_TIME } from './mockData';
import type { Patient, Reservation, TimeSlot } from './types';

const HALF_HOUR_MINUTES = 30;
const ONE_HOUR_MINUTES = 60;

export const getDateKey = (date: Date) => date.toISOString().slice(0, 10);

export const getDateAtTime = (date: Date, time: string) => {
  const [hour = '0', minute = '0'] = time.split(':');
  const nextDate = new Date(date);
  nextDate.setHours(Number(hour), Number(minute), 0, 0);
  return nextDate;
};

export const formatTimeValue = (date: Date) => {
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${hour}:${minute}`;
};

export const formatDisplayTime = (value: string) => {
  const [hour = '0', minute = '0'] = value.split(':');
  const date = new Date();
  date.setHours(Number(hour), Number(minute), 0, 0);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const addMinutes = (date: Date, minutes: number) => {
  const nextDate = new Date(date);
  nextDate.setMinutes(nextDate.getMinutes() + minutes);
  return nextDate;
};

export const getDurationInMinutes = (startTime: Date, endTime: Date) => {
  return Math.round((endTime.getTime() - startTime.getTime()) / 60000);
};

export const isSameCalendarDay = (left: Date, right: Date) => {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
};

export const rangesOverlap = (
  startTime: Date,
  endTime: Date,
  compareStart: Date,
  compareEnd: Date,
) => startTime < compareEnd && endTime > compareStart;

export const crossesBreakTime = (
  date: Date,
  startTime: Date,
  endTime: Date,
) => {
  const breakStart = new Date(date);
  breakStart.setHours(BREAK_TIME.start, 0, 0, 0);

  const breakEnd = new Date(date);
  breakEnd.setHours(BREAK_TIME.end, 0, 0, 0);

  return rangesOverlap(startTime, endTime, breakStart, breakEnd);
};

export const getReservationConflict = ({
  doctorId,
  startTime,
  endTime,
  reservations,
  ignoredReservationId,
}: ReservationRangeValidationContext) => {
  return reservations.find((reservation) => {
    return (
      reservation.id !== ignoredReservationId &&
      reservation.doctor.id === doctorId &&
      isSameCalendarDay(reservation.startTime, startTime) &&
      rangesOverlap(
        startTime,
        endTime,
        reservation.startTime,
        reservation.endTime,
      )
    );
  });
};

export const isReservationRangeAvailable = (
  context: ReservationRangeValidationContext,
) => {
  if (context.endTime <= context.startTime) return false;
  if (crossesBreakTime(context.startTime, context.startTime, context.endTime)) {
    return false;
  }

  return !getReservationConflict(context);
};

export const createOneHourSlot = (date: Date, hour: number) => {
  const startTime = new Date(date);
  startTime.setHours(hour, 0, 0, 0);

  return {
    startTime,
    endTime: addMinutes(startTime, ONE_HOUR_MINUTES),
  };
};

export const createSlotFromMinutes = (date: Date, minutes: number) => {
  const startTime = new Date(date);
  startTime.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);

  return {
    startTime,
    endTime: addMinutes(startTime, ONE_HOUR_MINUTES),
  };
};

export const createHalfHourSlotOffsets = (slots: TimeSlot[]) => {
  const firstHour = slots[0]?.hour ?? 6;
  const lastHour = slots.at(-1)?.hour ?? 17;
  const offsets: number[] = [];

  for (
    let totalMinutes = firstHour * ONE_HOUR_MINUTES;
    totalMinutes <= lastHour * ONE_HOUR_MINUTES;
    totalMinutes += HALF_HOUR_MINUTES
  ) {
    offsets.push(totalMinutes);
  }

  return offsets;
};

export const createTimeOptions = (slots: TimeSlot[]) => {
  const firstHour = slots[0]?.hour ?? 6;
  const lastHour = (slots.at(-1)?.hour ?? 17) + 1;
  const options: string[] = [];

  for (
    let totalMinutes = firstHour * ONE_HOUR_MINUTES;
    totalMinutes <= lastHour * ONE_HOUR_MINUTES;
    totalMinutes += HALF_HOUR_MINUTES
  ) {
    const hour = Math.floor(totalMinutes / ONE_HOUR_MINUTES);
    const minute = totalMinutes % ONE_HOUR_MINUTES;
    options.push(
      `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    );
  }

  return options;
};

export const getMockTreatmentOptions = (
  reservations: Reservation[],
): TreatmentOption[] => {
  const durationsByName = new Map<string, number>([
    ['General Checkup', 60],
    ['Scaling', 60],
    ['Extraction', 90],
    ['Bleaching', 60],
    ['Filling', 60],
    ['Tooth Scaling', 60],
    ['Tooth Extraction', 90],
    ['Tooth Braces (Metal)', 120],
  ]);

  const pricesByName = new Map<string, number>([
    ['General Checkup', 750],
    ['Scaling', 750],
    ['Extraction', 300],
    ['Bleaching', 500],
    ['Filling', 450],
    ['Tooth Scaling', 750],
    ['Tooth Extraction', 300],
    ['Tooth Braces (Metal)', 3000],
  ]);

  const treatments = new Map<string, TreatmentOption>();

  for (const reservation of reservations) {
    const treatment = reservation.treatment;
    const duration =
      durationsByName.get(treatment.name) ??
      reservation.duration ??
      ONE_HOUR_MINUTES;

    treatments.set(treatment.id, {
      ...treatment,
      duration,
      pricePerDuration: pricesByName.get(treatment.name) ?? 500,
    });
  }

  const seededTreatments: TreatmentOption[] = [
    {
      id: 'mock-tooth-scaling',
      name: 'Tooth Scaling',
      duration: 60,
      pricePerDuration: 750,
    },
    {
      id: 'mock-tooth-extraction',
      name: 'Tooth Extraction',
      duration: 90,
      pricePerDuration: 300,
    },
    {
      id: 'mock-tooth-braces-metal',
      name: 'Tooth Braces (Metal)',
      duration: 120,
      pricePerDuration: 3000,
    },
  ];

  for (const treatment of seededTreatments) {
    treatments.set(treatment.id, treatment);
  }

  return Array.from(treatments.values());
};

export const getMockPatientOptions = (
  reservations: Reservation[],
): Patient[] => {
  const patients = new Map<string, Patient>();

  for (const reservation of reservations) {
    patients.set(reservation.patient.id, reservation.patient);
  }

  return Array.from(patients.values());
};

export const createLocalReservationId = () => {
  return `local-reservation-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};
