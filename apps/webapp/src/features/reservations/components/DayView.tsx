import { cn } from '@/lib/utils';
import { Button } from '@repo/ui/components';
import { Coffee, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import DoctorColumn from './DoctorColumn';
import ReservationCard from './ReservationCard';
import { BREAK_TIME, mockDoctors, mockReservations } from './mockData';
import {
  type Doctor,
  HOUR_HEIGHT,
  type Reservation,
  TIME_SLOTS,
} from './types';

interface Props {
  date: Date;
  doctors: Doctor[];
  reservations: Reservation[];
}

const DayView: React.FC<Props> = ({
  date,
  doctors = mockDoctors,
  reservations = mockReservations,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const startHour = TIME_SLOTS[0].hour;

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Calculate current time indicator position
  const getCurrentTimePosition = () => {
    const now = currentTime;
    const minutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = startHour * 60;
    const offset = minutes - startMinutes;
    return (offset / 60) * HOUR_HEIGHT;
  };

  const isToday = () => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getReservationsForDoctor = (doctorId: string) => {
    return reservations.filter((r) => r.doctor.id === doctorId);
  };

  const formatCurrentTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="h-full overflow-auto bg-white rounded-lg border">
      <div className="min-w-max">
        {/* Header with doctor columns */}
        <div className="sticky top-0 z-20 flex border-b bg-white">
          {/* Time column header */}
          <div className="w-14 shrink-0 border-r bg-gray-50 p-2 sticky left-0 z-10">
            <span className="text-[10px] text-gray-500 font-medium">GMT</span>
            <br />
            <span className="text-[10px] text-gray-400">+07:00</span>
          </div>

          {/* Doctor headers */}
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className={cn(
                'w-[220px] shrink-0 border-r last:border-r-0',
                !doctor.isAvailable && 'bg-gray-50/50',
              )}
            >
              <DoctorColumn doctor={doctor} />
            </div>
          ))}
        </div>

        {/* Time grid */}
        <div className="relative flex">
          {/* Time labels column */}
          <div className="w-14 shrink-0 border-r bg-gray-50 sticky left-0 z-10">
            {TIME_SLOTS.map((slot) => (
              <div
                key={slot.hour}
                className="relative"
                style={{ height: `${HOUR_HEIGHT}px` }}
              >
                {/* Time label positioned at the top of each hour slot */}
                <span className="absolute top-0 left-1 right-1 text-[11px] text-gray-500 text-center -translate-y-1/2 bg-gray-50">
                  {slot.label}
                </span>
                {/* Horizontal line at the top of each slot */}
                <div className="absolute top-0 left-0 right-0 border-t border-gray-200" />
              </div>
            ))}
          </div>

          {/* Doctor columns with reservations */}
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className={cn(
                'w-[220px] shrink-0 border-r last:border-r-0 relative',
                !doctor.isAvailable && 'bg-gray-100/50',
              )}
            >
              {/* Hour grid lines */}
              {TIME_SLOTS.map((slot) => (
                <div
                  key={slot.hour}
                  className="border-b border-dashed border-gray-200"
                  style={{ height: `${HOUR_HEIGHT}px` }}
                />
              ))}

              {/* Break time overlay */}
              <div
                className="absolute left-0 right-0 bg-gray-100/80 flex items-center justify-center"
                style={{
                  top: `${(BREAK_TIME.start - startHour) * HOUR_HEIGHT}px`,
                  height: `${(BREAK_TIME.end - BREAK_TIME.start) * HOUR_HEIGHT}px`,
                }}
              >
                <div className="flex items-center gap-2 text-gray-500">
                  <Coffee className="size-4" />
                  <span className="text-xs font-medium uppercase">
                    {BREAK_TIME.label}
                  </span>
                </div>
              </div>

              {/* Not available overlay */}
              {!doctor.isAvailable && (
                <div className="absolute inset-0 flex items-start justify-center pt-20">
                  <span className="text-sm text-gray-400 font-medium uppercase">
                    NOT AVAILABLE
                  </span>
                </div>
              )}

              {/* Reservations */}
              {doctor.isAvailable &&
                getReservationsForDoctor(doctor.id).map((reservation) => (
                  <ReservationCard
                    key={reservation.id}
                    reservation={reservation}
                    startHour={startHour}
                  />
                ))}

              {/* Add appointment button (floating) */}
              {doctor.isAvailable && (
                <div
                  className="absolute right-2 flex items-center justify-center"
                  style={{
                    top: `${(14 - startHour) * HOUR_HEIGHT + 20}px`,
                  }}
                >
                  <Button
                    variant="outline"
                    className="rounded-full bg-white shadow-sm hover:shadow-md size-10 p-0"
                  >
                    <Plus className="size-5 text-gray-400" />
                  </Button>
                </div>
              )}
            </div>
          ))}

          {/* Current time indicator */}
          {isToday() && (
            <div
              className="absolute left-0 right-0 z-10 pointer-events-none"
              style={{ top: `${getCurrentTimePosition()}px` }}
            >
              <div className="relative flex items-center">
                <div className="w-14 flex justify-center sticky left-0">
                  <span className="text-[10px] text-red-500 font-medium bg-red-50 px-1 rounded">
                    {formatCurrentTime()}
                  </span>
                </div>
                <div className="flex-1 h-0.5 bg-red-500 relative">
                  <div className="absolute -left-1.5 -top-1 w-3 h-3 bg-red-500 rounded-full" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayView;
