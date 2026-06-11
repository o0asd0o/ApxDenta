import type {
  AttachedReservationFileType,
  ReservationBasicInformationFormType,
  ReservationOralHygieneHabitsFormType,
  ReservationTreatmentAndDentistFormType,
} from '@repo/schemas';
import type { Doctor, Patient, Reservation, Treatment } from './types';

export type ReservationAddSlotSource = 'day' | 'week';

export type ReservationAddSlot = {
  source: ReservationAddSlotSource;
  doctor: Doctor;
  date: Date;
  startTime: Date;
  endTime: Date;
};

export type TreatmentOption = Treatment & {
  duration: number;
  pricePerDuration: number;
};

export type AttachedReservationFile = AttachedReservationFileType;
export type TreatmentAndDentistFormValues =
  ReservationTreatmentAndDentistFormType;
export type BasicInformationFormValues = ReservationBasicInformationFormType;
export type OralHygieneHabitsFormValues = ReservationOralHygieneHabitsFormType;

export type WaitlistFormValues = {
  treatmentAndDentist?: TreatmentAndDentistFormValues;
  basicInformation?: BasicInformationFormValues;
  oralHygieneHabits?: OralHygieneHabitsFormValues;
};

export type WaitlistReservationInput = {
  slot: ReservationAddSlot;
  treatment: TreatmentOption;
  patient: Patient;
  startTime: Date;
  endTime: Date;
  duration: number;
  note?: string;
  oralHygieneHabits?: OralHygieneHabitsFormValues;
};

export type ReservationRangeValidationContext = {
  doctorId: string;
  startTime: Date;
  endTime: Date;
  reservations: Reservation[];
  ignoredReservationId?: string;
};

export type ReservationRescheduleRequest = {
  reservation: Reservation;
  doctor: Doctor;
  startTime: Date;
  endTime: Date;
  duration: number;
};
