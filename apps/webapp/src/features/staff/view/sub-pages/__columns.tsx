import DateDisplay from '@/components/DateDisplay';
import { PATIENT_STATUS_BADGES } from '@/constants/badges';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
} from '@repo/ui/components';
import type { ColumnDef } from '@tanstack/react-table';
import { Clock, Mail, Phone } from 'lucide-react';
import {
  APPOINTMENT_STATUS_COLORS,
  formatDate,
  getInitials,
} from './__helpers';
import type { Appointment, Patient } from './__types';

// Re-export types and helpers for convenience
export type { Appointment, Patient } from './__types';
export {
  APPOINTMENT_STATUS_COLORS,
  formatDate,
  getInitials,
  PATIENT_STATUS_COLORS,
} from './__helpers';

export const patientColumns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'name',
    header: 'Patient',
    cell: ({ row }) => {
      const patient = row.original;
      const patientName = `${patient.firstName} ${patient.lastName}`;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage
              src={
                patient.avatar?.url
                  ? `${import.meta.env.VITE_PUBLIC_CDN_URL}${patient.avatar.url}`
                  : undefined
              }
              alt={patientName}
            />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {getInitials(patient.firstName, patient.lastName)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{patientName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Mail className="size-3.5" />
            <span>{patient.email}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Phone className="size-3.5" />
            <span>{patient.phoneNumber}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'lastVisit',
    header: 'Last Visit',
    cell: ({ row }) => {
      const lastVisit = row.original.lastVisit;
      return lastVisit ? (
        <span className="text-sm">{formatDate(lastVisit)}</span>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: 'nextAppointment',
    header: 'Next Appointment',
    cell: ({ row }) => {
      const patient = row.original;
      return patient.nextAppointment ? (
        <DateDisplay date={new Date(patient.nextAppointment)} type="medium" />
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: 'treatments',
    header: 'Treatments',
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="text-sm">
          <span className="font-medium">
            {patient.completedTreatments ?? 0}
          </span>
          <span className="text-muted-foreground">
            {' '}
            / {patient.totalTreatments ?? 0}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => PATIENT_STATUS_BADGES[row.original.status],
  },
];

export const appointmentColumns: ColumnDef<Appointment>[] = [
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({ row }) => {
      const appointment = row.original;
      const patientName = `${appointment.patientFirstName} ${appointment.patientLastName}`;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage
              src={
                appointment.patientAvatar?.url
                  ? `${import.meta.env.VITE_PUBLIC_CDN_URL}${appointment.patientAvatar.url}`
                  : undefined
              }
              alt={patientName}
            />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {getInitials(
                appointment.patientFirstName,
                appointment.patientLastName,
              )}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{patientName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'treatment',
    header: 'Treatment',
    cell: ({ row }) => row.original.treatmentName,
  },
  {
    accessorKey: 'startTime',
    header: 'Date & Time',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm">
        <DateDisplay
          date={new Date(row.original.startTime)}
          type="medium"
          includeTime
        />
      </div>
    ),
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 text-sm">
        <Clock className="size-3.5 text-muted-foreground" />
        <span>{row.original.duration} min</span>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={APPOINTMENT_STATUS_COLORS[row.original.status]}
      >
        {row.original.status}
      </Badge>
    ),
  },
];
