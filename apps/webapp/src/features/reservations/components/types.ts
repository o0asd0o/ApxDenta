import type { ReservationStatus } from '@repo/domain/db';

export type ViewMode = 'Day' | 'Week';

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  position: string;
  todayAppointments: number;
  isAvailable: boolean;
}

export interface Patient {
  id: string;
  name: string;
  avatar?: string;
}

export interface Treatment {
  id: string;
  name: string;
}

export interface Reservation {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  status: ReservationStatus;
  note?: string;
  doctor: Doctor;
  patient: Patient;
  treatment: Treatment;
}

export interface TimeSlot {
  hour: number;
  label: string;
}

export const TIME_SLOTS: TimeSlot[] = Array.from({ length: 12 }, (_, i) => {
  const hour = i + 6; // Start from 6am
  const isPM = hour >= 12;
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return {
    hour,
    label: `${displayHour}${isPM ? 'pm' : 'am'}`,
  };
});

export const HOUR_HEIGHT = 80; // pixels per hour
