import { cn } from '@/lib/utils';
import type { ReservationStatus } from '@repo/domain/db';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
} from '@repo/ui/components';
import React from 'react';
import type { Reservation } from './types';
import { HOUR_HEIGHT } from './types';

interface Props {
  reservation: Reservation;
  startHour: number;
}

const getStatusStyles = (status: ReservationStatus) => {
  switch (status) {
    case 'DONE':
      return {
        bg: 'bg-emerald-50 border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-700',
        text: 'Finished',
      };
    case 'PENDING':
      return {
        bg: 'bg-blue-50 border-blue-200',
        badge: 'bg-blue-100 text-blue-700',
        text: 'Registered',
      };
    case 'ENCOUNTER':
      return {
        bg: 'bg-amber-50 border-amber-200',
        badge: 'bg-amber-100 text-amber-700',
        text: 'Doing Treatment',
      };
    case 'CANCELLED':
      return {
        bg: 'bg-red-50 border-red-200',
        badge: 'bg-red-100 text-red-700',
        text: 'Cancelled',
      };
    case 'NO_SHOW':
      return {
        bg: 'bg-gray-50 border-gray-200',
        badge: 'bg-gray-100 text-gray-700',
        text: 'No Show',
      };
  }
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const ReservationCard: React.FC<Props> = ({ reservation, startHour }) => {
  const { startTime, endTime, duration, status, patient, treatment, note } =
    reservation;

  const statusStyles = getStatusStyles(status);

  // Calculate position and height based on time
  const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
  const startOffset = startMinutes - startHour * 60;
  const top = (startOffset / 60) * HOUR_HEIGHT;
  const height = (duration / 60) * HOUR_HEIGHT;

  return (
    <div
      className={cn(
        'absolute left-1 right-1 rounded-lg border p-2 overflow-hidden cursor-pointer transition-shadow hover:shadow-md',
        statusStyles.bg,
      )}
      style={{
        top: `${top}px`,
        height: `${height - 4}px`,
        minHeight: '60px',
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar className="size-6 shrink-0">
            <AvatarImage src={patient.avatar} alt={patient.name} />
            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
              {getInitials(patient.name)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm text-gray-900 truncate">
            {patient.name}
          </span>
        </div>
        <Badge
          variant="secondary"
          className={cn('text-[10px] shrink-0 font-medium', statusStyles.badge)}
        >
          {statusStyles.text}
        </Badge>
      </div>

      <p className="text-xs text-gray-500 mb-1">
        {formatTime(startTime)} › {formatTime(endTime)}
      </p>

      <Badge variant="outline" className="text-[10px] bg-white/50">
        {treatment.name}
      </Badge>

      {note && (
        <div className="mt-1 px-2 py-1 bg-yellow-100 rounded text-[10px] text-yellow-800 flex items-center gap-1">
          <span>👋</span>
          <span className="font-medium">
            {note} FOR {patient.name.toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
