import type { PatientStatus, ReservationStatus } from '@repo/domain/db';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar: { url: string } | null;
  status: PatientStatus;
  lastVisit: Date | null;
  nextAppointment: Date | null;
  totalTreatments: number | null;
  completedTreatments: number | null;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientFirstName: string;
  patientLastName: string;
  patientAvatar: { url: string } | null;
  treatmentId: string;
  treatmentName: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  status: ReservationStatus;
  note: string | null;
}
