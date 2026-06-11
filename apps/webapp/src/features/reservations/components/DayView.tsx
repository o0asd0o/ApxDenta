import { cn } from '@/lib/utils';
import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Coffee } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import DoctorColumn from './DoctorColumn';
import ReservationCard from './ReservationCard';
import ReservationSlotDropTarget from './ReservationSlotDropTarget';
import {
  addMinutes,
  createHalfHourSlotOffsets,
  createSlotFromMinutes,
  getDurationInMinutes,
  isReservationRangeAvailable,
} from './__helpers';
import type {
  ReservationAddSlot,
  ReservationRescheduleRequest,
} from './__types';
import {
  BREAK_TIME,
  mockDoctors,
  mockReservationVisualStates,
  mockReservations,
} from './mockData';
import {
  type Doctor,
  HOUR_HEIGHT,
  type Reservation,
  TIME_SLOTS,
} from './types';

const CURRENT_TIME_CAP_HOUR = 17;
const CURRENT_TIME_HIDE_AFTER_HOUR = 18;

interface Props {
  date: Date;
  doctors: Doctor[];
  reservations: Reservation[];
  validationReservations?: Reservation[];
  onAddSlot?: (slot: ReservationAddSlot) => void;
  onRequestReschedule?: (request: ReservationRescheduleRequest) => void;
}

const DayView: React.FC<Props> = ({
  date,
  doctors = mockDoctors,
  reservations = mockReservations,
  validationReservations = reservations,
  onAddSlot,
  onRequestReschedule,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const startHour = TIME_SLOTS[0].hour;
  const startMinutes = startHour * 60;
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const halfHourSlotOffsets = useMemo(
    () => createHalfHourSlotOffsets(TIME_SLOTS),
    [],
  );
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Calculate current time indicator position
  const getCurrentTimePosition = () => {
    const cappedMinutes = Math.min(currentMinutes, CURRENT_TIME_CAP_HOUR * 60);
    const offset = cappedMinutes - startMinutes;
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

  const shouldShowCurrentTimeIndicator =
    isToday() &&
    currentMinutes >= startMinutes &&
    currentMinutes < CURRENT_TIME_HIDE_AFTER_HOUR * 60;

  const getReservationsForDoctor = (doctorId: string) => {
    return reservations.filter((r) => r.doctor.id === doctorId);
  };

  const getAvailableAddSlot = (doctor: Doctor, slotStartMinutes: number) => {
    if (!doctor.isAvailable) return null;

    const { startTime, endTime } = createSlotFromMinutes(
      date,
      slotStartMinutes,
    );
    const available = isReservationRangeAvailable({
      doctorId: doctor.id,
      startTime,
      endTime,
      reservations: validationReservations,
    });

    if (!available) return null;

    return {
      source: 'day' as const,
      doctor,
      date,
      startTime,
      endTime,
    };
  };

  const getSlotDropId = (doctorId: string, slotStartMinutes: number) => {
    return `slot:${doctorId}:${slotStartMinutes}`;
  };

  const getSlotFromDropId = (id: string) => {
    const [type, doctorId, slotStartMinutes] = id.split(':');

    if (type !== 'slot' || !doctorId || !slotStartMinutes) return null;

    const doctor = doctors.find((item) => item.id === doctorId);

    if (!doctor?.isAvailable) return null;

    return {
      doctor,
      slotStartMinutes: Number(slotStartMinutes),
    };
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const reservation = event.active.data.current?.reservation as
      | Reservation
      | undefined;
    const overId = event.over?.id;

    if (!reservation || typeof overId !== 'string') return;

    const slot = getSlotFromDropId(overId);

    if (!slot) return;

    const duration = reservation.duration;
    const { startTime } = createSlotFromMinutes(date, slot.slotStartMinutes);
    const endTime = addMinutes(startTime, duration);

    if (
      !isReservationRangeAvailable({
        doctorId: slot.doctor.id,
        startTime,
        endTime,
        reservations: validationReservations,
        ignoredReservationId: reservation.id,
      })
    ) {
      return;
    }

    const hasChanged =
      reservation.doctor.id !== slot.doctor.id ||
      reservation.startTime.getTime() !== startTime.getTime() ||
      reservation.endTime.getTime() !== endTime.getTime();

    if (!hasChanged) return;

    onRequestReschedule?.({
      reservation,
      doctor: slot.doctor,
      startTime,
      endTime,
      duration: getDurationInMinutes(startTime, endTime),
    });
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
          <div className="sticky left-0 z-10 flex h-[72px] w-20 shrink-0 flex-col justify-center border-r bg-gray-50 px-4">
            <span className="text-[10px] text-gray-500 font-medium">GMT</span>
            <br />
            <span className="text-[10px] text-gray-400">+07:00</span>
          </div>

          {/* Doctor headers */}
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className={cn(
                'w-[340px] shrink-0 border-r last:border-r-0',
                !doctor.isAvailable && 'bg-gray-50/50',
              )}
            >
              <DoctorColumn doctor={doctor} />
            </div>
          ))}
        </div>

        {/* Time grid */}
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="relative flex">
            {/* Time labels column */}
            <div className="sticky left-0 z-15 w-20 shrink-0 border-r bg-gray-50">
              {TIME_SLOTS.map((slot) => (
                <div
                  key={slot.hour}
                  className="relative"
                  style={{ height: `${HOUR_HEIGHT}px` }}
                >
                  {/* Time label positioned at the top of each hour slot */}
                  <span className="absolute left-4 top-2 z-10 bg-gray-50 pr-2 text-xs font-medium leading-none text-gray-500">
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
                  'w-[340px] shrink-0 border-r last:border-r-0 relative',
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
                      visualStates={mockReservationVisualStates}
                    />
                  ))}

                {/* Add appointment hover/drop zones */}
                {doctor.isAvailable &&
                  halfHourSlotOffsets.map((slotStartMinutes) => {
                    const addSlot = getAvailableAddSlot(
                      doctor,
                      slotStartMinutes,
                    );
                    const slotOffset = slotStartMinutes - startMinutes;

                    return (
                      <ReservationSlotDropTarget
                        key={`${doctor.id}-${slotStartMinutes}`}
                        id={getSlotDropId(doctor.id, slotStartMinutes)}
                        top={(slotOffset / 60) * HOUR_HEIGHT + 4}
                        addSlot={addSlot}
                        onAddSlot={onAddSlot}
                      />
                    );
                  })}
              </div>
            ))}

            {/* Current time indicator */}
            {shouldShowCurrentTimeIndicator && (
              <div
                className="absolute left-0 right-0 z-10 pointer-events-none"
                style={{ top: `${getCurrentTimePosition()}px` }}
              >
                <div className="relative flex items-center">
                  <div className="sticky left-0 flex w-20 justify-center">
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
        </DndContext>
      </div>
    </div>
  );
};

export default DayView;
