import {
  CancelledBadge,
  CompletedBadge,
  InProgressBadge,
  NoShowBadge,
  ScheduledBadge,
} from '@/components/badges/AppointmentStatus';
import {
  FullTimeBadge,
  PartTimeBadge,
} from '@/components/badges/EmploymentType';
import {
  ActiveBadge,
  InactiveBadge,
  NewBadge,
} from '@/components/badges/PatientStatus';
import {
  MultipleVisitBadge,
  SingleVisitBadge,
  TreatmentFinalizedBadge,
  TreatmentInactiveBadge,
  TreatmentSampleBadge,
} from '@/components/badges/VisityType';
import type {
  EmploymentType,
  PatientStatus,
  ReservationStatus,
  TreatmentStatus,
  TreatmentVisitType,
} from '@repo/domain/db';
import type React from 'react';

export const EMPLOYMENT_TYPE_BADGES: Record<EmploymentType, React.ReactNode> = {
  FULL_TIME: <FullTimeBadge />,
  PART_TIME: <PartTimeBadge />,
};

export const PATIENT_STATUS_BADGES: Record<PatientStatus, React.ReactNode> = {
  ACTIVE: <ActiveBadge />,
  INACTIVE: <InactiveBadge />,
  NEW: <NewBadge />,
};

export const APPOINTMENT_STATUS_BADGES: Record<
  ReservationStatus,
  React.ReactNode
> = {
  DONE: <CompletedBadge />,
  PENDING: <ScheduledBadge />,
  CANCELLED: <CancelledBadge />,
  ENCOUNTER: <InProgressBadge />,
  NO_SHOW: <NoShowBadge />,
};

export const TREATMENT_TYPE_BADGES: Record<
  TreatmentVisitType,
  React.ReactNode
> = {
  SINGLE_VISIT: <SingleVisitBadge />,
  MULTIPLE_VISIT: <MultipleVisitBadge />,
};

export const TREATMENT_STATUS_BADGES: Record<TreatmentStatus, React.ReactNode> =
  {
    FINALIZED: <TreatmentFinalizedBadge />,
    INACTIVE: <TreatmentInactiveBadge />,
    SAMPLE: <TreatmentSampleBadge />,
  };
