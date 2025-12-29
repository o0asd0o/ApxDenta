import { cn } from '@/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
} from '@repo/ui/components';
import React from 'react';
import { mockDoctors, mockReservations } from './mockData';
import type { Doctor, Reservation } from './types';

interface Props {
  startDate: Date;
  doctors: Doctor[];
  reservations: Reservation[];
}

const getStatusColor = (status: Reservation['status']) => {
  switch (status) {
    case 'DONE':
      return 'bg-emerald-100 border-emerald-200 text-emerald-700';
    case 'PENDING':
      return 'bg-blue-100 border-blue-200 text-blue-700';
    case 'ENCOUNTER':
      return 'bg-amber-100 border-amber-200 text-amber-700';
    case 'CANCELLED':
      return 'bg-red-100 border-red-200 text-red-700';
    case 'NO_SHOW':
      return 'bg-gray-100 border-gray-200 text-gray-700';
  }
};

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

const WeekView: React.FC<Props> = ({
  startDate,
  doctors = mockDoctors,
  reservations = mockReservations,
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
              'flex-1 min-w-[200px] border-r last:border-r-0 p-3',
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

                return (
                  <div
                    key={doctor.id}
                    className={cn(
                      'flex-1 min-w-[200px] border-r last:border-r-0 p-2 min-h-[100px]',
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
                      <div className="h-full flex items-center justify-center">
                        <span className="text-xs text-gray-400">
                          No appointments
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {dayReservations.slice(0, 3).map((reservation) => (
                          <div
                            key={reservation.id}
                            className={cn(
                              'p-2 rounded-md border text-xs cursor-pointer hover:shadow-sm transition-shadow',
                              getStatusColor(reservation.status),
                            )}
                          >
                            <div className="flex items-center gap-1.5 mb-1">
                              <Avatar className="size-4">
                                <AvatarFallback className="text-[8px] bg-white/50">
                                  {getInitials(reservation.patient.name)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium truncate">
                                {reservation.patient.name}
                              </span>
                            </div>
                            <p className="text-[10px] opacity-75">
                              {formatTime(reservation.startTime)} -{' '}
                              {formatTime(reservation.endTime)}
                            </p>
                          </div>
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
