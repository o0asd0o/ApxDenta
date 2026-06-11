import * as V2 from '@repo/ui/components';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/ui/components';
import {
  CalendarCheck,
  EditIcon,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Stethoscope,
  Trash2Icon,
} from 'lucide-react';
import React from 'react';
import {
  useDeletePatientAction,
  useUpdatePatientAction,
} from '../__common/context/context';
import type { PatientColumnType } from '../__types';

type Props = {
  patient: PatientColumnType;
};

const PatientCard: React.FC<Props> = ({ patient }) => {
  const onShowUpdateModal = useUpdatePatientAction();
  const onShowDeleteModal = useDeletePatientAction();

  const initials = [patient.firstName?.[0], patient.lastName?.[0]]
    .filter(Boolean)
    .join('')
    .toUpperCase();

  const fullName = `${patient.firstName} ${patient.lastName}`;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card className="relative overflow-hidden bg-white border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200 py-0 gap-2">
      {/* Decorative line header */}
      <div className="h-1.5 bg-gray-200" />

      {/* Actions Menu */}
      <div className="absolute top-3 right-3 z-10">
        <V2.DropdownMenu modal={false}>
          <V2.DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-7 w-7 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </V2.DropdownMenuTrigger>
          <V2.DropdownMenuContent align="end" className="min-w-40">
            <V2.DropdownMenuLabel>Actions</V2.DropdownMenuLabel>
            <V2.DropdownMenuSeparator />
            <V2.DropdownMenuGroup>
              <V2.DropdownMenuItem
                onClick={() =>
                  onShowUpdateModal({
                    patientId: patient.id,
                    name: fullName,
                  })
                }
              >
                <span className="flex items-center gap-x-2">
                  <EditIcon className="size-4 text-inherit" />
                  <span>Edit Patient</span>
                </span>
              </V2.DropdownMenuItem>
              <V2.DropdownMenuItem
                onClick={() =>
                  onShowDeleteModal({
                    id: patient.id,
                    name: fullName,
                    avatar: patient.avatar?.url || null,
                  })
                }
              >
                <span className="flex items-center gap-x-2 text-red-500">
                  <Trash2Icon className="size-4 text-inherit" />
                  <span>Delete</span>
                </span>
              </V2.DropdownMenuItem>
            </V2.DropdownMenuGroup>
          </V2.DropdownMenuContent>
        </V2.DropdownMenu>
      </div>

      {/* Header with Avatar and Name */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <Avatar className="size-14 ring-2 ring-offset-2 ring-primary-100">
          <AvatarImage
            src={`${import.meta.env.VITE_PUBLIC_CDN_URL}${patient.avatar?.url}`}
            alt={initials}
          />
          <AvatarFallback className="bg-gradient-to-br from-primary-500 to-primary-600 text-white font-semibold text-lg">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base leading-tight truncate pr-2">
            {fullName}
          </h3>
          <div className="flex items-center gap-0 mt-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={`mailto:${patient.email}`}
                  className="p-1 rounded-full hover:bg-primary-50 transition-colors"
                >
                  <Mail className="size-3.5 text-primary-600" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom">{patient.email}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={`tel:${patient.phoneNumber}`}
                  className="p-1 rounded-full hover:bg-primary-50 transition-colors"
                >
                  <Phone className="size-3.5 text-primary-600" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {patient.phoneNumber}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      <Separator />

      {/* Contact & Address Info */}
      <div className="p-4 pt-3 space-y-3">
        {/* Phone & Email row */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Phone className="size-3.5 text-gray-400" />
            <span>{patient.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 min-w-0">
            <Mail className="size-3.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">{patient.email}</span>
          </div>
        </div>

        {/* Address */}
        {patient.address && (
          <div className="flex items-start gap-1.5 text-xs text-gray-600">
            <MapPin className="size-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{patient.address}</span>
          </div>
        )}

        <Separator />

        {/* Visit History Section */}
        <div className="grid grid-cols-2 gap-3">
          {/* Last Visit */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-2.5 border border-gray-100">
            <div className="flex items-center gap-1.5 text-[10px] text-primary-600 uppercase font-semibold mb-1">
              <CalendarCheck className="size-3" />
              Last Visit
            </div>
            <div className="text-xs font-medium text-gray-900">
              {patient.lastReservation ? (
                formatDate(patient.lastReservation.createdAt)
              ) : (
                <span className="text-gray-400 font-normal">No visits yet</span>
              )}
            </div>
          </div>

          {/* Last Treatment */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-2.5 border border-gray-100">
            <div className="flex items-center gap-1.5 text-[10px] text-primary-600 uppercase font-semibold mb-1">
              <Stethoscope className="size-3" />
              Treatment
            </div>
            <div className="text-xs font-medium text-gray-900 truncate">
              {patient.lastTreatment ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-default">
                      {patient.lastTreatment.name}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>{patient.lastTreatment.name}</TooltipContent>
                </Tooltip>
              ) : (
                <span className="text-gray-400 font-normal">None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PatientCard;
