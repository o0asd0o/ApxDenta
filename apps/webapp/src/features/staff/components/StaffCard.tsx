import { EMPLOYMENT_TYPE_BADGES } from '@/constants/badges';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/ui/components';
import {
  BriefcaseMedical,
  Calendar,
  IdCard,
  Mail,
  PhoneCall,
} from 'lucide-react';
import React from 'react';
import { RenderStaffActions, renderWorkingDays } from '../__renderers';
import type { StaffColumnType } from '../__types';

type Props = {
  staff: StaffColumnType;
};
const StaffCard: React.FC<Props> = ({ staff }) => {
  const initials = [staff.firstName?.[0], staff.lastName?.[0]]
    .filter(Boolean)
    .join('')
    .toUpperCase();

  return (
    <Card className="relative overflow-hidden bg-white border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200 py-0 gap-2">
      {/* Decorative line header */}
      <div className="h-1.5 bg-gray-200" />

      {/* Header with Avatar and Name */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <Avatar className="size-14 ring-2 ring-offset-2 ring-primary-100">
          <AvatarImage
            src={`${import.meta.env.VITE_PUBLIC_CDN_URL}${staff.avatar?.url}`}
            alt={initials}
          />
          <AvatarFallback className="bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold text-lg">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base leading-tight truncate pr-2">
            {staff.firstName} {staff.lastName}
          </h3>
          <div className="text-xs text-gray-500 mt-0.5">
            {staff?.specialistRecord?.title || 'N/A'}
          </div>
          <div className="flex items-center gap-0 mt-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={`mailto:${staff.account?.user.email || staff.email}`}
                  className="p-1 rounded-full hover:bg-primary-50 transition-colors"
                >
                  <Mail className="size-3.5 text-primary-600" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {staff.account?.user.email || staff.email}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={`tel:${staff.contactNumber}`}
                  className="p-1 rounded-full hover:bg-primary-50 transition-colors"
                >
                  <PhoneCall className="size-3.5 text-primary-600" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {staff.contactNumber}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Action Menu */}
        <div className="absolute top-4 right-3">
          <RenderStaffActions
            name={`${staff.firstName} ${staff.lastName}`}
            staffId={staff.id}
            original={staff}
          />
        </div>
      </div>

      <Separator />

      {/* Content Section */}
      <div className="p-4 pt-3 space-y-3">
        {/* Employment Type */}
        <div className="flex gap-2 items-center">
          <span className="text-xs text-gray-600 uppercase font-bold inline-flex items-center gap-1">
            <IdCard className="size-3.5 text-gray-400" />
          </span>
          {EMPLOYMENT_TYPE_BADGES[staff.employmentType]}
        </div>

        {/* Assigned Services */}
        {staff.assignedServices && staff.assignedServices.length > 0 && (
          <div className="flex gap-2 items-baseline">
            <div className="text-xs text-gray-600 uppercase font-bold inline-flex items-center gap-1 relative top-0.5">
              <BriefcaseMedical className="size-3.5 text-gray-400" />
            </div>
            <ul className="text-gray-950 list-disc w-[calc(100%-20px)]">
              {staff.assignedServices.slice(0, 3).map((s, index) => (
                <li key={s.id} className="truncate flex-1 text-[13px]">
                  • {s.name}{' '}
                  {index === 2 && !!(staff.assignedServices.length - 3) ? (
                    <Tooltip>
                      <TooltipTrigger
                        asChild
                        className="bg-transparent text-primary text-xs font-bold"
                      >
                        <span className="ml-1 cursor-default">
                          +{staff.assignedServices.length - 3}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        align="center"
                        className="bg-gray-200 text-shadow-gray-800 [&>span>svg]:bg-gray-200 [&>span>svg]:fill-gray-200"
                      >
                        <ul className="text-gray-950 list-disc pl-3">
                          {staff.assignedServices.slice(3).map((treatment) => (
                            <li key={treatment.id} className="text-sm">
                              {treatment.name}
                            </li>
                          ))}
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    ''
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Separator />

        {/* Work Schedule */}
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-2.5 border border-gray-100">
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase font-bold mb-1">
              <Calendar className="size-3" />
              Work Schedule
            </div>
            <div className="text-xs font-medium text-gray-900">
              {staff.workSchedules && staff.workSchedules.length > 0 ? (
                renderWorkingDays(staff.workSchedules)
              ) : (
                <span className="text-gray-400 font-normal">
                  No schedule set
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StaffCard;
