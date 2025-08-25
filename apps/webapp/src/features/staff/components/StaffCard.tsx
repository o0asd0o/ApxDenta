import { EMPLOYMENT_TYPE_BADGES } from '@/constants/badges';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
  onViewStaff: (id: string) => void;
  onDeleteStaff: (id: string) => void;
};
const StaffCard: React.FC<Props> = ({ staff, onViewStaff, onDeleteStaff }) => {
  return (
    <div
      key={staff.id}
      className="bg-white rounded-lg shadow flex flex-col border relative"
    >
      <div className="flex items-center gap-3 p-4 border-b">
        <Avatar className="size-12">
          <AvatarImage
            src={`${import.meta.env.VITE_PUBLIC_CDN_URL}${staff.avatar?.url}`}
            alt={[staff.firstName?.[0], staff.lastName?.[0]].join('')}
          />
          <AvatarFallback className="bg-amber-500 text-white font-bold">
            {[staff.firstName?.[0], staff.lastName?.[0]].join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-col gap-0 ">
          <div className="font-bold text-lg flex items-center gap-3 pr-9">
            <span className="truncate">
              {staff.firstName} {staff.lastName}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <a href={`mailto:${staff.account?.user.email || staff.email}`}>
                <Mail className="inline size-4 text-primary/90" />
              </a>
              <a href={`tel:${staff.contactNumber}`}>
                <PhoneCall className="inline size-4 text-primary/90" />
              </a>
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {staff?.specialistRecord?.title || 'N/A'}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-4 flex-1">
        <div className="flex gap-2 items-center">
          <span className="text-xs text-gray-600 uppercase font-bold inline-flex items-center gap-1">
            <IdCard className="size-3.5" />
          </span>
          {EMPLOYMENT_TYPE_BADGES[staff.employmentType]}
        </div>

        {staff.assignedServices && staff.assignedServices.length > 0 && (
          <div className="flex gap-2 items-baseline">
            <div className="text-xs text-gray-600 uppercase font-bold inline-flex items-center gap-1 relative top-0.5">
              <BriefcaseMedical className="size-3.5" />
            </div>
            <ul className="text-gray-950 list-disc w-[calc(100%-20px)]">
              {staff.assignedServices.slice(0, 3).map((s, index) => (
                <li key={s.id} className="truncate flex-1 text-[13px]">
                  • {s.name}{' '}
                  {index === 2 && !!(staff.assignedServices.length - 3) ? (
                    <>
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
                            {staff.assignedServices
                              .slice(3)
                              .map((treatment) => (
                                <li key={treatment.id} className="text-sm">
                                  {treatment.name}
                                </li>
                              ))}
                          </ul>
                        </TooltipContent>
                      </Tooltip>
                    </>
                  ) : (
                    ''
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {staff.workSchedules && staff.workSchedules.length > 0 && (
          <div className="text-sm text-gray-700 flex gap-2 mt-auto">
            <span className="text-xs text-gray-600 uppercase font-bold inline-flex items-center gap-1">
              <Calendar className="size-3.5" />
            </span>
            {renderWorkingDays(staff.workSchedules)}
          </div>
        )}
        <div className="absolute top-6 right-4">
          <RenderStaffActions
            staffId={staff.id}
            onView={onViewStaff}
            onDelete={onDeleteStaff}
          />
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
