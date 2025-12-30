import type { PatientStatus, ReservationStatus } from '@repo/domain/db';

// Re-export common helpers from lib
export { formatDate, getInitials } from '@/lib/utils';

export const PATIENT_STATUS_COLORS: Record<PatientStatus, string> = {
  ACTIVE: 'bg-green-100 text-green-700 border-green-200',
  INACTIVE: 'bg-gray-100 text-gray-700 border-gray-300',
  NEW: 'bg-blue-100 text-blue-700 border-blue-200',
};

export const APPOINTMENT_STATUS_COLORS: Record<ReservationStatus, string> = {
  DONE: 'bg-green-100 text-green-700 border-green-200',
  PENDING: 'bg-blue-100 text-blue-700 border-blue-200',
  CANCELLED: 'bg-red-100 text-red-700 border-red-200',
  ENCOUNTER: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  NO_SHOW: 'bg-orange-100 text-orange-700 border-orange-200',
};
