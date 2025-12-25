import { BASE_SCHEDULES } from '@/constants/schedules';
import { cn } from '@/lib/utils';
import type { WorkingDay } from '@repo/domain/db';
import { Button, V2 } from '@repo/ui/components';
import { Link } from '@tanstack/react-router';
import { ArchiveIcon, EditIcon, EyeIcon, MoreVertical } from 'lucide-react';
import {
  useArchiveStaffIdAction,
  useUpdateStaffIdAction,
} from './__common/context/context';
import type { StaffColumnType } from './__types';

export const renderWorkingDays = (
  value: { day: WorkingDay }[],
  className?: string,
) => {
  return (
    <div className={cn('gap-1 flex flex-wrap', className)}>
      {Object.keys(BASE_SCHEDULES).map((sched) => {
        const hit = value.some((item) => item.day === (sched as WorkingDay));

        const label = BASE_SCHEDULES[sched as WorkingDay];
        return (
          <div
            key={sched}
            className={cn(
              'size-5.5 rounded-full bg-gray-200 flex  text-gray-400 items-center justify-center text-[10px] font-medium',
              hit && 'bg-[#61B0FF] text-primary-foreground border-blue-400',
            )}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export const RenderStaffActions = (actions: {
  staffId: string;
  name: string;
  original: StaffColumnType;
}) => {
  const onShowUpdateModal = useUpdateStaffIdAction();
  const onShowArchiveModal = useArchiveStaffIdAction();

  const label = actions.original.type === 'DOCTOR' ? 'Doctor' : 'Staff';
  return (
    <div className="flex justify-end">
      <V2.DropdownMenu modal={false}>
        <V2.DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </V2.DropdownMenuTrigger>
        <V2.DropdownMenuContent className="min-w-46">
          <V2.DropdownMenuLabel>Actions</V2.DropdownMenuLabel>
          <V2.DropdownMenuSeparator />
          <V2.DropdownMenuGroup>
            <V2.DropdownMenuItem asLink>
              <Link
                to="/staff-list/$staffId"
                params={{ staffId: actions.staffId }}
                className="flex w-full items-center gap-x-2 py-1.5 pl-2 pr-1"
              >
                <EyeIcon className="size-4 text-inherit" />
                <span>View {label}</span>
              </Link>
            </V2.DropdownMenuItem>
            <V2.DropdownMenuItem
              onClick={() =>
                onShowUpdateModal({
                  staffId: actions.staffId,
                  name: actions.name,
                })
              }
            >
              <span className="flex items-center gap-x-2">
                <EditIcon className="size-4 text-inherit" />
                <span>Update {label}</span>
              </span>
            </V2.DropdownMenuItem>
            <V2.DropdownMenuItem
              onClick={() => onShowArchiveModal(actions.original)}
            >
              <span className="flex items-center gap-x-2 text-red-500">
                <ArchiveIcon className="size-4 text-inherit" />
                <span>Archive</span>
              </span>
            </V2.DropdownMenuItem>
          </V2.DropdownMenuGroup>
          <V2.DropdownMenuSeparator />
        </V2.DropdownMenuContent>
      </V2.DropdownMenu>
    </div>
  );
};
