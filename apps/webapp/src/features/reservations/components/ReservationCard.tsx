import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import { Badge } from '@repo/ui/components';
import React from 'react';
import {
  ReservationStatusPill,
  ReservationVisualIcon,
  type ReservationVisualStateMap,
  getReservationDisplayVisualState,
  getReservationVisualMeta,
} from './reservationVisuals';
import type { Reservation } from './types';
import { HOUR_HEIGHT } from './types';

interface Props {
  reservation: Reservation;
  startHour: number;
  visualStates?: ReservationVisualStateMap;
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const ReservationCard: React.FC<Props> = ({
  reservation,
  startHour,
  visualStates,
}) => {
  const { startTime, endTime, duration, status, patient, treatment } =
    reservation;

  const visualState = getReservationDisplayVisualState(
    reservation,
    visualStates,
  );
  const visual = getReservationVisualMeta(visualState);
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({
      id: `reservation:${reservation.id}`,
      data: { reservation },
    });

  // Calculate position and height based on time
  const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
  const startOffset = startMinutes - startHour * 60;
  const top = (startOffset / 60) * HOUR_HEIGHT;
  const height = (duration / 60) * HOUR_HEIGHT;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        'absolute left-1 right-1 z-10 rounded-xl border p-2 overflow-hidden cursor-grab touch-none transition-shadow hover:shadow-md active:cursor-grabbing',
        isDragging && 'z-30 opacity-80 shadow-lg',
        visual.cardClassName,
      )}
      style={{
        top: `${top}px`,
        height: `${height - 4}px`,
        minHeight: '60px',
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
    >
      <div className="mb-1 flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-start gap-1.5">
          <ReservationVisualIcon
            reservation={reservation}
            visualState={visualState}
            className="size-5"
          />
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold leading-4 text-gray-900">
              {patient.name}
            </p>
            <p className="truncate text-[11px] leading-[14px] text-gray-500">
              {formatTime(startTime)} › {formatTime(endTime)}
            </p>
          </div>
        </div>
        <ReservationStatusPill status={status} className="max-w-[112px]" />
      </div>

      <Badge
        variant="outline"
        className="ml-6 rounded-full bg-white px-2 py-0 text-[10px] font-medium text-gray-700"
      >
        {treatment.name}
      </Badge>
    </div>
  );
};

export default ReservationCard;
