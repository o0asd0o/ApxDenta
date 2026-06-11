import { cn } from '@/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from '@repo/ui/components';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import type { Doctor } from './types';

interface Props {
  doctor: Doctor;
}

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
};

const DoctorColumn: React.FC<Props> = ({ doctor }) => {
  const { firstName, lastName, avatar, todayAppointments, isAvailable } =
    doctor;
  const fullName = `Drg ${firstName} ${lastName}`;

  return (
    <div className="flex h-[72px] items-start justify-between gap-2 bg-white px-3 py-3">
      <div className="flex min-w-0 items-start gap-2">
        <div className="relative">
          <Avatar className="size-10">
            <AvatarImage src={avatar} alt={fullName} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {getInitials(firstName, lastName)}
            </AvatarFallback>
          </Avatar>
          {isAvailable && (
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div className="min-w-0 pt-0.5">
          <p className="truncate text-sm font-semibold leading-5 text-gray-900">
            {fullName}
          </p>
          <p className="truncate text-xs leading-4 text-gray-500">
            Today's appointment:{' '}
            <span
              className={cn(
                todayAppointments > 0 ? 'text-primary' : 'text-gray-400',
              )}
            >
              {todayAppointments} patient(s)
            </span>
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-start">
        <Button
          variant="ghost"
          className="mt-0 h-7 w-7 rounded-full p-0"
          aria-label={`More options for ${fullName}`}
        >
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </Button>
      </div>
    </div>
  );
};

export default DoctorColumn;
