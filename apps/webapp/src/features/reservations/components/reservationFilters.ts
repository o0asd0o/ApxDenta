import type { ReservationStatus } from '@repo/domain/db';
import type { Reservation } from './types';

export type ReservationTimeOfDay = 'morning' | 'afternoon';

export type ReservationFilterType = {
  statuses?: ReservationStatus[];
  treatmentIds?: string[];
  timeOfDay?: ReservationTimeOfDay[];
  hasNotes?: boolean;
};

export const hasReservationFilters = (filters: ReservationFilterType) =>
  Boolean(
    filters.statuses?.length ||
      filters.treatmentIds?.length ||
      filters.timeOfDay?.length ||
      filters.hasNotes,
  );

export const reservationMatchesFilters = (
  reservation: Reservation,
  filters: ReservationFilterType,
) => {
  if (
    filters.statuses?.length &&
    !filters.statuses.includes(reservation.status)
  ) {
    return false;
  }

  if (
    filters.treatmentIds?.length &&
    !filters.treatmentIds.includes(reservation.treatment.id)
  ) {
    return false;
  }

  if (filters.timeOfDay?.length) {
    const hour = reservation.startTime.getHours();
    const timeOfDay: ReservationTimeOfDay = hour < 12 ? 'morning' : 'afternoon';

    if (!filters.timeOfDay.includes(timeOfDay)) return false;
  }

  if (filters.hasNotes && !reservation.note) return false;

  return true;
};
