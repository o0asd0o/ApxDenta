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
    <div className="flex items-center justify-between p-2 bg-white border-b">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Avatar className="size-9">
            <AvatarImage src={avatar} alt={fullName} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {getInitials(firstName, lastName)}
            </AvatarFallback>
          </Avatar>
          {isAvailable && (
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-xs text-gray-900 truncate">
            {fullName}
          </p>
          <p className="text-[10px] text-gray-500 truncate">
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
      <div className="flex items-center gap-1 shrink-0">
        <Button variant="ghost" className="h-7 w-7 p-0">
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </Button>
      </div>
    </div>
  );
};

export default DoctorColumn;
