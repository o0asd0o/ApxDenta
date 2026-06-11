import { cn } from '@/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
} from '@repo/ui/components';
import { Plus } from 'lucide-react';
import React from 'react';
import { createOneHourSlot, isReservationRangeAvailable } from './__helpers';
import type { ReservationAddSlot } from './__types';
import {
  mockDoctors,
  mockReservationVisualStates,
  mockReservations,
} from './mockData';
import {
  ReservationStatusPill,
  ReservationVisualIcon,
  type ReservationVisualStateMap,
  getReservationDisplayVisualState,
  getReservationVisualMeta,
} from './reservationVisuals';
import type { Doctor, Reservation } from './types';
import { TIME_SLOTS } from './types';

interface Props {
  startDate: Date;
  doctors: Doctor[];
  reservations: Reservation[];
  validationReservations?: Reservation[];
  onAddSlot?: (slot: ReservationAddSlot) => void;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const WeekReservationCard: React.FC<{
  reservation: Reservation;
  visualStates?: ReservationVisualStateMap;
}> = ({ reservation, visualStates }) => {
  const visualState = getReservationDisplayVisualState(
    reservation,
    visualStates,
  );
  const visual = getReservationVisualMeta(visualState);

  return (
    <div
      className={cn(
        'rounded-lg border p-2 text-xs cursor-pointer hover:shadow-sm transition-shadow',
        visual.cardClassName,
      )}
    >
      <div className="mb-1.5 flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-start gap-1.5">
          <ReservationVisualIcon
            reservation={reservation}
            visualState={visualState}
            className="size-[18px]"
          />
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold leading-4 text-gray-900">
              {reservation.patient.name}
            </p>
            <p className="text-[10px] leading-[14px] text-gray-500">
              {formatTime(reservation.startTime)} -{' '}
              {formatTime(reservation.endTime)}
            </p>
          </div>
        </div>
        <ReservationStatusPill
          status={reservation.status}
          className="max-w-[94px] px-1.5 text-[9px]"
        />
      </div>
      <Badge
        variant="outline"
        className="ml-5 rounded-full bg-white px-1.5 py-0 text-[9px] font-medium text-gray-700"
      >
        {reservation.treatment.name}
      </Badge>
    </div>
  );
};

const WeekView: React.FC<Props> = ({
  startDate,
  doctors = mockDoctors,
  reservations = mockReservations,
  validationReservations = reservations,
  onAddSlot,
}) => {
  // Generate 7 days starting from startDate
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });

  const formatDayHeader = (date: Date) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = date.getDate();
    return { dayName, dayNum };
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getReservationsForDoctorAndDay = (doctorId: string, date: Date) => {
    return reservations.filter((r) => {
      const reservationDate = new Date(r.startTime);
      return (
        r.doctor.id === doctorId &&
        reservationDate.getDate() === date.getDate() &&
        reservationDate.getMonth() === date.getMonth() &&
        reservationDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getFirstAvailableAddSlot = (doctor: Doctor, date: Date) => {
    if (!doctor.isAvailable) return null;

    for (const timeSlot of TIME_SLOTS) {
      const { startTime, endTime } = createOneHourSlot(date, timeSlot.hour);

      if (
        isReservationRangeAvailable({
          doctorId: doctor.id,
          startTime,
          endTime,
          reservations: validationReservations,
        })
      ) {
        return {
          source: 'week' as const,
          doctor,
          date,
          startTime,
          endTime,
        };
      }
    }

    return null;
  };

  return (
    <div className="flex-1 overflow-auto bg-white rounded-lg border">
      {/* Header with doctors */}
      <div className="sticky top-0 z-20 flex border-b bg-white">
        {/* Date column header */}
        <div className="w-24 shrink-0 border-r bg-gray-50 p-3">
          <span className="text-xs text-gray-500 font-medium">Date</span>
        </div>

        {/* Doctor headers */}
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className={cn(
              'w-[340px] shrink-0 border-r last:border-r-0 p-3',
              !doctor.isAvailable && 'bg-gray-50/50',
            )}
          >
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage
                  src={doctor.avatar}
                  alt={`${doctor.firstName} ${doctor.lastName}`}
                />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {getInitials(`${doctor.firstName} ${doctor.lastName}`)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm text-gray-900">
                  Drg {doctor.firstName} {doctor.lastName}
                </p>
                <p className="text-xs text-gray-500">{doctor.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Week grid */}
      <div className="flex flex-col">
        {weekDays.map((day) => {
          const { dayName, dayNum } = formatDayHeader(day);
          const today = isToday(day);

          return (
            <div
              key={day.toISOString()}
              className="flex border-b last:border-b-0"
            >
              {/* Date cell */}
              <div
                className={cn(
                  'w-24 shrink-0 border-r p-3 flex flex-col items-center justify-center',
                  today ? 'bg-primary/5' : 'bg-gray-50',
                )}
              >
                <span
                  className={cn(
                    'text-xs font-medium uppercase',
                    today ? 'text-primary' : 'text-gray-500',
                  )}
                >
                  {dayName}
                </span>
                <span
                  className={cn(
                    'text-lg font-bold',
                    today ? 'text-primary' : 'text-gray-900',
                  )}
                >
                  {dayNum}
                </span>
              </div>

              {/* Doctor cells for this day */}
              {doctors.map((doctor) => {
                const dayReservations = getReservationsForDoctorAndDay(
                  doctor.id,
                  day,
                );
                const addSlot =
                  dayReservations.length === 0
                    ? getFirstAvailableAddSlot(doctor, day)
                    : null;

                return (
                  <div
                    key={doctor.id}
                    className={cn(
                      'w-[340px] shrink-0 border-r last:border-r-0 p-2 min-h-[100px]',
                      !doctor.isAvailable && 'bg-gray-100/50',
                    )}
                  >
                    {!doctor.isAvailable ? (
                      <div className="h-full flex items-center justify-center">
                        <span className="text-xs text-gray-400 uppercase">
                          Not Available
                        </span>
                      </div>
                    ) : dayReservations.length === 0 ? (
                      <button
                        type="button"
                        disabled={!addSlot}
                        className="group flex h-full min-h-[84px] w-full items-center justify-center rounded-lg border border-dashed border-transparent text-xs text-gray-400 transition-colors enabled:hover:border-primary/40 enabled:hover:bg-primary/5 enabled:hover:text-primary disabled:cursor-not-allowed"
                        onClick={() => {
                          if (addSlot) onAddSlot?.(addSlot);
                        }}
                      >
                        <span className="group-hover:hidden">
                          No appointments
                        </span>
                        <span className="hidden items-center gap-2 font-medium group-hover:flex">
                          <Plus className="size-4" />
                          Add appointment
                        </span>
                      </button>
                    ) : (
                      <div className="space-y-2">
                        {dayReservations.slice(0, 3).map((reservation) => (
                          <WeekReservationCard
                            key={reservation.id}
                            reservation={reservation}
                            visualStates={mockReservationVisualStates}
                          />
                        ))}
                        {dayReservations.length > 3 && (
                          <Badge variant="secondary" className="text-[10px]">
                            +{dayReservations.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekView;
