import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components';
import React from 'react';
import type { Doctor } from '../../components/types';

type Props = {
  doctor: Doctor;
};

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
};

const ReservationDoctorCard: React.FC<Props> = ({ doctor }) => {
  const fullName = `Drg ${doctor.firstName} ${doctor.lastName}`;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs leading-none text-gray-900">Dentist</p>
      <div className="flex items-center gap-3 rounded-lg border bg-white px-4 py-3">
        <Avatar className="size-12">
          <AvatarImage src={doctor.avatar} alt={fullName} />
          <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
            {getInitials(doctor.firstName, doctor.lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-gray-900">
            {fullName}
          </p>
          <p className="text-sm text-gray-400">
            Today's appointment:{' '}
            <span className="font-semibold text-gray-700">
              {doctor.todayAppointments} patient(s)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservationDoctorCard;
